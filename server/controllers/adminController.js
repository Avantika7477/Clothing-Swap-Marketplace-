import User from "../models/User.js";
import Listing from "../models/Listing.js";
import SwapRequest from "../models/SwapRequest.js";
import Message from "../models/Message.js";

export const getAnalytics = async (_req, res, next) => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalListings,
      availableListings,
      totalSwaps,
      completedSwaps,
      pendingSwaps,
      totalMessages,
    ] = await Promise.all([
      User.countDocuments({ role: "user" }),
      User.countDocuments({ role: "user", isActive: true }),
      Listing.countDocuments({ status: { $ne: "removed" } }),
      Listing.countDocuments({ status: "available" }),
      SwapRequest.countDocuments(),
      SwapRequest.countDocuments({ status: "completed" }),
      SwapRequest.countDocuments({ status: { $in: ["pending", "negotiating"] } }),
      Message.countDocuments(),
    ]);

    const conversionRate =
      totalSwaps === 0
        ? 0
        : Math.round((completedSwaps / totalSwaps) * 100);

    const recentSwaps = await SwapRequest.find()
      .populate("requester", "fullName")
      .populate("owner", "fullName")
      .populate("requestedItem", "title")
      .populate("offeredItem", "title")
      .sort({ createdAt: -1 })
      .limit(10);

    const listingsByCategory = await Listing.aggregate([
      { $match: { status: { $ne: "removed" } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      analytics: {
        totalUsers,
        activeUsers,
        totalListings,
        availableListings,
        totalSwaps,
        completedSwaps,
        pendingSwaps,
        totalMessages,
        conversionRate,
        listingsByCategory,
      },
      recentSwaps,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const filter = { role: { $ne: "admin" } };

    if (search) {
      filter.$or = [
        { fullName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
        { location: new RegExp(search, "i") },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Number(limit));

    const [users, total] = await Promise.all([
      User.find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      User.countDocuments(filter),
    ]);

    res.json({
      users: users.map((u) => u.toPublicJSON()),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot modify admin accounts." });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User ${user.isActive ? "activated" : "deactivated"}`,
      user: user.toPublicJSON(),
    });
  } catch (error) {
    next(error);
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (status && status !== "all") filter.status = status;
    else filter.status = { $ne: "removed" };

    if (search) {
      filter.$or = [
        { title: new RegExp(search, "i") },
        { brand: new RegExp(search, "i") },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Number(limit));

    const [listings, total] = await Promise.all([
      Listing.find(filter)
        .populate("owner", "fullName email location")
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Listing.countDocuments(filter),
    ]);

    res.json({
      listings,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const removeListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    listing.status = "removed";
    await listing.save();

    res.json({ message: "Listing removed by admin." });
  } catch (error) {
    next(error);
  }
};

export const getAllSwaps = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status && status !== "all") filter.status = status;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Number(limit));

    const [swaps, total] = await Promise.all([
      SwapRequest.find(filter)
        .populate("requester", "fullName email")
        .populate("owner", "fullName email")
        .populate("requestedItem", "title")
        .populate("offeredItem", "title")
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      SwapRequest.countDocuments(filter),
    ]);

    res.json({
      swaps,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const resolveDispute = async (req, res, next) => {
  try {
    const { resolution, note } = req.body;
    const swap = await SwapRequest.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: "Swap not found." });
    }

    if (resolution === "complete") {
      swap.status = "completed";
      await Listing.updateMany(
        { _id: { $in: [swap.requestedItem, swap.offeredItem] } },
        { status: "swapped" }
      );
    } else if (resolution === "cancel") {
      swap.status = "cancelled";
      await Listing.updateMany(
        {
          _id: { $in: [swap.requestedItem, swap.offeredItem] },
          status: { $in: ["pending", "available"] },
        },
        { status: "available" }
      );
    } else {
      return res
        .status(400)
        .json({ message: "Resolution must be complete or cancel." });
    }

    if (note) swap.message = `${swap.message}\n[Admin]: ${note}`.trim();
    await swap.save();

    res.json({ message: `Dispute resolved: ${resolution}`, swap });
  } catch (error) {
    next(error);
  }
};
