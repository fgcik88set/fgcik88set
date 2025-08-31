export interface MemorabiliaItem {
  id: string
  title: string
  description: string
  price: string
  category: string
  image: {
    url: string
    alt: string
    caption?: string
  }
  slug: string
  isAvailable: boolean
  isFeatured: boolean
  stockQuantity?: number
  tags?: string[]
}

export const categories = [
  { id: "all", name: "All Items", description: "Browse our complete collection of memorabilia" },
  { id: "clothing-apparel", name: "Clothing & Apparel", description: "Clothing and wearable items featuring class branding" },
  { id: "books-publications", name: "Books & Publications", description: "Yearbooks, directories, and commemorative publications" },
  { id: "accessories", name: "Accessories", description: "Small items and personal accessories" },
  { id: "collectibles", name: "Collectibles", description: "Rare and special items for collectors" },
  { id: "home-office", name: "Home & Office", description: "Decorative items for your home or office" },
  { id: "sports-recreation", name: "Sports & Recreation", description: "Sports equipment and recreational items" },
  { id: "other", name: "Other", description: "Miscellaneous memorabilia items" },
]
