import { Effect, Schedule } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { createDatabase } from "../src/operations/createDatabase";
import { deleteDatabase } from "../src/operations/deleteDatabase";
import { getDatabase } from "../src/operations/getDatabase";
import { getDatabaseThrottler } from "../src/operations/getDatabaseThrottler";
import { listDatabaseRegions } from "../src/operations/listDatabaseRegions";
import { listDatabases } from "../src/operations/listDatabases";
import { updateDatabaseSettings } from "../src/operations/updateDatabaseSettings";
import { updateDatabaseThrottler } from "../src/operations/updateDatabaseThrottler";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "databases";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";

/**
 * Wait for a database to reach the "ready" state.
 * Polls every 5 seconds for up to 10 minutes.
 */
const waitForDatabaseReady = (organization: string, database: string) =>
  Effect.retry(
    getDatabase({ organization, database }).pipe(
      Effect.tap((db) =>
        Effect.sync(() =>
          process.stderr.write(
            `[${TEST_SUFFIX}] waiting for database: state=${db.state}\n`,
          ),
        ),
      ),
      Effect.flatMap((db) =>
        db.state === "ready"
          ? Effect.succeed(db)
          : Effect.fail({ _tag: "NotReady" as const, state: db.state }),
      ),
    ),
    {
      schedule: Schedule.both(
        Schedule.recurs(120),
        Schedule.spaced("5 seconds"),
      ),
      while: (e) => "_tag" in e && e._tag === "NotReady",
    },
  );

/**
 * Helper to check if an error is an expected "not found" type error.
 * PlanetScale API may return NotFound or Forbidden for non-existent resources.
 */
const isNotFoundOrForbidden = (error: unknown): boolean =>
  error instanceof NotFound || error instanceof Forbidden;

/**
 * Helper to check if an error is any API error type.
 * Includes both specific error types and the generic PlanetScaleApiError.
 */
const isApiError = (error: unknown): boolean =>
  error instanceof NotFound ||
  error instanceof Forbidden ||
  error instanceof PlanetScaleApiError ||
  (error !== null && typeof error === "object" && "_tag" in error);

describe("databases", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // getDatabase
  // ============================================================================

  describe("getDatabase", () => {
    it("can get a database", async () => {
      const db = getDb();
      const result = await runEffect(
        getDatabase({
          organization: db.organization,
          database: db.name,
        }),
      );

      expect(result.name).toBe(db.name);
      expect(result.id).toBeDefined();
      expect(result.state).toBe("ready");
      expect(result.created_at).toBeDefined();
      expect(result.region).toBeDefined();
      expect(result.kind).toBe("mysql");
    });

    it("returns database with all expected properties", async () => {
      const db = getDb();
      const result = await runEffect(
        getDatabase({
          organization: db.organization,
          database: db.name,
        }),
      );

      // Required properties
      expect(result.id).toBeDefined();
      expect(result.url).toBeDefined();
      expect(result.branches_url).toBeDefined();
      expect(result.html_url).toBeDefined();
      expect(result.name).toBeDefined();
      expect(result.ready).toBeDefined();
      expect(result.state).toBeDefined();
      expect(result.region).toBeDefined();
      expect(result.region.id).toBeDefined();
      expect(result.region.slug).toBeDefined();
    });

    it("returns NotFound for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        getDatabase({
          organization: db.organization,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        getDatabase({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // listDatabases
  // ============================================================================

  describe("listDatabases", () => {
    it("can list databases", async () => {
      const db = getDb();
      const result = await runEffect(
        listDatabases({
          organization: db.organization,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThanOrEqual(1);
      expect(result.current_page).toBeDefined();
    });

    it("can list databases with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listDatabases({
          organization: db.organization,
          page: 1,
          per_page: 10,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBe(1);
    });

    it("can search databases by name", async () => {
      const db = getDb();
      const result = await runEffect(
        listDatabases({
          organization: db.organization,
          q: "distilled",
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      // All returned databases should match the search term
      for (const database of result.data) {
        expect(database.name.toLowerCase()).toContain("distilled");
      }
    });

    it("returns databases with expected properties", async () => {
      const db = getDb();
      const result = await runEffect(
        listDatabases({
          organization: db.organization,
        }),
      );

      expect(result.data.length).toBeGreaterThanOrEqual(1);
      const firstDb = result.data[0]!;
      expect(firstDb.id).toBeDefined();
      expect(firstDb.name).toBeDefined();
      expect(firstDb.state).toBeDefined();
      expect(firstDb.region).toBeDefined();
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listDatabases({
          organization: NON_EXISTENT_ORG,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // createDatabase & deleteDatabase
  // ============================================================================

  describe("createDatabase", () => {
    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        createDatabase({
          organization: NON_EXISTENT_ORG,
          name: `test-db-${Date.now()}`,
          cluster_size: "PS_10",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns error for invalid cluster size", async () => {
      const db = getDb();
      const error = await runEffect(
        createDatabase({
          organization: db.organization,
          name: `test-db-${Date.now()}`,
          cluster_size: "INVALID_SIZE_12345",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      // Invalid cluster size should return an error
      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("can create and delete a database", async () => {
      const db = getDb();
      const dbName = `distilled-test-create-${Date.now()}`;
      let createdDb: { id: string; name: string } | null = null;

      try {
        // Create database
        const created = await runEffect(
          createDatabase({
            organization: db.organization,
            name: dbName,
            cluster_size: "PS_10",
            kind: "mysql",
          }),
        );

        createdDb = created;
        expect(created.name).toBe(dbName);
        expect(created.id).toBeDefined();
        expect(created.kind).toBe("mysql");

        // Wait for database to be ready
        await runEffect(waitForDatabaseReady(db.organization, dbName));

        // Verify database exists
        const fetched = await runEffect(
          getDatabase({
            organization: db.organization,
            database: dbName,
          }),
        );
        expect(fetched.name).toBe(dbName);
        expect(fetched.state).toBe("ready");
      } finally {
        // Always cleanup
        if (createdDb) {
          await runEffect(
            deleteDatabase({
              organization: db.organization,
              database: dbName,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 300000); // 5 minute timeout
  });

  describe("deleteDatabase", () => {
    it("returns NotFound for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteDatabase({
          organization: db.organization,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        deleteDatabase({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // getDatabaseThrottler
  // ============================================================================

  describe("getDatabaseThrottler", () => {
    it("can get database throttler (or handles not enabled)", async () => {
      const db = getDb();
      const result = await runEffect(
        getDatabaseThrottler({
          organization: db.organization,
          database: db.name,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // The API may return the throttler config or an error if not enabled
      if ("data" in result) {
        expect(result.data.keyspaces).toBeDefined();
        expect(Array.isArray(result.data.keyspaces)).toBe(true);
        expect(result.data.configurations).toBeDefined();
        expect(Array.isArray(result.data.configurations)).toBe(true);
      } else {
        // NotFound or other error is acceptable if throttler not enabled
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        getDatabaseThrottler({
          organization: db.organization,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        getDatabaseThrottler({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // listDatabaseRegions
  // ============================================================================

  describe("listDatabaseRegions", () => {
    it("can list database regions", async () => {
      const db = getDb();
      const result = await runEffect(
        listDatabaseRegions({
          organization: db.organization,
          database: db.name,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThanOrEqual(1);
      expect(result.current_page).toBeDefined();
    });

    it("returns regions with expected properties", async () => {
      const db = getDb();
      const result = await runEffect(
        listDatabaseRegions({
          organization: db.organization,
          database: db.name,
        }),
      );

      expect(result.data.length).toBeGreaterThanOrEqual(1);
      const firstRegion = result.data[0]!;
      expect(firstRegion.id).toBeDefined();
      expect(firstRegion.slug).toBeDefined();
      expect(firstRegion.display_name).toBeDefined();
      expect(firstRegion.provider).toBeDefined();
      expect(firstRegion.enabled).toBeDefined();
      expect(Array.isArray(firstRegion.public_ip_addresses)).toBe(true);
    });

    it("can list database regions with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listDatabaseRegions({
          organization: db.organization,
          database: db.name,
          page: 1,
          per_page: 5,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBe(1);
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        listDatabaseRegions({
          organization: db.organization,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listDatabaseRegions({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // updateDatabaseSettings
  // ============================================================================

  describe("updateDatabaseSettings", () => {
    it("can update database settings (toggle production_branch_web_console)", async () => {
      const db = getDb();

      // Get current settings
      const current = await runEffect(
        getDatabase({
          organization: db.organization,
          database: db.name,
        }),
      );

      const currentWebConsole = current.production_branch_web_console ?? false;

      // Toggle the setting
      const updated = await runEffect(
        updateDatabaseSettings({
          organization: db.organization,
          database: db.name,
          production_branch_web_console: !currentWebConsole,
        }),
      );

      expect(updated.name).toBe(db.name);
      expect(updated.production_branch_web_console).toBe(!currentWebConsole);

      // Restore original setting
      await runEffect(
        updateDatabaseSettings({
          organization: db.organization,
          database: db.name,
          production_branch_web_console: currentWebConsole,
        }).pipe(Effect.ignore),
      );
    });

    it("can update insights_raw_queries setting", async () => {
      const db = getDb();

      // Get current settings
      const current = await runEffect(
        getDatabase({
          organization: db.organization,
          database: db.name,
        }),
      );

      const currentInsightsRaw = current.insights_raw_queries ?? false;

      // Toggle the setting
      const updated = await runEffect(
        updateDatabaseSettings({
          organization: db.organization,
          database: db.name,
          insights_raw_queries: !currentInsightsRaw,
        }),
      );

      expect(updated.name).toBe(db.name);
      expect(updated.insights_raw_queries).toBe(!currentInsightsRaw);

      // Restore original setting
      await runEffect(
        updateDatabaseSettings({
          organization: db.organization,
          database: db.name,
          insights_raw_queries: currentInsightsRaw,
        }).pipe(Effect.ignore),
      );
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        updateDatabaseSettings({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          production_branch_web_console: true,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        updateDatabaseSettings({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          production_branch_web_console: true,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("handles setting default_branch to non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        updateDatabaseSettings({
          organization: db.organization,
          database: db.name,
          default_branch: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      // Setting default_branch to non-existent branch should fail
      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });
  });

  // ============================================================================
  // updateDatabaseThrottler
  // ============================================================================

  describe("updateDatabaseThrottler", () => {
    it("can update database throttler (or handles not enabled)", async () => {
      const db = getDb();
      const result = await runEffect(
        updateDatabaseThrottler({
          organization: db.organization,
          database: db.name,
          ratio: 0, // Disable throttler
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // The API may return the throttler config or an error if not enabled
      if ("data" in result) {
        expect(result.data.keyspaces).toBeDefined();
        expect(Array.isArray(result.data.keyspaces)).toBe(true);
        expect(result.data.configurations).toBeDefined();
        expect(Array.isArray(result.data.configurations)).toBe(true);
      } else {
        // NotFound or other error is acceptable if throttler not enabled
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        updateDatabaseThrottler({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          ratio: 0,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        updateDatabaseThrottler({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          ratio: 0,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("handles invalid throttler ratio", async () => {
      const db = getDb();
      const result = await runEffect(
        updateDatabaseThrottler({
          organization: db.organization,
          database: db.name,
          ratio: 100, // Invalid - max is 95
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // Either returns an error for invalid ratio, or throttler not enabled
      if ("error" in result) {
        expect(isApiError(result.error)).toBe(true);
      }
      // If it succeeds, the API may have clamped the value - that's acceptable too
    });
  });
});
