// ============================================================
// Adv Class H — Module 1: Personality, Human Behavior & Psychological Traits
// Grounded in Oxford Word Skills (Gairns & Redman) (Activities 1–10)
// ============================================================

import { AdvancedClass } from './types';

export const advClassH: AdvancedClass = {
  id: 'adv-class-h',
  letter: 'H',
  moduleNumber: 8,
  name: 'Adv Class H',
  title: 'Personality, Human Behavior & Psychological Traits',
  theme: 'Oxford Word Skills: Behavioral Lexicon & Psychological Precision',
  overview:
    'Grounded in Ruth Gairns & Stuart Redman’s Oxford Word Skills (Upper-Intermediate & Advanced), this master class develops elite psychological and behavioral vocabulary: evaluating executive leadership traits under crisis, contrasting subtle character nuances (assertive vs. confrontational), deconstructing unconscious bias ("cognitive rigidity"), managing cross-cultural group cohesion, and decoding kinesics and micro-expressions in high-stakes negotiations.',
  linguistNote:
    'In professional appraisals and executive profiling, generic descriptors fail to capture behavioral complexity. Replacing colloquial labels ("stubborn") with precise cognitive descriptors ("cognitive rigidity", "marked reluctance") eliminates perceived personal animus, while calibrated emotional vocabulary ("profoundly unsettled", "wholly unacceptable") maintains rigorous professional distance during mediation and compliance debriefs.',
  activitiesCount: 10,
  cefrRange: 'C1–C2',
  isReady: true,
  activities: [
    {
      id: 'adv-h-1',
      activityNumber: 1,
      globalNumber: 71,
      title: 'Evaluating Leadership Traits in Corporate Audits',
      skill: 'Writing',
      subskill: 'Nuanced Personality Adjectives & Behavioral Lexicon',
      cefrLevel: 'C1',
      objective:
        'Analyze executive leadership behaviors using precise personality descriptors (e.g., charismatic, meticulous, pragmatic, unscrupulous, visionary).',
      instructions:
        'Write a 2-sentence executive evaluation of a CEO navigating a corporate crisis, contrasting composure with unfeeling severity.',
      taskPrompt:
        'Evaluate a CEO who remains calm, acts logically without emotional bias, but makes ruthless decisions.',
      expectedAnswer:
        'The Chief Executive demonstrated exceptional pragmatism and composure under pressure, remaining unperturbed by market panic. However, her decision to terminate senior staff without consultation was criticized as ruthlessly unfeeling.',
      targetCollocation: 'pragmatism and composure / ruthlessly unfeeling',
      difficulty: 'Advanced',
      activityType: 'Corporate Assessment',
      justification:
        'Pairing cognitive virtues ("pragmatism and composure") with interpersonal critique ("ruthlessly unfeeling") constructs a balanced, multi-dimensional executive appraisal.',
      hint: 'Praise the CEO’s "pragmatism and composure" in sentence 1, then critique her decisions as "ruthlessly unfeeling" in sentence 2.',
      xpReward: 20,
    },
    {
      id: 'adv-h-2',
      activityNumber: 2,
      globalNumber: 72,
      title: 'Psychological Trait Contrasts in Peer Reviews',
      skill: 'Writing',
      subskill: 'Contrasting Character Traits & Behavioral Nuances',
      cefrLevel: 'C1',
      objective:
        'Distinguish between deceptively similar personality adjectives (e.g., assertive vs. aggressive, frugal vs. stingy, confident vs. arrogant).',
      instructions:
        "Draft a peer feedback entry clarifying a manager's workplace communication style, contrasting firmness with aggression.",
      taskPrompt: "Differentiate between the manager's firm guidance and aggressive behavior.",
      expectedAnswer:
        'While team members appreciate her assertive direction during project deadlines, her tone during debriefs occasionally borders on confrontational, making staff hesitant to share candid feedback.',
      targetCollocation: 'assertive direction vs. confrontational tone',
      difficulty: 'Advanced',
      activityType: 'Peer Feedback Drafting',
      justification:
        '"Assertive" highlights positive clarity and leadership resolve, whereas "confrontational" isolates interpersonal friction without using crude, inflammatory labels like "aggressive".',
      hint: 'Acknowledge her "assertive direction" first, then note where her delivery "borders on confrontational".',
      xpReward: 20,
    },
    {
      id: 'adv-h-3',
      activityNumber: 3,
      globalNumber: 73,
      title: 'Spotlight Analysis: Idiosyncrasies & Behavioral Quirks',
      skill: 'Speaking',
      subskill: 'Idiomatic Character Descriptors',
      cefrLevel: 'C2',
      objective:
        'Deploy advanced idioms and "Spotlight" expressions (e.g., set in one\'s ways, larger than life, a dark horse, wear one\'s heart on one\'s sleeve) in character portraits.',
      instructions:
        'Deliver a concise psychological profile of an influential political figure who balances public charisma with private secrecy.',
      taskPrompt:
        'Describe a politician who reveals little about personal motives but possesses commanding public charisma.',
      expectedAnswer:
        'In public forums, the senator presents a larger-than-life persona that commands immediate attention. Privately, however, he remains a complete dark horse, keeping his strategic calculations closely guarded from even his inner circle.',
      targetCollocation: 'larger-than-life persona / a complete dark horse',
      difficulty: 'Mastery',
      activityType: 'Character Profiling',
      justification:
        '"Larger-than-life" characterizes magnetic public presence, while "a dark horse" idiomatically denotes inscrutability and unrevealed strategic capability.',
      hint: 'Contrast a public "larger-than-life persona" with private secrecy using "a complete dark horse".',
      xpReward: 25,
    },
    {
      id: 'adv-h-4',
      activityNumber: 4,
      globalNumber: 74,
      title: 'Emotional Intensity Calibration in Conflict Resolution',
      skill: 'Speaking',
      subskill: 'Gradable & Non-Gradable Emotional Vocabulary',
      cefrLevel: 'C1',
      objective:
        'Calibrate emotional intensity using precise modifiers and non-gradable adjectives (e.g., mildly irritated, utterly despondent, fiercely defensive).',
      instructions:
        'Roleplay an HR mediation statement expressing controlled, professional gravity over repeated policy non-compliance.',
      taskPrompt:
        'Express deep concern about compliance lapses without resorting to unprofessional language.',
      expectedAnswer:
        'I am profoundly unsettled by the repeated compliance oversights in Q2. While I understand the department was under strain, such negligence is wholly unacceptable in a regulated financial environment.',
      targetCollocation: 'profoundly unsettled / wholly unacceptable',
      difficulty: 'Advanced',
      activityType: 'HR Mediation Roleplay',
      justification:
        'Non-gradable intensifiers ("profoundly unsettled", "wholly unacceptable") convey institutional finality and calibrated authority without descending into personal petulance.',
      hint: 'Speak the opening with "I am profoundly unsettled by..." and conclude with "wholly unacceptable".',
      xpReward: 20,
    },
    {
      id: 'adv-h-5',
      activityNumber: 5,
      globalNumber: 75,
      title: 'Deconstructing Unconscious Bias in Performance Reviews',
      skill: 'Writing',
      subskill: 'Abstract Nouns & Psychological Terminology',
      cefrLevel: 'C2',
      objective:
        'Identify and replace subtle biased phrasing with objective psychological and behavioral terminology (e.g., cognitive dissonance, confirmation bias, implicit prejudice).',
      instructions:
        'Rewrite a subjective performance review entry to conform to rigorous, objective corporate HR standards.',
      taskPrompt: "Task: 'He seems stubborn and doesn't like changes proposed by younger colleagues.'",
      expectedAnswer:
        'The employee exhibits cognitive rigidity when presented with alternative workflow methodologies, demonstrating a marked reluctance to integrate peer-driven technological updates.',
      targetCollocation: 'cognitive rigidity / marked reluctance',
      difficulty: 'Mastery',
      activityType: 'Objective Performance Writing',
      justification:
        'Replacing colloquial accusations ("stubborn") with clinical descriptors ("cognitive rigidity", "marked reluctance") anchors performance management in observable behavioral patterns.',
      hint: 'Translate "stubborn" to "cognitive rigidity" and describe aversion to change as "marked reluctance".',
      xpReward: 25,
    },
    {
      id: 'adv-h-6',
      activityNumber: 6,
      globalNumber: 76,
      title: 'Evaluating Social Dynamics in Cross-Cultural Teams',
      skill: 'Writing',
      subskill: 'Sociological & Interpersonal Vocabulary',
      cefrLevel: 'C1',
      objective:
        'Incorporate cross-cultural collaboration vocabulary (e.g., cultural nuance, group cohesion, egalitarian structure, hierarchy) in team management reports.',
      instructions:
        'Draft a recommendation memo explaining why replacing rigid hierarchy with egalitarian communication improves innovation across international engineering hubs.',
      taskPrompt:
        'Task: Explain why replacing rigid hierarchy with egalitarian communication improves innovation.',
      expectedAnswer:
        'Transitioning from a rigid hierarchical model to an egalitarian framework fosters open dialogue across international hubs. Unfettered communication enhances group cohesion and ensures subtle technical nuances are addressed early.',
      targetCollocation: 'egalitarian framework / group cohesion / subtle technical nuances',
      difficulty: 'Advanced',
      activityType: 'Management Memo Formulation',
      justification:
        'Terms like "egalitarian framework" and "group cohesion" formulate an intellectually rigorous sociolinguistic rationale for workplace structural reform.',
      hint: 'Advocate for an "egalitarian framework" and highlight its benefits for "group cohesion" and "subtle technical nuances".',
      xpReward: 20,
    },
    {
      id: 'adv-h-7',
      activityNumber: 7,
      globalNumber: 77,
      title: 'Spotlight: Idiomatic Mental States in High-Stakes Negotiations',
      skill: 'Speaking',
      subskill: 'Mental State Idioms & Collocations',
      cefrLevel: 'C2',
      objective:
        'Utilize idiomatic mental state expressions (e.g., keep a cool head, at one\'s wits\' end, lose one\'s composure, see eye to eye) under pressure.',
      instructions:
        'Draft a debrief note explaining how emotional stability prevented the collapse of intense labor contract negotiations.',
      taskPrompt: 'Task: Describe how maintaining composure prevented negotiation collapse.',
      expectedAnswer:
        'Despite intense provocation from the union delegates, our lead negotiator kept a cool head throughout the 14-hour session. Although both parties were at their wits\' end, his steady demeanor prevented a complete breakdown in talks.',
      targetCollocation: 'kept a cool head / at their wits\' end',
      difficulty: 'Mastery',
      activityType: 'Debrief Writing',
      justification:
        'Contrasting "kept a cool head" against "at their wits\' end" dramatizes the psychological gulf between executive self-regulation and emotional burnout under pressure.',
      hint: 'Describe how the negotiator "kept a cool head" even when both sides were "at their wits\' end".',
      xpReward: 25,
    },
    {
      id: 'adv-h-8',
      activityNumber: 8,
      globalNumber: 78,
      title: 'Analyzing Moral & Ethical Stances in Corporate Governance',
      skill: 'Writing',
      subskill: 'Ethics & Integrity Lexicon',
      cefrLevel: 'C1',
      objective:
        'Apply ethical descriptors (e.g., scrupulous, compromised, ethically ambiguous, fiduciary duty) in governance evaluations.',
      instructions:
        'Assess a board member’s potential conflict of interest regarding undisclosed holdings in a vendor firm.',
      taskPrompt: 'Task: Evaluate an unannounced personal financial stake in a vendor firm.',
      expectedAnswer:
        'Failing to disclose personal holdings in the vendor firm represents a compromised ethical stance that directly breaches fiduciary duty. Board members must maintain scrupulous transparency in all third-party dealings.',
      targetCollocation: 'compromised ethical stance / breaches fiduciary duty / scrupulous transparency',
      difficulty: 'Advanced',
      activityType: 'Governance Assessment',
      justification:
        'Deploying "breaches fiduciary duty" and "scrupulous transparency" invokes statutory governance benchmarks essential for legal compliance briefs.',
      hint: 'Characterize the non-disclosure as a "compromised ethical stance" that "breaches fiduciary duty", requiring "scrupulous transparency".',
      xpReward: 20,
    },
    {
      id: 'adv-h-9',
      activityNumber: 9,
      globalNumber: 79,
      title: 'Describing Non-Verbal Communication & Micro-Expressions',
      skill: 'Writing',
      subskill: 'Kinesics & Non-Verbal Descriptors',
      cefrLevel: 'C2',
      objective:
        'Incorporate non-verbal communication terminology (e.g., stoic expression, subtle gesture, defensive posture, fleeting glance) in investigative journalism.',
      instructions:
        'Write an observation paragraph analyzing a witness’s physical cues and suppressed distress during courtroom cross-examination.',
      taskPrompt:
        'Task: Describe a witness who attempts to appear calm but reveals anxiety through physical cues.',
      expectedAnswer:
        'While the witness maintained a stoic facial expression during cross-examination, his rigid posture and nervous tapping revealed underlying distress. A fleeting glance toward defense counsel betrayed significant hesitation before answering.',
      targetCollocation: 'stoic facial expression / fleeting glance betrayed hesitation',
      difficulty: 'Mastery',
      activityType: 'Investigative Observation',
      justification:
        'Precise kinesic observation ("stoic facial expression", "fleeting glance betrayed hesitation") enriches investigative reporting with acute psychological fidelity.',
      hint: 'Contrast a "stoic facial expression" with involuntary cues like a "fleeting glance" that "betrayed hesitation".',
      xpReward: 25,
    },
    {
      id: 'adv-h-10',
      activityNumber: 10,
      globalNumber: 80,
      title: 'Personalized Reflection: Navigating Career Transitions',
      skill: 'Speaking',
      subskill: 'Self-Assessment & Career Development Lexicon',
      cefrLevel: 'C1',
      objective:
        'Articulate personal career values, ambitions, and adaptability using advanced self-evaluation vocabulary (e.g., career trajectory, pivotal moment, core competence, professional pivot).',
      instructions:
        'Deliver a spoken executive career vision statement describing a pivotal transition into sustainable technology.',
      taskPrompt:
        'Task: Describe a pivotal career moment that prompted a transition into sustainable tech.',
      expectedAnswer:
        'A pivotal moment in my career occurred when leading a legacy supply chain overhaul, realizing that operational efficiency must align with environmental stewardship. Leveraging my core competence in systems engineering, I executed a strategic professional pivot into sustainable technology leadership.',
      targetCollocation: 'pivotal moment / core competence / strategic professional pivot',
      difficulty: 'Advanced',
      activityType: 'Personal Career Vision',
      justification:
        'Synthesizing "pivotal moment", "core competence", and "strategic professional pivot" constructs a compelling narrative arc suitable for executive pitches and leadership interviews.',
      hint: 'Structure your reflection around: 1. A "pivotal moment", 2. Leveraging your "core competence", 3. Executing a "strategic professional pivot".',
      xpReward: 20,
    },
  ],
};
