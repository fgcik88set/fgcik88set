"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Calendar, MapPin, Clock, Users, Star, Mail, Share2, Download, Globe, Video } from "lucide-react"
import { eventCategories, EventProps } from "../constants/events-data"


interface EventDetailsModalProps {
  event: EventProps | null
  isOpen: boolean
  onClose: () => void
  isUpcoming: boolean
}

export default function EventDetailsModal({ event, isOpen, onClose, isUpcoming }: EventDetailsModalProps) {
  const [imageError, setImageError] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
      setActiveTab("overview")
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen || !event) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryStyle = (categoryId: string) => {
    const category = eventCategories.find((cat) => cat.id === categoryId)
    return category?.color || "bg-blue-100 text-blue-800"
  }

//   const getRegistrationProgress = () => {
//     if (!event.capacity || !event.registered) return 0
//     return (event.registered / event.capacity) * 100
//   }

  const tabs = [
    { id: "overview", label: "Overview", icon: Calendar },
    { id: "location", label: "Location", icon: MapPin },
  ]

  return (
    <div
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
      onClick={(e) => {
        // Close modal if clicking on the backdrop (not on content)
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onClose()
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-slate-900 truncate max-w-md">{event.title}</h1>
                <p className="text-sm text-slate-600">{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
              {isUpcoming && (
                <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
                  Register Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-80 lg:h-96">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent z-10"></div>

        {!imageError ? (
          <Image
            src={event.image || "/placeholder.svg?height=600&width=1200"}
            alt={event.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <Calendar className="w-24 h-24 text-blue-700" />
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 lg:p-8">
          <div className="px-6 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getCategoryStyle(event.category)}`}
              >
                {event.category}
              </div>
              {event.featured && (
                <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              )}
              {event.isVirtual && (
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Video className="w-3 h-3" />
                  Virtual
                </div>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{event.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-90">Date</p>
                  <p className="font-medium">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-90">Time</p>
                  <p className="font-medium">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-90">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 sm:px-8 lg:px-12 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 xl:flex-[3]">
            {/* Navigation Tabs */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 mb-8 bg-slate-100 p-1 rounded-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-md font-medium transition-colors flex-1 justify-center ${
                      activeTab === tab.id ? "bg-white text-blue-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">About This Event</h2>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-700 leading-relaxed text-lg">{event.description}</p>
                    </div>
                  </div>

                  {event.highlights && event.highlights.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500" />
                        Event Highlights
                      </h3>
                      <div className="flex flex-col space-y-4">
                        {event.highlights.map((highlight, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <span className="text-slate-700 leading-relaxed">{highlight}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "location" && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Event Location</h2>
                  <div className="flex flex-col space-y-8">
                    <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                      <h3 className="text-xl font-semibold text-slate-900 mb-6">{event.venue}</h3>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-start gap-4">
                          <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-slate-600 mb-1">Address</p>
                            <p className="text-slate-800 font-medium">{event.location}</p>
                          </div>
                        </div>
                        {event.isVirtual && event.meetingLink && (
                          <div className="flex items-start gap-4">
                            <Globe className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm text-slate-600 mb-1">Virtual Meeting</p>
                              <a
                                href={event.meetingLink}
                                className="text-blue-600 hover:text-blue-800 underline font-medium"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Join Virtual Meeting
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {!event.isVirtual && (
                      <div className="h-80 bg-slate-200 rounded-lg flex flex-col items-center justify-center">
                        <div className="text-center text-slate-500">
                          <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <h3 className="text-lg font-medium mb-2">Interactive Map</h3>
                          <p>Map and directions will be available soon</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col space-y-6 xl:w-96">
            {/* Event Details */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Event Details</h3>
              <div className="flex flex-col space-y-6">
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-1">Date</p>
                    <p className="font-medium text-slate-900">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-1">Time</p>
                    <p className="font-medium text-slate-900">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-1">Organizer</p>
                    <p className="font-medium text-slate-900">{event.organizer}</p>
                  </div>
                </div>

                {event.contact && (
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 mb-1">Contact</p>
                      <a
                        href={`mailto:${event.contact}`}
                        className="font-medium text-blue-600 hover:text-blue-800 break-all"
                      >
                        {event.contact}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Share Event */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Share Event</h3>
              <div className="flex flex-col space-y-3">
                <button className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <Share2 className="w-5 h-5 text-slate-600" />
                  <span className="text-sm text-slate-700 font-medium">Share Event</span>
                </button>
                <button className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <Download className="w-5 h-5 text-slate-600" />
                  <span className="text-sm text-slate-700 font-medium">Download Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
