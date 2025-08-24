// import MemoriesGallery from '@/components/memories/memories-gallery'
import MemoriesHero from '@/components/memories/memories-hero'
import MomentsCategories from '@/components/memories/moments-categories'

export const metadata = {
  title: 'Moments | FGC Ikot Ekpene Class of 88',
  description: 'Explore our precious moments and memories from over the years.',
}

export default function MomentsPage() {
  return <div>
     <MemoriesHero />
     {/* <MemoriesGallery /> */}
    <MomentsCategories />
  </div> 
}
