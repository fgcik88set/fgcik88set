import EventsHero from "@/components/events/events-hero"
import EventsSection from "@/components/events/events-section"


export const metadata = {
  title: "Events | FGC Ikot Ekpene Class of '88",
  description: "Stay updated with upcoming events and relive the memories from our past gatherings and celebrations.",
}

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <EventsHero />
      <EventsSection />
      
      
    </main>
  )
}
