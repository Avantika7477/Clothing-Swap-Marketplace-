import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      default: "",
      maxlength: 2000,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Jackets",
        "Hoodies",
        "Shirts",
        "T-Shirts",
        "Dresses",
        "Shoes",
        "Pants",
        "Jeans",
        "Sweaters",
        "Accessories",
        "Other",
      ],
    },
    customCategory: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "",
    },
    size: {
      type: String,
      required: [true, "Size is required"],
      trim: true,
    },
    condition: {
      type: String,
      required: [true, "Condition is required"],
      enum: ["Like New", "Excellent", "Good", "Fair", "Worn"],
    },
    estimatedValue: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one image is required",
      },
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    city: {
      type: String,
      default: "",
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "pending", "swapped", "removed"],
      default: "available",
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

listingSchema.index({ title: "text", brand: "text", description: "text" });
listingSchema.index({ location: 1, category: 1, status: 1 });

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
