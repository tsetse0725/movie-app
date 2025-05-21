import { DetailProps } from "@/lib/Types";

interface Props {
  movie: DetailProps["movie"];
  credits: DetailProps["credits"];
}

export const MovieMetaBody = ({ movie, credits }: Props) => {
  const director = credits.crew.find((c) => c.job === "Director");
  const writers = credits.crew
    .filter((w) => w.department === "Writing")
    .map((w) => w.name)
    .slice(0, 3);
  const stars = credits.cast.map((a) => a.name).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Genres */}
      <div className="flex flex-wrap gap-2">
        {movie.genres.map((g) => (
          <span
            key={g.id}
            className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {g.name}
          </span>
        ))}
      </div>

      {/* Overview */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {movie.overview}
      </p>

      {/* Credits */}
      <div className="space-y-4 text-sm">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 items-start border-b pb-2">
          <strong className="text-black dark:text-white">Director</strong>
          <p>{director?.name}</p>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 items-start border-b pb-2">
          <strong className="text-black dark:text-white">Writers</strong>
          <p>{writers.join(" · ")}</p>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 items-start border-b pb-2">
          <strong className="text-black dark:text-white">Stars</strong>
          <p>{stars.join(" · ")}</p>
        </div>
      </div>
    </div>
  );
};
