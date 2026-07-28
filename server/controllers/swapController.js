import SwapRequest from "../models/SwapRequest.js";
import Listing from "../models/Listing.js";
import User from "../models/User.js";
import { compareSwapValues } from "../utils/swapValue.js";

const populateSwap = (query) =>
  query
    .populate("requester", "fullName location city avatar")
    .populate("owner", "fullName location city avatar")
    .populate("requestedItem")
    .populate("offeredItem");

export const createSwapRequest = async (req, res, next) => {
  try {
    const { requestedItemId, offeredItemId, message, exchangeMethod } =
      req.body;

    if (!requestedItemId || !offeredItemId) {
      return res.status(400).json({
        message: "Requested item and offered item are required.",
      });
    }

    if (requestedItemId === offeredItemId) {
      return res
        .status(400)
        .json({ message: "Cannot swap an item with itself." });
    }

    const [requestedItem, offeredItem] = await Promise.all([
      Listing.findById(requestedItemId),
      Listing.findById(offeredItemId),
    ]);

    if (!requestedItem || requestedItem.status !== "available") {
      return res
        .status(404)
        .json({ message: "Requested item is not available." });
    }

    if (!offeredItem || offeredItem.status !== "available") {
      return res
        .status(404)
        .json({ message: "Offered item is not available." });
    }

    if (offeredItem.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only offer your own listings." });
    }

    if (requestedItem.owner.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot request a swap on your own item." });
    }

    const existing = await SwapRequest.findOne({
      requester: req.user._id,
      requestedItem: requestedItemId,
      status: { $in: ["pending", "negotiating", "accepted"] },
    });

    if (existing) {
      return res.status(400).json({
        message: "You already have an active swap request for this item.",
      });
    }

    const valueComparison = compareSwapValues(
      requestedItem.estimatedValue,
      offeredItem.estimatedValue
    );

    const swap = await SwapRequest.create({
      requester: req.user._id,
      owner: requestedItem.owner,
      requestedItem: requestedItemId,
      offeredItem: offeredItemId,
      message: message || "",
      exchangeMethod: exchangeMethod || "undecided",
      valueComparison: {
        requestedValue: valueComparison.valueA,
        offeredValue: valueComparison.valueB,
        difference: valueComparison.difference,
        percentDiff: valueComparison.percentDiff,
        isFair: valueComparison.isFair,
        suggestion: valueComparison.suggestion,
      },
      status: "pending",
    });

    requestedItem.status = "pending";
    offeredItem.status = "pending";
    await Promise.all([requestedItem.save(), offeredItem.save()]);

    const populated = await populateSwap(SwapRequest.findById(swap._id));

    res.status(201).json({
      message: "Swap request sent",
      swap: populated,
    });
  } catch (error) {
    next(error);
  }
};

export const getMySwaps = async (req, res, next) => {
  try {
    const { type = "all", status } = req.query;
    const filter = {};

    if (type === "incoming") filter.owner = req.user._id;
    else if (type === "outgoing") filter.requester = req.user._id;
    else {
      filter.$or = [{ owner: req.user._id }, { requester: req.user._id }];
    }

    if (status && status !== "all") filter.status = status;

    const swaps = await populateSwap(
      SwapRequest.find(filter).sort({ updatedAt: -1 })
    );

    res.json({ swaps });
  } catch (error) {
    next(error);
  }
};

export const getSwapById = async (req, res, next) => {
  try {
    const swap = await populateSwap(SwapRequest.findById(req.params.id));

    if (!swap) {
      return res.status(404).json({ message: "Swap request not found." });
    }

    const uid = req.user._id.toString();
    if (
      swap.requester._id.toString() !== uid &&
      swap.owner._id.toString() !== uid &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized." });
    }

    res.json({ swap });
  } catch (error) {
    next(error);
  }
};

async function restoreListingAvailability(swap) {
  await Listing.updateMany(
    {
      _id: { $in: [swap.requestedItem, swap.offeredItem] },
      status: "pending",
    },
    { status: "available" }
  );
}

export const respondToSwap = async (req, res, next) => {
  try {
    const { action, exchangeMethod } = req.body;
    const swap = await SwapRequest.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: "Swap request not found." });
    }

    if (swap.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the item owner can respond." });
    }

    if (!["pending", "negotiating"].includes(swap.status)) {
      return res
        .status(400)
        .json({ message: "This swap can no longer be updated." });
    }

    if (action === "accept") {
      swap.status = "accepted";
      if (exchangeMethod) swap.exchangeMethod = exchangeMethod;
    } else if (action === "reject") {
      swap.status = "rejected";
      await restoreListingAvailability(swap);
    } else if (action === "negotiate") {
      swap.status = "negotiating";
    } else {
      return res
        .status(400)
        .json({ message: "Action must be accept, reject, or negotiate." });
    }

    await swap.save();
    const populated = await populateSwap(SwapRequest.findById(swap._id));

    res.json({ message: `Swap ${action}ed`, swap: populated });
  } catch (error) {
    next(error);
  }
};

export const completeSwap = async (req, res, next) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: "Swap request not found." });
    }

    const uid = req.user._id.toString();
    if (swap.requester.toString() !== uid && swap.owner.toString() !== uid) {
      return res.status(403).json({ message: "Not authorized." });
    }

    if (swap.status !== "accepted") {
      return res
        .status(400)
        .json({ message: "Only accepted swaps can be completed." });
    }

    swap.status = "completed";
    await swap.save();

    await Listing.updateMany(
      { _id: { $in: [swap.requestedItem, swap.offeredItem] } },
      { status: "swapped" }
    );

    await User.updateMany(
      { _id: { $in: [swap.requester, swap.owner] } },
      { $inc: { swapCount: 1 } }
    );

    const populated = await populateSwap(SwapRequest.findById(swap._id));
    res.json({ message: "Swap completed", swap: populated });
  } catch (error) {
    next(error);
  }
};

export const cancelSwap = async (req, res, next) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: "Swap request not found." });
    }

    if (swap.requester.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the requester can cancel." });
    }

    if (!["pending", "negotiating"].includes(swap.status)) {
      return res
        .status(400)
        .json({ message: "This swap cannot be cancelled." });
    }

    swap.status = "cancelled";
    await swap.save();
    await restoreListingAvailability(swap);

    const populated = await populateSwap(SwapRequest.findById(swap._id));
    res.json({ message: "Swap cancelled", swap: populated });
  } catch (error) {
    next(error);
  }
};
