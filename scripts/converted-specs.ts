/**
 * Download converted Smithy models (`packages/<pkg>/.generated-specs/`) from
 * the `Converted specs` workflow instead of converting them locally. Needs the
 * GitHub CLI (`gh`), signed in.
 *
 *   pnpm specs:converted gcp aws          # main's newest successful run
 *   pnpm specs:converted gcp --pr 933     # a PR's newest successful run
 *   pnpm specs:converted gcp --sha <sha>  # the run for one commit
 *   pnpm specs:converted                  # every package
 *
 * The models match the commit the run converted, which it prints; they can
 * trail your branch. To convert your own patches, run `pnpm convert` in the
 * package instead (after `pnpm --filter @distilled.cloud/<pkg> run specs:fetch`).
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const REPO = "alchemy-run/distilled";
const ROOT = join(import.meta.dirname, "..");

const args = process.argv.slice(2);
const option = (name: string) => {
  const i = args.indexOf(`--${name}`);
  if (i < 0) return undefined;
  const value = args[i + 1];
  if (!value || value.startsWith("--")) throw new Error(`--${name} needs a value`);
  args.splice(i, 2);
  return value;
};
const pr = option("pr");
const sha = option("sha");
const packages = args;

const gh = (...a: string[]) => execFileSync("gh", a, { encoding: "utf8" }).trim();

interface Run {
  readonly databaseId: number;
  readonly headSha: string;
  readonly headBranch: string;
  readonly createdAt: string;
}
/** Newest first. By workflow path, so runs on a branch count before the workflow is on main. */
const runs = (branch?: string, headSha?: string): Run[] =>
  JSON.parse(
    gh(
      "api",
      `repos/${REPO}/actions/runs?status=success&per_page=100${branch ? `&branch=${encodeURIComponent(branch)}` : ""}${headSha ? `&head_sha=${headSha}` : ""}`,
      "--jq",
      `[.workflow_runs[] | select(.path == ".github/workflows/converted-specs.yml") | { databaseId: .id, headSha: .head_sha, headBranch: .head_branch, createdAt: .created_at }]`,
    ),
  );

const run = (() => {
  if (sha)
    return runs(undefined, sha.length === 40 ? sha : undefined).find((r) =>
      r.headSha.startsWith(sha),
    );
  if (pr)
    return runs(
      gh("pr", "view", pr, "--repo", REPO, "--json", "headRefName", "-q", ".headRefName"),
    )[0];
  return runs("main")[0];
})();
if (!run) {
  console.error(
    `No successful "Converted specs" run for ${sha ? `commit ${sha}` : pr ? `PR #${pr}` : "main"}. Artifacts expire after 90 days.`,
  );
  process.exit(1);
}
console.log(
  `run ${run.databaseId}: ${run.headBranch} ${run.headSha.slice(0, 9)}, ${run.createdAt.slice(0, 16).replace("T", " ")} UTC`,
);

const dir = mkdtempSync(join(tmpdir(), "converted-specs-"));
gh(
  "run",
  "download",
  String(run.databaseId),
  "--repo",
  REPO,
  "--name",
  "converted-specs",
  "--dir",
  dir,
);

// upload-artifact strips the common `packages/` prefix: <dir>/<pkg>/.generated-specs/.
const available = readdirSync(dir).filter((p) =>
  [".generated-specs", ".generated-graphql"].some((d) => existsSync(join(dir, p, d))),
);
const wanted = packages.length ? packages : available;
const missing = wanted.filter((p) => !available.includes(p));
for (const pkg of wanted.filter((p) => available.includes(p))) {
  for (const sub of [".generated-specs", ".generated-graphql"]) {
    const from = join(dir, pkg, sub);
    if (!existsSync(from)) continue;
    const to = join(ROOT, "packages", pkg, sub);
    rmSync(to, { recursive: true, force: true });
    cpSync(from, to, { recursive: true });
    console.log(`  packages/${pkg}/${sub}`);
  }
}
rmSync(dir, { recursive: true, force: true });
if (missing.length) {
  console.error(`Not in this run: ${missing.join(", ")}`);
  process.exit(1);
}
