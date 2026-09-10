import { DayDefinition } from '@/types';
import day1 from './day1';
import day8 from './day8';
import day9 from './day9';
import day10 from './day10';
import day11 from './day11';
import day12 from './day12';
import day13 from './day13';
import day14 from './day14';
import day15 from './day15';
import day16 from './day16';
import day17 from './day17';
import day18 from './day18';
import day19 from './day19';
import day20 from './day20';
import day21 from './day21';

const dedicatedDays: Record<number, DayDefinition> = {
  1: day1,
  8: day8,
  9: day9,
  10: day10,
  11: day11,
  12: day12,
  13: day13,
  14: day14,
  15: day15,
  16: day16,
  17: day17,
  18: day18,
  19: day19,
  20: day20,
  21: day21,
};

const dayMeta: Record<number, { title: string; subtitle: string; objective: string; coreMessage: string }> = {
  1: {
    title: 'Discover Your Communication Level',
    subtitle: 'Day 1 of 30',
    objective: 'Establish your baseline across fluency, vocabulary, grammar, and delivery.',
    coreMessage: "Today we're not testing how much English you know. We're discovering how you currently communicate.",
  },
  2: {
    title: 'Stop Translating, Start Speaking',
    subtitle: 'Day 2 of 30',
    objective: 'Bypass internal mental translation and cultivate spontaneous English formulation.',
    coreMessage: 'Fluency begins when you accept simple, direct English instead of waiting for perfection.',
  },
  3: {
    title: 'Framework Power: The PREP Technique',
    subtitle: 'Day 3 of 30',
    objective: 'Structure spontaneous responses logically using Point-Reason-Example-Point.',
    coreMessage: 'Never ramble again. A clear structure instantly elevates professional perception.',
  },
  4: {
    title: 'Vocal Presence & Elimination of Fillers',
    subtitle: 'Day 4 of 30',
    objective: 'Replace "um", "ah", and nervous vocal ticks with intentional, powerful pauses.',
    coreMessage: 'Silence feels uncomfortable to you, but sounds confident and authoritative to your listener.',
  },
  5: {
    title: 'Concise Messaging & The Elevator Pitch',
    subtitle: 'Day 5 of 30',
    objective: 'Distill high-complexity thoughts into crisp 30-to-60 second explanations.',
    coreMessage: 'Clarity is subtraction. Say more by speaking fewer, more deliberate words.',
  },
  6: {
    title: 'Mastering Active Clarification & Inquiry',
    subtitle: 'Day 6 of 30',
    objective: 'Assertively seek clarification and steer conversations without hesitation.',
    coreMessage: 'Asking the right question demonstrates mastery, not weakness.',
  },
  7: {
    title: 'Week 1 Review & De-Fossilization Milestone',
    subtitle: 'Day 7 of 30',
    objective: 'Synthesize Week 1 techniques and measure initial progression against Day 1 benchmark.',
    coreMessage: 'Seven days of consistent application rewires your neurological speaking pathways.',
  },
  15: {
    title: 'Communicate Professionally Without Sounding Robotic',
    subtitle: 'Day 15 of 30 • Week 3',
    objective: 'Reset professional communication: natural networking, elevator pitches, and small talk.',
    coreMessage: 'Professional communication is not about corporate jargon — it is about clarity, respect, and purpose.',
  },
  16: {
    title: 'Speak Up in Meetings',
    subtitle: 'Day 16 of 30 • Week 3',
    objective: 'Participate actively in meetings: updates, idea contribution, disagreement, and action summaries.',
    coreMessage: 'A meeting where you stay silent is a meeting where you are invisible. Contributing even one concise idea establishes value.',
  },
  17: {
    title: 'Answer Interview Questions with Structure and Evidence',
    subtitle: 'Day 17 of 30 • Week 3',
    objective: 'Structure interview answers using evidence, not adjectives: TMAY and STAR frameworks.',
    coreMessage: 'Great interview answers use concrete evidence over adjectives. Structure builds credibility.',
  },
  18: {
    title: 'Present Information and Explain Data Clearly',
    subtitle: 'Day 18 of 30 • Week 3',
    objective: 'Signpost presentations clearly, describe data trends accurately, and distinguish fact from inference.',
    coreMessage: 'Good presentation is helping your audience understand effortlessly. Structure beats vocabulary complexity.',
  },
  19: {
    title: 'Handle Difficult Conversations Professionally',
    subtitle: 'Day 19 of 30 • Week 3',
    objective: 'Deliver constructive SBI feedback, admit mistakes with accountability, and navigate conflict.',
    coreMessage: 'Difficult conversations solve problems collaboratively while protecting relationships and trust.',
  },
  20: {
    title: 'Turn Written Messages into Clear Spoken Action',
    subtitle: 'Day 20 of 30 • Week 3',
    objective: 'Extract actions from dense writing, shift registers, and negotiate trade-offs smoothly.',
    coreMessage: 'Never read written text verbatim — translate complexity into purposeful spoken action.',
  },
  21: {
    title: 'Week 3 Professional Communication Challenge',
    subtitle: 'Day 21 of 30 • Week 3 Milestone',
    objective: 'Synthesize Week 3 competencies in an unassisted professional simulation and review 21-day progress.',
    coreMessage: 'Professional mastery is bringing clarity, composure, and emotional intelligence to every conversation.',
  },
};

export function getDay(dayNumber: number): DayDefinition {
  if (dedicatedDays[dayNumber]) {
    return dedicatedDays[dayNumber];
  }

  const meta = dayMeta[dayNumber] || {
    title: `Communication Mastery Day ${dayNumber}`,
    subtitle: `Day ${dayNumber} of 30`,
    objective: `Progressive skill building and targeted speaking practice for Day ${dayNumber}.`,
    coreMessage: 'Continuous daily application produces extraordinary compounding growth.',
  };

  return {
    dayNumber,
    title: meta.title,
    subtitle: meta.subtitle,
    objective: meta.objective,
    coreMessage: meta.coreMessage,
    estimatedMinutes: { full: 35, express: 15 },
    todayGoals: [
      'Warm up active English retrieval',
      'Apply today’s targeted framework',
      'Execute timed vocal challenge',
      'Complete real-world micro-mission',
    ],
    activities: [
      {
        id: `d${dayNumber}-welcome`,
        type: 'welcome',
        title: `Welcome to Day ${dayNumber}`,
        dayNumber,
        order: 1,
        isRequired: true,
        expressMode: true,
        durationMinutes: 1,
        config: {
          content: meta.coreMessage,
        },
      },
      {
        id: `d${dayNumber}-confidence-check`,
        type: 'confidence_check',
        title: 'Pre-Session Readiness Check',
        dayNumber,
        order: 2,
        isRequired: true,
        expressMode: false,
        durationMinutes: 2,
        config: {},
      },
      {
        id: `d${dayNumber}-framework-lesson`,
        type: 'framework_lesson',
        title: `${meta.title} — Core Strategy`,
        dayNumber,
        order: 3,
        isRequired: true,
        expressMode: true,
        durationMinutes: 5,
        config: {
          content: `In today's module, we focus on: ${meta.objective}\n\nReview the core framework and apply it in the upcoming vocal drills.`,
          steps: [
            { title: 'Step 1: Frame', description: 'Anchor your listener with a clear opening statement.' },
            { title: 'Step 2: Justify', description: 'Deliver 1-2 compelling reasons or supporting data points.' },
            { title: 'Step 3: Conclude', description: 'Summarize the takeaway or prompt next action.' },
          ],
        },
      },
      {
        id: `d${dayNumber}-speaking-drill`,
        type: 'recording',
        title: 'Timed Vocal Practice Drill',
        dayNumber,
        order: 4,
        isRequired: true,
        expressMode: true,
        durationMinutes: 3,
        config: {
          prompt: `Deliver a 60-second explanation on your current priority project using today's structure without hesitating.`,
          durationSeconds: 60,
          prepTimeSeconds: 15,
        },
      },
      {
        id: `d${dayNumber}-vocab-activation`,
        type: 'vocabulary_activation',
        title: 'High-Impact Vocabulary Activation',
        dayNumber,
        order: 5,
        isRequired: true,
        expressMode: true,
        durationMinutes: 4,
        config: {},
      },
      {
        id: `d${dayNumber}-mission`,
        type: 'mission',
        title: `Real-World Challenge: Day ${dayNumber}`,
        dayNumber,
        order: 6,
        isRequired: true,
        expressMode: true,
        durationMinutes: 2,
        config: {
          missionTitle: `Apply Day ${dayNumber} Strategy in Work/Study`,
          description: `Use today's specific communication pattern at least once in your daily interactions.`,
        },
      },
      {
        id: `d${dayNumber}-reflection`,
        type: 'reflection',
        title: 'Session Debrief & Self-Assessment',
        dayNumber,
        order: 7,
        isRequired: true,
        expressMode: false,
        durationMinutes: 3,
        config: {},
      },
      {
        id: `d${dayNumber}-scorecard`,
        type: 'scorecard',
        title: 'Day Complete',
        dayNumber,
        order: 8,
        isRequired: true,
        expressMode: true,
        durationMinutes: 1,
        xpReward: 30,
        config: {},
      },
    ],
    badges: [`day-${dayNumber}-finisher`],
    previewNextDay: {
      title: dayMeta[dayNumber + 1]?.title || `Day ${dayNumber + 1}`,
      dayNumber: dayNumber + 1,
    },
    week: Math.ceil(dayNumber / 7),
  };
}

export default getDay;
