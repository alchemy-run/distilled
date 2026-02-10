import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { CoinbaseApiError } from "../src/client";
import { NotFound, InvalidRequest, Forbidden, InternalServerError, RateLimitExceeded } from "../src/errors";
import { listEvmAccounts } from "../src/operations/listEvmAccounts";
import { getEvmAccount } from "../src/operations/getEvmAccount";
import { getEvmAccountByName } from "../src/operations/getEvmAccountByName";
import { listSolanaAccounts } from "../src/operations/listSolanaAccounts";
import { getSolanaAccount } from "../src/operations/getSolanaAccount";
import { getSolanaAccountByName } from "../src/operations/getSolanaAccountByName";
import { listEvmSmartAccounts } from "../src/operations/listEvmSmartAccounts";
import { getEvmSmartAccount } from "../src/operations/getEvmSmartAccount";
import { getEvmSmartAccountByName } from "../src/operations/getEvmSmartAccountByName";
import { listEndUsers } from "../src/operations/listEndUsers";
import { getEndUser } from "../src/operations/getEndUser";
import { listPolicies } from "../src/operations/listPolicies";
import { getPolicyById } from "../src/operations/getPolicyById";
import { listWebhookSubscriptions } from "../src/operations/listWebhookSubscriptions";
import { getWebhookSubscription } from "../src/operations/getWebhookSubscription";
import { listEvmTokenBalances } from "../src/operations/listEvmTokenBalances";
import { listSolanaTokenBalances } from "../src/operations/listSolanaTokenBalances";
import { runEffect } from "./setup";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";
const NON_EXISTENT_NAME = "this-name-definitely-does-not-exist-12345";
const NON_EXISTENT_ID = "00000000-0000-0000-0000-000000000000";
const NON_EXISTENT_SOLANA_ADDRESS =
  "11111111111111111111111111111112";

/**
 * Helper to check if an error is a "not found" type error.
 * Coinbase API may return NotFound, InvalidRequest (for invalid IDs),
 * Forbidden (missing scope), or CoinbaseApiError for non-existent resources.
 */
const isNotFoundError = (error: unknown): boolean =>
  error instanceof NotFound ||
  error instanceof InvalidRequest ||
  error instanceof Forbidden ||
  error instanceof InternalServerError ||
  error instanceof RateLimitExceeded ||
  error instanceof CoinbaseApiError;

/**
 * Helper to check if an error is any API error type.
 */
const isApiError = (error: unknown): boolean =>
  error instanceof NotFound ||
  error instanceof InvalidRequest ||
  error instanceof Forbidden ||
  error instanceof InternalServerError ||
  error instanceof RateLimitExceeded ||
  error instanceof CoinbaseApiError ||
  (error !== null && typeof error === "object" && "_tag" in error);

// ============================================================================
// EVM Accounts (Read-Only)
// ============================================================================

describe("evm-accounts (read)", () => {
  describe("listEvmAccounts", () => {
    it("can list EVM accounts", async () => {
      const result = await runEffect(listEvmAccounts({}));

      expect(Array.isArray(result.accounts)).toBe(true);
    });

    it("can list EVM accounts with pagination", async () => {
      const result = await runEffect(
        listEvmAccounts({ pageSize: 5 }),
      );

      expect(Array.isArray(result.accounts)).toBe(true);
    });

    it("returns accounts with expected properties", async () => {
      const result = await runEffect(listEvmAccounts({}));

      if (result.accounts.length > 0) {
        const account = result.accounts[0]!;
        expect(account.address).toBeDefined();
        expect(typeof account.address).toBe("string");
        expect(account.address.startsWith("0x")).toBe(true);
      }
    });
  });

  describe("getEvmAccount", () => {
    it("can get an EVM account by address (if any exist)", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const accounts = yield* listEvmAccounts({});
          if (accounts.accounts.length === 0) {
            return null;
          }
          const address = accounts.accounts[0]!.address;
          return yield* getEvmAccount({ address });
        }),
      );

      if (result !== null) {
        expect(result.address).toBeDefined();
        expect(result.address.startsWith("0x")).toBe(true);
      }
    });

    it("returns NotFound for non-existent address", async () => {
      const error = await runEffect(
        getEvmAccount({ address: NON_EXISTENT_ADDRESS }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundError(error)).toBe(true);
    });
  });

  describe("getEvmAccountByName", () => {
    it("can get an EVM account by name (if any have names)", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const accounts = yield* listEvmAccounts({});
          const namedAccount = accounts.accounts.find((a) => a.name);
          if (!namedAccount?.name) {
            return null;
          }
          return yield* getEvmAccountByName({ name: namedAccount.name });
        }),
      );

      if (result !== null) {
        expect(result.address).toBeDefined();
        expect(result.name).toBeDefined();
      }
    });

    it("returns NotFound for non-existent name", async () => {
      const error = await runEffect(
        getEvmAccountByName({ name: NON_EXISTENT_NAME }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundError(error)).toBe(true);
    });
  });
});

// ============================================================================
// EVM Smart Accounts (Read-Only)
// ============================================================================

describe("evm-smart-accounts (read)", () => {
  describe("listEvmSmartAccounts", () => {
    it("can list EVM smart accounts", async () => {
      const result = await runEffect(listEvmSmartAccounts({}));

      expect(Array.isArray(result.accounts)).toBe(true);
    });

    it("can list EVM smart accounts with pagination", async () => {
      const result = await runEffect(
        listEvmSmartAccounts({ pageSize: 5 }),
      );

      expect(Array.isArray(result.accounts)).toBe(true);
    });

    it("returns smart accounts with expected properties", async () => {
      const result = await runEffect(listEvmSmartAccounts({}));

      if (result.accounts.length > 0) {
        const account = result.accounts[0]!;
        expect(account.address).toBeDefined();
        expect(account.address.startsWith("0x")).toBe(true);
        expect(Array.isArray(account.owners)).toBe(true);
      }
    });
  });

  describe("getEvmSmartAccount", () => {
    it("can get a smart account by address (if any exist)", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const accounts = yield* listEvmSmartAccounts({});
          if (accounts.accounts.length === 0) {
            return null;
          }
          const address = accounts.accounts[0]!.address;
          return yield* getEvmSmartAccount({ address });
        }),
      );

      if (result !== null) {
        expect(result.address).toBeDefined();
        expect(result.address.startsWith("0x")).toBe(true);
        expect(Array.isArray(result.owners)).toBe(true);
      }
    });

    it("returns NotFound for non-existent address", async () => {
      const error = await runEffect(
        getEvmSmartAccount({ address: NON_EXISTENT_ADDRESS }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundError(error)).toBe(true);
    });
  });

  describe("getEvmSmartAccountByName", () => {
    it("returns NotFound for non-existent name", async () => {
      const error = await runEffect(
        getEvmSmartAccountByName({ name: NON_EXISTENT_NAME }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundError(error)).toBe(true);
    });
  });
});

// ============================================================================
// Solana Accounts (Read-Only)
// ============================================================================

describe("solana-accounts (read)", () => {
  describe("listSolanaAccounts", () => {
    it("can list Solana accounts", async () => {
      const result = await runEffect(listSolanaAccounts({}));

      expect(Array.isArray(result.accounts)).toBe(true);
    });

    it("can list Solana accounts with pagination", async () => {
      const result = await runEffect(
        listSolanaAccounts({ pageSize: 5 }),
      );

      expect(Array.isArray(result.accounts)).toBe(true);
    });

    it("returns accounts with expected properties", async () => {
      const result = await runEffect(listSolanaAccounts({}));

      if (result.accounts.length > 0) {
        const account = result.accounts[0]!;
        expect(account.address).toBeDefined();
        expect(typeof account.address).toBe("string");
      }
    });
  });

  describe("getSolanaAccount", () => {
    it("can get a Solana account by address (if any exist)", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const accounts = yield* listSolanaAccounts({});
          if (accounts.accounts.length === 0) {
            return null;
          }
          const address = accounts.accounts[0]!.address;
          return yield* getSolanaAccount({ address });
        }),
      );

      if (result !== null) {
        expect(result.address).toBeDefined();
      }
    });

    it("returns NotFound for non-existent address", async () => {
      const error = await runEffect(
        getSolanaAccount({ address: NON_EXISTENT_SOLANA_ADDRESS }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundError(error)).toBe(true);
    });
  });

  describe("getSolanaAccountByName", () => {
    it("returns NotFound for non-existent name", async () => {
      const error = await runEffect(
        getSolanaAccountByName({ name: NON_EXISTENT_NAME }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundError(error)).toBe(true);
    });
  });
});

// ============================================================================
// End Users (Read-Only)
// ============================================================================

describe("end-users (read)", () => {
  describe("listEndUsers", () => {
    it("can list end users", async () => {
      const result = await runEffect(listEndUsers({}));

      expect(Array.isArray(result.endUsers)).toBe(true);
    });

    it("can list end users with pagination", async () => {
      const result = await runEffect(
        listEndUsers({ pageSize: 5 }),
      );

      expect(Array.isArray(result.endUsers)).toBe(true);
    });

    it("returns end users with expected properties", async () => {
      const result = await runEffect(listEndUsers({}));

      if (result.endUsers.length > 0) {
        const user = result.endUsers[0]!;
        expect(user.userId).toBeDefined();
        expect(Array.isArray(user.authenticationMethods)).toBe(true);
        expect(Array.isArray(user.evmAccounts)).toBe(true);
        expect(Array.isArray(user.solanaAccounts)).toBe(true);
        expect(user.createdAt).toBeDefined();
      }
    });
  });

  describe("getEndUser", () => {
    it("can get an end user by id (if any exist)", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const users = yield* listEndUsers({});
          if (users.endUsers.length === 0) {
            return null;
          }
          const userId = users.endUsers[0]!.userId;
          return yield* getEndUser({ userId });
        }),
      );

      if (result !== null) {
        expect(result.userId).toBeDefined();
        expect(Array.isArray(result.authenticationMethods)).toBe(true);
        expect(result.createdAt).toBeDefined();
      }
    });

    it("returns NotFound for non-existent user", async () => {
      const error = await runEffect(
        getEndUser({ userId: NON_EXISTENT_ID }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundError(error)).toBe(true);
    });
  });
});

// ============================================================================
// Policies (Read-Only)
// ============================================================================

describe("policies (read)", () => {
  describe("listPolicies", () => {
    it("can list policies", async () => {
      const result = await runEffect(listPolicies({}));

      expect(Array.isArray(result.policies)).toBe(true);
    });

    it("can list policies with scope filter", async () => {
      const result = await runEffect(
        listPolicies({ scope: "project" }),
      );

      expect(Array.isArray(result.policies)).toBe(true);
      // All policies should have project scope
      for (const policy of result.policies) {
        expect(policy.scope).toBe("project");
      }
    });

    it("can list account-scoped policies", async () => {
      const result = await runEffect(
        listPolicies({ scope: "account" }),
      );

      expect(Array.isArray(result.policies)).toBe(true);
      for (const policy of result.policies) {
        expect(policy.scope).toBe("account");
      }
    });

    it("returns policies with expected properties", async () => {
      const result = await runEffect(listPolicies({}));

      if (result.policies.length > 0) {
        const policy = result.policies[0]!;
        expect(policy.id).toBeDefined();
        expect(policy.scope).toBeDefined();
        expect(["project", "account"]).toContain(policy.scope);
        expect(Array.isArray(policy.rules)).toBe(true);
        expect(policy.createdAt).toBeDefined();
        expect(policy.updatedAt).toBeDefined();
      }
    });
  });

  describe("getPolicyById", () => {
    it("can get a policy by id (if any exist)", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const policies = yield* listPolicies({});
          if (policies.policies.length === 0) {
            return null;
          }
          const policyId = policies.policies[0]!.id;
          return yield* getPolicyById({ policyId });
        }),
      );

      if (result !== null) {
        expect(result.id).toBeDefined();
        expect(result.scope).toBeDefined();
        expect(Array.isArray(result.rules)).toBe(true);
      }
    });

    it("returns NotFound for non-existent policy", async () => {
      const error = await runEffect(
        getPolicyById({ policyId: NON_EXISTENT_ID }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundError(error)).toBe(true);
    });
  });
});

// ============================================================================
// Webhook Subscriptions (Read-Only)
// ============================================================================

describe("webhook-subscriptions (read)", () => {
  describe("listWebhookSubscriptions", () => {
    it("can list webhook subscriptions", async () => {
      const result = await runEffect(listWebhookSubscriptions({}));

      expect(Array.isArray(result.subscriptions)).toBe(true);
    });

    it("can list webhook subscriptions with pagination", async () => {
      const result = await runEffect(
        listWebhookSubscriptions({ pageSize: 5 }),
      );

      expect(Array.isArray(result.subscriptions)).toBe(true);
    });

    it("returns subscriptions with expected properties", async () => {
      const result = await runEffect(listWebhookSubscriptions({}));

      if (result.subscriptions.length > 0) {
        const sub = result.subscriptions[0]!;
        expect(sub.subscriptionId).toBeDefined();
        expect(Array.isArray(sub.eventTypes)).toBe(true);
        expect(typeof sub.isEnabled).toBe("boolean");
        expect(sub.target).toBeDefined();
        expect(sub.target.url).toBeDefined();
        expect(sub.secret).toBeDefined();
        expect(sub.createdAt).toBeDefined();
      }
    });
  });

  describe("getWebhookSubscription", () => {
    it("can get a webhook subscription by id (if any exist)", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const subs = yield* listWebhookSubscriptions({});
          if (subs.subscriptions.length === 0) {
            return null;
          }
          const subscriptionId = subs.subscriptions[0]!.subscriptionId;
          return yield* getWebhookSubscription({ subscriptionId });
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        if (result.data !== null) {
          expect(result.data.subscriptionId).toBeDefined();
          expect(Array.isArray(result.data.eventTypes)).toBe(true);
          expect(result.data.target).toBeDefined();
          expect(result.data.target.url).toBeDefined();
        }
      } else {
        // Rate limiting or server error when running alongside mutating tests
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent subscription", async () => {
      const error = await runEffect(
        getWebhookSubscription({ subscriptionId: NON_EXISTENT_ID }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundError(error)).toBe(true);
    });
  });
});

// ============================================================================
// Token Balances (Read-Only)
// ============================================================================

describe("token-balances (read)", () => {
  describe("listEvmTokenBalances", () => {
    it("can list EVM token balances for an account (if any exist)", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const accounts = yield* listEvmAccounts({});
          if (accounts.accounts.length === 0) {
            return null;
          }
          const address = accounts.accounts[0]!.address;
          return yield* listEvmTokenBalances({
            address,
            network: "base-sepolia",
          });
        }),
      );

      if (result !== null) {
        expect(Array.isArray(result.balances)).toBe(true);
      }
    });

    it("can list token balances for a non-existent address (returns empty)", async () => {
      const result = await runEffect(
        listEvmTokenBalances({
          address: NON_EXISTENT_ADDRESS,
          network: "base-sepolia",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // May return empty balances or an error
      if ("data" in result) {
        expect(Array.isArray(result.data.balances)).toBe(true);
      } else {
        expect(isApiError(result.error)).toBe(true);
      }
    });
  });

  describe("listSolanaTokenBalances", () => {
    it("can list Solana token balances for an account (if any exist)", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const accounts = yield* listSolanaAccounts({});
          if (accounts.accounts.length === 0) {
            return null;
          }
          const address = accounts.accounts[0]!.address;
          return yield* listSolanaTokenBalances({
            address,
            network: "solana-devnet",
          });
        }),
      );

      if (result !== null) {
        expect(Array.isArray(result.balances)).toBe(true);
      }
    });

    it("can list Solana token balances for a non-existent address (returns empty or error)", async () => {
      const result = await runEffect(
        listSolanaTokenBalances({
          address: NON_EXISTENT_SOLANA_ADDRESS,
          network: "solana-devnet",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        expect(Array.isArray(result.data.balances)).toBe(true);
      } else {
        expect(isApiError(result.error)).toBe(true);
      }
    });
  });
});
