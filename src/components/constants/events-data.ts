export interface Event {
  id: string
  title: string
  description: string
  date: string
  endDate?: string
  location: string
  image: {
    url: string
    alt: string
    caption?: string
  }
  eventStatus: 'upcoming' | 'ongoing' | 'past' | 'cancelled'
  eventType: string
  isFeatured: boolean
  registrationRequired: boolean
  maxAttendees?: number
  slug: string
}

export interface EventCategory {
  id: string
  name: string
  color: string
}

export const eventCategories: EventCategory[] = [
  { id: "all", name: "All Events", color: "bg-slate-100 text-slate-800" },
  { id: "general-meeting", name: "General Meeting", color: "bg-blue-100 text-blue-800" },
  { id: "alumni-reunion", name: "Alumni Reunion", color: "bg-purple-100 text-purple-800" },
  { id: "workshop", name: "Workshop", color: "bg-green-100 text-green-800" },
  { id: "seminar", name: "Seminar", color: "bg-amber-100 text-amber-800" },
  { id: "social-event", name: "Social Event", color: "bg-red-100 text-red-800" },
  { id: "other", name: "Other", color: "bg-indigo-100 text-indigo-800" },
]

// Export the EventProps type for backward compatibility
export type EventProps = Event
