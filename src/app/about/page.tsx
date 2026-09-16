import React from 'react';
import { Lightbulb, Layers, ShieldCheck, Cpu, Globe, Users, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto pt-6 pb-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-amber-400 mx-auto shadow-lg shadow-indigo-600/30">
          <Lightbulb className="w-8 h-8 fill-amber-400/20" />
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white">
          About IdeaVerse 1000
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          &quot;1000 Project Ideas. Every Field. Every Level. One Platform.&quot;
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Our Mission
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Students, researchers, and engineers frequently encounter decision paralysis when choosing research topics, thesis subjects, or capstone projects. IdeaVerse 1000 was engineered to bridge this gap by providing an open-access database of 1000 curated, structured, and high-impact project ideas spanning 12 academic disciplines.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-1">1000 Ideas</h3>
            <p className="text-xs text-slate-500">Every domain from Medicine to Quantum Computing.</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-1">PWA Offline First</h3>
            <p className="text-xs text-slate-500">Install to Home Screen for offline browsing anytime.</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-1">Fuzzy Search</h3>
            <p className="text-xs text-slate-500">Instant client-side Fuse.js query engine.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
