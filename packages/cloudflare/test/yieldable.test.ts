import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test } from "./test.ts";
import * as Accounts from "~/services/accounts";

const assertNoReq = <T extends Effect.Effect<any, any, never>>(eff: T) => {};

describe("OperationMethod yieldable", () => {
  test("direct call - yield* operation(input) works with services in context", () =>
    Effect.gen(function* () {
      const result = yield* Accounts.listAccounts({});
      const accounts = result.result;
      expect(Array.isArray(accounts)).toBe(true);
      expect(accounts.length).toBeGreaterThan(0);
      expect(accounts[0].id).toBeDefined();
      expect(accounts[0].name).toBeDefined();
    }));

  test("yield first - yield* operation captures services and returns requirement-free function", () =>
    Effect.gen(function* () {
      // yield* the operation itself (not calling it) to capture ApiToken + HttpClient
      const listAccounts = yield* Accounts.listAccounts;

      // The returned function has Effect<..., ..., never> — no requirements
      const result = yield* listAccounts({});
      const accounts = result.result;
      expect(Array.isArray(accounts)).toBe(true);
      expect(accounts.length).toBeGreaterThan(0);
      expect(accounts[0].id).toBeDefined();
      expect(accounts[0].name).toBeDefined();
    }));
});
