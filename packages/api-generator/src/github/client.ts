import { fetchWithRetry } from './utils';

import type { GithubDataClientOptions, GithubAsset } from './types';

export class GithubDataClient {
  private readonly token?: string;
  private readonly owner: string;
  private readonly repo: string;
  private readonly tag: string;

  constructor(opt: GithubDataClientOptions = {}) {
    const token = opt.token ?? process.env['GITHUB_TOKEN'];

    if (!token) {
      throw new Error('GitHub token is required. Provide options.token or set GITHUB_TOKEN.');
    }

    this.token = token;
    this.owner = opt.owner ?? 'Unified-Ukraine-Reference';
    this.repo = opt.repo ?? 'api-raw-data';
    this.tag = opt.tag ?? 'latest';
  }

  private assetsMapPromise: Promise<Map<string, number>> | null = null;

  private getHeaders(accept: 'json' | 'stream') {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: accept === 'stream' ? 'application/octet-stream' : 'application/vnd.github+json',
    };
  }

  private getReleaseUrl(): string {
    if (this.tag === 'latest') {
      return `https://api.github.com/repos/${this.owner}/${this.repo}/releases/latest`;
    }
    return `https://api.github.com/repos/${this.owner}/${this.repo}/releases/tags/${encodeURIComponent(this.tag)}`;
  }

  private async getAssetsMap(): Promise<Map<string, number>> {
    if (this.assetsMapPromise) {
      return this.assetsMapPromise;
    }

    this.assetsMapPromise = (async () => {
      const url = this.getReleaseUrl();
      const response = await fetchWithRetry(url, { headers: this.getHeaders('json') });
      const release = (await response.json()) as { assets: GithubAsset[] };
      return new Map(release.assets.map((asset: GithubAsset) => [asset.name, asset.id]));
    })().catch((err) => {
      this.assetsMapPromise = null;
      throw err;
    });

    return this.assetsMapPromise;
  }

  async listAssetNames(): Promise<string[]> {
    const assetsMap = await this.getAssetsMap();
    return [...assetsMap.keys()];
  }

  async fetchCSV(assetName: string): Promise<string> {
    const assetsMap = await this.getAssetsMap();
    const assetId = assetsMap.get(assetName);

    if (assetId === undefined) {
      throw new Error(
        `Asset "${assetName}" not found in release "${this.tag}". Available assets: ${[...assetsMap.keys()].join(', ')}`
      );
    }

    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/releases/assets/${assetId}`;
    const response = await fetchWithRetry(url, { headers: this.getHeaders('stream') });

    return response.text();
  }
}
