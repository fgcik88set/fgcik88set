import ExecutivesHero from "@/components/executives/executives-hero";
import PastExecutives from "@/components/executives/past-executives";

export const metadata = {
  title: "Current Executives | FGC Ikot Ekpene Class of '88",
  description: "Meet the current executives who have lead the FGC Ikot Ekpene Class of '88 alumni association.",
}

export default function PastExecutivesPage() {
  return (
    <main className="min-h-screen">
      <ExecutivesHero />
      <PastExecutives />
    </main>
  );
}
