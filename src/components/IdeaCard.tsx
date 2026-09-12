"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  Heart,
  Flame,
  ArrowUpRight,
  Clock,
  DollarSign,
  Users,
  Check,
  Share2,
} from "lucide-react";
import { Idea } from "@/types/idea";
import { useAppStore } from "@/lib/store";

interface IdeaCardProps {
  idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
  const [copied, setCopied] = useState(false);
  const isBookmarked = useAppStore((state) => state.isBookmarked(idea.id));
  const toggleBookmark = useAppStore((state) => state.toggleBookmark);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const willBeBookmarked = !isBookmarked;
    toggleBookmark(idea.id);

    if (willBeBookmarked) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/idea/${idea.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Badge color mappings for levels
  const levelColors: Record<string, string> = {
    School: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    Undergraduate: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    Masters: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    PhD: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    Professional: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-3">
        {/* Top Badges Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${
                levelColors[idea.level] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {idea.level}
            </span>
            {idea.trending && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center gap-1">
                <Flame className="w-3 h-3 fill-rose-500" />
                Trending
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share Idea"
              aria-label="Share Idea"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleBookmarkToggle}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked
                  ? "text-rose-500 bg-rose-500/10"
                  : "text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              title={isBookmarked ? "Remove Bookmark" : "Save Idea"}
              aria-label={isBookmarked ? "Remove Bookmark" : "Save Idea"}
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? "fill-rose-500" : ""}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <Link href={`/idea/${idea.id}`} className="block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <h3 className="font-display font-semibold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug">
            {idea.title}
          </h3>
        </Link>

        {/* Subfield & Description */}
        <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
          {idea.field} • {idea.subfield}
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
          {idea.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          {idea.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
          {idea.techStack.length > 3 && (
            <span className="text-[10px] text-slate-400 font-mono">
              +{idea.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Details */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1" title="Duration">
            <Clock className="w-3.5 h-3.5" />
            {idea.duration}
          </span>
          <span className="flex items-center gap-1" title="Budget">
            <DollarSign className="w-3.5 h-3.5" />
            {idea.budget}
          </span>
          <span className="flex items-center gap-1" title="Team Size">
            <Users className="w-3.5 h-3.5" />
            {idea.teamSize}
          </span>
        </div>

        <Link
          href={`/idea/${idea.id}`}
          className="font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-0.5 hover:underline"
        >
          View
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
