import { Data } from '../dist/index.mjs';

async function main() {
  const result = await Data({
    token: 'ghp_YOUR_GITHUB_KEY',
    owner: 'Unified-Ukraine-Reference',
    repo: 'api-raw-data',
    tag: 'latest',
  });
  console.log(result);
}

main();
