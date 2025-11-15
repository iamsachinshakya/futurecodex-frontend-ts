"use client";

import { FilterButtons } from "@/app/modules/category/components/FilterButtons";
import { FloatingElements } from "@/app/modules/category/components/FloatingElements";
import { SearchBar } from "@/app/modules/category/components/SearchBar";
import { FilterType } from "@/app/modules/category/types/types";
import { Sparkles } from "lucide-react";
import { FadeInOnScroll } from "@/app/shared/components/animations/FadeInOnScroll";
import { ParallaxElement } from "@/app/shared/components/animations/ParallaxElement";
import { useScrollPosition } from "@/app/shared/hooks/useScrollPosition";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterType[];
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function HeroSection({
  searchQuery,
  onSearchChange,
  filters,
  selectedFilter,
  onFilterChange,
}: HeroSectionProps) {
  const scrollY = useScrollPosition({ throttle: 16 });

  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          {/* Parallax Badge */}
          <ParallaxElement
            scrollY={scrollY}
            speed={0.1}
            className="inline-block mb-6"
          >
            <FadeInOnScroll direction="scale" delay="none">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full backdrop-blur-sm">
                <Sparkles size={16} className="text-cyan-400 animate-pulse" />
                <span className="text-sm text-cyan-400">
                  Explore Tech Categories
                </span>
              </div>
            </FadeInOnScroll>
          </ParallaxElement>

          {/* Title */}
          <FadeInOnScroll direction="up" delay="short">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Discover Topics
              </span>
            </h1>
          </FadeInOnScroll>

          {/* Description */}
          <FadeInOnScroll direction="up" delay="medium">
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Dive deep into cutting-edge technology categories. From AI to
              Web3, find articles that match your interests.
            </p>
          </FadeInOnScroll>

          {/* Search Bar */}
          <FadeInOnScroll direction="up" delay="long">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
          </FadeInOnScroll>

          {/* Filter Buttons */}
          <FadeInOnScroll direction="up" delay="long">
            <FilterButtons
              filters={filters}
              selectedFilter={selectedFilter}
              onFilterChange={onFilterChange}
            />
          </FadeInOnScroll>
        </div>
      </div>

      {/* Floating Elements */}
      <FloatingElements />
    </section>
  );
}
