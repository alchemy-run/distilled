import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as D1 from "~/services/d1.ts";

const accountId = () => getAccountId();

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic database name for tests.
 * Follows the convention: distilled-cf-d1-{testname}
 */
const dbName = (name: string) => `distilled-cf-d1-${name}`;

/**
 * Create a D1 database, run `fn`, then delete the database.
 * Cleanup-first pattern for idempotency.
 */
const withDatabase = <A, E, R>(
  name: string,
  fn: (databaseId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    const db = yield* D1.createDatabase({
      accountId: accountId(),
      name,
    });

    const databaseId = (db as any).uuid ?? (db as any).id;

    return yield* fn(databaseId).pipe(
      Effect.ensuring(
        D1.deleteDatabase({
          accountId: accountId(),
          databaseId,
        }).pipe(Effect.catchAll(() => Effect.void)),
      ),
    );
  });

// ============================================================================
// D1 Tests
// ============================================================================

describe("D1", () => {
  // --------------------------------------------------------------------------
  // createDatabase
  // --------------------------------------------------------------------------
  describe("createDatabase", () => {
    test("happy path - creates a new D1 database", () =>
      Effect.gen(function* () {
        const name = dbName("create-happy");
        const db = yield* D1.createDatabase({
          accountId: accountId(),
          name,
        });

        expect(db).toBeDefined();
        const result = db as any;
        expect(result.uuid ?? result.id).toBeDefined();
        expect(typeof (result.uuid ?? result.id)).toBe("string");
        expect(result.name).toBe(name);

        // Cleanup
        const databaseId = result.uuid ?? result.id;
        yield* D1.deleteDatabase({
          accountId: accountId(),
          databaseId,
        }).pipe(Effect.catchAll(() => Effect.void));
      }));

    test("happy path - creates a D1 database with primary location hint", () =>
      Effect.gen(function* () {
        const name = dbName("create-location");
        const db = yield* D1.createDatabase({
          accountId: accountId(),
          name,
          primaryLocationHint: "enam",
        });

        expect(db).toBeDefined();
        const result = db as any;
        expect(result.uuid ?? result.id).toBeDefined();

        // Cleanup
        const databaseId = result.uuid ?? result.id;
        yield* D1.deleteDatabase({
          accountId: accountId(),
          databaseId,
        }).pipe(Effect.catchAll(() => Effect.void));
      }));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      D1.createDatabase({
        accountId: "invalid-account-id-000",
        name: dbName("create-invalid-account"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - InvalidProperty for empty database name", () =>
      D1.createDatabase({
        accountId: accountId(),
        name: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidProperty")),
      ));
  });

  // --------------------------------------------------------------------------
  // getDatabase
  // --------------------------------------------------------------------------
  describe("getDatabase", () => {
    test("happy path - retrieves an existing database", () =>
      withDatabase(dbName("get-happy"), (databaseId) =>
        Effect.gen(function* () {
          const db = yield* D1.getDatabase({
            accountId: accountId(),
            databaseId,
          });

          expect(db).toBeDefined();
          const result = db as any;
          expect(result.uuid ?? result.id).toBe(databaseId);
          expect(result.name).toBe(dbName("get-happy"));
        }),
      ));

    test("error - DatabaseNotFound for non-existent databaseId", () =>
      D1.getDatabase({
        accountId: accountId(),
        databaseId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("DatabaseNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      D1.getDatabase({
        accountId: "invalid-account-id-000",
        databaseId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - UnknownError for empty databaseId", () =>
      D1.getDatabase({
        accountId: accountId(),
        databaseId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownError")),
      ));
  });

  // --------------------------------------------------------------------------
  // updateDatabase
  // --------------------------------------------------------------------------
  describe("updateDatabase", () => {
    test("happy path - updates read replication to auto", () =>
      withDatabase(dbName("update-happy"), (databaseId) =>
        Effect.gen(function* () {
          const result = yield* D1.updateDatabase({
            accountId: accountId(),
            databaseId,
            readReplication: { mode: "auto" },
          });
          expect(result).toBeDefined();
        }),
      ));

    test("happy path - updates read replication to disabled", () =>
      withDatabase(dbName("update-disabled"), (databaseId) =>
        Effect.gen(function* () {
          const result = yield* D1.updateDatabase({
            accountId: accountId(),
            databaseId,
            readReplication: { mode: "disabled" },
          });
          expect(result).toBeDefined();
        }),
      ));

    test("error - DatabaseNotFound for non-existent databaseId", () =>
      D1.updateDatabase({
        accountId: accountId(),
        databaseId: "00000000-0000-0000-0000-000000000000",
        readReplication: { mode: "auto" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("DatabaseNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      D1.updateDatabase({
        accountId: "invalid-account-id-000",
        databaseId: "00000000-0000-0000-0000-000000000000",
        readReplication: { mode: "auto" },
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // patchDatabase
  // --------------------------------------------------------------------------
  describe("patchDatabase", () => {
    test("happy path - patches read replication to auto", () =>
      withDatabase(dbName("patch-happy"), (databaseId) =>
        Effect.gen(function* () {
          const result = yield* D1.patchDatabase({
            accountId: accountId(),
            databaseId,
            readReplication: { mode: "auto" },
          });
          expect(result).toBeDefined();
        }),
      ));

    test("error - InternalError for patch with no readReplication (API limitation)", () =>
      withDatabase(dbName("patch-noop"), (databaseId) =>
        D1.patchDatabase({
          accountId: accountId(),
          databaseId,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InternalError")),
        ),
      ));

    test("error - InternalError for non-existent databaseId", () =>
      D1.patchDatabase({
        accountId: accountId(),
        databaseId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InternalError")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      D1.patchDatabase({
        accountId: "invalid-account-id-000",
        databaseId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteDatabase
  // --------------------------------------------------------------------------
  describe("deleteDatabase", () => {
    test("happy path - deletes an existing database", () =>
      Effect.gen(function* () {
        const db = yield* D1.createDatabase({
          accountId: accountId(),
          name: dbName("delete-happy"),
        });

        const databaseId = (db as any).uuid ?? (db as any).id;

        const result = yield* D1.deleteDatabase({
          accountId: accountId(),
          databaseId,
        });

        expect(result).toBeDefined();
      }));

    test("error - DatabaseNotFound for non-existent databaseId", () =>
      D1.deleteDatabase({
        accountId: accountId(),
        databaseId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("DatabaseNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      D1.deleteDatabase({
        accountId: "invalid-account-id-000",
        databaseId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - UnknownCloudflareError for empty databaseId", () =>
      D1.deleteDatabase({
        accountId: accountId(),
        databaseId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // exportDatabase
  // --------------------------------------------------------------------------
  describe("exportDatabase", () => {
    test("happy path - exports a database", () =>
      withDatabase(dbName("export-happy"), (databaseId) =>
        Effect.gen(function* () {
          const result = yield* D1.exportDatabase({
            accountId: accountId(),
            databaseId,
            outputFormat: "polling",
          });
          expect(result).toBeDefined();
        }),
      ));

    test("happy path - exports a database with dumpOptions (noSchema)", () =>
      withDatabase(dbName("export-opts"), (databaseId) =>
        Effect.gen(function* () {
          const result = yield* D1.exportDatabase({
            accountId: accountId(),
            databaseId,
            outputFormat: "polling",
            dumpOptions: { noSchema: true },
          });
          expect(result).toBeDefined();
        }),
      ));

    test("happy path - exports a database with dumpOptions (noData)", () =>
      withDatabase(dbName("export-nodata"), (databaseId) =>
        Effect.gen(function* () {
          const result = yield* D1.exportDatabase({
            accountId: accountId(),
            databaseId,
            outputFormat: "polling",
            dumpOptions: { noData: true },
          });
          expect(result).toBeDefined();
        }),
      ));

    test("error - DatabaseNotFound for non-existent databaseId", () =>
      D1.exportDatabase({
        accountId: accountId(),
        databaseId: "00000000-0000-0000-0000-000000000000",
        outputFormat: "polling",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("DatabaseNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      D1.exportDatabase({
        accountId: "invalid-account-id-000",
        databaseId: "00000000-0000-0000-0000-000000000000",
        outputFormat: "polling",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // getBookmarkDatabaseTimeTravel
  // --------------------------------------------------------------------------
  describe("getBookmarkDatabaseTimeTravel", () => {
    test("happy path - retrieves current bookmark for a database", () =>
      withDatabase(dbName("bookmark-happy"), (databaseId) =>
        Effect.gen(function* () {
          const result = yield* D1.getBookmarkDatabaseTimeTravel({
            accountId: accountId(),
            databaseId,
          });

          expect(result).toBeDefined();
          // bookmark may or may not be present on a fresh database
          if (result.bookmark) {
            expect(typeof result.bookmark).toBe("string");
          }
        }),
      ));

    test("error - DatabaseNotFound for non-existent databaseId", () =>
      D1.getBookmarkDatabaseTimeTravel({
        accountId: accountId(),
        databaseId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("DatabaseNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      D1.getBookmarkDatabaseTimeTravel({
        accountId: "invalid-account-id-000",
        databaseId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - TimestampTooOld for timestamp far in the past", () =>
      withDatabase(dbName("bookmark-past"), (databaseId) =>
        D1.getBookmarkDatabaseTimeTravel({
          accountId: accountId(),
          databaseId,
          timestamp: "2020-01-01T00:00:00Z",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("TimestampTooOld")),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // restoreDatabaseTimeTravel
  // --------------------------------------------------------------------------
  describe("restoreDatabaseTimeTravel", () => {
    test("happy path - restores database to a bookmark", () =>
      withDatabase(dbName("restore-bookmark"), (databaseId) =>
        Effect.gen(function* () {
          // First, get the current bookmark
          const bookmarkResult = yield* D1.getBookmarkDatabaseTimeTravel({
            accountId: accountId(),
            databaseId,
          });

          // Only attempt restore if we have a bookmark
          if (bookmarkResult.bookmark) {
            const result = yield* D1.restoreDatabaseTimeTravel({
              accountId: accountId(),
              databaseId,
              bookmark: bookmarkResult.bookmark,
            });

            expect(result).toBeDefined();
            if (result.message) {
              expect(typeof result.message).toBe("string");
            }
          }
        }),
      ));

    test("error - returns error for non-existent databaseId", () =>
      D1.restoreDatabaseTimeTravel({
        accountId: accountId(),
        databaseId: "00000000-0000-0000-0000-000000000000",
        timestamp: new Date().toISOString(),
      }).pipe(
        Effect.flip,
        // Cloudflare returns either InvalidProperty or DatabaseNotFound depending on timing
        Effect.map((e) =>
          expect(["InvalidProperty", "DatabaseNotFound"]).toContain(e._tag),
        ),
      ));

    test("error - InvalidObjectIdentifier for invalid accountId", () =>
      D1.restoreDatabaseTimeTravel({
        accountId: "invalid-account-id-000",
        databaseId: "00000000-0000-0000-0000-000000000000",
        timestamp: new Date().toISOString(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - InvalidProperty for missing both bookmark and timestamp", () =>
      withDatabase(dbName("restore-missing"), (databaseId) =>
        D1.restoreDatabaseTimeTravel({
          accountId: accountId(),
          databaseId,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidProperty")),
        ),
      ));

    test("error - InvalidProperty for invalid bookmark string", () =>
      withDatabase(dbName("restore-bad-bk"), (databaseId) =>
        D1.restoreDatabaseTimeTravel({
          accountId: accountId(),
          databaseId,
          bookmark: "not-a-valid-bookmark",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidProperty")),
        ),
      ));

    test("error - InvalidProperty for invalid timestamp format", () =>
      withDatabase(dbName("restore-bad-ts"), (databaseId) =>
        D1.restoreDatabaseTimeTravel({
          accountId: accountId(),
          databaseId,
          timestamp: "not-a-timestamp",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidProperty")),
        ),
      ));
  });
});
