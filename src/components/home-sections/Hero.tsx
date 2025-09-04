"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import HeroImg1 from "../../../public/images/fgcikHero.webp";
import HeroImg2 from "../../../public/images/hero2.webp";
import HeroImg3 from "../../../public/images/hero3.webp";
import HeroImg4 from "../../../public/images/hero4.webp";
import HeroImg5 from "../../../public/images/hero5.webp";
import HeroImg6 from "../../../public/images/hero6.webp";
import HeroImg7 from "../../../public/images/hero7.webp";
import HeroImg8 from "../../../public/images/hero8.webp";
import HeroImg9 from "../../../public/images/hero9.webp";
import HeroImg10 from "../../../public/images/hero10.webp";
import HeroImg11 from "../../../public/images/hero11.webp";



import { AnimatedTextHeader } from "../animated-text/Typed";
import { BackgroundButton } from "../buttons/Buttons";

// Array of image imports to cycle through
const carouselImages = [HeroImg11, HeroImg1, HeroImg2, HeroImg3, HeroImg4, HeroImg5, HeroImg6, HeroImg7, HeroImg8, HeroImg9, HeroImg10];

export default function HeroSection() {
  const decorRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Subtle parallax effect for decorative elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!decorRef.current) return;

      const decorElements = decorRef.current.querySelectorAll(".decor-element");
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      decorElements.forEach((elem, i) => {
        const depth = i * 0.05 + 0.05;
        const moveX = x * 20 * depth;
        const moveY = y * 20 * depth;

        (elem as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full lg:h-screen pt-32 md:pt-20 overflow-hidden">
      {/* Decorative background elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="decor-element absolute top-20 right-[5%] w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="decor-element absolute bottom-20 left-[5%] w-48 h-48 rounded-full bg-amber-100/20 blur-3xl"></div>

        <div className="absolute top-28 md:top-40 left-0 w-full h-full opacity-20">
          <div className="grid grid-cols-12 gap-8 w-full h-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="decor-element w-2 h-2 rounded-full bg-blue-900/80 transform translate-y-[calc(100px*sin(i))]"
              ></div>
            ))}
          </div>
        </div>

        <div className="decor-element absolute -top-20 -right-20 w-64 h-64 border-[40px] border-blue-200/10 rounded-full"></div>
        <div className="decor-element absolute -bottom-32 -left-32 w-96 h-96 border-[30px] border-amber-200/10 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row justify-between items-center w-[95%] gap-6 mx-auto h-full relative z-10">
        {/* Text Content */}
        <div className="w-full lg:w-[50%] flex flex-col">
          <div className="mb-4">
            <h1 className="text-[2.5rem] text-nowrap md:text-[3.5rem] lg:text-6xl font-bold">
              Class of &rsquo;88 -{" "}
            </h1>
            <AnimatedTextHeader
              messages={["Stronger Together", "Family Forever"]}
              color="#0c347d"
            />
          </div>

          <p className="mb-8 md:text-lg">
            A network of professionals, lifelong friends, and changemakers,
            united by shared memories and a commitment to excellence. We
            celebrate our journey, support one another, and give back to the
            next generation, because true bonds last a lifetime.
          </p>

          <BackgroundButton btnWidth="w-fit" link="#about" text="Explore" />
        </div>

        {/* Image Carousel */}
        <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-center">
          {/* Decorative frame behind carousel */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-blue-900/20 to-transparent rounded-2xl blur-sm"></div>

          {/* Carousel Container */}
          <div className="relative z-10 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/50 border-4 border-blue-900/50">
            {carouselImages.map((img, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  i === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={img}
                  alt={`Class reunion image ${i + 1}`}
                  fill
                  // sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full object-cover"
                />
              </div>
            ))}

            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none"></div>
          </div>

          {/* Carousel Indicators (optional dots) */}
          <div className="absolute bottom-4 flex space-x-2 z-20">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? "bg-amber-400" : "bg-amber-400/40"
                }`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Decorative accents */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 border-8 border-amber-400/20 rounded-xl z-0"></div>
          <div className="absolute -top-6 -left-6 w-16 h-16 border-4 border-blue-400/20 rounded-full z-0"></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-8 h-14 border-2 border-blue-900/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-900/50 rounded-full mt-2 animate-pulse"></div>
        </div>
        <span className="text-xs text-blue-900/50 mt-2">Scroll</span>
      </div>
    </section>
  );
}