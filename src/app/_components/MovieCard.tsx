"use client";

import Link from "next/link";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  if (!movie?.id || typeof movie.id !== "number") {
    return null;
  }

  return (
    <Link href={`/details/${movie.id}`}>
      <div className="hover:opacity-90 transition cursor-pointer w-full">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/no-poster.png"
          }
          alt={movie.title}
          className="rounded w-full h-auto object-cover shadow"
        />
        <div className="mt-2 space-y-1">
          <h3 className="text-sm font-semibold text-black dark:text-white truncate">
            {movie.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ⭐ {movie.vote_average.toFixed(1)} | 📅 {movie.release_date}
          </p>
        </div>
      </div>
    </Link>
  );
};
