/**
 * Distilled typecheck benchmark runner.
 *
 *   bun run.ts                 core, aws, cloudflare, monorepo (a few minutes)
 *   bun run.ts --full          every SDK package + monorepo (longer)
 *   bun run.ts --runs 3        best of 3 clean+incremental cycles per row
 *   bun run.ts --filter aws    only targets whose name matches
 *   bun run.ts --json          JSON results on stdout
 *   bun run.ts --record        also write results/latest.json (committed)
 *
 * Every target is measured four ways: `emit` (`tsc -b`, the repo's default
 * `noCheck: true`) and `check` (`tsc -b --noCheck false`, what CI runs),
 * each from clean (outputs deleted first) and then incremental (run again
 * with nothing changed). See README.md for what is deleted and how to read
 * the table.
 */
import {
  measureTarget,
  parseArgs,
  printTable,
  type Measurement,
  type Mode,
} from "./src/harness.ts";
import { toRecordFile, writeRecordFile } from "./src/record.ts";
import { allTargets } from "./src/targets.ts";

const RESULTS_PATH = new URL("./results/latest.json", import.meta.url).pathname;

const opts = parseArgs(process.argv.slice(2));
const started = performance.now();

const targets = allTargets(opts.full).filter(
  (t) => !opts.filter || opts.filter.test(t.name),
);
if (targets.length === 0) {
  console.error("no targets match --filter");
  process.exit(2);
}

const MODES: ReadonlyArray<Mode> = ["emit", "check"];
const total = targets.length * MODES.length * 2;
let done = 0;
const results: Measurement[] = [];

// Mode is the outer loop so every referenced project (core) has already been
// built under the same mode before a dependent package's row runs; the
// `projects` column shows when that isolation failed (should read 1 for a
// package row).
for (const mode of MODES) {
  for (const target of targets) {
    if (!opts.json) {
      process.stderr.write(
        `${target.name} ${mode}: ${opts.runs > 1 ? `${opts.runs}× ` : ""}clean + incremental…\n`,
      );
    }
    const [clean, incr] = await measureTarget(target, mode, opts.runs, (m) => {
      done++;
      if (opts.json) return;
      const status = m.error
        ? `ERROR ${m.error}`
        : `${m.wallSec.toFixed(2)} s, ${(m.peakRssMiB / 1024).toFixed(2)} GiB peak`;
      process.stderr.write(
        `[${String(done).padStart(String(total).length)}/${total}] ${m.target} ${m.mode} ${m.run}: ${status}\n`,
      );
    });
    results.push(clean, incr);
  }
}

const elapsedSec = (performance.now() - started) / 1000;
const profile = opts.full ? "full" : "quick";

if (opts.json) {
  console.log(
    JSON.stringify(
      { profile, runs: opts.runs, elapsedSec: Math.round(elapsedSec), results },
      null,
      2,
    ),
  );
} else {
  console.log("");
  console.log(
    `distilled typecheck benches — profile=${profile}, runs=${opts.runs}, ` +
      `total ${elapsedSec.toFixed(0)} s`,
  );
  console.log(
    "emit = tsc -b (noCheck true, `pnpm typecheck`); check = tsc -b --noCheck false (`pnpm typecheck:ci`)",
  );
  console.log(
    "clean = lib/ + *.tsbuildinfo deleted first; incr = re-run with no changes\n",
  );
  printTable(results);
}

if (opts.record) {
  if (opts.filter) {
    console.error("--record refuses to write a partial table; drop --filter");
    process.exit(2);
  }
  const file = toRecordFile(results, profile, opts.runs);
  writeRecordFile(RESULTS_PATH, file);
  console.error(
    `wrote ${RESULTS_PATH} (${file.results.length} rows, ${file.commit})`,
  );
}

if (results.some((r) => r.error)) process.exit(1);
