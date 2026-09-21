/** Constants shared across pages. */

export const SITE_URL = "https://distilled.cloud";
export const REPO_URL = "https://github.com/alchemy-run/distilled";
export const NPM_ORG_URL = "https://www.npmjs.com/org/distilled.cloud";
export const DISCORD_URL = "https://discord.gg/jwKw8dBJdN";
export const ALCHEMY_URL = "https://alchemy.run";

export const npmUrl = (name: string) => `https://www.npmjs.com/package/${name}`;
export const sourceUrl = (dir: string) =>
  `${REPO_URL}/tree/main/packages/${dir}`;
export const patchesUrl = (dir: string) => `${sourceUrl(dir)}/patches`;
