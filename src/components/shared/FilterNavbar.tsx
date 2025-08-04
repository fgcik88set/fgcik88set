"use client";

import { useState } from "react";
import { Search, Filter, X, } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  type: 'select' | 'checkbox';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  options?: FilterOption[];
  placeholder?: string;
}

interface FilterNavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: Record<string, string | boolean>;
  setFilters: (filters: Record<string, string | boolean>) => void;
  filterConfigs: FilterConfig[];
  placeholder?: string;
  searchPlaceholder?: string;
}

export default function FilterNavbar({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  filterConfigs,
  searchPlaceholder
}: FilterNavbarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const clearFilters = () => {
    setSearchTerm("");
    const clearedFilters: Record<string, string | boolean> = {};
    filterConfigs.forEach(config => {
      if (config.type === 'select') {
        clearedFilters[config.label.toLowerCase().replace(/\s+/g, '')] = "";
      } else if (config.type === 'checkbox') {
        clearedFilters[config.label.toLowerCase().replace(/\s+/g, '')] = false;
      }
    });
    setFilters(clearedFilters);
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(value => 
    typeof value === 'string' ? value !== "" : value === true
  );

  const updateFilter = (key: string, value: string | boolean) => {
    setFilters({ ...filters, [key]: value });
  };

  // Find the year range filter (primary filter)
  const yearRangeFilter = filterConfigs.find(config => 
    config.label.toLowerCase().includes('year range') || 
    config.label.toLowerCase().includes('term')
  );
  
  // Other filters (secondary)
  const secondaryFilters = filterConfigs.filter(config => 
    !config.label.toLowerCase().includes('year range') && 
    !config.label.toLowerCase().includes('term')
  );

  return (
    <div className="mb-12 animate-item flex justify-center">
      <div className="lg:w-1/2 bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        {/* Selected Year Range Header */}
        {yearRangeFilter && filters[yearRangeFilter.label.toLowerCase().replace(/\s+/g, '')] && (
          <div className="mb-4 text-center">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <yearRangeFilter.icon className="w-4 h-4 mr-2" />
              {filters[yearRangeFilter.label.toLowerCase().replace(/\s+/g, '')]}
            </div>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Primary Year Range Filter */}
          {yearRangeFilter && (
            <div className="flex-grow">
              {/* <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <yearRangeFilter.icon className="w-4 h-4" />
                {yearRangeFilter.label}
              </label> */}
              <div className="relative">
                <select
                  value={filters[yearRangeFilter.label.toLowerCase().replace(/\s+/g, '')] as string || ""}
                  onChange={(e) => updateFilter(yearRangeFilter.label.toLowerCase().replace(/\s+/g, ''), e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-base"
                >
                  <option value="">{yearRangeFilter.placeholder || `Select ${yearRangeFilter.label}`}</option>
                  {yearRangeFilter.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Filter Toggle for Secondary Filters */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
              isFilterOpen || hasActiveFilters
                ? "bg-blue-700 text-white border-blue-700"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            <Filter className="w-5 h-5" />
            More Filters
            {hasActiveFilters && (
              <span className="bg-amber-400 text-blue-900 text-xs px-2 py-1 rounded-full font-medium">
                {[searchTerm, ...Object.values(filters)].filter(value => 
                  typeof value === 'string' ? value !== "" : value === true
                ).length}
              </span>
            )}
          </button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
              Clear
            </button>
          )}
        </div>

        {/* Filter Options */}
        {isFilterOpen && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Search by Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Search className="w-4 h-4" />
                  Search by Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={searchPlaceholder || "Search by name..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
              </div>

              {/* Secondary Filters */}
              {secondaryFilters.map((config) => {
                const filterKey = config.label.toLowerCase().replace(/\s+/g, '');
                const IconComponent = config.icon;

                if (config.type === 'select') {
                  return (
                    <div key={config.label}>
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                        <IconComponent className="w-4 h-4" />
                        {config.label}
                      </label>
                      <div className="relative">
                        <select
                          value={filters[filterKey] as string || ""}
                          onChange={(e) => updateFilter(filterKey, e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                          <option value="">{config.placeholder || `All ${config.label.split(' ').pop()}`}</option>
                          {config.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                } else if (config.type === 'checkbox') {
                  return (
                    <div key={config.label}>
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                        <IconComponent className="w-4 h-4" />
                        {config.label}
                      </label>
                      <div className="flex items-center gap-3 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters[filterKey] as boolean || false}
                            onChange={(e) => updateFilter(filterKey, e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-700">
                            {config.placeholder || config.label}
                          </span>
                        </label>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 