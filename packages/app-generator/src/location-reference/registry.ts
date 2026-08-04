import { transformCategoryLocationData, transformKatottgData } from './transformer';
import { KATOTTG_COLUMNS, LOCATION_CATEGORY_COLUMNS } from './constants';

export const DATA_REGISTRY = {
  katottg: {
    assetName: 'katottg.csv',
    columns: KATOTTG_COLUMNS,
    transform: transformKatottgData,
  },
  locationCategory: {
    assetName: 'location-category.csv',
    columns: LOCATION_CATEGORY_COLUMNS,
    transform: transformCategoryLocationData,
  },
} as const;
