// import MemorabiliaCategories from "@/components/memorabilia/memorabilia-categories"
import MemorabiliaGallery from "@/components/memorabilia/memorabilia-gallery"
import MemorabiliaHero from "@/components/memorabilia/memorabilia-hero"
import MemorabiliaOrdering from "@/components/memorabilia/memorabilia-ordering"

export const metadata = {
  title: "Memorabilia | FGC Ikot Ekpene Class of '88",
  description:
    "Own a piece of history with our exclusive Class of '88 memorabilia collection. Books, apparel, accessories, and more.",
}

export default function MemorabiliaPage() {
  return (
    <main className="min-h-screen">
      <MemorabiliaHero />
      <MemorabiliaGallery />
      {/* <MemorabiliaCategories /> */}
      <MemorabiliaOrdering />
    </main>
  )
}