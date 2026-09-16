'use client';

import React from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  Wrench,
  Cpu,
  Scale,
  Briefcase,
  Atom,
  Users,
  Palette,
  GraduationCap,
  Sprout,
  BookOpen,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export const FIELD_CATEGORIES = [
  {
    name: "Medicine & Healthcare",
    count: 100,
    icon: Stethoscope,
    color: "from-rose-500/20 to-pink-500/20 text-rose-500 border-rose-500/30",
    description: "Cardiology, neurology, AI diagnostics, public health, telemedicine & bioinformatics."
  },
  {
    name: "Engineering",
    count: 120,
    icon: Wrench,
    color: "from-orange-500/20 to-amber-500/20 text-orange-500 border-orange-500/30",
    description: "Mechanical, electrical, civil, aerospace, robotics, mechatronics & biomedical."
  },
  {
    name: "Computer Science & IT",
    count: 150,
    icon: Cpu,
    color: "from-indigo-500/20 to-blue-500/20 text-indigo-500 border-indigo-500/30",
    description: "AI/ML, cybersecurity, web/mobile, blockchain, quantum computing, cloud & devops."
  },
  {
    name: "Law & Legal Studies",
    count: 70,
    icon: Scale,
    color: "from-slate-500/20 to-slate-700/20 text-slate-400 border-slate-500/30",
    description: "Constitutional, criminal, IP law, cyber law, human rights & environmental law."
  },
  {
    name: "Business & Commerce",
    count: 80,
    icon: Briefcase,
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-500 border-emerald-500/30",
    description: "Fintech, marketing analytics, entrepreneurship, HR & supply chain management."
  },
  {
    name: "Pure Sciences",
    count: 100,
    icon: Atom,
    color: "from-sky-500/20 to-cyan-500/20 text-sky-500 border-sky-500/30",
    description: "Physics, chemistry, molecular biology, mathematics, statistics & astronomy."
  },
  {
    name: "Social Sciences",
    count: 70,
    icon: Users,
    color: "from-purple-500/20 to-violet-500/20 text-purple-500 border-purple-500/30",
    description: "Psychology, sociology, economics, political science & human geography."
  },
  {
    name: "Arts & Humanities",
    count: 60,
    icon: Palette,
    color: "from-fuchsia-500/20 to-pink-500/20 text-fuchsia-500 border-fuchsia-500/30",
    description: "Digital humanities, philosophy, linguistics, computational music & fine arts."
  },
  {
    name: "Education",
    count: 50,
    icon: GraduationCap,
    color: "from-blue-500/20 to-indigo-500/20 text-blue-500 border-blue-500/30",
    description: "Pedagogy, edtech software, curriculum innovation & special education."
  },
  {
    name: "Agriculture & Environment",
    count: 50,
    icon: Sprout,
    color: "from-green-500/20 to-emerald-500/20 text-green-500 border-green-500/30",
    description: "Agritech, climate resilience, renewable energy & biodiversity conservation."
  },
  {
    name: "School-Level Projects",
    count: 100,
    icon: BookOpen,
    color: "from-amber-500/20 to-yellow-500/20 text-amber-500 border-amber-500/30",
    description: "Class 6-12 science fair, simple builds, STEM challenges & coding basics."
  },
  {
    name: "Emerging Tech",
    count: 50,
    icon: Zap,
    color: "from-teal-500/20 to-cyan-500/20 text-teal-500 border-teal-500/30",
    description: "IoT, drone systems, 3D printing, nanotech, synthetic biology & space tech."
  }
];

export function FieldGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {FIELD_CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        return (
          <Link
            key={cat.name}
            href={`/explore?field=${encodeURIComponent(cat.name)}`}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.color} border border-opacity-30`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  {cat.count} Ideas
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition flex items-center justify-between">
                <span>{cat.name}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition -translate-x-1 group-hover:translate-x-0 text-indigo-600 dark:text-indigo-400" />
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                {cat.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
