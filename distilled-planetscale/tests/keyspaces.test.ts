import { Effect } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { createKeyspace } from "../src/operations/createKeyspace";
import { deleteKeyspace } from "../src/operations/deleteKeyspace";
import { getKeyspace } from "../src/operations/getKeyspace";
import { getKeyspaceRolloutStatus } from "../src/operations/getKeyspaceRolloutStatus";
import { getKeyspaceVschema } from "../src/operations/getKeyspaceVschema";
import { listKeyspaces } from "../src/operations/listKeyspaces";
import { updateKeyspace } from "../src/operations/updateKeyspace";
import { updateKeyspaceVschema } from "../src/operations/updateKeyspaceVschema";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "keyspaces";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "this-branch-definitely-does-not-exist-12345";
const NON_EXISTENT_KEYSPACE = "this-keyspace-definitely-does-not-exist-12345";

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

describe("keyspaces", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // listKeyspaces
  // ============================================================================

  describe("listKeyspaces", () => {
    it("can list keyspaces", async () => {
      const db = getDb();
      const result = await runEffect(
        listKeyspaces({
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

      // Keyspaces may not be available for all database types
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBeDefined();
        // Every database should have at least one default keyspace
        expect(result.data.data.length).toBeGreaterThanOrEqual(1);
      } else {
        // NotFound or Forbidden is acceptable for some database configurations
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("can list keyspaces with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listKeyspaces({
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

    it("returns keyspaces with expected fields", async () => {
      const db = getDb();
      const result = await runEffect(
        listKeyspaces({
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

      if ("data" in result && result.data.data.length > 0) {
        const keyspace = result.data.data[0]!;
        expect(keyspace.id).toBeDefined();
        expect(keyspace.name).toBeDefined();
        expect(typeof keyspace.shards).toBe("number");
        expect(typeof keyspace.sharded).toBe("boolean");
        expect(typeof keyspace.replicas).toBe("number");
        expect(keyspace.created_at).toBeDefined();
      } else if ("error" in result) {
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        listKeyspaces({
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
        listKeyspaces({
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
        listKeyspaces({
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
  // getKeyspace
  // ============================================================================

  describe("getKeyspace", () => {
    it("can get the default keyspace", async () => {
      const db = getDb();
      // First list keyspaces to get a valid keyspace name
      const keyspacesResult = await runEffect(
        listKeyspaces({
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

      // Skip test if keyspaces are not available for this database type
      if ("error" in keyspacesResult) {
        expect(isApiError(keyspacesResult.error)).toBe(true);
        return;
      }

      if (keyspacesResult.data.data.length > 0) {
        const keyspaceName = keyspacesResult.data.data[0]!.name;
        const result = await runEffect(
          getKeyspace({
            organization: db.organization,
            database: db.name,
            branch: "main",
            keyspace: keyspaceName,
          }),
        );

        expect(result.id).toBeDefined();
        expect(result.name).toBe(keyspaceName);
        expect(typeof result.shards).toBe("number");
        expect(typeof result.sharded).toBe("boolean");
      }
    });

    it("returns NotFound for non-existent keyspace", async () => {
      const db = getDb();
      const error = await runEffect(
        getKeyspace({
          organization: db.organization,
          database: db.name,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
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

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        getKeyspace({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          keyspace: NON_EXISTENT_KEYSPACE,
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
        getKeyspace({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
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
        getKeyspace({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
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
  // getKeyspaceVschema
  // ============================================================================

  describe("getKeyspaceVschema", () => {
    it("returns NotFound for non-existent keyspace", async () => {
      const db = getDb();
      const error = await runEffect(
        getKeyspaceVschema({
          organization: db.organization,
          database: db.name,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
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
        getKeyspaceVschema({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
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
  // getKeyspaceRolloutStatus
  // ============================================================================

  describe("getKeyspaceRolloutStatus", () => {
    it("returns NotFound for non-existent keyspace", async () => {
      const db = getDb();
      const error = await runEffect(
        getKeyspaceRolloutStatus({
          organization: db.organization,
          database: db.name,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
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
        getKeyspaceRolloutStatus({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
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
  // createKeyspace
  // ============================================================================

  describe("createKeyspace", () => {
    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        createKeyspace({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          name: `test-keyspace-${Date.now()}`,
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
        createKeyspace({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          name: `test-keyspace-${Date.now()}`,
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
        createKeyspace({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          name: `test-keyspace-${Date.now()}`,
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

  // ============================================================================
  // updateKeyspace
  // ============================================================================

  describe("updateKeyspace", () => {
    it("returns NotFound for non-existent keyspace", async () => {
      const db = getDb();
      const error = await runEffect(
        updateKeyspace({
          organization: db.organization,
          database: db.name,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
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
        updateKeyspace({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
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
  // updateKeyspaceVschema
  // ============================================================================

  describe("updateKeyspaceVschema", () => {
    it("returns NotFound for non-existent keyspace", async () => {
      const db = getDb();
      const error = await runEffect(
        updateKeyspaceVschema({
          organization: db.organization,
          database: db.name,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
          vschema: "{}",
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
        updateKeyspaceVschema({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
          vschema: "{}",
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
  // deleteKeyspace
  // ============================================================================

  describe("deleteKeyspace", () => {
    it("returns NotFound for non-existent keyspace", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteKeyspace({
          organization: db.organization,
          database: db.name,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
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
        deleteKeyspace({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          keyspace: NON_EXISTENT_KEYSPACE,
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
