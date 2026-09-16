'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import ideasData from '@/data/ideas.json';
import { Idea } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { IdeaCard } from '@/components/IdeaCard';
import { Bookmark, Download, Trash2, Compass, Heart } from 'lucide-react';

export default function SavedPage() {
  const allIdeas = useMemo(() => ideasData as Idea[], []);
  const { savedIdeaIds, clearBookmarks } = useAppStore();

  const savedIdeas = useMemo(() => {
    return allIdeas.filter((idea) => savedIdeaIds.includes(idea.id));
  }, [allIdeas, savedIdeaIds]);

  const exportToJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedIdeas, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'ideaverse_saved_ideas.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 pt-4 pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-8 h-8 text-indigo-600 dark:text-indigo-400 fill-indigo-600/20" />
            Your Saved Project Ideas ({savedIdeas.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Access your bookmarked research topics and capstone ideas anytime offline.
          </p>
        </div>

        {savedIdeas.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={exportToJson}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export JSON
            </button>
            <button
              onClick={clearBookmarks}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-xl hover:bg-rose-50 transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Bookmarks List Grid */}
      {savedIdeas.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 my-8">
          <div className="w-16 h-16 mx-auto bg-rose-50 dark:bg-rose-950/40 rounded-full flex items-center justify-center text-rose-500">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
            No saved ideas yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Click the heart icon on any idea card while browsing to save it to your local offline library.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow hover:bg-indigo-700 transition"
          >
            <Compass className="w-4 h-4" />
            Explore 1000 Ideas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {savedIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}
