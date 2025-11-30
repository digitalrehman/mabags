import { Skeleton } from "@/components/ui/skeleton"

export function ProductsSkeleton() {
  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters Skeleton */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
          <Skeleton className="h-11 w-full md:w-80" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-24" />
          </div>
        </div>

        {/* Category Pills Skeleton */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <Skeleton className="aspect-square" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
