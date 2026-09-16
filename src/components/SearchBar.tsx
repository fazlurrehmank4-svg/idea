'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center shadow-xl rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-500/30 focus-within:border-indigo-600 dark:focus-within:border-indigo-500 transition overflow-hidden">
        <div className="pl-4 text-indigo-500">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 1000+ ideas by topic, tech stack, field, or tag (e.g. 'Python', 'AI Healthcare', 'Drones')..."
          className="w-full py-4 px-3 text-sm sm:text-base text-slate-900 dark:text-white bg-transparent focus:outline-none placeholder:text-slate-400 font-sans"
        />
        <div className="pr-2 flex items-center gap-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-indigo-600/30 flex items-center gap-1.5 shrink-0"
          >
            <span>Search</span>
          </button>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Try searching:
          <button type="button" onClick={() => { setQuery('Machine Learning'); router.push('/explore?q=Machine%20Learning'); }} className="underline hover:text-indigo-500 ml-1">Machine Learning</button>,
          <button type="button" onClick={() => { setQuery('Solar'); router.push('/explore?q=Solar'); }} className="underline hover:text-indigo-500 ml-1">Solar</button>,
          <button type="button" onClick={() => { setQuery('CRISPR'); router.push('/explore?q=CRISPR'); }} className="underline hover:text-indigo-500 ml-1">CRISPR</button>
        </span>
        <span className="hidden sm:inline font-mono text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
          Press / to search
        </span>
      </div>
    </form>
  );
}
