"use client";

import Link from "next/link";

type Props = {
  title: string;
  movies: any[];
  type?: "upcoming" | "popular" | "top_rated";
};

export default function MovieSection({ title, movies, type }: Props) {
  return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-8">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>

        {type && (
          <Link
            href={`/browse/${type}`}
            className="text-sm text-black hover:no-underline"
          >
            See more →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/details/${movie.id}`}>
            <div className="group cursor-pointer transition hover:scale-105">
              <div className="aspect-[2/3] w-full overflow-hidden rounded shadow">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2 text-sm text-center text-black dark:text-white">
                <div className="text-yellow-500 font-semibold">
                  ⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10
                </div>
                <div className="truncate mt-1">{movie.title}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
