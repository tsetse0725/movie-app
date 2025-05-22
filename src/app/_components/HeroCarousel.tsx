"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  trailerKey: string;
};

interface Props {
  movies: Movie[];
  onPlay: (key: string) => void;
}

export const HeroCarousel = ({ movies, onPlay }: Props) => {
  if (movies.length === 0) return null;

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id}>
            <section className="relative w-full h-[600px] overflow-hidden xl:h-[1000px]">
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
                      onClick={() => onPlay(movie.trailerKey)}
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
  );
};
