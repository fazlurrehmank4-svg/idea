import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/theme-provider";
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

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
