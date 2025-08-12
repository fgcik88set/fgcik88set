"use client"

import { useRef, useEffect } from "react"
import { Phone, Mail} from "lucide-react"

export default function MemorabiliaOrdering() {
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
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
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

      <div className="w-[95%] mx-auto relative z-10">
        <div className="text-center mb-16 animate-item">
          <h2 className="text-4xl font-bold mb-4">How to Order</h2>
          <div className="w-24 h-1 bg-darkBlue mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto">
            Ready to own a piece of our history? Here&#39;s how you can place your order and get your memorabilia delivered
            to you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Ordering Process */}
          <div className="animate-item">
            <h3 className="text-2xl font-bold mb-8">Ordering Process</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-darkBlue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Browse & Select</h4>
                  <p className="text-sm">
                    Browse our collection and select the items you&#39;d like to purchase. Note down the item names and
                    quantities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-darkBlue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Contact Us</h4>
                  <p className="text-sm">
                    Contact our memorabilia team using any of the methods below with your order details and delivery
                    information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-darkBlue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Payment & Confirmation</h4>
                  <p className="text-sm">
                    We&#39;ll confirm your order details and provide payment instructions. Payment can be made via bank
                    transfer or mobile money.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-darkBlue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Delivery</h4>
                  <p className="text-sm">
                    Your items will be carefully packaged and delivered to your specified address within 7-14 business
                    days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="animate-item">
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
            <div className="space-y-6">
              <div className="bg-darkBlue/95 text-white backdrop-blur-sm p-6 rounded-xl border border-darkBlue/10">
                <div className="flex items-center gap-4 mb-4">
                  <Phone className="w-6 h-6 text-mainYellow" />
                  <h4 className="font-semibold">Phone Orders</h4>
                </div>
                <p className="mb-2">Call us directly to place your order</p>
                <p className="font-medium">+234 803 123 4567</p>
                <p className="font-medium">+234 806 987 6543</p>
              </div>

              <div className="bg-darkBlue/95 text-white backdrop-blur-sm p-6 rounded-xl border border-darkBlue/10">
                <div className="flex items-center gap-4 mb-4">
                  <Mail className="w-6 h-6 text-mainYellow" />
                  <h4 className="font-semibold">Email Orders</h4>
                </div>
                <p className="mb-2">Send us your order details via email</p>
                <p className="font-medium">memorabilia@fgcikotekpene88.com</p>
                <p className="font-medium">orders@class88alumni.org</p>
              </div>

              {/* <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <MapPin className="w-6 h-6 text-mainYellow" />
                  <h4 className="font-semibold">Pickup Location</h4>
                </div>
                <p className="text-white/80 mb-2">Visit us for direct pickup</p>
                <p className="font-medium">Alumni Center, FGC Ikot Ekpene</p>
                <p className="font-medium">Ikot Ekpene, Akwa Ibom State</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="w-6 h-6 text-mainYellow" />
                  <h4 className="font-semibold">Business Hours</h4>
                </div>
                <p className="text-white/80 mb-2">We&#39;re available to assist you</p>
                <p className="font-medium">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="font-medium">Saturday: 10:00 AM - 2:00 PM</p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Order Form CTA */}
        {/* <div className="mt-16 bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 max-w-3xl mx-auto animate-item">
          <h3 className="text-2xl font-bold mb-4 text-center">Quick Order Form</h3>
          <p className="text-white/80 text-center mb-6">
            Fill out this form with your order details and we&#39;ll get back to you within 24 hours.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your full name"
              className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-mainYellow"
            />
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-mainYellow"
            />
            <input
              type="tel"
              placeholder="Your phone number"
              className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-mainYellow"
            />
            <input
              type="text"
              placeholder="Delivery location"
              className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-mainYellow"
            />
          </div>
          <textarea
            placeholder="List the items you'd like to order with quantities..."
            rows={4}
            className="w-full mt-4 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-mainYellow"
          ></textarea>
          <div className="text-center mt-6">
            <button className="bg-mainYellow text-blue-900 px-8 py-3 rounded-lg hover:bg-amber-300 transition-colors font-medium">
              Submit Order Request
            </button>
          </div>
        </div> */}
      </div>
    </section>
  )
}
