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
 * Generates an executive personalized banner text for Days 8-14
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
    default:
      return `Target focus: ${primary.title}.`;
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
