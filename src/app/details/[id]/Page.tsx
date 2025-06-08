// @ts-nocheck

import DetailPageSkeleton from "@/components/skeleton/DetailPageSkeleton";
import { Suspense } from "react";
import { Detail } from "@/app/_components/Detail";
import {
  GetMovieDetailApi,
  GetMovieCreditsApi,
  GetMovieVideosApi,
  GetSimilarMoviesApi,
  GetUpcomingApi, // ⬅️ SSG-д ашиглая
} from "@/lib/MovieApis";

// ✅ Movie Details Page
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

// ✅ Static params generate with axios (GetUpcomingApi)
export async function generateStaticParams() {
  try {
    const data = await GetUpcomingApi(); // ← таалагдсан API-гаа ашигла

    if (!data?.results) {
      console.error("❌ No results from TMDB in generateStaticParams");
      return [];
    }

    return data.results.map((movie) => ({
      id: movie.id.toString(),
    }));
  } catch (error) {
    console.error("❌ Error fetching static params:", error);
    return [];
  }
}
