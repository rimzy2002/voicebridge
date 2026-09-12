// ============================================================
// Day 28 — Advanced Listening and Reactive Communication
// ============================================================

import { DayDefinition } from '@/types';

const day28: DayDefinition = {
  dayNumber: 28,
  title: 'Listen for Meaning, Tone and What Happens Next',
  subtitle: 'Day 28 of 30 • Week 4: Advanced Communication',
  objective:
    'Combine advanced listening with immediate, structured speaking. Decode speaker stance, implicit disagreement, emotional tone cues, and operational action items across international English varieties.',
  coreMessage:
    'Advanced communication is not just about what you say — it is about how deeply and accurately you listen before you speak.',
  estimatedMinutes: { full: 40, express: 14 },
  todayGoals: [
    'Track discourse markers (however, therefore, actually) to anticipate logical turns',
    'Infer speaker stance, hesitation, and underlying consensus from vocal tone and word choice',
    'Execute the Prediction Pause technique to forecast dialogue conclusions',
    'Decode fast and connected international speech without relying on written transcripts',
    'Extract operational decisions, concerns, and owners from multi-speaker discussions',
    'Deliver an unscripted 90-second summary followed by a 60-second independent response',
  ],
  activities: [
    // 1. Welcome
    {
      id: 'd28-welcome',
      type: 'welcome',
      title: 'Welcome to Day 28',
      dayNumber: 28,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        content:
          'Today you connect active listening with immediate verbal reaction. In high-level meetings, you rarely get to review a transcript — you must listen for intent, notice tone cues, and articulate your response on the spot.',
      },
    },

    // 2. Baseline
    {
      id: 'd28-baseline',
      type: 'recording',
      title: 'Listening Baseline',
      description: 'Listen to a fast realistic meeting dialogue and verbally summarize what happened in 60 seconds.',
      dayNumber: 28,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Listen to the dialogue excerpt and immediately summarize: (1) What was the central dispute, (2) What compromise was proposed, and (3) What is the agreed next step? 60 seconds.',
        durationSeconds: 60,
        prepTimeSeconds: 15,
        isBaseline: true,
        label: 'Day 28 Listening Baseline',
      },
    },

    // 3. Listening Interactive Activity
    {
      id: 'd28-listening-interactive',
      type: 'advanced_listening_challenge',
      title: 'Discourse Markers & Prediction Engine',
      description: 'Practice tracking discourse markers, predicting endings with the prediction pause, and speed adaptation.',
      dayNumber: 28,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 8,
      xpReward: 25,
      config: {
        topic: 'Global Discourse',
      },
    },

    // 4. Meeting Action Extraction Drill
    {
      id: 'd28-meeting-extraction',
      type: 'meeting_listening',
      title: 'Meeting Extraction: Decision, Concern, Owner',
      description: 'Extract the 3 essentials from dense discussion: What was decided? Who is worried? Who owns the next step?',
      dayNumber: 28,
      order: 4,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        prompt:
          'Review the team meeting excerpt and state aloud in 45 seconds: (1) The approved decision, (2) The primary operational concern, (3) The assigned owner and deadline.',
        durationSeconds: 45,
      },
    },

    // 5. Main Challenge: Listen, Summarize, React (No Transcript)
    {
      id: 'd28-main-challenge',
      type: 'recording',
      title: 'Main Challenge: 2-Minute Input → Spoken Summary & Reaction',
      description: 'Listen to a complete clinical trial debate, hide the transcript, and deliver a 90s summary plus 60s personal reaction.',
      dayNumber: 28,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 30,
      config: {
        prompt:
          'Deliver your complete spoken summary and reaction: (1) 90-second accurate recap of Evelyn and Marcus\'s viewpoints, (2) 60-second personal critique of their agreed next step. No transcript assistance on screen.',
        durationSeconds: 150,
        isMainChallenge: true,
        prepTimeSeconds: 20,
      },
    },

    // 6. Real-World Mission
    {
      id: 'd28-mission',
      type: 'mission',
      title: 'Day 28 Mission: The Stance Summary',
      dayNumber: 28,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 20,
      config: {
        missionDescription:
          'Listen to a real English conversation, podcast, or interview for at least 5 minutes today. Verbally record or share a 2-minute summary explaining what the speaker actually believes beneath their polite words.',
        missionOptions: [
          'Listen to a tech or business interview and summarize the speaker\'s underlying thesis',
          'Listen to an international news segment and identify the unstated geopolitical tensions',
          'Summarize a team meeting discussion to a colleague who could not attend',
        ],
        conversationFallback: true,
      },
    },

    // 7. Reflection & Scorecard
    {
      id: 'd28-scorecard',
      type: 'scorecard',
      title: 'Day 28 Complete — Deep Listening Mastered!',
      dayNumber: 28,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 30,
      config: {},
    },
  ],
  badges: ['advanced-listener'],
  previewNextDay: { title: 'Perform Without Hints (Final Rehearsal)', dayNumber: 29 },
  week: 4,
};

export default day28;
