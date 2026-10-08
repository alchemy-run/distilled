/**
 * Patch audit (dev-time only): does each RFC-6902 patch still change the
 * model? A patch earns its keep by changing the patched model. The audit
 * builds the model once with every patch (the baseline), then once per
 * patch file with that file left out, and diffs:
 *
 *   unused     the model is identical without it — delete the file
 *   needed     the model differs; the diff lists the JSON pointers
 *   depended   the build fails without it — a later patch targets what it
 *              adds, so the two go together
 *
 * The model is built by running the package's `convert` on a scratch copy
 * of the package (`packages/.audit-<pkg>-<n>`), so the spec mirror must be
 * fetched. A file whose ops all target the Smithy model is judged in
 * memory by `finalizeConvert` ({@link PATCH_AUDIT_ENV}): one convert, then
 * only the finalize steps re-run per file. A file finalizeConvert does not
 * apply (Railway's GraphQL patches) costs one convert per file
 * ({@link SKIP_PATCHES_ENV}). Up to `jobs` copies run at once.
 *
 * The package itself is never written: its `.generated-*` dirs stay as
 * committed.
 *
 * Every verdict is one-at-a-time: two patches that add the same thing each
 * look unused alone, and only the second deletion changes the model.
 */
import { spawn } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { availableParallelism, freemem } from "node:os";
import { basename, dirname, join, relative, sep } from "node:path";
import { diffModels, type Models } from "./model-diff.ts";
import {
  isSmithyPatchPath,
  PATCH_AUDIT_ENV,
  PATCH_AUDIT_MARKER,
  RENAME_MAP_ENV,
  SKIP_PATCHES_ENV,
  type InMemoryVerdict,
} from "./patches.ts";

export { diffModels, type Models };

export type Run =
  | { readonly ok: true; readonly models: Models }
  | { readonly ok: false; readonly error: string };

/** Builds the patched model, optionally with a skip-list entry left out. */
export interface ModelBuilder {
  readonly build: (skip?: string) => Run;
  readonly restore: (baseline: Models) => void;
}

export interface PatchFileInfo {
  /** Path relative to the package's `patches/` — the skip-list entry. */
  readonly key: string;
  readonly ops: number;
  /** Whether every op targets the Smithy model (`/shapes`, `/metadata`, …). */
  readonly smithyOnly: boolean;
}

export type Verdict =
  | { readonly kind: "unused" }
  | { readonly kind: "needed"; readonly diff: readonly string[] }
  | { readonly kind: "depended"; readonly error: string };

export interface FileVerdict {
  readonly file: PatchFileInfo;
  readonly verdict: Verdict;
  /** With `ops`: indices of ops inside a needed file that change nothing alone. */
  readonly deadOps: readonly number[];
}

export type PackageAudit =
  | {
      readonly kind: "audited";
      readonly files: readonly FileVerdict[];
      /** Files under `patches/` without a `patches` array (e.g. AWS typed configs). */
      readonly notAudited: readonly string[];
      /** How many files were judged in memory, and how many by one convert each. */
      readonly judged: { readonly inMemory: number; readonly perFile: number };
    }
  | { readonly kind: "skipped"; readonly reason: string };

// ---------------------------------------------------------------------------
// files

const walkJson = (dir: string): string[] => {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkJson(p));
    else if (entry.name.endsWith(".json")) out.push(p);
  }
  return out;
};

/** RFC-6902 files under `patchesDir`; anything without a `patches` array is returned separately. */
export const listPatchFiles = (patchesDir: string): { files: PatchFileInfo[]; other: string[] } => {
  const files: PatchFileInfo[] = [];
  const other: string[] = [];
  for (const file of walkJson(patchesDir)) {
    const key = relative(patchesDir, file).split(sep).join("/");
    let parsed: unknown;
    try {
      parsed = JSON.parse(readFileSync(file, "utf8"));
    } catch {
      other.push(key);
      continue;
    }
    const ops = (parsed as { patches?: unknown })?.patches;
    if (!Array.isArray(ops)) {
      other.push(key);
      continue;
    }
    const smithyOnly = ops.every(
      (op) => typeof op?.path === "string" && isSmithyPatchPath(op.path),
    );
    files.push({ key, ops: ops.length, smithyOnly });
  }
  return { files, other };
};

// ---------------------------------------------------------------------------
// scratch copies

/**
 * A scratch copy of the package next to it (same depth, so relative imports
 * and `node_modules` resolve the same; the dot keeps it out of the pnpm
 * workspace). `scripts/` and `package.json` are copied — Node resolves a
 * symlinked script to its real path, which would make the copy's convert
 * write to the real package — `.generated-*` dirs start empty, and
 * everything else is a symlink.
 */
const scratchCopy = (pkgDir: string, index: number): string => {
  const dir = join(dirname(pkgDir), `.audit-${basename(pkgDir)}-${index}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir);
  for (const entry of readdirSync(pkgDir, { withFileTypes: true })) {
    const from = join(pkgDir, entry.name);
    const to = join(dir, entry.name);
    // Every convert output dir (`.generated-specs`, Railway's
    // `.generated-graphql`) starts empty, so convert never writes through a
    // symlink into the package.
    if (entry.name.startsWith(".generated")) mkdirSync(to);
    else if (entry.name === "scripts" || entry.name === "package.json") {
      cpSync(from, to, { recursive: true });
    } else symlinkSync(from, to);
  }
  return dir;
};

/** Every model convert wrote in a copy, keyed `<.generated-* dir>/<path>`. */
const outputs = (copy: string): Models => {
  const out: Models = new Map();
  for (const entry of readdirSync(copy, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.startsWith(".generated")) continue;
    const dir = join(copy, entry.name);
    for (const f of walkJson(dir))
      out.set(`${entry.name}/${relative(dir, f)}`, readFileSync(f, "utf8"));
  }
  return out;
};

interface ConvertResult {
  readonly ok: boolean;
  /** convert's own report when it failed: the `❌` lines, or its last lines. */
  readonly error: string;
}

/**
 * Run the package's convert command in `cwd`. Marker lines from an
 * in-memory audit go to `onVerdict`; everything else is only kept for the
 * error report.
 */
const runConvert = (
  command: string,
  cwd: string,
  env: NodeJS.ProcessEnv,
  onVerdict: (v: InMemoryVerdict) => void = () => {},
): Promise<ConvertResult> =>
  new Promise((resolve) => {
    const child = spawn(command, { cwd, env, shell: true, stdio: ["ignore", "pipe", "pipe"] });
    const reported: string[] = [];
    const tail: string[] = [];
    const keep = (line: string) => {
      const l = line.trim();
      if (l === "" || l.startsWith(`⚠  ${SKIP_PATCHES_ENV}`)) return;
      if (l.startsWith("❌")) reported.push(l);
      tail.push(l);
      if (tail.length > 20) tail.shift();
    };
    const lines = (stream: NodeJS.ReadableStream, onLine: (line: string) => void) => {
      let buffer = "";
      stream.setEncoding("utf8");
      stream.on("data", (chunk: string) => {
        buffer += chunk;
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          onLine(buffer.slice(0, nl));
          buffer = buffer.slice(nl + 1);
        }
      });
      stream.on("end", () => buffer && onLine(buffer));
    };
    lines(child.stdout!, (line) => {
      if (line.startsWith(PATCH_AUDIT_MARKER)) {
        onVerdict(JSON.parse(line.slice(PATCH_AUDIT_MARKER.length)) as InMemoryVerdict);
      } else keep(line);
    });
    lines(child.stderr!, keep);
    child.on("error", (e) => keep(String(e)));
    child.on("close", (code) => {
      // convert reports each bad patch on its own `❌` line before throwing;
      // those name the pointer, the stack trace below them does not.
      const shown = reported.length > 0 ? reported : tail.slice(-2);
      resolve({ ok: code === 0, error: shown.slice(0, 3).join("\n     ") });
    });
  });

/** Copies to run at once: one core and ~1.5 GB of free memory each. */
const defaultJobs = (): number =>
  Math.max(1, Math.min(availableParallelism() - 1, Math.floor(freemem() / 1.5e9)));

/**
 * Split keys into at most `n` shards of about equal cost. A key costs about
 * the size of the model its patch dir applies to (every judgement re-runs
 * finalize over that model), so a dir is kept whole when it fits in one
 * shard's share and cut into chunks when it does not — each chunk pays one
 * more convert, which is cheap next to hundreds of re-finalized copies of a
 * large model.
 */
const shard = (keys: readonly string[], n: number, cost: (dir: string) => number): string[][] => {
  const groups = new Map<string, string[]>();
  for (const key of keys) {
    const dir = key.includes("/") ? key.slice(0, key.lastIndexOf("/")) : "";
    groups.set(dir, [...(groups.get(dir) ?? []), key]);
  }
  const weighted = [...groups].map(([dir, ks]) => ({ keys: ks, each: cost(dir) }));
  const total = weighted.reduce((sum, g) => sum + g.keys.length * g.each, 0);
  const share = total / n;
  const pieces: { keys: string[]; cost: number }[] = [];
  for (const g of weighted) {
    const chunks = Math.min(
      g.keys.length,
      Math.max(1, Math.ceil((g.keys.length * g.each) / share)),
    );
    const size = Math.ceil(g.keys.length / chunks);
    for (let i = 0; i < g.keys.length; i += size) {
      const ks = g.keys.slice(i, i + size);
      pieces.push({ keys: ks, cost: ks.length * g.each });
    }
  }
  const shards = Array.from({ length: Math.min(n, pieces.length) }, () => ({
    keys: [] as string[],
    cost: 0,
  }));
  for (const piece of pieces.sort((a, b) => b.cost - a.cost)) {
    const min = shards.reduce((a, b) => (b.cost < a.cost ? b : a));
    min.keys.push(...piece.keys);
    min.cost += piece.cost;
  }
  return shards.map((s) => s.keys).filter((ks) => ks.length > 0);
};

/** Merge one file's verdicts from every model its patch dir applies to. */
const mergeVerdicts = (vs: readonly InMemoryVerdict[]): Omit<FileVerdict, "file"> => {
  const failed = vs.find((v) => v.verdict.kind === "depended" || v.verdict.kind === "baseline");
  if (failed && "error" in failed.verdict) {
    return { verdict: { kind: "depended", error: failed.verdict.error }, deadOps: [] };
  }
  const needed = vs.filter((v) => v.verdict.kind === "needed");
  if (needed.length === 0) return { verdict: { kind: "unused" }, deadOps: [] };
  const diff = needed.flatMap((v) =>
    v.verdict.kind === "needed"
      ? v.verdict.diff.map((line) => (needed.length > 1 ? `${v.model}: ${line}` : line))
      : [],
  );
  // An op is dead only if it changes nothing in any of the models.
  const deadOps = needed.map((v) => v.deadOps).reduce((a, b) => a.filter((i) => b.includes(i)));
  return { verdict: { kind: "needed", diff }, deadOps };
};

/** Bounded-concurrency map over a pool of scratch copies. */
const withCopies = async <A>(
  copies: readonly string[],
  tasks: readonly A[],
  run: (task: A, copy: string) => Promise<void>,
): Promise<void> => {
  let next = 0;
  await Promise.all(
    copies.map(async (copy) => {
      while (next < tasks.length) await run(tasks[next++]!, copy);
    }),
  );
};

const auditConvertStage = async (
  pkgDir: string,
  command: string,
  files: readonly PatchFileInfo[],
  options: AuditOptions,
  report: (v: FileVerdict) => void,
): Promise<{ inMemory: number; perFile: number } | { error: string }> => {
  const jobs = Math.max(1, options.jobs ?? defaultJobs());
  const inMemoryKeys =
    options.inMemory === false ? [] : files.filter((f) => f.smithyOnly).map((f) => f.key);
  // A dir's cost: the size of the committed model it patches (1 MB when
  // there is none to go by, e.g. a root-level file patching every model).
  const specsDir = join(pkgDir, ".generated-specs");
  const cost = (dir: string): number => {
    const model = join(specsDir, `${dir}.json`);
    return dir !== "" && existsSync(model) ? Math.max(1, statSync(model).size / 1e6) : 1;
  };
  const shards = shard(inMemoryKeys, jobs, cost);
  // Even with nothing to judge in memory, one convert builds the baseline.
  if (shards.length === 0) shards.push([]);
  const copies = Array.from({ length: Math.max(1, Math.min(jobs, files.length)) }, (_, i) =>
    scratchCopy(pkgDir, i),
  );
  const cleanup = () => {
    for (const c of copies) rmSync(c, { recursive: true, force: true });
  };
  const onSignal = () => {
    cleanup();
    process.exit(130);
  };
  process.once("SIGINT", onSignal);
  process.once("SIGTERM", onSignal);
  const byKey = new Map(files.map((f) => [f.key, f]));
  try {
    // 1. In memory: one convert per shard, each on its own copy.
    const verdicts = new Map<string, InMemoryVerdict[]>();
    let baselineError: string | undefined;
    await withCopies(copies, shards, async (keys, copy) => {
      const request = join(copy, ".audit-request.json");
      writeFileSync(request, JSON.stringify({ keys, ops: options.ops === true }));
      const result = await runConvert(
        command,
        copy,
        { ...process.env, [PATCH_AUDIT_ENV]: request, [SKIP_PATCHES_ENV]: "" },
        (v) => {
          verdicts.set(v.key, [...(verdicts.get(v.key) ?? []), v]);
          options.onProgress?.();
        },
      );
      if (!result.ok) baselineError ??= result.error;
      // A key is complete once its convert has exited: GCP judges one
      // patch dir against both its stable and unstable model.
      for (const key of keys) {
        const vs = verdicts.get(key);
        if (vs) report({ file: byKey.get(key)!, ...mergeVerdicts(vs) });
      }
    });
    if (baselineError !== undefined) return { error: baselineError };

    // 2. Everything else: one convert per file, diffed against the baseline
    //    a copy just wrote.
    const perFile = files.filter((f) => !verdicts.has(f.key));
    if (perFile.length > 0) {
      const baseline = outputs(copies[0]!);
      const judge = async (skip: string, copy: string): Promise<Verdict> => {
        const result = await runConvert(command, copy, {
          ...process.env,
          [SKIP_PATCHES_ENV]: skip,
        });
        if (!result.ok) return { kind: "depended", error: result.error };
        const diff = diffModels(baseline, outputs(copy));
        return diff.length === 0 ? { kind: "unused" } : { kind: "needed", diff };
      };
      await withCopies(copies, perFile, async (file, copy) => {
        const verdict = await judge(file.key, copy);
        options.onProgress?.();
        const deadOps: number[] = [];
        if (options.ops && verdict.kind === "needed" && file.ops > 1) {
          for (let index = 0; index < file.ops; index++) {
            if ((await judge(`${file.key}:${index}`, copy)).kind === "unused") deadOps.push(index);
          }
        }
        report({ file, verdict, deadOps });
      });
    }
    return { inMemory: verdicts.size, perFile: perFile.length };
  } finally {
    process.off("SIGINT", onSignal);
    process.off("SIGTERM", onSignal);
    cleanup();
  }
};

// ---------------------------------------------------------------------------
// audit

export interface AuditOptions {
  /** Also judge every op inside each needed file. */
  readonly ops?: boolean;
  /** Only files whose key contains this substring. */
  readonly only?: string;
  /** Scratch copies converting at once; default from cores and free memory. */
  readonly jobs?: number;
  /** `false` judges every file by one convert each (the slow path; for comparing). */
  readonly inMemory?: boolean;
  /** Called after each file's verdict, in completion order. */
  readonly onFile?: (verdict: FileVerdict) => void;
  /** Called as each file is judged, before its verdict is final. */
  readonly onProgress?: () => void;
}

/** Audit one package directory. Never throws for a broken baseline — that is `skipped`. */
export const auditPackage = async (
  pkgDir: string,
  options: AuditOptions = {},
): Promise<PackageAudit> => {
  const patchesDir = join(pkgDir, "patches");
  if (!existsSync(patchesDir)) return { kind: "skipped", reason: "no patches/ directory" };
  const listed = listPatchFiles(patchesDir);
  const files =
    options.only === undefined
      ? listed.files
      : listed.files.filter((f) => f.key.includes(options.only!));
  const order = new Map(files.map((f, i) => [f.key, i]));
  const verdicts: FileVerdict[] = [];
  const report = (v: FileVerdict) => {
    verdicts.push(v);
    options.onFile?.(v);
  };
  const done = (judged: { inMemory: number; perFile: number }): PackageAudit => ({
    kind: "audited",
    files: verdicts.sort((a, b) => order.get(a.file.key)! - order.get(b.file.key)!),
    notAudited: listed.other,
    judged,
  });
  if (files.length === 0) return done({ inMemory: 0, perFile: 0 });

  const command = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8")).scripts?.convert;
  if (!command) return { kind: "skipped", reason: "no `convert` script applies patches" };
  const result = await auditConvertStage(pkgDir, command, files, options, report);
  if ("error" in result)
    return { kind: "skipped", reason: `baseline build fails: ${result.error}` };
  return done(result);
};

// ---------------------------------------------------------------------------
// names

/**
 * Each model's deferred rename — upstream shape id → the final id in
 * `.generated-specs` — from one convert on a scratch copy. Smithy patches
 * apply before the rename, so they use the upstream ids.
 */
export const renameMaps = async (
  pkgDir: string,
): Promise<
  { ok: true; maps: Record<string, Record<string, string>> } | { ok: false; error: string }
> => {
  const command = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8")).scripts?.convert;
  if (!command) return { ok: false, error: "no `convert` script" };
  const copy = scratchCopy(pkgDir, 0);
  try {
    const out = join(copy, ".rename-map.json");
    const result = await runConvert(command, copy, { ...process.env, [RENAME_MAP_ENV]: out });
    // The maps are recorded before the Smithy patches apply, so a convert
    // that fails on a stale patch still names its shapes.
    if (existsSync(out)) return { ok: true, maps: JSON.parse(readFileSync(out, "utf8")) };
    return result.ok ? { ok: true, maps: {} } : { ok: false, error: result.error };
  } finally {
    rmSync(copy, { recursive: true, force: true });
  }
};
