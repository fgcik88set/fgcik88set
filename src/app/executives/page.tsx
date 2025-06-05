import CurrentExecutives from "@/components/executives/current-executives"
import ExecutivesHero from "@/components/executives/executives-hero"
import PastExecutives from "@/components/executives/past-executives"

export const metadata = {
  title: "All Executives | FGC Ikot Ekpene Class of '88",
  description: "Meet the current and past executives who have led the FGC Ikot Ekpene Class of '88 alumni association.",
}

export default function ExecutivesPage() {
  return (
    <main className="min-h-screen">
      <ExecutivesHero />
      <CurrentExecutives />
      <PastExecutives />
    </main>
  )
}