#!/usr/bin/env bun
/**
 * patches — find RFC-6902 patches a package's spec no longer needs.
 *
 *   pnpm patches:audit <pkg> [--ops] [--only <substring>]
 *
 * A patch earns its keep by changing the converted model. This runs the
 * package's `convert` once with every patch (the baseline), then once per
 * patch file with that file left out (`DISTILLED_SKIP_PATCHES`, see
 * `@distilled.cloud/core/codegen/patches`), and compares `.generated-specs`:
 *
 *   no effect   the model is byte-identical without it — delete the file
 *   needed      the model differs; the report lists where
 *   depended on convert fails without it — a later patch targets what it
 *               adds, so the two go together
 *
 * `--ops` repeats the experiment for every op inside each needed file, so a
 * file that is only partly stale can be slimmed rather than kept whole.
 * `--only` restricts the audit to files whose path contains the substring.
 *
 * Every verdict is one-at-a-time: two patches that add the same thing each
 * look unused alone, and only the second deletion changes the model. Delete,
 * `pnpm generate <pkg>`, and audit again until the list is empty. The
 * baseline is written back at the end, so `.generated-specs` is left as a
 * plain `convert` would leave it.
 */
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";

const ROOT = join(import.meta.dir, "..");
const SKIP_ENV = "DISTILLED_SKIP_PATCHES";
const MAX_DIFF_LINES = 12;

const die = (message: string): never => {
  console.error(`❌ ${message}`);
  process.exit(1);
};

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

interface PatchFile {
  /** Path relative to the package's patches dir — the skip-list entry. */
  readonly key: string;
  readonly ops: number;
}

/** RFC-6902 files under `patchesDir`; anything without a `patches` array is returned separately. */
const listPatchFiles = (
  patchesDir: string,
): { files: PatchFile[]; other: string[] } => {
  const files: PatchFile[] = [];
  const other: string[] = [];
  for (const file of walkJson(patchesDir)) {
    const key = relative(patchesDir, file);
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
// convert

type Models = Map<string, string>; // path relative to .generated-specs → text

const snapshot = (outDir: string): Models =>
  new Map(
    walkJson(outDir).map((f) => [relative(outDir, f), readFileSync(f, "utf8")]),
  );

const restore = (outDir: string, models: Models): void => {
  for (const [rel, text] of models) {
    const p = join(outDir, rel);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, text);
  }
};

type Run = { ok: true; models: Models } | { ok: false; error: string };

const convert = (pkgDir: string, outDir: string, skip?: string): Run => {
  const env = { ...process.env };
  if (skip === undefined) delete env[SKIP_ENV];
  else env[SKIP_ENV] = skip;
  const result = spawnSync("bun", ["run", "convert"], {
    cwd: pkgDir,
    env,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    // convert reports each bad patch on its own `❌` line before throwing;
    // those name the pointer, the stack trace below them does not.
    const lines = (result.stdout + result.stderr)
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l !== "" && !l.startsWith(`⚠  ${SKIP_ENV}`));
    const reported = lines.filter((l) => l.startsWith("❌"));
    const shown = reported.length > 0 ? reported : lines.slice(-2);
    return { ok: false, error: shown.slice(0, 3).join("\n     ") };
  }
  return { ok: true, models: snapshot(outDir) };
};

// ---------------------------------------------------------------------------
// diff

const isObject = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === "object" && !Array.isArray(v);

const show = (v: unknown): string => {
  const text = JSON.stringify(v);
  return text.length > 60 ? text.slice(0, 57) + "…" : text;
};

/** JSON pointers at which `a` (with the patch) and `b` (without) differ. */
const diffPointers = (
  a: unknown,
  b: unknown,
  pointer: string,
  out: string[],
): void => {
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
const diffModels = (withPatch: Models, without: Models): string[] => {
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
// audit

type Verdict =
  | { kind: "unused" }
  | { kind: "needed"; diff: string[] }
  | { kind: "depended"; error: string };

const judge = (
  pkgDir: string,
  outDir: string,
  baseline: Models,
  skip: string,
): Verdict => {
  const run = convert(pkgDir, outDir, skip);
  if (!run.ok) return { kind: "depended", error: run.error };
  const diff = diffModels(baseline, run.models);
  return diff.length === 0 ? { kind: "unused" } : { kind: "needed", diff };
};

const printDiff = (diff: string[], indent: string): void => {
  for (const line of diff.slice(0, MAX_DIFF_LINES)) {
    console.log(`${indent}${line}`);
  }
  if (diff.length > MAX_DIFF_LINES) {
    console.log(`${indent}… ${diff.length - MAX_DIFF_LINES} more`);
  }
};

const audit = (pkg: string, opts: { ops: boolean; only?: string }): void => {
  const pkgDir = join(ROOT, "packages", pkg);
  const pkgJson = join(pkgDir, "package.json");
  if (!existsSync(pkgJson)) die(`packages/${pkg} does not exist`);
  const scripts = JSON.parse(readFileSync(pkgJson, "utf8")).scripts ?? {};
  if (!scripts.convert) {
    die(`packages/${pkg} has no \`convert\` script — nothing applies patches`);
  }
  const patchesDir = join(pkgDir, "patches");
  const outDir = join(pkgDir, ".generated-specs");

  const listed = listPatchFiles(patchesDir);
  const files =
    opts.only === undefined
      ? listed.files
      : listed.files.filter((f) => f.key.includes(opts.only!));
  if (listed.other.length > 0) {
    console.log(
      `ℹ  ${listed.other.length} file(s) under patches/ have no \`patches\` array and are not RFC-6902 — not audited:`,
    );
    for (const key of listed.other) console.log(`   ${key}`);
  }
  if (files.length === 0) {
    console.log(`✅ ${pkg}: no RFC-6902 patch files to audit`);
    return;
  }

  console.log(`🔍 ${pkg}: baseline convert with every patch`);
  const base = convert(pkgDir, outDir);
  const baseline = base.ok
    ? base.models
    : die(`convert fails with all patches applied: ${base.error}`);

  const unused: string[] = [];
  const slimmable: string[] = [];
  let needed = 0;
  let depended = 0;
  try {
    for (const file of files) {
      const verdict = judge(pkgDir, outDir, baseline, file.key);
      switch (verdict.kind) {
        case "unused":
          unused.push(file.key);
          console.log(`🗑  ${file.key} — no effect (${file.ops} op(s))`);
          break;
        case "depended":
          depended++;
          console.log(`🔗 ${file.key} — convert fails without it`);
          console.log(`     ${verdict.error}`);
          break;
        case "needed": {
          needed++;
          console.log(`✔  ${file.key} — needed (${file.ops} op(s))`);
          printDiff(verdict.diff, "     ");
          if (!opts.ops || file.ops < 2) break;
          const deadOps: number[] = [];
          for (let index = 0; index < file.ops; index++) {
            const op = judge(pkgDir, outDir, baseline, `${file.key}:${index}`);
            if (op.kind === "unused") {
              deadOps.push(index);
              console.log(`     op ${index}: no effect`);
            } else if (op.kind === "depended") {
              console.log(`     op ${index}: a later op depends on it`);
            }
          }
          if (deadOps.length > 0) {
            slimmable.push(`${file.key} (op ${deadOps.join(", ")})`);
          }
          break;
        }
      }
    }
  } finally {
    restore(outDir, baseline);
  }

  console.log("");
  console.log(
    `${files.length} file(s): ${needed} needed, ${depended} depended on, ${unused.length} with no effect`,
  );
  if (unused.length > 0) {
    console.log(`\nDelete, then \`pnpm generate ${pkg}\` and audit again:`);
    for (const key of unused) console.log(`  packages/${pkg}/patches/${key}`);
  }
  if (slimmable.length > 0) {
    console.log(`\nOps with no effect on their own:`);
    for (const line of slimmable) console.log(`  ${line}`);
  }
};

// ---------------------------------------------------------------------------

const [command, ...args] = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const onlyAt = args.indexOf("--only");
const only = onlyAt === -1 ? undefined : args[onlyAt + 1];
const positional = args.filter(
  (a, i) => !a.startsWith("--") && (onlyAt === -1 || i !== onlyAt + 1),
);

switch (command) {
  case "audit": {
    const pkg = positional[0];
    if (!pkg)
      die("usage: patches.ts audit <package> [--ops] [--only <substring>]");
    audit(pkg, { ops: flags.has("--ops"), only });
    break;
  }
  default:
    die("usage: patches.ts audit <package> [--ops] [--only <substring>]");
}
