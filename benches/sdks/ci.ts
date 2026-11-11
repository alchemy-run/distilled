/**
 * The fast benchmark the `Benchmarks` CI job runs on every PR and every push
 * to main. Offline, like run.ts, but sized to finish before the other CI jobs:
 * a fixed panel of SDKs (ci.json) plus the SDKs the change touches, one
 * process per measurement, no official SDKs, no strict variants.
 *
 *   node benches/sdks/ci.ts run --out pr.json [--changed-since <rev>] [--extra a,b] [--wide]
 *   node benches/sdks/ci.ts report --head pr.json [--base main.json] [--image-base url] --out comment.md
 *   node benches/sdks/ci.ts image --head pr.json [--base main.json] [--history h.json] [--pr N] [--title t] --out-dir dir
 *   node benches/sdks/ci.ts history --history h.json --add main.json [--keep 40]
 *
 * Every run also records the tracked bytes of the checkout (`repoSize`), and
 * of the `--changed-since` base, from git objects alone.
 *
 * `--wide` (push to main) bundles every SDK and probes every SDK under the
 * runtime size limit, so a PR that changes any of them has a main number to
 * compare with. See README.md "CI".
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { cpus } from "node:os";
import { join, resolve } from "node:path";
import { treeSize } from "../repo-size/tree.ts";
import { BASELINES, bundle, fixtureSource } from "./src/bundle.ts";
import { renderImages } from "./src/ci-image.ts";
import { report, type CiRun, type CiProgram } from "./src/ci-report.ts";
import type { ProbeRequest } from "./src/probe.ts";
import { packSize } from "./src/size.ts";
import { loadTargets, resolveImports, type Target } from "./src/targets.ts";
import {
  BENCH_DIR,
  fmtBytes,
  fmtMs,
  lastJsonLine,
  listSdks,
  log,
  median,
  PACKAGES,
  pool,
  readJson,
  REPO,
  run,
} from "./src/util.ts";

const [command, ...rest] = process.argv.slice(2);
const flags = new Map<string, string | true>();
for (let i = 0; i < rest.length; i++) {
  const a = rest[i]!;
  if (!a.startsWith("--")) throw new Error(`unexpected argument ${a}`);
  const next = rest[i + 1];
  if (next === undefined || next.startsWith("--")) flags.set(a.slice(2), true);
  else flags.set(a.slice(2), (i++, next));
}
/**
 * Results from a fork PR's job are untrusted data: the comment workflow renders
 * them with secrets in scope. `--untrusted` keeps only plain characters in every
 * string and key, so no markdown, HTML or @mention can come through.
 */
const clean = (v: unknown): unknown => {
  const text = (s: string) => s.replace(/[^\w .:~+\-\/(),=#%]/g, "").slice(0, 300);
  if (typeof v === "string") return text(v);
  if (Array.isArray(v)) return v.map(clean);
  if (v && typeof v === "object")
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [text(k), clean(x)]));
  return typeof v === "number" || typeof v === "boolean" || v === null ? v : undefined;
};
const load = <T>(path: string): T => {
  const data = readJson<T>(resolve(path));
  return (flags.has("untrusted") ? clean(data) : data) as T;
};
const flag = (name: string): string | undefined => {
  const v = flags.get(name);
  return typeof v === "string" ? v : undefined;
};

if (command === "report") {
  const head = load<CiRun>(flag("head")!);
  const basePath = flag("base");
  const base = basePath && existsSync(basePath) ? load<CiRun>(basePath) : undefined;
  const md = report(head, base, {
    runUrl: process.env.BENCH_RUN_URL,
    imageBase: flag("image-base"),
  });
  const out = flag("out");
  if (out) writeFileSync(out, md);
  else process.stdout.write(md);
  process.exit(0);
}
if (command === "image") {
  const head = load<CiRun>(flag("head")!);
  const basePath = flag("base");
  const base = basePath && existsSync(basePath) ? load<CiRun>(basePath) : undefined;
  const historyPath = flag("history");
  const history = historyPath && existsSync(historyPath) ? load<CiRun[]>(historyPath) : [];
  const outDir = resolve(flag("out-dir") ?? ".");
  mkdirSync(outDir, { recursive: true });
  await renderImages(head, base, history, outDir, {
    pr: flag("pr"),
    title: flags.has("untrusted") ? (clean(flag("title") ?? "") as string) : flag("title"),
  });
  process.exit(0);
}
if (command === "history") {
  // Main's recent runs, oldest first, for the image's line charts. Slim: only
  // what the charts read, so the cache entry stays small.
  const file = resolve(flag("history")!);
  const history = existsSync(file) ? readJson<CiRun[]>(file) : [];
  const run = readJson<CiRun>(resolve(flag("add")!));
  const slim: CiRun = {
    ...run,
    sizes: {},
    errors: [],
    programs: Object.fromEntries(
      Object.entries(run.programs).map(([name, p]) => [
        name,
        {
          pkg: p.pkg,
          protocol: p.protocol,
          label: p.label,
          ...(p.bundle ? { bundle: { ...p.bundle, composition: undefined! } } : {}),
          ...(p.runtime ? { runtime: p.runtime } : {}),
        },
      ]),
    ),
  };
  const next = [...history.filter((r) => r.sha !== run.sha), slim].slice(
    -Number(flag("keep") ?? 40),
  );
  writeFileSync(file, `${JSON.stringify(next)}\n`);
  log(`history: ${next.length} main run(s) in ${file}`);
  process.exit(0);
}
if (command !== "run") {
  console.error(
    "usage: ci.ts run --out file [--changed-since rev] [--wide] | report --head file [--base file] [--image-base url] [--out file] | image --head file [--base file] [--history file] --out-dir dir",
  );
  process.exit(2);
}

const t0 = performance.now();
const outFile = resolve(flag("out") ?? join(BENCH_DIR, ".out", "ci.json"));
const wide = flags.has("wide");
const config = readJson<{
  runtime: string[];
  bundle: string[];
  runtimeMaxSrcMB: number;
  providers: string[];
}>(join(BENCH_DIR, "ci.json"));
const git = (...args: string[]) =>
  execFileSync("git", args, { cwd: REPO, encoding: "utf8" }).trim();

const allSdks = listSdks();
const srcMB = (pkg: string) => {
  let bytes = 0;
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else bytes += statSync(p).size;
    }
  };
  if (existsSync(join(PACKAGES, pkg, "src"))) walk(join(PACKAGES, pkg, "src"));
  return bytes / 1024 ** 2;
};
const smallEnough = (pkg: string) => srcMB(pkg) <= config.runtimeMaxSrcMB;

/** SDK packages with a changed file under packages/<pkg>/ since `rev`. */
const changedSdks = (rev: string | undefined): string[] => {
  if (!rev) return [];
  const files = git("diff", "--name-only", rev, "HEAD", "--", "packages/").split("\n");
  const pkgs = new Set(files.map((f) => f.split("/")[1]).filter((p): p is string => !!p));
  return allSdks.filter((p) => pkgs.has(p));
};

// `--extra a,b` adds SDKs as if changed: the base run of a PR uses the PR's list.
const changed = [
  ...new Set([...changedSdks(flag("changed-since")), ...(flag("extra")?.split(",") ?? [])]),
].filter((p) => allSdks.includes(p));
const bundleSdks = wide
  ? allSdks
  : [...new Set([...config.runtime, ...config.bundle, ...changed])].filter((p) =>
      allSdks.includes(p),
    );
const runtimeSdks = [
  ...new Set([
    ...config.runtime,
    ...(wide ? allSdks.filter(smallEnough) : changed.filter(smallEnough)),
  ]),
].filter((p) => allSdks.includes(p));

const targets = loadTargets();
interface Program {
  readonly name: string;
  readonly pkg: string;
  readonly target: Target;
}
const programsOf = (pkgs: string[]): Program[] =>
  pkgs.flatMap((pkg) =>
    Object.values(targets[pkg] ?? {}).map((target) => ({
      name: target.primary ? pkg : `${pkg}~${target.protocol}`,
      pkg,
      target,
    })),
  );
/**
 * Whole-SDK heap: an SDK's numbers depend only on its package, core, the build
 * scripts and the lockfile. When those git trees match the run in `--reuse`
 * (main's cached run, or the PR's run when this is the base), copy its numbers
 * instead of building the SDK, which takes minutes for aws or gcp.
 */
const inputsOf = (pkg: string) =>
  [`packages/${pkg}`, "packages/core", "scripts", "pnpm-lock.yaml"]
    .map((p) => git("rev-parse", `HEAD:${p}`))
    .join(" ");
const reuseFrom = (() => {
  const f = flag("reuse");
  return f && existsSync(f) ? readJson<CiRun>(resolve(f)) : undefined;
})();
const providers: CiRun["providers"] = {};
const providerSdks = config.providers.filter((p) => allSdks.includes(p));
const providersToMeasure = providerSdks.filter((pkg) => {
  const prev = reuseFrom?.providers?.[pkg];
  if (prev && prev.inputs === inputsOf(pkg)) {
    providers[pkg] = { ...prev, reused: true };
    return false;
  }
  return true;
});

const untargeted = [...new Set([...bundleSdks, ...runtimeSdks])].filter((p) => !targets[p]);

const timings: Record<string, number> = {};
const phase = async (name: string, fn: () => Promise<void>) => {
  const t = performance.now();
  log(`== ${name}`);
  await fn();
  timings[name] = performance.now() - t;
  log(`== ${name}: ${fmtMs(timings[name])}`);
};

const programs: Record<string, CiProgram> = {};
const entry = (p: Program) =>
  (programs[p.name] ??= { pkg: p.pkg, protocol: p.target.protocol, label: p.target.label });
const errors: string[] = [];
const cores = cpus().length;

//#region bundle (src/, no build)

const bundleBaselines: CiRun["baselines"]["bundle"] = {};
await phase("bundle", async () => {
  for (const [name, b] of Object.entries(BASELINES)) {
    const r = await bundle(`_${name}`, b.source);
    bundleBaselines[name] = { gzip: r.gzip, bytes: r.bytes };
  }
  await pool(programsOf(bundleSdks), Math.max(2, cores - 1), async (p) => {
    try {
      const r = await bundle(`ci~${p.name}`, fixtureSource(p.target), p.pkg);
      entry(p).bundle = {
        gzip: r.gzip,
        bytes: r.bytes,
        modules: r.modules,
        composition: r.composition,
      };
      log(`  ${p.name}: ${fmtBytes(r.gzip)} gzip`);
    } catch (e) {
      errors.push(`bundle ${p.name}: ${String(e).slice(0, 300)}`);
    }
  });
});

//#endregion

//#region build (only what the runtime probes and whole-SDK imports need)

await phase("build", async () => {
  const dirs = [
    "packages/core",
    ...[...new Set([...runtimeSdks, ...providersToMeasure])].map((p) => `packages/${p}`),
  ];
  // The same steps as `pnpm build`, limited to these packages.
  const steps: Array<[string, string, string[]]> = [
    ["tsrs", join(REPO, "node_modules", ".bin", "tsrs"), ["-b", ...dirs]],
    ["bundle-lib", "node", [join(REPO, "scripts", "bundle-lib.ts"), ...dirs.slice(1)]],
    ["strip-lib-docs", "node", [join(REPO, "scripts", "strip-lib-docs.ts"), ...dirs]],
  ];
  for (const [name, cmd, args] of steps) {
    const t = performance.now();
    const r = await run(cmd, args, { cwd: REPO });
    timings[`build: ${name}`] = performance.now() - t;
    if (r.code !== 0) {
      console.error(r.stdout.slice(-4000), r.stderr.slice(-4000));
      throw new Error(`build step failed: ${cmd} ${args.join(" ")}`);
    }
  }
});

//#endregion

//#region size (npm pack of what was built)

const sizes: CiRun["sizes"] = {};
await phase("size", async () => {
  await pool(["core", ...runtimeSdks], Math.max(2, cores / 2), async (pkg) => {
    try {
      const s = await packSize(join(PACKAGES, pkg));
      sizes[pkg] = { tarball: s.tarball, unpacked: s.unpacked, files: s.files };
    } catch (e) {
      errors.push(`size ${pkg}: ${String(e).slice(0, 300)}`);
    }
  });
});

//#endregion

//#region runtime (lib/, one fresh process per measurement)

const PROBE = join(BENCH_DIR, "src", "probe.ts");
const probe = async (req: ProbeRequest): Promise<any> => {
  const res = await run("node", ["--expose-gc", PROBE, JSON.stringify(req)], {
    timeoutMs: 120_000,
  });
  return (
    lastJsonLine<any>(res.stdout) ?? {
      fatal: `probe crashed (exit ${res.code}): ${res.stderr.trim().split("\n").slice(-2).join(" | ").slice(0, 300)}`,
    }
  );
};
const BUDGET_MS = Number(flag("budget") ?? 400);
const REPEATS = Number(flag("repeats") ?? 3);
let runtimeBaseline: CiRun["baselines"]["runtime"];

await phase("runtime", async () => {
  const b = await probe({ mode: "baseline", imports: [], budgetMs: BUDGET_MS });
  runtimeBaseline = {
    effectImportMs: b.effectImportMs,
    effectHeap: b.effectHeap?.heapUsed,
    mockRoundtripP50Us: b.mockRoundtrip?.p50Us,
  };
  // Parallel probes inflate cold-start timings, so keep a few cores idle.
  await pool(programsOf(runtimeSdks), Math.max(1, Math.floor(cores / 3)), async (p) => {
    const req: ProbeRequest = {
      mode: "op",
      imports: resolveImports(p.target),
      auth: p.target.auth,
      call: p.target.call,
      env: p.target.env,
      response: p.target.response,
      budgetMs: BUDGET_MS,
    };
    const runs: any[] = [];
    for (let i = 0; i < REPEATS; i++) runs.push(await probe(req));
    const ok = runs.filter((r) => !r.fatal && !r.error);
    if (ok.length === 0) {
      errors.push(`runtime ${p.name}: ${runs[0].fatal ?? runs[0].error}`);
      return;
    }
    // Timings: the fastest run is the least disturbed one. Heap: the median,
    // because a run where V8 flushed bytecode early reads far lower.
    const min = (f: (r: any) => number) => Math.min(...ok.map(f));
    const mid = (f: (r: any) => number) => median(ok.map(f));
    const counted = await probe({ ...req, objects: true });
    // Added latency is a difference, so take the fastest run of each side:
    // the min of the differences would keep the run whose roundtrip was hit
    // hardest by runner noise, and read low or even negative.
    const pairedP50Us = min((r) => r.pairedLatency.p50Us);
    const roundtripP50Us = min((r) => r.baselineLatency.p50Us);
    entry(p).runtime = {
      importMs: min((r) => r.importMs),
      importHeap: mid((r) => r.importHeap.heapUsed),
      importObjects: counted.importObjects,
      firstCallMs: min((r) => r.firstCallMs),
      firstCallHeap: mid((r) => r.firstCallHeap.heapUsed),
      addedP50Us: pairedP50Us - roundtripP50Us,
      roundtripP50Us,
      p50Us: min((r) => r.latency.p50Us),
      gcPer1k: min((r) => r.gcPer1k),
      maxRss: mid((r) => r.maxRss),
    };
    const r = entry(p).runtime!;
    log(
      `  ${p.name}: +${r.addedP50Us.toFixed(1)} µs, import ${fmtMs(r.importMs)}, heap ${fmtBytes(r.importHeap)}`,
    );
  });
});

//#endregion

//#region whole-SDK heap (every service module of aws, cloudflare, gcp)

await phase("providers", async () => {
  for (const pkg of providersToMeasure) {
    const dir = join(PACKAGES, pkg, "lib", "services");
    const services = existsSync(dir)
      ? readdirSync(dir).filter((f) => f.endsWith(".js") && f !== "index.js")
      : [];
    if (!services.length) {
      errors.push(`providers ${pkg}: no lib/services`);
      continue;
    }
    const imports = services.map((f, i) => ({ alias: `S${i}`, lib: join(dir, f), src: "" }));
    const runs: any[] = [];
    for (let i = 0; i < REPEATS; i++) runs.push(await probe({ mode: "barrel", imports }));
    const ok = runs.filter((r) => !r.fatal);
    if (!ok.length) {
      errors.push(`providers ${pkg}: ${runs[0].fatal}`);
      continue;
    }
    const counted = await probe({ mode: "barrel", objects: true, imports });
    providers[pkg] = {
      services: services.length,
      heap: median(ok.map((r) => r.heap.heapUsed)),
      objects: counted.objects,
      importMs: Math.min(...ok.map((r) => r.importMs)),
      inputs: inputsOf(pkg),
    };
    log(`  ${pkg}: ${services.length} services, heap ${fmtBytes(providers[pkg]!.heap)}`);
  }
  for (const pkg of providerSdks.filter((p) => providers[p]?.reused))
    log(`  ${pkg}: unchanged, reused ${fmtBytes(providers[pkg]!.heap)}`);
});

//#endregion

const sha = (() => {
  // On a PR, actions/checkout checks out the merge commit; its second parent is the PR head.
  const head = process.env.BENCH_HEAD_SHA;
  return head || git("rev-parse", "HEAD");
})();

const result: CiRun = {
  version: 1,
  sha,
  ref: process.env.GITHUB_REF ?? git("rev-parse", "--abbrev-ref", "HEAD"),
  createdAt: new Date().toISOString(),
  ...(process.env.BENCH_SOURCE ? { source: process.env.BENCH_SOURCE } : {}),
  durationMs: performance.now() - t0,
  timings,
  env: { node: process.version, cpus: cores, cpu: cpus()[0]?.model ?? "?" },
  scope: { wide, changed, bundle: bundleSdks, runtime: runtimeSdks, untargeted },
  baselines: { bundle: bundleBaselines, runtime: runtimeBaseline! },
  sizes,
  programs,
  providers,
  // Tracked bytes by kind of file, here and at the base: no build, git objects only.
  repoSize: {
    head: treeSize("HEAD", REPO),
    ...(flag("changed-since") ? { base: treeSize(flag("changed-since")!, REPO) } : {}),
  },
  errors,
};
writeFileSync(outFile, `${JSON.stringify(result, null, 2)}\n`);
log(
  `wrote ${outFile} in ${fmtMs(result.durationMs)}${errors.length ? `, ${errors.length} error(s)` : ""}`,
);
// Errors go in the report; the job itself only fails when a step above throws.
for (const e of errors) log(`  ${e}`);
