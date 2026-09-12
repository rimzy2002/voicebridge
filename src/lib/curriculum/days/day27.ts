// ============================================================
// Day 27 — Handle Tough Questions and Pressure
// ============================================================

import { DayDefinition } from '@/types';

const day27: DayDefinition = {
  dayNumber: 27,
  title: 'Stay Clear When Questions Get Difficult',
  subtitle: 'Day 27 of 30 • Week 4: Advanced Communication',
  objective:
    'Master high-pressure Q&A situations across meetings, presentations, and interviews. Maintain executive composure through the Pause → Understand → Structure → Respond sequence, answer with intellectual integrity, and handle hostile inquiries calmly.',
  coreMessage:
    'Under pressure, you do not need an immediate answer — you need a composed mind. Silence is not weakness; it is the hallmark of authority.',
  estimatedMinutes: { full: 38, express: 12 },
  todayGoals: [
    'Execute the Pause → Understand → Structure → Respond sequence under time pressure',
    'Deploy deliberate 2–4 second thinking pauses without filling silence with vocal ticks',
    'Clarify ambiguous or multi-part questions before committing to an answer',
    'State professional uncertainty with high integrity ("I will verify that by 3 PM")',
    'Convert emotionally hostile questions into neutral, solvable inquiries',
    'Complete rapid-fire Q&A rounds without restarting or panicking',
  ],
  activities: [
    // 1. Welcome
    {
      id: 'd27-welcome',
      type: 'welcome',
      title: 'Welcome to Day 27',
      dayNumber: 27,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          'Today you prepare for the moments where everyone is looking at you and an unexpected, difficult question lands. Today is about composure, pausing with confidence, and never fabricating answers.',
      },
    },

    // 2. Baseline
    {
      id: 'd27-baseline',
      type: 'recording',
      title: 'Sudden Question Baseline',
      description: 'Answer an unexpected challenge with only 5 seconds of thinking time.',
      dayNumber: 27,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'A senior leader asks suddenly: "If we lose our biggest client tomorrow, what is your immediate plan to keep your project afloat?" Take 5 seconds and answer in 60 seconds.',
        durationSeconds: 60,
        prepTimeSeconds: 5,
        isBaseline: true,
        label: 'Day 27 Pressure Baseline',
      },
    },

    // 3. Tough Question Interactive Activity
    {
      id: 'd27-tough-question-interactive',
      type: 'thinking_pause',
      title: 'Composure & Buffer Engine',
      description: 'Master thinking pause buffers, clarify ambiguous inquiries, and complete rapid-fire Q&A rounds.',
      dayNumber: 27,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 8,
      xpReward: 25,
      config: {
        topic: 'Pressure Q&A',
      },
    },

    // 4. Hostile Question Conversion Drill
    {
      id: 'd27-hostile-drill',
      type: 'hostile_conversion',
      title: 'Hostile Question Conversion',
      description: 'Strip the emotional bait and respond calmly to the underlying operational question.',
      dayNumber: 27,
      order: 4,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        prompt:
          'Someone asks aggressively: "Why is your team always dropping the ball on deliverables?" Buffer calmly, remove the word "always", and answer with facts in 60 seconds.',
        durationSeconds: 60,
      },
    },

    // 5. Main Challenge: High-Pressure Q&A Simulation
    {
      id: 'd27-main-simulation',
      type: 'recording',
      title: 'Main Challenge: 3-Minute Pressure Defense',
      description: 'Answer a two-part challenging inquiry regarding budget overrun and timeline risk using deliberate pauses and honest boundaries.',
      dayNumber: 27,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 30,
      config: {
        prompt:
          'Deliver your complete 3-minute composed answer: (1) 3-second silent pause + buffer phrase, (2) Dissect into Part 1 (cost factor) and Part 2 (future timeline), (3) Address Part 1 with facts, (4) State honest limits on Part 2, (5) Commit to follow-up verification.',
        durationSeconds: 180,
        isMainChallenge: true,
        prepTimeSeconds: 15,
      },
    },

    // 6. Real-World Mission
    {
      id: 'd27-mission',
      type: 'mission',
      title: 'Day 27 Mission: Three Composed Answers',
      dayNumber: 27,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 20,
      config: {
        missionDescription:
          'Answer three questions in English today without restarting your sentence or filling silence with "um/uh". Take a 2-second silent breath before speaking.',
        missionOptions: [
          'Answer a surprise question in a meeting or class using a 2-second thinking pause',
          'Ask a friend to ask you 3 rapid unexpected questions and answer them calmly',
          'Use "That is an important question; let me address X first" in a real conversation',
        ],
        conversationFallback: true,
      },
    },

    // 7. Reflection & Scorecard
    {
      id: 'd27-scorecard',
      type: 'scorecard',
      title: 'Day 27 Complete — Composure Mastered!',
      dayNumber: 27,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 30,
      config: {},
    },
  ],
  badges: ['calm-under-pressure'],
  previewNextDay: { title: 'Listen for Meaning, Tone and What Happens Next', dayNumber: 28 },
  week: 4,
};

export default day27;
