import { getMomentCategories } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import MomentsCarousel from "@/components/memories/moments-carousel";
import {  Image as ImageIcon } from "lucide-react";
import Link from "next/link";

interface MomentImage {
  url: string;
  alt: string;
  caption?: string;
}

interface SubCategory {
  title: string;
  slug: string;
  description: string;
  images: MomentImage[];
}

interface MomentCategory {
  id: string;
  title: string;
  description: string;
  slug: string;
  subCategoriesCount: number;
  subCategories: SubCategory[];
}

interface PageProps {
  params: Promise<{
    slug: string;
    subcategorySlug: string;
  }>;
}

// Generate static params for all subcategory pages
export async function generateStaticParams() {
  const categories = await getMomentCategories();
  
  const params: Array<{ slug: string; subcategorySlug: string }> = [];
  
  categories.forEach((category: MomentCategory) => {
    if (category.subCategories) {
      category.subCategories.forEach((subCategory: SubCategory) => {
        params.push({
          slug: category.slug,
          subcategorySlug: subCategory.slug,
        });
      });
    }
  });
  
  return params;
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { slug, subcategorySlug } = await params;
  const categories = await getMomentCategories();
  const category = categories.find((cat: MomentCategory) => cat.slug === slug);
  
  if (!category) {
    notFound();
  }

  const subcategory = category.subCategories?.find(
    (sub: SubCategory) => sub.slug === subcategorySlug
  );

  if (!subcategory) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white mt-24">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="w-[95%] mx-auto py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link
              href="/moments"
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Moments
            </Link>
            <span>/</span>
            <Link
              href={`/moments/category/${category.slug}`}
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              {category.title}
            </Link>
            <span>/</span>
            <span className="text-gray-500">{subcategory.title}</span>
          </div>
          {/* <Link
            href={`/moments/category/${category.slug}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {category.title}
          </Link> */}
        </div>
      </div>

      <div className="w-[95%] mx-auto py-12">
        {/* Subcategory Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {subcategory.title}
          </h1>
          {subcategory.description && (
            <p className="text-lg text-gray-600 max-w-3xl">
              {subcategory.description}
            </p>
          )}
        </div>

        {/* Gallery Section */}
        {subcategory.images && subcategory.images.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Gallery</h2>
            <MomentsCarousel images={subcategory.images} title={subcategory.title} />
          </div>
        ) : (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No images available
            </h3>
            <p className="text-gray-600">
              Images will appear here once they are added to this subcategory.
            </p>
          </div>
        )}

        {/* Category Info */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            About This Subcategory
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {subcategory.description || "This subcategory contains a collection of memorable moments and images."}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <span className="text-blue-600 font-medium">
                {subcategory.images?.length || 0}{" "}
                {subcategory.images?.length === 1 ? "image" : "images"} in this subcategory
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 