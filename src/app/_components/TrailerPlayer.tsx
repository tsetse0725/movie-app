"use client";

import { useState, useEffect } from "react";

interface TrailerPlayerProps {
  backdrop: string;
  trailerKey: string;
  variant?: "default" | "second";
}

export const TrailerPlayer = ({
  backdrop,
  trailerKey,
  variant = "default", // default утга
}: TrailerPlayerProps) => {
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowTrailer(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openModal = () => setShowTrailer(true);
  const closeModal = () => setShowTrailer(false);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded shadow">
      {/* Зураг */}
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop}`}
        alt="Backdrop"
        className="w-full h-full object-cover"
      />

      {/* Хар бүрхүүл */}
      <div className="absolute inset-0 bg-black/50">
        {trailerKey && (
          <>
            {variant === "second" ? (
              <button
                onClick={openModal}
                className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/90 hover:bg-white text-black px-4 py-2 rounded-full shadow transition"
              >
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Play trailer</span>
              </button>
            ) : (
              // 👉 HeroSection style товч
              <div className="flex items-center justify-center h-full">
                <button
                  onClick={openModal}
                  className="px-4 py-2 bg-white text-black rounded font-semibold hover:bg-gray-200 transition"
                >
                  ▶ Watch Trailer
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Popup Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded overflow-hidden shadow-xl">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};
