// sockets/chatSocket.js
import Message from "../models/Message.js";

const onlineUsers = new Map();

export const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 user connected:", socket.id);

    // Khi người dùng join vào 1 "phòng chat" cụ thể
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`📥 user ${socket.id} joined room ${roomId}`);
    });

    // Khi người dùng gửi tin nhắn
    socket.on("send_message", (data) => {
      console.log("💬 message received:", data);

      // Phát tin nhắn đến tất cả người khác trong cùng phòng (trừ người gửi)
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 user disconnected:", socket.id);
    });
  });
};
