// ============================================================
// Day 14 — Week 2 Fluency Challenge & Diagnostic Milestone
// ============================================================

import { DayDefinition } from '@/types';

const day14: DayDefinition = {
  dayNumber: 14,
  title: 'Week 2 Fluency Challenge',
  subtitle: 'Day 14 of 30 • Week 2 Milestone Diagnostic',
  objective:
    'Comprehensive Week 2 review and diagnostic milestone. Measure structural growth across opinion building, discourse markers, summarization, spontaneous response speed, diplomatic negotiation, and presentations against your Day 7 baseline.',
  coreMessage:
    'You are no longer just speaking English—you are commanding discussions, framing arguments, and thinking on your feet.',
  estimatedMinutes: { full: 46, express: 18 },
  todayGoals: [
    'Synthesize the 6 Week 2 fluency competencies',
    'Re-test your personalized Week 1 priority under timed pressure',
    'Complete the 5-part integrated spoken fluency challenge',
    'Compare Day 7 vs Day 14 communicative analytics across 11 dimensions',
    'Unlock Week 3: Professional Communication Mastery',
  ],
  activities: [
    // 1. Silent Confidence Check
    {
      id: 'd14-confidence-check',
      type: 'confidence_check',
      title: 'Week 2 Fluency Growth Check',
      dayNumber: 14,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      config: {
        questionText: 'Rate your confidence compared to 7 days ago (Day 7):',
        dimensions: [
          { id: 'fluency_flow', label: 'Overall fluency & continuous flow', min: 1, max: 10 },
          { id: 'thought_speed', label: 'Thinking fast without translation', min: 1, max: 10 },
          { id: 'holding_opinions', label: 'Holding your ground in disagreement', min: 1, max: 10 },
        ],
      },
    },

    // 2. Week 2 Memory Sprint
    {
      id: 'd14-memory-sprint',
      type: 'framework_lesson',
      title: 'Week 2 Memory Sprint: The 6 Core Weapons',
      dayNumber: 14,
      order: 2,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        steps: [
          { title: 'Day 8: Opinions', description: 'Position → Reason → Evidence → Counter → Response → Conclusion' },
          { title: 'Day 9: Connectors', description: 'The 6 functional families (Adding, Contrast, Result, Example, Perspective, Conclusion)' },
          { title: 'Day 10: Listening', description: 'Keyword hunting & 3-2-1 progressive compression' },
          { title: 'Day 11: Spontaneity', description: '5-Second Rule, Story Cubes, and immediate momentum' },
          { title: 'Day 12: Difficult Scenarios', description: 'Diplomatic conditions: If / Unless / As long as' },
          { title: 'Day 13: Presentations', description: 'Signposting, Elevator Pitch Rotation, and executive Q&A' },
        ],
      },
    },

    // 3. Opinion Challenge
    {
      id: 'd14-opinion-challenge',
      type: 'recording',
      title: 'Challenge 1: Structured Opinion & Counter Rebuttal',
      dayNumber: 14,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 20,
      config: {
        prompt:
          'State your position on whether four-day work weeks should be universally adopted. Speak for 90 seconds, address the skeptic counterargument, and conclude decisively.',
        durationSeconds: 90,
        prepTimeSeconds: 10,
      },
    },

    // 4. Connector Challenge
    {
      id: 'd14-connector-challenge',
      type: 'connector_activation',
      title: 'Challenge 2: Multi-Connector Synthesis',
      dayNumber: 14,
      order: 4,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {},
    },

    // 5. Listening + Summary
    {
      id: 'd14-listening-summary',
      type: 'dictogloss',
      title: 'Challenge 3: Unseen Audio Summarization',
      dayNumber: 14,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 20,
      config: {
        audioText:
          'High-performing organizations recognize that psychological safety is not about comfort—it is about candor. When contributors feel safe proposing radical ideas and admitting mistakes promptly, innovation velocity outpaces risk-averse competitors by triple digits.',
      },
    },

    // 6. 3-2-1 Compression Test
    {
      id: 'd14-321-compression',
      type: 'recording',
      title: 'Challenge 4: 3-2-1 Executive Distillation',
      dayNumber: 14,
      order: 6,
      isRequired: true,
      expressMode: false,
      durationMinutes: 5,
      xpReward: 25,
      config: {
        prompt:
          'Distill the psychological safety concept across 2 progressive rounds: Round 1 (90s) full analysis → Round 2 (30s) bottom-line executive takeaway.',
        rounds: [
          { label: 'Round 1 (90 Seconds)', durationSeconds: 90, guidance: 'Include context, problem, mechanism, and organizational proof.' },
          { label: 'Round 2 (30 Seconds)', durationSeconds: 30, guidance: 'Absolute executive punch: state the takeaway in 2 sentences.' },
        ],
      },
    },

    // 7. Impromptu 5-Second Test
    {
      id: 'd14-impromptu-test',
      type: 'recording',
      title: 'Challenge 5: 5-Second Impromptu Speaking Test',
      dayNumber: 14,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 20,
      config: {
        prompt:
          'Prompt: "If you could change one standard operating procedure at your workplace or university tomorrow, what would it be?" Start speaking within 5 seconds without notes for 90 seconds.',
        isFiveSecondRule: true,
        durationSeconds: 90,
      },
    },

    // 8. Difficult Situation Negotiation
    {
      id: 'd14-difficult-situation',
      type: 'recording',
      title: 'Challenge 6: High-Stakes Negotiation Simulation',
      dayNumber: 14,
      order: 8,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 20,
      config: {
        prompt:
          'A cross-functional partner rejects your proposed timeline in front of senior executives. Deliver a 75-second diplomatic rebuttal: acknowledge their priority, state conditions using "As long as...", and propose a concrete compromise.',
        durationSeconds: 75,
      },
    },

    // 9. Presentation Challenge
    {
      id: 'd14-presentation-challenge',
      type: 'recording',
      title: 'Challenge 7: 2-Minute Signposted Presentation',
      dayNumber: 14,
      order: 9,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 25,
      config: {
        prompt:
          'Deliver a 2-minute presentation proposing an important operational innovation. Use explicit signposts ("Let me begin with...", "This brings me to...") and close with impact.',
        durationSeconds: 120,
        prepTimeSeconds: 15,
      },
    },

    // 10. Personalized Priority #1 Retest
    {
      id: 'd14-priority-retest',
      type: 'recording',
      title: 'Challenge 8: Personalized Priority Retest',
      dayNumber: 14,
      order: 10,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 25,
      config: {
        prompt:
          'Targeted Retest: Deliver a 60-second response demonstrating mastery over your Week 1 priority (e.g. tense stability, filler elimination, or rapid retrieval). Zero slip-ups permitted.',
        durationSeconds: 60,
      },
    },

    // 11. Week 2 Integrated Challenge
    {
      id: 'd14-integrated-challenge',
      type: 'recording',
      title: 'Capstone: Integrated Fluency Challenge',
      dayNumber: 14,
      order: 11,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 35,
      config: {
        prompt:
          'Final 3-minute capstone: Synthesize opinion, evidence, alternative perspectives, and executive delivery in a seamless 180-second spoken discourse. No reading, no hesitating.',
        durationSeconds: 180,
        prepTimeSeconds: 20,
      },
    },

    // 12. Week 2 Diagnostic Scorecard
    {
      id: 'd14-week2-scorecard',
      type: 'weekly_diagnostic_v2',
      title: 'Week 2 Comparative Diagnostic Scorecard',
      dayNumber: 14,
      order: 12,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 30,
      config: {},
    },

    // 13. Weekly Reflection
    {
      id: 'd14-weekly-reflection',
      type: 'reflection',
      title: 'Week 2 Fluency Milestone Reflection',
      dayNumber: 14,
      order: 13,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        prompts: [
          'What is the single biggest difference in how you speak today compared to Day 1?',
          'Which communication framework (6-stage opinion, cleft emphasis, or 5-second anchor) gave you the most confidence?',
          'What is your primary goal as you transition into Week 3 Professional Communication?',
        ],
      },
    },

    // 14. Week 3 Readiness & Unlock
    {
      id: 'd14-week3-readiness',
      type: 'welcome',
      title: 'Week 3 Unlocked: Communicate Professionally',
      dayNumber: 14,
      order: 14,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 20,
      config: {
        content:
          'Congratulations on conquering Week 2! You have successfully built structural fluency and spontaneous momentum.\n\nNext week, we enter Week 3: Communicate Professionally (Days 15–21), featuring workplace meeting simulations, STAR interview roleplays, data presentations, and executive negotiation.',
      },
    },
  ],
  badges: ['fluency-pioneer', 'week2-complete'],
  previewNextDay: {
    title: 'Professional Networking & High-Stakes Workplace Openers',
    dayNumber: 15,
  },
  week: 2,
};

export default day14;
