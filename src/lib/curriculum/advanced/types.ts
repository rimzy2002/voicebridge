// ============================================================
// Advanced C1-C2 Collocation & Register Types (Adv Classes A-J)
// ============================================================

export type AdvancedClassId =
  | 'adv-class-a'
  | 'adv-class-b'
  | 'adv-class-c'
  | 'adv-class-d'
  | 'adv-class-e'
  | 'adv-class-f'
  | 'adv-class-g'
  | 'adv-class-h'
  | 'adv-class-i'
  | 'adv-class-j';

export type AdvancedSkill = 'Writing' | 'Speaking' | 'Research Architecture' | string;
export type CEFRLevel = 'C1' | 'C2';
export type DifficultyLevel = 'Advanced' | 'Mastery';

export interface AdvancedActivity {
  id: string;
  activityNumber: number; // 1 to 10 within class, or 1 to 100 global
  globalNumber: number;
  title: string;
  skill: AdvancedSkill;
  subskill: string;
  cefrLevel: CEFRLevel;
  objective: string;
  instructions: string;
  taskPrompt: string;
  expectedAnswer: string;
  targetCollocation: string;
  difficulty: DifficultyLevel;
  activityType: string;
  justification?: string;
  hint?: string;
  xpReward?: number;
}

export interface AdvancedClass {
  id: AdvancedClassId;
  letter: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
  moduleNumber: number;
  name: string; // e.g. "Adv Class A"
  title: string; // e.g. "Advanced Register & Formality Upgrades"
  theme: string; // e.g. "Register Refinement"
  overview: string;
  linguistNote?: string;
  activitiesCount: number;
  cefrRange: string; // e.g. "C1-C2"
  isReady: boolean;
  activities: AdvancedActivity[];
}
