import { ExternalLink } from "lucide-react";

export function PromoAdBanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
      <a
        href="https://omg10.com/4/11548346"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg p-4 text-white font-semibold transition-all duration-300 hover:shadow-lg group"
      >
        <div className="flex items-center justify-between">
          <span>Click</span>
          <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </a>
    </div>
  );
}
