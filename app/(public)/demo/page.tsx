"use client";

import Link from "next/link";
import { Sparkles, Zap } from "lucide-react";
import "../../styles/animations.css";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <FadeInOnScroll direction="scale" delay="none">
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Animation Demos
            </span>
          </h1>
        </FadeInOnScroll>

        <FadeInOnScroll direction="up" delay="short">
          <p className="text-xl text-gray-300 mb-12">
            Explore production-ready animations for Next.js 16
          </p>
        </FadeInOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          <FadeInOnScroll direction="right" delay="medium">
            <Link href="/demo/animations">
              <div className="group bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl p-8 border border-cyan-500/30 hover:scale-105 transition-all cursor-pointer">
                <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-3">Animation Showcase</h2>
                <p className="text-gray-400">
                  Complete library of all available animations and effects
                </p>
              </div>
            </Link>
          </FadeInOnScroll>

          <FadeInOnScroll direction="left" delay="medium">
            <Link href="/demo/interactive">
              <div className="group bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-8 border border-purple-500/30 hover:scale-105 transition-all cursor-pointer">
                <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-3">Interactive Demo</h2>
                <p className="text-gray-400">
                  Play with animation controls and see live changes
                </p>
              </div>
            </Link>
          </FadeInOnScroll>
        </div>
      </div>
    </div>
  );
}
