"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import SectionHeaderText from "../typography/SectionHeaderText"

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

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

  const testimonials = [
    {
      quote:
        "Being part of the Class of '88 alumni network has been one of the most rewarding aspects of my professional journey. The connections I've made and the support I've received have been invaluable.",
      name: "Dr. Sarah Johnson",
      title: "Neurosurgeon",
      image: "/images/fgcman.webp",
    },
    {
      quote:
        "The mentorship program organized by our alumni association helped me navigate the early stages of my career. I'm proud to now be giving back as a mentor to the next generation.",
      name: "Michael Chen",
      title: "Tech Entrepreneur",
      image: "/images/fgcman.webp",
    },
    {
      quote:
        "Our class reunions are more than just social gatherings—they're opportunities to collaborate on meaningful projects that make a difference in our communities. This network is truly special.",
      name: "Amina Okafor",
      title: "Environmental Scientist",
      image: "/images/fgcman.webp",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={sectionRef} className="relative py-10 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-darkBlue/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-mainYellow/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-item">
          <SectionHeaderText text="Alumni Voices" />
          <div className="w-24 h-1 bg-mainYellow mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto animate-item bg-darkBlue/90">
          <div className="relative bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-white/10">
            <Quote className="absolute top-5 left-6 w-6 h-6 text-white" />

            <div className="relative">
              <div className="transition-opacity duration-500" style={{ opacity: 1 }}>
                <p className="text-xl md:text-lg mb-8 relative z-10 text-white">
                &quot;{testimonials[currentIndex].quote}&quot;
                </p>

                <div className="flex items-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">{testimonials[currentIndex].name}</h4>
                    <p className="text-white">{testimonials[currentIndex].title}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 flex space-x-3">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-darkBlue hover:bg-white/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-darkBlue hover:bg-white/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index ? "bg-mainYellow w-6" : "bg-white/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
