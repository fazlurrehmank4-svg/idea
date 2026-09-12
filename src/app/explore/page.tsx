"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { IdeaCard } from "@/components/IdeaCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { ConsentBanner } from "@/components/ads/ConsentBanner";
import { SurpriseMeModal } from "@/components/SurpriseMeModal";
import { searchIdeas } from "@/lib/fuse";
import { useAppStore } from "@/lib/store";
import { Idea } from "@/types/idea";
import { Layers, Sparkles } from "lucide-react";

function ExploreContent() {
  const searchParams = useSearchParams();
  const filters = useAppStore((state) => state.filters);
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);
  const toggleFieldFilter = useAppStore((state) => state.toggleFieldFilter);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 18;

  // Sync URL query params if present
  useEffect(() => {
    const q = searchParams.get("q");
    const field = searchParams.get("field");

    if (q !== null) {
      setSearchQuery(q);
    }
    if (field && !filters.selectedFields.includes(field)) {
      toggleFieldFilter(field);
    }
  }, [searchParams]);

  // Perform search & filter
  const filteredIdeas = useMemo(() => {
    return searchIdeas(filters.searchQuery, {
      fields: filters.selectedFields,
      levels: filters.selectedLevels,
      difficulties: filters.selectedDifficulties,
      budgets: filters.selectedBudgets,
      tags: filters.selectedTags,
      sortBy: filters.sortBy,
    });
  }, [filters]);

  // Reset page on filter changes
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const paginatedIdeas = useMemo(() => {
    return filteredIdeas.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredIdeas, page]);

  const hasMore = paginatedIdeas.length < filteredIdeas.length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Header & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                Explore Project Ideas
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Showing <span className="font-bold text-slate-900 dark:text-slate-200">{filteredIdeas.length}</span> results from database
              </p>
            </div>
          </div>

          <SearchBar />
        </div>

        {/* Layout with Sidebar Ad & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <FilterBar />
            {/* Sidebar Ad for Desktop */}
            <div className="hidden lg:block w-72">
              <AdSlot slot="2000000001" format="vertical" minHeight="300px" />
            </div>
          </div>

          {/* Ideas Grid Feed */}
          <div className="flex-1 space-y-6">
            {paginatedIdeas.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  No ideas match your exact filters
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try clearing some filter criteria or adjusting your search query to discover more projects.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedIdeas.map((idea, index) => (
                  <React.Fragment key={idea.id}>
                    <IdeaCard idea={idea} />
                    {/* In-feed ad every 12 cards */}
                    {(index + 1) % 12 === 0 && (
                      <div className="col-span-1 md:col-span-2 xl:col-span-3">
                        <AdSlot slot={`200000000${index}`} minHeight="120px" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center pt-8">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-6 py-3 font-semibold text-xs rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-600/20"
                >
                  Load More Ideas ({filteredIdeas.length - paginatedIdeas.length} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <InstallPrompt />
      <ConsentBanner />
      <SurpriseMeModal />
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <ExploreContent />
    </Suspense>
  );
}
