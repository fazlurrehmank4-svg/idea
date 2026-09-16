import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FilterState } from './types';

interface AppStore {
  savedIdeaIds: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  clearBookmarks: () => void;

  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setSelectedField: (field: string) => void;
  setSelectedLevel: (level: string) => void;
  setSelectedDifficulty: (difficulty: string) => void;
  setSelectedBudget: (budget: string) => void;
  setSelectedTag: (tag: string) => void;
  setOnlyTrending: (trending: boolean) => void;
  setSortBy: (sort: 'relevance' | 'impact' | 'title') => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  searchQuery: '',
  selectedField: 'All',
  selectedLevel: 'All',
  selectedDifficulty: 'All',
  selectedBudget: 'All',
  selectedTag: 'All',
  onlyTrending: false,
  sortBy: 'relevance',
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      savedIdeaIds: [],
      toggleBookmark: (id: string) => {
        const current = get().savedIdeaIds;
        const exists = current.includes(id);
        if (exists) {
          set({ savedIdeaIds: current.filter((item) => item !== id) });
        } else {
          set({ savedIdeaIds: [...current, id] });
        }
      },
      isBookmarked: (id: string) => get().savedIdeaIds.includes(id),
      clearBookmarks: () => set({ savedIdeaIds: [] }),

      filters: initialFilters,
      setSearchQuery: (query) =>
        set((state) => ({ filters: { ...state.filters, searchQuery: query } })),
      setSelectedField: (field) =>
        set((state) => ({ filters: { ...state.filters, selectedField: field } })),
      setSelectedLevel: (level) =>
        set((state) => ({ filters: { ...state.filters, selectedLevel: level } })),
      setSelectedDifficulty: (difficulty) =>
        set((state) => ({ filters: { ...state.filters, selectedDifficulty: difficulty } })),
      setSelectedBudget: (budget) =>
        set((state) => ({ filters: { ...state.filters, selectedBudget: budget } })),
      setSelectedTag: (tag) =>
        set((state) => ({ filters: { ...state.filters, selectedTag: tag } })),
      setOnlyTrending: (trending) =>
        set((state) => ({ filters: { ...state.filters, onlyTrending: trending } })),
      setSortBy: (sort) =>
        set((state) => ({ filters: { ...state.filters, sortBy: sort } })),
      resetFilters: () => set({ filters: initialFilters }),
    }),
    {
      name: 'ideaverse_store',
      partialize: (state) => ({ savedIdeaIds: state.savedIdeaIds }),
    }
  )
);
