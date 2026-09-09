// ============================================================
// Day 13 — Explain and Present an Idea with Confidence
// ============================================================

import { DayDefinition } from '@/types';

const day13: DayDefinition = {
  dayNumber: 13,
  title: 'Explain and Present an Idea with Confidence',
  subtitle: 'Day 13 of 30 • Week 2: Build Fluency',
  objective:
    'Transition from conversational English into structured, authoritative spoken presentations. Master vocal signposting, adapt ideas across different time limits (Elevator Pitch Rotation: 30s → 60s → 120s), and handle post-presentation Q&A with poise.',
  coreMessage:
    'Great presenters are not performers—they are tour guides. Signpost clearly, keep your audience oriented, and your message becomes unforgettable.',
  estimatedMinutes: { full: 42, express: 15 },
  todayGoals: [
    'Deliver a structured 5-part presentation without reading notes',
    'Deploy clear verbal signposts ("Let me start with...", "This brings me to...")',
    'Execute the Elevator Pitch Rotation across 3 distinct time boundaries',
    'Adapt technical register to executive vs peer audiences',
    'Field challenging post-presentation questions without defensive hesitation',
  ],
  activities: [
    // 1. Recall
    {
      id: 'd13-recall',
      type: 'timed_speaking',
      title: 'Day 12 Difficult Scenario Recall',
      dayNumber: 13,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        prompt: 'Warm-up: Explain how you would negotiate an impossible project deadline in 30 seconds using condition language ("As long as...").',
        speakTimeSeconds: 30,
      },
    },

    // 2. Presentation Confidence Check
    {
      id: 'd13-presentation-confidence',
      type: 'confidence_check',
      title: 'Public Speaking & Presentation Assessment',
      dayNumber: 13,
      order: 2,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      config: {
        questionText: 'When presenting an idea in front of a group, what triggers the most anxiety?',
        dimensions: [
          { id: 'opening_hook', label: 'Strong, commanding opening', min: 1, max: 10 },
          { id: 'signposting', label: 'Guiding audience with signposts', min: 1, max: 10 },
          { id: 'answering_qa', label: 'Handling unexpected questions', min: 1, max: 10 },
        ],
      },
    },

    // 3. Baseline Mini-Presentation
    {
      id: 'd13-baseline-presentation',
      type: 'recording',
      title: 'Day 13 Presentation Baseline',
      dayNumber: 13,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Deliver a 2-minute mini-presentation on an idea, process, or project you care about. Present without slides or notes. We evaluate your natural structure and pacing.',
        durationSeconds: 120,
        prepTimeSeconds: 20,
      },
    },

    // 4. Presentation Structure Framework
    {
      id: 'd13-presentation-framework',
      type: 'framework_lesson',
      title: 'The 5-Part Executive Presentation Architecture',
      dayNumber: 13,
      order: 4,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        steps: [
          { title: '1. Open', description: '"Today I want to talk about how we can modernize our internal developer tooling."' },
          { title: '2. Purpose', description: '"The reason this matters is that engineering velocity dictates market responsiveness."' },
          { title: '3. Core Points (2–3)', description: '"First, automated testing; second, reproducible sandbox environments."' },
          { title: '4. Evidence / Concrete Example', description: '"In our last migration, this reduced staging regressions by 35%."' },
          { title: '5. Close', description: '"The key takeaway is this: investing in platform tooling pays dividends across all sprints."' },
        ],
      },
    },

    // 5. Verbal Signposting Phrasing
    {
      id: 'd13-signposting-stems',
      type: 'vocabulary_activation',
      title: 'Verbal Signposting Toolkit',
      dayNumber: 13,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        items: [
          { phrase: "Today I'd like to focus on", meaning: 'Clear, commanding opening anchor', example: "Today I'd like to focus on three architectural decisions that stabilize our stack." },
          { phrase: 'Let me start with', meaning: 'Initiating point 1 deliberately', example: 'Let me start with our primary database throughput metrics.' },
          { phrase: 'This brings me to my next point', meaning: 'Smooth logical transition', example: 'This brings me to my next point: user authentication latency.' },
          { phrase: 'The main takeaway is', meaning: 'Unmistakable executive conclusion', example: 'The main takeaway is that decoupling the service immediately unblocks mobile releases.' },
        ],
      },
    },

    // 6. Elevator Pitch Rotation Challenge
    {
      id: 'd13-pitch-rotation',
      type: 'recording',
      title: 'The Elevator Pitch Rotation Challenge',
      dayNumber: 13,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 25,
      config: {
        prompt:
          'Pitch the same project or area of expertise across 3 distinct time limits. Adapt your level of detail while preserving the core vision.',
        rounds: [
          { label: 'Round 1: 30 Seconds (The Elevator)', durationSeconds: 30, guidance: 'Problem + Solution + Ultimate Value in 3 sentences.' },
          { label: 'Round 2: 60 Seconds (The Standup)', durationSeconds: 60, guidance: 'Add context, current status, and strategic next steps.' },
          { label: 'Round 3: 120 Seconds (The Executive Brief)', durationSeconds: 120, guidance: 'Full narrative: background, key metrics, architecture, and conclusion.' },
        ],
      },
    },

    // 7. Audience Adaptation Drill
    {
      id: 'd13-audience-adaptation',
      type: 'recording',
      title: 'Audience Adaptation: Executive vs Peer',
      dayNumber: 13,
      order: 7,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Explain the same technical project to your Chief Technology Officer (focus on business impact and reliability) for 60 seconds. Notice how you minimize low-level syntax jargon.',
        durationSeconds: 60,
      },
    },

    // 8. Public Speaking Vocal Delivery
    {
      id: 'd13-vocal-delivery',
      type: 'framework_lesson',
      title: 'Vocal Presence: Chunking and Executive Pauses',
      dayNumber: 13,
      order: 8,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        steps: [
          { title: 'Thought Chunking', description: 'Speak in 4-to-6 word phrases, followed by a slight silent micro-pause.' },
          { title: 'Sentence Stress', description: 'Emphasize nouns and action verbs; drop volume slightly on prepositions.' },
          { title: 'Downward Inflection', description: 'End factual statements with a falling tone, not an upward question tone.' },
        ],
      },
    },

    // 9. Slide-Free Presentation
    {
      id: 'd13-slide-free',
      type: 'recording',
      title: 'Slide-Free Presentation Mastery',
      dayNumber: 13,
      order: 9,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Present a proposal for 90 seconds without looking at any notes or slides. Paint visual mental pictures using descriptive analogies and signposts.',
        durationSeconds: 90,
      },
    },

    // 10. Q&A Under Pressure
    {
      id: 'd13-qa-handling',
      type: 'recording',
      title: 'Handling Tough Questions After Presentation',
      dayNumber: 13,
      order: 10,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 20,
      config: {
        prompt:
          'Audience Question: "Your proposed timeline assumes our vendors deliver on schedule, which rarely happens. What is your fallback if they fail?" Acknowledge the risk and defend your mitigation strategy for 60 seconds.',
        durationSeconds: 60,
        prepTimeSeconds: 5,
      },
    },

    // 11. Main 3-Minute Presentation
    {
      id: 'd13-main-presentation',
      type: 'recording',
      title: 'Main 3-Minute Final Presentation Challenge',
      dayNumber: 13,
      order: 11,
      isRequired: true,
      expressMode: true,
      durationMinutes: 5,
      xpReward: 30,
      config: {
        prompt:
          'Deliver your complete 3-minute formal presentation: Open with impact, articulate the core rationale, deliver 2 supporting pillars, provide a concrete benchmark, and finish with an undeniable call to action.',
        durationSeconds: 180,
        prepTimeSeconds: 30,
      },
    },

    // 12. Scorecard
    {
      id: 'd13-scorecard',
      type: 'scorecard',
      title: 'Day 13 Presentation Delivery Scorecard',
      dayNumber: 13,
      order: 12,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 10,
      config: {},
    },

    // 13. Section-Only Retry
    {
      id: 'd13-retry',
      type: 'recording',
      title: 'Targeted Opening/Closing Polish Retry',
      dayNumber: 13,
      order: 13,
      isRequired: false,
      expressMode: false,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        prompt: 'Retry only your Opening or your Closing for 45 seconds. Aim for 100% vocal certainty and zero fillers.',
        durationSeconds: 45,
      },
    },

    // 14. Mission
    {
      id: 'd13-mission',
      type: 'mission',
      title: 'Day 13 Real-World Mission: Present an Idea Live',
      dayNumber: 13,
      order: 14,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        missionTitle: 'Deliver a 2-minute spoken explanation to a colleague, classmate, or friend',
        criteria: [
          'Use at least 2 verbal signposts ("Let me start with...", "The main takeaway is...")',
          'Explain without reading any written notes',
          'Close with a decisive summary sentence',
        ],
      },
    },
  ],
  badges: ['keynote-speaker'],
  previewNextDay: {
    title: 'Week 2 Fluency Challenge & Milestone',
    dayNumber: 14,
  },
  week: 2,
};

export default day13;
