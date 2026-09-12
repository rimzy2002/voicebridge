// ============================================================
// Week 4 Advanced Communication Engines (Days 22–29)
// ============================================================

import {
  PersuasionMetrics,
  LeadershipMetrics,
  NuanceMetrics,
  DebateMetrics,
  ToughQuestionMetrics,
  AdvancedListeningMetrics,
  IndependentMetrics,
  LearnerTrack,
} from '@/types';

// ============================================================
// 1. Day 22: Complex Explanation & Audience Adaptation Engine
// ============================================================

export interface ComplexityAnalysisRequest {
  transcript: string;
  audience: 'beginner' | 'peer' | 'expert';
  topic: string;
  track: LearnerTrack;
}

export interface ComplexityScorecard {
  coreIdeaClarity: number;          // 1-10
  organization: number;             // 1-10
  jargonControl: number;            // 1-10
  examplesAndAnalogies: number;     // 1-10
  audienceAdaptation: number;       // 1-10
  listenerChecks: number;           // 1-10
  recovery: number;                 // 1-10
  pronunciationClarity: number;     // 1-10
  detectedJargon: string[];
  detectedListenerChecks: string[];
  detectedAnalogies: string[];
  feedback: {
    strongestAspect: string;
    clarityIssue: string;
    vocabularyUpgrade: string;
    retryInstruction: string;
  };
}

export function analyzeComplexExplanation(request: ComplexityAnalysisRequest): ComplexityScorecard {
  const text = request.transcript.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Jargon detection
  const excessiveJargonList = [
    'synergy', 'leverage', 'paradigm', 'cross-functional alignment',
    'streamline', 'operationalize', 'core competency', 'low-hanging fruit',
    'scalability matrix', 'hyper-converged', 'bandwidth constraint',
  ];
  const detectedJargon = excessiveJargonList.filter(j => text.includes(j));

  // Analogy markers
  const analogyMarkers = [
    'similar to', 'think of it as', 'a simple example', 'just like',
    'for instance', 'imagine', 'comparable to', 'in other words',
  ];
  const detectedAnalogies = analogyMarkers.filter(m => text.includes(m));

  // Listener checks
  const checkMarkers = [
    'does that make sense', 'would you like an example',
    'should i explain that in another way', 'the key idea is',
    'let me simplify that', 'to put it simply', 'do you see what i mean',
  ];
  const detectedListenerChecks = checkMarkers.filter(c => text.includes(c));

  // Structural markers (What -> Why -> How -> Bottom Line)
  const structureMarkers = ['first', 'the reason', 'how it works', 'in short', 'the bottom line', 'basically'];
  const detectedStructure = structureMarkers.filter(s => text.includes(s));

  // Audience expectations
  let audienceScore = 8;
  if (request.audience === 'beginner') {
    if (detectedJargon.length > 0) audienceScore -= detectedJargon.length * 1.5;
    if (detectedAnalogies.length > 0) audienceScore += 1;
  } else if (request.audience === 'expert') {
    if (wordCount < 40) audienceScore -= 2;
  }
  audienceScore = Math.max(4, Math.min(10, audienceScore));

  const coreIdeaClarity = Math.min(10, Math.max(5, Math.round(wordCount / 18) + (detectedAnalogies.length > 0 ? 2 : 0)));
  const organization = Math.min(10, 5 + detectedStructure.length);
  const jargonControl = Math.max(4, 10 - detectedJargon.length * 2);
  const examplesAndAnalogies = Math.min(10, 5 + detectedAnalogies.length * 2);
  const listenerChecks = Math.min(10, 4 + detectedListenerChecks.length * 3);
  const recovery = 8;
  const pronunciationClarity = 8;

  let strongestAspect = 'Clear central message and steady delivery pace.';
  if (detectedAnalogies.length > 0) {
    strongestAspect = 'Effective use of concrete comparisons to anchor the abstract concept.';
  } else if (detectedListenerChecks.length > 0) {
    strongestAspect = 'Strong audience awareness through intentional comprehension checks.';
  }

  let clarityIssue = 'Could break the explanation into more explicit What / Why / How stages.';
  if (detectedJargon.length > 0) {
    clarityIssue = `Contains specialized terminology ("${detectedJargon.join(', ')}") that may alienate unfamiliar listeners.`;
  } else if (detectedAnalogies.length === 0) {
    clarityIssue = 'Missing a relatable analogy ("You can think of it as...") to make the concept vivid.';
  }

  return {
    coreIdeaClarity,
    organization,
    jargonControl,
    examplesAndAnalogies,
    audienceAdaptation: audienceScore,
    listenerChecks,
    recovery,
    pronunciationClarity,
    detectedJargon,
    detectedListenerChecks,
    detectedAnalogies,
    feedback: {
      strongestAspect,
      clarityIssue,
      vocabularyUpgrade: 'Replace "This implementation requires..." with "To make this work in practice, we need..."',
      retryInstruction: 'Re-explain the core idea in 60 seconds using one fresh comparison: "Think of it like..."',
    },
  };
}

// ============================================================
// 2. Day 23: Persuasion & Objection Handling Engine
// ============================================================

export interface PersuasionAnalysisRequest {
  transcript: string;
  topic: string;
  learnerTrack: LearnerTrack;
}

export function analyzePersuasion(request: PersuasionAnalysisRequest): {
  metrics: PersuasionMetrics;
  scorecard: Record<string, number>;
  feedback: {
    strength: string;
    objectionHandlingTip: string;
    toneCalibration: string;
  };
} {
  const text = request.transcript.toLowerCase();

  // Recommendation signals
  const recommendationPhrases = [
    "i'd recommend", 'i recommend', 'one approach worth considering',
    'i believe the strongest option is', 'for that reason, i suggest', 'my recommendation is',
  ];
  const hasRecommendation = recommendationPhrases.some(p => text.includes(p));

  // Benefit & Reason signals
  const benefitPhrases = ['one potential benefit', 'the main advantage', 'this enables us to', 'the upside is', 'because'];
  const benefitMatches = benefitPhrases.filter(p => text.includes(p)).length;

  // Limitation / Objection signals
  const limitationPhrases = [
    'one concern might be', 'we could address that by', 'to be fair',
    'while there is a risk', 'the main trade-off', 'it is true that',
  ];
  const limitationMatches = limitationPhrases.filter(p => text.includes(p)).length;

  // Exaggeration detection
  const exaggeratedPhrases = ['definitely solve everything', '100% guaranteed', 'impossible to fail', 'no downside'];
  const hasExaggeration = exaggeratedPhrases.some(p => text.includes(p));

  // Action requests
  const actionPhrases = ['next step', 'what should happen next', 'i propose we', 'let us start by', 'would you be open to'];
  const hasAction = actionPhrases.some(p => text.includes(p));

  const recommendationClarity = hasRecommendation ? 9 : 6;
  const supportingReasons = Math.min(10, 5 + benefitMatches * 2);
  const evidenceUse = text.includes('for example') || text.includes('data') || text.includes('experience') ? 8 : 6;
  const limitationAcknowledgement = limitationMatches > 0 ? 9 : 5;
  const objectionHandling = limitationMatches > 0 ? 8 : 6;
  const qualification = hasExaggeration ? 4 : 8;
  const actionRequest = hasAction ? 9 : 6;
  const calibratedTone = hasExaggeration ? 5 : 9;

  return {
    metrics: {
      recommendationClarity,
      supportingReasons,
      evidenceUse,
      limitationAcknowledgement,
      objectionHandling,
      qualification,
      actionRequest,
      calibratedTone,
    },
    scorecard: {
      recommendation: recommendationClarity,
      evidence: evidenceUse,
      limitations: limitationAcknowledgement,
      tone: calibratedTone,
      action: actionRequest,
    },
    feedback: {
      strength: hasRecommendation
        ? 'Clear, upfront recommendation that anchors the listener.'
        : 'Good persuasive energy, though starting with a direct recommendation phrase will sharpen impact.',
      objectionHandlingTip: limitationMatches === 0
        ? 'Acknowledge reasonable counterarguments upfront: "One concern might be cost, which we can mitigate by..."'
        : 'Balanced handling of trade-offs prevents listener skepticism.',
      toneCalibration: hasExaggeration
        ? 'Calibrate absolute statements: use "This could significantly improve" rather than "This will solve everything".'
        : 'Respectful, calibrated tone that persuades without pressuring.',
    },
  };
}

// ============================================================
// 3. Day 24: Leadership Communication Engine
// ============================================================

export interface LeadershipAnalysisRequest {
  transcript: string;
  scenario: string;
  track: LearnerTrack;
}

export function analyzeLeadership(request: LeadershipAnalysisRequest): {
  metrics: LeadershipMetrics;
  scorecard: Record<string, number>;
  feedback: {
    clarity: string;
    delegationTip: string;
    decisionRationale: string;
  };
} {
  const text = request.transcript.toLowerCase();

  // Framework checks: SITUATION -> PRIORITY -> ACTION -> RESPONSIBILITY -> REASON -> CHECK
  const situationSignals = ['where we are', 'the situation is', 'currently', 'we face'];
  const prioritySignals = ['what matters most', 'the priority is', 'first and foremost', 'our focus'];
  const delegationSignals = [
    'could you take responsibility for', "i'd like you to focus on",
    'can you handle', "let's divide this into", 'i will take care of',
  ];
  const decisionSignals = ['the reason we chose', 'we considered', 'the main trade-off is', 'what this means for us'];
  const uncertaintySignals = ['based on what we know now', 'at this stage', "if the situation changes, we'll adjust"];
  const motivationSignals = ["we've made progress on", 'the next step is manageable', 'we solved a similar issue'];
  const checkSignals = ['does everyone understand', 'any concerns before we start', 'are there any questions'];

  const hasSituation = situationSignals.some(s => text.includes(s));
  const hasPriority = prioritySignals.some(s => text.includes(s));
  const hasDelegation = delegationSignals.some(s => text.includes(s));
  const hasDecision = decisionSignals.some(s => text.includes(s));
  const hasUncertainty = uncertaintySignals.some(s => text.includes(s));
  const hasMotivation = motivationSignals.some(s => text.includes(s));
  const hasCheck = checkSignals.some(s => text.includes(s));

  const priorityClarity = hasPriority ? 9 : 6;
  const delegation = hasDelegation ? 9 : 6;
  const decisionExplanation = hasDecision ? 9 : 6;
  const listening = 8;
  const accountability = hasSituation && hasDecision ? 9 : 7;
  const summary = hasCheck ? 9 : 7;
  const directionUnderUncertainty = hasUncertainty ? 9 : 7;
  const practicalMotivation = hasMotivation ? 9 : 7;

  return {
    metrics: {
      priorityClarity,
      delegation,
      decisionExplanation,
      listening,
      accountability,
      summary,
      directionUnderUncertainty,
      practicalMotivation,
    },
    scorecard: {
      direction: priorityClarity,
      delegation,
      decisionClarity: decisionExplanation,
      uncertaintyManagement: directionUnderUncertainty,
      teamAlignment: summary,
    },
    feedback: {
      clarity: hasPriority
        ? 'Excellent definition of the core priority. The team knows exactly what matters most.'
        : 'Make the #1 priority unmistakable: "The single most important objective right now is..."',
      delegationTip: hasDelegation
        ? 'Empowering delegation without sounding micromanaging or autocratic.'
        : 'Delegate ownership explicitly: "Could you take ownership of X while I coordinate Y?"',
      decisionRationale: hasDecision
        ? 'Honest explanation of trade-offs builds trust and team buy-in.'
        : 'Always share the "Why": "The reason we chose this path is because..."',
    },
  };
}

// ============================================================
// 4. Day 25: Nuance, Hedging and Diplomacy Engine
// ============================================================

export interface NuanceAnalysisRequest {
  transcript: string;
  track: LearnerTrack;
}

export function analyzeNuance(request: NuanceAnalysisRequest): {
  metrics: NuanceMetrics;
  hedgedPhrases: string[];
  overlyBluntPhrases: string[];
  feedback: {
    diplomacyAssessment: string;
    hedgingTip: string;
    understatementContext: string;
  };
} {
  const text = request.transcript.toLowerCase();

  // Hedging signals
  const hedgingList = [
    'it seems likely that', 'there may be', 'it appears that',
    'based on the information available', 'one concern might be',
    'this part might need reconsideration', 'i have some reservations',
    'to some extent', 'in certain situations', 'it could potentially',
  ];
  const hedgedPhrases = hedgingList.filter(h => text.includes(h));

  // Qualified agreement / diplomatic disagreement
  const diplomaticDisagreement = [
    'i agree with the general direction, although',
    'i can see the reasoning behind that. my concern is',
    'that may be true in some cases, but',
    'i understand that perspective, however',
  ];
  const hasDiplomaticDisagreement = diplomaticDisagreement.some(d => text.includes(d));

  // Blunt phrases
  const bluntPatterns = ['this is wrong', 'you made a mistake', 'that makes no sense', 'bad idea', 'terrible plan'];
  const overlyBluntPhrases = bluntPatterns.filter(b => text.includes(b));

  const hedgingAppropriateness = hedgedPhrases.length >= 2 ? 9 : hedgedPhrases.length === 1 ? 7 : 5;
  const certaintyCalibration = overlyBluntPhrases.length > 0 ? 4 : 8;
  const qualifiedAgreement = hasDiplomaticDisagreement ? 9 : 7;
  const diplomaticDisagreementScore = hasDiplomaticDisagreement ? 9 : overlyBluntPhrases.length > 0 ? 5 : 7;
  const understatementAwareness = 8;

  return {
    metrics: {
      hedgingAppropriateness,
      certaintyCalibration,
      qualifiedAgreement,
      diplomaticDisagreement: diplomaticDisagreementScore,
      understatementAwareness,
    },
    hedgedPhrases,
    overlyBluntPhrases,
    feedback: {
      diplomacyAssessment: overlyBluntPhrases.length > 0
        ? `Found direct/blunt phrasing ("${overlyBluntPhrases.join(', ')}"). Soften to maintain collaboration.`
        : 'Nuanced and tactful tone that preserves relationships while clearly expressing viewpoint.',
      hedgingTip: hedgedPhrases.length >= 2
        ? 'Effective calibration of claims using hedges like "it seems likely" and "one concern might be".'
        : 'Incorporate cautious phrasing when data is incomplete: "Based on what we know now..."',
      understatementContext:
        'Remember that in international contexts, phrases like "not ideal" often mean "seriously problematic". Context and tone reveal true weight.',
    },
  };
}

// ============================================================
// 5. Day 26: Debate & Steelman Engine
// ============================================================

export interface DebateAnalysisRequest {
  transcript: string;
  opponentViewpoint: string;
  track: LearnerTrack;
}

export function analyzeDebate(request: DebateAnalysisRequest): {
  metrics: DebateMetrics;
  steelmanDetected: boolean;
  feedback: {
    steelmanQuality: string;
    argumentCoherence: string;
    respectfulTone: string;
  };
} {
  const text = request.transcript.toLowerCase();

  // Steelman markers (summarizing opponent fairly before disagreeing)
  const steelmanMarkers = [
    'the strongest version of the opposing argument',
    'i understand the concern that',
    'to be fair to the other side',
    'the valid point here is that',
    'those who support this argue that',
  ];
  const steelmanDetected = steelmanMarkers.some(m => text.includes(m));

  // Debate markers
  const debateMarkers = [
    'the evidence i would point to', 'the key distinction is',
    'that depends on', 'another way to look at it is',
    'i would challenge the assumption that', 'overall',
  ];
  const debateCount = debateMarkers.filter(d => text.includes(d)).length;

  const argumentClarity = text.split(/\s+/).length > 60 ? 8 : 6;
  const listeningAndSteelman = steelmanDetected ? 9 : 5;
  const counterargumentHandling = steelmanDetected && debateCount > 0 ? 9 : 6;
  const respectfulTone = 9;
  const logicalCoherence = Math.min(10, 6 + debateCount);
  const conclusionImpact = text.includes('overall') || text.includes('in conclusion') ? 8 : 6;

  return {
    metrics: {
      argumentClarity,
      relevance: 8,
      evidenceQuality: text.includes('for example') || text.includes('data') ? 8 : 6,
      listeningAndSteelman,
      counterargumentHandling,
      respectfulTone,
      logicalCoherence,
      conclusionImpact,
    },
    steelmanDetected,
    feedback: {
      steelmanQuality: steelmanDetected
        ? 'Excellent steelman technique! Acknowledging the strongest opposing view demonstrates deep listening.'
        : 'Before disagreeing, summarize their position fairly: "The strongest reason for that approach is X, but..."',
      argumentCoherence: debateCount > 1
        ? 'Logical progression with clean connectors distinguishing assumptions from facts.'
        : 'Connect claims to concrete examples to avoid unsupported generalizations.',
      respectfulTone: 'Tone remained collaborative and intellectually curious — debating ideas, not people.',
    },
  };
}

// ============================================================
// 6. Day 27: Tough Questions & Pressure Engine
// ============================================================

export interface ToughQuestionAnalysisRequest {
  transcript: string;
  responseStartDelaySeconds: number;
}

export function analyzeToughQuestion(request: ToughQuestionAnalysisRequest): {
  metrics: ToughQuestionMetrics;
  feedback: {
    pauseEffectiveness: string;
    uncertaintyHandling: string;
    redirectionAdvice: string;
  };
} {
  const text = request.transcript.toLowerCase();

  // Thinking pause phrases
  const pausePhrases = [
    "that's a useful question", "that's a fair question",
    'let me think about that for a moment', 'there are two parts to that',
    'let me start with',
  ];
  const hasPausePhrase = pausePhrases.some(p => text.includes(p));

  // Clarification
  const clarificationPhrases = ['are you asking about', 'when you say', 'just to make sure i understand'];
  const hasClarification = clarificationPhrases.some(p => text.includes(p));

  // Honest uncertainty
  const uncertaintyPhrases = [
    "i don't have that information right now",
    "i'd want to verify that before giving you a definite answer",
    'based on what i know', 'what i can tell you now is',
  ];
  const hasHonestUncertainty = uncertaintyPhrases.some(p => text.includes(p));

  // Multipart detection
  const hasMultipart = text.includes('first part') || text.includes('regarding your second');

  // Redirection
  const redirectionPhrases = ['the immediate issue is', 'your broader point about', 'to address that directly'];
  const hasRedirection = redirectionPhrases.some(p => text.includes(p));

  const composureBehavior = request.responseStartDelaySeconds >= 2 && request.responseStartDelaySeconds <= 6 ? 9 : 7;
  const clarificationSkill = hasClarification ? 9 : 7;
  const honestyAboutUncertainty = hasHonestUncertainty ? 9 : 7;
  const multipartHandling = hasMultipart ? 9 : 7;
  const redirectionWithoutEvasion = hasRedirection ? 9 : 7;
  const fillerControl = 8;

  return {
    metrics: {
      responseStartDelay: request.responseStartDelaySeconds,
      composureBehavior,
      questionComprehension: 8,
      clarificationSkill,
      honestyAboutUncertainty,
      multipartHandling,
      redirectionWithoutEvasion,
      fillerControl,
    },
    feedback: {
      pauseEffectiveness: hasPausePhrase
        ? 'Great professional pause buffer. Taking 2–4 seconds sounds composed and authoritative.'
        : 'Remember: a deliberate 3-second pause is professional. Use: "That is an important question. Let me address X first."',
      uncertaintyHandling: hasHonestUncertainty
        ? 'High integrity in stating what you know vs what requires verification.'
        : 'Never guess under pressure: "I don\'t have that exact number right now, but I will verify and follow up by 3 PM."',
      redirectionAdvice: hasRedirection
        ? 'Clean separation of emotional framing from the underlying technical inquiry.'
        : 'Acknowledge the core intent before redirecting: "The immediate priority is X, and your point on Y is also critical."',
    },
  };
}

// ============================================================
// 7. Day 28: Advanced Listening Engine
// ============================================================

export interface AdvancedListeningAnalysisRequest {
  summaryTranscript: string;
  responseTranscript: string;
  sourceContext: {
    mainIssue: string;
    speakers: string[];
    actionItems: string[];
  };
}

export function analyzeAdvancedListening(request: AdvancedListeningAnalysisRequest): {
  metrics: AdvancedListeningMetrics;
  feedback: {
    summaryAccuracy: string;
    actionExtraction: string;
    responseInsight: string;
  };
} {
  const summaryText = request.summaryTranscript.toLowerCase();
  const responseText = request.responseTranscript.toLowerCase();

  const mainIdeaExtraction = summaryText.split(/\s+/).length > 30 ? 8 : 6;
  const detailAccuracy = 8;
  const actionItemExtraction = summaryText.includes('next step') || summaryText.includes('agreed') ? 8 : 6;
  const toneInference = summaryText.includes('concerned') || summaryText.includes('hesitant') || summaryText.includes('confident') ? 8 : 7;
  const spokenSummaryClarity = summaryText.split(/\s+/).length > 20 ? 8 : 6;
  const responseRelevance = responseText.split(/\s+/).length > 20 ? 8 : 6;

  return {
    metrics: {
      mainIdeaExtraction,
      speakerStanceIdentification: 8,
      detailAccuracy,
      actionItemExtraction,
      toneInference,
      spokenSummaryClarity,
      responseRelevance,
    },
    feedback: {
      summaryAccuracy: 'Captured the core tension and resolved direction cleanly without relying on verbatim notes.',
      actionExtraction: 'Successfully identified ownership and next operational checkpoints.',
      responseInsight: 'Offered an independent perspective rather than merely rephrasing the audio prompt.',
    },
  };
}

// ============================================================
// 8. Day 29: Independent Performance Engine (No Hints)
// ============================================================

export interface IndependentAnalysisRequest {
  transcript: string;
  hintsRequestedCount: number;
  speakingDurationSeconds: number;
}

export function analyzeIndependentPerformance(request: IndependentAnalysisRequest): {
  metrics: IndependentMetrics;
  feedback: {
    independenceStatus: string;
    fluencyObservation: string;
    readinessForDay30: string;
  };
} {
  const words = request.transcript.split(/\s+/).filter(Boolean);
  const hintDependency = request.hintsRequestedCount;
  const spontaneousFluency = words.length > 100 ? 9 : words.length > 50 ? 7 : 5;
  const structuralContinuity = words.length > 60 ? 8 : 6;
  const recoveryFromDistraction = 8;

  return {
    metrics: {
      hintDependency,
      spontaneousFluency,
      structuralContinuity,
      recoveryFromDistraction,
    },
    feedback: {
      independenceStatus: hintDependency === 0
        ? '100% Unassisted Execution! You relied entirely on internal neurological structures without UI prompts.'
        : `Used ${hintDependency} hint(s). Keep practicing holding frameworks in your working memory.`,
      fluencyObservation: words.length >= 80
        ? 'Sustained speaking flow with natural idea transitions and zero visual scaffolding.'
        : 'Good effort. Aim to build 90–120 seconds of continuous speech without restarts.',
      readinessForDay30: 'You are fully primed for the Day 30 Final Communication Transformation Assessment.',
    },
  };
}
