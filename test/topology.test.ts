import * as Effect from "effect/Effect";
import { describe } from "vitest";
import {
  buildDependencyGraph,
  findTestableChains,
  scanAllPrefixes,
} from "../src/patch/topology.ts";
import { expectSnapshot, test } from "./test.ts";

describe("topology", () => {
  test("ec2-graph", (ctx) =>
    Effect.gen(function* () {
      const graph = yield* buildDependencyGraph("ec2");
      yield* expectSnapshot(ctx, graph);
    }));

  test("s3-graph", (ctx) =>
    Effect.gen(function* () {
      const graph = yield* buildDependencyGraph("s3");
      yield* expectSnapshot(ctx, graph);
    }));

  test("ec2-chains", (ctx) =>
    Effect.gen(function* () {
      const graph = yield* buildDependencyGraph("ec2");
      const chains = findTestableChains(graph);
      yield* expectSnapshot(ctx, chains);
    }));

  test("s3-chains", (ctx) =>
    Effect.gen(function* () {
      const graph = yield* buildDependencyGraph("s3");
      const chains = findTestableChains(graph);
      yield* expectSnapshot(ctx, chains);
    }));

  test(
    "all prefixes are classified",
    { timeout: 120_000 },
    Effect.gen(function* () {
      const result = yield* scanAllPrefixes();

      if (result.unknown.length > 0) {
        const details = result.unknown
          .map((p) => {
            const info = result.prefixes[p];
            return `  ${p}: ${info.count} ops (e.g., ${info.examples.join(", ")})`;
          })
          .join("\n");

        yield* Effect.fail(
          new Error(
            `Found ${result.unknown.length} unknown prefixes:\n${details}\n\n` +
              `Add these to the appropriate prefix array in topology.ts`,
          ),
        );
      }
    }),
  );
});
