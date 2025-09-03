import { getMomentBySlug, getMoments } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import MomentsCarousel from "@/components/memories/moments-carousel";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Moment {
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
}

interface MomentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const moments = await getMoments();

  return moments.map((moment: Moment) => ({
    slug: moment.slug,
  }));
}

export default async function MomentPage({ params }: MomentPageProps) {
  const { slug } = await params;
  const moment = await getMomentBySlug(slug);

  if (!moment) {
    notFound();
  }

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}

      <div className="w-[95%] mx-auto pt-32 pb-12">
        {/* Moment Header */}
        <div className="mb-8">
          <Link
            href="/moments"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 text-sm mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Moments
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {moment.title}
          </h1>
        </div>

        {/* Carousel Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Gallery</h2>
          <MomentsCarousel images={moment.images} title={moment.title} />
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
      <div className="flex md:hidden items-center justify-center gap-1 border border-darkBlue p-2 rounded-2xl w-fit mx-auto mb-4">
        <ChevronLeft className="w-4 h-4 text-darkBlue" />
        <Link
          href="/moments"
          className="text-darkBlue hover:text-darkBlue/90 font-medium transition-colors duration-200"
        >
          Go Back
        </Link>
      </div>
    </main>
  );
}
