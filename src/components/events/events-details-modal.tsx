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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getCategoryStyle = (categoryId: string) => {
    const category = eventCategories.find((cat) => cat.id === categoryId)
    return category?.color || "bg-blue-100 text-blue-800"
  }

  const getStatusColor = (status: string) => {
    const statusColors = {
      upcoming: "bg-green-100 text-green-800",
      ongoing: "bg-yellow-100 text-yellow-800",
      past: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800"
    }
    return statusColors[status as keyof typeof statusColors] || "bg-blue-100 text-blue-800"
  }

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
              {/* Status Badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(event.eventStatus)}`}>
                {event.eventStatus}
              </div>

              {/* Category Badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryStyle(event.eventType)}`}>
                {eventCategories.find(cat => cat.id === event.eventType)?.name || event.eventType}
              </div>

              {/* Featured Badge */}
              {event.isFeatured && (
                <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 sm:px-8 lg:px-12 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
              {!imageError ? (
                <Image
                  src={event.image.url || "/placeholder.svg?height=400&width=600"}
                  alt={event.image.alt || event.title}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <Calendar className="w-24 h-24 text-blue-700" />
                </div>
              )}
            </div>

            {/* Event Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{event.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed">{event.description}</p>
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-700" />
                  <div>
                    <p className="font-medium text-slate-900">{formatDate(event.date)}</p>
                    <p className="text-sm text-slate-600">
                      {formatTime(event.date)}
                      {event.endDate && ` - ${formatTime(event.endDate)}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-700" />
                  <div>
                    <p className="font-medium text-slate-900">Location</p>
                    <p className="text-sm text-slate-600">{event.location}</p>
                  </div>
                </div>

                {event.maxAttendees && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-700" />
                    <div>
                      <p className="font-medium text-slate-900">Capacity</p>
                      <p className="text-sm text-slate-600">Maximum {event.maxAttendees} attendees</p>
                    </div>
                  </div>
                )}

                {event.registrationRequired && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-700" />
                    <div>
                      <p className="font-medium text-slate-900">Registration</p>
                      <p className="text-sm text-slate-600">Required for this event</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {isUpcoming ? (
                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors">
                    <Calendar className="w-4 h-4" />
                    {event.registrationRequired ? 'Register Now' : 'RSVP'}
                  </button>
                ) : (
                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
                    <Users className="w-4 h-4" />
                    View Photos
                  </button>
                )}
                
                <button className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share Event
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 mb-8">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-700 text-blue-700"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Event Overview</h3>
                  <p className="text-slate-600 leading-relaxed">{event.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-3">Event Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(event.eventStatus)}`}>
                          {event.eventStatus}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Type:</span>
                        <span className="font-medium">{eventCategories.find(cat => cat.id === event.eventType)?.name || event.eventType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Registration:</span>
                        <span className="font-medium">{event.registrationRequired ? 'Required' : 'Optional'}</span>
                      </div>
                      {event.maxAttendees && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Capacity:</span>
                          <span className="font-medium">{event.maxAttendees} attendees</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-3">Date & Time</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Date:</span>
                        <span className="font-medium">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Start Time:</span>
                        <span className="font-medium">{formatTime(event.date)}</span>
                      </div>
                      {event.endDate && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">End Time:</span>
                          <span className="font-medium">{formatTime(event.endDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "location" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Location Information</h3>
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-700 mt-1" />
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Event Venue</h4>
                        <p className="text-slate-600 mb-4">{event.location}</p>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Address:</span> {event.location}</p>
                          <p><span className="font-medium">Type:</span> In-person event</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
