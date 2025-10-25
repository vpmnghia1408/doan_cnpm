"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/SideBar/index";
import ChatArea from "@/components/ChatArea/index";

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<string | null>("mai-le");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />
      <ChatArea selectedChat={selectedChat} isDark={isDark} />
    </div>
  );
}
