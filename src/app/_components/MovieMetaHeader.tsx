import { DetailProps } from "@/lib/Types";

interface Props {
  movie: DetailProps["movie"];
}

export const MovieMetaHeader = ({ movie }: Props) => {
  const formatVotes = (n: number) =>
    n >= 1000 ? `${Math.round(n / 1000)}K` : n.toString();

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold mb-1">{movie.title}</h1>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {movie.release_date} · PG · {movie.runtime} min
          </div>
        </div>
        <div className="text-sm text-yellow-500 font-semibold">
          <div className="flex items-center gap-1">
            ⭐ {movie.vote_average.toFixed(1)}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              /10
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({formatVotes(movie.vote_count)})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
