"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Cookie, X, Settings2 } from "lucide-react";

const STORAGE_KEY = "cookie_consent_v2";

export interface ConsentOptions {
  necessary: boolean;
  analytics_storage: boolean;
  ad_storage: boolean;
  ad_user_data: boolean;
  ad_personalization: boolean;
  timestamp?: string;
}

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [analytics, setAnalytics] = useState(false);
  const [adStorage, setAdStorage] = useState(false);
  const [adUserData, setAdUserData] = useState(false);
  const [adPersonalization, setAdPersonalization] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setShowBanner(true);
      } else {
        const parsed: ConsentOptions = JSON.parse(saved);
        setAnalytics(!!parsed.analytics_storage);
        setAdStorage(!!parsed.ad_storage);
        setAdUserData(!!parsed.ad_user_data);
        setAdPersonalization(!!parsed.ad_personalization);
      }
    } catch (e) {
      setShowBanner(true);
    }

    const handleOpenPreferences = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: ConsentOptions = JSON.parse(saved);
          setAnalytics(!!parsed.analytics_storage);
          setAdStorage(!!parsed.ad_storage);
          setAdUserData(!!parsed.ad_user_data);
          setAdPersonalization(!!parsed.ad_personalization);
        }
      } catch (e) {}
      setShowModal(true);
    };

    window.addEventListener("open-cookie-preferences", handleOpenPreferences);
    return () => {
      window.removeEventListener("open-cookie-preferences", handleOpenPreferences);
    };
  }, []);

  const updateGoogleConsent = (consent: ConsentOptions) => {
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("consent", "update", {
        ad_storage: consent.ad_storage ? "granted" : "denied",
        ad_user_data: consent.ad_user_data ? "granted" : "denied",
        ad_personalization: consent.ad_personalization ? "granted" : "denied",
        analytics_storage: consent.analytics_storage ? "granted" : "denied",
      });
    }
  };

  const saveConsent = (options: {
    analytics_storage: boolean;
    ad_storage: boolean;
    ad_user_data: boolean;
    ad_personalization: boolean;
  }) => {
    const fullConsent: ConsentOptions = {
      necessary: true,
      analytics_storage: options.analytics_storage,
      ad_storage: options.ad_storage,
      ad_user_data: options.ad_user_data,
      ad_personalization: options.ad_personalization,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullConsent));
    updateGoogleConsent(fullConsent);

    setAnalytics(options.analytics_storage);
    setAdStorage(options.ad_storage);
    setAdUserData(options.ad_user_data);
    setAdPersonalization(options.ad_personalization);

    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      analytics_storage: true,
      ad_storage: true,
      ad_user_data: true,
      ad_personalization: true,
    });
  };

  const handleRejectAll = () => {
    saveConsent({
      analytics_storage: false,
      ad_storage: false,
      ad_user_data: false,
      ad_personalization: false,
    });
  };

  const handleSavePreferences = () => {
    saveConsent({
      analytics_storage: analytics,
      ad_storage: adStorage,
      ad_user_data: adUserData,
      ad_personalization: adPersonalization,
    });
  };

  return (
    <>
      {/* Banner */}
      {showBanner && (
        <div
          id="cookie-consent"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-slate-200 text-sm shadow-2xl animate-fade-in"
          role="dialog"
          aria-live="polite"
          aria-label="Privacy & Cookie Preferences"
        >
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
                  By accepting, you agree to our{" "}
                  <Link href="/privacy" className="text-indigo-400 underline hover:text-indigo-300">
                    privacy policy
                  </Link>{" "}
                  and consent options.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors shadow-lg shadow-indigo-600/20 flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                Accept all
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors border border-slate-700"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors border border-slate-700 flex items-center gap-1.5"
              >
                <Settings2 className="w-3.5 h-3.5" />
                Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showModal && (
        <div
          id="cookie-preferences"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-pref-title"
        >
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 id="cookie-pref-title" className="font-display font-bold text-lg text-white">
                  Privacy & Cookie Preferences
                </h2>
                <p className="text-xs text-slate-400">
                  Manage your consent for Google Analytics and AdSense.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-0.5 rounded border-slate-700 text-indigo-600"
                />
                <div>
                  <span className="font-semibold text-white block">Strictly necessary</span>
                  <span className="text-slate-400 block text-[11px]">
                    Always active for core platform functionality & security.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent-analytics"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <label htmlFor="consent-analytics" className="font-semibold text-white block cursor-pointer">
                    Analytics storage
                  </label>
                  <span className="text-slate-400 block text-[11px]">
                    Google Analytics performance & usage metrics.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent-ad-storage"
                  checked={adStorage}
                  onChange={(e) => setAdStorage(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <label htmlFor="consent-ad-storage" className="font-semibold text-white block cursor-pointer">
                    Advertising storage
                  </label>
                  <span className="text-slate-400 block text-[11px]">
                    AdSense advertising cookies for ad delivery.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent-ad-user-data"
                  checked={adUserData}
                  onChange={(e) => setAdUserData(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <label htmlFor="consent-ad-user-data" className="font-semibold text-white block cursor-pointer">
                    Ad user data
                  </label>
                  <span className="text-slate-400 block text-[11px]">
                    Google Consent Mode v2 user data consent.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent-ad-personalization"
                  checked={adPersonalization}
                  onChange={(e) => setAdPersonalization(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <label htmlFor="consent-ad-personalization" className="font-semibold text-white block cursor-pointer">
                    Ad personalization
                  </label>
                  <span className="text-slate-400 block text-[11px]">
                    Personalized ad targeting preferences.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-4 py-2.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
              >
                Save preferences
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
                >
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
