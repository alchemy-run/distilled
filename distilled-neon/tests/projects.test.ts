import { Effect } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { NeonApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { createProject } from "../src/operations/createProject";
import { deleteProject } from "../src/operations/deleteProject";
import { getProject } from "../src/operations/getProject";
import { listProjects } from "../src/operations/listProjects";
import { listSharedProjects } from "../src/operations/listSharedProjects";
import { updateProject } from "../src/operations/updateProject";
import { listProjectOperations } from "../src/operations/listProjectOperations";
import { listProjectPermissions } from "../src/operations/listProjectPermissions";
import { getConnectionURI } from "../src/operations/getConnectionURI";
import {
  getTestProject,
  runEffect,
  setupTestProject,
  teardownTestProject,
} from "./setup";

const TEST_SUFFIX = "projects";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_PROJECT = "this-project-definitely-does-not-exist-12345";

/**
 * Helper to check if an error is an expected "not found" type error.
 * Neon API may return NotFound or Forbidden for non-existent resources.
 */
const isNotFoundOrForbidden = (error: unknown): boolean =>
  error instanceof NotFound || error instanceof Forbidden;

/**
 * Helper to check if an error is any API error type.
 */
const isApiError = (error: unknown): boolean =>
  error instanceof NotFound ||
  error instanceof Forbidden ||
  error instanceof NeonApiError ||
  (error !== null && typeof error === "object" && "_tag" in error);

describe("projects", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestProject(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for project creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestProject(TEST_SUFFIX));
  });

  const getProj = () => getTestProject(TEST_SUFFIX);

  // ============================================================================
  // listProjects
  // ============================================================================

  describe("listProjects", () => {
    it("can list projects", async () => {
      const result = await runEffect(listProjects({}));

      expect(result).toBeDefined();
      expect(Array.isArray(result.projects)).toBe(true);
    });

    it("can list projects with pagination", async () => {
      const result = await runEffect(
        listProjects({
          limit: 10,
        }),
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result.projects)).toBe(true);
    });

    it("can search projects by name", async () => {
      const result = await runEffect(
        listProjects({
          search: "distilled",
        }),
      );

      expect(Array.isArray(result.projects)).toBe(true);
    });

    it("returns projects with expected properties", async () => {
      const result = await runEffect(listProjects({}));

      if (result.projects.length > 0) {
        const firstProject = result.projects[0]!;
        expect(firstProject.id).toBeDefined();
        expect(firstProject.name).toBeDefined();
        expect(firstProject.created_at).toBeDefined();
      }
    });
  });

  // ============================================================================
  // listSharedProjects
  // ============================================================================

  describe("listSharedProjects", () => {
    it("can list shared projects", async () => {
      const result = await runEffect(listSharedProjects({}));

      expect(result).toBeDefined();
      expect(Array.isArray(result.projects)).toBe(true);
    });

    it("can list shared projects with pagination", async () => {
      const result = await runEffect(
        listSharedProjects({
          limit: 10,
        }),
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result.projects)).toBe(true);
    });
  });

  // ============================================================================
  // getProject
  // ============================================================================

  describe("getProject", () => {
    it("can get a project", async () => {
      const proj = getProj();
      const result = await runEffect(
        getProject({
          project_id: proj.id,
        }),
      );

      expect(result.project.id).toBe(proj.id);
      expect(result.project.name).toBeDefined();
      expect(result.project.created_at).toBeDefined();
    });

    it("returns project with all expected properties", async () => {
      const proj = getProj();
      const result = await runEffect(
        getProject({
          project_id: proj.id,
        }),
      );

      // Required properties
      expect(result.project.id).toBeDefined();
      expect(result.project.name).toBeDefined();
      expect(result.project.created_at).toBeDefined();
      expect(result.project.region_id).toBeDefined();
      expect(result.project.pg_version).toBeDefined();
    });

    it("returns NotFound for non-existent project", async () => {
      const error = await runEffect(
        getProject({
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
  // updateProject
  // ============================================================================

  describe("updateProject", () => {
    it("can update project name", async () => {
      const proj = getProj();
      const newName = `${proj.name}-updated`;

      const updated = await runEffect(
        updateProject({
          project_id: proj.id,
          project: {
            name: newName,
          },
        }),
      );

      expect(updated.project.name).toBe(newName);

      // Restore original name
      await runEffect(
        updateProject({
          project_id: proj.id,
          project: {
            name: proj.name,
          },
        }).pipe(Effect.ignore),
      );
    });

    it("returns NotFound for non-existent project", async () => {
      const error = await runEffect(
        updateProject({
          project_id: NON_EXISTENT_PROJECT,
          project: {
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
  });

  // ============================================================================
  // listProjectOperations
  // ============================================================================

  describe("listProjectOperations", () => {
    it("can list project operations", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectOperations({
          project_id: proj.id,
        }),
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result.operations)).toBe(true);
    });

    it("can list project operations with pagination", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectOperations({
          project_id: proj.id,
          limit: 10,
        }),
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result.operations)).toBe(true);
    });

    it("returns operations with expected properties", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectOperations({
          project_id: proj.id,
        }),
      );

      if (result.operations.length > 0) {
        const firstOp = result.operations[0]!;
        expect(firstOp.id).toBeDefined();
        expect(firstOp.project_id).toBeDefined();
        expect(firstOp.action).toBeDefined();
        expect(firstOp.status).toBeDefined();
      }
    });

    it("returns NotFound for non-existent project", async () => {
      const error = await runEffect(
        listProjectOperations({
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
  // listProjectPermissions
  // ============================================================================

  describe("listProjectPermissions", () => {
    it("can list project permissions", async () => {
      const proj = getProj();
      const result = await runEffect(
        listProjectPermissions({
          project_id: proj.id,
        }),
      );

      expect(result).toBeDefined();
      expect(Array.isArray(result.project_permissions)).toBe(true);
    });

    it("returns NotFound for non-existent project", async () => {
      const error = await runEffect(
        listProjectPermissions({
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
  // getConnectionURI
  // ============================================================================

  describe("getConnectionURI", () => {
    it("can get connection URI", async () => {
      const proj = getProj();
      const result = await runEffect(
        getConnectionURI({
          project_id: proj.id,
          role_name: "neondb_owner",
          database_name: "neondb",
        }),
      );

      expect(result).toBeDefined();
      expect(result.uri).toBeDefined();
      expect(result.uri).toContain("postgresql://");
    });

    it("returns NotFound for non-existent project", async () => {
      const error = await runEffect(
        getConnectionURI({
          project_id: NON_EXISTENT_PROJECT,
          role_name: "test",
          database_name: "test",
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
  // createProject & deleteProject
  // ============================================================================

  describe("createProject & deleteProject", () => {
    it("can create and delete a project", async () => {
      const projectName = `distilled-test-create-${Date.now()}`;
      let createdProjectId: string | null = null;

      try {
        // Create project
        const created = await runEffect(
          createProject({
            project: {
              name: projectName,
            },
          }),
        );

        createdProjectId = created.project.id;
        expect(created.project.name).toBe(projectName);
        expect(created.project.id).toBeDefined();
        expect(created.branch).toBeDefined();

        // Verify project exists
        const fetched = await runEffect(
          getProject({
            project_id: createdProjectId,
          }),
        );
        expect(fetched.project.id).toBe(createdProjectId);
      } finally {
        // Always cleanup
        if (createdProjectId) {
          await runEffect(
            deleteProject({
              project_id: createdProjectId,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 120000); // 2 minute timeout

    it("returns NotFound for deleting non-existent project", async () => {
      const error = await runEffect(
        deleteProject({
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
});
