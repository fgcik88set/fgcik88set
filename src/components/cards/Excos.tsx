"use client"

import { IoMdMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { ExcosProps } from "../constants/interfaces";
import { useState } from "react";
import Link from "next/link";

export default function ExcosHomepageSection({
    id,
    image,
    name,
    position,
    linkedIn,
    email,
  }: ExcosProps) {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div
          className="overflow-hidden transition-all duration-300 hover:shadow-lg max-w-sm w-full rounded-lg bg-white border border-gray-200"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-bold text-white">{name}</h3>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <h4 className="text-lg font-semibold text-gray-800">{position}</h4>
            
    
            {(email || linkedIn ) && (
              <div className="pt-2 flex flex-wrap gap-2">
                {email && (
                  <Link
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    aria-label={`Email ${name}`}
                  >
                    <IoMdMail className="h-4 w-4" />
                    <span className={isHovered ? "underline" : ""}>Email</span>
                  </Link>
                )}
    
                {linkedIn && (
                  <Link
                    href={linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    aria-label={`${name}'s LinkedIn profile`}
                  >
                    <FaLinkedin className="h-4 w-4" />
                    <span className={isHovered ? "underline" : ""}>LinkedIn</span>
                  </Link>
                )}
    
                
              </div>
            )}
          </div>
        </div>
      )
}