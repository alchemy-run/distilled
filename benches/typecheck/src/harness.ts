/**
 * Runs one `tsc -b` and measures it.
 *
 * Wall time is `performance.now()` around the child from spawn to exit.
 * Peak RSS is the kernel's `ru_maxrss` for the child, read through
 * `Bun.spawn(...).resourceUsage()`. The child is `node
 * node_modules/typescript/bin/tsc`, exactly what `pnpm typecheck` runs; that
 * shim `execve`s into the native `tsc` binary, so the numbers are the
 * compiler's, not node's.
 *
 * `--extendedDiagnostics` is passed so tsc's own phase split (parse / check /
 * emit) can be read off stdout; the flag itself costs nothing measurable.
 */
import { rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT, type Target } from "./targets.ts";

//#region Options

export interface BenchOptions {
  /** `--full`: every SDK package, not just core/aws/cloudflare. */
  readonly full: boolean;
  /** `--filter <regex>`: only targets whose name matches. */
  readonly filter: RegExp | undefined;
  /** `--runs N`: repeat each clean+incremental cycle N times, keep the best. */
  readonly runs: number;
  /** `--json`: machine-readable results on stdout. */
  readonly json: boolean;
  /** `--record`: write `results/latest.json`. */
  readonly record: boolean;
}

export const parseArgs = (argv: ReadonlyArray<string>): BenchOptions => {
  let full = false;
  let json = false;
  let record = false;
  let runs = 1;
  let filter: RegExp | undefined;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === "--full") full = true;
    else if (a === "--json") json = true;
    else if (a === "--record") record = true;
    else if (a === "--runs") runs = Number(argv[++i]);
    else if (a.startsWith("--runs=")) runs = Number(a.slice(7));
    else if (a === "--filter") filter = new RegExp(argv[++i] ?? "");
    else if (a.startsWith("--filter=")) filter = new RegExp(a.slice(9));
    else if (a === "-h" || a === "--help") {
      console.log(
        "usage: bun run.ts [--full] [--runs N] [--filter <regex>] [--json] [--record]\n" +
          "  --full     every SDK package (default: core, aws, cloudflare) + monorepo\n" +
          "  --runs N   repeat each clean+incremental cycle N times, report the best (default 1)\n" +
          "  --filter   only targets whose name matches (core|aws|cloudflare|monorepo|…)\n" +
          "  --json     print results as JSON\n" +
          "  --record   write results/latest.json (committed)",
      );
      process.exit(0);
    }
  }
  if (!Number.isInteger(runs) || runs < 1) {
    console.error(`--runs must be a positive integer, got ${runs}`);
    process.exit(2);
  }
  return { full, filter, runs, json, record };
};

//#endregion

//#region Measurement

/** `emit` = `pnpm typecheck` (noCheck true); `check` = `pnpm typecheck:ci`. */
export type Mode = "emit" | "check";
/** `clean` = outputs deleted first; `incr` = immediately after, no changes. */
export type Run = "clean" | "incr";

export interface Measurement {
  readonly target: string;
  readonly mode: Mode;
  readonly run: Run;
  /** The exact command, relative to the repo root. */
  readonly command: string;
  /** seconds, wall clock, spawn → exit */
  readonly wallSec: number;
  /** MiB, peak resident set of the tsc process */
  readonly peakRssMiB: number;
  /** seconds; tsc's own "Aggregate Check time" (0 when noCheck) */
  readonly tscCheckSec: number | undefined;
  /** seconds; tsc's own "Aggregate Emit time" */
  readonly tscEmitSec: number | undefined;
  /** tsc's "Projects built" */
  readonly projectsBuilt: number | undefined;
  readonly exitCode: number;
  readonly srcFiles: number;
  readonly srcBytes: number;
  /** Set when tsc exited non-zero; the timing is still real. */
  readonly error?: string;
}

const TSC = ["node", join(REPO_ROOT, "node_modules/typescript/bin/tsc")];

const tscArgs = (target: Target, mode: Mode): ReadonlyArray<string> => [
  "-b",
  target.tsconfig,
  ...(mode === "check" ? ["--noCheck", "false"] : []),
];

const displayCommand = (target: Target, mode: Mode): string =>
  ["tsc", ...tscArgs(target, mode)].join(" ");

const num = (stdout: string, label: string): number | undefined => {
  const m = new RegExp(`^${label}:\\s+([\\d.]+)s?$`, "m").exec(stdout);
  return m ? Number(m[1]) : undefined;
};

const maxRssMiB = (maxRSS: number): number =>
  // ru_maxrss is KiB on Linux, bytes on macOS.
  process.platform === "darwin" ? maxRSS / 1024 / 1024 : maxRSS / 1024;

export const cleanOutputs = (target: Target): void => {
  for (const out of target.outputs) {
    const p = join(REPO_ROOT, out);
    if (existsSync(p)) rmSync(p, { recursive: true, force: true });
  }
};

export const measureOnce = async (
  target: Target,
  mode: Mode,
  run: Run,
): Promise<Measurement> => {
  const proc = Bun.spawn(
    [...TSC, ...tscArgs(target, mode), "--extendedDiagnostics"],
    { cwd: REPO_ROOT, stdout: "pipe", stderr: "pipe" },
  );
  const started = performance.now();
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ]);
  const wallSec = (performance.now() - started) / 1000;
  const usage = proc.resourceUsage();
  const firstError = (stdout + stderr)
    .split("\n")
    .find((l) => /error TS\d+/.test(l));
  return {
    target: target.name,
    mode,
    run,
    command: displayCommand(target, mode),
    wallSec,
    peakRssMiB: usage ? maxRssMiB(usage.maxRSS) : 0,
    tscCheckSec: num(stdout, "Aggregate Check time"),
    tscEmitSec: num(stdout, "Aggregate Emit time"),
    projectsBuilt: num(stdout, "Projects built"),
    exitCode,
    srcFiles: target.srcFiles,
    srcBytes: target.srcBytes,
    ...(exitCode !== 0
      ? { error: firstError?.trim() ?? `tsc exited ${exitCode}` }
      : {}),
  };
};

/** Best (lowest wall) of N; RSS is the max seen so the number is a true peak. */
const best = (ms: ReadonlyArray<Measurement>): Measurement => {
  const fastest = ms.reduce((a, b) => (b.wallSec < a.wallSec ? b : a));
  return {
    ...fastest,
    peakRssMiB: Math.max(...ms.map((m) => m.peakRssMiB)),
  };
};

/**
 * One target, one mode: clean run(s) then incremental run(s). The clean run
 * deletes `target.outputs` first — for a package that is its `lib/`,
 * `tsconfig.tsbuildinfo` and `.scripts-types/`; for `monorepo` it is every
 * package's. Referenced projects (core, for every SDK) are left alone, so a
 * package row measures that package only.
 */
export const measureTarget = async (
  target: Target,
  mode: Mode,
  runs: number,
  onResult: (m: Measurement) => void,
): Promise<[Measurement, Measurement]> => {
  const cleans: Measurement[] = [];
  const incrs: Measurement[] = [];
  for (let i = 0; i < runs; i++) {
    cleanOutputs(target);
    cleans.push(await measureOnce(target, mode, "clean"));
    incrs.push(await measureOnce(target, mode, "incr"));
  }
  const result: [Measurement, Measurement] = [best(cleans), best(incrs)];
  onResult(result[0]);
  onResult(result[1]);
  return result;
};

//#endregion

//#region Table

const fmtSec = (s: number): string =>
  s >= 100 ? s.toFixed(0) : s >= 10 ? s.toFixed(1) : s.toFixed(2);
const fmtMiB = (m: number): string =>
  m >= 1024 ? `${(m / 1024).toFixed(2)} GiB` : `${m.toFixed(0)} MiB`;
const fmtBytes = (b: number): string =>
  b >= 1 << 20
    ? `${(b / (1 << 20)).toFixed(0)} MB`
    : `${(b / 1024).toFixed(0)} KB`;
const opt = (n: number | undefined, f: (n: number) => string): string =>
  n === undefined ? "-" : f(n);
const pad = (s: string, w: number, right = false): string =>
  right ? s.padStart(w) : s.padEnd(w);

export const printTable = (results: ReadonlyArray<Measurement>): void => {
  const rows = results.map((r) => ({
    target: r.target,
    mode: r.mode,
    run: r.run,
    wall: fmtSec(r.wallSec),
    rss: fmtMiB(r.peakRssMiB),
    check: opt(r.tscCheckSec, fmtSec),
    emit: opt(r.tscEmitSec, fmtSec),
    built: opt(r.projectsBuilt, String),
    src: `${r.srcFiles} files / ${fmtBytes(r.srcBytes)}`,
    note: r.error ? `!! ${r.error}` : "",
  }));
  const header = {
    target: "target",
    mode: "mode",
    run: "run",
    wall: "wall s",
    rss: "peak RSS",
    check: "tsc check s",
    emit: "tsc emit s",
    built: "projects",
    src: "src",
    note: "",
  };
  const keys = Object.keys(header) as ReadonlyArray<keyof typeof header>;
  const w = Object.fromEntries(
    keys.map((k) => [
      k,
      Math.max(header[k].length, ...rows.map((r) => r[k].length)),
    ]),
  ) as Record<keyof typeof header, number>;
  const rightAligned = new Set(["wall", "rss", "check", "emit", "built"]);
  const line = (r: typeof header) =>
    keys
      .map((k) => pad(r[k], w[k], rightAligned.has(k)))
      .join("  ")
      .trimEnd();
  console.log(line(header));
  console.log(
    keys
      .map((k) => "-".repeat(w[k]))
      .join("  ")
      .trimEnd(),
  );
  for (const r of rows) console.log(line(r));
};

//#endregion
