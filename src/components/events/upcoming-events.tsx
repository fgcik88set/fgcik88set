"use client";

import { useRef, useEffect, useState } from "react";
import { Search, Filter, X, Calendar, MapPin } from "lucide-react";

import { useMobile } from "../../hooks/use-mobile";
import {
  eventCategories,
  upcomingEvents,
  Event as EventType,
} from "../constants/events-data";
import EventCard from "./events-card";
import EventCarousel from "./events-carousel";
import EventDetailsModal from "./events-details-modal";

export default function UpcomingEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const [filteredEvents, setFilteredEvents] = useState(upcomingEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique categories for filters
  const categoryOptions = eventCategories.filter((cat) => cat.id !== "all");

  const handleViewDetails = (event: EventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

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

  // Filter events based on search and filters
  useEffect(() => {
    let filtered = upcomingEvents;

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  const hasActiveFilters = searchTerm || selectedCategory;

  return (
    <>
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-item">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Upcoming Events
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What&#39;s <span className="text-blue-700">Coming Up</span>
            </h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Don&#39;t miss out on these exciting upcoming events. Mark your
              calendars and join us for memorable experiences with your fellow
              alumni.
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
                    placeholder="Search upcoming events..."
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
                      {[searchTerm, selectedCategory].filter(Boolean).length}
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
                    {/* Category Filter */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                        <Calendar className="w-4 h-4" />
                        Filter by Category
                      </label>
                      <div className="relative">
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                          <option value="">All Categories</option>
                          {categoryOptions.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
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

                    {/* Location Info */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                        <MapPin className="w-4 h-4" />
                        Event Locations
                      </label>
                      <div className="text-sm text-slate-600 pt-2">
                        <p>Events are held across Nigeria and online</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Lagos • Abuja • Port Harcourt • Virtual
                        </p>
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
                  {filteredEvents.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold">{upcomingEvents.length}</span>{" "}
                upcoming events
              </p>

              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Search: &quot;{searchTerm}&quot;
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Category:{" "}
                      {
                        categoryOptions.find(
                          (cat) => cat.id === selectedCategory
                        )?.name
                      }
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Events Display */}
          {filteredEvents.length > 0 ? (
            <>
              {/* Desktop Grid View */}
              {!isMobile && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className="animate-item"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <EventCard
                        event={event}
                        isUpcoming={true}
                        onViewDetails={() => handleViewDetails(event)}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Mobile Carousel View */}
              {isMobile && (
                <div className="animate-item">
                  <EventCarousel
                    events={filteredEvents}
                    isUpcoming={true}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 animate-item">
              <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No events found
              </h3>
              <p className="text-slate-600 mb-4">
                Try adjusting your search terms or filters to find what
                you&#39;re looking for.
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

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isUpcoming={true}
        />
      )}
    </>
  );
}
