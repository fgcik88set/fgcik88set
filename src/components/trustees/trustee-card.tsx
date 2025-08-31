"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Linkedin } from "lucide-react";

import { TrusteeProps } from "../constants/trustees-data";

interface TrusteeCardProps {
  trustee: TrusteeProps;
  isCurrent: boolean;
}

export default function TrusteeCard({ trustee }: TrusteeCardProps) {
  
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div className="relative bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          {!imageError ? (
            <Image
              src={trustee.image || "/placeholder.svg?height=400&width=300"}
              alt={trustee.name}
              fill
              className="object-contain object-center transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-blue-700 text-6xl font-bold">
                {trustee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            </div>
          )}

          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/20 to-transparent z-10"></div>

          {/* Overlay Content */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
              {trustee.name}
            </h3>
            <p className="text-white text-sm">{trustee.term}</p>
            <p className="text-blue-50 text-sm">{trustee.position}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Contact Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            {trustee.email && (
              <a
                href={`mailto:${trustee.email}`}
                className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 transition-colors group/link"
                aria-label={`Email ${trustee.name}`}
              >
                <Mail className="w-4 h-4 text-slate-600 group-hover/link:text-blue-700" />
              </a>
            )}

            {trustee.linkedIn && (
              <a
                href={trustee.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 transition-colors group/link"
                aria-label={`${trustee.name}'s LinkedIn profile`}
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
