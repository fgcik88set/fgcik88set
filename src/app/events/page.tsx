import EventsHero from "@/components/events/events-hero"
import PastEvents from "@/components/events/past-events"
import UpcomingEvents from "@/components/events/upcoming-events"

export const metadata = {
  title: "Events | FGC Ikot Ekpene Class of '88",
  description: "Stay updated with upcoming events and relive the memories from our past gatherings and celebrations.",
}

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <EventsHero />
      <UpcomingEvents />
      <PastEvents />
      {/* <EventsNewsletter /> */}
    </main>
  )
}
