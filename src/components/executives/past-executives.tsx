"use client"

import { useRef, useEffect, useState } from "react"
import ExecutiveCard from "./executive-card"
import ExecutiveCarousel from "./executive-carousel"
import FilterNavbar from "../shared/FilterNavbar"

import { useMobile } from "../../hooks/use-mobile"
import { getPastExecutives } from "@/sanity/sanity-utils"
import { ExecutiveProps } from "../constants/executives-data"
import { Search, Calendar, User } from "lucide-react"
import { BackgroundButton } from "../buttons/Buttons"

interface YearGroup {
  id: string;
  yearRange: string;
  executives: ExecutiveProps[];
}

export default function PastExecutives() {
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useMobile()
  const [allExecutives, setAllExecutives] = useState<ExecutiveProps[]>([])
  const [filteredExecutives, setFilteredExecutives] = useState<ExecutiveProps[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  // Fetch data from Sanity
  useEffect(() => {
    const fetchPastExecutives = async () => {
      try {
        const data = await getPastExecutives();
        // Flatten the executives array from each year range
        const flattenedExecutives = data.flatMap((yearGroup: YearGroup) => 
          yearGroup.executives.map((exec: ExecutiveProps) => ({
            ...exec,
            id: `${yearGroup.id}-${exec.id}` // Create unique ID
          }))
        );
        setAllExecutives(flattenedExecutives);
        setFilteredExecutives(flattenedExecutives);
      } catch (error) {
        console.error("Error fetching past executives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastExecutives();
  }, []);

  // Get unique year ranges and positions for filters
  const yearRanges = [...new Set(allExecutives.map((exec) => exec.term))].sort((a, b) => {
    // Sort year ranges in descending order (newest first)
    const aStart = Number.parseInt(a.split("-")[0])
    const bStart = Number.parseInt(b.split("-")[0])
    return bStart - aStart
  }).map(yearRange => ({ value: yearRange, label: yearRange }))
  
  const positions = [...new Set(allExecutives.map((exec) => exec.position))].sort().map(position => ({ value: position, label: position }))

  // Filter configuration
  const filterConfigs = [
    {
      type: 'select' as const,
      label: 'Filter by Year Range',
      icon: Calendar,
      options: yearRanges,
      placeholder: 'All Year Ranges'
    },
    {
      type: 'select' as const,
      label: 'Filter by Position',
      icon: User,
      options: positions,
      placeholder: 'All Positions'
    }
  ];

  const [filters, setFilters] = useState<Record<string, string | boolean>>({
    filterbyyearrange: "2021-2023",
    filterbyposition: ""
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const animatedElements = sectionRef.current?.querySelectorAll(".animate-item")
    animatedElements?.forEach((el) => observer.observe(el))

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // Filter executives based on search and filters
  useEffect(() => {
    let filtered = allExecutives

    if (searchTerm) {
      filtered = filtered.filter(
        (exec: ExecutiveProps) =>
          exec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exec.position.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filters.filterbyyearrange) {
      filtered = filtered.filter((exec: ExecutiveProps) => exec.term === filters.filterbyyearrange)
    }

    if (filters.filterbyposition) {
      filtered = filtered.filter((exec: ExecutiveProps) => exec.position === filters.filterbyposition)
    }

    setFilteredExecutives(filtered)
  }, [searchTerm, filters, allExecutives])



  return (
    <section id="past" ref={sectionRef} className="relative py-20 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-100/20 blur-3xl"></div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-8 w-full h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-blue-900"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[95%] mx-auto relative z-10">
        <div className="text-center mb-16 animate-item">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Past <span className="text-blue-700">Executives</span>
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="md:text-lg text-slate-600 max-w-3xl mx-auto">
            Honoring the leaders who have shaped our alumni association throughout the years. Their dedication and
            vision continue to inspire our community.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        )}

        {/* Search and Filter Section */}
        {!loading && (
          <FilterNavbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            filterConfigs={filterConfigs}
            searchPlaceholder="Search by name or position..."
          />
        )}

        {/* Results Summary */}
        {!loading && (
          <div className="mb-8 animate-item">
            <div className="flex items-center ">
              <p className="text-slate-600">
                Showing <span className="font-semibold text-blue-700">{filteredExecutives.length}</span> of{" "}
                <span className="font-semibold">{allExecutives.length}</span> past executives
              </p>

              {(searchTerm || filters.filterbyyearrange || filters.filterbyposition) && (
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Search: &quot;{searchTerm}&quot;
                    </span>
                  )}
                  
                  {filters.filterbyposition && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Position: {filters.filterbyposition}
                    </span>
                  )}
                </div>
              )}
              
            </div>
            <p className="text-darkBlue underline text-center cursor-pointer">View Achievements</p>
          </div>
        )}

        {/* Executives Display */}
        {!loading && filteredExecutives.length > 0 ? (
          <>
            {/* Desktop Grid View */}
            {!isMobile && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredExecutives.map((executive: ExecutiveProps, index: number) => {
                  // Check if this is the last item and if it's not in a complete row
                  const isLastItem = index === filteredExecutives.length - 1;
                  const itemsInLastRow = filteredExecutives.length % 4;
                  let colSpanClass = '';
                  
                  if (isLastItem && itemsInLastRow > 0 && itemsInLastRow < 4) {
                    // Calculate how many columns the last card should span
                    const remainingCols = 4 - itemsInLastRow;
                    if (remainingCols === 1) colSpanClass = 'xl:col-span-2';
                    else if (remainingCols === 2) colSpanClass = 'xl:col-span-3';
                    else if (remainingCols === 3) colSpanClass = 'xl:col-span-4';
                  }
                  
                  return (
                    <div 
                      key={executive.id} 
                      className={`animate-item ${colSpanClass}`} 
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <ExecutiveCard executive={executive} isCurrent={false} />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Mobile Carousel View */}
            {isMobile && (
              <div className="animate-item">
                <ExecutiveCarousel executives={filteredExecutives} isCurrent={false} />
              </div>
            )}
          </>
        ) : !loading && (
          <div className="text-center py-16 animate-item">
            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No executives found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms or filters to find what you&#39;re looking for.
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setFilters({ filterbyyearrange: "", filterbyposition: "" });
              }} 
              className="text-blue-700 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {!loading && <div className="mt-10 flex justify-center">
        <BackgroundButton
          text="View Current Excecutives"
          link="/executives/current"
          btnWidth="w-full lg:w-1/4"
        />
      </div>}
    </section>
  )
}
