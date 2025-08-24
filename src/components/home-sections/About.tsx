"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import SectionHeaderText from "../typography/SectionHeaderText";
import { BackgroundButton } from "../buttons/Buttons";
import AboutHeroImg from "../../../public/images/team2geda.webp"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Modified animation approach that ensures elements are visible by default
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add class to trigger animation
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full h-auto pt-16 pb-20 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative circles */}
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-amber-100/20 blur-3xl"></div>

        {/* Decorative patterns */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5">
          <div className="grid grid-cols-10 gap-8 w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-blue-900/80"
              ></div>
            ))}
          </div>
        </div>

        {/* Decorative lines */}
        <div className="absolute top-20 left-10 w-32 h-32 border-[15px] border-blue-200/10 rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 border-[20px] border-amber-200/10 rounded-full"></div>
      </div>

      <div className="w-[95%] mx-auto relative z-10">
        {/* Header - visible by default */}
        <div className="animate-item">
          <SectionHeaderText text="Class of '88" />
          <p className="italic text-center text-slate-600">
            Celebrating the Legacy of FGC Ikot Ekpene - Class of &rsquo;88
          </p>
        </div>

        <div className="mt-12 flex flex-col lg:flex-row gap-10 justify-between items-center">
          {/* Image container with modern styling - visible by default */}
          <div className="w-full lg:w-1/2 animate-item">
            <div className="relative group">
              {/* Decorative frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-900/10 via-amber-400/5 to-transparent rounded-xl blur-sm transform transition-all duration-500 group-hover:blur-md"></div>

              {/* Image with enhanced styling */}
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent mix-blend-overlay"></div>
                <Image
                  src={AboutHeroImg}
                  alt="About us"
                  className="rounded-xl "
                />

                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent opacity-60 pointer-events-none"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-4 border-amber-400/20 rounded-lg z-0"></div>
              <div className="absolute -top-4 -left-4 w-12 h-12 border-2 border-blue-400/20 rounded-full z-0"></div>
            </div>
          </div>

          {/* Text content with modern styling - visible by default */}
          <div className="w-full lg:w-[40%] mx-auto animate-item">
            <div className="relative">
              {/* Decorative quote marks */}
              <div className="absolute -top-10 -left-8 text-8xl text-blue-200/30 font-serif">
                &quot;
              </div>
              <div className="absolute -bottom-16 right-16 text-8xl text-blue-200/30 font-serif rotate-180">
                &quot;
              </div>

              <p className="text-base lg:text-lg mb-8 text-slate-700 relative z-10 leading-relaxed">
                More than just an alumni group, we are a close-knit community
                bound by shared experiences, lifelong friendships, and a
                commitment to excellence...
              </p>
            </div>

            <div className="relative">
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-900/5 to-transparent rounded-lg blur-sm"></div> */}
              <BackgroundButton
                text="Learn More"
                link="/about"
                btnWidth="w-fit"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-blue-900/5 to-transparent"></div>
    </section>
  );
}
