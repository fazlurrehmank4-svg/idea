import Link from "next/link";
import { Sparkles, Flame, ArrowRight, Dices, Search, Layers, Compass, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { FieldGrid } from "@/components/FieldGrid";
import { IdeaCard } from "@/components/IdeaCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { ConsentBanner } from "@/components/ads/ConsentBanner";
import { SurpriseMeModal } from "@/components/SurpriseMeModal";
import ideasData from "@/data/ideas.json";
import { Idea } from "@/types/idea";

const allIdeas = ideasData as Idea[];
const trendingIdeas = allIdeas.filter((i) => i.trending).slice(0, 6);
const featuredIdeas = allIdeas.slice(10, 16);

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1">
        {/* AdSlot Leaderboard Top */}
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <AdSlot slot="1000000001" minHeight="90px" />
        </div>

        {/* Promotional Banner Ad */}
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
          <a
            href="https://omg10.com/4/11548346"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg p-4 text-white font-semibold transition-all duration-300 hover:shadow-lg group"
          >
            <div className="flex items-center justify-between">
              <span>Click Here</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          {/* Animated Ambient Blobs */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500/20 to-amber-500/20 blur-3xl rounded-full pointer-events-none animate-blob" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-l from-purple-500/20 to-indigo-500/20 blur-3xl rounded-full pointer-events-none animate-blob animation-delay-2000" />

          <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1000 Project Ideas • Every Field • Every Level</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              1000 Project Ideas. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
                Every Field. Every Level.
              </span>{" "}
              One Platform.
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Help students (school → PhD), researchers, and builders discover high-impact, customizable project ideas complete with tech stacks, objectives, and resources.
            </p>

            {/* Search Bar Container */}
            <div className="max-w-2xl mx-auto pt-2">
              <SearchBar placeholder="Search 'AI healthcare', 'Robotics', 'Quantum', or 'School Science'..." />
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-2.5">
                <span>Popular tags:</span>
                <Link href="/explore?q=AI" className="underline hover:text-indigo-500">
                  #AI
                </Link>
                <Link href="/explore?q=robotics" className="underline hover:text-indigo-500">
                  #robotics
                </Link>
                <Link href="/explore?q=sustainability" className="underline hover:text-indigo-500">
                  #sustainability
                </Link>
                <Link href="/explore?q=cybersecurity" className="underline hover:text-indigo-500">
                  #cybersecurity
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories / Fields Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                Explore by Field
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Browse through 12 core disciplines spanning school to doctorate levels
              </p>
            </div>
            <Link
              href="/explore"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View All 1000 Ideas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <FieldGrid />
        </section>

        {/* AdSlot In-Feed Mid-Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot slot="1000000002" minHeight="120px" />
        </div>

        {/* Trending Ideas */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
                <Flame className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                  Trending Ideas
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Most saved and viewed project concepts this week
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </section>

        {/* Featured Ideas */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                  Featured Research Topics
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Curated innovative project designs ready for prototyping
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </section>

        {/* AdSlot Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <AdSlot slot="1000000003" minHeight="150px" />
        </div>
      </main>

      <Footer />
      <InstallPrompt />
      <ConsentBanner />
      <SurpriseMeModal />
    </div>
  );
}
