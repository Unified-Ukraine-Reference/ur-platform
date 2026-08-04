import { SIMPLE_MAP, POSITIONAL_MAP } from './maps';

export function isSimple(ch: string): ch is keyof typeof SIMPLE_MAP {
  return ch in SIMPLE_MAP;
}

export function isPositional(ch: string): ch is keyof typeof POSITIONAL_MAP {
  return ch in POSITIONAL_MAP;
}
