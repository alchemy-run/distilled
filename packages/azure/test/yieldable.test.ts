import { Effect, Layer } from "effect";
import { describe, expect, it } from "vitest";
import { ResourceGroupsList } from "../src/services/resources";
import { runEffect } from "./setup";

describe("OperationMethod yieldable", () => {
  it(
    "direct call - yield* operation(input) works with services in context",
    async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const groups = yield* ResourceGroupsList({});
          return groups;
        }),
      );
      expect(result).toBeDefined();
      expect(Array.isArray(result.value)).toBe(true);
    },
    { timeout: 30_000 },
  );

  it(
    "yield first - yield* operation captures services and returns requirement-free function",
    async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          // yield* the operation itself (not calling it) to capture Credentials + HttpClient
          const list = yield* ResourceGroupsList;

          // The returned function has Effect<..., ..., never> — no requirements
          const groups = yield* list({});
          return groups;
        }),
      );
      expect(result).toBeDefined();
      expect(Array.isArray(result.value)).toBe(true);
    },
    { timeout: 30_000 },
  );

  it(
    "yield first function works without service context",
    async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          // Capture services into a requirement-free function
          const list = yield* ResourceGroupsList;

          // Run the requirement-free function with an empty layer —
          // proves the returned function truly has no requirements
          const groups = yield* list({}).pipe(Effect.provide(Layer.empty));
          return groups;
        }),
      );
      expect(result).toBeDefined();
      expect(Array.isArray(result.value)).toBe(true);
    },
    { timeout: 30_000 },
  );
});
