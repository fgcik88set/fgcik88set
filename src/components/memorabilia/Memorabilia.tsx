"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { memorabiliaItems } from "../constants/data"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { CgShoppingCart } from "react-icons/cg"
import Link from "next/link"

export default function MemorabiliaSection() {
    const [activeCategory, setActiveCategory] = useState<string>("all")
  const scrollContainerRef = useRef<HTMLDivElement>(null)


  const categories = [
    { id: "all", name: "All Items" },
    { id: "books", name: "Books & Albums" },
    { id: "accessories", name: "Accessories" },
    { id: "apparel", name: "Apparel" },
    { id: "homeware", name: "Homeware" },
  ]

  const filteredItems =
    activeCategory === "all" ? memorabiliaItems : memorabiliaItems.filter((item) => item.category === activeCategory)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = 320 // Approximate width of a card + gap

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  return (
    <section className="">
      <div className="container mx-auto px-4">
        

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Mobile scroll controls */}
        <div className="flex justify-end gap-2 mb-4 md:hidden">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
            aria-label="Scroll left"
          >
            <BiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
            aria-label="Scroll right"
          >
            <BiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Memorabilia items - scrollable on mobile, grid on desktop */}
        <div
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-6 md:overflow-visible snap-x snap-mandatory md:snap-none"
          style={{ scrollbarWidth: "none" }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="min-w-[280px] w-[280px] md:w-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 snap-start"
            >
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  placeholder="blur"
                  blurDataURL="/placeholder.svg?height=400&width=300"
                  className="object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <span className="font-bold text-blue-600">{item.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 capitalize">
                    {item.category}
                  </span>
                  <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    <CgShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-10">
          <Link
            href="/memorabilia"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-darkBlue hover:bg-blue-700 transition-colors"
          >
            View All Memorabilia
          </Link>
        </div>
      </div>
    </section>
  )
}