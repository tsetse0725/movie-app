"use client";

import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { GetHeroApi } from "../hooks/GetHeroApi";
import { HeroCarousel } from "./HeroCarousel";

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  trailerKey: string;
};

export default function HeroSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedTrailerKey, setSelectedTrailerKey] = useState<string | null>(
    null
  );
  const plugin = useRef(Autoplay({ delay: 3000 }));

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetHeroApi();
      setMovies(data?.results || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowTrailer(false);
        setSelectedTrailerKey(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePlayTrailer = (key: string) => {
    setSelectedTrailerKey(key);
    setShowTrailer(true);
  };

  const closeModal = () => {
    setShowTrailer(false);
    setSelectedTrailerKey(null);
  };

  return (
    <div className="relative">
      <HeroCarousel movies={movies} onPlay={handlePlayTrailer} />

      {showTrailer && selectedTrailerKey && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded overflow-hidden shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${selectedTrailerKey}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
