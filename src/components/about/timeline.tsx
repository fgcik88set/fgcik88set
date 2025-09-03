"use client"

import { useRef, useEffect } from "react"
import SectionHeaderText from "../typography/SectionHeaderText"


export default function Timeline() {
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

const timelineEvents = [
    {
        id: 1,
        year: "1982",
        title: "Our Journey Begins",
        description:
            "The Class of '88 enters Federal Government College Ikot Ekpene as bright-eyed students from diverse backgrounds across Nigeria.",
    },
    {
        id: 2,
        year: "1988",
        title: "Graduation",
        description:
            "We complete our secondary education with distinction, ready to pursue higher education and make our mark in the world.",
    },
    {
        id: 3,
        year: "1998",
        title: "First Reunion",
        description:
            "Ten years after graduation, we organize our first major reunion, reconnecting classmates and establishing the foundation for our alumni association.",
    },
    {
        id: 4,
        year: "2016",
        title: " ⁠⁠Lagos Reunion",
        description:
            "The reunion was more than a social gathering — it was a testament to enduring bonds. Attendees came from near and far, carving time from their busy lives to reconnect.",
    },
    {
        id: 5,
        year: "2018",
        title: "⁠⁠Uyo Reunion",
        description:
            "A landmark celebration marking two decades since graduation, featuring the launch of our mentorship program and community development initiatives.",
    },
    {
        id: 6,
        year: "2019",
        title: "Alumni Project - Toilet",
        description:
            "A grand project impacting lives of students of FGC Ikot Ekpene and creating convenience.",
    },
    {
        id: 7,
        year: "2023",
        title: "⁠50 Years Anniversary Grand Reunion",
        description:
            "A milestone celebration marking 50 years since the founding of FGC Ikot Ekpene, and a proud moment for the Class of ’88 to join in honoring the school’s golden legacy. This event will bring together generations of alumni, teachers, and friends to reflect on the journey, celebrate achievements, and share in the joy of unity.",
    },
    {
        id: 8,
        year: "2024",
        title: "Calabar Reunion",
        description:
            "Beyond the fun and festivities, the reunion also served as a moment to strengthen bonds and commit to future projects that support both the class and their alma mater. ",
    },
]

  return (
    <section ref={sectionRef} className="relative py-10 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-amber-100/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-item">
          <SectionHeaderText text="Our Journey"  />
          <p className="text-slate-600 max-w-2xl mx-auto">
            From our first days at FGC Ikot Ekpene to our current endeavors, explore the key milestones that have shaped
            our alumni community.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="relative animate-item">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-600 border-4 border-white hidden md:block"></div>

                <div
                  className={`md:w-5/12 ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"} bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-300`}
                >
                  <div className="bg-blue-100 text-blue-800 font-bold text-sm inline-block px-3 py-1 rounded-full mb-3">
                    {event.year}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">{event.title}</h3>
                  <p className="text-slate-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
