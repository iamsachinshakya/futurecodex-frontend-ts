"use client";

import { Edit, Eye, Users, Heart } from "lucide-react";

interface ProfileViewProps {
  name: string;
  email: string;
  bio: string;
  onEditProfile: () => void;
}

export function ProfileView({
  name,
  email,
  bio,
  onEditProfile,
}: ProfileViewProps) {
  const stats = [
    {
      icon: <Eye size={24} />,
      value: "124.5K",
      label: "Total Views",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Users size={24} />,
      value: "8.2K",
      label: "Followers",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Heart size={24} />,
      value: "45.8K",
      label: "Total Likes",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <div className="flex items-start gap-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-4xl font-bold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{name}</h3>
            <p className="text-gray-400 mb-4">{email}</p>
            <p className="text-gray-300 mb-4">{bio}</p>
            <button
              onClick={onEditProfile}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/25"
            >
              <Edit size={20} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center"
          >
            <div
              className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4`}
            >
              {stat.icon}
            </div>
            <h4 className="text-3xl font-bold mb-2">{stat.value}</h4>
            <p className="text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
