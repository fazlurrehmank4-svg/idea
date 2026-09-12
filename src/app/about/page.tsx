import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sparkles, Target, Users, ShieldCheck, Compass } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About IdeaVerse 1000</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            Democratizing Research & Project Discovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            IdeaVerse 1000 was built to solve the age-old problem every student, researcher, and engineer faces: "What project should I build next?"
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" />
              Our Mission
            </h2>
            <p>
              Whether you are a middle school student preparing for a science fair or a PhD candidate searching for novel interdisciplinary research, finding a relevant, doable, and high-impact topic is daunting. IdeaVerse 1000 aggregates 1000 structured project blueprints across 12 distinct domains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 space-y-1">
              <h3 className="font-display font-bold text-lg text-indigo-600 dark:text-indigo-400">1000+</h3>
              <p className="text-xs text-slate-500">Structured Project Blueprints</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 space-y-1">
              <h3 className="font-display font-bold text-lg text-amber-500">12</h3>
              <p className="text-xs text-slate-500">Major Academic Disciplines</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 space-y-1">
              <h3 className="font-display font-bold text-lg text-emerald-500">100% PWA</h3>
              <p className="text-xs text-slate-500">Works Offline on Any Device</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
