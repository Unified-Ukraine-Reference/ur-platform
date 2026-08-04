import { SIMPLE_MAP, POSITIONAL_MAP } from './maps';
import { isSimple, isPositional } from './guards';
import { capitalizeWords } from './utils';

export function isWordBoundary(prevChar: string | undefined): boolean {
  if (prevChar === undefined) return true;
  return !/[а-щьюяіїєґa-z0-9]/i.test(prevChar);
}

export function transliterate(input: string): string {
  const lower = input.toLowerCase();
  let result = '';

  for (let i = 0; i < lower.length; i++) {
    const ch: string = lower.charAt(i);
    const prev: string = lower.charAt(i - 1);
    const next: string = lower.charAt(i + 1);

    if (ch === 'з' && next === 'г') {
      result += 'zgh';
      i++;
      continue;
    }

    if (isPositional(ch)) {
      const atStart = isWordBoundary(prev);
      result += POSITIONAL_MAP[ch][atStart ? 'start' : 'other'];
      continue;
    }

    if (isSimple(ch)) {
      result += SIMPLE_MAP[ch];
      continue;
    }

    result += ch;
  }

  return capitalizeWords(result);
}
