import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { describe, expect } from "vitest";
import { agent, loadConfig, type ConfiguredAgent } from "../src/config.ts";
import {
  AgentRegistryService,
  spawnOrchestrator,
} from "../src/orchestrator.ts";
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
    "loads config and spawns agents",
    { timeout: 30_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean state
      yield* cleanupSessions;

      // Load the example config
      const config = yield* Effect.tryPromise(() =>
        loadConfig("./examples/distilled.config.ts"),
      );

      expect(config.name).toBe("example-project");
      expect(config.model).toBe("claude-sonnet");
      expect(config.agents).toBeDefined();

      // Verify agents effect produces configured agents
      // Note: We can't fully resolve the effect here without full layers,
      // but we can verify the config structure
      expect(config.orchestratorSystem).toContain("orchestrator");
    }),
  );

  test(
    "agent helper creates configured agent with metadata",
    { timeout: 60_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean state
      yield* fs
        .remove(".distilled/eval/test-agent.json")
        .pipe(Effect.catchAll(() => Effect.void));

      // Create a configured agent using the helper
      const configured: ConfiguredAgent = yield* agent("eval/test-agent", {
        tags: ["test", "eval"],
        description: "Test agent for eval",
      });

      expect(configured.path).toBe("eval/test-agent");
      expect(configured.metadata?.tags).toContain("test");
      expect(configured.metadata?.tags).toContain("eval");
      expect(configured.metadata?.description).toBe("Test agent for eval");
      expect(configured.agent).toBeDefined();
      expect(configured.agent.key).toBe("eval/test-agent");

      // Verify agent can send messages
      const response = yield* configured.agent.send(
        "Say exactly: EVAL_TEST_SUCCESS",
      );
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

      const configured = yield* agent("eval/query-agent", {
        tags: ["eval"],
        description: "Query test agent",
      });

      const analysis = yield* configured.agent.query(
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
      const agentA = yield* agent("eval/agent-a", {
        tags: ["eval", "a"],
        description: "Agent A",
      });

      const agentB = yield* agent("eval/agent-b", {
        tags: ["eval", "b"],
        description: "Agent B",
      });

      // Tell each agent something unique
      yield* agentA.agent.send(
        "Your name is ALPHA. Remember this. When asked your name, respond ALPHA.",
      );
      yield* agentB.agent.send(
        "Your name is BETA. Remember this. When asked your name, respond BETA.",
      );

      // Re-spawn to verify persistence
      const agentA2 = yield* agent("eval/agent-a", {
        tags: ["eval", "a"],
      });
      const agentB2 = yield* agent("eval/agent-b", {
        tags: ["eval", "b"],
      });

      const NameResponse = Schema.Struct({
        name: Schema.String,
      });

      // Query each agent for their identity
      const responseA = yield* agentA2.agent.query(
        "What is your name? Answer with just the name.",
        NameResponse,
      );
      const responseB = yield* agentB2.agent.query(
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
      const pathService = yield* Path.Path;

      // Clean state
      yield* fs
        .remove(".distilled/eval/code-agent.json")
        .pipe(Effect.catchAll(() => Effect.void));

      const outputDir = "test/fixtures/eval-output";
      yield* fs
        .remove(outputDir, { recursive: true })
        .pipe(Effect.catchAll(() => Effect.void));
      yield* fs.makeDirectory(outputDir, { recursive: true });

      const codeAgent = yield* agent("eval/code-agent", {
        tags: ["eval", "code"],
        description: "Agent that can write code",
      });

      // Ask agent to create a simple file
      yield* codeAgent.agent.send(`
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

  test(
    "orchestrator delegates to config agents end-to-end",
    { timeout: 300_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const registry = yield* AgentRegistryService;

      // Clean state - remove all orchestrator and agent sessions
      yield* fs
        .remove(".distilled/orchestrator", { recursive: true })
        .pipe(Effect.catchAll(() => Effect.void));
      yield* fs
        .remove(".distilled/test", { recursive: true })
        .pipe(Effect.catchAll(() => Effect.void));
      yield* fs
        .remove(".distilled/docs", { recursive: true })
        .pipe(Effect.catchAll(() => Effect.void));
      yield* fs
        .remove(".distilled/review", { recursive: true })
        .pipe(Effect.catchAll(() => Effect.void));

      const outputDir = "test/fixtures/orchestrator-output";
      yield* fs
        .remove(outputDir, { recursive: true })
        .pipe(Effect.catchAll(() => Effect.void));
      yield* fs.makeDirectory(outputDir, { recursive: true });

      // Load the example config
      const config = yield* Effect.tryPromise(() =>
        loadConfig("./examples/distilled.config.ts"),
      );

      // Spawn agents from config and register them
      const agents: ConfiguredAgent[] = config.agents
        ? yield* config.agents
        : [];

      expect(agents.length).toBeGreaterThan(0);

      // Register all agents with the orchestrator registry
      for (const { path, metadata } of agents) {
        yield* registry.spawn(
          path,
          metadata?.description || `Agent at ${path}`,
        );
      }

      // Verify agents are registered
      const registeredAgents = yield* registry.list();
      expect(registeredAgents.length).toBe(agents.length);

      // Spawn orchestrator
      const orchestrator = yield* spawnOrchestrator("orchestrator/e2e-test");

      // Send a task to the orchestrator that requires delegation
      const response = yield* orchestrator.send(`
        I have a simple TypeScript module at test/fixtures/math.ts.
        
        Please delegate to the "test/unit" agent to write a simple test file 
        at ${outputDir}/math.test.ts that tests the add function.
        
        The test should:
        - Import from "../../fixtures/math.ts"
        - Use vitest (import { describe, it, expect } from "vitest")
        - Test that add(2, 3) equals 5
        
        Use delegate_task to send this work to the test/unit agent.
      `);

      // Verify orchestrator used delegation
      expect(response.toLowerCase()).toMatch(/delegat|test\/unit|agent/);

      // Verify the test file was created by the delegated agent
      const testFileExists = yield* fs.exists(`${outputDir}/math.test.ts`);
      expect(testFileExists).toBe(true);

      const testContent = yield* fs.readFileString(`${outputDir}/math.test.ts`);
      expect(testContent).toContain("vitest");
      expect(testContent).toContain("add");
      expect(testContent).toContain("expect");

      // Query the orchestrator for a summary using structured output
      const SummarySchema = Schema.Struct({
        tasksCompleted: Schema.Number,
        agentsUsed: Schema.Array(Schema.String),
        success: Schema.Boolean,
      });

      const summary = yield* orchestrator.query(
        `Summarize what you did. How many tasks were completed? 
         Which agents did you delegate to? Was it successful?`,
        SummarySchema,
      );

      expect(summary.success).toBe(true);
      expect(summary.tasksCompleted).toBeGreaterThanOrEqual(1);
      expect(summary.agentsUsed.length).toBeGreaterThanOrEqual(1);
    }),
  );
});
