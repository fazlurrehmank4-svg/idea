"use client";

import React, { useEffect, useRef, useState } from "react";

interface AdSlotProps {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical" | "autorelaxed";
  layout?: string;
  style?: React.CSSProperties;
  className?: string;
  minHeight?: string;
  client?: string;
  responsive?: boolean;
}

export function AdSlot({
  slot = "9555472062",
  format = "auto",
  layout,
  style,
  className = "",
  minHeight = "120px",
  client = "ca-pub-6347449521344114",
  responsive = true,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adBlocked, setAdBlocked] = useState(false);
  const adPushedRef = useRef(false);

  const [isUnfilled, setIsUnfilled] = useState(false);
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !adPushedRef.current) {
      try {
        // @ts-expect-error Google AdSense window object
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adPushedRef.current = true;
      } catch (err) {
        console.error("AdSense push error:", err);
        setAdBlocked(true);
      }
    }

    // Monitor for AdSense unfilled status
    if (adRef.current) {
      const mutationObserver = new MutationObserver(() => {
        if (adRef.current?.getAttribute("data-ad-status") === "unfilled") {
          setIsUnfilled(true);
        }
      });
      mutationObserver.observe(adRef.current, { attributes: true, attributeFilter: ["data-ad-status"] });
      return () => mutationObserver.disconnect();
    }
  }, [isVisible]);

  return (
    <div
      className={`relative w-full my-6 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-center text-center transition-all ${className}`}
      style={{ minHeight, ...style }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle w-full block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(responsive && format !== "autorelaxed" ? { "data-full-width-responsive": "true" } : {})}
        {...(layout ? { "data-ad-layout": layout } : {})}
      />

      {/* Developer Preview Badge (shown when running locally on localhost/dev) */}
      {isDev && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-xs bg-slate-50/95 dark:bg-slate-900/95 border border-dashed border-indigo-300 dark:border-indigo-700/60 rounded-2xl pointer-events-none z-10">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
            <span>AdSense Slot: {slot}</span>
            <span className="text-slate-400">•</span>
            <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
              {format}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            Google AdSense placeholder (Live ads render on approved public domain)
          </span>
        </div>
      )}

      {/* Unfilled / Blocked fallback indicator in production */}
      {!isDev && (adBlocked || isUnfilled) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-xs text-slate-400 dark:text-slate-600 pointer-events-none select-none">
          <span className="font-mono text-[10px] tracking-wider uppercase opacity-70">Advertisement</span>
          <span className="text-[10px] text-slate-400 opacity-50 mt-1">Ad space reserved</span>
        </div>
      )}
    </div>
  );
}
