"use client";

import { useState } from "react";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export const MoreLikeThis = ({ similar }: { similar: Movie[] }) => {
  const [showAll, setShowAll] = useState(false);

  const moviesToShow = showAll ? similar : similar.slice(0, 10);

  const toggleShow = () => setShowAll((prev) => !prev);

  return (
    <div className="mt-10">
      {/* Title + Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">More like this</h2>
        {similar.length > 10 && (
          <button
            onClick={toggleShow}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            {showAll ? "See less ↑" : "See more →"}
          </button>
        )}
      </div>

      {/* Movie Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {moviesToShow.map((m) => (
          <Link href={`/details/${m.id}`} key={m.id}>
            <div className="bg-white dark:bg-zinc-800 rounded shadow text-center cursor-pointer hover:scale-[1.02] transition">
              <img
                src={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                    : "/no-poster.png"
                }
                alt={m.title}
                className="rounded-t w-full h-[full] object-cover"
              />
              <div className="px-2 py-2 text-xs">
                <div className="flex items-center justify-center gap-1 text-yellow-500">
                  ⭐ {m.vote_average?.toFixed(1) || "N/A"}/10
                </div>
                <p className="mt-1 text-black dark:text-white truncate">
                  {m.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
