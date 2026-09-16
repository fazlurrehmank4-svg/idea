import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto pt-6 pb-12 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
        <p>
          At IdeaVerse 1000, we prioritize user privacy and data minimization. This Privacy Policy details how we handle information across our Progressive Web Application (PWA).
        </p>

        <h2 className="font-display font-bold text-base text-slate-900 dark:text-white pt-2">
          1. Data Storage & Bookmarks
        </h2>
        <p>
          Your saved bookmarks and search preferences are stored exclusively on your device using HTML5 LocalStorage. We do not transmit your saved project list to any external server.
        </p>

        <h2 className="font-display font-bold text-base text-slate-900 dark:text-white pt-2">
          2. Google Analytics & Google AdSense
        </h2>
        <p>
          We use Google Analytics 4 and Google AdSense to monitor traffic performance and serve non-intrusive advertisements. We strictly implement <strong>Google Consent Mode v2</strong>, allowing you to opt out of tracking cookies via our consent banner.
        </p>

        <h2 className="font-display font-bold text-base text-slate-900 dark:text-white pt-2">
          3. Contact Us
        </h2>
        <p>
          If you have questions regarding privacy compliance or GDPR/CCPA requests, contact us via our Contact page.
        </p>
      </div>
    </div>
  );
}
