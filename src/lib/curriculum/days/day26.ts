// ============================================================
// Day 26 — Debate and Defend Ideas
// ============================================================

import { DayDefinition } from '@/types';

const day26: DayDefinition = {
  dayNumber: 26,
  title: 'Debate Ideas Without Losing the Conversation',
  subtitle: 'Day 26 of 30 • Week 4: Advanced Communication',
  objective:
    'Combine structured opinion, active listening, evidence presentation, and counterargument defense. Develop intellectual flexibility and debate ideas passionately without interpersonal confrontation.',
  coreMessage:
    'A great debate is not about winning an argument — it is about clarifying reality through rigorous, respectful dialogue.',
  estimatedMinutes: { full: 40, express: 14 },
  todayGoals: [
    'Construct logically coherent arguments using Claim → Reason → Evidence → Counter → Response → Conclusion',
    'Master the Steelman technique: articulate the opponent\'s view in its strongest possible form',
    'Play Devil\'s Advocate to test and strengthen your own assumptions',
    'Connect claims directly to concrete proof and eliminate unsupported generalizations',
    'Execute timed debate arguments across 60s, 45s, and 30s rounds',
    'Defend a position against AI counterarguments focusing strictly on logic rather than identity',
  ],
  activities: [
    // 1. Welcome
    {
      id: 'd26-welcome',
      type: 'welcome',
      title: 'Welcome to Day 26',
      dayNumber: 26,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          'Today you step into the debate arena. Debating in English builds spontaneous fluency, structural discipline, and quick mental retrieval. Remember: challenge ideas vigorously while treating the other person with complete respect.',
      },
    },

    // 2. Baseline
    {
      id: 'd26-baseline',
      type: 'recording',
      title: 'Debate Baseline',
      description: 'Take a stand on a controversial motion and defend it for 2 minutes with no preparation.',
      dayNumber: 26,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Take a position on this statement: "Should repetitive human work be automated wherever technically possible?" Defend your position with at least two reasons and one example in 2 minutes.',
        durationSeconds: 120,
        prepTimeSeconds: 20,
        isBaseline: true,
        label: 'Day 26 Debate Baseline',
      },
    },

    // 3. Debate Interactive Activity
    {
      id: 'd26-debate-interactive',
      type: 'argument_structure',
      title: 'Argument Architecture & Steelman Drill',
      description: 'Master the 6-part argument structure, practice the Steelman technique, and run timed rounds.',
      dayNumber: 26,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 8,
      xpReward: 25,
      config: {
        topic: 'Structured Debate',
      },
    },

    // 4. Devil\'s Advocate Drill
    {
      id: 'd26-devil-advocate',
      type: 'devil_advocate',
      title: 'Devil\'s Advocate: Argue the Opposite Side',
      description: 'Argue vigorously for the position you personally disagree with to stretch mental agility.',
      dayNumber: 26,
      order: 4,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        prompt:
          'Regardless of your personal view, argue for 60 seconds that strict daily in-office attendance produces superior long-term innovation compared to remote work.',
        durationSeconds: 60,
      },
    },

    // 5. Main AI Debate Simulation
    {
      id: 'd26-main-simulation',
      type: 'recording',
      title: 'Main Challenge: 3-Minute Formal Debate Defense',
      description: 'Deliver your primary case, steelman the opposing critique, and deliver an evidence-backed conclusion.',
      dayNumber: 26,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 30,
      config: {
        prompt:
          'Deliver a complete 3-minute debate defense: (1) Unambiguous Claim, (2) Core Reason, (3) Concrete Evidence, (4) Fair Steelman of opponent\'s strongest point, (5) Rebuttal showing the key distinction, (6) Resonant conclusion.',
        durationSeconds: 180,
        isMainChallenge: true,
        prepTimeSeconds: 30,
      },
    },

    // 6. Real-World Mission
    {
      id: 'd26-mission',
      type: 'mission',
      title: 'Day 26 Mission: The Steelman Conversation',
      dayNumber: 26,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 20,
      config: {
        missionDescription:
          'Discuss a mild topic with a colleague or friend in English. Before stating your viewpoint, summarize their position fairly using: "If I understand correctly, the strongest reason for your view is..."',
        missionOptions: [
          'Discuss a project approach and steelman your peer\'s proposal first',
          'Debate a tech framework choice with a developer friend',
          'Record an audio summary of an article from a perspective you disagree with',
        ],
        conversationFallback: true,
      },
    },

    // 7. Reflection & Scorecard
    {
      id: 'd26-scorecard',
      type: 'scorecard',
      title: 'Day 26 Complete — Debate Mastery Unlocked!',
      dayNumber: 26,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 30,
      config: {},
    },
  ],
  badges: ['debate-champion'],
  previewNextDay: { title: 'Stay Clear When Questions Get Difficult', dayNumber: 27 },
  week: 4,
};

export default day26;
