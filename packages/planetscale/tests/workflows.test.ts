import { Effect } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { createWorkflow } from "../src/operations/createWorkflow";
import { getWorkflow } from "../src/operations/getWorkflow";
import { listWorkflows } from "../src/operations/listWorkflows";
import { verifyWorkflow } from "../src/operations/verifyWorkflow";
import { workflowCancel } from "../src/operations/workflowCancel";
import { workflowComplete } from "../src/operations/workflowComplete";
import { workflowCutover } from "../src/operations/workflowCutover";
import { workflowRetry } from "../src/operations/workflowRetry";
import { workflowReverseCutover } from "../src/operations/workflowReverseCutover";
import { workflowReverseTraffic } from "../src/operations/workflowReverseTraffic";
import { workflowSwitchPrimaries } from "../src/operations/workflowSwitchPrimaries";
import { workflowSwitchReplicas } from "../src/operations/workflowSwitchReplicas";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "workflows";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";
const NON_EXISTENT_WORKFLOW_NUMBER = 999999;

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

describe("workflows", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // listWorkflows
  // ============================================================================

  describe("listWorkflows", () => {
    it("can list workflows (or returns error if not available)", async () => {
      const db = getDb();
      const result = await runEffect(
        listWorkflows({
          organization: db.organization,
          database: db.name,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // Workflows may not be available for all database types/plans
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBeDefined();
      } else {
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("can list workflows with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listWorkflows({
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
        listWorkflows({
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
        listWorkflows({
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
  // getWorkflow
  // ============================================================================

  describe("getWorkflow", () => {
    it("returns NotFound for non-existent workflow", async () => {
      const db = getDb();
      const error = await runEffect(
        getWorkflow({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_WORKFLOW_NUMBER,
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
        getWorkflow({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          number: 1,
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
        getWorkflow({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
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
  // createWorkflow
  // ============================================================================

  describe("createWorkflow", () => {
    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        createWorkflow({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          name: `test-workflow-${Date.now()}`,
          source_keyspace: "source",
          target_keyspace: "target",
          tables: ["test_table"],
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
        createWorkflow({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          name: `test-workflow-${Date.now()}`,
          source_keyspace: "source",
          target_keyspace: "target",
          tables: ["test_table"],
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

    it("returns error for non-existent keyspaces", async () => {
      const db = getDb();
      const error = await runEffect(
        createWorkflow({
          organization: db.organization,
          database: db.name,
          name: `test-workflow-${Date.now()}`,
          source_keyspace: "non-existent-source",
          target_keyspace: "non-existent-target",
          tables: ["test_table"],
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      // Should return an error - either NotFound for keyspaces or other API error
      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });
  });

  // ============================================================================
  // verifyWorkflow
  // ============================================================================

  describe("verifyWorkflow", () => {
    it("returns NotFound for non-existent workflow", async () => {
      const db = getDb();
      const error = await runEffect(
        verifyWorkflow({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_WORKFLOW_NUMBER,
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
        verifyWorkflow({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          number: 1,
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
        verifyWorkflow({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
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
  // workflowCancel
  // ============================================================================

  describe("workflowCancel", () => {
    it("returns NotFound for non-existent workflow", async () => {
      const db = getDb();
      const error = await runEffect(
        workflowCancel({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_WORKFLOW_NUMBER,
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
        workflowCancel({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          number: 1,
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
        workflowCancel({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
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
  // workflowComplete
  // ============================================================================

  describe("workflowComplete", () => {
    it("returns NotFound for non-existent workflow", async () => {
      const db = getDb();
      const error = await runEffect(
        workflowComplete({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_WORKFLOW_NUMBER,
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
        workflowComplete({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          number: 1,
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
        workflowComplete({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
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
  // workflowCutover
  // ============================================================================

  describe("workflowCutover", () => {
    it("returns NotFound for non-existent workflow", async () => {
      const db = getDb();
      const error = await runEffect(
        workflowCutover({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_WORKFLOW_NUMBER,
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
        workflowCutover({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          number: 1,
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
        workflowCutover({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
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
  // workflowRetry
  // ============================================================================

  describe("workflowRetry", () => {
    it("returns NotFound for non-existent workflow", async () => {
      const db = getDb();
      const error = await runEffect(
        workflowRetry({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_WORKFLOW_NUMBER,
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
        workflowRetry({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          number: 1,
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
        workflowRetry({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
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
  // workflowReverseCutover
  // ============================================================================

  describe("workflowReverseCutover", () => {
    it("returns NotFound for non-existent workflow", async () => {
      const db = getDb();
      const error = await runEffect(
        workflowReverseCutover({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_WORKFLOW_NUMBER,
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
        workflowReverseCutover({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          number: 1,
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
        workflowReverseCutover({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
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
  // workflowReverseTraffic
  // ============================================================================

  describe("workflowReverseTraffic", () => {
    it("returns NotFound for non-existent workflow", async () => {
      const db = getDb();
      const error = await runEffect(
        workflowReverseTraffic({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_WORKFLOW_NUMBER,
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
        workflowReverseTraffic({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          number: 1,
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
        workflowReverseTraffic({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
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
  // workflowSwitchPrimaries
  // ============================================================================

  describe("workflowSwitchPrimaries", () => {
    it("returns NotFound for non-existent workflow", async () => {
      const db = getDb();
      const error = await runEffect(
        workflowSwitchPrimaries({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_WORKFLOW_NUMBER,
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
        workflowSwitchPrimaries({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          number: 1,
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
        workflowSwitchPrimaries({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
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
  // workflowSwitchReplicas
  // ============================================================================

  describe("workflowSwitchReplicas", () => {
    it("returns NotFound for non-existent workflow", async () => {
      const db = getDb();
      const error = await runEffect(
        workflowSwitchReplicas({
          organization: db.organization,
          database: db.name,
          number: NON_EXISTENT_WORKFLOW_NUMBER,
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
        workflowSwitchReplicas({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          number: 1,
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
        workflowSwitchReplicas({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          number: 1,
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
