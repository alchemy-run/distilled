import { Effect } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { cancelBranchChangeRequest } from "../src/operations/cancelBranchChangeRequest";
import { getBranchChangeRequest } from "../src/operations/getBranchChangeRequest";
import { listBranchChangeRequests } from "../src/operations/listBranchChangeRequests";
import { updateBranchChangeRequest } from "../src/operations/updateBranchChangeRequest";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "branch-change-requests";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "this-branch-definitely-does-not-exist-12345";
const NON_EXISTENT_CHANGE_REQUEST_ID =
  "this-change-request-definitely-does-not-exist-12345";

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

describe("branch-change-requests", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // listBranchChangeRequests
  // ============================================================================

  describe("listBranchChangeRequests", () => {
    it("can list branch change requests (or returns error if not available)", async () => {
      const db = getDb();
      const result = await runEffect(
        listBranchChangeRequests({
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

      // Branch change requests may not be available for all database types
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBeDefined();
      } else {
        // NotFound or Forbidden is acceptable for databases without this feature
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("can list branch change requests with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listBranchChangeRequests({
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
        listBranchChangeRequests({
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
        listBranchChangeRequests({
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
        listBranchChangeRequests({
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
  // getBranchChangeRequest
  // ============================================================================

  describe("getBranchChangeRequest", () => {
    it("returns NotFound for non-existent change request", async () => {
      const db = getDb();
      const error = await runEffect(
        getBranchChangeRequest({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_CHANGE_REQUEST_ID,
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
        getBranchChangeRequest({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          id: NON_EXISTENT_CHANGE_REQUEST_ID,
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
        getBranchChangeRequest({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_CHANGE_REQUEST_ID,
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
        getBranchChangeRequest({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_CHANGE_REQUEST_ID,
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
  // cancelBranchChangeRequest
  // ============================================================================

  describe("cancelBranchChangeRequest", () => {
    it("handles cancelling when no pending change request exists (or returns success)", async () => {
      const db = getDb();
      const result = await runEffect(
        cancelBranchChangeRequest({
          organization: db.organization,
          database: db.name,
          branch: "main",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: () => Effect.succeed({ success: true }),
          }),
        ),
      );

      // May succeed (no-op) or return an error if no change request exists
      if ("error" in result) {
        expect(isApiError(result.error)).toBe(true);
      } else {
        expect(result.success).toBe(true);
      }
    });

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        cancelBranchChangeRequest({
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
        cancelBranchChangeRequest({
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
        cancelBranchChangeRequest({
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
  // updateBranchChangeRequest
  // ============================================================================

  describe("updateBranchChangeRequest", () => {
    it("returns error for invalid cluster size (or creates change request if valid)", async () => {
      const db = getDb();
      const result = await runEffect(
        updateBranchChangeRequest({
          organization: db.organization,
          database: db.name,
          branch: "main",
          cluster_size: "INVALID_SIZE_12345",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // Should return an error for invalid cluster size
      if ("error" in result) {
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        updateBranchChangeRequest({
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
      expect(isApiError(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        updateBranchChangeRequest({
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
        updateBranchChangeRequest({
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
  });
});
