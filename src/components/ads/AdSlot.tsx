"use client";

import React, { useEffect, useRef, useState } from "react";

interface AdSlotProps {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  layout?: string;
  style?: React.CSSProperties;
  className?: string;
  minHeight?: string;
  client?: string;
}

export function AdSlot({
  slot = "1234567890",
  format = "auto",
  layout,
  style,
  className = "",
  minHeight = "120px",
  client = "ca-pub-XXXXXXXXXXXXXXXX",
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adBlocked, setAdBlocked] = useState(false);
  const adPushedRef = useRef(false);

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
        data-full-width-responsive="true"
        {...(layout ? { "data-ad-layout": layout } : {})}
      />

      {/* Subtle indicator / placeholder during dev or if ad is loading/blocked */}
      <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-4 text-xs text-slate-400 dark:text-slate-600 pointer-events-none select-none">
        <span className="font-mono text-[10px] tracking-wider uppercase opacity-70">Advertisement</span>
        {adBlocked && <span className="text-[10px] text-slate-400 opacity-50 mt-1">Ad space reserved</span>}
      </div>
    </div>
  );
}
