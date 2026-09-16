'use client';

import React, { useState } from 'react';
import { Idea } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { Heart, Share2, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IdeaDetailActionsProps {
  idea: Idea;
}

export function IdeaDetailActions({ idea }: IdeaDetailActionsProps) {
  const { toggleBookmark, isBookmarked } = useAppStore();
  const bookmarked = isBookmarked(idea.id);
  const [copied, setCopied] = useState(false);

  const handleBookmark = () => {
    toggleBookmark(idea.id);
    if (!bookmarked) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: idea.title,
      text: idea.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn('Share cancelled or failed', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyText = () => {
    const textToCopy = `${idea.title}\nField: ${idea.field} (${idea.level})\n\n${idea.description}\n\nObjectives:\n${idea.objectives.map(o => '- ' + o).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleBookmark}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border shadow-sm ${
          bookmarked
            ? 'bg-rose-500 text-white border-rose-600'
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
        }`}
      >
        <Heart className={`w-4 h-4 ${bookmarked ? 'fill-white' : ''}`} />
        <span>{bookmarked ? 'Saved' : 'Save Idea'}</span>
      </button>

      <button
        onClick={handleCopyText}
        className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5 shadow-sm"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
      </button>

      <button
        onClick={handleShare}
        className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-sm"
        title="Share Project Idea"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}
