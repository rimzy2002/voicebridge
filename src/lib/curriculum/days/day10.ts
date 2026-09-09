// ============================================================
// Day 10 — Listen Better and Explain the Main Idea
// ============================================================

import { DayDefinition } from '@/types';

const day10: DayDefinition = {
  dayNumber: 10,
  title: 'Listen Better and Explain the Main Idea',
  subtitle: 'Day 10 of 30 • Week 2: Build Fluency',
  objective:
    'Connect reactive listening directly to spoken fluency. Train learners to decode fast, connected English, extract central meaning, and reconstruct accurate spoken summaries using the 3-2-1 and Dictogloss protocols.',
  coreMessage:
    'Listening is half of fluency. When you stop translating words and start extracting meaning, responding becomes spontaneous.',
  estimatedMinutes: { full: 44, express: 15 },
  todayGoals: [
    'Capture 5–8 anchor keywords instead of transcribing full sentences',
    'Execute the 3-2-1 compression challenge (3 min → 2 min → 1 min)',
    'Identify discourse markers and predict directional pivots in speech',
    'Verify comprehension using dictogloss transcript comparison',
    'Summarize a 90-second unseen scenario and deliver an immediate spoken response',
  ],
  activities: [
    // 1. Recall
    {
      id: 'd10-recall',
      type: 'timed_speaking',
      title: 'Day 9 Connector Recall',
      dayNumber: 10,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        prompt: 'Warm-up: Explain your morning routine or focus for today in 30 seconds using at least 2 distinct connectors.',
        speakTimeSeconds: 30,
      },
    },

    // 2. Listening Confidence Check
    {
      id: 'd10-listening-confidence',
      type: 'confidence_check',
      title: 'Listening Under Realistic Pressure',
      dayNumber: 10,
      order: 2,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      config: {
        questionText: 'What remains most challenging when listening to fast native or international English?',
        dimensions: [
          { id: 'fast_speed', label: 'Speaking speed & pace', min: 1, max: 10 },
          { id: 'connected_speech', label: 'Connected speech (linking sounds)', min: 1, max: 10 },
          { id: 'detail_retention', label: 'Remembering details without notes', min: 1, max: 10 },
        ],
      },
    },

    // 3. Listening Baseline
    {
      id: 'd10-listening-baseline',
      type: 'recording',
      title: 'Day 10 Listening Baseline',
      dayNumber: 10,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Listen to the core concept: "Technical debt is not bad code—it is an intentional engineering tradeoff to ship sooner, which must later be repaid with interest." Summarize this concept verbally in your own words for 60 seconds.',
        durationSeconds: 60,
      },
    },

    // 4. Listen for Meaning Framework
    {
      id: 'd10-listen-meaning-framework',
      type: 'framework_lesson',
      title: 'The 4-Pillar Summarization Framework',
      dayNumber: 10,
      order: 4,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        steps: [
          { title: '1. Topic', description: 'What overall system, event, or problem is being addressed?' },
          { title: '2. Main Point', description: 'What is the speaker’s primary assertion or conclusion?' },
          { title: '3. Key Evidence', description: 'What 1–2 supporting facts or reasons justify this?' },
          { title: '4. Bottom Line', description: 'What is the single most important takeaway for the listener?' },
        ],
      },
    },

    // 5. Keyword Capture Drill
    {
      id: 'd10-keyword-capture',
      type: 'dictogloss',
      title: 'Keyword Capture (Anchor Hunting)',
      dayNumber: 10,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        audioText:
          'In agile product management, user story mapping helps cross-functional teams visualize the entire user journey. Instead of prioritizing isolated backlog tickets, stakeholders group features by customer milestones, ensuring seamless end-to-end releases.',
      },
    },

    // 6. Retelling from Keywords
    {
      id: 'd10-retelling',
      type: 'recording',
      title: 'Keyword-Driven Verbal Retelling',
      dayNumber: 10,
      order: 6,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Looking only at your 5 captured keywords from the previous exercise, retell the complete product management concept in your own words for 60 seconds.',
        durationSeconds: 60,
      },
    },

    // 7. 3-2-1 Retelling Challenge
    {
      id: 'd10-321-retelling',
      type: 'recording',
      title: 'The 3-2-1 Progressive Compression Challenge',
      dayNumber: 10,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 25,
      config: {
        prompt:
          'Explain the concept of climate-resilient infrastructure across 3 rounds. In each round, preserve the core meaning while becoming more concise and deliberate.',
        rounds: [
          { label: 'Round 1 (3 Minutes)', durationSeconds: 180, guidance: 'Include full context, background, examples, and recommendations.' },
          { label: 'Round 2 (2 Minutes)', durationSeconds: 120, guidance: 'Trim non-essential details. Focus on problem, mechanism, and outcome.' },
          { label: 'Round 3 (1 Minute)', durationSeconds: 60, guidance: 'Executive distillation: deliver the bottom line with absolute punch.' },
        ],
      },
    },

    // 8. Dictogloss Diagnostic
    {
      id: 'd10-dictogloss',
      type: 'dictogloss',
      title: 'Dictogloss: Note-Taking & Transcript Verification',
      dayNumber: 10,
      order: 8,
      isRequired: true,
      expressMode: false,
      durationMinutes: 4,
      xpReward: 20,
      config: {
        audioText:
          'Whenever organizational bottlenecks appear, leadership must distinguish between process inefficiencies and communication breakdowns. While process fixes alter workflows, communication fixes require psychological safety.',
      },
    },

    // 9. Discourse Marker Spotting
    {
      id: 'd10-discourse-spotting',
      type: 'dictogloss',
      title: 'Discourse Marker Spotting: Predicting Turns',
      dayNumber: 10,
      order: 9,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        audioText:
          'We initially expected revenue to surge in Q2. However, enterprise procurement cycles lengthened. Consequently, our go-to-market strategy shifted toward product-led expansion. Ultimately, this stabilized retention.',
      },
    },

    // 10. Global Listening Exposure & Speed Adaptation
    {
      id: 'd10-speed-adaptation',
      type: 'dictogloss',
      title: 'Variable-Speed Listening Adaptation',
      dayNumber: 10,
      order: 10,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        audioText:
          'Distributed engineering requires high documentation discipline. When developers write comprehensive pull request summaries, asynchronous code reviews accelerate by forty percent regardless of team time zones.',
      },
    },

    // 11. Listen and Respond
    {
      id: 'd10-listen-respond',
      type: 'recording',
      title: 'Listen → Summarize → React',
      dayNumber: 10,
      order: 11,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 20,
      config: {
        prompt:
          'Audio scenario: A colleague proposes replacing all daily standups with an automated Slack bot. Step 1: Summarize their proposal in 20 seconds. Step 2: Deliver your personal reaction and recommendation in 40 seconds.',
        durationSeconds: 60,
      },
    },

    // 12. Main Unseen Challenge
    {
      id: 'd10-main-challenge',
      type: 'recording',
      title: 'Main Unseen Comprehension & Summary Challenge',
      dayNumber: 10,
      order: 12,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 25,
      config: {
        prompt:
          'Deliver a 90-second executive summary of an unseen scenario: Explain the core problem, contrast two potential solutions, state your recommended action, and pose 1 probing question for the leadership team.',
        durationSeconds: 90,
      },
    },

    // 13. Scorecard
    {
      id: 'd10-scorecard',
      type: 'scorecard',
      title: 'Day 10 Listening & Retelling Scorecard',
      dayNumber: 10,
      order: 13,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 10,
      config: {},
    },

    // 14. Real-World Mission
    {
      id: 'd10-mission',
      type: 'mission',
      title: 'Day 10 Micro-Mission: Retell a Real News Item',
      dayNumber: 10,
      order: 14,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        missionTitle: 'Listen to a 2-minute English podcast or video and retell it to someone',
        criteria: [
          'Capture 4 key details before speaking',
          'Explain the main thesis and conclusion in under 2 minutes',
          'Use at least 2 functional discourse markers ("According to...", "Ultimately...")',
        ],
      },
    },
  ],
  badges: ['active-listener'],
  previewNextDay: {
    title: 'Think Fast: Speak Without Preparation',
    dayNumber: 11,
  },
  week: 2,
};

export default day10;
