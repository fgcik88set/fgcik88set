"use client"

import { useRef, useEffect, useState } from "react"
import { Search, Filter, X, Calendar, User } from "lucide-react"
import ExecutiveCard from "./executive-card"
import ExecutiveCarousel from "./executive-carousel"

import { useMobile } from "../../hooks/use-mobile"
import { pastExecutives } from "../constants/executives-data"

export default function PastExecutives() {
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useMobile()
  const [filteredExecutives, setFilteredExecutives] = useState(pastExecutives)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("")
  const [selectedPosition, setSelectedPosition] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Get unique terms and positions for filters
  const terms = [...new Set(pastExecutives.map((exec) => exec.term))].sort((a, b) => {
    // Sort terms in descending order (newest first)
    const aStart = Number.parseInt(a.split("-")[0])
    const bStart = Number.parseInt(b.split("-")[0])
    return bStart - aStart
  })
  const positions = [...new Set(pastExecutives.map((exec) => exec.position))].sort()

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
    let filtered = pastExecutives

    if (searchTerm) {
      filtered = filtered.filter(
        (exec) =>
          exec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exec.position.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedTerm) {
      filtered = filtered.filter((exec) => exec.term === selectedTerm)
    }

    if (selectedPosition) {
      filtered = filtered.filter((exec) => exec.position === selectedPosition)
    }

    setFilteredExecutives(filtered)
  }, [searchTerm, selectedTerm, selectedPosition])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTerm("")
    setSelectedPosition("")
  }

  const hasActiveFilters = searchTerm || selectedTerm || selectedPosition

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

      <div className="container mx-auto px-4 relative z-10">
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

        {/* Search and Filter Section */}
        <div className="mb-12 animate-item">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or position..."
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
                    {[searchTerm, selectedTerm, selectedPosition].filter(Boolean).length}
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
                  {/* Term Filter */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                      <Calendar className="w-4 h-4" />
                      Filter by Term
                    </label>
                    <select
                      value={selectedTerm}
                      onChange={(e) => setSelectedTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Terms</option>
                      {terms.map((term) => (
                        <option key={term} value={term}>
                          {term}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Position Filter */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                      <User className="w-4 h-4" />
                      Filter by Position
                    </label>
                    <select
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Positions</option>
                      {positions.map((position) => (
                        <option key={position} value={position}>
                          {position}
                        </option>
                      ))}
                    </select>
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
              Showing <span className="font-semibold text-blue-700">{filteredExecutives.length}</span> of{" "}
              <span className="font-semibold">{pastExecutives.length}</span> past executives
            </p>

            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Search: &quot;{searchTerm}&quot;
                  </span>
                )}
                {selectedTerm && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Term: {selectedTerm}</span>
                )}
                {selectedPosition && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Position: {selectedPosition}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Executives Display */}
        {filteredExecutives.length > 0 ? (
          <>
            {/* Desktop Grid View */}
            {!isMobile && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredExecutives.map((executive, index) => (
                  <div key={executive.id} className="animate-item" style={{ animationDelay: `${index * 0.05}s` }}>
                    <ExecutiveCard executive={executive} isCurrent={false} />
                  </div>
                ))}
              </div>
            )}

            {/* Mobile Carousel View */}
            {isMobile && (
              <div className="animate-item">
                <ExecutiveCarousel executives={filteredExecutives} isCurrent={false} />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 animate-item">
            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No executives found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms or filters to find what you&#39;re looking for.
            </p>
            <button onClick={clearFilters} className="text-blue-700 hover:text-blue-800 font-medium">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
