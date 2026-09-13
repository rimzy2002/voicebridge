// ============================================================
// Adv Class I — Module 1: Tricky Grammatical Usage & Boundary Cases
// Grounded in Michael Swan's Practical English Usage & Hewings (Activities 1–10)
// ============================================================

import { AdvancedClass } from './types';

export const advClassI: AdvancedClass = {
  id: 'adv-class-i',
  letter: 'I',
  moduleNumber: 9,
  name: 'Adv Class I',
  title: 'Tricky Grammatical Usage & Boundary Cases',
  theme: 'Swan & Hewings: Usage Precision & Syntactic Boundary Cases',
  overview:
    'Grounded in Michael Swan’s Practical English Usage and Martin Hewings’ English Pronunciation in Use Advanced, this master class tackles tricky high-register boundary cases: distinguishing "as" vs. "like" in corporate roles, determiner precision ("every" vs. "whole"), reciprocal pronouns in multi-party legal agreements ("each other" vs. "one another"), dramatic negative adverbial inversion ("hardly...when" vs. "no sooner...than"), "supposed to" vs. "meant to" in corporate obligations, causal prepositions ("due to" vs. "owing to") in financial governance, hypothetical subjunctive manner clauses, and nuance calibration across grading and negative adverbs.',
  linguistNote:
    'At the C1-C2 threshold, subtle grammatical boundary cases separate competent English from authoritative professional register. Confusing "like" with "as" when specifying executive roles weakens statutory clarity, while failing to distinguish adjectival "due to" from adverbial "owing to" introduces grammatical imprecision into formal audit reports. Mastery of syntactic inversions and reciprocal pronoun distribution ensures airtight precision in contracts and executive correspondence.',
  activitiesCount: 10,
  cefrRange: 'C1–C2',
  isReady: true,
  activities: [
    {
      id: 'adv-i-1',
      activityNumber: 1,
      globalNumber: 81,
      title: "Distinguishing 'As' vs. 'Like' in Executive & Formal Register",
      skill: 'Writing',
      subskill: 'Usage Precision in Comparisons & Roles',
      cefrLevel: 'C1',
      objective:
        "Distinguish strictly between prepositional 'like' (similarity) and 'as' (role/function or conjunction) in corporate contexts.",
      instructions:
        "Correct or refine sentences using 'as' or 'like' according to formal British/International standards.",
      taskPrompt:
        "Prompt: '1. He worked like the interim CEO for six months. 2. Like I stated yesterday, revenues are rebounding.'",
      expectedAnswer:
        '1. He worked as the interim CEO for six months. (role)\n2. As I stated yesterday, revenues are rebounding. (conjunction introducing a clause)',
      targetCollocation: 'worked as interim CEO (role) / As I stated yesterday (conjunction)',
      difficulty: 'Advanced',
      activityType: 'Usage Distinction',
      justification:
        "'As' specifies actual role/function and serves as conjunction before a finite clause ('As I stated'), whereas 'like' denotes resemblance or similarity before noun phrases.",
      hint: "Use 'as' for someone's actual job role, and use 'as' (not 'like') to introduce a clause.",
      xpReward: 20,
    },
    {
      id: 'adv-i-2',
      activityNumber: 2,
      globalNumber: 82,
      title: "Differentiating 'All' vs. 'Every' vs. 'Whole' in Statistical Statements",
      skill: 'Writing',
      subskill: 'Determiner Precision in Quantitative Reports',
      cefrLevel: 'C1',
      objective:
        "Select and deploy 'all', 'every', or 'whole' correctly based on countable vs. uncountable noun structures and totalities.",
      instructions:
        'Complete sentences with the correct determiner based on subtle usage constraints.',
      taskPrompt:
        "Prompt: '1. _____ company in the conglomerate reported growth. 2. The _____ management board resigned after the audit.'",
      expectedAnswer:
        '1. Every company in the conglomerate reported growth.\n2. The whole management board resigned after the audit.',
      targetCollocation: 'Every company / The whole management board',
      difficulty: 'Advanced',
      activityType: 'Determiner Selection',
      justification:
        "'Every' modifies singular countable nouns individually, whereas 'whole' emphasizes complete undivided entities, typically preceded by 'the'.",
      hint: "Use 'Every' before singular countable nouns ('company'), and 'whole' after 'the' for an entire collective body.",
      xpReward: 20,
    },
    {
      id: 'adv-i-3',
      activityNumber: 3,
      globalNumber: 83,
      title: "Navigating Reciprocal Pronouns: 'Each Other' vs. 'One Another'",
      skill: 'Writing',
      subskill: 'Reciprocal Pronoun Usage in Multi-Party Contexts',
      cefrLevel: 'C1',
      objective:
        "Apply 'each other' (two entities) vs. 'one another' (three or more entities) in legal and corporate agreements.",
      instructions:
        'Edit a contractual clause to ensure precise reciprocal pronoun usage across multi-subsidiary partners.',
      taskPrompt:
        "Prompt: 'The two founding partners agreed to indemnify one another, while the five regional directors pledged to support each other.'",
      expectedAnswer:
        'The two founding partners agreed to indemnify each other, while the five regional directors pledged to support one another.',
      targetCollocation: 'indemnify each other (two) / support one another (three or more)',
      difficulty: 'Advanced',
      activityType: 'Reciprocal Pronoun Precision',
      justification:
        "Traditional high-register style strictly assigns 'each other' to dyads and 'one another' to groups of three or more parties.",
      hint: "Apply 'each other' for the two founding partners and 'one another' for the five regional directors.",
      xpReward: 20,
    },
    {
      id: 'adv-i-4',
      activityNumber: 4,
      globalNumber: 84,
      title: "Mastering Inverted Negative Adverbials: 'Hardly...When' vs. 'No Sooner...Than'",
      skill: 'Writing',
      subskill: 'Formal Clause Inversion & Time Conjunctions',
      cefrLevel: 'C2',
      objective:
        "Deploy 'hardly/scarcely...when' and 'no sooner...than' with correct inverted past perfect structures in high-level prose.",
      instructions:
        'Transform standard temporal sequences into dramatic, inverted formal statements.',
      taskPrompt:
        "Prompt: 'As soon as the merger was finalized, regulatory opposition emerged.'",
      expectedAnswer:
        'No sooner had the merger been finalized than regulatory opposition emerged. / Hardly had the merger been finalized when regulatory opposition emerged.',
      targetCollocation: 'No sooner had... than / Hardly had... when',
      difficulty: 'Mastery',
      activityType: 'Syntactic Inversion',
      justification:
        "Negative adverbial inversion requires fronting the negative particle ('No sooner' / 'Hardly'), followed immediately by auxiliary inversion ('had the merger been finalized') and correct correlatives ('than' / 'when').",
      hint: "Begin with 'No sooner had...' followed by 'than...', or 'Hardly had...' followed by 'when...'.",
      xpReward: 25,
    },
    {
      id: 'adv-i-5',
      activityNumber: 5,
      globalNumber: 85,
      title: "Deconstructing 'Supposed to' vs. 'Meant to' in Policy Expectations",
      skill: 'Speaking',
      subskill: 'Modal Idiom Nuance & Implicit Obligations',
      cefrLevel: 'C1',
      objective:
        "Express expected behavior, general reputation, or unfulfilled expectations using 'supposed to' and 'meant to'.",
      instructions:
        'Write and articulate two distinct statements showing (a) a scheduled rule and (b) an intended functional design.',
      taskPrompt:
        "Prompt: 'Draft sentences for (a) employee arrival times and (b) a software feature design goal.'",
      expectedAnswer:
        '1. Employees are supposed to log into the security portal by 08:30.\n2. This algorithm was meant to reduce processing latency by 40%.',
      targetCollocation: 'are supposed to log in / was meant to reduce latency',
      difficulty: 'Advanced',
      activityType: 'Modal Idiom Precision',
      justification:
        "'Supposed to' denotes standard rules, schedules, or expectations, while 'meant to' expresses intrinsic purpose, intention, or teleological design.",
      hint: "Use 'are supposed to' for protocol rules and 'was meant to' for the algorithm's functional purpose.",
      xpReward: 20,
    },
    {
      id: 'adv-i-6',
      activityNumber: 6,
      globalNumber: 86,
      title: "Disambiguating 'Used to' vs. 'Be/Get Used to' in Career Transitions",
      skill: 'Writing',
      subskill: 'Habitual Past vs. Acclimation Structure',
      cefrLevel: 'C1',
      objective:
        "Differentiate between bare infinitive 'used to' (past state/habit) and gerund-prepositional 'be/get used to' (acclimation).",
      instructions:
        'Draft a narrative paragraph on executive relocation using both structures accurately.',
      taskPrompt:
        'Draft an executive relocation reflection contrasting past habitual management with adapting to a global team.',
      expectedAnswer:
        'I used to manage a small localized team in London, but after moving to Tokyo, I had to get used to leading a multicultural remote workforce across four time zones.',
      targetCollocation: 'used to manage (past habit) / get used to leading (acclimation)',
      difficulty: 'Advanced',
      activityType: 'Structural Disambiguation',
      justification:
        "'Used to + infinitive' denotes discontinued past habits or states, whereas 'get used to + gerund (-ing)' denotes the process of psychological acclimation.",
      hint: "Pair 'used to manage' for your previous routine with 'get used to leading' for adapting to your new environment.",
      xpReward: 20,
    },
    {
      id: 'adv-i-7',
      activityNumber: 7,
      globalNumber: 87,
      title: "Causal Prepositions: 'Due to' vs. 'Owing to' in Financial Reporting",
      skill: 'Writing',
      subskill: 'Adjectival vs. Adverbial Causal Prepositions',
      cefrLevel: 'C2',
      objective:
        "Apply 'due to' (adjectival, modifying nouns after 'be') vs. 'owing to' (adverbial, modifying verbs/clauses) in formal finance.",
      instructions:
        "Audit and correct a CFO's report excerpt for precise causal preposition usage.",
      taskPrompt:
        "Prompt: 'Owing to the CEO's resignation, stock prices fell. The drop in profits was owing to supply disruptions.'",
      expectedAnswer:
        "Owing to the CEO's resignation, stock prices fell. (correct: adverbial modifier)\nThe drop in profits was due to supply disruptions. (correct: adjectival complement after 'was')",
      targetCollocation: 'Owing to (adverbial clause modifier) / was due to (predicative adjective complement)',
      difficulty: 'Mastery',
      activityType: 'Causal Preposition Audit',
      justification:
        "Traditional formal prescriptivism mandates 'owing to' as a sentence-initial adverbial preposition and 'due to' as an adjectival predicate following copular verbs like 'be'.",
      hint: "Keep 'Owing to' at the start modifying the clause, and change 'was owing to' to 'was due to' after the verb 'to be'.",
      xpReward: 25,
    },
    {
      id: 'adv-i-8',
      activityNumber: 8,
      globalNumber: 88,
      title: "Hypothetical Manner: 'As though' vs. 'As if' with Subjunctive Mood",
      skill: 'Writing',
      subskill: 'Counterfactual Manner Clauses',
      cefrLevel: 'C2',
      objective:
        "Use 'as though' and 'as if' with past subjunctive (were) or past perfect to express unreal counterfactual states.",
      instructions:
        "Construct a diplomatic observation analyzing a competitor's aggressive market stance.",
      taskPrompt:
        "Prompt: 'Describe a competitor acting with supreme confidence despite clear insolvency.'",
      expectedAnswer:
        'The competitor operates as though they were completely immune to liquidity constraints, spending aggressively despite severe debt obligations.',
      targetCollocation: 'operates as though they were completely immune',
      difficulty: 'Mastery',
      activityType: 'Subjunctive Manner Clauses',
      justification:
        "Subjunctive 'were' in an 'as though' manner clause signals counterfactual reality, conveying acute analytical skepticism.",
      hint: "Express unreal behavior using 'operates as though they were completely immune' followed by the debt reality.",
      xpReward: 25,
    },
    {
      id: 'adv-i-9',
      activityNumber: 9,
      globalNumber: 89,
      title: "Grading Modifiers: 'Fairly' vs. 'Quite' vs. 'Rather' vs. 'Pretty'",
      skill: 'Speaking',
      subskill: 'Degree Adverb Calibration Across Formal/Informal Register',
      cefrLevel: 'C1',
      objective:
        'Calibrate degree modifiers according to register, positive/negative adjectives, and British/American nuance.',
      instructions:
        "Rank four corporate evaluations from mildest praise to strong endorsement using 'fairly', 'quite', 'rather', and 'pretty'.",
      taskPrompt:
        "Prompt: 'Evaluate a strategic report's quality across four register levels.'",
      expectedAnswer:
        '1. Informal: It is pretty good.\n2. Mild formal: It is fairly thorough.\n3. Standard formal: It is quite impressive.\n4. Unexpected/strong: It is rather remarkable.',
      targetCollocation: 'pretty good / fairly thorough / quite impressive / rather remarkable',
      difficulty: 'Advanced',
      activityType: 'Degree Modifier Calibration',
      justification:
        "'Pretty' marks colloquial speech; 'fairly' denotes moderate sufficiency; 'quite' communicates standard formal endorsement; 'rather' expresses unexpected degree or elevated British formality.",
      hint: "Structure the scale from informal ('pretty good') to mild ('fairly thorough'), standard ('quite impressive'), and strong ('rather remarkable').",
      xpReward: 20,
    },
    {
      id: 'adv-i-10',
      activityNumber: 10,
      globalNumber: 90,
      title: "Negative Adverbial Nuances: 'Barely' vs. 'Scarcely' vs. 'Hardly'",
      skill: 'Writing',
      subskill: 'Degree & Time Limit Adverbials in Academic Prose',
      cefrLevel: 'C2',
      objective:
        "Distinguish subtle collocational and semantic boundaries between 'barely' (quantity/amount), 'scarcely' (time/expectation), and 'hardly' (degree/ability).",
      instructions:
        'Insert the most precise adverbial into three academic sentences.',
      taskPrompt:
        "Prompt: '1. There was _____ enough budget for research. 2. He had _____ entered the room when the alarms sounded. 3. I can _____ believe the thesis passed.'",
      expectedAnswer:
        '1. There was barely enough budget for research.\n2. He had scarcely entered the room when the alarms sounded.\n3. I can hardly believe the thesis passed.',
      targetCollocation: 'barely enough / scarcely entered / hardly believe',
      difficulty: 'Mastery',
      activityType: 'Negative Adverbial Selection',
      justification:
        "'Barely' pairs with quantities and thresholds ('barely enough'), 'scarcely' functions temporally and emphatically before 'when', and 'hardly' modifies cognitive verbs of ability ('hardly believe').",
      hint: "1. 'barely enough' (scant quantity), 2. 'scarcely entered' (temporal threshold), 3. 'hardly believe' (cognitive ability).",
      xpReward: 25,
    },
  ],
};
