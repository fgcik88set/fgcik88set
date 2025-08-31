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
      title: "Excellence",
      description:
        "We pursue the highest standards in leadership, education, and alumni engagement",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Unity",
      description:
        "We foster strong, lifelong connections rooted in shared heritage and mutual respect",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
      title: "Innovation",
      description:
        " We embrace creativity and forward-thinking solutions to drive progress.",
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Leadership",
      description: " We lead with integrity, purpose, and a commitment to positive change",
    },
    {
      icon: <Handshake className="w-8 h-8 text-green-600" />,
      title: "Empowerment",
      description: "We uplift others through education, mentorship, and opportunity",
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      title: "⁠Legacy",
      description:
        "We honor the traditions of FGC Ikot Ekpene while shaping a bold, global future",
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      title: "Global Connection",
      description:
        "We build bridges across borders, creating a network of impact and collaboration",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
