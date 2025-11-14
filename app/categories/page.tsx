"use client";

import { useState, useEffect } from "react";
import { Navbar } from "./_components/Navbar";
import { HeroSection } from "./_components/HeroSection";
import { CategoriesGrid } from "./_components/CategoriesGrid";
import { StatsSection } from "./_components/StatsSection";
import { CTASection } from "./_components/CTASection";
import { SubscribeModal } from "./_components/SubscribeModal";
import { CATEGORIES, FILTERS } from "./_lib/constants";
import { FilterType } from "./_lib/types";
import "./_styles/animations.css";

export default function CategoriesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All");
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* <Navbar scrolled={scrolled} /> */}

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
              © 2025 TechNova. All rights reserved. Built with Next.js &
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
