"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import AboutHeroImg from "../../../public/images/abt_Us.webp"

export default function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null)

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

    const animatedElements = heroRef.current?.querySelectorAll(".animate-item")
    animatedElements?.forEach((el) => observer.observe(el))

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div ref={heroRef} className="relative w-full h-[70vh] overflow-hidden flex items-center justify-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={AboutHeroImg}
          alt="FGC Ikot Ekpene Campus"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-darkBlue/80 to-darkBlue/40"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 border-[20px] border-blue-200/10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-[15px] border-amber-200/10 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="animate-item">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Story</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-8"></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            The journey of the FGC Ikot Ekpene Class of &rsquo;88 — from school days to a powerful alumni network making
            a difference across generations.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
