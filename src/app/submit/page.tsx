"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { ConsentBanner } from "@/components/ads/ConsentBanner";
import { SurpriseMeModal } from "@/components/SurpriseMeModal";
import { PlusCircle, CheckCircle2, Send, Sparkles } from "lucide-react";

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    field: "Medicine & Healthcare",
    level: "Undergraduate",
    difficulty: "Intermediate",
    duration: "3-6 months",
    budget: "Low",
    description: "",
    objectives: "",
    techStack: "",
    authorName: "",
    authorEmail: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Contributions</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            Submit Your Project Idea
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Have a brilliant research topic or project build idea? Submit it to be featured in the IdeaVerse 1000 database.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              Thank You for Your Submission!
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Your project idea has been received and queued for review. Once verified, it will be indexed into the IdeaVerse database.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  title: "",
                  field: "Medicine & Healthcare",
                  level: "Undergraduate",
                  difficulty: "Intermediate",
                  duration: "3-6 months",
                  budget: "Low",
                  description: "",
                  objectives: "",
                  techStack: "",
                  authorName: "",
                  authorEmail: "",
                });
              }}
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              Submit Another Idea
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
          >
            {/* Project Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Project Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Autonomous Drone Swarm for Precision Forest Fire Tracking"
                className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 focus:outline-none text-slate-900 dark:text-white"
              />
            </div>

            {/* Grid 2 Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Field / Discipline
                </label>
                <select
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                >
                  <option value="Medicine & Healthcare">Medicine & Healthcare</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Computer Science & IT">Computer Science & IT</option>
                  <option value="Law & Legal Studies">Law & Legal Studies</option>
                  <option value="Business & Commerce">Business & Commerce</option>
                  <option value="Pure Sciences">Pure Sciences</option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Arts & Humanities">Arts & Humanities</option>
                  <option value="Heritage & Culture">Heritage & Culture</option>
                  <option value="Education">Education</option>
                  <option value="Agriculture & Environment">Agriculture & Environment</option>
                  <option value="School-Level Projects">School-Level Projects</option>
                  <option value="Emerging Tech">Emerging Tech</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Target Academic Level
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                >
                  <option value="School">School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Description (2-3 sentences) <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Explain the main problem statement, core mechanics, and expected outcome..."
                className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 focus:outline-none text-slate-900 dark:text-white resize-none"
              />
            </div>

            {/* Tech Stack */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Recommended Tech Stack (comma separated)
              </label>
              <input
                type="text"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                placeholder="Python, ROS2, OpenCV, PyTorch"
                className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 focus:outline-none text-slate-900 dark:text-white"
              />
            </div>

            {/* Author Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Your Name / Handle
                </label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  placeholder="Dr. Alex Rivera"
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email Address (for notification)
                </label>
                <input
                  type="email"
                  value={formData.authorEmail}
                  onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Project Idea
            </button>
          </form>
        )}
      </main>

      <Footer />
      <InstallPrompt />
      <ConsentBanner />
      <SurpriseMeModal />
    </div>
  );
}
