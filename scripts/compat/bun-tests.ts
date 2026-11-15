/**
 * Runs core's tests on Bun and compares the failures with
 * bun-failures.txt, as the protobuf conformance runner does: it fails on a
 * failure missing from the list and on a listed test that passes.
 *
 *   node scripts/compat/bun-tests.ts
 *
 * Needs `bun` on PATH. Bun runs vitest itself (`bun --bun`), so the tests
 * and core's code run on Bun's runtime and its `node:*` modules.
 */
import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(here, "../..");
const LIST = path.join(here, "bun-failures.txt");

const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "distilled-bun-")), "results.json");
const run = spawnSync(
  "bun",
  [
    "--bun",
    "node_modules/vitest/vitest.mjs",
    "run",
    "packages/core",
    // A hook that hangs (a test server that never closes) fails in 20 s,
    // and the run goes on.
    "--testTimeout=60000",
    "--hookTimeout=20000",
    "--reporter=default",
    "--reporter=json",
    `--outputFile.json=${out}`,
  ],
  { cwd: REPO, stdio: "inherit" },
);
if (run.error) throw run.error;
if (!fs.existsSync(out)) {
  console.error(`bun exited ${run.status} without writing ${out}`);
  process.exit(1);
}

interface Results {
  readonly testResults: ReadonlyArray<{
    readonly name: string;
    readonly message?: string;
    readonly assertionResults: ReadonlyArray<{
      readonly fullName: string;
      readonly status: string;
    }>;
  }>;
}
const results = JSON.parse(fs.readFileSync(out, "utf8")) as Results;

/** `<file> > <test>`, or `<file> (file)` for an error outside a test (a hook). */
const failed = new Set<string>();
for (const file of results.testResults) {
  const rel = path.relative(REPO, file.name);
  if (file.message) failed.add(`${rel} (file)`);
  for (const t of file.assertionResults) {
    if (t.status === "failed") failed.add(`${rel} > ${t.fullName}`);
  }
}

const expected = new Set(
  fs
    .readFileSync(LIST, "utf8")
    .split("\n")
    .map((line) => line.replace(/#.*$/, "").trim())
    .filter((line) => line !== ""),
);

const unexpected = [...failed].filter((id) => !expected.has(id));
const fixed = [...expected].filter((id) => !failed.has(id));
for (const id of unexpected) console.error(`FAILED, not in bun-failures.txt: ${id}`);
for (const id of fixed) console.error(`PASSED, remove from bun-failures.txt: ${id}`);
if (unexpected.length || fixed.length) process.exit(1);
console.log(`Bun: ${failed.size} expected failures, nothing else failed.`);
