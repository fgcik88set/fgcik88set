"use client";

import { useRef, useEffect } from "react";
import { BsArrowRight, BsEye } from "react-icons/bs";
import SectionHeaderText from "../typography/SectionHeaderText";

// import { Target, Eye, ArrowRight } from "lucide-react"
import { FiTarget } from 'react-icons/fi';

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-darkBlue text-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-darkBlue/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-mainYellow/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-8 w-full h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-item">
          <SectionHeaderText text="Our Mission & Vision" />
          <div className="w-24 h-1 bg-mainYellow mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 animate-item">
            <div className="bg-mainYellow w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FiTarget className="w-8 h-8 text-darkBlue" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Mission Statement</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
            We exist to unite and empower the alumni of FGC Ikot Ekpene by fostering impactful leadership, lifelong connections, and educational advancement. Through exemplary engagement, global collaboration, and innovative community solutions, we honor our shared legacy while investing in a brighter, inclusive future.

            </p>
            <ul className="space-y-3">
              {[
                "Honouring Our Legacy",
                "Empowering the Future",
                "From Shared Roots to Global Impact",
                "United by Heritage",
                "Driven by Purpose.",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <BsArrowRight className="w-4 h-4 text-mainYellow flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/80 mt-6 leading-relaxed">Our journey needs a bit more than birth to death and resurrection into an alumni - some life defining moments or big changes and policies local and global that impacted us, to bridge the gap from 82-88. The shift from form 1-5 to JSS1-3 and SSS1-3 is such a story to weave into our journey</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 animate-item">
            <div className="bg-mainYellow w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <BsEye className="w-8 h-8 text-darkBlue" />
            </div> 
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              To cultivate a dynamic and connected Class of ’88 alumni network
              that:
            </p>
            
            <ul className="space-y-3">
              {[
                "⁠Strengthens lifelong bonds among members",
                "⁠Champions educational excellence at FGC Ikot Ekpene",
                " ⁠Guides current students and recent graduates through mentorship",
                "⁠⁠Drives meaningful community development initiatives",
                "⁠Creates powerful networking opportunities for personal and professional advancement",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <BsArrowRight className="w-4 h-4 text-mainYellow flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/80 mt-6 leading-relaxed">Together, we honor our shared legacy while shaping a brighter future for ourselves, our alma mater, and the society we serve.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
