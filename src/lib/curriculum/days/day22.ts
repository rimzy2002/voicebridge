// ============================================================
// Day 22 — Explain Complex Ideas Simply
// ============================================================

import { DayDefinition } from '@/types';

const day22: DayDefinition = {
  dayNumber: 22,
  title: 'Make Complex Ideas Easy to Understand',
  subtitle: 'Day 22 of 30 • Week 4: Advanced Communication',
  objective:
    'Help learners explain difficult ideas without excessive jargon, confusing sentences, unnecessary detail, or losing their listener. Adapt explanations cleanly to beginner, peer, and expert audiences.',
  coreMessage:
    'True mastery is not sounding complicated — it is making complex ideas effortlessly simple to understand.',
  estimatedMinutes: { full: 40, express: 12 },
  todayGoals: [
    'Identify the central idea using What / Why / How / Example / Bottom Line',
    'Translate corporate and academic jargon into plain, vivid language',
    'Build relatable analogies to bridge abstract concepts',
    'Adapt vocabulary and detail level for three distinct audiences',
    'Deploy intentional comprehension checks during explanations',
    'Handle listener confusion and recover smoothly',
  ],
  activities: [
    // 1. Welcome
    {
      id: 'd22-welcome',
      type: 'welcome',
      title: 'Welcome to Day 22 — Advanced Communication',
      dayNumber: 22,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          'Welcome to the final phase: Advanced Communication! Over the next 9 days, you will learn to communicate complex ideas, nuanced opinions, persuasive proposals, and leadership direction with greater clarity and flexibility.',
      },
    },

    // 2. Baseline
    {
      id: 'd22-baseline',
      type: 'recording',
      title: 'Day 22 Complexity Baseline',
      description: 'Explain a complex concept without preparation to benchmark current explanation clarity.',
      dayNumber: 22,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Explain how something you know well works (e.g. a technical tool, a scientific concept, or a process) to someone who has never encountered it.',
        durationSeconds: 120,
        prepTimeSeconds: 20,
        isBaseline: true,
        label: 'Day 22 Complexity Baseline',
      },
      trackVariants: {
        professional: {
          prompt: 'Explain a process or technical concept from your work that a new employee might not understand.',
        },
        student: {
          prompt: 'Explain a difficult topic or theorem from your studies to someone who has never studied your subject.',
        },
        general: {
          prompt: 'Explain how something you know well works (e.g. cloud storage, GPS, or a personal hobby process).',
        },
      },
    },

    // 3. Complexity Reduction Interactive Activity
    {
      id: 'd22-complexity-interactive',
      type: 'complexity_reduction',
      title: 'The Complexity Reduction Engine',
      description: 'Master the 5-step simplification formula and jargon translation tools.',
      dayNumber: 22,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 8,
      xpReward: 25,
      config: {
        topic: 'Explaining Intricate Systems Simply',
      },
    },

    // 4. Analogy Builder Drill
    {
      id: 'd22-analogy-drill',
      type: 'analogy_builder',
      title: 'Analogy Builder: Make the Abstract Concrete',
      description: 'Practice bridging unfamiliar ideas with everyday metaphors.',
      dayNumber: 22,
      order: 4,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        prompt: 'Use "Think of it like..." or "It is similar to..." to explain how caching works, or how revision works in writing.',
      },
    },

    // 5. Circumlocution: Definition Without the Word
    {
      id: 'd22-circumlocution',
      type: 'circumlocution_recycle',
      title: 'Definition Without the Word',
      description: 'Explain difficult concepts without using the target vocabulary word.',
      dayNumber: 22,
      order: 5,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        prompt: 'Explain the concept of "asynchronous communication" without using the words "asynchronous", "instant", or "chat".',
      },
    },

    // 6. Listener Checks & AI Confusion Simulation
    {
      id: 'd22-confusion-sim',
      type: 'ai_confusion_simulation',
      title: 'Comprehension Checks & AI Confusion Recovery',
      description: 'Respond when a listener says: "I understand the first part, but what do you mean by..."',
      dayNumber: 22,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 20,
      config: {
        prompt: 'A listener interrupts: "I get why we need this, but how does it actually work in practice?" Adapt and re-explain in 60 seconds.',
        durationSeconds: 60,
      },
    },

    // 7. Main Speaking Challenge: 3-Minute Explanation
    {
      id: 'd22-main-challenge',
      type: 'recording',
      title: 'Main Challenge: 3-Minute Multi-Audience Explanation',
      description: 'Deliver a structured 3-minute explanation with examples, listener checks, and a crisp bottom line.',
      dayNumber: 22,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 30,
      config: {
        prompt:
          'Deliver a complete 3-minute explanation: (1) WHAT is the idea, (2) WHY does it matter, (3) HOW does it work, (4) Concrete analogy, (5) Check comprehension, (6) Bottom line.',
        durationSeconds: 180,
        isMainChallenge: true,
        prepTimeSeconds: 30,
      },
    },

    // 8. Real-World Mission
    {
      id: 'd22-mission',
      type: 'mission',
      title: 'Day 22 Mission: Explain a Complex Idea',
      dayNumber: 22,
      order: 8,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 20,
      config: {
        missionDescription:
          'Explain one complex idea from your work, studies, or personal interest in English to another person for 3–5 minutes. Use at least one analogy and one listener check.',
        missionOptions: [
          'Explain a technical tool or process to a colleague or friend outside your team',
          'Explain a research paper or theory to a family member in simple terms',
          'Record an audio note explaining how a system functions and verify zero jargon was used',
        ],
        conversationFallback: true,
      },
    },

    // 9. Reflection & Scorecard
    {
      id: 'd22-scorecard',
      type: 'scorecard',
      title: 'Day 22 Complete — Clarity Mastered!',
      dayNumber: 22,
      order: 9,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 30,
      config: {},
    },
  ],
  badges: ['complex-explainer'],
  previewNextDay: { title: 'Persuade with Reasons, Evidence and Respect', dayNumber: 23 },
  week: 4,
};

export default day22;
