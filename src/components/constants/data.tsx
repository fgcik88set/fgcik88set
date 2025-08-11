import { ExcosProps, MemorabiliaItem } from "./interfaces";

export const ExcosHomeSection: ExcosProps[] = [
  {
    id: 1,
    image: "/images/fgcwoman.webp",
    name: "Sarah Johnson",
    position: "President & CEO",
    email: "sarah.johnson@example.com",
    linkedIn: "https://linkedin.com/in/sarahjohnson",
  },
  {
    id: 2,
    image: "/images/fgcman.webp",
    name: "Michael Chen",
    position: "Chief Financial Officer",
    email: "michael.chen@example.com",
    linkedIn: "https://linkedin.com/in/michaelchen",
  },
  {
    id: 3,
    image: "/images/fgcwoman.webp",
    name: "Amara Rodriguez",
    position: "Vice President, Operations",
    email: "amara.rodri@example.com",
    linkedIn: "https://linkedin.com/in/amararodriguez",
  },
  {
    id: 4,
    image: "/images/fgcman.webp",
    name: "David Kim",
    position: "Chief Technology Officer",
    email: "david.kim@example.com",
    linkedIn: "https://linkedin.com/in/davidkim",
  },
];

export const MemoriesData = [
    {
        id: "1",
        type: "image" as const,
        src: "/images/memory1.webp",
        alt: "Get Together Party",
        year: "2023",
        description: "Get together party at Camcord Gardens, Uyo",
      },
      {
        id: "2",
        type: "image" as const,
        src: "/images/memory2.webp",
        alt: "Get together",
        year: "2022",
        description: "Get together party at Huli Gardens, Eket",
      },
      {
        id: "3",
        type: "video" as const,
        src: "https://assets.mixkit.co/videos/23024/23024-720.mp4",
        thumbnail: "/placeholder.svg?height=600&width=800",
        alt: "10 Year Reunion Video",
        year: "2021",
        description: "Highlights from our 10-year reunion",
      },
]

export const footerSections = [
    {
      id: "1",
      title: "About Us",
      links: [
        { href: "/about", label: "Our Story" },
        { href: "/events", label: "Events" },
        // { href: "/history", label: "Our History" },
        // { href: "/achievements", label: "Achievements" }
      ]
    },
    {
      id: "2",
      title: "Leadership",
      links: [
        { href: "/executives/current", label: "Current Excos" },
        { href: "/executives/past", label: "Past Excos" },
        { href: "/board-of-trustees/current", label: "Current Board of Trustees" },
        { href: "/board-of-trustees/past", label: "Past Board of Trustees" },
        // { href: "/committees", label: "Committees" },
        // { href: "/past-presidents", label: "Past Presidents" }
      ]
    },
    {
      id: "3",
      title: "Resources",
      links: [
        { href: "/moments", label: "Memories" },
        { href: "/memorabilia", label: "Memorabilia" },
        
      ]
    },
    // {
    //   id: "contact",
    //   title: "Contact",
    //   links: [
    //     { href: "/contact", label: "Get in Touch" },
    //     { href: "/support", label: "Support" },
    //     { href: "/faq", label: "FAQs" },
    //     { href: "/membership", label: "Membership" }
    //   ]
    // }
  ]

  export const memorabiliaItems: MemorabiliaItem[] = [
    {
      id: "1",
      name: "Vintage Yearbook Collection",
      image: "/images/mem2.webp",
      price: "$45.00",
      category: "books",
      description: "Relive the memories with our beautifully preserved yearbooks from 1980-1995.",
    },
    {
      id: "2",
      name: "Commemorative Gold Pin",
      image: "/images/mem1.webp",
      price: "$24.99",
      category: "accessories",
      description: "Limited edition 50th anniversary pin featuring our original school emblem.",
    },
    {
      id: "3",
      name: "Retro Varsity Jacket",
      image: "/images/mem2.webp",
      price: "$89.99",
      category: "apparel",
      description: "Authentic recreation of our 1985 championship team jacket with embroidered logo.",
    },
    {
      id: "4",
      name: "Heritage Coffee Mug",
      image: "/images/mem1.webp",
      price: "$18.50",
      category: "homeware",
      description: "Ceramic mug featuring historical photos from our school's founding years.",
    },
    {
      id: "5",
      name: "Commemorative Photo Book",
      image: "/images/mem2.webp",
      price: "$35.00",
      category: "books",
      description: "120-page hardcover book showcasing our community's rich history through photographs.",
    },
    {
      id: "6",
      name: "Anniversary Medal",
      image: "/images/mem2.webp",
      price: "$29.99",
      category: "accessories",
      description: "Solid brass commemorative medal celebrating our centennial anniversary.",
    },
  ]