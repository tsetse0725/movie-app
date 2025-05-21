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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GenreList from "./GenreList";

export default function GenreSelector() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const params = useParams();
  const router = useRouter();

  const initialGenreId = parseInt(params?.id as string);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(
    initialGenreId || null
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isNaN(initialGenreId)) {
      setSelectedGenreId(initialGenreId);
    } else {
      setSelectedGenreId(null);
    }
  }, [initialGenreId]);

  const handleGenreClick = (genreId: number) => {
    if (genreId !== selectedGenreId) {
      setSelectedGenreId(genreId);
      router.push(`/genre/${genreId}`);
      setOpen(false);
    }
  };

  const handleClear = () => {
    setSelectedGenreId(null);
  };

  const content = (
    <>
      <h4 className="text-sm font-semibold mb-1">Genres</h4>
      <p className="text-sm text-muted-foreground mb-4">
        See lists of movies by genre
      </p>
      <GenreList
        selectedGenreId={selectedGenreId}
        onSelect={handleGenreClick}
        onClear={handleClear}
      />
    </>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[120px] justify-start">
            Genre
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[650px] p-4">{content}</PopoverContent>
      </Popover>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-md border">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-[85%] px-4 py-6">
        <SheetHeader>
          <SheetTitle className="text-lg">Genres</SheetTitle>
          <p className="text-sm text-muted-foreground">
            See lists of movies by genre
          </p>
        </SheetHeader>
        <div className="mt-6">
          <GenreList
            selectedGenreId={selectedGenreId}
            onSelect={handleGenreClick}
            onClear={handleClear}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
