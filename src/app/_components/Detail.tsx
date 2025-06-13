import { MovieMetaHeader } from "./MovieMetaHeader";
import { MovieMetaBody } from "./MovieMetaBody";
import { TrailerPlayer } from "./TrailerPlayer";
import { MoreLikeThis } from "./MoreLikeThis";
import { DetailProps } from "@/lib/Types";

export const Detail = ({
  movie,
  credits,
  trailerKey,
  similar,
}: DetailProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

      <MovieMetaHeader movie={movie} />

      <div className="flex flex-col lg:flex-row gap-6">

        <div className="hidden lg:block w-full max-w-[250px] aspect-2/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-fill rounded shadow"
          />
        </div>


        <div className="flex-1">
          <TrailerPlayer
            backdrop={movie.backdrop_path}
            trailerKey={trailerKey}
            variant="second"
          />
        </div>
      </div>


      <div className="mt-10">
        <MovieMetaBody movie={movie} credits={credits} />
      </div>


      <MoreLikeThis similar={similar} />
    </div>
  );
};
