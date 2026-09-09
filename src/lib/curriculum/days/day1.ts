// ============================================================
// Day 1 — Discover Your Communication Level
// ============================================================

import { DayDefinition } from '@/types';

const day1: DayDefinition = {
  dayNumber: 1,
  title: 'Discover Your Communication Level',
  subtitle: 'Day 1 of 30',
  objective: 'Establish your starting level in speaking, vocabulary, grammar, pronunciation, fluency, listening, thought organization and confidence.',
  coreMessage: "Today we're not testing how much English you know. We're discovering how you currently communicate.",
  estimatedMinutes: { full: 40, express: 15 },
  todayGoals: [
    'Speak without preparation',
    'Identify your communication strengths',
    'Identify your biggest weaknesses',
    'Record your starting level',
    'Set your personal 30-day goal',
  ],
  activities: [
    // --- 1. Welcome ---
    {
      id: 'd1-welcome',
      type: 'welcome',
      title: 'Welcome to Day 1',
      dayNumber: 1,
      order: 1,
      isRequired: true,
      expressMode: false,
      durationMinutes: 1,
      config: {
        content: "Today we're not testing how much English you know. We're discovering how you currently communicate.\n\nSpeak naturally. Don't worry about mistakes.\n\nBy Day 30, you'll repeat some of today's activities and compare your improvement.",
        bulletPoints: [
          'Speak without preparation',
          'Identify your communication strengths',
          'Identify your biggest weaknesses',
          'Record your starting level',
          'Set your personal 30-day goal',
        ],
        showProgress: true,
      },
    },

    // --- 2. Goal Selection ---
    {
      id: 'd1-goal-selection',
      type: 'goal_selection',
      title: 'Your Communication Goals',
      dayNumber: 1,
      order: 2,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      config: {
        questionText: 'Why do you want to improve your English communication?',
        allowMultiple: true,
        options: [
          { id: 'job-interviews', label: 'Job interviews', icon: '💼' },
          { id: 'workplace', label: 'Workplace communication', icon: '🏢' },
          { id: 'meetings', label: 'Meetings', icon: '🤝' },
          { id: 'presentations', label: 'Presentations', icon: '📊' },
          { id: 'academic', label: 'University / academic communication', icon: '🎓' },
          { id: 'confidence', label: 'Speaking confidently', icon: '💪' },
          { id: 'social', label: 'Social conversations', icon: '💬' },
          { id: 'travel', label: 'Moving / traveling abroad', icon: '✈️' },
          { id: 'leadership', label: 'Leadership communication', icon: '👔' },
          { id: 'customer', label: 'Customer communication', icon: '🎯' },
          { id: 'fluency', label: 'General fluency', icon: '🗣️' },
          { id: 'other', label: 'Other', icon: '📝' },
        ],
      },
    },

    // --- 2b. Difficulty Selection ---
    {
      id: 'd1-difficulty-selection',
      type: 'goal_selection',
      title: 'Your Biggest Difficulty',
      dayNumber: 1,
      order: 3,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      config: {
        questionText: 'What is currently your biggest difficulty?',
        allowMultiple: false,
        options: [
          { id: 'cant-speak-quickly', label: 'I know English but cannot speak quickly', icon: '⏱️' },
          { id: 'translate-in-head', label: 'I translate in my head', icon: '🔄' },
          { id: 'forget-vocabulary', label: 'I forget vocabulary', icon: '📖' },
          { id: 'afraid-mistakes', label: "I'm afraid of making mistakes", icon: '😰' },
          { id: 'weak-grammar-speaking', label: 'My grammar becomes weak when speaking', icon: '📝' },
          { id: 'unclear-pronunciation', label: 'My pronunciation is unclear', icon: '🔊' },
          { id: 'cant-organize-thoughts', label: "I don't know how to organize my thoughts", icon: '🧩' },
          { id: 'short-answers', label: 'I give very short answers', icon: '📏' },
          { id: 'cant-understand-fast', label: 'I struggle to understand fast English', icon: '👂' },
          { id: 'no-confidence', label: "I don't feel confident speaking with fluent speakers", icon: '😓' },
        ],
      },
    },

    // --- 3. Confidence Baseline ---
    {
      id: 'd1-confidence-baseline',
      type: 'confidence_check',
      title: 'Confidence Baseline',
      description: 'Rate your current confidence in each area from 1-10',
      dayNumber: 1,
      order: 4,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 10,
      config: {
        dimensions: [
          { id: 'speaking-fluently', label: 'Speaking fluently', min: 1, max: 10 },
          { id: 'vocabulary', label: 'Vocabulary', min: 1, max: 10 },
          { id: 'grammar-speaking', label: 'Grammar while speaking', min: 1, max: 10 },
          { id: 'pronunciation', label: 'Pronunciation', min: 1, max: 10 },
          { id: 'listening', label: 'Listening', min: 1, max: 10 },
          { id: 'professional', label: 'Workplace / professional English', min: 1, max: 10 },
          { id: 'spontaneous', label: 'Speaking without preparation', min: 1, max: 10 },
          { id: 'overall', label: 'Overall confidence', min: 1, max: 10 },
        ],
      },
    },

    // --- 4. Baseline Recording ---
    {
      id: 'd1-baseline-recording',
      type: 'recording',
      title: 'Challenge 1 — Introduce Yourself',
      description: 'This is your Day 1 baseline recording. You will repeat this on Day 7 and Day 30 to measure your progress.',
      dayNumber: 1,
      order: 5,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 20,
      config: {
        prepTimeSeconds: 30,
        speakTimeSeconds: 90,
        prompt: 'Introduce yourself.',
        promptSuggestions: [
          'Who you are',
          'What you study or do',
          'Your interests',
          'Your goals',
          'Why you want to improve English',
          'Something interesting about yourself',
        ],
        isBaseline: true,
        label: 'Baseline Recording — Day 1',
        requirements: ['Do not restart your recording because of mistakes. Continue speaking.'],
      },
    },

    // --- 5. Starting Communication Profile ---
    {
      id: 'd1-communication-profile',
      type: 'information_display',
      title: 'Your Starting Communication Profile',
      description: 'Based on your recording and self-assessment',
      dayNumber: 1,
      order: 6,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      config: {
        content: 'Your personalized communication profile will be generated from your recording and self-assessment.',
      },
    },

    // --- 6. Fluency Challenge ---
    {
      id: 'd1-fluency-challenge',
      type: 'recording',
      title: 'Challenge 2 — Speak for 60 Seconds',
      description: 'Test your spontaneous speaking ability',
      dayNumber: 1,
      order: 7,
      isRequired: true,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        prepTimeSeconds: 0,
        speakTimeSeconds: 60,
        prompt: 'Describe your typical day.',
        requirements: [
          'Do not stop for more than 5 seconds',
          'Do not restart',
          'Do not switch languages',
          'If you forget a word, explain it using simpler English',
        ],
      },
    },

    // --- 7. PREP Framework Lesson ---
    {
      id: 'd1-prep-lesson',
      type: 'framework_lesson',
      title: 'PREP Technique',
      description: 'Learn your first communication framework',
      dayNumber: 1,
      order: 8,
      isRequired: true,
      expressMode: true,
      durationMinutes: 3,
      xpReward: 15,
      config: {
        frameworkName: 'PREP',
        steps: [
          { letter: 'P', name: 'Point', description: 'Give your answer.', example: 'I prefer working from home.' },
          { letter: 'R', name: 'Reason', description: 'Explain why.', example: 'Because I can concentrate better.' },
          { letter: 'E', name: 'Example', description: 'Give an example.', example: 'For example, I usually complete tasks faster when there are fewer interruptions.' },
          { letter: 'P', name: 'Point', description: 'Finish your idea.', example: 'So for work that requires concentration, I prefer working from home.' },
        ],
        weakExample: 'I prefer working from home because it is good.',
        strongExample: 'I prefer working from home because I can concentrate better. For example, I usually complete tasks faster when there are fewer interruptions. So for work that requires concentration, I prefer working from home.',
      },
    },

    // --- 8. PREP Practice ---
    {
      id: 'd1-prep-practice',
      type: 'recording',
      title: 'Practice PREP',
      description: 'Choose a question and answer using PREP',
      dayNumber: 1,
      order: 9,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 20,
      config: {
        prepTimeSeconds: 30,
        speakTimeSeconds: 90,
        questions: [
          { id: 'q1', text: 'Do you prefer learning online or in a classroom?', category: 'education' },
          { id: 'q2', text: 'What skill is most important for career success?', category: 'professional' },
          { id: 'q3', text: 'Should university students work part-time?', category: 'academic' },
        ],
        showFrameworkHint: true,
        frameworkHint: 'Point → Reason → Example → Point',
      },
      trackVariants: {
        student: {
          questions: [
            { id: 'q1', text: 'Do you prefer learning online or in a classroom?', category: 'education' },
            { id: 'q2', text: 'What makes a good teacher?', category: 'education' },
            { id: 'q3', text: 'Should university students work part-time?', category: 'academic' },
          ],
        },
        professional: {
          questions: [
            { id: 'q1', text: 'Do you prefer working from home or in an office?', category: 'work' },
            { id: 'q2', text: 'What skill is most important for career success?', category: 'professional' },
            { id: 'q3', text: 'Should companies allow flexible working hours?', category: 'work' },
          ],
        },
      },
    },

    // --- 9. Before/After Reflection ---
    {
      id: 'd1-before-after',
      type: 'reflection',
      title: 'Compare Your Answers',
      description: 'Which response felt easier?',
      dayNumber: 1,
      order: 10,
      isRequired: true,
      expressMode: false,
      durationMinutes: 2,
      config: {
        reflectionQuestions: [
          {
            id: 'easier-response',
            question: 'Which answer felt easier to give?',
            type: 'multiple_choice',
            options: ['My introduction (Challenge 1)', 'My PREP answer (Challenge 2)'],
          },
          {
            id: 'why-easier',
            question: 'Why?',
            type: 'multiple_choice',
            options: [
              'I knew how to organize my ideas',
              'I had more confidence',
              'I spoke longer',
              'I had fewer pauses',
              'I used better vocabulary',
              'No difference yet',
            ],
          },
        ],
      },
    },

    // --- 10. Vocabulary Activation ---
    {
      id: 'd1-vocabulary',
      type: 'vocabulary_activation',
      title: "Today's Power Expressions",
      description: 'Learn 5 expressions and use them immediately in speech',
      dayNumber: 1,
      order: 11,
      isRequired: true,
      expressMode: true,
      durationMinutes: 4,
      xpReward: 15,
      config: {
        expressions: [
          {
            expression: 'From my perspective...',
            instead_of: 'I think...',
            example: 'From my perspective, communication skills are essential.',
            category: 'opinion',
          },
          {
            expression: 'One of the main reasons is...',
            meaning: 'Introduce a key reason',
            example: 'One of the main reasons is that communication helps teams work efficiently.',
            category: 'explanation',
          },
          {
            expression: 'For example...',
            meaning: 'Introduce supporting evidence',
            example: 'For example, regular practice is more effective than occasional study.',
            category: 'example',
          },
          {
            expression: 'In my experience...',
            meaning: 'Share personal perspective',
            example: 'In my experience, practicing every day is more effective than studying once a week.',
            category: 'experience',
          },
          {
            expression: 'Overall...',
            meaning: 'Conclude or summarize',
            example: 'Overall, improving communication requires consistent practice.',
            category: 'conclusion',
          },
        ],
        requiredUsageCount: 3,
        prompt: 'What makes someone a good communicator?',
      },
    },

    // --- 11. Think-in-English Challenge ---
    {
      id: 'd1-think-in-english',
      type: 'think_in_english',
      title: 'Think-in-English Challenge',
      description: 'Practice thinking directly in English without translating',
      dayNumber: 1,
      order: 12,
      isRequired: false,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        prompt: 'Imagine you are preparing to leave home for work or school. For 60 seconds, describe everything you are thinking.',
        promptSuggestions: [
          'I need to find my keys.',
          'I should take my laptop.',
          'It looks like it might rain.',
          'I need to leave soon because...',
        ],
        speakTimeSeconds: 60,
        requirements: ['Do not translate. Use simple English if necessary.'],
      },
    },

    // --- 12. Pronunciation Mini-Activity ---
    {
      id: 'd1-pronunciation',
      type: 'pronunciation_lesson',
      title: 'Sentence Stress',
      description: 'Learn which words to emphasize when speaking',
      dayNumber: 1,
      order: 13,
      isRequired: false,
      expressMode: false,
      durationMinutes: 3,
      xpReward: 10,
      config: {
        content: 'Important words in a sentence receive more stress. This helps listeners understand your key message.',
        stressExamples: [
          'I REALLY want to improve my ENGLISH communication.',
          'I want to become MORE confident.',
          'Communication is IMPORTANT for my CAREER.',
          "I'm going to PRACTICE English EVERY day.",
        ],
      },
    },

    // --- 13. Real-World Mission ---
    {
      id: 'd1-mission',
      type: 'mission',
      title: "Today's Mission",
      description: 'Put your learning into practice in the real world',
      dayNumber: 1,
      order: 14,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      xpReward: 20,
      config: {
        missionDescription: 'Have a 2-minute English conversation with someone.',
        missionOptions: [
          'Friend',
          'Classmate',
          'Coworker',
          'Family member',
          'Online language partner',
          'AI conversation partner',
        ],
        suggestedTopic: 'Tell them why you want to improve your communication skills.',
        conversationFallback: true,
      },
    },

    // --- 14. Reflection ---
    {
      id: 'd1-reflection',
      type: 'reflection',
      title: 'Day 1 Reflection',
      description: 'Reflect on your experience today',
      dayNumber: 1,
      order: 15,
      isRequired: true,
      expressMode: true,
      durationMinutes: 2,
      config: {
        reflectionQuestions: [
          {
            id: 'confidence-now',
            question: 'How confident did you feel today?',
            type: 'scale',
            min: 1,
            max: 10,
          },
          {
            id: 'hardest',
            question: 'What was hardest?',
            type: 'multiple_choice',
            options: [
              'Finding vocabulary',
              'Grammar',
              'Pronunciation',
              'Organizing thoughts',
              'Speaking continuously',
              'Confidence',
              'Understanding questions',
            ],
          },
          {
            id: 'easiest',
            question: 'What was easiest?',
            type: 'multiple_choice',
            options: [
              'Finding vocabulary',
              'Grammar',
              'Pronunciation',
              'Organizing thoughts',
              'Speaking continuously',
              'Confidence',
              'Understanding questions',
            ],
          },
          {
            id: 'improve-tomorrow',
            question: 'One thing I want to improve tomorrow:',
            type: 'text',
          },
        ],
      },
    },

    // --- 15. Scorecard ---
    {
      id: 'd1-scorecard',
      type: 'scorecard',
      title: 'Day 1 Complete',
      dayNumber: 1,
      order: 16,
      isRequired: true,
      expressMode: true,
      durationMinutes: 1,
      xpReward: 10,
      config: {
        badgeSlug: 'first-step',
        showPreview: true,
        previewDay: 2,
        previewTitle: 'Stop Translating, Start Speaking',
      },
    },
  ],
  badges: ['first-step'],
  previewNextDay: {
    title: 'Stop Translating, Start Speaking',
    dayNumber: 2,
  },
  week: 1,
};

export default day1;
