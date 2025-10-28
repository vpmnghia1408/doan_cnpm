import { useState, useEffect } from "react";
import Sidebar from "@/components/SideBar";
import ChatArea from "@/components/ChatArea";
import { useAuthStore } from "@/stores/useAuthStore";

const ChatAppPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>("mai-le");
  const [isDark, setIsDark] = useState(false);

  const user = useAuthStore((s) => s.user);
  console.log("Home user:", user);

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
        user={user}
      />
      <ChatArea selectedChat={selectedChat} isDark={isDark} />
    </div>
  );
};

export default ChatAppPage;
