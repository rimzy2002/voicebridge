// ============================================================
// Advanced C1-C2 Master Classes Curriculum Registry (Classes A–J)
// ============================================================

import { AdvancedClass, AdvancedClassId } from './types';
import { advClassA } from './classA';
import { advClassB } from './classB';
import { advClassC } from './classC';
import { advClassD } from './classD';
import { advClassE } from './classE';
import { advClassF } from './classF';
import { advClassG } from './classG';
import { advClassH } from './classH';
import { advClassI } from './classI';

export * from './types';
export { advClassA, advClassB, advClassC, advClassD, advClassE, advClassF, advClassG, advClassH, advClassI };

export const ADVANCED_CLASSES: AdvancedClass[] = [
  advClassA,
  advClassB,
  advClassC,
  advClassD,
  advClassE,
  advClassF,
  advClassG,
  advClassH,
  advClassI,
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
