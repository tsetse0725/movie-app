// @ts-nocheck

import { Suspense } from "react";
import { notFound } from "next/navigation";
import DetailPageSkeleton from "@/components/skeleton/DetailPageSkeleton";
import { Detail } from "@/app/_components/Detail";
import {
  GetMovieDetailApi,
  GetMovieCreditsApi,
  GetMovieVideosApi,
  GetSimilarMoviesApi,
} from "@/lib/MovieApis";

// ✅ Энэ нь Vercel дээр dynamic route-ыг зөв ажиллуулна
export const dynamic = "force-dynamic";

export default async function DetailPage({ params }) {
  const rawId = decodeURIComponent(params.id);

  // 🔒 ID зөв форматаар ирж байгаа эсэхийг шалгана
  if (!/^\d+$/.test(rawId)) return notFound();

  const id = rawId;

  // 🚀 Бүх мэдээллийг зэрэг асууж авна
  const [movie, credits, videos, similar] = await Promise.all([
    GetMovieDetailApi(id),
    GetMovieCreditsApi(id),
    GetMovieVideosApi(id),
    GetSimilarMoviesApi(id),
  ]);

  // 🎬 YouTube trailer олж авах
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
