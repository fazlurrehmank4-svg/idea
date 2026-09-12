"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WifiOff, RotateCcw, Bookmark, Compass } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-16 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center animate-pulse">
          <WifiOff className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
            You Are Currently Offline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            IdeaVerse 1000 caches previously loaded ideas and saved bookmarks offline! You can still access your saved bookmarks below.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-5 py-3 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Try Reconnecting
          </button>

          <Link
            href="/saved"
            className="w-full sm:w-auto px-5 py-3 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <Bookmark className="w-4 h-4 text-rose-500 fill-rose-500" />
            View Saved Bookmarks
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
