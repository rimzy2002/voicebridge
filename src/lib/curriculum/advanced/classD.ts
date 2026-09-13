// ============================================================
// Adv Class D — Module 1: Contrastive Tense Dynamics & Aspect Shifts
// The Azar-Hagen Master Framework (Activities 1–10)
// ============================================================

import { AdvancedClass } from './types';

export const advClassD: AdvancedClass = {
  id: 'adv-class-d',
  letter: 'D',
  moduleNumber: 4,
  name: 'Adv Class D',
  title: 'Contrastive Tense Dynamics & Aspect Shifts',
  theme: 'The Azar-Hagen Framework: Narrative Temporal Layering',
  overview:
    'Grounded in the authoritative Azar-Hagen grammar framework, this master class teaches advanced C1-C2 aspect shifts: contrasting simple past and past progressive for market crisis retrospectives, habitual annoyance with progressive "always", "future in the past" for subverted geopolitical strategies, evidence-based economic forecasting with "be going to", and precise chronological sequencing with past perfective logic.',
  linguistNote:
    'In executive reporting and high-level negotiation, aspectual choices communicate precise psychological and temporal stances. Shifting from static simple present ("innovates") to dynamic progressive ("are auditing") establishes permanent corporate identity while contextualizing temporary initiatives. Similarly, contrasting "thinking about" (ongoing mental processing) with "think that" (settled cognitive judgment) provides diplomatic nuance in board deliberations.',
  activitiesCount: 10,
  cefrRange: 'C1–C2',
  isReady: true,
  activities: [
    {
      id: 'adv-d-1',
      activityNumber: 1,
      globalNumber: 31,
      title: 'The Volatility of Market Trends: A Retrospective Analysis',
      skill: 'Writing',
      subskill: 'Contrastive Simple Past vs. Past Progressive (Ch. 8, 9)',
      cefrLevel: 'C1',
      objective:
        'To utilize past aspect shifts to distinguish between background market conditions and specific disruptive events.',
      instructions:
        'Draft a retrospective analysis of a historical economic downturn. Use the Past Progressive for the ongoing macro environment and the Simple Past for the disruptive catalyst.',
      taskPrompt:
        'Analyze the 2008 financial crisis. Contrast the "prevailing lending conditions" with the "sudden liquidity collapse."',
      expectedAnswer:
        'While global markets were expanding at an unsustainable rate, the sudden collapse of Lehman Brothers triggered a systemic freeze.',
      targetCollocation: 'were expanding (background) / triggered (catalyst)',
      difficulty: 'Advanced',
      activityType: 'Case Study',
      justification:
        'Past progressive ("were expanding") establishes the continuous macroeconomic backdrop, while simple past ("triggered") captures the precise, point-in-time disruptive event.',
      hint: 'Begin with "While global markets were expanding..." followed by the sudden catalyst using simple past "triggered".',
      xpReward: 20,
    },
    {
      id: 'adv-d-2',
      activityNumber: 2,
      globalNumber: 32,
      title: 'Expressing Corporate Friction: The Annoying Habit Aspect',
      skill: 'Writing',
      subskill: 'Present Progressive with "always" for Habitual Annoyance (Ch. 3-2)',
      cefrLevel: 'C1',
      objective: 'To articulate workplace grievances with grammatical nuance and professional distancing.',
      instructions:
        'Describe a recurring problematic behavior of a competitor using the progressive aspect with "always" to convey professional irritation.',
      taskPrompt: 'Describe a rival firm’s tendency to ignore patent laws.',
      expectedAnswer:
        'The rival firm is always encroaching on intellectual property rights without regard for international compliance.',
      targetCollocation: 'is always encroaching',
      difficulty: 'Advanced',
      activityType: 'Register Shift',
      justification:
        'Using present progressive with frequency adverbs like "always" moves beyond factual frequency to register critical executive exasperation and ongoing friction.',
      hint: 'Use the progressive aspect: "The rival firm is always encroaching on..."',
      xpReward: 20,
    },
    {
      id: 'adv-d-3',
      activityNumber: 3,
      globalNumber: 33,
      title: 'Narrative Tension: The "Future in the Past" Strategy',
      skill: 'Writing',
      subskill: 'Using "was going to" for Unrealized Intentions (Ch. 10)',
      cefrLevel: 'C2',
      objective:
        'To construct a complex narrative timeline where planned outcomes were subverted.',
      instructions:
        'Write a summary of a failed diplomatic mission. Use "was going to" to frame the intended outcome versus the subverting reality.',
      taskPrompt:
        'Scenario: A peace treaty that was never signed due to a last-minute coup.',
      expectedAnswer:
        'The delegation was going to sign the accord, but the sudden insurgence rendered the document obsolete.',
      targetCollocation: 'was going to sign / rendered obsolete',
      difficulty: 'Mastery',
      activityType: 'Strategic Negotiation',
      justification:
        '"Was going to" (future-in-the-past) establishes an intended prospective action from a past vantage point that was subsequently thwarted by unforeseen intervention.',
      hint: 'Open with "The delegation was going to sign the accord, but..."',
      xpReward: 25,
    },
    {
      id: 'adv-d-4',
      activityNumber: 4,
      globalNumber: 34,
      title: 'Habitual Professionalism: Static vs. Dynamic Present',
      skill: 'Writing',
      subskill: 'Simple Present vs. Present Progressive for Temporary Projects (Ch. 4-5)',
      cefrLevel: 'C1',
      objective:
        'To distinguish between core company values and current temporary initiatives.',
      instructions:
        'Write a corporate bio. Use Simple Present for the mission statement and Present Progressive for a current six-month audit.',
      taskPrompt:
        'Write for a tech firm specializing in AI but currently auditing its ethical standards.',
      expectedAnswer:
        'Our firm innovates solutions; currently, we are auditing our internal protocols.',
      targetCollocation: 'innovates (static) / are auditing (dynamic temporary)',
      difficulty: 'Advanced',
      activityType: 'Professional Branding',
      justification:
        'Simple present ("innovates") frames institutional core capability as permanent, while progressive ("are auditing") marks current quality-control measures as temporary and rigorous.',
      hint: 'Contrast what your firm does permanently ("innovates solutions") with the current initiative ("currently, we are auditing...").',
      xpReward: 20,
    },
    {
      id: 'adv-d-5',
      activityNumber: 5,
      globalNumber: 35,
      title: 'The Historical "When" and "While": Synchronicity in Geopolitics',
      skill: 'Writing',
      subskill: 'Complex Time Clauses with "when" and "while" (Ch. 9-11)',
      cefrLevel: 'C2',
      objective: 'To synchronize multiple historical threads in a formal essay.',
      instructions:
        'Describe two simultaneous events in the 20th century using "while" for duration and "when" for point-in-time impact.',
      taskPrompt: 'Topic: The Space Race during the Cold War.',
      expectedAnswer:
        'While the US was developing the Apollo program, a pivotal shift occurred when the USSR launched Sputnik.',
      targetCollocation: 'While ... was developing / occurred when ... launched',
      difficulty: 'Mastery',
      activityType: 'Historical Analysis',
      justification:
        '"While" anchors an extended technological timeline, while "when" introduces a discrete punctually disruptive geopolitical milestone.',
      hint: 'Structure: "While the US was developing..., a pivotal shift occurred when the USSR launched..."',
      xpReward: 25,
    },
    {
      id: 'adv-d-6',
      activityNumber: 6,
      globalNumber: 36,
      title: 'Predictative Certainty: "Will" vs. "Be Going To" in Forecasting',
      skill: 'Writing',
      subskill: 'Evidence-Based Prediction vs. Volitional Promise (Ch. 10-1, 10-6)',
      cefrLevel: 'C1',
      objective: 'To issue a formal economic forecast using evidence-based grammatical structures.',
      instructions:
        'Draft a forecast based on current data. Use "be going to" for conclusions based on present evidence.',
      taskPrompt: 'Data shows inflation is rising. Forecast the central bank\'s next move.',
      expectedAnswer:
        'Given the current CPI data, the Fed is going to raise interest rates in the next quarter.',
      targetCollocation: 'is going to raise (present evidence deduction)',
      difficulty: 'Advanced',
      activityType: 'Statistical Evaluation',
      justification:
        'In macroeconomic analysis, "is going to" signals an inevitable trajectory supported by existing empirical indicators, whereas "will" denotes spontaneous projection or policy resolve.',
      hint: 'Reference the CPI data and predict using "is going to raise".',
      xpReward: 20,
    },
    {
      id: 'adv-d-7',
      activityNumber: 7,
      globalNumber: 37,
      title: 'The Habitual Past: Professional Evolution',
      skill: 'Speaking',
      subskill: 'Simple Past for Finished States vs. Habitual Past (Ch. 8-5)',
      cefrLevel: 'C1',
      objective: 'To describe the evolution of industry standards.',
      instructions:
        'Compare how business was conducted twenty years ago with today, using specific past time markers.',
      taskPrompt: 'Compare correspondence before and after the ubiquity of email.',
      expectedAnswer:
        'In the 1980s, managers sent physical memos, whereas they now rely on instant communication.',
      targetCollocation: 'In the 1980s, managers sent ... whereas they now rely',
      difficulty: 'Advanced',
      activityType: 'Register Shift',
      justification:
        'Past simple coupled with historical era markers ("in the 1980s") contrasts cleanly with present habitual routines ("now rely") using contrastive coordinators like "whereas".',
      hint: 'Contrast the 1980s past simple practice with modern communication using "whereas".',
      xpReward: 20,
    },
    {
      id: 'adv-d-8',
      activityNumber: 8,
      globalNumber: 38,
      title: 'Sequence of Disruptions: Past Perfective Logic',
      skill: 'Writing',
      subskill: 'Ordering Past Events Using "before" and "after" Clauses (Ch. 9-7)',
      cefrLevel: 'C2',
      objective: 'To clarify a complex chain of causation in a technical report.',
      instructions:
        'Explain a series of events leading to a system failure. Ensure the order of events is grammatically explicit.',
      taskPrompt: 'Scenario: A power plant failure triggered by a sensor malfunction.',
      expectedAnswer:
        'The sensor failed shortly after the cooling system had engaged, leading to a total shutdown.',
      targetCollocation: 'failed shortly after ... had engaged',
      difficulty: 'Mastery',
      activityType: 'Technical Reportage',
      justification:
        'Deploying the past perfect ("had engaged") establishes strict chronological anteriority over the primary failure event ("failed"), resolving causal ambiguity in engineering root-cause analyses.',
      hint: 'Use simple past for the sensor failure and past perfect for the cooling system engagement.',
      xpReward: 25,
    },
    {
      id: 'adv-d-9',
      activityNumber: 9,
      globalNumber: 39,
      title: 'Hypothetical Project Management',
      skill: 'Writing',
      subskill: 'If-Clauses with Future Implications (Ch. 11-4)',
      cefrLevel: 'C1',
      objective: 'To outline conditional project milestones.',
      instructions:
        'Create a contingency plan for a software launch using "if" and "when" clauses with present/future tense shifts.',
      taskPrompt: 'Define reactions to beta test results.',
      expectedAnswer:
        'If the beta test fails, we will delay the launch; when it succeeds, we will proceed.',
      targetCollocation: 'If ... fails, will delay; when ... succeeds, will proceed',
      difficulty: 'Advanced',
      activityType: 'Operational Directives',
      justification:
        '"If" denotes probabilistic risk contingency ("fails"), while "when" asserts confident certainty regarding eventual milestone achievement ("succeeds").',
      hint: 'Contrast uncertain failure ("If... fails, we will delay") with certain eventual success ("when it succeeds, we will proceed").',
      xpReward: 20,
    },
    {
      id: 'adv-d-10',
      activityNumber: 10,
      globalNumber: 40,
      title: 'The "Think About" vs. "Think That" Intellectual Distinction',
      skill: 'Speaking',
      subskill: 'Mental State Verbs vs. Opinion Markers (Ch. 4-8)',
      cefrLevel: 'C2',
      objective: 'To separate the process of deliberation from the finality of an opinion.',
      instructions:
        'In a board meeting simulation, express that you are currently considering an idea but hold a firm belief on its feasibility.',
      taskPrompt: 'Respond to a merger proposal.',
      expectedAnswer:
        'I am thinking about the merger proposal, but I think that the valuation is too high.',
      targetCollocation: 'am thinking about (deliberation) vs. think that (judgment)',
      difficulty: 'Mastery',
      activityType: 'Strategic Negotiation',
      justification:
        '"Am thinking about" articulates ongoing open-minded analysis, while "think that" introduces a definitive evaluative stance, striking the perfect executive balance between receptivity and discernment.',
      hint: 'Speak both clauses: first active deliberation ("I am thinking about..."), then your firm opinion ("but I think that...").',
      xpReward: 25,
    },
  ],
};
