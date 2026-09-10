// ============================================================
// Day 15 — Communicate Professionally Without Sounding Robotic
// ============================================================

import { DayDefinition } from '@/types';

const day15: DayDefinition = {
  dayNumber: 15,
  title: 'Communicate Professionally Without Sounding Robotic',
  subtitle: 'Day 15 of 30 • Week 3: Communicate Professionally',
  objective:
    'Transition from general fluency to professional communication while keeping language natural. Perform the planned mid-program confidence check and establish a professional communication baseline.',
  coreMessage:
    'Professional communication is not about sounding corporate — it is about being clear, concise, respectful, purposeful, and audience-aware.',
  estimatedMinutes: { full: 45, express: 14 },
  todayGoals: [
    'Complete the midpoint confidence snapshot',
    'Establish your professional communication baseline',
    'Practice the 30/60/120-second introduction',
    'Learn networking openers and small-talk flow',
    'Complete a 5-minute networking simulation',
  ],
  activities: [
    // 1. Welcome
    {
      id: 'd15-welcome',
      type: 'welcome',
      title: 'Welcome to Week 3 — Professional Communication',
      dayNumber: 15,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          "Welcome to Week 3! You've built strong speaking foundations and fluency skills. This week, we apply everything to realistic professional situations — networking, meetings, interviews, presentations, and negotiation.\n\nThe principle remains the same: clear > complicated, natural > memorized, communication > perfection.",
      },
    },

    // 2. Midpoint Confidence Snapshot
    {
      id: 'd15-midpoint-confidence',
      type: 'midpoint_confidence_snapshot',
      title: 'Midpoint Confidence Snapshot',
      description: 'Re-assess your confidence across core areas. These values will be compared with Day 1 and Day 21.',
      dayNumber: 15,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      config: {
        questionText: 'Rate your current confidence (same areas as Day 1):',
        dimensions: [
          { id: 'fluency', label: 'Fluency — speaking without long pauses', min: 1, max: 10 },
          { id: 'vocabulary', label: 'Vocabulary — finding the right words', min: 1, max: 10 },
          { id: 'grammar_speaking', label: 'Grammar while speaking', min: 1, max: 10 },
          { id: 'pronunciation', label: 'Pronunciation clarity', min: 1, max: 10 },
          { id: 'listening', label: 'Listening comprehension', min: 1, max: 10 },
          { id: 'workplace', label: 'Workplace/professional communication', min: 1, max: 10 },
          { id: 'unprepared', label: 'Speaking without preparation', min: 1, max: 10 },
          { id: 'overall', label: 'Overall confidence', min: 1, max: 10 },
        ],
        snapshotLabel: 'Day 15 Confidence Snapshot',
        preservePrevious: true,
      },
    },

    // 3. Week 2 Recall
    {
      id: 'd15-week2-recall',
      type: 'recording',
      title: 'Week 2 Recall',
      description: 'What improved most during Week 2? Speak for 60 seconds with clear structure.',
      dayNumber: 15,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        prompt: 'In 60 seconds, summarize: What improved most during Week 2? Use clear structure.',
        durationSeconds: 60,
        prepTimeSeconds: 5,
      },
    },

    // 4. Professional Communication Baseline
    {
      id: 'd15-professional-baseline',
      type: 'recording',
      title: 'Professional Communication Baseline',
      description: 'Explain what you do, study, or spend most of your time working on.',
      dayNumber: 15,
      order: 4,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt: 'Explain what you do, study, or spend most of your time working on. Speak for approximately 90 seconds.',
        durationSeconds: 90,
        prepTimeSeconds: 10,
        isBaseline: true,
        label: 'Professional Communication Baseline',
      },
      trackVariants: {
        student: { prompt: 'Explain what you are studying, what you focus on, and why it interests you. Speak for approximately 90 seconds.' },
        general: { prompt: 'Explain what you spend most of your time on — work, hobbies, projects, or interests. Speak for approximately 90 seconds.' },
      },
    },

    // 5. Formal ≠ Professional
    {
      id: 'd15-formal-vs-professional',
      type: 'framework_lesson',
      title: 'Formal ≠ Professional',
      dayNumber: 15,
      order: 5,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      config: {
        frameworkName: 'Professional Communication Principles',
        steps: [
          { title: 'Clear', description: 'Say what you mean directly. Avoid unnecessary complexity.' },
          { title: 'Concise', description: 'Respect your listener\'s time. Get to the point.' },
          { title: 'Respectful', description: 'Professional tone without being stiff or fake.' },
          { title: 'Purposeful', description: 'Every sentence should serve a purpose. Cut filler.' },
          { title: 'Audience-Aware', description: 'Adjust your language for who you\'re speaking to.' },
        ],
        content: 'Professional communication is NOT about replacing simple words with corporate jargon. "We need to leverage our synergies" is not better than "We should work together." Clear, natural language is professional language.',
      },
    },

    // 6. Elevator Pitch Rotation (30/60/120)
    {
      id: 'd15-elevator-pitch',
      type: 'elevator_pitch_pro',
      title: '30 / 60 / 120-Second Introduction',
      description: 'Introduce yourself and your work in three rounds with increasing detail.',
      dayNumber: 15,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 20,
      config: {
        rounds: [
          { label: '30-Second Pitch', durationSeconds: 30, guidance: 'Name, role, one key thing. Be sharp.' },
          { label: '60-Second Pitch', durationSeconds: 60, guidance: 'Add context — what are you working on? Why does it matter?' },
          { label: '2-Minute Introduction', durationSeconds: 120, guidance: 'Full professional introduction with background, current focus, and goals.' },
        ],
      },
    },

    // 7. Networking Openers
    {
      id: 'd15-networking-openers',
      type: 'framework_lesson',
      title: 'Networking Openers',
      dayNumber: 15,
      order: 7,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      config: {
        frameworkName: 'Context-Specific Opening Language',
        steps: [
          { title: 'Conference', description: '"What brought you to this event?" / "Which sessions have you been to?"' },
          { title: 'Office event', description: '"How do you know the organizer?" / "Which team are you on?"' },
          { title: 'University', description: '"What are you studying?" / "How are you finding the program?"' },
          { title: 'General', description: '"How has your week been?" / "What are you working on at the moment?"' },
        ],
        content: 'Good openers are context-appropriate and invite a response. Avoid invasive personal questions. The goal is to start a natural conversation.',
      },
    },

    // 8. Small Talk Practice
    {
      id: 'd15-small-talk',
      type: 'professional_small_talk',
      title: 'Small Talk Flow',
      description: 'Practice the 5-step small talk flow: Begin → Find Common Ground → Deepen → Transition → Exit.',
      dayNumber: 15,
      order: 8,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        conversationTopic: 'networking event',
        conversationGoals: ['Open naturally', 'Find common ground', 'Deepen appropriately', 'Transition smoothly', 'Exit politely'],
      },
    },

    // 9. Professional Follow-Ups
    {
      id: 'd15-follow-ups',
      type: 'recording',
      title: 'Professional Follow-Up Questions',
      description: 'Move beyond "What do you do?" to relevant, specific follow-ups.',
      dayNumber: 15,
      order: 9,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        prompt: 'Someone tells you: "I work in sustainable energy consulting." Ask 3 relevant follow-up questions aloud, then explain why each question is better than just "Oh, that\'s interesting."',
        durationSeconds: 60,
      },
    },

    // 10. Networking Roleplay
    {
      id: 'd15-networking-roleplay',
      type: 'networking_roleplay',
      title: 'Networking Roleplay (4-5 min)',
      description: 'AI simulates a networking conversation. Practice opening, developing, and closing naturally.',
      dayNumber: 15,
      order: 10,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 25,
      config: {
        conversationDuration: 300,
        conversationGoals: ['Natural opener', 'Relevant follow-ups', 'Conversation balance', 'Polite exit'],
      },
    },

    // 11. Exit a Conversation
    {
      id: 'd15-exit-phrases',
      type: 'framework_lesson',
      title: 'Exit a Conversation Gracefully',
      dayNumber: 15,
      order: 11,
      isRequired: true,
      expressMode: false,
      durationMinutes: 1,
      config: {
        frameworkName: 'Professional Exit Phrases',
        steps: [
          { title: 'Appreciation', description: '"It was great speaking with you."' },
          { title: 'Graceful exit', description: '"I won\'t keep you, but it was nice meeting you."' },
          { title: 'Future interest', description: '"I\'d be interested to hear more about that another time."' },
          { title: 'Event farewell', description: '"Enjoy the rest of the event."' },
        ],
      },
    },

    // 12. Main Challenge
    {
      id: 'd15-main-challenge',
      type: 'networking_roleplay',
      title: 'Main Challenge: 5-Minute Networking Simulation',
      description: 'Full networking simulation. Scored on opener, development, follow-ups, balance, reactions, tone, vocabulary, and closing.',
      dayNumber: 15,
      order: 12,
      isRequired: true,
      expressMode: true,
      durationMinutes: 7,
      xpReward: 30,
      config: {
        conversationDuration: 300,
        isMainChallenge: true,
        scoringRubric: ['opener', 'answer_development', 'follow_ups', 'balance', 'natural_reactions', 'professional_tone', 'vocabulary', 'closing'],
      },
    },

    // 13. Mission
    {
      id: 'd15-mission',
      type: 'mission',
      title: 'Real-World Mission: Small Talk',
      dayNumber: 15,
      order: 13,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        missionDescription: 'Start one English small-talk or networking interaction today — with a colleague, classmate, acquaintance, or new person.',
        missionOptions: [
          'Small talk with a colleague before or after a meeting',
          'Start a conversation at an event or gathering',
          'Chat with someone you don\'t usually speak to in English',
          'AI networking alternative (use the practice above)',
        ],
        conversationFallback: true,
      },
    },

    // 14. Reflection & Scorecard
    {
      id: 'd15-reflection',
      type: 'reflection',
      title: 'Day 15 Reflection',
      dayNumber: 15,
      order: 14,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        reflectionQuestions: [
          { id: 'transition', question: 'How did the transition from general fluency to professional communication feel?', type: 'text' as const },
          { id: 'networking_comfort', question: 'How comfortable are you with networking conversations now?', type: 'scale' as const, min: 1, max: 10 },
        ],
      },
    },

    {
      id: 'd15-scorecard',
      type: 'scorecard',
      title: 'Day 15 Complete',
      dayNumber: 15,
      order: 15,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 30,
      config: {},
    },
  ],
  badges: ['day-15-finisher'],
  previewNextDay: {
    title: 'Speak Up in Meetings',
    dayNumber: 16,
  },
  week: 3,
};

export default day15;
