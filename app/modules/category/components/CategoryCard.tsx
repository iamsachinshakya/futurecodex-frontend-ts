"use client";

import { Category } from "@/app/modules/category/types/types";
import { ArrowRight, Zap } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}

export function CategoryCard({
  category,
  isHovered,
  onHover,
}: CategoryCardProps) {
  return (
    <div
      onMouseEnter={() => onHover(category.id)}
      onMouseLeave={() => onHover(null)}
      className="group relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer hover:scale-[1.02]"
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
      ></div>

      {/* Trending Badge */}
      {category.trending && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-xs font-semibold flex items-center gap-1">
          <Zap size={12} />
          Trending
        </div>
      )}

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.gradient} mb-6 group-hover:scale-110 transition-transform duration-500`}
        >
          {category.icon}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2">
          {category.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {category.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <span className="text-sm text-gray-400">
            {category.articles} articles
          </span>
          <div className="flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all duration-300">
            Explore
            <ArrowRight
              size={18}
              className={`transition-transform duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
