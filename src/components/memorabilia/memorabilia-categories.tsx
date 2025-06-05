"use client"

import { useRef, useEffect } from "react"
import { BookOpen, Shirt, Coffee, Home } from "lucide-react"
import { categories } from "../constants/memorabilia-data"


export default function MemorabiliaCategories() {
  const sectionRef = useRef<HTMLElement>(null)

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

  const categoryIcons = {
    books: <BookOpen className="w-8 h-8 text-blue-700" />,
    apparel: <Shirt className="w-8 h-8 text-blue-700" />,
    accessories: <Coffee className="w-8 h-8 text-blue-700" />,
    homeware: <Home className="w-8 h-8 text-blue-700" />,
  }

  return (
    <section ref={sectionRef} className="relative py-12 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-amber-100/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-item">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Shop by <span className="text-blue-700">Category</span>
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our diverse range of memorabilia organized by category. Each item is carefully crafted to celebrate
            our shared heritage and preserve our memories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories
            .filter((cat) => cat.id !== "all")
            .map((category, index) => (
              <div
                key={category.id}
                className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300 animate-item text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {categoryIcons[category.id as keyof typeof categoryIcons]}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{category.name}</h3>
                <p className="text-slate-600 text-sm">{category.description}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
