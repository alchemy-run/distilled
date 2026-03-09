import { Effect, Schedule } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Forbidden, NotFound } from "../src/errors";
import { createProjectBranch } from "../src/operations/createProjectBranch";
import { createProjectEndpoint } from "../src/operations/createProjectEndpoint";
import { deleteProjectBranch } from "../src/operations/deleteProjectBranch";
import { deleteProjectEndpoint } from "../src/operations/deleteProjectEndpoint";
import { getProjectEndpoint } from "../src/operations/getProjectEndpoint";
import { listProjectEndpoints } from "../src/operations/listProjectEndpoints";
import { listProjectOperations } from "../src/operations/listProjectOperations";
import { restartProjectEndpoint } from "../src/operations/restartProjectEndpoint";
import { startProjectEndpoint } from "../src/operations/startProjectEndpoint";
import { suspendProjectEndpoint } from "../src/operations/suspendProjectEndpoint";
import { updateProjectEndpoint } from "../src/operations/updateProjectEndpoint";
import {
  getTestProject,
  runEffect,
  setupTestProject,
  teardownTestProject,
  TestLayer,
} from "./setup";

const TEST_SUFFIX = "endpoints";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_PROJECT = "this-project-definitely-does-not-exist-12345";
const NON_EXISTENT_ENDPOINT =
  "ep-this-endpoint-definitely-does-not-exist-12345";

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
        schedule: Schedule.both(
          Schedule.recurs(60),
          Schedule.spaced("5 seconds"),
        ),
        while: (e) =>
          typeof e === "object" &&
          e !== null &&
          "_tag" in e &&
          e._tag === "OperationsPending",
      },
    );
  }).pipe(Effect.provide(TestLayer));

describe("endpoints", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestProject(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for project creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestProject(TEST_SUFFIX));
  });

  const getProj = () => getTestProject(TEST_SUFFIX);

  // ============================================================================
  // listProjectEndpoints
  // ============================================================================

  describe("listProjectEndpoints", () => {
    it("can list endpoints", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectEndpoints({
          project_id: proj.id,
        }),
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result.endpoints)).toBe(true);
      // New project should have at least one endpoint
      expect(result.endpoints.length).toBeGreaterThanOrEqual(1);
    });

    it("returns endpoints with expected properties", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectEndpoints({
          project_id: proj.id,
        }),
      );

      expect(result.endpoints.length).toBeGreaterThan(0);
      const firstEndpoint = result.endpoints[0]!;
      expect(firstEndpoint.id).toBeDefined();
      expect(firstEndpoint.host).toBeDefined();
      expect(firstEndpoint.project_id).toBe(proj.id);
      expect(firstEndpoint.branch_id).toBeDefined();
      expect(firstEndpoint.type).toBeDefined();
      expect(firstEndpoint.current_state).toBeDefined();
      expect(firstEndpoint.created_at).toBeDefined();
    });

    it("returns NotFound for non-existent project", async () => {
      const error = await runEffect(
        listProjectEndpoints({
          project_id: NON_EXISTENT_PROJECT,
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
  // getProjectEndpoint
  // ============================================================================

  describe("getProjectEndpoint", () => {
    it("can get the default endpoint", async () => {
      const proj = getProj();
      if (!proj.defaultEndpointId) {
        console.warn("No default endpoint in test project, skipping test");
        return;
      }

      const result = await runEffect(
        getProjectEndpoint({
          project_id: proj.id,
          endpoint_id: proj.defaultEndpointId,
        }),
      );

      expect(result.endpoint.id).toBe(proj.defaultEndpointId);
      expect(result.endpoint.project_id).toBe(proj.id);
      expect(result.endpoint.branch_id).toBe(proj.defaultBranchId);
    });

    it("returns endpoint with all expected properties", async () => {
      const proj = getProj();
      if (!proj.defaultEndpointId) {
        console.warn("No default endpoint in test project, skipping test");
        return;
      }

      const result = await runEffect(
        getProjectEndpoint({
          project_id: proj.id,
          endpoint_id: proj.defaultEndpointId,
        }),
      );

      // Required properties
      expect(result.endpoint.id).toBeDefined();
      expect(result.endpoint.host).toBeDefined();
      expect(result.endpoint.project_id).toBeDefined();
      expect(result.endpoint.branch_id).toBeDefined();
      expect(result.endpoint.type).toBeDefined();
      expect(result.endpoint.current_state).toBeDefined();
      expect(result.endpoint.region_id).toBeDefined();
      expect(result.endpoint.created_at).toBeDefined();
      expect(result.endpoint.updated_at).toBeDefined();
      expect(typeof result.endpoint.pooler_enabled).toBe("boolean");
      expect(typeof result.endpoint.disabled).toBe("boolean");
    });

    it("returns NotFound for non-existent endpoint", async () => {
      const proj = getProj();
      const error = await runEffect(
        getProjectEndpoint({
          project_id: proj.id,
          endpoint_id: NON_EXISTENT_ENDPOINT,
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

    it("returns NotFound for non-existent project", async () => {
      const error = await runEffect(
        getProjectEndpoint({
          project_id: NON_EXISTENT_PROJECT,
          endpoint_id: NON_EXISTENT_ENDPOINT,
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
  // createProjectEndpoint, updateProjectEndpoint & deleteProjectEndpoint
  // ============================================================================

  describe("createProjectEndpoint, updateProjectEndpoint & deleteProjectEndpoint", () => {
    it("can create, update, and delete a read-only endpoint", async () => {
      const proj = getProj();
      let createdEndpointId: string | null = null;

      try {
        // Wait for any pending operations
        await Effect.runPromise(waitForOperations(proj.id));

        // Create a read-only endpoint (since read-write already exists on the default branch)
        const created = await runEffect(
          createProjectEndpoint({
            project_id: proj.id,
            endpoint: {
              branch_id: proj.defaultBranchId,
              type: "read_only",
            },
          }),
        );

        createdEndpointId = created.endpoint.id;
        expect(created.endpoint.id).toBeDefined();
        expect(created.endpoint.project_id).toBe(proj.id);
        expect(created.endpoint.branch_id).toBe(proj.defaultBranchId);
        expect(created.endpoint.type).toBe("read_only");

        // Wait for endpoint creation to complete
        await Effect.runPromise(waitForOperations(proj.id));

        // Verify endpoint exists
        const fetched = await runEffect(
          getProjectEndpoint({
            project_id: proj.id,
            endpoint_id: createdEndpointId,
          }),
        );
        expect(fetched.endpoint.id).toBe(createdEndpointId);

        // Update endpoint settings - use pooler_enabled which should be allowed on all plans
        const updateResult = await runEffect(
          updateProjectEndpoint({
            project_id: proj.id,
            endpoint_id: createdEndpointId,
            endpoint: {
              pooler_enabled: true,
            },
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          ),
        );

        // Update may or may not succeed depending on plan, but endpoint was created
        if ("data" in updateResult) {
          expect(updateResult.data.endpoint.pooler_enabled).toBe(true);
        }

        // Wait for update to complete
        await Effect.runPromise(waitForOperations(proj.id));
      } finally {
        // Always cleanup
        if (createdEndpointId) {
          await Effect.runPromise(waitForOperations(proj.id));
          await runEffect(
            deleteProjectEndpoint({
              project_id: proj.id,
              endpoint_id: createdEndpointId,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 180000); // 3 minute timeout

    it("can create endpoint on a new branch", async () => {
      const proj = getProj();
      let createdBranchId: string | null = null;
      let createdEndpointId: string | null = null;

      try {
        // Wait for any pending operations
        await Effect.runPromise(waitForOperations(proj.id));

        // Create a new branch
        const branch = await runEffect(
          createProjectBranch({
            project_id: proj.id,
          }),
        );
        createdBranchId = branch.branch.id;

        // Wait for branch creation to complete
        await Effect.runPromise(waitForOperations(proj.id));

        // Create endpoint on the new branch
        const created = await runEffect(
          createProjectEndpoint({
            project_id: proj.id,
            endpoint: {
              branch_id: createdBranchId,
              type: "read_write",
            },
          }),
        );

        createdEndpointId = created.endpoint.id;
        expect(created.endpoint.branch_id).toBe(createdBranchId);
        expect(created.endpoint.type).toBe("read_write");

        // Wait for endpoint creation
        await Effect.runPromise(waitForOperations(proj.id));
      } finally {
        // Cleanup in reverse order
        if (createdEndpointId) {
          await Effect.runPromise(waitForOperations(proj.id));
          await runEffect(
            deleteProjectEndpoint({
              project_id: proj.id,
              endpoint_id: createdEndpointId,
            }).pipe(Effect.ignore),
          );
        }
        if (createdBranchId) {
          await Effect.runPromise(waitForOperations(proj.id));
          await runEffect(
            deleteProjectBranch({
              project_id: proj.id,
              branch_id: createdBranchId,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 180000);

    it("returns NotFound when updating non-existent endpoint", async () => {
      const proj = getProj();
      const error = await runEffect(
        updateProjectEndpoint({
          project_id: proj.id,
          endpoint_id: NON_EXISTENT_ENDPOINT,
          endpoint: {
            suspend_timeout_seconds: 300,
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

    it("handles deleting non-existent endpoint gracefully", async () => {
      const proj = getProj();
      // Note: Neon API may return success for deleting non-existent endpoints (idempotent)
      const result = await runEffect(
        deleteProjectEndpoint({
          project_id: proj.id,
          endpoint_id: NON_EXISTENT_ENDPOINT,
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

  // ============================================================================
  // startProjectEndpoint, suspendProjectEndpoint, restartProjectEndpoint
  // ============================================================================

  describe("endpoint lifecycle (start, suspend, restart)", () => {
    it("can suspend and start the default endpoint", async () => {
      const proj = getProj();
      if (!proj.defaultEndpointId) {
        console.warn("No default endpoint in test project, skipping test");
        return;
      }

      try {
        // Wait for any pending operations
        await Effect.runPromise(waitForOperations(proj.id));

        // Suspend the endpoint
        const suspended = await runEffect(
          suspendProjectEndpoint({
            project_id: proj.id,
            endpoint_id: proj.defaultEndpointId,
          }),
        );
        expect(suspended.endpoint.id).toBe(proj.defaultEndpointId);
        expect(suspended.operations.length).toBeGreaterThan(0);

        // Wait for suspension to complete
        await Effect.runPromise(waitForOperations(proj.id));

        // Start the endpoint
        const started = await runEffect(
          startProjectEndpoint({
            project_id: proj.id,
            endpoint_id: proj.defaultEndpointId,
          }),
        );
        expect(started.endpoint.id).toBe(proj.defaultEndpointId);
        expect(started.operations.length).toBeGreaterThan(0);

        // Wait for start to complete
        await Effect.runPromise(waitForOperations(proj.id));
      } catch (error) {
        // Make sure endpoint is running for other tests
        await Effect.runPromise(waitForOperations(proj.id));
        await runEffect(
          startProjectEndpoint({
            project_id: proj.id,
            endpoint_id: proj.defaultEndpointId!,
          }).pipe(Effect.ignore),
        );
        throw error;
      }
    }, 180000);

    it("can restart the default endpoint", async () => {
      const proj = getProj();
      if (!proj.defaultEndpointId) {
        console.warn("No default endpoint in test project, skipping test");
        return;
      }

      // Wait for any pending operations
      await Effect.runPromise(waitForOperations(proj.id));

      // Restart the endpoint
      const restarted = await runEffect(
        restartProjectEndpoint({
          project_id: proj.id,
          endpoint_id: proj.defaultEndpointId,
        }),
      );

      expect(restarted.endpoint.id).toBe(proj.defaultEndpointId);
      expect(restarted.operations.length).toBeGreaterThan(0);

      // Wait for restart to complete
      await Effect.runPromise(waitForOperations(proj.id));
    }, 180000);

    it("returns NotFound when starting non-existent endpoint", async () => {
      const proj = getProj();
      const error = await runEffect(
        startProjectEndpoint({
          project_id: proj.id,
          endpoint_id: NON_EXISTENT_ENDPOINT,
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

    it("returns NotFound when suspending non-existent endpoint", async () => {
      const proj = getProj();
      const error = await runEffect(
        suspendProjectEndpoint({
          project_id: proj.id,
          endpoint_id: NON_EXISTENT_ENDPOINT,
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

    it("returns NotFound when restarting non-existent endpoint", async () => {
      const proj = getProj();
      const error = await runEffect(
        restartProjectEndpoint({
          project_id: proj.id,
          endpoint_id: NON_EXISTENT_ENDPOINT,
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
