"use client";

import { useRef, useEffect, useState } from "react";
import ExecutiveCard from "./executive-card";
import { useMobile } from "@/hooks/use-mobile";
import ExecutiveCarousel from "./executive-carousel";
import { getCurrentExecutives } from "@/sanity/sanity-utils";
import { ExecutiveProps } from "../constants/executives-data";

export default function CurrentExecutives() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const [executives, setExecutives] = useState<ExecutiveProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const data = await getCurrentExecutives();
        
        // Sort executives to show President and Vice President first
        const sortedExecutives = data.sort((a: ExecutiveProps, b: ExecutiveProps) => {
          const positionOrder = {
            'President': 1,
            'Vice President': 2,
            'Secretary': 3,
            'Treasurer': 4,
            'Public Relations Officer': 5,
            'Welfare Officer': 6,
            'Projects Coordinator': 7,
            'Social Secretary': 8
          };
          
          const aOrder = positionOrder[a.position as keyof typeof positionOrder] || 999;
          const bOrder = positionOrder[b.position as keyof typeof positionOrder] || 999;
          
          return aOrder - bOrder;
        });
        
        setExecutives(sortedExecutives);
      } catch (error) {
        console.error("Error fetching executives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExecutives();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements =
      sectionRef.current?.querySelectorAll(".animate-item");
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="w-[95%] mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Current Term July,2023 - August,2025
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Current <span className="text-darkBlue">Executive Team</span>
            </h2>
            <div className="w-24 h-1 bg-darkBlue mx-auto mb-6"></div>
            <p className="md:text-lg text-slate-600 max-w-3xl mx-auto">
              Our current leadership team brings together diverse expertise and
              unwavering commitment to advance our alumni community&#39;s mission
              and vision.
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-darkBlue"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-amber-100/20 blur-3xl"></div>

        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-[15px] border-blue-200/10 rounded-full"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 border-[10px] border-amber-200/10 rounded-lg rotate-45"></div>
      </div>

      <div className="w-[95%] mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-item">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Current Term July,2023 - August,2025
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Current <span className="text-darkBlue">Executive Team</span>
          </h2>
          <div className="w-24 h-1 bg-darkBlue mx-auto mb-6"></div>
          <p className="md:text-lg text-slate-600 max-w-3xl mx-auto">
            Our current leadership team brings together diverse expertise and
            unwavering commitment to advance our alumni community&#39;s mission
            and vision.
          </p>
        </div>

        {/* Desktop Grid View */}
        {!isMobile && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {executives.map((executive: ExecutiveProps, index: number) => (
              <div
                key={executive.id}
                className="animate-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ExecutiveCard executive={executive} isCurrent={true} />
              </div>
            ))}
          </div>
        )}        

        {/* Mobile view */}
        {isMobile && (
          <div className="animate-item">
            <ExecutiveCarousel
              executives={executives}
              isCurrent={true}
            />
          </div>
        )}
      </div>
    </section>
  );
}
