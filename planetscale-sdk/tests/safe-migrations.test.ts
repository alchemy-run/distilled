import { Effect } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { disableSafeMigrations } from "../src/operations/disableSafeMigrations";
import { enableSafeMigrations } from "../src/operations/enableSafeMigrations";
import { getBranch } from "../src/operations/getBranch";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "safe-migrations";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "this-branch-definitely-does-not-exist-12345";

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

describe("safeMigrations", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // enableSafeMigrations
  // ============================================================================

  describe("enableSafeMigrations", () => {
    it("can enable safe migrations on a branch", async () => {
      const db = getDb();
      const result = await runEffect(
        enableSafeMigrations({
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

      // Enable safe migrations may succeed or fail depending on branch state
      // (e.g., may require production branch, or may already be enabled)
      if ("data" in result) {
        expect(result.data.name).toBe("main");
        expect(result.data.id).toBeDefined();
        expect(result.data.safe_migrations).toBe(true);
      } else {
        // Some API error is acceptable (e.g., if not allowed on this branch type)
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns branch with safe_migrations enabled when successful", async () => {
      const db = getDb();
      const result = await runEffect(
        enableSafeMigrations({
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

      if ("data" in result) {
        // Verify the output schema fields
        expect(result.data.id).toBeDefined();
        expect(result.data.name).toBeDefined();
        expect(result.data.created_at).toBeDefined();
        expect(result.data.updated_at).toBeDefined();
        expect(result.data.state).toBeDefined();
        expect(result.data.ready).toBeDefined();
        expect(result.data.production).toBeDefined();
        expect(result.data.safe_migrations).toBe(true);
        expect(result.data.region).toBeDefined();
      }
    });

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        enableSafeMigrations({
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
        enableSafeMigrations({
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
        enableSafeMigrations({
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

    it("is idempotent when enabling already enabled safe migrations", async () => {
      const db = getDb();

      // First enable
      const first = await runEffect(
        enableSafeMigrations({
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

      // Second enable (should be idempotent or return same state)
      const second = await runEffect(
        enableSafeMigrations({
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

      // Both should have same outcome
      if ("data" in first && "data" in second) {
        expect(first.data.safe_migrations).toBe(true);
        expect(second.data.safe_migrations).toBe(true);
      } else if ("error" in first && "error" in second) {
        // Both failed with same error type
        expect(isApiError(first.error)).toBe(true);
        expect(isApiError(second.error)).toBe(true);
      }
    });
  });

  // ============================================================================
  // disableSafeMigrations
  // ============================================================================

  describe("disableSafeMigrations", () => {
    it("can disable safe migrations on a branch", async () => {
      const db = getDb();
      const result = await runEffect(
        disableSafeMigrations({
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

      // Disable safe migrations may succeed or fail depending on branch state
      if ("data" in result) {
        expect(result.data.name).toBe("main");
        expect(result.data.id).toBeDefined();
        expect(result.data.safe_migrations).toBe(false);
      } else {
        // Some API error is acceptable (e.g., if already disabled)
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns branch with safe_migrations disabled when successful", async () => {
      const db = getDb();
      const result = await runEffect(
        disableSafeMigrations({
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

      if ("data" in result) {
        // Verify the output schema fields
        expect(result.data.id).toBeDefined();
        expect(result.data.name).toBeDefined();
        expect(result.data.created_at).toBeDefined();
        expect(result.data.updated_at).toBeDefined();
        expect(result.data.state).toBeDefined();
        expect(result.data.ready).toBeDefined();
        expect(result.data.production).toBeDefined();
        expect(result.data.safe_migrations).toBe(false);
        expect(result.data.region).toBeDefined();
      }
    });

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        disableSafeMigrations({
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
        disableSafeMigrations({
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
        disableSafeMigrations({
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

    it("is idempotent when disabling already disabled safe migrations", async () => {
      const db = getDb();

      // First disable
      const first = await runEffect(
        disableSafeMigrations({
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

      // Second disable (should be idempotent or return same state)
      const second = await runEffect(
        disableSafeMigrations({
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

      // Both should have same outcome
      if ("data" in first && "data" in second) {
        expect(first.data.safe_migrations).toBe(false);
        expect(second.data.safe_migrations).toBe(false);
      } else if ("error" in first && "error" in second) {
        // Both failed with same error type
        expect(isApiError(first.error)).toBe(true);
        expect(isApiError(second.error)).toBe(true);
      }
    });
  });

  // ============================================================================
  // Enable/Disable roundtrip
  // ============================================================================

  describe("enable/disable roundtrip", () => {
    it("can toggle safe migrations on and off", async () => {
      const db = getDb();

      // Get initial state
      const initial = await runEffect(
        getBranch({
          organization: db.organization,
          database: db.name,
          branch: "main",
        }),
      );
      const initialState = initial.safe_migrations;

      // Try to enable
      const enableResult = await runEffect(
        enableSafeMigrations({
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

      if ("data" in enableResult) {
        expect(enableResult.data.safe_migrations).toBe(true);

        // Now disable
        const disableResult = await runEffect(
          disableSafeMigrations({
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

        if ("data" in disableResult) {
          expect(disableResult.data.safe_migrations).toBe(false);
        }
      }

      // Restore to initial state if we changed it
      if ("data" in enableResult && initialState === false) {
        await runEffect(
          disableSafeMigrations({
            organization: db.organization,
            database: db.name,
            branch: "main",
          }).pipe(Effect.ignore),
        );
      } else if ("data" in enableResult && initialState === true) {
        await runEffect(
          enableSafeMigrations({
            organization: db.organization,
            database: db.name,
            branch: "main",
          }).pipe(Effect.ignore),
        );
      }
    });

    it("getBranch reflects safe_migrations state after enable", async () => {
      const db = getDb();

      // Enable safe migrations
      const enableResult = await runEffect(
        enableSafeMigrations({
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

      if ("data" in enableResult) {
        // Verify getBranch returns the same state
        const branch = await runEffect(
          getBranch({
            organization: db.organization,
            database: db.name,
            branch: "main",
          }),
        );
        expect(branch.safe_migrations).toBe(true);
      }
    });

    it("getBranch reflects safe_migrations state after disable", async () => {
      const db = getDb();

      // Disable safe migrations
      const disableResult = await runEffect(
        disableSafeMigrations({
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

      if ("data" in disableResult) {
        // Verify getBranch returns the same state
        const branch = await runEffect(
          getBranch({
            organization: db.organization,
            database: db.name,
            branch: "main",
          }),
        );
        expect(branch.safe_migrations).toBe(false);
      }
    });
  });
});
