import { Effect, Schedule } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Forbidden, NotFound } from "../src/errors";
import { createProjectBranchRole } from "../src/operations/createProjectBranchRole";
import { deleteProjectBranchRole } from "../src/operations/deleteProjectBranchRole";
import { getProjectBranchRole } from "../src/operations/getProjectBranchRole";
import { getProjectBranchRolePassword } from "../src/operations/getProjectBranchRolePassword";
import { listProjectBranchRoles } from "../src/operations/listProjectBranchRoles";
import { listProjectOperations } from "../src/operations/listProjectOperations";
import { resetProjectBranchRolePassword } from "../src/operations/resetProjectBranchRolePassword";
import {
  getTestProject,
  runEffect,
  setupTestProject,
  teardownTestProject,
  TestLayer,
} from "./setup";

const TEST_SUFFIX = "roles";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_PROJECT = "this-project-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "br-this-branch-definitely-does-not-exist-12345";
const NON_EXISTENT_ROLE = "this_role_definitely_does_not_exist_12345";

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

describe("roles", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestProject(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for project creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestProject(TEST_SUFFIX));
  });

  const getProj = () => getTestProject(TEST_SUFFIX);

  // ============================================================================
  // listProjectBranchRoles
  // ============================================================================

  describe("listProjectBranchRoles", () => {
    it("can list roles on the default branch", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectBranchRoles({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
        }),
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result.roles)).toBe(true);
      // New project should have at least one role (neondb_owner)
      expect(result.roles.length).toBeGreaterThanOrEqual(1);
    });

    it("returns roles with expected properties", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectBranchRoles({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
        }),
      );

      expect(result.roles.length).toBeGreaterThan(0);
      const firstRole = result.roles[0]!;
      expect(firstRole.name).toBeDefined();
      expect(firstRole.branch_id).toBe(proj.defaultBranchId);
      expect(firstRole.created_at).toBeDefined();
      expect(firstRole.updated_at).toBeDefined();
    });

    it("includes the default owner role (neondb_owner)", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectBranchRoles({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
        }),
      );

      const roleNames = result.roles.map((r) => r.name);
      expect(roleNames).toContain("neondb_owner");
    });

    it("returns NotFound for non-existent project", async () => {
      const error = await runEffect(
        listProjectBranchRoles({
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

    it("returns NotFound for non-existent branch", async () => {
      const proj = getProj();
      const error = await runEffect(
        listProjectBranchRoles({
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
  // getProjectBranchRole
  // ============================================================================

  describe("getProjectBranchRole", () => {
    it("can get the default owner role (neondb_owner)", async () => {
      const proj = getProj();
      const result = await runEffect(
        getProjectBranchRole({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
          role_name: "neondb_owner",
        }),
      );

      expect(result.role.name).toBe("neondb_owner");
      expect(result.role.branch_id).toBe(proj.defaultBranchId);
    });

    it("returns role with all expected properties", async () => {
      const proj = getProj();
      const result = await runEffect(
        getProjectBranchRole({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
          role_name: "neondb_owner",
        }),
      );

      // Required properties
      expect(result.role.name).toBeDefined();
      expect(result.role.branch_id).toBeDefined();
      expect(result.role.created_at).toBeDefined();
      expect(result.role.updated_at).toBeDefined();
    });

    it("returns NotFound for non-existent role", async () => {
      const proj = getProj();
      const error = await runEffect(
        getProjectBranchRole({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
          role_name: NON_EXISTENT_ROLE,
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

    it("returns NotFound for non-existent branch", async () => {
      const proj = getProj();
      const error = await runEffect(
        getProjectBranchRole({
          project_id: proj.id,
          branch_id: NON_EXISTENT_BRANCH,
          role_name: "neondb_owner",
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
  // getProjectBranchRolePassword
  // ============================================================================

  describe("getProjectBranchRolePassword", () => {
    it("can get password for the default owner role", async () => {
      const proj = getProj();
      const result = await runEffect(
        getProjectBranchRolePassword({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
          role_name: "neondb_owner",
        }),
      );

      expect(result.password).toBeDefined();
      expect(typeof result.password).toBe("string");
      expect(result.password.length).toBeGreaterThan(0);
    });

    it("returns NotFound for non-existent role", async () => {
      const proj = getProj();
      const error = await runEffect(
        getProjectBranchRolePassword({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
          role_name: NON_EXISTENT_ROLE,
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
  // createProjectBranchRole & deleteProjectBranchRole
  // ============================================================================

  describe("createProjectBranchRole & deleteProjectBranchRole", () => {
    it("can create and delete a role", async () => {
      const proj = getProj();
      const roleName = `testrole_${Date.now()}`;
      let createdRoleName: string | null = null;

      try {
        // Wait for any pending operations
        await Effect.runPromise(waitForOperations(proj.id));

        // Create role
        const created = await runEffect(
          createProjectBranchRole({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            role: {
              name: roleName,
            },
          }),
        );

        createdRoleName = created.role.name;
        expect(created.role.name).toBe(roleName);
        expect(created.role.branch_id).toBe(proj.defaultBranchId);

        // Wait for role creation to complete
        await Effect.runPromise(waitForOperations(proj.id));

        // Verify role exists
        const fetched = await runEffect(
          getProjectBranchRole({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            role_name: createdRoleName,
          }),
        );
        expect(fetched.role.name).toBe(createdRoleName);

        // Get password for the new role
        const password = await runEffect(
          getProjectBranchRolePassword({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            role_name: createdRoleName,
          }),
        );
        expect(password.password).toBeDefined();
        expect(password.password.length).toBeGreaterThan(0);
      } finally {
        // Always cleanup
        if (createdRoleName) {
          await Effect.runPromise(waitForOperations(proj.id));
          await runEffect(
            deleteProjectBranchRole({
              project_id: proj.id,
              branch_id: proj.defaultBranchId,
              role_name: createdRoleName,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 180000); // 3 minute timeout

    it("can create a role with no_login option", async () => {
      const proj = getProj();
      const roleName = `nologin_${Date.now()}`;
      let createdRoleName: string | null = null;

      try {
        // Wait for any pending operations
        await Effect.runPromise(waitForOperations(proj.id));

        // Create role with no_login
        const created = await runEffect(
          createProjectBranchRole({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            role: {
              name: roleName,
              no_login: true,
            },
          }),
        );

        createdRoleName = created.role.name;
        expect(created.role.name).toBe(roleName);

        // Wait for role creation
        await Effect.runPromise(waitForOperations(proj.id));
      } finally {
        // Cleanup
        if (createdRoleName) {
          await Effect.runPromise(waitForOperations(proj.id));
          await runEffect(
            deleteProjectBranchRole({
              project_id: proj.id,
              branch_id: proj.defaultBranchId,
              role_name: createdRoleName,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 180000);

    it("handles deleting non-existent role gracefully", async () => {
      const proj = getProj();
      // Note: Neon API may return success for deleting non-existent roles (idempotent)
      const result = await runEffect(
        deleteProjectBranchRole({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
          role_name: NON_EXISTENT_ROLE,
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
  // resetProjectBranchRolePassword
  // ============================================================================

  describe("resetProjectBranchRolePassword", () => {
    it("can reset password for a custom role", async () => {
      const proj = getProj();
      const roleName = `resetpw_${Date.now()}`;
      let createdRoleName: string | null = null;

      try {
        // Wait for any pending operations
        await Effect.runPromise(waitForOperations(proj.id));

        // Create role
        const created = await runEffect(
          createProjectBranchRole({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            role: {
              name: roleName,
            },
          }),
        );

        createdRoleName = created.role.name;

        // Wait for role creation
        await Effect.runPromise(waitForOperations(proj.id));

        // Get original password
        const originalPassword = await runEffect(
          getProjectBranchRolePassword({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            role_name: createdRoleName,
          }),
        );

        // Reset password
        const result = await runEffect(
          resetProjectBranchRolePassword({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            role_name: createdRoleName,
          }),
        );

        expect(result.role.name).toBe(createdRoleName);

        // Wait for password reset
        await Effect.runPromise(waitForOperations(proj.id));

        // Get new password and verify it changed
        const newPassword = await runEffect(
          getProjectBranchRolePassword({
            project_id: proj.id,
            branch_id: proj.defaultBranchId,
            role_name: createdRoleName,
          }),
        );

        expect(newPassword.password).toBeDefined();
        expect(newPassword.password).not.toBe(originalPassword.password);
      } finally {
        // Cleanup
        if (createdRoleName) {
          await Effect.runPromise(waitForOperations(proj.id));
          await runEffect(
            deleteProjectBranchRole({
              project_id: proj.id,
              branch_id: proj.defaultBranchId,
              role_name: createdRoleName,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 180000);

    it("returns NotFound when resetting password for non-existent role", async () => {
      const proj = getProj();
      const error = await runEffect(
        resetProjectBranchRolePassword({
          project_id: proj.id,
          branch_id: proj.defaultBranchId,
          role_name: NON_EXISTENT_ROLE,
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
