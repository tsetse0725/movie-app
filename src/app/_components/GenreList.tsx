import { genres } from "@/lib/genres";

interface Props {
  selectedGenreId: number | null;
  onSelect: (genreId: number) => void;
  onClear: () => void;
}

export default function GenreList({
  selectedGenreId,
  onSelect,
  onClear,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {genres.map((genre) => {
        const isSelected = genre.id === selectedGenreId;

        return (
          <button
            key={genre.id}
            onClick={() => onSelect(genre.id)}
            className={`flex justify-between items-center px-3 py-1.5 border rounded text-sm transition ${
              isSelected
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-white text-black dark:bg-black dark:text-white hover:bg-accent"
            }`}
          >
            {genre.name}
            <span className="ml-2">
              {isSelected ? (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                  }}
                  className="text-lg font-bold leading-none"
                >
                  ×
                </span>
              ) : (
                "›"
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
