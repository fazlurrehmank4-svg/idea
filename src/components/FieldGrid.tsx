"use client";

import React from "react";
import Link from "next/link";
import {
  Stethoscope,
  Wrench,
  Cpu,
  Scale,
  Briefcase,
  Atom,
  Users2,
  Palette,
  GraduationCap,
  Sprout,
  School,
  Zap,
  ArrowRight,
} from "lucide-react";

export const CATEGORY_ICONS: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string; count: number }
> = {
  "Medicine & Healthcare": { icon: Stethoscope, color: "text-rose-500 bg-rose-500/10 border-rose-500/20", count: 100 },
  "Engineering": { icon: Wrench, color: "text-amber-500 bg-amber-500/10 border-amber-500/20", count: 120 },
  "Computer Science & IT": { icon: Cpu, color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20", count: 150 },
  "Law & Legal Studies": { icon: Scale, color: "text-purple-500 bg-purple-500/10 border-purple-500/20", count: 70 },
  "Business & Commerce": { icon: Briefcase, color: "text-blue-500 bg-blue-500/10 border-blue-500/20", count: 80 },
  "Pure Sciences": { icon: Atom, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20", count: 100 },
  "Social Sciences": { icon: Users2, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", count: 70 },
  "Arts & Humanities": { icon: Palette, color: "text-pink-500 bg-pink-500/10 border-pink-500/20", count: 60 },
  "Education": { icon: GraduationCap, color: "text-orange-500 bg-orange-500/10 border-orange-500/20", count: 50 },
  "Agriculture & Environment": { icon: Sprout, color: "text-green-500 bg-green-500/10 border-green-500/20", count: 50 },
  "School-Level Projects": { icon: School, color: "text-teal-500 bg-teal-500/10 border-teal-500/20", count: 100 },
  "Emerging Tech": { icon: Zap, color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20", count: 50 },
};

export function FieldGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Object.entries(CATEGORY_ICONS).map(([fieldName, config]) => {
        const Icon = config.icon;
        return (
          <Link
            key={fieldName}
            href={`/explore?field=${encodeURIComponent(fieldName)}`}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2">
              <div className={`p-3 rounded-xl border ${config.color} transition-transform group-hover:scale-110`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold font-mono rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {config.count}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {fieldName}
              </h3>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                <span>Browse Ideas</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
