"use client";

import { useState, useEffect } from "react";
import { GetSearchMoviesApi } from "@/lib/MovieApis";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchDropdown() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  // ⏳ Debounced Search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        setLoading(true);
        GetSearchMoviesApi(query, 1)
          .then((data) => {
            setResults(data.results.slice(0, 5));
            setShowDropdown(true);
          })
          .finally(() => setLoading(false));
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setResults([]);
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* 🔍 Input field */}
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-8 pr-8 py-2 w-full border rounded dark:bg-gray-800 dark:text-white"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 📋 Dropdown */}
      {showDropdown && (
        <div className="absolute mt-1 w-full bg-white dark:bg-gray-900 border rounded shadow z-50 max-h-80 overflow-auto">
          {loading ? (
            <p className="p-4 text-sm text-gray-500">Loading...</p>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No results found</p>
          ) : (
            results.map((movie) => (
              <Link
                key={movie.id}
                href={`/details/${movie.id}`}
                onClick={handleClear}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                      : "/no-poster.png"
                  }
                  alt={movie.title}
                  className="w-10 h-14 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium text-sm text-black dark:text-white">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ⭐ {movie.vote_average?.toFixed(1)} | 📅{" "}
                    {movie.release_date || "TBA"}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
