"use client";

import React, { useState, useEffect } from "react";
import { Download, Share, PlusSquare, X, Sparkles } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already running as installed PWA
    const isAppStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(isAppStandalone);

    // Check if iOS Safari
    const ua = window.navigator.userAgent;
    const isIosDevice = /iphone|ipad|ipod/i.test(ua);
    setIsIOS(isIosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  if (isStandalone || dismissed) return null;

  return (
    <>
      {/* Native PWA Banner for Chromium / Desktop / Android */}
      {deferredPrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-slate-900 border border-indigo-500/30 text-white p-4 rounded-2xl shadow-2xl backdrop-blur-lg flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Install IdeaVerse 1000</h4>
              <p className="text-xs text-slate-400">Access 1000+ ideas offline on your home screen.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              Install
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close install prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* iOS Safari Custom Instructions Banner */}
      {isIOS && !deferredPrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-2xl backdrop-blur-lg animate-fade-in">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span>Install on iPhone / iPad</span>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Install this app on your device to browse ideas offline:
          </p>
          <div className="mt-2 text-xs text-slate-400 space-y-1">
            <div className="flex items-center gap-2">
              1. Tap the <Share className="w-3.5 h-3.5 text-indigo-400 inline" /> Share icon in Safari.
            </div>
            <div className="flex items-center gap-2">
              2. Scroll down and tap <PlusSquare className="w-3.5 h-3.5 text-indigo-400 inline" /> Add to Home Screen.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
