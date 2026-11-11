// Records the branch being worked on, so the dashboard can show its steps
// apart from main's history. Writes src/work.json.
//
//   pnpm work                       # defaults below
//   WORK_REPO=… WORK_BRANCH=… WORK_GOAL="…" pnpm work
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const repo = process.env.WORK_REPO ?? join(import.meta.dirname, "..", "..", "..");
const branch = process.env.WORK_BRANCH ?? "perf/sdk-footprint";
const goal = process.env.WORK_GOAL ?? "Shrink SDK bundle size and import memory";
const git = (...a) => execFileSync("git", a, { cwd: repo, encoding: "utf8" }).trim();

const base = git("merge-base", branch, "origin/main");
const line = (sha) => {
  const [full, subject] = git("log", "-1", "--format=%H%x09%s", sha).split("\t");
  return { sha: full, subject };
};
const steps = git("rev-list", "--reverse", `${base}..${branch}`)
  .split("\n")
  .filter(Boolean)
  .map(line);
const work = { goal, branch, base: line(base), steps, updatedAt: new Date().toISOString() };
writeFileSync(
  join(import.meta.dirname, "..", "src", "work.json"),
  `${JSON.stringify(work, null, 2)}\n`,
);
console.log(`${branch}: ${steps.length} steps on top of ${base.slice(0, 9)}`);
