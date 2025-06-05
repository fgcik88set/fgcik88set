"use client";

import { useRef, useEffect, useState } from "react";
import { Search, Filter, X, Calendar, Tag } from "lucide-react";
import { expandedMemoriesData } from "../constants/memories-data";
import SectionHeaderText from "../typography/SectionHeaderText";
import MemoriesSection from "./Memories";

export default function MemoriesGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filteredMemories, setFilteredMemories] =
    useState(expandedMemoriesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique years and types for filters
  const years = [
    ...new Set(expandedMemoriesData.map((memory) => memory.year)),
  ].sort((a, b) => (b ?? "").localeCompare(a ?? ""));
  //   const types = [...new Set(expandedMemoriesData.map((memory) => memory.type))]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements =
      sectionRef.current?.querySelectorAll(".animate-item");
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Filter memories based on search and filters
  useEffect(() => {
    let filtered = expandedMemoriesData;

    if (searchTerm) {
      filtered = filtered.filter(
        (memory) =>
          (memory.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ??
            false) ||
          memory.alt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedYear) {
      filtered = filtered.filter((memory) => memory.year === selectedYear);
    }

    if (selectedType) {
      filtered = filtered.filter((memory) => memory.type === selectedType);
    }

    setFilteredMemories(filtered);
  }, [searchTerm, selectedYear, selectedType]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedYear("");
    setSelectedType("");
  };

  const hasActiveFilters = searchTerm || selectedYear || selectedType;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-blue-100/20 blur-3xl"></div>

        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-[15px] border-blue-200/10 rounded-full"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 border-[10px] border-blue-200/10 rounded-lg rotate-45"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-item">
          <SectionHeaderText text="Reliving The Moments" />
          <p className="text-slate-600 max-w-3xl mx-auto italic">
            A collection of treasured memories that remind us of our shared
            journey, friendships, and the legacy we continue to build together.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 animate-item">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search memories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                  isFilterOpen || hasActiveFilters
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
              >
                <Filter className="w-5 h-5" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-amber-400 text-blue-900 text-xs px-2 py-1 rounded-full font-medium">
                    {
                      [searchTerm, selectedYear, selectedType].filter(Boolean)
                        .length
                    }
                  </span>
                )}
              </button>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                  Clear
                </button>
              )}
            </div>

            {/* Filter Options */}
            {isFilterOpen && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Year Filter */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                      <Calendar className="w-4 h-4" />
                      Filter by Year
                    </label>
                    <div className="relative">
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue appearance-none"
                      >
                        <option value="">All Years</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                      <Tag className="w-4 h-4" />
                      Filter by Type
                    </label>
                    <div className="relative">
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue appearance-none"
                      >
                        <option value="" className="text-xs">All Types</option>
                        <option value="image">Photos</option>
                        <option value="video">Videos</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8 animate-item">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">
              Showing{" "}
              <span className="font-semibold text-blue-700">
                {filteredMemories.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold">
                {expandedMemoriesData.length}
              </span>{" "}
              memories
            </p>

            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Search: &quot;{searchTerm}&quot;
                  </span>
                )}
                {selectedYear && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Year: {selectedYear}
                  </span>
                )}
                {selectedType && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Type: {selectedType === "image" ? "Photos" : "Videos"}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Memories Display */}
        {filteredMemories.length > 0 ? (
          <div className="animate-item">
            <MemoriesSection items={filteredMemories} />
          </div>
        ) : (
          <div className="text-center py-16 animate-item">
            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No memories found
            </h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms or filters to find what you&#39;re
              looking for.
            </p>
            <button
              onClick={clearFilters}
              className="text-blue-700 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
