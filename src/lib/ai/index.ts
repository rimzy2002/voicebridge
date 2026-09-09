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
