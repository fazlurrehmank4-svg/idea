export interface Idea {
  id: string;
  title: string;
  field: string;
  subfield: string;
  level: "School" | "Undergraduate" | "Masters" | "PhD" | "Professional" | string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert" | string;
  duration: string;
  description: string;
  objectives: string[];
  techStack: string[];
  resources: string[];
  tags: string[];
  budget: "Low" | "Medium" | "High" | string;
  teamSize: string;
  impactScore: number;
  trending: boolean;
}

export interface FilterState {
  searchQuery: string;
  selectedFields: string[];
  selectedLevels: string[];
  selectedDifficulties: string[];
  selectedBudgets: string[];
  selectedDurations: string[];
  selectedTags: string[];
  sortBy: "popular" | "newest" | "impact" | "title";
}
