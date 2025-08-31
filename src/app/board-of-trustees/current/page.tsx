import CurrentTrustees from "@/components/trustees/current-trustees";
import TrusteesHero from "@/components/trustees/trustees-hero";

export const metadata = {
  title: "Board of Trustees | FGC Ikot Ekpene Class of '88",
  description:
    "Meet the current board of trustees who guide the FGC Ikot Ekpene Class of '88 alumni association.",
}


export default function CurrentTrusteesPage() {
  return (
    <main className="min-h-screen">
      <TrusteesHero />
      <CurrentTrustees />
    </main>
  );
}
