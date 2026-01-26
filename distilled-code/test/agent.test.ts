import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import { describe, expect } from "vitest";
import { Agent, spawn } from "../src/agent.ts";
import { toText } from "../src/stream.ts";
import { test } from "./test.ts";

// Simple test agent
class TestAgent extends Agent("test-agent")`A simple test agent` {}

describe("Agent", () => {
  test(
    "send returns a stream of ThreadParts",
    { timeout: 60_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean state
      yield* fs
        .remove(".distilled/state/test-agent.state.json")
        .pipe(Effect.catchAll(() => Effect.void));

      const myAgent = yield* spawn(TestAgent);

      // Collect stream parts
      const parts: unknown[] = [];
      yield* Stream.runForEach(myAgent.send("Say hello"), (part) =>
        Effect.sync(() => parts.push(part)),
      );

      // Verify we received stream parts
      expect(parts.length).toBeGreaterThan(0);

      // Verify part types
      const partTypes = parts.map((p: any) => p.type);
      expect(partTypes).toContain("text-start");
      expect(partTypes).toContain("text-delta");
      expect(partTypes).toContain("text-end");
    }),
  );

  test(
    "toText extracts text from stream",
    { timeout: 60_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean state
      yield* fs
        .remove(".distilled/state/test-agent.state.json")
        .pipe(Effect.catchAll(() => Effect.void));

      const myAgent = yield* spawn(TestAgent);

      // Use toText to extract the response
      const response = yield* myAgent
        .send("Say exactly: HELLO_WORLD")
        .pipe(toText("last-message"));

      expect(response.toUpperCase()).toContain("HELLO");
    }),
  );

  test(
    "agent persists chat history",
    { timeout: 120_000 },
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      // Clean state
      yield* fs
        .remove(".distilled/state/test-agent.state.json")
        .pipe(Effect.catchAll(() => Effect.void));

      // Session 1: Tell agent a secret
      const agent1 = yield* spawn(TestAgent);
      yield* agent1
        .send("Remember this code: ALPHA-123")
        .pipe(toText("last-message"));

      // Verify state was persisted
      const stateExists = yield* fs.exists(
        ".distilled/state/test-agent.state.json",
      );
      expect(stateExists).toBe(true);

      // Session 2: Ask agent to recall
      const agent2 = yield* spawn(TestAgent);
      const response = yield* agent2
        .send("What code did I tell you to remember?")
        .pipe(toText("last-message"));

      expect(response.toUpperCase()).toContain("ALPHA");
    }),
  );
});
