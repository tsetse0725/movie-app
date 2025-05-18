import {
  GetMovieDetailApi,
  GetMovieCreditsApi,
  GetMovieVideosApi,
  GetSimilarMoviesApi,
} from "@/lib/MovieApis";
import { Detail } from "@/app/_components/Detail";

interface PageProps {
  params: { id: string };
}

const DetailPage = async ({ params }: PageProps) => {
  const rawId = decodeURIComponent(params.id);

  if (!/^\d+$/.test(rawId)) {
    throw new Error(`❌ Invalid movie ID: ${rawId}`);
  }

  const id = rawId;

  const [movie, credits, videos, similar] = await Promise.all([
    GetMovieDetailApi(id),
    GetMovieCreditsApi(id),
    GetMovieVideosApi(id),
    GetSimilarMoviesApi(id),
  ]);

  return (
    <Detail
      movie={movie}
      credits={credits}
      trailerKey={videos.results[0]?.key}
      similar={similar.results}
    />
  );
};

export default DetailPage;
