"use client";

import React, { useState } from "react";
import {
  Filter,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Check,
  Tag,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

const FIELDS = [
  "Medicine & Healthcare",
  "Engineering",
  "Computer Science & IT",
  "Law & Legal Studies",
  "Business & Commerce",
  "Pure Sciences",
  "Social Sciences",
  "Arts & Humanities",
  "Education",
  "Agriculture & Environment",
  "School-Level Projects",
  "Emerging Tech",
];

const LEVELS = ["School", "Undergraduate", "Masters", "PhD", "Professional"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced", "Expert"];
const BUDGETS = ["Low", "Medium", "High"];

export function FilterBar() {
  const filters = useAppStore((state) => state.filters);
  const toggleFieldFilter = useAppStore((state) => state.toggleFieldFilter);
  const toggleLevelFilter = useAppStore((state) => state.toggleLevelFilter);
  const toggleDifficultyFilter = useAppStore((state) => state.toggleDifficultyFilter);
  const toggleBudgetFilter = useAppStore((state) => state.toggleBudgetFilter);
  const setSortBy = useAppStore((state) => state.setSortBy);
  const resetFilters = useAppStore((state) => state.resetFilters);

  const [openSections, setOpenSections] = useState({
    field: true,
    level: true,
    difficulty: true,
    budget: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const hasActiveFilters =
    filters.selectedFields.length > 0 ||
    filters.selectedLevels.length > 0 ||
    filters.selectedDifficulties.length > 0 ||
    filters.selectedBudgets.length > 0 ||
    filters.searchQuery !== "";

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-6 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 font-display font-semibold text-sm text-slate-900 dark:text-white">
          <Filter className="w-4 h-4 text-indigo-500" />
          <span>Filters & Sort</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        )}
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="w-full px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200"
        >
          <option value="popular">Popular / Trending</option>
          <option value="impact">Highest Impact Score</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>

      {/* Academic Level */}
      <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
        <button
          onClick={() => toggleSection("level")}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-left"
        >
          <span>Academic Level ({filters.selectedLevels.length})</span>
          {openSections.level ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.level && (
          <div className="space-y-1.5 pt-1">
            {LEVELS.map((lvl) => {
              const checked = filters.selectedLevels.includes(lvl);
              return (
                <button
                  key={lvl}
                  onClick={() => toggleLevelFilter(lvl)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-xl transition-colors text-left ${
                    checked
                      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{lvl}</span>
                  {checked && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Field / Discipline */}
      <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
        <button
          onClick={() => toggleSection("field")}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-left"
        >
          <span>Field / Domain ({filters.selectedFields.length})</span>
          {openSections.field ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.field && (
          <div className="space-y-1.5 pt-1 max-h-56 overflow-y-auto pr-1">
            {FIELDS.map((fld) => {
              const checked = filters.selectedFields.includes(fld);
              return (
                <button
                  key={fld}
                  onClick={() => toggleFieldFilter(fld)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-xl transition-colors text-left ${
                    checked
                      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="truncate">{fld}</span>
                  {checked && <Check className="w-3.5 h-3.5 shrink-0 text-indigo-600 dark:text-indigo-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Difficulty */}
      <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
        <button
          onClick={() => toggleSection("difficulty")}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-left"
        >
          <span>Difficulty ({filters.selectedDifficulties.length})</span>
          {openSections.difficulty ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.difficulty && (
          <div className="space-y-1.5 pt-1">
            {DIFFICULTIES.map((diff) => {
              const checked = filters.selectedDifficulties.includes(diff);
              return (
                <button
                  key={diff}
                  onClick={() => toggleDifficultyFilter(diff)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-xl transition-colors text-left ${
                    checked
                      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{diff}</span>
                  {checked && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Budget */}
      <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
        <button
          onClick={() => toggleSection("budget")}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-left"
        >
          <span>Budget ({filters.selectedBudgets.length})</span>
          {openSections.budget ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.budget && (
          <div className="space-y-1.5 pt-1">
            {BUDGETS.map((bdg) => {
              const checked = filters.selectedBudgets.includes(bdg);
              return (
                <button
                  key={bdg}
                  onClick={() => toggleBudgetFilter(bdg)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-xl transition-colors text-left ${
                    checked
                      ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{bdg} Budget</span>
                  {checked && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
