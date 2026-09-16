import React from 'react';
import Link from 'next/link';
import ideasData from '@/data/ideas.json';
import { IdeaCard } from '@/components/IdeaCard';
import { FieldGrid } from '@/components/FieldGrid';
import { SearchBar } from '@/components/SearchBar';
import { AdSlot } from '@/components/ads/AdSlot';
import { Idea } from '@/lib/types';
import {
  Sparkles,
  Compass,
  Zap,
  GraduationCap,
  Award,
  Layers,
  ArrowRight,
  Mail,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  const allIdeas = ideasData as Idea[];
  const trendingIdeas = allIdeas.filter((i) => i.trending).slice(0, 6);
  const featuredIdeas = allIdeas.slice(0, 6);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden rounded-3xl bg-slate-900 text-white my-4 border border-slate-800 shadow-2xl">
        {/* Animated Ambient Blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>The Premier Project Idea Engine for 2025</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
            1000 Project Ideas. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-400 bg-clip-text text-transparent">
              Every Field. Every Level.
            </span> One Platform.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            Discover curated, production-ready research topics and project blueprints for high school students, undergraduates, PhD candidates, and industry practitioners.
          </p>

          {/* Search Bar Container */}
          <div className="pt-2">
            <SearchBar />
          </div>

          {/* Key Stats Counter Grid */}
          <div className="pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-amber-400">1000+</div>
              <div className="text-xs text-slate-400 font-medium">Curated Ideas</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-indigo-400">12</div>
              <div className="text-xs text-slate-400 font-medium">Academic Fields</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-400">5</div>
              <div className="text-xs text-slate-400 font-medium">Academic Levels</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-purple-400">100%</div>
              <div className="text-xs text-slate-400 font-medium">Free & Open Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad Banner */}
      <div className="max-w-7xl mx-auto px-4">
        <AdSlot slot="1000000001" format="horizontal" minHeight="100px" label="Sponsored Banner" />
      </div>

      {/* Field Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              Explore by Academic Field
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Browse projects tailored to specific disciplines across 12 comprehensive categories
            </p>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition"
          >
            <span>View All Fields</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <FieldGrid />
      </section>

      {/* In-Feed Mid Page Ad Slot */}
      <div className="max-w-7xl mx-auto px-4">
        <AdSlot slot="1000000002" format="auto" minHeight="120px" />
      </div>

      {/* Trending & High-Impact Ideas Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full mb-2">
              <Zap className="w-3.5 h-3.5 fill-amber-400" /> Hot & Rising
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Trending Projects Right Now
            </h2>
          </div>
          <Link
            href="/explore?trending=true"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Explore All Trending ({allIdeas.filter((i) => i.trending).length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </section>

      {/* Interactive Surprise Me / Callout Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-indigo-700/40">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Overcoming Decision Paralysis?
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-extrabold leading-tight">
              Can&apos;t Decide? Let Chance Pick Your Next Project.
            </h3>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              Use our smart random generator algorithm to pick a random high-impact idea tailored to your interests in one click.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/explore?surprise=true"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-base rounded-2xl transition shadow-lg shadow-amber-400/20 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5 fill-slate-950" />
              <span>Surprise Me 🎲</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Featured Research & Capstones
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Top rated ideas with structured objectives, tech stacks, and learning resources
            </p>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Browse Full Database</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </section>

      {/* Footer Ad Placement */}
      <div className="max-w-7xl mx-auto px-4">
        <AdSlot slot="1000000003" format="horizontal" minHeight="90px" label="Sponsored Bottom Banner" />
      </div>
    </div>
  );
}
