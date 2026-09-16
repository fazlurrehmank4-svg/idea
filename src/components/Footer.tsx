'use client';

import React from 'react';
import Link from 'next/link';
import { Lightbulb, Mail, Heart, Shield, FileText, Globe, Share2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-amber-400">
                <Lightbulb className="w-5 h-5 fill-amber-400/20" />
              </div>
              <span className="font-display font-extrabold text-xl text-white">
                IdeaVerse<span className="text-indigo-400">1000</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              1000 Project Ideas. Every Field. Every Level. One Platform. Empowering students, researchers, and professionals worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition"
                aria-label="GitHub Repository"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition"
                aria-label="Twitter Page"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition"
                aria-label="Contact Us"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-3">
              Explore Ideas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/explore?field=Medicine%20%26%20Healthcare" className="hover:text-indigo-400 transition">
                  Medicine & Healthcare (100)
                </Link>
              </li>
              <li>
                <Link href="/explore?field=Engineering" className="hover:text-indigo-400 transition">
                  Engineering & Tech (120)
                </Link>
              </li>
              <li>
                <Link href="/explore?field=Computer%20Science%20%26%20IT" className="hover:text-indigo-400 transition">
                  Computer Science & AI (150)
                </Link>
              </li>
              <li>
                <Link href="/explore?field=Pure%20Sciences" className="hover:text-indigo-400 transition">
                  Pure Sciences (100)
                </Link>
              </li>
              <li>
                <Link href="/explore?field=School-Level%20Projects" className="hover:text-indigo-400 transition">
                  School Level Projects (100)
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Levels */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-3">
              By Level
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/explore?level=School" className="hover:text-indigo-400 transition">
                  High School & STEM
                </Link>
              </li>
              <li>
                <Link href="/explore?level=Undergraduate" className="hover:text-indigo-400 transition">
                  Undergraduate Capstone
                </Link>
              </li>
              <li>
                <Link href="/explore?level=Masters" className="hover:text-indigo-400 transition">
                  Masters Thesis Ideas
                </Link>
              </li>
              <li>
                <Link href="/explore?level=PhD" className="hover:text-indigo-400 transition">
                  PhD & Research Grants
                </Link>
              </li>
              <li>
                <Link href="/explore?level=Professional" className="hover:text-indigo-400 transition">
                  Professional & Enterprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Legal */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition">
                  About IdeaVerse
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-indigo-400 transition">
                  Submit a Project Idea
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-400" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition flex items-center gap-1">
                  <FileText className="w-3 h-3 text-indigo-400" /> Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} IdeaVerse 1000. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for students, developers & researchers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
