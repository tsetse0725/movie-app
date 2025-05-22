export default function HomepageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-4">
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
