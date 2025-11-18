"use client";

import { useState } from "react";
import { Header } from "@/app/modules/dashboard/components/layout/Header";
import { Sidebar } from "@/app/modules/dashboard/components/layout/Sidebar";
import { AddBlogModal } from "@/app/modules/dashboard/components/modals/AddBlogModal";
import { EditProfileModal } from "@/app/modules/dashboard/components/modals/EditProfileModal";
import { DashboardView } from "@/app/modules/dashboard/components/views/DashboardView";
import { BlogsView } from "@/app/modules/dashboard/components/views/BlogsView";
import { AnalyticsView } from "@/app/modules/dashboard/components/views/AnalyticsView";
import { ProfileView } from "@/app/modules/dashboard/components/views/ProfileView";
import { SettingsView } from "@/app/modules/dashboard/components/views/SettingsView";

export default function DashboardPage() {
  // Tab state
  const [activeTab, setActiveTab] = useState("dashboard");

  // Modal states
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Profile data
  const [profileName, setProfileName] = useState("Sarah Chen");
  const [profileEmail, setProfileEmail] = useState(
    "sarah.chen@FutureCodex.com"
  );
  const [profileBio, setProfileBio] = useState("Tech writer & AI enthusiast");

  // Handler for saving blog
  const handleSaveBlog = (data: {
    title: string;
    content: string;
    category: string;
  }) => {
    console.log("New blog saved:", data);
    // Add your blog save logic here
    setShowAddBlog(false);
  };

  // Handler for saving profile
  const handleSaveProfile = (data: {
    name: string;
    email: string;
    bio: string;
  }) => {
    setProfileName(data.name);
    setProfileEmail(data.email);
    setProfileBio(data.bio);
    console.log("Profile updated:", data);
    setShowEditProfile(false);
  };

  return (
    <div className="flex h-screen relative z-10">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <Header activeTab={activeTab} />

        {/* Content Views */}
        <div className="p-8">
          {activeTab === "dashboard" && (
            <DashboardView onNewBlog={() => setShowAddBlog(true)} />
          )}

          {activeTab === "blogs" && (
            <BlogsView onNewBlog={() => setShowAddBlog(true)} />
          )}

          {activeTab === "analytics" && <AnalyticsView />}

          {activeTab === "profile" && (
            <ProfileView
              name={profileName}
              email={profileEmail}
              bio={profileBio}
              onEditProfile={() => setShowEditProfile(true)}
            />
          )}

          {activeTab === "settings" && <SettingsView />}
        </div>
      </main>

      {/* Modals */}
      <AddBlogModal
        isOpen={showAddBlog}
        onClose={() => setShowAddBlog(false)}
        onSave={handleSaveBlog}
      />

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        initialName={profileName}
        initialEmail={profileEmail}
        initialBio={profileBio}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
