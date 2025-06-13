// src/app/details/[id]/page.tsx
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
import { notFound } from "next/navigation";

// ✅ Dynamic fallback зөвшөөрөх — Vercel-д 404 үүсгэхгүй
export const dynamic = "force-dynamic";

export default async function DetailPage({ params }) {
  const rawId = decodeURIComponent(params.id);

  // ✅ ID шалгах: зөвхөн тоо байх ёстой
  if (!/^\d+$/.test(rawId)) return notFound();
  const id = rawId;

  // ✅ Promise.all — бүх өгөгдлийг зэрэг татна
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

// ✅ Static params for SSG — зөвхөн Vercel build үед ажиллана
export async function generateStaticParams() {
  try {
    const data = await GetUpcomingApi();

    if (!data?.results) return [];

    return data.results.map((movie) => ({
      id: movie.id.toString(),
    }));
  } catch (error) {
    console.error("❌ Failed to generate static params:", error);
    return [];
  }
}
