/**
 * The committed results artifact, `results/latest.json`.
 *
 * Contract agreed with the distilled.cloud website (`website/scripts/build.ts`
 * reads it at build time and renders /bench; a missing file skips the
 * section). Keep `schema` in step with any shape change.
 *
 * The numbers are from ONE machine and ONE run of the quick profile. They
 * are not portable: expect ±30 % between boxes and runs, and the p99 column
 * is noisy at the quick budget. `machine` and `generatedAt` are there so a
 * reader can tell which box and when.
 */
import { cpus, hostname, platform, release, arch } from "node:os";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { Result } from "./harness.ts";

export interface RecordedResult {
  readonly name: string;
  readonly provider: Result["provider"];
  readonly service: string;
  readonly op: string;
  readonly stage: Result["stage"];
  readonly note: string;
  /** 1e9 / avg ns */
  readonly opsPerSec: number;
  /** nanoseconds */
  readonly p50: number;
  /** nanoseconds */
  readonly p99: number;
  readonly samples: number;
}

export interface RecordFile {
  readonly schema: 1;
  /** ISO 8601 */
  readonly generatedAt: string;
  /** short git sha the suite ran against */
  readonly commit: string;
  readonly machine: {
    readonly runtime: string;
    readonly cpu: string;
    readonly os: string;
    readonly host: string;
  };
  readonly profile: "quick" | "full";
  readonly results: ReadonlyArray<RecordedResult>;
}

const shortSha = (): string => {
  try {
    const out = Bun.spawnSync(["git", "rev-parse", "--short", "HEAD"], {
      stdout: "pipe",
      stderr: "ignore",
    });
    const sha = out.stdout.toString().trim();
    return sha.length > 0 ? sha : "unknown";
  } catch {
    return "unknown";
  }
};

const round = (n: number, places: number): number => {
  if (!Number.isFinite(n)) return n;
  const f = 10 ** places;
  return Math.round(n * f) / f;
};

export const toRecordFile = (
  results: ReadonlyArray<Result>,
  profile: "quick" | "full",
): RecordFile => ({
  schema: 1,
  generatedAt: new Date().toISOString(),
  commit: shortSha(),
  machine: {
    runtime: `bun ${Bun.version}`,
    cpu: cpus()[0]?.model ?? "unknown",
    os: `${platform()} ${release()} ${arch()}`,
    host: hostname(),
  },
  profile,
  results: results
    .filter((r) => !r.error)
    .map((r) => ({
      name: r.name,
      provider: r.provider,
      service: r.service,
      op: r.op,
      stage: r.stage,
      note: r.note,
      opsPerSec: round(r.opsPerSec, 1),
      p50: round(r.p50, 1),
      p99: round(r.p99, 1),
      samples: r.samples,
    })),
});

export const writeRecordFile = (path: string, file: RecordFile): void => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(file, null, 2) + "\n");
};
