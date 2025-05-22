"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { GetHeroApi } from "../hooks/GetHeroApi";
import Link from "next/link";
import Image from "next/image";

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
    if (key) {
      setSelectedTrailerKey(key);
      setShowTrailer(true);
    }
  };

  const closeModal = () => {
    setShowTrailer(false);
    setSelectedTrailerKey(null);
  };

  if (movies.length === 0) return null;

  return (
    <div className="relative">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id}>
              <section className="relative w-full h-[600px] overflow-hidden xl:h-[1000px]">
                {/* Зураг */}
                <Link href={`/details/${movie.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    fill
                    objectFit="cover"
                  />
                </Link>

                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 max-w-[1440px] h-full mx-auto px-6 flex items-center">
                  <div className="text-white max-w-xl ml-6">
                    <h2 className="text-sm mb-1">Now Playing:</h2>

                    <Link href={`/details/${movie.id}`}>
                      <h1 className="text-4xl font-bold mb-2 hover:underline cursor-pointer">
                        {movie.title}
                      </h1>
                    </Link>

                    <div className="flex items-center gap-1 text-yellow-400 font-semibold mb-3">
                      ⭐ {movie.vote_average.toFixed(1)}
                      <span className="text-white/70 text-sm"> / 10</span>
                    </div>

                    <p className="text-sm text-white/80 mb-4 line-clamp-3">
                      {movie.overview}
                    </p>

                    {movie.trailerKey ? (
                      <button
                        className="px-4 py-2 bg-white text-black rounded font-semibold hover:bg-gray-200 transition"
                        onClick={() => handlePlayTrailer(movie.trailerKey)}
                      >
                        ▶ Watch Trailer
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 bg-gray-400 text-white rounded font-semibold cursor-not-allowed"
                        disabled
                      >
                        No Trailer
                      </button>
                    )}
                  </div>
                </div>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-black" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-black" />
      </Carousel>

      {/* Trailer Modal */}
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
