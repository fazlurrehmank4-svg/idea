"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IdeaCard } from "@/components/IdeaCard";
import { SearchBar } from "@/components/SearchBar";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { ConsentBanner } from "@/components/ads/ConsentBanner";
import { SurpriseMeModal } from "@/components/SurpriseMeModal";
import { useAppStore } from "@/lib/store";
import ideasData from "@/data/ideas.json";
import { Idea } from "@/types/idea";
import { Bookmark, Trash2, Download, Upload, Compass } from "lucide-react";

const allIdeas = ideasData as Idea[];

export default function SavedPage() {
  const bookmarkedIds = useAppStore((state) => state.bookmarkedIds);
  const clearBookmarks = useAppStore((state) => state.clearBookmarks);
  const searchQuery = useAppStore((state) => state.filters.searchQuery);

  const savedIdeas = useMemo(() => {
    return allIdeas.filter((idea) => bookmarkedIds.includes(idea.id));
  }, [bookmarkedIds]);

  const filteredSavedIdeas = useMemo(() => {
    if (!searchQuery.trim()) return savedIdeas;
    const q = searchQuery.toLowerCase();
    return savedIdeas.filter(
      (idea) =>
        idea.title.toLowerCase().includes(q) ||
        idea.description.toLowerCase().includes(q) ||
        idea.field.toLowerCase().includes(q) ||
        idea.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [savedIdeas, searchQuery]);

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedIdeas, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ideaverse_saved_bookmarks_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
          <div className="space-y-1">
            <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
                <Bookmark className="w-6 h-6 fill-rose-500" />
              </div>
              Saved Bookmarks ({savedIdeas.length})
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage your saved research topics and project ideas locally
            </p>
          </div>

          {savedIdeas.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                Export JSON
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to clear all saved bookmarks?")) {
                    clearBookmarks();
                  }
                }}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Search within bookmarks */}
        {savedIdeas.length > 0 && (
          <div className="max-w-md">
            <SearchBar placeholder="Search your saved bookmarks..." />
          </div>
        )}

        {/* Empty State vs Ideas Grid */}
        {savedIdeas.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 my-8">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
              <Bookmark className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              No saved project ideas yet
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Click the heart icon on any idea card to bookmark concepts for offline access and quick reference.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-600/20"
            >
              <Compass className="w-4 h-4" />
              Explore 1000 Ideas
            </Link>
          </div>
        ) : filteredSavedIdeas.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            No bookmarks match "{searchQuery}"
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSavedIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <InstallPrompt />
      <ConsentBanner />
      <SurpriseMeModal />
    </div>
  );
}
