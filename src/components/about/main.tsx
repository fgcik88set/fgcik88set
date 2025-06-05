"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import SectionHeaderText from "../typography/SectionHeaderText"
import { BackgroundButton } from "../buttons/Buttons"
import AboutMainImg from "../../../public/images/abtus.webp"


export default function AboutMain() {
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
      ref={sectionRef}
      className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-amber-100/20 blur-3xl"></div>
        <div className="absolute top-20 left-10 w-32 h-32 border-[15px] border-blue-200/10 rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 border-[20px] border-amber-200/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="animate-item">
          <SectionHeaderText text="Class of '88" />
          <p className="italic text-center text-slate-600 max-w-3xl mx-auto">
            Celebrating the Legacy of FGC Ikot Ekpene - Class of &rsquo;88
          </p>
        </div>

        <div className="mt-16 flex flex-col lg:flex-row gap-12 justify-between items-center">
          <div className="w-full lg:w-1/2 animate-item">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-900/10 via-amber-400/5 to-transparent rounded-xl blur-sm transform transition-all duration-500 group-hover:blur-md"></div>
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent mix-blend-overlay"></div>
                <Image
                  src={AboutMainImg}
                  priority
                  alt="About us"
                  className="w-full h-auto rounded-xl transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent opacity-60 pointer-events-none"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-4 border-amber-400/20 rounded-lg z-0"></div>
              <div className="absolute -top-4 -left-4 w-12 h-12 border-2 border-blue-400/20 rounded-full z-0"></div>
            </div>
          </div>

          <div className="w-full lg:w-[45%] animate-item">
            <div className="relative">
              <div className="absolute -top-10 -left-8 text-8xl text-blue-200/30 font-serif">&quot;</div>
              <div className="absolute -bottom-16 right-16 text-8xl text-blue-200/30 font-serif rotate-180">&quot;</div>

              <div className="space-y-6 text-slate-700 relative z-10">
                <p className="text-lg leading-relaxed">
                  More than just an alumni group, we are a close-knit community bound by shared experiences, lifelong
                  friendships, and a commitment to excellence. Our journey began in the hallowed halls of Federal
                  Government College Ikot Ekpene, where we were molded into leaders and visionaries.
                </p>

                <p className="text-lg leading-relaxed">
                  Since our graduation in 1988, we have maintained strong bonds that transcend geographical boundaries
                  and professional domains. Our alumni network spans across various sectors including medicine,
                  engineering, law, business, education, and public service.
                </p>

                <p className="text-lg leading-relaxed">
                  We take pride in our diversity and the collective impact we continue to make in our communities and
                  beyond. Through regular reunions, mentorship programs, and philanthropic initiatives, we honor our
                  shared heritage while creating lasting legacies for future generations.
                </p>
              </div>
            </div>

            <div className="mt-10 relative">
              <BackgroundButton text="Join Our Community" link="#join-us" btnWidth="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
