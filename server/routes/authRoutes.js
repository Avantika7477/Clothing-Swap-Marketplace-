import express from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  getUserById,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/profile", protect, upload.single("avatar"), updateProfile);
router.put("/change-password", protect, changePassword);
router.get("/users/:id", getUserById);

export default router;
