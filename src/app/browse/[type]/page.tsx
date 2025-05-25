import { GetUpcomingApi, GetPopularApi, GetTopRatedApi } from "@/lib/MovieApis";
import { MovieCard } from "@/app/_components/MovieCard";
import { notFound } from "next/navigation";

// Movie type тодорхойлсон
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

// Pagination функц
function getPaginationRange(
  current: number,
  total: number
): (number | string)[] {
  const delta = 2;
  const range: number[] = [];
  const rangeWithDots: (number | string)[] = [];

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= left && i <= right)) {
      range.push(i);
    }
  }

  let last: number | undefined;
  for (let i of range) {
    if (last !== undefined) {
      if (i - last === 2) {
        rangeWithDots.push(last + 1);
      } else if (i - last > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    last = i;
  }

  return rangeWithDots;
}

// ✅ Inline typing, JSX.Element ашиглаагүй
export default async function BrowsePage({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams?: { page?: string };
}) {
  const { type } = params;
  const currentPage = parseInt(searchParams?.page || "1");

  const fetchMap: Record<
    string,
    (page: number) => Promise<{ results: Movie[]; total_pages: number }>
  > = {
    upcoming: GetUpcomingApi,
    popular: GetPopularApi,
    top_rated: GetTopRatedApi,
  };

  const fetchFunc = fetchMap[type];
  if (!fetchFunc) return notFound();

  const data = await fetchFunc(currentPage);
  const movies = data.results;
  const totalPages = data.total_pages;

  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {type.replace("_", " ")} Movies
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4">
        <div className="flex items-center gap-2 flex-wrap">
          {currentPage > 1 && (
            <a
              href={`/browse/${type}?page=${currentPage - 1}`}
              className="px-3 py-1 border rounded text-sm font-medium bg-white dark:bg-zinc-700 dark:text-white hover:bg-gray-200"
            >
              Previous
            </a>
          )}

          {paginationRange.map((page, idx) =>
            page === "..." ? (
              <span key={`dots-${idx}`} className="px-3 py-1 text-gray-400">
                ...
              </span>
            ) : (
              <a
                key={`page-${page}`}
                href={`/browse/${type}?page=${page}`}
                className={`px-3 py-1 border rounded text-sm font-medium transition ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black dark:bg-zinc-700 dark:text-white"
                }`}
              >
                {page}
              </a>
            )
          )}

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
