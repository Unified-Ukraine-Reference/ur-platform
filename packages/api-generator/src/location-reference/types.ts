export type LocationCategoryColumn = 'code' | 'name' | 'level';
export type KatottgColumn =
  | 'firstLevel'
  | 'secondLevel'
  | 'thirdLevel'
  | 'fourthLevel'
  | 'additionalLevel'
  | 'nameCategory'
  | 'locationCategory';

export type KatottgColumns = Record<Exclude<KatottgColumn, 'locationCategory'>, string>;
export type LocationCategoryColumns = Record<Exclude<LocationCategoryColumn, 'code'>, string>;

export type AllowedLocationCategory = 'O' | 'K' | 'P' | 'H' | 'M' | 'X' | 'C' | 'B';

export interface ParsedKatottgData extends KatottgColumns {
  locationCategory: AllowedLocationCategory;
}

export interface ParsedLocationCategoryData extends LocationCategoryColumns {
  code: AllowedLocationCategory;
}

export type NewLocationType = {
  code: string;
  nameUa: string;
  nameEn: string;
  categoryCode: string;
  parentCode?: string | null | undefined;
};

export type NewLocationCategoryType = {
  code: string;
  nameUa: string;
  nameEn: string;
  level?: number | null | undefined;
};
