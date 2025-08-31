export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="w-[95%] mx-auto py-6">
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="w-[95%] mx-auto py-12">
        {/* Moment Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
        </div>

        {/* Carousel Section */}
        <div className="mb-12">
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="space-y-4">
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </main>
  );
} 