import express from "express";
import {
  getMessages,
  sendMessage,
  getConversations,
} from "../controllers/chatController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/conversations", getConversations);
router.get("/:swapId", getMessages);
router.post("/:swapId", sendMessage);

export default router;
