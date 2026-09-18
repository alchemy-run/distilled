/**
 * The committed results artifact, `results/latest.json`.
 *
 * Same conventions as `benches/runtime/src/record.ts`: one machine, one run,
 * `machine` + `generatedAt` + `commit` say which box and when; the hostname
 * is deliberately not recorded. Numbers are not portable across machines —
 * compare rows within a file, or two files from the same box.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { arch, cpus, platform, release } from "node:os";
import { dirname } from "node:path";
import type { Measurement } from "./harness.ts";

export interface RecordedMeasurement {
  readonly target: string;
  readonly mode: Measurement["mode"];
  readonly run: Measurement["run"];
  readonly command: string;
  readonly wallSec: number;
  readonly peakRssMiB: number;
  readonly tscCheckSec: number | null;
  readonly tscEmitSec: number | null;
  readonly projectsBuilt: number | null;
  readonly srcFiles: number;
  readonly srcBytes: number;
}

export interface RecordFile {
  readonly schema: 1;
  /** ISO 8601 */
  readonly generatedAt: string;
  /** short git sha the suite ran against */
  readonly commit: string;
  readonly machine: {
    /** the bench runner; the compiler is `typescript` */
    readonly runtime: string;
    readonly node: string;
    readonly typescript: string;
    readonly cpu: string;
    readonly cpus: number;
    readonly os: string;
  };
  readonly profile: "quick" | "full";
  /** clean+incremental cycles per row; the best wall time is kept */
  readonly runs: number;
  readonly results: ReadonlyArray<RecordedMeasurement>;
}

const capture = (cmd: ReadonlyArray<string>): string => {
  try {
    const out = Bun.spawnSync([...cmd], { stdout: "pipe", stderr: "ignore" });
    return out.stdout.toString().trim();
  } catch {
    return "";
  }
};

const round = (n: number, places: number): number => {
  const f = 10 ** places;
  return Math.round(n * f) / f;
};

export const toRecordFile = (
  results: ReadonlyArray<Measurement>,
  profile: "quick" | "full",
  runs: number,
): RecordFile => ({
  schema: 1,
  generatedAt: new Date().toISOString(),
  commit: capture(["git", "rev-parse", "--short", "HEAD"]) || "unknown",
  machine: {
    runtime: `bun ${Bun.version}`,
    node: capture(["node", "--version"]) || "unknown",
    typescript:
      capture(["node", "node_modules/typescript/bin/tsc", "-v"]).replace(
        /^Version\s+/,
        "",
      ) || "unknown",
    cpu: cpus()[0]?.model ?? "unknown",
    cpus: cpus().length,
    os: `${platform()} ${release()} ${arch()}`,
  },
  profile,
  runs,
  results: results
    .filter((r) => !r.error)
    .map((r) => ({
      target: r.target,
      mode: r.mode,
      run: r.run,
      command: r.command,
      wallSec: round(r.wallSec, 2),
      peakRssMiB: round(r.peakRssMiB, 0),
      tscCheckSec: r.tscCheckSec ?? null,
      tscEmitSec: r.tscEmitSec ?? null,
      projectsBuilt: r.projectsBuilt ?? null,
      srcFiles: r.srcFiles,
      srcBytes: r.srcBytes,
    })),
});

export const writeRecordFile = (path: string, file: RecordFile): void => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(file, null, 2) + "\n");
};
