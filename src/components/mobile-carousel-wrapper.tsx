"use client"

import type React from "react"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

interface MobileCarouselWrapperProps {
  children: ReactNode[]
  breakpoint?: number
  title?: string
}

export default function MobileCarouselWrapper({ children, breakpoint = 768, title }: MobileCarouselWrapperProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [breakpoint])

  // Reset index when resizing between mobile and desktop
  useEffect(() => {
    setCurrentIndex(0)
  }, [isMobile])

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < children.length - 1 ? prevIndex + 1 : prevIndex))
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

  // If not mobile, render children normally in a grid
  if (!isMobile) {
    return <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{children}</div>
  }

  // On mobile, render as carousel
  return (
    <div className="relative w-full">
      {title && <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>}

      <div
        ref={carouselRef}
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${children.length * 100}%`,
          }}
        >
          {children.map((child, index) => (
            <div key={index} className="w-full flex-shrink-0 px-2">
              {child}
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-darkBlue text-white backdrop-blur-sm rounded-full p-2 shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous item"
        >
          <BiChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === children.length - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-darkBlue text-white backdrop-blur-sm rounded-full p-2 shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next item"
        >
          <BiChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Pagination indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {children.map((_, index) => (
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
  )
}
