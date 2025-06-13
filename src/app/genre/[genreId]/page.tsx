// @ts-nocheck

import { GetMoviesByGenre } from "@/lib/MovieApis";
import { Movie, MovieCard } from "@/app/_components/MovieCard";
import GenreSidebar from "@/app/_components/GenreSidebar";
import Link from "next/link";

export default async function GenrePage({ params, searchParams }) {
  const genreId = parseInt(params.genreId);
  const page = parseInt(searchParams?.page || "1");
  const data = await GetMoviesByGenre(genreId, page);

  const movies = data.results;
  const totalPages = data.total_pages;
  const totalResults = data.total_results;

  const genreMap: { [key: number]: string } = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const genreName = genreMap[genreId] || "Unknown";

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64">
          <GenreSidebar />
        </aside>

        <section className="flex-1">
          <h1 className="text-xl font-semibold mb-6">
            {totalResults} titles in “{genreName}”
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-3 mt-10">
            {page > 1 && (
              <Link
                href={`/genre/${genreId}?page=${page - 1}`}
                className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ← Previous
              </Link>
            )}

            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>

            {page < totalPages && (
              <Link
                href={`/genre/${genreId}?page=${page + 1}`}
                className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Next →
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
