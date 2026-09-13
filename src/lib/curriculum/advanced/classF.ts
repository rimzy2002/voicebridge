// ============================================================
// Adv Class F — Module 1: Essay Architecture, Outlining & Thesis Statements
// Grounded in Longman Academic Writing Series 4 & How English Works (Activities 1–10)
// ============================================================

import { AdvancedClass } from './types';

export const advClassF: AdvancedClass = {
  id: 'adv-class-f',
  letter: 'F',
  moduleNumber: 6,
  name: 'Adv Class F',
  title: 'Essay Architecture, Outlining & Thesis Statements',
  theme: 'Longman Academic Writing: Structural Hierarchy & Thesis Precision',
  overview:
    'Grounded in Longman Academic Writing Series 4 (Oshima & Hogue) and How English Works (Swan & Walter), this class trains advanced academic essay construction: formulating multi-pronged thesis statements with explicit subtopics, mapping 4-part hierarchical outlines, transforming casual questions into colon-separated scholarly titles, constructing 4-sentence funnel introductions, designing point-by-point comparative matrices, auditing paragraph unity, and framing evaluative syntheses.',
  linguistNote:
    'A high-scoring C1-C2 thesis statement is neither an uncontested truism nor an overly broad assertion; it requires a precise controlling idea coupled with explicit, grammatically parallel subtopics. Adopting the funnel pattern (broad hook → narrowing contextual bridge → definitive thesis) anchors scholarly orientation, while point-by-point matrices ensure balanced analytical symmetry across complex comparative essays.',
  activitiesCount: 10,
  cefrRange: 'C1–C2',
  isReady: true,
  activities: [
    {
      id: 'adv-f-1',
      activityNumber: 1,
      globalNumber: 51,
      title: 'Evaluating Thesis Statement Precision in Policy Briefs',
      skill: 'Writing',
      subskill: 'Thesis Formulation & Constraint Framing',
      cefrLevel: 'C1',
      objective:
        'Formulate a precise, multi-pronged thesis statement containing a clear topic, controlling idea, and explicit subtopics.',
      instructions:
        'Draft a single-sentence thesis statement responding to the policy prompt regarding mandatory net-zero building codes.',
      taskPrompt: "Should national governments mandate net-zero carbon building codes by 2030?",
      expectedAnswer:
        'National governments must mandate net-zero carbon building codes by 2030 because such policies accelerate technological innovation, significantly decrease urban grid reliance, and mitigate long-term municipal climate vulnerabilities.',
      targetCollocation: 'Topic + Controlling Idea + Parallel Subtopics',
      difficulty: 'Advanced',
      activityType: 'Thesis Statement Writing',
      justification:
        'A complete academic thesis pairs a normative stance ("must mandate...") with three parallel causal subtopics ("accelerate...", "decrease...", "mitigate..."), establishing an unambiguous blueprint for the ensuing essay.',
      hint: 'Include the topic (net-zero codes by 2030), your stance, and three parallel reasons linked by "because".',
      xpReward: 20,
    },
    {
      id: 'adv-f-2',
      activityNumber: 2,
      globalNumber: 52,
      title: 'Deconstructing Essay Outlines for Logical Alignment',
      skill: 'Writing',
      subskill: 'Structural Hierarchy & Topic Sentence Mapping',
      cefrLevel: 'C1',
      objective: 'Align main topic sentences with sub-points in a formal 4-part essay outline.',
      instructions:
        'Map three supporting topic sentences directly corresponding to the three sub-clauses of the provided thesis statement.',
      taskPrompt:
        "Thesis: 'Hybrid workplace models enhance organizational productivity by improving employee retention, reducing real estate overhead, and broadening global talent acquisition.'",
      expectedAnswer:
        '1. Topic Sentence 1: Flexible work schedules directly boost employee retention by reducing burnout.\n2. Topic Sentence 2: Transitioning to hybrid frameworks minimizes corporate expenditures on commercial real estate.\n3. Topic Sentence 3: Geographic independence allows organizations to recruit specialized talent from international pools.',
      targetCollocation: 'Topic Sentences 1, 2, and 3 Alignment',
      difficulty: 'Advanced',
      activityType: 'Outline Construction',
      justification:
        'Each topic sentence must directly inherit and elaborate one specific sub-clause from the thesis in the exact order presented, ensuring strict structural coherence.',
      hint: 'Write 3 distinct topic sentences addressing retention, real estate overhead, and global talent recruitment.',
      xpReward: 20,
    },
    {
      id: 'adv-f-3',
      activityNumber: 3,
      globalNumber: 53,
      title: 'Converting Informal Prompts into Academic Essay Titles',
      skill: 'Writing',
      subskill: 'Academic Register & Essay Scope Definition',
      cefrLevel: 'C2',
      objective:
        'Transform casual essay questions into formal, academic titles with colon-separated subtitles.',
      instructions: "Rephrase the colloquial question into an elevated, colon-separated academic paper title.",
      taskPrompt: "Why are social media apps making young people feel lonely?",
      expectedAnswer:
        'The Illusion of Connectivity: A Critical Analysis of Social Networking Platforms and Adolescent Isolation.',
      targetCollocation: 'Catchy Concept Phrase : Scholarly Method & Boundary Subtitle',
      difficulty: 'Mastery',
      activityType: 'Title Formulation',
      justification:
        'Scholarly title conventions employ a thematic metaphor or concept before the colon ("The Illusion of Connectivity") followed by a methodological scope definition ("A Critical Analysis of...").',
      hint: 'Use the two-part title format: [Thematic Concept]: [Scholarly Scope and Specific Variables].',
      xpReward: 25,
    },
    {
      id: 'adv-f-4',
      activityNumber: 4,
      globalNumber: 54,
      title: 'Identifying Thesis Statement Weaknesses & Scope Errors',
      skill: 'Writing',
      subskill: 'Thesis Evaluation & Error Diagnosis',
      cefrLevel: 'C1',
      objective:
        'Identify structural deficiencies in candidate thesis statements (too broad, too narrow, or pure fact) and revise them.',
      instructions:
        'Diagnose the defect in the statement and write an academically sound, multi-dimensional revision.',
      taskPrompt: "Critique and rewrite: 'Artificial intelligence is very popular and changing many industries today.'",
      expectedAnswer:
        'Deficiency: Too broad and purely descriptive.\nRevision: The integration of predictive artificial intelligence in healthcare diagnostics streamlines patient triage, yet it introduces significant ethical risks regarding algorithm bias and patient privacy.',
      targetCollocation: 'Diagnostic Evaluation + Nuanced Healthcare Revision',
      difficulty: 'Advanced',
      activityType: 'Diagnostic Editing',
      justification:
        'Broad generalizations lack argumentability; a viable thesis narrows the application to a specific field (healthcare) and introduces tension between benefits (triage efficiency) and caveats (ethical bias).',
      hint: 'Identify the flaw (too broad/descriptive) and narrow the claim to specific benefits and ethical risks in a defined sector.',
      xpReward: 20,
    },
    {
      id: 'adv-f-5',
      activityNumber: 5,
      globalNumber: 55,
      title: 'Formulating Funnel Introductions for Academic Essays',
      skill: 'Writing',
      subskill: 'Introductory Paragraph Development',
      cefrLevel: 'C1',
      objective:
        'Construct a 4-sentence introductory paragraph following the funnel pattern: broad hook, narrowing context, specific thesis.',
      instructions:
        'Draft a 4-sentence introduction on urban congestion pricing moving from global traffic challenges to municipal pricing benefits.',
      taskPrompt: 'Write an introductory paragraph on urban congestion pricing following the funnel model.',
      expectedAnswer:
        'Metropolitan centers worldwide face unprecedented traffic gridlock, resulting in economic stagnation and elevated emissions. While traditional highway expansion projects yield diminishing returns, municipal authorities are increasingly considering economic interventions. Congestion pricing mechanisms offer a market-based solution by levying fees on vehicles entering commercial zones during peak hours. Ultimately, implementing urban congestion pricing reduces traffic volume, generates dedicated transit funding, and improves municipal air quality.',
      targetCollocation: 'Broad Hook → Narrowing Problem → Policy Mechanism → Multi-Pronged Thesis',
      difficulty: 'Advanced',
      activityType: 'Paragraph Writing',
      justification:
        'The funnel pattern progressively funnels the reader’s focus from universal macroeconomic gridlock down to the specific mechanics and tripartite benefits of congestion charging.',
      hint: 'Progress through 4 sentences: 1. Global gridlock hook, 2. Limitation of highway expansion, 3. Congestion pricing mechanism, 4. Definitive thesis.',
      xpReward: 20,
    },
    {
      id: 'adv-f-6',
      activityNumber: 6,
      globalNumber: 56,
      title: 'Designing Block vs. Point-by-Point Outlines',
      skill: 'Writing',
      subskill: 'Comparative Essay Structure Planning',
      cefrLevel: 'C2',
      objective:
        'Differentiate between block and point-by-point comparative essay outlines for complex macro-economic topics.',
      instructions:
        'Create a point-by-point outline structure comparing central bank digital currencies (CBDCs) and traditional fiat currency across three specific criteria.',
      taskPrompt:
        'Compare CBDCs and traditional fiat currency across Transaction Speed, Monetary Policy Control, and Privacy.',
      expectedAnswer:
        'Criteria 1: Transaction Speed (A. CBDC instant settlement vs. B. Fiat clearinghouse delays).\nCriteria 2: Monetary Policy Control (A. CBDC direct rate transmission vs. B. Fiat commercial bank intermediation).\nCriteria 3: Privacy (A. CBDC ledger visibility vs. B. Fiat cash anonymity).',
      targetCollocation: 'Criteria 1: Speed / Criteria 2: Monetary Policy / Criteria 3: Privacy',
      difficulty: 'Mastery',
      activityType: 'Comparative Planning',
      justification:
        'Point-by-point organization juxtaposes both subjects under identical analytical criteria consecutively, avoiding the cognitive drift common in block outlines.',
      hint: 'Structure exactly 3 criteria (Speed, Monetary Control, Privacy) with direct A vs. B sub-comparisons under each.',
      xpReward: 25,
    },
    {
      id: 'adv-f-7',
      activityNumber: 7,
      globalNumber: 57,
      title: 'Structuring Conclusion Paragraphs with Synthesis',
      skill: 'Writing',
      subskill: 'Concluding Rhetoric & Broader Implications',
      cefrLevel: 'C1',
      objective:
        'Draft a concluding paragraph that restates the thesis in novel language, summarizes key arguments, and offers a final forward-looking thought.',
      instructions:
        'Write a conclusion synthesizing arguments for mandatory digital literacy in secondary schools.',
      taskPrompt: 'Write a concluding synthesis for an essay on mandatory secondary digital literacy.',
      expectedAnswer:
        'In summary, embedding comprehensive digital literacy into core secondary curricula is no longer optional. By equipping students with algorithmic awareness, source verification skills, and cybersecurity fundamentals, educational institutions safeguard democratic discourse. As information ecosystems grow increasingly complex, fostering critical media consumption remains the primary defense against digital manipulation.',
      targetCollocation: 'Restated Thesis + Synthesized Pillars + Forward-Looking Implication',
      difficulty: 'Advanced',
      activityType: 'Conclusion Drafting',
      justification:
        'A master conclusion synthesizes rather than mechanically re-lists: it re-articulates the mandate, consolidates core competencies, and concludes with broad civic implications.',
      hint: 'Open with "In summary...", restate the core curriculum mandate, synthesize skills, and close with the democratic defense implication.',
      xpReward: 20,
    },
    {
      id: 'adv-f-8',
      activityNumber: 8,
      globalNumber: 58,
      title: 'Developing Hook Strategies for Academic Readers',
      skill: 'Writing',
      subskill: 'Rhetorical Hooks & Engagement',
      cefrLevel: 'C2',
      objective:
        'Draft three distinct opening hooks (statistic/fact, paradoxical statement, historical contrast) for an essay on automated supply chains.',
      instructions:
        'Formulate three alternative hooks for an essay investigating supply chain automation.',
      taskPrompt: 'Generate 3 hooks (Fact/Statistic, Paradox, Historical Contrast) for supply chain automation.',
      expectedAnswer:
        '1. Fact/Statistic: Over 70% of modern maritime freight moves through ports utilizing automated container handling.\n2. Paradox: The most human-centric global supply networks are now those entirely operated by autonomous algorithms.\n3. Historical Contrast: Where mid-century trade relied on manual dock labor, contemporary logistics hinges on automated predictive dispatch.',
      targetCollocation: '1. Fact/Statistic / 2. Paradox / 3. Historical Contrast',
      difficulty: 'Mastery',
      activityType: 'Rhetorical Hooks',
      justification:
        'Deploying diverse hook strategies equips scholarly writers to appeal to empirical audiences (data hooks), critical theorists (paradox hooks), or historians (contrast hooks).',
      hint: 'Draft 3 numbered hooks: a startling statistic (70%+), an institutional paradox, and a 20th vs. 21st-century historical contrast.',
      xpReward: 25,
    },
    {
      id: 'adv-f-9',
      activityNumber: 9,
      globalNumber: 59,
      title: 'Auditing Essay Unity & Removing Off-Topic Sentences',
      skill: 'Writing',
      subskill: 'Paragraph Unity & Relevance Evaluation',
      cefrLevel: 'C1',
      objective: 'Analyze a body paragraph to identify and excise sentences that violate paragraph unity.',
      instructions:
        'Identify which numbered sentence introduces an irrelevant tangent and justify why it violates paragraph unity.',
      taskPrompt:
        "Identify the off-topic sentence: '(1) Renewable energy microgrids enhance community resilience during extreme weather. (2) Local solar and wind storage units allow hospitals to maintain power independently. (3) Nuclear power plants require massive capital investment and decades to build. (4) Consequently, microgrids prevent catastrophic infrastructure failures.'",
      expectedAnswer:
        'Irrelevant sentence: (3).\nReason: Sentence 3 introduces nuclear power construction costs, which diverges from the core topic of microgrid community resilience during severe weather.',
      targetCollocation: 'Irrelevant sentence (3) / Diverges from microgrid resilience',
      difficulty: 'Advanced',
      activityType: 'Unity Audit',
      justification:
        'Paragraph unity mandates that every sentence develop the central controlling idea of the topic sentence; introducing nuclear construction capital disrupts microgrid resilience cohesion.',
      hint: 'Sentence 3 brings up nuclear power capital costs, which has nothing to do with localized microgrid storm resilience.',
      xpReward: 20,
    },
    {
      id: 'adv-f-10',
      activityNumber: 10,
      globalNumber: 60,
      title: 'Formulating Evaluative Thesis Statements for Literature Reviews',
      skill: 'Writing',
      subskill: 'Academic Synthesis Thesis Formulation',
      cefrLevel: 'C2',
      objective:
        'Draft an evaluative thesis statement synthesizing conflicting academic literature on remote learning effectiveness.',
      instructions:
        'Formulate a synthesis thesis reconciling early forced remote learning losses with subsequent empirical findings on synchronous digital environments.',
      taskPrompt:
        'Formulate an evaluative thesis synthesizing early remote learning loss vs. subsequent synchronous digital learning findings.',
      expectedAnswer:
        'While early studies highlighted severe learning loss during forced remote instruction, subsequent empirical research demonstrates that synchronous, well-resourced digital learning environments yield academic outcomes comparable to traditional classrooms.',
      targetCollocation: 'While early studies highlighted ..., subsequent empirical research demonstrates ...',
      difficulty: 'Mastery',
      activityType: 'Evaluative Synthesis',
      justification:
        'Concessive syntactical structures ("While early studies..., subsequent research demonstrates...") allow literature reviews to synthesize contradictory findings chronologically and methodologically.',
      hint: 'Begin with a concessive "While early studies highlighted...", followed by the empirical findings of well-resourced synchronous environments.',
      xpReward: 25,
    },
  ],
};
