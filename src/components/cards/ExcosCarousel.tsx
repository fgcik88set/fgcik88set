"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

import type { ExcosProps } from "../constants/interfaces"
import { useMobile } from "@/hooks/use-mobile"
import ExcosHomepageSection from "./Excos"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"


interface ExcosCarouselProps {
  executives: ExcosProps[]
  title: string
  viewAllLink: string
  viewAllText: string
}

export default function ExcosCarousel({ executives, title, viewAllLink, viewAllText }: ExcosCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Reset index when resizing between mobile and desktop
  useEffect(() => {
    setCurrentIndex(0)
  }, [isMobile])

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      isMobile
        ? prevIndex < executives.length - 1
          ? prevIndex + 1
          : prevIndex
        : prevIndex < Math.max(0, executives.length - 4)
          ? prevIndex + 1
          : prevIndex,
    )
  }

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    }

    if (isRightSwipe) {
      handlePrevious()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <div className="w-full">
      <div className="relative mb-8 flex items-center">
        <div className="h-px flex-grow bg-blue-200"></div>
        <h2 className="mx-4 font-heading text-2xl md:text-3xl font-bold text-blue-700">{title}</h2>
        <div className="h-px flex-grow bg-blue-200"></div>
      </div>

      <div className="relative">
        {/* Carousel container */}
        <div
          ref={carouselRef}
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop view - grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {executives.map((executive) => (
              <ExcosHomepageSection key={executive.id} {...executive} />
            ))}
          </div>

          {/* Mobile view - carousel */}
          <div
            className="md:hidden flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${executives.length * 100}%`,
            }}
          >
            {executives.map((executive) => (
              <div key={executive.id} className="w-full flex-shrink-0 px-2">
                <ExcosHomepageSection {...executive} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons - only visible on mobile */}
        <div className="flex justify-between md:hidden">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous executive"
          >
            <BiChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === executives.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next executive"
          >
            <BiChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Pagination indicators - only visible on mobile */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {executives.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            />
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="mt-6 flex justify-center">
        <a
          href={viewAllLink}
          className="inline-flex items-center justify-center rounded-md bg-blue-700 px-6 py-3 text-center font-medium text-white transition-all hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {viewAllText}
        </a>
      </div>
    </div>
  )
}
