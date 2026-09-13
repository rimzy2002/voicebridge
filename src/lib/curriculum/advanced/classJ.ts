// ============================================================
// Adv Class J — Module 1: Elementary Rules of Punctuation & Structural Mechanics
// Grounded in Strunk & White's The Elements of Style (Activities 1–10)
// ============================================================

import { AdvancedClass } from './types';

export const advClassJ: AdvancedClass = {
  id: 'adv-class-j',
  letter: 'J',
  moduleNumber: 10,
  name: 'Adv Class J',
  title: 'Elementary Rules of Punctuation & Structural Mechanics',
  theme: 'The Elements of Style: Strunk & White Master Punctuation & Precision',
  overview:
    'Grounded in William Strunk Jr. and E.B. White’s legendary The Elements of Style, this capstone master class develops flawless command of punctuation mechanics and clause architecture: serial (Oxford) comma legal precision, non-restrictive parenthetical enclosures, resolving comma splices via semicolons, deploying colons for amplification, emphatic em-dash breaks, coordinating conjunction commas, sentence fragment consolidation, proper noun possessive mechanics, and multi-sentence executive quotation formatting.',
  linguistNote:
    'In high-stakes corporate and legal drafting, punctuation is not merely decorative—it is structural and legally binding. Omitting an Oxford comma in an indemnification clause can create disastrous multi-million dollar ambiguities regarding joint vs. several liability. Using semicolons instead of comma splices establishes intellectual authority and syntactic rigor, while mastering colon introductions and em-dashes ensures executive communications convey crystalline hierarchy and dramatic emphasis.',
  activitiesCount: 10,
  cefrRange: 'C1–C2',
  isReady: true,
  activities: [
    {
      id: 'adv-j-1',
      activityNumber: 1,
      globalNumber: 91,
      title: 'Oxford Comma Precision in Legal Contracts',
      skill: 'Writing',
      subskill: 'Punctuation Clarity in Series (Punctuation Repair)',
      cefrLevel: 'C1',
      objective:
        'Apply the serial (Oxford) comma to eliminate ambiguity in multi-item legal lists.',
      instructions:
        "Insert serial commas where necessary to ensure each party's liability is distinct.",
      taskPrompt:
        "Prompt: 'The indemnity policy covers the directors, senior executive officers and regional managers.'",
      expectedAnswer:
        'The indemnity policy covers the directors, senior executive officers, and regional managers.',
      targetCollocation: 'directors, senior executive officers, and regional managers',
      difficulty: 'Advanced',
      activityType: 'Punctuation Repair',
      justification:
        'Inserting the serial comma before "and regional managers" prevents legal misconstruction that executive officers and regional managers constitute a single joint entity.',
      hint: 'Place an Oxford comma immediately before "and regional managers" to isolate all three discrete roles.',
      xpReward: 20,
    },
    {
      id: 'adv-j-2',
      activityNumber: 2,
      globalNumber: 92,
      title: 'Parenthetical Enclosure with Paired Commas',
      skill: 'Writing',
      subskill: 'Parenthetical Punctuation Control (Parenthetical Formatting)',
      cefrLevel: 'C1',
      objective:
        'Set off enclosed parenthetic expressions with paired commas without breaking sentence syntax.',
      instructions:
        'Identify and punctuate the parenthetical clause in an executive announcement.',
      taskPrompt:
        "Prompt: 'The CEO who recently chaired the European summit announced a major merger today.'",
      expectedAnswer:
        'The CEO, who recently chaired the European summit, announced a major merger today.',
      targetCollocation: 'The CEO, who recently chaired..., announced',
      difficulty: 'Advanced',
      activityType: 'Parenthetical Formatting',
      justification:
        'Enclosing non-essential descriptive relative clauses between paired commas prevents syntactic run-on and clarifies that the summit chairmanship is incidental background.',
      hint: 'Insert matching commas before "who" and after "summit" to enclose the parenthetical clause.',
      xpReward: 20,
    },
    {
      id: 'adv-j-3',
      activityNumber: 3,
      globalNumber: 93,
      title: 'Semicolon Resolution of Comma Splices',
      skill: 'Writing',
      subskill: 'Independent Clause Coordination (Comma Splice Repair)',
      cefrLevel: 'C1',
      objective:
        'Eliminate comma splices between closely related independent clauses by inserting a semicolon.',
      instructions:
        'Correct the comma splice in the strategic briefing statement.',
      taskPrompt:
        "Prompt: 'Market volatility increased sharply in Q3, corporate bond yields fell to historic lows.'",
      expectedAnswer:
        'Market volatility increased sharply in Q3; corporate bond yields fell to historic lows.',
      targetCollocation: 'increased sharply in Q3; corporate bond yields fell',
      difficulty: 'Advanced',
      activityType: 'Comma Splice Repair',
      justification:
        'Two independent clauses cannot be joined by a comma alone without a coordinating conjunction; a semicolon correctly signals close thematic linkage without grammatical splicing.',
      hint: 'Replace the comma after "Q3" with a semicolon to link the two balanced independent clauses.',
      xpReward: 20,
    },
    {
      id: 'adv-j-4',
      activityNumber: 4,
      globalNumber: 94,
      title: 'Colon Introductions for Amplification and Lists',
      skill: 'Writing',
      subskill: 'Formal Colon Placement (Colon Application)',
      cefrLevel: 'C1',
      objective:
        'Deploy colons following independent clauses to introduce formal lists or explanatory statements.',
      instructions:
        'Insert a colon correctly to introduce an executive summary takeaway.',
      taskPrompt:
        "Prompt: 'The board arrived at a single consensus we must liquidate non-performing assets.'",
      expectedAnswer:
        'The board arrived at a single consensus: we must liquidate non-performing assets.',
      targetCollocation: 'arrived at a single consensus: we must liquidate',
      difficulty: 'Advanced',
      activityType: 'Colon Application',
      justification:
        'A colon must be preceded by a grammatically complete independent clause, serving as a rhetorical bridge pointing forward to the formal resolution or explanation.',
      hint: 'Place a colon directly after "consensus" to introduce the specific takeaway.',
      xpReward: 20,
    },
    {
      id: 'adv-j-5',
      activityNumber: 5,
      globalNumber: 95,
      title: 'Emphatic Dashes for Structural Breaks',
      skill: 'Writing',
      subskill: 'Emphatic Dash Usage (Emphatic Punctuation)',
      cefrLevel: 'C2',
      objective:
        'Utilize em-dashes to set off abrupt rhetorical breaks or highlight an illustrative summary.',
      instructions:
        'Transform a complex sentence by inserting an em-dash for dramatic emphasis.',
      taskPrompt:
        "Prompt: 'The company's primary asset its proprietary AI algorithm was sold during restructuring.'",
      expectedAnswer:
        "The company's primary asset—its proprietary AI algorithm—was sold during restructuring.",
      targetCollocation: 'primary asset—its proprietary AI algorithm—was sold',
      difficulty: 'Mastery',
      activityType: 'Emphatic Punctuation',
      justification:
        'Paired em-dashes create sharp visual prominence for parenthetical definitions, giving the asset specification far greater rhetorical weight than conventional parentheses.',
      hint: 'Enclose "its proprietary AI algorithm" with em-dashes (—) without surrounding spaces.',
      xpReward: 25,
    },
    {
      id: 'adv-j-6',
      activityNumber: 6,
      globalNumber: 96,
      title: 'Distinguishing Restrictive vs. Non-Restrictive Relative Clauses',
      skill: 'Writing',
      subskill: 'Comma Distinction in Relative Clauses (Clause Punctuation)',
      cefrLevel: 'C1',
      objective:
        'Use commas to set off non-restrictive relative clauses while omitting them for restrictive clauses.',
      instructions:
        'Punctuate the sentence according to whether the clause defines or adds non-essential information.',
      taskPrompt:
        "Prompt: 'The software updates which were released on Tuesday fixed the security vulnerability.'",
      expectedAnswer:
        'The software updates, which were released on Tuesday, fixed the security vulnerability.',
      targetCollocation: 'The software updates, which were released on Tuesday, fixed',
      difficulty: 'Advanced',
      activityType: 'Clause Punctuation',
      justification:
        'Commas signal that all software updates are referred to and the release day is non-restrictive supplementary detail, preventing readers from assuming only Tuesday’s updates applied.',
      hint: 'Insert commas before "which" and after "Tuesday" to mark the clause as non-restrictive.',
      xpReward: 20,
    },
    {
      id: 'adv-j-7',
      activityNumber: 7,
      globalNumber: 97,
      title: 'Punctuation of Conjunctions Joining Independent Clauses',
      skill: 'Writing',
      subskill: 'Coordinating Conjunction Punctuation (Conjunction Punctuation)',
      cefrLevel: 'C1',
      objective:
        'Place a comma before a coordinating conjunction (and, but, for, nor, or, so, yet) joining independent clauses.',
      instructions:
        'Insert a comma before the coordinating conjunction in a corporate press release.',
      taskPrompt:
        "Prompt: 'The audit revealed several minor discrepancies but the financial report was ultimately approved.'",
      expectedAnswer:
        'The audit revealed several minor discrepancies, but the financial report was ultimately approved.',
      targetCollocation: 'revealed several minor discrepancies, but the financial report',
      difficulty: 'Advanced',
      activityType: 'Conjunction Punctuation',
      justification:
        'In formal style, a comma is required before "but" when connecting two complete independent clauses with distinct subjects and predicates.',
      hint: 'Place a comma immediately before "but" to balance the two independent clauses.',
      xpReward: 20,
    },
    {
      id: 'adv-j-8',
      activityNumber: 8,
      globalNumber: 98,
      title: 'Avoiding Sentence Fragments in Formal Reports',
      skill: 'Writing',
      subskill: 'Complete Clause Structure (Fragment Repair)',
      cefrLevel: 'C1',
      objective:
        'Attach dependent clauses or participial phrases to independent clauses to eliminate sentence fragments.',
      instructions:
        'Repair the sentence fragment in a policy draft.',
      taskPrompt:
        "Prompt: 'The board voted to approve the international expansion project. Having reviewed all market risks.'",
      expectedAnswer:
        'Having reviewed all market risks, the board voted to approve the international expansion project.',
      targetCollocation: 'Having reviewed all market risks, the board voted',
      difficulty: 'Advanced',
      activityType: 'Fragment Repair',
      justification:
        'Participial phrases cannot stand as independent sentences; fronting the participial modifier and joining it to the main clause produces authoritative, unified syntax.',
      hint: 'Combine the participial phrase "Having reviewed all market risks," at the beginning of the sentence followed by the board action.',
      xpReward: 20,
    },
    {
      id: 'adv-j-9',
      activityNumber: 9,
      globalNumber: 99,
      title: 'Possessive Singular Formations of Proper Nouns',
      skill: 'Writing',
      subskill: 'Possessive Apostrophe Rules (Possessive Mechanics)',
      cefrLevel: 'C1',
      objective:
        "Form possessive singular nouns by adding 's regardless of the final consonant sound.",
      instructions:
        "Apply Strunk's possessive singular rule to proper names ending in s.",
      taskPrompt:
        "Prompt: 'We reviewed Charles report and Burns analysis.'",
      expectedAnswer:
        "We reviewed Charles's report and Burns's analysis.",
      targetCollocation: "Charles's report and Burns's analysis",
      difficulty: 'Advanced',
      activityType: 'Possessive Mechanics',
      justification:
        "Strunk & White Rule 1 strictly requires 's for singular proper nouns ending in s (Charles's, Burns's), preserving vocal phonetic reality in written register.",
      hint: "Add 's to both singular proper names: Charles's and Burns's.",
      xpReward: 20,
    },
    {
      id: 'adv-j-10',
      activityNumber: 10,
      globalNumber: 100,
      title: 'Formatting Formal Direct Quotations',
      skill: 'Writing',
      subskill: 'Colon and Comma Quotation Mechanics (Quotation Mechanics)',
      cefrLevel: 'C2',
      objective:
        'Introduce formal direct quotations exceeding one sentence using a colon rather than a comma.',
      instructions:
        'Format an executive quotation in a press announcement.',
      taskPrompt:
        "Prompt: 'The Chairperson stated The quarterly results reflect our resilience. We will continue expanding.'",
      expectedAnswer:
        'The Chairperson stated: "The quarterly results reflect our resilience. We will continue expanding."',
      targetCollocation: 'The Chairperson stated: "..."',
      difficulty: 'Mastery',
      activityType: 'Quotation Mechanics',
      justification:
        'When introducing multi-sentence formal statements or quotations of substantial weight, standard executive style mandates a colon followed by enclosed quotation marks.',
      hint: 'Use a colon after "stated:" followed by double quotation marks enclosing both sentences.',
      xpReward: 25,
    },
  ],
};
