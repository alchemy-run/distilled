#!/usr/bin/env node
/**
 * generate-all — regenerate every SDK in the monorepo, then format.
 *
 * For each packages/<p> with a `generate` script: runs `convert` first when
 * the package has one (openapi/discovery/graphql providers convert their
 * spec submodule into .generated-specs), then `generate` (the shared
 * smithy→SDK compiler). Packages run through a small pool; a single
 * repo-wide `oxfmt` pass runs at the end (generated output is committed
 * formatted — never diff regeneration results before formatting).
 *
 * Usage: pnpm generate            # all packages
 *        pnpm generate neon aws   # just these packages
 */
import { spawn, spawnSync } from "node:child_process";
import { readdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const only = new Set(process.argv.slice(2));

interface Job {
  name: string;
  steps: string[]; // package.json script names, in order
}

const jobs: Job[] = [];
for (const name of readdirSync(join(root, "packages")).sort()) {
  if (only.size && !only.has(name)) continue;
  const pkgJson = join(root, "packages", name, "package.json");
  if (!existsSync(pkgJson)) continue;
  const scripts = JSON.parse(readFileSync(pkgJson, "utf8")).scripts ?? {};
  if (!scripts.generate) continue;
  const steps = ["convert", "generate"].filter((s) => scripts[s]);
  jobs.push({ name, steps });
}

if (jobs.length === 0) {
  console.error(
    only.size
      ? `no matching packages: ${[...only].join(", ")}`
      : "no packages with a generate script",
  );
  process.exit(1);
}

console.log(`generating ${jobs.length} package(s): ${jobs.map((j) => j.name).join(", ")}`);

/** Runs `pnpm run <script>` in `cwd`; resolves to the exit code and captured output. */
const pnpmRun = (script: string, cwd: string) =>
  new Promise<{ code: number; output: string }>((resolve, reject) => {
    const proc = spawn("pnpm", ["run", script], { cwd, stdio: ["ignore", "pipe", "pipe"] });
    const chunks: Buffer[] = [];
    proc.stdout.on("data", (c: Buffer) => chunks.push(c));
    proc.stderr.on("data", (c: Buffer) => chunks.push(c));
    proc.on("error", reject);
    proc.on("close", (code, signal) =>
      resolve({ code: code ?? (signal ? 128 : 1), output: Buffer.concat(chunks).toString() }),
    );
  });

const CONCURRENCY = 4;
const failures: string[] = [];
const queue = [...jobs];

const runJob = async (job: Job) => {
  const t0 = performance.now();
  for (const step of job.steps) {
    const { code, output } = await pnpmRun(step, join(root, "packages", job.name));
    if (code !== 0) {
      failures.push(job.name);
      console.error(
        `❌ ${job.name} ${step} (exit ${code})\n${output.split("\n").slice(-15).join("\n")}`,
      );
      return;
    }
  }
  console.log(
    `✅ ${job.name} (${job.steps.join("+")}, ${((performance.now() - t0) / 1000).toFixed(1)}s)`,
  );
};

await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    for (let job = queue.shift(); job; job = queue.shift()) await runJob(job);
  }),
);

if (failures.length) {
  console.error(`\n${failures.length} package(s) failed: ${failures.join(", ")}`);
  process.exit(1);
}

console.log("\nformatting…");
const fmt = spawnSync("pnpm", ["run", "format"], { cwd: root, stdio: "inherit" });
process.exit(fmt.status ?? 1);
