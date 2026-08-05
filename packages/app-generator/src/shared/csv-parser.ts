import { Parser } from 'csv-parse';
import { Readable } from 'node:stream';

import type { Options } from 'csv-parse';

export class CsvParser<T> {
  private readonly textCSV: string;
  private readonly options: Options;

  constructor(textCSV: string, options: Options) {
    this.textCSV = textCSV;
    this.options = options;
  }

  async parse(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const result: T[] = [];
      const stream = Readable.from(this.textCSV);
      const parser = new Parser(this.options);

      stream
        .pipe(parser)
        .on('data', (row) => result.push(row))
        .on('end', () => resolve(result))
        .on('error', (err: Error) => reject(err));
    });
  }
}
