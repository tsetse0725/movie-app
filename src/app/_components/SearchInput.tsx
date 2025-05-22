import { Search, X } from "lucide-react";

interface Props {
  query: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  query,
  onChange,
  onClear,
  onKeyDown,
}: Props) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="pl-8 pr-8 py-2 w-full border rounded dark:bg-gray-800 dark:text-white"
      />
      {query && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
