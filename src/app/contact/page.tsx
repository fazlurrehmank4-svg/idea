'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-xl mx-auto pt-6 pb-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl w-12 h-12 flex items-center justify-center mx-auto">
          <Mail className="w-6 h-6" />
        </div>
        <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
          Contact Us
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Have feedback, partnership inquiries, or AdSense suggestions? Get in touch with our team.
        </p>
      </div>

      {sent ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-3xl p-8 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h3 className="font-display font-bold text-lg text-emerald-900 dark:text-emerald-200">
            Message Sent!
          </h3>
          <p className="text-xs text-emerald-700 dark:text-emerald-300">
            Thank you for reaching out. We will get back to you shortly.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm"
        >
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Your Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              className="w-full px-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Message</label>
            <textarea
              required
              rows={4}
              placeholder="How can we help you?"
              className="w-full px-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl transition shadow flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      )}
    </div>
  );
}
