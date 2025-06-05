"use client"

import { useRef, useEffect } from "react"
import { Heart, Users, Lightbulb, Award, Handshake, Globe } from "lucide-react"
import SectionHeaderText from "../typography/SectionHeaderText"


export default function CoreValues() {
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

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Compassion",
      description:
        "We care deeply about our members, alma mater, and communities, showing empathy and support in all our endeavors.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Unity",
      description:
        "We stand together as one family, embracing our diversity while celebrating our shared experiences and heritage.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
      title: "Innovation",
      description:
        "We encourage creative thinking and novel approaches to addressing challenges and creating opportunities.",
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Excellence",
      description: "We strive for the highest standards in all our personal, professional, and community endeavors.",
    },
    {
      icon: <Handshake className="w-8 h-8 text-green-600" />,
      title: "Integrity",
      description: "We uphold honesty, transparency, and ethical conduct in all our interactions and initiatives.",
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      title: "Service",
      description:
        "We are committed to giving back to society and making a positive impact in our communities and beyond.",
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-10 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-amber-100/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-item">
          <SectionHeaderText text="Our Core Values" />
          <p className="text-slate-600 max-w-2xl mx-auto">
            These principles guide our actions, decisions, and interactions as members of the FGC Ikot Ekpene Class of
            &#39;88 alumni community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300 animate-item"
            >
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">{value.title}</h3>
              <p className="text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
