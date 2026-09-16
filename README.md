# IdeaVerse 1000 🚀

> **Tagline:** "1000 Project Ideas. Every Field. Every Level. One Platform."

IdeaVerse 1000 is a complete, production-ready, SEO-optimized Progressive Web App (PWA) that provides a searchable, filterable database of 1000+ project ideas spanning **every academic field** (Medicine, Engineering, CS, Law, Business, Sciences, Arts, Education, Agriculture, School Level, Emerging Tech) and **every level** (School, Undergraduate, Masters, PhD, Professional).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn design tokens
- **Icons:** `lucide-react`
- **PWA:** Service Worker (`/public/sw.js`), `manifest.json`, offline precaching & fallback (`/offline`)
- **Fuzzy Search:** Fuse.js
- **State Management:** Zustand with local storage persistence
- **Animations & UX:** Framer Motion, canvas-confetti
- **Monetization:** Google AdSense integration (`AdSlot` component with CLS prevention & lazy loading) + Google Consent Mode v2
- **Deployment:** Vercel ready

---

## ✨ Features

- **1000 Ideas Dataset:** Rich, diverse projects matching strict schema specifications.
- **Client-Side Fuzzy Search:** Fast search by title, description, subfield, tech stack, and tags.
- **Multi-Facet Filtering:** Filter by field, level, difficulty, duration, budget, tags, and trending status.
- **Surprise Me 🎲:** Instant random project generator with confetti micro-interaction.
- **Installable PWA:** Works offline after first visit, custom install prompt for Android/Desktop and Safari iOS banner.
- **AdSense Ready:** Pre-configured `AdSlot` components with min-height layout-shift protection, lazy loading, and adblock fallback.
- **SEO & Schema:** Dynamic metadata, JSON-LD structured data, `sitemap.ts`, `robots.ts`, and `ads.txt`.
- **Keyboard Navigation:** Press `/` to search, `Esc` to reset filters.

---

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build & Typecheck:**
   ```bash
   npm run build
   ```

---

## 💰 AdSense Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set your publisher ID:
   ```env
   NEXT_PUBLIC_ADSENSE_PUB_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```
3. Update `public/ads.txt` with your Google AdSense seller ID.

---

## 📱 PWA & Offline Testing

- Service worker is registered automatically in `RootLayout`.
- To test offline capabilities, run `npm run build && npm run start`, visit the site, then toggle "Offline" mode in Chrome DevTools Network tab.

---

## 📄 License
MIT License. Built for students, researchers, and creators worldwide.
