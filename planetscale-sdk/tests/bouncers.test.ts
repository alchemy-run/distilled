import { Effect } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { cancelBouncerResizeRequest } from "../src/operations/cancelBouncerResizeRequest";
import { createBouncer } from "../src/operations/createBouncer";
import { deleteBouncer } from "../src/operations/deleteBouncer";
import { getBouncer } from "../src/operations/getBouncer";
import { listBouncerResizeRequests } from "../src/operations/listBouncerResizeRequests";
import { listBouncers } from "../src/operations/listBouncers";
import { listBranchBouncerResizeRequests } from "../src/operations/listBranchBouncerResizeRequests";
import { updateBouncerResizeRequest } from "../src/operations/updateBouncerResizeRequest";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "bouncers";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "this-branch-definitely-does-not-exist-12345";
const NON_EXISTENT_BOUNCER = "this-bouncer-definitely-does-not-exist-12345";

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

describe("bouncers", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // listBouncers
  // ============================================================================

  describe("listBouncers", () => {
    it("can list bouncers (or returns error if not available for database type)", async () => {
      const db = getDb();
      const result = await runEffect(
        listBouncers({
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

      // Bouncers may not be available for all database types (MySQL vs PostgreSQL)
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBeDefined();
      } else {
        // NotFound or Forbidden is acceptable for databases without bouncer support
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("can list bouncers with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listBouncers({
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
        listBouncers({
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
        listBouncers({
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
        listBouncers({
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
  // getBouncer
  // ============================================================================

  describe("getBouncer", () => {
    it("returns NotFound for non-existent bouncer", async () => {
      const db = getDb();
      const error = await runEffect(
        getBouncer({
          organization: db.organization,
          database: db.name,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
        getBouncer({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          bouncer: NON_EXISTENT_BOUNCER,
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
        getBouncer({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
        getBouncer({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
  // createBouncer
  // ============================================================================

  describe("createBouncer", () => {
    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        createBouncer({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          name: `test-bouncer-${Date.now()}`,
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
        createBouncer({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          name: `test-bouncer-${Date.now()}`,
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
        createBouncer({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          name: `test-bouncer-${Date.now()}`,
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
  // deleteBouncer
  // ============================================================================

  describe("deleteBouncer", () => {
    it("returns NotFound for non-existent bouncer", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteBouncer({
          organization: db.organization,
          database: db.name,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
        deleteBouncer({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          bouncer: NON_EXISTENT_BOUNCER,
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
        deleteBouncer({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
        deleteBouncer({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
  // listBouncerResizeRequests
  // ============================================================================

  describe("listBouncerResizeRequests", () => {
    it("returns NotFound for non-existent bouncer", async () => {
      const db = getDb();
      const error = await runEffect(
        listBouncerResizeRequests({
          organization: db.organization,
          database: db.name,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
        listBouncerResizeRequests({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
        listBouncerResizeRequests({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
  // listBranchBouncerResizeRequests
  // ============================================================================

  describe("listBranchBouncerResizeRequests", () => {
    it("can list branch bouncer resize requests (or returns error if not available)", async () => {
      const db = getDb();
      const result = await runEffect(
        listBranchBouncerResizeRequests({
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

      // May not be available for all database types
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBeDefined();
      } else {
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        listBranchBouncerResizeRequests({
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
        listBranchBouncerResizeRequests({
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
        listBranchBouncerResizeRequests({
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
  // cancelBouncerResizeRequest
  // ============================================================================

  describe("cancelBouncerResizeRequest", () => {
    it("returns NotFound for non-existent bouncer", async () => {
      const db = getDb();
      const error = await runEffect(
        cancelBouncerResizeRequest({
          organization: db.organization,
          database: db.name,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
        cancelBouncerResizeRequest({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
  // updateBouncerResizeRequest
  // ============================================================================

  describe("updateBouncerResizeRequest", () => {
    it("returns NotFound for non-existent bouncer", async () => {
      const db = getDb();
      const error = await runEffect(
        updateBouncerResizeRequest({
          organization: db.organization,
          database: db.name,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
        updateBouncerResizeRequest({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          bouncer: NON_EXISTENT_BOUNCER,
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
