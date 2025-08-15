"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Package, Star, Tag } from "lucide-react"
import { MemorabiliaItem, categories } from "../constants/memorabilia-data"


interface MemorabiliaCardProps {
  item: MemorabiliaItem
}

export default function MemorabiliaCard({ item }: MemorabiliaCardProps) {
  const [imageError, setImageError] = useState(false)

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category?.name || categoryId
  }

  return (
    <>
      <div className="relative group bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl lg:h-[70vh] transition-all duration-500 hover:-translate-y-2">
        {/* Featured Badge */}
        {item.isFeatured && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </div>
          </div>
        )}

        {/* Stock Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              item.isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {item.isAvailable ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-16 right-4 z-10">
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium capitalize">
            {getCategoryName(item.category)}
          </div>
        </div>

        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent z-10"></div>

          {!imageError ? (
            <Image
              src={item.image.url || "/placeholder.svg?height=400&width=300"}
              alt={item.image.alt || item.title}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Package className="w-16 h-16 text-blue-700" />
            </div>
          )}

          {/* Desktop Hover Overlay */}
          <div className="absolute inset-0 bg-blue-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 hidden md:flex items-center justify-center">
            <p className="text-center text-white hover:text-amber-300 transition-colors text-xl font-bold">
              {item.title}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-blue-700">{item.price}</span>
            {item.stockQuantity && (
              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">
                {item.stockQuantity} left
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 text-sm mb-4 line-clamp-3">{item.description}</p>

          {/* Tags Preview */}
          {item.tags && item.tags.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs">
                    +{item.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute bottom-4 w-fit flex items-center gap-3 pt-4 border-t border-slate-100">
            <button
              disabled={!item.isAvailable}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors flex-grow ${
                item.isAvailable
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {item.isAvailable ? "Order Now" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </>
  )
}
