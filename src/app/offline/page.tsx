'use client';

import React from 'react';
import Link from 'next/link';
import { WifiOff, RefreshCw, Home, Search } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-950/60 rounded-3xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shadow-inner">
        <WifiOff className="w-10 h-10" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white mb-3">
        You are currently offline
      </h1>

      <p className="text-slate-600 dark:text-slate-300 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
        Don&apos;t worry! IdeaVerse cached 1000 project ideas so you can continue exploring, searching, and saving ideas without an active internet connection.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition shadow-md shadow-indigo-500/20"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Connection
        </button>

        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm rounded-xl transition"
        >
          <Search className="w-4 h-4" />
          Browse Offline Ideas
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-xl transition border border-slate-200 dark:border-slate-800"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
