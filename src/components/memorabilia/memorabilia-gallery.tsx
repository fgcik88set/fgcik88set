"use client";

import { useRef, useEffect, useState } from "react";
import { Tag, Package } from "lucide-react";
import FilterNavbar from "../shared/FilterNavbar";

import { useMobile } from "../../hooks/use-mobile";
import { categories, memorabiliaItems } from "../constants/memorabilia-data";
import MemorabiliaCard from "./memorabilia-card";
import MemorabiliaCarousel from "./memorabilia-carousel";

export default function MemorabiliaGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const [filteredItems, setFilteredItems] = useState(memorabiliaItems);
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique categories for filters
  const categoryOptions = categories.filter((cat) => cat.id !== "all");

  // Filter configuration
  const filterConfigs = [
    {
      type: 'select' as const,
      label: 'Filter by Category',
      icon: Tag,
      options: categoryOptions.map(cat => ({ value: cat.id, label: cat.name })),
      placeholder: 'All Categories'
    },
    {
      type: 'checkbox' as const,
      label: 'Availability',
      icon: Package,
      placeholder: 'In stock only'
    }
  ];

  const [filters, setFilters] = useState<Record<string, string | boolean>>({
    filterbycategory: "",
    availability: false
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

  // Filter items based on search and filters
  useEffect(() => {
    let filtered = memorabiliaItems;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.filterbycategory) {
      filtered = filtered.filter((item) => item.category === filters.filterbycategory);
    }

    if (filters.availability) {
      filtered = filtered.filter((item) => item.inStock);
    }

    setFilteredItems(filtered);
  }, [searchTerm, filters]);



  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-amber-100/20 blur-3xl"></div>

        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-[15px] border-blue-200/10 rounded-full"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 border-[10px] border-amber-200/10 rounded-lg rotate-45"></div>
      </div>

      <div className="w-[95%] mx-auto relative z-10">
        <div className="text-center mb-16 animate-item">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our <span className="text-blue-700">Collection</span>
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover our carefully curated collection of memorabilia that
            celebrates our shared heritage and keeps our memories alive for
            generations to come.
          </p>
        </div>

        {/* Search and Filter Section */}
        <FilterNavbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          filterConfigs={filterConfigs}
          searchPlaceholder="Search memorabilia..."
        />

        {/* Results Summary */}
        <div className="mb-8 animate-item">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">
              Showing{" "}
              <span className="font-semibold text-blue-700">
                {filteredItems.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold">{memorabiliaItems.length}</span>{" "}
              items
            </p>

            {(searchTerm || filters.filterbycategory || filters.availability) && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Search: &quot;{searchTerm}&quot;
                  </span>
                )}
                {filters.filterbycategory && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Category:{" "}
                    {
                      categoryOptions.find((cat) => cat.id === filters.filterbycategory)
                        ?.name
                    }
                  </span>
                )}
                {filters.availability && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    In Stock Only
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Items Display */}
        {filteredItems.length > 0 ? (
          <>
            {/* Desktop Grid View */}
            {!isMobile && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-item"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <MemorabiliaCard item={item} />
                  </div>
                ))}
              </div>
            )}

            {/* Mobile Carousel View */}
            {isMobile && (
              <div className="animate-item">
                <MemorabiliaCarousel items={filteredItems} />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 animate-item">
            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No items found
            </h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms or filters to find what you&#39;re
              looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilters({ filterbycategory: "", availability: false });
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
