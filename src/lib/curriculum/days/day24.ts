// ============================================================
// Day 24 — Leadership Communication
// ============================================================

import { DayDefinition } from '@/types';

const day24: DayDefinition = {
  dayNumber: 24,
  title: 'Communicate Like a Leader',
  subtitle: 'Day 24 of 30 • Week 4: Advanced Communication',
  objective:
    'Develop executive presence through clarity, directional focus, accountability, deep listening, decision explanation, and practical encouragement. Learn to lead without authoritarian domination.',
  coreMessage:
    'Leadership communication is not about demanding compliance — it is about creating clarity so people know where we are going and why their contribution matters.',
  estimatedMinutes: { full: 40, express: 14 },
  todayGoals: [
    'Execute the 6-part leadership message framework: Situation → Priority → Action → Responsibility → Reason → Check',
    'Delegate tasks collaboratively without sounding demanding or micromanaging',
    'Explain difficult decisions transparently, including trade-offs and rejected alternatives',
    'Give clear direction under conditions of uncertainty without feigning false confidence',
    'Motivate teams with practical milestones instead of corporate clichés',
    'Lead an unscripted multi-party problem-solving simulation',
  ],
  activities: [
    // 1. Welcome
    {
      id: 'd24-welcome',
      type: 'welcome',
      title: 'Welcome to Day 24',
      dayNumber: 24,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          'Today you step into the role of a leader. Great leaders communicate with clarity, empathy, and composure. Today you will practice guiding confused groups, delegating ownership, and explaining tough decisions under uncertainty.',
      },
    },

    // 2. Leadership Baseline
    {
      id: 'd24-baseline',
      type: 'recording',
      title: 'Leadership Direction Baseline',
      description: 'Step into an ambiguous situation and deliver clear team direction in 90 seconds.',
      dayNumber: 24,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'A team is confused about contradictory client feedback and has stalled. Step forward and give direction in 90 seconds: state the priority, what needs to happen, and who owns the next action.',
        durationSeconds: 90,
        prepTimeSeconds: 20,
        isBaseline: true,
        label: 'Day 24 Leadership Baseline',
      },
    },

    // 3. Leadership Interactive Activity
    {
      id: 'd24-leadership-interactive',
      type: 'leadership_framework',
      title: 'Leadership Message & Delegation Engine',
      description: 'Master the 6-step message framework, respectful delegation, and honest direction under uncertainty.',
      dayNumber: 24,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 8,
      xpReward: 25,
      config: {
        topic: 'Executive Communication',
      },
    },

    // 4. Decision Explanation Drill
    {
      id: 'd24-decision-drill',
      type: 'decision_explanation',
      title: 'Explaining a Tough Decision & Trade-Offs',
      description: 'Practice sharing the "Why" behind an unpopular or difficult organizational choice.',
      dayNumber: 24,
      order: 4,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        prompt:
          'Your team had to choose between shipping on time with fewer features, or delaying by a month. You chose to ship on time. Explain this decision to the team using "We considered...", "The reason we chose this...", and "The trade-off we accepted is...".',
        durationSeconds: 60,
      },
    },

    // 5. Main Leadership Simulation
    {
      id: 'd24-main-simulation',
      type: 'recording',
      title: 'Main Challenge: 3-Minute Crisis Alignment Address',
      description: 'Lead an urgent meeting through a project pivot: clarify the issue, set priorities, delegate, explain trade-offs, and align the group.',
      dayNumber: 24,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 30,
      config: {
        prompt:
          'Deliver your complete 3-minute leadership address: (1) Situation assessment, (2) Top priority, (3) Immediate action plan, (4) Explicit delegation to 2 team members, (5) Honest acknowledgement of uncertainty, (6) Verification check.',
        durationSeconds: 180,
        isMainChallenge: true,
        prepTimeSeconds: 30,
      },
    },

    // 6. Real-World Mission
    {
      id: 'd24-mission',
      type: 'mission',
      title: 'Day 24 Mission: Lead a Planning Conversation',
      dayNumber: 24,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 20,
      config: {
        missionDescription:
          'Lead a short English planning conversation (or simulate one with a colleague or AI). Clearly define the priority, delegate one responsibility, and verify understanding.',
        missionOptions: [
          'Take the initiative in a meeting or study group to summarize next steps and ownership',
          'Explain an upcoming schedule change to a peer using "The reason we are doing this is..."',
          'Record an audio brief giving direction to a team on a shared goal',
        ],
        conversationFallback: true,
      },
    },

    // 7. Reflection & Scorecard
    {
      id: 'd24-scorecard',
      type: 'scorecard',
      title: 'Day 24 Complete — Leadership Voice Mastered!',
      dayNumber: 24,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 30,
      config: {},
    },
  ],
  badges: ['leadership-communicator'],
  previewNextDay: { title: 'Sound Nuanced, Not Absolute', dayNumber: 25 },
  week: 4,
};

export default day24;
