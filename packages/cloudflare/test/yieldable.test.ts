import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test } from "./test.ts";
import * as Accounts from "~/services/accounts.ts";

const assertNoReq = <T extends Effect.Effect<any, any, never>>(eff: T) => {};

describe("OperationMethod yieldable", () => {
  test("direct call - yield* operation(input) works with services in context", () =>
    Effect.gen(function* () {
      const result = yield* Accounts.listAccounts({});
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].id).toBeDefined();
      expect(result[0].name).toBeDefined();
    }));

  test("yield first - yield* operation captures services and returns requirement-free function", () =>
    Effect.gen(function* () {
      // yield* the operation itself (not calling it) to capture ApiToken + HttpClient
      const listAccounts = yield* Accounts.listAccounts;

      // The returned function has Effect<..., ..., never> — no requirements
      const result = yield* listAccounts({});
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].id).toBeDefined();
      expect(result[0].name).toBeDefined();
    }));
});
