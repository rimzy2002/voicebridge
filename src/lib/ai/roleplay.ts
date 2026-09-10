// ============================================================
// Professional Roleplay Engine — Extends Conversation Simulator
// ============================================================

import { LearnerTrack, RoleplayConfig, RoleplayDifficulty, RoleplayRole } from '@/types';

// --- Roleplay Scenario Templates ---

export interface RoleplayScenario {
  id: string;
  title: string;
  description: string;
  config: RoleplayConfig;
  openingLine: string;
  possibleFollowUps: string[];
  challengeMoments: string[];
  exitLine: string;
}

// --- Difficulty Definitions ---

export const DIFFICULTY_LEVELS: Record<RoleplayDifficulty, {
  label: string;
  description: string;
  thinkingTime: number; // extra seconds
  ambiguity: boolean;
  unexpectedQuestions: boolean;
  constraints: boolean;
}> = {
  supportive: {
    label: 'Level 1 — Supportive',
    description: 'Clear questions. Extra thinking time. Encouraging responses.',
    thinkingTime: 10,
    ambiguity: false,
    unexpectedQuestions: false,
    constraints: false,
  },
  realistic: {
    label: 'Level 2 — Realistic',
    description: 'Natural follow-ups. Minor ambiguity. Standard professional expectations.',
    thinkingTime: 5,
    ambiguity: true,
    unexpectedQuestions: false,
    constraints: false,
  },
  challenging: {
    label: 'Level 3 — Challenging',
    description: 'Unexpected questions. Reasonable disagreement. Time/resource constraints.',
    thinkingTime: 3,
    ambiguity: true,
    unexpectedQuestions: true,
    constraints: true,
  },
};

// --- Role Catalog ---

export interface RolePersona {
  role: RoleplayRole;
  name: string;
  title: string;
  personality: string;
  speakingStyle: string;
  boundaries: string[];
}

export const ROLE_PERSONAS: Record<RoleplayRole, RolePersona> = {
  manager: {
    role: 'manager',
    name: 'Alex',
    title: 'Project Manager',
    personality: 'Direct, results-oriented, fair',
    speakingStyle: 'Concise, asks for specifics, expects structured updates',
    boundaries: ['Never abusive', 'Never personally insulting', 'May challenge but stays professional'],
  },
  interviewer: {
    role: 'interviewer',
    name: 'Sarah',
    title: 'Senior Interviewer',
    personality: 'Thorough, curious, evaluative',
    speakingStyle: 'Asks open-ended questions, probes for specifics, listens actively',
    boundaries: ['Never discriminatory', 'Never asks illegal questions', 'Challenges with respect'],
  },
  client: {
    role: 'client',
    name: 'James',
    title: 'Client Representative',
    personality: 'Demanding but reasonable, outcome-focused',
    speakingStyle: 'Direct questions about timelines and deliverables',
    boundaries: ['Never abusive', 'May express frustration professionally', 'Expects accountability'],
  },
  coworker: {
    role: 'coworker',
    name: 'Maria',
    title: 'Team Member',
    personality: 'Collaborative, sometimes has different opinions',
    speakingStyle: 'Informal but professional, shares ideas openly',
    boundaries: ['Never hostile', 'May disagree respectfully', 'Open to compromise'],
  },
  professor: {
    role: 'professor',
    name: 'Dr. Chen',
    title: 'Course Professor',
    personality: 'Knowledgeable, expects preparation, supportive of effort',
    speakingStyle: 'Asks probing questions, expects evidence, values clarity',
    boundaries: ['Never dismissive of students', 'Challenges ideas constructively', 'Encourages participation'],
  },
  classmate: {
    role: 'classmate',
    name: 'Jordan',
    title: 'Study Group Member',
    personality: 'Friendly, sometimes disorganized, eager to collaborate',
    speakingStyle: 'Casual, asks for help, shares opinions freely',
    boundaries: ['Never bullying', 'May miss deadlines', 'Open to feedback'],
  },
  customer: {
    role: 'customer',
    name: 'Pat',
    title: 'Customer',
    personality: 'Has a specific issue, wants resolution',
    speakingStyle: 'Clear about the problem, expects empathy and solutions',
    boundaries: ['Never threatening', 'May be frustrated but not abusive', 'Responds to genuine effort'],
  },
  event_participant: {
    role: 'event_participant',
    name: 'Taylor',
    title: 'Conference Attendee',
    personality: 'Open, professional, interested in networking',
    speakingStyle: 'Asks about work/interests, shares own background, polite',
    boundaries: ['Never asks invasive personal questions', 'Keeps conversation professional', 'Respects social cues'],
  },
  stakeholder: {
    role: 'stakeholder',
    name: 'Dr. Patel',
    title: 'Senior Stakeholder',
    personality: 'Strategic thinker, time-conscious, data-driven',
    speakingStyle: 'Asks "why" questions, wants clear ROI, challenges assumptions',
    boundaries: ['Never dismissive', 'May push back firmly', 'Expects evidence-based answers'],
  },
};

// --- Scenario Templates ---

function getNetworkingScenarios(track: LearnerTrack): RoleplayScenario[] {
  const scenarios: Record<LearnerTrack, RoleplayScenario[]> = {
    professional: [
      {
        id: 'net-conference',
        title: 'Industry Conference Networking',
        description: 'You are at a professional conference and approach someone during a break.',
        config: {
          role: 'event_participant',
          learnerTrack: 'professional',
          scenario: 'conference_networking',
          objective: 'Make a professional connection through natural conversation',
          difficulty: 'realistic',
          tone: 'neutral',
          requiredEvents: ['introduction', 'common_ground', 'exit'],
          successCriteria: ['Natural opener', 'Relevant follow-ups', 'Professional exit'],
        },
        openingLine: 'Hi there! Interesting keynote, wasn\'t it? I\'m Taylor — I work in product management at a fintech startup. How about you?',
        possibleFollowUps: [
          'That sounds really interesting. What kind of projects are you working on right now?',
          'How long have you been in that field?',
          'What brought you to this conference specifically?',
        ],
        challengeMoments: [
          'Actually, I\'ve heard mixed things about that approach. What\'s been your experience?',
        ],
        exitLine: 'It was really nice meeting you. I should head back — enjoy the rest of the conference!',
      },
    ],
    student: [
      {
        id: 'net-university',
        title: 'University Event Networking',
        description: 'You are at a university career fair and meet someone from an interesting organization.',
        config: {
          role: 'event_participant',
          learnerTrack: 'student',
          scenario: 'university_event',
          objective: 'Learn about opportunities through professional conversation',
          difficulty: 'supportive',
          tone: 'neutral',
          requiredEvents: ['introduction', 'common_ground', 'exit'],
          successCriteria: ['Natural opener', 'Relevant questions', 'Professional exit'],
        },
        openingLine: 'Hi! I\'m Taylor from the university\'s entrepreneurship society. Are you looking into any particular programs or fields?',
        possibleFollowUps: [
          'What are you studying? That\'s a really interesting combination.',
          'Have you done any internships or projects related to that?',
          'What made you choose that area?',
        ],
        challengeMoments: [
          'That\'s a competitive area. What do you think makes your approach different?',
        ],
        exitLine: 'Great talking with you! Good luck with your studies. Maybe we\'ll see each other at the next event!',
      },
    ],
    general: [
      {
        id: 'net-social',
        title: 'Social Event Introduction',
        description: 'You are at a community event and strike up a conversation with someone new.',
        config: {
          role: 'event_participant',
          learnerTrack: 'general',
          scenario: 'community_event',
          objective: 'Have a natural, friendly conversation with a new acquaintance',
          difficulty: 'supportive',
          tone: 'casual',
          requiredEvents: ['introduction', 'common_ground', 'exit'],
          successCriteria: ['Natural opener', 'Common ground found', 'Polite exit'],
        },
        openingLine: 'Hey! Nice event, right? I\'m Taylor. How do you know the organizer?',
        possibleFollowUps: [
          'That\'s cool! What do you enjoy doing in your free time?',
          'Have you been to events like this before?',
          'What brought you here today?',
        ],
        challengeMoments: [
          'Oh really? I\'ve actually had a different experience with that.',
        ],
        exitLine: 'It was great chatting! I\'m going to grab some food, but enjoy the rest of the evening!',
      },
    ],
  };

  return scenarios[track] || scenarios.general;
}

function getMeetingScenarios(track: LearnerTrack): RoleplayScenario[] {
  const scenarios: Record<LearnerTrack, RoleplayScenario[]> = {
    professional: [
      {
        id: 'mtg-project',
        title: 'Delayed Project Status Meeting',
        description: 'A project is behind schedule. You need to give an update, propose solutions, and handle disagreement.',
        config: {
          role: 'manager',
          learnerTrack: 'professional',
          scenario: 'delayed_project',
          objective: 'Contribute productively to a challenging meeting',
          hiddenAIGoals: ['Push back on at least one suggestion', 'Ask about impact on other teams'],
          difficulty: 'realistic',
          tone: 'formal',
          requiredEvents: ['update', 'idea', 'disagreement', 'action_summary'],
          successCriteria: ['Clear update', 'Constructive idea', 'Handled disagreement', 'Summarized actions'],
        },
        openingLine: 'Thanks everyone for joining. Let\'s start with project status updates. Can you walk us through where things stand?',
        possibleFollowUps: [
          'What\'s causing the delay specifically?',
          'How does this impact the delivery to the client?',
          'What resources would you need to get back on track?',
        ],
        challengeMoments: [
          'I\'m not sure that approach will work. We tried something similar last quarter and it didn\'t scale.',
          'The client is expecting delivery by the original date. How do we address that?',
        ],
        exitLine: 'Good discussion. Let\'s make sure we have clear next steps before we wrap up.',
      },
    ],
    student: [
      {
        id: 'mtg-group',
        title: 'Group Assignment Meeting',
        description: 'Your study group needs to divide work, agree on an approach, and set deadlines.',
        config: {
          role: 'classmate',
          learnerTrack: 'student',
          scenario: 'group_assignment',
          objective: 'Contribute ideas and help organize the group productively',
          difficulty: 'realistic',
          tone: 'casual',
          requiredEvents: ['update', 'idea', 'disagreement', 'action_summary'],
          successCriteria: ['Clear contribution', 'Practical idea', 'Handled different opinion', 'Summarized actions'],
        },
        openingLine: 'Hey everyone! So we need to finalize our approach for the presentation. Where are we at with the research?',
        possibleFollowUps: [
          'Have you started your section yet?',
          'I think we should probably change the structure. What do you think?',
          'When can everyone have their part ready?',
        ],
        challengeMoments: [
          'Hmm, I don\'t think that topic will work. Our professor specifically said to avoid that angle.',
          'I haven\'t really started yet. Can we push the internal deadline?',
        ],
        exitLine: 'Cool, so let\'s make sure everyone knows what they\'re doing. Who wants to go first?',
      },
    ],
    general: [
      {
        id: 'mtg-community',
        title: 'Community Event Planning',
        description: 'Your community group is planning a local event and needs to make decisions.',
        config: {
          role: 'coworker',
          learnerTrack: 'general',
          scenario: 'event_planning',
          objective: 'Contribute to planning discussion and help resolve disagreements',
          difficulty: 'supportive',
          tone: 'casual',
          requiredEvents: ['update', 'idea', 'disagreement', 'action_summary'],
          successCriteria: ['Active participation', 'Practical suggestion', 'Respectful discussion', 'Clear summary'],
        },
        openingLine: 'Great, thanks for coming everyone. So we need to decide on the venue and date for our annual community event. Any updates?',
        possibleFollowUps: [
          'What did you find out about the park venue?',
          'How much budget do we have left for catering?',
          'Who can take charge of decorations?',
        ],
        challengeMoments: [
          'I think the indoor venue is actually better. The weather has been unpredictable lately.',
          'That might be a bit over our budget. Can we think of alternatives?',
        ],
        exitLine: 'Alright, good meeting! Let\'s confirm everything by email. Thanks, everyone!',
      },
    ],
  };

  return scenarios[track] || scenarios.general;
}

function getInterviewScenarios(track: LearnerTrack): RoleplayScenario[] {
  const commonQuestions = [
    'Tell me about yourself.',
    'Tell me about a time you handled a challenge.',
    'What are your strengths?',
    'What area are you working to improve?',
    'Where do you see yourself in three years?',
    'Why are you interested in this role?',
    'Describe a time you worked effectively in a team.',
  ];

  return [
    {
      id: `int-${track}`,
      title: track === 'student' ? 'Internship Interview' : track === 'professional' ? 'Professional Interview' : 'Opportunity Interview',
      description: `A structured interview with progressive difficulty.`,
      config: {
        role: 'interviewer',
        learnerTrack: track,
        scenario: 'job_interview',
        objective: 'Answer questions with structure, evidence, and professionalism',
        hiddenAIGoals: ['Probe for specifics', 'Ask one unexpected follow-up'],
        difficulty: 'realistic',
        tone: 'formal',
        requiredEvents: ['self_intro', 'star_response', 'unexpected_question'],
        successCriteria: ['Structured intro', 'STAR evidence', 'Professional recovery'],
      },
      openingLine: 'Thank you for coming in today. Let\'s get started. Could you begin by telling me about yourself?',
      possibleFollowUps: commonQuestions.slice(1),
      challengeMoments: [
        'That\'s interesting, but can you give me a more specific example?',
        'What would you have done differently if you could go back?',
        'How would you handle a situation where your manager disagreed with your approach?',
      ],
      exitLine: 'Thank you for your time. We\'ll be in touch with the next steps. Do you have any questions for me?',
    },
  ];
}

// --- Public API ---

export function getScenarios(type: 'networking' | 'meeting' | 'interview', track: LearnerTrack): RoleplayScenario[] {
  switch (type) {
    case 'networking': return getNetworkingScenarios(track);
    case 'meeting': return getMeetingScenarios(track);
    case 'interview': return getInterviewScenarios(track);
  }
}

export function getPersonaForRole(role: RoleplayRole): RolePersona {
  return ROLE_PERSONAS[role];
}

export function getDifficultyConfig(difficulty: RoleplayDifficulty) {
  return DIFFICULTY_LEVELS[difficulty];
}

/**
 * Generate AI response for a roleplay turn.
 * Uses template-based responses consistent with existing conversation simulator.
 */
export function generateRoleplayResponse(
  scenario: RoleplayScenario,
  turnNumber: number,
  learnerTranscript: string,
): string {
  const text = learnerTranscript.toLowerCase();

  // First turn — return opening line
  if (turnNumber === 0) {
    return scenario.openingLine;
  }

  // Check for natural exit
  if (turnNumber > 4 && (text.includes('nice meeting') || text.includes('great talking') || text.includes('enjoy the rest'))) {
    return scenario.exitLine;
  }

  // Challenge moments at turn 3+
  if (turnNumber >= 3 && scenario.challengeMoments.length > 0) {
    const challengeIdx = Math.min(turnNumber - 3, scenario.challengeMoments.length - 1);
    return scenario.challengeMoments[challengeIdx];
  }

  // Follow-ups
  const followUpIdx = Math.min(turnNumber - 1, scenario.possibleFollowUps.length - 1);
  return scenario.possibleFollowUps[followUpIdx] || scenario.exitLine;
}
