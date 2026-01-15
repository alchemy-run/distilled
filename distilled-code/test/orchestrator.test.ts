import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { describe, expect } from "vitest";
import { spawnOrchestrator } from "../src/orchestrator.ts";
import { test } from "./test.ts";

describe("Orchestrator", () => {
  test(
    "delegates tasks to sub-agents",
    { timeout: 120_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean up
      yield* fs
        .remove(".distilled/test/orchestrator.json")
        .pipe(Effect.catchAll(() => Effect.void));
      yield* fs
        .remove(".distilled/test/sub-agent-1.json")
        .pipe(Effect.catchAll(() => Effect.void));

      const orchestrator = yield* spawnOrchestrator("test/orchestrator");

      // Ask orchestrator to delegate a math task
      const response = yield* orchestrator.send(`
        Delegate a simple task to a sub-agent called "sub-agent-1" with description "Math helper".
        Ask it: "What is 5 + 7?"
        Return the answer you received.
      `);

      expect(response).toBeTruthy();

      // Check that sub-agent was created
      const agents = yield* orchestrator.listAgents();
      expect(agents.length).toBeGreaterThanOrEqual(1);

      const subAgent = agents.find((a) => a.key === "sub-agent-1");
      expect(subAgent).toBeDefined();
      expect(subAgent?.description).toContain("Math");
    }),
  );

  test(
    "tracks multiple sub-agents",
    { timeout: 120_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean up
      yield* fs
        .remove(".distilled/test/multi-orchestrator.json")
        .pipe(Effect.catchAll(() => Effect.void));

      const orchestrator = yield* spawnOrchestrator("test/multi-orchestrator");

      // Create multiple agents
      yield* orchestrator.send(`
        Create two sub-agents:
        1. "writer" with description "Documentation writer" - ask it to say hello
        2. "reviewer" with description "Code reviewer" - ask it to say hi
      `);

      const agents = yield* orchestrator.listAgents();
      expect(agents.length).toBeGreaterThanOrEqual(2);

      const writer = agents.find((a) => a.key === "writer");
      const reviewer = agents.find((a) => a.key === "reviewer");

      expect(writer).toBeDefined();
      expect(reviewer).toBeDefined();
    }),
  );

  const StatusResponse = Schema.Struct({
    agentCount: Schema.Number,
    activeAgents: Schema.Array(Schema.String),
  });

  test(
    "queries structured data about agents",
    { timeout: 60_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean up
      yield* fs
        .remove(".distilled/test/query-orchestrator.json")
        .pipe(Effect.catchAll(() => Effect.void));

      const orchestrator = yield* spawnOrchestrator("test/query-orchestrator");

      // First create an agent
      yield* orchestrator.send(`
        Delegate a task to "helper" with description "General helper" - 
        just ask it to confirm it's ready.
      `);

      // Query structured data
      const status = yield* orchestrator.query(
        "How many sub-agents are active? Return their keys.",
        StatusResponse,
      );

      expect(status.agentCount).toBeGreaterThanOrEqual(1);
      expect(status.activeAgents).toContain("helper");
    }),
  );
});
