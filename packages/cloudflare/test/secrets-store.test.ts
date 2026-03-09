import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as SecretsStore from "~/services/secrets-store.ts";

const accountId = () => getAccountId();

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic secret name for tests.
 */
const secretName = (name: string) => `distilled-cf-ss-secret-${name}`;

/**
 * Get the default store ID. The account only allows 1 store (the default),
 * so we reuse it for all tests.
 */
const getDefaultStoreId = () =>
  Effect.gen(function* () {
    const stores = yield* SecretsStore.listStores({
      accountId: accountId(),
    });
    const defaultStore = stores[0];
    if (!defaultStore) {
      throw new Error("No default store found in account");
    }
    return defaultStore.id;
  });

/**
 * Delete a secret by name from a store. Silently succeeds if not found.
 */
const deleteSecretByName = (storeId: string, name: string) =>
  Effect.gen(function* () {
    const secrets = yield* SecretsStore.listStoreSecrets({
      storeId,
      accountId: accountId(),
    });
    const found = secrets.find((s) => s.name === name);
    if (found) {
      yield* SecretsStore.deleteStoreSecret({
        storeId,
        secretId: found.id,
        accountId: accountId(),
      }).pipe(Effect.catch(() => Effect.void));
    }
  }).pipe(Effect.catch(() => Effect.void));

/**
 * Run `fn` with the default store, cleaning up named secrets afterward.
 * Cleanup-first pattern for idempotency.
 */
const withDefaultStore = <A, E, R>(
  secretNames: string[],
  fn: (storeId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    const storeId = yield* getDefaultStoreId();

    // Cleanup first in case of previous failed run
    for (const name of secretNames) {
      yield* deleteSecretByName(storeId, name);
    }

    // Run the test function, ensuring cleanup
    return yield* fn(storeId).pipe(
      Effect.ensuring(
        Effect.gen(function* () {
          for (const name of secretNames) {
            yield* deleteSecretByName(storeId, name);
          }
        }),
      ),
    );
  });

/**
 * Run `fn` with the default store and a pre-created secret.
 */
const withDefaultStoreAndSecret = <A, E, R>(
  secretNameStr: string,
  fn: (storeId: string, secretId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  withDefaultStore([secretNameStr], (storeId) =>
    Effect.gen(function* () {
      const secrets = yield* SecretsStore.createStoreSecret({
        storeId,
        accountId: accountId(),
        body: [
          {
            name: secretNameStr,
            scopes: ["workers"],
            value: "test-secret-value",
          },
        ],
      });

      const secretId = secrets[0].id;
      return yield* fn(storeId, secretId);
    }),
  );

// ============================================================================
// SecretsStore Tests
// ============================================================================

describe("SecretsStore", () => {
  // --------------------------------------------------------------------------
  // getQuota
  // --------------------------------------------------------------------------
  describe("getQuota", () => {
    test("happy path - retrieves quota for the account", () =>
      Effect.gen(function* () {
        const result = yield* SecretsStore.getQuota({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(result.secrets).toBeDefined();
        expect(typeof result.secrets.quota).toBe("number");
        expect(typeof result.secrets.usage).toBe("number");
        expect(result.secrets.quota).toBeGreaterThanOrEqual(0);
        expect(result.secrets.usage).toBeGreaterThanOrEqual(0);
      }));

    test("error - invalid accountId", () =>
      SecretsStore.getQuota({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));
  });

  // --------------------------------------------------------------------------
  // listStores
  // --------------------------------------------------------------------------
  describe("listStores", () => {
    test("happy path - lists stores in account", () =>
      Effect.gen(function* () {
        const result = yield* SecretsStore.listStores({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        for (const store of result) {
          expect(typeof store.id).toBe("string");
          expect(typeof store.name).toBe("string");
          expect(typeof store.created).toBe("string");
          expect(typeof store.modified).toBe("string");
        }
      }));

    test("happy path - lists stores with direction ascending", () =>
      Effect.gen(function* () {
        const result = yield* SecretsStore.listStores({
          accountId: accountId(),
          direction: "asc",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("happy path - lists stores with direction descending", () =>
      Effect.gen(function* () {
        const result = yield* SecretsStore.listStores({
          accountId: accountId(),
          direction: "desc",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("happy path - lists stores ordered by name", () =>
      Effect.gen(function* () {
        const result = yield* SecretsStore.listStores({
          accountId: accountId(),
          order: "name",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("error - invalid accountId", () =>
      SecretsStore.listStores({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));
  });

  // --------------------------------------------------------------------------
  // createStore
  // --------------------------------------------------------------------------
  describe("createStore", () => {
    test("error - MaximumStoresExceeded when creating a store", () =>
      SecretsStore.createStore({
        accountId: accountId(),
        body: [{ name: "distilled-cf-secrets-store-create-test" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("MaximumStoresExceeded")),
      ));

    test("error - invalid accountId", () =>
      SecretsStore.createStore({
        accountId: "invalid-account-id-000",
        body: [{ name: "distilled-cf-secrets-store-create-invalid-acct" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteStore
  // --------------------------------------------------------------------------
  describe("deleteStore", () => {
    test("error - non-existent storeId", () =>
      SecretsStore.deleteStore({
        storeId: "00000000-0000-0000-0000-000000000000",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("StoreNotFound")),
      ));

    test("error - invalid accountId", () =>
      SecretsStore.deleteStore({
        storeId: "00000000-0000-0000-0000-000000000000",
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - empty storeId", () =>
      SecretsStore.deleteStore({
        storeId: "",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ));
  });

  // --------------------------------------------------------------------------
  // listStoreSecrets
  // --------------------------------------------------------------------------
  describe("listStoreSecrets", () => {
    test("happy path - lists secrets in a store", () =>
      Effect.gen(function* () {
        const storeId = yield* getDefaultStoreId();
        const result = yield* SecretsStore.listStoreSecrets({
          storeId,
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("happy path - lists secrets after creating one", () =>
      withDefaultStoreAndSecret(
        secretName("list-check"),
        (storeId, _secretId) =>
          Effect.gen(function* () {
            const result = yield* SecretsStore.listStoreSecrets({
              storeId,
              accountId: accountId(),
            });

            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThanOrEqual(1);
            const found = result.find(
              (s) => s.name === secretName("list-check"),
            );
            expect(found).toBeDefined();
            expect(typeof found!.id).toBe("string");
            expect(typeof found!.name).toBe("string");
            expect(typeof found!.created).toBe("string");
            expect(typeof found!.modified).toBe("string");
            expect(typeof found!.storeId).toBe("string");
            expect(["pending", "active", "deleted"]).toContain(found!.status);
          }),
      ));

    test("happy path - lists secrets with direction ascending", () =>
      Effect.gen(function* () {
        const storeId = yield* getDefaultStoreId();
        const result = yield* SecretsStore.listStoreSecrets({
          storeId,
          accountId: accountId(),
          direction: "asc",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("happy path - lists secrets ordered by name", () =>
      Effect.gen(function* () {
        const storeId = yield* getDefaultStoreId();
        const result = yield* SecretsStore.listStoreSecrets({
          storeId,
          accountId: accountId(),
          order: "name",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("happy path - lists secrets with search filter", () =>
      withDefaultStoreAndSecret(
        secretName("searchable"),
        (storeId, _secretId) =>
          Effect.gen(function* () {
            const result = yield* SecretsStore.listStoreSecrets({
              storeId,
              accountId: accountId(),
              search: "searchable",
            });

            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
          }),
      ));

    test("error - non-existent storeId", () =>
      SecretsStore.listStoreSecrets({
        storeId: "00000000-0000-0000-0000-000000000000",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("StoreNotFound")),
      ));

    test("error - invalid accountId", () =>
      SecretsStore.listStoreSecrets({
        storeId: "00000000-0000-0000-0000-000000000000",
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));
  });

  // --------------------------------------------------------------------------
  // createStoreSecret
  // --------------------------------------------------------------------------
  describe("createStoreSecret", () => {
    test("happy path - creates a secret in a store", () =>
      withDefaultStore([secretName("create-happy")], (storeId) =>
        Effect.gen(function* () {
          const name = secretName("create-happy");
          const result = yield* SecretsStore.createStoreSecret({
            storeId,
            accountId: accountId(),
            body: [
              {
                name,
                scopes: ["workers"],
                value: "my-secret-value",
              },
            ],
          });

          expect(result).toBeDefined();
          expect(Array.isArray(result)).toBe(true);
          expect(result.length).toBe(1);
          expect(result[0].name).toBe(name);
          expect(typeof result[0].id).toBe("string");
          expect(typeof result[0].created).toBe("string");
          expect(typeof result[0].modified).toBe("string");
          expect(typeof result[0].storeId).toBe("string");
          expect(["pending", "active", "deleted"]).toContain(result[0].status);
        }),
      ));

    test("happy path - creates a secret with a comment", () =>
      withDefaultStore([secretName("create-comment")], (storeId) =>
        Effect.gen(function* () {
          const name = secretName("create-comment");
          const result = yield* SecretsStore.createStoreSecret({
            storeId,
            accountId: accountId(),
            body: [
              {
                name,
                scopes: ["workers"],
                value: "my-secret-value",
                comment: "This is a test secret",
              },
            ],
          });

          expect(result).toBeDefined();
          expect(Array.isArray(result)).toBe(true);
          expect(result.length).toBe(1);
          expect(result[0].name).toBe(name);
        }),
      ));

    test("happy path - creates multiple secrets at once", () =>
      withDefaultStore(
        [secretName("multi-1"), secretName("multi-2")],
        (storeId) =>
          Effect.gen(function* () {
            const name1 = secretName("multi-1");
            const name2 = secretName("multi-2");
            const result = yield* SecretsStore.createStoreSecret({
              storeId,
              accountId: accountId(),
              body: [
                { name: name1, scopes: ["workers"], value: "value-1" },
                { name: name2, scopes: ["workers"], value: "value-2" },
              ],
            });

            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(2);
          }),
      ));

    test("error - non-existent storeId", () =>
      SecretsStore.createStoreSecret({
        storeId: "00000000-0000-0000-0000-000000000000",
        accountId: accountId(),
        body: [
          {
            name: secretName("create-bad-store"),
            scopes: ["workers"],
            value: "test",
          },
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("StoreNotFound")),
      ));

    test("error - invalid accountId", () =>
      SecretsStore.createStoreSecret({
        storeId: "00000000-0000-0000-0000-000000000000",
        accountId: "invalid-account-id-000",
        body: [
          {
            name: secretName("create-bad-acct"),
            scopes: ["workers"],
            value: "test",
          },
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - empty secret name", () =>
      Effect.gen(function* () {
        const storeId = yield* getDefaultStoreId();
        return yield* SecretsStore.createStoreSecret({
          storeId,
          accountId: accountId(),
          body: [{ name: "", scopes: ["workers"], value: "test" }],
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("SecretNameEmpty")),
        );
      }));

    test("error - duplicate secret name in same store", () =>
      withDefaultStore([secretName("dup-secret")], (storeId) =>
        Effect.gen(function* () {
          const name = secretName("dup-secret");
          yield* SecretsStore.createStoreSecret({
            storeId,
            accountId: accountId(),
            body: [{ name, scopes: ["workers"], value: "first" }],
          });

          // Attempt to create again — should error
          return yield* SecretsStore.createStoreSecret({
            storeId,
            accountId: accountId(),
            body: [{ name, scopes: ["workers"], value: "second" }],
          }).pipe(
            Effect.flip,
            Effect.map((e) =>
              expect(e._tag).toBe("SecretNameAlreadyExists"),
            ),
          );
        }),
      ));

    test("error - SecretScopeInvalid for invalid scope value", () =>
      Effect.gen(function* () {
        const storeId = yield* getDefaultStoreId();
        return yield* SecretsStore.createStoreSecret({
          storeId,
          accountId: accountId(),
          body: [
            {
              name: secretName("invalid-scope-create"),
              scopes: ["invalid-scope"],
              value: "test",
            },
          ],
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("SecretScopeInvalid")),
        );
      }));
  });

  // --------------------------------------------------------------------------
  // getStoreSecret
  // --------------------------------------------------------------------------
  describe("getStoreSecret", () => {
    test("happy path - retrieves a secret by ID", () =>
      withDefaultStoreAndSecret(
        secretName("get-happy"),
        (storeId, secretId) =>
          Effect.gen(function* () {
            const result = yield* SecretsStore.getStoreSecret({
              storeId,
              secretId,
              accountId: accountId(),
            });

            expect(result).toBeDefined();
            expect(result.id).toBe(secretId);
            expect(result.name).toBe(secretName("get-happy"));
            expect(typeof result.created).toBe("string");
            expect(typeof result.modified).toBe("string");
            expect(typeof result.storeId).toBe("string");
            expect(["pending", "active", "deleted"]).toContain(result.status);
          }),
      ));

    test("error - non-existent secretId in valid store", () =>
      Effect.gen(function* () {
        const storeId = yield* getDefaultStoreId();
        return yield* SecretsStore.getStoreSecret({
          storeId,
          secretId: "00000000-0000-0000-0000-000000000000",
          accountId: accountId(),
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("SecretNotFound")),
        );
      }));

    test("error - non-existent storeId", () =>
      SecretsStore.getStoreSecret({
        storeId: "00000000-0000-0000-0000-000000000000",
        secretId: "00000000-0000-0000-0000-000000000000",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("StoreNotFound")),
      ));

    test("error - invalid accountId", () =>
      SecretsStore.getStoreSecret({
        storeId: "00000000-0000-0000-0000-000000000000",
        secretId: "00000000-0000-0000-0000-000000000000",
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - empty secretId", () =>
      SecretsStore.getStoreSecret({
        storeId: "00000000-0000-0000-0000-000000000000",
        secretId: "",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ));

    test("error - empty storeId", () =>
      SecretsStore.getStoreSecret({
        storeId: "",
        secretId: "00000000-0000-0000-0000-000000000000",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ));
  });

  // --------------------------------------------------------------------------
  // patchStoreSecret
  // --------------------------------------------------------------------------
  describe("patchStoreSecret", () => {
    test("happy path - updates secret comment", () =>
      withDefaultStoreAndSecret(
        secretName("patch-comment"),
        (storeId, secretId) =>
          Effect.gen(function* () {
            const result = yield* SecretsStore.patchStoreSecret({
              storeId,
              secretId,
              accountId: accountId(),
              comment: "Updated comment",
            });

            expect(result).toBeDefined();
            expect(result.id).toBe(secretId);
            expect(typeof result.name).toBe("string");
            expect(typeof result.created).toBe("string");
            expect(typeof result.modified).toBe("string");
            expect(["pending", "active", "deleted"]).toContain(result.status);
          }),
      ));

    test("happy path - updates secret scopes", () =>
      withDefaultStoreAndSecret(
        secretName("patch-scopes"),
        (storeId, secretId) =>
          Effect.gen(function* () {
            const result = yield* SecretsStore.patchStoreSecret({
              storeId,
              secretId,
              accountId: accountId(),
              scopes: ["workers"],
            });

            expect(result).toBeDefined();
            expect(result.id).toBe(secretId);
          }),
      ));

    test("happy path - updates both comment and scopes", () =>
      withDefaultStoreAndSecret(
        secretName("patch-both"),
        (storeId, secretId) =>
          Effect.gen(function* () {
            const result = yield* SecretsStore.patchStoreSecret({
              storeId,
              secretId,
              accountId: accountId(),
              comment: "Updated comment and scopes",
              scopes: ["workers"],
            });

            expect(result).toBeDefined();
            expect(result.id).toBe(secretId);
            expect(typeof result.created).toBe("string");
            expect(typeof result.modified).toBe("string");
          }),
      ));

    test("error - non-existent secretId in valid store", () =>
      Effect.gen(function* () {
        const storeId = yield* getDefaultStoreId();
        return yield* SecretsStore.patchStoreSecret({
          storeId,
          secretId: "00000000-0000-0000-0000-000000000000",
          accountId: accountId(),
          comment: "Should fail",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("SecretNotFound")),
        );
      }));

    test("error - non-existent storeId", () =>
      SecretsStore.patchStoreSecret({
        storeId: "00000000-0000-0000-0000-000000000000",
        secretId: "00000000-0000-0000-0000-000000000000",
        accountId: accountId(),
        comment: "Should fail",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("StoreNotFound")),
      ));

    test("error - invalid accountId", () =>
      SecretsStore.patchStoreSecret({
        storeId: "00000000-0000-0000-0000-000000000000",
        secretId: "00000000-0000-0000-0000-000000000000",
        accountId: "invalid-account-id-000",
        comment: "Should fail",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - SecretScopeInvalid for invalid scope value", () =>
      withDefaultStoreAndSecret(
        secretName("patch-invalid-scope"),
        (storeId, secretId) =>
          SecretsStore.patchStoreSecret({
            storeId,
            secretId,
            accountId: accountId(),
            scopes: ["invalid-scope"],
          }).pipe(
            Effect.flip,
            Effect.map((e) => expect(e._tag).toBe("SecretScopeInvalid")),
          ),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteStoreSecret
  // --------------------------------------------------------------------------
  describe("deleteStoreSecret", () => {
    test("happy path - deletes a secret from a store", () =>
      withDefaultStore([secretName("delete-happy")], (storeId) =>
        Effect.gen(function* () {
          // Create a secret to delete
          const secrets = yield* SecretsStore.createStoreSecret({
            storeId,
            accountId: accountId(),
            body: [
              {
                name: secretName("delete-happy"),
                scopes: ["workers"],
                value: "to-be-deleted",
              },
            ],
          });

          const secretId = secrets[0].id;

          // deleteStoreSecret succeeds (API returns null result)
          yield* SecretsStore.deleteStoreSecret({
            storeId,
            secretId,
            accountId: accountId(),
          });

          // Verify the secret is gone by checking it's not in the list
          const remaining = yield* SecretsStore.listStoreSecrets({
            storeId,
            accountId: accountId(),
          });
          const found = remaining.find((s) => s.id === secretId);
          expect(found).toBeUndefined();
        }),
      ));

    test("error - non-existent secretId in valid store", () =>
      Effect.gen(function* () {
        const storeId = yield* getDefaultStoreId();
        return yield* SecretsStore.deleteStoreSecret({
          storeId,
          secretId: "00000000-0000-0000-0000-000000000000",
          accountId: accountId(),
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("SecretNotFound")),
        );
      }));

    test("error - non-existent storeId", () =>
      SecretsStore.deleteStoreSecret({
        storeId: "00000000-0000-0000-0000-000000000000",
        secretId: "00000000-0000-0000-0000-000000000000",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("StoreNotFound")),
      ));

    test("error - invalid accountId", () =>
      SecretsStore.deleteStoreSecret({
        storeId: "00000000-0000-0000-0000-000000000000",
        secretId: "00000000-0000-0000-0000-000000000000",
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - empty secretId", () =>
      SecretsStore.deleteStoreSecret({
        storeId: "00000000-0000-0000-0000-000000000000",
        secretId: "",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ));

    test("error - empty storeId", () =>
      SecretsStore.deleteStoreSecret({
        storeId: "",
        secretId: "00000000-0000-0000-0000-000000000000",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ));
  });

  // --------------------------------------------------------------------------
  // bulkDeleteStoreSecrets
  // --------------------------------------------------------------------------
  describe("bulkDeleteStoreSecrets", () => {
    test("error - non-existent storeId", () =>
      SecretsStore.bulkDeleteStoreSecrets({
        storeId: "00000000-0000-0000-0000-000000000000",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("StoreNotFound")),
      ));

    test("error - invalid accountId", () =>
      SecretsStore.bulkDeleteStoreSecrets({
        storeId: "00000000-0000-0000-0000-000000000000",
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - empty storeId", () =>
      SecretsStore.bulkDeleteStoreSecrets({
        storeId: "",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("StoreNotFound")),
      ));
  });

  // --------------------------------------------------------------------------
  // duplicateStoreSecret
  // --------------------------------------------------------------------------
  describe("duplicateStoreSecret", () => {
    test("happy path - duplicates a secret", () =>
      withDefaultStoreAndSecret(
        secretName("dup-original"),
        (storeId, secretId) =>
          Effect.gen(function* () {
            const dupName = secretName("dup-copy");
            // Clean up any previous copy
            yield* deleteSecretByName(storeId, dupName);

            const result = yield* SecretsStore.duplicateStoreSecret({
              storeId,
              secretId,
              accountId: accountId(),
              name: dupName,
              scopes: ["workers"],
            });

            expect(result).toBeDefined();
            expect(result.name).toBe(dupName);
            expect(typeof result.id).toBe("string");
            expect(result.id).not.toBe(secretId);
            expect(typeof result.created).toBe("string");
            expect(typeof result.modified).toBe("string");
            expect(typeof result.storeId).toBe("string");
            expect(["pending", "active", "deleted"]).toContain(result.status);

            // Clean up the duplicate
            yield* SecretsStore.deleteStoreSecret({
              storeId,
              secretId: result.id,
              accountId: accountId(),
            }).pipe(Effect.catch(() => Effect.void));
          }),
      ));

    test("happy path - duplicates a secret with a comment", () =>
      withDefaultStoreAndSecret(
        secretName("dup-orig-comment"),
        (storeId, secretId) =>
          Effect.gen(function* () {
            const dupName = secretName("dup-copy-comment");
            // Clean up any previous copy
            yield* deleteSecretByName(storeId, dupName);

            const result = yield* SecretsStore.duplicateStoreSecret({
              storeId,
              secretId,
              accountId: accountId(),
              name: dupName,
              scopes: ["workers"],
              comment: "This is a duplicated secret",
            });

            expect(result).toBeDefined();
            expect(result.name).toBe(dupName);
            expect(typeof result.id).toBe("string");

            // Clean up the duplicate
            yield* SecretsStore.deleteStoreSecret({
              storeId,
              secretId: result.id,
              accountId: accountId(),
            }).pipe(Effect.catch(() => Effect.void));
          }),
      ));

    test("error - non-existent secretId", () =>
      Effect.gen(function* () {
        const storeId = yield* getDefaultStoreId();
        return yield* SecretsStore.duplicateStoreSecret({
          storeId,
          secretId: "00000000-0000-0000-0000-000000000000",
          accountId: accountId(),
          name: secretName("dup-bad-secret"),
          scopes: ["workers"],
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("SecretNotFound")),
        );
      }));

    test("error - non-existent storeId", () =>
      SecretsStore.duplicateStoreSecret({
        storeId: "00000000-0000-0000-0000-000000000000",
        secretId: "00000000-0000-0000-0000-000000000000",
        accountId: accountId(),
        name: secretName("dup-bad-store"),
        scopes: ["workers"],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("StoreNotFound")),
      ));

    test("error - invalid accountId", () =>
      SecretsStore.duplicateStoreSecret({
        storeId: "00000000-0000-0000-0000-000000000000",
        secretId: "00000000-0000-0000-0000-000000000000",
        accountId: "invalid-account-id-000",
        name: secretName("dup-bad-acct"),
        scopes: ["workers"],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountId")),
      ));

    test("error - empty name for duplicate", () =>
      withDefaultStoreAndSecret(
        secretName("dup-orig-empty"),
        (storeId, secretId) =>
          SecretsStore.duplicateStoreSecret({
            storeId,
            secretId,
            accountId: accountId(),
            name: "",
            scopes: ["workers"],
          }).pipe(
            Effect.flip,
            Effect.map((e) => expect(e._tag).toBe("SecretNameEmpty")),
          ),
      ));

    test("error - duplicate name (same as original)", () =>
      withDefaultStoreAndSecret(
        secretName("dup-orig-same"),
        (storeId, secretId) =>
          SecretsStore.duplicateStoreSecret({
            storeId,
            secretId,
            accountId: accountId(),
            name: secretName("dup-orig-same"),
            scopes: ["workers"],
          }).pipe(
            Effect.flip,
            Effect.map((e) => expect(e._tag).toBe("SecretNameAlreadyExists")),
          ),
      ));

    test("error - empty scopes array", () =>
      withDefaultStoreAndSecret(
        secretName("dup-orig-scopes"),
        (storeId, secretId) =>
          SecretsStore.duplicateStoreSecret({
            storeId,
            secretId,
            accountId: accountId(),
            name: secretName("dup-copy-scopes"),
            scopes: [],
          }).pipe(
            Effect.flip,
            Effect.map((e) => expect(e._tag).toBe("SecretScopesEmpty")),
          ),
      ));

    test("error - SecretScopeInvalid for invalid scope value", () =>
      withDefaultStoreAndSecret(
        secretName("dup-orig-invalid-scope"),
        (storeId, secretId) =>
          SecretsStore.duplicateStoreSecret({
            storeId,
            secretId,
            accountId: accountId(),
            name: secretName("dup-copy-invalid-scope"),
            scopes: ["invalid-scope"],
          }).pipe(
            Effect.flip,
            Effect.map((e) => expect(e._tag).toBe("SecretScopeInvalid")),
          ),
      ));
  });
});
