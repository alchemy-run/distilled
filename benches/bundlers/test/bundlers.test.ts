/**
 * The published SDKs load parts of themselves on first use (`import()` of a
 * protocol, a credential provider, a service, `cloudflare:sockets`). Each
 * bundler must keep those loads working: the bundled program prints the same
 * lines as the unbundled one.
 *
 * `BUNDLERS_BUILD=0` reuses the packages' current `lib/` instead of
 * building them first.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { caseId, CASES, SOCKETS_CASES, type Case, type Fixture } from "../src/cases.ts";
import { makeConsumer, runProgram, type Consumer } from "../src/consumer.ts";

let consumer: Consumer;
const baseline = new Map<Fixture, string[]>();
const socketHooks = () => ["--import", path.join(consumer.dir, "fixtures", "sockets-hooks.mjs")];

beforeAll(() => {
  consumer = makeConsumer({ build: process.env.BUNDLERS_BUILD !== "0" });
  baseline.set("node", runProgram(consumer.fixture("node"), consumer.home));
  baseline.set("browser", runProgram(consumer.fixture("browser"), consumer.home));
});

afterAll(() => {
  if (consumer && !process.env.BUNDLERS_KEEP) {
    fs.rmSync(consumer.dir, { recursive: true, force: true });
  }
});

const bundle = async (c: Case) => {
  const outDir = path.join(consumer.dir, "out", `${c.bundler.name}-${c.target}-${c.fixture}`);
  const result = await c.bundler.build(consumer.fixture(c.fixture), outDir, c.target);
  expect(result.errors).toEqual([]);
  return result;
};

/** No call failed because a module did not load. */
const expectAllLoaded = (lines: ReadonlyArray<string>) => {
  for (const line of lines) expect(line).not.toMatch(/failed to load|Cannot find module/);
};

describe("the unbundled programs", () => {
  it("load every lazy module", () => {
    const lines = [...baseline.get("node")!, ...baseline.get("browser")!];
    expect(lines.length).toBe(9);
    expectAllLoaded(lines);
  });
});

describe.each(CASES.map((c) => [caseId(c), c] as const))("%s", (_, c) => {
  it(c.runs ? "builds, and runs like the unbundled program" : "builds", async () => {
    const result = await bundle(c);
    if (!c.runs) return;
    // A bundler may leave an import it can't resolve for the runtime (rolldown
    // does): the bundle builds, then fails to load the module.
    const lines = runProgram(result.main, consumer.home);
    expectAllLoaded(lines);
    expect(lines).toEqual(baseline.get(c.fixture));
  });
});

describe("the cloudflare:sockets import reaches the runtime", () => {
  const reaches = async (c: Case) => {
    const result = await bundle(c);
    expect(runProgram(result.main, consumer.home, socketHooks())).toEqual([
      "cloudflare:sockets connect: stub socket opened",
    ]);
  };

  it("unbundled", () => {
    expect(runProgram(consumer.fixture("grpc-sockets"), consumer.home, socketHooks())).toEqual([
      "cloudflare:sockets connect: stub socket opened",
    ]);
  });

  for (const c of SOCKETS_CASES) {
    // webpack turns `import(variable)` into an empty context that always
    // rejects ("Cannot find module"); see todo.md (gRPC client).
    (c.bundler.name === "webpack" ? it.fails : it)(caseId(c), () => reaches(c));
  }
});
