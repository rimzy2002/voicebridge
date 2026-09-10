// ============================================================
// Day 17 — Answer Interview Questions with Structure and Evidence
// ============================================================

import { DayDefinition } from '@/types';

const day17: DayDefinition = {
  dayNumber: 17,
  title: 'Answer Interview Questions with Structure and Evidence',
  subtitle: 'Day 17 of 30 • Week 3: Communicate Professionally',
  objective:
    'Develop clear interview responses without memorized robotic scripts. Practice Tell Me About Yourself, STAR behavioral answers, strength/weakness questions, and unexpected questions with progressive difficulty.',
  coreMessage:
    'Great interview answers use evidence, not adjectives. Instead of "I am a great leader," say "I led a team of 5 that delivered the project 2 weeks early."',
  estimatedMinutes: { full: 48, express: 14 },
  todayGoals: [
    'Structure a compelling "Tell me about yourself" answer',
    'Build STAR responses from real experience',
    'Answer strength and weakness questions with evidence',
    'Handle unexpected and behavioral questions',
    'Complete a progressive-difficulty interview simulation',
  ],
  activities: [
    { id: 'd17-welcome', type: 'welcome', title: 'Welcome to Day 17', dayNumber: 17, order: 1, isRequired: true, expressMode: true, durationMinutes: 1,
      config: { content: 'Today is about interview communication — not memorized scripts. You\'ll learn to answer with structure, evidence, and natural confidence.' } },

    // 1. Interview Confidence
    { id: 'd17-interview-confidence', type: 'confidence_check', title: 'Interview Confidence Check', dayNumber: 17, order: 2, isRequired: true, expressMode: true, durationMinutes: 2,
      config: { questionText: 'Rate your confidence in interview situations:', dimensions: [
        { id: 'introduce_myself', label: 'Introducing myself clearly', min: 1, max: 10 },
        { id: 'experience', label: 'Describing my experience', min: 1, max: 10 },
        { id: 'strengths', label: 'Talking about strengths with evidence', min: 1, max: 10 },
        { id: 'weaknesses', label: 'Discussing areas for improvement', min: 1, max: 10 },
        { id: 'examples', label: 'Giving specific examples', min: 1, max: 10 },
        { id: 'unexpected', label: 'Handling unexpected questions', min: 1, max: 10 },
        { id: 'concise', label: 'Keeping answers concise', min: 1, max: 10 },
        { id: 'nervousness', label: 'Managing nervousness', min: 1, max: 10 },
      ] } },

    // 2. Interview Baseline
    { id: 'd17-interview-baseline', type: 'recording', title: 'Interview Baseline', dayNumber: 17, order: 3, isRequired: true, expressMode: true, durationMinutes: 3, xpReward: 10,
      config: { prompt: '"Tell me about yourself." — Answer in 60-90 seconds as if in a real interview.', durationSeconds: 90, isBaseline: true, label: 'Interview Baseline' } },

    // 3. Tell Me About Yourself Framework
    { id: 'd17-tmay-framework', type: 'framework_lesson', title: 'Tell Me About Yourself — Structure', dayNumber: 17, order: 4, isRequired: true, expressMode: true, durationMinutes: 2,
      config: { frameworkName: 'PRESENT → RELEVANT PAST → VALUE → DIRECTION', steps: [
        { letter: 'P', title: 'Present', description: 'What do you do now? "I\'m currently a..."' },
        { letter: 'R', title: 'Relevant Past', description: 'What experience brought you here? "Before this, I worked on..."' },
        { letter: 'V', title: 'Value / Strength', description: 'What are you good at? "I\'m known for..." (with brief proof)' },
        { letter: 'D', title: 'Direction', description: 'What are you looking for? "I\'m excited about..."' },
      ], content: 'Avoid autobiography. This is not your life story — it is a 60-second professional pitch.' } },

    // 4. TMAY Practice
    { id: 'd17-tmay-practice', type: 'recording', title: 'Practice: Tell Me About Yourself', dayNumber: 17, order: 5, isRequired: true, expressMode: true, durationMinutes: 2, xpReward: 15,
      config: { prompt: 'Using PRESENT → PAST → VALUE → DIRECTION, answer "Tell me about yourself" in 60 seconds.', durationSeconds: 60, showFrameworkHint: true, frameworkHint: 'PRESENT → RELEVANT PAST → VALUE → DIRECTION' } },

    // 5. STAR Framework Review
    { id: 'd17-star-review', type: 'framework_lesson', title: 'STAR Framework Review', dayNumber: 17, order: 6, isRequired: true, expressMode: false, durationMinutes: 2,
      config: { frameworkName: 'STAR — Situation, Task, Action, Result', steps: [
        { letter: 'S', title: 'Situation', description: 'Set the scene briefly. When and where.' },
        { letter: 'T', title: 'Task', description: 'What was YOUR responsibility or challenge?' },
        { letter: 'A', title: 'Action', description: 'What did YOU specifically do? (Not the team — YOU.)' },
        { letter: 'R', title: 'Result', description: 'What happened? Include measurable outcome if possible.' },
      ], content: 'The same STAR framework from earlier. Do not recreate — reuse and refine.' } },

    // 6. STAR Builder
    { id: 'd17-star-builder', type: 'star_response', title: 'STAR Builder: Your Real Experience', description: 'Build a STAR answer from a real experience you choose.',
      dayNumber: 17, order: 7, isRequired: true, expressMode: true, durationMinutes: 3, xpReward: 20,
      config: { prompt: '"Tell me about a time you handled a difficult challenge." Use a real experience. Apply STAR: Situation → Task → Action → Result. Speak for 90 seconds.', durationSeconds: 90, prepTimeSeconds: 15 } },

    // 7. Strong vs Weak Evidence
    { id: 'd17-evidence-quality', type: 'information_display', title: 'Strong vs Weak Evidence', dayNumber: 17, order: 8, isRequired: true, expressMode: false, durationMinutes: 2,
      config: { content: '**Weak:** "I am good at teamwork."\n**Better:** "In my last project, I coordinated 4 team members across 2 time zones to deliver a client presentation 3 days early."\n\nInterviewers want PROOF, not adjectives. Show what you did and what happened because of it.' } },

    // 8. Strength Question
    { id: 'd17-strength', type: 'recording', title: 'Strength Question Practice', dayNumber: 17, order: 9, isRequired: true, expressMode: true, durationMinutes: 2, xpReward: 15,
      config: { prompt: '"What would you say is your greatest strength?" Answer with: Strength + Evidence + Relevance. 60 seconds.', durationSeconds: 60, showFrameworkHint: true, frameworkHint: 'STRENGTH + EVIDENCE + RELEVANCE' } },

    // 9. Weakness Question
    { id: 'd17-weakness', type: 'recording', title: 'Weakness Question Practice', dayNumber: 17, order: 10, isRequired: true, expressMode: false, durationMinutes: 2, xpReward: 15,
      config: { prompt: '"What area are you working to improve?" Answer with: Real manageable area + Action taken + Improvement shown. Avoid fake weaknesses. 60 seconds.', durationSeconds: 60 } },

    // 10. Behavioral Questions
    { id: 'd17-behavioral', type: 'recording', title: 'Behavioral Question Practice', dayNumber: 17, order: 11, isRequired: true, expressMode: false, durationMinutes: 3, xpReward: 15,
      config: { prompt: '"Describe a time you worked effectively as part of a team." Use STAR. Speak for 90 seconds.', durationSeconds: 90, prepTimeSeconds: 10 } },

    // 11. Unexpected Question
    { id: 'd17-unexpected', type: 'recording', title: 'Unexpected Question', dayNumber: 17, order: 12, isRequired: true, expressMode: true, durationMinutes: 2, xpReward: 15,
      config: { prompt: '"If you could change one thing about your industry or field, what would it be?" You have 5 seconds to organize, then speak for 60 seconds.', durationSeconds: 60, isFiveSecondRule: true } },

    // 12. Main Interview Simulation
    { id: 'd17-main-interview', type: 'interview_simulation', title: 'Interview Simulation (8-10 min)',
      description: 'Progressive difficulty interview. Round 1: Supportive. Round 2: Neutral. Round 3: Challenging.',
      dayNumber: 17, order: 13, isRequired: true, expressMode: true, durationMinutes: 10, xpReward: 40,
      config: { isMainChallenge: true, conversationDuration: 540 } },

    // 13. Retry Weak Answer
    { id: 'd17-retry', type: 'recording', title: 'Retry: Improve Your Weakest Answer', dayNumber: 17, order: 14, isRequired: true, expressMode: true, durationMinutes: 2, xpReward: 10,
      config: { prompt: 'Think about which interview answer felt weakest. Re-answer that question now with better structure and evidence. Speak for 60 seconds.', durationSeconds: 60, maxAttempts: 2 } },

    // 14. Mission
    { id: 'd17-mission', type: 'mission', title: 'Mission: 2-Minute Self-Introduction', dayNumber: 17, order: 15, isRequired: true, expressMode: true, durationMinutes: 2, xpReward: 15,
      config: { missionDescription: 'Record a 2-minute professional self-introduction that you could use in a real interview. Use the structure you practiced today.', missionOptions: [
        'Record and save a polished self-introduction',
        'Practice your STAR answer for one behavioral question',
        'Ask someone to give you a surprise question and answer it',
      ] } },

    { id: 'd17-scorecard', type: 'scorecard', title: 'Day 17 Complete', dayNumber: 17, order: 16, isRequired: true, expressMode: true, durationMinutes: 1, xpReward: 30, config: {} },
  ],
  badges: ['interview-ready', 'day-17-finisher'],
  previewNextDay: { title: 'Present Information and Explain Data Clearly', dayNumber: 18 },
  week: 3,
};

export default day17;
