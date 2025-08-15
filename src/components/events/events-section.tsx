"use client";

import { useRef, useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import FilterNavbar from "../shared/FilterNavbar";

import { useMobile } from "../../hooks/use-mobile";
import { eventCategories, Event as EventType } from "../constants/events-data";
import EventCard from "./events-card";
import EventCarousel from "./events-carousel";
import EventDetailsModal from "./events-details-modal";
import { getUpcomingEvents, getPastEvents } from "../../sanity/sanity-utils";

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>([]);
  const [pastEvents, setPastEvents] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  // Get unique categories for filters
  const categoryOptions = eventCategories.filter((cat) => cat.id !== "all");

  // Filter configuration
  const filterConfigs = [
    {
      type: "select" as const,
      label: "Filter by Category",
      icon: Calendar,
      options: categoryOptions.map((cat) => ({
        value: cat.id,
        label: cat.name,
      })),
      placeholder: "All Categories",
    },
    {
      type: "select" as const,
      label: "Event Locations",
      icon: MapPin,
      options: [
        { value: "info", label: "Events are held across Nigeria and online" },
      ],
      placeholder: "Lagos • Abuja • Port Harcourt • Virtual",
    },
  ];

  const [filters, setFilters] = useState<Record<string, string | boolean>>({
    filterbycategory: "",
    eventlocations: "",
  });

  // Fetch events from Sanity
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const [upcomingData, pastData] = await Promise.all([
          getUpcomingEvents(),
          getPastEvents(),
        ]);
        setUpcomingEvents(upcomingData);
        setPastEvents(pastData);
        setFilteredEvents(upcomingData); // Start with upcoming events
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Update filtered events when tab changes
  useEffect(() => {
    const currentEvents =
      activeTab === "upcoming" ? upcomingEvents : pastEvents;
    let filtered = currentEvents;

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
        (event) => event.eventType === filters.filterbycategory
      );
    }

    setFilteredEvents(filtered);
  }, [activeTab, searchTerm, filters, upcomingEvents, pastEvents]);

  const handleViewDetails = (event: EventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleTabChange = (tab: "upcoming" | "past") => {
    setActiveTab(tab);
    setSearchTerm("");
    setFilters({ filterbycategory: "", eventlocations: "" });
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

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="w-[95%] mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              Events
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our <span className="text-blue-700">Events</span>
            </h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Stay updated with upcoming events and relive the memories from our
              past gatherings and celebrations.
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

        <div className="w-[95%] mx-auto relative z-10">
          <div className="text-center mb-16 animate-item">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              Events
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our <span className="text-blue-700">Events</span>
            </h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Stay updated with upcoming events and relive the memories from our
              past gatherings and celebrations.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8 animate-item">
            <div className="bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => handleTabChange("upcoming")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === "upcoming"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${activeTab === "upcoming" ? "bg-green-500" : "bg-green-400"}`}
                  ></div>
                  Upcoming Events
                </div>
              </button>
              <button
                onClick={() => handleTabChange("past")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === "past"
                    ? "bg-white text-amber-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${activeTab === "past" ? "bg-amber-500" : "bg-amber-400"}`}
                  ></div>
                  Past Events
                </div>
              </button>
            </div>
          </div>

          {/* Search and Filter Section */}
          <FilterNavbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            filterConfigs={filterConfigs}
            searchPlaceholder={`Search ${activeTab === "upcoming" ? "upcoming" : "past"} events...`}
          />

          {/* Results Summary */}
          <div className="mb-8 animate-item">
            <div className="flex items-center justify-between">
              <p className="text-slate-600">
                Showing{" "}
                <span
                  className={`font-semibold ${activeTab === "upcoming" ? "text-green-700" : "text-amber-700"}`}
                >
                  {filteredEvents.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold">
                  {activeTab === "upcoming"
                    ? upcomingEvents.length
                    : pastEvents.length}
                </span>{" "}
                {activeTab === "upcoming" ? "upcoming" : "past"} events
              </p>

              {(searchTerm || filters.filterbycategory) && (
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === "upcoming"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      Search: &quot;{searchTerm}&quot;
                    </span>
                  )}
                  {filters.filterbycategory && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === "upcoming"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      Category:{" "}
                      {
                        categoryOptions.find(
                          (cat) => cat.id === filters.filterbycategory
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
                      className={`animate-item`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <EventCard
                        event={event}
                        isUpcoming={activeTab === "upcoming"}
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
                    isUpcoming={activeTab === "upcoming"}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 animate-item">
              <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No {activeTab === "upcoming" ? "upcoming" : "past"} events found
              </h3>
              <p className="text-slate-600 mb-4">
                Try adjusting your search terms or filters to find what
                you&#39;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilters({ filterbycategory: "", eventlocations: "" });
                }}
                className={`font-medium ${
                  activeTab === "upcoming"
                    ? "text-green-700 hover:text-green-800"
                    : "text-amber-700 hover:text-amber-800"
                }`}
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
          isUpcoming={activeTab === "upcoming"}
        />
      )}
    </>
  );
}
