"use client";

import { Settings, Moon, Sun, Bell, User } from "lucide-react";
import { useState } from "react";
import Logout from "@/components/auth/Logout";
interface SidebarProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

const groupChats = [
  {
    id: "backend-dev",
    name: "Backend Dev Team",
    members: 3,
    time: "3m",
    avatars: ["👨‍💻", "👩‍💻", "👨‍💼"],
  },
  {
    id: "frontend-dev",
    name: "Frontend Dev Team",
    members: 3,
    time: "18h",
    avatars: ["👨‍💻", "👩‍💻", "👨‍💼"],
  },
];

const friends = [
  {
    id: "user-1",
    name: "User One",
    status: "online",
    time: "0m",
    avatar: "👤",
  },
  {
    id: "mai-le",
    name: "Mai Lê",
    status: "offline",
    time: "18h",
    lastMessage: "See you later!",
    avatar: "👩",
  },
  {
    id: "an-nguyen",
    name: "An Nguyễn",
    status: "offline",
    time: "2d",
    avatar: "🅰️",
  },
];

export default function Sidebar({
  selectedChat,
  onSelectChat,
  isDark,
  onToggleDark,
  user,
}: SidebarProps & { user: any }) {
  const [showSettings, setShowSettings] = useState(false);
  console.log("Sidebar received user prop:", user);
  return (
    <div
      className={`w-80 flex flex-col border-r ${
        isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold">Messages</h1>
        <button
          onClick={onToggleDark}
          className={`p-2 rounded-lg ${
            isDark
              ? "hover:bg-gray-800 text-gray-400"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Groups */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xs uppercase text-gray-500 mb-2">Groups</h2>
          {groupChats.map((g) => (
            <div
              key={g.id}
              onClick={() => onSelectChat(g.id)}
              className={`p-3 rounded-lg cursor-pointer transition ${
                selectedChat === g.id
                  ? isDark
                    ? "bg-blue-900 border border-blue-700"
                    : "bg-blue-50 border border-blue-200"
                  : isDark
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between mb-2">
                <div className="flex -space-x-2">
                  {g.avatars.map((a, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-sm border-2 border-white"
                    >
                      {a}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-gray-500">{g.time}</span>
              </div>
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {g.name}
              </p>
              <p className="text-xs text-gray-500">{g.members} members</p>
            </div>
          ))}
        </div>

        {/* Friends */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-xs uppercase text-gray-500 mb-2">Friends</h2>
          {friends.map((f) => (
            <div
              key={f.id}
              onClick={() => onSelectChat(f.id)}
              className={`p-3 rounded-lg cursor-pointer transition ${
                selectedChat === f.id
                  ? isDark
                    ? "bg-blue-900 border border-blue-700"
                    : "bg-blue-50 border border-blue-200"
                  : isDark
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-lg border-2 border-white">
                      {f.avatar}
                    </div>
                    {f.status === "online" && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {f.name}
                    </p>
                    {f.lastMessage && (
                      <p className="text-xs text-gray-500">{f.lastMessage}</p>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-500">{f.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 relative">
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {user?.username || "Unknown"}
              </p>
              <p className="text-xs text-gray-500">
                @{user?.username || "user"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-1 rounded-lg ${
              isDark
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-200 text-gray-400"
            }`}
          >
            <Settings size={16} />
          </button>
        </div>

        {showSettings && (
          <div
            className={`absolute bottom-20 left-4 right-4 ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border rounded-lg shadow-lg`}
          >
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-700 dark:text-gray-200 border-b border-gray-700">
              <User size={16} /> Account Info
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-700 dark:text-gray-200 border-b border-gray-700">
              <Bell size={16} /> Notifications
            </button>
            <div className="px-4 py-3">
              <Logout />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
