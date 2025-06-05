"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TrusteeCard from "./trustee-card"
import { TrusteeProps } from "../constants/trustees-data"


interface TrusteeCarouselProps {
  trustees: TrusteeProps[]
  isCurrent: boolean
}

export default function TrusteeCarousel({ trustees, isCurrent }: TrusteeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Reset index when trustees change (e.g., after filtering)
  useEffect(() => {
    setCurrentIndex(0)
  }, [trustees])

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < trustees.length - 1 ? prevIndex + 1 : prevIndex))
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

  if (trustees.length === 0) {
    return null
  }

  return (
    <div className="relative w-full">
      {/* Carousel container */}
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
            width: `${trustees.length * 100}%`,
          }}
        >
          {trustees.map((trustee) => (
            <div key={trustee.id} className="w-full flex-shrink-0 px-2">
              <TrusteeCard trustee={trustee} isCurrent={isCurrent} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {trustees.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-2 top-[42%] -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all duration-200"
            aria-label="Previous trustee"
          >
            <ChevronLeft className="h-6 w-6 text-slate-700" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === trustees.length - 1}
            className="absolute right-2 top-[42%] -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all duration-200"
            aria-label="Next trustee"
          >
            <ChevronRight className="h-6 w-6 text-slate-700" />
          </button>
        </>
      )}

      {/* Pagination indicators */}
      {trustees.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {trustees.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-200 ${
                currentIndex === index ? "w-8 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            />
          ))}
        </div>
      )}

      {/* Trustee counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-slate-500">
          {currentIndex + 1} of {trustees.length}
        </span>
      </div>
    </div>
  )
}
