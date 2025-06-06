"use client"

import { useRef, useEffect } from "react"
import TrusteeCard from "./trustee-card"

import { useMobile } from "../../hooks/use-mobile"
import { currentTrustees } from "../constants/trustees-data"
import TrusteeCarousel from "./trustee-carousel"

export default function CurrentTrustees() {
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useMobile()

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

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-blue-100/20 blur-3xl"></div>

        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-[15px] border-blue-200/10 rounded-full"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 border-[10px] border-blue-200/10 rounded-lg rotate-45"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-item">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Current Term 2020-2025
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Current <span className="text-blue-700">Board of Trustees</span>
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="md:text-lg text-slate-600 max-w-3xl mx-auto">
            Our current board of trustees brings together distinguished leaders with decades of experience in
            governance, strategy, and community development to guide our association&#39;s long-term vision.
          </p>
        </div>

        {/* Desktop Grid View */}
        {!isMobile && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentTrustees.map((trustee, index) => (
              <div key={trustee.id} className="animate-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <TrusteeCard trustee={trustee} isCurrent={true} />
              </div>
            ))}
          </div>
        )}

        {/* Mobile Carousel View */}
        {isMobile && (
          <div className="animate-item">
            <TrusteeCarousel trustees={currentTrustees} isCurrent={true} />
          </div>
        )}
      </div>
    </section>
  )
}
