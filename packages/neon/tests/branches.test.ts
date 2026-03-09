import { Effect } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { NeonApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { createProjectBranch } from "../src/operations/createProjectBranch";
import { deleteProjectBranch } from "../src/operations/deleteProjectBranch";
import { getProjectBranch } from "../src/operations/getProjectBranch";
import { listProjectBranches } from "../src/operations/listProjectBranches";
import { updateProjectBranch } from "../src/operations/updateProjectBranch";
import { setDefaultProjectBranch } from "../src/operations/setDefaultProjectBranch";
import { countProjectBranches } from "../src/operations/countProjectBranches";
import { listProjectBranchEndpoints } from "../src/operations/listProjectBranchEndpoints";
import {
  getTestProject,
  runEffect,
  setupTestProject,
  teardownTestProject,
} from "./setup";

const TEST_SUFFIX = "branches";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_PROJECT = "this-project-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "br-this-branch-definitely-does-not-exist-12345";

/**
 * Helper to check if an error is an expected "not found" type error.
 * Neon API may return NotFound or Forbidden for non-existent resources.
 */
const isNotFoundOrForbidden = (error: unknown): boolean =>
  error instanceof NotFound || error instanceof Forbidden;

describe("branches", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestProject(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for project creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestProject(TEST_SUFFIX));
  });

  const getProj = () => getTestProject(TEST_SUFFIX);

  // ============================================================================
  // listProjectBranches
  // ============================================================================

  describe("listProjectBranches", () => {
    it("can list branches", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectBranches({
          project_id: proj.id,
        }),
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result.branches)).toBe(true);
      // New project should have at least one branch (main)
      expect(result.branches.length).toBeGreaterThanOrEqual(1);
    });

    it("can list branches with pagination", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectBranches({
          project_id: proj.id,
          limit: 10,
        }),
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result.branches)).toBe(true);
    });

    it("can search branches by name", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectBranches({
          project_id: proj.id,
          search: "main",
        }),
      );

      expect(Array.isArray(result.branches)).toBe(true);
    });

    it("can sort branches", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectBranches({
          project_id: proj.id,
          sort_by: "created_at",
          sort_order: "desc",
        }),
      );

      expect(Array.isArray(result.branches)).toBe(true);
    });

    it("returns branches with expected properties", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectBranches({
          project_id: proj.id,
        }),
      );

      expect(result.branches.length).toBeGreaterThan(0);
      const firstBranch = result.branches[0]!;
      expect(firstBranch.id).toBeDefined();
      expect(firstBranch.name).toBeDefined();
      expect(firstBranch.project_id).toBe(proj.id);
      expect(firstBranch.created_at).toBeDefined();
      expect(firstBranch.current_state).toBeDefined();
    });

    it("returns NotFound for non-existent project", async () => {
      const error = await runEffect(
        listProjectBranches({
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
  // countProjectBranches
  // ============================================================================

  describe("countProjectBranches", () => {
    it("can count branches", async () => {
      const proj = getProj();
      const result = await runEffect(
        countProjectBranches({
          project_id: proj.id,
        }),
      );

      expect(result).toBeDefined();
      expect(typeof result.count).toBe("number");
      expect(result.count).toBeGreaterThanOrEqual(1);
    });

    it("returns NotFound for non-existent project", async () => {
      const error = await runEffect(
        countProjectBranches({
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
  // getProjectBranch
  // ============================================================================

  describe("getProjectBranch", () => {
    it("can get the default branch", async () => {
      const proj = getProj();
      const result = await runEffect(
        getProjectBranch({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
        }),
      );

      expect(result.branch.id).toBe(proj.defaultBranchId);
      expect(result.branch.project_id).toBe(proj.id);
      expect(result.branch.name).toBeDefined();
      expect(result.branch.created_at).toBeDefined();
    });

    it("returns branch with all expected properties", async () => {
      const proj = getProj();
      const result = await runEffect(
        getProjectBranch({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
        }),
      );

      // Required properties
      expect(result.branch.id).toBeDefined();
      expect(result.branch.name).toBeDefined();
      expect(result.branch.project_id).toBeDefined();
      expect(result.branch.current_state).toBeDefined();
      expect(result.branch.created_at).toBeDefined();
      expect(result.branch.updated_at).toBeDefined();
      expect(typeof result.branch.default).toBe("boolean");
      expect(typeof result.branch.protected).toBe("boolean");
    });

    it("returns NotFound for non-existent branch", async () => {
      const proj = getProj();
      const error = await runEffect(
        getProjectBranch({
          project_id: proj.id,
          branch_id: NON_EXISTENT_BRANCH,
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
        getProjectBranch({
          project_id: NON_EXISTENT_PROJECT,
          branch_id: NON_EXISTENT_BRANCH,
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
  // createProjectBranch, updateProjectBranch & deleteProjectBranch
  // ============================================================================

  describe("createProjectBranch, updateProjectBranch & deleteProjectBranch", () => {
    it("can create, update, and delete a branch", async () => {
      const proj = getProj();
      const branchName = `test-branch-${Date.now()}`;
      let createdBranchId: string | null = null;

      try {
        // Create branch
        const created = await runEffect(
          createProjectBranch({
            project_id: proj.id,
          }),
        );

        createdBranchId = created.branch.id;
        expect(created.branch.id).toBeDefined();
        expect(created.branch.project_id).toBe(proj.id);
        expect(created.branch.parent_id).toBe(proj.defaultBranchId);

        // Verify branch exists
        const fetched = await runEffect(
          getProjectBranch({
            project_id: proj.id,
            branch_id: createdBranchId,
          }),
        );
        expect(fetched.branch.id).toBe(createdBranchId);

        // Update branch name
        const newName = `updated-${Date.now()}`;
        const updated = await runEffect(
          updateProjectBranch({
            project_id: proj.id,
            branch_id: createdBranchId,
            branch: {
              name: newName,
            },
          }),
        );
        expect(updated.branch.name).toBe(newName);

        // Verify update
        const fetchedAgain = await runEffect(
          getProjectBranch({
            project_id: proj.id,
            branch_id: createdBranchId,
          }),
        );
        expect(fetchedAgain.branch.name).toBe(newName);
      } finally {
        // Always cleanup
        if (createdBranchId) {
          await runEffect(
            deleteProjectBranch({
              project_id: proj.id,
              branch_id: createdBranchId,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 120000); // 2 minute timeout

    it("can create a branch with a specific name", async () => {
      const proj = getProj();
      const branchName = `named-branch-${Date.now()}`;
      let createdBranchId: string | null = null;

      try {
        // Note: createProjectBranch doesn't have a name field in input,
        // so we need to check how to pass it. Looking at the schema, there's no
        // body parameter in the generated operation. We can update after creation.
        const created = await runEffect(
          createProjectBranch({
            project_id: proj.id,
          }),
        );

        createdBranchId = created.branch.id;

        // Update to set name
        const updated = await runEffect(
          updateProjectBranch({
            project_id: proj.id,
            branch_id: createdBranchId,
            branch: {
              name: branchName,
            },
          }),
        );

        expect(updated.branch.name).toBe(branchName);
      } finally {
        if (createdBranchId) {
          await runEffect(
            deleteProjectBranch({
              project_id: proj.id,
              branch_id: createdBranchId,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 120000);

    it("can update branch protected status (when plan allows)", async () => {
      const proj = getProj();
      let createdBranchId: string | null = null;

      try {
        const created = await runEffect(
          createProjectBranch({
            project_id: proj.id,
          }),
        );

        createdBranchId = created.branch.id;

        // Set protected to true - may fail due to plan limitations
        const updateResult = await runEffect(
          updateProjectBranch({
            project_id: proj.id,
            branch_id: createdBranchId,
            branch: {
              protected: true,
            },
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          ),
        );

        if ("error" in updateResult) {
          // Plan may not allow protected branches
          const errorMsg = (updateResult.error as any)?.message || "";
          expect(errorMsg).toContain("protected branches");
          return;
        }

        expect(updateResult.data.branch.protected).toBe(true);

        // Set protected back to false before deleting
        await runEffect(
          updateProjectBranch({
            project_id: proj.id,
            branch_id: createdBranchId,
            branch: {
              protected: false,
            },
          }),
        );
      } finally {
        if (createdBranchId) {
          await runEffect(
            deleteProjectBranch({
              project_id: proj.id,
              branch_id: createdBranchId,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 120000);

    it("returns NotFound when updating non-existent branch", async () => {
      const proj = getProj();
      const error = await runEffect(
        updateProjectBranch({
          project_id: proj.id,
          branch_id: NON_EXISTENT_BRANCH,
          branch: {
            name: "test",
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

    it("handles deleting non-existent branch gracefully", async () => {
      const proj = getProj();
      // Note: Neon API may return success (204) for deleting non-existent branches
      // This is idempotent behavior - the branch doesn't exist after the call
      const result = await runEffect(
        deleteProjectBranch({
          project_id: proj.id,
          branch_id: NON_EXISTENT_BRANCH,
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
  // listProjectBranchEndpoints
  // ============================================================================

  describe("listProjectBranchEndpoints", () => {
    it("can list endpoints for the default branch", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectBranchEndpoints({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
        }),
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result.endpoints)).toBe(true);
    });

    it("returns NotFound for non-existent branch", async () => {
      const proj = getProj();
      const error = await runEffect(
        listProjectBranchEndpoints({
          project_id: proj.id,
          branch_id: NON_EXISTENT_BRANCH,
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
  // setDefaultProjectBranch
  // ============================================================================

  describe("setDefaultProjectBranch", () => {
    it("can set a branch as default and restore original", async () => {
      const proj = getProj();
      let createdBranchId: string | null = null;

      try {
        // Create a new branch
        const created = await runEffect(
          createProjectBranch({
            project_id: proj.id,
          }),
        );

        createdBranchId = created.branch.id;

        // Set the new branch as default
        const result = await runEffect(
          setDefaultProjectBranch({
            project_id: proj.id,
            branch_id: createdBranchId,
          }),
        );

        expect(result.branch.id).toBe(createdBranchId);
        expect(result.branch.default).toBe(true);

        // Restore original default
        await runEffect(
          setDefaultProjectBranch({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
          }),
        );
      } finally {
        if (createdBranchId) {
          await runEffect(
            deleteProjectBranch({
              project_id: proj.id,
              branch_id: createdBranchId,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 120000);

    it("returns NotFound for non-existent branch", async () => {
      const proj = getProj();
      const error = await runEffect(
        setDefaultProjectBranch({
          project_id: proj.id,
          branch_id: NON_EXISTENT_BRANCH,
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
