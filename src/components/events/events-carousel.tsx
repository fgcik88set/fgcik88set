"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Event } from "../constants/events-data"
import EventCard from "./events-card"


interface EventCarouselProps {
  events: Event[]
  isUpcoming: boolean
  onViewDetails: (event: Event) => void
}

export default function EventCarousel({ events, isUpcoming, onViewDetails }: EventCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScrollButtons)
      return () => scrollElement.removeEventListener("scroll", checkScrollButtons)
    }
  }, [events])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320 // Card width + gap
      const newScrollLeft =
        direction === "left" ? scrollRef.current.scrollLeft - scrollAmount : scrollRef.current.scrollLeft + scrollAmount

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  if (events.length === 0) {
    return null
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center transition-all ${
          canScrollLeft ? "text-slate-700 hover:bg-slate-50 hover:shadow-xl" : "text-slate-300 cursor-not-allowed"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center transition-all ${
          canScrollRight ? "text-slate-700 hover:bg-slate-50 hover:shadow-xl" : "text-slate-300 cursor-not-allowed"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {events.map((event) => (
          <div key={event.id} className="flex-shrink-0 w-80">
            <EventCard event={event} isUpcoming={isUpcoming} onViewDetails={() => onViewDetails(event)} />
          </div>
        ))}
      </div>
    </div>
  )
}
