'use client';

import React from 'react';
import { FilterState } from '@/lib/types';
import {
  Search,
  Filter,
  X,
  RotateCcw,
  Sparkles,
  Layers,
  GraduationCap,
  Gauge,
  DollarSign,
  Tag
} from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onSearchChange: (q: string) => void;
  onFieldChange: (field: string) => void;
  onLevelChange: (level: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onBudgetChange: (budget: string) => void;
  onTagChange: (tag: string) => void;
  onTrendingToggle: (trending: boolean) => void;
  onSortChange: (sort: 'relevance' | 'impact' | 'title') => void;
  onReset: () => void;
  allFields: string[];
  allTags: string[];
  totalResults: number;
}

const LEVELS = ['All', 'School', 'Undergraduate', 'Masters', 'PhD', 'Professional'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
const BUDGETS = ['All', 'Low', 'Medium', 'High'];

export function FilterBar({
  filters,
  onSearchChange,
  onFieldChange,
  onLevelChange,
  onDifficultyChange,
  onBudgetChange,
  onTagChange,
  onTrendingToggle,
  onSortChange,
  onReset,
  allFields,
  allTags,
  totalResults,
}: FilterBarProps) {
  const activeCount = [
    filters.selectedField !== 'All',
    filters.selectedLevel !== 'All',
    filters.selectedDifficulty !== 'All',
    filters.selectedBudget !== 'All',
    filters.selectedTag !== 'All',
    filters.onlyTrending,
  ].filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Top Search & Reset Row */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search titles, descriptions, tags, technologies..."
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            <strong>{totalResults}</strong> Ideas Found
          </span>

          <select
            value={filters.sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none"
          >
            <option value="relevance">Sort: Most Relevant</option>
            <option value="impact">Sort: Highest Impact</option>
            <option value="title">Sort: Title (A-Z)</option>
          </select>

          {activeCount > 0 && (
            <button
              onClick={onReset}
              className="px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition flex items-center gap-1 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset ({activeCount})
            </button>
          )}
        </div>
      </div>

      {/* Multi-facet Filters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
        {/* Field Filter */}
        <div>
          <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-indigo-500" /> Field
          </label>
          <select
            value={filters.selectedField}
            onChange={(e) => onFieldChange(e.target.value)}
            className="w-full text-xs py-1.5 px-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Fields</option>
            {allFields.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Level Filter */}
        <div>
          <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1 flex items-center gap-1">
            <GraduationCap className="w-3 h-3 text-emerald-500" /> Level
          </label>
          <select
            value={filters.selectedLevel}
            onChange={(e) => onLevelChange(e.target.value)}
            className="w-full text-xs py-1.5 px-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l === 'All' ? 'All Levels' : l}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1 flex items-center gap-1">
            <Gauge className="w-3 h-3 text-amber-500" /> Difficulty
          </label>
          <select
            value={filters.selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full text-xs py-1.5 px-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Difficulties' : d}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Filter */}
        <div>
          <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1 flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-purple-500" /> Budget
          </label>
          <select
            value={filters.selectedBudget}
            onChange={(e) => onBudgetChange(e.target.value)}
            className="w-full text-xs py-1.5 px-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
          >
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b === 'All' ? 'All Budgets' : `${b} Budget`}
              </option>
            ))}
          </select>
        </div>

        {/* Tag Filter */}
        <div>
          <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1 flex items-center gap-1">
            <Tag className="w-3 h-3 text-sky-500" /> Popular Tag
          </label>
          <select
            value={filters.selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
            className="w-full text-xs py-1.5 px-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Tags</option>
            {allTags.map((t) => (
              <option key={t} value={t}>
                #{t}
              </option>
            ))}
          </select>
        </div>

        {/* Trending Toggle Switch */}
        <div className="flex flex-col justify-end pb-1">
          <button
            onClick={() => onTrendingToggle(!filters.onlyTrending)}
            className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
              filters.onlyTrending
                ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
            <span>{filters.onlyTrending ? 'Trending Only' : 'Show Trending'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
