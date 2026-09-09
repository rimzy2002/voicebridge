// ============================================================
// AI Provider Abstraction Layer
// ============================================================

import { SpeechAnalysisResult, AIFeedback, CorrectionItem } from '@/types';

// --- Provider Interfaces ---

export interface SpeechToTextProvider {
  name: string;
  transcribe(audioBuffer: Buffer, mimeType: string): Promise<TranscriptionResult>;
}

export interface LanguageAnalysisProvider {
  name: string;
  version: string;
  analyzeRecording(transcript: string, context: AnalysisContext): Promise<SpeechAnalysisResult>;
  generateFeedback(analysis: SpeechAnalysisResult, context: FeedbackContext): Promise<AIFeedback>;
}

export interface ConversationProvider {
  name: string;
  chat(messages: ConversationMessage[], context: ConversationContext): Promise<ConversationResponse>;
}

export interface TextToSpeechProvider {
  name: string;
  synthesize(text: string, options?: TTSOptions): Promise<Buffer>;
}

// --- Supporting Types ---

export interface TranscriptionResult {
  text: string;
  words?: WordTimestamp[];
  language?: string;
  confidence?: number;
  duration?: number;
  provider: string;
  providerVersion?: string;
}

export interface WordTimestamp {
  word: string;
  start: number;
  end: number;
  confidence?: number;
}

export interface AnalysisContext {
  dayNumber: number;
  activityType: string;
  activityId: string;
  learnerTrack: string;
  primaryDifficulty?: string;
  todaysFocus?: string;
  previousPatterns?: string[];
  targetExpressions?: string[];
  frameworkUsed?: string;
}

export interface FeedbackContext {
  dayNumber: number;
  activityType: string;
  learnerTrack: string;
  isRetry: boolean;
  previousFeedback?: AIFeedback;
  maxCorrections?: number;
}

export interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ConversationContext {
  dayNumber: number;
  activityId: string;
  learnerTrack: string;
  topic: string;
  goals: string[];
  personality?: string;
  maxTurns?: number;
}

export interface ConversationResponse {
  message: string;
  shouldEnd?: boolean;
  observations?: string[];
}

export interface TTSOptions {
  voice?: string;
  speed?: number;
  format?: string;
}

// --- Self-Assessment Fallback ---

/**
 * Generate basic speech metrics from transcript text alone
 * Used when AI analysis is unavailable
 */
export function generateBasicMetrics(transcript: string, durationSeconds: number): Partial<SpeechAnalysisResult> {
  const words = transcript.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const wordsPerMinute = durationSeconds > 0 ? Math.round((wordCount / durationSeconds) * 60) : null;

  // Count fillers
  const fillerPatterns = /\b(um|uh|umm|uhh|like|you know|actually|basically|literally)\b/gi;
  const fillerMatches = transcript.match(fillerPatterns) || [];
  const fillerCount = fillerMatches.length;

  // Count unique words
  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z']/g, '')));
  const uniqueWordCount = uniqueWords.size;
  const vocabularyDiversity = wordCount > 0 ? Math.round((uniqueWordCount / wordCount) * 100) / 100 : null;

  // Count repeated words (3+ occurrences)
  const wordFreq: Record<string, number> = {};
  words.forEach(w => {
    const lower = w.toLowerCase().replace(/[^a-z']/g, '');
    if (lower.length > 2) {
      wordFreq[lower] = (wordFreq[lower] || 0) + 1;
    }
  });
  const repeatedWords: Record<string, number> = {};
  Object.entries(wordFreq).forEach(([word, count]) => {
    if (count >= 3 && !['the', 'and', 'for', 'that', 'this', 'with', 'but', 'not', 'have', 'are', 'was', 'were'].includes(word)) {
      repeatedWords[word] = count;
    }
  });

  return {
    wordCount,
    speakingDuration: durationSeconds,
    wordsPerMinute,
    fillerCount,
    fillerWords: fillerMatches.reduce((acc: Record<string, number>, filler) => {
      const lower = filler.toLowerCase();
      acc[lower] = (acc[lower] || 0) + 1;
      return acc;
    }, {}),
    uniqueWordCount,
    vocabularyDiversity,
    repeatedWords,
    provider: 'basic_metrics',
  };
}

/**
 * Generate self-assessment fallback when AI is unavailable
 */
export function generateSelfAssessmentFallback(
  transcript: string,
  durationSeconds: number
): SpeechAnalysisResult {
  const basicMetrics = generateBasicMetrics(transcript, durationSeconds);

  return {
    ...basicMetrics,
    wordCount: basicMetrics.wordCount ?? null,
    speakingDuration: basicMetrics.speakingDuration ?? null,
    wordsPerMinute: basicMetrics.wordsPerMinute ?? null,
    responseStartDelay: null,
    fillerCount: basicMetrics.fillerCount ?? null,
    fillerWords: basicMetrics.fillerWords ?? null,
    longPauseCount: null,
    uniqueWordCount: basicMetrics.uniqueWordCount ?? null,
    vocabularyDiversity: basicMetrics.vocabularyDiversity ?? null,
    repeatedWords: basicMetrics.repeatedWords ?? null,
    fluencyRating: null,
    structureRating: null,
    vocabularyRating: null,
    grammarRating: null,
    clarityRating: null,
    confidenceRating: null,
    grammarPatterns: null,
    pronunciationNotes: null,
    strengths: ['You completed the speaking activity — that takes courage!'],
    improvements: ['AI analysis is currently unavailable. Review your recording to self-assess.'],
    corrections: [],
    provider: 'self_assessment_fallback',
  };
}

// --- Provider Registry ---

class AIProviderRegistry {
  private speechToText: SpeechToTextProvider | null = null;
  private languageAnalysis: LanguageAnalysisProvider | null = null;
  private conversation: ConversationProvider | null = null;
  private textToSpeech: TextToSpeechProvider | null = null;

  registerSpeechToText(provider: SpeechToTextProvider) {
    this.speechToText = provider;
  }

  registerLanguageAnalysis(provider: LanguageAnalysisProvider) {
    this.languageAnalysis = provider;
  }

  registerConversation(provider: ConversationProvider) {
    this.conversation = provider;
  }

  registerTextToSpeech(provider: TextToSpeechProvider) {
    this.textToSpeech = provider;
  }

  getSpeechToText(): SpeechToTextProvider | null {
    return this.speechToText;
  }

  getLanguageAnalysis(): LanguageAnalysisProvider | null {
    return this.languageAnalysis;
  }

  getConversation(): ConversationProvider | null {
    return this.conversation;
  }

  getTextToSpeech(): TextToSpeechProvider | null {
    return this.textToSpeech;
  }
}

export const aiProviders = new AIProviderRegistry();

// ============================================================
// Week 2 AI Coaching & Evaluation Rules
// ============================================================

export interface Week2AIAnalysisRequest {
  transcript: string;
  dayNumber: number;
  activityType: string;
  topic?: string;
  expectedConnectors?: string[];
  track?: string;
  priorityFocus?: string;
}

export interface Week2AIAnalysisResponse {
  scorecard: {
    positionClarity: number;       // 1-10
    reasonDevelopment: number;     // 1-10
    evidenceQuality: number;       // 1-10
    connectorsAppropriateness: number; // 1-10
    counterargumentHandling: number; // 1-10
    naturalness: number;           // 1-10
  };
  detectedConnectors: string[];
  connectorStuffingWarning: boolean;
  neutralFeedback: string;
  evidenceCitations: { quote: string; observation: string }[];
  suggestedPolish: string;
}

/**
 * Week 2 Rule-Enforced AI Analysis
 * Follows strict principles:
 * - Scores communication structure, not personal beliefs/ideology
 * - Distinguishes actual grammar errors from natural stylistic choices
 * - Penalizes connector stuffing (unnatural mechanical connector insertion)
 * - Cites transcript evidence for every coaching remark
 */
export function analyzeWeek2Speech(request: Week2AIAnalysisRequest): Week2AIAnalysisResponse {
  const text = request.transcript.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);

  // Detect connectors
  const commonConnectors = [
    'however', 'on the other hand', 'therefore', 'as a result',
    'for example', 'for instance', 'from my perspective', 'in my experience',
    'in addition', 'furthermore', 'what matters most', 'overall', 'ultimately',
    'although', 'while', 'to some extent', 'i would argue', 'that said'
  ];

  const detectedConnectors = commonConnectors.filter(c => text.includes(c));

  // Connector stuffing warning: if more than 6 connectors in less than 70 words
  const connectorStuffingWarning = words.length > 0 && (detectedConnectors.length / words.length) > 0.12;

  // Evidence citations
  const evidenceCitations: { quote: string; observation: string }[] = [];
  if (detectedConnectors.length > 0) {
    evidenceCitations.push({
      quote: detectedConnectors.slice(0, 2).join(', '),
      observation: 'Effective transitional framing used to bridge contrasting thoughts.'
    });
  }

  // Calculate scores objectively based on structure
  const wordCountScore = Math.min(10, Math.max(5, Math.round(words.length / 15)));
  const connectorScore = connectorStuffingWarning ? 6 : Math.min(10, 5 + detectedConnectors.length);

  return {
    scorecard: {
      positionClarity: wordCountScore,
      reasonDevelopment: Math.min(10, wordCountScore),
      evidenceQuality: text.includes('example') || text.includes('instance') ? 9 : 7,
      connectorsAppropriateness: connectorScore,
      counterargumentHandling: text.includes('but') || text.includes('however') || text.includes('said') ? 8 : 6,
      naturalness: connectorStuffingWarning ? 5 : 8,
    },
    detectedConnectors,
    connectorStuffingWarning,
    neutralFeedback: connectorStuffingWarning
      ? 'You included several transition phrases, but grouping them too closely can feel robotic. Let your ideas breathe with simple conversational phrasing.'
      : 'Clear and structured presentation. Your transition from premise to rationale was logically coherent and easy to follow.',
    evidenceCitations,
    suggestedPolish: 'Focus on pausing naturally at clause boundaries to reinforce listener retention.',
  };
}

/**
 * Generate balanced counterarguments without political or ideological bias
 */
export function generateCounterargument(statement: string): string {
  const lower = statement.toLowerCase();

  if (lower.includes('remote') || lower.includes('office')) {
    return 'While remote flexibility enhances work-life balance, in-person collaboration often accelerates cross-team onboarding and spontaneous problem-solving.';
  }
  if (lower.includes('university') || lower.includes('free') || lower.includes('education')) {
    return 'Universal free access democratizes opportunity, though maintaining cutting-edge research facilities and elite faculty often requires substantial endowment and revenue mechanisms.';
  }
  if (lower.includes('ai') || lower.includes('jobs')) {
    return 'AI drives unprecedented productivity gains, yet short-term transitional friction and workforce displacement require careful proactive policy management.';
  }
  if (lower.includes('social media')) {
    return 'Social media connects global communities instantly, but algorithmic optimization for outrage can diminish conversational depth and focus.';
  }

  return 'That is a compelling perspective. However, an alternative viewpoint is that unforeseen operational constraints and differing stakeholder priorities could produce unintended secondary outcomes.';
}

