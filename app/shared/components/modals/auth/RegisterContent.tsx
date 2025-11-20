"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { OverlayData } from "@/app/modules/ui-wrappers/types/IOverlayTypes";

interface RegisterContentProps {
  onClose: () => void;
  data: OverlayData;
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  onClose,
  data,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    // Handle registration
    console.log("Register:", { name, email, password });
    onClose(); // Close modal after successful registration
  };

  const handleSwitchToLogin = () => {
    onClose(); // Close register modal
    // onSwitchToLogin?.(); // Trigger login modal
  };

  return (
    <div className="relative">
      {/* Glowing accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/20 to-transparent blur-3xl"></div>

      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Join FutureCodex
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-400 mb-8">
          Create your account and start exploring
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
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
              placeholder="Create a strong password"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
              required
              minLength={8}
            />
          </div>

          <div className="text-sm">
            <label className="flex items-start text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mr-2 mt-1 rounded"
                required
              />
              <span>
                I agree to the{" "}
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300"
                  onClick={(e) => e.preventDefault()}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300"
                  onClick={(e) => e.preventDefault()}
                >
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-purple-500/25"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <button
            onClick={handleSwitchToLogin}
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};
