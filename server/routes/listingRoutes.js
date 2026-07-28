import express from "express";
import {
  createListing,
  getListings,
  getListingById,
  getMyListings,
  updateListing,
  deleteListing,
  estimateValue,
  getNearbySuggestions,
} from "../controllers/listingController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getListings);
router.get("/mine", protect, getMyListings);
router.get("/nearby", protect, getNearbySuggestions);
router.post("/estimate-value", estimateValue);
router.get("/:id", getListingById);
router.post("/", protect, upload.array("images", 5), createListing);
router.put("/:id", protect, upload.array("images", 5), updateListing);
router.delete("/:id", protect, deleteListing);

export default router;
