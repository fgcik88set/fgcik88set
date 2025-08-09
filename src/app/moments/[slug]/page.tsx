import { getMomentBySlug, getMoments } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import MomentsCarousel from "@/components/memories/moments-carousel";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface MomentPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const moments = await getMoments();
  
  return moments.map((moment) => ({
    slug: moment.slug,
  }));
}

export default async function MomentPage({ params }: MomentPageProps) {
  const moment = await getMomentBySlug(params.slug);

  if (!moment) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="w-[95%] mx-auto py-6">
          <Link
            href="/moments"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Moments
          </Link>
        </div>
      </div>

      <div className="w-[95%] mx-auto py-12">
        {/* Moment Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(moment.date)}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {moment.title}
          </h1>
        </div>

        {/* Carousel Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Gallery
          </h2>
          <MomentsCarousel 
            images={moment.images} 
            title={moment.title}
          />
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            About This Moment
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {moment.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 