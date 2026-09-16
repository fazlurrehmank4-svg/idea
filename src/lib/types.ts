export type AcademicLevel = 'School' | 'Undergraduate' | 'Masters' | 'PhD' | 'Professional';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type BudgetLevel = 'Low' | 'Medium' | 'High';

export interface Idea {
  id: string;
  title: string;
  field: string;
  subfield: string;
  level: AcademicLevel;
  difficulty: DifficultyLevel;
  duration: string;
  description: string;
  objectives: string[];
  techStack: string[];
  resources: string[];
  tags: string[];
  budget: BudgetLevel;
  teamSize: string;
  impactScore: number;
  trending: boolean;
}

export interface FilterState {
  searchQuery: string;
  selectedField: string;
  selectedLevel: string;
  selectedDifficulty: string;
  selectedBudget: string;
  selectedTag: string;
  onlyTrending: boolean;
  sortBy: 'relevance' | 'impact' | 'title';
}
