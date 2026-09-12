import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Questions, partnerships, or feedback about IdeaVerse 1000? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Direct Email</h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">support@ideaverse1000.app</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
