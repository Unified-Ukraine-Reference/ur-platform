export interface GithubDataClientOptions {
  token?: string | undefined;
  owner?: string | undefined;
  repo?: string | undefined;
  tag?: string | undefined;
}

export interface GithubAsset {
  id: number;
  name: string;
}
