import { transliterate } from '../transliteration';

import type {
  ParsedKatottgData,
  NewLocationType,
  ParsedLocationCategoryData,
  NewLocationCategoryType,
} from './types';

export function transformKatottgData(oldLoc: ParsedKatottgData): NewLocationType {
  const levels = [
    oldLoc.additionalLevel?.trim() || '',
    oldLoc.fourthLevel?.trim() || '',
    oldLoc.thirdLevel?.trim() || '',
    oldLoc.secondLevel?.trim() || '',
    oldLoc.firstLevel?.trim() || '',
  ];

  let code = '';
  let parentCode: string | null = null;

  for (const [index, currentLevel] of levels.entries()) {
    if (currentLevel !== '') {
      code = currentLevel;

      const higherLevels = levels.slice(index + 1);
      parentCode = higherLevels.find((lvl) => lvl !== '') || null;

      break;
    }
  }
  return {
    code,
    parentCode,
    nameUa: oldLoc.nameCategory,
    nameEn: transliterate(oldLoc.nameCategory),
    categoryCode: oldLoc.locationCategory,
  };
}

export function transformCategoryLocationData(
  oldLoc: ParsedLocationCategoryData
): NewLocationCategoryType {
  return {
    code: oldLoc.code,
    nameUa: oldLoc.name,
    nameEn: transliterate(oldLoc.name),
    level: oldLoc.level ? Number(oldLoc.level) : null,
  };
}
