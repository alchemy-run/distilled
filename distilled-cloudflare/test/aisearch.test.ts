import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import * as Schedule from "effect/Schedule";
import { test, getAccountId } from "./test.ts";
import * as AISearch from "~/services/aisearch.ts";
import * as R2 from "~/services/r2.ts";

const accountId = () => getAccountId();

/**
 * Get credentials for AI Search token creation.
 * If CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL are set, uses Global API Key auth.
 * Otherwise, uses API Token auth (fetches token ID from verify endpoint).
 */
let _cachedTokenCreds: { cfApiId: string; cfApiKey: string } | undefined;
const getTokenCredentials = async (): Promise<{
  cfApiId: string;
  cfApiKey: string;
}> => {
  if (_cachedTokenCreds) return _cachedTokenCreds;

  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (apiToken) {
    // API Token auth — fetch token ID from verify endpoint
    const resp = await fetch(
      "https://api.cloudflare.com/client/v4/user/tokens/verify",
      { headers: { Authorization: `Bearer ${apiToken}` } },
    );
    const data = (await resp.json()) as {
      result: { id: string };
      success: boolean;
    };
    if (!data.success || !data.result?.id) {
      throw new Error("Failed to verify API token for AI Search credentials");
    }
    _cachedTokenCreds = { cfApiId: data.result.id, cfApiKey: apiToken };
    return _cachedTokenCreds;
  }

  const apiKey = process.env.CLOUDFLARE_API_KEY;
  const email = process.env.CLOUDFLARE_EMAIL;

  if (apiKey && email) {
    // Global API Key auth fallback
    _cachedTokenCreds = { cfApiId: email, cfApiKey: apiKey };
    return _cachedTokenCreds;
  }

  throw new Error(
    "Either CLOUDFLARE_API_TOKEN or CLOUDFLARE_API_KEY+CLOUDFLARE_EMAIL must be set",
  );
};

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic name for test resources.
 * Follows the convention: dcf-ais-{testname} (max 32 chars for instance IDs)
 */
const resourceName = (name: string) => `dcf-ais-${name}`;

/**
 * Delete any AI Search tokens whose name matches `tokenName`.
 * Uses listTokens to find tokens by name for cleanup-first idempotency.
 */
const cleanupTokenByName = (tokenName: string) =>
  Effect.gen(function* () {
    const tokens = yield* AISearch.listTokens({
      accountId: accountId(),
    });

    for (const token of tokens) {
      if (token.name === tokenName) {
        yield* AISearch.deleteToken({
          accountId: accountId(),
          id: token.id,
        }).pipe(Effect.catch(() => Effect.void));
      }
    }
  }).pipe(Effect.catch(() => Effect.void));

/**
 * Create an AI Search token, run `fn`, then delete the token.
 * Cleanup-first pattern for idempotency.
 */
const withToken = <A, E, R>(
  name: string,
  fn: (tokenId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    // Cleanup first in case of previous failed run
    yield* cleanupTokenByName(name);

    const creds = yield* Effect.promise(() => getTokenCredentials());
    const token = yield* AISearch.createToken({
      accountId: accountId(),
      ...creds,
      name,
    });

    const tokenId = token.id;

    return yield* fn(tokenId).pipe(
      Effect.ensuring(
        AISearch.deleteToken({
          accountId: accountId(),
          id: tokenId,
        }).pipe(Effect.catch(() => Effect.void)),
      ),
    );
  });

/**
 * Create an R2 bucket + AI Search token + AI Search instance, run `fn`, then clean up.
 * Cleanup-first pattern for idempotency.
 */
const withInstance = <A, E, R>(
  name: string,
  fn: (instanceId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    const bucketName = resourceName(`${name}-bucket`);
    const tokenName = resourceName(`${name}-token`);

    // Cleanup first in case of previous failed run
    yield* AISearch.deleteInstance({
      accountId: accountId(),
      id: resourceName(name),
    }).pipe(Effect.catch(() => Effect.void));
    yield* cleanupTokenByName(tokenName);
    yield* R2.deleteBucket({
      accountId: accountId(),
      bucketName,
    }).pipe(Effect.catch(() => Effect.void));

    // Create R2 bucket
    yield* R2.createBucket({
      accountId: accountId(),
      name: bucketName,
    });

    // Create token
    const creds = yield* Effect.promise(() => getTokenCredentials());
    const token = yield* AISearch.createToken({
      accountId: accountId(),
      ...creds,
      name: tokenName,
    });

    // Create instance
    const instance = yield* AISearch.createInstance({
      accountId: accountId(),
      id: resourceName(name),
      source: bucketName,
      tokenId: token.id,
      type: "r2",
    });

    const instanceId = instance.id;

    return yield* fn(instanceId).pipe(
      Effect.ensuring(
        Effect.gen(function* () {
          yield* AISearch.deleteInstance({
            accountId: accountId(),
            id: instanceId,
          }).pipe(Effect.catch(() => Effect.void));
          yield* AISearch.deleteToken({
            accountId: accountId(),
            id: token.id,
          }).pipe(Effect.catch(() => Effect.void));
          yield* R2.deleteBucket({
            accountId: accountId(),
            bucketName,
          }).pipe(Effect.catch(() => Effect.void));
        }),
      ),
    );
  });

// ============================================================================
// AI Search Tests
// ============================================================================

describe("AISearch", () => {
  // --------------------------------------------------------------------------
  // listTokens
  // --------------------------------------------------------------------------
  describe("listTokens", () => {
    test("happy path - lists tokens for account", () =>
      Effect.gen(function* () {
        const result = yield* AISearch.listTokens({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.listTokens({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // listInstances
  // --------------------------------------------------------------------------
  describe("listInstances", () => {
    test("happy path - lists instances for account", () =>
      Effect.gen(function* () {
        const result = yield* AISearch.listInstances({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.listInstances({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // createToken / readToken / deleteToken
  // --------------------------------------------------------------------------
  describe("createToken", () => {
    test("happy path - creates an AI Search token", () =>
      Effect.gen(function* () {
        const name = resourceName("token-create");

        // Cleanup first in case of previous failed run
        yield* cleanupTokenByName(name);

        const creds = yield* Effect.promise(() => getTokenCredentials());
        const token = yield* AISearch.createToken({
          accountId: accountId(),
          ...creds,
          name,
        });

        expect(token).toBeDefined();
        expect(token.id).toBeDefined();
        expect(token.name).toBe(name);

        // Cleanup
        yield* AISearch.deleteToken({
          accountId: accountId(),
          id: token.id,
        }).pipe(Effect.catch(() => Effect.void));
      }));
  });

  describe("readToken", () => {
    test("happy path - reads an existing token", () =>
      withToken(resourceName("token-read"), (tokenId) =>
        Effect.gen(function* () {
          const token = yield* AISearch.readToken({
            accountId: accountId(),
            id: tokenId,
          });

          expect(token).toBeDefined();
          expect(token.id).toBe(tokenId);
        }),
      ));

    test("error - NotFound for non-existent token id", () =>
      AISearch.readToken({
        accountId: accountId(),
        id: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.readToken({
        accountId: "invalid-account-id-000",
        id: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("deleteToken", () => {
    test("happy path - deletes an existing token", () =>
      Effect.gen(function* () {
        const name = resourceName("token-delete");

        // Cleanup first in case of previous failed run
        yield* cleanupTokenByName(name);

        const creds = yield* Effect.promise(() => getTokenCredentials());
        const token = yield* AISearch.createToken({
          accountId: accountId(),
          ...creds,
          name,
        });

        expect(token.id).toBeDefined();

        const result = yield* AISearch.deleteToken({
          accountId: accountId(),
          id: token.id,
        });

        expect(result).toBeDefined();
      }));

    test("error - NotFound for non-existent token id", () =>
      AISearch.deleteToken({
        accountId: accountId(),
        id: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.deleteToken({
        accountId: "invalid-account-id-000",
        id: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // createInstance / readInstance / statsInstance / deleteInstance
  // --------------------------------------------------------------------------
  describe("createInstance", () => {
    test("happy path - creates an AI Search instance backed by R2", () =>
      Effect.gen(function* () {
        const name = resourceName("instance-create");
        const bucketName = resourceName("instance-create-bucket");
        const tokenName = resourceName("instance-create-token");

        // Cleanup first in case of previous failed run
        yield* AISearch.deleteInstance({
          accountId: accountId(),
          id: name,
        }).pipe(Effect.catch(() => Effect.void));
        yield* cleanupTokenByName(tokenName);
        yield* R2.deleteBucket({
          accountId: accountId(),
          bucketName,
        }).pipe(Effect.catch(() => Effect.void));

        // Create R2 bucket
        yield* R2.createBucket({
          accountId: accountId(),
          name: bucketName,
        });

        // Create token
        const creds = yield* Effect.promise(() => getTokenCredentials());
        const token = yield* AISearch.createToken({
          accountId: accountId(),
          ...creds,
          name: tokenName,
        });

        // Create instance
        const instance = yield* AISearch.createInstance({
          accountId: accountId(),
          id: name,
          source: bucketName,
          tokenId: token.id,
          type: "r2",
        });

        expect(instance).toBeDefined();
        expect(instance.id).toBe(name);
        expect(instance.type).toBe("r2");
        expect(instance.source).toBe(bucketName);

        // Cleanup
        yield* AISearch.deleteInstance({
          accountId: accountId(),
          id: name,
        }).pipe(Effect.catch(() => Effect.void));
        yield* AISearch.deleteToken({
          accountId: accountId(),
          id: token.id,
        }).pipe(Effect.catch(() => Effect.void));
        yield* R2.deleteBucket({
          accountId: accountId(),
          bucketName,
        }).pipe(Effect.catch(() => Effect.void));
      }));
  });

  describe("readInstance", () => {
    test("happy path - reads an existing instance", () =>
      withInstance("instance-read", (instanceId) =>
        Effect.gen(function* () {
          const instance = yield* AISearch.readInstance({
            accountId: accountId(),
            id: instanceId,
          });

          expect(instance).toBeDefined();
          expect(instance.id).toBe(instanceId);
          expect(instance.type).toBe("r2");
        }),
      ));

    test("error - ValidationError for instance id too long", () =>
      AISearch.readInstance({
        accountId: accountId(),
        id: "distilled-cf-aisearch-nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ValidationError")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.readInstance({
        accountId: "invalid-account-id-000",
        id: "nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - InvalidRoute for empty accountId", () =>
      AISearch.readInstance({
        accountId: "",
        id: "nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteInstance
  // --------------------------------------------------------------------------
  describe("deleteInstance", () => {
    test("happy path - deletes an existing instance", () =>
      Effect.gen(function* () {
        const name = resourceName("instance-delete");
        const bucketName = resourceName("instance-delete-bucket");
        const tokenName = resourceName("instance-delete-token");

        // Cleanup first in case of previous failed run
        yield* AISearch.deleteInstance({
          accountId: accountId(),
          id: name,
        }).pipe(Effect.catch(() => Effect.void));
        yield* cleanupTokenByName(tokenName);
        yield* R2.deleteBucket({
          accountId: accountId(),
          bucketName,
        }).pipe(Effect.catch(() => Effect.void));

        // Create R2 bucket
        yield* R2.createBucket({
          accountId: accountId(),
          name: bucketName,
        });

        // Create token
        const creds = yield* Effect.promise(() => getTokenCredentials());
        const token = yield* AISearch.createToken({
          accountId: accountId(),
          ...creds,
          name: tokenName,
        });

        // Create instance
        yield* AISearch.createInstance({
          accountId: accountId(),
          id: name,
          source: bucketName,
          tokenId: token.id,
          type: "r2",
        });

        // Delete instance
        const result = yield* AISearch.deleteInstance({
          accountId: accountId(),
          id: name,
        });

        expect(result).toBeDefined();

        // Cleanup remaining resources
        yield* AISearch.deleteToken({
          accountId: accountId(),
          id: token.id,
        }).pipe(Effect.catch(() => Effect.void));
        yield* R2.deleteBucket({
          accountId: accountId(),
          bucketName,
        }).pipe(Effect.catch(() => Effect.void));
      }));

    test("error - ValidationError for instance id too long", () =>
      AISearch.deleteInstance({
        accountId: accountId(),
        id: "distilled-cf-aisearch-delete-nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ValidationError")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.deleteInstance({
        accountId: "invalid-account-id-000",
        id: "nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - InvalidRoute for empty accountId", () =>
      AISearch.deleteInstance({
        accountId: "",
        id: "nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // statsInstance
  // --------------------------------------------------------------------------
  describe("statsInstance", () => {
    test("happy path - retrieves stats for an existing instance", () =>
      withInstance("instance-stats", (instanceId) =>
        Effect.gen(function* () {
          const stats = yield* AISearch.statsInstance({
            accountId: accountId(),
            id: instanceId,
          });

          expect(stats).toBeDefined();
        }),
      ));

    test("error - ValidationError for instance id too long", () =>
      AISearch.statsInstance({
        accountId: accountId(),
        id: "distilled-cf-aisearch-stats-nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ValidationError")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.statsInstance({
        accountId: "invalid-account-id-000",
        id: "nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // updateInstance
  // --------------------------------------------------------------------------
  describe("updateInstance", () => {
    test("happy path - updates an existing instance", () =>
      withInstance("instance-update", (instanceId) =>
        Effect.gen(function* () {
          const result = yield* AISearch.updateInstance({
            accountId: accountId(),
            id: instanceId,
            maxNumResults: 5,
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(instanceId);
        }),
      ));

    test("error - ValidationError for instance id too long", () =>
      AISearch.updateInstance({
        accountId: accountId(),
        id: "distilled-cf-aisearch-update-nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ValidationError")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.updateInstance({
        accountId: "invalid-account-id-000",
        id: "nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // getInstanceItem
  // --------------------------------------------------------------------------
  describe("getInstanceItem", () => {
    test("error - ValidationError for instance id too long", () =>
      AISearch.getInstanceItem({
        accountId: accountId(),
        id: "distilled-cf-aisearch-item-nonexistent",
        itemId: "nonexistent-item",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ValidationError")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.getInstanceItem({
        accountId: "invalid-account-id-000",
        id: "nonexistent",
        itemId: "nonexistent-item",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // getInstanceJob
  // --------------------------------------------------------------------------
  describe("getInstanceJob", () => {
    test("error - ValidationError for instance id too long", () =>
      AISearch.getInstanceJob({
        accountId: accountId(),
        id: "distilled-cf-aisearch-job-nonexistent",
        jobId: "nonexistent-job",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ValidationError")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.getInstanceJob({
        accountId: "invalid-account-id-000",
        id: "nonexistent",
        jobId: "nonexistent-job",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // createInstanceJob
  // --------------------------------------------------------------------------
  describe("createInstanceJob", () => {
    test("happy path - creates a job for an existing instance", () =>
      withInstance("instance-job-create", (instanceId) =>
        Effect.gen(function* () {
          const job = yield* AISearch.createInstanceJob({
            accountId: accountId(),
            id: instanceId,
          }).pipe(
            Effect.retry({
              while: (e) =>
                e._tag === "UnableToConnect" ||
                e._tag === "SyncInCooldown",
              schedule: Schedule.recurs(10).pipe(
                Schedule.addDelay(() => Effect.succeed("3 seconds")),
              ),
            }),
          );

          expect(job).toBeDefined();
        }),
      ));

    test("error - ValidationError for instance id too long", () =>
      AISearch.createInstanceJob({
        accountId: accountId(),
        id: "distilled-cf-aisearch-createjob-nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ValidationError")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.createInstanceJob({
        accountId: "invalid-account-id-000",
        id: "nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // logsInstanceJob
  // --------------------------------------------------------------------------
  describe("logsInstanceJob", () => {
    test("error - ValidationError for instance id too long", () =>
      AISearch.logsInstanceJob({
        accountId: accountId(),
        id: "distilled-cf-aisearch-logs-nonexistent",
        jobId: "nonexistent-job",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ValidationError")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.logsInstanceJob({
        accountId: "invalid-account-id-000",
        id: "nonexistent",
        jobId: "nonexistent-job",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // updateToken
  // --------------------------------------------------------------------------
  describe("updateToken", () => {
    test("error - NotFound for non-existent token id", () =>
      AISearch.updateToken({
        accountId: accountId(),
        id: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      AISearch.updateToken({
        accountId: "invalid-account-id-000",
        id: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });
});
