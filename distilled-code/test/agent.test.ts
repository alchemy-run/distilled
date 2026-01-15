import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { describe, expect } from "vitest";
import { Agent } from "../src/agent.ts";
import { test } from "./test.ts";

const GENERATED_DIR = "test/fixtures/generated";

describe("Agent", () => {
  test(
    "generates and validates test file",
    { timeout: 300_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean up generated fixtures directory
      yield* fs
        .remove(GENERATED_DIR, { recursive: true })
        .pipe(Effect.catchAll(() => Effect.void));
      yield* fs.makeDirectory(GENERATED_DIR, { recursive: true });

      // Clean up existing session
      yield* fs
        .remove(".distilled/test/math.json")
        .pipe(Effect.catchAll(() => Effect.void));

      // Spawn a persistent agent
      const agent = yield* Agent.spawn("test/math");

      // Command 1: Read the source and generate tests
      yield* agent.send(`
        Read test/fixtures/math.ts and generate a comprehensive test file at ${GENERATED_DIR}/math.test.ts.
        
        Requirements:
        - Use vitest (import { describe, it, expect } from "vitest")
        - Import from "../math.ts" (relative path)
        - Test all functions: add, multiply, factorial, isPrime, fibonacci
        - Include edge cases (0, 1, negative numbers)
        - Use describe blocks to organize by function
      `);

      // Command 2: Run tests and iterate until they pass
      yield* agent.send(`
        Run the tests with: bun test ${GENERATED_DIR}/math.test.ts
        
        If any tests fail, read the error output, fix the test file, and run again.
        Keep iterating until all tests pass.
      `);

      // Verify test file was created and has expected content
      const testContent = yield* fs.readFileString(
        `${GENERATED_DIR}/math.test.ts`,
      );
      expect(testContent).toContain("describe");
      expect(testContent).toContain("add");
      expect(testContent).toContain("multiply");
      expect(testContent).toContain("factorial");
      expect(testContent).toContain("expect");

      // Verify session was persisted
      const sessionExists = yield* fs.exists(".distilled/test/math.json");
      expect(sessionExists).toBe(true);
    }),
  );

  // Schema for structured query response
  const MemoryResponse = Schema.Struct({
    code: Schema.String,
    remembered: Schema.Boolean,
  });

  test(
    "persists chat history across sessions",
    { timeout: 120_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean up
      yield* fs
        .remove(".distilled/test/memory.json")
        .pipe(Effect.catchAll(() => Effect.void));

      // Session 1: Establish memory
      const agent1 = yield* Agent.spawn("test/memory");
      yield* agent1.send(
        "I am telling you a secret code. Remember it exactly: DELTA-9-FOXTROT",
      );

      // Verify session was persisted with content
      const session1 = yield* fs.readFileString(".distilled/test/memory.json");
      expect(session1.length).toBeGreaterThan(100); // Should have real content

      // Session 2: Query with structured output
      const agent2 = yield* Agent.spawn("test/memory");
      const memory = yield* agent2.query(
        "What was the secret code I told you? Return it exactly as I said it.",
        MemoryResponse,
      );

      expect(memory.remembered).toBe(true);
      expect(memory.code.toUpperCase()).toContain("DELTA");
      expect(memory.code.toUpperCase()).toContain("FOXTROT");

      // Session 3: Verify continued persistence
      const agent3 = yield* Agent.spawn("test/memory");
      const memory2 = yield* agent3.query(
        "Do you still remember the secret code? What is it?",
        MemoryResponse,
      );

      expect(memory2.remembered).toBe(true);
      expect(memory2.code.toUpperCase()).toContain("DELTA");
    }),
  );

  test(
    "query returns structured data matching schema",
    { timeout: 60_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean up
      yield* fs
        .remove(".distilled/test/structured.json")
        .pipe(Effect.catchAll(() => Effect.void));

      const MathResult = Schema.Struct({
        operation: Schema.String,
        operands: Schema.Array(Schema.Number),
        result: Schema.Number,
      });

      const agent = yield* Agent.spawn("test/structured");
      const result = yield* agent.query(
        "Calculate 15 + 27 and return the result in structured form.",
        MathResult,
      );

      expect(result.operation).toContain("add");
      expect(result.operands).toContain(15);
      expect(result.operands).toContain(27);
      expect(result.result).toBe(42);
    }),
  );
});
