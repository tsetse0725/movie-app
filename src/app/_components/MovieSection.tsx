"use client";

import Image from "next/image";

type Props = {
  title: string;
  movies: any[];
};

export default function MovieSection({ title, movies }: Props) {
  return (
    <section className="px-6 py-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="text-sm">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded shadow"
            />
            <div className="flex items-center text-yellow-500 text-xs mt-1">
              ⭐ {movie.vote_average?.toFixed(1)}/10
            </div>
            <p className="font-semibold text-sm text-black dark:text-white">
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
