"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Mail, Linkedin, Calendar, Award, MapPin, Phone, Globe, ExternalLink } from "lucide-react"
import { TrusteeProps } from "../constants/trustees-data"



interface TrusteeModalProps {
  trustee: TrusteeProps
  isCurrent: boolean
  isOpen: boolean
  onClose: () => void
}

export default function TrusteeModal({ trustee, isCurrent, isOpen, onClose }: TrusteeModalProps) {
  const [imageError, setImageError] = useState(false)

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed flex inset-0 z-50 py-4 px-2"> 
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 text-slate-700" />
        </button>

        {/* Modal Body */}
        <div className="flex flex-col max-h-[75vh] overflow-y-auto">
          {/* Left Side - Image and Basic Info */}
          <div className="w-full relative">
            {/* Status Badge */}
            {isCurrent && (
              <div className="absolute top-6 left-6 z-10">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Current Executive
                </div>
              </div>
            )}

            {/* Executive Image */}
            <div className="relative h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent z-10"></div>

              {!imageError ? (
                <Image
                  src={trustee.image || "/placeholder.svg?height=600&width=400"}
                  alt={trustee.name}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-blue-700 text-8xl font-bold">
                    {trustee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                </div>
              )}

              {/* Overlay Info */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <h2 className="text-xl font-bold text-white mb-2">{trustee.name}</h2>
                <p className="text-blue-200 text-lg font-medium">{trustee.position}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4 text-blue-200" />
                  <span className="text-blue-200 text-sm">{isCurrent ? "Current Term" : trustee.term}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Detailed Information */}
          <div className="w-full py-4 px-3">
            <div className="space-y-8">
              {/* Biography Section */}
              {trustee.bio && (
                <div>
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    Biography
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{trustee.bio}</p>
                </div>
              )}

              {/* Achievements Section */}
              {trustee.achievements && trustee.achievements.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    Key Achievements
                  </h3>
                  <div className="space-y-3">
                    {trustee.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-xs text-slate-700">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                  Contact Information
                </h3>
                <div className="grid gap-4">
                  {trustee.email && (
                    <a
                      href={`mailto:${trustee.email}`}
                      className="relative flex items-center gap-2 py-4 px-2 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Mail className="w-3 h-3 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Email</p>
                        <p className="text-slate-600 text-xs">{trustee.email}</p>
                      </div>
                      <ExternalLink className="absolute right-0 top-4 w-4 h-4 text-slate-400" />
                    </a>
                  )}

                  {trustee.linkedIn && (
                    <a
                      href={trustee.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center gap-3 py-4 px-2 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Linkedin className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">LinkedIn</p>
                        <p className="text-slate-600 text-xs">Professional Profile</p>
                      </div>
                      <ExternalLink className="absolute right-0 top-4 w-4 h-4 text-slate-400" />
                    </a>
                  )}

                  {/* Additional contact fields can be added here */}
                  {trustee.phone && (
                    <div className="flex items-center gap-3 py-4 px-2 bg-slate-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Phone className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Phone</p>
                        <p className="text-slate-600 text-xs">{trustee.phone}</p>
                      </div>
                    </div>
                  )}

                  {trustee.location && (
                    <div className="flex items-center gap-3 py-4 px-2 bg-slate-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Location</p>
                        <p className="text-slate-600 text-xs">{trustee.location}</p>
                      </div>
                    </div>
                  )}

                  {trustee.website && (
                    <a
                      href={trustee.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex items-center gap-3 py-4 px-2 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Globe className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Website</p>
                        <p className="text-slate-600 text-xs">Personal/Professional Website</p>
                      </div>
                      <ExternalLink className="absolute right-0 top-4 w-4 h-4 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>

              {/* Term Information */}
              <div className="bg-blue-50 py-4 px-2 rounded-xl">
                <h3 className="text-lg font-bold text-blue-900 mb-3">Term Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Position</p>
                    <p className="text-blue-900 text-xs">{trustee.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Term Period</p>
                    <p className="text-blue-900 text-xs">{isCurrent ? "2023-2025 (Current)" : trustee.term}</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
