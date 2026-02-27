'use client';

import React, { useState } from 'react';
import { blogCategories } from './blog-data';

export default function BlogFilters() {
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <section className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Filter by Category Dropdown (Mobile/Desktop) */}
          <div className="relative w-full md:w-64">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <span>Filter by Category</span>
              <svg
                className={`w-5 h-5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isCategoryOpen && (
              <div className="absolute z-20 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {blogCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors ${
                      selectedCategory === category ? 'text-blue-600 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search all blogs here"
              className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {blogCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 border border-blue-200 hover:border-blue-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
