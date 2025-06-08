// @ts-nocheck

import DetailPageSkeleton from "@/components/skeleton/DetailPageSkeleton";
import { Suspense } from "react";
import { Detail } from "@/app/_components/Detail";
import {
  GetMovieDetailApi,
  GetMovieCreditsApi,
  GetMovieVideosApi,
  GetSimilarMoviesApi,
  GetUpcomingApi,
} from "@/lib/MovieApis";

export default async function DetailPage({ params }) {
  const rawId = decodeURIComponent(params.id);
  if (!/^\d+$/.test(rawId)) throw new Error("Invalid ID");

  const id = rawId;

  const [movie, credits, videos, similar] = await Promise.all([
    GetMovieDetailApi(id),
    GetMovieCreditsApi(id),
    GetMovieVideosApi(id),
    GetSimilarMoviesApi(id),
  ]);

  const trailer = videos.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <Suspense fallback={<DetailPageSkeleton />}>
      <Detail
        movie={movie}
        credits={credits}
        trailerKey={trailer?.key || ""}
        similar={similar.results}
      />
    </Suspense>
  );
}

// ✅ Static params for SSG
export async function generateStaticParams() {
  try {
    const data = await GetUpcomingApi();
    console.log("✅ Generating static paths:", data?.results?.length);

    if (!data?.results) return [];

    return data.results.map((movie) => ({
      id: movie.id.toString(),
    }));
  } catch (error) {
    console.error("❌ Failed to generate static params:", error);
    return [];
  }
}
