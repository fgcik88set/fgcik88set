interface StatsSkeletonProps {
  count?: number
  className?: string
}

export default function StatsSkeleton({ count = 4, className = "" }: StatsSkeletonProps) {
  return (
    <div className={`grid md:grid-cols-${count} gap-6 mt-16 animate-item ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <div className="w-10 h-10 bg-white/20 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="text-2xl font-bold mb-2">
            <div className="h-8 w-16 bg-white/20 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="text-white/80">
            <div className="h-4 w-20 bg-white/20 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )
} 