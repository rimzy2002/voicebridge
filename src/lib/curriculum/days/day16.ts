// ============================================================
// Day 16 — Speak Up in Meetings
// ============================================================

import { DayDefinition } from '@/types';

const day16: DayDefinition = {
  dayNumber: 16,
  title: 'Speak Up in Meetings',
  subtitle: 'Day 16 of 30 • Week 3: Communicate Professionally',
  objective:
    'Teach learners to contribute rather than remain silent during meetings. Target skills: opening, giving updates, contributing ideas, agreeing, disagreeing, asking for clarification, interrupting politely, and summarizing actions.',
  coreMessage:
    'A meeting where you stay silent is a meeting where you are invisible. Contributing even one concise, clear idea makes you a valued participant.',
  estimatedMinutes: { full: 44, express: 13 },
  todayGoals: [
    'Participate actively in a meeting from the first moment',
    'Give a concise update using STATUS → PROGRESS → ISSUE → NEXT STEP',
    'Contribute ideas, agree, and disagree respectfully',
    'Interrupt politely and ask useful clarification questions',
    'Summarize action items at meeting end',
  ],
  activities: [
    { id: 'd16-welcome', type: 'welcome', title: 'Welcome to Day 16', dayNumber: 16, order: 1, isRequired: true, expressMode: true, durationMinutes: 1,
      config: { content: 'Today you learn to contribute during meetings — not just attend them. Whether it\'s a team meeting, group discussion, or planning session, your voice matters.' } },

    // 1. Baseline Meeting
    { id: 'd16-baseline-meeting', type: 'meeting_simulation', title: 'Baseline Meeting Participation', description: 'Jump straight into a short meeting. Participate for approximately 3 minutes. No instruction first — just speak.',
      dayNumber: 16, order: 2, isRequired: true, expressMode: true, durationMinutes: 4, xpReward: 15,
      config: { meetingTitle: 'Quick Status Check-In', isBaseline: true, conversationDuration: 180 } },

    // 2. Meeting Opener Scripts
    { id: 'd16-opener-scripts', type: 'framework_lesson', title: 'Meeting Opener Scripts', dayNumber: 16, order: 3, isRequired: true, expressMode: false, durationMinutes: 2,
      config: { frameworkName: 'Meeting Openers by Context', steps: [
        { title: 'Formal', description: '"Thank you for joining. Let\'s start with..." / "The purpose of today\'s meeting is..."' },
        { title: 'Informal', description: '"Okay, let\'s get started. First up..." / "Quick check-in — where are we on...?"' },
        { title: 'Virtual', description: '"Can everyone hear me okay? Great. Let\'s dive in." / "I\'ll share my screen — just a moment."' },
      ] } },

    // 3. Giving an Update
    { id: 'd16-update-framework', type: 'framework_lesson', title: 'Giving a Meeting Update', dayNumber: 16, order: 4, isRequired: true, expressMode: true, durationMinutes: 2,
      config: { frameworkName: 'STATUS → PROGRESS → ISSUE → NEXT STEP', steps: [
        { letter: 'S', title: 'Status', description: 'Where are we? "We are currently at 70% completion."' },
        { letter: 'P', title: 'Progress', description: 'What has happened? "This week, we completed the testing phase."' },
        { letter: 'I', title: 'Issue', description: 'What is blocking progress? "The main blocker is the delayed data from team B."' },
        { letter: 'N', title: 'Next Step', description: 'What happens next? "Our next step is to follow up with team B by Thursday."' },
      ] } },

    // 4. Update Practice
    { id: 'd16-update-practice', type: 'recording', title: 'Practice: Give Your Update', dayNumber: 16, order: 5, isRequired: true, expressMode: true, durationMinutes: 2, xpReward: 15,
      config: { prompt: 'Give a 45-second meeting update about a project, assignment, or task you are working on. Use STATUS → PROGRESS → ISSUE → NEXT STEP.', durationSeconds: 45, prepTimeSeconds: 10 },
      trackVariants: {
        student: { prompt: 'Give a 45-second update about your current course project. Use STATUS → PROGRESS → ISSUE → NEXT STEP.' },
        general: { prompt: 'Give a 45-second update about something you are organizing or working on. Use STATUS → PROGRESS → ISSUE → NEXT STEP.' },
      } },

    // 5. Contributing an Idea
    { id: 'd16-contributing-idea', type: 'framework_lesson', title: 'Contributing Ideas & Agreement/Disagreement', dayNumber: 16, order: 6, isRequired: true, expressMode: false, durationMinutes: 2,
      config: { frameworkName: 'Meeting Contribution Language', steps: [
        { title: 'Propose', description: '"One option might be..." / "I\'d suggest..." / "One thing we could consider is..."' },
        { title: 'Agree', description: '"I agree with that." / "That makes sense." / "I\'d support that option."' },
        { title: 'Disagree', description: '"I see it differently..." / "Another perspective might be..." / "I\'m not sure that would work because..."' },
        { title: 'Interrupt', description: '"Sorry to interrupt, but..." / "Could I add something here?" / "Before we move on..."' },
        { title: 'Clarify', description: '"Could you clarify what you mean by...?" / "Just to make sure I understand..." / "Are you saying that...?"' },
      ] } },

    // 6. Virtual Meeting Challenges
    { id: 'd16-virtual-challenges', type: 'recording', title: 'Virtual Meeting Challenges', description: 'Practice handling common virtual meeting issues.',
      dayNumber: 16, order: 7, isRequired: true, expressMode: false, durationMinutes: 3, xpReward: 10,
      config: { prompt: 'Scenario: During a virtual call, you missed what someone said due to audio issues. Ask them to repeat it professionally, then respond to their point. Speak for 30 seconds.',
        durationSeconds: 30 } },

    // 7. Action Summary Practice
    { id: 'd16-action-summary', type: 'recording', title: 'Action Summary Practice', description: 'Summarize a meeting\'s decisions, owners, and next steps.',
      dayNumber: 16, order: 8, isRequired: true, expressMode: true, durationMinutes: 2, xpReward: 15,
      config: { prompt: '"So, just to summarize..." — Invent a realistic meeting outcome and summarize: (1) What was decided, (2) Who is responsible, (3) Next action, (4) Deadline.',
        durationSeconds: 45 } },

    // 8. Main Meeting Simulation
    { id: 'd16-main-meeting', type: 'meeting_simulation', title: 'Main Meeting Simulation (6-8 min)',
      description: 'Full meeting simulation with distinct AI participants. Give an update, contribute an idea, handle disagreement, and summarize actions.',
      dayNumber: 16, order: 9, isRequired: true, expressMode: true, durationMinutes: 8, xpReward: 35,
      config: { meetingTitle: 'Project Status & Strategy Meeting', isMainChallenge: true, conversationDuration: 420 },
      trackVariants: {
        student: { meetingTitle: 'Group Assignment Planning Meeting' },
        general: { meetingTitle: 'Community Event Planning Discussion' },
      } },

    // 9. Meeting Scorecard
    { id: 'd16-meeting-scorecard', type: 'information_display', title: 'Meeting Participation Scorecard',
      dayNumber: 16, order: 10, isRequired: true, expressMode: true, durationMinutes: 2, xpReward: 10,
      config: { content: 'Track your meeting performance:\n\n• Participation: Did you contribute?\n• Concise updates: Were you clear and brief?\n• Useful questions: Did you ask relevant questions?\n• Agreement/Disagreement: Did you express your view?\n• Interruption: Was it appropriate and polite?\n• Clarification: Did you seek clarity when needed?\n• Action summary: Did you capture next steps?\n• Conversation balance: Did you speak AND listen?\n• Clarity: Was your language clear?\n\nReview which areas felt strongest and which need practice.' } },

    // 10. Mission
    { id: 'd16-mission', type: 'mission', title: 'Real-World Mission: Meeting Contribution', dayNumber: 16, order: 11, isRequired: true, expressMode: true, durationMinutes: 2, xpReward: 15,
      config: { missionDescription: 'Make one English contribution during a real or AI discussion today.', missionOptions: [
        'Contribute an idea in a work meeting',
        'Ask a clarification question in a class or discussion',
        'Summarize action items after a group discussion',
        'Practice with the meeting simulation above',
      ], conversationFallback: true } },

    // 11. Scorecard
    { id: 'd16-scorecard', type: 'scorecard', title: 'Day 16 Complete', dayNumber: 16, order: 12, isRequired: true, expressMode: true, durationMinutes: 1, xpReward: 30, config: {} },
  ],
  badges: ['meeting-contributor', 'day-16-finisher'],
  previewNextDay: { title: 'Answer Interview Questions with Structure and Evidence', dayNumber: 17 },
  week: 3,
};

export default day16;
