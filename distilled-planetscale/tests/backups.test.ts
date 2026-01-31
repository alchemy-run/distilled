import { Effect, Schedule } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Forbidden, NotFound } from "../src/errors";
import { createBackup } from "../src/operations/createBackup";
import { deleteBackup } from "../src/operations/deleteBackup";
import { getBackup } from "../src/operations/getBackup";
import { listBackups } from "../src/operations/listBackups";
import { updateBackup } from "../src/operations/updateBackup";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "backups";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "this-branch-definitely-does-not-exist-12345";
const NON_EXISTENT_BACKUP_ID = "00000000-0000-0000-0000-000000000000";

/**
 * Wait for a backup to reach a terminal state (success, failed, canceled).
 * Polls every 5 seconds for up to 10 minutes.
 */
const waitForBackupComplete = (
  organization: string,
  database: string,
  branch: string,
  backupId: string,
) =>
  Effect.retry(
    getBackup({ organization, database, branch, id: backupId }).pipe(
      Effect.tap((b) =>
        Effect.sync(() =>
          process.stderr.write(
            `[${TEST_SUFFIX}] waiting for backup: state=${b.state}\n`,
          ),
        ),
      ),
      Effect.flatMap((b) =>
        b.state === "success" || b.state === "failed" || b.state === "canceled"
          ? Effect.succeed(b)
          : Effect.fail({ _tag: "NotComplete" as const, state: b.state }),
      ),
    ),
    {
      schedule: Schedule.intersect(
        Schedule.recurs(120),
        Schedule.spaced("5 seconds"),
      ),
      while: (e) => "_tag" in e && e._tag === "NotComplete",
    },
  );

/**
 * Helper to check if an error is an expected "not found" type error.
 * PlanetScale API may return NotFound or Forbidden for non-existent resources.
 */
const isNotFoundOrForbidden = (error: unknown): boolean =>
  error instanceof NotFound || error instanceof Forbidden;

describe("backups", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // listBackups
  // ============================================================================

  describe("listBackups", () => {
    it("can list backups (may be empty for new database)", async () => {
      const db = getDb();
      const result = await runEffect(
        listBackups({
          organization: db.organization,
          database: db.name,
          branch: "main",
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBeDefined();
    });

    it("can list backups with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listBackups({
          organization: db.organization,
          database: db.name,
          branch: "main",
          page: 1,
          per_page: 10,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBe(1);
    });

    it("can filter backups by state", async () => {
      const db = getDb();
      const result = await runEffect(
        listBackups({
          organization: db.organization,
          database: db.name,
          branch: "main",
          state: "success",
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      // All returned backups should be in success state
      for (const backup of result.data) {
        expect(backup.state).toBe("success");
      }
    });

    it("can include all backups including deleted ones", async () => {
      const db = getDb();
      const result = await runEffect(
        listBackups({
          organization: db.organization,
          database: db.name,
          branch: "main",
          all: true,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBeDefined();
    });

    it("returns NotFound or Forbidden for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        listBackups({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
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

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        listBackups({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
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
        listBackups({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
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
  // getBackup
  // ============================================================================

  describe("getBackup", () => {
    it("returns NotFound for non-existent backup", async () => {
      const db = getDb();
      const error = await runEffect(
        getBackup({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_BACKUP_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        getBackup({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          id: NON_EXISTENT_BACKUP_ID,
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

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        getBackup({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_BACKUP_ID,
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
        getBackup({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_BACKUP_ID,
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
  // createBackup
  // ============================================================================

  describe("createBackup", () => {
    it("returns NotFound or Forbidden for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        createBackup({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          name: `test-backup-${Date.now()}`,
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

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        createBackup({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          name: `test-backup-${Date.now()}`,
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
        createBackup({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          name: `test-backup-${Date.now()}`,
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
  // Backup Lifecycle Tests (create, get, delete)
  // These tests must run sequentially since only one manual backup can run at a time
  // ============================================================================

  describe("backup lifecycle", () => {
    it("can create, get, and delete a backup", async () => {
      const db = getDb();
      const backupName = `test-backup-${Date.now()}`;
      let createdBackup: { id: string } | null = null;

      try {
        // Create backup with custom retention
        const created = await runEffect(
          createBackup({
            organization: db.organization,
            database: db.name,
            branch: "main",
            name: backupName,
            retention_unit: "day",
            retention_value: 2,
          }),
        );

        createdBackup = created;
        expect(created.id).toBeDefined();
        expect(created.name).toBe(backupName);
        expect(created.state).toBeDefined();
        expect(["pending", "running", "success"]).toContain(created.state);

        // Wait for backup to complete
        const completed = await runEffect(
          waitForBackupComplete(db.organization, db.name, "main", created.id),
        );
        expect(completed.state).toBe("success");

        // Verify we can get the backup
        const fetched = await runEffect(
          getBackup({
            organization: db.organization,
            database: db.name,
            branch: "main",
            id: created.id,
          }),
        );
        expect(fetched.id).toBe(created.id);
        expect(fetched.name).toBe(backupName);

        // Delete backup
        await runEffect(
          deleteBackup({
            organization: db.organization,
            database: db.name,
            branch: "main",
            id: created.id,
          }),
        );

        // Verify backup is deleted
        const deletedError = await runEffect(
          getBackup({
            organization: db.organization,
            database: db.name,
            branch: "main",
            id: created.id,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed(e),
              onSuccess: () => Effect.succeed(null),
            }),
          ),
        );

        expect(deletedError).not.toBeNull();
        expect((deletedError as { _tag: string })._tag).toBe("NotFound");

        // Mark as cleaned up so finally doesn't try to delete again
        createdBackup = null;
      } finally {
        // Cleanup in case test failed before deletion
        if (createdBackup) {
          await runEffect(
            deleteBackup({
              organization: db.organization,
              database: db.name,
              branch: "main",
              id: createdBackup.id,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 600000); // 10 minute timeout for backup creation

    it("can update backup protection status", async () => {
      const db = getDb();
      const backupName = `test-protect-${Date.now()}`;

      try {
        // Create backup
        const created = await runEffect(
          createBackup({
            organization: db.organization,
            database: db.name,
            branch: "main",
            name: backupName,
            retention_unit: "hour",
            retention_value: 1,
          }),
        );

        // Wait for backup to complete
        await runEffect(
          waitForBackupComplete(db.organization, db.name, "main", created.id),
        );

        // Only test update if backup is not already protected
        if (!created.protected) {
          // Update backup to be protected
          const updated = await runEffect(
            updateBackup({
              organization: db.organization,
              database: db.name,
              branch: "main",
              id: created.id,
              protected: true,
            }),
          );

          expect(updated.id).toBe(created.id);
          expect(updated.protected).toBe(true);
        }

        // Note: Some backups may not be unprotectable via API, so we just verify
        // that the update operation works and the protected field changes
      } finally {
        // The test database will be deleted anyway, which will clean up the backup
        // Don't try to delete a protected backup as it will fail
      }
    }, 600000); // 10 minute timeout
  });

  // ============================================================================
  // deleteBackup
  // ============================================================================

  describe("deleteBackup", () => {
    it("returns NotFound for non-existent backup", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteBackup({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_BACKUP_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteBackup({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          id: NON_EXISTENT_BACKUP_ID,
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

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteBackup({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_BACKUP_ID,
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
        deleteBackup({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_BACKUP_ID,
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
  // updateBackup
  // ============================================================================

  describe("updateBackup", () => {
    it("returns NotFound for non-existent backup", async () => {
      const db = getDb();
      const error = await runEffect(
        updateBackup({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_BACKUP_ID,
          protected: true,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        updateBackup({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          id: NON_EXISTENT_BACKUP_ID,
          protected: true,
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

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        updateBackup({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_BACKUP_ID,
          protected: true,
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
        updateBackup({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_BACKUP_ID,
          protected: true,
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
});
