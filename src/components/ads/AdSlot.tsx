'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  layout?: string;
  responsive?: boolean;
  minHeight?: string;
  className?: string;
  label?: string;
}

export function AdSlot({
  slot,
  format = 'auto',
  layout = '',
  responsive = true,
  minHeight = '120px',
  className = '',
  label = 'Advertisement'
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const currentRef = adRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            try {
              if (window && (window as any).adsbygoogle) {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
                if (isMounted) setAdLoaded(true);
              }
            } catch (err) {
              console.warn('AdSense load error:', err);
              if (isMounted) setAdBlocked(true);
            }
            if (currentRef) observer.unobserve(currentRef);
          }
        });
      },
      { rootMargin: '200px' }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      isMounted = false;
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={adRef}
      style={{ minHeight }}
      className={`my-6 w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-3 overflow-hidden relative ${className}`}
    >
      <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 self-start px-1">
        {label}
      </span>

      {adBlocked ? (
        <div className="text-xs text-slate-400 dark:text-slate-500 text-center py-4 font-mono">
          [ Sponsor Space — Support IdeaVerse ]
        </div>
      ) : (
        <ins
          className="adsbygoogle w-full text-center"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || 'ca-pub-1234567890123456'}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
          {...(layout ? { 'data-ad-layout': layout } : {})}
        />
      )}
    </div>
  );
}
