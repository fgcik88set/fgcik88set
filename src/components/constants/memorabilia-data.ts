export interface MemorabiliaItem {
  id: string | number
  name: string
  description: string
  price: string
  category: string
  image?: string
  inStock: boolean
  featured?: boolean
  specifications?: string[]
  materials?: string
  dimensions?: string
}

export const memorabiliaItems: MemorabiliaItem[] = [
  // Books & Albums
  {
    id: "book-1",
    name: "Class of '88 Yearbook",
    description:
      "A comprehensive collection of memories from our time at FGC Ikot Ekpene, featuring photos, stories, and achievements.",
    price: "₦15,000",
    category: "books",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    featured: true,
    specifications: ["Hardcover", "200+ pages", "Full color printing"],
    materials: "Premium paper with hardcover binding",
    dimensions: '8.5" x 11"',
  },
  {
    id: "book-2",
    name: "Alumni Directory 2024",
    description: "Complete directory of all Class of '88 alumni with contact information and current achievements.",
    price: "₦8,000",
    category: "books",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    specifications: ["Softcover", "150 pages", "Updated annually"],
    materials: "High-quality paper",
    dimensions: '6" x 9"',
  },
  {
    id: "book-3",
    name: "35 Years of Excellence",
    description:
      "A commemorative book celebrating 35 years since graduation, featuring success stories and achievements.",
    price: "₦12,000",
    category: "books",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    featured: true,
    specifications: ["Hardcover", "180 pages", "Limited edition"],
    materials: "Premium paper with gold foil accents",
    dimensions: '8" x 10"',
  },

  // Apparel
  {
    id: "apparel-1",
    name: "Class of '88 Polo Shirt",
    description: "Premium quality polo shirt with embroidered class logo and year. Available in navy blue and white.",
    price: "₦8,500",
    category: "apparel",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    featured: true,
    specifications: ["100% Cotton", "Embroidered logo", "Sizes S-XXL"],
    materials: "Premium cotton pique",
    dimensions: "Various sizes available",
  },
  {
    id: "apparel-2",
    name: "Alumni T-Shirt",
    description: "Comfortable cotton t-shirt featuring the FGC Ikot Ekpene crest and Class of '88 inscription.",
    price: "₦5,500",
    category: "apparel",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    specifications: ["100% Cotton", "Screen printed design", "Sizes S-XXL"],
    materials: "Soft cotton blend",
    dimensions: "Various sizes available",
  },
  {
    id: "apparel-3",
    name: "Class Hoodie",
    description:
      "Warm and comfortable hoodie perfect for reunions and casual wear. Features class motto and graduation year.",
    price: "₦12,000",
    category: "apparel",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    specifications: ["Cotton-polyester blend", "Kangaroo pocket", "Sizes S-XXL"],
    materials: "80% Cotton, 20% Polyester",
    dimensions: "Various sizes available",
  },
  {
    id: "apparel-4",
    name: "Alumni Cap",
    description: "Adjustable cap with embroidered school crest and Class of '88 text. Perfect for outdoor events.",
    price: "₦4,000",
    category: "apparel",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    specifications: ["Adjustable strap", "Embroidered design", "One size fits all"],
    materials: "Cotton twill",
    dimensions: "Adjustable",
  },

  // Accessories
  {
    id: "acc-1",
    name: "Class of '88 Mug",
    description: "Ceramic mug featuring the school crest and class year. Perfect for your morning coffee or tea.",
    price: "₦3,500",
    category: "accessories",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    featured: true,
    specifications: ["Ceramic material", "Dishwasher safe", "11oz capacity"],
    materials: "High-quality ceramic",
    dimensions: '4" x 3.5"',
  },
  {
    id: "acc-2",
    name: "Alumni Keychain",
    description: "Metal keychain with school logo and Class of '88 engraving. Durable and elegant design.",
    price: "₦2,000",
    category: "accessories",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    specifications: ["Metal construction", "Laser engraved", "Key ring included"],
    materials: "Stainless steel",
    dimensions: '2" x 1"',
  },
  {
    id: "acc-3",
    name: "Class Pin Badge",
    description: "Elegant pin badge featuring the school crest. Perfect for formal events and reunions.",
    price: "₦2,500",
    category: "accessories",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    specifications: ["Metal pin", "Enamel finish", "Secure clasp"],
    materials: "Metal with enamel coating",
    dimensions: '1" diameter',
  },
  {
    id: "acc-4",
    name: "Alumni Notebook",
    description: "Professional notebook with embossed school logo. Perfect for meetings and note-taking.",
    price: "₦4,500",
    category: "accessories",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    specifications: ["Hardcover", "Lined pages", "Ribbon bookmark"],
    materials: "Leather-like cover",
    dimensions: '5.5" x 8.5"',
  },

  // Homeware
  {
    id: "home-1",
    name: "Commemorative Plate",
    description: "Beautiful ceramic plate featuring the school building and class information. Perfect for display.",
    price: "₦6,500",
    category: "homeware",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    featured: true,
    specifications: ["Ceramic plate", "Decorative design", "Display stand included"],
    materials: "Fine ceramic",
    dimensions: '10" diameter',
  },
  {
    id: "home-2",
    name: "Class Photo Frame",
    description: "Elegant photo frame designed to hold class photos. Features engraved school name and year.",
    price: "₦5,000",
    category: "homeware",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    specifications: ["Wood frame", "Glass front", "Easel back"],
    materials: "Solid wood with glass",
    dimensions: '8" x 10"',
  },
  {
    id: "home-3",
    name: "Alumni Wall Clock",
    description: "Stylish wall clock featuring the school crest. A perfect addition to your home or office.",
    price: "₦8,000",
    category: "homeware",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    specifications: ["Quartz movement", "Silent operation", "Battery operated"],
    materials: "Plastic with metal hands",
    dimensions: '12" diameter',
  },
  {
    id: "home-4",
    name: "Class Coaster Set",
    description: "Set of 4 coasters featuring different school landmarks. Comes with wooden holder.",
    price: "₦4,000",
    category: "homeware",
    image: "/placeholder.svg?height=400&width=300",
    inStock: true,
    specifications: ["Set of 4", "Cork backing", "Wooden holder"],
    materials: "Ceramic with cork backing",
    dimensions: '4" x 4" each',
  },
]

export const categories = [
  { id: "all", name: "All Items", description: "Browse our complete collection of memorabilia" },
  { id: "books", name: "Books & Albums", description: "Yearbooks, directories, and commemorative publications" },
  { id: "apparel", name: "Apparel", description: "Clothing and wearable items featuring class branding" },
  { id: "accessories", name: "Accessories", description: "Small items and personal accessories" },
  { id: "homeware", name: "Homeware", description: "Decorative items for your home or office" },
]
