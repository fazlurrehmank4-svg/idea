import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white pt-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing IdeaVerse 1000, you agree to comply with these terms of service and applicable intellectual property guidelines.
          </p>
          <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white pt-2">
            2. Intellectual Property & Usage
          </h2>
          <p>
            The project ideas and resources indexed on IdeaVerse 1000 are provided for educational and research purposes.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
