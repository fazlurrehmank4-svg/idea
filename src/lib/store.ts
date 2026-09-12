import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { FilterState } from "@/types/idea";

interface AppState {
  // Bookmarks
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  clearBookmarks: () => void;

  // Filters
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setSelectedFields: (fields: string[]) => void;
  toggleFieldFilter: (field: string) => void;
  setSelectedLevels: (levels: string[]) => void;
  toggleLevelFilter: (level: string) => void;
  setSelectedDifficulties: (difficulties: string[]) => void;
  toggleDifficultyFilter: (diff: string) => void;
  setSelectedBudgets: (budgets: string[]) => void;
  toggleBudgetFilter: (budget: string) => void;
  setSelectedTags: (tags: string[]) => void;
  toggleTagFilter: (tag: string) => void;
  setSortBy: (sort: FilterState["sortBy"]) => void;
  resetFilters: () => void;

  // Modals & UI
  isSurpriseOpen: boolean;
  setSurpriseOpen: (open: boolean) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

const initialFilters: FilterState = {
  searchQuery: "",
  selectedFields: [],
  selectedLevels: [],
  selectedDifficulties: [],
  selectedBudgets: [],
  selectedDurations: [],
  selectedTags: [],
  sortBy: "popular",
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Bookmarks
      bookmarkedIds: [],
      toggleBookmark: (id: string) => {
        const current = get().bookmarkedIds;
        if (current.includes(id)) {
          set({ bookmarkedIds: current.filter((bId) => bId !== id) });
        } else {
          set({ bookmarkedIds: [...current, id] });
        }
      },
      isBookmarked: (id: string) => get().bookmarkedIds.includes(id),
      clearBookmarks: () => set({ bookmarkedIds: [] }),

      // Filters
      filters: initialFilters,
      setSearchQuery: (query: string) =>
        set((state) => ({ filters: { ...state.filters, searchQuery: query } })),
      setSelectedFields: (fields: string[]) =>
        set((state) => ({ filters: { ...state.filters, selectedFields: fields } })),
      toggleFieldFilter: (field: string) =>
        set((state) => {
          const current = state.filters.selectedFields;
          const next = current.includes(field)
            ? current.filter((f) => f !== field)
            : [...current, field];
          return { filters: { ...state.filters, selectedFields: next } };
        }),
      setSelectedLevels: (levels: string[]) =>
        set((state) => ({ filters: { ...state.filters, selectedLevels: levels } })),
      toggleLevelFilter: (level: string) =>
        set((state) => {
          const current = state.filters.selectedLevels;
          const next = current.includes(level)
            ? current.filter((l) => l !== level)
            : [...current, level];
          return { filters: { ...state.filters, selectedLevels: next } };
        }),
      setSelectedDifficulties: (difficulties: string[]) =>
        set((state) => ({ filters: { ...state.filters, selectedDifficulties: difficulties } })),
      toggleDifficultyFilter: (diff: string) =>
        set((state) => {
          const current = state.filters.selectedDifficulties;
          const next = current.includes(diff)
            ? current.filter((d) => d !== diff)
            : [...current, diff];
          return { filters: { ...state.filters, selectedDifficulties: next } };
        }),
      setSelectedBudgets: (budgets: string[]) =>
        set((state) => ({ filters: { ...state.filters, selectedBudgets: budgets } })),
      toggleBudgetFilter: (budget: string) =>
        set((state) => {
          const current = state.filters.selectedBudgets;
          const next = current.includes(budget)
            ? current.filter((b) => b !== budget)
            : [...current, budget];
          return { filters: { ...state.filters, selectedBudgets: next } };
        }),
      setSelectedTags: (tags: string[]) =>
        set((state) => ({ filters: { ...state.filters, selectedTags: tags } })),
      toggleTagFilter: (tag: string) =>
        set((state) => {
          const current = state.filters.selectedTags;
          const next = current.includes(tag)
            ? current.filter((t) => t !== tag)
            : [...current, tag];
          return { filters: { ...state.filters, selectedTags: next } };
        }),
      setSortBy: (sort: FilterState["sortBy"]) =>
        set((state) => ({ filters: { ...state.filters, sortBy: sort } })),
      resetFilters: () => set({ filters: initialFilters }),

      // Modals & UI
      isSurpriseOpen: false,
      setSurpriseOpen: (open: boolean) => set({ isSurpriseOpen: open }),
      recentSearches: [],
      addRecentSearch: (query: string) => {
        const q = query.trim();
        if (!q) return;
        const current = get().recentSearches.filter((item) => item !== q);
        set({ recentSearches: [q, ...current].slice(0, 5) });
      },
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "ideaverse_app_store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        bookmarkedIds: state.bookmarkedIds,
        recentSearches: state.recentSearches,
      }),
    }
  )
);
