"use client";

import { useState, useEffect } from "react";
import { GetSearchMoviesApi } from "@/lib/MovieApis";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput"; // 👈 шинэ component ашиглана

export default function SearchDropdown() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

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
      handleClear();
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* 🧠 Input хэсгийг тусад нь */}
      <SearchInput
        query={query}
        onChange={setQuery}
        onClear={handleClear}
        onKeyDown={handleKeyDown}
      />

      {/* Dropdown хэсэг */}
      {showDropdown && (
        <div className="absolute mt-1 w-full bg-white dark:bg-gray-900 border rounded shadow z-50 max-h-80 overflow-auto">
          {loading ? (
            <p className="p-4 text-sm text-gray-500">Loading...</p>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No results found</p>
          ) : (
            <>
              {results.map((movie) => (
                <div key={movie.id} className="border-b dark:border-gray-700">
                  <Link
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

                  <div className="text-right pr-4 pb-2">
                    <Link
                      href={`/details/${movie.id}`}
                      onClick={handleClear}
                      className="text-sm text-black no-underline"
                    >
                      See more →
                    </Link>
                  </div>
                </div>
              ))}

              <Link
                href={`/search?query=${encodeURIComponent(query.trim())}`}
                onClick={handleClear}
                className="block text-center text-sm text-black py-2 border-t dark:border-gray-700"
              >
                See all results for "{query.trim()}"
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
