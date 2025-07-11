import ExecutivesHero from "@/components/executives/executives-hero";
import CurrentExecutives from "../../../components/executives/current-executives";

export const metadata = {
  title: "Current Executives | FGC Ikot Ekpene Class of '88",
  description: "Meet the current executives who lead the FGC Ikot Ekpene Class of '88 alumni association.",
}

export default function CurrentExecutivesPage() {
  return (
    <main className="min-h-screen">
      <ExecutivesHero />
      <CurrentExecutives />
    </main>
  );
}