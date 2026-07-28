import Message from "../models/Message.js";
import SwapRequest from "../models/SwapRequest.js";

export const getMessages = async (req, res, next) => {
  try {
    const swap = await SwapRequest.findById(req.params.swapId);

    if (!swap) {
      return res.status(404).json({ message: "Swap request not found." });
    }

    const uid = req.user._id.toString();
    if (
      swap.requester.toString() !== uid &&
      swap.owner.toString() !== uid &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized." });
    }

    const messages = await Message.find({ swapRequest: swap._id })
      .populate("sender", "fullName avatar")
      .populate("receiver", "fullName avatar")
      .sort({ createdAt: 1 });

    await Message.updateMany(
      { swapRequest: swap._id, receiver: req.user._id, read: false },
      { read: true }
    );

    res.json({ messages });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    const swap = await SwapRequest.findById(req.params.swapId);

    if (!swap) {
      return res.status(404).json({ message: "Swap request not found." });
    }

    const uid = req.user._id.toString();
    const isRequester = swap.requester.toString() === uid;
    const isOwner = swap.owner.toString() === uid;

    if (!isRequester && !isOwner) {
      return res.status(403).json({ message: "Not authorized." });
    }

    if (!content?.trim()) {
      return res.status(400).json({ message: "Message content is required." });
    }

    const receiverId = isRequester ? swap.owner : swap.requester;

    const message = await Message.create({
      swapRequest: swap._id,
      sender: req.user._id,
      receiver: receiverId,
      content: content.trim(),
    });

    if (swap.status === "pending") {
      swap.status = "negotiating";
      await swap.save();
    }

    const populated = await Message.findById(message._id)
      .populate("sender", "fullName avatar")
      .populate("receiver", "fullName avatar");

    const io = req.app.get("io");
    if (io) {
      io.to(`swap:${swap._id}`).emit("new_message", populated);
      io.to(`user:${receiverId}`).emit("notification", {
        type: "message",
        swapId: swap._id,
        message: populated,
      });
    }

    res.status(201).json({ message: populated });
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const swaps = await SwapRequest.find({
      $or: [{ requester: req.user._id }, { owner: req.user._id }],
      status: { $in: ["pending", "negotiating", "accepted"] },
    })
      .populate("requester", "fullName avatar")
      .populate("owner", "fullName avatar")
      .populate("requestedItem", "title images estimatedValue")
      .populate("offeredItem", "title images estimatedValue")
      .sort({ updatedAt: -1 });

    const conversations = await Promise.all(
      swaps.map(async (swap) => {
        const lastMessage = await Message.findOne({ swapRequest: swap._id })
          .sort({ createdAt: -1 })
          .populate("sender", "fullName");

        const unreadCount = await Message.countDocuments({
          swapRequest: swap._id,
          receiver: req.user._id,
          read: false,
        });

        return {
          swap,
          lastMessage,
          unreadCount,
        };
      })
    );

    res.json({ conversations });
  } catch (error) {
    next(error);
  }
};
