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
import { notFound } from "next/navigation";

// ✅ Энэ нь dynamic route-уудыг runtime дээр ачаалуулахыг зөвшөөрнө
export const dynamic = "force-dynamic";

export default async function DetailPage({ params }) {
  const rawId = decodeURIComponent(params.id);

  // ✅ ID зөв эсэхийг шалгах
  if (!/^\d+$/.test(rawId)) return notFound();
  const id = rawId;

  // ✅ Promise.all ашиглан өгөгдлийг зэрэг татна
  const [movie, credits, videos, similar] = await Promise.all([
    GetMovieDetailApi(id),
    GetMovieCreditsApi(id),
    GetMovieVideosApi(id),
    GetSimilarMoviesApi(id),
  ]);

  // ✅ YouTube trailer авах
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
