"use client"

import { useRef, useEffect, useState } from "react"
import TrusteeCard from "./trustee-card"
import TrusteeCarousel from "./trustee-carousel"
import FilterNavbar from "../shared/FilterNavbar"

import { useMobile } from "../../hooks/use-mobile"
import { pastTrustees } from "../constants/trustees-data"
import { Search, Calendar, User } from "lucide-react"

export default function PastTrustees() {
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useMobile()
  const [filteredTrustees, setFilteredTrustees] = useState(pastTrustees)
  const [searchTerm, setSearchTerm] = useState("")

  // Get unique terms and positions for filters (5-year intervals)
  const terms = [...new Set(pastTrustees.map((trustee) => trustee.term))].sort((a, b) => {
    // Sort terms in descending order (newest first)
    const aStart = Number.parseInt(a.split("-")[0])
    const bStart = Number.parseInt(b.split("-")[0])
    return bStart - aStart
  }).map(term => ({ value: term, label: term }))
  
  const positions = [...new Set(pastTrustees.map((trustee) => trustee.position))].sort().map(position => ({ value: position, label: position }))

  // Filter configuration
  const filterConfigs = [
    {
      type: 'select' as const,
      label: 'Filter by Term',
      icon: Calendar,
      options: terms,
      placeholder: 'All Terms'
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
    filterbyterm: "",
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

  // Filter trustees based on search and filters
  useEffect(() => {
    let filtered = pastTrustees

    if (searchTerm) {
      filtered = filtered.filter(
        (trustee) =>
          trustee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trustee.position.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filters.filterbyterm) {
      filtered = filtered.filter((trustee) => trustee.term === filters.filterbyterm)
    }

    if (filters.filterbyposition) {
      filtered = filtered.filter((trustee) => trustee.position === filters.filterbyposition)
    }

    setFilteredTrustees(filtered)
  }, [searchTerm, filters])



  return (
    <section id="past" ref={sectionRef} className="relative py-20 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-100/20 blur-3xl"></div>

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
            Past <span className="text-blue-700">Trustees</span>
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="md:text-lg text-slate-600 max-w-3xl mx-auto">
            Honoring the distinguished trustees who have provided strategic leadership and governance throughout our
            association&#39;s history. Their wisdom and dedication continue to shape our legacy.
          </p>
        </div>

                {/* Search and Filter Section */}
        <FilterNavbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          filterConfigs={filterConfigs}
          searchPlaceholder="Search by name or position..."
        />

        {/* Results Summary */}
        <div className="mb-8 animate-item">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">
              Showing <span className="font-semibold text-blue-700">{filteredTrustees.length}</span> of{" "}
              <span className="font-semibold">{pastTrustees.length}</span> past trustees
            </p>

            {(searchTerm || filters.filterbyterm || filters.filterbyposition) && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Search: &quot;{searchTerm}&quot;
                  </span>
                )}
                {filters.filterbyterm && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Term: {filters.filterbyterm}</span>
                )}
                {filters.filterbyposition && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Position: {filters.filterbyposition}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Trustees Display */}
        {filteredTrustees.length > 0 ? (
          <>
            {/* Desktop Grid View */}
            {!isMobile && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredTrustees.map((trustee, index) => (
                  <div key={trustee.id} className="animate-item" style={{ animationDelay: `${index * 0.05}s` }}>
                    <TrusteeCard trustee={trustee} isCurrent={false} />
                  </div>
                ))}
              </div>
            )}

            {/* Mobile Carousel View */}
            {isMobile && (
              <div className="animate-item">
                <TrusteeCarousel trustees={filteredTrustees} isCurrent={false} />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 animate-item">
            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No trustees found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms or filters to find what you&#39;re looking for.
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setFilters({ filterbyterm: "", filterbyposition: "" });
              }} 
              className="text-blue-700 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
