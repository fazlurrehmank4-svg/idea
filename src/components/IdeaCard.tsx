'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bookmark, Heart, Sparkles, ArrowRight, Share2, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Idea } from '@/lib/types';
import { useAppStore } from '@/lib/store';

interface IdeaCardProps {
  idea: Idea;
  compact?: boolean;
}

export function IdeaCard({ idea, compact = false }: IdeaCardProps) {
  const router = useRouter();
  const { toggleBookmark, isBookmarked } = useAppStore();
  const bookmarked = isBookmarked(idea.id);
  const [copied, setCopied] = useState(false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleBookmark(idea.id);

    if (!bookmarked) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const url = `${window.location.origin}/idea/${idea.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const levelColors: Record<string, string> = {
    School: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Undergraduate: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    Masters: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    PhD: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    Professional: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
  };

  return (
    <div
      onClick={() => router.push(`/idea/${idea.id}`)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Badges Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                levelColors[idea.level] || levelColors.Undergraduate
              }`}
            >
              {idea.level}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
              {idea.field}
            </span>
            {idea.trending && (
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-700 dark:text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                <Sparkles className="w-3 h-3 fill-amber-400" />
                Trending
              </span>
            )}
          </div>

          <button
            onClick={handleBookmark}
            aria-label={bookmarked ? "Remove bookmark" : "Save bookmark"}
            className={`p-2 rounded-xl transition ${
              bookmarked
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-500'
                : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${bookmarked ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Title & Subfield */}
        <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition line-clamp-2 mb-2">
          {idea.title}
        </h3>

        <p className="text-xs text-indigo-600/80 dark:text-indigo-400/80 font-medium mb-3">
          {idea.subfield}
        </p>

        {/* Description */}
        {!compact && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 leading-relaxed">
            {idea.description}
          </p>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {idea.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md"
            >
              {tech}
            </span>
          ))}
          {idea.techStack.length > 4 && (
            <span className="text-[10px] font-medium text-slate-400 px-1 py-0.5">
              +{idea.techStack.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Info */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <span>🎯 Impact: <strong className="text-slate-900 dark:text-white font-bold">{idea.impactScore}/10</strong></span>
          <span>⏱️ {idea.duration}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopyLink}
            aria-label="Copy project idea link"
            className="p-1.5 hover:text-slate-900 dark:hover:text-white rounded-lg transition"
            title="Copy link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <span className="p-1 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
