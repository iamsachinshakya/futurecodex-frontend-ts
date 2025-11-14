"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              TechNova
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-4">
            Where Innovation Meets Tomorrow
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Discover the latest in AI, Web3, Cloud Computing, and cutting-edge
            development. Join thousands of tech enthusiasts exploring the future
            of technology.
          </p>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
            <span className="relative z-10 flex items-center gap-2">
              Read Latest Posts
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-cyan-500/30 rounded-lg rotate-45 animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-purple-500/30 rounded-full animate-float delay-1000"></div>
    </section>
  );
};

export default Hero;
