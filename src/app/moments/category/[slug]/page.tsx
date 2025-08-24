import React from "react";
import { getMomentCategories } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import SectionHeaderText from "@/components/typography/SectionHeaderText";

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
  }>;
}

// Generate static params for all category pages
export async function generateStaticParams() {
  const categories = await getMomentCategories();

  return categories.map((category: MomentCategory) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getMomentCategories();
  const category = categories.find((cat: MomentCategory) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen mt-20 py-16">
      <div className="w-[95%] mx-auto px-4">
        <div className="">
          {/* Back Button */}
          <Link
            href="/moments"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Moments
          </Link>

          {/* Category Header */}
          <div className="mb-12">
            <SectionHeaderText text={category.title} />
            <p className="text-gray-600 mt-4">
              {category.description}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {category.subCategoriesCount}{" "}
              {category.subCategoriesCount === 1
                ? "subcategory"
                : "subcategories"}{" "}
              in this category
            </div>
          </div>

          {/* Subcategories Grid */}
          {category.subCategories && category.subCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.subCategories.map(
                (subCategory: SubCategory, index: number) => (
                  <Link
                    key={index}
                    href={`/moments/category/${category.slug}/subcategory/${subCategory.slug}`}
                    className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-64 overflow-hidden">
                      {subCategory.images && subCategory.images.length > 0 ? (
                        <Image
                          src={subCategory.images[0].url}
                          alt={subCategory.images[0].alt}
                          fill
                          className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gray-200 rounded-t-xl flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {subCategory.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {subCategory.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="text-blue-600 font-medium">
                          {subCategory.images?.length || 0}{" "}
                          {subCategory.images?.length === 1
                            ? "image"
                            : "images"}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No subcategories yet
              </h3>
              <p className="text-gray-600">
                Subcategories will appear here once they are added to this
                category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
