/**
 * Every test suite of the repo, run at the same time: the vitest tests, and
 * the protobuf and gRPC conformance suites (packages/core/conformance). CI's
 * Test job runs this. Each suite's output is printed when it ends, and the
 * run fails if any suite fails.
 *
 *   node scripts/test.ts [vitest|protobuf|grpc ...]
 *
 * Outside CI, a conformance suite whose submodule is not fetched is skipped
 * with a note; in CI it fails.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const CONFORMANCE = "packages/core/conformance";

interface Suite {
  readonly command: string;
  readonly args: ReadonlyArray<string>;
  /** The submodule the suite needs, relative to the root. */
  readonly submodule?: string;
}

const SUITES: Record<string, Suite> = {
  vitest: { command: "pnpm", args: ["vitest", "run"] },
  protobuf: {
    command: `${CONFORMANCE}/run.sh`,
    args: ["protobuf"],
    submodule: `${CONFORMANCE}/protobuf`,
  },
  grpc: { command: `${CONFORMANCE}/run.sh`, args: ["grpc"], submodule: `${CONFORMANCE}/connect` },
};

const names = process.argv.slice(2);
for (const name of names) {
  if (!(name in SUITES)) {
    console.error(`unknown suite ${name}; suites: ${Object.keys(SUITES).join(", ")}`);
    process.exit(2);
  }
}

interface Result {
  readonly name: string;
  readonly code: number;
  readonly seconds: number;
}

const run = (name: string, suite: Suite): Promise<Result> => {
  const start = Date.now();
  if (suite.submodule !== undefined && !existsSync(join(ROOT, suite.submodule, ".git"))) {
    if (!process.env.CI) {
      console.log(`- ${name}: skipped, ${suite.submodule} is not fetched; run`);
      console.log(`    git submodule update --init --depth 1 -- ${suite.submodule}`);
      return Promise.resolve({ name, code: 0, seconds: 0 });
    }
  }
  return new Promise((resolve) => {
    const output: Buffer[] = [];
    const child = spawn(suite.command, suite.args, { cwd: ROOT, env: process.env });
    child.stdout.on("data", (chunk: Buffer) => output.push(chunk));
    child.stderr.on("data", (chunk: Buffer) => output.push(chunk));
    const done = (code: number) => {
      const seconds = Math.round((Date.now() - start) / 100) / 10;
      const title = `${name}: ${code === 0 ? "passed" : `failed (exit ${code})`} in ${seconds}s`;
      // In the GitHub Actions log, a passed suite's output is collapsed.
      const group = process.env.GITHUB_ACTIONS !== undefined && code === 0;
      console.log(group ? `::group::${title}` : `--- ${title}`);
      process.stdout.write(Buffer.concat(output));
      if (group) console.log("::endgroup::");
      resolve({ name, code, seconds });
    };
    child.on("error", (error) => {
      output.push(Buffer.from(`${error.message}\n`));
      done(1);
    });
    child.on("close", (code) => done(code ?? 1));
  });
};

const selected = names.length > 0 ? names : Object.keys(SUITES);
const results = await Promise.all(selected.map((name) => run(name, SUITES[name]!)));

console.log("");
for (const { name, code, seconds } of results) {
  console.log(`${code === 0 ? "ok  " : "FAIL"} ${name} (${seconds}s)`);
}
process.exit(results.some((r) => r.code !== 0) ? 1 : 0);
