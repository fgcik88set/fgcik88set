"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TrusteeCard from "./trustee-card"
import { TrusteeProps } from "../constants/trustees-data"

interface TrusteeCarouselProps {
  trustees: TrusteeProps[]
  isCurrent: boolean
}

export default function TrusteeCarousel({ trustees, isCurrent }: TrusteeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Reset index when trustees change
  useEffect(() => {
    setCurrentIndex(0)
  }, [trustees])

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : trustees.length - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex < trustees.length - 1 ? prevIndex + 1 : 0))
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      handlePrevious()
    } else if (info.offset.x < -swipeThreshold) {
      handleNext()
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  if (trustees.length === 0) {
    return null
  }

  return (
    <div className="relative w-full">
      {/* Carousel container */}
      <div className="relative w-full h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white ">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <div className="w-full h-full">
              <TrusteeCard trustee={trustees[currentIndex]} isCurrent={isCurrent} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {trustees.length > 1 && (
          <>
            <motion.button
              onClick={handlePrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-[30%] -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200"
              aria-label="Previous trustee"
            >
              <ChevronLeft className="h-6 w-6 text-slate-700" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-[30%] -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-200"
              aria-label="Next trustee"
            >
              <ChevronRight className="h-6 w-6 text-slate-700" />
            </motion.button>
          </>
        )}
      </div>

      {/* Pagination indicators */}
      {trustees.length > 1 && (
        <div className="flex justify-center gap-3 mt-2">
          {trustees.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? "w-8 bg-blue-600 shadow-lg" 
                  : "w-3 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            />
          ))}
        </div>
      )}

      {/* Trustee counter */}
      <motion.div 
        className="text-center mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-sm font-medium text-slate-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
          {currentIndex + 1} of {trustees.length}
        </span>
      </motion.div>
    </div>
  )
}
