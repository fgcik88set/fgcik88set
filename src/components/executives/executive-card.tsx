"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Linkedin } from "lucide-react";

import { ExecutiveProps } from "../constants/executives-data";

interface ExecutiveCardProps {
  executive: ExecutiveProps;
  isCurrent: boolean;
}

export default function ExecutiveCard({
  executive,
  
}: ExecutiveCardProps) {
  const [imageError, setImageError] = useState(false);
  

  return (
    <>
      <div className="group relative bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent z-10"></div>

          {!imageError ? (
            <Image
              src={executive.image || "/placeholder.svg?height=400&width=300"}
              alt={executive.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-blue-700 text-6xl font-bold">
                {executive.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            </div>
          )}

          {/* Overlay Content */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
              {executive.name}
            </h3>
            <p className="text-blue-200 text-sm">{executive.position}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Contact Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            {executive.email && (
              <a
                href={`mailto:${executive.email}`}
                className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 transition-colors group/link"
                aria-label={`Email ${executive.name}`}
              >
                <Mail className="w-4 h-4 text-slate-600 group-hover/link:text-blue-700" />
              </a>
            )}

            {executive.linkedIn && (
              <a
                href={executive.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 transition-colors group/link"
                aria-label={`${executive.name}'s LinkedIn profile`}
              >
                <Linkedin className="w-4 h-4 text-slate-600 group-hover/link:text-blue-700" />
              </a>
            )}

            {/* Spacer */}
            <div className="flex-grow"></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

     
    </>
  );
}
