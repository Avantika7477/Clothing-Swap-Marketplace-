import mongoose from "mongoose";

const swapRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestedItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    offeredItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    message: {
      type: String,
      default: "",
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "negotiating",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
    valueComparison: {
      requestedValue: Number,
      offeredValue: Number,
      difference: Number,
      percentDiff: Number,
      isFair: Boolean,
      suggestion: String,
    },
    exchangeMethod: {
      type: String,
      enum: ["local", "courier", "undecided"],
      default: "undecided",
    },
  },
  { timestamps: true }
);

swapRequestSchema.index({ requester: 1, status: 1 });
swapRequestSchema.index({ owner: 1, status: 1 });

const SwapRequest = mongoose.model("SwapRequest", swapRequestSchema);
export default SwapRequest;
