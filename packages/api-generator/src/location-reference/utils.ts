import { CsvParser } from '../shared';

import type { GithubDataClient } from '../github';
import type { Options } from 'csv-parse';

export async function fetchAndTransform<Parsed, Result>(
  client: GithubDataClient,
  assetName: string,
  columns: NonNullable<Options['columns']>,
  transform: (row: Parsed) => Result
) {
  const csvText = await client.fetchCSV(assetName);
  const parser = new CsvParser<Parsed>(csvText, { columns, skip_empty_lines: true });
  const parsed = await parser.parse();
  return parsed.map(transform);
}
