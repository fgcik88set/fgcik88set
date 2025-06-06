"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Mail, Linkedin } from "lucide-react";
import SectionHeaderText from "../typography/SectionHeaderText";

export default function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements =
      sectionRef.current?.querySelectorAll(".animate-item");
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const leaders = [
    {
      name: "Dr. Thomas Wilson",
      position: "President",
      bio: "A distinguished cardiologist with over 20 years of experience in healthcare leadership. Thomas has been instrumental in establishing our scholarship programs.",
      image: "/images/fgcman.webp",
      email: "thomas.wilson@example.com",
      linkedin: "https://linkedin.com/in/example",
    },
    {
      name: "Prof. Elizabeth Taylor",
      position: "Vice President",
      bio: "An award-winning professor of Economics and public policy advisor. Elizabeth leads our mentorship initiatives and academic outreach programs.",
      image: "/images/fgcwoman.webp",
      email: "elizabeth.taylor@example.com",
      linkedin: "https://linkedin.com/in/example",
    },
    {
      name: "Richard Anderson",
      position: "Secretary",
      bio: "A corporate lawyer specializing in international business. Richard manages our alumni communications and documentation with exceptional attention to detail.",
      image: "/images/fgcwoman.webp",
      email: "richard.anderson@example.com",
      linkedin: "https://linkedin.com/in/example",
    },
    {
      name: "Patricia Martin",
      position: "Treasurer",
      bio: "A certified financial analyst and investment banker. Patricia oversees our financial planning and ensures transparent management of our resources.",
      image: "/images/fgcman.webp",
      email: "patricia.martin@example.com",
      linkedin: "https://linkedin.com/in/example",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-darkBlue overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-amber-100/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-item">
          <SectionHeaderText text="Our Leadership" className="text-white" />
          <p className="text-white max-w-2xl mx-auto">
            Meet the dedicated individuals who guide our alumni association and
            drive our collective vision forward.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300 group animate-item"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={leader.image || "/placeholder.svg"}
                  alt={leader.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">
                    {leader.name}
                  </h3>
                  <p className="text-blue-200">{leader.position}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-slate-600 text-sm mb-4">{leader.bio}</p>
                <div className="flex space-x-3">
                  <a
                    href={`mailto:${leader.email}`}
                    className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 transition-colors"
                    aria-label={`Email ${leader.name}`}
                  >
                    <Mail className="w-5 h-5 text-blue-700" />
                  </a>
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 transition-colors"
                    aria-label={`${leader.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="w-5 h-5 text-blue-700" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/leadership"
            className="inline-flex items-center text-white hover:text-white/80 font-medium"
          >
            View all leadership team
            <svg
              className="w-5 h-5 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
