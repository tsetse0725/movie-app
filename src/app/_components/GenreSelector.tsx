"use client";

import { ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/lib/use-media-query";
import { useState } from "react";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];

export default function GenreSelector() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    // 🖥️ Desktop Popover
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[120px] justify-start">
            Genre
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[650px] p-4">
          <h4 className="text-sm font-semibold mb-1">Genres</h4>
          <p className="text-sm text-muted-foreground mb-4">
            See lists of movies by genre
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                className="flex justify-between items-center px-3 py-1.5 border rounded hover:bg-accent text-sm"
                onClick={() => {
                  console.log("Selected genre:", genre);
                  setOpen(false);
                }}
              >
                {genre} <span>›</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // 📱 Mobile Sheet
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-md border">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85%] px-4 py-6">
        <SheetHeader>
          <SheetTitle className="text-lg">Genres</SheetTitle>
          <p className="text-sm text-muted-foreground">
            See lists of movies by genre
          </p>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-2 mt-6">
          {genres.map((genre) => (
            <button
              key={genre}
              className="flex justify-between items-center px-3 py-1.5 border rounded hover:bg-accent text-sm"
              onClick={() => {
                console.log("Selected genre:", genre);
                setOpen(false);
              }}
            >
              {genre} <span>›</span>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
