"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { MoreLikeThis } from "./MoreLikeThis";

interface DetailProps {
  movie: {
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    genres: { id: number; name: string }[];
    release_date: string;
    runtime: number;
    vote_average: number;
  };
  credits: {
    cast: { name: string }[];
    crew: { name: string; job: string; department: string }[];
  };
  trailerKey: string;
  similar: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  }[];
}

export const Detail = ({
  movie,
  credits,
  trailerKey,
  similar,
}: DetailProps) => {
  const [playTrailer, setPlayTrailer] = useState(false);

  const director = credits.crew.find(
    (c: { job: string }) => c.job === "Director"
  );

  const writers = credits.crew
    .filter(
      (w: { job: string; department: string }) => w.department === "Writing"
    )
    .map((w: { name: string }) => w.name)
    .slice(0, 3);

  const stars = credits.cast.map((a: { name: string }) => a.name).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-black dark:text-white">
      {/* Title + meta */}
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <span>{movie.release_date}</span>
        <span>{movie.runtime} min</span>
        <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
      </div>

      {/* Layout → Poster + Backdrop */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-[250px] rounded shadow"
        />

        {/* Backdrop with Play button */}
        <div className="flex-1 relative">
          {!playTrailer ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt="Backdrop"
                className="rounded shadow w-full"
              />
              <button
                onClick={() => setPlayTrailer(true)}
                className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 text-black px-4 py-2 rounded-full shadow hover:bg-white transition"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Play trailer · 2:35</span>
              </button>
            </>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              className="w-full aspect-video rounded shadow"
              allowFullScreen
            />
          )}
        </div>
      </div>

      {/* Genres */}
      <div className="flex gap-2 flex-wrap mt-4">
        {movie.genres.map((g) => (
          <span
            key={g.id}
            className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {g.name}
          </span>
        ))}
      </div>

      {/* Overview */}
      <p className="mt-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {movie.overview}
      </p>

      {/* Credits */}
      <div className="mt-6 text-sm">
        <p>
          <strong className="text-black dark:text-white">Director:</strong>{" "}
          {director?.name}
        </p>
        <p>
          <strong className="text-black dark:text-white">Writers:</strong>{" "}
          {writers.join(", ")}
        </p>
        <p>
          <strong className="text-black dark:text-white">Stars:</strong>{" "}
          {stars.join(", ")}
        </p>
      </div>

      <MoreLikeThis similar={similar} />
    </div>
  );
};
