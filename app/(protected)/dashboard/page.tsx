"use client";

import { Header } from "@/app/modules/dashboard/components/layout/Header";
import { Sidebar } from "@/app/modules/dashboard/components/layout/Sidebar";
import { AddBlogModal } from "@/app/modules/dashboard/components/modals/AddBlogModal";
import { BlogsView } from "@/app/modules/dashboard/components/views/BlogsView";
import { DashboardView } from "@/app/modules/dashboard/components/views/DashboardView";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddBlog, setShowAddBlog] = useState(false);

  return (
    <div className="flex h-screen relative z-10">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <Header activeTab={activeTab} />
        <div className="p-8">
          {activeTab === "dashboard" && (
            <DashboardView onNewBlog={() => setShowAddBlog(true)} />
          )}
          {activeTab === "blogs" && (
            <BlogsView onNewBlog={() => setShowAddBlog(true)} />
          )}
        </div>
      </main>
      <AddBlogModal
        isOpen={showAddBlog}
        onClose={() => setShowAddBlog(false)}
      />
    </div>
  );
}
