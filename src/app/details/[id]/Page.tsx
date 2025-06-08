// @ts-nocheck

import DetailPageSkeleton from "@/components/skeleton/DetailPageSkeleton";
import { Suspense } from "react";
import { Detail } from "@/app/_components/Detail";
import {
  GetMovieDetailApi,
  GetMovieCreditsApi,
  GetMovieVideosApi,
  GetSimilarMoviesApi,
} from "@/lib/MovieApis";

// ❌ PageProps хэрэглэхгүй
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
