"use client";

import Link from "next/link";

type Props = {
  title: string;
  movies: any[];
};

export default function MovieSection({ title, movies }: Props) {
  return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6">{title}</h2>

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
              <div className="flex items-center text-yellow-500 text-xs mt-2">
                ⭐ {movie.vote_average?.toFixed(1)}/10
              </div>
              <p className="font-semibold text-sm text-black dark:text-white truncate">
                {movie.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
