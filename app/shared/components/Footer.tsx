"use client";

import React, { useState } from "react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing:", email);
  };

  return (
    <footer className="relative z-10 mt-20 overflow-hidden">
      {/* Futuristic Divider */}
      <div className="relative h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

      <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-900 backdrop-blur-xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Newsletter Section */}
          <div className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 sm:p-12 border border-cyan-500/20 backdrop-blur-sm overflow-hidden">
                {/* Glowing Corner Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/30 to-transparent blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/30 to-transparent blur-2xl"></div>

                <div className="relative z-10 text-center">
                  <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-cyan-400 text-sm font-semibold">
                      Newsletter
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    Stay Ahead of the{" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Curve
                    </span>
                  </h3>
                  <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Join 50,000+ developers and tech enthusiasts. Get weekly
                    insights on AI breakthroughs, Web3 innovations, cloud
                    architecture, and modern development practices delivered
                    straight to your inbox.
                  </p>
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-6 py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-500"
                    />
                    <button
                      type="submit"
                      className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                    >
                      <span className="relative z-10">Subscribe Now</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Main Content - Futuristic Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Brand Section */}
            <div className="relative group">
              <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-cyan-500/50 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    FutureCodex
                  </h4>
                  <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-4"></div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Empowering developers and tech enthusiasts with cutting-edge
                    insights and innovations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        name: "Twitter",
                        icon: "𝕏",
                        url: "https://twitter.com/FutureCodex",
                      },
                      {
                        name: "GitHub",
                        icon: "⚡",
                        url: "https://github.com/FutureCodex",
                      },
                      {
                        name: "LinkedIn",
                        icon: "💼",
                        url: "https://linkedin.com/company/FutureCodex",
                      },
                      {
                        name: "Discord",
                        icon: "💬",
                        url: "https://discord.gg/FutureCodex",
                      },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social relative w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center hover:border-cyan-500/50 hover:scale-110 transition-all duration-300 overflow-hidden"
                        title={social.name}
                      >
                        <span className="relative z-10 text-lg">
                          {social.icon}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"></div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Explore Section */}
            <div className="relative group">
              <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-cyan-500/50 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="text-cyan-400">→</span> Explore
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      {
                        name: "Blog Articles",
                        url: "https://FutureCodex.blog",
                      },
                      {
                        name: "Our Authors",
                        url: "https://FutureCodex.blog/authors",
                      },
                      {
                        name: "Browse Topics",
                        url: "https://FutureCodex.blog/topics",
                      },
                      {
                        name: "Trending Posts",
                        url: "https://FutureCodex.blog/trending",
                      },
                      {
                        name: "Archives",
                        url: "https://FutureCodex.blog/archive",
                      },
                    ].map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.url}
                          className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group/link"
                        >
                          <span className="w-1 h-1 rounded-full bg-cyan-500/50 group-hover/link:bg-cyan-500"></span>
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Community Section */}
            <div className="relative group">
              <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="text-purple-400">→</span> Community
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      {
                        name: "Write for Us",
                        url: "https://FutureCodex.blog/contribute",
                      },
                      {
                        name: "Join Community",
                        url: "https://FutureCodex.blog/community",
                      },
                      {
                        name: "Events & Meetups",
                        url: "https://FutureCodex.blog/events",
                      },
                      {
                        name: "Newsletter Archive",
                        url: "https://FutureCodex.blog/newsletter",
                      },
                      {
                        name: "Support Us",
                        url: "https://FutureCodex.blog/support",
                      },
                    ].map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.url}
                          className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm flex items-center gap-2 group/link"
                        >
                          <span className="w-1 h-1 rounded-full bg-purple-500/50 group-hover/link:bg-purple-500"></span>
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Company Section */}
            <div className="relative group">
              <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-pink-500/50 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="text-pink-400">→</span> Company
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      {
                        name: "About FutureCodex",
                        url: "https://FutureCodex.blog/about",
                      },
                      {
                        name: "Our Team",
                        url: "https://FutureCodex.blog/team",
                      },
                      {
                        name: "Careers",
                        url: "https://FutureCodex.blog/careers",
                      },
                      {
                        name: "Contact Us",
                        url: "https://FutureCodex.blog/contact",
                      },
                      {
                        name: "Media Kit",
                        url: "https://FutureCodex.blog/media-kit",
                      },
                    ].map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.url}
                          className="text-gray-400 hover:text-pink-400 transition-colors duration-300 text-sm flex items-center gap-2 group/link"
                        >
                          <span className="w-1 h-1 rounded-full bg-pink-500/50 group-hover/link:bg-pink-500"></span>
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Futuristic */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent h-px"></div>
            <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
                <p className="text-center sm:text-left">
                  © 2025{" "}
                  <span className="text-cyan-400 font-semibold">
                    FutureCodex
                  </span>
                  . All rights reserved.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://FutureCodex.blog/privacy"
                    className="hover:text-cyan-400 transition-colors duration-300"
                  >
                    Privacy
                  </a>
                  <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                  <a
                    href="https://FutureCodex.blog/terms"
                    className="hover:text-cyan-400 transition-colors duration-300"
                  >
                    Terms
                  </a>
                  <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                  <a
                    href="https://FutureCodex.blog/cookies"
                    className="hover:text-cyan-400 transition-colors duration-300"
                  >
                    Cookies
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Crafted with</span>
                <span className="text-pink-500 animate-pulse">♥</span>
                <span>by the FutureCodex Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
