"use client";

import { useRef, useEffect, useState } from "react";
import { Calendar, Tag } from "lucide-react";
import { expandedMemoriesData } from "../constants/memories-data";
import SectionHeaderText from "../typography/SectionHeaderText";
import MemoriesSection from "./Memories";
import FilterNavbar from "../shared/FilterNavbar";

export default function MemoriesGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filteredMemories, setFilteredMemories] =
    useState(expandedMemoriesData);
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique years and types for filters
  const years = [
    ...new Set(expandedMemoriesData.map((memory) => memory.year)),
  ].sort((a, b) => (b ?? "").localeCompare(a ?? ""));

  // Filter configuration
  const filterConfigs = [
    {
      type: 'select' as const,
      label: 'Filter by Year',
      icon: Calendar,
      options: years.map(year => ({ value: year || "", label: year || "" })),
      placeholder: 'All Years'
    },
    {
      type: 'select' as const,
      label: 'Filter by Type',
      icon: Tag,
      options: [
        { value: 'image', label: 'Photos' },
        { value: 'video', label: 'Videos' }
      ],
      placeholder: 'All Types'
    }
  ];

  const [filters, setFilters] = useState<Record<string, string | boolean>>({
    filterbyyear: "",
    filterbytype: ""
  });

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

    if (filters.filterbyyear) {
      filtered = filtered.filter((memory) => memory.year === filters.filterbyyear);
    }

    if (filters.filterbytype) {
      filtered = filtered.filter((memory) => memory.type === filters.filterbytype);
    }

    setFilteredMemories(filtered);
  }, [searchTerm, filters]);

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

      <div className="w-[95%] mx-auto relative z-10">
        <div className="text-center mb-16 animate-item">
          <SectionHeaderText text="Reliving The Moments" />
          <p className="text-slate-600 max-w-3xl mx-auto italic">
            A collection of treasured memories that remind us of our shared
            journey, friendships, and the legacy we continue to build together.
          </p>
        </div>

        {/* Search and Filter Section */}
        <FilterNavbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          filterConfigs={filterConfigs}
          searchPlaceholder="Search memories..."
        />

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

            {(searchTerm || filters.filterbyyear || filters.filterbytype) && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Search: &quot;{searchTerm}&quot;
                  </span>
                )}
                {filters.filterbyyear && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Year: {filters.filterbyyear}
                  </span>
                )}
                {filters.filterbytype && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Type: {filters.filterbytype === "image" ? "Photos" : "Videos"}
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
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No memories found
            </h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms or filters to find what you&#39;re
              looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilters({ filterbyyear: "", filterbytype: "" });
              }}
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
