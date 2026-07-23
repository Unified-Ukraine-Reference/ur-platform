export class HttpStatusError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchWithRetry(
  url: string,
  init: RequestInit,
  retries = 3
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, init);
      if (response.ok) {
        return response;
      }
      if (response.status >= 500 && i < retries - 1) {
        await sleep(2 ** i * 1000);
        continue;
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    } catch (err) {
      const isNetworkError = !(err instanceof Error && err.message.startsWith('GitHub API error'));
      if (isNetworkError && i < retries - 1) {
        await sleep(2 ** i * 1000);
        continue;
      }
      throw err;
    }
  }
  throw new Error('Max retries exceeded');
}
