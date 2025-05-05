"use client";

import Image from "next/image";
import { NostalgicGalleryProps } from "../constants/interfaces";
import { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight, BiPause, BiPlay } from "react-icons/bi";

export default function MemSection({ items }: NostalgicGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Auto-play carousel on mobile
    // useEffect(() => {
    //   if (!isMobile || !isPlaying || items.length <= 1) return

    //   const interval = setInterval(() => {
    //     goToNext()
    //   }, autoPlayInterval)

    //   return () => clearInterval(interval)
    // }, [isMobile, isPlaying, items.length, autoPlayInterval])

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNext();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      goToPrevious();
    }
  };

  // Handle video refs
  const setVideoRef = (element: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = element;
  };

  return (
    <div className="w-[95%] mx-auto py-8">
      {/* Mobile Carousel View */}
      <div className={`${isMobile ? "block" : "hidden"}`}>
        <div
          className="relative h-[60vh] overflow-hidden rounded-lg shadow-lg bg-gray-100"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {item.type === "image" ? (
                <div className="relative w-full h-full">
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm">{item.year}</p>
                    <p className="text-white font-medium">{item.description}</p>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <video
                    ref={(el) => setVideoRef(el, index)}
                    src={item.src}
                    poster={item.thumbnail}
                    controls
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm">{item.year}</p>
                    <p className="text-white font-medium">{item.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Carousel Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20"
            aria-label="Previous slide"
          >
            <BiChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20"
            aria-label="Next slide"
          >
            <BiChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-20"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <BiPause className="w-5 h-5" />
            ) : (
              <BiPlay className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className={`${isMobile ? "hidden" : "block"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-100 aspect-square"
            >
              {item.type === "image" ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-lg font-bold">{item.year}</p>
                    <p className="text-white text-xl font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full group">
                  <video
                    src={item.src}
                    poster={item.thumbnail}
                    controls
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-lg font-bold">{item.year}</p>
                    <p className="text-white text-xl font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        
      </div>
      
    </div>
  );
}
