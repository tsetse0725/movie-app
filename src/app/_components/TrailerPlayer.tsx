"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";

interface Props {
  backdrop: string;
  trailerKey: string;
}

export const TrailerPlayer = ({ backdrop, trailerKey }: Props) => {
  const [playTrailer, setPlayTrailer] = useState(false);

  return (
    <div className="relative w-full">
      {!playTrailer ? (
        <>
          <img
            src={`https://image.tmdb.org/t/p/original${backdrop}`}
            alt="Backdrop"
            className="rounded shadow w-full"
          />
          <button
            onClick={() => setPlayTrailer(true)}
            className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 text-black px-4 py-2 rounded-full shadow hover:bg-white transition"
          >
            <PlayCircle className="w-5 h-5" />
            <span>Play trailer</span>
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
  );
};
