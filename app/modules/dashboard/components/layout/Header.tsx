"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import { NotificationDropdown } from "./NotificationDropdown";
import { UserAvatar } from "./UserAvatar";

interface HeaderProps {
  activeTab: string;
}

export function Header({ activeTab }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const titles: any = {
    dashboard: "Dashboard Overview",
    blogs: "My Blogs",
    analytics: "Analytics",
    profile: "Profile Settings",
    settings: "Settings",
  };

  return (
    <header className="bg-gray-800/30 backdrop-blur-xl border-b border-gray-700/50 px-8 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{titles[activeTab]}</h2>
          <p className="text-gray-400 text-sm mt-1">Welcome back, Sarah!</p>
        </div>
        <div className="flex items-center gap-4">
          <NotificationDropdown
            show={showNotifications}
            onToggle={() => setShowNotifications(!showNotifications)}
          />
          <UserAvatar name="Sarah Chen" role="Author" />
        </div>
      </div>
    </header>
  );
}
