'use client';

import React, { useState } from 'react';
import { PlusCircle, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    field: 'Medicine & Healthcare',
    level: 'Undergraduate',
    difficulty: 'Intermediate',
    duration: '3-6 months',
    description: '',
    techStack: '',
    authorEmail: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto pt-6 pb-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> Community Contributions
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Submit a Project Idea
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Have an innovative research topic or capstone project concept? Share it with students and researchers worldwide.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-3xl p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-emerald-900 dark:text-emerald-200">
            Idea Submitted Successfully!
          </h3>
          <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
            Thank you for contributing to IdeaVerse 1000. Our review team will verify the details before publishing.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow hover:bg-emerald-700 transition"
          >
            Submit Another Idea
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm"
        >
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. AI-Powered Early Detection of Diabetic Retinopathy"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                Academic Field
              </label>
              <select
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value="Medicine & Healthcare">Medicine & Healthcare</option>
                <option value="Engineering">Engineering</option>
                <option value="Computer Science & IT">Computer Science & IT</option>
                <option value="Law & Legal Studies">Law & Legal Studies</option>
                <option value="Business & Commerce">Business & Commerce</option>
                <option value="Pure Sciences">Pure Sciences</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Arts & Humanities">Arts & Humanities</option>
                <option value="Education">Education</option>
                <option value="Agriculture & Environment">Agriculture & Environment</option>
                <option value="School-Level Projects">School-Level Projects</option>
                <option value="Emerging Tech">Emerging Tech</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                Target Level
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value="School">School Level</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Description / Overview *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a 2-3 sentence overview of the problem, methodology, and target impact..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Technologies / Tools (Comma Separated)
            </label>
            <input
              type="text"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              placeholder="e.g. Python, TensorFlow, OpenCV, Docker"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Your Email (Optional for Attribution)
            </label>
            <input
              type="email"
              value={formData.authorEmail}
              onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
              placeholder="author@university.edu"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl transition shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Idea for Review</span>
          </button>
        </form>
      )}
    </div>
  );
}
