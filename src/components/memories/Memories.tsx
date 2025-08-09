"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { getMoments } from "@/sanity/sanity-utils";

interface Moment {
  id: string;
  title: string;
  date: string;
  images: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
}

export default function MemoriesSection() {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch moments from Sanity
  useEffect(() => {
    const fetchMoments = async () => {
      try {
        setLoading(true);
        const data = await getMoments();
        // Only take the first 8 moments for homepage display
        setMoments(data.slice(0, 8));
      } catch (err) {
        console.error("Error fetching moments:", err);
        setMoments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMoments();
  }, []);

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

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? moments.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === moments.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (moments.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No moments available</p>
      </div>
    );
  }

  return (
    <div className="py-8" ref={sectionRef}>
      {/* Mobile Carousel View */}
      <div className={`${isMobile ? "block" : "hidden"}`}>
        <div className="relative h-[60vh] overflow-hidden rounded-lg shadow-lg bg-gray-100">
          {moments.map((moment, index) => (
            <div
              key={moment.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="relative w-full h-full">
                {moment.images && moment.images.length > 0 ? (
                  <Image
                    src={moment.images[0].url}
                    alt={moment.images[0].alt || moment.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center gap-2 text-white text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(moment.date)}</span>
                  </div>
                  <p className="text-white font-medium text-lg">{moment.title}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
            {moments.map((_, index) => (
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
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-darkBlue hover:bg-darkBlue/50 text-white rounded-full p-2 z-20"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-darkBlue hover:bg-darkBlue/50 text-white rounded-full p-2 z-20"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className={`${isMobile ? "hidden" : "block"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {moments.map((moment) => (
            <div
              key={moment.id}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-100 aspect-square group"
            >
              {moment.images && moment.images.length > 0 ? (
                <Image
                  src={moment.images[0].url}
                  alt={moment.images[0].alt || moment.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-center gap-2 text-white text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(moment.date)}</span>
                </div>
                <p className="text-white font-medium text-lg">
                  {moment.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
