import { MeetingScorecard, NegotiationState } from '@/types';

// --- Week 3 Speech Analysis ---

export interface Week3AnalysisRequest {
  transcript: string;
  dayNumber: number;
  activityType: string;
  topic?: string;
  track?: string;
  priorityFocus?: string;
  roleplayContext?: string;
}

export interface Week3AnalysisResponse {
  professionalClarity: number;        // 1-10
  conciseExplanation: number;         // 1-10
  vocabulary: number;                 // 1-10
  naturalness: number;                // 1-10
  audienceAwareness: number;          // 1-10
  structureScore: number;             // 1-10
  feedback: string;
  detectedPhrases: string[];
  suggestedImprovement: string;
}

/**
 * Analyze Week 3 professional speech patterns.
 * Scores professional clarity, structure, and vocabulary without requiring external AI.
 */
export function analyzeWeek3Speech(request: Week3AnalysisRequest): Week3AnalysisResponse {
  const text = request.transcript.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Detect professional phrases
  const professionalPhrases = [
    'from my perspective', 'in my experience', 'one option might be',
    'another possibility', 'i would suggest', 'one thing we could consider',
    'let me clarify', 'to summarize', 'the key takeaway',
    'based on the data', 'the evidence suggests', 'moving forward',
    'i agree with', 'that makes sense', 'good approach',
    'could you clarify', 'just to make sure', 'before we move on',
    'sorry to interrupt', 'could i add', 'it was great speaking',
    'what matters most', 'the main issue', 'in terms of',
    'the situation was', 'my task was', 'the action i took', 'the result was',
    'i take responsibility', 'what i learned', 'going forward',
    'would it be possible', 'what if we', 'could we agree',
  ];

  const detectedPhrases = professionalPhrases.filter(p => text.includes(p));

  // Detect excessive formality / jargon
  const jargonPatterns = [
    'synergy', 'leverage', 'paradigm', 'circle back', 'low-hanging fruit',
    'move the needle', 'boil the ocean', 'bandwidth', 'deep dive',
  ];
  const jargonCount = jargonPatterns.filter(j => text.includes(j)).length;

  // Calculate structure score from connectors / signposting
  const structureMarkers = [
    'first', 'second', 'finally', 'to begin', 'next', 'in conclusion',
    'however', 'therefore', 'as a result', 'for example', 'in addition',
    'on the other hand', 'my point is', 'let me start', 'this brings me to',
  ];
  const structureCount = structureMarkers.filter(m => text.includes(m)).length;

  // Score calculations
  const clarityBase = Math.min(10, Math.max(5, Math.round(wordCount / 20)));
  const professionalClarity = jargonCount > 2 ? Math.max(5, clarityBase - 1) : clarityBase;
  const conciseExplanation = wordCount > 300 ? 6 : wordCount > 50 ? 8 : 7;
  const vocabulary = Math.min(10, 5 + detectedPhrases.length);
  const naturalness = jargonCount > 3 ? 5 : detectedPhrases.length > 5 && wordCount < 60 ? 6 : 8;
  const audienceAwareness = detectedPhrases.length > 0 ? 8 : 6;
  const structureScore = Math.min(10, 5 + structureCount);

  const feedback = jargonCount > 2
    ? 'Your language includes several pieces of corporate jargon. Professional communication works best when it is clear, direct, and respectful — not when it is filled with buzzwords.'
    : detectedPhrases.length >= 3
      ? 'Good use of professional language. Your phrasing was natural and appropriate for the context.'
      : 'Consider incorporating a few more professional phrases naturally. Avoid memorized scripts — aim for clear, purposeful language.';

  return {
    professionalClarity,
    conciseExplanation,
    vocabulary,
    naturalness,
    audienceAwareness,
    structureScore,
    feedback,
    detectedPhrases,
    suggestedImprovement: structureCount < 2
      ? 'Add brief signposting phrases ("First...", "My main point is...") to guide your listener through your response.'
      : 'Continue using clear structure. Focus on making your key message land within the first 15 seconds.',
  };
}

// --- Meeting Analysis ---

export function generateMeetingFeedback(transcript: string): MeetingScorecard {
  const text = transcript.toLowerCase();

  const updatePhrases = ['the status is', 'we have made progress', 'currently', 'we are at', 'the update is', 'so far'];
  const questionPhrases = ['could you clarify', 'what do you mean', 'are you saying', 'just to make sure'];
  const interruptPhrases = ['sorry to interrupt', 'could i add', 'can i come in', 'before we move on'];
  const summaryPhrases = ['to summarize', 'so just to summarize', 'the action is', 'the next step', 'the deadline is', 'who is responsible'];
  const agreePhrases = ['i agree', 'that makes sense', 'good approach', 'i support', 'i think that'];
  const disagreePhrases = ['i see it differently', 'another perspective', 'however', 'i would suggest instead', 'respectfully'];

  return {
    participation: text.length > 100 ? 8 : text.length > 30 ? 6 : 4,
    conciseUpdates: updatePhrases.some(p => text.includes(p)) ? 8 : 6,
    usefulQuestions: questionPhrases.some(p => text.includes(p)) ? 8 : 5,
    agreement: agreePhrases.some(p => text.includes(p)) ? 8 : 6,
    disagreement: disagreePhrases.some(p => text.includes(p)) ? 8 : 5,
    interruptionAppropriateness: interruptPhrases.some(p => text.includes(p)) ? 9 : 6,
    clarification: questionPhrases.filter(p => text.includes(p)).length > 0 ? 8 : 5,
    actionSummary: summaryPhrases.filter(p => text.includes(p)).length >= 2 ? 9 : summaryPhrases.some(p => text.includes(p)) ? 7 : 4,
    conversationBalance: 7,
    clarity: text.split(/\s+/).length > 20 ? 8 : 6,
  };
}

// --- STAR Response Analysis ---

export interface STARAnalysis {
  situation: boolean;
  task: boolean;
  action: boolean;
  result: boolean;
  completeness: number;    // 0-4
  evidenceQuality: number; // 1-10
  feedback: string;
}

export function analyzeSTARResponse(transcript: string): STARAnalysis {
  const text = transcript.toLowerCase();

  const situationIndicators = ['the situation was', 'at that time', 'we were facing', 'the context was', 'when i was', 'there was a'];
  const taskIndicators = ['my task was', 'i was responsible', 'my role was', 'i needed to', 'i was asked to', 'the challenge was'];
  const actionIndicators = ['i decided to', 'the action i took', 'i implemented', 'i organized', 'i spoke with', 'i created', 'so i', 'what i did'];
  const resultIndicators = ['the result was', 'as a result', 'the outcome', 'we achieved', 'this led to', 'ultimately', 'in the end', 'it resulted in'];

  const situation = situationIndicators.some(i => text.includes(i));
  const task = taskIndicators.some(i => text.includes(i));
  const action = actionIndicators.some(i => text.includes(i));
  const result = resultIndicators.some(i => text.includes(i));

  const completeness = [situation, task, action, result].filter(Boolean).length;

  // Evidence quality based on specificity markers
  const specificityMarkers = ['percent', '%', 'million', 'hours', 'days', 'team of', 'reduced', 'increased', 'saved', 'improved'];
  const specificityCount = specificityMarkers.filter(m => text.includes(m)).length;
  const evidenceQuality = Math.min(10, 4 + completeness + specificityCount);

  let feedback = '';
  if (completeness === 4) {
    feedback = 'Excellent STAR response — all four components are present. Your answer has clear structure and evidence.';
  } else if (completeness >= 2) {
    const missing = [];
    if (!situation) missing.push('Situation');
    if (!task) missing.push('Task');
    if (!action) missing.push('Action');
    if (!result) missing.push('Result');
    feedback = `Good start. To strengthen your answer, include: ${missing.join(', ')}. Remember: interviewers want to see what YOU specifically did and what happened because of it.`;
  } else {
    feedback = 'Your answer needs more structure. Use the STAR framework: set up the Situation, explain the Task, describe your specific Action, and share the concrete Result.';
  }

  return { situation, task, action, result, completeness, evidenceQuality, feedback };
}

// --- Data Narration Analysis ---

export interface DataNarrationAnalysis {
  trendVocabulary: string[];
  factStatements: number;
  inferenceStatements: number;
  factInferenceDistinction: number; // 1-10
  clarity: number;                   // 1-10
  feedback: string;
}

export function analyzeDataNarration(transcript: string): DataNarrationAnalysis {
  const text = transcript.toLowerCase();

  const trendWords = [
    'increase', 'rise', 'climb', 'surge', 'decline', 'fall', 'drop',
    'fluctuate', 'remain stable', 'plateau', 'peak', 'reach a low',
    'gradually', 'sharply', 'slightly', 'significantly', 'steadily',
    'grew', 'decreased', 'rose', 'fell', 'doubled', 'tripled',
  ];

  const trendVocabulary = trendWords.filter(w => text.includes(w));

  // Fact vs inference detection
  const inferenceMarkers = ['one possible explanation', 'this might', 'this could', 'perhaps', 'it seems', 'possibly', 'i believe', 'my interpretation'];
  const factMarkers = ['the data shows', 'according to', 'the numbers indicate', 'we can see that', 'the chart shows', 'the figure'];

  const factStatements = factMarkers.filter(m => text.includes(m)).length;
  const inferenceStatements = inferenceMarkers.filter(m => text.includes(m)).length;

  // Good distinction = both fact and inference markers present but differentiated
  const factInferenceDistinction = (factStatements > 0 && inferenceStatements > 0)
    ? 9
    : factStatements > 0
      ? 7
      : inferenceStatements > 0
        ? 5
        : 4;

  const clarity = Math.min(10, 5 + trendVocabulary.length);

  const feedback = trendVocabulary.length >= 3
    ? 'Strong data vocabulary. You used precise trend language to describe patterns clearly.'
    : trendVocabulary.length >= 1
      ? 'Good start with trend language. Try adding more specific vocabulary like "gradually increased" or "remained stable" to strengthen your description.'
      : 'Use more specific data vocabulary. Instead of "went up" try "increased steadily" or "rose sharply."';

  return { trendVocabulary, factStatements, inferenceStatements, factInferenceDistinction, clarity, feedback };
}

// --- SBI Feedback Analysis ---

export interface SBIAnalysis {
  situationPresent: boolean;
  behaviorPresent: boolean;
  impactPresent: boolean;
  completeness: number;    // 0-3
  specificity: number;     // 1-10
  personalAttack: boolean;
  feedback: string;
}

export function analyzeSBIFeedback(transcript: string): SBIAnalysis {
  const text = transcript.toLowerCase();

  const situationMarkers = ['when', 'during', 'in the meeting', 'last week', 'yesterday', 'on monday', 'at the'];
  const behaviorMarkers = ['you', 'i noticed', 'i observed', 'what happened was', 'the behavior', 'specifically'];
  const impactMarkers = ['the effect', 'the impact', 'as a result', 'this meant', 'this caused', 'the consequence', 'it affected', 'which led to'];
  const personalAttackMarkers = ['you always', 'you never', 'you are lazy', 'you are unreliable', 'you are incompetent', 'your attitude', 'you don\'t care'];

  const situationPresent = situationMarkers.some(m => text.includes(m));
  const behaviorPresent = behaviorMarkers.some(m => text.includes(m));
  const impactPresent = impactMarkers.some(m => text.includes(m));
  const personalAttack = personalAttackMarkers.some(m => text.includes(m));

  const completeness = [situationPresent, behaviorPresent, impactPresent].filter(Boolean).length;
  const specificity = Math.min(10, 4 + completeness * 2 + (personalAttack ? -2 : 0));

  let feedback = '';
  if (personalAttack) {
    feedback = 'Your feedback included personal characterizations ("you always...", "you are..."). Focus on observable behavior instead of personality judgments.';
  } else if (completeness === 3) {
    feedback = 'Excellent SBI feedback — you identified the Situation, described the Behavior, and explained the Impact. This approach keeps feedback constructive and actionable.';
  } else {
    const missing = [];
    if (!situationPresent) missing.push('Situation (when/where)');
    if (!behaviorPresent) missing.push('Behavior (what was observed)');
    if (!impactPresent) missing.push('Impact (what effect it had)');
    feedback = `Add the missing component(s): ${missing.join(', ')}. Complete SBI feedback is specific, fair, and easier for the receiver to act on.`;
  }

  return { situationPresent, behaviorPresent, impactPresent, completeness, specificity, personalAttack, feedback };
}

// --- Negotiation Analysis ---

export function analyzeNegotiation(transcript: string): NegotiationState {
  const text = transcript.toLowerCase();

  const proposalMarkers = ['would it be possible', 'one option would be', 'i could', 'what if we', 'i suggest', 'my proposal'];
  const counterMarkers = ['alternatively', 'instead', 'however', 'on the other hand', 'another approach'];
  const compromiseMarkers = ['could we agree', 'i can do x but', 'if we move', 'as a compromise', 'we could meet in the middle', 'i would need'];
  const agreementMarkers = ['so we have agreed', 'we\'ve agreed', 'to confirm', 'the agreement is', 'just to summarize'];

  const proposals = proposalMarkers.filter(p => text.includes(p));
  const counterProposals = counterMarkers.filter(p => text.includes(p));
  const compromises = compromiseMarkers.filter(p => text.includes(p));
  const finalAgreement = agreementMarkers.some(p => text.includes(p))
    ? 'Agreement confirmed in transcript'
    : null;

  const languageScore = Math.min(10, 4 + proposals.length + compromises.length);

  return {
    proposals,
    counterProposals,
    compromises,
    finalAgreement,
    alternativesExplored: proposals.length + counterProposals.length,
    tradeOffsIdentified: compromises.length,
    languageScore,
  };
}

// --- Register Analysis ---

export interface RegisterAnalysis {
  formalIndicators: string[];
  casualIndicators: string[];
  detectedRegister: 'formal' | 'neutral' | 'casual';
  appropriateness: number; // 1-10
  feedback: string;
}

export function analyzeRegisterSwitch(transcript: string, targetRegister: 'formal' | 'neutral' | 'casual'): RegisterAnalysis {
  const text = transcript.toLowerCase();

  const formalMarkers = [
    'i would like to inform', 'please be advised', 'kindly', 'herewith',
    'pursuant to', 'at your earliest convenience', 'i am writing to',
    'we regret to inform', 'please find attached',
  ];
  const casualMarkers = [
    'hey', 'gonna', 'wanna', 'kinda', 'stuff', 'cool', 'awesome',
    'no worries', 'just a heads up', 'fyi', 'btw',
  ];

  const formalIndicators = formalMarkers.filter(m => text.includes(m));
  const casualIndicators = casualMarkers.filter(m => text.includes(m));

  let detectedRegister: 'formal' | 'neutral' | 'casual';
  if (formalIndicators.length > casualIndicators.length + 1) {
    detectedRegister = 'formal';
  } else if (casualIndicators.length > formalIndicators.length + 1) {
    detectedRegister = 'casual';
  } else {
    detectedRegister = 'neutral';
  }

  const matchesTarget = detectedRegister === targetRegister;
  const appropriateness = matchesTarget ? 9 : (detectedRegister === 'neutral' ? 7 : 5);

  const feedback = matchesTarget
    ? `Your language register matched the target (${targetRegister}). Good register awareness.`
    : `Your language leaned ${detectedRegister} but the target was ${targetRegister}. Practice adjusting your word choice and sentence structure for different audiences.`;

  return { formalIndicators, casualIndicators, detectedRegister, appropriateness, feedback };
}

// --- Professional Vocabulary Recycling ---

export const PROFESSIONAL_VOCABULARY_BANK = [
  { expression: 'meet a deadline', category: 'project', example: 'We need to meet the deadline by Friday.' },
  { expression: 'manage a workload', category: 'project', example: 'She manages her workload effectively.' },
  { expression: 'raise a concern', category: 'feedback', example: 'I would like to raise a concern about the timeline.' },
  { expression: 'provide feedback', category: 'feedback', example: 'Let me provide some constructive feedback.' },
  { expression: 'reach an agreement', category: 'negotiation', example: 'We managed to reach an agreement on the budget.' },
  { expression: 'take responsibility', category: 'accountability', example: 'I take responsibility for the oversight.' },
  { expression: 'make a recommendation', category: 'presentation', example: 'Based on the data, I would make the following recommendation.' },
  { expression: 'address an issue', category: 'problem-solving', example: 'We need to address this issue immediately.' },
  { expression: 'achieve a target', category: 'project', example: 'The team achieved its quarterly targets.' },
  { expression: 'make progress', category: 'project', example: 'We have made significant progress this week.' },
  { expression: 'set priorities', category: 'planning', example: 'Let me set priorities for the upcoming sprint.' },
  { expression: 'allocate resources', category: 'planning', example: 'We need to allocate resources more effectively.' },
  { expression: 'identify a solution', category: 'problem-solving', example: 'After analyzing the data, we identified a solution.' },
  { expression: 'communicate expectations', category: 'management', example: 'It is important to communicate expectations clearly.' },
  { expression: 'schedule a follow-up', category: 'meetings', example: 'Let me schedule a follow-up for next week.' },
];
