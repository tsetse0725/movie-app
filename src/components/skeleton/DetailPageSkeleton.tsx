export default function DetailPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      {/* Trailer (backdrop) */}
      <div className="w-full h-[250px] sm:h-[400px] lg:h-[500px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Poster (desktop only) */}
        <div className="hidden lg:block w-[250px] aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

        {/* Text blocks */}
        <div className="flex-1 space-y-3">
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      {/* Similar movies */}
      <div className="space-y-4">
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
