import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConsentBanner } from "@/components/ads/ConsentBanner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IdeaVerse 1000 — 1000 Project Ideas Across Every Field",
    template: "%s | IdeaVerse 1000",
  },
  description:
    "Discover 1000+ project ideas across medicine, engineering, law, CS, arts, and every field — from school to PhD level.",
  keywords: [
    "project ideas", "final year project", "PhD research topics",
    "school science fair", "engineering projects", "medical research", "PWA",
  ],
  authors: [{ name: "IdeaVerse" }],
  metadataBase: new URL("https://ideaverse1000.app"),
  manifest: "/manifest.json",
  openGraph: {
    title: "IdeaVerse 1000",
    description: "1000 Project Ideas. Every Field. Every Level.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "IdeaVerse 1000",
    "url": "https://ideaverse1000.app",
    "description": "Searchable database of 1000+ project ideas spanning every academic field and level.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ideaverse1000.app/explore?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const consentInitInlineScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500
    });

    (function () {
      try {
        var saved = JSON.parse(localStorage.getItem('cookie_consent_v2') || 'null');
        if (!saved) return;

        gtag('consent', 'update', {
          ad_storage: saved.ad_storage ? 'granted' : 'denied',
          ad_user_data: saved.ad_user_data ? 'granted' : 'denied',
          ad_personalization: saved.ad_personalization ? 'granted' : 'denied',
          analytics_storage: saved.analytics_storage ? 'granted' : 'denied'
        });
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="google-consent-mode-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: consentInitInlineScript }}
        />
        <Script
          id="google-analytics"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6347449521344114"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
