"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Users, Clock, Star, ExternalLink, Ticket } from "lucide-react"
import { Event, eventCategories } from "../constants/events-data"


interface EventCardProps {
  event: Event
  isUpcoming: boolean
  onViewDetails: (event: Event) => void
}

export default function EventCard({ event, isUpcoming, onViewDetails }: EventCardProps) {
  const [imageError, setImageError] = useState(false)

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

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent modal from opening if clicking on action buttons
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    onViewDetails(event)
  }

  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onViewDetails(event)
  }

  const handleActionButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Handle registration or other actions here
    console.log("Action button clicked for event:", event.title)
  }

  return (
    <div
      className="group relative bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Featured Badge */}
      {event.isFeatured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(event.eventStatus)}`}>
          {event.eventStatus}
        </div>
      </div>

      {/* Category Badge */}
      <div className="absolute top-16 right-4 z-10">
        <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryStyle(event.eventType)}`}>
          {eventCategories.find(cat => cat.id === event.eventType)?.name || event.eventType}
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent z-10"></div>

        {!imageError ? (
          <Image
            src={event.image.url || "/placeholder.svg?height=400&width=600"}
            alt={event.image.alt || event.title}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-blue-700" />
          </div>
        )}

        {/* Overlay Content */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors line-clamp-2">
            {event.title}
          </h3>
        </div>

        {/* Desktop Hover Overlay */}
        <div className="absolute inset-0 bg-blue-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 hidden md:flex items-center justify-center">
          <div className="text-center text-white">
            <ExternalLink className="w-8 h-8 mx-auto mb-2" />
            <p className="text-xs font-medium">View Details</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Date and Time */}
        <div className="flex items-center gap-2 mb-3 text-blue-700">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">{formatDate(event.date)}</span>
        </div>

        <div className="flex items-center gap-2 mb-3 text-slate-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{formatTime(event.date)}</span>
          {event.endDate && (
            <span className="text-xs text-slate-500">- {formatTime(event.endDate)}</span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4 text-slate-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{event.location}</span>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{event.description}</p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {event.registrationRequired && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Ticket className="w-4 h-4" />
              <span>Registration Required</span>
            </div>
          )}
          {event.maxAttendees && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="w-4 h-4" />
              <span>Max: {event.maxAttendees} attendees</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
          {/* View Details Button */}
          <button
            onClick={handleViewDetailsClick}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium transition-colors bg-blue-700 text-white hover:bg-blue-800"
          >
            <ExternalLink className="w-4 h-4" />
            View Details
          </button>

          {/* Action Button */}
          {isUpcoming ? (
            <button
              onClick={handleActionButtonClick}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <Ticket className="w-4 h-4" />
              {event.registrationRequired ? 'Register' : 'RSVP'}
            </button>
          ) : (
            <button
              onClick={handleActionButtonClick}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <Users className="w-4 h-4" />
              Photos
            </button>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}
