"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Film, Search, Sun, Moon, X } from "lucide-react";
import { useMediaQuery } from "@/lib/use-media-query";
import GenreSelector from "./GenreSelector";
import Link from "next/link";
import SearchDropdown from "./SearchDropdown";

export default function Header() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700 relative">

      <div className="flex items-center gap-2">
        {!isDesktop && <GenreSelector />}
        <Link
          href="/"
          className="flex items-center gap-2 text-purple-600 font-bold italic text-lg"
        >
          <Film className="w-5 h-5" />
          <span>Movie Z</span>
        </Link>
      </div>


      <div className="hidden md:flex items-center gap-2 flex-1 justify-center max-w-[600px]">
        <GenreSelector />
        <SearchDropdown />
      </div>


      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowMobileSearch((prev) => !prev)}
          className="md:hidden p-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {showMobileSearch ? (
            <X className="h-4 w-4" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </button>

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>
      </div>


      {showMobileSearch && (
        <div className="absolute top-full left-0 w-full px-4 py-2 bg-white dark:bg-gray-900 shadow-md md:hidden animate-fade-in z-50">
          <SearchDropdown />
        </div>
      )}
    </header>
  );
}
