import Header from "@/app/_components/Header";
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
      <Header />

      {/* Hero section fetch дотроо */}
      <HeroSection />

      {/* Movie lists */}
      <MovieSection title="Upcoming" movies={upcoming.results} />
      <MovieSection title="Popular" movies={popular.results} />
      <MovieSection title="Top Rated" movies={topRated.results} />
    </>
  );
}
