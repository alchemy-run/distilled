/**
 * Benchmark inputs for /bench.
 *
 * Source of truth is the committed artifact each bench writes:
 *   benches/runtime/results/latest.json   (bench-runtime, PR #567)
 *   benches/bundle/results/latest.json    (bench-bundle,  PR #569)
 * Until those exist on the branch being built, `website/data/*.seed.json`
 * carries the numbers the bench agents posted, flagged `seed: true` so the
 * page can label them as interim. A missing/unparsable file yields `null`
 * and the section is omitted — the site never fails on bench data.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export interface RuntimeResult {
  readonly name: string;
  readonly provider: string;
  readonly service: string;
  readonly op: string;
  readonly stage: string;
  readonly note: string;
  readonly opsPerSec: number;
  /** nanoseconds */
  readonly p50: number;
  readonly p99: number;
  readonly samples: number;
}

export interface RuntimeBench {
  readonly schema: number;
  readonly generatedAt: string;
  readonly commit: string;
  readonly machine: {
    readonly runtime: string;
    readonly cpu?: string;
    readonly os?: string;
  };
  readonly profile: string;
  readonly seed?: boolean;
  readonly results: ReadonlyArray<RuntimeResult>;
}

export interface BundleRow {
  readonly fixture: string;
  readonly variant: string;
  readonly description?: string;
  readonly coldMs: number;
  /** `null` when the bench ran once (`--runs 1`). */
  readonly warmMs: number | null;
  readonly bytes: number;
  readonly gzipBytes: number;
  readonly moduleCount: number;
  readonly opsRetained: ReadonlyArray<{
    readonly service: string;
    readonly retained: number;
    readonly total: number;
  }>;
  readonly leaks: number;
}

export interface BundleBench {
  readonly schema: number;
  readonly generatedAt: string;
  readonly commit: string;
  readonly host?: {
    readonly platform?: string;
    readonly cpu?: string | null;
    readonly cores?: number;
    readonly memoryGb?: number;
  };
  readonly rolldown: string;
  readonly bun: string;
  readonly runs: number;
  readonly seed?: boolean;
  readonly rows: ReadonlyArray<BundleRow>;
}

const readJson = async <T>(file: string): Promise<T | null> => {
  try {
    return JSON.parse(await readFile(file, "utf8")) as T;
  } catch {
    return null;
  }
};

const firstOf = async <T>(
  files: ReadonlyArray<string>,
  valid: (doc: T) => boolean,
): Promise<T | null> => {
  for (const file of files) {
    const doc = await readJson<T>(file);
    if (doc && valid(doc)) return doc;
  }
  return null;
};

export const readRuntimeBench = (
  repoRoot: string,
  websiteRoot: string,
): Promise<RuntimeBench | null> =>
  firstOf<RuntimeBench>(
    [
      join(repoRoot, "benches", "runtime", "results", "latest.json"),
      join(websiteRoot, "data", "bench-runtime.seed.json"),
    ],
    (d) => d.schema === 1 && Array.isArray(d.results) && d.results.length > 0,
  );

export const readBundleBench = (
  repoRoot: string,
  websiteRoot: string,
): Promise<BundleBench | null> =>
  firstOf<BundleBench>(
    [
      join(repoRoot, "benches", "bundle", "results", "latest.json"),
      join(websiteRoot, "data", "bench-bundle.seed.json"),
    ],
    (d) => d.schema === 1 && Array.isArray(d.rows) && d.rows.length > 0,
  );
