// ============================================================
// Day 19 — Handle Difficult Conversations Professionally
// ============================================================

import { DayDefinition } from '@/types';

const day19: DayDefinition = {
  dayNumber: 19,
  title: 'Handle Difficult Conversations Professionally',
  subtitle: 'Day 19 of 30 • Week 3: Communicate Professionally',
  objective:
    'Master constructive feedback delivery, addressing mistakes with clear accountability, diplomatic disagreement, and navigating high-stakes interpersonal situations using the SBI framework.',
  coreMessage:
    'Difficult conversations are not about winning an argument — they are about solving problems constructively while preserving trust and professional relationships.',
  estimatedMinutes: { full: 46, express: 14 },
  todayGoals: [
    'Deliver objective feedback using the Situation-Behavior-Impact (SBI) model',
    'Acknowledge mistakes professionally without excuses',
    'Receive critical feedback with calm composure',
    'Request assistance clearly with context and proposed solutions',
    'Buffer difficult or hostile questions smoothly',
    'Navigate a realistic difficult conversation simulation',
  ],
  activities: [
    // 1. Welcome
    {
      id: 'd19-welcome',
      type: 'welcome',
      title: 'Welcome to Day 19',
      dayNumber: 19,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          'Today is about handling high-stakes communication: giving constructive feedback, admitting mistakes with accountability, asking for help, and managing disagreement with poise.',
      },
    },

    // 2. Baseline Difficult Conversation
    {
      id: 'd19-baseline',
      type: 'recording',
      title: 'Baseline: Difficult Conversation',
      description: 'Handle a challenging communication scenario with no prior preparation.',
      dayNumber: 19,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        prompt:
          'A colleague or peer missed an agreed deadline that now impacts your work. Tell them what happened and address the issue directly. Speak for 60–90 seconds.',
        durationSeconds: 90,
        isBaseline: true,
        label: 'Difficult Conversation Baseline',
      },
      trackVariants: {
        student: {
          prompt:
            'A group member did not complete their section of the assignment before the internal deadline. Address the situation directly and constructively in 60–90 seconds.',
        },
        general: {
          prompt:
            'A friend or community partner forgot an agreement that now affects your plans. Explain the issue directly and calmly in 60–90 seconds.',
        },
      },
    },

    // 3. Direct vs Rude Framework
    {
      id: 'd19-direct-vs-rude',
      type: 'framework_lesson',
      title: 'Direct vs. Rude: The Professional Boundary',
      dayNumber: 19,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      config: {
        frameworkName: 'Direct vs. Rude Communication',
        steps: [
          { title: 'Focus on Behavior, Not Character', description: '"The report was missing three tables" vs "You are careless."' },
          { title: 'Describe Observable Impact', description: '"Because the numbers were delayed, we could not finalize the budget on time."' },
          { title: 'Maintain Neutral Vocal Tone', description: 'Speak with controlled pacing and downward inflection, avoiding accusatory rising pitch.' },
          { title: 'Invite Mutual Resolution', description: '"How can we structure this so we hit tomorrow\'s milestone together?"' },
        ],
        content:
          'Being direct saves time and reduces ambiguity. Being rude attacks the person. Professional feedback is 100% focused on observable actions and shared outcomes.',
      },
    },

    // 4. SBI Model Teaching
    {
      id: 'd19-sbi-teach',
      type: 'sbi_feedback',
      title: 'The SBI Feedback Model',
      description: 'Learn the gold standard Situation-Behavior-Impact structure.',
      dayNumber: 19,
      order: 4,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        startStep: 'sbi_teach',
      },
    },

    // 5. SBI Practice
    {
      id: 'd19-sbi-practice',
      type: 'sbi_feedback',
      title: 'Practice: Constructive SBI Feedback',
      description: 'Transform subjective complaints into structured SBI feedback.',
      dayNumber: 19,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        startStep: 'sbi_practice',
      },
    },

    // 6. Receiving Feedback Protocol
    {
      id: 'd19-receive-feedback',
      type: 'constructive_feedback',
      title: 'Protocol for Receiving Critical Feedback',
      description: 'Master the four-step response to unexpected criticism.',
      dayNumber: 19,
      order: 6,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        startStep: 'receive',
      },
    },

    // 7. Explaining a Mistake & Accountability
    {
      id: 'd19-mistake-framework',
      type: 'apology_explanation',
      title: 'Accountability: Explaining a Mistake',
      description: 'Own an error professionally without excuses or over-apologizing.',
      dayNumber: 19,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        startStep: 'mistake',
      },
    },

    // 8. Professional Apology Practice
    {
      id: 'd19-apology-practice',
      type: 'recording',
      title: 'Practice: The Proportional Apology',
      description: 'Deliver an executive apology focused on corrective action.',
      dayNumber: 19,
      order: 8,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        prompt:
          'You accidentally sent an unverified document to a client or team. Apologize clearly, explain what happened without excuses, and state your immediate fix.',
        durationSeconds: 60,
        prepTimeSeconds: 15,
      },
    },

    // 9. Requesting Help Framework
    {
      id: 'd19-request-help',
      type: 'constructive_feedback',
      title: 'The Clear Help Request',
      description: 'Ask for support with clarity: context + attempted steps + specific request.',
      dayNumber: 19,
      order: 9,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        startStep: 'request_help',
      },
    },

    // 10. Buffer Challenging Questions
    {
      id: 'd19-hostile-questions',
      type: 'hostile_question',
      title: 'Buffering Difficult Questions',
      description: 'Use diplomatic pause buffers before responding to aggressive inquiry.',
      dayNumber: 19,
      order: 10,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        startStep: 'hostile',
      },
    },

    // 11. Difficult Conversation Roleplay
    {
      id: 'd19-roleplay-simulation',
      type: 'difficult_conversation',
      title: 'Difficult Conversation Simulation',
      description: 'Select a scenario and conduct a realistic difficult conversation.',
      dayNumber: 19,
      order: 11,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 25,
      config: {
        startStep: 'roleplay',
      },
    },

    // 12. Main Challenge: 5-Minute Resolution Challenge
    {
      id: 'd19-main-challenge',
      type: 'recording',
      title: 'Main Challenge: High-Stakes Conversation',
      description: 'Address an escalating disagreement and negotiate an actionable path forward.',
      dayNumber: 19,
      order: 12,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 35,
      config: {
        prompt:
          'Deliver an integrated 3-minute conversation address: (1) Frame the situation objectively using SBI, (2) Validate the other party\'s constraints, and (3) Propose an actionable compromise.',
        durationSeconds: 180,
        isMainChallenge: true,
        prepTimeSeconds: 30,
      },
    },

    // 13. Mission
    {
      id: 'd19-mission',
      type: 'mission',
      title: 'Mission: Constructive Communication in the Wild',
      dayNumber: 19,
      order: 13,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        missionDescription:
          'Apply an SBI structure or professional buffer phrase in an email, voice note, or discussion today.',
        missionOptions: [
          'Give someone feedback using Situation-Behavior-Impact',
          'Use a buffer phrase when asked a tough or sudden question',
          'Frame a request for help by stating what you tried first',
          'Record an apology scenario using the accountability framework',
        ],
        conversationFallback: true,
      },
    },

    // 14. Scorecard
    {
      id: 'd19-scorecard',
      type: 'scorecard',
      title: 'Day 19 Complete',
      dayNumber: 19,
      order: 14,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 30,
      config: {},
    },
  ],
  badges: ['feedback-master', 'day-19-finisher'],
  previewNextDay: { title: 'Turn Written Messages into Clear Spoken Action', dayNumber: 20 },
  week: 3,
};

export default day19;
