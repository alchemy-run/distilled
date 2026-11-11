/**
 * Which Distilled packages Alchemy actually depends on. Only those count as
 * "in production" on the site: a zero-patch package nobody consumes is
 * unproven, not clean.
 *
 * Fetched from `alchemy-run/alchemy@main` at build time so every deploy
 * reflects the current list. `data/alchemy-providers.json` is the fallback
 * when the network is unavailable (and a record of the last known answer).
 */
import { readFile } from "node:fs/promises";

const ALCHEMY_PACKAGE_JSON =
  "https://raw.githubusercontent.com/alchemy-run/alchemy/main/packages/alchemy/package.json";

export interface AlchemyUsage {
  /** `packages/<dir>` names Alchemy depends on. */
  readonly used: ReadonlyArray<string>;
  /** Where the list came from. */
  readonly source: "github" | "fallback";
  /** ISO date the list was determined. */
  readonly checked: string;
}

interface Fallback {
  readonly _checked?: string;
  readonly used: ReadonlyArray<string>;
}

const scope = "@distilled.cloud/";

const fromDependencies = (pkg: {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
}): string[] =>
  [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
    ...Object.keys(pkg.optionalDependencies ?? {}),
  ]
    .filter((name) => name.startsWith(scope))
    .map((name) => name.slice(scope.length))
    .sort();

const fetchUsage = async (): Promise<string[] | null> => {
  if (process.env.DISTILLED_SITE_OFFLINE) return null;
  try {
    const res = await fetch(ALCHEMY_PACKAGE_JSON, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const used = fromDependencies(await res.json());
    return used.length > 0 ? used : null;
  } catch {
    return null;
  }
};

export const readAlchemyUsage = async (fallbackFile: string): Promise<AlchemyUsage> => {
  const live = await fetchUsage();
  if (live) {
    return {
      used: live,
      source: "github",
      checked: new Date().toISOString().slice(0, 10),
    };
  }
  const fallback = JSON.parse(await readFile(fallbackFile, "utf8")) as Fallback;
  return {
    used: [...fallback.used].sort(),
    source: "fallback",
    checked: fallback._checked ?? "unknown",
  };
};
