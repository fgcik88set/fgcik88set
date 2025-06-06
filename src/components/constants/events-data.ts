export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  venue?: string
  image?: string
  category: string
  price: string
  capacity?: number
  registered?: number
  featured?: boolean
  isVirtual?: boolean
  meetingLink?: string
  organizer: string
  contact?: string
  highlights?: string[]
  agenda?: string[]
  speakers?: string[]
}

export interface EventCategory {
  id: string
  name: string
  color: string
}

export const eventCategories: EventCategory[] = [
  { id: "all", name: "All Events", color: "bg-slate-100 text-slate-800" },
  { id: "networking", name: "Networking", color: "bg-blue-100 text-blue-800" },
  { id: "reunion", name: "Reunion", color: "bg-purple-100 text-purple-800" },
  { id: "professional", name: "Professional Development", color: "bg-green-100 text-green-800" },
  { id: "social", name: "Social", color: "bg-amber-100 text-amber-800" },
  { id: "fundraising", name: "Fundraising", color: "bg-red-100 text-red-800" },
  { id: "academic", name: "Academic", color: "bg-indigo-100 text-indigo-800" },
]

export const upcomingEvents: Event[] = [
  {
    id: "upcoming-1",
    title: "Annual Alumni Gala 2024",
    description:
      "Join us for an elegant evening celebrating our alumni achievements and strengthening our community bonds. This prestigious event features dinner, awards ceremony, and networking opportunities.",
    date: "2024-12-15",
    time: "6:00 PM - 11:00 PM",
    location: "Grand Ballroom, Lagos Continental Hotel",
    venue: "Lagos Continental Hotel",
    image: "/placeholder.svg?height=400&width=600",
    category: "social",
    price: "₦25,000",
    capacity: 300,
    registered: 245,
    featured: true,
    isVirtual: false,
    organizer: "Alumni Association",
    contact: "events@alumni.edu.ng",
    highlights: [
      "Awards ceremony recognizing outstanding alumni",
      "Keynote speech by distinguished alumnus",
      "Three-course gourmet dinner",
      "Live entertainment and dancing",
      "Networking opportunities with industry leaders",
      "Photo booth and professional photography",
    ],
    agenda: [
      "6:00 PM - Registration and Welcome Cocktails",
      "7:00 PM - Opening Remarks and Alumni Recognition",
      "7:30 PM - Keynote Address",
      "8:00 PM - Dinner Service",
      "9:30 PM - Awards Ceremony",
      "10:00 PM - Entertainment and Dancing",
    ],
    speakers: [
      "Dr. Amina Hassan - Class of 1995, CEO of TechNova",
      "Prof. Chidi Okafor - Class of 1988, Vice Chancellor",
    ],
  },
  {
    id: "upcoming-2",
    title: "Professional Development Workshop",
    description:
      "Enhance your career prospects with our comprehensive workshop covering modern industry trends, leadership skills, and networking strategies.",
    date: "2024-11-20",
    time: "9:00 AM - 4:00 PM",
    location: "University Conference Center, Abuja",
    venue: "University Conference Center",
    image: "/placeholder.svg?height=400&width=600",
    category: "professional",
    price: "₦15,000",
    capacity: 150,
    registered: 89,
    featured: false,
    isVirtual: false,
    organizer: "Career Development Committee",
    contact: "career@alumni.edu.ng",
    highlights: [
      "Industry expert speakers",
      "Interactive workshops and breakout sessions",
      "Networking lunch with professionals",
      "Career counseling sessions",
      "Certificate of completion",
      "Resource materials and toolkit",
    ],
    agenda: [
      "9:00 AM - Registration and Welcome",
      "9:30 AM - Keynote: Future of Work",
      "10:30 AM - Workshop: Leadership in Digital Age",
      "12:00 PM - Networking Lunch",
      "1:00 PM - Panel: Industry Trends",
      "2:30 PM - Career Counseling Sessions",
      "3:30 PM - Closing and Certificates",
    ],
    speakers: ["Mrs. Funmi Adebayo - HR Director, First Bank", "Mr. Kemi Adesina - Tech Entrepreneur"],
  },
  {
    id: "upcoming-3",
    title: "Virtual Alumni Meetup",
    description:
      "Connect with fellow alumni from around the world in our monthly virtual meetup. Share experiences, discuss opportunities, and maintain our global network.",
    date: "2024-11-10",
    time: "7:00 PM - 9:00 PM",
    location: "Online via Zoom",
    venue: "Virtual Event",
    image: "/placeholder.svg?height=400&width=600",
    category: "networking",
    price: "Free",
    capacity: 500,
    registered: 234,
    featured: false,
    isVirtual: true,
    meetingLink: "https://zoom.us/j/123456789",
    organizer: "Global Alumni Network",
    contact: "virtual@alumni.edu.ng",
    highlights: [
      "Global alumni participation",
      "Breakout rooms by industry/location",
      "Guest speaker presentation",
      "Q&A session with alumni panel",
      "Resource sharing and collaboration",
      "Recording available for later viewing",
    ],
    agenda: [
      "7:00 PM - Welcome and Introductions",
      "7:15 PM - Guest Speaker Presentation",
      "7:45 PM - Breakout Room Networking",
      "8:30 PM - Group Reconvene and Sharing",
      "8:50 PM - Announcements and Closing",
    ],
    speakers: ["Dr. Sarah Johnson - Alumni in Tech Panel", "Mr. David Chen - International Business Expert"],
  },
]

export const pastEvents: Event[] = [
  {
    id: "past-1",
    title: "Class of 2019 Reunion",
    description:
      "A memorable reunion celebrating 5 years since graduation. Alumni reconnected, shared career updates, and reminisced about university days.",
    date: "2024-09-15",
    time: "2:00 PM - 8:00 PM",
    location: "University Main Campus, Ikot Ekpene",
    venue: "University Main Campus",
    image: "/placeholder.svg?height=400&width=600",
    category: "reunion",
    price: "₦10,000",
    capacity: 200,
    registered: 178,
    featured: true,
    isVirtual: false,
    organizer: "Class of 2019 Committee",
    contact: "reunion2019@alumni.edu.ng",
    highlights: [
      "Campus tour and nostalgic visits",
      "Alumni achievement showcase",
      "Group photos and memory lane",
      "Barbecue and outdoor activities",
      "Time capsule ceremony",
      "Scholarship fund announcement",
    ],
    agenda: [
      "2:00 PM - Registration and Welcome",
      "2:30 PM - Campus Tour",
      "4:00 PM - Alumni Presentations",
      "5:30 PM - Barbecue and Socializing",
      "7:00 PM - Group Photos",
      "7:30 PM - Closing Ceremony",
    ],
    speakers: ["Prof. Michael Udoh - Former Dean", "Alumni Class Representatives"],
  },
  {
    id: "past-2",
    title: "Entrepreneurship Summit 2024",
    description:
      "An inspiring summit featuring successful alumni entrepreneurs sharing their journey, challenges, and insights for aspiring business owners.",
    date: "2024-08-22",
    time: "10:00 AM - 5:00 PM",
    location: "Business Innovation Hub, Lagos",
    venue: "Business Innovation Hub",
    image: "/placeholder.svg?height=400&width=600",
    category: "professional",
    price: "₦20,000",
    capacity: 250,
    registered: 240,
    featured: true,
    isVirtual: false,
    organizer: "Entrepreneurship Alumni Network",
    contact: "summit@alumni.edu.ng",
    highlights: [
      "Startup pitch competition",
      "Investor panel and funding opportunities",
      "Mentorship matching sessions",
      "Product exhibition and demos",
      "Networking with successful entrepreneurs",
      "Business plan workshop",
    ],
    agenda: [
      "10:00 AM - Opening and Keynote",
      "11:00 AM - Panel: Scaling Your Business",
      "12:30 PM - Networking Lunch",
      "1:30 PM - Startup Pitch Competition",
      "3:00 PM - Investor Panel",
      "4:00 PM - Mentorship Sessions",
      "4:45 PM - Closing and Awards",
    ],
    speakers: [
      "Mrs. Adaora Okonkwo - Fintech Founder",
      "Mr. Emeka Nwankwo - Serial Entrepreneur",
      "Dr. Blessing Okoro - Investment Expert",
    ],
  },
  {
    id: "past-3",
    title: "Alumni Sports Day 2024",
    description:
      "A fun-filled day of sports, games, and friendly competition among alumni and their families. Great weather and even better company made this event unforgettable.",
    date: "2024-07-14",
    time: "8:00 AM - 6:00 PM",
    location: "University Sports Complex, Ikot Ekpene",
    venue: "University Sports Complex",
    image: "/placeholder.svg?height=400&width=600",
    category: "social",
    price: "₦5,000",
    capacity: 400,
    registered: 356,
    featured: false,
    isVirtual: false,
    organizer: "Alumni Sports Committee",
    contact: "sports@alumni.edu.ng",
    highlights: [
      "Football and basketball tournaments",
      "Family-friendly activities and games",
      "Healthy lunch and refreshments",
      "Awards for tournament winners",
      "Kids' zone with supervised activities",
      "Alumni fitness challenge",
    ],
    agenda: [
      "8:00 AM - Registration and Warm-up",
      "9:00 AM - Opening Ceremony",
      "9:30 AM - Tournament Matches Begin",
      "12:00 PM - Lunch Break",
      "1:00 PM - Family Games and Activities",
      "3:00 PM - Finals and Championships",
      "5:00 PM - Awards Ceremony",
      "5:30 PM - Group Photos and Closing",
    ],
    speakers: ["Coach Samuel Etim - Former University Coach", "Dr. Grace Akpan - Sports Medicine Expert"],
  },
]

// Export the EventProps type for backward compatibility
export type EventProps = Event
