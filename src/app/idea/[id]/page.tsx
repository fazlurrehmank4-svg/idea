"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Heart,
  Share2,
  Copy,
  Check,
  Flame,
  Clock,
  DollarSign,
  Users,
  Target,
  Code2,
  ExternalLink,
  Sparkles,
  Layers,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IdeaCard } from "@/components/IdeaCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { ConsentBanner } from "@/components/ads/ConsentBanner";
import { SurpriseMeModal } from "@/components/SurpriseMeModal";
import { getIdeaById, getSimilarIdeas } from "@/lib/fuse";
import { useAppStore } from "@/lib/store";

export default function IdeaDetailPage({ params }: { params: { id: string } }) {
  const idea = getIdeaById(params.id);

  if (!idea) {
    notFound();
  }

  const similarIdeas = getSimilarIdeas(idea, 3);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedDetails, setCopiedDetails] = useState(false);

  const isBookmarked = useAppStore((state) => state.isBookmarked(idea.id));
  const toggleBookmark = useAppStore((state) => state.toggleBookmark);

  const handleBookmark = () => {
    const willBookmark = !isBookmarked;
    toggleBookmark(idea.id);
    if (willBookmark) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyDetails = () => {
    const text = `Project Idea: ${idea.title}\nField: ${idea.field} (${idea.subfield})\nLevel: ${idea.level}\nDescription: ${idea.description}\nTech Stack: ${idea.techStack.join(", ")}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedDetails(true);
      setTimeout(() => setCopiedDetails(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Back Link */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>

        {/* Main Idea Overview Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {idea.field}
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Level: {idea.level}
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Difficulty: {idea.difficulty}
              </span>
              {idea.trending && (
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-rose-500" />
                  Trending
                </span>
              )}
            </div>

            {/* Actions: Save, Copy, Share */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-medium"
                title="Copy Page Link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{copiedLink ? "Copied" : "Share"}</span>
              </button>

              <button
                onClick={handleCopyDetails}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-medium"
                title="Copy Idea Overview"
              >
                {copiedDetails ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copiedDetails ? "Copied" : "Copy Info"}</span>
              </button>

              <button
                onClick={handleBookmark}
                className={`p-2.5 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                  isBookmarked
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                    : "border border-slate-200 dark:border-slate-800 hover:bg-rose-500/10 text-rose-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${isBookmarked ? "fill-white" : ""}`} />
                <span>{isBookmarked ? "Saved" : "Save Idea"}</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
              {idea.title}
            </h1>
            <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
              Subfield / Focus: {idea.subfield}
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {idea.description}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Duration</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                {idea.duration}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Budget Required</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                {idea.budget}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Team Size</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-1">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                {idea.teamSize} members
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Impact Score</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                {idea.impactScore} / 10
              </span>
            </div>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-slate-900 dark:text-white">
            <Target className="w-5 h-5 text-indigo-500" />
            <h2>Key Project Objectives</h2>
          </div>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {idea.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AdSlot After Objectives */}
        <AdSlot slot="3000000001" minHeight="120px" />

        {/* Tech Stack & Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-display font-bold text-base text-slate-900 dark:text-white">
              <Code2 className="w-5 h-5 text-indigo-500" />
              <h3>Recommended Tech Stack</h3>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {idea.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono font-medium rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-display font-bold text-base text-slate-900 dark:text-white">
              <ExternalLink className="w-5 h-5 text-amber-500" />
              <h3>Reference Materials</h3>
            </div>
            <ul className="space-y-2 text-xs">
              {idea.resources.map((res, i) => (
                <li key={i}>
                  <a
                    href={res}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 truncate"
                  >
                    <span>{res}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AdSlot Before Similar Ideas */}
        <AdSlot slot="3000000002" minHeight="120px" />

        {/* Similar Ideas Recommendation */}
        {similarIdeas.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2 font-display font-bold text-xl text-slate-900 dark:text-white">
              <Layers className="w-5 h-5 text-indigo-500" />
              <h2>Similar Project Ideas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarIdeas.map((simIdea) => (
                <IdeaCard key={simIdea.id} idea={simIdea} />
              ))}
            </div>
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
