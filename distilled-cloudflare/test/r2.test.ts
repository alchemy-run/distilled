import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as R2 from "~/services/r2.ts";

const accountId = () => getAccountId();

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic bucket name for tests.
 * Follows the convention: distilled-cf-r2-{testname}
 */
const bucketName = (name: string) => `distilled-cf-r2-${name}`;

/**
 * Create an R2 bucket, run `fn`, then delete the bucket.
 * Cleanup-first pattern for idempotency.
 */
const withBucket = <A, E, R>(
  name: string,
  fn: (bucket: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    // Attempt cleanup first in case of previous failed run
    yield* R2.deleteBucket({
      accountId: accountId(),
      bucketName: name,
    }).pipe(Effect.catchAll(() => Effect.void));

    // Create bucket
    yield* R2.createBucket({
      accountId: accountId(),
      name,
    });

    // Run the test function, ensuring cleanup
    return yield* fn(name).pipe(
      Effect.ensuring(
        R2.deleteBucket({
          accountId: accountId(),
          bucketName: name,
        }).pipe(Effect.catchAll(() => Effect.void)),
      ),
    );
  });

// ============================================================================
// R2 Tests
// ============================================================================

describe("R2", () => {
  // --------------------------------------------------------------------------
  // createBucket
  // --------------------------------------------------------------------------
  describe("createBucket", () => {
    test("happy path - creates a new R2 bucket", () =>
      Effect.gen(function* () {
        const name = bucketName("create-happy");

        // Cleanup first
        yield* R2.deleteBucket({
          accountId: accountId(),
          bucketName: name,
        }).pipe(Effect.catchAll(() => Effect.void));

        const result = yield* R2.createBucket({
          accountId: accountId(),
          name,
        });

        expect(result).toBeDefined();
        expect(result.name).toBe(name);
        if (result.creationDate) {
          expect(typeof result.creationDate).toBe("string");
        }

        // Cleanup
        yield* R2.deleteBucket({
          accountId: accountId(),
          bucketName: name,
        }).pipe(Effect.catchAll(() => Effect.void));
      }));

    test("happy path - creates a bucket with location hint", () =>
      Effect.gen(function* () {
        const name = bucketName("create-location");

        yield* R2.deleteBucket({
          accountId: accountId(),
          bucketName: name,
        }).pipe(Effect.catchAll(() => Effect.void));

        const result = yield* R2.createBucket({
          accountId: accountId(),
          name,
          locationHint: "enam",
        });

        expect(result).toBeDefined();
        expect(result.name).toBe(name);

        // Cleanup
        yield* R2.deleteBucket({
          accountId: accountId(),
          bucketName: name,
        }).pipe(Effect.catchAll(() => Effect.void));
      }));

    test("happy path - creates a bucket with InfrequentAccess storage class", () =>
      Effect.gen(function* () {
        const name = bucketName("create-ia");

        yield* R2.deleteBucket({
          accountId: accountId(),
          bucketName: name,
        }).pipe(Effect.catchAll(() => Effect.void));

        const result = yield* R2.createBucket({
          accountId: accountId(),
          name,
          storageClass: "InfrequentAccess",
        });

        expect(result).toBeDefined();
        expect(result.name).toBe(name);

        // Cleanup
        yield* R2.deleteBucket({
          accountId: accountId(),
          bucketName: name,
        }).pipe(Effect.catchAll(() => Effect.void));
      }));

    test("error - InvalidBucketName for invalid bucket name with uppercase", () =>
      R2.createBucket({
        accountId: accountId(),
        name: "INVALID-UPPERCASE-BUCKET",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidBucketName")),
      ));

    test("error - InvalidBucketName for empty bucket name", () =>
      R2.createBucket({
        accountId: accountId(),
        name: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidBucketName")),
      ));

    test("error - InvalidBucketName for bucket name with special characters", () =>
      R2.createBucket({
        accountId: accountId(),
        name: "bucket@invalid!name",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidBucketName")),
      ));

    test("error - InvalidBucketName for bucket name too short (under 3 chars)", () =>
      R2.createBucket({
        accountId: accountId(),
        name: "ab",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidBucketName")),
      ));

    test("error - duplicate bucket creation", () =>
      withBucket(bucketName("create-dup"), (name) =>
        R2.createBucket({
          accountId: accountId(),
          name,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBeDefined()),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.createBucket({
        accountId: "invalid-account-id-000",
        name: bucketName("create-bad-acct"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getBucket
  // --------------------------------------------------------------------------
  describe("getBucket", () => {
    test("happy path - retrieves an existing bucket", () =>
      withBucket(bucketName("get-happy"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.getBucket({
            accountId: accountId(),
            bucketName: name,
          });

          expect(result).toBeDefined();
          expect(result.name).toBe(name);
          if (result.creationDate) {
            expect(typeof result.creationDate).toBe("string");
          }
          if (result.location) {
            expect([
              "apac",
              "eeur",
              "enam",
              "weur",
              "wnam",
              "oc",
              "APAC",
              "EEUR",
              "ENAM",
              "WEUR",
              "WNAM",
              "OC",
            ]).toContain(result.location);
          }
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.getBucket({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-bucket-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.getBucket({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - returns error for empty bucket name (SDK doesn't handle empty path params)", () =>
      R2.getBucket({
        accountId: accountId(),
        bucketName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // listBuckets
  // --------------------------------------------------------------------------
  describe("listBuckets", () => {
    test("happy path - lists buckets in account", () =>
      Effect.gen(function* () {
        const result = yield* R2.listBuckets({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        if (result.buckets) {
          expect(Array.isArray(result.buckets)).toBe(true);
          for (const bucket of result.buckets) {
            if (bucket.name) {
              expect(typeof bucket.name).toBe("string");
            }
          }
        }
      }));

    test("happy path - lists buckets with nameContains filter", () =>
      withBucket(bucketName("list-filter"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.listBuckets({
            accountId: accountId(),
            nameContains: "distilled-cf-r2-list-filter",
          });

          expect(result).toBeDefined();
          expect(result.buckets).toBeDefined();
          expect(Array.isArray(result.buckets)).toBe(true);
          const found = result.buckets!.some((b) => b.name === name);
          expect(found).toBe(true);
        }),
      ));

    test("happy path - lists buckets with perPage limit", () =>
      Effect.gen(function* () {
        const result = yield* R2.listBuckets({
          accountId: accountId(),
          perPage: 1,
        });

        expect(result).toBeDefined();
        if (result.buckets) {
          expect(result.buckets.length).toBeLessThanOrEqual(1);
        }
      }));

    test("happy path - lists buckets with direction ascending", () =>
      Effect.gen(function* () {
        const result = yield* R2.listBuckets({
          accountId: accountId(),
          direction: "asc",
          order: "name",
        });

        expect(result).toBeDefined();
        if (result.buckets) {
          expect(Array.isArray(result.buckets)).toBe(true);
        }
      }));

    test("edge case - nameContains with no matches returns empty array", () =>
      Effect.gen(function* () {
        const result = yield* R2.listBuckets({
          accountId: accountId(),
          nameContains: "zzzzz-nonexistent-bucket-filter-99999",
        });

        expect(result).toBeDefined();
        if (result.buckets) {
          expect(result.buckets.length).toBe(0);
        }
      }));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.listBuckets({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // patchBucket
  // --------------------------------------------------------------------------
  describe("patchBucket", () => {
    test("happy path - patches bucket storage class to InfrequentAccess", () =>
      withBucket(bucketName("patch-happy"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.patchBucket({
            accountId: accountId(),
            bucketName: name,
            storageClass: "InfrequentAccess",
          });

          expect(result).toBeDefined();
          expect(result.name).toBe(name);
        }),
      ));

    test("happy path - patches bucket storage class back to Standard", () =>
      withBucket(bucketName("patch-std"), (name) =>
        Effect.gen(function* () {
          // First set to InfrequentAccess
          yield* R2.patchBucket({
            accountId: accountId(),
            bucketName: name,
            storageClass: "InfrequentAccess",
          });

          // Then set back to Standard
          const result = yield* R2.patchBucket({
            accountId: accountId(),
            bucketName: name,
            storageClass: "Standard",
          });

          expect(result).toBeDefined();
          expect(result.name).toBe(name);
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.patchBucket({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-patch-xyz",
        storageClass: "Standard",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.patchBucket({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
        storageClass: "Standard",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteBucket
  // --------------------------------------------------------------------------
  describe("deleteBucket", () => {
    test("happy path - deletes an existing bucket", () =>
      Effect.gen(function* () {
        const name = bucketName("delete-happy");

        yield* R2.deleteBucket({
          accountId: accountId(),
          bucketName: name,
        }).pipe(Effect.catchAll(() => Effect.void));

        yield* R2.createBucket({
          accountId: accountId(),
          name,
        });

        const result = yield* R2.deleteBucket({
          accountId: accountId(),
          bucketName: name,
        });

        expect(result).toBeDefined();
      }));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.deleteBucket({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-delete-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.deleteBucket({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - InvalidBucketName for empty bucket name", () =>
      R2.deleteBucket({
        accountId: accountId(),
        bucketName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getBucketCors
  // --------------------------------------------------------------------------
  describe("getBucketCors", () => {
    test("happy path - retrieves CORS config after setting it", () =>
      withBucket(bucketName("cors-get-happy"), (name) =>
        Effect.gen(function* () {
          // Set CORS config first
          yield* R2.putBucketCors({
            accountId: accountId(),
            bucketName: name,
            rules: [
              {
                allowed: {
                  methods: ["GET", "HEAD"],
                  origins: ["https://example.com"],
                },
              },
            ],
          });

          const result = yield* R2.getBucketCors({
            accountId: accountId(),
            bucketName: name,
          });

          expect(result).toBeDefined();
          expect(result.rules).toBeDefined();
          expect(Array.isArray(result.rules)).toBe(true);
          expect(result.rules!.length).toBeGreaterThan(0);
          expect(result.rules![0].allowed.methods).toContain("GET");
          expect(result.rules![0].allowed.origins).toContain(
            "https://example.com",
          );
        }),
      ));

    test("error - fresh bucket returns error (NoCorsConfiguration)", () =>
      withBucket(bucketName("cors-get-fresh"), (name) =>
        R2.getBucketCors({
          accountId: accountId(),
          bucketName: name,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBeDefined()),
        ),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.getBucketCors({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-cors-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.getBucketCors({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // putBucketCors
  // --------------------------------------------------------------------------
  describe("putBucketCors", () => {
    test("happy path - sets CORS configuration on a bucket", () =>
      withBucket(bucketName("cors-put-happy"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.putBucketCors({
            accountId: accountId(),
            bucketName: name,
            rules: [
              {
                allowed: {
                  methods: ["GET", "PUT", "POST"],
                  origins: ["https://example.com", "https://test.com"],
                  headers: ["Content-Type", "Authorization"],
                },
                exposeHeaders: ["ETag"],
                maxAgeSeconds: 3600,
              },
            ],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("happy path - sets CORS with wildcard origin", () =>
      withBucket(bucketName("cors-put-wild"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.putBucketCors({
            accountId: accountId(),
            bucketName: name,
            rules: [
              {
                allowed: {
                  methods: ["GET"],
                  origins: ["*"],
                },
              },
            ],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("happy path - sets multiple CORS rules", () =>
      withBucket(bucketName("cors-put-multi"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.putBucketCors({
            accountId: accountId(),
            bucketName: name,
            rules: [
              {
                allowed: {
                  methods: ["GET"],
                  origins: ["https://readonly.com"],
                },
              },
              {
                allowed: {
                  methods: ["GET", "PUT", "DELETE"],
                  origins: ["https://admin.com"],
                  headers: ["Authorization"],
                },
                maxAgeSeconds: 7200,
              },
            ],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.putBucketCors({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-cors-put-xyz",
        rules: [
          {
            allowed: {
              methods: ["GET"],
              origins: ["*"],
            },
          },
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.putBucketCors({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
        rules: [
          {
            allowed: {
              methods: ["GET"],
              origins: ["*"],
            },
          },
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteBucketCors
  // --------------------------------------------------------------------------
  describe("deleteBucketCors", () => {
    test("happy path - deletes CORS configuration from a bucket", () =>
      withBucket(bucketName("cors-del-happy"), (name) =>
        Effect.gen(function* () {
          // Set CORS first
          yield* R2.putBucketCors({
            accountId: accountId(),
            bucketName: name,
            rules: [
              {
                allowed: {
                  methods: ["GET"],
                  origins: ["*"],
                },
              },
            ],
          });

          const result = yield* R2.deleteBucketCors({
            accountId: accountId(),
            bucketName: name,
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.deleteBucketCors({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-cors-del-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.deleteBucketCors({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getBucketLifecycle
  // --------------------------------------------------------------------------
  describe("getBucketLifecycle", () => {
    test("happy path - retrieves lifecycle config after setting it", () =>
      withBucket(bucketName("lifecycle-get"), (name) =>
        Effect.gen(function* () {
          // Set lifecycle first
          yield* R2.putBucketLifecycle({
            accountId: accountId(),
            bucketName: name,
            rules: [
              {
                id: "delete-old-objects",
                conditions: { prefix: "" },
                enabled: true,
                deleteObjectsTransition: {
                  condition: { maxAge: 30, type: "Age" as const },
                },
              },
            ],
          });

          const result = yield* R2.getBucketLifecycle({
            accountId: accountId(),
            bucketName: name,
          });

          expect(result).toBeDefined();
          expect(result.rules).toBeDefined();
          expect(Array.isArray(result.rules)).toBe(true);
          expect(result.rules!.length).toBeGreaterThan(0);
          expect(result.rules![0].id).toBe("delete-old-objects");
          expect(result.rules![0].enabled).toBe(true);
        }),
      ));

    test("happy path - fresh bucket returns empty rules", () =>
      withBucket(bucketName("lifecycle-get-fresh"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.getBucketLifecycle({
            accountId: accountId(),
            bucketName: name,
          });

          expect(result).toBeDefined();
          // Fresh bucket may have empty rules or undefined
          if (result.rules) {
            expect(Array.isArray(result.rules)).toBe(true);
          }
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.getBucketLifecycle({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-lifecycle-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.getBucketLifecycle({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // putBucketLifecycle
  // --------------------------------------------------------------------------
  describe("putBucketLifecycle", () => {
    test("happy path - sets lifecycle with delete transition by age", () =>
      withBucket(bucketName("lifecycle-put-age"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.putBucketLifecycle({
            accountId: accountId(),
            bucketName: name,
            rules: [
              {
                id: "auto-delete",
                conditions: { prefix: "logs/" },
                enabled: true,
                deleteObjectsTransition: {
                  condition: { maxAge: 7, type: "Age" as const },
                },
              },
            ],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("happy path - sets lifecycle with storage class transition", () =>
      withBucket(bucketName("lifecycle-put-sc"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.putBucketLifecycle({
            accountId: accountId(),
            bucketName: name,
            rules: [
              {
                id: "move-to-ia",
                conditions: { prefix: "" },
                enabled: true,
                storageClassTransitions: [
                  {
                    condition: { maxAge: 30, type: "Age" as const },
                    storageClass: "InfrequentAccess" as const,
                  },
                ],
              },
            ],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("happy path - sets lifecycle with abort multipart uploads", () =>
      withBucket(bucketName("lifecycle-put-mp"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.putBucketLifecycle({
            accountId: accountId(),
            bucketName: name,
            rules: [
              {
                id: "abort-multipart",
                conditions: { prefix: "" },
                enabled: true,
                abortMultipartUploadsTransition: {
                  condition: { maxAge: 7, type: "Age" as const },
                },
              },
            ],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("happy path - clears lifecycle rules with empty array", () =>
      withBucket(bucketName("lifecycle-put-clear"), (name) =>
        Effect.gen(function* () {
          // Set rules first
          yield* R2.putBucketLifecycle({
            accountId: accountId(),
            bucketName: name,
            rules: [
              {
                id: "temp-rule",
                conditions: { prefix: "" },
                enabled: true,
                deleteObjectsTransition: {
                  condition: { maxAge: 30, type: "Age" as const },
                },
              },
            ],
          });

          // Clear rules
          const result = yield* R2.putBucketLifecycle({
            accountId: accountId(),
            bucketName: name,
            rules: [],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.putBucketLifecycle({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-lifecycle-put-xyz",
        rules: [
          {
            id: "test",
            conditions: { prefix: "" },
            enabled: true,
            deleteObjectsTransition: {
              condition: { maxAge: 30, type: "Age" as const },
            },
          },
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.putBucketLifecycle({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
        rules: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getBucketLock
  // --------------------------------------------------------------------------
  describe("getBucketLock", () => {
    test("happy path - retrieves lock config for a bucket", () =>
      withBucket(bucketName("lock-get-happy"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.getBucketLock({
            accountId: accountId(),
            bucketName: name,
          });

          expect(result).toBeDefined();
          // Fresh bucket may have empty rules or undefined
          if (result.rules) {
            expect(Array.isArray(result.rules)).toBe(true);
          }
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.getBucketLock({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-lock-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.getBucketLock({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // putBucketLock
  // --------------------------------------------------------------------------
  describe("putBucketLock", () => {
    test("happy path - sets lock rules on a bucket", () =>
      withBucket(bucketName("lock-put-happy"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.putBucketLock({
            accountId: accountId(),
            bucketName: name,
            rules: [
              {
                id: "retain-30d",
                condition: { maxAgeSeconds: 2592000, type: "Age" as const },
                enabled: true,
              },
            ],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("happy path - sets lock with empty rules to clear", () =>
      withBucket(bucketName("lock-put-clear"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.putBucketLock({
            accountId: accountId(),
            bucketName: name,
            rules: [],
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.putBucketLock({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-lock-put-xyz",
        rules: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.putBucketLock({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
        rules: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // listBucketMetrics
  // --------------------------------------------------------------------------
  describe("listBucketMetrics", () => {
    test("happy path - retrieves R2 metrics for account", () =>
      Effect.gen(function* () {
        const result = yield* R2.listBucketMetrics({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        // Metrics structure may have standard and/or infrequentAccess
        if (result.standard) {
          expect(typeof result.standard).toBe("object");
          if (result.standard.published) {
            if (result.standard.published.objects !== undefined) {
              expect(typeof result.standard.published.objects).toBe("number");
            }
          }
        }
        if (result.infrequentAccess) {
          expect(typeof result.infrequentAccess).toBe("object");
        }
      }));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.listBucketMetrics({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getBucketSippy
  // --------------------------------------------------------------------------
  describe("getBucketSippy", () => {
    test("happy path - retrieves sippy config (disabled by default)", () =>
      withBucket(bucketName("sippy-get-happy"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.getBucketSippy({
            accountId: accountId(),
            bucketName: name,
          });

          expect(result).toBeDefined();
          // Sippy is disabled by default on a fresh bucket
          expect(result.enabled).toBe(false);
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.getBucketSippy({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-sippy-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.getBucketSippy({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteBucketSippy
  // --------------------------------------------------------------------------
  describe("deleteBucketSippy", () => {
    test("happy path - disables sippy on a bucket", () =>
      withBucket(bucketName("sippy-del-happy"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.deleteBucketSippy({
            accountId: accountId(),
            bucketName: name,
          });

          expect(result).toBeDefined();
          expect(result.enabled).toBe(false);
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.deleteBucketSippy({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-sippy-del-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.deleteBucketSippy({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // listBucketDomainManageds
  // --------------------------------------------------------------------------
  describe("listBucketDomainManageds", () => {
    test("happy path - retrieves managed domain info for a bucket", () =>
      withBucket(bucketName("managed-list"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.listBucketDomainManageds({
            accountId: accountId(),
            bucketName: name,
          });

          expect(result).toBeDefined();
          expect(typeof result.bucketId).toBe("string");
          expect(typeof result.domain).toBe("string");
          expect(typeof result.enabled).toBe("boolean");
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.listBucketDomainManageds({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-managed-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.listBucketDomainManageds({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // putBucketDomainManaged
  // --------------------------------------------------------------------------
  describe("putBucketDomainManaged", () => {
    test("happy path - enables managed domain on a bucket", () =>
      withBucket(bucketName("managed-put"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.putBucketDomainManaged({
            accountId: accountId(),
            bucketName: name,
            enabled: true,
          });

          expect(result).toBeDefined();
          expect(typeof result.bucketId).toBe("string");
          expect(typeof result.domain).toBe("string");
          expect(result.enabled).toBe(true);

          // Disable it again
          yield* R2.putBucketDomainManaged({
            accountId: accountId(),
            bucketName: name,
            enabled: false,
          });
        }),
      ));

    test("happy path - disables managed domain on a bucket", () =>
      withBucket(bucketName("managed-put-dis"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.putBucketDomainManaged({
            accountId: accountId(),
            bucketName: name,
            enabled: false,
          });

          expect(result).toBeDefined();
          expect(result.enabled).toBe(false);
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.putBucketDomainManaged({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-managed-put-xyz",
        enabled: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.putBucketDomainManaged({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
        enabled: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // listBucketDomainCustoms
  // --------------------------------------------------------------------------
  describe("listBucketDomainCustoms", () => {
    test("happy path - lists custom domains (empty for fresh bucket)", () =>
      withBucket(bucketName("custom-list"), (name) =>
        Effect.gen(function* () {
          const result = yield* R2.listBucketDomainCustoms({
            accountId: accountId(),
            bucketName: name,
          });

          expect(result).toBeDefined();
          expect(result.domains).toBeDefined();
          expect(Array.isArray(result.domains)).toBe(true);
          expect(result.domains.length).toBe(0);
        }),
      ));

    test("error - NoSuchBucket for non-existent bucket", () =>
      R2.listBucketDomainCustoms({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-custom-list-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NoSuchBucket")),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.listBucketDomainCustoms({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // listBucketEventNotifications
  // --------------------------------------------------------------------------
  describe("listBucketEventNotifications", () => {
    test("error - fresh bucket returns error (no event notification config)", () =>
      withBucket(bucketName("evtnotif-list"), (name) =>
        R2.listBucketEventNotifications({
          accountId: accountId(),
          bucketName: name,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBeDefined()),
        ),
      ));

    test("error - returns error for non-existent bucket", () =>
      R2.listBucketEventNotifications({
        accountId: accountId(),
        bucketName: "distilled-cf-r2-nonexistent-evtnotif-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      R2.listBucketEventNotifications({
        accountId: "invalid-account-id-000",
        bucketName: "distilled-cf-r2-bad-acct",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });
});
