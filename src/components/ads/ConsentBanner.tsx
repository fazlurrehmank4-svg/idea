"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Cookie, X } from "lucide-react";

export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ideaverse_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ideaverse_consent", "granted");
    setShow(false);
    // Push Consent Mode v2 to window.gtag if present
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("ideaverse_consent", "denied");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-slate-200 text-sm shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-white flex items-center gap-1.5">
              Privacy & Cookie Preferences
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                Consent v2
              </span>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
              We use cookies and Google Analytics/AdSense to personalize content, ads, and analyze traffic.
              By accepting, you agree to our privacy policy and consent options.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            Decline Non-Essential
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
