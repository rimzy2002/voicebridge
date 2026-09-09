// ============================================================
// Day 12 — Handle Difficult Situations with Flexible Language
// ============================================================

import { DayDefinition } from '@/types';

const day12: DayDefinition = {
  dayNumber: 12,
  title: 'Handle Difficult Situations with Flexible Language',
  subtitle: 'Day 12 of 30 • Week 2: Build Fluency',
  objective:
    'Equip learners with diplomatic, condition-based language to navigate difficult workplace conversations, negotiate deadlines, articulate consequences, and propose flexible alternatives under pressure.',
  coreMessage:
    'Professional maturity is knowing how to push back constructively. When stakes are high, flexible phrasing protects both relationships and standards.',
  estimatedMinutes: { full: 42, express: 15 },
  todayGoals: [
    'Negotiate unrealistic requests diplomatically using condition markers',
    'Structure consequence arguments using "If / Unless / As long as"',
    'Deploy passive phrasing for objective, non-accusatory problem solving',
    'Execute a 3-minute high-stakes negotiation roleplay simulation',
    'Apply personalized structural repair from your Week 1 diagnostic',
  ],
  activities: [
    // 1. Welcome / Home
    {
      id: 'd12-welcome',
      type: 'welcome',
      title: 'What Would You Say When the Situation Is Not Simple?',
      dayNumber: 12,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          "Today is about handling high-stakes communication where a blunt 'yes' or 'no' will cause friction. We master how to express possibilities, alternatives, and conditions diplomatically.",
      },
    },

    // 2. Baseline Scenario
    {
      id: 'd12-baseline-scenario',
      type: 'recording',
      title: 'Day 12 Difficult Situation Baseline',
      dayNumber: 12,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Your manager asks you to deliver an unrealistic volume of complex work by tomorrow morning. Deliver a 90-second response explaining your constraints and proposing an alternative.',
        durationSeconds: 90,
        prepTimeSeconds: 15,
      },
      trackVariants: {
        professional: {
          prompt:
            'A key enterprise client demands an urgent architectural redesign by Monday without budget adjustment. Respond diplomatically for 90 seconds.',
        },
        student: {
          prompt:
            'You have two major academic examinations and a group project due on the same afternoon. Request an extension from your professor for 90 seconds.',
        },
      },
    },

    // 3. Communication Functions Framework
    {
      id: 'd12-comm-functions',
      type: 'framework_lesson',
      title: 'The 5 Problem-Solving Language Functions',
      dayNumber: 12,
      order: 3,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        steps: [
          { title: '1. Likely Future', description: '"If we allocate two engineers, we will complete Phase 1 by Friday."' },
          { title: '2. Possibility / Risk', description: '"If we rush this release, we might introduce regression vulnerabilities."' },
          { title: '3. Hypothetical Solution', description: '"If we were to decouple the auth module, we could launch on schedule."' },
          { title: '4. Past Reflection', description: '"If we had caught this edge case in testing, we would not have had downtime."' },
          { title: '5. Negotiated Condition', description: '"We can deliver the core API tomorrow, as long as documentation follows on Tuesday."' },
        ],
      },
    },

    // 4. Conditional Ladder
    {
      id: 'd12-conditional-ladder',
      type: 'framework_lesson',
      title: 'The Practical Conditional Ladder',
      dayNumber: 12,
      order: 4,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        steps: [
          { title: 'Level 1: Present Fact', description: '"When servers experience peak traffic, cache layers absorb the surge."' },
          { title: 'Level 2: Real Plan', description: '"If the client approves the proposal today, we will commence deployment tomorrow."' },
          { title: 'Level 3: Strategic Hypothesis', description: '"If we had a larger budget, I would hire dedicated QA engineers."' },
          { title: 'Level 4: Retrospective Learning', description: '"If we had aligned earlier, we would have avoided redundant refactoring."' },
        ],
      },
    },

    // 5. If / Unless / As Long As
    {
      id: 'd12-decision-scenarios',
      type: 'vocabulary_activation',
      title: 'Negotiation Condition Stems',
      dayNumber: 12,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        items: [
          { phrase: 'As long as', meaning: 'Granting permission under specific safeguards', example: 'We can deploy on Friday, as long as rollback scripts are tested.' },
          { phrase: 'Unless we', meaning: 'Warning of consequences if action is not taken', example: 'Unless we freeze new feature requests, the launch date will slip.' },
          { phrase: 'Provided that', meaning: 'Formal contractual condition', example: 'We will finalize the integration, provided that API documentation is furnished.' },
          { phrase: 'One option might be to', meaning: 'Gentle constructive alternative', example: 'One option might be to ship the MVP now and follow with advanced filters.' },
        ],
      },
    },

    // 6. Consequence Builder
    {
      id: 'd12-consequence-builder',
      type: 'recording',
      title: 'Consequence & Recommendation Drill',
      dayNumber: 12,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 20,
      config: {
        prompt:
          'Construct a complete 60-second response starting with: "If we bypass comprehensive load testing now..." Detail the likely consequence, an alternative proposal, and your executive recommendation.',
        durationSeconds: 60,
      },
    },

    // 7. What Would You Do?
    {
      id: 'd12-what-would-you-do',
      type: 'recording',
      title: 'Spontaneous Dilemma Resolution',
      dayNumber: 12,
      order: 7,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Dilemma: A senior team member consistently interrupts junior colleagues during design syncs. How would you handle this conversation tactfully? Deliver your plan in 75 seconds.',
        durationSeconds: 75,
      },
    },

    // 8. Past Alternative (Retrospective Analysis)
    {
      id: 'd12-past-alternative',
      type: 'recording',
      title: 'Past Regret & Learning Formulation',
      dayNumber: 12,
      order: 8,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Reflect on a past mistake or setback in your work or academic career. Speak for 60 seconds using "If I had known..." and "I would have handled..." to express what you learned.',
        durationSeconds: 60,
      },
    },

    // 9. Gerund vs Infinitive Meaning Contrast
    {
      id: 'd12-gerund-infinitive',
      type: 'framework_lesson',
      title: 'Micro-Focus: Verbs that Change Meaning',
      dayNumber: 12,
      order: 9,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        steps: [
          { title: '"Stop doing" vs "Stop to do"', description: '"We stopped testing" (ceased the activity) vs "We stopped to test" (paused work in order to test).' },
          { title: '"Remember doing" vs "Remember to do"', description: '"I remember sending the email" (memory of past action) vs "Remember to send the email" (obligation).' },
        ],
      },
    },

    // 10. Passive Language for Objectivity
    {
      id: 'd12-passive-objectivity',
      type: 'framework_lesson',
      title: 'Diplomatic Objectivity: Depersonalizing Errors',
      dayNumber: 12,
      order: 10,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        steps: [
          { title: 'Confrontational (Active)', description: '"You broke the database migration script yesterday."' },
          { title: 'Diplomatic & Objective (Passive)', description: '"The migration script was inadvertently corrupted during yesterday’s push. Let’s investigate the root cause."' },
          { title: 'Professional Rule', description: 'When addressing errors in public meetings, emphasize the issue rather than placing direct personal blame.' },
        ],
      },
    },

    // 11. Difficult Situation Roleplay
    {
      id: 'd12-situation-roleplay',
      type: 'recording',
      title: 'Difficult Situation Negotiation Simulation',
      dayNumber: 12,
      order: 11,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 25,
      config: {
        prompt:
          'Roleplay scenario: Your stakeholder states: "I don’t care about technical debt, I need this feature live in 48 hours." Respond constructively for 90 seconds. Acknowledge urgency, explain system vulnerability, and propose a viable compromise.',
        durationSeconds: 90,
      },
    },

    // 12. Clarification & Negotiation Bridge
    {
      id: 'd12-negotiation-bridge',
      type: 'vocabulary_activation',
      title: 'Negotiation Alignment Stems',
      dayNumber: 12,
      order: 12,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        items: [
          { phrase: 'Let me put that another way', meaning: 'Restating when listener misunderstands', example: 'Let me put that another way: our bottleneck is compute, not team bandwidth.' },
          { phrase: 'Would it be possible to', meaning: 'Gentle exploratory request', example: 'Would it be possible to stage the rollout across two sprints?' },
          { phrase: 'If we can agree on', meaning: 'Locking down shared consensus', example: 'If we can agree on the core requirements, our team will commence immediately.' },
        ],
      },
    },

    // 13. Main Challenge
    {
      id: 'd12-main-challenge',
      type: 'recording',
      title: 'Main 3-Minute Crisis Management Simulation',
      dayNumber: 12,
      order: 13,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 30,
      config: {
        prompt:
          'Simulate a 3-minute executive update addressing a critical project delay: Explain the unforeseen obstacle objectively, state current mitigation conditions, outline alternative paths, and close with a decisive recommendation.',
        durationSeconds: 180,
        prepTimeSeconds: 20,
      },
    },

    // 14. Scorecard
    {
      id: 'd12-scorecard',
      type: 'scorecard',
      title: 'Day 12 Diplomatic Communication Scorecard',
      dayNumber: 12,
      order: 14,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 10,
      config: {},
    },

    // 15. Mission
    {
      id: 'd12-mission',
      type: 'mission',
      title: 'Day 12 Real-World Mission: Problem-Solving in English',
      dayNumber: 12,
      order: 15,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        missionTitle: 'Use a conditional proposal in a real communication setting',
        criteria: [
          'Use "As long as..." or "Provided that..." to negotiate a condition',
          'Use passive phrasing to describe an issue objectively without blaming',
          'Propose at least 1 viable alternative option',
        ],
      },
    },
  ],
  badges: ['diplomat'],
  previewNextDay: {
    title: 'Explain and Present an Idea with Confidence',
    dayNumber: 13,
  },
  week: 2,
};

export default day12;
