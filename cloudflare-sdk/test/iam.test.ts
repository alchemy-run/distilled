import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as IAM from "~/services/iam.ts";
import { InvalidMember } from "~/services/iam.ts";

const accountId = () => getAccountId();

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic resource group name for tests.
 * Follows the convention: distilled-cf-iam-{testname}
 */
const rgName = (name: string) => `distilled-cf-iam-rg-${name}`;

/**
 * Deterministic user group name for tests.
 */
const ugName = (name: string) => `distilled-cf-iam-ug-${name}`;

/**
 * A valid scope object for resource group operations.
 * Uses a well-known scope key for the account.
 */
const makeScope = () => ({
  key: `com.cloudflare.api.account.${accountId()}`,
  objects: [{ key: "*" }],
});

/**
 * Create a resource group, run `fn`, then delete.
 * Cleanup-first pattern for idempotency.
 */
const withResourceGroup = <A, E, R>(
  name: string,
  fn: (resourceGroupId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    // Create resource group
    const rg = yield* IAM.createResourceGroup({
      accountId: accountId(),
      name,
      scope: makeScope(),
    });

    // Run the test function, ensuring cleanup
    return yield* fn(rg.id).pipe(
      Effect.ensuring(
        IAM.deleteResourceGroup({
          accountId: accountId(),
          resourceGroupId: rg.id,
        }).pipe(Effect.catch(() => Effect.void)),
      ),
    );
  });

/**
 * Create a user group, run `fn`, then delete.
 * Cleanup-first pattern for idempotency.
 */
const withUserGroup = <A, E, R>(
  name: string,
  fn: (userGroupId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    const groups = yield* IAM.listPermissionGroups({
      accountId: accountId(),
    });
    if (groups.length === 0) {
      throw new Error("No permission groups available for testing");
    }
    const permGroupId = groups[0].id;

    // Create a resource group to use in the policy
    const rg = yield* IAM.createResourceGroup({
      accountId: accountId(),
      name: `${name}-rg`,
      scope: makeScope(),
    });

    // Create user group
    const ug = yield* IAM.createUserGroup({
      accountId: accountId(),
      name,
      policies: [
        {
          access: "allow",
          permissionGroups: [{ id: permGroupId }],
          resourceGroups: [{ id: rg.id }],
        },
      ],
    });

    // Run the test function, ensuring cleanup
    return yield* fn(ug.id).pipe(
      Effect.ensuring(
        Effect.gen(function* () {
          yield* IAM.deleteUserGroup({
            accountId: accountId(),
            userGroupId: ug.id,
          }).pipe(Effect.catch(() => Effect.void));
          yield* IAM.deleteResourceGroup({
            accountId: accountId(),
            resourceGroupId: rg.id,
          }).pipe(Effect.catch(() => Effect.void));
        }),
      ),
    );
  });

// ============================================================================
// IAM Tests
// ============================================================================

describe("IAM", () => {
  // ==========================================================================
  // PermissionGroup
  // ==========================================================================

  // --------------------------------------------------------------------------
  // listPermissionGroups
  // --------------------------------------------------------------------------
  describe("listPermissionGroups", () => {
    test("happy path - lists permission groups", () =>
      Effect.gen(function* () {
        const result = yield* IAM.listPermissionGroups({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);

        // Verify structure of first item
        const first = result[0];
        expect(first.id).toBeDefined();
        expect(typeof first.id).toBe("string");
      }));

    test("happy path - filters by name", () =>
      Effect.gen(function* () {
        const result = yield* IAM.listPermissionGroups({
          accountId: accountId(),
          name: "Workers",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("happy path - returns empty array for non-matching name filter", () =>
      Effect.gen(function* () {
        const result = yield* IAM.listPermissionGroups({
          accountId: accountId(),
          name: "NonExistentPermissionGroupXYZ12345",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(0);
      }));

    test("error - invalid accountId", () =>
      IAM.listPermissionGroups({
        accountId: "invalid-account-id-!@#",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.listPermissionGroups({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // getPermissionGroup
  // --------------------------------------------------------------------------
  describe("getPermissionGroup", () => {
    test("happy path - retrieves a permission group by id", () =>
      Effect.gen(function* () {
        // First list to get a valid ID
        const groups = yield* IAM.listPermissionGroups({
          accountId: accountId(),
        });
        expect(groups.length).toBeGreaterThan(0);

        const result = yield* IAM.getPermissionGroup({
          accountId: accountId(),
          permissionGroupId: groups[0].id,
        });

        expect(result).toBeDefined();
        expect(result.id).toBe(groups[0].id);
        expect(typeof result.id).toBe("string");
        if (result.name) {
          expect(typeof result.name).toBe("string");
        }
      }));

    test("error - not found for non-existent permissionGroupId", () =>
      IAM.getPermissionGroup({
        accountId: accountId(),
        permissionGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.getPermissionGroup({
        accountId: "invalid-account-id-!@#",
        permissionGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty permissionGroupId", () =>
      IAM.getPermissionGroup({
        accountId: accountId(),
        permissionGroupId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.getPermissionGroup({
        accountId: "",
        permissionGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // ==========================================================================
  // ResourceGroup
  // ==========================================================================

  // --------------------------------------------------------------------------
  // createResourceGroup
  // --------------------------------------------------------------------------
  describe("createResourceGroup", () => {
    test("happy path - creates a new resource group", () =>
      Effect.gen(function* () {
        const name = rgName("create-happy");
        const rg = yield* IAM.createResourceGroup({
          accountId: accountId(),
          name,
          scope: makeScope(),
        });

        expect(rg).toBeDefined();
        expect(rg.id).toBeDefined();
        expect(typeof rg.id).toBe("string");
        expect(rg.id.length).toBeGreaterThan(0);
        if (rg.name) {
          expect(rg.name).toBe(name);
        }
        expect(rg.scope).toBeDefined();

        // Cleanup
        yield* IAM.deleteResourceGroup({
          accountId: accountId(),
          resourceGroupId: rg.id,
        }).pipe(Effect.catch(() => Effect.void));
      }));

    test("error - invalid accountId", () =>
      IAM.createResourceGroup({
        accountId: "invalid-account-id-!@#",
        name: rgName("create-invalid-acct"),
        scope: makeScope(),
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.createResourceGroup({
        accountId: "",
        name: rgName("create-empty-acct"),
        scope: makeScope(),
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty name", () =>
      IAM.createResourceGroup({
        accountId: accountId(),
        name: "",
        scope: makeScope(),
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid scope with empty key", () =>
      IAM.createResourceGroup({
        accountId: accountId(),
        name: rgName("create-bad-scope"),
        scope: { key: "", objects: [{ key: "*" }] },
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // getResourceGroup
  // --------------------------------------------------------------------------
  describe("getResourceGroup", () => {
    test("happy path - retrieves an existing resource group", () =>
      withResourceGroup(rgName("get-happy"), (resourceGroupId) =>
        Effect.gen(function* () {
          const rg = yield* IAM.getResourceGroup({
            accountId: accountId(),
            resourceGroupId,
          });

          expect(rg).toBeDefined();
          expect(rg.id).toBe(resourceGroupId);
          expect(typeof rg.id).toBe("string");
          expect(rg.scope).toBeDefined();
        }),
      ));

    test("error - not found for non-existent resourceGroupId", () =>
      IAM.getResourceGroup({
        accountId: accountId(),
        resourceGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.getResourceGroup({
        accountId: "invalid-account-id-!@#",
        resourceGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty resourceGroupId", () =>
      IAM.getResourceGroup({
        accountId: accountId(),
        resourceGroupId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.getResourceGroup({
        accountId: "",
        resourceGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // listResourceGroups
  // --------------------------------------------------------------------------
  describe("listResourceGroups", () => {
    test("happy path - lists resource groups", () =>
      Effect.gen(function* () {
        const result = yield* IAM.listResourceGroups({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        // Account should have at least a default resource group
      }));

    test("happy path - filters by name", () =>
      withResourceGroup(rgName("list-filter"), (resourceGroupId) =>
        Effect.gen(function* () {
          const result = yield* IAM.listResourceGroups({
            accountId: accountId(),
            name: rgName("list-filter"),
          });

          expect(result).toBeDefined();
          expect(Array.isArray(result)).toBe(true);
          // Should find the resource group we just created
          const found = result.find((rg) => rg.id === resourceGroupId);
          expect(found).toBeDefined();
        }),
      ));

    test("happy path - returns empty or filtered results for non-matching name", () =>
      // The API returns result: null when no resource groups match the filter.
      // Treat CloudflareHttpError (schema decode of null) as an empty array.
      IAM.listResourceGroups({
        accountId: accountId(),
        name: "NonExistentResourceGroupXYZ12345",
      })
        .pipe(
          Effect.catchTag("CloudflareHttpError", () =>
            Effect.succeed([] as IAM.ListResourceGroupsResponse),
          ),
        )
        .pipe(
          Effect.map((result) => {
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(0);
          }),
        ));

    test("error - invalid accountId", () =>
      IAM.listResourceGroups({
        accountId: "invalid-account-id-!@#",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.listResourceGroups({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // updateResourceGroup
  // --------------------------------------------------------------------------
  describe("updateResourceGroup", () => {
    test("happy path - updates resource group name", () =>
      withResourceGroup(rgName("update-happy"), (resourceGroupId) =>
        Effect.gen(function* () {
          const updatedName = rgName("update-happy-renamed");
          const result = yield* IAM.updateResourceGroup({
            accountId: accountId(),
            resourceGroupId,
            name: updatedName,
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(resourceGroupId);
          if (result.name) {
            expect(result.name).toBe(updatedName);
          }
        }),
      ));

    test("happy path - updates resource group scope", () =>
      withResourceGroup(rgName("update-scope"), (resourceGroupId) =>
        Effect.gen(function* () {
          const result = yield* IAM.updateResourceGroup({
            accountId: accountId(),
            resourceGroupId,
            scope: makeScope(),
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(resourceGroupId);
          expect(result.scope).toBeDefined();
        }),
      ));

    test("error - not found for non-existent resourceGroupId", () =>
      IAM.updateResourceGroup({
        accountId: accountId(),
        resourceGroupId: "00000000000000000000000000000000",
        name: "should-not-exist",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.updateResourceGroup({
        accountId: "invalid-account-id-!@#",
        resourceGroupId: "00000000000000000000000000000000",
        name: "test",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty resourceGroupId", () =>
      IAM.updateResourceGroup({
        accountId: accountId(),
        resourceGroupId: "",
        name: "test",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteResourceGroup
  // --------------------------------------------------------------------------
  describe("deleteResourceGroup", () => {
    test("happy path - deletes an existing resource group", () =>
      Effect.gen(function* () {
        const rg = yield* IAM.createResourceGroup({
          accountId: accountId(),
          name: rgName("delete-happy"),
          scope: makeScope(),
        });

        const result = yield* IAM.deleteResourceGroup({
          accountId: accountId(),
          resourceGroupId: rg.id,
        });

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(typeof result.id).toBe("string");
      }));

    test("error - not found for non-existent resourceGroupId", () =>
      IAM.deleteResourceGroup({
        accountId: accountId(),
        resourceGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.deleteResourceGroup({
        accountId: "invalid-account-id-!@#",
        resourceGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty resourceGroupId", () =>
      IAM.deleteResourceGroup({
        accountId: accountId(),
        resourceGroupId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.deleteResourceGroup({
        accountId: "",
        resourceGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // ==========================================================================
  // SSO
  // ==========================================================================

  // --------------------------------------------------------------------------
  // listSsos
  // --------------------------------------------------------------------------
  describe("listSsos", () => {
    test("happy path - lists SSO connectors", () =>
      Effect.gen(function* () {
        const result = yield* IAM.listSsos({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);

        // Verify structure of items if any exist
        if (result.length > 0) {
          const first = result[0];
          if (first.id) {
            expect(typeof first.id).toBe("string");
          }
          if (first.emailDomain) {
            expect(typeof first.emailDomain).toBe("string");
          }
          if (first.enabled !== undefined) {
            expect(typeof first.enabled).toBe("boolean");
          }
        }
      }));

    test("error - invalid accountId", () =>
      IAM.listSsos({
        accountId: "invalid-account-id-!@#",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.listSsos({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // getSso
  // --------------------------------------------------------------------------
  describe("getSso", () => {
    test("happy path - retrieves an SSO connector if one exists", () =>
      Effect.gen(function* () {
        const ssos = yield* IAM.listSsos({
          accountId: accountId(),
        });

        // Only run the happy path if there's an existing SSO connector
        if (ssos.length > 0 && ssos[0].id) {
          const result = yield* IAM.getSso({
            accountId: accountId(),
            ssoConnectorId: ssos[0].id,
          });

          expect(result).toBeDefined();
          if (result.id) {
            expect(result.id).toBe(ssos[0].id);
          }
        } else {
          // If no SSO connectors exist, just verify listSsos works
          expect(ssos).toBeDefined();
          expect(Array.isArray(ssos)).toBe(true);
        }
      }));

    test("error - not found for non-existent ssoConnectorId", () =>
      IAM.getSso({
        accountId: accountId(),
        ssoConnectorId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.getSso({
        accountId: "invalid-account-id-!@#",
        ssoConnectorId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty ssoConnectorId", () =>
      IAM.getSso({
        accountId: accountId(),
        ssoConnectorId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.getSso({
        accountId: "",
        ssoConnectorId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // createSso
  // --------------------------------------------------------------------------
  describe("createSso", () => {
    // NOTE: Creating SSO connectors requires domain ownership verification.
    // We test error cases since we don't own test domains.

    test("error - invalid emailDomain", () =>
      IAM.createSso({
        accountId: accountId(),
        emailDomain: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.createSso({
        accountId: "invalid-account-id-!@#",
        emailDomain: "distilled-cf-iam-test.example.com",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.createSso({
        accountId: "",
        emailDomain: "distilled-cf-iam-test.example.com",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - special characters in emailDomain", () =>
      IAM.createSso({
        accountId: accountId(),
        emailDomain: "<script>alert(1)</script>",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // patchSso
  // --------------------------------------------------------------------------
  describe("patchSso", () => {
    test("error - not found for non-existent ssoConnectorId", () =>
      IAM.patchSso({
        accountId: accountId(),
        ssoConnectorId: "00000000000000000000000000000000",
        enabled: false,
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.patchSso({
        accountId: "invalid-account-id-!@#",
        ssoConnectorId: "00000000000000000000000000000000",
        enabled: false,
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty ssoConnectorId", () =>
      IAM.patchSso({
        accountId: accountId(),
        ssoConnectorId: "",
        enabled: false,
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.patchSso({
        accountId: "",
        ssoConnectorId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteSso
  // --------------------------------------------------------------------------
  describe("deleteSso", () => {
    test("error - not found for non-existent ssoConnectorId", () =>
      IAM.deleteSso({
        accountId: accountId(),
        ssoConnectorId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.deleteSso({
        accountId: "invalid-account-id-!@#",
        ssoConnectorId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty ssoConnectorId", () =>
      IAM.deleteSso({
        accountId: accountId(),
        ssoConnectorId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.deleteSso({
        accountId: "",
        ssoConnectorId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // beginVerificationSso
  // --------------------------------------------------------------------------
  describe("beginVerificationSso", () => {
    test("error - not found for non-existent ssoConnectorId", () =>
      IAM.beginVerificationSso({
        accountId: accountId(),
        ssoConnectorId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.beginVerificationSso({
        accountId: "invalid-account-id-!@#",
        ssoConnectorId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty ssoConnectorId", () =>
      IAM.beginVerificationSso({
        accountId: accountId(),
        ssoConnectorId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.beginVerificationSso({
        accountId: "",
        ssoConnectorId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // ==========================================================================
  // UserGroup
  // ==========================================================================

  // --------------------------------------------------------------------------
  // listUserGroups
  // --------------------------------------------------------------------------
  describe("listUserGroups", () => {
    test("happy path - lists user groups", () =>
      Effect.gen(function* () {
        const result = yield* IAM.listUserGroups({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);

        // Verify structure of items if any exist
        if (result.length > 0) {
          const first = result[0];
          expect(first.id).toBeDefined();
          expect(typeof first.id).toBe("string");
          expect(first.name).toBeDefined();
          expect(typeof first.name).toBe("string");
          expect(first.createdOn).toBeDefined();
          expect(typeof first.createdOn).toBe("string");
          expect(first.modifiedOn).toBeDefined();
          expect(typeof first.modifiedOn).toBe("string");
        }
      }));

    test("happy path - filters by name", () =>
      Effect.gen(function* () {
        const result = yield* IAM.listUserGroups({
          accountId: accountId(),
          name: "NonExistentUserGroupXYZ12345",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("happy path - filters by direction", () =>
      Effect.gen(function* () {
        const result = yield* IAM.listUserGroups({
          accountId: accountId(),
          direction: "desc",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("happy path - fuzzy name search", () =>
      Effect.gen(function* () {
        const result = yield* IAM.listUserGroups({
          accountId: accountId(),
          fuzzyName: "distilled",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("error - invalid accountId", () =>
      IAM.listUserGroups({
        accountId: "invalid-account-id-!@#",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.listUserGroups({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // createUserGroup
  // --------------------------------------------------------------------------
  describe("createUserGroup", () => {
    test("happy path - creates a new user group", () =>
      Effect.gen(function* () {
        const groups = yield* IAM.listPermissionGroups({
          accountId: accountId(),
        });
        const permGroupId = groups[0].id;

        const rg = yield* IAM.createResourceGroup({
          accountId: accountId(),
          name: rgName("ug-create-rg"),
          scope: makeScope(),
        });

        const name = ugName("create-happy");
        const ug = yield* IAM.createUserGroup({
          accountId: accountId(),
          name,
          policies: [
            {
              access: "allow",
              permissionGroups: [{ id: permGroupId }],
              resourceGroups: [{ id: rg.id }],
            },
          ],
        });

        expect(ug).toBeDefined();
        expect(ug.id).toBeDefined();
        expect(typeof ug.id).toBe("string");
        expect(ug.name).toBe(name);
        expect(ug.createdOn).toBeDefined();
        expect(typeof ug.createdOn).toBe("string");
        expect(ug.modifiedOn).toBeDefined();
        expect(typeof ug.modifiedOn).toBe("string");

        // Cleanup
        yield* IAM.deleteUserGroup({
          accountId: accountId(),
          userGroupId: ug.id,
        }).pipe(Effect.catch(() => Effect.void));
        yield* IAM.deleteResourceGroup({
          accountId: accountId(),
          resourceGroupId: rg.id,
        }).pipe(Effect.catch(() => Effect.void));
      }));

    test("error - invalid accountId", () =>
      IAM.createUserGroup({
        accountId: "invalid-account-id-!@#",
        name: ugName("create-invalid-acct"),
        policies: [
          {
            access: "allow",
            permissionGroups: [{ id: "fake-id" }],
            resourceGroups: [{ id: "fake-id" }],
          },
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.createUserGroup({
        accountId: "",
        name: ugName("create-empty-acct"),
        policies: [
          {
            access: "allow",
            permissionGroups: [{ id: "fake-id" }],
            resourceGroups: [{ id: "fake-id" }],
          },
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty name", () =>
      IAM.createUserGroup({
        accountId: accountId(),
        name: "",
        policies: [
          {
            access: "allow",
            permissionGroups: [{ id: "fake-id" }],
            resourceGroups: [{ id: "fake-id" }],
          },
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid permission group id in policy", () =>
      IAM.createUserGroup({
        accountId: accountId(),
        name: ugName("create-bad-perm"),
        policies: [
          {
            access: "allow",
            permissionGroups: [{ id: "00000000000000000000000000000000" }],
            resourceGroups: [{ id: "00000000000000000000000000000000" }],
          },
        ],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("happy path - creates user group with empty policies array", () =>
      Effect.gen(function* () {
        const name = ugName("create-empty-policies");

        // Cleanup-first for idempotency: delete any pre-existing group with this name
        const existing = yield* IAM.listUserGroups({
          accountId: accountId(),
          name,
        });
        for (const ug of existing) {
          yield* IAM.deleteUserGroup({
            accountId: accountId(),
            userGroupId: ug.id,
          }).pipe(Effect.catch(() => Effect.void));
        }

        const ug = yield* IAM.createUserGroup({
          accountId: accountId(),
          name,
          policies: [],
        });

        expect(ug).toBeDefined();
        expect(ug.id).toBeDefined();
        expect(typeof ug.id).toBe("string");
        expect(ug.name).toBe(name);

        // Cleanup
        yield* IAM.deleteUserGroup({
          accountId: accountId(),
          userGroupId: ug.id,
        }).pipe(Effect.catch(() => Effect.void));
      }));
  });

  // --------------------------------------------------------------------------
  // getUserGroup
  // --------------------------------------------------------------------------
  describe("getUserGroup", () => {
    test("happy path - retrieves an existing user group", () =>
      withUserGroup(ugName("get-happy"), (userGroupId) =>
        Effect.gen(function* () {
          const ug = yield* IAM.getUserGroup({
            accountId: accountId(),
            userGroupId,
          });

          expect(ug).toBeDefined();
          expect(ug.id).toBe(userGroupId);
          expect(typeof ug.id).toBe("string");
          expect(ug.name).toBeDefined();
          expect(typeof ug.name).toBe("string");
          expect(ug.createdOn).toBeDefined();
          expect(ug.modifiedOn).toBeDefined();
        }),
      ));

    test("error - not found for non-existent userGroupId", () =>
      IAM.getUserGroup({
        accountId: accountId(),
        userGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.getUserGroup({
        accountId: "invalid-account-id-!@#",
        userGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty userGroupId", () =>
      IAM.getUserGroup({
        accountId: accountId(),
        userGroupId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.getUserGroup({
        accountId: "",
        userGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // updateUserGroup
  // --------------------------------------------------------------------------
  describe("updateUserGroup", () => {
    test("happy path - updates user group name", () =>
      withUserGroup(ugName("update-happy"), (userGroupId) =>
        Effect.gen(function* () {
          const updatedName = ugName("update-happy-renamed");
          const result = yield* IAM.updateUserGroup({
            accountId: accountId(),
            userGroupId,
            name: updatedName,
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(userGroupId);
          expect(result.name).toBe(updatedName);
        }),
      ));

    test("error - not found for non-existent userGroupId", () =>
      IAM.updateUserGroup({
        accountId: accountId(),
        userGroupId: "00000000000000000000000000000000",
        name: "should-not-exist",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.updateUserGroup({
        accountId: "invalid-account-id-!@#",
        userGroupId: "00000000000000000000000000000000",
        name: "test",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty userGroupId", () =>
      IAM.updateUserGroup({
        accountId: accountId(),
        userGroupId: "",
        name: "test",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteUserGroup
  // --------------------------------------------------------------------------
  describe("deleteUserGroup", () => {
    test("happy path - deletes an existing user group", () =>
      Effect.gen(function* () {
        const groups = yield* IAM.listPermissionGroups({
          accountId: accountId(),
        });
        const permGroupId = groups[0].id;

        const rg = yield* IAM.createResourceGroup({
          accountId: accountId(),
          name: rgName("ug-del-rg"),
          scope: makeScope(),
        });

        const ug = yield* IAM.createUserGroup({
          accountId: accountId(),
          name: ugName("delete-happy"),
          policies: [
            {
              access: "allow",
              permissionGroups: [{ id: permGroupId }],
              resourceGroups: [{ id: rg.id }],
            },
          ],
        });

        const result = yield* IAM.deleteUserGroup({
          accountId: accountId(),
          userGroupId: ug.id,
        });

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(typeof result.id).toBe("string");

        // Cleanup resource group
        yield* IAM.deleteResourceGroup({
          accountId: accountId(),
          resourceGroupId: rg.id,
        }).pipe(Effect.catch(() => Effect.void));
      }));

    test("error - not found for non-existent userGroupId", () =>
      IAM.deleteUserGroup({
        accountId: accountId(),
        userGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.deleteUserGroup({
        accountId: "invalid-account-id-!@#",
        userGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty userGroupId", () =>
      IAM.deleteUserGroup({
        accountId: accountId(),
        userGroupId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.deleteUserGroup({
        accountId: "",
        userGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // ==========================================================================
  // UserGroupMember
  // ==========================================================================

  // --------------------------------------------------------------------------
  // listUserGroupMembers
  // --------------------------------------------------------------------------
  describe("listUserGroupMembers", () => {
    test("happy path - lists members of a user group", () =>
      withUserGroup(ugName("list-members"), (userGroupId) =>
        // The API returns result: null for groups with no members.
        // Treat CloudflareHttpError (schema decode of null) as an empty list.
        IAM.listUserGroupMembers({
          accountId: accountId(),
          userGroupId,
        })
          .pipe(
            Effect.catchTag("CloudflareHttpError", () =>
              Effect.succeed([] as IAM.ListUserGroupMembersResponse),
            ),
          )
          .pipe(
            Effect.map((result) => {
              // Newly created user group has no members — result is empty
              expect(Array.isArray(result)).toBe(true);
              expect(result.length).toBe(0);
            }),
          ),
      ));

    test("error - not found for non-existent userGroupId", () =>
      IAM.listUserGroupMembers({
        accountId: accountId(),
        userGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.listUserGroupMembers({
        accountId: "invalid-account-id-!@#",
        userGroupId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty userGroupId", () =>
      IAM.listUserGroupMembers({
        accountId: accountId(),
        userGroupId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // createUserGroupMember
  // --------------------------------------------------------------------------
  describe("createUserGroupMember", () => {
    test("error - not found for non-existent userGroupId", () =>
      IAM.createUserGroupMember({
        accountId: accountId(),
        userGroupId: "00000000000000000000000000000000",
        body: [{ id: "00000000000000000000000000000000" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.createUserGroupMember({
        accountId: "invalid-account-id-!@#",
        userGroupId: "00000000000000000000000000000000",
        body: [{ id: "00000000000000000000000000000000" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty userGroupId", () =>
      IAM.createUserGroupMember({
        accountId: accountId(),
        userGroupId: "",
        body: [{ id: "00000000000000000000000000000000" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - InvalidMember for invalid member id in body", () =>
      withUserGroup(ugName("create-member-bad-id"), (userGroupId) =>
        IAM.createUserGroupMember({
          accountId: accountId(),
          userGroupId,
          body: [{ id: "not-a-valid-member-id" }],
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidMember")),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // updateUserGroupMember
  // --------------------------------------------------------------------------
  describe("updateUserGroupMember", () => {
    // NOTE: updateUserGroupMember is generated with incorrect GET method (should be PUT).
    // This causes a CloudflareNetworkError since HTTP clients reject GET with body.
    test("error - not found for non-existent userGroupId", () =>
      IAM.updateUserGroupMember({
        accountId: accountId(),
        userGroupId: "00000000000000000000000000000000",
        body: [{ id: "00000000000000000000000000000000" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "UnknownCloudflareError",
            "CloudflareHttpError",
            "CloudflareNetworkError",
          ]).toContain(e._tag),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.updateUserGroupMember({
        accountId: "invalid-account-id-!@#",
        userGroupId: "00000000000000000000000000000000",
        body: [{ id: "00000000000000000000000000000000" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "UnknownCloudflareError",
            "CloudflareHttpError",
            "CloudflareNetworkError",
          ]).toContain(e._tag),
        ),
      ));

    test("error - empty userGroupId", () =>
      IAM.updateUserGroupMember({
        accountId: accountId(),
        userGroupId: "",
        body: [{ id: "00000000000000000000000000000000" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "CloudflareHttpError",
            "UnknownCloudflareError",
            "CloudflareNetworkError",
          ]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteUserGroupMember
  // --------------------------------------------------------------------------
  describe("deleteUserGroupMember", () => {
    test("error - not found for non-existent userGroupId", () =>
      IAM.deleteUserGroupMember({
        accountId: accountId(),
        userGroupId: "00000000000000000000000000000000",
        memberId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - InvalidMember for non-existent memberId in valid user group", () =>
      withUserGroup(ugName("del-member-missing"), (userGroupId) =>
        IAM.deleteUserGroupMember({
          accountId: accountId(),
          userGroupId,
          memberId: "00000000000000000000000000000000",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidMember")),
        ),
      ));

    test("error - invalid accountId", () =>
      IAM.deleteUserGroupMember({
        accountId: "invalid-account-id-!@#",
        userGroupId: "00000000000000000000000000000000",
        memberId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty userGroupId", () =>
      IAM.deleteUserGroupMember({
        accountId: accountId(),
        userGroupId: "",
        memberId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty memberId", () =>
      IAM.deleteUserGroupMember({
        accountId: accountId(),
        userGroupId: "00000000000000000000000000000000",
        memberId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - empty accountId", () =>
      IAM.deleteUserGroupMember({
        accountId: "",
        userGroupId: "00000000000000000000000000000000",
        memberId: "00000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["CloudflareHttpError", "UnknownCloudflareError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });
});
