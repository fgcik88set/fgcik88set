"use client"

import { useRef, useEffect } from "react"
import { BackgroundButton } from "../buttons/Buttons"
import SectionHeaderText from "../typography/SectionHeaderText"

export default function JoinCTA() {
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
    <section
      id="join-us"
      ref={sectionRef}
      className="relative py-10 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-amber-100/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-item">
          <SectionHeaderText text="Join Our Alumni Community" />
          <p className="text-lg text-slate-600 mb-8">
            Whether you&apos;re reconnecting with old friends or looking to contribute to our initiatives, we welcome all
            members of the Class of &apos;88 to join our vibrant community. Together, we can continue to make a meaningful
            impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BackgroundButton text="Register Now" link="#" btnWidth="w-full sm:w-auto" />
            
          </div>

          {/* <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="text-xl font-bold mb-3 text-blue-800">Stay Connected</h3>
            <p className="text-blue-700 mb-4">
              Join our mailing list to receive updates on upcoming events, initiatives, and opportunities to get
              involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
