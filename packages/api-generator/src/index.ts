import { fetchAndTransform } from './location-reference/utils';
import { DATA_REGISTRY } from './location-reference/registry';
import { GithubDataClient } from './github';

import type { GithubDataClientOptions } from './github';

export async function Data(opt?: GithubDataClientOptions) {
  const client = new GithubDataClient(opt);
  await client.listAssetNames();

  const [katottgData, categoryLocationData] = await Promise.all([
    fetchAndTransform(
      client,
      DATA_REGISTRY.katottg.assetName,
      DATA_REGISTRY.katottg.columns,
      DATA_REGISTRY.katottg.transform
    ),
    fetchAndTransform(
      client,
      DATA_REGISTRY.locationCategory.assetName,
      DATA_REGISTRY.locationCategory.columns,
      DATA_REGISTRY.locationCategory.transform
    ),
  ]);

  return { katottgData, categoryLocationData };
}
