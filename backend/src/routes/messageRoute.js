import express from "express";
import { protectedRoute } from "../middlewares/authMiddleware.js";
import { getMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

// lấy lịch sử tin nhắn giữa 2 người
router.get("/:receiverId", protectedRoute, getMessages);

// gửi tin nhắn mới
router.post("/", protectedRoute, sendMessage);

export default router;
