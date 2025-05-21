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
      {/* Title хэсэг хамгийн эхэнд */}
      <MovieMetaHeader movie={movie} />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Poster */}
        <div className="w-full max-w-[250px] aspect-[2/3]">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded shadow"
          />
        </div>

        {/* Trailer */}
        <div className="flex-1">
          <TrailerPlayer
            backdrop={movie.backdrop_path}
            trailerKey={trailerKey}
          />
        </div>
      </div>

      {/* Genres + Overview + Credits */}
      <div className="mt-10">
        <MovieMetaBody movie={movie} credits={credits} />
      </div>

      {/* Similar */}
      <MoreLikeThis similar={similar} />
    </div>
  );
};
