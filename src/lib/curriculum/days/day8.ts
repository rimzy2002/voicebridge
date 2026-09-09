// ============================================================
// Day 8 — Express Opinions and Disagree Naturally
// ============================================================

import { DayDefinition } from '@/types';

const day8: DayDefinition = {
  dayNumber: 8,
  title: 'Express Opinions and Disagree Naturally',
  subtitle: 'Day 8 of 30 • Week 2: Build Fluency',
  objective:
    'Help the learner move from simple statements to structured 6-stage opinions (Position, Reason, Evidence, Other Side, Response, Conclusion) and disagree respectfully without freezing.',
  coreMessage:
    'True fluency begins when you can hold your ground with respectful, structured opinions and embrace differing perspectives with poise.',
  estimatedMinutes: { full: 42, express: 15 },
  todayGoals: [
    'Express structured opinions clearly using evidence',
    'Navigate the full agreement spectrum (Strong to Qualified)',
    'Disagree respectfully without sounding confrontational',
    'Rebut counterarguments directly and maintain discussion flow',
    'Complete real-world discussion micro-mission',
  ],
  activities: [
    // 1. Welcome
    {
      id: 'd8-welcome',
      type: 'welcome',
      title: 'Welcome to Day 8 — Build Fluency',
      dayNumber: 8,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          "Welcome to Week 2! Last week you established your speaking habit and de-fossilized core errors. Today we elevate your depth: moving from 'I think this is good' to compelling, nuanced opinions that can withstand disagreement.",
      },
    },

    // 2. Confidence Check
    {
      id: 'd8-confidence-check',
      type: 'confidence_check',
      title: 'Opinion & Disagreement Readiness',
      dayNumber: 8,
      order: 2,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      config: {
        questionText: 'How confident are you expressing an opinion when someone may openly disagree with you?',
        dimensions: [
          { id: 'opinion_clarity', label: 'Stating strong reasons', min: 1, max: 10 },
          { id: 'disagree_polite', label: 'Disagreeing politely', min: 1, max: 10 },
          { id: 'defending_point', label: 'Defending ideas under pushback', min: 1, max: 10 },
        ],
      },
    },

    // 3. Week 1 Recall
    {
      id: 'd8-prep-recall',
      type: 'timed_speaking',
      title: 'Week 1 PREP Structure Warm-up',
      dayNumber: 8,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        prompt: 'Warm-up drill: Is technology improving personal communication? Deliver a 45-second PREP response (Point, Reason, Example, Point).',
        speakTimeSeconds: 45,
        prepTimeSeconds: 5,
      },
    },

    // 4. Opinion Baseline
    {
      id: 'd8-opinion-baseline',
      type: 'recording',
      title: 'Day 8 Opinion Baseline',
      dayNumber: 8,
      order: 4,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt: 'Should employees/students be allowed to work or study remotely most of the time? State your position and defend it without notes.',
        prepTimeSeconds: 15,
        durationSeconds: 90,
      },
      trackVariants: {
        professional: {
          prompt: 'Should companies mandate a 3-day in-office policy, or allow team-level remote flexibility? Defend your view for 90 seconds.',
        },
        student: {
          prompt: 'Should university lectures remain fully recorded online, or require mandatory in-person attendance? Deliver a 90-second argument.',
        },
      },
    },

    // 5. Build an Opinion Framework Lesson
    {
      id: 'd8-build-opinion',
      type: 'opinion_builder',
      title: 'The 6-Stage Opinion Framework',
      dayNumber: 8,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 20,
      config: {
        content: 'Master the sequence that top executives and debaters use:\n1. Position (Belief)\n2. Reason (Why)\n3. Evidence (Proof)\n4. Other Side (Skeptic view)\n5. Response (Counter)\n6. Conclusion (Final verdict)',
      },
    },

    // 6. Opinion Expansion
    {
      id: 'd8-opinion-expansion',
      type: 'framework_lesson',
      title: 'Progressive Opinion Expansion Drill',
      dayNumber: 8,
      order: 6,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        steps: [
          { title: 'Core Seed', description: 'Start simple: "Social media has a net positive impact."' },
          { title: 'Add Reason', description: '"...because it democratizes access to knowledge and niche communities."' },
          { title: 'Add Limitation', description: '"That said, algorithmic echo chambers can amplify misinformation."' },
          { title: 'Conclude', description: '"Ultimately, with media literacy, the benefits outweigh the risks."' },
        ],
      },
    },

    // 7. Advanced Opinion Expressions
    {
      id: 'd8-opinion-expressions',
      type: 'vocabulary_activation',
      title: 'Advanced Opinion Chunks',
      dayNumber: 8,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        items: [
          { phrase: 'From my perspective', meaning: 'Polite introductory frame', example: 'From my perspective, quality code reviews save months of debugging.' },
          { phrase: "I'd argue that", meaning: 'Assertive yet reasoned stance', example: "I'd argue that investing in onboarding is our highest leverage priority." },
          { phrase: 'That said', meaning: 'Acknowledging counter-evidence smoothly', example: 'Our velocity is high. That said, documentation needs catch-up.' },
          { phrase: 'To some extent', meaning: 'Qualifying partial agreement', example: 'I agree to some extent, though budget realities cannot be ignored.' },
        ],
      },
    },

    // 8. Agreement Spectrum
    {
      id: 'd8-agreement-spectrum',
      type: 'framework_lesson',
      title: 'The Agreement Spectrum: 4 Nuance Levels',
      dayNumber: 8,
      order: 8,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        steps: [
          { title: 'Strong Agreement', description: '"I completely agree. The data clearly demonstrates this effect."' },
          { title: 'Moderate Agreement', description: '"I largely agree with that analysis, especially regarding timeline constraints."' },
          { title: 'Partial Agreement', description: '"I agree to some extent, although there are regional variances."' },
          { title: 'Qualified Agreement', description: '"I agree with the general premise, provided we secure adequate resources first."' },
        ],
      },
    },

    // 9. Respectful Disagreement Forms
    {
      id: 'd8-disagreement-stems',
      type: 'vocabulary_activation',
      title: 'Diplomatic Disagreement Stems',
      dayNumber: 8,
      order: 9,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        items: [
          { phrase: 'I see your point, but...', meaning: 'Acknowledge before challenging', example: 'I see your point, but early shipping allows live user feedback.' },
          { phrase: "That's a fair point. However...", meaning: 'Validate logic while pivoting', example: "That's a fair point. However, security protocols cannot be bypassed." },
          { phrase: 'I look at it slightly differently', meaning: 'Reframing without confrontation', example: 'I look at it slightly differently: our risk is in delay, not in testing.' },
        ],
      },
    },

    // 10. Agreement / Disagreement Game
    {
      id: 'd8-agree-disagree-game',
      type: 'agreement_disagreement',
      title: 'The Stance & Justification Game',
      dayNumber: 8,
      order: 10,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 20,
      config: {
        isGame: true,
        statements: [
          'Remote work is substantially better than office work for overall output.',
          'University tuition should be 100% publicly subsidized.',
          'Generative AI creates more employment opportunities than it disrupts.',
          'Synchronous messaging tools like Slack destroy deep creative focus.',
        ],
      },
    },

    // 11. Counterargument Builder
    {
      id: 'd8-counterargument-builder',
      type: 'counterargument',
      title: 'Stakeholder Counterargument Lab',
      dayNumber: 8,
      order: 11,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        isCounter: true,
        counterargumentText:
          'While your initiative is ambitious, our team cannot absorb the operational learning curve during Q3 without risking current contractual commitments.',
      },
    },

    // 12. Devil's Advocate
    {
      id: 'd8-devils-advocate',
      type: 'devil_advocate',
      title: "Devil's Advocate Perspective Reversal",
      dayNumber: 8,
      order: 12,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 20,
      config: {
        devilAdvocate: true,
        prompt:
          "Argue forcefully in favor of this proposition for 2 minutes, even if you personally disagree: 'Meetings should be completely banned and replaced exclusively by asynchronous recorded memos.'",
        durationSeconds: 120,
        prepTimeSeconds: 15,
      },
    },

    // 13. Listening to Two Viewpoints
    {
      id: 'd8-two-viewpoints',
      type: 'dictogloss',
      title: 'Analyzing Contrasting Arguments',
      dayNumber: 8,
      order: 13,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        audioText:
          'Speaker A insists that aggressive deadlines force teams to eliminate unnecessary scope. However, Speaker B argues that chronic urgency damages architectural integrity and induces developer burnout.',
      },
    },

    // 14. Main Discussion Roleplay
    {
      id: 'd8-main-discussion',
      type: 'recording',
      title: 'Main 4-Minute Discussion Simulation',
      dayNumber: 8,
      order: 14,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 25,
      config: {
        prompt:
          'Engage in a 4-minute continuous discussion simulation: State your stance on whether artificial intelligence should be strictly regulated by international treaties. Structure your points, address counter-perspectives, and maintain executive calm.',
        durationSeconds: 240,
        prepTimeSeconds: 20,
      },
    },

    // 15. Scorecard
    {
      id: 'd8-scorecard',
      type: 'scorecard',
      title: 'Day 8 Discussion Mastery Scorecard',
      dayNumber: 8,
      order: 15,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 10,
      config: {},
    },

    // 16. Targeted Retry
    {
      id: 'd8-feedback-retry',
      type: 'recording',
      title: 'Focused 90-Second Nuance Retry',
      dayNumber: 8,
      order: 16,
      isRequired: false,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        prompt: 'Retry your central argument in 90 seconds. Focus on inserting at least 2 qualified agreement/disagreement stems without hesitating.',
        durationSeconds: 90,
      },
    },

    // 17. Real-World Mission
    {
      id: 'd8-mission',
      type: 'mission',
      title: 'Day 8 Micro-Mission: Discussion in the Wild',
      dayNumber: 8,
      order: 17,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        missionTitle: 'Hold a 5-minute discussion using respectful disagreement',
        criteria: [
          'Use at least 1 opinion chunk ("From my perspective...")',
          'Use at least 1 contrast chunk ("That said...")',
          'Use at least 1 respectful disagreement/qualification ("I see your point, but...")',
        ],
      },
    },

    // 18. Reflection
    {
      id: 'd8-reflection',
      type: 'reflection',
      title: 'Day 8 Debrief & Thought Builder Badge',
      dayNumber: 8,
      order: 18,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        prompts: [
          'How did it feel to acknowledge counterarguments rather than simply ignoring them?',
          'Which disagreement phrase felt most natural for your speaking personality?',
          'Did you notice yourself pausing instead of using vocal fillers?',
        ],
      },
    },
  ],
  badges: ['thought-builder'],
  previewNextDay: {
    title: 'Connect Ideas: Speak in More Complete Thoughts',
    dayNumber: 9,
  },
  week: 2,
};

export default day8;
