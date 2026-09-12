import { PriorityItem, LearnerTrack } from '@/types';

// Standard high-value priority catalog from Day 7 diagnostics
export const AVAILABLE_PRIORITIES: Record<string, PriorityItem> = {
  tense_accuracy: {
    id: 'tense_accuracy',
    title: 'Tense Consistency in Longer Answers',
    description: 'Maintaining stable past/present tense frames when speaking without pausing.',
    focusArea: 'Grammar Stability',
    recommendedAction: 'Anchor your timeline before speaking; avoid switching between past and present mid-story.',
    status: 'active',
  },
  vocabulary_retrieval: {
    id: 'vocabulary_retrieval',
    title: 'Rapid Vocabulary Retrieval Under Pressure',
    description: 'Accessing precise professional expressions without reverting to mental translation.',
    focusArea: 'Lexical Range',
    recommendedAction: 'Use lexical chunks ("From my perspective", "What matters most") as thinking anchors.',
    status: 'active',
  },
  fillers: {
    id: 'fillers',
    title: 'Eliminating Vocal Fillers (um / uh)',
    description: 'Replacing habitual hesitations with confident, silent micro-pauses.',
    focusArea: 'Vocal Delivery',
    recommendedAction: 'Inhale silently at clause boundaries instead of holding vocal cord tension.',
    status: 'active',
  },
  response_delay: {
    id: 'response_delay',
    title: 'Reducing Response-Start Delay',
    description: 'Beginning your answer within 3–5 seconds without freezing.',
    focusArea: 'Spontaneity',
    recommendedAction: 'Start immediately with a framing phrase before figuring out your entire argument.',
    status: 'active',
  },
  listening_speed: {
    id: 'listening_speed',
    title: 'Listening Under Fast & Connected Speech',
    description: 'Decoding reduced sounds, elision, and varied international accents.',
    focusArea: 'Aural Comprehension',
    recommendedAction: 'Listen for content words (nouns/verbs) rather than trying to transcribe every preposition.',
    status: 'active',
  },
  pronunciation_clarity: {
    id: 'pronunciation_clarity',
    title: 'Final Consonant & Cluster Articulation',
    description: 'Crisply articulating word endings (-ed, -s, -t) for authoritative executive presence.',
    focusArea: 'Pronunciation',
    recommendedAction: 'Slow down by 10% on key closing words and articulate final plosives cleanly.',
    status: 'active',
  },
  story_organization: {
    id: 'story_organization',
    title: 'Structuring Narratives & Answers',
    description: 'Preventing rambling by sticking to Point -> Reason -> Evidence -> Conclusion.',
    focusArea: 'Structure',
    recommendedAction: 'State your bottom line first, then give 2 structured supporting points.',
    status: 'active',
  },
};

/**
 * Get active Day 7 diagnostic priorities for Week 2 injection
 */
export function getLearnerPriorities(track: LearnerTrack = 'general'): {
  primary: PriorityItem;
  secondary?: PriorityItem;
} {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('learner-week1-priorities');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.primary) {
          return parsed;
        }
      }

      // Check if Day 7 progress exists
      const day7Saved = localStorage.getItem('day-7-progress');
      if (day7Saved) {
        const d7 = JSON.parse(day7Saved);
        const focusId = d7.responses?.['d7-diagnostic-selection']?.primaryFocus as string;
        if (focusId && AVAILABLE_PRIORITIES[focusId]) {
          return {
            primary: AVAILABLE_PRIORITIES[focusId],
            secondary: AVAILABLE_PRIORITIES['vocabulary_retrieval'],
          };
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  // Default intelligent priority assignment tailored by track
  switch (track) {
    case 'professional':
      return {
        primary: AVAILABLE_PRIORITIES['tense_accuracy'],
        secondary: AVAILABLE_PRIORITIES['fillers'],
      };
    case 'student':
      return {
        primary: AVAILABLE_PRIORITIES['vocabulary_retrieval'],
        secondary: AVAILABLE_PRIORITIES['response_delay'],
      };
    default:
      return {
        primary: AVAILABLE_PRIORITIES['tense_accuracy'],
        secondary: AVAILABLE_PRIORITIES['vocabulary_retrieval'],
      };
  }
}

/**
 * Store updated learner priorities
 */
export function saveLearnerPriorities(priorities: {
  primary: PriorityItem;
  secondary?: PriorityItem;
}): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('learner-week1-priorities', JSON.stringify(priorities));
    } catch {
      // ignore
    }
  }
}

/**
 * Generates an executive personalized banner text for Days 8-21
 */
export function getPersonalizedFocusBanner(dayNumber: number, track: LearnerTrack = 'general'): string {
  const { primary } = getLearnerPriorities(track);

  switch (dayNumber) {
    case 8:
      return `Your Week 1 diagnostic priority: ${primary.title.toLowerCase()} during longer opinion answers.`;
    case 9:
      return `Personal focus today: applying connectors to fix ${primary.title.toLowerCase()}.`;
    case 10:
      return `Listening target: monitor how natural speakers handle rhythm and ${primary.focusArea.toLowerCase()}.`;
    case 11:
      return `Spontaneous drill focus: prevent ${primary.title.toLowerCase()} under the 5-second rule.`;
    case 12:
      return `Difficult scenario focus: keep clear composure with zero ${primary.title.toLowerCase()}.`;
    case 13:
      return `Presentation delivery focus: master ${primary.title.toLowerCase()} across signposts.`;
    case 14:
      return `Week 2 Fluency Milestone: validating measurable growth on ${primary.title}.`;
    case 15:
      return `Professional Reset focus: natural elevator pitch and networking presence without corporate rigidity.`;
    case 16:
      return `Meeting participation target: contribute at least one concise update or idea using STATUS/PROGRESS.`;
    case 17:
      return `Interview structure focus: anchor claims in STAR evidence rather than vague adjectives.`;
    case 18:
      return `Presentation delivery target: signpost transitions cleanly and separate fact from inference.`;
    case 19:
      return `High-stakes communication focus: Situation-Behavior-Impact (SBI) feedback and composed accountability.`;
    case 20:
      return `Action extraction focus: convert dense written messages into spoken action and negotiate trade-offs.`;
    case 21:
      return `Week 3 Professional Challenge: unassisted end-to-end professional performance synthesis.`;
    case 22:
      return `Complexity reduction target: explain difficult ideas clearly to diverse audiences using What/Why/How.`;
    case 23:
      return `Persuasion target: recommend solutions and handle objections with evidence, calibrated tone, and respect.`;
    case 24:
      return `Leadership focus: deliver clear direction, honest uncertainty, and respectful delegation under ambiguity.`;
    case 25:
      return `Nuance focus: calibrate certainty using diplomatic hedging and avoid overly blunt assertions.`;
    case 26:
      return `Debate target: steelman opposing viewpoints fairly before presenting evidence and counterarguments.`;
    case 27:
      return `Composure target: apply Pause → Understand → Structure → Respond to unexpected challenging questions.`;
    case 28:
      return `Advanced listening target: decode speaker stance, discourse markers, and action items under rapid speech.`;
    case 29:
      return `Final rehearsal target: perform 100% unassisted with ZERO hint dependency before Day 30.`;
    case 30:
      return `The Capstone: complete your 30-Day Final Communication Transformation Assessment and unlock your full report.`;
    default:
      return `Target focus: ${primary.title}.`;
  }
}

/**
 * Week 3 high-impact diagnostic priorities for Week 4 recommendation
 */
export const WEEK3_PRIORITIES: Record<string, PriorityItem> = {
  meeting_presence: {
    id: 'meeting_presence',
    title: 'Executive Presence in Fast-Moving Meetings',
    description: 'Contributing concisely without hesitation and managing polite interruptions cleanly.',
    focusArea: 'Meeting Dynamics',
    recommendedAction: 'Use the 4-part update framework (STATUS → PROGRESS → ISSUE → NEXT) within 45 seconds.',
    status: 'active',
  },
  star_evidence: {
    id: 'star_evidence',
    title: 'Evidence-Based STAR Storytelling',
    description: 'Replacing general claims with specific metrics, actions, and concrete results.',
    focusArea: 'Interview & Persuasion',
    recommendedAction: 'Always quantify the Result (e.g., "saved 4 hours/week", "resolved 10 days early").',
    status: 'active',
  },
  data_storytelling: {
    id: 'data_storytelling',
    title: 'Data Narration & Fact-Inference Distinction',
    description: 'Signposting complex metrics while explicitly flagging subjective interpretations.',
    focusArea: 'Presentations',
    recommendedAction: 'Use signal phrases: "The data shows..." for facts vs "This suggests..." for inferences.',
    status: 'active',
  },
  sbi_diplomacy: {
    id: 'sbi_diplomacy',
    title: 'Constructive Disagreement & SBI Feedback',
    description: 'Addressing underperformance or conflict without personal attacks or defensive reactions.',
    focusArea: 'High-Stakes Interpersonal',
    recommendedAction: 'Anchor feedback strictly in observable behavior and concrete operational impact.',
    status: 'active',
  },
  negotiation_tradeoffs: {
    id: 'negotiation_tradeoffs',
    title: 'Trade-Off & Scope Negotiation',
    description: 'Proposing alternatives rather than outright refusal when facing impossible deadlines.',
    focusArea: 'Strategic Negotiation',
    recommendedAction: 'Use the "If we keep X, we must adjust Y" formula to protect delivery standards.',
    status: 'active',
  },
};

export function getWeek3Priorities(track: LearnerTrack = 'general'): {
  primary: PriorityItem;
  secondary: PriorityItem;
} {
  switch (track) {
    case 'professional':
      return {
        primary: WEEK3_PRIORITIES.meeting_presence,
        secondary: WEEK3_PRIORITIES.negotiation_tradeoffs,
      };
    case 'student':
      return {
        primary: WEEK3_PRIORITIES.star_evidence,
        secondary: WEEK3_PRIORITIES.data_storytelling,
      };
    default:
      return {
        primary: WEEK3_PRIORITIES.sbi_diplomacy,
        secondary: WEEK3_PRIORITIES.meeting_presence,
      };
  }
}

/**
 * Generates targeted micro-drills matching the learner's specific priority
 */
export function getPersonalizedMicroDrill(
  dayNumber: number,
  priority: PriorityItem
): { prompt: string; targetPattern: string; durationSeconds: number } {
  switch (priority.id) {
    case 'tense_accuracy':
      return {
        prompt: 'Recount an unexpected project setback you faced. Keep every single verb strictly in the simple past tense (e.g. "We noticed...", "The client requested...", "We resolved...").',
        targetPattern: 'Strict past-tense narrative without slipping into present tense.',
        durationSeconds: 60,
      };
    case 'fillers':
      return {
        prompt: 'Answer this prompt: "What makes a truly effective team?" Every time you feel like saying "um" or "uh", pause completely and breathe in silence for 1 second.',
        targetPattern: 'Zero filler vocalizations — clean silent pauses.',
        durationSeconds: 60,
      };
    case 'vocabulary_retrieval':
      return {
        prompt: 'Explain why continuous learning is essential in your field. You must use at least 3 advanced lexical chunks: "From my perspective", "What matters most", and "A key consideration".',
        targetPattern: 'Active deployment of 3 contextual lexical chunks.',
        durationSeconds: 60,
      };
    default:
      return {
        prompt: `Deliver a concise 60-second explanation demonstrating your focus on ${priority.title}.`,
        targetPattern: priority.recommendedAction,
        durationSeconds: 60,
      };
  }
}

/**
 * Week 4 Personalization Engine: computes Strongest Skill, Priority 1, Priority 2
 * consuming previous learner data (Day 1, 7, 14, 21 diagnostics, vocabulary, tracks)
 */
export interface Week4Personalization {
  strongestSkill: {
    title: string;
    description: string;
    evidence: string;
  };
  priority1: PriorityItem;
  priority2: PriorityItem;
}

export function getWeek4Personalization(track: LearnerTrack = 'general'): Week4Personalization {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('learner-week4-personalization');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
  }

  // Default intelligent configuration calibrated by track
  if (track === 'professional') {
    return {
      strongestSkill: {
        title: 'Meeting Presence & Strategic Updates',
        description: 'Consistent delivery of concise 4-part updates and executive summaries.',
        evidence: 'Day 16 & Day 21 unassisted simulations completed with structured signposting.',
      },
      priority1: {
        id: 'simplifying_complexity',
        title: 'Complexity Reduction & Multi-Audience Adaptation',
        description: 'Explaining deep technical concepts without relying on dense jargon.',
        focusArea: 'Clarity & Flexibility',
        recommendedAction: 'Use the What/Why/How framework and anchor abstract concepts in concrete analogies.',
        status: 'active',
      },
      priority2: {
        id: 'nuanced_hedging',
        title: 'Diplomatic Disagreement & Calibrated Hedging',
        description: 'Challenging assumptions respectfully without overly blunt or absolute assertions.',
        focusArea: 'High-Stakes Interpersonal',
        recommendedAction: 'Deploy qualified phrases ("Based on what we know now...", "One concern might be...").',
        status: 'active',
      },
    };
  }

  if (track === 'student') {
    return {
      strongestSkill: {
        title: 'Structured Evidence & STAR Storytelling',
        description: 'Clear narration of academic projects and problem-solving steps.',
        evidence: 'Day 17 interview simulation demonstrated structured context-action-result sequences.',
      },
      priority1: {
        id: 'persuasive_reasoning',
        title: 'Persuading with Evidence and Calibrated Claims',
        description: 'Defending recommendations and handling academic counterarguments effectively.',
        focusArea: 'Persuasion & Debate',
        recommendedAction: 'State the recommendation first, support with 2 data points, and acknowledge trade-offs.',
        status: 'active',
      },
      priority2: {
        id: 'tough_questions',
        title: 'Composure & Structure Under Tough Questions',
        description: 'Pausing deliberately to structure answers instead of feeling pressured to speak instantly.',
        focusArea: 'Vocal Presence',
        recommendedAction: 'Use a 3-second thinking pause and dissect multi-part questions into Part 1 and Part 2.',
        status: 'active',
      },
    };
  }

  // General Track
  return {
    strongestSkill: {
      title: 'Spontaneous Answer Expansion',
      description: 'Speaking at length without internal translation freezes or premature restarts.',
      evidence: 'Speaking duration grew steadily from Day 1 baseline across Weeks 1–3.',
    },
    priority1: {
      id: 'filler_elimination',
      title: 'Silent Pauses & Vocal Composure',
      description: 'Eliminating habitual "um/uh" hesitations during spontaneous complex answers.',
      focusArea: 'Fluency & Presence',
      recommendedAction: 'Take a silent inhale at clause boundaries; silence sounds confident to your listener.',
      status: 'active',
    },
    priority2: {
      id: 'advanced_listening',
      title: 'Active Listening & Responsive Summaries',
      description: 'Extracting implicit meaning and speaker stance in rapid international English.',
      focusArea: 'Listening Comprehension',
      recommendedAction: 'Listen for discourse markers ("however", "therefore") to predict where the speaker is heading.',
      status: 'active',
    },
  };
}

