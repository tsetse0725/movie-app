import { GetSearchMoviesApi } from "@/lib/MovieApis";
import { MovieCard, Movie } from "../_components/MovieCard";
import Link from "next/link";

interface SearchPageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.query || "";
  const page = parseInt(searchParams?.page || "1");

  const searchData = await GetSearchMoviesApi(query, page);
  const movies = searchData.results;
  const totalPages = searchData.total_pages;

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Search Results for: <span className="text-purple-600">"{query}"</span>
      </h2>

      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {movies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {page > 1 && (
              <Link
                href={`/search?query=${query}&page=${page - 1}`}
                className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ← Previous
              </Link>
            )}
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/search?query=${query}&page=${page + 1}`}
                className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Next →
              </Link>
            )}
          </div>
        </>
      )}
    </section>
  );
}
