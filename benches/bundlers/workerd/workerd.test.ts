/**
 * The published SDKs in workerd, the runtime of Cloudflare Workers. esbuild
 * bundles the shared calls the way wrangler does (the `workerd`, `worker` and
 * `browser` conditions), and `workerd test` runs the bundle. The Worker
 * prints the same lines as the unbundled program in Node, or the test fails.
 *
 * `BUNDLERS_BUILD=0` reuses the packages' current `lib/` instead of
 * building them first.
 */
import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import { createRequire } from "node:module";
import * as path from "node:path";
import { afterAll, beforeAll, expect, it } from "vitest";
import { esbuild } from "../src/bundlers.ts";
import { makeConsumer, runProgram, type Consumer } from "../src/consumer.ts";

/** The `workerd` binary of the pinned `workerd` package. */
const WORKERD = path.join(
  path.dirname(createRequire(import.meta.url).resolve("workerd/package.json")),
  "bin",
  "workerd",
);

/** `nodejs_compat` is on by default from compatibility date 2026-08-04. */
const config = `using Workerd = import "/workerd/workerd.capnp";

const config :Workerd.Config = (
  services = [ (name = "main", worker = .worker) ],
);

const worker :Workerd.Worker = (
  modules = [ (name = "main.mjs", esModule = embed "main.mjs") ],
  compatibilityDate = "2026-10-01",
);
`;

let consumer: Consumer;

beforeAll(() => {
  consumer = makeConsumer({ build: process.env.BUNDLERS_BUILD !== "0" });
});

afterAll(() => {
  if (consumer && !process.env.BUNDLERS_KEEP) {
    fs.rmSync(consumer.dir, { recursive: true, force: true });
  }
});

it("runs the shared calls like the unbundled program", async () => {
  // The browser fixture runs only the shared calls.
  const expected = runProgram(consumer.fixture("browser"), consumer.home);
  expect(expected.length).toBe(4);
  for (const line of expected) expect(line).not.toMatch(/failed to load|Cannot find module/);
  fs.writeFileSync(path.join(consumer.dir, "fixtures", "expected.json"), JSON.stringify(expected));

  const outDir = path.join(consumer.dir, "out", "workerd");
  const bundle = await esbuild.build(consumer.fixture("workerd"), outDir, "workerd");
  expect(bundle.errors).toEqual([]);
  fs.writeFileSync(path.join(outDir, "config.capnp"), config);

  const r = spawnSync(WORKERD, ["test", "config.capnp"], {
    cwd: outDir,
    encoding: "utf8",
    timeout: 120_000,
  });
  expect(`exit ${r.status}\n${r.stdout}${r.stderr}`).toMatch(/^exit 0\n/);
});
