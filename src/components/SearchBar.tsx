"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Command } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onSearchSubmit?: (query: string) => void;
}

export function SearchBar({
  placeholder = "Search 1000+ ideas by keyword, field, topic, or tech stack...",
  className = "",
  autoFocus = false,
  onSearchSubmit,
}: SearchBarProps) {
  const router = useRouter();
  const searchQuery = useAppStore((state) => state.filters.searchQuery);
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);
  const addRecentSearch = useAppStore((state) => state.addRecentSearch);

  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Global '/' keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        const searchInput = document.getElementById("main-search-input");
        searchInput?.focus();
      } else if (e.key === "Escape") {
        const searchInput = document.getElementById("main-search-input");
        if (document.activeElement === searchInput) {
          searchInput?.blur();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = localQuery.trim();
    setSearchQuery(q);
    if (q) {
      addRecentSearch(q);
    }
    if (onSearchSubmit) {
      onSearchSubmit(q);
    } else {
      router.push(`/explore?q=${encodeURIComponent(q)}`);
    }
  };

  const handleClear = () => {
    setLocalQuery("");
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          id="main-search-input"
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-20 py-3.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-1 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg select-none">
            <Command className="w-3 h-3" /> /
          </kbd>
        </div>
      </div>
    </form>
  );
}
