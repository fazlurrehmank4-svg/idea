'use client';

import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ideasData from '@/data/ideas.json';
import { Idea } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { createFuseInstance, filterAndSortIdeas } from '@/lib/fuse';
import { IdeaCard } from '@/components/IdeaCard';
import { FilterBar } from '@/components/FilterBar';
import { AdSlot } from '@/components/ads/AdSlot';
import { Sparkles, Frown, Compass, ArrowLeft, ArrowRight, Shuffle } from 'lucide-react';
import confetti from 'canvas-confetti';

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allIdeas = useMemo(() => ideasData as Idea[], []);
  const fuseInstance = useMemo(() => createFuseInstance(allIdeas), [allIdeas]);

  const {
    filters,
    setSearchQuery,
    setSelectedField,
    setSelectedLevel,
    setSelectedDifficulty,
    setSelectedBudget,
    setSelectedTag,
    setOnlyTrending,
    setSortBy,
    resetFilters,
  } = useAppStore();

  const [page, setPage] = useState(1);
  const itemsPerPage = 24;

  // Extract unique fields & tags
  const allFields = useMemo(() => {
    return Array.from(new Set(allIdeas.map((i) => i.field))).sort();
  }, [allIdeas]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allIdeas.forEach((i) => i.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort().slice(0, 30); // Top 30 tags
  }, [allIdeas]);

  // URL Query Sync
  useEffect(() => {
    const q = searchParams.get('q');
    const field = searchParams.get('field');
    const level = searchParams.get('level');
    const trending = searchParams.get('trending');
    const surprise = searchParams.get('surprise');

    if (q) setSearchQuery(q);
    if (field) setSelectedField(field);
    if (level) setSelectedLevel(level);
    if (trending === 'true') setOnlyTrending(true);

    if (surprise === 'true') {
      triggerSurpriseMe();
    }
  }, [searchParams]);

  // Keyboard Shortcuts: '/' to focus search input, 'Esc' to clear
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (input) input.focus();
      } else if (e.key === 'Escape') {
        resetFilters();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resetFilters]);

  const triggerSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * allIdeas.length);
    const randomIdea = allIdeas[randomIndex];

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });

    router.push(`/idea/${randomIdea.id}`);
  };

  const filteredIdeas = useMemo(() => {
    return filterAndSortIdeas(allIdeas, filters, fuseInstance);
  }, [allIdeas, filters, fuseInstance]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filteredIdeas.length / itemsPerPage);
  const paginatedIdeas = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredIdeas.slice(start, start + itemsPerPage);
  }, [filteredIdeas, page, itemsPerPage]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
        <div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            Explore 1000+ Project Ideas
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Search, filter, and discover research topics across medicine, engineering, CS, law, arts, and more.
          </p>
        </div>

        <button
          onClick={triggerSurpriseMe}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-amber-400/20 active:scale-95 shrink-0"
        >
          <Shuffle className="w-4 h-4" />
          <span>Surprise Me 🎲</span>
        </button>
      </div>

      {/* Filter Component */}
      <FilterBar
        filters={filters}
        onSearchChange={setSearchQuery}
        onFieldChange={setSelectedField}
        onLevelChange={setSelectedLevel}
        onDifficultyChange={setSelectedDifficulty}
        onBudgetChange={setSelectedBudget}
        onTagChange={setSelectedTag}
        onTrendingToggle={setOnlyTrending}
        onSortChange={setSortBy}
        onReset={resetFilters}
        allFields={allFields}
        allTags={allTags}
        totalResults={filteredIdeas.length}
      />

      {/* Main Content Area (Grid + Sidebar Ad) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Ideas Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {filteredIdeas.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                <Frown className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                No matching project ideas found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Try loosening your filter options or searching for different keywords.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow hover:bg-indigo-700 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedIdeas.map((idea, index) => (
                  <React.Fragment key={idea.id}>
                    <IdeaCard idea={idea} />
                    {/* Insert In-feed Ad every 12 cards */}
                    {(index + 1) % 12 === 0 && (
                      <div className="md:col-span-2">
                        <AdSlot
                          slot={`100000000${(index % 3) + 4}`}
                          format="fluid"
                          minHeight="110px"
                          label="In-Feed Sponsored Content"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40 transition flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <span className="text-xs font-semibold text-slate-500">
                    Page <strong className="text-slate-900 dark:text-white">{page}</strong> of{' '}
                    <strong>{totalPages}</strong>
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40 transition flex items-center gap-1.5"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar Ad & Quick Recommendations */}
        <div className="space-y-6">
          <AdSlot slot="1000000008" format="vertical" minHeight="300px" label="Sponsored Sidebar" />

          <div className="bg-indigo-900 text-white p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" /> Quick Tip
            </div>
            <p className="text-xs text-indigo-100 leading-relaxed">
              Use keyboard shortcut <kbd className="px-1.5 py-0.5 bg-indigo-800 rounded text-[10px] text-amber-300 font-mono">/</kbd> anytime to jump straight to the search box!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-display font-bold">Loading Explore Ideas...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
