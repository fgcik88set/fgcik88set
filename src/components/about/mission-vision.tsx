"use client"

import { useRef, useEffect } from "react"
import { BsArrowRight, BsEye } from "react-icons/bs"
import { FiTarget } from "react-icons/fi"
// import { Target, Eye, ArrowRight } from "lucide-react"

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const animatedElements = sectionRef.current?.querySelectorAll(".animate-item")
    animatedElements?.forEach((el) => observer.observe(el))

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 bg-darkBlue text-white overflow-hidden">
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
          <h2 className="font-chewy text-4xl font-bold mb-4">Our Mission & Vision</h2>
          <div className="w-24 h-1 bg-mainYellow mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 animate-item">
            <div className="bg-mainYellow w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FiTarget className="w-8 h-8 text-darkBlue" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              To foster a vibrant alumni community that supports the personal and professional growth of its members,
              contributes to the development of our alma mater, and makes meaningful impact in society through
              collaborative initiatives and mentorship.
            </p>
            <ul className="space-y-3">
              {[
                "Strengthen bonds among Class of '88 alumni",
                "Support educational initiatives at FGC Ikot Ekpene",
                "Provide mentorship to current students and recent graduates",
                "Implement community development projects",
                "Create networking opportunities for professional growth",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <BsArrowRight className="w-4 h-4 text-mainYellow flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 animate-item">
            <div className="bg-mainYellow w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <BsEye className="w-8 h-8 text-darkBlue" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              To be recognized as a model alumni association that exemplifies excellence, unity, and impactful
              leadership, inspiring future generations to uphold the values and traditions of FGC Ikot Ekpene while
              adapting to the changing global landscape.
            </p>
            <ul className="space-y-3">
              {[
                "Become a leading example of alumni engagement and impact",
                "Create sustainable scholarship programs for deserving students",
                "Establish an endowment fund for long-term educational support",
                "Develop innovative solutions to community challenges",
                "Build a global network of successful professionals from our class",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <BsArrowRight className="w-4 h-4 text-mainYellow flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
