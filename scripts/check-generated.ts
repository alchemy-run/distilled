#!/usr/bin/env node
/**
 * check-generated — regenerate the SDKs a change touches and fail if the
 * committed code differs. CI runs it in the merge queue (ci.yml, Lint job).
 *
 *   node scripts/check-generated.ts <base-sha>
 *
 * It diffs <base-sha> against HEAD and picks the packages to regenerate:
 *
 * - a changed file under packages/<pkg>/, for a package with a `generate`
 *   script, picks <pkg> (a hand edit under src/services, a patch, a
 *   generator script, a spec-mirror bump);
 * - a changed file in the shared generator (packages/dev/src/codegen/, which
 *   every package's scripts import, or scripts/generate-all.ts) picks every
 *   package.
 *
 * Each package's generator reads only its own spec mirror, so the script
 * fetches just those mirrors at their pinned commits, runs `pnpm generate`
 * on the picked packages and compares the result with HEAD. package.json is
 * left out: `distilled.generatedAt` is today's date. The formatter needs no
 * check here: `pnpm format:check` already covers the generated files.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { appendFileSync, existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const SHARED = ["packages/dev/src/codegen/", "scripts/generate-all.ts"];

const base = process.argv[2];
if (!base) {
  console.error("usage: node scripts/check-generated.ts <base-sha>");
  process.exit(2);
}

const git = (...args: string[]) =>
  execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 1 << 30 });
const run = (cmd: string, args: string[]) => {
  console.log(`$ ${cmd} ${args.join(" ")}`);
  const { status } = spawnSync(cmd, args, { cwd: root, stdio: "inherit" });
  if (status !== 0) process.exit(status ?? 1);
};
const summary = (text: string) => {
  const file = process.env.GITHUB_STEP_SUMMARY;
  if (file) appendFileSync(file, `${text}\n`);
};

/** packages/<name> directories with a `generate` script. */
const generated = readdirSync(join(root, "packages"))
  .filter((name) => {
    const pkgJson = join(root, "packages", name, "package.json");
    return existsSync(pkgJson) && JSON.parse(readFileSync(pkgJson, "utf8")).scripts?.generate;
  })
  .sort();

// A merge-queue checkout has only HEAD. Comparing two trees needs no history.
if (spawnSync("git", ["cat-file", "-e", `${base}^{commit}`], { cwd: root }).status !== 0) {
  run("git", ["fetch", "--depth=1", "--no-tags", "origin", base]);
}
const changed = git("diff", "--name-only", "--no-renames", base, "HEAD")
  .split("\n")
  .filter(Boolean);

const shared = changed.filter((file) => SHARED.some((prefix) => file.startsWith(prefix)));
const touched = shared.length
  ? generated
  : generated.filter((name) => changed.some((file) => file.startsWith(`packages/${name}/`)));

// A new SDK merges before its mirror exists; the PR that links the mirror
// gets the check. The gitlinks are read from HEAD's tree, not the work tree.
const mirrored = new Set(
  (touched.length
    ? git("ls-tree", "-r", "HEAD", "--", ...touched.map((name) => `packages/${name}/specs`))
    : ""
  )
    .split("\n")
    .filter((line) => line.split(/\s+/)[1] === "commit")
    .map((line) => line.split("\t")[1]!.split("/")[1]!),
);
const picked = touched.filter((name) => mirrored.has(name));
const unmirrored = touched.filter((name) => !mirrored.has(name));
if (unmirrored.length) {
  console.log(`skipping ${unmirrored.join(", ")}: no spec mirror gitlink yet`);
}

if (picked.length === 0) {
  console.log(`${changed.length} changed file(s), no generated SDK among them: nothing to check.`);
  process.exit(0);
}
console.log(
  shared.length
    ? `the shared generator changed (${shared.slice(0, 5).join(", ")}${shared.length > 5 ? ", …" : ""}): checking all ${picked.length} SDKs`
    : `checking ${picked.length} SDK(s): ${picked.join(", ")}`,
);

const paths = picked.map((name) => `packages/${name}`);
run("git", ["submodule", "update", "--init", "--depth=1", "--jobs=8", "--", ...paths]);
run("pnpm", ["generate", ...picked]);

const status = git(
  "status",
  "--porcelain",
  "--untracked-files=all",
  "--",
  ...paths,
  ":(exclude)packages/*/package.json",
).trimEnd();
if (!status) {
  console.log(`\n✅ the committed code of ${picked.length} SDK(s) matches the generator`);
  process.exit(0);
}

const files = status.split("\n");
const owners = [...new Set(files.map((line) => line.slice(3).split("/")[1]))].sort();
console.error(
  `\n❌ ${files.length} generated file(s) differ from the committed code in: ${owners.join(", ")}`,
);
console.error(files.slice(0, 50).join("\n") + (files.length > 50 ? "\n…" : ""));
console.error(git("diff", "--stat", "--", ...paths, ":(exclude)packages/*/package.json"));
console.error(
  `Generated code comes only from the generator (AGENTS.md rule 2). Run \`pnpm generate ${owners.join(" ")}\` and commit the result.`,
);
summary(
  `### Generated code differs from the generator\n\n${owners.map((o) => `- \`${o}\``).join("\n")}\n\nRun \`pnpm generate ${owners.join(" ")}\` and commit the result.`,
);
process.exit(1);
