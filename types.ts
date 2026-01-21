
export interface UserProfile {
  name: string;
  age: number;
  skinType: 'Dry' | 'Oily' | 'Combination' | 'Sensitive' | 'Normal';
  concerns: string[];
}

export interface SkinAnalysis {
  overallScore: number;
  hydration: number;
  clarity: number;
  texture: number;
  tone: number;
  observations: string[];
  primaryConcern: string;
}

export interface RecommendedProduct {
  id: string;
  brand: string;
  name: string;
  category: string;
  benefit: string;
  buyUrl: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  image: string;
  analysis: SkinAnalysis;
}

export interface AppState {
  profile: UserProfile | null;
  image: string | null;
  analysis: SkinAnalysis | null;
  products: RecommendedProduct[];
  isAnalyzing: boolean;
  history: JournalEntry[];
  comparisonIds: [string | null, string | null];
  view: 'analysis' | 'journal' | 'compare';
}
