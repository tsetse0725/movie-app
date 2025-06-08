// @ts-nocheck

import { GetSearchMoviesApi } from "@/lib/MovieApis";
import { MovieCard, Movie } from "../_components/MovieCard";
import GenreSidebar from "../_components/GenreSidebar";
import Link from "next/link";

// ❌ SearchPageProps хэрэглэхгүй
export default async function SearchPage({ searchParams }) {
  const query = searchParams?.query || "";
  const page = parseInt(searchParams?.page || "1");

  const searchData = await GetSearchMoviesApi(query, page);
  const movies = searchData.results;
  const totalPages = searchData.total_pages;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">
        Search results for: <span className="text-purple-600">"{query}"</span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Зүүн талд: Movie list */}
        <div className="flex-1">
          {movies.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
        </div>

        {/* Баруун талд: Genre sidebar */}
        <div className="w-full lg:w-[260px]">
          <GenreSidebar />
        </div>
      </div>
    </section>
  );
}
