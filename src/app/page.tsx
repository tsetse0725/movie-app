import HeroSection from "@/app/_components/HeroSection";
import MovieSection from "@/app/_components/MovieSection";
import { GetUpcomingApi, GetPopularApi, GetTopRatedApi } from "@/lib/MovieApis";

export default async function Home() {
  const [upcoming, popular, topRated] = await Promise.all([
    GetUpcomingApi(),
    GetPopularApi(),
    GetTopRatedApi(),
  ]);

  return (
    <>
      <HeroSection />
      <MovieSection
        title="Upcoming"
        movies={upcoming.results}
        type="upcoming"
      />
      <MovieSection title="Popular" movies={popular.results} type="popular" />
      <MovieSection
        title="Top Rated"
        movies={topRated.results}
        type="top_rated"
      />
    </>
  );
}
