import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as R2DataCatalog from "~/services/r2-data-catalog.ts";
import * as R2 from "~/services/r2.ts";

const accountId = () => getAccountId();

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic bucket name for tests.
 * Follows the convention: distilled-cf-r2cat-{testname}
 */
const bucketName = (name: string) => `distilled-cf-r2cat-${name}`;

/**
 * Create an R2 bucket, run `fn`, then delete the bucket.
 * Cleanup-first pattern for idempotency.
 */
const withBucket = <A, E, R>(
  name: string,
  fn: (bucket: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    // Attempt cleanup of any stale bucket first
    yield* R2.deleteBucket({
      accountId: accountId(),
      bucketName: name,
    }).pipe(Effect.catch(() => Effect.void));

    // Create the bucket
    yield* R2.createBucket({
      accountId: accountId(),
      name,
    });

    return yield* fn(name).pipe(
      Effect.ensuring(
        // Disable catalog before deleting bucket (catalog may block deletion)
        R2DataCatalog.disableR2DataCatalog({
          accountId: accountId(),
          bucketName: name,
        }).pipe(
          Effect.catch(() => Effect.void),
          Effect.andThen(
            R2.deleteBucket({
              accountId: accountId(),
              bucketName: name,
            }).pipe(Effect.catch(() => Effect.void)),
          ),
        ),
      ),
    );
  });

/**
 * Create an R2 bucket with an enabled data catalog, run `fn`, then clean up.
 */
const withCatalog = <A, E, R>(
  name: string,
  fn: (bucket: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  withBucket(name, (bucket) =>
    Effect.gen(function* () {
      yield* R2DataCatalog.enableR2DataCatalog({
        accountId: accountId(),
        bucketName: bucket,
      });
      return yield* fn(bucket);
    }),
  );

const apiToken = () => process.env.CLOUDFLARE_API_TOKEN!;

/**
 * Create an R2 bucket with an enabled data catalog and credential, run `fn`, then clean up.
 * Maintenance config updates require a credential to be set first.
 */
const withCatalogAndCredential = <A, E, R>(
  name: string,
  fn: (bucket: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  withCatalog(name, (bucket) =>
    Effect.gen(function* () {
      yield* R2DataCatalog.createCredential({
        accountId: accountId(),
        bucketName: bucket,
        token: apiToken(),
      });
      return yield* fn(bucket);
    }),
  );

// ============================================================================
// R2 Data Catalog Tests
// ============================================================================

describe("R2DataCatalog", () => {
  // --------------------------------------------------------------------------
  // listR2DataCatalogs
  // --------------------------------------------------------------------------
  describe("listR2DataCatalogs", () => {
    test("happy path - lists catalogs in account", () =>
      Effect.gen(function* () {
        const result = yield* R2DataCatalog.listR2DataCatalogs({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(result.warehouses).toBeDefined();
        expect(Array.isArray(result.warehouses)).toBe(true);
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      R2DataCatalog.listR2DataCatalogs({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // enableR2DataCatalog
  // --------------------------------------------------------------------------
  describe("enableR2DataCatalog", () => {
    // SKIPPED: SDK bug - API returns R2 bucket data instead of data catalog response
    test(
      "happy path - enables a data catalog on a bucket",
      { timeout: 120_000 },
      () =>
        withBucket(bucketName("enable-happy"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.enableR2DataCatalog({
              accountId: accountId(),
              bucketName: bucket,
            });

            expect(result).toBeDefined();
            expect(typeof result.id).toBe("string");
            expect(result.id!.length).toBeGreaterThan(0);
            expect(typeof result.name).toBe("string");
            expect(result.name.length).toBeGreaterThan(0);
          }),
        ),
    );

    // NOTE: API creates a catalog entry even for non-existent buckets (no NoSuchBucket error)
    test("quirk - succeeds for non-existent bucket", () =>
      Effect.gen(function* () {
        const result = yield* R2DataCatalog.enableR2DataCatalog({
          accountId: accountId(),
          bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        });
        expect(result).toBeDefined();
        expect(typeof result.id).toBe("string");

        // Clean up the stale catalog entry
        yield* R2DataCatalog.disableR2DataCatalog({
          accountId: accountId(),
          bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        }).pipe(Effect.catch(() => Effect.void));
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      R2DataCatalog.enableR2DataCatalog({
        accountId: "invalid-account-id-000",
        bucketName: "any-bucket",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - CloudflareHttpError for empty bucketName string", () =>
      R2DataCatalog.enableR2DataCatalog({
        accountId: accountId(),
        bucketName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));
  });

  // --------------------------------------------------------------------------
  // getR2DataCatalog
  // --------------------------------------------------------------------------
  describe("getR2DataCatalog", () => {
    // SKIPPED: SDK bug - API returns R2 bucket data instead of data catalog response
    test(
      "happy path - retrieves an enabled data catalog",
      { timeout: 120_000 },
      () =>
        withCatalog(bucketName("get-happy"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.getR2DataCatalog({
              accountId: accountId(),
              bucketName: bucket,
            });

            expect(result).toBeDefined();
            expect(typeof result.id).toBe("string");
            expect(result.id.length).toBeGreaterThan(0);
            expect(typeof result.bucket).toBe("string");
            expect(result.bucket).toBe(bucket);
            expect(typeof result.name).toBe("string");
            expect(["active", "inactive"]).toContain(result.status);
          }),
        ),
    );

    // NOTE: API returns catalog data even for non-existent buckets (no NoSuchBucket error)
    test("quirk - succeeds for non-existent bucket", () =>
      Effect.gen(function* () {
        // Ensure catalog exists for this non-existent bucket
        yield* R2DataCatalog.enableR2DataCatalog({
          accountId: accountId(),
          bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        }).pipe(Effect.catch(() => Effect.void));

        const result = yield* R2DataCatalog.getR2DataCatalog({
          accountId: accountId(),
          bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        });
        expect(result).toBeDefined();
        expect(result.bucket).toBe("distilled-cf-nonexistent-bucket-xyz-999");
        expect(typeof result.status).toBe("string");

        // Clean up
        yield* R2DataCatalog.disableR2DataCatalog({
          accountId: accountId(),
          bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        }).pipe(Effect.catch(() => Effect.void));
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      R2DataCatalog.getR2DataCatalog({
        accountId: "invalid-account-id-000",
        bucketName: "any-bucket",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - CloudflareHttpError for empty bucketName string", () =>
      R2DataCatalog.getR2DataCatalog({
        accountId: accountId(),
        bucketName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));
  });

  // --------------------------------------------------------------------------
  // disableR2DataCatalog
  // --------------------------------------------------------------------------
  describe("disableR2DataCatalog", () => {
    // SKIPPED: SDK bug - API returns R2 bucket data instead of data catalog response
    test(
      "happy path - disables an enabled data catalog",
      { timeout: 120_000 },
      () =>
        withBucket(bucketName("disable-happy"), (bucket) =>
          Effect.gen(function* () {
            // Enable catalog first
            yield* R2DataCatalog.enableR2DataCatalog({
              accountId: accountId(),
              bucketName: bucket,
            });

            // Disable it
            const result = yield* R2DataCatalog.disableR2DataCatalog({
              accountId: accountId(),
              bucketName: bucket,
            });

            expect(result).toBeDefined();
          }),
        ),
    );

    // NOTE: API succeeds silently even for non-existent buckets (no error returned)
    test("quirk - succeeds for non-existent bucket", () =>
      Effect.gen(function* () {
        const result = yield* R2DataCatalog.disableR2DataCatalog({
          accountId: accountId(),
          bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        });
        // API returns empty string on success
        expect(result).toBeDefined();
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      R2DataCatalog.disableR2DataCatalog({
        accountId: "invalid-account-id-000",
        bucketName: "any-bucket",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - CloudflareHttpError for empty bucketName string", () =>
      R2DataCatalog.disableR2DataCatalog({
        accountId: accountId(),
        bucketName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));
  });

  // --------------------------------------------------------------------------
  // getMaintenanceConfig
  // --------------------------------------------------------------------------
  describe("getMaintenanceConfig", () => {
    // SKIPPED: SDK bug - API returns R2 bucket data instead of data catalog response
    test(
      "happy path - retrieves maintenance config for a catalog",
      { timeout: 120_000 },
      () =>
        withCatalog(bucketName("maint-get-happy"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.getMaintenanceConfig({
              accountId: accountId(),
              bucketName: bucket,
            });

            expect(result).toBeDefined();
            expect(result.credentialStatus).toBeDefined();
            expect(["present", "absent"]).toContain(result.credentialStatus);
            expect(result.maintenanceConfig).toBeDefined();
          }),
        ),
    );

    test("error - WarehouseInactive for non-existent bucket", () =>
      R2DataCatalog.getMaintenanceConfig({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WarehouseInactive")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      R2DataCatalog.getMaintenanceConfig({
        accountId: "invalid-account-id-000",
        bucketName: "any-bucket",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - WarehouseNotFound for empty bucketName string", () =>
      R2DataCatalog.getMaintenanceConfig({
        accountId: accountId(),
        bucketName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WarehouseNotFound")),
      ));
  });

  // --------------------------------------------------------------------------
  // updateMaintenanceConfig
  // --------------------------------------------------------------------------
  describe("updateMaintenanceConfig", () => {
    test(
      "happy path - updates compaction config for a catalog",
      { timeout: 120_000 },
      () =>
        withCatalogAndCredential(bucketName("maint-upd-compact"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.updateMaintenanceConfig({
              accountId: accountId(),
              bucketName: bucket,
              compaction: {
                state: "enabled",
                targetSizeMb: "128",
              },
            });

            expect(result).toBeDefined();
          }),
        ),
    );

    test(
      "happy path - updates snapshot expiration config for a catalog",
      { timeout: 120_000 },
      () =>
        withCatalogAndCredential(bucketName("maint-upd-snap"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.updateMaintenanceConfig({
              accountId: accountId(),
              bucketName: bucket,
              snapshotExpiration: {
                maxSnapshotAge: "7d",
                minSnapshotsToKeep: 3,
                state: "enabled",
              },
            });

            expect(result).toBeDefined();
          }),
        ),
    );

    test(
      "happy path - updates both compaction and snapshot expiration",
      { timeout: 120_000 },
      () =>
        withCatalogAndCredential(bucketName("maint-upd-both"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.updateMaintenanceConfig({
              accountId: accountId(),
              bucketName: bucket,
              compaction: {
                state: "enabled",
                targetSizeMb: "256",
              },
              snapshotExpiration: {
                maxSnapshotAge: "30d",
                minSnapshotsToKeep: 5,
                state: "enabled",
              },
            });

            expect(result).toBeDefined();
          }),
        ),
    );

    test("error - WarehouseInactive for non-existent bucket", () =>
      R2DataCatalog.updateMaintenanceConfig({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        compaction: { state: "enabled", targetSizeMb: "128" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WarehouseInactive")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      R2DataCatalog.updateMaintenanceConfig({
        accountId: "invalid-account-id-000",
        bucketName: "any-bucket",
        compaction: { state: "enabled", targetSizeMb: "128" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - CloudflareHttpError for empty bucketName string", () =>
      R2DataCatalog.updateMaintenanceConfig({
        accountId: accountId(),
        bucketName: "",
        compaction: { state: "enabled", targetSizeMb: "128" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));
  });

  // --------------------------------------------------------------------------
  // createCredential
  // --------------------------------------------------------------------------
  describe("createCredential", () => {
    test(
      "happy path - creates a credential for a catalog bucket",
      { timeout: 120_000 },
      () =>
        withCatalog(bucketName("cred-create"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.createCredential({
              accountId: accountId(),
              bucketName: bucket,
              token: apiToken(),
            });

            expect(result).toBeDefined();
          }),
        ),
    );

    test("error - InvalidCredential for non-existent bucket", () =>
      R2DataCatalog.createCredential({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        token: "some-token",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidCredential")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      R2DataCatalog.createCredential({
        accountId: "invalid-account-id-000",
        bucketName: "any-bucket",
        token: "some-token",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - CloudflareHttpError for empty bucketName string", () =>
      R2DataCatalog.createCredential({
        accountId: accountId(),
        bucketName: "",
        token: "some-token",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));

    test("error - InvalidCredential for empty token string", () =>
      R2DataCatalog.createCredential({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        token: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidCredential")),
      ));
  });

  // --------------------------------------------------------------------------
  // listNamespaces
  // --------------------------------------------------------------------------
  describe("listNamespaces", () => {
    // SKIPPED: SDK bug - API returns R2 bucket data instead of data catalog response
    test(
      "happy path - lists namespaces in a catalog",
      { timeout: 120_000 },
      () =>
        withCatalog(bucketName("ns-list-happy"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.listNamespaces({
              accountId: accountId(),
              bucketName: bucket,
            });

            expect(result).toBeDefined();
            expect(result.namespaces).toBeDefined();
            expect(Array.isArray(result.namespaces)).toBe(true);
          }),
        ),
    );

    // SKIPPED: SDK bug - API returns R2 bucket data instead of data catalog response
    test(
      "happy path - lists namespaces with returnDetails",
      { timeout: 120_000 },
      () =>
        withCatalog(bucketName("ns-list-details"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.listNamespaces({
              accountId: accountId(),
              bucketName: bucket,
              returnDetails: true,
            });

            expect(result).toBeDefined();
            expect(result.namespaces).toBeDefined();
            expect(Array.isArray(result.namespaces)).toBe(true);
          }),
        ),
    );

    // SKIPPED: SDK bug - API returns R2 bucket data instead of data catalog response
    test(
      "happy path - lists namespaces with returnUuids",
      { timeout: 120_000 },
      () =>
        withCatalog(bucketName("ns-list-uuids"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.listNamespaces({
              accountId: accountId(),
              bucketName: bucket,
              returnUuids: true,
            });

            expect(result).toBeDefined();
            expect(result.namespaces).toBeDefined();
            expect(Array.isArray(result.namespaces)).toBe(true);
          }),
        ),
    );

    // SKIPPED: SDK bug - API returns R2 bucket data instead of data catalog response
    test(
      "happy path - lists namespaces with pageSize limit",
      { timeout: 120_000 },
      () =>
        withCatalog(bucketName("ns-list-page"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.listNamespaces({
              accountId: accountId(),
              bucketName: bucket,
              pageSize: 10,
            });

            expect(result).toBeDefined();
            expect(result.namespaces).toBeDefined();
            expect(Array.isArray(result.namespaces)).toBe(true);
          }),
        ),
    );

    test("error - WarehouseInactive for non-existent bucket", () =>
      R2DataCatalog.listNamespaces({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WarehouseInactive")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      R2DataCatalog.listNamespaces({
        accountId: "invalid-account-id-000",
        bucketName: "any-bucket",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - WarehouseNotFound for empty bucketName string", () =>
      R2DataCatalog.listNamespaces({
        accountId: accountId(),
        bucketName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WarehouseNotFound")),
      ));
  });

  // --------------------------------------------------------------------------
  // listNamespaceTables
  // --------------------------------------------------------------------------
  describe("listNamespaceTables", () => {
    // SKIPPED: SDK bug - API returns R2 bucket data instead of data catalog response
    test("happy path - lists tables in a namespace", { timeout: 120_000 }, () =>
      withCatalog(bucketName("nst-list-happy"), (bucket) =>
        Effect.gen(function* () {
          const result = yield* R2DataCatalog.listNamespaceTables({
            accountId: accountId(),
            bucketName: bucket,
            namespace: "default",
          });

          expect(result).toBeDefined();
          expect(result.identifiers).toBeDefined();
          expect(Array.isArray(result.identifiers)).toBe(true);
        }),
      ),
    );

    // SKIPPED: SDK bug - API returns R2 bucket data instead of data catalog response
    test(
      "happy path - lists tables with returnDetails",
      { timeout: 120_000 },
      () =>
        withCatalog(bucketName("nst-list-detail"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.listNamespaceTables({
              accountId: accountId(),
              bucketName: bucket,
              namespace: "default",
              returnDetails: true,
            });

            expect(result).toBeDefined();
            expect(result.identifiers).toBeDefined();
            expect(Array.isArray(result.identifiers)).toBe(true);
          }),
        ),
    );

    // SKIPPED: SDK bug - API returns R2 bucket data instead of data catalog response
    test(
      "happy path - lists tables with returnUuids",
      { timeout: 180_000 },
      () =>
        withCatalog(bucketName("nst-list-uuids"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.listNamespaceTables({
              accountId: accountId(),
              bucketName: bucket,
              namespace: "default",
              returnUuids: true,
            });

            expect(result).toBeDefined();
            expect(result.identifiers).toBeDefined();
            expect(Array.isArray(result.identifiers)).toBe(true);
          }),
        ),
    );

    // SKIPPED: SDK bug - API returns R2 bucket data instead of data catalog response
    test(
      "happy path - lists tables with pageSize limit",
      { timeout: 120_000 },
      () =>
        withCatalog(bucketName("nst-list-page"), (bucket) =>
          Effect.gen(function* () {
            const result = yield* R2DataCatalog.listNamespaceTables({
              accountId: accountId(),
              bucketName: bucket,
              namespace: "default",
              pageSize: 10,
            });

            expect(result).toBeDefined();
            expect(result.identifiers).toBeDefined();
          }),
        ),
    );

    test("error - WarehouseInactive for non-existent bucket", () =>
      R2DataCatalog.listNamespaceTables({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        namespace: "default",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WarehouseInactive")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      R2DataCatalog.listNamespaceTables({
        accountId: "invalid-account-id-000",
        bucketName: "any-bucket",
        namespace: "default",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - CloudflareHttpError for empty bucketName string", () =>
      R2DataCatalog.listNamespaceTables({
        accountId: accountId(),
        bucketName: "",
        namespace: "default",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));

    test("error - CloudflareHttpError for empty namespace string", () =>
      R2DataCatalog.listNamespaceTables({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        namespace: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));
  });

  // --------------------------------------------------------------------------
  // getNamespaceTableMaintenanceConfig
  // --------------------------------------------------------------------------
  describe("getNamespaceTableMaintenanceConfig", () => {
    test("error - WarehouseInactive for non-existent bucket", () =>
      R2DataCatalog.getNamespaceTableMaintenanceConfig({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        namespace: "default",
        tableName: "non-existent-table",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WarehouseInactive")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      R2DataCatalog.getNamespaceTableMaintenanceConfig({
        accountId: "invalid-account-id-000",
        bucketName: "any-bucket",
        namespace: "default",
        tableName: "any-table",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - CloudflareHttpError for empty bucketName string", () =>
      R2DataCatalog.getNamespaceTableMaintenanceConfig({
        accountId: accountId(),
        bucketName: "",
        namespace: "default",
        tableName: "any-table",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));

    test("error - CloudflareHttpError for empty namespace string", () =>
      R2DataCatalog.getNamespaceTableMaintenanceConfig({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        namespace: "",
        tableName: "any-table",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));

    test("error - CloudflareHttpError for empty tableName string", () =>
      R2DataCatalog.getNamespaceTableMaintenanceConfig({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        namespace: "default",
        tableName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));

    test(
      "error - non-existent table in valid catalog",
      { timeout: 120_000 },
      () =>
        withCatalog(bucketName("nst-maint-get-404"), (bucket) =>
          R2DataCatalog.getNamespaceTableMaintenanceConfig({
            accountId: accountId(),
            bucketName: bucket,
            namespace: "default",
            tableName: "non-existent-table-xyz",
          }).pipe(
            Effect.flip,
            Effect.map((e) => expect(e._tag).toBe("TableNotFound")),
          ),
        ),
    );
  });

  // --------------------------------------------------------------------------
  // updateNamespaceTableMaintenanceConfig
  // --------------------------------------------------------------------------
  describe("updateNamespaceTableMaintenanceConfig", () => {
    test("error - WarehouseInactive for non-existent bucket", () =>
      R2DataCatalog.updateNamespaceTableMaintenanceConfig({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        namespace: "default",
        tableName: "non-existent-table",
        compaction: { state: "enabled", targetSizeMb: "128" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WarehouseInactive")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      R2DataCatalog.updateNamespaceTableMaintenanceConfig({
        accountId: "invalid-account-id-000",
        bucketName: "any-bucket",
        namespace: "default",
        tableName: "any-table",
        compaction: { state: "enabled", targetSizeMb: "128" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - CloudflareHttpError for empty bucketName string", () =>
      R2DataCatalog.updateNamespaceTableMaintenanceConfig({
        accountId: accountId(),
        bucketName: "",
        namespace: "default",
        tableName: "any-table",
        compaction: { state: "enabled", targetSizeMb: "128" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));

    test("error - CloudflareHttpError for empty namespace string", () =>
      R2DataCatalog.updateNamespaceTableMaintenanceConfig({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        namespace: "",
        tableName: "any-table",
        compaction: { state: "enabled", targetSizeMb: "128" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));

    test("error - CloudflareHttpError for empty tableName string", () =>
      R2DataCatalog.updateNamespaceTableMaintenanceConfig({
        accountId: accountId(),
        bucketName: "distilled-cf-nonexistent-bucket-xyz-999",
        namespace: "default",
        tableName: "",
        compaction: { state: "enabled", targetSizeMb: "128" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));

    // SKIPPED: SDK bug - API returns R2 bucket data instead of proper error response
    test(
      "error - non-existent table in valid catalog",
      { timeout: 120_000 },
      () =>
        withCatalog(bucketName("nst-maint-upd-404"), (bucket) =>
          R2DataCatalog.updateNamespaceTableMaintenanceConfig({
            accountId: accountId(),
            bucketName: bucket,
            namespace: "default",
            tableName: "non-existent-table-xyz",
            compaction: { state: "enabled", targetSizeMb: "128" },
          }).pipe(
            Effect.flip,
            Effect.map((e) => expect(e._tag).toBe("TableNotFound")),
          ),
        ),
    );
  });
});
