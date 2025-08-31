"use client";

import React, { useState, useEffect } from "react";
import { Folder, Image as ImageIcon, ArrowRight } from "lucide-react";
import {
  getMomentCategories,
  getIndividualMoments,
} from "@/sanity/sanity-utils";
import Link from "next/link";
import SectionHeaderText from "../typography/SectionHeaderText";
import Image from "next/image";
import FilterNavbar from "../shared/FilterNavbar";

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

interface IndividualMoment {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  images: MomentImage[];
}

export default function MomentsCategories() {
  const [categories, setCategories] = useState<MomentCategory[]>([]);
  const [individualMoments, setIndividualMoments] = useState<
    IndividualMoment[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'categories' | 'moments'>('moments');
  
  // Filter states - only search term
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});

  // Filter configurations - only search by name
  const filterConfigs: Array<{
    type: 'select' | 'checkbox';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    options?: Array<{ value: string; label: string }>;
    placeholder?: string;
  }> = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, individualData] = await Promise.all([
          getMomentCategories(),
          getIndividualMoments(),
        ]);
        setCategories(categoriesData);
        setIndividualMoments(individualData);
      } catch (error) {
        console.error("Error fetching moments data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  // Simple filter function - only by name
  const filterCategories = (categories: MomentCategory[]) => {
    if (!searchTerm) {
      return categories;
    }

    return categories.filter(category => 
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filterIndividualMoments = (moments: IndividualMoment[]) => {
    if (!searchTerm) {
      return moments;
    }

    return moments.filter(moment => 
      moment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moment.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get filtered data
  const filteredCategories = filterCategories(categories);
  const filteredIndividualMoments = filterIndividualMoments(individualMoments);

  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="w-[95%] mx-auto relative z-10">
          <div className="text-center mb-16">
            <SectionHeaderText text="Reliving The Moments" />
            <p className="text-slate-600 max-w-3xl mx-auto italic">
              A collection of treasured memories that remind us of our shared
              journey, friendships, and the legacy we continue to build
              together.
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-darkBlue"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-blue-100/20 blur-3xl"></div>

        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-[15px] border-blue-200/10 rounded-full"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 border-[10px] border-blue-200/10 rounded-lg rotate-45"></div>
      </div>
      <div className="w-[95%] mx-auto relative z-10">
        <div className="text-center mb-16 animate-item">
          <SectionHeaderText text="Reliving The Moments" />
          <p className="text-slate-600 max-w-3xl mx-auto italic">
            A collection of treasured memories that remind us of our shared
            journey, friendships, and the legacy we continue to build together.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mx-auto">
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'categories'
                  ? 'bg-white text-darkBlue shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Folder className="w-5 h-5" />
                <span>Moment Categories</span>
                {filteredCategories.length > 0 && (
                  <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                    {filteredCategories.length}
                  </span>
                )}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('moments')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'moments'
                  ? 'bg-white text-darkBlue shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5" />
                <span>Single Moments</span>
                {filteredIndividualMoments.length > 0 && (
                  <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                    {filteredIndividualMoments.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Filter Navbar - Only Search by Name */}
        <FilterNavbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          filterConfigs={filterConfigs}
          searchPlaceholder={`Search ${activeTab === 'categories' ? 'categories' : 'moments'} by name...`}
        />

        {/* Categories Tab */}
        {activeTab === 'categories' && filteredCategories.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/moments/category/${category.slug}`}
                  className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  {/* Category Image */}
                  <div className="relative h-48 overflow-hidden">
                    {category.subCategories && category.subCategories.length > 0 && 
                     category.subCategories[0].images && category.subCategories[0].images.length > 0 ? (
                      <Image
                        src={category.subCategories[0].images[0].url}
                        alt={category.subCategories[0].images[0].alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                        <Folder className="w-16 h-16 text-blue-400" />
                      </div>
                    )}
                    {/* Overlay with category count */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {category.subCategoriesCount} {category.subCategoriesCount === 1 ? 'subcategory' : 'subcategories'}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-darkBlue transition-colors">
                      {category.title}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    
                    {/* Preview of first few subcategories */}
                    {category.subCategories && category.subCategories.length > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {category.subCategories.slice(0, 3).map((subCategory, index) => (
                            <div key={index} className="flex-shrink-0">
                              {subCategory.images && subCategory.images.length > 0 ? (
                                <div className="relative w-10 h-10">
                                  <Image
                                    src={subCategory.images[0].url}
                                    alt={subCategory.images[0].alt}
                                    fill   
                                    className="object-cover rounded-lg border-2 border-white shadow-sm"
                                  />
                                </div>
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <ImageIcon className="w-4 h-4 text-gray-400" />
                                </div>
                              )}
                            </div>
                          ))}
                          {category.subCategories.length > 3 && (
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-gray-500 font-medium">
                                +{category.subCategories.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-darkBlue transition-colors" />
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Individual Moments Tab */}
        {activeTab === 'moments' && filteredIndividualMoments.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIndividualMoments.map((moment) => (
                <Link
                  key={moment.id}
                  href={`/moments/${moment.slug}`}
                  className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden">
                    {moment.images && moment.images.length > 0 ? (
                      <Image
                        src={moment.images[0].url}
                        alt={moment.images[0].alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-darkBlue transition-colors">
                      {moment.title}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {truncateDescription(moment.description)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      {moment.date && (
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {new Date(moment.date).toLocaleDateString()}
                        </span>
                      )}
                      <span className="text-blue-600 font-medium">
                        {moment.images?.length || 0}{" "}
                        {moment.images?.length === 1 ? "image" : "images"}
                      </span>
                    </div>  
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {((activeTab === 'categories' && filteredCategories.length === 0) || 
          (activeTab === 'moments' && filteredIndividualMoments.length === 0)) && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No results found' : `No ${activeTab} yet`}
            </h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search terms to find what you\'re looking for.'
                : `${activeTab === 'categories' ? 'Categories' : 'Moments'} will appear here once they are added to the system.`
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
