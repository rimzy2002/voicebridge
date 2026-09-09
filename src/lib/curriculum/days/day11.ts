// ============================================================
// Day 11 — Think Fast: Speak Without Preparation
// ============================================================

import { DayDefinition } from '@/types';

const day11: DayDefinition = {
  dayNumber: 11,
  title: 'Think Fast: Speak Without Preparation',
  subtitle: 'Day 11 of 30 • Week 2: Build Fluency',
  objective:
    'Train spontaneous spoken English under realistic time pressure. Eliminate mental translation delays, overcome conversational freezes using the 5-Second Rule, and build storytelling agility with Story Cubes.',
  coreMessage:
    'Confidence is not having all the answers memorized. It is trusting your ability to formulate thoughts out loud in real time.',
  estimatedMinutes: { full: 38, express: 15 },
  todayGoals: [
    'Start speaking within 5 seconds of hearing an unexpected question',
    'Execute the "Yes/And" continuous momentum technique',
    'Weave 3 random concepts into a cohesive 90-second narrative (Story Cubes)',
    'Explain a highly complex topic simply (Rubber Duck Debugging)',
    'Complete the 3-round progressive impromptu challenge (30s → 60s → 120s)',
  ],
  activities: [
    // 1. Recall
    {
      id: 'd11-recall',
      type: 'timed_speaking',
      title: 'Day 10 Spoken Summary Recall',
      dayNumber: 11,
      order: 1,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        prompt: 'Warm-up: Deliver a 30-second summary of any podcast, article, or lesson you engaged with recently. Speak immediately without writing notes.',
        speakTimeSeconds: 30,
      },
    },

    // 2. Spontaneity Baseline
    {
      id: 'd11-spontaneity-baseline',
      type: 'recording',
      title: 'Day 11 Spontaneity Baseline',
      dayNumber: 11,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt: 'Unexpected Question: "If you could eliminate one meeting or routine permanently from your work or university life, what would it be and why?"',
        isFiveSecondRule: true,
        durationSeconds: 60,
      },
    },

    // 3. Five-Second Rule Framework
    {
      id: 'd11-five-second-framework',
      type: 'framework_lesson',
      title: 'The 5-Second Anchor Strategy',
      dayNumber: 11,
      order: 3,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        steps: [
          { title: 'The Problem', description: 'When asked an unexpected question, learners pause for 8–15 seconds trying to compose the perfect full paragraph in their head.' },
          { title: 'The 5-Second Rule', description: 'Commit to uttering your first word within 5 seconds by starting with an anchor phrase: "That is an interesting question...", "When considering that...", or "My immediate reaction is..."' },
          { title: 'Thinking Out Loud', description: 'Once your mouth is moving, your brain formulates the second sentence effortlessly. Overcoming the initial stall is 90% of the battle.' },
        ],
      },
    },

    // 4. Impromptu Prompt Drill
    {
      id: 'd11-impromptu-prompt',
      type: 'recording',
      title: '5-Second Rule Reaction Drill',
      dayNumber: 11,
      order: 4,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt: 'Rapid Prompt: "What single technological invention in the past 25 years has produced the most profound shift in human society?"',
        isFiveSecondRule: true,
        durationSeconds: 60,
      },
    },

    // 5. Yes/And Continuation
    {
      id: 'd11-yes-and',
      type: 'recording',
      title: 'The "Yes/And" Momentum Builder',
      dayNumber: 11,
      order: 5,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Take this prompt: "Artificial intelligence will automate routine code writing." You must immediately validate it ("Yes, and..."), add a secondary layer, and speak for 60 seconds without coming to a dead halt.',
        durationSeconds: 60,
        prepTimeSeconds: 5,
      },
    },

    // 6. Story Cubes Randomizer
    {
      id: 'd11-story-cubes',
      type: 'recording',
      title: 'Story Cubes: Spontaneous Narrative Weaving',
      dayNumber: 11,
      order: 6,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 25,
      config: {
        type: 'story_cube',
        prompt: 'Connect the 3 randomized concepts into a smooth, logical 90-second story. Focus on narrative flow and clean transitions.',
        durationSeconds: 90,
        prepTimeSeconds: 15,
      },
    },

    // 7. Rubber Duck Explanation
    {
      id: 'd11-rubber-duck',
      type: 'recording',
      title: 'Rubber Duck: Explain a Complex Idea Simply',
      dayNumber: 11,
      order: 7,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 20,
      config: {
        prompt:
          'Explain your daily job, academic field, or a complex technical system to a non-technical 12-year-old in 60 seconds. Use zero jargon and clear metaphors.',
        durationSeconds: 60,
        prepTimeSeconds: 15,
      },
    },

    // 8. Circumlocution Power Challenge
    {
      id: 'd11-circumlocution',
      type: 'recording',
      title: 'Circumlocution: Explain Without the Word',
      dayNumber: 11,
      order: 8,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Explain the concept of "cryptocurrency" without using the words "money", "bitcoin", "coin", or "digital". Speak for 45 seconds.',
        durationSeconds: 45,
        prepTimeSeconds: 10,
      },
    },

    // 9. Random Follow-up Pressure
    {
      id: 'd11-random-followup',
      type: 'recording',
      title: 'Handling Unexpected Pressure Questions',
      dayNumber: 11,
      order: 9,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Executive Follow-Up: "You mentioned your approach saves time, but what if our core database vendor triples their pricing next month? How does your recommendation hold up?" Answer in 60 seconds.',
        isFiveSecondRule: true,
        durationSeconds: 60,
      },
    },

    // 10. Rewind Self-Correction Drill
    {
      id: 'd11-rewind-drill',
      type: 'recording',
      title: 'Rewind & Spoken Precision Drill',
      dayNumber: 11,
      order: 10,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prompt:
          'Identify one phrase from your previous recordings where you hesitated or stumbled. Speak the corrected sentence cleanly 3 times in a row, then integrate it into a new 45-second thought.',
        durationSeconds: 45,
      },
    },

    // 11. Main Impromptu Challenge
    {
      id: 'd11-main-impromptu',
      type: 'recording',
      title: 'Main Impromptu 3-Stage Gauntlet',
      dayNumber: 11,
      order: 11,
      isRequired: true,
      expressMode: true,
      durationMinutes: 6,
      xpReward: 30,
      config: {
        prompt:
          'Progressive Impromptu Challenge: Address 3 unexpected scenarios with increasing durations and minimal preparation time.',
        rounds: [
          { label: 'Round 1: 30 Seconds', durationSeconds: 30, guidance: 'Prompt: What is the most overrated advice given in your industry?' },
          { label: 'Round 2: 60 Seconds', durationSeconds: 60, guidance: 'Prompt: How should leaders handle failure in front of their team?' },
          { label: 'Round 3: 120 Seconds', durationSeconds: 120, guidance: 'Prompt: Describe an ethical dilemma created by modern technology and propose a solution.' },
        ],
      },
    },

    // 12. Scorecard
    {
      id: 'd11-scorecard',
      type: 'scorecard',
      title: 'Day 11 Spontaneity & Agility Scorecard',
      dayNumber: 11,
      order: 12,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 10,
      config: {},
    },

    // 13. Mission
    {
      id: 'd11-mission',
      type: 'mission',
      title: 'Day 11 Micro-Mission: Spontaneous Answers in Real Life',
      dayNumber: 11,
      order: 13,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 15,
      config: {
        missionTitle: 'Answer 3 unexpected questions in English without stalling',
        criteria: [
          'Start speaking within 5 seconds of the question',
          'Avoid vocal fillers by pausing silently',
          'Give at least a 30-second structured response to each',
        ],
      },
    },
  ],
  badges: ['quick-thinker'],
  previewNextDay: {
    title: 'Handle Difficult Situations with Flexible Language',
    dayNumber: 12,
  },
  week: 2,
};

export default day11;
