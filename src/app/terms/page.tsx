import React from 'react';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto pt-6 pb-12 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl">
          <FileText className="w-6 h-6" />
        </div>
        <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
          Terms of Service
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
        <p>
          By accessing or using IdeaVerse 1000, you agree to comply with and be bound by these Terms of Service.
        </p>

        <h2 className="font-display font-bold text-base text-slate-900 dark:text-white pt-2">
          1. Intellectual Property & Use License
        </h2>
        <p>
          All project ideas, outlines, and descriptions on IdeaVerse 1000 are provided under open educational license for academic research, personal projects, and educational study.
        </p>

        <h2 className="font-display font-bold text-base text-slate-900 dark:text-white pt-2">
          2. Disclaimer of Liability
        </h2>
        <p>
          Project ideas are provided &quot;as is&quot; without guarantees of specific academic or commercial results. Users are responsible for verifying experimental safety, institutional ethics approvals, and safety protocols before conducting physical or chemical experiments.
        </p>
      </div>
    </div>
  );
}
