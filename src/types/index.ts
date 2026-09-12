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
  | 'information_display'
  // Week 2 Activities
  | 'opinion_builder'
  | 'agreement_disagreement'
  | 'counterargument'
  | 'devil_advocate'
  | 'connector_activation'
  | 'lexical_chunk_activation'
  | 'structural_expansion'
  | 'sentence_surgery'
  | 'paraphrase_multi_round'
  | 'summary_reconstruction'
  | 'retelling_321'
  | 'dictogloss'
  | 'discourse_marker_detection'
  | 'listening_speed_adaptation'
  | 'impromptu_prompt'
  | 'five_second_prompt'
  | 'story_cube'
  | 'rubber_duck'
  | 'conditional_scenario'
  | 'consequence_builder'
  | 'elevator_pitch_rotation'
  | 'mini_presentation'
  | 'weekly_diagnostic_v2'
  // Week 3 Activities — Professional Communication
  | 'professional_small_talk'
  | 'networking_roleplay'
  | 'meeting_simulation'
  | 'meeting_contribution'
  | 'polite_interruption'
  | 'interview_simulation'
  | 'star_response'
  | 'elevator_pitch_pro'
  | 'presentation_qa'
  | 'data_narration'
  | 'constructive_feedback'
  | 'sbi_feedback'
  | 'difficult_conversation'
  | 'apology_explanation'
  | 'negotiation_roleplay'
  | 'email_to_voice'
  | 'register_switch'
  | 'hostile_question'
  | 'professional_weekly_diagnostic'
  | 'midpoint_confidence_snapshot'
  // Week 4 Activities — Advanced Communication (Days 22–30)
  // Day 22: Explain Complex Ideas Simply
  | 'complexity_reduction'
  | 'jargon_detector'
  | 'audience_adaptation'
  | 'analogy_builder'
  | 'circumlocution_recycle'
  | 'listener_check'
  | 'ai_confusion_simulation'
  | 'explanation_scorecard'
  // Day 23: Persuade with Reasons, Evidence and Respect
  | 'persuasion_structure'
  | 'evidence_vs_opinion'
  | 'objection_handling'
  | 'persuasion_calibration'
  | 'compare_options'
  | 'persuasive_pitch_rotation'
  | 'persuasion_simulation'
  | 'persuasion_scorecard'
  // Day 24: Leadership Communication
  | 'leadership_framework'
  | 'delegation_drill'
  | 'decision_explanation'
  | 'direction_uncertainty'
  | 'practical_motivation'
  | 'listening_leadership'
  | 'decision_meeting'
  | 'leadership_simulation'
  | 'leadership_scorecard'
  // Day 25: Nuance, Hedging and Diplomacy
  | 'certainty_scale'
  | 'hedging_drill'
  | 'diplomatic_disagreement'
  | 'understatement_awareness'
  | 'tone_detection'
  | 'sarcasm_awareness'
  | 'rewrite_direct_message'
  | 'nuance_roleplay'
  | 'nuance_scorecard'
  // Day 26: Debate and Defend Ideas
  | 'argument_structure'
  | 'steelman_activity'
  | 'evidence_challenge'
  | 'logical_connection'
  | 'debate_language'
  | 'timed_argument'
  | 'debate_simulation'
  | 'debate_scorecard'
  // Day 27: Handle Tough Questions and Pressure
  | 'thinking_pause'
  | 'clarify_question'
  | 'answer_what_you_know'
  | 'hostile_conversion'
  | 'multipart_question'
  | 'redirect_avoiding'
  | 'rapid_qa'
  | 'high_pressure_simulation'
  | 'tough_question_scorecard'
  // Day 28: Advanced Listening and Reactive Communication
  | 'discourse_markers'
  | 'tone_cues'
  | 'prediction_pause'
  | 'global_english'
  | 'fast_listening'
  | 'listen_summarize_react'
  | 'meeting_listening'
  | 'advanced_listening_challenge'
  | 'listening_scorecard'
  // Day 29: Final Rehearsal: Independent Communication (No Hints)
  | 'independent_priority_warmup'
  | 'independent_impromptu'
  | 'independent_story'
  | 'independent_listening'
  | 'independent_persuasion'
  | 'independent_difficult_convo'
  | 'independent_presentation'
  | 'communication_rescue'
  | 'personalized_error_review'
  | 'pronunciation_priority_review'
  | 'active_vocab_spontaneous'
  // Day 30: Final Communication Transformation Assessment
  | 'final_confidence_assessment'
  | 'baseline_repeat'
  | 'side_by_side_comparison'
  | 'objective_metrics_comparison'
  | 'final_fluency_challenge'
  | 'final_structured_opinion'
  | 'final_story_experience'
  | 'final_listening'
  | 'final_vocab_activation'
  | 'final_pronunciation_clarity'
  | 'final_track_challenge'
  | 'final_persuasion'
  | 'final_tough_question'
  | 'final_integrated_simulation'
  | 'final_communication_scorecard'
  | 'final_transformation_report'
  | 'personal_phrasebook'
  | 'post_program_plan'
  | 'final_mission';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  questions?: (SpeakingPrompt | string)[];
  prompts?: string[];
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // Week 3 Professional Dimensions
  professionalClarity: number | null;
  meetingParticipation: number | null;
  interviewStructure: number | null;
  dataExplanation: number | null;
  feedbackDelivery: number | null;
  negotiation: number | null;
  registerAdaptation: number | null;
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
  | 'week2_unlocked'
  | 'week3_unlocked'
  | 'week4_unlocked';

// ============================================================
// Week 2 Fluency Metrics & Queryable Data
// ============================================================

export interface Week2FluencyMetrics {
  id?: string;
  attemptId?: string;
  userId?: string;
  dayNumber: number;

  // Opinion & Disagreement (Day 8)
  opinionPositionClarity?: number;     // 1-10
  supportingReasonsCount?: number;     // count
  examplesEvidenceScore?: number;      // 1-10
  counterargumentResponseScore?: number; // 1-10
  agreementStyle?: 'strong' | 'moderate' | 'partial' | 'qualified' | 'disagree' | 'none';

  // Connectors & Structure (Day 9)
  connectorDiversity?: number;         // ratio of unique connectors used
  connectorAppropriateness?: number;   // 1-10
  paraphraseAttempts?: number;         // count
  cleftSentencesUsed?: number;         // count
  parallelStructureScore?: number;     // 1-10

  // Listening & Retelling (Day 10)
  summaryAccuracy?: number;            // 1-10
  keyDetailRetention?: number;         // percentage 0-100
  discourseMarkerRecognition?: number; // percentage 0-100
  dictoglossAccuracy?: number;         // percentage 0-100

  // Spontaneous Speaking (Day 11)
  impromptuStartDelay?: number;        // seconds
  ideaContinuity?: number;             // 1-10
  pauseCount?: number;                 // count
  fillerRate?: number;                 // count / min

  // Difficult Situations (Day 12)
  conditionalStructureScore?: number;  // 1-10
  consequenceClarity?: number;         // 1-10
  politenessDiplomacy?: number;        // 1-10

  // Presentations (Day 13)
  presentationOrganization?: number;   // 1-10
  signpostingScore?: number;           // 1-10
  audienceAdaptationScore?: number;    // 1-10
  questionHandlingScore?: number;      // 1-10

  createdAt?: string;
}

export interface PriorityItem {
  id: string;
  title: string;
  description: string;
  focusArea: string;
  recommendedAction: string;
  status: 'active' | 'improving' | 'resolved';
}

export interface PitchRound {
  targetSeconds: number;
  label: string;
  guidance: string;
}

export interface StoryCubeOption {
  word: string;
  category: 'object' | 'person' | 'place' | 'concept';
  icon?: string;
}

// ============================================================
// Week 3 Professional Communication Types
// ============================================================

export type RoleplayDifficulty = 'supportive' | 'realistic' | 'challenging';

export type RoleplayRole =
  | 'manager'
  | 'interviewer'
  | 'client'
  | 'coworker'
  | 'professor'
  | 'classmate'
  | 'customer'
  | 'event_participant'
  | 'stakeholder';

export interface RoleplayConfig {
  role: RoleplayRole;
  learnerTrack: LearnerTrack;
  scenario: string;
  objective: string;
  hiddenAIGoals?: string[];
  difficulty: RoleplayDifficulty;
  tone: 'formal' | 'neutral' | 'casual';
  requiredEvents?: string[];
  maxChallenge?: number;
  successCriteria?: string[];
  allowedHints?: number;
  scoringRubric?: string[];
  followUpStrategy?: 'adaptive' | 'sequential' | 'random';
  maxDurationSeconds?: number;
}

export interface MeetingScorecard {
  participation: number | null;
  conciseUpdates: number | null;
  usefulQuestions: number | null;
  agreement: number | null;
  disagreement: number | null;
  interruptionAppropriateness: number | null;
  clarification: number | null;
  actionSummary: number | null;
  conversationBalance: number | null;
  clarity: number | null;
}

export interface InterviewScorecard {
  relevance: number | null;
  structure: number | null;
  evidence: number | null;
  concision: number | null;
  starCompleteness: number | null;
  vocabulary: number | null;
  clarity: number | null;
  recovery: number | null;
  confidenceBehavior: number | null;
}

export interface PresentationScorecard {
  structure: number | null;
  signposting: number | null;
  dataAccuracy: number | null;
  vocabulary: number | null;
  factInferenceDistinction: number | null;
  audienceAdaptation: number | null;
  delivery: number | null;
  qaHandling: number | null;
}

export interface NegotiationState {
  proposals: string[];
  counterProposals: string[];
  compromises: string[];
  finalAgreement: string | null;
  alternativesExplored: number;
  tradeOffsIdentified: number;
  languageScore: number | null;
}

export interface EmailScenario {
  id: string;
  subject: string;
  from: string;
  body: string;
  context: string;
  expectedAction: string;
  register: 'formal' | 'neutral' | 'casual';
  track: LearnerTrack;
  hasAmbiguity?: boolean;
  missingInfo?: string[];
}

export interface Week3ProfessionalMetrics {
  id?: string;
  userId?: string;
  dayNumber: number;

  // Networking (Day 15)
  professionalIntroduction?: number;         // 1-10
  elevatorPitchClarity?: number;             // 1-10
  smallTalkOpening?: number;                 // 1-10
  followUpRelevance?: number;                // 1-10
  conversationClosing?: number;              // 1-10

  // Meetings (Day 16)
  meetingContributionCount?: number;         // count
  updateClarity?: number;                    // 1-10
  politeInterruption?: number;               // 1-10
  clarificationSkill?: number;               // 1-10
  actionItemSummary?: number;                // 1-10

  // Interviews (Day 17)
  interviewRelevance?: number;               // 1-10
  starCompleteness?: number;                 // 1-10
  evidenceSpecificity?: number;              // 1-10

  // Presentations (Day 18)
  presentationOrganization?: number;         // 1-10
  dataDescriptionAccuracy?: number;          // 1-10
  factInferenceDistinction?: number;         // 1-10
  qaHandling?: number;                       // 1-10

  // Feedback & Difficult Conversations (Day 19)
  feedbackSpecificity?: number;              // 1-10
  sbiComponents?: number;                    // 0-3 (S, B, I)
  apologyAccountability?: number;            // 1-10
  requestClarity?: number;                   // 1-10

  // Email-to-Voice & Negotiation (Day 20)
  registerAdaptation?: number;               // 1-10
  messageSummary?: number;                   // 1-10
  actionExtraction?: number;                 // 1-10
  negotiationAlternatives?: number;          // count
  compromiseSkill?: number;                  // 1-10
  agreementSummary?: number;                 // 1-10

  // Overall (Day 21)
  professionalConfidence?: number;           // 1-10

  createdAt?: string;
}

export interface DataPoint {
  label: string;
  value: number;
  unit?: string;
}

export interface ChartData {
  title: string;
  type: 'bar' | 'line' | 'comparison';
  dataPoints: DataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

// ============================================================
// Week 4 Advanced Communication & Day 30 Models
// ============================================================

export interface PersuasionMetrics {
  recommendationClarity: number;             // 1-10
  supportingReasons: number;                 // count / quality
  evidenceUse: number;                       // 1-10
  limitationAcknowledgement: number;         // 1-10
  objectionHandling: number;                 // 1-10
  qualification: number;                     // 1-10
  actionRequest: number;                     // 1-10
  calibratedTone: number;                    // 1-10
}

export interface LeadershipMetrics {
  priorityClarity: number;                   // 1-10
  delegation: number;                        // 1-10
  decisionExplanation: number;               // 1-10
  listening: number;                         // 1-10
  accountability: number;                    // 1-10
  summary: number;                           // 1-10
  directionUnderUncertainty: number;         // 1-10
  practicalMotivation: number;               // 1-10
}

export interface NuanceMetrics {
  hedgingAppropriateness: number;            // 1-10
  certaintyCalibration: number;              // 1-10
  qualifiedAgreement: number;                // 1-10
  diplomaticDisagreement: number;            // 1-10
  understatementAwareness: number;           // 1-10
}

export interface DebateMetrics {
  argumentClarity: number;                   // 1-10
  relevance: number;                         // 1-10
  evidenceQuality: number;                   // 1-10
  listeningAndSteelman: number;              // 1-10
  counterargumentHandling: number;           // 1-10
  respectfulTone: number;                    // 1-10
  logicalCoherence: number;                  // 1-10
  conclusionImpact: number;                  // 1-10
}

export interface ToughQuestionMetrics {
  responseStartDelay: number;                // seconds
  composureBehavior: number;                 // 1-10
  questionComprehension: number;             // 1-10
  clarificationSkill: number;                // 1-10
  honestyAboutUncertainty: number;           // 1-10
  multipartHandling: number;                 // 1-10
  redirectionWithoutEvasion: number;         // 1-10
  fillerControl: number;                     // 1-10
}

export interface AdvancedListeningMetrics {
  mainIdeaExtraction: number;                // 1-10
  speakerStanceIdentification: number;       // 1-10
  detailAccuracy: number;                    // 1-10
  actionItemExtraction: number;              // 1-10
  toneInference: number;                     // 1-10
  spokenSummaryClarity: number;              // 1-10
  responseRelevance: number;                 // 1-10
}

export interface IndependentMetrics {
  hintDependency: number;                    // 0 = completely independent, 1+ = hints used
  spontaneousFluency: number;                // 1-10
  structuralContinuity: number;              // 1-10
  recoveryFromDistraction: number;           // 1-10
}

export interface AdvancedCommunicationAttempt {
  id?: string;
  userId?: string;
  activityType: ActivityType;
  scenarioId?: string;
  learnerTrack: LearnerTrack;
  difficulty?: 'standard' | 'advanced' | 'unassisted';
  speakingDuration: number;
  startDelay: number;
  interruptions?: number;
  hintCount: number;
  independentCompletion: boolean;
  communicationMetrics?: Record<string, number | string | boolean>;
  feedback?: Record<string, unknown>;
  retryAttemptId?: string;
  createdAt?: string;
}

export interface SideBySideComparisonData {
  day1AudioUrl?: string;
  day30AudioUrl?: string;
  day1Transcript?: string;
  day30Transcript?: string;
  metrics: {
    speakingDuration: { day1: number; day30: number; unit: string };
    responseStartDelay: { day1: number; day30: number; unit: string };
    longPausesCount: { day1: number; day30: number; unit: string };
    fillerRatePerMin: { day1: number; day30: number; unit: string };
    structureScore: { day1: number; day30: number; unit: string };
    vocabularyRange: { day1: number; day30: number; unit: string };
    activeExpressionsUsed: { day1: number; day30: number; unit: string };
    pronunciationClarity: { day1: number; day30: number; unit: string };
    confidenceRating: { day1: number; day30: number; unit: string };
  };
  selfAssessment?: {
    strongerRecording: 'day1' | 'day30' | 'similar';
    selectedChanges: string[];
    learnerNotes?: string;
  };
  honestContextNotes?: string[];
}

export interface PersonalErrorPortfolioItem {
  id: string;
  category: 'grammar' | 'preposition' | 'collocation' | 'filler' | 'structure';
  recurringPattern: string;
  exampleFromSpeech: string;
  betterVersion: string;
  practiceSuggestion: string;
}

export interface PersonalPronunciationProfile {
  strong: string[];
  developing: string[];
  priority: string[];
  intelligibilityScore: number;              // 1-10
  rhythmAndChunking: number;                 // 1-10
  pausePlacement: number;                    // 1-10
}

export interface PersonalVocabularyReport {
  expressionsDiscovered: number;
  practicingCount: number;
  activeCount: number;
  mostUsedExpressions: string[];
  needingRecycling: string[];
}

export type PhrasebookFunction =
  | 'Opinions'
  | 'Explanations'
  | 'Examples'
  | 'Agreement'
  | 'Disagreement'
  | 'Clarification'
  | 'Meetings'
  | 'Presentations'
  | 'Interviews'
  | 'Difficult Conversations'
  | 'Negotiation'
  | 'Conclusions';

export interface PhrasebookItem {
  id: string;
  phrase: string;
  functionCategory: PhrasebookFunction;
  context: string;
  originalDay: number;
  exampleInContext: string;
  mastered: boolean;
}

export interface PersonalPhrasebook {
  totalItems: number;
  categories: Record<PhrasebookFunction, PhrasebookItem[]>;
}

export interface PostProgramPlan {
  learnerId?: string;
  primaryGoal: string;
  secondaryGoal?: string;
  recommendedWeeklySchedule: {
    speakingSessionsPerWeek: number;
    listeningSessionsPerWeek: number;
    trackSimulationsPerWeek: number;
    vocabularyRecyclingPerWeek: number;
    checkpointsPerWeek: number;
  };
  phase1_Next30Days: string[];
  phase2_Days31To60: string[];
  phase3_Days61To90: string[];
  realWorldContinuationGoal: string;
  nextReviewDate: string;
}

export interface FinalAssessmentSnapshot {
  dayNumber: 1 | 7 | 14 | 21 | 30;
  fluency: number;
  ideaStructure: number;
  conversation: number;
  storytelling: number;
  vocabulary: number;
  grammarWhileSpeaking: number;
  pronunciationClarity: number;
  listening: number;
  spontaneousSpeaking: number;
  trackCommunication: number;
  persuasion: number;
  communicationRecovery: number;
  independentPerformance: number;
  confidenceBehavior: number;
  overallScore: number;
}

export interface FinalAssessment {
  id?: string;
  learnerId?: string;
  baselineRecordingId?: string;
  finalRecordingId?: string;
  snapshots: {
    day1: FinalAssessmentSnapshot;
    day7: FinalAssessmentSnapshot;
    day14: FinalAssessmentSnapshot;
    day21: FinalAssessmentSnapshot;
    day30: FinalAssessmentSnapshot;
  };
  sideBySideComparison: SideBySideComparisonData;
  strongestImprovement: {
    dimension: string;
    evidence: string;
    baselineValue: number | string;
    finalValue: number | string;
  };
  secondaryImprovements: string[];
  mainContinuingPriority: {
    area: string;
    evidence: string;
    recommendedAction: string;
  };
  overallProgramScore: number;               // 1-100 progress score
  completedAt: string;
}

export interface FinalReportData {
  learnerName?: string;
  track: LearnerTrack;
  completedDays: number;
  speakingDays: number;
  totalSpeakingMinutes: number;
  recordingsCompleted: number;
  conversationsHeld: number;
  presentationsGiven: number;
  storiesTold: number;
  simulationsCompleted: number;
  listeningActivitiesCompleted: number;
  realWorldMissionsCompleted: number;
  vocabularyActivatedCount: number;
  longestResponseSeconds: number;
  streakDays: number;
  earnedXp: number;
  assessment: FinalAssessment;
  phrasebook: PersonalPhrasebook;
  errorPortfolio: PersonalErrorPortfolioItem[];
  pronunciationProfile: PersonalPronunciationProfile;
  vocabularyReport: PersonalVocabularyReport;
  continuationPlan: PostProgramPlan;
  finalReflection: {
    whatChangedMost: string;
    mostHelpfulActivity: string;
    hardestProblem: string;
    newCapability: string;
    outsideUsage: string;
    futureFocus: string;
    finalConfidenceRating: number;
  };
}


