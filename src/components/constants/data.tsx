import { ExcosProps } from "./interfaces";

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

export const MemorabiliaData = [
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
      id: "about",
      title: "About Us",
      links: [
        { href: "#", label: "Our Story" },
        // { href: "/mission", label: "Mission & Vision" },
        // { href: "/history", label: "Our History" },
        // { href: "/achievements", label: "Achievements" }
      ]
    },
    {
      id: "executives",
      title: "Leadership",
      links: [
        { href: "#", label: "All Executives" },
        { href: "#", label: "Board of Trustees" },
        // { href: "/committees", label: "Committees" },
        // { href: "/past-presidents", label: "Past Presidents" }
      ]
    },
    {
      id: "resources",
      title: "Resources",
      links: [
        { href: "#", label: "Photo Gallery" },
        { href: "#", label: "Memorabilia" },
        
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