import express from "express";
import {
  createSwapRequest,
  getMySwaps,
  getSwapById,
  respondToSwap,
  completeSwap,
  cancelSwap,
} from "../controllers/swapController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", createSwapRequest);
router.get("/", getMySwaps);
router.get("/:id", getSwapById);
router.put("/:id/respond", respondToSwap);
router.put("/:id/complete", completeSwap);
router.put("/:id/cancel", cancelSwap);

export default router;
