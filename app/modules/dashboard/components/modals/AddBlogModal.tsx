"use client";

import { useState } from "react";
import { X, Save, Upload } from "lucide-react";

interface AddBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: { title: string; content: string; category: string }) => void;
}

export function AddBlogModal({ isOpen, onClose, onSave }: AddBlogModalProps) {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave?.({
      title: blogTitle,
      content: blogContent,
      category: blogCategory,
    });
    setBlogTitle("");
    setBlogContent("");
    setBlogCategory("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl"></div>

        <div className="relative z-10 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Create New Blog Post
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-5">
            {/* Blog Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Blog Title
              </label>
              <input
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder="Enter your blog title..."
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Category
              </label>
              <select
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white"
              >
                <option value="">Select a category</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="web3">Blockchain & Web3</option>
                <option value="cloud">Cloud Computing</option>
                <option value="webdev">Web Development</option>
              </select>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                placeholder="Write your blog content here..."
                rows={10}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder-gray-500 resize-none"
              ></textarea>
            </div>

            {/* Featured Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Featured Image
              </label>
              <div className="border-2 border-dashed border-gray-700/50 rounded-xl p-8 text-center hover:border-cyan-500/50 transition-all cursor-pointer">
                <Upload className="mx-auto mb-3 text-gray-400" size={32} />
                <p className="text-gray-400 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:scale-105 transition-all shadow-lg shadow-cyan-500/25 font-semibold"
              >
                <Save size={20} />
                Publish Blog
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-all font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
