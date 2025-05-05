import HeroSection from "@/components/home-sections/Hero";
import AboutSection from "@/components/home-sections/About";
import ExcosSection from "@/components/home-sections/Excos";

import MemoriesSectionDisplay from "@/components/home-sections/Memories";
import MemorabiliaSectionDisplay from "@/components/home-sections/Memorabilia";

export default function Home() {
  return (
    <main className="">
      <HeroSection />

      <AboutSection />

      <ExcosSection />

      <MemoriesSectionDisplay />

      <MemorabiliaSectionDisplay />
    </main>
  );
}
