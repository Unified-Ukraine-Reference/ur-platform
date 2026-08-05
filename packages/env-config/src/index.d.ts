declare module 'bun' {
  interface Env {
    NODE_ENV: 'development' | 'production' | 'test';
    DATABASE_URL: string | undefined;
    GITHUB_TOKEN: string | undefined;
    GITHUB_OWNER: string | undefined;
    GITHUB_REPO: string | undefined;
    GITHUB_TAG: string | undefined;
  }
}
