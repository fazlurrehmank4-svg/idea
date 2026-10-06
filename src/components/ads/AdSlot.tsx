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
  slot,
  format = "auto",
  layout,
  style,
  className = "",
  minHeight = "120px",
  client = "ca-pub-6347449521344114",
  responsive = true,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  const [isVisible, setIsVisible] = useState(false);
  const [adBlocked, setAdBlocked] = useState(false);
  const [isUnfilled, setIsUnfilled] = useState(false);

  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (!adRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(adRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || pushedRef.current || isDev) return;

    const pushAd = () => {
      if (!adRef.current || pushedRef.current) return;

      try {
        if (
          // @ts-expect-error Google AdSense window object
          window.adsbygoogle &&
          // @ts-expect-error Google AdSense window object
          Array.isArray(window.adsbygoogle)
        ) {
          // @ts-expect-error Google AdSense window object
          window.adsbygoogle.push({});
          pushedRef.current = true;
        }
      } catch (error) {
        console.error("AdSense error:", error);
        setAdBlocked(true);
      }
    };

    const timer = setTimeout(pushAd, 100);

    return () => clearTimeout(timer);
  }, [isVisible, isDev]);

  useEffect(() => {
    if (!adRef.current) return;

    const observer = new MutationObserver(() => {
      if (
        adRef.current?.getAttribute("data-ad-status") === "unfilled"
      ) {
        setIsUnfilled(true);
      }
    });

    observer.observe(adRef.current, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`relative w-full my-6 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-center text-center ${className}`}
      style={{
        minHeight,
        ...style,
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle w-full block"
        style={{
          display: "block",
        }}
        data-ad-client={client}
        {...(slot ? { "data-ad-slot": slot } : {})}
        data-ad-format={format}
        {...(
          responsive && format !== "autorelaxed"
            ? { "data-full-width-responsive": "true" }
            : {}
        )}
        {...(
          layout
            ? { "data-ad-layout": layout }
            : {}
        )}
      />

      {isDev && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-xs bg-slate-50/95 dark:bg-slate-900/95 border border-dashed border-indigo-300 dark:border-indigo-700/60 rounded-2xl pointer-events-none z-10">
          <div className="font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
            AdSense Slot: {slot || "Not specified"}
          </div>

          <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            Google AdSense placeholder
          </span>
        </div>
      )}

      {!isDev && (adBlocked || isUnfilled) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-xs text-slate-400 pointer-events-none select-none">
          <span className="font-mono text-[10px] tracking-wider uppercase opacity-70">
            Advertisement
          </span>

          <span className="text-[10px] opacity-50 mt-1">
            Ad space reserved
          </span>
        </div>
      )}
    </div>
  );
}
