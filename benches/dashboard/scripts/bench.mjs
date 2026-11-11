// Run the distilled per-SDK benchmarks and store the run in ./runs.
//
//   pnpm bench                         every suite, every SDK
//   pnpm bench -- --only aws,resend    any flag of benches/sdks/run.ts
//   pnpm bench -- --experiment "lazy x" a one-off run: kept off the timeline,
//                                      compared in the Experiments section
//   DISTILLED_REPO=~/other/distilled pnpm bench   another checkout
//
// Offline: the suite only reads the local checkout.
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
// Keep the branch commit list current, so new runs land on the branch side of the charts.
process.on("exit", () => {
  try {
    execFileSync("node", [join(import.meta.dirname, "work.mjs")], { stdio: "ignore" });
  } catch {}
});

// Default: the distilled checkout this dashboard lives in (benches/dashboard).
const DEFAULT_REPO = join(import.meta.dirname, "..", "..", "..");
const repo = process.env.DISTILLED_REPO ?? DEFAULT_REPO;
const runner = join(repo, "benches", "sdks", "run.ts");
if (!existsSync(runner)) {
  console.error(`no benches/sdks/run.ts in ${repo}; set DISTILLED_REPO`);
  process.exit(1);
}
const runs = join(import.meta.dirname, "..", "runs");
const args = process.argv.slice(2).filter((a) => a !== "--");
// --experiment <name> is stored as the run's note ("experiment: <name>"); the page keys off that prefix.
const exp = args.indexOf("--experiment");
if (exp !== -1) {
  const name = args[exp + 1];
  if (!name || name.startsWith("--")) {
    console.error('usage: pnpm bench -- --experiment "what I tried"');
    process.exit(2);
  }
  args.splice(exp, 2, "--note", `experiment: ${name}`);
}
const { FORCE_COLOR: _, ...env } = process.env;
const res = spawnSync("node", [runner, "--history", runs, ...args], {
  cwd: repo,
  env,
  stdio: "inherit",
});
process.exit(res.status ?? 1);
