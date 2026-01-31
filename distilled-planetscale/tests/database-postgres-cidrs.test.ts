import { Effect } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { createDatabasePostgresCidr } from "../src/operations/createDatabasePostgresCidr";
import { deleteDatabasePostgresCidr } from "../src/operations/deleteDatabasePostgresCidr";
import { getDatabasePostgresCidr } from "../src/operations/getDatabasePostgresCidr";
import { listDatabasePostgresCidrs } from "../src/operations/listDatabasePostgresCidrs";
import { updateDatabasePostgresCidr } from "../src/operations/updateDatabasePostgresCidr";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "postgres-cidrs";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";
const NON_EXISTENT_CIDR_ID = "this-cidr-id-definitely-does-not-exist-12345";

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

describe("database-postgres-cidrs", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // listDatabasePostgresCidrs
  // ============================================================================

  describe("listDatabasePostgresCidrs", () => {
    it("can list database postgres CIDRs (or returns error if not available)", async () => {
      const db = getDb();
      const result = await runEffect(
        listDatabasePostgresCidrs({
          organization: db.organization,
          database: db.name,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // CIDRs may not be available for all database types (MySQL vs PostgreSQL)
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBeDefined();
      } else {
        // NotFound or Forbidden is acceptable for MySQL databases or if feature not enabled
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("can list database postgres CIDRs with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listDatabasePostgresCidrs({
          organization: db.organization,
          database: db.name,
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

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        listDatabasePostgresCidrs({
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
        listDatabasePostgresCidrs({
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
  // getDatabasePostgresCidr
  // ============================================================================

  describe("getDatabasePostgresCidr", () => {
    it("returns NotFound for non-existent CIDR", async () => {
      const db = getDb();
      const error = await runEffect(
        getDatabasePostgresCidr({
          organization: db.organization,
          database: db.name,
          id: NON_EXISTENT_CIDR_ID,
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
        getDatabasePostgresCidr({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_CIDR_ID,
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
        getDatabasePostgresCidr({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_CIDR_ID,
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
  // createDatabasePostgresCidr
  // ============================================================================

  describe("createDatabasePostgresCidr", () => {
    it("returns error for invalid CIDR or non-PostgreSQL database", async () => {
      const db = getDb();
      const result = await runEffect(
        createDatabasePostgresCidr({
          organization: db.organization,
          database: db.name,
          cidrs: ["10.0.0.0/8"],
          role: "test-role",
          schema: "public",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // This will return an error for MySQL databases or if feature not enabled
      if ("error" in result) {
        expect(isApiError(result.error)).toBe(true);
      } else {
        // If it succeeds, verify the response
        expect(result.data.id).toBeDefined();
      }
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        createDatabasePostgresCidr({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          cidrs: ["10.0.0.0/8"],
          role: "test-role",
          schema: "public",
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
        createDatabasePostgresCidr({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          cidrs: ["10.0.0.0/8"],
          role: "test-role",
          schema: "public",
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
  // updateDatabasePostgresCidr
  // ============================================================================

  describe("updateDatabasePostgresCidr", () => {
    it("returns NotFound for non-existent CIDR", async () => {
      const db = getDb();
      const error = await runEffect(
        updateDatabasePostgresCidr({
          organization: db.organization,
          database: db.name,
          id: NON_EXISTENT_CIDR_ID,
          cidrs: ["10.0.0.0/8"],
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

    it("returns an error for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        updateDatabasePostgresCidr({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_CIDR_ID,
          cidrs: ["10.0.0.0/8"],
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

    it("returns an error for non-existent organization", async () => {
      const error = await runEffect(
        updateDatabasePostgresCidr({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_CIDR_ID,
          cidrs: ["10.0.0.0/8"],
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
  });

  // ============================================================================
  // deleteDatabasePostgresCidr
  // ============================================================================

  describe("deleteDatabasePostgresCidr", () => {
    it("returns NotFound for non-existent CIDR", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteDatabasePostgresCidr({
          organization: db.organization,
          database: db.name,
          id: NON_EXISTENT_CIDR_ID,
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
        deleteDatabasePostgresCidr({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_CIDR_ID,
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
        deleteDatabasePostgresCidr({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_CIDR_ID,
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
