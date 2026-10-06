/**
 * RFC-6902 patch application (dev-time only), at one of two stages a
 * package declares in its package.json (`distilled.patches`, see
 * {@link patchStage}):
 *
 *   convert   (default) OpenAPI ops (`/paths`, `/components`, …) apply to
 *             the spec before conversion; Smithy ops (`/shapes`,
 *             `/metadata`, `/smithy`) apply to the model after it.
 *             `.generated-specs` is the patched model.
 *   generate  `patches/<model>/*.json` are Smithy ops applied by the
 *             generator to `.generated-specs/<model>.json`, which stays the
 *             unpatched convert output. A fix lands by regenerating, without
 *             the spec mirror.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  applyOperation,
  isStaleTargetError,
  type JsonPatchOperation,
  type PatchFile,
} from "../json-patch.ts";
import { diffModels } from "./model-diff.ts";
import {
  applyDeferredRename,
  RENAME_METADATA_KEY,
  verbNounSmithyModel,
} from "./rewrite-operation-ids.ts";

export type OnStalePatch = "fail" | "warn";

export interface ApplyPatchesResult {
  files: number;
  applied: number;
  stale: number;
  errors: string[];
}

/** Smithy-model JSON pointers — OpenAPI has no `/shapes` tree. */
export const isSmithyPatchPath = (pointer: string): boolean =>
  pointer.startsWith("/shapes") || pointer.startsWith("/metadata") || pointer.startsWith("/smithy");

const exists = async (p: string): Promise<boolean> => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

/**
 * Leave patches out of one convert run (dev-time only; the seam
 * `scripts/patches.ts audit` uses to find patches the spec no longer
 * needs). Comma-separated entries:
 *
 *   all                    skip every patch file
 *   <file>                 skip a file — its basename, or a path suffix
 *                          (`svc/a.json`) when basenames repeat
 *   <file>:<index>         skip one op of a file, by its index in `patches`
 *
 * Like `DISTILLED_SPECS_LOCAL`, it lives in one command's environment: a
 * model written under it is announced on stderr and must not be committed.
 */
export const SKIP_PATCHES_ENV = "DISTILLED_SKIP_PATCHES";

interface SkipList {
  readonly all: boolean;
  readonly files: readonly string[];
  readonly ops: ReadonlyMap<string, ReadonlySet<number>>;
}

const parseSkipList = (): SkipList | undefined => {
  const raw = (process.env[SKIP_PATCHES_ENV] ?? "").trim();
  if (raw === "") return undefined;
  const files: string[] = [];
  const ops = new Map<string, Set<number>>();
  for (const entry of raw.split(",")) {
    const item = entry.trim();
    if (item === "") continue;
    if (item === "all") return { all: true, files: [], ops: new Map() };
    const at = item.lastIndexOf(":");
    const index = at === -1 ? NaN : Number(item.slice(at + 1));
    if (Number.isInteger(index) && index >= 0) {
      const file = item.slice(0, at);
      ops.set(file, (ops.get(file) ?? new Set()).add(index));
    } else {
      files.push(item);
    }
  }
  return { all: false, files, ops };
};

const skipMatches = (file: string, entry: string): boolean =>
  path.basename(file) === entry || file.endsWith(path.sep + entry);

let skipAnnounced = false;

const skipList = (): SkipList | undefined => {
  const list = parseSkipList();
  if (list && !skipAnnounced) {
    skipAnnounced = true;
    // stderr for the same reason as the DISTILLED_SPECS_LOCAL notice.
    console.error(
      `⚠  ${SKIP_PATCHES_ENV}=${process.env[SKIP_PATCHES_ENV]} — this model is missing patches; do not commit it.`,
    );
  }
  return list;
};

const skipsFile = (list: SkipList | undefined, file: string): boolean =>
  list !== undefined && (list.all || list.files.some((entry) => skipMatches(file, entry)));

const skipsOp = (list: SkipList | undefined, file: string, index: number): boolean => {
  if (list === undefined) return false;
  for (const [entry, indices] of list.ops) {
    if (indices.has(index) && skipMatches(file, entry)) return true;
  }
  return false;
};

/**
 * RFC-6902 files in `dir`: every `*.json`, `*.manual.json` last (those
 * usually target post-rename shape names). Missing dir → `[]`. Files named
 * by {@link SKIP_PATCHES_ENV} are left out.
 */
export const listRfc6902PatchFiles = async (dir: string): Promise<string[]> => {
  if (!(await exists(dir))) return [];
  const skip = skipList();
  return (await fs.readdir(dir))
    .filter((f) => f.endsWith(".json"))
    .sort(
      (a, b) =>
        Number(a.endsWith(".manual.json")) - Number(b.endsWith(".manual.json")) ||
        a.localeCompare(b),
    )
    .map((f) => path.join(dir, f))
    .filter((f) => !skipsFile(skip, f));
};

export const applyRfc6902Files = async (
  target: unknown,
  files: readonly string[],
  opts: {
    readonly onStalePatch?: OnStalePatch;
    readonly include?: (op: JsonPatchOperation) => boolean;
    readonly label?: (file: string) => string;
  } = {},
): Promise<ApplyPatchesResult> => {
  const onStalePatch = opts.onStalePatch ?? "fail";
  const include = opts.include ?? (() => true);
  const result: ApplyPatchesResult = {
    files: 0,
    applied: 0,
    stale: 0,
    errors: [],
  };
  const skip = skipList();
  for (const file of files) {
    if (skipsFile(skip, file)) continue;
    const parsed = JSON.parse(await fs.readFile(file, "utf8")) as PatchFile;
    const label = opts.label?.(file) ?? path.basename(file);
    result.files++;
    for (const [index, patchOp] of (parsed.patches ?? []).entries()) {
      if (!include(patchOp) || skipsOp(skip, file, index)) continue;
      try {
        applyOperation(target, patchOp);
        result.applied++;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        const line = `${label} [${patchOp.op} ${patchOp.path}]`;
        if (isStaleTargetError(e)) {
          result.stale++;
          if (onStalePatch === "fail") {
            result.errors.push(`${line}: stale target (${msg})`);
          } else {
            console.warn(`   ⚠️  stale: ${line}`);
          }
        } else {
          result.errors.push(`${line}: ${msg}`);
        }
      }
    }
  }
  return result;
};

/** Where a package applies its patches; see the module comment. */
export type PatchStage = "convert" | "generate";

/** The stage `<root>/package.json` declares under `distilled.patches`. */
export const patchStage = (root: string): PatchStage => {
  const manifest = path.join(root, "package.json");
  if (!existsSync(manifest)) return "convert";
  const stage = JSON.parse(readFileSync(manifest, "utf8"))?.distilled?.patches;
  if (stage === undefined || stage === "convert") return "convert";
  if (stage === "generate") return stage;
  throw new Error(`${manifest}: distilled.patches must be "convert" or "generate", got ${stage}`);
};

/**
 * Apply a generate-stage model's patches: every `*.json` in `dir`
 * (`*.manual.json` last), honouring {@link SKIP_PATCHES_ENV}. A stale or
 * failing op throws — a generate run must not drop a patch silently.
 * Returns the number of ops applied; a missing dir applies none.
 */
export const applyModelPatches = (model: unknown, dir: string): number => {
  if (!existsSync(dir)) return 0;
  const skip = skipList();
  let applied = 0;
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort(
      (a, b) =>
        Number(a.endsWith(".manual.json")) - Number(b.endsWith(".manual.json")) ||
        a.localeCompare(b),
    )
    .map((f) => path.join(dir, f));
  for (const file of files) {
    if (skipsFile(skip, file)) continue;
    const parsed = JSON.parse(readFileSync(file, "utf8")) as PatchFile;
    for (const [index, op] of (parsed.patches ?? []).entries()) {
      if (skipsOp(skip, file, index)) continue;
      try {
        applyOperation(model, op);
        applied++;
      } catch (e) {
        const kind = isStaleTargetError(e) ? "stale target" : "failed";
        const label = `${path.basename(dir)}/${path.basename(file)}`;
        throw new Error(
          `${label} [${op.op} ${op.path}]: ${kind}: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    }
  }
  return applied;
};

/**
 * An RFC-6902 `move` that renames an operation shape leaves the service's
 * `operations` list pointing at the old id. Drop entries whose target no
 * longer exists and append operation shapes the list is missing, keeping
 * the existing order. Returns the number of services whose list changed.
 */
export const syncServiceOperations = (model: { shapes?: Record<string, any> }): number => {
  const shapes = model.shapes ?? {};
  const opIds = Object.keys(shapes).filter((id) => shapes[id]?.type === "operation");
  let changed = 0;
  for (const def of Object.values(shapes)) {
    if (def?.type !== "service") continue;
    const current: Array<{ target: string }> = def.operations ?? [];
    const kept = current.filter((o) => shapes[o.target]?.type === "operation");
    const listed = new Set(kept.map((o) => o.target));
    const after = [...kept, ...opIds.filter((id) => !listed.has(id)).map((target) => ({ target }))];
    if (JSON.stringify(current) !== JSON.stringify(after)) {
      def.operations = after;
      changed++;
    }
  }
  return changed;
};

/**
 * Every `target` in a Smithy model must resolve to a shape or a prelude
 * (`smithy.api#…`) id. Returns the dangling ones as `"<owner> → <target>"`.
 * A convert that produces any is broken — generate would emit references
 * to types that do not exist.
 */
export const danglingTargets = (model: { shapes?: Record<string, any> }): string[] => {
  const shapes = model.shapes ?? {};
  const ids = new Set(Object.keys(shapes));
  const out: string[] = [];
  const walk = (owner: string, node: unknown): void => {
    if (Array.isArray(node)) {
      for (const item of node) walk(owner, item);
      return;
    }
    if (node === null || typeof node !== "object") return;
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      if (key === "target" && typeof value === "string") {
        if (!value.startsWith("smithy.") && !ids.has(value)) {
          out.push(`${owner} → ${value}`);
        }
      } else {
        walk(owner, value);
      }
    }
  };
  for (const [id, def] of Object.entries(shapes)) walk(id, def);
  return out;
};

export interface FinalizeOptions {
  readonly root: string;
  readonly outDir?: string;
  readonly patchesDir?: string | false;
  /**
   * The directory holding a model's patches, relative to `patchesDir`.
   * Default `<resource>`; `""` for a single-model package whose patches sit
   * at the root of `patchesDir`; `undefined` for none.
   */
  readonly patchesFor?: (resource: string) => string | undefined;
  readonly exclude?: (file: string) => boolean;
  readonly include?: (resource: string) => boolean;
  readonly transform?: (model: any, resource: string) => string | void;
  readonly operationNaming?: "as-is" | "verbNoun";
  readonly onStalePatch?: OnStalePatch;
}

/** A patch file read once, with only its Smithy ops. */
interface LoadedPatchFile {
  /** Path relative to the patches dir, `/`-separated — the audit's key. */
  readonly key: string;
  readonly file: string;
  readonly ops: readonly JsonPatchOperation[];
}

const loadSmithyPatches = async (
  patchesDir: string,
  dir: string | undefined,
): Promise<LoadedPatchFile[]> => {
  if (dir === undefined) return [];
  const out: LoadedPatchFile[] = [];
  for (const file of await listRfc6902PatchFiles(path.join(patchesDir, dir))) {
    const parsed = JSON.parse(await fs.readFile(file, "utf8")) as PatchFile;
    out.push({
      key: path.relative(patchesDir, file).split(path.sep).join("/"),
      file,
      ops: (parsed.patches ?? []).filter((op) => isSmithyPatchPath(op.path)),
    });
  }
  return out;
};

type FinalizeRun =
  | { readonly ok: true; readonly model: any }
  | { readonly ok: false; readonly stage: "patch" | "rename" | "dangling"; readonly error: string };

/**
 * One model through the finalize steps: Smithy patches, verbNoun names,
 * the package's transform, the service operation list, and the reference
 * check. `skip` leaves out a patch file (`key`) or one of its ops
 * (`key:index`); `quiet` silences the progress lines for audit re-runs.
 */
const finalizeModel = (
  model: any,
  resource: string,
  patches: readonly LoadedPatchFile[],
  o: FinalizeOptions,
  skip: { readonly key: string; readonly index?: number } | undefined,
  quiet: boolean,
): FinalizeRun => {
  const log = quiet ? () => {} : console.log;
  const deferred = model.metadata?.[RENAME_METADATA_KEY];
  if (deferred && !quiet) recordRename(resource, deferred);
  const envSkip = skipList();
  let files = 0;
  let applied = 0;
  let stale = 0;
  const errors: string[] = [];
  for (const p of patches) {
    if (skip && skip.key === p.key && skip.index === undefined) continue;
    files++;
    for (const [index, op] of p.ops.entries()) {
      if (skip && skip.key === p.key && skip.index === index) continue;
      if (skipsOp(envSkip, p.file, index)) continue;
      try {
        // A cloned op: `add`/`replace` insert the value by reference, and
        // the audit applies the same parsed ops to many fresh models.
        applyOperation(model, structuredClone(op));
        applied++;
      } catch (e) {
        const line = `${p.key} [${op.op} ${op.path}]`;
        const msg = e instanceof Error ? e.message : String(e);
        if (isStaleTargetError(e) && o.onStalePatch === "warn") {
          stale++;
          if (!quiet) console.warn(`   ⚠️  stale: ${line}`);
        } else {
          errors.push(`${line}: ${isStaleTargetError(e) ? `stale target (${msg})` : msg}`);
        }
      }
    }
  }
  if (errors.length) {
    if (!quiet) for (const err of errors) console.error(`❌ bad patch: ${err}`);
    return {
      ok: false,
      stage: "patch",
      error: `${errors.length} patch operation(s) failed for ${resource}: ${errors[0]}`,
    };
  }
  if (applied > 0) {
    log(
      `   patched ${resource}: ${files} file(s), ${applied} op(s)` +
        (stale ? `, ${stale} stale` : ""),
    );
  }

  try {
    const renamed = applyDeferredRename(model);
    if (renamed > 0) log(`   named ${resource}: ${renamed} shape(s)`);
  } catch (e) {
    const error = `${resource}: ${e instanceof Error ? e.message : String(e)}`;
    if (!quiet) console.error(`❌ ${error}`);
    return { ok: false, stage: "rename", error };
  }

  if ((o.operationNaming ?? "verbNoun") === "verbNoun") {
    const { renamed, collisions } = verbNounSmithyModel(model);
    if (renamed > 0) log(`   verbNoun ${resource}: renamed ${renamed} operation(s)`);
    if (!quiet) {
      for (const c of collisions) {
        console.warn(`   ⚠️  verbNoun collision ${resource}: ${c} (kept original)`);
      }
    }
  }

  const note = o.transform?.(model, resource);
  if (note) log(`   ${note}`);

  syncServiceOperations(model);

  const dangling = danglingTargets(model);
  if (dangling.length) {
    if (!quiet) {
      for (const d of dangling.slice(0, 5)) console.error(`   ❌ ${d}`);
      if (dangling.length > 5) console.error(`   … ${dangling.length - 5} more`);
    }
    return {
      ok: false,
      stage: "dangling",
      error: `${resource}: ${dangling.length} dangling target(s), e.g. ${dangling[0]}`,
    };
  }
  model.metadata = { ...model.metadata, [FINALIZED_KEY]: true };
  return { ok: true, model };
};

const modelText = (model: unknown): string => `${JSON.stringify(model, null, 2)}\n`;

/**
 * Last step of every convert: Smithy RFC-6902 patches, then verbNoun
 * operation names, then an optional model transform, then a reference
 * check. Writes models back so `.generated-specs` is what generate
 * compiles. `outDir` may be nested (GCP `stable/` / `unstable/`).
 *
 * Input must be FRESHLY converted models. Smithy patches are `move`/`add`
 * ops that are not idempotent, and a `transform` may not be either, so
 * running this over a model that already went through it is an error —
 * re-run the package's `convert` instead.
 *
 * Under {@link PATCH_AUDIT_ENV} it also judges the requested patch files
 * in memory (see `./patch-audit.ts`).
 */
export const finalizeConvert = async (o: FinalizeOptions): Promise<void> => {
  const specsRoot = path.resolve(o.root, ".generated-specs");
  const specsDir = path.resolve(o.root, o.outDir ?? ".generated-specs");
  if (!(await exists(specsDir))) return;
  const patchesDir =
    o.patchesDir === false ? undefined : path.resolve(o.root, o.patchesDir ?? "patches");
  const audit = patchesDir ? await readAuditRequest() : undefined;

  const walk = async (dir: string): Promise<string[]> => {
    const out: string[] = [];
    for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        out.push(...(await walk(p)));
      } else if (ent.name.endsWith(".json") && !(o.exclude?.(ent.name) ?? false)) {
        out.push(p);
      }
    }
    return out;
  };

  const files = (await walk(specsDir)).sort((a, b) => a.localeCompare(b));
  const broken: string[] = [];
  for (const modelPath of files) {
    const resource = path.basename(modelPath, ".json");
    if (o.include && !o.include(resource)) continue;
    const text = await fs.readFile(modelPath, "utf8");
    const model = JSON.parse(text);
    if (model.metadata?.[FINALIZED_KEY]) {
      throw new Error(
        `${path.relative(o.root, modelPath)} was already finalized — finalizeConvert is not idempotent; re-run this package's convert from the spec instead`,
      );
    }
    const patches = patchesDir
      ? await loadSmithyPatches(patchesDir, o.patchesFor ? o.patchesFor(resource) : resource)
      : [];
    const run = finalizeModel(model, resource, patches, o, undefined, false);
    const label = path.relative(specsRoot, modelPath).split(path.sep).join("/");
    if (!run.ok) {
      if (audit) auditModel(audit, label, resource, text, patches, o, run);
      if (run.stage === "patch") {
        throw new Error(`${run.error.split(": ")[0]} — fix the pointers or delete the patch`);
      }
      if (run.stage === "rename") {
        throw new Error(`${run.error} — a patch added a shape under a name the rename needs`);
      }
      broken.push(run.error.split(", e.g.")[0]!);
      // Leave the unfinalized model on disk for inspection; never stamp
      // a model that generate cannot compile.
      continue;
    }
    const finalized = modelText(run.model);
    await fs.writeFile(modelPath, finalized);
    if (audit) auditModel(audit, label, resource, text, patches, o, { ok: true, text: finalized });
  }
  if (broken.length) {
    throw new Error(
      `finalizeConvert: ${broken.length} model(s) reference shapes that do not exist:\n  ${broken.join("\n  ")}`,
    );
  }
};

/**
 * Path of a JSON file finalizeConvert adds each model's deferred rename to
 * (`{ <model>: { <upstream id>: <final id> } }`). Set by
 * `pnpm patches:names`, which tells a patch author the upstream name of a
 * shape they see in `.generated-specs`.
 */
export const RENAME_MAP_ENV = "DISTILLED_RENAME_MAP";

const recordRename = (resource: string, rename: Record<string, string>): void => {
  const file = process.env[RENAME_MAP_ENV];
  if (!file) return;
  const all = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
  all[resource] = { ...all[resource], ...rename };
  writeFileSync(file, JSON.stringify(all));
};

// ---------------------------------------------------------------------------
// in-memory patch audit

/**
 * Path of a JSON request (`{ keys: string[], ops: boolean }`) asking
 * finalizeConvert to judge those patch files in memory. Set only by
 * `pnpm patches:audit` on a scratch copy of the package; the models it
 * writes are the normal, fully patched ones.
 *
 * Each verdict is printed to stdout as one line, {@link PATCH_AUDIT_MARKER}
 * followed by JSON. A requested key no finalizeConvert call owns (its ops
 * are applied somewhere else, e.g. before conversion) gets no line, and the
 * audit judges it by re-running convert.
 */
export const PATCH_AUDIT_ENV = "DISTILLED_PATCH_AUDIT";
export const PATCH_AUDIT_MARKER = "@@distilled-patch-audit ";

interface AuditRequest {
  readonly keys: ReadonlySet<string>;
  readonly ops: boolean;
}

/** One finalizeConvert's answer for one patch file. */
export interface InMemoryVerdict {
  readonly key: string;
  /** Path of the model relative to the package's `.generated-specs`. */
  readonly model: string;
  readonly verdict:
    | { readonly kind: "unused" }
    | { readonly kind: "needed"; readonly diff: readonly string[] }
    | { readonly kind: "depended"; readonly error: string }
    | { readonly kind: "baseline"; readonly error: string };
  readonly deadOps: readonly number[];
}

const readAuditRequest = async (): Promise<AuditRequest | undefined> => {
  const file = process.env[PATCH_AUDIT_ENV];
  if (!file) return undefined;
  const raw = JSON.parse(await fs.readFile(file, "utf8")) as { keys: string[]; ops?: boolean };
  return { keys: new Set(raw.keys), ops: raw.ops === true };
};

const emitVerdict = (v: InMemoryVerdict): void => {
  process.stdout.write(`${PATCH_AUDIT_MARKER}${JSON.stringify(v)}\n`);
};

const auditModel = (
  audit: AuditRequest,
  model: string,
  resource: string,
  text: string,
  patches: readonly LoadedPatchFile[],
  o: FinalizeOptions,
  baseline:
    | { readonly ok: true; readonly text: string }
    | { readonly ok: false; readonly error: string },
): void => {
  const owned = patches.filter((p) => audit.keys.has(p.key) && p.ops.length > 0);
  for (const p of owned) {
    if (!baseline.ok) {
      emitVerdict({
        key: p.key,
        model,
        verdict: { kind: "baseline", error: baseline.error },
        deadOps: [],
      });
      continue;
    }
    const judge = (index?: number): InMemoryVerdict["verdict"] => {
      const run = finalizeModel(
        JSON.parse(text),
        resource,
        patches,
        o,
        { key: p.key, index },
        true,
      );
      if (!run.ok) return { kind: "depended", error: run.error };
      const without = modelText(run.model);
      if (without === baseline.text) return { kind: "unused" };
      const diff = diffModels(new Map([[model, baseline.text]]), new Map([[model, without]]));
      return diff.length === 0 ? { kind: "unused" } : { kind: "needed", diff };
    };
    const verdict = judge();
    const deadOps: number[] = [];
    if (audit.ops && verdict.kind === "needed" && p.ops.length > 1) {
      for (let index = 0; index < p.ops.length; index++) {
        if (judge(index).kind === "unused") deadOps.push(index);
      }
    }
    emitVerdict({ key: p.key, model, verdict, deadOps });
  }
};

/**
 * Metadata marker stamped by {@link finalizeConvert}. Guards against a
 * second pass over the same file (see the note on finalizeConvert).
 */
export const FINALIZED_KEY = "distilled.finalized";
