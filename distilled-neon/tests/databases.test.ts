import { Effect, Schedule } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Forbidden, NotFound } from "../src/errors";
import { createProjectBranchDatabase } from "../src/operations/createProjectBranchDatabase";
import { deleteProjectBranchDatabase } from "../src/operations/deleteProjectBranchDatabase";
import { getProjectBranchDatabase } from "../src/operations/getProjectBranchDatabase";
import { listProjectBranchDatabases } from "../src/operations/listProjectBranchDatabases";
import { updateProjectBranchDatabase } from "../src/operations/updateProjectBranchDatabase";
import { listProjectOperations } from "../src/operations/listProjectOperations";
import { getTestProject, runEffect, setupTestProject, teardownTestProject, TestLayer } from "./setup";

const TEST_SUFFIX = "databases";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_PROJECT = "this-project-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "br-this-branch-definitely-does-not-exist-12345";
const NON_EXISTENT_DATABASE = "this-database-definitely-does-not-exist-12345";

/**
 * Helper to check if an error is an expected "not found" type error.
 * Neon API may return NotFound or Forbidden for non-existent resources.
 */
const isNotFoundOrForbidden = (error: unknown): boolean =>
  error instanceof NotFound || error instanceof Forbidden;

/**
 * Wait for all pending operations on a project to complete
 */
const waitForOperations = (projectId: string) =>
  Effect.gen(function* () {
    yield* Effect.retry(
      listProjectOperations({ project_id: projectId, limit: 10 }).pipe(
        Effect.flatMap((result) => {
          const pendingOps = result.operations.filter(
            (op) => op.status === "running" || op.status === "scheduling",
          );
          if (pendingOps.length > 0) {
            return Effect.fail({ _tag: "OperationsPending" as const });
          }
          return Effect.succeed(result);
        }),
      ),
      {
        schedule: Schedule.intersect(Schedule.recurs(60), Schedule.spaced("5 seconds")),
        while: (e) => typeof e === "object" && e !== null && "_tag" in e && e._tag === "OperationsPending",
      },
    );
  }).pipe(Effect.provide(TestLayer));

describe("databases", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestProject(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for project creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestProject(TEST_SUFFIX));
  });

  const getProj = () => getTestProject(TEST_SUFFIX);

  // ============================================================================
  // listProjectBranchDatabases
  // ============================================================================

  describe("listProjectBranchDatabases", () => {
    it("can list databases on the default branch", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectBranchDatabases({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
        }),
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result.databases)).toBe(true);
      // New project should have at least one database (neondb)
      expect(result.databases.length).toBeGreaterThanOrEqual(1);
    });

    it("returns databases with expected properties", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectBranchDatabases({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
        }),
      );

      expect(result.databases.length).toBeGreaterThan(0);
      const firstDb = result.databases[0]!;
      expect(firstDb.id).toBeDefined();
      expect(firstDb.name).toBeDefined();
      expect(firstDb.owner_name).toBeDefined();
      expect(firstDb.branch_id).toBe(proj.defaultBranchId);
      expect(firstDb.created_at).toBeDefined();
      expect(firstDb.updated_at).toBeDefined();
    });

    it("returns NotFound for non-existent project", async () => {
      const error = await runEffect(
        listProjectBranchDatabases({
          project_id: NON_EXISTENT_PROJECT,
          branch_id: NON_EXISTENT_BRANCH,
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

    it("returns NotFound for non-existent branch", async () => {
      const proj = getProj();
      const error = await runEffect(
        listProjectBranchDatabases({
          project_id: proj.id,
          branch_id: NON_EXISTENT_BRANCH,
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
  // getProjectBranchDatabase
  // ============================================================================

  describe("getProjectBranchDatabase", () => {
    it("can get the default database (neondb)", async () => {
      const proj = getProj();
      const result = await runEffect(
        getProjectBranchDatabase({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
          database_name: "neondb",
        }),
      );

      expect(result.database.name).toBe("neondb");
      expect(result.database.branch_id).toBe(proj.defaultBranchId);
      expect(result.database.owner_name).toBeDefined();
    });

    it("returns database with all expected properties", async () => {
      const proj = getProj();
      const result = await runEffect(
        getProjectBranchDatabase({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
          database_name: "neondb",
        }),
      );

      // Required properties
      expect(result.database.id).toBeDefined();
      expect(typeof result.database.id).toBe("number");
      expect(result.database.name).toBeDefined();
      expect(result.database.branch_id).toBeDefined();
      expect(result.database.owner_name).toBeDefined();
      expect(result.database.created_at).toBeDefined();
      expect(result.database.updated_at).toBeDefined();
    });

    it("returns NotFound for non-existent database", async () => {
      const proj = getProj();
      const error = await runEffect(
        getProjectBranchDatabase({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
          database_name: NON_EXISTENT_DATABASE,
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

    it("returns NotFound for non-existent branch", async () => {
      const proj = getProj();
      const error = await runEffect(
        getProjectBranchDatabase({
          project_id: proj.id,
          branch_id: NON_EXISTENT_BRANCH,
          database_name: "neondb",
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
  // createProjectBranchDatabase, updateProjectBranchDatabase & deleteProjectBranchDatabase
  // ============================================================================

  describe("createProjectBranchDatabase, updateProjectBranchDatabase & deleteProjectBranchDatabase", () => {
    it("can create, update, and delete a database", async () => {
      const proj = getProj();
      const databaseName = `testdb_${Date.now()}`;
      let createdDatabaseName: string | null = null;

      try {
        // Wait for any pending operations
        await Effect.runPromise(waitForOperations(proj.id));

        // Create database
        const created = await runEffect(
          createProjectBranchDatabase({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            database: {
              name: databaseName,
              owner_name: "neondb_owner",
            },
          }),
        );

        createdDatabaseName = created.database.name;
        expect(created.database.name).toBe(databaseName);
        expect(created.database.owner_name).toBe("neondb_owner");
        expect(created.database.branch_id).toBe(proj.defaultBranchId);

        // Wait for database creation to complete
        await Effect.runPromise(waitForOperations(proj.id));

        // Verify database exists
        const fetched = await runEffect(
          getProjectBranchDatabase({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            database_name: createdDatabaseName,
          }),
        );
        expect(fetched.database.name).toBe(createdDatabaseName);

        // Update database owner
        const updated = await runEffect(
          updateProjectBranchDatabase({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            database_name: createdDatabaseName,
            database: {
              owner_name: "neondb_owner",
            },
          }),
        );
        expect(updated.database.owner_name).toBe("neondb_owner");

        // Wait for update to complete
        await Effect.runPromise(waitForOperations(proj.id));
      } finally {
        // Always cleanup
        if (createdDatabaseName) {
          await Effect.runPromise(waitForOperations(proj.id));
          await runEffect(
            deleteProjectBranchDatabase({
              project_id: proj.id,
              branch_id: proj.defaultBranchId,
              database_name: createdDatabaseName,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 180000); // 3 minute timeout

    it("can create multiple databases", async () => {
      const proj = getProj();
      const databaseName1 = `testdb1_${Date.now()}`;
      const databaseName2 = `testdb2_${Date.now()}`;
      const createdDatabases: string[] = [];

      try {
        // Wait for any pending operations
        await Effect.runPromise(waitForOperations(proj.id));

        // Create first database
        const created1 = await runEffect(
          createProjectBranchDatabase({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            database: {
              name: databaseName1,
              owner_name: "neondb_owner",
            },
          }),
        );
        createdDatabases.push(created1.database.name);

        // Wait for first database creation
        await Effect.runPromise(waitForOperations(proj.id));

        // Create second database
        const created2 = await runEffect(
          createProjectBranchDatabase({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            database: {
              name: databaseName2,
              owner_name: "neondb_owner",
            },
          }),
        );
        createdDatabases.push(created2.database.name);

        // Wait for second database creation
        await Effect.runPromise(waitForOperations(proj.id));

        // List databases and verify both exist
        const result = await runEffect(
          listProjectBranchDatabases({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
          }),
        );

        const dbNames = result.databases.map((db) => db.name);
        expect(dbNames).toContain(databaseName1);
        expect(dbNames).toContain(databaseName2);
      } finally {
        // Cleanup all created databases
        for (const dbName of createdDatabases) {
          await Effect.runPromise(waitForOperations(proj.id));
          await runEffect(
            deleteProjectBranchDatabase({
              project_id: proj.id,
              branch_id: proj.defaultBranchId,
              database_name: dbName,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 180000);

    it("returns NotFound when updating non-existent database", async () => {
      const proj = getProj();
      const error = await runEffect(
        updateProjectBranchDatabase({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
          database_name: NON_EXISTENT_DATABASE,
          database: {
            owner_name: "neondb_owner",
          },
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

    it("handles deleting non-existent database gracefully", async () => {
      const proj = getProj();
      // Note: Neon API may return success for deleting non-existent databases (idempotent)
      const result = await runEffect(
        deleteProjectBranchDatabase({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
          database_name: NON_EXISTENT_DATABASE,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ success: true, data }),
          }),
        ),
      );

      // Either NotFound/Forbidden error or successful deletion (idempotent)
      if ("error" in result) {
        expect(isNotFoundOrForbidden(result.error)).toBe(true);
      } else {
        // Success is acceptable - idempotent delete
        expect(result.success).toBe(true);
      }
    });
  });
});
