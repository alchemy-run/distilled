import { expect } from "@effect/vitest";
import { describe } from "vitest";
import { Effect, Layer } from "effect";
import { getCallerIdentity } from "../../src/services/sts.ts";
import { test } from "../test.ts";

describe("OperationMethod yieldable", () => {
  test(
    "direct call - yield* operation(input) works with services in context",
    Effect.gen(function* () {
      const result = yield* getCallerIdentity({});
      expect(result).toBeDefined();
      expect(result.Account).toBeDefined();
      expect(result.Arn).toBeDefined();
      expect(result.UserId).toBeDefined();
    }),
  );

  test(
    "yield first - yield* operation captures services and returns requirement-free function",
    Effect.gen(function* () {
      // yield* the operation itself (not calling it) to capture services
      const callerId = yield* getCallerIdentity;

      // The returned function has Effect<..., ..., never> — no requirements
      const result = yield* callerId({});
      expect(result).toBeDefined();
      expect(result.Account).toBeDefined();
      expect(result.Arn).toBeDefined();
    }),
  );

  test(
    "yield first function works without service context",
    Effect.gen(function* () {
      // Capture services into a requirement-free function
      const callerId = yield* getCallerIdentity;

      // Run the requirement-free function with an empty layer —
      // proves the returned function truly has no requirements
      const result = yield* callerId({}).pipe(Effect.provide(Layer.empty));
      expect(result).toBeDefined();
      expect(result.Account).toBeDefined();
    }),
  );
});
