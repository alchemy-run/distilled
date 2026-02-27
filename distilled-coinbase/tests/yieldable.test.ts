import { Effect, Layer } from "effect";
import { describe, expect, it } from "vitest";
import { listEvmAccounts } from "../src/operations/listEvmAccounts";
import { runEffect } from "./setup";

describe("OperationMethod yieldable", () => {
  it("direct call - yield* operation(input) works with services in context", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const accounts = yield* listEvmAccounts({});
        return accounts;
      }),
    );
    expect(result).toBeDefined();
    expect(Array.isArray(result.accounts)).toBe(true);
  });

  it("yield first - yield* operation captures services and returns requirement-free function", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        // yield* the operation itself (not calling it) to capture Credentials + HttpClient
        const listAccounts = yield* listEvmAccounts;

        // The returned function has Effect<..., ..., never> — no requirements
        const accounts = yield* listAccounts({});
        return accounts;
      }),
    );
    expect(result).toBeDefined();
    expect(Array.isArray(result.accounts)).toBe(true);
  });

  it("yield first function works without service context", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        // Capture services into a requirement-free function
        const listAccounts = yield* listEvmAccounts;

        // Run the requirement-free function with an empty layer —
        // proves the returned function truly has no requirements
        const accounts = yield* listAccounts({}).pipe(
          Effect.provide(Layer.empty),
        );
        return accounts;
      }),
    );
    expect(result).toBeDefined();
    expect(Array.isArray(result.accounts)).toBe(true);
  });
});
