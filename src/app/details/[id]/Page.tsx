import DetailPageSkeleton from "@/components/skeleton/DetailPageSkeleton";
import { Detail } from "@/app/_components/Detail";
import {
  GetMovieDetailApi,
  GetMovieCreditsApi,
  GetMovieVideosApi,
  GetSimilarMoviesApi,
  GetUpcomingApi,
} from "@/lib/MovieApis";

type PageProps = {
  params: {
    id: string;
  };
};

type Video = {
  type: string;
  site: string;
  key: string;
};

type Movie = {
  id: number | string;
  // Та өөрийн movie object-д тохирох property-г энд нэмнэ
};

export default async function DetailPage({ params }: PageProps) {
  const rawId = decodeURIComponent(params.id ?? "");
  if (!/^\d+$/.test(rawId)) return <div>Invalid ID</div>;
  const id = rawId;

  let movie, credits, videos: { results: Video[] }, similar;
  try {
    [movie, credits, videos, similar] = await Promise.all([
      GetMovieDetailApi(id),
      GetMovieCreditsApi(id),
      GetMovieVideosApi(id),
      GetSimilarMoviesApi(id),
    ]);
  } catch (error) {
    // error нь unknown тул message авахын тулд type guard ашиглах
    const errMsg =
      error instanceof Error ? error.message : "Unknown error occured";
    return <div>Error loading movie details: {errMsg}</div>;
  }

  if (!movie || !credits || !videos || !similar) {
    return <DetailPageSkeleton />;
  }

  const trailer = videos?.results?.find(
    (v: Video) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <Detail
      movie={movie}
      credits={credits}
      trailerKey={trailer?.key || ""}
      similar={similar?.results || []}
    />
  );
}

// ✅ Static params for SSG
export async function generateStaticParams() {
  try {
    const data = await GetUpcomingApi();
    if (!data?.results) return [];
    return data.results.map((movie: Movie) => ({
      id: movie.id.toString(),
    }));
  } catch (error) {
    return [];
  }
}