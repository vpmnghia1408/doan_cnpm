"use client";

import { Send, Smile, Paperclip, Phone, Info } from "lucide-react";
import { useState } from "react";

interface ChatAreaProps {
  selectedChat: string | null;
  isDark: boolean;
}

const chatData: Record<string, any> = {
  "mai-le": {
    name: "Mai Lê",
    avatar: "👩",
    status: "Active 18h ago",
    messages: [
      {
        id: 1,
        sender: "Mai Lê",
        text: "Hey, how are you doing?",
        time: "Yesterday 4:50 PM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        text: "I'm doing great, thanks!",
        time: "Yesterday 4:50 PM",
        isOwn: true,
        status: "seen",
      },
      {
        id: 3,
        sender: "Mai Lê",
        text: "Want to grab coffee later?",
        time: "Yesterday 5:15 PM",
        isOwn: false,
      },
      {
        id: 4,
        sender: "You",
        text: "How about 3 PM?",
        time: "Yesterday 5:20 PM",
        isOwn: true,
        status: "seen",
      },
      {
        id: 5,
        sender: "Mai Lê",
        text: "Perfect! 😊",
        time: "Yesterday 5:21 PM",
        isOwn: false,
      },
    ],
  },
  "backend-dev": {
    name: "Backend Dev Team",
    avatar: "👨‍💻",
    status: "3 members",
    messages: [
      {
        id: 1,
        sender: "John",
        text: "Hey team, API is ready!",
        time: "Today 9:30 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        text: "Nice, testing now!",
        time: "Today 9:35 AM",
        isOwn: true,
        status: "seen",
      },
    ],
  },
  "frontend-dev": {
    name: "Frontend Dev Team",
    avatar: "👩‍💻",
    status: "3 members",
    messages: [
      {
        id: 1,
        sender: "Alex",
        text: "Design looks amazing!",
        time: "Today 8:00 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        text: "Thanks! Added responsive layout",
        time: "Today 8:15 AM",
        isOwn: true,
        status: "seen",
      },
    ],
  },
  "user-1": {
    name: "User One",
    avatar: "👤",
    status: "Active now",
    messages: [
      {
        id: 1,
        sender: "User One",
        text: "Hi! How's the project?",
        time: "Today 11:00 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        text: "Almost done!",
        time: "Today 11:05 AM",
        isOwn: true,
        status: "seen",
      },
    ],
  },
  "an-nguyen": {
    name: "An Nguyễn",
    avatar: "🅰️",
    status: "Active 2d ago",
    messages: [
      {
        id: 1,
        sender: "An Nguyễn",
        text: "Hey! Long time no talk",
        time: "2 days ago",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        text: "We should catch up soon!",
        time: "2 days ago",
        isOwn: true,
        status: "seen",
      },
    ],
  },
};

export default function ChatArea({ selectedChat, isDark }: ChatAreaProps) {
  const [message, setMessage] = useState("");
  const chat = selectedChat ? chatData[selectedChat] : null;

  const handleSend = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  if (!chat) {
    return (
      <div
        className={`flex-1 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        } flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <p
            className={`${isDark ? "text-gray-400" : "text-gray-500"} text-lg`}
          >
            Select a conversation to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      <div
        className={`${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        } border-b p-4 flex justify-between`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-lg">
            {chat.avatar}
          </div>
          <div>
            <p
              className={`font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {chat.name}
            </p>
            <p
              className={`text-xs ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {chat.status}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={`p-2 rounded-lg ${
              isDark
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Phone size={20} />
          </button>
          <button
            className={`p-2 rounded-lg ${
              isDark
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chat.messages.map((msg: any) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-xs">
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.isOwn
                    ? "bg-blue-600 text-white rounded-br-none"
                    : `${
                        isDark
                          ? "bg-gray-800 text-white border-gray-700"
                          : "bg-white text-gray-900 border-gray-200"
                      } border rounded-bl-none`
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              <div
                className={`flex items-center gap-2 mt-1 text-xs ${
                  msg.isOwn ? "justify-end" : "justify-start"
                } ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                <span>{msg.time}</span>
                {msg.status && (
                  <span className="text-blue-600 font-medium">
                    {msg.status}
                  </span>
                )}
              </div>
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
          <button
            className={`p-2 rounded-lg ${
              isDark
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Paperclip size={20} />
          </button>
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
            className={`p-2 rounded-lg ${
              isDark
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Smile size={20} />
          </button>
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
