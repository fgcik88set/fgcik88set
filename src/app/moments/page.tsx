import MemoriesGallery from "@/components/memories/memories-gallery"
import MemoriesHero from "@/components/memories/memories-hero"


export const metadata = {
  title: "Memories | FGC Ikot Ekpene Class of '88",
  description: "Relive the cherished moments and shared experiences of the FGC Ikot Ekpene Class of '88 alumni.",
}

export default function MemoriesPage() {
  return (
    <main className="min-h-screen">
      <MemoriesHero />
      <MemoriesGallery />
      
    </main>
  )
}
