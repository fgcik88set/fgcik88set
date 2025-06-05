"use client"

import { useRef, useEffect } from "react"
import { Clock, Package, ShoppingBag, Star } from "lucide-react"

export default function MemorabiliaHero() {
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
    <div
      ref={heroRef}
      className="relative w-full pb-20 pt-32 bg-gradient-to-br from-darkBlue via-darkBlue to-blue-900 text-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        {/* Geometric patterns */}
        <div className="absolute top-20 left-20 w-32 h-32 border-[2px] border-white/10 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-[2px] border-amber-400/20 rounded-full"></div>

        {/* Floating dots */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-item">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Own a Piece of <span className="text-mainYellow">Our Story</span>
            </h1>
            <div className="w-32 h-1 bg-mainYellow mx-auto mb-8"></div>
            <p className="md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Where Stories Live Forever: Preserving History, One Keepsake at a Time. Discover our exclusive collection
              of Class of &#39;88 memorabilia, from yearbooks to apparel, each piece crafted to celebrate our shared legacy.
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid md:grid-cols-4 gap-6 mt-16 animate-item">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <ShoppingBag className="w-10 h-10 text-mainYellow mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">50+</div>
              <div className="text-white/80">Unique Items</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <Package className="w-10 h-10 text-mainYellow mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">4</div>
              <div className="text-white/80">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <Star className="w-10 h-10 text-mainYellow mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">Premium</div>
              <div className="text-white/80">Quality</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <Clock className="w-10 h-10 text-mainYellow mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">Fast</div>
              <div className="text-white/80">Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
