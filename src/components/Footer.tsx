import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4 fill-white/20" />
              </div>
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
                IdeaVerse 1000
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              "1000 Project Ideas. Every Field. Every Level. One Platform." Discover, bookmark, and execute high-impact research and build topics tailored to your exact needs.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for creators worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/explore" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Explore All Ideas
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Submit an Idea
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About IdeaVerse
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Legal & Policy
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} IdeaVerse 1000. All rights reserved.</p>
          <p className="font-mono text-[11px]">PWA Enabled • Offline Ready</p>
        </div>
      </div>
    </footer>
  );
}
