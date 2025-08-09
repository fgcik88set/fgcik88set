"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

interface MomentsCardProps {
  moment: {
    id: string;
    title: string;
    description: string;
    date: string;
    slug: string;
    images: Array<{
      url: string;
      alt: string;
      caption?: string;
    }>;
  };
}

export default function MomentsCard({ moment }: MomentsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateDescription = (description: string, maxLength: number = 150) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        {moment.images && moment.images.length > 0 ? (
          <Image
            src={moment.images[0].url}
            alt={moment.images[0].alt || moment.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(moment.date)}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {moment.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {truncateDescription(moment.description)}
        </p>

        {/* Read More Button */}
        <Link
          href={`/moments/${moment.slug}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group/button transition-colors duration-300"
        >
          Read More
          <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
} 