// ============================================================
// Day 18 — Present Information and Explain Data Clearly
// ============================================================

import { DayDefinition } from '@/types';

const day18: DayDefinition = {
  dayNumber: 18,
  title: 'Present Information and Explain Data Clearly',
  subtitle: 'Day 18 of 30 • Week 3: Communicate Professionally',
  objective:
    'Build skills for presenting information clearly, describing data trends with appropriate vocabulary, and handling audience questions — all while maintaining natural, engaging delivery.',
  coreMessage:
    'Good presentation is not about sounding impressive — it is about helping your audience understand. Structure and signposting are more important than complex vocabulary.',
  estimatedMinutes: { full: 45, express: 14 },
  todayGoals: [
    'Structure a 3-minute presentation with signposting',
    'Describe data trends accurately using trend vocabulary',
    'Distinguish facts from inferences',
    'Explain the same data to different audiences',
    'Handle Q&A with composure',
  ],
  activities: [
    { id: 'd18-welcome', type: 'welcome', title: 'Welcome to Day 18', dayNumber: 18, order: 1, isRequired: true, expressMode: true, durationMinutes: 1,
      config: { content: 'Today you practice presenting information clearly — whether that\'s a project update, research summary, or data explanation. Structure and clarity beat complexity.' } },

    // 1. Presentation Baseline
    { id: 'd18-baseline', type: 'recording', title: 'Presentation Baseline', dayNumber: 18, order: 2, isRequired: true, expressMode: true, durationMinutes: 3, xpReward: 10,
      config: { prompt: 'Present something you know well to an imaginary audience. Explain it in 2 minutes as clearly as possible.', durationSeconds: 120, isBaseline: true, label: 'Presentation Baseline' },
      trackVariants: {
        professional: { prompt: 'Present a project update or business insight to an imaginary audience. 2 minutes.' },
        student: { prompt: 'Present a topic from your studies to an imaginary audience. 2 minutes.' },
      } },

    // 2. Signposting Framework
    { id: 'd18-signposting', type: 'framework_lesson', title: 'Signposting Language', dayNumber: 18, order: 3, isRequired: true, expressMode: true, durationMinutes: 2,
      config: { frameworkName: 'Signposting for Presentations', steps: [
        { title: 'Opening', description: '"Today I\'m going to cover..." / "My main point is..."' },
        { title: 'Structure', description: '"First... Second... Finally..." / "Let me start with..."' },
        { title: 'Transitions', description: '"Moving on to..." / "This brings me to..." / "Now let\'s look at..."' },
        { title: 'Conclusions', description: '"To summarize..." / "The key takeaway is..." / "In conclusion..."' },
        { title: 'Emphasis', description: '"The important thing here is..." / "What matters most is..."' },
      ], content: 'Signposting phrases act as a GPS for your audience. They help people follow your logic without getting lost.' } },

    // 3. Signposting Practice
    { id: 'd18-signposting-practice', type: 'recording', title: 'Practice: Signposted Presentation', dayNumber: 18, order: 4, isRequired: true, expressMode: true, durationMinutes: 3, xpReward: 15,
      config: { prompt: 'Pick any topic and present it in 2 minutes using at least 4 signposting phrases (opening, structure, transition, conclusion).', durationSeconds: 120, prepTimeSeconds: 15 } },

    // 4. Data Vocabulary Activation
    { id: 'd18-data-vocab', type: 'data_narration', title: 'Data Vocabulary', description: 'Learn precise vocabulary for describing trends and changes in data.',
      dayNumber: 18, order: 5, isRequired: true, expressMode: true, durationMinutes: 3, xpReward: 10,
      config: { step: 'vocab' } },

    // 5. Data Description with Chart
    { id: 'd18-data-describe', type: 'data_narration', title: 'Describe This Data', description: 'View a data visualization and describe the trends using WHAT → EVIDENCE → INTERPRETATION.',
      dayNumber: 18, order: 6, isRequired: true, expressMode: true, durationMinutes: 4, xpReward: 20,
      config: { step: 'chart' } },

    // 6. Fact vs Inference
    { id: 'd18-fact-inference', type: 'framework_lesson', title: 'Fact vs Inference', dayNumber: 18, order: 7, isRequired: true, expressMode: false, durationMinutes: 2,
      config: { frameworkName: 'Distinguishing Facts from Inferences', steps: [
        { title: 'Fact', description: '"The data shows a 25% increase." (Objectively verifiable)' },
        { title: 'Inference', description: '"One possible explanation is that the marketing campaign drove the increase." (Interpretation)' },
        { title: 'Signal words', description: 'Facts: "shows, indicates, according to" // Inferences: "might suggest, one possibility, could be"' },
      ], content: 'Strong presenters explicitly mark what is FACT and what is INTERPRETATION. This builds credibility.' } },

    // 7. Practice: Fact vs Inference
    { id: 'd18-fact-inference-practice', type: 'recording', title: 'Practice: Fact vs Inference', dayNumber: 18, order: 8, isRequired: true, expressMode: false, durationMinutes: 2, xpReward: 10,
      config: { prompt: 'Describe a trend in your area: state one FACT and one INFERENCE about it. Make the distinction clear using signal words.', durationSeconds: 60 } },

    // 8. Explain Without Visual
    { id: 'd18-no-visual', type: 'recording', title: 'Explain Data Without the Chart', description: 'The chart is hidden. Describe the data from memory.',
      dayNumber: 18, order: 9, isRequired: true, expressMode: false, durationMinutes: 2, xpReward: 15,
      config: { prompt: 'Explain the key findings from the data chart you just described — but from memory. What were the main patterns? Speak for 60 seconds.', durationSeconds: 60 } },

    // 9. Audience Adaptation
    { id: 'd18-audience', type: 'recording', title: 'Audience Adaptation', description: 'Explain the same data to a non-specialist audience.',
      dayNumber: 18, order: 10, isRequired: true, expressMode: true, durationMinutes: 2, xpReward: 15,
      config: { prompt: 'Explain the same data findings to a general audience — someone who doesn\'t work in your area. Use simpler language and focus on the key takeaway.', durationSeconds: 60 } },

    // 10. Q&A Handling
    { id: 'd18-qa', type: 'presentation_qa', title: 'Handle Q&A After Presentation', description: 'Practice answering audience questions with composure.',
      dayNumber: 18, order: 11, isRequired: true, expressMode: true, durationMinutes: 4, xpReward: 20,
      config: {
        questions: [
          'Could you explain the methodology behind those numbers?',
          'What\'s the main implication for us going forward?',
          'How confident are you in these findings?',
          'What happens if the trend reverses?',
        ],
        bufferPhrases: [
          'That\'s a good question. Based on what we have...',
          'Let me clarify that point.',
          'That\'s something we\'d need to examine further, but initially...',
        ],
      } },

    // 11. Main Presentation Challenge
    { id: 'd18-main-presentation', type: 'recording', title: 'Main Challenge: 3-Minute Presentation', description: 'Deliver a structured 3-minute presentation with data explanation and Q&A readiness.',
      dayNumber: 18, order: 12, isRequired: true, expressMode: true, durationMinutes: 5, xpReward: 35,
      config: {
        prompt: 'Deliver a 3-minute presentation. Include: (1) Opening with purpose, (2) Data/evidence with fact vs inference, (3) Audience-adapted conclusion. Use signposting throughout.',
        durationSeconds: 180, isMainChallenge: true, prepTimeSeconds: 30,
      } },

    // 12. Mission
    { id: 'd18-mission', type: 'mission', title: 'Mission: 90-Second Data Explanation', dayNumber: 18, order: 13, isRequired: true, expressMode: true, durationMinutes: 2, xpReward: 15,
      config: { missionDescription: 'Explain one real data point, trend, or finding to someone (or record it). Use specific vocabulary and distinguish fact from interpretation.', missionOptions: [
        'Explain a trend from your work or studies',
        'Describe a chart or graph to a colleague',
        'Record a 90-second data explanation for practice',
      ] } },

    { id: 'd18-scorecard', type: 'scorecard', title: 'Day 18 Complete', dayNumber: 18, order: 14, isRequired: true, expressMode: true, durationMinutes: 1, xpReward: 30, config: {} },
  ],
  badges: ['data-narrator', 'day-18-finisher'],
  previewNextDay: { title: 'Give Feedback, Fix Mistakes, and Handle Difficult Conversations', dayNumber: 19 },
  week: 3,
};

export default day18;
