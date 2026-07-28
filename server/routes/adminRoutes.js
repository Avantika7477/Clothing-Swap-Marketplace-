import express from "express";
import {
  getAnalytics,
  getUsers,
  toggleUserStatus,
  getAllListings,
  removeListing,
  getAllSwaps,
  resolveDispute,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/analytics", getAnalytics);
router.get("/users", getUsers);
router.put("/users/:id/toggle", toggleUserStatus);
router.get("/listings", getAllListings);
router.delete("/listings/:id", removeListing);
router.get("/swaps", getAllSwaps);
router.put("/swaps/:id/resolve", resolveDispute);

export default router;
