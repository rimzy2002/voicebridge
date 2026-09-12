// ============================================================
// Day 25 — Nuance, Hedging and Diplomacy
// ============================================================

import { DayDefinition } from '@/types';

const day25: DayDefinition = {
  dayNumber: 25,
  title: 'Sound Nuanced, Not Absolute',
  subtitle: 'Day 25 of 30 • Week 4: Advanced Communication',
  objective:
    'Express uncertainty, probability, partial agreement, soft disagreement, cautious recommendations, and diplomatic criticism. Avoid overly absolute language while preserving crystal-clear viewpoints.',
  coreMessage:
    'Inexperienced speakers speak in absolutes. Master communicators use nuance to build trust, invite collaboration, and maintain relationships.',
  estimatedMinutes: { full: 36, express: 12 },
  todayGoals: [
    'Calibrate language across the 5 levels of the Certainty Scale',
    'Deploy diplomatic hedging ("There may be...", "It appears that...") without sounding passive',
    'Express respectful disagreement using qualified agreement as a bridge',
    'Recognize cultural understatement in global English (e.g. "not ideal" meaning "seriously problematic")',
    'Transform harsh, blunt assertions into constructive, professional observations',
    'Complete an unassisted nuance roleplay with balanced recommendations',
  ],
  activities: [
    // 1. Welcome
    {
      id: 'd25-welcome',
      type: 'welcome',
      title: 'Welcome to Day 25',
      dayNumber: 25,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          'Today you will master nuance and diplomatic hedging. Saying "You are completely wrong" creates defensive walls; saying "I see your perspective, but my concern is..." opens productive problem-solving.',
      },
    },

    // 2. Baseline
    {
      id: 'd25-baseline',
      type: 'recording',
      title: 'Nuance Baseline',
      description: 'Respond to an everyday controversial proposition to evaluate your natural calibration of certainty.',
      dayNumber: 25,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Respond to this claim: "Open-plan offices are a terrible mistake and should be eliminated everywhere." Give your perspective in 90 seconds without using extreme absolutes like "always", "never", or "completely".',
        durationSeconds: 90,
        prepTimeSeconds: 20,
        isBaseline: true,
        label: 'Day 25 Nuance Baseline',
      },
    },

    // 3. Nuance Interactive Activity
    {
      id: 'd25-nuance-interactive',
      type: 'certainty_scale',
      title: 'Certainty Calibration & Message Transformer',
      description: 'Explore the 5-tier certainty scale, decode cultural understatements, and rewrite harsh statements.',
      dayNumber: 25,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 8,
      xpReward: 25,
      config: {
        topic: 'Diplomatic Nuance',
      },
    },

    // 4. Diplomatic Disagreement Drill
    {
      id: 'd25-disagreement-drill',
      type: 'diplomatic_disagreement',
      title: 'Diplomatic Disagreement Drill',
      description: 'Practice the formula: Acknowledge General Direction → State Specific Concern → Suggest Alternative.',
      dayNumber: 25,
      order: 4,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        prompt:
          'Your colleague wants to eliminate all documentation to save time. Disagree diplomatically using "I can see the reasoning behind that, but my concern is..."',
        durationSeconds: 60,
      },
    },

    // 5. Main Nuance Roleplay Challenge
    {
      id: 'd25-main-challenge',
      type: 'recording',
      title: 'Main Challenge: 3-Minute Strategic Discussion',
      description: 'Participate in a high-stakes discussion requiring 1 qualified agreement, 1 hedged concern, and 1 calibrated recommendation.',
      dayNumber: 25,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 30,
      config: {
        prompt:
          'Deliver your complete 3-minute nuanced response: (1) Qualified agreement on the overarching goal, (2) Hedged concern regarding operational risk, (3) Diplomatic alternative suggestion, (4) Collaborative check.',
        durationSeconds: 180,
        isMainChallenge: true,
        prepTimeSeconds: 30,
      },
    },

    // 6. Real-World Mission
    {
      id: 'd25-mission',
      type: 'mission',
      title: 'Day 25 Mission: Use Diplomatic Hedging in Real Life',
      dayNumber: 25,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 20,
      config: {
        missionDescription:
          'Use at least one diplomatic phrasing technique in a real English email, meeting, or conversation today (e.g. "It seems likely that...", "One concern might be...").',
        missionOptions: [
          'Soften a critique in a meeting by acknowledging intent first',
          'Use "Based on what we know now..." when asked for an estimate',
          'Rephrase a direct feedback message into a collaborative inquiry',
        ],
        conversationFallback: true,
      },
    },

    // 7. Reflection & Scorecard
    {
      id: 'd25-scorecard',
      type: 'scorecard',
      title: 'Day 25 Complete — Diplomatic Nuance Mastered!',
      dayNumber: 25,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 30,
      config: {},
    },
  ],
  badges: ['diplomatic-speaker'],
  previewNextDay: { title: 'Debate Ideas Without Losing the Conversation', dayNumber: 26 },
  week: 4,
};

export default day25;
