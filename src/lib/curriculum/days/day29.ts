// ============================================================
// Day 29 — Final Rehearsal: Independent Communication
// ============================================================

import { DayDefinition } from '@/types';

const day29: DayDefinition = {
  dayNumber: 29,
  title: 'Perform Without Hints',
  subtitle: 'Day 29 of 30 • Week 4: The Final Rehearsal',
  objective:
    'Complete the final rehearsal before Day 30. All visual scaffolding, framework acronyms (PREP, STAR), connector menus, and vocabulary hints are completely removed. Measure authentic independent performance and hint dependency.',
  coreMessage:
    'You no longer need training wheels. The frameworks, vocabulary, and pauses are now embedded in how you naturally think and speak.',
  estimatedMinutes: { full: 42, express: 15 },
  todayGoals: [
    'Perform across multiple high-stakes formats with ZERO on-screen framework hints',
    'Achieve a hint dependency score of 0 during impromptu and narrative speaking',
    'Anchor storytelling structure (Context → Challenge → Action → Result → Reflection) from memory',
    'Execute communication rescue when the listener expresses confusion or pushback',
    'Review your highest-value recurring error patterns and speak corrected forms',
    'Activate vocabulary items currently marked "Practicing" in spontaneous speech',
    'Review Day 30 final assessment protocols and reflect on your growth',
  ],
  activities: [
    // 1. Welcome & Zero Hint Protocol
    {
      id: 'd29-welcome',
      type: 'welcome',
      title: 'Welcome to Day 29 — The Final Rehearsal',
      dayNumber: 29,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          'Tomorrow is Day 30: Your Final Communication Challenge. Today there is no new theory. You will perform completely independently without on-screen hints, menus, or framework labels. Trust your training.',
      },
    },

    // 2. Personal Priority Warm-Up
    {
      id: 'd29-priority-warmup',
      type: 'independent_priority_warmup',
      title: 'Personal Priority Warm-Up (2 Minutes)',
      description: 'Warm up your vocal cords by targeting your #1 development priority from Week 3 diagnostics.',
      dayNumber: 29,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        prompt:
          'Deliver a 90-second warm-up response focusing specifically on your #1 priority (e.g. silent pauses, tense consistency, or rapid vocabulary retrieval).',
        durationSeconds: 90,
      },
    },

    // 3. Unassisted Impromptu Speaking
    {
      id: 'd29-impromptu-unassisted',
      type: 'independent_impromptu',
      title: 'Unassisted Impromptu Challenge',
      description: 'Answer an unexpected prompt for 2 minutes with zero visual scaffolding.',
      dayNumber: 29,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 25,
      config: {
        prompt:
          'Prompt: "If you could change one major decision made in your industry or academic field in the last 5 years, what would it be and why?" Speak for 2 minutes with no hints.',
        durationSeconds: 120,
        prepTimeSeconds: 15,
      },
    },

    // 4. Unassisted Experience Story
    {
      id: 'd29-story-unassisted',
      type: 'independent_story',
      title: 'Unassisted Story Challenge',
      description: 'Narrate a meaningful professional or personal experience. The system silently audits your STAR structure.',
      dayNumber: 29,
      order: 4,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 25,
      config: {
        prompt:
          'Narrate a 2–3 minute story about a project or problem where unexpected obstacles arose, what you personally did to resolve it, and what lesson you took away. No labels on screen.',
        durationSeconds: 150,
        prepTimeSeconds: 20,
      },
    },

    // 5. Communication Rescue Practice
    {
      id: 'd29-rescue-practice',
      type: 'communication_rescue',
      title: 'Communication Rescue & Pushback Drills',
      description: 'Practice instant recovery when the listener says: "I don\'t understand", "I disagree", or "What do you mean?"',
      dayNumber: 29,
      order: 5,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        topic: 'Conversational Resilience',
      },
    },

    // 6. High-Value Recurring Error Review
    {
      id: 'd29-error-review',
      type: 'personalized_error_review',
      title: 'High-Value Error Elimination',
      description: 'Review your 2 highest-frequency recurring speech patterns and articulate corrected models.',
      dayNumber: 29,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 20,
      config: {},
    },

    // 7. Vocabulary Activation in Spontaneous Speech
    {
      id: 'd29-vocab-activation',
      type: 'active_vocab_spontaneous',
      title: 'Spontaneous Vocabulary Activation',
      description: 'Deploy at least three items from your personal vocabulary bank in an unscripted response.',
      dayNumber: 29,
      order: 7,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 20,
      config: {
        prompt:
          'Explain why adaptability is the most critical professional skill today. You must naturally weave in: "From my perspective", "What matters most", and "The key trade-off is...".',
        durationSeconds: 90,
      },
    },

    // 8. Day 30 Preview & Protocols
    {
      id: 'd29-preview',
      type: 'information_display',
      title: 'Preview of Tomorrow: Day 30 Final Assessment',
      dayNumber: 29,
      order: 8,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      config: {
        content:
          'Tomorrow is Day 30 — the capstone of your 30-day journey!\n\n' +
          '• You will repeat the exact same baseline recording you did on Day 1 ("Introduce Yourself").\n' +
          '• You will listen to Day 1 and Day 30 side-by-side to hear your transformation.\n' +
          '• You will receive your 14-dimension communication scorecard and 30-day progression timeline.\n' +
          '• You will unlock your personal phrasebook containing ~100 mastered communication chunks.\n' +
          '• You will receive a personalized 30–90 day continuation plan and the Confident Communicator completion badge.\n\n' +
          'Get a good night\'s rest. Tomorrow is about celebrating how far you have come.',
      },
    },

    // 9. Milestone Reflection
    {
      id: 'd29-reflection',
      type: 'reflection',
      title: 'Pre-Assessment Reflection',
      description: 'Reflect on your growth before the final assessment tomorrow.',
      dayNumber: 29,
      order: 9,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 20,
      config: {
        prompts: [
          'What can you now do comfortably in English that was intimidating or difficult on Day 1?',
          'Which communication framework has become the most natural part of your thinking?',
          'How has your confidence changed when stepping into unprepared conversations?',
        ],
        questions: [
          'What can you now do comfortably in English that was intimidating or difficult on Day 1?',
          'Which communication framework has become the most natural part of your thinking?',
          'How has your confidence changed when stepping into unprepared conversations?',
        ],
      },
    },

    // 10. Rehearsal Complete Scorecard
    {
      id: 'd29-scorecard',
      type: 'scorecard',
      title: 'Day 29 Complete — Ready for Day 30!',
      dayNumber: 29,
      order: 10,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 40,
      config: {},
    },
  ],
  badges: ['independent-performer'],
  previewNextDay: { title: 'Day 30: Your Final Communication Transformation Challenge', dayNumber: 30 },
  week: 4,
};

export default day29;
