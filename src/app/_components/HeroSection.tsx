"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GetHeroApi } from "../hooks/GetHeroApi";

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
};

export default function HeroSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const plugin = useRef(Autoplay({ delay: 2000 }));

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetHeroApi();
      setMovies(data?.results?.slice(0, 5) || []);
    };
    fetchData();
  }, []);

  if (movies.length === 0) return null;

  return (
    <div className="relative">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id}>
              <section className="relative w-full h-[500px] overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 max-w-4xl px-6 py-12 text-white ml-12">
                  <h2 className="text-sm">Now Playing:</h2>
                  <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                  <div className="flex items-center gap-1 text-yellow-400 font-semibold mb-3">
                    ⭐ {movie.vote_average.toFixed(1)}
                    <span className="text-white/70 text-sm"> / 10</span>
                  </div>
                  <p className="text-sm text-white/80 mb-4 line-clamp-3">
                    {movie.overview}
                  </p>
                  <button className="px-4 py-2 bg-white text-black rounded font-semibold hover:bg-gray-200 transition">
                    ▶ Watch Trailer
                  </button>
                </div>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ✅ Сумнуудыг энд байрлуул */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-black" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-black" />
      </Carousel>
    </div>
  );
}
