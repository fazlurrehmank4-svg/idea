# 🏗️ Step 1: Scaffold Next.js 14 + Core Dependencies

Here's the **exact scaffold** to run. Copy each block into your terminal in order.

---

## 1️⃣ Create the Next.js 14 Project

```bash
npx create-next-app@latest ideaverse-1000 \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm

cd ideaverse-1000
```

**When prompted, choose:**
- Would you like to use Turbopack? → **No** (safer for `next-pwa` compatibility)
- Would you like to customize the import alias? → **No** (keep `@/*`)

---

## 2️⃣ Install Core Dependencies

```bash
# UI & icons
npm install lucide-react framer-motion next-themes canvas-confetti

# Search, state, utilities
npm install fuse.js zustand clsx tailwind-merge class-variance-authority

# PWA + AdSense
npm install next-pwa

# Dev dependencies
npm install -D @types/canvas-confetti @types/node @types/react @types/react-dom
```

---

## 3️⃣ shadcn/ui Initialization

```bash
npx shadcn@latest init
```

**Choose when prompted:**
- Style → **Default**
- Base color → **Slate**
- CSS variables → **Yes**

Then add the components we'll need:

```bash
npx shadcn@latest add button card input badge dialog dropdown-menu \
  separator skeleton sheet tabs toast tooltip select slider
```

---

## 4️⃣ Tailwind Theme Configuration

Replace **`tailwind.config.ts`**:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand accents
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        amberx: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%":     { transform: "translate(30px, -50px) scale(1.1)" },
          "66%":     { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blob: "blob 7s infinite",
        "fade-in": "fade-in 0.4s ease-out",
        shimmer: "shimmer 2s infinite",
      },
      backgroundImage: {
        "grid-slate":
          "linear-gradient(to right, rgb(226 232 240 / 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240 / 0.5) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

Install the plugin:

```bash
npm install -D tailwindcss-animate
```

---

## 5️⃣ Fonts + Root Layout

**`src/app/layout.tsx`**:

```tsx
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
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
    "school science fair", "engineering projects", "medical research",
  ],
  authors: [{ name: "IdeaVerse" }],
  metadataBase: new URL("https://ideaverse1000.app"),
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
  return (
    <html lang="en" suppressHydrationWarning>
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
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 6️⃣ Theme Provider Wrapper

**`src/components/providers/theme-provider.tsx`**:

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

---

## 7️⃣ Base Global CSS

**`src/app/globals.css`** — ensure the top has the fonts wired:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;
    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;
    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;
    --primary: 239 84% 67%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222 47% 11%;
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    --accent: 45 93% 58%;
    --accent-foreground: 222 47% 11%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 239 84% 67%;
    --radius: 0.75rem;
  }

  .dark {
    --background: 222 47% 6%;
    --foreground: 210 40% 98%;
    --card: 222 47% 9%;
    --card-foreground: 210 40% 98%;
    --popover: 222 47% 9%;
    --popover-foreground: 210 40% 98%;
    --primary: 239 84% 67%;
    --primary-foreground: 0 0% 100%;
    --secondary: 217 33% 17%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;
    --accent: 45 93% 58%;
    --accent-foreground: 222 47% 11%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 0 0% 100%;
    --border: 217 33% 17%;
    --input: 217 33% 17%;
    --ring: 239 84% 67%;
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
  h1, h2, h3, h4 { @apply font-display tracking-tight; }
}

/* Ambient background blobs */
@layer utilities {
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-4000 { animation-delay: 4s; }
}
```

---

## 8️⃣ Utility Helper

**`src/lib/utils.ts`** (usually auto-created by shadcn — verify it contains):

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 9️⃣ `next.config.mjs` — PWA-Ready Stub

**`next.config.mjs`** (replace the default file):

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // next-pwa gets wired up in Step 2 — leaving placeholder now
};

export default nextConfig;
```

> ⚠️ We'll wrap this with `withPWA` in the dedicated PWA step to avoid breaking your first build.

---

## 🔟 Verification Commands

Run these to confirm everything is wired correctly:

```bash
# 1. Type check — must return 0 errors
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Build (production check)
npm run build

# 4. Start dev server
npm run dev
# → open http://localhost:3000
```

---

## ✅ Expected `package.json` Snapshot

After all installs, your **`dependencies`** should include:

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "^18",
    "react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4",
    "lucide-react": "^0.4xx",
    "framer-motion": "^11.x",
    "next-themes": "^0.3.x",
    "canvas-confetti": "^1.9.x",
    "fuse.js": "^7.x",
    "zustand": "^4.5.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x",
    "class-variance-authority": "^0.7.x",
    "next-pwa": "^5.6.x",
    "tailwindcss-animate": "^1.0.x"
  },
  "devDependencies": {
    "@types/canvas-confetti": "^1.6.x",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.x",
    "postcss": "^8",
    "autoprefixer": "^10"
  }
}
```

---

## 📁 Folder Structure After This Step

```
ideaverse-1000/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── providers/
│   │   │   └── theme-provider.tsx
│   │   └── ui/           ← shadcn components
│   └── lib/
│       └── utils.ts
├── public/
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## 🎯 Checklist Before Moving to Step 2

- [ ] `npm run dev` shows the default Next.js page at `localhost:3000`
- [ ] Dark mode toggle works when you add a `<ThemeToggle />` (theme-provider is wired)
- [ ] `npx tsc --noEmit` returns **0 errors**
- [ ] `npm run build` succeeds
- [ ] Fonts (`Inter`, `Space Grotesk`) render — inspect `<body>` class for `--font-inter` and `--font-space-grotesk`
- [ ] All shadcn components appear under `src/components/ui/`

---

### 🚀 Ready for Step 2?

Say **"Step 2"** and I'll deliver:

> **PWA configuration** — `manifest.json`, `next-pwa` wiring in `next.config.mjs`, service worker, offline fallback page, install prompt component (`beforeinstallprompt` + iOS banner), and icon set generation.

Then **Step 3** = data model + `ideas.json` seed, **Step 4** = homepage + Explore + Idea detail, **Step 5** = AdSense integration.

Ready when you are. 🎯
