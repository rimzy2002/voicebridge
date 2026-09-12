// ============================================================
// Day 23 — Persuade without Pressuring
// ============================================================

import { DayDefinition } from '@/types';

const day23: DayDefinition = {
  dayNumber: 23,
  title: 'Persuade with Reasons, Evidence and Respect',
  subtitle: 'Day 23 of 30 • Week 4: Advanced Communication',
  objective:
    'Develop persuasive communication without manipulation. Make clear recommendations, articulate benefits, acknowledge limitations, provide evidence, address objections, and propose actionable next steps.',
  coreMessage:
    'True persuasion is not pushing someone to agree — it is presenting such clear reasons and evidence that agreement becomes the natural conclusion.',
  estimatedMinutes: { full: 38, express: 12 },
  todayGoals: [
    'Deploy the 7-part persuasion framework: Recommendation → Reason → Benefit → Evidence → Concern → Response → Action',
    'Distinguish strictly between opinions, observations, evidence, and assumptions',
    'Acknowledge trade-offs and handle counterarguments before the listener raises them',
    'Calibrate claims to eliminate credibility-damaging exaggeration',
    'Deliver proposals across three timing speeds: 30s, 60s, and 2 minutes',
    'Engage with a skeptical but reasonable AI stakeholder',
  ],
  activities: [
    // 1. Welcome
    {
      id: 'd23-welcome',
      type: 'welcome',
      title: 'Welcome to Day 23',
      dayNumber: 23,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          'Today you will master respectful persuasion. You will learn to recommend changes, defend them with evidence, acknowledge trade-offs, and guide stakeholders toward mutual agreement.',
      },
    },

    // 2. Persuasion Baseline
    {
      id: 'd23-baseline',
      type: 'recording',
      title: 'Persuasion Baseline',
      description: 'Recommend one meaningful improvement with no preparation to measure your natural persuasive style.',
      dayNumber: 23,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Recommend one specific change that would improve your workplace, university, or community. State the idea, why it matters, and who benefits in 2 minutes.',
        durationSeconds: 120,
        prepTimeSeconds: 20,
        isBaseline: true,
        label: 'Day 23 Persuasion Baseline',
      },
    },

    // 3. Persuasion Interactive Activity
    {
      id: 'd23-persuasion-interactive',
      type: 'persuasion_structure',
      title: 'The Persuasion Architecture & Evidence Drill',
      description: 'Master the 7-part proposal flow, classify evidence vs opinion, and practice tiered pitches.',
      dayNumber: 23,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 8,
      xpReward: 25,
      config: {
        topic: 'Proposal Formulation',
      },
    },

    // 4. Objection Handling Drill
    {
      id: 'd23-objection-drill',
      type: 'objection_handling',
      title: 'Objection Handling: Acknowledge → Respond → Support',
      description: 'Respond to stakeholder pushback without getting defensive.',
      dayNumber: 23,
      order: 4,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        prompt:
          'A manager objects: "We simply don\'t have the budget to trial this tool right now." Acknowledge the constraint, suggest a low-cost pilot, and return to the core benefit.',
        durationSeconds: 60,
      },
    },

    // 5. Main Persuasive Stakeholder Simulation
    {
      id: 'd23-main-simulation',
      type: 'recording',
      title: 'Main Challenge: 3-Minute Stakeholder Proposal',
      description: 'Persuade a skeptical committee to approve your recommendation using evidence and trade-off acknowledgement.',
      dayNumber: 23,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 30,
      config: {
        prompt:
          'Deliver your complete 3-minute proposal: (1) Direct recommendation, (2) Core rationale, (3) Key benefits, (4) Supporting data, (5) Honest limitation and counter-measure, (6) Low-risk action request.',
        durationSeconds: 180,
        isMainChallenge: true,
        prepTimeSeconds: 30,
      },
    },

    // 6. Real-World Mission
    {
      id: 'd23-mission',
      type: 'mission',
      title: 'Day 23 Mission: Make a Supported Recommendation',
      dayNumber: 23,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 20,
      config: {
        missionDescription:
          'Make one recommendation in English today (in a meeting, message, or conversation) and support it with at least two concrete reasons and one acknowledged trade-off.',
        missionOptions: [
          'Recommend a workflow tweak to a colleague using "One approach worth considering is..."',
          'Suggest a study technique or resource to a classmate with supporting evidence',
          'Send a structured voice note recommending an improvement to a group project',
        ],
        conversationFallback: true,
      },
    },

    // 7. Reflection & Scorecard
    {
      id: 'd23-scorecard',
      type: 'scorecard',
      title: 'Day 23 Complete — Persuasion Mastered!',
      dayNumber: 23,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 30,
      config: {},
    },
  ],
  badges: ['persuasion-master'],
  previewNextDay: { title: 'Communicate Like a Leader', dayNumber: 24 },
  week: 4,
};

export default day23;
