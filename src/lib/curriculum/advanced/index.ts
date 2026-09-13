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
import { advClassJ } from './classJ';

export * from './types';
export {
  advClassA,
  advClassB,
  advClassC,
  advClassD,
  advClassE,
  advClassF,
  advClassG,
  advClassH,
  advClassI,
  advClassJ,
};

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
  advClassJ,
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
