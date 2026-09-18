/**
 * Distilled runtime benchmark runner.
 *
 *   bun run.ts                 quick profile (~1–2 min)
 *   bun run.ts --full          mitata's default budget per case (longer)
 *   bun run.ts --filter aws/   only cases whose name matches
 *   bun run.ts --json          JSON results on stdout (for CI artifacts)
 *   bun run.ts --record        also write results/latest.json (committed;
 *                              the distilled.cloud website reads it)
 *
 * Case names are `provider/service/op/stage`. See README.md for what each
 * stage measures and how to read the table.
 */
import { awsCases } from "./src/aws.ts";
import { baselineCases } from "./src/baseline.ts";
import { cloudflareCases } from "./src/cloudflare.ts";
import { parseArgs, printTable, runCases, type Result } from "./src/harness.ts";
import { toRecordFile, writeRecordFile } from "./src/record.ts";

const RESULTS_PATH = new URL("./results/latest.json", import.meta.url).pathname;

const opts = parseArgs(process.argv.slice(2));
const started = performance.now();

const importStart = performance.now();
const cases = [
  ...(await baselineCases()),
  ...(await awsCases()),
  ...(await cloudflareCases()),
];
const setupMs = performance.now() - importStart;

const total = opts.filter
  ? cases.filter((c) =>
      opts.filter!.test(`${c.provider}/${c.service}/${c.op}/${c.stage}`),
    ).length
  : cases.length;
let done = 0;
const results: Result[] = await runCases(cases, opts, (r) => {
  done++;
  if (!opts.json) {
    const status = r.error
      ? `ERROR ${r.error}`
      : `${(r.opsPerSec / 1e3).toFixed(1)}k ops/s`;
    process.stderr.write(
      `[${String(done).padStart(String(total).length)}/${total}] ${r.name}: ${status}\n`,
    );
  }
});

const elapsedMs = performance.now() - started;

if (opts.json) {
  console.log(
    JSON.stringify(
      {
        runtime: `bun ${Bun.version}`,
        profile: opts.full ? "full" : "quick",
        setupMs: Math.round(setupMs),
        elapsedMs: Math.round(elapsedMs),
        results,
      },
      null,
      2,
    ),
  );
} else {
  console.log("");
  console.log(
    `distilled runtime benches — bun ${Bun.version}, profile=${opts.full ? "full" : "quick"}, ` +
      `setup ${Math.round(setupMs)} ms, total ${(elapsedMs / 1000).toFixed(1)} s`,
  );
  console.log("times are per call; ops/sec = 1e9 / avg ns\n");
  printTable(results);
}

if (opts.record) {
  if (opts.filter) {
    console.error("--record refuses to write a partial table; drop --filter");
    process.exit(2);
  }
  const file = toRecordFile(results, opts.full ? "full" : "quick");
  writeRecordFile(RESULTS_PATH, file);
  console.error(
    `wrote ${RESULTS_PATH} (${file.results.length} cases, ${file.commit})`,
  );
}

if (results.some((r) => r.error)) process.exit(1);
