"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About", "Categories", "Contact"];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isVisible ? "animate-slide-in-top" : ""
      } ${
        scrolled
          ? "bg-gray-900/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Scale Animation */}
          <div
            className={`text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent transition-all duration-700 ${
              isVisible ? "animate-fade-in-scale" : "opacity-0"
            }`}
          >
            FutureCodex
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group ${
                  isVisible ? "animate-fade-in-down" : "opacity-0"
                }`}
                style={{ animationDelay: `${200 + index * 75}ms` }}
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 ml-4">
              <button
                onClick={onLoginClick}
                className={`px-5 py-2 text-cyan-400 border border-cyan-500/50 rounded-full hover:bg-cyan-500/10 hover:scale-105 transition-all duration-300 ${
                  isVisible ? "animate-fade-in-down delay-400" : "opacity-0"
                }`}
              >
                Login
              </button>
              <button
                onClick={onRegisterClick}
                className={`px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 ${
                  isVisible ? "animate-fade-in-down delay-500" : "opacity-0"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50 hover:scale-110 transition-all duration-300 ${
              isVisible ? "animate-fade-in-scale delay-300" : "opacity-0"
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-cyan-500/20 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link, index) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`block text-gray-300 hover:text-cyan-400 hover:translate-x-2 transition-all duration-300 py-2 ${
                isMenuOpen ? "animate-fade-in-right" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <div className="pt-4 space-y-3">
            <button
              onClick={() => {
                onLoginClick();
                setIsMenuOpen(false);
              }}
              className={`w-full px-5 py-3 text-cyan-400 border border-cyan-500/50 rounded-full hover:bg-cyan-500/10 transition-all duration-300 ${
                isMenuOpen ? "animate-fade-in-up delay-200" : "opacity-0"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                onRegisterClick();
                setIsMenuOpen(false);
              }}
              className={`w-full px-5 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:scale-105 transition-all duration-300 ${
                isMenuOpen ? "animate-fade-in-up delay-300" : "opacity-0"
              }`}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
