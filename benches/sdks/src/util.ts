/**
 * Shared paths, the SDK package list, a small worker pool, and child-process
 * helpers. Nothing here touches the network.
 */
import { spawn } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

export const BENCH_DIR = join(import.meta.dirname, "..");
export const REPO = join(BENCH_DIR, "..", "..");
export const PACKAGES = join(REPO, "packages");
export const OUT = join(BENCH_DIR, ".out");

/**
 * Where effect keeps its HTTP client modules: `effect/http/*` today,
 * `effect/unstable/http/*` in the 4.0 release candidates older commits use.
 */
export const EFFECT_HTTP = (() => {
  try {
    createRequire(join(BENCH_DIR, "package.json")).resolve("effect/http/HttpClient");
    return "effect/http";
  } catch {
    return "effect/unstable/http";
  }
})();

/** Every SDK package (everything under packages/ except core). */
export const listSdks = (): string[] =>
  readdirSync(PACKAGES)
    .filter((name) => name !== "core" && existsSync(join(PACKAGES, name, "package.json")))
    .sort();

export const readJson = <T = any>(path: string): T => JSON.parse(readFileSync(path, "utf8")) as T;

export const packageVersion = (pkg: string): string =>
  readJson(join(PACKAGES, pkg, "package.json")).version;

/** Run `fn` over `items` with at most `jobs` in flight; results keep input order. */
export const pool = async <T, R>(
  items: ReadonlyArray<T>,
  jobs: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> => {
  const results: R[] = [];
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]!, i);
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, Math.min(jobs, items.length)) }, worker));
  return results;
};

export interface ChildResult {
  readonly code: number | null;
  readonly stdout: string;
  readonly stderr: string;
  readonly wallMs: number;
  /** Highest RSS seen while sampling /proc/<pid>/status (VmHWM), bytes. */
  readonly peakRss: number;
}

const readHwm = (pid: number): number => {
  try {
    const status = readFileSync(`/proc/${pid}/status`, "utf8");
    const m = /VmHWM:\s+(\d+) kB/.exec(status);
    return m ? Number(m[1]) * 1024 : 0;
  } catch {
    return 0;
  }
};

/** Spawn a child, capture output, sample its peak RSS. */
export const run = (
  cmd: string,
  args: ReadonlyArray<string>,
  opts: { cwd?: string; env?: NodeJS.ProcessEnv; timeoutMs?: number } = {},
): Promise<ChildResult> =>
  new Promise((resolve) => {
    const t0 = performance.now();
    const { FORCE_COLOR: _, ...parentEnv } = process.env;
    const child = spawn(cmd, args, {
      cwd: opts.cwd ?? REPO,
      env: { ...parentEnv, NO_COLOR: "1", ...opts.env },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let peakRss = 0;
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    const sampler = setInterval(() => {
      if (child.pid) peakRss = Math.max(peakRss, readHwm(child.pid));
    }, 25);
    const timer = opts.timeoutMs
      ? setTimeout(() => child.kill("SIGKILL"), opts.timeoutMs)
      : undefined;
    child.on("close", (code) => {
      clearInterval(sampler);
      if (timer) clearTimeout(timer);
      resolve({ code, stdout, stderr, wallMs: performance.now() - t0, peakRss });
    });
  });

/** Last JSON line a child printed on stdout. */
export const lastJsonLine = <T>(stdout: string): T | undefined => {
  const lines = stdout.trim().split("\n").reverse();
  for (const line of lines) {
    if (line.startsWith("{")) {
      try {
        return JSON.parse(line) as T;
      } catch {}
    }
  }
  return undefined;
};

export const median = (xs: ReadonlyArray<number>): number => quantile(xs, 0.5);

export const quantile = (xs: ReadonlyArray<number>, q: number): number => {
  if (xs.length === 0) return NaN;
  const sorted = [...xs].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.round(q * (sorted.length - 1))));
  return sorted[idx]!;
};

export const fmtBytes = (n: number | undefined): string => {
  if (n === undefined || !Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs < 1024) return `${n} B`;
  if (abs < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (abs < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
};

export const fmtMs = (n: number | undefined): string =>
  n === undefined || !Number.isFinite(n)
    ? "—"
    : n < 1
      ? `${(n * 1000).toFixed(1)} µs`
      : `${n.toFixed(1)} ms`;

export const log = (msg: string) => process.stderr.write(`${msg}\n`);
