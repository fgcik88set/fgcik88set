"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Linkedin,
  Calendar,
  Award,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ExecutiveModal from "./executive-modal";
import { ExecutiveProps } from "../constants/executives-data";

interface ExecutiveCardProps {
  executive: ExecutiveProps;
  isCurrent: boolean;
}

export default function ExecutiveCard({
  executive,
  isCurrent,
}: ExecutiveCardProps) {
  const [imageError, setImageError] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const hasMoreAchievements =
    executive.achievements && executive.achievements.length > 2;
  const visibleAchievements = showAllAchievements
    ? executive.achievements
    : executive.achievements?.slice(0, 2);
  const remainingCount = executive.achievements
    ? executive.achievements.length - 2
    : 0;

  return (
    <>
      <div className="group relative bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
        {/* Status Badge */}
        {isCurrent && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Current
            </div>
          </div>
        )}

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

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-blue-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="text-center text-white hover:text-amber-300 transition-colors"
            >
              <ExternalLink className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium">View Details</p>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Term/Year Info */}
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600">
              {isCurrent ? "Current Term" : executive.term}
            </span>
            {executive.achievements && (
              <>
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <Award className="w-4 h-4 text-amber-500" />
              </>
            )}
          </div>

          {/* Bio */}
          {executive.bio && (
            <p className="text-slate-600 text-sm mb-4 line-clamp-3">
              {executive.bio}
            </p>
          )}

          {/* Achievements */}
          {executive.achievements && executive.achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">
                Key Achievements
              </h4>
              <ul className="space-y-1">
                {visibleAchievements?.map((achievement, index) => (
                  <li
                    key={index}
                    className="text-xs text-slate-600 flex items-start"
                  >
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    {achievement}
                  </li>
                ))}
              </ul>

              {/* Show More/Less Achievements Button */}
              {hasMoreAchievements && (
                <button
                  onClick={() => setShowAllAchievements(!showAllAchievements)}
                  className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {showAllAchievements ? (
                    <>
                      <ChevronUp className="w-3 h-3" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3" />+{remainingCount} more
                      achievement
                      {remainingCount !== 1 ? "s" : ""}
                    </>
                  )}
                </button>
              )}
            </div>
          )}

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

            {/* Position Badge */}
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              {executive.position}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Executive Detail Modal */}
      <ExecutiveModal
        executive={executive}
        isCurrent={isCurrent}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
