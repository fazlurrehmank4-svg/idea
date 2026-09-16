'use client';

import React, { useEffect, useState } from 'react';
import { Download, Share, Smartphone, X } from 'lucide-react';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIosBanner, setShowIosBanner] = useState(false);
  const [showAndroidPrompt, setShowAndroidPrompt] = useState(false);

  useEffect(() => {
    // Check if iOS
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (isIos && !isStandalone) {
      const iosDismissed = localStorage.getItem('iosInstallDismissed');
      if (!iosDismissed) {
        setShowIosBanner(true);
      }
    }

    // Android/Desktop PWA prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const promptDismissed = localStorage.getItem('pwaInstallDismissed');
      if (!promptDismissed) {
        setShowAndroidPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowAndroidPrompt(false);
    }
  };

  const dismissAndroid = () => {
    setShowAndroidPrompt(false);
    localStorage.setItem('pwaInstallDismissed', 'true');
  };

  const dismissIos = () => {
    setShowIosBanner(false);
    localStorage.setItem('iosInstallDismissed', 'true');
  };

  if (!showAndroidPrompt && !showIosBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md animate-in slide-in-from-bottom duration-300">
      {showAndroidPrompt && (
        <div className="bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-2xl shadow-2xl border border-indigo-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-sm font-display">Install IdeaVerse App</h4>
              <p className="text-xs text-slate-300">Access 1000+ ideas offline instantly</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              Install
            </button>
            <button
              onClick={dismissAndroid}
              aria-label="Dismiss app install prompt"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {showIosBanner && (
        <div className="bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-2xl shadow-2xl border border-indigo-500/30 flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl shrink-0">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div className="text-xs space-y-1">
              <h4 className="font-semibold text-sm font-display">Install IdeaVerse on iOS</h4>
              <p className="text-slate-300">
                Tap <Share className="w-3.5 h-3.5 inline text-indigo-400 mx-0.5" /> in Safari, then select <strong>"Add to Home Screen"</strong> for offline access.
              </p>
            </div>
          </div>
          <button
            onClick={dismissIos}
            aria-label="Dismiss iOS install banner"
            className="p-1 text-slate-400 hover:text-white rounded-lg shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
