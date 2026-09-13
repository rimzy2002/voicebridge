// ============================================================
// Advanced C1-C2 Master Classes Curriculum Registry (Classes A–J)
// ============================================================

import { AdvancedClass, AdvancedClassId } from './types';
import { advClassA } from './classA';

export * from './types';
export { advClassA };

export const ADVANCED_CLASSES: AdvancedClass[] = [
  advClassA,
  {
    id: 'adv-class-b',
    letter: 'B',
    moduleNumber: 2,
    name: 'Adv Class B',
    title: 'De-Lexicalized Verb Precision',
    theme: 'Make, Do, Get, Take, Have, Pay',
    overview:
      'At the C1-C2 level, high-frequency verbs carry little semantic weight alone but become powerful tools of precision when paired with the right nouns. Move beyond "do a mistake" to natural, commanding combinations like "make a contribution" and "pay tribute".',
    activitiesCount: 10,
    cefrRange: 'C1–C2',
    isReady: false,
    activities: [],
  },
  {
    id: 'adv-class-c',
    letter: 'C',
    moduleNumber: 3,
    name: 'Adv Class C',
    title: 'Metaphorical Framing & Rhetorical Flair',
    theme: 'Water, Fire, and Light Metaphors',
    overview:
      'Metaphors allow complex social and emotional dynamics to be described through physical imagery. Move from literal statements to vivid board-level framing where "ideas flow", "tempers flare", or "cheeks burn with embarrassment".',
    activitiesCount: 10,
    cefrRange: 'C1–C2',
    isReady: false,
    activities: [],
  },
  {
    id: 'adv-class-d',
    letter: 'D',
    moduleNumber: 4,
    name: 'Adv Class D',
    title: 'Corporate Strategy & Market Dynamics',
    theme: 'Finance, Partnerships, and Growth',
    overview:
      'Linguistic precision signals commercial credibility. Master essential collocations like "submitting a tender", "raising capital", "going into partnership", and announcing products that "make a profit".',
    activitiesCount: 10,
    cefrRange: 'C1–C2',
    isReady: false,
    activities: [],
  },
  {
    id: 'adv-class-e',
    letter: 'E',
    moduleNumber: 5,
    name: 'Adv Class E',
    title: 'Academic Synthesis & Scholarly Critique',
    theme: 'Objective Distance & Precise Synonyms',
    overview:
      'Scholarly discourse demands objective distance and nuanced distinctions—such as "begin" versus "start", "achieving goals", and "gaining recognition". Essential for doctoral research, peer reviews, and academic papers.',
    activitiesCount: 10,
    cefrRange: 'C1–C2',
    isReady: false,
    activities: [],
  },
  {
    id: 'adv-class-f',
    letter: 'F',
    moduleNumber: 6,
    name: 'Adv Class F',
    title: 'Legal Framing & Public Diplomacy',
    theme: 'Regulatory Rigor & Statutory Language',
    overview:
      'Legal language functions as performative utterances that carry statutory enforceability. Understand the critical distinction between "strictly forbidden" and "strongly discouraged", and master compliance collocations.',
    activitiesCount: 10,
    cefrRange: 'C1–C2',
    isReady: false,
    activities: [],
  },
  {
    id: 'adv-class-g',
    letter: 'G',
    moduleNumber: 7,
    name: 'Adv Class G',
    title: 'Workplace Relations & Conflict Resolution',
    theme: 'Interpersonal Nuance & High-Stakes HR',
    overview:
      'Navigate delicate professional situations by selecting collocations that de-escalate tension or convey empathy with surgical precision, such as "swelling with pride", "having a row", or supporting an "emotional wreck".',
    activitiesCount: 10,
    cefrRange: 'C1–C2',
    isReady: false,
    activities: [],
  },
  {
    id: 'adv-class-h',
    letter: 'H',
    moduleNumber: 8,
    name: 'Adv Class H',
    title: 'Investigative Journalism & Media Analysis',
    theme: 'Media Shorthand & Dramatic Impact',
    overview:
      'Journalism relies on concise linguistic shorthand conveying urgency and scale: "freak storms", "driving rain", "axe jobs", and "police quiz suspect". Learn to write with dramatic journalistic economy.',
    activitiesCount: 10,
    cefrRange: 'C1–C2',
    isReady: false,
    activities: [],
  },
  {
    id: 'adv-class-i',
    letter: 'I',
    moduleNumber: 9,
    name: 'Adv Class I',
    title: 'Quantitative Dynamics & Trend Analysis',
    theme: 'Economic Movement & Data Forecasting',
    overview:
      'Describe rapid market shifts using evocative, analytical vocabulary. Learn why "prices soar" and "economies boom", while preparing for "biting winds" and "patches of fog" in statistical data.',
    activitiesCount: 10,
    cefrRange: 'C1–C2',
    isReady: false,
    activities: [],
  },
  {
    id: 'adv-class-j',
    letter: 'J',
    moduleNumber: 10,
    name: 'Adv Class J',
    title: 'Lexicographical Discovery & Corpus Editing',
    theme: 'Self-Correction & Linguistic Mastery',
    overview:
      'The pinnacle of C2 communicative mastery: distinguishing compounds, idioms, and collocations while auditing authentic professional texts to eliminate subtle non-native patterns like "get bald" or "do a decision".',
    activitiesCount: 10,
    cefrRange: 'C1–C2',
    isReady: false,
    activities: [],
  },
];

export function getAdvancedClass(idOrLetter: string): AdvancedClass | undefined {
  const normalized = idOrLetter.toLowerCase();
  return ADVANCED_CLASSES.find(
    c =>
      c.id === normalized ||
      c.letter.toLowerCase() === normalized ||
      `adv-class-${c.letter.toLowerCase()}` === normalized
  );
}

export function getAllAdvancedClasses(): AdvancedClass[] {
  return ADVANCED_CLASSES;
}
