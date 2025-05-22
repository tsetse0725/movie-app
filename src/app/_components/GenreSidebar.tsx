"use client";

import { useRouter } from "next/navigation";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export default function GenreSidebar() {
  const router = useRouter();

  return (
    <aside className="w-full md:w-[260px] p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold mb-2">Search by genre</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        See lists of movies by genre
      </p>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => router.push(`/genre/${genre.id}`)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </aside>
  );
}
