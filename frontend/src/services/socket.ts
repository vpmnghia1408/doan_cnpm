// src/services/socket.ts
import { io } from "socket.io-client";

// ⚠️ thay URL thành backend của bạn (VD: http://localhost:5000)
export const socket = io("http://localhost:5001", {
  transports: ["websocket"],
});
