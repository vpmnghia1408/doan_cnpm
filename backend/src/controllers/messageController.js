// @ts-nocheck
import Message from "../models/Message.js";

// lấy lịch sử tin nhắn giữa 2 người
export const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: req.user._id, receiverId },
        { senderId: receiverId, receiverId: req.user._id },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử tin nhắn:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// gửi tin nhắn mới
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content, imgUrl } = req.body;

    if (!receiverId || (!content && !imgUrl)) {
      return res.status(400).json({ message: "Thiếu dữ liệu tin nhắn." });
    }

    const newMessage = await Message.create({
      senderId: req.user._id,
      receiverId,
      content,
      imgUrl,
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
