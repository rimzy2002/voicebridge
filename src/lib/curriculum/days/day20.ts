// ============================================================
// Day 20 — Turn Written Messages into Clear Spoken Action
// ============================================================

import { DayDefinition } from '@/types';

const day20: DayDefinition = {
  dayNumber: 20,
  title: 'Turn Written Messages into Clear Spoken Action',
  subtitle: 'Day 20 of 30 • Week 3: Communicate Professionally',
  objective:
    'Bridge written and spoken communication: extract actionable points from dense text, shift registers appropriately, and practice trade-off negotiations to achieve mutual agreement.',
  coreMessage:
    'Never read an email aloud word-for-word. Translate written complexity into purposeful spoken action, and protect timelines through respectful negotiation.',
  estimatedMinutes: { full: 45, express: 13 },
  todayGoals: [
    'Extract core actions using Context → Key Message → Action → Owner → Timing',
    'Translate dense emails into crisp spoken voice notes or updates',
    'Adapt tone seamlessly between formal written, professional spoken, and conversational English',
    'Identify ambiguity in incoming requests and seek clarifying details',
    'Negotiate deadlines and resource constraints using trade-offs',
    'Confirm shared agreements clearly and definitively',
  ],
  activities: [
    // 1. Welcome
    {
      id: 'd20-welcome',
      type: 'welcome',
      title: 'Welcome to Day 20',
      dayNumber: 20,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          'Today you bridge the gap between written messages and spoken speech. You will practice reading complex emails, delivering verbal summaries, shifting register, and negotiating realistic deadlines.',
      },
    },

    // 2. Baseline Email-to-Voice Brief
    {
      id: 'd20-baseline',
      type: 'recording',
      title: 'Baseline: Verbal Email Briefing',
      description: 'Read a fast prompt and summarize the core takeaway aloud with no prep.',
      dayNumber: 20,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        prompt:
          'Imagine you just received an urgent email with multiple paragraphs about a project delay. Summarize the key point and immediate next step to your manager in 45 seconds.',
        durationSeconds: 60,
        isBaseline: true,
        label: 'Email to Voice Baseline',
      },
      trackVariants: {
        student: {
          prompt:
            'Imagine your professor just sent an announcement changing the assignment scope and rubric. Summarize what changed to your group member in 45 seconds.',
        },
        general: {
          prompt:
            'Imagine an organization or vendor sent a lengthy update about changing event schedules. Brief your family or team in 45 seconds.',
        },
      },
    },

    // 3. Action Extraction Framework
    {
      id: 'd20-extraction-framework',
      type: 'framework_lesson',
      title: 'The Action Extraction Framework',
      dayNumber: 20,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      config: {
        frameworkName: 'Context → Key Message → Action → Owner → Timing',
        steps: [
          { letter: 'C', title: 'Context', description: 'Why are we talking? "Regarding the Q3 launch email..."' },
          { letter: 'M', title: 'Key Message', description: 'The bottom line: "Testing uncovered critical blockers that push back our date."' },
          { letter: 'A', title: 'Action', description: 'What needs to happen: "Each lead must submit an impact assessment."' },
          { letter: 'O', title: 'Owner', description: 'Who is accountable: "Sarah is coordinating, and our team owns the client impact section."' },
          { letter: 'T', title: 'Timing', description: 'The hard deadline: "Due by 5 PM Thursday before Friday\'s sync."' },
        ],
        content:
          'Written text buries the lead. Verbal briefings put the lead in the first sentence. Always state what happened and what must be done next.',
      },
    },

    // 4. Email-to-Voice Reading & Summary
    {
      id: 'd20-email-reading',
      type: 'email_to_voice',
      title: 'Read & Verbalize Written Scenario',
      description: 'Review a track-specific email and formulate your verbal response.',
      dayNumber: 20,
      order: 4,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        startStep: 'read',
      },
    },

    // 5. Spoken Summary & Voicemail Practice
    {
      id: 'd20-voicemail-drill',
      type: 'email_to_voice',
      title: 'The 60-Second Voicemail Update',
      description: 'Record an executive audio brief based on the written message.',
      dayNumber: 20,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        startStep: 'voicemail',
      },
    },

    // 6. Register Shifting Lesson
    {
      id: 'd20-register-lesson',
      type: 'framework_lesson',
      title: 'Register Shifting: Formal Written vs. Spoken Professional',
      dayNumber: 20,
      order: 6,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      config: {
        frameworkName: '3 Register Tiers',
        steps: [
          { title: 'Formal Written', description: '"Please be advised that the delivery date has been rescheduled."' },
          { title: 'Professional Spoken', description: '"Just wanted to let you know our delivery date has shifted back by a week."' },
          { title: 'Casual Spoken', description: '"Hey, heads up — looks like the shipment is running late."' },
        ],
        content:
          'Speaking in formal written phrases sounds stiff and unnatural. Using professional spoken phrasing keeps you accessible, clear, and authoritative.',
      },
    },

    // 7. Register Shifting Practice
    {
      id: 'd20-register-practice',
      type: 'register_switch',
      title: 'Practice: Register Switch',
      description: 'Convert bureaucratic written phrases into natural conversational speech.',
      dayNumber: 20,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        startStep: 'register',
      },
    },

    // 8. Concision Drill
    {
      id: 'd20-concision-drill',
      type: 'email_to_voice',
      title: 'The 30-Second Concision Drill',
      description: 'Condense an entire 300-word email into exactly 30 seconds of high-impact speech.',
      dayNumber: 20,
      order: 8,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        startStep: 'concise',
      },
    },

    // 9. Negotiation & Trade-off Language
    {
      id: 'd20-negotiation-teach',
      type: 'negotiation_roleplay',
      title: 'Trade-off Negotiation Language',
      description: 'Learn language for proposing alternatives and resolving deadline conflicts.',
      dayNumber: 20,
      order: 9,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        startStep: 'teach',
      },
    },

    // 10. Negotiation Scenario & Proposals
    {
      id: 'd20-negotiation-practice',
      type: 'negotiation_roleplay',
      title: 'Negotiating Under Constraints',
      description: 'Encounter a pushback scenario and propose a viable compromise.',
      dayNumber: 20,
      order: 10,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 20,
      config: {
        startStep: 'scenario',
      },
    },

    // 11. Confirming Mutual Agreement
    {
      id: 'd20-agreement-confirm',
      type: 'negotiation_roleplay',
      title: 'Closing the Loop: Agreement Confirmation',
      description: 'Summarize the final compromise clearly to prevent post-meeting misunderstandings.',
      dayNumber: 20,
      order: 11,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        startStep: 'confirm',
      },
    },

    // 12. Main Integrated Challenge
    {
      id: 'd20-main-challenge',
      type: 'recording',
      title: 'Main Challenge: Email-to-Negotiation Audio',
      description: 'Synthesize written analysis, verbal briefing, and a proposed trade-off in a single 3-minute delivery.',
      dayNumber: 20,
      order: 12,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 35,
      config: {
        prompt:
          'Deliver a 3-minute recorded simulation: (1) Summarize the critical written message, (2) Explain why the current deadline is high-risk, and (3) Propose two alternative trade-offs with clear rationale.',
        durationSeconds: 180,
        isMainChallenge: true,
        prepTimeSeconds: 30,
      },
    },

    // 13. Mission with Privacy Notice
    {
      id: 'd20-mission',
      type: 'mission',
      title: 'Mission: Real-World Spoken Translation',
      dayNumber: 20,
      order: 13,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        missionDescription:
          'Take a real written message (email, message, or document) and verbalize it out loud to a colleague or as a practice voice memo. Note: Do not share sensitive or private company data.',
        missionOptions: [
          'Call or voice-note a colleague to summarize an incoming email',
          'Practice translating a formal written announcement into a conversational update',
          'Propose a trade-off or deadline alternative during a real discussion',
          'Record a 45-second audio briefing of a news article or paper',
        ],
        conversationFallback: true,
      },
    },

    // 14. Scorecard
    {
      id: 'd20-scorecard',
      type: 'scorecard',
      title: 'Day 20 Complete',
      dayNumber: 20,
      order: 14,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 30,
      config: {},
    },
  ],
  badges: ['negotiator', 'day-20-finisher'],
  previewNextDay: { title: 'Professional Communication Challenge (Major Milestone)', dayNumber: 21 },
  week: 3,
};

export default day20;
