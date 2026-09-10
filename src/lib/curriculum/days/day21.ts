// ============================================================
// Day 21 — Week 3 Professional Communication Challenge
// ============================================================

import { DayDefinition } from '@/types';

const day21: DayDefinition = {
  dayNumber: 21,
  title: 'Week 3 Professional Communication Challenge',
  subtitle: 'Day 21 of 30 • Week 3 Milestone & Diagnostic',
  objective:
    'Comprehensive professional assessment synthesizing all Week 3 competencies: networking, meetings, interviews, data presentations, constructive feedback, difficult questions, and negotiation. Evaluate progression against Day 15 and map Week 4 priorities.',
  coreMessage:
    'Professional excellence is not perfection — it is clarity under pressure, structural confidence, and the composure to communicate purposefully in any room.',
  estimatedMinutes: { full: 50, express: 18 },
  todayGoals: [
    'Assess confidence progression against Day 1 and Day 15 benchmarks',
    'Demonstrate fluency across 7 rapid-fire professional mini-drills',
    'Execute an unassisted 10-minute integrated professional simulation',
    'Evaluate your 15-dimension professional communication scorecard',
    'Review 21-day skill trajectory across Fluency, Structure, Vocabulary, and Delivery',
    'Unlock the "Professional Communicator" badge and establish Week 4 priorities',
  ],
  activities: [
    // 1. Welcome
    {
      id: 'd21-welcome',
      type: 'welcome',
      title: 'Welcome to Day 21 — The Week 3 Milestone',
      dayNumber: 21,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          'Congratulations on reaching Day 21! Today is your third major diagnostic milestone. You will test everything you developed this week: networking, meetings, interviews, presentations, feedback, and negotiations.',
      },
    },

    // 2. Midpoint Confidence Snapshot
    {
      id: 'd21-confidence-snapshot',
      type: 'confidence_check',
      title: 'Day 21 Confidence Snapshot',
      description: 'Rate your confidence across professional dimensions to compare with Day 15.',
      dayNumber: 21,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      config: {
        questionText: 'Rate your current confidence in high-stakes professional communication:',
        dimensions: [
          { id: 'networking', label: 'Networking & natural small talk', min: 1, max: 10 },
          { id: 'meetings', label: 'Speaking up & contributing in meetings', min: 1, max: 10 },
          { id: 'interviews', label: 'Structured interview answers (STAR)', min: 1, max: 10 },
          { id: 'presentations', label: 'Presenting and explaining complex data', min: 1, max: 10 },
          { id: 'feedback', label: 'Giving and receiving constructive feedback', min: 1, max: 10 },
          { id: 'negotiation', label: 'Negotiating trade-offs and deadlines', min: 1, max: 10 },
          { id: 'register', label: 'Translating written messages to spoken action', min: 1, max: 10 },
          { id: 'composure', label: 'Buffering sudden or difficult questions', min: 1, max: 10 },
        ],
      },
    },

    // 3. Week 3 Synthesis Review
    {
      id: 'd21-synthesis-review',
      type: 'information_display',
      title: 'Week 3 Frameworks at a Glance',
      dayNumber: 21,
      order: 3,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      config: {
        content:
          'Remember the master frameworks from Week 3:\n\n' +
          '• Day 15: 30/60/120s Elevator Pitch & Common Ground Networking\n' +
          '• Day 16: STATUS → PROGRESS → ISSUE → NEXT STEP (Meeting Updates)\n' +
          '• Day 17: PRESENT → PAST → VALUE → DIRECTION & STAR Framework\n' +
          '• Day 18: WHAT → EVIDENCE → INTERPRETATION & Signposting\n' +
          '• Day 19: Situation-Behavior-Impact (SBI) Feedback & Accountability\n' +
          '• Day 20: Context → Key Message → Action → Owner → Timing & Trade-Offs',
      },
    },

    // 4. Mini-Challenge 1: Elevator Pitch
    {
      id: 'd21-mc-pitch',
      type: 'recording',
      title: 'Mini-Challenge 1: 60-Second Elevator Pitch',
      description: 'Deliver your refined professional pitch with zero filler words.',
      dayNumber: 21,
      order: 4,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Introduce yourself and your focus to a senior stakeholder. Speak for exactly 60 seconds with crisp structure and confidence.',
        durationSeconds: 60,
        prepTimeSeconds: 15,
      },
    },

    // 5. Mini-Challenge 2: Meeting Update
    {
      id: 'd21-mc-meeting',
      type: 'recording',
      title: 'Mini-Challenge 2: Meeting Status Update',
      description: 'Deliver a structured 4-part update in 60 seconds.',
      dayNumber: 21,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Give a 60-second update on a project using: STATUS → PROGRESS → ISSUE → NEXT STEP. Do not ramble.',
        durationSeconds: 60,
        prepTimeSeconds: 15,
      },
    },

    // 6. Mini-Challenge 3: STAR Interview Answer
    {
      id: 'd21-mc-star',
      type: 'recording',
      title: 'Mini-Challenge 3: STAR Behavioral Answer',
      description: 'Answer "Tell me about a time you solved a difficult problem" with clear evidence.',
      dayNumber: 21,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          '"Tell me about a time you resolved an unexpected challenge." Structure your answer using Situation, Task, Action, and Result in 90 seconds.',
        durationSeconds: 90,
        prepTimeSeconds: 20,
      },
    },

    // 7. Mini-Challenge 4: Data Narration
    {
      id: 'd21-mc-data',
      type: 'recording',
      title: 'Mini-Challenge 4: Data & Fact vs. Inference',
      description: 'State a key data observation and clearly separate the fact from your interpretation.',
      dayNumber: 21,
      order: 7,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        prompt:
          'Describe a metric or metric change in your domain: clearly state the verifiable FACT first, followed by your INFERENCE with appropriate hedging language ("This might suggest..."). 60 seconds.',
        durationSeconds: 60,
      },
    },

    // 8. Mini-Challenge 5: SBI Feedback Delivery
    {
      id: 'd21-mc-sbi',
      type: 'recording',
      title: 'Mini-Challenge 5: Constructive SBI Feedback',
      description: 'Deliver constructive feedback on missed deliverables without attacking character.',
      dayNumber: 21,
      order: 8,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        prompt:
          'Deliver 60 seconds of feedback to a teammate who delivered an incomplete report. Strictly follow: Situation (when/where), Behavior (observable action), and Impact (concrete consequence).',
        durationSeconds: 60,
      },
    },

    // 9. Mini-Challenge 6: Hostile Question Buffer
    {
      id: 'd21-mc-buffer',
      type: 'recording',
      title: 'Mini-Challenge 6: Buffer Difficult Questions',
      description: 'Demonstrate composure and buffer phrase mastery.',
      dayNumber: 21,
      order: 9,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        prompt:
          'A skeptical stakeholder interrupts: "Why should we trust these numbers when your last delivery was late?" Buffer the challenge calmly, acknowledge the concern, and redirect with composure. 45 seconds.',
        durationSeconds: 45,
      },
    },

    // 10. Mini-Challenge 7: Email-to-Voice Action Brief
    {
      id: 'd21-mc-email',
      type: 'recording',
      title: 'Mini-Challenge 7: Written-to-Spoken Brief',
      description: 'Deliver a spoken action brief with clear ownership and deadline.',
      dayNumber: 21,
      order: 10,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        prompt:
          'Translate a complex change email into an audio brief for your team in 45 seconds: Context, Action Required, Owner, and Deadline.',
        durationSeconds: 45,
      },
    },

    // 11. Integrated Simulation (Main Assessment)
    {
      id: 'd21-main-simulation',
      type: 'recording',
      title: 'The Integrated Professional Simulation (Independent)',
      description: 'An unassisted, high-stakes capstone simulation covering update, presentation, pushback, and compromise.',
      dayNumber: 21,
      order: 11,
      isRequired: true,
      expressMode: true,
      durationMinutes: 8,
      xpReward: 40,
      config: {
        prompt:
          'Deliver your complete 4-minute capstone address: (1) Strategic project update, (2) Key data evidence with implications, (3) Response to client pushback, and (4) Proposed compromise with timeline agreement. No hints or frameworks on screen — perform completely from memory.',
        durationSeconds: 240,
        isMainChallenge: true,
        prepTimeSeconds: 45,
      },
    },

    // 12. Professional Diagnostic Activity (Day 15 vs 21 Comparison & 4-Week Trend)
    {
      id: 'd21-diagnostic-scorecard',
      type: 'professional_weekly_diagnostic',
      title: 'Week 3 Professional Diagnostic',
      description: 'Analyze your 15-dimension scorecard, Day 15 vs 21 gains, and 21-day fluency trajectory.',
      dayNumber: 21,
      order: 12,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 50,
      config: {},
    },

    // 13. Real-World Mission
    {
      id: 'd21-mission',
      type: 'mission',
      title: 'Week 3 Capstone Mission: High-Impact Execution',
      dayNumber: 21,
      order: 13,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 25,
      config: {
        missionDescription:
          'Demonstrate your professional communication voice in a real environment today.',
        missionOptions: [
          'Lead or contribute purposefully in a meeting without hesitating',
          'Explain complex work or research clearly to someone outside your field',
          'Conduct an SBI feedback conversation or draft a structured proposal',
          'Record an unscripted 3-minute professional update and review your vocal composure',
        ],
        conversationFallback: true,
      },
    },

    // 14. 5-Question Milestone Reflection
    {
      id: 'd21-reflection',
      type: 'reflection',
      title: '21-Day Milestone Reflection',
      description: 'Reflect on your transformation from hesitant translator to structured professional communicator.',
      dayNumber: 21,
      order: 14,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 20,
      config: {
        prompts: [
          'What is the single biggest difference in how you speak today versus Day 1?',
          'Which Week 3 framework felt most empowering: Elevator Pitch, Meeting Updates, STAR, Data Signposts, or SBI?',
          'How do you feel now when entering an unprepared conversation or sudden question?',
          'In what scenario do you still feel pressure or hesitation?',
          'What is your primary commitment for Week 4 mastery?',
        ],
        questions: [
          'What is the single biggest difference in how you speak today versus Day 1?',
          'Which Week 3 framework felt most empowering: Elevator Pitch, Meeting Updates, STAR, Data Signposts, or SBI?',
          'How do you feel now when entering an unprepared conversation or sudden question?',
          'In what scenario do you still feel pressure or hesitation?',
          'What is your primary commitment for Week 4 mastery?',
        ],
      },
    },

    // 15. Milestone Scorecard
    {
      id: 'd21-scorecard',
      type: 'scorecard',
      title: 'Day 21 Complete — Week 3 Mastered!',
      dayNumber: 21,
      order: 15,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 50,
      config: {},
    },
  ],
  badges: ['professional-communicator', 'day-21-finisher'],
  previewNextDay: { title: 'High-Stakes Communication & Executive Mastery', dayNumber: 22 },
  week: 3,
};

export default day21;
