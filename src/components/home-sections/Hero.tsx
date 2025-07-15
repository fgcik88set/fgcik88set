"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import HeroImg from "../../../public/images/fgcikHero.webp";
import { AnimatedTextHeader } from "../animated-text/Typed";
import { BackgroundButton } from "../buttons/Buttons";

export default function HeroSection() {
  const decorRef = useRef<HTMLDivElement>(null);

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

        // Apply transform to each decorative element
        (
          elem as HTMLElement
        ).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-[90vh] lg:h-screen pt-32 md:pt-20 overflow-hidden">
      {/* Decorative background elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        {/* Top-right decorative circle */}
        <div className="decor-element absolute top-20 right-[5%] w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>

        {/* Bottom-left decorative circle */}
        <div className="decor-element absolute bottom-20 left-[5%] w-48 h-48 rounded-full bg-amber-100/20 blur-3xl"></div>

        {/* Decorative dots pattern */}
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

        {/* Decorative lines */}
        <div className="decor-element absolute -top-20 -right-20 w-64 h-64 border-[40px] border-blue-200/10 rounded-full"></div>
        <div className="decor-element absolute -bottom-32 -left-32 w-96 h-96 border-[30px] border-amber-200/10 rounded-full"></div>
      </div>

      {/* Main content - keeping original code intact */}
      <div className="flex flex-col md:flex-row justify-between items-center w-[95%] gap-6 mx-auto h-full relative z-10">
        <div className="w-full lg:w-[50%] flex flex-col">
          <div className="mb-4">
            <div className="">
              <h1 className="text-[2.5rem] text-nowrap md:text-[3.5rem] lg:text-6xl font-bold">
                Class of &rsquo;88 -{" "}
              </h1>
            </div>

            <AnimatedTextHeader
              messages={["Stronger Together", "Family Forever"]}
              color="#0c347d"
            />
          </div>

          <p className="mb-8 md:text-lg">
            A network of professionals, lifelong friends, and changemakers,
            united by shared memories and a commitment to excellence. We
            celebrate our journey, support one another, and give back to the
            next generation,because true bonds last a lifetime.
          </p>

          <BackgroundButton
            btnWidth="w-fit"
            link="#"
            text="Explore"
          />
        </div>

        {/* Image with enhanced wrapper */}
        <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-center">
          {/* Decorative frame behind image */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-blue-900/20 to-transparent rounded-2xl blur-sm"></div>

          {/* Original image container with preserved styling */}
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/50 border-4 border-blue-900/50">
            <Image src={HeroImg} alt="Hero Image" />

            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none"></div>
          </div>

          {/* Decorative accent */}
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
