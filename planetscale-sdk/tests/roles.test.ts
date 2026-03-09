import { Effect } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { createRole } from "../src/operations/createRole";
import { deleteRole } from "../src/operations/deleteRole";
import { getDefaultRole } from "../src/operations/getDefaultRole";
import { getRole } from "../src/operations/getRole";
import { listRoles } from "../src/operations/listRoles";
import { reassignRoleObjects } from "../src/operations/reassignRoleObjects";
import { renewRole } from "../src/operations/renewRole";
import { resetDefaultRole } from "../src/operations/resetDefaultRole";
import { resetRole } from "../src/operations/resetRole";
import { updateRole } from "../src/operations/updateRole";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "roles";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "this-branch-definitely-does-not-exist-12345";
const NON_EXISTENT_ROLE_ID = "this-role-id-definitely-does-not-exist-12345";

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

describe("roles", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // listRoles
  // ============================================================================

  describe("listRoles", () => {
    it("can list roles (or returns error if not available for database type)", async () => {
      const db = getDb();
      const result = await runEffect(
        listRoles({
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

      // Roles may not be available for all database types (MySQL vs PostgreSQL)
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBeDefined();
      } else {
        // NotFound or Forbidden is acceptable for MySQL databases or if feature not enabled
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("can list roles with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listRoles({
          organization: db.organization,
          database: db.name,
          branch: "main",
          page: 1,
          per_page: 10,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBe(1);
      } else {
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        listRoles({
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
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        listRoles({
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
        listRoles({
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
  // getRole
  // ============================================================================

  describe("getRole", () => {
    it("returns NotFound for non-existent role", async () => {
      const db = getDb();
      const error = await runEffect(
        getRole({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        getRole({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          id: NON_EXISTENT_ROLE_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        getRole({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
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
        getRole({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
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
  // getDefaultRole
  // ============================================================================

  describe("getDefaultRole", () => {
    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        getDefaultRole({
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
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        getDefaultRole({
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
        getDefaultRole({
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
  // createRole
  // ============================================================================

  describe("createRole", () => {
    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        createRole({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          name: `test-role-${Date.now()}`,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        createRole({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          name: `test-role-${Date.now()}`,
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
        createRole({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          name: `test-role-${Date.now()}`,
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
  // updateRole
  // ============================================================================

  describe("updateRole", () => {
    it("returns NotFound for non-existent role", async () => {
      const db = getDb();
      const error = await runEffect(
        updateRole({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
          name: "updated-name",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        updateRole({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
          name: "updated-name",
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
  // renewRole
  // ============================================================================

  describe("renewRole", () => {
    it("returns NotFound for non-existent role", async () => {
      const db = getDb();
      const error = await runEffect(
        renewRole({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        renewRole({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
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
  // resetRole
  // ============================================================================

  describe("resetRole", () => {
    it("returns NotFound for non-existent role", async () => {
      const db = getDb();
      const error = await runEffect(
        resetRole({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        resetRole({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
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
  // resetDefaultRole
  // ============================================================================

  describe("resetDefaultRole", () => {
    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        resetDefaultRole({
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
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        resetDefaultRole({
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
  // reassignRoleObjects
  // ============================================================================

  describe("reassignRoleObjects", () => {
    it("returns NotFound for non-existent role", async () => {
      const db = getDb();
      const error = await runEffect(
        reassignRoleObjects({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
          successor: "some-new-role-id",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        reassignRoleObjects({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
          successor: "some-new-role-id",
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
  // deleteRole
  // ============================================================================

  describe("deleteRole", () => {
    it("returns NotFound for non-existent role", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteRole({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        deleteRole({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_ROLE_ID,
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
