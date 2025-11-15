"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";
import { ParallaxElement } from "@/app/shared/components/animations/ParallaxElement";
import { useScrollPosition } from "@/app/shared/hooks/useScrollPosition";
import { ArrowLeft, Settings, Play, RotateCcw } from "lucide-react";
import "../../../styles/animations.css";
type Direction = "up" | "down" | "left" | "right" | "scale" | "none";
type Delay = "none" | "short" | "medium" | "long";

export default function InteractiveDemoPage() {
  const scrollY = useScrollPosition({ throttle: 16 });
  const [selectedDirection, setSelectedDirection] = useState<Direction>("up");
  const [selectedDelay, setSelectedDelay] = useState<Delay>("short");
  const [threshold, setThreshold] = useState(0.2);
  const [key, setKey] = useState(0);

  const resetAnimation = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Interactive Demo
            </h1>
            <div className="flex gap-4">
              <Link
                href="/demo/animations"
                className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
              >
                ← Showcase
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft size={16} />
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Control Panel */}
          <div className="space-y-6">
            <FadeInOnScroll direction="right" delay="short">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-6">
                  <Settings className="text-cyan-400" size={24} />
                  <h2 className="text-2xl font-bold">Animation Controls</h2>
                </div>

                {/* Direction Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3 text-gray-300">
                    Direction
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        "up",
                        "down",
                        "left",
                        "right",
                        "scale",
                        "none",
                      ] as Direction[]
                    ).map((dir) => (
                      <button
                        key={dir}
                        onClick={() => setSelectedDirection(dir)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedDirection === dir
                            ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                            : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {dir}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delay Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3 text-gray-300">
                    Delay
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["none", "short", "medium", "long"] as Delay[]).map(
                      (del) => (
                        <button
                          key={del}
                          onClick={() => setSelectedDelay(del)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            selectedDelay === del
                              ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                              : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          {del}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Threshold Slider */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3 text-gray-300">
                    Threshold: {threshold.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Controls when animation triggers (0 = top, 1 = fully
                    visible)
                  </p>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetAnimation}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg font-semibold transition-all"
                >
                  <RotateCcw size={18} />
                  Reset Animation
                </button>

                {/* Code Display */}
                <div className="mt-6 bg-gray-900/70 rounded-xl p-4 border border-gray-700/50">
                  <p className="text-xs text-gray-400 mb-2">Current Code:</p>
                  <pre className="text-xs overflow-x-auto">
                    <code className="text-cyan-400">
                      {`<FadeInOnScroll
  direction="${selectedDirection}"
  delay="${selectedDelay}"
  threshold={${threshold}}
>
  <YourComponent />
</FadeInOnScroll>`}
                    </code>
                  </pre>
                </div>
              </div>
            </FadeInOnScroll>

            {/* Info Cards */}
            <FadeInOnScroll direction="right" delay="medium">
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-500/20">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <Play className="text-cyan-400" size={18} />
                  How to Test
                </h3>
                <p className="text-sm text-gray-400">
                  Scroll down to see the animation in action. Adjust the
                  controls and click "Reset Animation" to see changes.
                </p>
              </div>
            </FadeInOnScroll>
          </div>

          {/* Preview Area */}
          <div className="space-y-6">
            <FadeInOnScroll direction="left" delay="short">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-8">
                    Scroll down to see the animation
                  </p>
                  <div className="h-[400px]" />

                  {/* Animated Preview Element */}
                  <FadeInOnScroll
                    key={key}
                    direction={selectedDirection}
                    delay={selectedDelay}
                    threshold={threshold}
                  >
                    <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl p-12 border border-cyan-500/30 backdrop-blur-sm">
                      <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                        <Play className="text-white" size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        Animated Element
                      </h3>
                      <p className="text-gray-400">
                        Direction:{" "}
                        <span className="text-cyan-400">
                          {selectedDirection}
                        </span>
                        <br />
                        Delay:{" "}
                        <span className="text-purple-400">{selectedDelay}</span>
                      </p>
                    </div>
                  </FadeInOnScroll>

                  <div className="h-[400px]" />
                </div>
              </div>
            </FadeInOnScroll>

            {/* Multiple Elements Demo */}
            <FadeInOnScroll direction="left" delay="medium">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-6 text-center">
                  Staggered Animation Example
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((num) => (
                    <FadeInOnScroll
                      key={`${key}-${num}`}
                      direction={selectedDirection}
                      delay={
                        num === 1 ? "short" : num === 2 ? "medium" : "long"
                      }
                      threshold={0.5}
                    >
                      <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50">
                        <p className="text-sm">
                          Element {num} - Staggered with{" "}
                          {num === 1 ? "short" : num === 2 ? "medium" : "long"}{" "}
                          delay
                        </p>
                      </div>
                    </FadeInOnScroll>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>

        {/* Parallax Demo Section */}
        <div className="mt-12">
          <FadeInOnScroll direction="up" delay="short">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Parallax Scroll Demo
              </h2>
              <div className="relative h-96 bg-gray-900/50 rounded-xl overflow-hidden">
                <ParallaxElement
                  scrollY={scrollY}
                  speed={0.2}
                  className="absolute left-1/4 top-20"
                >
                  <div className="w-20 h-20 bg-cyan-500/30 rounded-2xl backdrop-blur-sm border border-cyan-500/50" />
                </ParallaxElement>
                <ParallaxElement
                  scrollY={scrollY}
                  speed={0.1}
                  className="absolute right-1/4 top-40"
                >
                  <div className="w-16 h-16 bg-purple-500/30 rounded-2xl backdrop-blur-sm border border-purple-500/50" />
                </ParallaxElement>
                <ParallaxElement
                  scrollY={scrollY}
                  speed={0.15}
                  className="absolute left-1/3 bottom-20"
                >
                  <div className="w-24 h-24 bg-pink-500/30 rounded-2xl backdrop-blur-sm border border-pink-500/50" />
                </ParallaxElement>
              </div>
              <p className="text-center text-sm text-gray-400 mt-4">
                Scroll to see elements move at different speeds
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </div>
  );
}
