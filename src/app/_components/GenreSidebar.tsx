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
  { id: 878, name: "Sci-Fi" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export default function GenreSidebar() {
  const router = useRouter();

  return (
    <aside className="w-full md:w-64 mb-8 md:mb-0">
      <h2 className="text-lg font-semibold mb-2">Search filter</h2>
      <p className="text-sm text-gray-500 mb-4">See lists of movies by genre</p>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => router.push(`/genre/${genre.id}`)}
            className="px-3 py-1 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </aside>
  );
}
