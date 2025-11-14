"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

interface Category {
  name: string;
  color: string;
  count: number;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    { name: "AI", color: "from-cyan-500 to-blue-500", count: 24 },
    { name: "Web3", color: "from-purple-500 to-pink-500", count: 18 },
    { name: "Cloud", color: "from-violet-500 to-purple-500", count: 31 },
    { name: "Frontend", color: "from-pink-500 to-rose-500", count: 42 },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
          Explore by{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Category
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.name}
              className="group relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
              ></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                <p className="text-gray-400">{cat.count} articles</p>
              </div>
              <ChevronRight className="absolute bottom-6 right-6 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
