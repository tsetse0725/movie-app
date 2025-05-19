// app/browse/[type]/page.tsx

import { GetUpcomingApi, GetPopularApi, GetTopRatedApi } from "@/lib/MovieApis";
import { MovieCard } from "@/app/_components/MovieCard";
import { notFound } from "next/navigation";

interface PageProps {
  params: { type: string };
  searchParams?: { page?: string };
}

export default async function BrowsePage({ params, searchParams }: PageProps) {
  const { type } = params;
  const currentPage = parseInt(searchParams?.page || "1");

  const fetchMap: Record<string, (page: number) => Promise<any>> = {
    upcoming: GetUpcomingApi,
    popular: GetPopularApi,
    top_rated: GetTopRatedApi,
  };

  const fetchFunc = fetchMap[type];
  if (!fetchFunc) return notFound();

  const allData = await fetchFunc(currentPage);
  const allMovies = allData.results;

  const moviesPerPage = 10;
  const totalPages = Math.ceil(allMovies.length / moviesPerPage);

  const startIndex = (currentPage - 1) * moviesPerPage;
  const paginatedMovies = allMovies.slice(
    startIndex,
    startIndex + moviesPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {type.replace("_", " ")} Movies
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
        {paginatedMovies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4">
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          {currentPage > 1 && (
            <a
              href={`/browse/${type}?page=${currentPage - 1}`}
              className="px-3 py-1 border rounded text-sm font-medium bg-white dark:bg-zinc-700 dark:text-white hover:bg-gray-200"
            >
              Previous
            </a>
          )}

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <a
                key={pageNum}
                href={`/browse/${type}?page=${pageNum}`}
                className={`px-3 py-1 border rounded text-sm font-medium transition ${
                  pageNum === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black dark:bg-zinc-700 dark:text-white"
                }`}
              >
                {pageNum}
              </a>
            );
          })}

          {/* Next Button */}
          {currentPage < totalPages && (
            <a
              href={`/browse/${type}?page=${currentPage + 1}`}
              className="px-3 py-1 border rounded text-sm font-medium bg-white dark:bg-zinc-700 dark:text-white hover:bg-gray-200"
            >
              Next
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
