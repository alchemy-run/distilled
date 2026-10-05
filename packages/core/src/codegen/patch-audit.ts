/**
 * Patch audit (dev-time only): does each RFC-6902 patch still change the
 * model? A patch earns its keep by changing the patched model. The audit
 * builds the model once with every patch (the baseline), then once per
 * patch file with that file left out ({@link SKIP_PATCHES_ENV}), and diffs:
 *
 *   unused     the model is identical without it — delete the file
 *   needed     the model differs; the diff lists the JSON pointers
 *   depended   the build fails without it — a later patch targets what it
 *              adds, so the two go together
 *
 * How "the model" is built depends on the package's patch stage
 * (`distilled.patches`, see `./patches.ts`):
 *
 *   convert    re-run the package's `convert` script; needs the spec mirror
 *   generate   apply `patches/<model>/` to the committed `.generated-specs`
 *              in-process; needs nothing beyond the checkout
 *
 * Every verdict is one-at-a-time: two patches that add the same thing each
 * look unused alone, and only the second deletion changes the model.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { applyModelPatches, patchStage, SKIP_PATCHES_ENV, type PatchStage } from "./patches.ts";

/** Model files keyed by path relative to `.generated-specs`, as text. */
export type Models = Map<string, string>;

export type Run =
  | { readonly ok: true; readonly models: Models }
  | { readonly ok: false; readonly error: string };

/** Builds the patched model, optionally with a skip-list entry left out. */
export interface ModelBuilder {
  readonly build: (skip?: string) => Run;
  /** Put `.generated-specs` back the way the baseline left it. */
  readonly restore: (baseline: Models) => void;
}

export interface PatchFileInfo {
  /** Path relative to the package's `patches/` — the skip-list entry. */
  readonly key: string;
  readonly ops: number;
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
      readonly stage: PatchStage;
      readonly files: readonly FileVerdict[];
      /** Files under `patches/` without a `patches` array (e.g. AWS typed configs). */
      readonly notAudited: readonly string[];
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
    if (Array.isArray(ops)) files.push({ key, ops: ops.length });
    else other.push(key);
  }
  return { files, other };
};

// ---------------------------------------------------------------------------
// diff

const MAX_DIFF_LINES = 12;

const isObject = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === "object" && !Array.isArray(v);

const show = (v: unknown): string => {
  const text = JSON.stringify(v);
  return text.length > 60 ? text.slice(0, 57) + "…" : text;
};

/** JSON pointers at which `a` (with the patch) and `b` (without) differ. */
const diffPointers = (a: unknown, b: unknown, pointer: string, out: string[]): void => {
  if (out.length > MAX_DIFF_LINES) return;
  if (isObject(a) && isObject(b)) {
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
      const child = `${pointer}/${key.replace(/~/g, "~0").replace(/\//g, "~1")}`;
      if (!(key in b)) out.push(`+ ${child}`);
      else if (!(key in a)) out.push(`- ${child}`);
      else diffPointers(a[key], b[key], child, out);
    }
    return;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    const n = Math.max(a.length, b.length);
    for (let i = 0; i < n; i++) {
      const child = `${pointer}/${i}`;
      if (i >= b.length) out.push(`+ ${child} ${show(a[i])}`);
      else if (i >= a.length) out.push(`- ${child} ${show(b[i])}`);
      else diffPointers(a[i], b[i], child, out);
    }
    return;
  }
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    out.push(`~ ${pointer} ${show(a)} → ${show(b)}`);
  }
};

/** Human-readable delta between two model snapshots, `[]` when identical. */
export const diffModels = (withPatch: Models, without: Models): string[] => {
  const out: string[] = [];
  const many = withPatch.size > 1;
  for (const rel of new Set([...withPatch.keys(), ...without.keys()])) {
    const a = withPatch.get(rel);
    const b = without.get(rel);
    if (a === b) continue;
    if (a === undefined || b === undefined) {
      out.push(`${a === undefined ? "-" : "+"} ${rel}`);
      continue;
    }
    const lines: string[] = [];
    diffPointers(JSON.parse(a), JSON.parse(b), "", lines);
    for (const line of lines) {
      // `+ /shapes/com.x.api#Foo/members/…` → `+ Foo/members/…`
      const short = line.replace(/^(. )\/shapes\/[^/#]*#/, "$1");
      out.push((many ? `${rel}: ` : "") + short);
    }
  }
  return out;
};

// ---------------------------------------------------------------------------
// builders

const snapshot = (outDir: string): Models =>
  new Map(walkJson(outDir).map((f) => [relative(outDir, f), readFileSync(f, "utf8")]));

/** Convert stage: re-run `pnpm run convert` and read `.generated-specs`. */
export const convertBuilder = (pkgDir: string): ModelBuilder => {
  const outDir = join(pkgDir, ".generated-specs");
  return {
    build: (skip) => {
      const env = { ...process.env };
      if (skip === undefined) delete env[SKIP_PATCHES_ENV];
      else env[SKIP_PATCHES_ENV] = skip;
      // --silent: no script banner on stdout, no ELIFECYCLE trailer under the error lines.
      const result = spawnSync("pnpm", ["--silent", "run", "convert"], {
        cwd: pkgDir,
        env,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
      if (result.status !== 0) {
        // convert reports each bad patch on its own `❌` line before throwing;
        // those name the pointer, the stack trace below them does not.
        const lines =
          `${result.stdout ?? ""}${result.stderr ?? ""}${result.error ? String(result.error) : ""}`
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l !== "" && !l.startsWith(`⚠  ${SKIP_PATCHES_ENV}`));
        const reported = lines.filter((l) => l.startsWith("❌"));
        const shown = reported.length > 0 ? reported : lines.slice(-2);
        return { ok: false, error: shown.slice(0, 3).join("\n     ") };
      }
      return { ok: true, models: snapshot(outDir) };
    },
    restore: (baseline) => {
      for (const [rel, text] of baseline) {
        const p = join(outDir, rel);
        mkdirSync(dirname(p), { recursive: true });
        writeFileSync(p, text);
      }
    },
  };
};

/**
 * Generate stage: apply `patches/<model>/` to the committed
 * `.generated-specs/<model>.json` in memory. Only the model a skipped file
 * belongs to is rebuilt; the committed files are never written.
 */
export const generateBuilder = (pkgDir: string): ModelBuilder => {
  const specsDir = join(pkgDir, ".generated-specs");
  const patchesDir = join(pkgDir, "patches");
  const models = readdirSync(patchesDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  const raw = new Map<string, string>();
  const source = (model: string): string => {
    let text = raw.get(model);
    if (text === undefined) {
      const file = join(specsDir, `${model}.json`);
      if (!existsSync(file))
        throw new Error(`patches/${model}/ has no .generated-specs/${model}.json`);
      text = readFileSync(file, "utf8");
      raw.set(model, text);
    }
    return text;
  };
  const patched = (model: string): string => {
    const json = JSON.parse(source(model));
    applyModelPatches(json, join(patchesDir, model));
    return JSON.stringify(json);
  };
  let baseline: Models | undefined;
  const withSkip = <A>(skip: string | undefined, f: () => A): A => {
    const previous = process.env[SKIP_PATCHES_ENV];
    if (skip === undefined) delete process.env[SKIP_PATCHES_ENV];
    else process.env[SKIP_PATCHES_ENV] = skip;
    try {
      return f();
    } finally {
      if (previous === undefined) delete process.env[SKIP_PATCHES_ENV];
      else process.env[SKIP_PATCHES_ENV] = previous;
    }
  };
  return {
    build: (skip) => {
      try {
        baseline ??= withSkip(
          undefined,
          () => new Map(models.map((m) => [`${m}.json`, patched(m)])),
        );
        if (skip === undefined) return { ok: true, models: baseline };
        // A skip entry is `<model>/<file>[:<index>]`: rebuild that model only.
        const model = skip.split("/")[0]!;
        const next = new Map(baseline);
        next.set(
          `${model}.json`,
          withSkip(skip, () => patched(model)),
        );
        return { ok: true, models: next };
      } catch (e) {
        return { ok: false, error: e instanceof Error ? e.message : String(e) };
      }
    },
    restore: () => {},
  };
};

// ---------------------------------------------------------------------------
// audit

export interface AuditOptions {
  /** Also judge every op inside each needed file. */
  readonly ops?: boolean;
  /** Only files whose key contains this substring. */
  readonly only?: string;
  /** Called after each file's verdict, for progress output. */
  readonly onFile?: (verdict: FileVerdict) => void;
}

/** Audit one package directory. Never throws for a broken baseline — that is `skipped`. */
export const auditPackage = (pkgDir: string, options: AuditOptions = {}): PackageAudit => {
  const patchesDir = join(pkgDir, "patches");
  if (!existsSync(patchesDir)) return { kind: "skipped", reason: "no patches/ directory" };
  const stage = patchStage(pkgDir);
  if (stage === "convert") {
    const scripts = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8")).scripts ?? {};
    if (!scripts.convert) return { kind: "skipped", reason: "no `convert` script applies patches" };
  }
  const listed = listPatchFiles(patchesDir);
  const files =
    options.only === undefined
      ? listed.files
      : listed.files.filter((f) => f.key.includes(options.only!));
  if (files.length === 0) {
    return { kind: "audited", stage, files: [], notAudited: listed.other };
  }

  const builder = stage === "generate" ? generateBuilder(pkgDir) : convertBuilder(pkgDir);
  const base = builder.build();
  if (!base.ok) return { kind: "skipped", reason: `baseline build fails: ${base.error}` };
  const baseline = base.models;

  const judge = (skip: string): Verdict => {
    const run = builder.build(skip);
    if (!run.ok) return { kind: "depended", error: run.error };
    const diff = diffModels(baseline, run.models);
    return diff.length === 0 ? { kind: "unused" } : { kind: "needed", diff };
  };

  const verdicts: FileVerdict[] = [];
  try {
    for (const file of files) {
      const verdict = judge(file.key);
      const deadOps: number[] = [];
      if (options.ops && verdict.kind === "needed" && file.ops > 1) {
        for (let index = 0; index < file.ops; index++) {
          if (judge(`${file.key}:${index}`).kind === "unused") deadOps.push(index);
        }
      }
      const result = { file, verdict, deadOps };
      verdicts.push(result);
      options.onFile?.(result);
    }
  } finally {
    builder.restore(baseline);
  }
  return { kind: "audited", stage, files: verdicts, notAudited: listed.other };
};
