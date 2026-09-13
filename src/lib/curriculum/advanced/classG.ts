// ============================================================
// Adv Class G — Module 1: Present & Past Aspectual Choice
// Grounded in Raymond Murphy's English Grammar in Use (Activities 1–10)
// ============================================================

import { AdvancedClass } from './types';

export const advClassG: AdvancedClass = {
  id: 'adv-class-g',
  letter: 'G',
  moduleNumber: 7,
  name: 'Adv Class G',
  title: 'Present & Past Aspectual Choice',
  theme: 'Murphy Master Grammar: Executive Aspectual Contrast & Temporal Rigor',
  overview:
    'Grounded in Raymond Murphy’s English Grammar in Use framework, this master class drills advanced C1-C2 aspectual choices: distinguishing permanent corporate principles from temporary quarterly sprints, harnessing stative verb shifts for delicate board negotiations ("is considering", "are weighing"), contrasting fiscal research duration (Present Perfect Continuous) against capital milestones (Present Perfect Simple), establishing background context in incident reports, and calibrating diplomatic criticism using habitual continuous forms.',
  linguistNote:
    'Aspectual accuracy in executive English communicates operational reality with precision. Using simple present ("develops and distributes") establishes permanent institutional architecture, whereas present continuous ("are spearheading") designates temporary project initiatives. In performance management, employing continuous aspect with frequency markers ("is continually submitting") converts raw personal friction into objective, actionable procedural critique.',
  activitiesCount: 10,
  cefrRange: 'C1–C2',
  isReady: true,
  activities: [
    {
      id: 'adv-g-1',
      activityNumber: 1,
      globalNumber: 61,
      title: 'Contrasting Present Simple and Continuous in Executive Statements',
      skill: 'Writing',
      subskill: 'Aspectual Contrast in Corporate Updates',
      cefrLevel: 'C1',
      objective:
        'Distinguish between permanent corporate stances (simple) and temporary strategic initiatives (continuous).',
      instructions:
        'Rephrase the sentence pair to reflect a permanent corporate principle versus a temporary quarterly campaign.',
      taskPrompt: "Prompt: 'We sell software globally / We promote our new AI module this month.'",
      expectedAnswer:
        'While our enterprise primarily develops and distributes global software solutions, we are currently spearheading a targeted promotional campaign for our newly launched AI module this quarter.',
      targetCollocation: 'develops and distributes (simple) vs. are spearheading (continuous)',
      difficulty: 'Advanced',
      activityType: 'Aspectual Contrast',
      justification:
        'Simple present ("develops and distributes") communicates enduring commercial mission, while present continuous ("are spearheading") isolates a bounded quarterly initiative.',
      hint: 'Contrast your core permanent business in the simple present with your temporary campaign in the present continuous.',
      xpReward: 20,
    },
    {
      id: 'adv-g-2',
      activityNumber: 2,
      globalNumber: 62,
      title: 'Continuous State Verb Semantic Shifts in Formal Debates',
      skill: 'Writing',
      subskill: 'Stative vs. Dynamic Verb Meaning Shifts',
      cefrLevel: 'C1',
      objective:
        'Deploy continuous forms of stative verbs (e.g., consider, feel, mind, weigh) to signal ongoing deliberation.',
      instructions:
        "Draft a statement using 'is considering' and 'are weighing' to reflect active board negotiations.",
      taskPrompt: 'Frame a corporate merger negotiation using continuous stative verbs.',
      expectedAnswer:
        'The board is currently considering three acquisition offers and is carefully weighing the regulatory compliance risks associated with each proposal.',
      targetCollocation: 'is currently considering / are carefully weighing',
      difficulty: 'Advanced',
      activityType: 'Stative Verb Nuance',
      justification:
        'Using continuous forms for mental state verbs ("considering", "weighing") grammatically indicates active cognitive process rather than settled evaluation.',
      hint: 'Use "is currently considering" and "is carefully weighing" to denote active executive deliberation.',
      xpReward: 20,
    },
    {
      id: 'adv-g-3',
      activityNumber: 3,
      globalNumber: 63,
      title: 'Present Perfect Continuous vs. Simple in Quarterly Financial Reviews',
      skill: 'Writing',
      subskill: 'Duration vs. Completion Reporting',
      cefrLevel: 'C1',
      objective:
        'Differentiate ongoing processes (Present Perfect Continuous) from completed fiscal achievements (Present Perfect Simple).',
      instructions:
        'Write a 2-sentence financial summary contrasting ongoing R&D expenditures with completed capital raises.',
      taskPrompt: 'Prompt: R&D spending ongoing for 3 years vs. $50M raised last week.',
      expectedAnswer:
        'Our engineering department has been expanding its green tech research for three years. Consequently, the executive team has successfully secured $50 million in Series C equity funding.',
      targetCollocation: 'has been expanding (duration) vs. has secured (completion)',
      difficulty: 'Advanced',
      activityType: 'Fiscal Progress Reporting',
      justification:
        'Present perfect continuous ("has been expanding") emphasizes temporal duration and ongoing investment, while present perfect simple ("has secured") foregrounds discrete milestone attainment.',
      hint: 'Use present perfect continuous for the 3-year ongoing research and present perfect simple for the completed $50M raise.',
      xpReward: 20,
    },
    {
      id: 'adv-g-4',
      activityNumber: 4,
      globalNumber: 64,
      title: 'Past Continuous vs. Past Simple in Incident Investigation Reports',
      skill: 'Writing',
      subskill: 'Background Action vs. Interrupting Event',
      cefrLevel: 'C1',
      objective:
        'Use Past Continuous to establish operational context and Past Simple for critical system disruptions.',
      instructions:
        'Synthesize two statements into a cohesive incident report sentence establishing background context and event trigger.',
      taskPrompt: 'Prompt: System backup running at midnight / Cyber attack breached firewall at 00:14.',
      expectedAnswer:
        'While the IT infrastructure was executing its routine midnight database backup, an external cyber attack breached the primary firewall at 00:14.',
      targetCollocation: 'was executing (background) / breached (interrupting disruption)',
      difficulty: 'Advanced',
      activityType: 'Incident Analysis',
      justification:
        'The past continuous clause ("was executing...") sets the baseline operational state, while the past simple ("breached") marks the punctually disruptive security anomaly.',
      hint: 'Open with "While the IT infrastructure was executing...", followed by the disruption with simple past "breached".',
      xpReward: 20,
    },
    {
      id: 'adv-g-5',
      activityNumber: 5,
      globalNumber: 65,
      title: 'Habitual Past: Used to vs. Would in Historical Economic Analysis',
      skill: 'Writing',
      subskill: 'Distinguishing Past States from Repeated Past Actions',
      cefrLevel: 'C1',
      objective:
        'Utilize "used to" for past economic states and "would" for repeated historical market behaviors.',
      instructions:
        'Construct a historical comparison of 19th-century central banking practices.',
      taskPrompt:
        'Prompt: Bank of England held vast gold reserves (state) / Intervention in gold markets during panics (repeated action).',
      expectedAnswer:
        'The central bank used to maintain immense physical gold reserves; during monetary panics, governors would routinely adjust discount rates to stabilize liquidity.',
      targetCollocation: 'used to maintain (stative) vs. would routinely adjust (habitual action)',
      difficulty: 'Advanced',
      activityType: 'Historical Contrast',
      justification:
        '"Used to" is grammatically required for past stative conditions ("maintain reserves"), whereas "would" expresses repeated rule-governed historical behaviors ("would adjust").',
      hint: 'Use "used to maintain" for the permanent state, and "would routinely adjust" for the repeated panic response.',
      xpReward: 20,
    },
    {
      id: 'adv-g-6',
      activityNumber: 6,
      globalNumber: 66,
      title: 'Past Perfect Simple vs. Continuous in Forensic Accounting',
      skill: 'Writing',
      subskill: 'Prior Duration vs. Prior Completion',
      cefrLevel: 'C2',
      objective:
        'Deploy Past Perfect Continuous to highlight cumulative operational duration before a historic audit.',
      instructions:
        'Audit summary: Company laundered funds for five years before regulators intervened.',
      taskPrompt: 'Explain the duration of illicit activity prior to regulatory discovery.',
      expectedAnswer:
        'The subsidiary had been systematically inflating revenue figures for five years before national securities regulators initiated a formal forensic audit.',
      targetCollocation: 'had been systematically inflating (prior cumulative duration)',
      difficulty: 'Mastery',
      activityType: 'Forensic Narrative',
      justification:
        'The past perfect continuous ("had been systematically inflating") places temporal emphasis on the uninterrupted, ongoing deception leading up to the regulatory audit milestone.',
      hint: 'Deploy the past perfect continuous ("had been systematically inflating...") before the simple past audit trigger.',
      xpReward: 25,
    },
    {
      id: 'adv-g-7',
      activityNumber: 7,
      globalNumber: 67,
      title: 'Unfulfilled Past Intentions: Was/Were Going To',
      skill: 'Writing',
      subskill: 'Expressing Altered Corporate Plans',
      cefrLevel: 'C1',
      objective:
        'Use "was/were going to" to articulate planned corporate strategies that were superseded by market conditions.',
      instructions: 'Explain why an initial public offering (IPO) was postponed.',
      taskPrompt: 'Prompt: Company planned Q3 IPO / Market volatility forced delay.',
      expectedAnswer:
        'The executive committee was going to launch the initial public offering in Q3, but sudden macroeconomic volatility forced a strategic deferral until Q1.',
      targetCollocation: 'was going to launch / forced a strategic deferral',
      difficulty: 'Advanced',
      activityType: 'Strategic Recalibration',
      justification:
        '"Was going to" frames an institutional intention that was officially scheduled but subsequently aborted or delayed by external factors.',
      hint: 'Express the postponed intention using "was going to launch" followed by "but... forced a strategic deferral".',
      xpReward: 20,
    },
    {
      id: 'adv-g-8',
      activityNumber: 8,
      globalNumber: 68,
      title: "Present Perfect with 'It's the first time...'",
      skill: 'Speaking',
      subskill: 'Expressing Novel Institutional Milestones',
      cefrLevel: 'C1',
      objective:
        "Structure high-level announcements using 'It is/was the first time' followed by Present/Past Perfect clauses.",
      instructions: 'Announce a major corporate environmental breakthrough.',
      taskPrompt: 'Prompt: First time operating with 100% renewable energy.',
      expectedAnswer:
        'This marks the first time that our manufacturing facility has operated entirely on localized solar and wind energy.',
      targetCollocation: 'This marks the first time that ... has operated',
      difficulty: 'Advanced',
      activityType: 'Milestone Framing',
      justification:
        'Experiential first-instance formulas ("This marks the first time...") require present perfect aspect ("has operated") to tie novel milestone achievement to the ongoing present.',
      hint: 'Speak the announcement opening with "This marks the first time that our facility has operated entirely on..."',
      xpReward: 20,
    },
    {
      id: 'adv-g-9',
      activityNumber: 9,
      globalNumber: 69,
      title: "Continuous Aspect for Irritation or Habit: 'Always + -ing'",
      skill: 'Writing',
      subskill: 'Nuanced Criticism in Peer Evaluations',
      cefrLevel: 'C2',
      objective:
        "Deploy 'always/continually + Present Continuous' to express controlled professional criticism or systemic friction.",
      instructions:
        'Write a constructive performance critique regarding project deadline management.',
      taskPrompt: 'Prompt: Critique a lead developer who repeatedly submits code without peer review.',
      expectedAnswer:
        'The lead developer is continually submitting code commits without preliminary peer reviews, creating severe integration bottlenecks for the QA team.',
      targetCollocation: 'is continually submitting / creating severe bottlenecks',
      difficulty: 'Mastery',
      activityType: 'Diplomatic Critique',
      justification:
        'The continuous aspect with frequency modifiers like "continually" signals that the behavior exceeds normal expectations and constitutes a persistent procedural bottleneck.',
      hint: 'Use present continuous with "continually": "The lead developer is continually submitting code commits without..."',
      xpReward: 25,
    },
    {
      id: 'adv-g-10',
      activityNumber: 10,
      globalNumber: 70,
      title: 'Present Perfect vs. Past Simple in Biographical Keynotes',
      skill: 'Speaking',
      subskill: 'Distinguishing Lifetime Achievements from Finished Eras',
      cefrLevel: 'C1',
      objective:
        'Combine Past Simple (historical milestones) and Present Perfect (ongoing impact) in an executive introduction.',
      instructions:
        'Draft an introductory keynote speech snippet for an industry pioneer.',
      taskPrompt: 'Prompt: Founded tech firm in 1998 (past) / Revolutionized global logistics (ongoing impact).',
      expectedAnswer:
        'Dr. Aris Thorne founded his logistics enterprise in 1998; over the past quarter-century, his innovations have fundamentally transformed global supply chain management.',
      targetCollocation: 'founded (past milestone) / have fundamentally transformed (present perfect impact)',
      difficulty: 'Advanced',
      activityType: 'Keynote Address',
      justification:
        'Past simple ("founded") pinpoints historical establishment at a completed point in time, while present perfect ("have fundamentally transformed") connects historical origin to current industry dominance.',
      hint: 'Begin with past simple for the 1998 founding, then transition to present perfect for the transformative quarter-century impact.',
      xpReward: 20,
    },
  ],
};
