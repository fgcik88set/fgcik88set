"use client";

import { useRef, useEffect, useState } from "react";
import { Tag, Package, Search } from "lucide-react";
import FilterNavbar from "../shared/FilterNavbar";

import { useMobile } from "../../hooks/use-mobile";
import { categories, MemorabiliaItem } from "../constants/memorabilia-data";
import MemorabiliaCard from "./memorabilia-card";
import MemorabiliaCarousel from "./memorabilia-carousel";
import { getMemorabilia } from "../../sanity/sanity-utils";

export default function MemorabiliaGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const [memorabiliaItems, setMemorabiliaItems] = useState<MemorabiliaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MemorabiliaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

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

  // Fetch memorabilia from Sanity
  useEffect(() => {
    const fetchMemorabilia = async () => {
      try {
        const data = await getMemorabilia();
        setMemorabiliaItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching memorabilia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemorabilia();
  }, []);

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
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.filterbycategory) {
      filtered = filtered.filter((item) => item.category === filters.filterbycategory);
    }

    if (filters.availability) {
      filtered = filtered.filter((item) => item.isAvailable);
    }

    setFilteredItems(filtered);
  }, [searchTerm, filters, memorabiliaItems]);

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="w-[95%] mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our <span className="text-blue-700">Memorabilia</span> Collection
            </h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Browse our exclusive collection of Class of &apos;88 memorabilia and own a piece of history.
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        </div>
      </section>
    );
  }

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
            Our <span className="text-blue-700">Memorabilia</span> Collection
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Browse our exclusive collection of Class of &apos;88 memorabilia and own a piece of history.
          </p>
        </div>

        {/* Search and Filter Section */}
        <FilterNavbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          filterConfigs={filterConfigs}
          searchPlaceholder="Search memorabilia items..."
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
              memorabilia items
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
                      categoryOptions.find(
                        (cat) => cat.id === filters.filterbycategory
                      )?.name
                    }
                  </span>
                )}
                {filters.availability && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    In Stock Only
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Memorabilia Display */}
        {filteredItems.length > 0 ? (
          <>
            {/* Desktop Grid View */}
            {!isMobile && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => {
                  // Check if this is the last item and if it's not in a complete row
                  const isLastItem = index === filteredItems.length - 1;
                  const itemsInLastRow = filteredItems.length % 4;
                  let colSpanClass = '';
                  
                  if (isLastItem && itemsInLastRow > 0 && itemsInLastRow < 4) {
                    // Calculate how many columns the last card should span
                    const remainingCols = 4 - itemsInLastRow;
                    if (remainingCols === 1) colSpanClass = 'xl:col-span-1';
                    else if (remainingCols === 2) colSpanClass = 'xl:col-span-2';
                    else if (remainingCols === 3) colSpanClass = 'xl:col-span-3';
                  }
                  
                  return (
                    <div
                      key={item.id}
                      className={`animate-item ${colSpanClass}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <MemorabiliaCard item={item} />
                    </div>
                  );
                })}
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
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No memorabilia found
            </h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms or filters to find what
              you&apos;re looking for.
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
