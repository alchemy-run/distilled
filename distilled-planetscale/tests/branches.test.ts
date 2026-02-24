import { Effect, Schedule } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { createBranch } from "../src/operations/createBranch";
import { deleteBranch } from "../src/operations/deleteBranch";
import { demoteBranch } from "../src/operations/demoteBranch";
import { getBranch } from "../src/operations/getBranch";
import { getBranchSchema } from "../src/operations/getBranchSchema";
import { lintBranchSchema } from "../src/operations/lintBranchSchema";
import { listBranches } from "../src/operations/listBranches";
import { promoteBranch } from "../src/operations/promoteBranch";
import { updateBranchClusterConfig } from "../src/operations/updateBranchClusterConfig";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "branches";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "this-branch-definitely-does-not-exist-12345";

/**
 * Wait for a branch to reach the "ready" state.
 * Polls every 5 seconds for up to 10 minutes.
 */
const waitForBranchReady = (
  organization: string,
  database: string,
  branch: string,
) =>
  Effect.retry(
    getBranch({ organization, database, branch }).pipe(
      Effect.tap((b) =>
        Effect.sync(() =>
          process.stderr.write(
            `[waitForBranchReady] branch="${branch}" ready=${b.ready}\n`,
          ),
        ),
      ),
      Effect.flatMap((b) =>
        b.ready
          ? Effect.succeed(b)
          : Effect.fail({ _tag: "NotReady" as const, ready: b.ready }),
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

describe("branches", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // listBranches
  // ============================================================================

  describe("listBranches", () => {
    it("can list branches", async () => {
      const db = getDb();
      const result = await runEffect(
        listBranches({
          organization: db.organization,
          database: db.name,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThanOrEqual(1);
      expect(result.current_page).toBeDefined();
    });

    it("can list branches with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listBranches({
          organization: db.organization,
          database: db.name,
          page: 1,
          per_page: 10,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBe(1);
    });

    it("can filter branches by production status", async () => {
      const db = getDb();
      const result = await runEffect(
        listBranches({
          organization: db.organization,
          database: db.name,
          production: true,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      // All returned branches should be production
      for (const branch of result.data) {
        expect(branch.production).toBe(true);
      }
    });

    it("can search branches by name", async () => {
      const db = getDb();
      const result = await runEffect(
        listBranches({
          organization: db.organization,
          database: db.name,
          q: "main",
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        listBranches({
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
        listBranches({
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
  // getBranch
  // ============================================================================

  describe("getBranch", () => {
    it("can get a branch", async () => {
      const db = getDb();
      const result = await runEffect(
        getBranch({
          organization: db.organization,
          database: db.name,
          branch: "main",
        }),
      );

      expect(result.name).toBe("main");
      expect(result.id).toBeDefined();
      expect(result.created_at).toBeDefined();
      expect(result.state).toBeDefined();
    });

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        getBranch({
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
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        getBranch({
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
        getBranch({
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
  // getBranchSchema
  // ============================================================================

  describe("getBranchSchema", () => {
    it("can get branch schema (or handles empty schema)", async () => {
      const db = getDb();
      const result = await runEffect(
        getBranchSchema({
          organization: db.organization,
          database: db.name,
          branch: "main",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // The API may return NotFound for branches without tables
      // or return an empty schema array
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
      } else {
        // NotFound is acceptable for empty databases
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        getBranchSchema({
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
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        getBranchSchema({
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
        getBranchSchema({
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
  // lintBranchSchema
  // ============================================================================

  describe("lintBranchSchema", () => {
    it("can lint branch schema (or handles empty schema)", async () => {
      const db = getDb();
      const result = await runEffect(
        lintBranchSchema({
          organization: db.organization,
          database: db.name,
          branch: "main",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // The API may return NotFound for branches without tables
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBeDefined();
      } else {
        // NotFound is acceptable for empty databases
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        lintBranchSchema({
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
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        lintBranchSchema({
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
        lintBranchSchema({
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
  // createBranch
  // ============================================================================

  describe("createBranch", () => {
    it("returns NotFound or Forbidden for non-existent parent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        createBranch({
          organization: db.organization,
          database: db.name,
          name: `test-branch-${Date.now()}`,
          parent_branch: NON_EXISTENT_BRANCH,
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
        createBranch({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          name: `test-branch-${Date.now()}`,
          parent_branch: "main",
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
        createBranch({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          name: `test-branch-${Date.now()}`,
          parent_branch: "main",
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

    // This test creates an actual branch - it's slow due to provisioning time
    it("can create and delete a branch", { timeout: 120000 }, async () => {
      const db = getDb();
      const branchName = `test-${Date.now()}`;

      // Create branch
      const created = await runEffect(
        createBranch({
          organization: db.organization,
          database: db.name,
          name: branchName,
          parent_branch: "main",
        }),
      );
      expect(created.name).toBe(branchName);
      expect(created.id).toBeDefined();
      expect(created.parent_branch).toBe("main");

      // Wait for ready
      await runEffect(waitForBranchReady(db.organization, db.name, branchName));

      // Delete branch
      await runEffect(
        deleteBranch({
          organization: db.organization,
          database: db.name,
          branch: branchName,
        }),
      );

      // Verify deleted
      const error = await runEffect(
        getBranch({
          organization: db.organization,
          database: db.name,
          branch: branchName,
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
  });

  // ============================================================================
  // deleteBranch
  // ============================================================================

  describe("deleteBranch", () => {
    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteBranch({
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
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteBranch({
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
        deleteBranch({
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

    it("returns error when trying to delete production branch (main)", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteBranch({
          organization: db.organization,
          database: db.name,
          branch: "main",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      // Deleting production branch should fail with some error
      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });
  });

  // ============================================================================
  // promoteBranch
  // ============================================================================

  describe("promoteBranch", () => {
    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        promoteBranch({
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
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        promoteBranch({
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
        promoteBranch({
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

    it("handles promoting already production branch (idempotent or error)", async () => {
      const db = getDb();
      const result = await runEffect(
        promoteBranch({
          organization: db.organization,
          database: db.name,
          branch: "main",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // Promoting an already production branch may:
      // 1. Be idempotent (succeed and return the branch)
      // 2. Return an error
      if ("data" in result) {
        expect(result.data.production).toBe(true);
        expect(result.data.name).toBe("main");
      } else {
        expect(isApiError(result.error)).toBe(true);
      }
    });
  });

  // ============================================================================
  // demoteBranch
  // ============================================================================

  describe("demoteBranch", () => {
    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        demoteBranch({
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
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        demoteBranch({
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
        demoteBranch({
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

    it("returns error when trying to demote the only production branch", async () => {
      const db = getDb();
      const error = await runEffect(
        demoteBranch({
          organization: db.organization,
          database: db.name,
          branch: "main",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      // Demoting the only production branch should fail
      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });
  });

  // ============================================================================
  // updateBranchClusterConfig
  // ============================================================================

  describe("updateBranchClusterConfig", () => {
    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        updateBranchClusterConfig({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          cluster_size: "PS_10",
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

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        updateBranchClusterConfig({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
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

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        updateBranchClusterConfig({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
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
        updateBranchClusterConfig({
          organization: db.organization,
          database: db.name,
          branch: "main",
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
  });
});
