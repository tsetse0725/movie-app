"use client";

import { useEffect, useState } from "react";
import { GetUpcomingApi, GetPopularApi, GetTopRatedApi } from "@/lib/MovieApis";
import HeroSection from "./_components/HeroSection";
import MovieSection from "./_components/MovieSection";
import HomepageSkeleton from "@/components/skeleton/HomepageSkeleton";

export default function ClientHome() {
  const [upcoming, setUpcoming] = useState<any | null>(null);
  const [popular, setPopular] = useState<any | null>(null);
  const [topRated, setTopRated] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [u, p, t] = await Promise.all([
        GetUpcomingApi(),
        GetPopularApi(),
        GetTopRatedApi(),
      ]);
      setUpcoming(u);
      setPopular(p);
      setTopRated(t);
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) return <HomepageSkeleton />;

  return (
    <>
      <HeroSection />
      <MovieSection title="Upcoming" movies={upcoming.results} />
      <MovieSection title="Popular" movies={popular.results} />
      <MovieSection title="Top Rated" movies={topRated.results} />
    </>
  );
}
