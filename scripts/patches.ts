#!/usr/bin/env node
import { existsSync } from "node:fs";
import { join } from "node:path";
/**
 * patches — find RFC-6902 patches a package's spec no longer needs.
 *
 *   pnpm patches:audit <pkg>… [--ops] [--only <substring>] [--jobs <n>]
 *   pnpm patches:names <pkg> [<substring>]
 *
 * `names` prints the shapes finalizeConvert renames after the patches
 * (final ← upstream): a Smithy patch targets the upstream id.
 *
 * Name the packages to audit; a convert-stage audit re-runs convert once
 * per patch file, so it is never run across the whole repo. The engine is
 * `@distilled.cloud/core/codegen/patch-audit`:
 *
 *   no effect   the model is identical without it — delete the file
 *   needed      the model differs; the report lists where
 *   depended on the build fails without it — a later patch targets what it
 *               adds, so the two go together
 *
 * A package is audited by running its `convert` on scratch copies
 * (`packages/.audit-<pkg>-<n>`), which needs its spec mirror (`specs:fetch`);
 * without it the package is reported as skipped. Files that only patch the
 * Smithy model are judged in memory after one convert; files that patch the
 * spec cost one convert each. `--jobs` sets how many copies convert at once
 * (default: from cores and free memory).
 *
 * `--ops` repeats the experiment for every op inside each needed file, so a
 * file that is only partly stale can be slimmed rather than kept whole.
 * `--only` restricts the audit to files whose path contains the substring.
 * Every verdict is one-at-a-time: delete, `pnpm generate <pkg>`, and audit
 * again until the list is empty.
 */
import {
  auditPackage,
  renameMaps,
  type FileVerdict,
} from "../packages/core/src/codegen/patch-audit.ts";

const ROOT = join(import.meta.dirname, "..");
const MAX_DIFF_LINES = 12;

const die = (message: string): never => {
  console.error(`❌ ${message}`);
  process.exit(1);
};

const printFile = ({ file, verdict, deadOps }: FileVerdict): void => {
  switch (verdict.kind) {
    case "unused":
      console.log(`🗑  ${file.key} — no effect (${file.ops} op(s))`);
      return;
    case "depended":
      console.log(`🔗 ${file.key} — the build fails without it`);
      console.log(`     ${verdict.error}`);
      return;
    case "needed":
      console.log(`✔  ${file.key} — needed (${file.ops} op(s))`);
      for (const line of verdict.diff.slice(0, MAX_DIFF_LINES)) console.log(`     ${line}`);
      if (verdict.diff.length > MAX_DIFF_LINES) {
        console.log(`     … ${verdict.diff.length - MAX_DIFF_LINES} more`);
      }
      for (const index of deadOps) console.log(`     op ${index}: no effect`);
  }
};

const args = process.argv.slice(2);
const [command] = args;
const usage =
  "usage: patches.ts audit <package>… [--ops] [--only <substring>] [--jobs <n>]\n" +
  "       patches.ts names <package> [<substring>]";

if (command === "names") {
  const [pkg, filter] = args.slice(1);
  if (!pkg) die(usage);
  const pkgDir = join(ROOT, "packages", pkg!);
  if (!existsSync(join(pkgDir, "package.json"))) die(`packages/${pkg} does not exist`);
  const result = await renameMaps(pkgDir);
  if (!result.ok) die(`convert failed: ${result.error}`);
  if (result.ok) {
    let shown = 0;
    for (const [model, map] of Object.entries(result.maps)) {
      for (const [from, to] of Object.entries(map)) {
        if (filter && !from.includes(filter) && !to.includes(filter)) continue;
        console.log(`${model}: ${to} ← ${from}`);
        shown++;
      }
    }
    console.log(`${shown} renamed shape(s): final ← upstream (patch the upstream id)`);
  }
  process.exit(0);
}
if (command !== "audit") die(usage);
const valueOf = (flag: string): string | undefined => {
  const at = args.indexOf(flag);
  return at === -1 ? undefined : args[at + 1];
};
const only = valueOf("--only");
const jobsArg = valueOf("--jobs");
const jobs = jobsArg === undefined ? undefined : Number(jobsArg);
if (jobs !== undefined && !(Number.isInteger(jobs) && jobs > 0))
  die("--jobs takes a positive integer");
const ops = args.includes("--ops");
const flagValues = new Set(
  ["--only", "--jobs"]
    .map((f) => args.indexOf(f))
    .filter((i) => i !== -1)
    .map((i) => i + 1),
);
const named = args.slice(1).filter((a, i) => !a.startsWith("--") && !flagValues.has(i + 1));

if (named.length === 0) die(usage);
const packages = named;

const toDelete: string[] = [];
const toSlim: string[] = [];
const skipped: string[] = [];
for (const pkg of packages) {
  const pkgDir = join(ROOT, "packages", pkg);
  if (!existsSync(join(pkgDir, "package.json"))) die(`packages/${pkg} does not exist`);
  console.log(`\n🔍 ${pkg}`);
  const started = Date.now();
  let judged = 0;
  const progress = process.stderr.isTTY
    ? () => process.stderr.write(`\r   ${++judged} judged…`)
    : () => {};
  const result = await auditPackage(pkgDir, {
    ops,
    only,
    jobs,
    onProgress: progress,
    onFile: (v) => {
      if (process.stderr.isTTY) process.stderr.write("\r\x1b[K");
      printFile(v);
    },
  });
  if (process.stderr.isTTY) process.stderr.write("\r\x1b[K");
  if (result.kind === "skipped") {
    console.log(`⏭  skipped: ${result.reason}`);
    skipped.push(`${pkg}: ${result.reason.split("\n")[0]}`);
    process.exitCode = 1;
    continue;
  }
  if (result.notAudited.length > 0) {
    console.log(`ℹ  ${result.notAudited.length} file(s) have no \`patches\` array — not audited`);
  }
  const counts = { unused: 0, needed: 0, depended: 0 };
  for (const { file, verdict, deadOps } of result.files) {
    counts[verdict.kind]++;
    if (verdict.kind === "unused") toDelete.push(`packages/${pkg}/patches/${file.key}`);
    if (deadOps.length > 0)
      toSlim.push(`packages/${pkg}/patches/${file.key} (op ${deadOps.join(", ")})`);
  }
  console.log(
    `${result.files.length} file(s): ${counts.needed} needed, ${counts.depended} depended on, ${counts.unused} with no effect`,
  );
  console.log(
    `   ${result.judged.inMemory} judged in memory, ${result.judged.perFile} by one convert each, in ${((Date.now() - started) / 1000).toFixed(1)}s`,
  );
}

if (packages.length > 1 || toDelete.length > 0 || toSlim.length > 0 || skipped.length > 0) {
  console.log("\n— summary —");
}
if (toDelete.length > 0) {
  console.log(`\nDelete, then \`pnpm generate <pkg>\` and audit again:`);
  for (const line of toDelete) console.log(`  ${line}`);
}
if (toSlim.length > 0) {
  console.log(`\nOps with no effect on their own:`);
  for (const line of toSlim) console.log(`  ${line}`);
}
if (skipped.length > 0) {
  console.log(
    `\nNot audited (fetch the spec with \`pnpm --filter @distilled.cloud/<pkg> run specs:fetch\`):`,
  );
  for (const line of skipped) console.log(`  ${line}`);
}
