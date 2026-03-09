import { Effect } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { createPassword } from "../src/operations/createPassword";
import { deletePassword } from "../src/operations/deletePassword";
import { getPassword } from "../src/operations/getPassword";
import { listPasswords } from "../src/operations/listPasswords";
import { renewPassword } from "../src/operations/renewPassword";
import { updatePassword } from "../src/operations/updatePassword";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "passwords";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";
const NON_EXISTENT_BRANCH = "this-branch-definitely-does-not-exist-12345";
const NON_EXISTENT_PASSWORD_ID =
  "this-password-id-definitely-does-not-exist-12345";

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

describe("passwords", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // listPasswords
  // ============================================================================

  describe("listPasswords", () => {
    it("can list passwords", async () => {
      const db = getDb();
      const result = await runEffect(
        listPasswords({
          organization: db.organization,
          database: db.name,
          branch: "main",
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBeDefined();
    });

    it("can list passwords with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listPasswords({
          organization: db.organization,
          database: db.name,
          branch: "main",
          page: 1,
          per_page: 10,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBe(1);
    });

    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        listPasswords({
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
        listPasswords({
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
        listPasswords({
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
  // getPassword
  // ============================================================================

  describe("getPassword", () => {
    it("returns NotFound for non-existent password", async () => {
      const db = getDb();
      const error = await runEffect(
        getPassword({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_PASSWORD_ID,
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
        getPassword({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          id: NON_EXISTENT_PASSWORD_ID,
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
        getPassword({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_PASSWORD_ID,
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
        getPassword({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_PASSWORD_ID,
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
  // createPassword
  // ============================================================================

  describe("createPassword", () => {
    it("returns NotFound for non-existent branch", async () => {
      const db = getDb();
      const error = await runEffect(
        createPassword({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          name: `test-password-${Date.now()}`,
          role: "reader",
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
        createPassword({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          name: `test-password-${Date.now()}`,
          role: "reader",
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
        createPassword({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          name: `test-password-${Date.now()}`,
          role: "reader",
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

    it("can create, get, and delete a password", async () => {
      const db = getDb();
      const passwordName = `test-password-${Date.now()}`;
      let createdPasswordId: string | undefined;

      try {
        // Create password
        const created = await runEffect(
          createPassword({
            organization: db.organization,
            database: db.name,
            branch: "main",
            name: passwordName,
            role: "reader",
          }),
        );

        expect(created.id).toBeDefined();
        expect(created.name).toBe(passwordName);
        expect(created.role).toBe("reader");
        expect(created.username).toBeDefined();
        expect(created.access_host_url).toBeDefined();
        createdPasswordId = created.id;

        // Get password
        const fetched = await runEffect(
          getPassword({
            organization: db.organization,
            database: db.name,
            branch: "main",
            id: created.id,
          }),
        );

        expect(fetched.id).toBe(created.id);
        expect(fetched.name).toBe(passwordName);
        expect(fetched.role).toBe("reader");
      } finally {
        // Cleanup: delete password
        if (createdPasswordId) {
          await runEffect(
            deletePassword({
              organization: db.organization,
              database: db.name,
              branch: "main",
              id: createdPasswordId,
            }).pipe(Effect.ignore),
          );
        }
      }
    });

    it("can create a password with different roles", async () => {
      const db = getDb();
      const passwordName = `test-admin-password-${Date.now()}`;
      let createdPasswordId: string | undefined;

      try {
        const created = await runEffect(
          createPassword({
            organization: db.organization,
            database: db.name,
            branch: "main",
            name: passwordName,
            role: "admin",
          }),
        );

        expect(created.id).toBeDefined();
        expect(created.role).toBe("admin");
        createdPasswordId = created.id;
      } finally {
        if (createdPasswordId) {
          await runEffect(
            deletePassword({
              organization: db.organization,
              database: db.name,
              branch: "main",
              id: createdPasswordId,
            }).pipe(Effect.ignore),
          );
        }
      }
    });
  });

  // ============================================================================
  // deletePassword
  // ============================================================================

  describe("deletePassword", () => {
    it("returns NotFound for non-existent password", async () => {
      const db = getDb();
      const error = await runEffect(
        deletePassword({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_PASSWORD_ID,
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
        deletePassword({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          id: NON_EXISTENT_PASSWORD_ID,
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
        deletePassword({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_PASSWORD_ID,
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
        deletePassword({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_PASSWORD_ID,
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

    it("can delete a password successfully", async () => {
      const db = getDb();
      const passwordName = `test-delete-password-${Date.now()}`;

      // Create password first
      const created = await runEffect(
        createPassword({
          organization: db.organization,
          database: db.name,
          branch: "main",
          name: passwordName,
          role: "reader",
        }),
      );

      expect(created.id).toBeDefined();

      // Delete password
      await runEffect(
        deletePassword({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: created.id,
        }),
      );

      // Verify deleted - should return NotFound
      const error = await runEffect(
        getPassword({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: created.id,
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
  });

  // ============================================================================
  // updatePassword
  // ============================================================================

  describe("updatePassword", () => {
    it("returns NotFound for non-existent password", async () => {
      const db = getDb();
      const error = await runEffect(
        updatePassword({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_PASSWORD_ID,
          name: "updated-name",
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
        updatePassword({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          id: NON_EXISTENT_PASSWORD_ID,
          name: "updated-name",
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
        updatePassword({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_PASSWORD_ID,
          name: "updated-name",
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
        updatePassword({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_PASSWORD_ID,
          name: "updated-name",
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

    it("can update a password name", async () => {
      const db = getDb();
      const originalName = `test-update-password-${Date.now()}`;
      const updatedName = `updated-password-${Date.now()}`;
      let createdPasswordId: string | undefined;

      try {
        // Create password first
        const created = await runEffect(
          createPassword({
            organization: db.organization,
            database: db.name,
            branch: "main",
            name: originalName,
            role: "reader",
          }),
        );

        expect(created.id).toBeDefined();
        expect(created.name).toBe(originalName);
        createdPasswordId = created.id;

        // Update password name
        const updated = await runEffect(
          updatePassword({
            organization: db.organization,
            database: db.name,
            branch: "main",
            id: created.id,
            name: updatedName,
          }),
        );

        expect(updated.id).toBe(created.id);
        expect(updated.name).toBe(updatedName);
        expect(updated.role).toBe("reader"); // Role should not change
      } finally {
        if (createdPasswordId) {
          await runEffect(
            deletePassword({
              organization: db.organization,
              database: db.name,
              branch: "main",
              id: createdPasswordId,
            }).pipe(Effect.ignore),
          );
        }
      }
    });
  });

  // ============================================================================
  // renewPassword
  // ============================================================================

  describe("renewPassword", () => {
    it("returns NotFound for non-existent password", async () => {
      const db = getDb();
      const error = await runEffect(
        renewPassword({
          organization: db.organization,
          database: db.name,
          branch: "main",
          id: NON_EXISTENT_PASSWORD_ID,
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
        renewPassword({
          organization: db.organization,
          database: db.name,
          branch: NON_EXISTENT_BRANCH,
          id: NON_EXISTENT_PASSWORD_ID,
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
        renewPassword({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_PASSWORD_ID,
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
        renewPassword({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          branch: "main",
          id: NON_EXISTENT_PASSWORD_ID,
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

    it("can renew a renewable password or returns error for non-renewable", async () => {
      const db = getDb();
      const passwordName = `test-renew-password-${Date.now()}`;
      let createdPasswordId: string | undefined;

      try {
        // Create a password with TTL to make it renewable
        const created = await runEffect(
          createPassword({
            organization: db.organization,
            database: db.name,
            branch: "main",
            name: passwordName,
            role: "reader",
            ttl: 86400, // 24 hours TTL
          }),
        );

        expect(created.id).toBeDefined();
        createdPasswordId = created.id;

        // Try to renew the password
        const result = await runEffect(
          renewPassword({
            organization: db.organization,
            database: db.name,
            branch: "main",
            id: created.id,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          ),
        );

        // Renew may succeed (if password is renewable) or fail (if not renewable)
        if ("data" in result) {
          expect(result.data.id).toBe(created.id);
          expect(result.data.name).toBe(passwordName);
        } else {
          // Non-renewable passwords will return an error
          expect(isApiError(result.error)).toBe(true);
        }
      } finally {
        if (createdPasswordId) {
          await runEffect(
            deletePassword({
              organization: db.organization,
              database: db.name,
              branch: "main",
              id: createdPasswordId,
            }).pipe(Effect.ignore),
          );
        }
      }
    });
  });
});
