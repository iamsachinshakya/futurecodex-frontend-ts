"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Zap,
  Layers,
  Move,
} from "lucide-react";
import "../../../styles/animations.css";
import { useScrollPosition } from "@/app/shared/hooks/useScrollPosition";
import { ParallaxElement } from "@/app/shared/components/animations/ParallaxElement";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";

export default function AnimationsShowcasePage() {
  const scrollY = useScrollPosition({ throttle: 16 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Animation Showcase
            </h1>
            <div className="flex gap-4">
              <Link
                href="/demo/interactive"
                className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Interactive Demo →
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

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <ParallaxElement scrollY={scrollY} speed={0.1}>
            <FadeInOnScroll direction="scale" delay="none">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <Sparkles size={16} className="text-cyan-400" />
                <span className="text-sm text-cyan-400">
                  Explore All Animations
                </span>
              </div>
            </FadeInOnScroll>
          </ParallaxElement>

          <FadeInOnScroll direction="up" delay="short">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Animation Library
              </span>
            </h1>
          </FadeInOnScroll>

          <FadeInOnScroll direction="up" delay="medium">
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Complete collection of production-ready animations for Next.js 16
            </p>
          </FadeInOnScroll>
        </div>

        {/* Floating background elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 border border-cyan-500/20 rounded-lg rotate-45 animate-float-slow" />
        <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-purple-500/20 rounded-full animate-float-slow-delayed" />
      </section>

      {/* Direction Animations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeInOnScroll direction="up" delay="short">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Move className="text-cyan-400" size={24} />
                <h2 className="text-3xl font-bold">Directional Animations</h2>
              </div>
              <p className="text-gray-400">
                Elements can fade in from any direction
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fade Up */}
            <FadeInOnScroll direction="up" delay="short" threshold={0.3}>
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl mb-4 flex items-center justify-center">
                  <ChevronRight className="rotate-[-90deg]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fade Up</h3>
                <p className="text-gray-400 text-sm">
                  Element slides up from bottom with fade effect
                </p>
                <code className="text-xs text-cyan-400 mt-2 block">
                  direction="up"
                </code>
              </div>
            </FadeInOnScroll>

            {/* Fade Down */}
            <FadeInOnScroll direction="down" delay="short" threshold={0.3}>
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4 flex items-center justify-center">
                  <ChevronRight className="rotate-90" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fade Down</h3>
                <p className="text-gray-400 text-sm">
                  Element slides down from top with fade effect
                </p>
                <code className="text-xs text-cyan-400 mt-2 block">
                  direction="down"
                </code>
              </div>
            </FadeInOnScroll>

            {/* Fade Left */}
            <FadeInOnScroll direction="left" delay="short" threshold={0.3}>
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl mb-4 flex items-center justify-center">
                  <ChevronRight className="rotate-180" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fade Left</h3>
                <p className="text-gray-400 text-sm">
                  Element slides from right to left with fade
                </p>
                <code className="text-xs text-cyan-400 mt-2 block">
                  direction="left"
                </code>
              </div>
            </FadeInOnScroll>

            {/* Fade Right */}
            <FadeInOnScroll direction="right" delay="medium" threshold={0.3}>
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl mb-4 flex items-center justify-center">
                  <ChevronRight />
                </div>
                <h3 className="text-xl font-bold mb-2">Fade Right</h3>
                <p className="text-gray-400 text-sm">
                  Element slides from left to right with fade
                </p>
                <code className="text-xs text-cyan-400 mt-2 block">
                  direction="right"
                </code>
              </div>
            </FadeInOnScroll>

            {/* Scale */}
            <FadeInOnScroll direction="scale" delay="medium" threshold={0.3}>
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mb-4 flex items-center justify-center">
                  <Layers />
                </div>
                <h3 className="text-xl font-bold mb-2">Scale</h3>
                <p className="text-gray-400 text-sm">
                  Element scales up from center with fade
                </p>
                <code className="text-xs text-cyan-400 mt-2 block">
                  direction="scale"
                </code>
              </div>
            </FadeInOnScroll>

            {/* None (Fade Only) */}
            <FadeInOnScroll direction="none" delay="medium" threshold={0.3}>
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mb-4 flex items-center justify-center">
                  <Sparkles />
                </div>
                <h3 className="text-xl font-bold mb-2">Fade Only</h3>
                <p className="text-gray-400 text-sm">
                  Simple opacity fade without movement
                </p>
                <code className="text-xs text-cyan-400 mt-2 block">
                  direction="none"
                </code>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Delay Variations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInOnScroll direction="up" delay="short">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Zap className="text-cyan-400" size={24} />
                <h2 className="text-3xl font-bold">Animation Delays</h2>
              </div>
              <p className="text-gray-400">
                Control timing for staggered effects
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeInOnScroll direction="up" delay="none" threshold={0.3}>
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-500/30">
                <h3 className="text-lg font-bold mb-2">No Delay</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Immediate animation
                </p>
                <code className="text-xs text-cyan-400">delay="none"</code>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll direction="up" delay="short" threshold={0.3}>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-bold mb-2">Short Delay</h3>
                <p className="text-gray-400 text-sm mb-3">0.2s delay</p>
                <code className="text-xs text-cyan-400">delay="short"</code>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll direction="up" delay="medium" threshold={0.3}>
              <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl p-6 border border-violet-500/30">
                <h3 className="text-lg font-bold mb-2">Medium Delay</h3>
                <p className="text-gray-400 text-sm mb-3">0.4s delay</p>
                <code className="text-xs text-cyan-400">delay="medium"</code>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll direction="up" delay="long" threshold={0.3}>
              <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl p-6 border border-pink-500/30">
                <h3 className="text-lg font-bold mb-2">Long Delay</h3>
                <p className="text-gray-400 text-sm mb-3">0.6s delay</p>
                <code className="text-xs text-cyan-400">delay="long"</code>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Parallax Demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeInOnScroll direction="up" delay="short">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Parallax Scrolling</h2>
              <p className="text-gray-400">
                Elements move at different speeds based on scroll
              </p>
            </div>
          </FadeInOnScroll>

          <div className="relative h-96 flex items-center justify-center">
            <ParallaxElement
              scrollY={scrollY}
              speed={0.3}
              className="absolute"
              style={{ top: "20%" }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-3xl backdrop-blur-sm border border-cyan-500/50 flex items-center justify-center">
                <span className="text-xs text-cyan-400">speed: 0.3</span>
              </div>
            </ParallaxElement>

            <ParallaxElement
              scrollY={scrollY}
              speed={0.15}
              className="absolute"
              style={{ top: "40%" }}
            >
              <div className="w-40 h-40 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl backdrop-blur-sm border border-purple-500/50 flex items-center justify-center">
                <span className="text-xs text-purple-400">speed: 0.15</span>
              </div>
            </ParallaxElement>

            <ParallaxElement
              scrollY={scrollY}
              speed={0.05}
              className="absolute"
              style={{ top: "60%" }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500/30 to-rose-500/30 rounded-3xl backdrop-blur-sm border border-pink-500/50 flex items-center justify-center">
                <span className="text-xs text-pink-400">speed: 0.05</span>
              </div>
            </ParallaxElement>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeInOnScroll direction="up" delay="short">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Usage Examples</h2>
              <p className="text-gray-400">How to implement these animations</p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll direction="up" delay="medium">
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50 overflow-x-auto">
              <pre className="text-sm">
                <code className="text-cyan-400">{`// Basic usage
<FadeInOnScroll direction="up" delay="short">
  <div>Your content here</div>
</FadeInOnScroll>

// With custom threshold
<FadeInOnScroll 
  direction="scale" 
  delay="medium"
  threshold={0.3}
>
  <Card />
</FadeInOnScroll>

// Parallax effect
<ParallaxElement scrollY={scrollY} speed={0.1}>
  <Hero />
</ParallaxElement>`}</code>
              </pre>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeInOnScroll direction="scale" delay="short">
            <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-12 border border-cyan-500/20 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to explore more?
              </h2>
              <p className="text-gray-400 mb-8">
                Check out the interactive demo page
              </p>
              <Link
                href="/demo/interactive"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:scale-105 transition-all duration-300"
              >
                Interactive Demo
                <ChevronRight size={20} />
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </div>
  );
}
