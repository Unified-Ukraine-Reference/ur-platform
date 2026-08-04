import type { KatottgColumn, LocationCategoryColumn } from './types';

export const KATOTTG_COLUMNS = [
  'firstLevel',
  'secondLevel',
  'thirdLevel',
  'fourthLevel',
  'additionalLevel',
  'locationCategory',
  'nameCategory',
] satisfies KatottgColumn[];

export const LOCATION_CATEGORY_COLUMNS = [
  'code',
  'name',
  'level',
] satisfies LocationCategoryColumn[];
