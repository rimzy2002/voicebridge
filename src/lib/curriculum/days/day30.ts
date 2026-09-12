// ============================================================
// Day 30 — Final Communication Transformation Assessment
// ============================================================

import { DayDefinition } from '@/types';

const day30: DayDefinition = {
  dayNumber: 30,
  title: 'Your Final Communication Challenge',
  subtitle: 'Day 30 of 30 • Program Capstone & Transformation Report',
  objective:
    'Comprehensive capstone evaluation: repeat the Day 1 baseline, compare recordings side-by-side, analyze your 14-dimension communication scorecard and 30-day timeline, generate your personalized phrasebook (~100 items), establish your 30–90 day plan, and claim your Confident Communicator certification.',
  coreMessage:
    'Transformation is not reaching an arbitrary standard of perfection — it is the undeniable evidence of speaking with greater clarity, composure, and confidence than the day you began.',
  estimatedMinutes: { full: 50, express: 20 },
  todayGoals: [
    'Measure confidence shifts across Day 1, Day 15, and Day 30',
    'Repeat the original 90-second Day 1 baseline ("Introduce Yourself") without restarts',
    'Conduct a side-by-side listening comparison of your Day 1 vs Day 30 recordings',
    'Review objective metrics: speaking duration, start latency, filler rate, and pause placement',
    'Complete unassisted capstone challenges: fluency, structured opinion, narrative, and persuasion',
    'Review your 14-dimension scorecard and 30-day progress timeline (Day 1 → 7 → 14 → 21 → 30)',
    'Identify your #1 strongest improvement and single continuing development priority',
    'Receive your personalized phrasebook containing ~100 mastered functional chunks',
    'Generate your customized 30–90 day continuation roadmap and post-program goal',
    'Complete the 15-Minute Final Real-World Communication Mission',
    'Unlock the "Confident Communicator" completion badge and download your final report',
  ],
  activities: [
    // 1. Welcome to Day 30
    {
      id: 'd30-welcome',
      type: 'welcome',
      title: 'Welcome to Day 30 — The Capstone',
      dayNumber: 30,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          'Congratulations on reaching Day 30! Thirty days of deliberate, daily speaking practice have rewired your communication instincts. Today is not about memorization or testing — it is about demonstrating what you can now do effortlessly in English.',
      },
    },

    // 2. Final Confidence Snapshot (Day 1 vs 15 vs 30)
    {
      id: 'd30-confidence-snapshot',
      type: 'confidence_check',
      title: 'Day 30 Confidence Snapshot',
      description: 'Rate your confidence across core communication dimensions to compare with Day 1 and Day 15.',
      dayNumber: 30,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      config: {
        questionText: 'Rate your current confidence in spontaneous, high-stakes communication:',
        dimensions: [
          { id: 'spontaneous', label: 'Entering conversations without internal translation freezes', min: 1, max: 10 },
          { id: 'structure', label: 'Structuring longer answers on the fly (PREP / STAR)', min: 1, max: 10 },
          { id: 'pauses', label: 'Using confident silent pauses instead of vocal fillers ("um", "uh")', min: 1, max: 10 },
          { id: 'professional', label: 'Speaking up in meetings, interviews, and presentations', min: 1, max: 10 },
          { id: 'tough_questions', label: 'Buffering sudden, challenging questions with composure', min: 1, max: 10 },
          { id: 'nuance', label: 'Expressing disagreement and nuance diplomatically', min: 1, max: 10 },
          { id: 'listening', label: 'Tracking rapid international speech and implied meaning', min: 1, max: 10 },
          { id: 'recovery', label: 'Recovering smoothly when a mistake happens without restarting', min: 1, max: 10 },
        ],
      },
    },

    // 3. Repeat Day 1 Baseline Prompt
    {
      id: 'd30-baseline-repeat',
      type: 'recording',
      title: 'Repeat the Day 1 Baseline: Introduce Yourself',
      description: 'Deliver the exact same 90-second baseline prompt from Day 1 to enable direct audio comparison.',
      dayNumber: 30,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 30,
      config: {
        prompt:
          'Introduce yourself, your background, what you do, and what you care about most in your work or studies. Speak for 90 seconds without restarting.',
        durationSeconds: 90,
        prepTimeSeconds: 15,
        isBaseline: true,
        label: 'Final Baseline Recording — Day 30',
      },
      trackVariants: {
        professional: {
          prompt: 'Deliver your 90-second professional introduction: your role, your core expertise, a recent project highlight, and your approach to collaboration.',
        },
        student: {
          prompt: 'Deliver your 90-second academic introduction: your field of study, key research interests, and what motivates your academic journey.',
        },
        general: {
          prompt: 'Introduce yourself, your background, your main passions, and what drives your day-to-day work or personal projects in 90 seconds.',
        },
      },
    },

    // 4. Side-by-Side Playback & Objective Comparison
    {
      id: 'd30-side-by-side',
      type: 'side_by_side_comparison',
      title: 'Side-by-Side Audio & Objective Comparison',
      description: 'Listen to Day 1 and Day 30 side-by-side, conduct self-assessment, and analyze objective metrics.',
      dayNumber: 30,
      order: 4,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 30,
      config: {},
    },

    // 5. Unassisted Fluency Challenge
    {
      id: 'd30-fluency-challenge',
      type: 'recording',
      title: 'Capstone Fluency Challenge (Unassisted)',
      description: 'Deliver an unscripted 2-minute address on an unexpected prompt with zero visual scaffolding.',
      dayNumber: 30,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 25,
      config: {
        prompt:
          'Prompt: "What is the most valuable lesson you have learned about human collaboration, and how has it shaped the way you work with others?" Speak for 2 minutes with continuous flow.',
        durationSeconds: 120,
        prepTimeSeconds: 15,
      },
    },

    // 6. Structured Opinion & Rebuttal
    {
      id: 'd30-structured-opinion',
      type: 'recording',
      title: 'Structured Opinion & Rebuttal (Unassisted)',
      description: 'State an opinion, provide evidence, handle a counterargument, and conclude without PREP labels.',
      dayNumber: 30,
      order: 6,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 20,
      config: {
        prompt:
          'Should all companies and academic institutions mandate communication training alongside technical skills? Deliver your complete argument: Claim, Rationale, Evidence, Counter-point, and Resolution in 90 seconds.',
        durationSeconds: 90,
      },
    },

    // 7. Capstone Experience Story
    {
      id: 'd30-experience-story',
      type: 'recording',
      title: 'Capstone Experience Story (STAR)',
      description: 'Tell a compelling 2–3 minute narrative about a challenge you overcame and what you learned.',
      dayNumber: 30,
      order: 7,
      isRequired: true,
      expressMode: false,
      durationMinutes: 5,
      xpReward: 25,
      config: {
        prompt:
          'Tell me about an experience that taught you something important. Include the context, the core conflict or challenge, your specific actions, the concrete result, and your reflection.',
        durationSeconds: 150,
      },
    },

    // 8. Track-Specific Capstone Simulation
    {
      id: 'd30-track-simulation',
      type: 'recording',
      title: 'Track Capstone Simulation',
      description: 'Deliver a high-stakes scenario tailored to your track (Professional meeting update, Student defense, or General proposal).',
      dayNumber: 30,
      order: 8,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 35,
      config: {
        prompt:
          'Deliver a 3-minute capstone address: (1) Project or research update, (2) Key evidence and implications, (3) Response to stakeholder pushback, and (4) Proposed next steps.',
        durationSeconds: 180,
      },
      trackVariants: {
        professional: {
          prompt: 'Lead an executive briefing: provide a concise quarterly status update, explain a critical technical trade-off, address budget pushback, and propose next steps with owners.',
        },
        student: {
          prompt: 'Deliver an academic project overview: state your thesis, explain the methodology and data findings, address methodological limitations, and outline future research directions.',
        },
        general: {
          prompt: 'Pitch an ambitious community or collaborative initiative: state the vision, explain the benefits, acknowledge logistics and cost constraints, and propose an immediate action plan.',
        },
      },
    },

    // 9. Final Transformation Activity (14-Dimension Scorecard, Timeline, Phrasebook, Report)
    {
      id: 'd30-final-transformation',
      type: 'final_transformation_report',
      title: '30-Day Transformation Report & Continuation Plan',
      description: 'Analyze your 14-dimension scorecard, 30-day timeline, personal phrasebook (~100 items), and claim your Confident Communicator certification.',
      dayNumber: 30,
      order: 9,
      isRequired: true,
      expressMode: true,
      durationMinutes: 8,
      xpReward: 100,
      config: {},
    },

    // 10. Final Real-World Mission (15-Minute Mission)
    {
      id: 'd30-final-mission',
      type: 'mission',
      title: 'Day 30 Capstone Mission: The 15-Minute Communication Mission',
      dayNumber: 30,
      order: 10,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 50,
      config: {
        missionDescription:
          'Complete a 15-minute English conversation mission today (with a colleague, friend, or AI partner). Integrate: (1) Warm opening, (2) Clear opinion, (3) Concise explanation, (4) Personal story, (5) Follow-up questions, (6) Qualified disagreement, (7) Active vocabulary, and (8) Composed wrap-up.',
        missionOptions: [
          'Conduct a 15-minute coffee chat or sync with an English-speaking colleague',
          'Have a 15-minute debate or discussion with a friend or study partner in English',
          'Complete a full 15-minute roleplay simulation with AI covering all 8 competencies',
        ],
        conversationFallback: true,
      },
    },

    // 11. Final 7-Question Reflection
    {
      id: 'd30-final-reflection',
      type: 'reflection',
      title: 'The Transformation Reflection',
      description: 'Synthesize your 30-day transformation in your own words.',
      dayNumber: 30,
      order: 11,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 30,
      config: {
        prompts: [
          'What changed most in your speaking between Day 1 and Day 30?',
          'Which activity or framework helped you the most?',
          'What was your hardest communication problem, and how did you resolve it?',
          'What can you now do in English that you could not comfortably do before?',
          'Where did you use English in real life outside the platform during these 30 days?',
          'What is your primary focus for the next 30 to 90 days?',
          'On a scale of 1 to 10, how confident do you feel entering high-stakes English conversations now?',
        ],
        questions: [
          'What changed most in your speaking between Day 1 and Day 30?',
          'Which activity or framework helped you the most?',
          'What was your hardest communication problem, and how did you resolve it?',
          'What can you now do in English that you could not comfortably do before?',
          'Where did you use English in real life outside the platform during these 30 days?',
          'What is your primary focus for the next 30 to 90 days?',
          'On a scale of 1 to 10, how confident do you feel entering high-stakes English conversations now?',
        ],
      },
    },

    // 12. Completion Milestone Scorecard
    {
      id: 'd30-completion-scorecard',
      type: 'scorecard',
      title: '30-DAY COMMUNICATION TRANSFORMATION COMPLETE!',
      dayNumber: 30,
      order: 12,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 200,
      config: {},
    },
  ],
  badges: ['confident-communicator'],
  week: 4,
};

export default day30;
