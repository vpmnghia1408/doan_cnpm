"use client";

import { Send, Smile, Paperclip, Phone, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { socket } from "@/services/socket";

interface ChatAreaProps {
  selectedChat: string | null;
  isDark: boolean;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isOwn: boolean;
  status?: string;
}

export default function ChatArea({ selectedChat, isDark }: ChatAreaProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // ✅ Khi chọn chat mới, reset tin nhắn
  useEffect(() => {
    if (selectedChat) {
      socket.emit("join_room", selectedChat);
      setMessages([]);
    }
  }, [selectedChat]);

  // ✅ Lắng nghe tin nhắn từ server
  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSend = () => {
    if (!message.trim() || !selectedChat) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString(),
      isOwn: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    socket.emit("send_message", { room: selectedChat, ...newMsg });
    setMessage("");
  };

  if (!selectedChat) {
    return (
      <div
        className={`flex-1 flex items-center justify-center ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <p className="text-gray-400">
          Select a conversation to start messaging
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                msg.isOwn
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white border border-gray-200 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs text-gray-400">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        className={`${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        } border-t p-4`}
      >
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className={`flex-1 rounded-lg px-4 py-2 text-sm border focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-200 text-gray-900"
            }`}
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
