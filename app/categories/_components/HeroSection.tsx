"use client";

import { Sparkles } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { FilterButtons } from "./FilterButtons";
import { FloatingElements } from "./FloatingElements";
import { FilterType } from "../_lib/types";

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
  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-sm text-cyan-400">
              Explore Tech Categories
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Discover Topics
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Dive deep into cutting-edge technology categories. From AI to Web3,
            find articles that match your interests.
          </p>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
          <FilterButtons
            filters={filters}
            selectedFilter={selectedFilter}
            onFilterChange={onFilterChange}
          />
        </div>
      </div>

      {/* Floating Elements */}
      <FloatingElements />
    </section>
  );
}
