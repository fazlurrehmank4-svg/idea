import Fuse from 'fuse.js';
import { Idea, FilterState } from './types';

export function createFuseInstance(ideas: Idea[]) {
  return new Fuse(ideas, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'description', weight: 0.25 },
      { name: 'tags', weight: 0.15 },
      { name: 'subfield', weight: 0.1 },
      { name: 'techStack', weight: 0.1 },
    ],
    threshold: 0.3,
    ignoreLocation: true,
  });
}

export function filterAndSortIdeas(ideas: Idea[], filters: FilterState, fuse: Fuse<Idea> | null): Idea[] {
  let result = ideas;

  if (filters.searchQuery.trim() !== '') {
    if (fuse) {
      const fuseResults = fuse.search(filters.searchQuery);
      result = fuseResults.map((r) => r.item);
    } else {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
  }

  if (filters.selectedField && filters.selectedField !== 'All') {
    result = result.filter((i) => i.field === filters.selectedField);
  }

  if (filters.selectedLevel && filters.selectedLevel !== 'All') {
    result = result.filter((i) => i.level === filters.selectedLevel);
  }

  if (filters.selectedDifficulty && filters.selectedDifficulty !== 'All') {
    result = result.filter((i) => i.difficulty === filters.selectedDifficulty);
  }

  if (filters.selectedBudget && filters.selectedBudget !== 'All') {
    result = result.filter((i) => i.budget === filters.selectedBudget);
  }

  if (filters.selectedTag && filters.selectedTag !== 'All') {
    result = result.filter((i) => i.tags.includes(filters.selectedTag));
  }

  if (filters.onlyTrending) {
    result = result.filter((i) => i.trending);
  }

  if (filters.sortBy === 'impact') {
    result = [...result].sort((a, b) => b.impactScore - a.impactScore);
  } else if (filters.sortBy === 'title') {
    result = [...result].sort((a, b) => a.title.localeCompare(b.title));
  }

  return result;
}
