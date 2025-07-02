"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { Users, GraduationCap, Heart, CreditCard } from "lucide-react"

export default function PaymentPageDisplay() {
  const heroRef = useRef<HTMLDivElement>(null)

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

    const animatedElements = heroRef.current?.querySelectorAll(".animate-item")
    animatedElements?.forEach((el) => observer.observe(el))

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative w-full pb-20 pt-32 bg-gradient-to-br from-darkBlue via-blue-800 to-darkBlue text-white overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          {/* Geometric patterns */}
          <div className="absolute top-20 left-20 w-32 h-32 border-[2px] border-white/10 rounded-lg rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-[2px] border-amber-400/20 rounded-full"></div>

          {/* Floating dots */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-item">
              <GraduationCap className="h-16 w-16 mx-auto mb-6" style={{ color: "#f7e707" }} />
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Federal Government College <span style={{ color: "#f7e707" }}>Ikot Ekpene</span>
              </h1>
              <div className="w-32 h-1 mx-auto mb-8" style={{ backgroundColor: "#f7e707" }}></div>
              <p className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: "#f7e707" }}>
                Class of 1988
              </p>
              <p className="md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Welcome to our secure payment portal for alumni dues, event registrations, and welfare contributions.
                Supporting our community through convenient and secure online payments.
              </p>

              <Link
                href="payment/checkout"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: "#f7e707",
                  color: "#121212",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e6d006"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f7e707"
                }}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Make Payment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Categories Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-item">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#0c347d" }}>
              Payment Categories
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: "#f7e707" }}></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our secure payment options designed to support our alumni community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 animate-item">
            {/* Alumni Dues Card */}
            <div className="bg-white rounded-xl shadow-md border-2 border-transparent hover:border-mainYellow transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              <div className="p-6 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(12, 52, 125, 0.1)" }}
                >
                  <Users className="h-10 w-10" style={{ color: "#0c347d" }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#0c347d" }}>
                  Alumni Dues
                </h3>
                <p className="text-center leading-relaxed" style={{ color: "#121212", opacity: 0.8 }}>
                  Annual membership dues to support our alumni association activities and programs
                </p>
              </div>
            </div>

            {/* Event Registration Card */}
            <div className="bg-white rounded-xl shadow-md border-2 border-transparent hover:border-mainYellow transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              <div className="p-6 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(12, 52, 125, 0.1)" }}
                >
                  <GraduationCap className="h-10 w-10" style={{ color: "#0c347d" }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#0c347d" }}>
                  Event Registration
                </h3>
                <p className="text-center leading-relaxed" style={{ color: "#121212", opacity: 0.8 }}>
                  Registration fees for reunions, homecoming events, and special alumni gatherings
                </p>
              </div>
            </div>

            {/* Welfare Fund Card */}
            <div className="bg-white rounded-xl shadow-md border-2 border-transparent hover:border-mainYellow transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              <div className="p-6 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(12, 52, 125, 0.1)" }}
                >
                  <Heart className="h-10 w-10" style={{ color: "#0c347d" }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#0c347d" }}>
                  Welfare Fund
                </h3>
                <p className="text-center leading-relaxed" style={{ color: "#121212", opacity: 0.8 }}>
                  Contributions to support fellow alumni in times of need and community projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 px-4" style={{ backgroundColor: "#0c347d" }}>
        <p className="text-blue-100">Secure payments powered by Paystack • Class of 1988 Alumni Association</p>
      </div>
    </div>
  )
}
