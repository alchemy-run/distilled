import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { describe, expect } from "vitest";
import { loadConfig } from "../src/config.ts";
import { spawn } from "../src/agent.ts";
import { CodingTools } from "../src/tools/index.ts";
import { test } from "./test.ts";

/**
 * Eval tests for the distilled config system.
 *
 * These tests verify end-to-end functionality of the agent configuration,
 * starting from a clean state and validating outputs.
 */
describe("Config Eval", () => {
  const SESSION_DIR = ".distilled/eval";

  /**
   * Clean up all session files for a fresh test.
   */
  const cleanupSessions = Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    yield* fs
      .remove(SESSION_DIR, { recursive: true })
      .pipe(Effect.catchAll(() => Effect.void));
    yield* fs.makeDirectory(SESSION_DIR, { recursive: true });
  });

  test(
    "loads config with agents",
    { timeout: 30_000 },
    Effect.gen(function* () {
      // Clean state
      yield* cleanupSessions;

      // Load the example config
      const config = yield* Effect.tryPromise(() =>
        loadConfig("./examples/smoke-test/distilled.config.ts"),
      );

      expect(config.name).toBeDefined();
      expect(config.agents).toBeDefined();
      expect(config.agents!.length).toBeGreaterThan(0);
    }),
  );

  test(
    "spawn agent and send message",
    { timeout: 60_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean state
      yield* fs
        .remove(".distilled/eval/test-agent.json")
        .pipe(Effect.catchAll(() => Effect.void));

      // Spawn an agent
      const agent = yield* spawn("eval/test-agent", {
        toolkit: CodingTools,
      });

      expect(agent.key).toBe("eval/test-agent");

      // Verify agent can send messages
      const response = yield* agent.send("Say exactly: EVAL_TEST_SUCCESS");
      expect(response.toUpperCase()).toContain("EVAL_TEST_SUCCESS");

      // Verify session was persisted
      const sessionExists = yield* fs.exists(".distilled/eval/test-agent.json");
      expect(sessionExists).toBe(true);
    }),
  );

  test(
    "agent query returns structured data",
    { timeout: 60_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean state
      yield* fs
        .remove(".distilled/eval/query-agent.json")
        .pipe(Effect.catchAll(() => Effect.void));

      const TaskAnalysis = Schema.Struct({
        taskType: Schema.String,
        complexity: Schema.Literal("low", "medium", "high"),
        estimatedSteps: Schema.Number,
      });

      const agent = yield* spawn("eval/query-agent", {
        toolkit: CodingTools,
      });

      const analysis = yield* agent.query(
        `Analyze this task: "Write a hello world function"
         Return the analysis as structured data.`,
        TaskAnalysis,
      );

      expect(analysis.taskType).toBeDefined();
      expect(["low", "medium", "high"]).toContain(analysis.complexity);
      expect(typeof analysis.estimatedSteps).toBe("number");
      expect(analysis.estimatedSteps).toBeGreaterThan(0);
    }),
  );

  test(
    "multiple agents maintain separate sessions",
    { timeout: 120_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean state
      yield* fs
        .remove(".distilled/eval/agent-a.json")
        .pipe(Effect.catchAll(() => Effect.void));
      yield* fs
        .remove(".distilled/eval/agent-b.json")
        .pipe(Effect.catchAll(() => Effect.void));

      // Create two agents with different identities
      const agentA = yield* spawn("eval/agent-a", {
        toolkit: CodingTools,
      });

      const agentB = yield* spawn("eval/agent-b", {
        toolkit: CodingTools,
      });

      // Tell each agent something unique
      yield* agentA.send(
        "Your name is ALPHA. Remember this. When asked your name, respond ALPHA.",
      );
      yield* agentB.send(
        "Your name is BETA. Remember this. When asked your name, respond BETA.",
      );

      // Re-spawn to verify persistence
      const agentA2 = yield* spawn("eval/agent-a", {
        toolkit: CodingTools,
      });
      const agentB2 = yield* spawn("eval/agent-b", {
        toolkit: CodingTools,
      });

      const NameResponse = Schema.Struct({
        name: Schema.String,
      });

      // Query each agent for their identity
      const responseA = yield* agentA2.query(
        "What is your name? Answer with just the name.",
        NameResponse,
      );
      const responseB = yield* agentB2.query(
        "What is your name? Answer with just the name.",
        NameResponse,
      );

      expect(responseA.name.toUpperCase()).toContain("ALPHA");
      expect(responseB.name.toUpperCase()).toContain("BETA");

      // Verify separate session files exist
      const sessionA = yield* fs.readFileString(".distilled/eval/agent-a.json");
      const sessionB = yield* fs.readFileString(".distilled/eval/agent-b.json");

      expect(sessionA).toContain("ALPHA");
      expect(sessionB).toContain("BETA");
      expect(sessionA).not.toContain("BETA");
      expect(sessionB).not.toContain("ALPHA");
    }),
  );

  test(
    "agent with tools can execute code tasks",
    { timeout: 180_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean state
      yield* fs
        .remove(".distilled/eval/code-agent.json")
        .pipe(Effect.catchAll(() => Effect.void));

      const outputDir = "test/fixtures/eval-output";
      yield* fs
        .remove(outputDir, { recursive: true })
        .pipe(Effect.catchAll(() => Effect.void));
      yield* fs.makeDirectory(outputDir, { recursive: true });

      const codeAgent = yield* spawn("eval/code-agent", {
        toolkit: CodingTools,
      });

      // Ask agent to create a simple file
      yield* codeAgent.send(`
        Create a file at ${outputDir}/hello.ts with a simple function:
        
        export function greet(name: string): string {
          return \`Hello, \${name}!\`;
        }
        
        Use the write tool to create this file.
      `);

      // Verify file was created
      const fileExists = yield* fs.exists(`${outputDir}/hello.ts`);
      expect(fileExists).toBe(true);

      const content = yield* fs.readFileString(`${outputDir}/hello.ts`);
      expect(content).toContain("greet");
      expect(content).toContain("Hello");
      expect(content).toContain("name");
    }),
  );
});
