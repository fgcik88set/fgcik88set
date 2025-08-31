
import PastTrustees from "@/components/trustees/past-trustees";
import TrusteesHero from "@/components/trustees/trustees-hero";

export const metadata = {
  title: "Board of Trustees | FGC Ikot Ekpene Class of '88",
  description:
    "Meet the past board of trustees who have guided the FGC Ikot Ekpene Class of '88 alumni association.",
}


export default function PastTrusteesPage() {
  return (
    <main className="min-h-screen">
      <TrusteesHero />
      <PastTrustees />
    </main>
  );
}