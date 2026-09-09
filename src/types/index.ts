// ============================================================
// Core Type Definitions — Communication Platform
// ============================================================

// --- Tracks ---
export type LearnerTrack = 'student' | 'professional' | 'general';

// --- Activity Types ---
export type ActivityType =
  | 'welcome'
  | 'goal_selection'
  | 'confidence_check'
  | 'recording'
  | 'timed_speaking'
  | 'framework_lesson'
  | 'framework_practice'
  | 'expansion_activity'
  | 'vocabulary_activation'
  | 'vocabulary_challenge'
  | 'listening_response'
  | 'conversation_simulation'
  | 'retry_comparison'
  | 'reflection'
  | 'mission'
  | 'scorecard'
  | 'multiple_choice_recall'
  | 'rapid_response'
  | 'sentence_builder'
  | 'word_description_game'
  | 'think_in_english'
  | 'pronunciation_lesson'
  | 'pronunciation_practice'
  | 'shadowing'
  | 'filler_awareness'
  | 'pause_challenge'
  | 'story_builder'
  | 'story_order'
  | 'emotion_vocabulary'
  | 'collocation_practice'
  | 'paraphrasing'
  | 'before_after_comparison'
  | 'follow_up_questions'
  | 'conversation_rescue'
  | 'topic_ladder'
  | 'intonation_practice'
  | 'weekly_review'
  | 'weekly_challenge'
  | 'baseline_comparison'
  | 'weekly_report'
  | 'information_display';

// --- Activity Definition (Curriculum Data) ---
export interface ActivityDefinition {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  instructions?: string;
  dayNumber: number;
  order: number;
  durationMinutes?: number;
  isRequired: boolean;
  expressMode: boolean;  // true = included in express mode
  config: ActivityConfig;
  xpReward?: number;
  trackVariants?: {
    student?: Partial<ActivityConfig>;
    professional?: Partial<ActivityConfig>;
    general?: Partial<ActivityConfig>;
  };
}

// --- Activity Config (type-specific) ---
export interface ActivityConfig {
  [key: string]: any;
  // Welcome / Information Display
  content?: string;
  bulletPoints?: string[];
  showProgress?: boolean;

  // Goal Selection
  options?: SelectionOption[];
  allowMultiple?: boolean;
  questionText?: string;

  // Confidence Check
  dimensions?: ConfidenceDimension[];

  // Recording
  prepTimeSeconds?: number;
  speakTimeSeconds?: number;
  prompt?: string;
  promptSuggestions?: string[];
  isBaseline?: boolean;
  label?: string;
  showFrameworkHint?: boolean;
  frameworkHint?: string;
  requirements?: string[];
  maxAttempts?: number;

  // Timed Speaking
  responseTimeSeconds?: number;
  questions?: SpeakingPrompt[];
  startDelaySeconds?: number;

  // Framework Lesson
  frameworkName?: string;
  steps?: FrameworkStep[];
  weakExample?: string;
  strongExample?: string;

  // Vocabulary
  expressions?: VocabularyExpression[];
  requiredUsageCount?: number;

  // Listening
  audioUrl?: string;
  audioText?: string;
  comprehensionQuestions?: ComprehensionQuestion[];
  spokenResponseRequired?: boolean;

  // Conversation
  conversationTopic?: string;
  conversationDuration?: number;
  conversationGoals?: string[];
  aiPersonality?: string;

  // Retry Comparison
  originalActivityId?: string;
  comparisonMetrics?: string[];

  // Reflection
  reflectionQuestions?: ReflectionQuestion[];

  // Mission
  missionDescription?: string;
  missionOptions?: string[];
  suggestedTopic?: string;
  conversationFallback?: boolean;

  // Scorecard
  badgeSlug?: string;
  showPreview?: boolean;
  previewDay?: number;
  previewTitle?: string;

  // Multiple Choice
  recallQuestions?: RecallQuestion[];

  // Sentence Builder
  starterSentence?: string;
  expansionSteps?: string[];

  // Word Description Game
  targetWords?: string[];
  forbiddenWords?: string[][];

  // Story Builder
  storyPrompts?: string[];
  storyFramework?: string;
  sequencingWords?: string[];

  // Pronunciation
  stressExamples?: string[];
  chunkingExamples?: string[];
  intonationExamples?: IntonationExample[];
  shadowingText?: string;

  // Topic Ladder
  ladderTopic?: string;
  ladderLevels?: string[];

  // Before/After Comparison
  beforeActivityId?: string;
  afterActivityId?: string;

  // Weekly
  weekNumber?: number;
  challengeStages?: ChallengeStage[];
  dayRange?: [number, number];
}

// --- Supporting Types ---
export interface SelectionOption {
  id: string;
  label: string;
  icon?: string;
  category?: string;
}

export interface ConfidenceDimension {
  id: string;
  label: string;
  min?: number;
  max?: number;
}

export interface SpeakingPrompt {
  id: string;
  text: string;
  category?: string;
  track?: LearnerTrack;
}

export interface FrameworkStep {
  letter?: string;
  name?: string;
  title?: string;
  description: string;
  example?: string;
  [key: string]: any;
}

export interface VocabularyExpression {
  expression: string;
  meaning?: string;
  instead_of?: string;
  example: string;
  category?: string;
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'spoken' | 'text';
  options?: string[];
  correctAnswer?: string;
}

export interface ReflectionQuestion {
  id: string;
  question: string;
  type: 'scale' | 'multiple_choice' | 'text';
  options?: string[];
  min?: number;
  max?: number;
}

export interface RecallQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  explanation?: string;
}

export interface IntonationExample {
  text: string;
  pattern: string;
  emotion?: string;
}

export interface ChallengeStage {
  id: string;
  name: string;
  description: string;
  durationSeconds?: number;
}

// --- Day Definition ---
export interface DayDefinition {
  dayNumber: number;
  title: string;
  subtitle?: string;
  objective: string;
  coreMessage?: string;
  estimatedMinutes: { full: number; express: number };
  previousDaySummary?: string;
  todayGoals: string[];
  activities: ActivityDefinition[];
  badges?: string[];  // badge slugs awarded on completion
  previewNextDay?: { title: string; dayNumber: number };
  week: number;
}

// --- Speech Analysis Result ---
export interface SpeechAnalysisResult {
  wordCount: number | null;
  speakingDuration: number | null;
  wordsPerMinute: number | null;
  responseStartDelay: number | null;
  fillerCount: number | null;
  fillerWords: Record<string, number> | null;
  longPauseCount: number | null;
  uniqueWordCount: number | null;
  vocabularyDiversity: number | null;
  repeatedWords: Record<string, number> | null;
  fluencyRating: number | null;
  structureRating: number | null;
  vocabularyRating: number | null;
  grammarRating: number | null;
  clarityRating: number | null;
  confidenceRating: number | null;
  grammarPatterns: string[] | null;
  pronunciationNotes: string[] | null;
  strengths: string[];
  improvements: string[];
  corrections: CorrectionItem[];
  provider: string;
  providerVersion?: string;
}

export interface CorrectionItem {
  original: string;
  corrected: string;
  explanation: string;
  category: 'grammar' | 'vocabulary' | 'pronunciation' | 'structure';
}

// --- AI Feedback ---
export interface AIFeedback {
  whatWorked: string;
  mainCorrection: CorrectionItem | null;
  vocabularyUpgrade: { original: string; upgrade: string; context: string } | null;
  speakingImprovement: string;
  retryGoal: string;
  observations?: string[];
}

// --- Retry Comparison ---
export interface RetryComparisonResult {
  attempt1: Partial<SpeechAnalysisResult>;
  attempt2: Partial<SpeechAnalysisResult>;
  improvements: { metric: string; before: number | string; after: number | string; improved: boolean }[];
  summary: string;
}

// --- XP Transaction ---
export interface XpTransaction {
  amount: number;
  source: XpSource;
  sourceId?: string;
  description?: string;
  dayNumber?: number;
}

export type XpSource =
  | 'activity_completed'
  | 'recording_completed'
  | 'retry_completed'
  | 'badge_awarded'
  | 'mission_completed'
  | 'day_completed'
  | 'week_completed'
  | 'streak_bonus'
  | 'vocabulary_activated';

// --- Badge Definition ---
export interface BadgeDefinition {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: 'completion' | 'skill' | 'milestone' | 'special';
  dayRequired?: number;
}

// --- Vocabulary Lifecycle ---
export type VocabularyStatus =
  | 'discovered'
  | 'understood'
  | 'recognized'
  | 'completed'
  | 'produced'
  | 'spoken'
  | 'recycled'
  | 'active';

// --- Skill Dimensions ---
export interface SkillProfile {
  fluency: number | null;
  vocabulary: number | null;
  grammar: number | null;
  pronunciation: number | null;
  structure: number | null;
  conversation: number | null;
  listening: number | null;
  confidence: number | null;
  storytelling: number | null;
}

// --- Day Progress Summary ---
export interface DayProgressSummary {
  dayNumber: number;
  status: 'not_started' | 'in_progress' | 'completed';
  completedActivities: number;
  totalActivities: number;
  speakingMinutes: number;
  xpEarned: number;
  completedAt?: Date;
}

// --- Weekly Report ---
export interface WeeklyReport {
  weekNumber: number;
  overallScore: number | null;
  strongestArea: string | null;
  primaryWeakness: string | null;
  secondaryWeakness: string | null;
  recommendations: string[];
  baselineComparison: BaselineComparison | null;
  vocabularyStats: { active: number; total: number };
  pronunciationFocus: string[];
  nextWeekPriorities: string[];
  confidenceChange: { start: number; end: number } | null;
}

export interface BaselineComparison {
  day1RecordingId: string;
  day7RecordingId: string;
  metrics: {
    metric: string;
    day1Value: number | string | null;
    day7Value: number | string | null;
    improved: boolean | null;
  }[];
}

// --- Analytics Events ---
export type AnalyticsEvent =
  | 'day_started'
  | 'activity_started'
  | 'recording_started'
  | 'recording_completed'
  | 'recording_uploaded'
  | 'transcript_completed'
  | 'analysis_completed'
  | 'feedback_viewed'
  | 'retry_started'
  | 'retry_completed'
  | 'mission_completed'
  | 'activity_completed'
  | 'day_completed'
  | 'streak_updated'
  | 'badge_awarded'
  | 'week_completed'
  | 'week2_unlocked';
