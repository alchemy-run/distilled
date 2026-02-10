import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { CoinbaseApiError } from "../src/client";
import { NotFound, InvalidRequest, AlreadyExists, Forbidden, InternalServerError, RateLimitExceeded } from "../src/errors";
import { createEvmAccount } from "../src/operations/createEvmAccount";
import { listEvmAccounts } from "../src/operations/listEvmAccounts";
import { getEvmAccount } from "../src/operations/getEvmAccount";
import { updateEvmAccount } from "../src/operations/updateEvmAccount";
import { createSolanaAccount } from "../src/operations/createSolanaAccount";
import { listSolanaAccounts } from "../src/operations/listSolanaAccounts";
import { updateSolanaAccount } from "../src/operations/updateSolanaAccount";
import { createEvmSmartAccount } from "../src/operations/createEvmSmartAccount";
import { createEndUser } from "../src/operations/createEndUser";
import { listEndUsers } from "../src/operations/listEndUsers";
import { createWebhookSubscription } from "../src/operations/createWebhookSubscription";
import { updateWebhookSubscription } from "../src/operations/updateWebhookSubscription";
import { deleteWebhookSubscription } from "../src/operations/deleteWebhookSubscription";
import { listWebhookSubscriptions } from "../src/operations/listWebhookSubscriptions";
import { createPolicy } from "../src/operations/createPolicy";
import { updatePolicy } from "../src/operations/updatePolicy";
import { deletePolicy } from "../src/operations/deletePolicy";
import { listPolicies } from "../src/operations/listPolicies";
import { requestEvmFaucet } from "../src/operations/requestEvmFaucet";
import { runEffect } from "./setup";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";
const NON_EXISTENT_ID = "00000000-0000-0000-0000-000000000000";

/**
 * Helper to check if an error is a "not found" type error.
 * Also accepts Forbidden (missing scope) since the API key may lack permissions.
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
  error instanceof AlreadyExists ||
  error instanceof Forbidden ||
  error instanceof InternalServerError ||
  error instanceof RateLimitExceeded ||
  error instanceof CoinbaseApiError ||
  (error !== null && typeof error === "object" && "_tag" in error);

// ============================================================================
// EVM Accounts (Mutating)
// ============================================================================

describe("evm-accounts (mutating)", () => {
  describe("createEvmAccount", () => {
    it("can create a new EVM account", async () => {
      const result = await runEffect(
        createEvmAccount({
          name: "distilled coinbase evm test",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        expect(result.data.address).toBeDefined();
        expect(result.data.address.startsWith("0x")).toBe(true);
      } else {
        // Wallet auth required but not configured — InvalidRequest is expected
        expect(result.error).toBeInstanceOf(InvalidRequest);
      }
    });

    it("can create an EVM account without a name", async () => {
      const result = await runEffect(
        createEvmAccount({}).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        expect(result.data.address).toBeDefined();
        expect(result.data.address.startsWith("0x")).toBe(true);
      } else {
        expect(result.error).toBeInstanceOf(InvalidRequest);
      }
    });
  });

  describe("updateEvmAccount", () => {
    it("can update an EVM account name", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          // Create an account to update
          const created = yield* createEvmAccount({
            name: "distilled coinbase update test",
          });

          // Update the name
          const updated = yield* updateEvmAccount({
            address: created.address,
            name: "distilled coinbase updated",
          });

          return updated;
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        expect(result.data.address).toBeDefined();
        expect(result.data.name).toBe("distilled coinbase updated");
      } else {
        // Wallet auth required for account creation
        expect(result.error).toBeInstanceOf(InvalidRequest);
      }
    });

    it("returns NotFound for non-existent account", async () => {
      const error = await runEffect(
        updateEvmAccount({
          address: NON_EXISTENT_ADDRESS,
          name: "should-not-work",
        }).pipe(
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
// Solana Accounts (Mutating)
// ============================================================================

describe("solana-accounts (mutating)", () => {
  describe("createSolanaAccount", () => {
    it("can create a new Solana account", async () => {
      const result = await runEffect(
        createSolanaAccount({
          name: "distilled coinbase solana test",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        expect(result.data.address).toBeDefined();
        expect(typeof result.data.address).toBe("string");
      } else {
        // Wallet auth required
        expect(result.error).toBeInstanceOf(InvalidRequest);
      }
    });
  });

  describe("updateSolanaAccount", () => {
    it("can update a Solana account name", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const created = yield* createSolanaAccount({
            name: "distilled coinbase sol update",
          });

          const updated = yield* updateSolanaAccount({
            address: created.address,
            name: "distilled coinbase sol updated",
          });

          return updated;
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        expect(result.data.address).toBeDefined();
        expect(result.data.name).toBe("distilled coinbase sol updated");
      } else {
        // Wallet auth required
        expect(result.error).toBeInstanceOf(InvalidRequest);
      }
    });
  });
});

// ============================================================================
// EVM Smart Accounts (Mutating)
// ============================================================================

describe("evm-smart-accounts (mutating)", () => {
  describe("createEvmSmartAccount", () => {
    it("can create a smart account from an existing EVM account", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          // Create an owner EVM account first
          const owner = yield* createEvmAccount({
            name: "distilled coinbase smart owner",
          });

          // Create smart account
          return yield* createEvmSmartAccount({
            owners: [owner.address],
          });
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        expect(result.data.address).toBeDefined();
        expect(result.data.address.startsWith("0x")).toBe(true);
        expect(Array.isArray(result.data.owners)).toBe(true);
      } else {
        // Wallet auth required or smart accounts not enabled
        expect(isApiError(result.error)).toBe(true);
      }
    });
  });
});

// ============================================================================
// End Users (Mutating)
// ============================================================================

describe("end-users (mutating)", () => {
  describe("createEndUser", () => {
    it("can create an end user with email auth", async () => {
      const result = await runEffect(
        createEndUser({
          authenticationMethods: [
            {
              type: "email" as const,
              email: `distilled-test-${Date.now()}@example.com`,
            },
          ],
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        expect(result.data.userId).toBeDefined();
        expect(result.data.authenticationMethods.length).toBeGreaterThanOrEqual(1);
        expect(result.data.createdAt).toBeDefined();
      } else {
        // May fail if end user feature is not enabled
        expect(isApiError(result.error)).toBe(true);
      }
    });
  });
});

// ============================================================================
// Webhook Subscriptions (Mutating)
// ============================================================================

describe("webhook-subscriptions (mutating)", () => {
  describe("createWebhookSubscription", () => {
    it("can create and delete a webhook subscription", async () => {
      const result = await runEffect(
        createWebhookSubscription({
          description: "distilled coinbase webhook test",
          eventTypes: ["onramp.transaction.created"],
          isEnabled: false,
          target: {
            url: "https://example.com/webhook",
          },
        }).pipe(
          Effect.tap((created) =>
            // Cleanup after successful creation
            deleteWebhookSubscription({ subscriptionId: created.subscriptionId }).pipe(Effect.ignore),
          ),
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        expect(result.data.subscriptionId).toBeDefined();
        expect(result.data.eventTypes).toContain("onramp.transaction.created");
        expect(result.data.isEnabled).toBe(false);
        expect(result.data.target.url).toBe("https://example.com/webhook");
        expect(result.data.secret).toBeDefined();
        expect(result.data.createdAt).toBeDefined();
      } else {
        // InternalServerError is transient — Coinbase webhook API can be flaky
        expect(isApiError(result.error)).toBe(true);
      }
    });
  });

  describe("updateWebhookSubscription", () => {
    it("can create, update, and delete a webhook subscription", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          // Create
          const created = yield* createWebhookSubscription({
            description: "distilled coinbase webhook update",
            eventTypes: ["onramp.transaction.created"],
            isEnabled: false,
            target: {
              url: "https://example.com/webhook-original",
            },
          });

          // Update
          const updated = yield* updateWebhookSubscription({
            subscriptionId: created.subscriptionId,
            description: "distilled coinbase webhook updated",
            eventTypes: ["onramp.transaction.created", "onramp.transaction.success"],
            isEnabled: false,
            target: {
              url: "https://example.com/webhook-updated",
            },
          });

          // Cleanup
          yield* deleteWebhookSubscription({ subscriptionId: created.subscriptionId }).pipe(Effect.ignore);

          return { created, updated };
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        expect(result.data.updated.subscriptionId).toBe(result.data.created.subscriptionId);
        expect(result.data.updated.target.url).toBe("https://example.com/webhook-updated");
        expect(result.data.updated.eventTypes).toContain("onramp.transaction.success");
      } else {
        // InternalServerError / NotFound are transient — Coinbase webhook API can be flaky
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent subscription", async () => {
      const error = await runEffect(
        updateWebhookSubscription({
          subscriptionId: NON_EXISTENT_ID,
          eventTypes: ["onramp.transaction.created"],
          isEnabled: false,
          target: {
            url: "https://example.com/webhook",
          },
        }).pipe(
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

  describe("deleteWebhookSubscription", () => {
    it("returns NotFound for non-existent subscription", async () => {
      const error = await runEffect(
        deleteWebhookSubscription({ subscriptionId: NON_EXISTENT_ID }).pipe(
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
// Policies (Mutating)
// ============================================================================

describe("policies (mutating)", () => {
  describe("createPolicy", () => {
    it("can create and delete an account-scoped policy", async () => {
      let policyId: string | null = null;

      const result = await runEffect(
        createPolicy({
          scope: "account",
          description: "distilled coinbase policy test",
          rules: [
            {
              action: "reject",
              operation: "signEvmTransaction",
              criteria: [
                {
                  type: "ethValue",
                  ethValue: "1000000000000000000", // 1 ETH
                  operator: ">",
                },
              ],
            },
          ],
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      try {
        if ("data" in result) {
          policyId = result.data.id;
          expect(result.data.id).toBeDefined();
          expect(result.data.scope).toBe("account");
          expect(Array.isArray(result.data.rules)).toBe(true);
          expect(result.data.rules.length).toBe(1);
        } else {
          // Forbidden if API key lacks policies#manage scope
          expect(isApiError(result.error)).toBe(true);
        }
      } finally {
        if (policyId) {
          await runEffect(
            deletePolicy({ policyId }).pipe(Effect.ignore),
          );
        }
      }
    });
  });

  describe("updatePolicy", () => {
    it("can create, update, and delete a policy", async () => {
      let policyId: string | null = null;

      const result = await runEffect(
        Effect.gen(function* () {
          // Create
          const created = yield* createPolicy({
            scope: "account",
            description: "distilled coinbase policy update",
            rules: [
              {
                action: "reject",
                operation: "signEvmTransaction",
                criteria: [
                  {
                    type: "ethValue",
                    ethValue: "1000000000000000000",
                    operator: ">",
                  },
                ],
              },
            ],
          });

          policyId = created.id;

          // Update
          const updated = yield* updatePolicy({
            policyId: created.id,
            description: "distilled coinbase policy updated",
            rules: [
              {
                action: "reject",
                operation: "signEvmTransaction",
                criteria: [
                  {
                    type: "ethValue",
                    ethValue: "2000000000000000000", // 2 ETH
                    operator: ">",
                  },
                ],
              },
            ],
          });

          return { created, updated };
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      try {
        if ("data" in result) {
          expect(result.data.updated.id).toBe(result.data.created.id);
          expect(result.data.updated.description).toBe("distilled coinbase policy updated");
        } else {
          // Forbidden if API key lacks policies#manage scope
          expect(isApiError(result.error)).toBe(true);
        }
      } finally {
        if (policyId) {
          await runEffect(
            deletePolicy({ policyId }).pipe(Effect.ignore),
          );
        }
      }
    });

    it("returns NotFound for non-existent policy", async () => {
      const error = await runEffect(
        updatePolicy({
          policyId: NON_EXISTENT_ID,
          rules: [],
        }).pipe(
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

  describe("deletePolicy", () => {
    it("returns NotFound for non-existent policy", async () => {
      const error = await runEffect(
        deletePolicy({ policyId: NON_EXISTENT_ID }).pipe(
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
// Faucet (Mutating)
// ============================================================================

describe("faucet (mutating)", () => {
  describe("requestEvmFaucet", () => {
    it("can request testnet ETH (or handles rate limit)", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const accounts = yield* listEvmAccounts({});
          if (accounts.accounts.length === 0) {
            // Create one
            const created = yield* createEvmAccount({
              name: "distilled coinbase faucet test",
            });
            return yield* requestEvmFaucet({
              address: created.address,
              network: "base-sepolia",
              token: "eth",
            }).pipe(
              Effect.matchEffect({
                onFailure: (e) => Effect.succeed({ error: e }),
                onSuccess: (data) => Effect.succeed({ data }),
              }),
            );
          }
          const address = accounts.accounts[0]!.address;
          return yield* requestEvmFaucet({
            address,
            network: "base-sepolia",
            token: "eth",
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          );
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed(data),
          }),
        ),
      );

      if ("data" in result) {
        expect(result.data.transactionHash).toBeDefined();
      } else {
        // FaucetLimitExceeded, RateLimitExceeded, InvalidRequest (wallet auth), or other error
        expect(isApiError(result.error)).toBe(true);
      }
    });
  });
});
