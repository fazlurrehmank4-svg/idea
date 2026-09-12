import Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";
import { Idea } from "@/types/idea";
import ideasData from "@/data/ideas.json";

const allIdeas = ideasData as Idea[];

const fuseOptions: IFuseOptions<Idea> = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.3 },
    { name: "tags", weight: 0.15 },
    { name: "subfield", weight: 0.1 },
    { name: "techStack", weight: 0.05 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

const fuse = new Fuse(allIdeas, fuseOptions);

export function searchIdeas(
  query: string,
  options?: {
    fields?: string[];
    levels?: string[];
    difficulties?: string[];
    budgets?: string[];
    tags?: string[];
    sortBy?: "popular" | "newest" | "impact" | "title";
  }
): Idea[] {
  let results: Idea[] = [];

  if (query && query.trim().length > 0) {
    const fuseResults = fuse.search(query.trim());
    results = fuseResults.map((res) => res.item);
  } else {
    results = [...allIdeas];
  }

  // Filter by fields
  if (options?.fields && options.fields.length > 0) {
    results = results.filter((idea) => options.fields!.includes(idea.field));
  }

  // Filter by levels
  if (options?.levels && options.levels.length > 0) {
    results = results.filter((idea) => options.levels!.includes(idea.level));
  }

  // Filter by difficulties
  if (options?.difficulties && options.difficulties.length > 0) {
    results = results.filter((idea) => options.difficulties!.includes(idea.difficulty));
  }

  // Filter by budgets
  if (options?.budgets && options.budgets.length > 0) {
    results = results.filter((idea) => options.budgets!.includes(idea.budget));
  }

  // Filter by tags
  if (options?.tags && options.tags.length > 0) {
    results = results.filter((idea) =>
      options.tags!.some((t) => idea.tags.includes(t))
    );
  }

  // Sorting
  if (options?.sortBy) {
    switch (options.sortBy) {
      case "impact":
        results.sort((a, b) => b.impactScore - a.impactScore);
        break;
      case "title":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "popular":
      default:
        results.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
    }
  }

  return results;
}

export function getIdeaById(id: string): Idea | undefined {
  return allIdeas.find((idea) => idea.id === id);
}

export function getSimilarIdeas(currentIdea: Idea, limit: number = 4): Idea[] {
  return allIdeas
    .filter(
      (idea) =>
        idea.id !== currentIdea.id &&
        (idea.field === currentIdea.field || idea.level === currentIdea.level)
    )
    .sort((a, b) => {
      const matchA = a.tags.filter((t) => currentIdea.tags.includes(t)).length;
      const matchB = b.tags.filter((t) => currentIdea.tags.includes(t)).length;
      return matchB - matchA;
    })
    .slice(0, limit);
}

export function getRandomIdea(): Idea {
  const randomIndex = Math.floor(Math.random() * allIdeas.length);
  return allIdeas[randomIndex];
}
