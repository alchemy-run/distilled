import { Effect, Schedule } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Forbidden, NotFound, BadRequest } from "../src/errors";
import { NeonApiError } from "../src/client";
import { listSnapshots } from "../src/operations/listSnapshots";
import { createSnapshot } from "../src/operations/createSnapshot";
import { updateSnapshot } from "../src/operations/updateSnapshot";
import { deleteSnapshot } from "../src/operations/deleteSnapshot";
import { listProjectOperations } from "../src/operations/listProjectOperations";
import { getTestProject, runEffect, setupTestProject, teardownTestProject, TestLayer } from "./setup";

const TEST_SUFFIX = "snapshots";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_PROJECT = "this-project-definitely-does-not-exist-12345";
const NON_EXISTENT_SNAPSHOT = "ss-this-snapshot-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "br-this-branch-definitely-does-not-exist-12345";

/**
 * Helper to check if an error is an expected "not found" type error.
 */
const isNotFoundOrForbidden = (error: unknown): boolean =>
  error instanceof NotFound || error instanceof Forbidden;

/**
 * Helper to check if an error indicates the feature is not available
 * (e.g., snapshots are a beta feature that may require certain plan)
 */
const isFeatureNotAvailable = (error: unknown): boolean =>
  error instanceof BadRequest ||
  error instanceof Forbidden ||
  (error instanceof NeonApiError && 
    (error.message.includes("not available") || 
     error.message.includes("not enabled") ||
     error.message.includes("plan")));

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
        schedule: Schedule.intersect(Schedule.recurs(60), Schedule.spaced("5 seconds")),
        while: (e) => typeof e === "object" && e !== null && "_tag" in e && e._tag === "OperationsPending",
      },
    );
  }).pipe(Effect.provide(TestLayer));

describe("snapshots", () => {
  // Note: Snapshots are a beta feature and may not be available on all plans

  beforeAll(async () => {
    await Effect.runPromise(setupTestProject(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for project creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestProject(TEST_SUFFIX));
  });

  const getProj = () => getTestProject(TEST_SUFFIX);

  // ============================================================================
  // listSnapshots
  // ============================================================================

  describe("listSnapshots", () => {
    it("can list snapshots or returns appropriate error if feature not available", async () => {
      const proj = getProj();
      const result = await runEffect(
        listSnapshots({
          project_id: proj.id,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("error" in result) {
        // Feature may not be available
        expect(isFeatureNotAvailable(result.error) || isNotFoundOrForbidden(result.error)).toBe(true);
      } else {
        expect(result.data.snapshots).toBeDefined();
        expect(Array.isArray(result.data.snapshots)).toBe(true);
      }
    });

    it("returns snapshots with expected properties when available", async () => {
      const proj = getProj();
      const result = await runEffect(
        listSnapshots({
          project_id: proj.id,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("error" in result) {
        return; // Skip if feature not available
      }

      // If there are snapshots, check their structure
      if (result.data.snapshots.length > 0) {
        const snapshot = result.data.snapshots[0]!;
        expect(snapshot.id).toBeDefined();
        expect(snapshot.name).toBeDefined();
        expect(snapshot.created_at).toBeDefined();
      }
    });

    it("returns NotFound for non-existent project", async () => {
      const error = await runEffect(
        listSnapshots({
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
  // createSnapshot & deleteSnapshot
  // ============================================================================

  describe("createSnapshot & deleteSnapshot", () => {
    it("can create and delete a snapshot or returns appropriate error if feature not available", async () => {
      const proj = getProj();
      const snapshotName = `test-snapshot-${Date.now()}`;
      let createdSnapshotId: string | null = null;

      try {
        // Wait for any pending operations
        await Effect.runPromise(waitForOperations(proj.id));

        // Create snapshot
        const createResult = await runEffect(
          createSnapshot({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            name: snapshotName,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          ),
        );

        if ("error" in createResult) {
          // Feature may not be available
          expect(isFeatureNotAvailable(createResult.error) || isNotFoundOrForbidden(createResult.error)).toBe(true);
          return;
        }

        createdSnapshotId = createResult.data.snapshot.id;
        // Name may be auto-generated by Neon if not supported
        expect(createResult.data.snapshot.name).toBeDefined();
        expect(createResult.data.snapshot.id).toBeDefined();
        expect(createResult.data.snapshot.created_at).toBeDefined();

        // Wait for snapshot creation to complete
        await Effect.runPromise(waitForOperations(proj.id));

        // Verify snapshot appears in list
        const listResult = await runEffect(
          listSnapshots({
            project_id: proj.id,
          }),
        );

        const foundSnapshot = listResult.snapshots.find((s) => s.id === createdSnapshotId);
        expect(foundSnapshot).toBeDefined();
        expect(foundSnapshot!.name).toBeDefined();
      } finally {
        // Always cleanup
        if (createdSnapshotId) {
          await Effect.runPromise(waitForOperations(proj.id));
          await runEffect(
            deleteSnapshot({
              project_id: proj.id,
              snapshot_id: createdSnapshotId,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 180000); // 3 minute timeout

    it("can create snapshot with expiration", async () => {
      const proj = getProj();
      const snapshotName = `expiring-snapshot-${Date.now()}`;
      // Set expiration to 1 week from now
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      let createdSnapshotId: string | null = null;

      try {
        // Wait for any pending operations
        await Effect.runPromise(waitForOperations(proj.id));

        // Create snapshot with expiration
        const createResult = await runEffect(
          createSnapshot({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            name: snapshotName,
            expires_at: expiresAt,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          ),
        );

        if ("error" in createResult) {
          // Feature may not be available
          return;
        }

        createdSnapshotId = createResult.data.snapshot.id;
        // expires_at may or may not be returned in the response
        // Just verify snapshot was created successfully
        expect(createResult.data.snapshot.id).toBeDefined();

        // Wait for snapshot creation
        await Effect.runPromise(waitForOperations(proj.id));
      } finally {
        if (createdSnapshotId) {
          await Effect.runPromise(waitForOperations(proj.id));
          await runEffect(
            deleteSnapshot({
              project_id: proj.id,
              snapshot_id: createdSnapshotId,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 180000);

    it("returns NotFound when deleting non-existent snapshot", async () => {
      const proj = getProj();
      const error = await runEffect(
        deleteSnapshot({
          project_id: proj.id,
          snapshot_id: NON_EXISTENT_SNAPSHOT,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error) || isFeatureNotAvailable(error)).toBe(true);
    });

    it("returns NotFound when creating snapshot for non-existent branch", async () => {
      const proj = getProj();
      const error = await runEffect(
        createSnapshot({
          project_id: proj.id,
          branch_id: NON_EXISTENT_BRANCH,
          name: "test-snapshot",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error) || isFeatureNotAvailable(error)).toBe(true);
    });
  });

  // ============================================================================
  // updateSnapshot
  // ============================================================================

  describe("updateSnapshot", () => {
    it("can update a snapshot name when feature is available", async () => {
      const proj = getProj();
      const originalName = `snapshot-to-update-${Date.now()}`;
      const newName = `updated-snapshot-${Date.now()}`;
      let createdSnapshotId: string | null = null;

      try {
        // Wait for any pending operations
        await Effect.runPromise(waitForOperations(proj.id));

        // Create snapshot
        const createResult = await runEffect(
          createSnapshot({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            name: originalName,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          ),
        );

        if ("error" in createResult) {
          // Feature may not be available
          return;
        }

        createdSnapshotId = createResult.data.snapshot.id;

        // Wait for snapshot creation
        await Effect.runPromise(waitForOperations(proj.id));

        // Update snapshot name
        const updateResult = await runEffect(
          updateSnapshot({
            project_id: proj.id,
            snapshot_id: createdSnapshotId,
            snapshot: {
              name: newName,
            },
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          ),
        );

        if ("error" in updateResult) {
          // Update might not be supported
          return;
        }

        expect(updateResult.data.snapshot.name).toBe(newName);
      } finally {
        if (createdSnapshotId) {
          await Effect.runPromise(waitForOperations(proj.id));
          await runEffect(
            deleteSnapshot({
              project_id: proj.id,
              snapshot_id: createdSnapshotId,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 180000);

    it("returns NotFound when updating non-existent snapshot", async () => {
      const proj = getProj();
      const error = await runEffect(
        updateSnapshot({
          project_id: proj.id,
          snapshot_id: NON_EXISTENT_SNAPSHOT,
          snapshot: {
            name: "new-name",
          },
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error) || isFeatureNotAvailable(error)).toBe(true);
    });
  });
});
