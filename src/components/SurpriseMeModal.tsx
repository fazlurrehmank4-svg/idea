"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Dices, Sparkles, X, ArrowUpRight, Flame, Clock, DollarSign } from "lucide-react";
import { Idea } from "@/types/idea";
import { getRandomIdea } from "@/lib/fuse";
import { useAppStore } from "@/lib/store";

export function SurpriseMeModal() {
  const isSurpriseOpen = useAppStore((state) => state.isSurpriseOpen);
  const setSurpriseOpen = useAppStore((state) => state.setSurpriseOpen);

  const [idea, setIdea] = useState<Idea | null>(null);

  useEffect(() => {
    if (isSurpriseOpen && !idea) {
      setIdea(getRandomIdea());
    }
  }, [isSurpriseOpen, idea]);

  if (!isSurpriseOpen) return null;

  const handleShuffle = () => {
    setIdea(getRandomIdea());
  };

  const handleClose = () => {
    setSurpriseOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Dices className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Surprise Me 🎲
              </h3>
              <p className="text-xs text-slate-500">Randomly picked from 1000+ ideas</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Card */}
        {idea && (
          <div className="space-y-4 bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {idea.field}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Level: {idea.level}
              </span>
            </div>

            <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug">
              {idea.title}
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {idea.description}
            </p>

            <div className="flex items-center gap-2 flex-wrap pt-1">
              {idea.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handleShuffle}
            className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-2"
          >
            <Dices className="w-4 h-4" />
            Spin Again
          </button>

          {idea && (
            <Link
              href={`/idea/${idea.id}`}
              onClick={handleClose}
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
            >
              <span>View Idea Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
