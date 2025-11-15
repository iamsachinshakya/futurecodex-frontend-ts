"use client";

import { CategoriesGrid } from "@/app/modules/category/components/CategoriesGrid";
import { CTASection } from "@/app/modules/category/components/CTASection";
import { HeroSection } from "@/app/modules/category/components/HeroSection";
import { StatsSection } from "@/app/modules/category/components/StatsSection";
import { SubscribeModal } from "@/app/modules/category/components/SubscribeModal";
import { FilterType } from "@/app/modules/category/types/types";
import { CATEGORIES, FILTERS } from "@/app/modules/category/utils/constants";
import { useState, useEffect } from "react";
import "./styles/animations.css";
import AnimatedBackground from "@/app/shared/components/ui/AnimatedBackground";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All");
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const filteredCategories = CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" ||
      (selectedFilter === "Trending" && cat.trending);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      <AnimatedBackground />

      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={FILTERS}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <CategoriesGrid categories={filteredCategories} />
        </div>
      </section>

      <StatsSection />
      <CTASection onSubscribeClick={() => setShowSubscribeModal(true)} />

      {/* <footer className="relative z-10 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500">
            <p>
              © 2025 FutureCodex. All rights reserved. Built with Next.js &
              Tailwind CSS.
            </p>
          </div>
        </div>
      </footer> */}

      <SubscribeModal
        isOpen={showSubscribeModal}
        onClose={() => setShowSubscribeModal(false)}
        categories={CATEGORIES}
      />
    </div>
  );
}
