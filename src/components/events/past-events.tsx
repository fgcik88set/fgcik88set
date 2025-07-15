"use client";

import { useRef, useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import FilterNavbar from "../shared/FilterNavbar";

import { useMobile } from "../../hooks/use-mobile";
import {
  eventCategories,
  pastEvents,
  Event as EventType,
} from "../constants/events-data";
import EventCard from "./events-card";
import EventCarousel from "./events-carousel";
import EventDetailsModal from "./events-details-modal";

export default function PastEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const [filteredEvents, setFilteredEvents] = useState(pastEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique categories and years for filters
  const categoryOptions = eventCategories.filter((cat) => cat.id !== "all");
  const years = [
    ...new Set(pastEvents.map((event) => new Date(event.date).getFullYear())),
  ].sort((a, b) => b - a);

  // Filter configuration
  const filterConfigs = [
    {
      type: 'select' as const,
      label: 'Filter by Category',
      icon: Calendar,
      options: categoryOptions.map(cat => ({ value: cat.id, label: cat.name })),
      placeholder: 'All Categories'
    },
    {
      type: 'select' as const,
      label: 'Filter by Year',
      icon: Calendar,
      options: years.map(year => ({ value: year.toString(), label: year.toString() })),
      placeholder: 'All Years'
    },
    {
      type: 'select' as const,
      label: 'Event Locations',
      icon: MapPin,
      options: [
        { value: 'info', label: 'Events held nationwide' }
      ],
      placeholder: 'Lagos • Abuja • Port Harcourt • Ikot Ekpene'
    }
  ];

  const [filters, setFilters] = useState<Record<string, string | boolean>>({
    filterbycategory: "",
    filterbyyear: "",
    eventlocations: ""
  });

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
    let filtered = pastEvents;

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.filterbycategory) {
      filtered = filtered.filter(
        (event) => event.category === filters.filterbycategory
      );
    }

    if (filters.filterbyyear) {
      filtered = filtered.filter(
        (event) =>
          new Date(event.date).getFullYear().toString() === filters.filterbyyear
      );
    }

    setFilteredEvents(filtered);
  }, [searchTerm, filters]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-20 bg-gradient-to-b from-white to-slate-50 overflow-hidden"
      >
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
              Past <span className="text-blue-700">Events</span>
            </h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Relive the memories from our past events and celebrations. Each
              gathering has strengthened our bonds and created lasting memories
              for our alumni community.
            </p>
          </div>

          {/* Search and Filter Section */}
          <FilterNavbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            filterConfigs={filterConfigs}
            searchPlaceholder="Search past events..."
          />

          {/* Results Summary */}
          <div className="mb-8 animate-item">
            <div className="flex items-center justify-between">
              <p className="text-slate-600">
                Showing{" "}
                <span className="font-semibold text-blue-700">
                  {filteredEvents.length}
                </span>{" "}
                of <span className="font-semibold">{pastEvents.length}</span>{" "}
                past events
              </p>

              {(searchTerm || filters.filterbycategory || filters.filterbyyear) && (
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
                  {filters.filterbyyear && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Year: {filters.filterbyyear}
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
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <EventCard
                        event={event}
                        isUpcoming={false}
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
                    isUpcoming={false}
                    onViewDetails={handleViewDetails}
                  />
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
                No events found
              </h3>
              <p className="text-slate-600 mb-4">
                Try adjusting your search terms or filters to find what
                you&#39;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilters({ filterbycategory: "", filterbyyear: "", eventlocations: "" });
                }}
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
          isUpcoming={false}
        />
      )}
    </>
  );
}
