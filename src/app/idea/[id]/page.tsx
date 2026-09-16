import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ideasData from '@/data/ideas.json';
import { Idea } from '@/lib/types';
import { IdeaCard } from '@/components/IdeaCard';
import { AdSlot } from '@/components/ads/AdSlot';
import { IdeaDetailActions } from './IdeaDetailActions';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Target,
  Code2,
  BookOpen,
  Gauge,
  Clock,
  DollarSign,
  Users,
  Award,
  Share2,
  Bookmark
} from 'lucide-react';

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const ideas = ideasData as Idea[];
  return ideas.map((idea) => ({
    id: idea.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const ideas = ideasData as Idea[];
  const idea = ideas.find((i) => i.id === params.id);

  if (!idea) {
    return {
      title: 'Idea Not Found — IdeaVerse 1000',
    };
  }

  return {
    title: `${idea.title} — ${idea.level} Project Idea | IdeaVerse 1000`,
    description: idea.description,
    openGraph: {
      title: idea.title,
      description: idea.description,
      type: 'article',
      tags: idea.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: idea.title,
      description: idea.description,
    },
  };
}

export default function IdeaDetailPage({ params }: PageProps) {
  const ideas = ideasData as Idea[];
  const idea = ideas.find((i) => i.id === params.id);

  if (!idea) {
    notFound();
  }

  // Find similar ideas based on field & subfield
  const similarIdeas = ideas
    .filter((i) => i.id !== idea.id && (i.field === idea.field || i.subfield === idea.subfield))
    .slice(0, 3);

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': idea.title,
    'description': idea.description,
    'educationalLevel': idea.level,
    'keywords': idea.tags.join(', '),
    'about': {
      '@type': 'Thing',
      'name': idea.field,
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-4 pb-12">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation & Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline bg-indigo-50 dark:bg-indigo-950/60 px-3.5 py-2 rounded-xl border border-indigo-200 dark:border-indigo-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>

        {/* Client Side Action Buttons Component */}
        <IdeaDetailActions idea={idea} />
      </div>

      {/* Main Idea Card Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            {idea.level} Level
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {idea.field}
          </span>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
            {idea.subfield}
          </span>
          {idea.trending && (
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-700 dark:text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
              Trending Topic
            </span>
          )}
        </div>

        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
          {idea.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {idea.description}
        </p>

        {/* Project Metrics Quick Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Difficulty</div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">{idea.difficulty}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Duration</div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">{idea.duration}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Est. Budget</div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">{idea.budget}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-xl">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Impact Score</div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">{idea.impactScore} / 10</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Objectives Checklist Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Core Project Objectives
        </h2>
        <div className="space-y-3">
          {idea.objectives.map((obj, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {obj}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Placement After Objectives */}
      <AdSlot slot="1000000009" format="auto" minHeight="120px" label="Sponsored Content" />

      {/* Tech Stack & Recommended Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tech Stack Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Recommended Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {idea.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Resources Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Key References & Datasets
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {idea.resources.map((res, idx) => (
              <li key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <span className="truncate pr-2">{res}</span>
                <ExternalLink className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ad Placement Before Similar Ideas */}
      <AdSlot slot="1000000010" format="auto" minHeight="120px" label="Sponsored Banner" />

      {/* Similar Ideas Recommendations */}
      {similarIdeas.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
            Similar Projects in {idea.field}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {similarIdeas.map((sim) => (
              <IdeaCard key={sim.id} idea={sim} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
