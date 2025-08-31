"use client"

import { useRef, useEffect } from "react"
import { Bell, Mail, Calendar, Users } from "lucide-react"

export default function EventsNewsletter() {
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
    <section ref={sectionRef} className="relative py-20 bg-blue-900 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        {/* Pattern overlay */}
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
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Never miss an event! Subscribe to our newsletter and get notified about upcoming events, early bird
            discounts, and exclusive alumni gatherings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Newsletter Signup */}
          <div className="animate-item">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-amber-400 p-3 rounded-full">
                  <Bell className="w-6 h-6 text-blue-900" />
                </div>
                <h3 className="text-2xl font-bold">Event Notifications</h3>
              </div>
              <p className="text-white/80 mb-6">
                Get instant notifications about new events, registration deadlines, and important updates directly to
                your inbox.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button className="bg-amber-400 text-blue-900 px-6 py-3 rounded-lg hover:bg-amber-300 transition-colors font-medium">
                  Subscribe to Updates
                </button>
              </div>
            </div>
          </div>

          {/* Event Planning */}
          <div className="animate-item">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-amber-400 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-900" />
                </div>
                <h3 className="text-2xl font-bold">Suggest an Event</h3>
              </div>
              <p className="text-white/80 mb-6">
                Have an idea for an event? We&#39;d love to hear from you! Help us plan events that bring our community
                together.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <textarea
                  placeholder="Describe your event idea..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                ></textarea>
                <button className="w-fit bg-amber-400 text-blue-900 px-6 py-3 rounded-lg hover:bg-amber-300 transition-colors font-medium">
                  Submit Suggestion
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 max-w-4xl mx-auto animate-item">
          <h3 className="text-2xl font-bold mb-6 text-center">Event Planning Committee</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/20 p-4 rounded-xl mb-4">
                <Mail className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Email Us</h4>
                <p className="text-white/80 text-sm">events@fgcikotekpene88.com</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 p-4 rounded-xl mb-4">
                <Users className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Join Planning</h4>
                <p className="text-white/80 text-sm">Volunteer for event organization</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 p-4 rounded-xl mb-4">
                <Calendar className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Event Calendar</h4>
                <p className="text-white/80 text-sm">View all upcoming events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
