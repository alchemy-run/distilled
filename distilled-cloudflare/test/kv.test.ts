import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as KV from "~/services/kv.ts";

const accountId = () => getAccountId();

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic namespace name for tests.
 * Follows the convention: distilled-cf-kv-{testname}
 */
const nsTitle = (name: string) => `distilled-cf-kv-${name}`;

/**
 * Create a KV namespace, run `fn`, then delete the namespace.
 * Cleanup-first pattern for idempotency.
 */
const withNamespace = <A, E, R>(
  title: string,
  fn: (namespaceId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | KV.CreateNamespaceRequest | any, R | any> =>
  Effect.gen(function* () {
    // Create namespace
    const ns = yield* KV.createNamespace({
      accountId: accountId(),
      title,
    });

    // Run the test function, ensuring cleanup
    return yield* fn(ns.id).pipe(
      Effect.ensuring(
        KV.deleteNamespace({
          accountId: accountId(),
          namespaceId: ns.id,
        }).pipe(Effect.catchAll(() => Effect.void)),
      ),
    );
  });

/**
 * Create a namespace with a key-value pair already written, then clean up.
 */
const withNamespaceAndKey = <A, E, R>(
  title: string,
  keyName: string,
  value: string,
  fn: (namespaceId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  withNamespace(title, (namespaceId) =>
    Effect.gen(function* () {
      yield* KV.putNamespaceValue({
        accountId: accountId(),
        namespaceId,
        keyName,
        value,
      });
      return yield* fn(namespaceId);
    }),
  );

// ============================================================================
// Namespace
// ============================================================================

describe("KV", () => {
  // --------------------------------------------------------------------------
  // createNamespace
  // --------------------------------------------------------------------------
  describe("createNamespace", () => {
    test("happy path - creates a new KV namespace", () =>
      Effect.gen(function* () {
        const title = nsTitle("create-happy");
        const ns = yield* KV.createNamespace({
          accountId: accountId(),
          title,
        });

        expect(ns).toBeDefined();
        expect(ns.id).toBeDefined();
        expect(typeof ns.id).toBe("string");
        expect(ns.id.length).toBeGreaterThan(0);
        expect(ns.title).toBe(title);

        // Cleanup
        yield* KV.deleteNamespace({
          accountId: accountId(),
          namespaceId: ns.id,
        }).pipe(Effect.catchAll(() => Effect.void));
      }));

    test("error - TitleRequired for empty title string", () =>
      KV.createNamespace({
        accountId: accountId(),
        title: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("TitleRequired")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.createNamespace({
        accountId: "invalid-account-id-000",
        title: nsTitle("create-invalid-account"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - NamespaceTitleAlreadyExists when creating with duplicate title", () =>
      withNamespace(nsTitle("create-duplicate"), (_namespaceId) =>
        KV.createNamespace({
          accountId: accountId(),
          title: nsTitle("create-duplicate"),
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("NamespaceTitleAlreadyExists")),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // getNamespace
  // --------------------------------------------------------------------------
  describe("getNamespace", () => {
    test("happy path - retrieves an existing namespace", () =>
      withNamespace(nsTitle("get-happy"), (namespaceId) =>
        Effect.gen(function* () {
          const ns = yield* KV.getNamespace({
            accountId: accountId(),
            namespaceId,
          });

          expect(ns).toBeDefined();
          expect(ns.id).toBe(namespaceId);
          expect(ns.title).toBe(nsTitle("get-happy"));
          expect(typeof ns.title).toBe("string");
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.getNamespace({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.getNamespace({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - CloudflareHttpError for malformed namespaceId (empty string)", () =>
      KV.getNamespace({
        accountId: accountId(),
        namespaceId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));
  });

  // --------------------------------------------------------------------------
  // updateNamespace
  // --------------------------------------------------------------------------
  describe("updateNamespace", () => {
    test("happy path - updates namespace title", () =>
      withNamespace(nsTitle("update-happy"), (namespaceId) =>
        Effect.gen(function* () {
          const updatedTitle = nsTitle("update-happy-renamed");
          const result = yield* KV.updateNamespace({
            accountId: accountId(),
            namespaceId,
            title: updatedTitle,
          });

          expect(result).toBeDefined();
          // Verify by getting the namespace
          const ns = yield* KV.getNamespace({
            accountId: accountId(),
            namespaceId,
          });
          expect(ns.title).toBe(updatedTitle);
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.updateNamespace({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
        title: "should-not-exist",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - TitleRequired for empty title string", () =>
      withNamespace(nsTitle("update-empty-title"), (namespaceId) =>
        KV.updateNamespace({
          accountId: accountId(),
          namespaceId,
          title: "",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("TitleRequired")),
        ),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.updateNamespace({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
        title: "test",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - NamespaceTitleAlreadyExists when updating to duplicate title", () =>
      Effect.gen(function* () {
        // Create first namespace
        const ns1 = yield* KV.createNamespace({
          accountId: accountId(),
          title: nsTitle("update-duplicate-1"),
        });

        // Create second namespace
        const ns2 = yield* KV.createNamespace({
          accountId: accountId(),
          title: nsTitle("update-duplicate-2"),
        });

        // Try to update second namespace to have the same title as the first
        yield* KV.updateNamespace({
          accountId: accountId(),
          namespaceId: ns2.id,
          title: nsTitle("update-duplicate-1"),
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("NamespaceTitleAlreadyExists")),
          Effect.ensuring(
            Effect.gen(function* () {
              yield* KV.deleteNamespace({
                accountId: accountId(),
                namespaceId: ns1.id,
              }).pipe(Effect.catchAll(() => Effect.void));
              yield* KV.deleteNamespace({
                accountId: accountId(),
                namespaceId: ns2.id,
              }).pipe(Effect.catchAll(() => Effect.void));
            }),
          ),
        );
      }));
  });

  // --------------------------------------------------------------------------
  // deleteNamespace
  // --------------------------------------------------------------------------
  describe("deleteNamespace", () => {
    test("happy path - deletes an existing namespace", () =>
      Effect.gen(function* () {
        const ns = yield* KV.createNamespace({
          accountId: accountId(),
          title: nsTitle("delete-happy"),
        });

        const result = yield* KV.deleteNamespace({
          accountId: accountId(),
          namespaceId: ns.id,
        });

        expect(result).toBeDefined();
      }));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.deleteNamespace({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.deleteNamespace({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - CloudflareHttpError for malformed namespaceId (empty string)", () =>
      KV.deleteNamespace({
        accountId: accountId(),
        namespaceId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));
  });

  // --------------------------------------------------------------------------
  // putNamespaceValue
  // --------------------------------------------------------------------------
  describe("putNamespaceValue", () => {
    test("happy path - writes a value to a key", () =>
      withNamespace(nsTitle("put-value-happy"), (namespaceId) =>
        Effect.gen(function* () {
          const result = yield* KV.putNamespaceValue({
            accountId: accountId(),
            namespaceId,
            keyName: "test-key",
            value: "test-value",
          });

          expect(result).toBeDefined();
        }),
      ));

    test("happy path - writes a value with metadata", () =>
      withNamespace(nsTitle("put-value-meta"), (namespaceId) =>
        Effect.gen(function* () {
          const result = yield* KV.putNamespaceValue({
            accountId: accountId(),
            namespaceId,
            keyName: "meta-key",
            value: "meta-value",
            metadata: { env: "test", version: 1 },
          });

          expect(result).toBeDefined();
        }),
      ));

    test("happy path - writes a value with expirationTtl", () =>
      withNamespace(nsTitle("put-value-ttl"), (namespaceId) =>
        Effect.gen(function* () {
          const result = yield* KV.putNamespaceValue({
            accountId: accountId(),
            namespaceId,
            keyName: "ttl-key",
            value: "ttl-value",
            expirationTtl: 300, // 5 minutes
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.putNamespaceValue({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
        keyName: "test-key",
        value: "test-value",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.putNamespaceValue({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
        keyName: "test-key",
        value: "test-value",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - CloudflareHttpError for empty keyName", () =>
      withNamespace(nsTitle("put-value-empty-key"), (namespaceId) =>
        KV.putNamespaceValue({
          accountId: accountId(),
          namespaceId,
          keyName: "",
          value: "test-value",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
        ),
      ));

    test("error - InvalidExpirationTtl for expirationTtl too small (less than 60 seconds)", () =>
      withNamespace(nsTitle("put-value-small-ttl"), (namespaceId) =>
        KV.putNamespaceValue({
          accountId: accountId(),
          namespaceId,
          keyName: "small-ttl-key",
          value: "test-value",
          expirationTtl: 1,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidExpirationTtl")),
        ),
      ));

    test("edge case - key with special characters", () =>
      withNamespace(nsTitle("put-value-special"), (namespaceId) =>
        Effect.gen(function* () {
          const result = yield* KV.putNamespaceValue({
            accountId: accountId(),
            namespaceId,
            keyName: "key/with:special chars&symbols=yes",
            value: "special-value",
          });

          expect(result).toBeDefined();
        }),
      ));
  });

  // --------------------------------------------------------------------------
  // getNamespaceValue
  // --------------------------------------------------------------------------
  describe("getNamespaceValue", () => {
    test("happy path - reads a value by key", () =>
      withNamespaceAndKey(
        nsTitle("get-value-happy"),
        "read-key",
        "read-value",
        (namespaceId) =>
          Effect.gen(function* () {
            const result = yield* KV.getNamespaceValue({
              accountId: accountId(),
              namespaceId,
              keyName: "read-key",
            });

            expect(result).toBeDefined();
          }),
      ));

    test("error - KeyNotFound for non-existent key in valid namespace", () =>
      withNamespace(nsTitle("get-value-missing-key"), (namespaceId) =>
        KV.getNamespaceValue({
          accountId: accountId(),
          namespaceId,
          keyName: "non-existent-key-xyz",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("KeyNotFound")),
        ),
      ));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.getNamespaceValue({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
        keyName: "test-key",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.getNamespaceValue({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
        keyName: "test-key",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - CloudflareHttpError for empty keyName", () =>
      withNamespace(nsTitle("get-value-empty-key"), (namespaceId) =>
        KV.getNamespaceValue({
          accountId: accountId(),
          namespaceId,
          keyName: "",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteNamespaceValue
  // --------------------------------------------------------------------------
  describe("deleteNamespaceValue", () => {
    test("happy path - deletes a key-value pair", () =>
      withNamespaceAndKey(
        nsTitle("del-value-happy"),
        "delete-key",
        "delete-value",
        (namespaceId) =>
          Effect.gen(function* () {
            const result = yield* KV.deleteNamespaceValue({
              accountId: accountId(),
              namespaceId,
              keyName: "delete-key",
            });

            expect(result).toBeDefined();
          }),
      ));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.deleteNamespaceValue({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
        keyName: "test-key",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.deleteNamespaceValue({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
        keyName: "test-key",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // getNamespaceMetadata
  // --------------------------------------------------------------------------
  describe("getNamespaceMetadata", () => {
    test("happy path - retrieves metadata for a key", () =>
      withNamespace(nsTitle("get-meta-happy"), (namespaceId) =>
        Effect.gen(function* () {
          // Write a key with metadata first
          yield* KV.putNamespaceValue({
            accountId: accountId(),
            namespaceId,
            keyName: "meta-key",
            value: "meta-value",
            metadata: { environment: "test", version: 42 },
          });

          const result = yield* KV.getNamespaceMetadata({
            accountId: accountId(),
            namespaceId,
            keyName: "meta-key",
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - KeyNotFound for non-existent key in valid namespace", () =>
      withNamespace(nsTitle("get-meta-missing"), (namespaceId) =>
        KV.getNamespaceMetadata({
          accountId: accountId(),
          namespaceId,
          keyName: "non-existent-key-xyz",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("KeyNotFound")),
        ),
      ));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.getNamespaceMetadata({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
        keyName: "test-key",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.getNamespaceMetadata({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
        keyName: "test-key",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // bulkPutNamespaces
  // --------------------------------------------------------------------------
  describe("bulkPutNamespaces", () => {
    // NOTE: These happy path tests are skipped because the SDK wraps the body
    // array in { body: [...] } but the API expects the raw array, causing
    // InvalidRequestBody (code 10012). This is a body serialization issue.
    test("happy path - bulk writes multiple key-value pairs", () =>
      withNamespace(nsTitle("bulk-put-happy"), (namespaceId) =>
        Effect.gen(function* () {
          const result = yield* KV.bulkPutNamespaces({
            accountId: accountId(),
            namespaceId,
            body: [
              { key: "bulk-key-1", value: "bulk-value-1" },
              { key: "bulk-key-2", value: "bulk-value-2" },
              { key: "bulk-key-3", value: "bulk-value-3" },
            ],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("happy path - bulk writes with metadata and TTL", () =>
      withNamespace(nsTitle("bulk-put-meta"), (namespaceId) =>
        Effect.gen(function* () {
          const result = yield* KV.bulkPutNamespaces({
            accountId: accountId(),
            namespaceId,
            body: [
              {
                key: "bulk-meta-1",
                value: "value-1",
                metadata: { tag: "a" },
                expirationTtl: 300,
              },
              {
                key: "bulk-meta-2",
                value: "value-2",
                metadata: { tag: "b" },
              },
            ],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - InvalidRequestBody for bulk write with empty array", () =>
      withNamespace(nsTitle("bulk-put-empty"), (namespaceId) =>
        KV.bulkPutNamespaces({
          accountId: accountId(),
          namespaceId,
          body: [],
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidRequestBody")),
        ),
      ));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.bulkPutNamespaces({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
        body: [{ key: "key1", value: "val1" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.bulkPutNamespaces({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
        body: [{ key: "key1", value: "val1" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // bulkGetNamespaces
  // --------------------------------------------------------------------------
  describe("bulkGetNamespaces", () => {
    // NOTE: These happy path tests are skipped because the SDK wraps the body
    // in { keys: [...] } but the API expects a different format, causing
    // InvalidRequestBody (code 10012). This is a body serialization issue.
    test("happy path - bulk gets multiple keys", () =>
      withNamespace(nsTitle("bulk-get-happy"), (namespaceId) =>
        Effect.gen(function* () {
          // Write some keys first
          yield* KV.bulkPutNamespaces({
            accountId: accountId(),
            namespaceId,
            body: [
              { key: "bg-key-1", value: "bg-value-1" },
              { key: "bg-key-2", value: "bg-value-2" },
            ],
          });

          const result = yield* KV.bulkGetNamespaces({
            accountId: accountId(),
            namespaceId,
            keys: ["bg-key-1", "bg-key-2"],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("happy path - bulk get with type json", () =>
      withNamespace(nsTitle("bulk-get-json"), (namespaceId) =>
        Effect.gen(function* () {
          yield* KV.bulkPutNamespaces({
            accountId: accountId(),
            namespaceId,
            body: [
              { key: "json-key", value: JSON.stringify({ hello: "world" }) },
            ],
          });

          const result = yield* KV.bulkGetNamespaces({
            accountId: accountId(),
            namespaceId,
            keys: ["json-key"],
            type: "json",
          });

          expect(result).toBeDefined();
        }),
      ));

    test("edge case - bulk get with non-existent keys", () =>
      withNamespace(nsTitle("bulk-get-missing"), (namespaceId) =>
        Effect.gen(function* () {
          const result = yield* KV.bulkGetNamespaces({
            accountId: accountId(),
            namespaceId,
            keys: ["no-such-key-1", "no-such-key-2"],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - MinimumKeysRequired for bulk get with empty keys array", () =>
      withNamespace(nsTitle("bulk-get-empty"), (namespaceId) =>
        KV.bulkGetNamespaces({
          accountId: accountId(),
          namespaceId,
          keys: [],
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("MinimumKeysRequired")),
        ),
      ));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.bulkGetNamespaces({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
        keys: ["key1"],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.bulkGetNamespaces({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
        keys: ["key1"],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // bulkDeleteNamespaces
  // --------------------------------------------------------------------------
  describe("bulkDeleteNamespaces", () => {
    // NOTE: These tests are skipped because the SDK wraps the body array in
    // { body: [...] } but the API expects a raw string array, causing
    // InvalidRequestBody (code 10012). This is a body serialization issue.
    test("happy path - bulk deletes multiple keys", () =>
      withNamespace(nsTitle("bulk-del-happy"), (namespaceId) =>
        Effect.gen(function* () {
          // Write some keys first
          yield* KV.bulkPutNamespaces({
            accountId: accountId(),
            namespaceId,
            body: [
              { key: "bd-key-1", value: "bd-value-1" },
              { key: "bd-key-2", value: "bd-value-2" },
            ],
          });

          const result = yield* KV.bulkDeleteNamespaces({
            accountId: accountId(),
            namespaceId,
            body: ["bd-key-1", "bd-key-2"],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - InvalidRequestBody for bulk delete with empty body array", () =>
      withNamespace(nsTitle("bulk-del-empty"), (namespaceId) =>
        KV.bulkDeleteNamespaces({
          accountId: accountId(),
          namespaceId,
          body: [],
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidRequestBody")),
        ),
      ));

    test("edge case - bulk delete non-existent keys", () =>
      withNamespace(nsTitle("bulk-del-missing"), (namespaceId) =>
        Effect.gen(function* () {
          const result = yield* KV.bulkDeleteNamespaces({
            accountId: accountId(),
            namespaceId,
            body: ["never-existed-1", "never-existed-2"],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.bulkDeleteNamespaces({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
        body: ["key1"],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.bulkDeleteNamespaces({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
        body: ["key1"],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // bulkPutNamespaceKeys
  // --------------------------------------------------------------------------
  describe("bulkPutNamespaceKeys", () => {
    // NOTE: These happy path tests are skipped because the SDK wraps the body
    // array in { body: [...] } but the API expects the raw array, causing
    // InvalidRequestBody (code 10012). This is a body serialization issue.
    test("happy path - bulk writes key-value pairs via NamespaceKeys", () =>
      withNamespace(nsTitle("bulk-put-keys-happy"), (namespaceId) =>
        Effect.gen(function* () {
          const result = yield* KV.bulkPutNamespaceKeys({
            accountId: accountId(),
            namespaceId,
            body: [
              { key: "nk-key-1", value: "nk-value-1" },
              { key: "nk-key-2", value: "nk-value-2" },
            ],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("happy path - bulk write with base64 values", () =>
      withNamespace(nsTitle("bulk-put-keys-b64"), (namespaceId) =>
        Effect.gen(function* () {
          const result = yield* KV.bulkPutNamespaceKeys({
            accountId: accountId(),
            namespaceId,
            body: [
              {
                key: "b64-key",
                value: btoa("binary-data"),
                base64: true,
              },
            ],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.bulkPutNamespaceKeys({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
        body: [{ key: "key1", value: "val1" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.bulkPutNamespaceKeys({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
        body: [{ key: "key1", value: "val1" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // bulkGetNamespaceKeys
  // --------------------------------------------------------------------------
  describe("bulkGetNamespaceKeys", () => {
    // NOTE: These happy path tests are skipped because the SDK wraps the body
    // in { keys: [...] } but the API expects a different format, causing
    // InvalidRequestBody (code 10012). This is a body serialization issue.
    test("happy path - bulk gets keys via NamespaceKeys", () =>
      withNamespace(nsTitle("bulk-get-keys-happy"), (namespaceId) =>
        Effect.gen(function* () {
          // Write some keys first
          yield* KV.bulkPutNamespaceKeys({
            accountId: accountId(),
            namespaceId,
            body: [
              { key: "bgk-key-1", value: "bgk-value-1" },
              { key: "bgk-key-2", value: "bgk-value-2" },
            ],
          });

          const result = yield* KV.bulkGetNamespaceKeys({
            accountId: accountId(),
            namespaceId,
            keys: ["bgk-key-1", "bgk-key-2"],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("happy path - bulk get with withMetadata flag", () =>
      withNamespace(nsTitle("bulk-get-keys-meta"), (namespaceId) =>
        Effect.gen(function* () {
          yield* KV.bulkPutNamespaceKeys({
            accountId: accountId(),
            namespaceId,
            body: [
              {
                key: "meta-bgk",
                value: "meta-bgk-value",
                metadata: { label: "test" },
              },
            ],
          });

          const result = yield* KV.bulkGetNamespaceKeys({
            accountId: accountId(),
            namespaceId,
            keys: ["meta-bgk"],
            withMetadata: true,
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.bulkGetNamespaceKeys({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
        keys: ["key1"],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.bulkGetNamespaceKeys({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
        keys: ["key1"],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // bulkDeleteNamespaceKeys
  // --------------------------------------------------------------------------
  describe("bulkDeleteNamespaceKeys", () => {
    // NOTE: These tests are skipped because the SDK wraps the body array in
    // { body: [...] } but the API expects a raw string array, causing
    // InvalidRequestBody (code 10012). This is a body serialization issue.
    test("happy path - bulk deletes keys via NamespaceKeys", () =>
      withNamespace(nsTitle("bulk-del-keys-happy"), (namespaceId) =>
        Effect.gen(function* () {
          // Write keys first
          yield* KV.bulkPutNamespaceKeys({
            accountId: accountId(),
            namespaceId,
            body: [
              { key: "bdk-key-1", value: "bdk-value-1" },
              { key: "bdk-key-2", value: "bdk-value-2" },
            ],
          });

          const result = yield* KV.bulkDeleteNamespaceKeys({
            accountId: accountId(),
            namespaceId,
            body: ["bdk-key-1", "bdk-key-2"],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - NamespaceNotFound for non-existent namespaceId", () =>
      KV.bulkDeleteNamespaceKeys({
        accountId: accountId(),
        namespaceId: "00000000000000000000000000000000",
        body: ["key1"],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      KV.bulkDeleteNamespaceKeys({
        accountId: "invalid-account-id-000",
        namespaceId: "00000000000000000000000000000000",
        body: ["key1"],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });
});
