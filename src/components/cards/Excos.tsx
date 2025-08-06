"use client";

import { ExcosProps } from "../constants/interfaces";

import Image from "next/image";
import { useState } from "react";

export default function ExcosHomepageSection({
  image,
  name,
  position,
  
}: ExcosProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="overflow-hidden transition-all duration-300 hover:shadow-lg max-w-sm w-full rounded-lg bg-white border border-gray-200">
      {/* <div className="relative h-64 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">{name}</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h4 className="text-lg font-semibold text-gray-800">{position}</h4>
                
        
                {(email || linkedIn ) && (
                  <div className="pt-2 flex flex-wrap gap-3">
                    {email && (
                      <Link
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600"
                        aria-label={`Email ${name}`}
                      >
                        <IoMdMail className="h-6 w-6" />
                        <span className= "sr-only">Email</span>
                      </Link>
                    )}
        
                    {linkedIn && (
                      <Link
                        href={linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600"
                        aria-label={`${name}'s LinkedIn profile`}
                      >
                        <FaLinkedin className="h-5 w-5" />
                        <span className= "sr-only">LinkedIn</span>
                      </Link>
                    )}
        
                    
                  </div>
                )}
              </div> */}
      <div className="relative h-64 overflow-hidden">
        {!imageError ? (
          <Image
            src={image || "/placeholder.svg?height=400&width=300"}
            alt={name}
            fill
            className="object-contain object-center transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-blue-700 text-6xl font-bold">
              {name
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
            {name}
          </h3>
          <p className="text-blue-200 text-sm">{position}</p>
          {/* <p className="text-blue-200 text-sm">{term}</p> */}
        </div>
        
      </div>
    </div>
  );
}
