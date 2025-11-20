"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { OverlayData } from "@/app/modules/ui-wrappers/types/IOverlayTypes";

interface LoginContentProps {
  onClose: () => void;
  data: OverlayData;
}

export const LoginContent: React.FC<LoginContentProps> = ({
  onClose,
  data,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login
    console.log("Login:", { email, password });
    close(); // Close modal after successful login
  };

  const handleSwitchToRegister = () => {
    close(); // Close login modal
    // onSwitchToRegister?.(); // Trigger register modal
  };

  return (
    <div className="relative">
      {/* Glowing accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl"></div>

      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-400 mb-8">
          Login to access your FutureCodex account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded" />
              Remember me
            </label>
            <a
              href="#"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-cyan-500/25"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={handleSwitchToRegister}
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};
