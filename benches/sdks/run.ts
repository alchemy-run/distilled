import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { cpus, totalmem } from "node:os";
import { join, resolve } from "node:path";
import { BASELINES, bundle, fixtureSource } from "./src/bundle.ts";
import { discoverMissing } from "./src/discover.ts";
import { METRICS } from "./src/metrics.ts";
/**
 * Per-SDK benchmarks across every distilled package. Offline.
 *
 *   node benches/sdks/run.ts                       everything, every SDK
 *   node benches/sdks/run.ts --only aws,resend     some SDKs
 *   node benches/sdks/run.ts --suites size,bundle  some suites (size,bundle,runtime,imports,typecheck)
 *   node benches/sdks/run.ts --history ~/bench/runs  also copy the run file there
 *   node benches/sdks/run.ts --rediscover          re-pick non-pinned targets
 *
 * Writes `.out/latest.json` (and `<history>/<timestamp>-<sha>.json`). See README.md.
 */
import { runOfficial } from "./src/official-run.ts";
import type { ProbeRequest } from "./src/probe.ts";
import { effectSize, packSize, sizeOf } from "./src/size.ts";
import {
  listOperations,
  loadTargets,
  primaryOf,
  protocolsOf,
  resolveImports,
  saveTargets,
  type Target,
} from "./src/targets.ts";
import { BASELINE_TYPECHECK, typecheck, typecheckSource } from "./src/typecheck.ts";
import {
  BENCH_DIR,
  fmtBytes,
  fmtMs,
  lastJsonLine,
  listSdks,
  log,
  OUT,
  PACKAGES,
  packageVersion,
  pool,
  readJson,
  REPO,
  run,
} from "./src/util.ts";

type Suite = "size" | "bundle" | "runtime" | "imports" | "typecheck" | "official";
const ALL_SUITES: Suite[] = ["size", "bundle", "runtime", "imports", "typecheck", "official"];

const parseArgs = (argv: string[]) => {
  const opts = {
    only: undefined as string[] | undefined,
    suites: ALL_SUITES,
    jobs: Math.max(2, Math.min(8, cpus().length / 2)),
    runtimeJobs: 4,
    budgetMs: 1500,
    out: join(OUT, "latest.json"),
    history: process.env.DISTILLED_BENCH_HISTORY as string | undefined,
    rediscover: false,
    build: false,
    note: undefined as string | undefined,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    const next = () => argv[++i]!;
    if (a === "--") continue;
    else if (a === "--only") opts.only = next().split(",");
    else if (a === "--suites") opts.suites = next().split(",") as Suite[];
    else if (a === "--jobs") opts.jobs = Number(next());
    else if (a === "--runtime-jobs") opts.runtimeJobs = Number(next());
    else if (a === "--budget") opts.budgetMs = Number(next());
    else if (a === "--out") opts.out = resolve(next());
    else if (a === "--history") opts.history = resolve(next());
    else if (a === "--note") opts.note = next();
    else if (a === "--rediscover") opts.rediscover = true;
    else if (a === "--build") opts.build = true;
    else if (a === "-h" || a === "--help") {
      console.log(readJson(join(BENCH_DIR, "package.json")).description);
      console.log(
        "flags: --only a,b --suites size,bundle,runtime,imports,typecheck --jobs N --runtime-jobs N --budget ms --out file --history dir --note text --rediscover --build",
      );
      process.exit(0);
    } else throw new Error(`unknown flag ${a}`);
  }
  return opts;
};

const opts = parseArgs(process.argv.slice(2));
const started = new Date();
const t0 = performance.now();
const has = (s: Suite) => opts.suites.includes(s);
const sdks = listSdks().filter((p) => !opts.only || opts.only.includes(p));

const git = (...args: string[]) => {
  try {
    return execFileSync("git", args, { cwd: REPO, encoding: "utf8" }).trim();
  } catch {
    return "";
  }
};

//#region lib/ build

const missingLib = [...sdks, "core"].filter(
  (p) => !existsSync(join(PACKAGES, p, "lib", "index.js")),
);
if (opts.build || missingLib.length > 0) {
  log(
    `build: tsrs -b (${missingLib.length ? `lib/ missing for ${missingLib.slice(0, 5).join(", ")}…` : "--build"})`,
  );
  const res = await run(join(REPO, "node_modules", ".bin", "tsrs"), ["-b"], { cwd: REPO });
  if (res.code !== 0) {
    console.error(res.stdout.slice(-4000), res.stderr.slice(-4000));
    process.exit(1);
  }
  // Same post-build steps `pnpm build` runs, when this checkout has them.
  for (const step of ["bundle-lib.ts", "strip-lib-docs.ts"]) {
    if (!existsSync(join(REPO, "scripts", step))) continue;
    const r = await run("node", [join(REPO, "scripts", step)], { cwd: REPO });
    if (r.code !== 0) {
      console.error(`${step} failed`, r.stdout.slice(-4000), r.stderr.slice(-4000));
      process.exit(1);
    }
  }
}

//#endregion

//#region Targets

const targets = loadTargets();
const discoverErrors = await discoverMissing(sdks, targets, {
  rediscover: opts.rediscover,
  jobs: opts.jobs,
});
saveTargets(targets);

//#endregion

const PROBE = join(BENCH_DIR, "src", "probe.ts");
const probe = async (req: ProbeRequest): Promise<any> => {
  const res = await run("node", ["--expose-gc", PROBE, JSON.stringify(req)], {
    timeoutMs: 600_000,
  });
  const out = lastJsonLine<any>(res.stdout);
  if (!out)
    return {
      fatal: `probe crashed (exit ${res.code}): ${res.stderr.trim().split("\n").slice(-3).join(" | ").slice(0, 400)}`,
    };
  return out;
};

/**
 * One program per (SDK, protocol). The primary program's results are also
 * stored at the SDK level (`record[pkg].bundle`, `.runtime`, `.typecheck`),
 * which is what the SDK-level metrics and their history read.
 */
interface Program {
  readonly pkg: string;
  readonly protocol: string;
  readonly target: Target;
  readonly primary: boolean;
  /** Unique fixture name for bundle/typecheck output dirs. */
  readonly name: string;
}

const programs: Program[] = sdks.flatMap((pkg) =>
  Object.values(targets[pkg] ?? {}).map((target) => ({
    pkg,
    protocol: target.protocol,
    target,
    primary: !!target.primary,
    name: target.primary ? pkg : `${pkg}~${target.protocol}`,
  })),
);

const opsByProtocol = (pkg: string) => Object.fromEntries(protocolsOf(listOperations(pkg)));

const record: Record<string, any> = {};
for (const pkg of sdks) {
  const primary = primaryOf(targets[pkg]);
  const counts = opsByProtocol(pkg);
  const protocolNames = [...new Set([...Object.keys(targets[pkg] ?? {}), ...Object.keys(counts)])];
  record[pkg] = {
    version: packageVersion(pkg),
    target: primary
      ? {
          label: primary.label,
          auth: primary.auth,
          call: primary.call,
          pinned: !!primary.pinned,
          protocol: primary.protocol,
        }
      : undefined,
    protocolCount: protocolNames.length,
    programs: Object.fromEntries(
      protocolNames.map((protocol) => {
        const t = targets[pkg]?.[protocol];
        return [
          protocol,
          {
            primary: !!t?.primary,
            operations: counts[protocol] ?? 0,
            target: t ? { label: t.label, call: t.call, pinned: !!t.pinned } : undefined,
            errors: discoverErrors[pkg]?.[protocol]
              ? { discover: discoverErrors[pkg][protocol] }
              : {},
          },
        ];
      }),
    ),
    errors: {} as Record<string, string>,
  };
  for (const [protocol, msg] of Object.entries(discoverErrors[pkg] ?? {}))
    record[pkg].errors[
      primary?.protocol === protocol || !primary ? "discover" : `discover [${protocol}]`
    ] = msg;
}
const fail = (pkg: string, suite: string, msg: string, protocol?: string) => {
  const r = record[pkg];
  const isPrimary = !protocol || r.programs[protocol]?.primary;
  if (protocol && r.programs[protocol]) r.programs[protocol].errors[suite] = msg;
  r.errors[isPrimary ? suite : `${suite} [${protocol}]`] = msg;
  log(`  ${pkg}${protocol && !isPrimary ? ` [${protocol}]` : ""} ${suite}: ERROR ${msg}`);
};
/** Store a program's result for `suite`; the primary program's result is the SDK's. */
const put = (p: Program, suite: string, value: unknown) => {
  record[p.pkg].programs[p.protocol][suite] = value;
  if (p.primary) record[p.pkg][suite] = value;
};
const tag = (p: Program) => (p.primary ? p.pkg : `${p.pkg} [${p.protocol}]`);

const STRICT_CORE = join(PACKAGES, "core", "lib", "response-validation.js");

/**
 * The program with strict response validation: the call runs under
 * `ResponseValidation.strict`, and the validation module is one of its
 * imports, so import heap, first call and bundle include what strict costs.
 */
const strictTarget = (target: Target): Target => ({
  ...target,
  imports: { ...target.imports, RV: "core:response-validation" },
  call: `(${target.call}).pipe(Effect.provide(RV.strict))`,
  response: target.strictResponse ?? target.response,
});
const hasStrict = existsSync(STRICT_CORE);

const baselines: Record<string, any> = {};
const timings: Record<string, number> = {};
const phase = async (name: string, fn: () => Promise<void>) => {
  const t = performance.now();
  log(`\n== ${name}`);
  await fn();
  timings[name] = performance.now() - t;
  log(`== ${name} done in ${fmtMs(timings[name])}`);
};

//#region size

if (has("size")) {
  await phase("size", async () => {
    const core = await packSize(join(PACKAGES, "core"));
    const effect = effectSize();
    baselines.size = { core, effect };
    await pool(sdks, opts.jobs, async (pkg) => {
      try {
        const s = await sizeOf(pkg);
        record[pkg].size = {
          ...s,
          installBytes: s.unpacked + core.unpacked + effect.unpacked,
          tarballWithCore: s.tarball + core.tarball,
          bytesPerOp: s.operations ? Math.round(s.tarball / s.operations) : undefined,
        };
        log(
          `  ${pkg}: ${fmtBytes(s.tarball)} tarball, ${fmtBytes(s.unpacked)} unpacked, ${s.operations} ops`,
        );
      } catch (e) {
        fail(pkg, "size", String(e));
      }
    });
  });
}

//#endregion

//#region bundle

if (has("bundle")) {
  await phase("bundle", async () => {
    baselines.bundle = {};
    for (const [name, b] of Object.entries(BASELINES)) {
      baselines.bundle[name] = {
        ...(await bundle(`_${name}`, b.source)),
        description: b.description,
      };
      log(`  baseline ${name}: ${fmtBytes(baselines.bundle[name].gzip)} gzip`);
    }
    const ref = baselines.bundle["effect-http"];
    await pool(programs, opts.jobs, async (p) => {
      try {
        const r = await bundle(p.name, fixtureSource(p.target), p.pkg);
        put(p, "bundle", {
          ...r,
          overheadGzip: r.gzip - ref.gzip,
          overheadBytes: r.bytes - ref.bytes,
        });
        log(
          `  ${tag(p)}: ${fmtBytes(r.gzip)} gzip (+${fmtBytes(r.gzip - ref.gzip)} over effect-http)`,
        );
      } catch (e) {
        fail(p.pkg, "bundle", String(e).slice(0, 400), p.protocol);
      }
      if (!hasStrict) return;
      try {
        const r = await bundle(`${p.name}~strict`, fixtureSource(strictTarget(p.target)), p.pkg);
        put(p, "strictBundle", {
          ...r,
          overheadGzip: r.gzip - ref.gzip,
          overheadBytes: r.bytes - ref.bytes,
        });
      } catch (e) {
        fail(p.pkg, "bundle-strict", String(e).slice(0, 400), p.protocol);
      }
    });
  });
}

//#endregion

//#region runtime + memory

const opRequest = (target: Target): ProbeRequest => ({
  mode: "op",
  imports: resolveImports(target),
  auth: target.auth,
  call: target.call,
  env: target.env,
  response: target.response,
  budgetMs: opts.budgetMs,
  // Older checkouts have no ResponseValidation; the strict series is skipped there.
  strictCore: existsSync(STRICT_CORE) ? STRICT_CORE : undefined,
});

const rootImport = (pkg: string) => ({
  alias: "Barrel",
  lib: join(PACKAGES, pkg, "lib", "index.js"),
  src: "",
});

if (has("runtime")) {
  await phase("runtime", async () => {
    baselines.runtime = await probe({ mode: "baseline", imports: [], budgetMs: opts.budgetMs });
    log(
      `  baseline: effect import ${fmtMs(baselines.runtime.effectImportMs)}, mock roundtrip p50 ${baselines.runtime.mockRoundtrip?.p50Us?.toFixed(1)} µs`,
    );
    // Strict programs need a schema-valid response: find one where the
    // lenient response fails strict validation, and freeze it in targets.json.
    if (hasStrict) {
      let found = 0;
      await pool(programs, opts.runtimeJobs, async (p) => {
        if (p.target.strictResponse) return;
        const plain = await probe({
          ...opRequest(strictTarget(p.target)),
          strictCore: undefined,
          budgetMs: 1,
        });
        if (!plain.error && !plain.fatal) return;
        const r = await probe({ ...opRequest(p.target), mode: "strictBody" } as ProbeRequest);
        if (r.ok) {
          const t = { ...p.target, strictResponse: r.response };
          targets[p.pkg]![p.protocol] = t;
          (p as { target: Target }).target = t;
          found++;
        } else log(`  ${tag(p)}: no strict-valid response (${String(r.error).slice(0, 120)})`);
      });
      if (found) {
        saveTargets(targets);
        log(`  strict: found schema-valid responses for ${found} program(s)`);
      }
    }
    const coldPrograms: typeof programs = [];
    await pool(programs, opts.runtimeJobs, async (p) => {
      const op = await probe(opRequest(p.target));
      if (op.fatal || op.error) fail(p.pkg, "runtime", op.fatal ?? op.error, p.protocol);
      // Object counts come from a separate process: counting changes the heap numbers.
      const counted = await probe({ ...opRequest(p.target), objects: true });
      op.importObjects = counted.importObjects;
      op.firstCallObjects = counted.firstCallObjects;
      put(p, "runtime", op);
      if (hasStrict) {
        const sReq = { ...opRequest(strictTarget(p.target)), strictCore: undefined };
        const sop = await probe(sReq);
        if (sop.fatal || sop.error)
          fail(p.pkg, "runtime-strict", sop.fatal ?? sop.error, p.protocol);
        const sCounted = await probe({ ...sReq, objects: true });
        sop.importObjects = sCounted.importObjects;
        sop.firstCallObjects = sCounted.firstCallObjects;
        put(p, "strictRuntime", sop);
      }
      coldPrograms.push(p);
      let barrel: any;
      // The package root import does not depend on the protocol: once per SDK.
      if (p.primary) {
        barrel = await probe({ mode: "barrel", imports: [rootImport(p.pkg)] });
        if (barrel.fatal) fail(p.pkg, "barrel", barrel.fatal);
        else
          barrel.objects = (
            await probe({ mode: "barrel", objects: true, imports: [rootImport(p.pkg)] })
          ).objects;
        record[p.pkg].barrel = barrel;
      }
      if (!op.error && !op.fatal)
        log(
          `  ${tag(p)}: +${op.addedP50Us?.toFixed(1)} µs/call, import ${fmtMs(op.importMs)}, heap ${fmtBytes(op.importHeap?.heapUsed)}${barrel ? `; root ${fmtMs(barrel.importMs)} ${fmtBytes(barrel.heap?.heapUsed)}` : ""}`,
        );
    });

    // Cold-start timings (import time, first call) depend on CPU contention:
    // the parallel probes above inflated them up to ~3x. Re-measure them one
    // program at a time, median of 3 fresh processes, normal and strict.
    log("runtime: cold-start pass (sequential)");
    const median3 = (xs: number[]) => [...xs].sort((a, b) => a - b)[1]!;
    for (const p of coldPrograms) {
      for (const [suite, req] of [
        ["runtime", opRequest(p.target)],
        ...(hasStrict
          ? [["strictRuntime", { ...opRequest(strictTarget(p.target)), strictCore: undefined }]]
          : []),
      ] as Array<[string, ProbeRequest]>) {
        const rec = record[p.pkg].programs[p.protocol]?.[suite];
        if (!rec || rec.error || rec.fatal) continue;
        const runs: any[] = [];
        for (let i = 0; i < 3; i++) runs.push(await probe({ ...req, firstOnly: true }));
        const ok = runs.filter((r) => !r.error && !r.fatal && Number.isFinite(r.firstCallMs));
        if (ok.length < 3) continue;
        rec.firstCallMs = median3(ok.map((r) => r.firstCallMs));
        rec.importMs = median3(ok.map((r) => r.importMs));
        // Import heap dips ~250 KB at random (GC timing around the snapshots),
        // in either mode: take the median of the cold-start runs and this run.
        const heaps = [rec.importHeap?.heapUsed, ...ok.map((r) => r.importHeap?.heapUsed)].filter(
          Number.isFinite,
        ) as number[];
        if (heaps.length >= 3 && rec.importHeap)
          rec.importHeap.heapUsed = [...heaps].sort((a, b) => a - b)[heaps.length >> 1]!;
        rec.coldStartPass = true;
      }
    }
  });
}

//#endregion

//#region imports

/** Service modules a provider publishes: lib/services/<name>.js. */
const servicesOf = (pkg: string): string[] => {
  const dir = join(PACKAGES, pkg, "lib", "services");
  if (!existsSync(dir)) return [];
  return (
    readdirSync(dir)
      // services/index.js (where present) re-exports the others.
      .filter((f) => f.endsWith(".js") && f !== "index.js")
      .map((f) => f.slice(0, -3))
      .sort()
  );
};
const serviceImport = (pkg: string, service: string, alias = "Barrel") => ({
  alias,
  lib: join(PACKAGES, pkg, "lib", "services", `${service}.js`),
  src: "",
});

const IMPORT_RUNS = 3;

if (has("imports")) {
  await phase("imports", async () => {
    // Each provider/service pair: a fresh process (effect preloaded) imports that one module.
    // Time and heap only; objects are counted per provider below.
    const pairs = sdks.flatMap((pkg) => servicesOf(pkg).map((service) => ({ pkg, service })));
    log(`  ${pairs.length} service modules in ${sdks.length} SDKs`);
    for (const pkg of sdks) record[pkg].services = {};
    // Import time is one cold measurement and very sensitive to machine load
    // (a busy machine once showed a fake +30%): take the minimum over
    // IMPORT_RUNS fresh processes. Heap is deterministic; it comes from the first.
    await pool(pairs, opts.runtimeJobs, async ({ pkg, service }) => {
      const runs: any[] = [];
      for (let i = 0; i < IMPORT_RUNS; i++) {
        const r = await probe({ mode: "barrel", imports: [serviceImport(pkg, service)] });
        if (r.fatal) {
          fail(pkg, "imports", `${service}: ${r.fatal}`);
          return;
        }
        runs.push(r);
      }
      record[pkg].services[service] = {
        importMs: Math.min(...runs.map((r) => r.importMs)),
        heap: runs[0].heap?.heapUsed,
      };
    });
    // Each provider: one fresh process imports every service module it publishes.
    await pool(sdks, opts.runtimeJobs, async (pkg) => {
      const services = servicesOf(pkg);
      if (!services.length) return;
      const imports = services.map((service, i) => serviceImport(pkg, service, `S${i}`));
      const r = await probe({ mode: "barrel", imports });
      // Minimum import time over IMPORT_RUNS fresh processes (see above).
      for (let i = 1; i < IMPORT_RUNS && !r.fatal; i++) {
        const again = await probe({ mode: "barrel", imports });
        if (!again.fatal) r.importMs = Math.min(r.importMs, again.importMs);
      }
      if (r.fatal) {
        fail(pkg, "imports", `all services: ${r.fatal}`);
        return;
      }
      const counted = await probe({ mode: "barrel", objects: true, imports });
      const times = Object.values(record[pkg].services as Record<string, { importMs: number }>)
        .map((x) => x.importMs)
        .sort((a, b) => a - b);
      record[pkg].provider = {
        services: services.length,
        importMs: r.importMs,
        heap: r.heap?.heapUsed,
        objects: counted.objects,
        maxRss: r.maxRss,
        serviceImportMedianMs: times.length ? times[Math.floor(times.length / 2)] : undefined,
        serviceImportMaxMs: times.at(-1),
      };
      log(
        `  ${pkg}: ${services.length} services, all ${fmtMs(r.importMs)}, heap ${fmtBytes(r.heap?.heapUsed)}, ${counted.objects} objects`,
      );
    });
  });
}

//#endregion

//#region typecheck

if (has("typecheck")) {
  await phase("typecheck", async () => {
    baselines.typecheck = await typecheckSource("_effect-minimal", BASELINE_TYPECHECK);
    log(`  baseline effect-minimal: ${fmtMs(baselines.typecheck.wallMs)}`);
    await pool(programs, Math.max(1, Math.floor(opts.jobs / 2)), async (p) => {
      try {
        const r = await typecheck(p.target, p.name);
        put(p, "typecheck", r);
        if (r.errors) fail(p.pkg, "typecheck", r.firstError ?? `${r.errors} errors`, p.protocol);
        log(`  ${tag(p)}: ${fmtMs(r.wallMs)}, ${fmtBytes(r.peakRss)} RSS, ${r.types ?? "?"} types`);
      } catch (e) {
        fail(p.pkg, "typecheck", String(e), p.protocol);
      }
    });
  });
}

//#endregion

//#region Output

// Official SDKs (AWS SDK v3, cloudflare, @google-cloud/storage) on the same calls.
let official: Record<string, unknown> | undefined;
if (opts.suites.includes("official")) {
  log("official SDKs");
  official = await runOfficial({ budgetMs: opts.budgetMs, log });
}

const sum = (f: (r: any) => number | undefined) =>
  Object.values(record).reduce((s, r) => s + (f(r) ?? 0), 0);
const medianOf = (f: (r: any) => number | undefined) => {
  const xs = Object.values(record)
    .map(f)
    .filter((x): x is number => typeof x === "number" && Number.isFinite(x))
    .sort((a, b) => a - b);
  return xs.length ? xs[Math.floor(xs.length / 2)] : undefined;
};

const hashTargets = (t: typeof targets) =>
  createHash("sha256").update(JSON.stringify(t)).digest("hex").slice(0, 12);

const sha = git("rev-parse", "HEAD");
const runFile = {
  schema: 1,
  id: `${started.toISOString().replace(/[:.]/g, "-")}-${sha.slice(0, 9)}`,
  startedAt: started.toISOString(),
  durationMs: Math.round(performance.now() - t0),
  note: opts.note,
  suites: opts.suites,
  ...(official ? { official } : {}),
  partial: !!opts.only,
  git: {
    sha,
    branch: git("rev-parse", "--abbrev-ref", "HEAD"),
    subject: git("log", "-1", "--format=%s"),
    committedAt: git("log", "-1", "--format=%cI"),
    dirty: git("status", "--porcelain", "--", "packages").length > 0,
  },
  env: {
    node: process.version,
    platform: `${process.platform}-${process.arch}`,
    cpu: cpus()[0]?.model,
    cores: cpus().length,
    memory: totalmem(),
    effect: readJson(join(BENCH_DIR, "node_modules", "effect", "package.json")).version,
    rolldown: readJson(join(BENCH_DIR, "node_modules", "rolldown", "package.json")).version,
    typescript: readJson(join(BENCH_DIR, "node_modules", "typescript", "package.json")).version,
    runtimeJobs: opts.runtimeJobs,
    budgetMs: opts.budgetMs,
  },
  /** Fingerprint of the benchmark programs: runs with different values measured different code. */
  bench: { targets: hashTargets(targets) },
  timings,
  metrics: METRICS,
  baselines,
  summary: {
    sdks: sdks.length,
    errors: Object.values(record).filter((r) => Object.keys(r.errors).length > 0).length,
    totalTarball: sum((r) => r.size?.tarball),
    totalUnpacked: sum((r) => r.size?.unpacked),
    totalOperations: sum((r) => r.size?.operations),
    medianBundleGzip: medianOf((r) => r.bundle?.gzip),
    medianOverheadGzip: medianOf((r) => r.bundle?.overheadGzip),
    medianAddedP50Us: medianOf((r) => r.runtime?.addedP50Us),
    medianImportOpMs: medianOf((r) => r.runtime?.importMs),
    medianImportHeap: medianOf((r) => r.runtime?.importHeap?.heapUsed),
    medianTypecheckMs: medianOf((r) => r.typecheck?.wallMs),
    medianImportObjects: medianOf((r) => r.runtime?.importObjects),
    totalProviderHeap: sum((r) => r.provider?.heap),
    totalProviderObjects: sum((r) => r.provider?.objects),
    services: sum((r) => (r.services ? Object.keys(r.services).length : undefined)),
    protocols: sum((r) => r.protocolCount),
    programs: programs.length,
    programErrors: programs.filter(
      (p) => Object.keys(record[p.pkg].programs[p.protocol]?.errors ?? {}).length > 0,
    ).length,
  },
  sdks: record,
};

mkdirSync(join(OUT), { recursive: true });
writeFileSync(opts.out, `${JSON.stringify(runFile, null, 1)}\n`);
log(`\nwrote ${opts.out}`);
if (opts.history) {
  mkdirSync(opts.history, { recursive: true });
  const dest = join(opts.history, `${runFile.id}.json`);
  copyFileSync(opts.out, dest);
  log(`copied to ${dest}`);
}
const s = runFile.summary;
log(
  `\n${s.sdks} SDKs, ${s.errors} with errors, ${fmtMs(runFile.durationMs)}\n` +
    `  ${s.programs} programs over ${s.protocols} protocols, ${s.programErrors} with errors\n` +
    `  total tarball ${fmtBytes(s.totalTarball)}, unpacked ${fmtBytes(s.totalUnpacked)}, ${s.totalOperations} ops\n` +
    `  median 1 auth + 1 op bundle ${fmtBytes(s.medianBundleGzip)} gzip (+${fmtBytes(s.medianOverheadGzip)} over effect-http)\n` +
    `  median added latency ${s.medianAddedP50Us?.toFixed(1)} µs/call, import ${fmtMs(s.medianImportOpMs)}, heap ${fmtBytes(s.medianImportHeap)}\n` +
    `  median consumer tsc ${fmtMs(s.medianTypecheckMs)}`,
);

//#endregion
