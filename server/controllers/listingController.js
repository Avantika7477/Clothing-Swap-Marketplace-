import Listing from "../models/Listing.js";
import {
  calculateSwapValue,
  compareSwapValues,
} from "../utils/swapValue.js";

export const createListing = async (req, res, next) => {
  try {
    const {
      title,
      description,
      brand,
      category,
      customCategory,
      size,
      condition,
      location,
      city,
      estimatedValue,
      tags,
    } = req.body;

    if (!title || !brand || !category || !size || !condition || !location) {
      return res.status(400).json({
        message:
          "Title, brand, category, size, condition, and location are required.",
      });
    }

    const trimmedCustomCategory =
      typeof customCategory === "string" ? customCategory.trim() : "";

    if (category === "Other" && !trimmedCustomCategory) {
      return res.status(400).json({
        message: "Please describe your category when selecting Other.",
      });
    }

    const images = (req.files || []).map((f) => `/uploads/${f.filename}`);

    if (images.length === 0 && req.body.imageUrl) {
      images.push(req.body.imageUrl);
    }

    if (images.length === 0 && req.body.images) {
      const parsed =
        typeof req.body.images === "string"
          ? JSON.parse(req.body.images)
          : req.body.images;
      images.push(...parsed);
    }

    if (images.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required." });
    }

    const autoValue = calculateSwapValue({
      brand,
      condition,
      category,
      customCategory: trimmedCustomCategory,
    });
    const value = estimatedValue ? Number(estimatedValue) : autoValue;

    const listing = await Listing.create({
      title,
      description: description || "",
      brand,
      category,
      customCategory: category === "Other" ? trimmedCustomCategory : "",
      size,
      condition,
      estimatedValue: value,
      images,
      location,
      city: city || location,
      owner: req.user._id,
      tags: tags
        ? typeof tags === "string"
          ? tags.split(",").map((t) => t.trim())
          : tags
        : [],
    });

    await listing.populate("owner", "fullName location city avatar swapCount");

    res.status(201).json({ message: "Listing created", listing });
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const {
      search,
      category,
      size,
      condition,
      location,
      brand,
      minValue,
      maxValue,
      nearby,
      page = 1,
      limit = 12,
      sort = "newest",
    } = req.query;

    const filter = { status: "available" };

    if (search) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { title: regex },
        { brand: regex },
        { description: regex },
        { category: regex },
      ];
    }
    if (category && category !== "All") filter.category = category;
    if (size && size !== "All") filter.size = size;
    if (condition && condition !== "All") filter.condition = condition;
    if (brand) filter.brand = new RegExp(brand, "i");
    if (location) {
      filter.$or = [
        { location: new RegExp(location, "i") },
        { city: new RegExp(location, "i") },
      ];
    }
    if (nearby && req.user?.location) {
      filter.$or = [
        { location: new RegExp(req.user.location, "i") },
        { city: new RegExp(req.user.city || req.user.location, "i") },
      ];
    }
    if (minValue || maxValue) {
      filter.estimatedValue = {};
      if (minValue) filter.estimatedValue.$gte = Number(minValue);
      if (maxValue) filter.estimatedValue.$lte = Number(maxValue);
    }

    const sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      valueHigh: { estimatedValue: -1 },
      valueLow: { estimatedValue: 1 },
    };

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [listings, total] = await Promise.all([
      Listing.find(filter)
        .populate("owner", "fullName location city avatar swapCount")
        .sort(sortMap[sort] || sortMap.newest)
        .skip(skip)
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

export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "owner",
      "fullName location city avatar swapCount bio phone"
    );

    if (!listing || listing.status === "removed") {
      return res.status(404).json({ message: "Listing not found." });
    }

    const similar = await Listing.find({
      _id: { $ne: listing._id },
      status: "available",
      $or: [
        { category: listing.category },
        { location: new RegExp(listing.location, "i") },
      ],
    })
      .populate("owner", "fullName location")
      .limit(4);

    res.json({ listing, similar });
  } catch (error) {
    next(error);
  }
};

export const getMyListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({
      owner: req.user._id,
      status: { $ne: "removed" },
    }).sort({ createdAt: -1 });

    res.json({ listings });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing || listing.status === "removed") {
      return res.status(404).json({ message: "Listing not found." });
    }

    if (
      listing.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized." });
    }

    const fields = [
      "title",
      "description",
      "brand",
      "category",
      "customCategory",
      "size",
      "condition",
      "location",
      "city",
      "status",
      "estimatedValue",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) listing[field] = req.body[field];
    });

    if (req.files?.length) {
      listing.images = [
        ...listing.images,
        ...req.files.map((f) => `/uploads/${f.filename}`),
      ];
    }

    if (req.body.recalculateValue === "true" || req.body.recalculateValue === true) {
      listing.estimatedValue = calculateSwapValue({
        brand: listing.brand,
        condition: listing.condition,
        category: listing.category,
        customCategory: listing.customCategory,
      });
    }

    if (listing.category !== "Other") {
      listing.customCategory = "";
    } else if (!listing.customCategory?.trim()) {
      return res.status(400).json({
        message: "Please describe your category when selecting Other.",
      });
    }

    await listing.save();
    await listing.populate("owner", "fullName location city avatar");

    res.json({ message: "Listing updated", listing });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    if (
      listing.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized." });
    }

    listing.status = "removed";
    await listing.save();

    res.json({ message: "Listing removed." });
  } catch (error) {
    next(error);
  }
};

export const estimateValue = async (req, res) => {
  const { brand, condition, category, customCategory, compareValue } = req.body;

  if (!brand || !condition || !category) {
    return res
      .status(400)
      .json({ message: "Brand, condition, and category are required." });
  }

  const trimmedCustomCategory =
    typeof customCategory === "string" ? customCategory.trim() : "";

  if (category === "Other" && !trimmedCustomCategory) {
    return res.status(400).json({
      message: "Please describe your category when selecting Other.",
    });
  }

  const estimatedValue = calculateSwapValue({
    brand,
    condition,
    category,
    customCategory: trimmedCustomCategory,
  });
  const result = { estimatedValue };

  if (compareValue !== undefined) {
    result.comparison = compareSwapValues(Number(compareValue), estimatedValue);
  }

  res.json(result);
};

export const getNearbySuggestions = async (req, res, next) => {
  try {
    const location = req.query.location || req.user?.location || req.user?.city;

    if (!location) {
      return res.status(400).json({
        message: "Location is required. Update your profile or pass ?location=",
      });
    }

    const listings = await Listing.find({
      status: "available",
      owner: { $ne: req.user._id },
      $or: [
        { location: new RegExp(location, "i") },
        { city: new RegExp(location, "i") },
      ],
    })
      .populate("owner", "fullName location city avatar")
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ location, listings });
  } catch (error) {
    next(error);
  }
};
