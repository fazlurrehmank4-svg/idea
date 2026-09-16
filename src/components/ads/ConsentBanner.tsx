'use client';

import React, { useEffect, useState } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ideaverse_consent');
    if (!consent) {
      setShow(true);
    } else if (consent === 'accepted') {
      updateConsent(true);
    } else {
      updateConsent(false);
    }
  }, []);

  const updateConsent = (granted: boolean) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: granted ? 'granted' : 'denied',
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied',
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('ideaverse_consent', 'accepted');
    updateConsent(true);
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('ideaverse_consent', 'declined');
    updateConsent(false);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-800 text-slate-200 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm">
            <p className="font-medium text-white mb-0.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 inline" /> Privacy & Cookie Preferences
            </p>
            <p className="text-slate-400 leading-relaxed max-w-3xl">
              We use cookies and Google AdSense / Analytics to personalize content, analyze traffic, and display relevant non-intrusive ads. By accepting, you agree to Google Consent Mode v2 standards.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition shadow-md shadow-indigo-600/20"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
