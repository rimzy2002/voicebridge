// ============================================================
// Day 9 — Connect Ideas: Speak in More Complete Thoughts
// ============================================================

import { DayDefinition } from '@/types';

const day9: DayDefinition = {
  dayNumber: 9,
  title: 'Connect Ideas: Speak in More Complete Thoughts',
  subtitle: 'Day 9 of 30 • Week 2: Build Fluency',
  objective:
    'Help learners connect thoughts seamlessly using functional discourse markers, cleft emphasis structures, and parallel phrasing instead of fragmented, repetitive sentences.',
  coreMessage:
    'Clarity is connection. Sophisticated communication does not mean convoluted sentences—it means effortless, logical flow.',
  estimatedMinutes: { full: 40, express: 15 },
  todayGoals: [
    'Deploy the 6 essential connector families appropriately',
    'Perform flow surgery on repetitive "and... and..." speaking habits',
    'Master spoken emphasis using cleft sentence patterns',
    'Execute a personalized micro-drill targeting your Week 1 priority',
    'Deliver a 3-minute structured explanation with zero connector stuffing',
  ],
  activities: [
    // 1. Recall
    {
      id: 'd9-recall',
      type: 'timed_speaking',
      title: 'Day 8 Opinion Recall Warm-up',
      dayNumber: 9,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        prompt: 'Deliver a 45-second opinion on any topic of your choice. Require: Position + Reason + Contrast ("That said...").',
        speakTimeSeconds: 45,
      },
    },

    // 2. Baseline
    {
      id: 'd9-baseline',
      type: 'recording',
      title: 'Day 9 Baseline: Idea Connection Flow',
      dayNumber: 9,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt: 'Describe one major change that would significantly improve your workplace, university, or community. Speak continuously for 90 seconds.',
        durationSeconds: 90,
        prepTimeSeconds: 15,
      },
    },

    // 3. Connector Families Explorer
    {
      id: 'd9-connector-families',
      type: 'connector_activation',
      title: 'The 6 Functional Connector Families',
      dayNumber: 9,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        content: 'Learn connectors organized by their conversational function: Adding, Contrast, Result, Example, Perspective, and Conclusion.',
      },
    },

    // 4. Connector Flow Repair
    {
      id: 'd9-connector-repair',
      type: 'connector_activation',
      title: 'Flow Surgery: Repairing the "And... And..." Habit',
      dayNumber: 9,
      order: 4,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {},
    },

    // 5. Lexical Chunking
    {
      id: 'd9-lexical-chunking',
      type: 'vocabulary_activation',
      title: 'Executive Lexical Chunks',
      dayNumber: 9,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        items: [
          { phrase: 'I take the view that', meaning: 'Authoritative stance opener', example: 'I take the view that developer experience directly dictates customer satisfaction.' },
          { phrase: 'One of the key issues is', meaning: 'Highlighting critical blockers', example: 'One of the key issues is aligning legacy database constraints with our new event pipeline.' },
          { phrase: 'There is a strong argument for', meaning: 'Advocating solutions diplomatically', example: 'There is a strong argument for conducting automated integration tests early.' },
          { phrase: 'What matters most is', meaning: 'Cleft structure focusing listener attention', example: 'What matters most is maintaining system responsiveness under peak workloads.' },
        ],
      },
    },

    // 6. Relative-Clause Expansion
    {
      id: 'd9-relative-clauses',
      type: 'framework_lesson',
      title: 'Relative-Clause Expansion (Without Bloat)',
      dayNumber: 9,
      order: 6,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        steps: [
          { title: 'Base Sentence', description: '"The deployment succeeded."' },
          { title: 'Natural Expansion', description: '"The deployment, which involved migrating three microservices, succeeded without downtime."' },
          { title: 'Anti-Pattern Warning', description: 'Do not chain 4 clauses together until the listener loses the main verb. One relative clause per statement is ideal.' },
        ],
      },
    },

    // 7. Cleft Sentences for Emphasis
    {
      id: 'd9-cleft-sentences',
      type: 'connector_activation',
      title: 'Cleft Sentences: Spoken Rhetorical Power',
      dayNumber: 9,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {},
    },

    // 8. Parallel Structure
    {
      id: 'd9-parallel-structure',
      type: 'framework_lesson',
      title: 'Parallel Grammatical Balance',
      dayNumber: 9,
      order: 8,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        steps: [
          { title: 'Unbalanced List (Weak)', description: '"My job involves designing systems, to manage stakeholders and I analyze reports."' },
          { title: 'Parallel Balance (Strong)', description: '"My job involves designing systems, managing stakeholders, and analyzing reports."' },
          { title: 'Speaking Rule', description: 'When delivering lists of 3 in meetings or presentations, keep all 3 elements in identical grammatical form (e.g. gerund + noun).' },
        ],
      },
    },

    // 9. Personal Error Injection Drill
    {
      id: 'd9-personal-error-drill',
      type: 'recording',
      title: 'Personalized Priority Micro-Drill',
      dayNumber: 9,
      order: 9,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 20,
      config: {
        prompt:
          'Personalized drill targeting your Week 1 diagnostic priority: Recount a recent technical or operational challenge. Speak for 60 seconds with strict attention to avoiding your primary error pattern.',
        durationSeconds: 60,
      },
    },

    // 10. Sentence Surgery
    {
      id: 'd9-sentence-surgery',
      type: 'connector_activation',
      title: 'Sentence Surgery: Synthesizing Fragmented Thoughts',
      dayNumber: 9,
      order: 10,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {},
    },

    // 11. One Idea -> Rich Answer
    {
      id: 'd9-rich-answer',
      type: 'recording',
      title: 'Idea Expansion: Teamwork is Important',
      dayNumber: 9,
      order: 11,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Take the basic claim: "Teamwork is important." Develop it into a 90-second rich answer using: 1 detail, 1 concrete example, 1 contrast ("However..."), and 1 conclusion ("Ultimately...").',
        durationSeconds: 90,
      },
    },

    // 12. Listening for Connectors
    {
      id: 'd9-listening-connectors',
      type: 'dictogloss',
      title: 'Discourse Marker Detection in Action',
      dayNumber: 9,
      order: 12,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        audioText:
          'From my perspective, remote teams succeed only when documentation is prioritized. In addition, transparent roadmaps prevent silos. Therefore, weekly executive summaries are indispensable.',
      },
    },

    // 13. Main Challenge
    {
      id: 'd9-main-challenge',
      type: 'recording',
      title: 'Main 3-Minute Connected Explanation',
      dayNumber: 9,
      order: 13,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 25,
      config: {
        prompt:
          'Explain a complex topic in your domain for 3 minutes. Requirements: organized structure, at least 4 natural connectors from different families, at least 1 emphasis cleft sentence, and zero mechanical connector stuffing.',
        durationSeconds: 180,
        prepTimeSeconds: 20,
      },
      trackVariants: {
        professional: {
          prompt: 'Explain the technical or strategic roadmap for your current product/project. Use at least 4 functional connectors and 1 cleft sentence.',
        },
        student: {
          prompt: 'Explain the methodology and significance of a recent research study or academic paper in your field for 3 minutes.',
        },
      },
    },

    // 14. Scorecard
    {
      id: 'd9-scorecard',
      type: 'scorecard',
      title: 'Day 9 Structural Fluency Scorecard',
      dayNumber: 9,
      order: 14,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 10,
      config: {},
    },

    // 15. Mission
    {
      id: 'd9-mission',
      type: 'mission',
      title: 'Day 9 Real-World Mission: Explain with Clarity',
      dayNumber: 9,
      order: 15,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        missionTitle: 'Explain a nuanced concept to a peer in 3–5 minutes',
        criteria: [
          'Use at least 3 distinct connector families (e.g. contrast, result, perspective)',
          'Use at least 1 emphasis phrase ("What matters most...")',
          'Ensure every sentence connects logically to the previous one',
        ],
      },
    },
  ],
  badges: ['connector-master'],
  previewNextDay: {
    title: 'Listen Better and Explain the Main Idea',
    dayNumber: 10,
  },
  week: 2,
};

export default day9;
