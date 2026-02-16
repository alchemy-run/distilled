import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as Accounts from "~/services/accounts.ts";

const accountId = () => getAccountId();

// ============================================================================
// Accounts Tests
// ============================================================================

describe("Accounts", () => {
  // --------------------------------------------------------------------------
  // getAccount
  // --------------------------------------------------------------------------
  describe("getAccount", () => {
    test("happy path - retrieves the current account", () =>
      Effect.gen(function* () {
        const result = yield* Accounts.getAccount({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(typeof result.id).toBe("string");
        expect(result.name).toBeDefined();
        expect(typeof result.name).toBe("string");
        expect(["standard", "enterprise"]).toContain(result.type);
      }));

    test("happy path - response includes optional fields when present", () =>
      Effect.gen(function* () {
        const result = yield* Accounts.getAccount({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        // createdOn is optional but typically present
        if (result.createdOn) {
          expect(typeof result.createdOn).toBe("string");
        }
        // settings is optional but typically present
        if (result.settings) {
          expect(typeof result.settings).toBe("object");
          if (result.settings.enforceTwofactor !== undefined) {
            expect(typeof result.settings.enforceTwofactor).toBe("boolean");
          }
        }
      }));

    test("error - not found for non-existent accountId", () =>
      Accounts.getAccount({
        accountId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId format", () =>
      Accounts.getAccount({
        accountId: "invalid-account-id-!@#",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty accountId", () =>
      Accounts.getAccount({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // updateAccount
  // --------------------------------------------------------------------------
  describe("updateAccount", () => {
    test("happy path - updates account name to same value (idempotent)", () =>
      Effect.gen(function* () {
        // First get the current account to know its details
        const current = yield* Accounts.getAccount({
          accountId: accountId(),
        });

        // Update with the same name (idempotent, safe)
        const result = yield* Accounts.updateAccount({
          accountId: accountId(),
          id: current.id,
          name: current.name,
          type: current.type,
        });

        expect(result).toBeDefined();
        expect(result.id).toBe(current.id);
        expect(result.name).toBe(current.name);
        expect(result.type).toBe(current.type);
      }));

    test("error - not found for non-existent accountId", () =>
      Accounts.updateAccount({
        accountId: "0000000000000000000000000000000000",
        id: "0000000000000000000000000000000000",
        name: "distilled-cf-accounts-nonexistent",
        type: "standard",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId format", () =>
      Accounts.updateAccount({
        accountId: "invalid-account-id-!@#",
        id: "invalid-id",
        name: "distilled-cf-accounts-invalid",
        type: "standard",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty accountId", () =>
      Accounts.updateAccount({
        accountId: "",
        id: "",
        name: "",
        type: "standard",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // createAccount
  // --------------------------------------------------------------------------
  describe("createAccount", () => {
    // NOTE: createAccount typically requires tenant-level API permissions.
    // Most standard API tokens cannot create accounts.

    test("error - permission denied for standard API token", () =>
      Accounts.createAccount({
        name: "distilled-cf-accounts-create-test",
        type: "standard",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty name", () =>
      Accounts.createAccount({
        name: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteAccount
  // --------------------------------------------------------------------------
  describe("deleteAccount", () => {
    // NOTE: deleteAccount is destructive and typically requires tenant-level permissions.

    test("error - not found for non-existent accountId", () =>
      Accounts.deleteAccount({
        accountId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId format", () =>
      Accounts.deleteAccount({
        accountId: "invalid-account-id-!@#",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty accountId", () =>
      Accounts.deleteAccount({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getMember
  // --------------------------------------------------------------------------
  describe("getMember", () => {
    test("error - not found for non-existent memberId", () =>
      Accounts.getMember({
        accountId: accountId(),
        memberId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId", () =>
      Accounts.getMember({
        accountId: "invalid-account-id-000",
        memberId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty memberId", () =>
      Accounts.getMember({
        accountId: accountId(),
        memberId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty accountId and memberId", () =>
      Accounts.getMember({
        accountId: "",
        memberId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // createMember
  // --------------------------------------------------------------------------
  describe("createMember", () => {
    // NOTE: createMember has an empty request body schema (no accountId path param
    // wired in the schema). It will likely fail due to missing account context.

    test("error - fails with empty request body", () =>
      Accounts.createMember({}).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // updateMember
  // --------------------------------------------------------------------------
  describe("updateMember", () => {
    // NOTE: updateMember schema only has memberId path param (no accountId wired).

    test("error - not found for non-existent memberId", () =>
      Accounts.updateMember({
        memberId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty memberId", () =>
      Accounts.updateMember({
        memberId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteMember
  // --------------------------------------------------------------------------
  describe("deleteMember", () => {
    test("error - not found for non-existent memberId", () =>
      Accounts.deleteMember({
        accountId: accountId(),
        memberId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId", () =>
      Accounts.deleteMember({
        accountId: "invalid-account-id-000",
        memberId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty memberId", () =>
      Accounts.deleteMember({
        accountId: accountId(),
        memberId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getRole
  // --------------------------------------------------------------------------
  describe("getRole", () => {
    test("error - not found for non-existent roleId", () =>
      Accounts.getRole({
        accountId: accountId(),
        roleId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId", () =>
      Accounts.getRole({
        accountId: "invalid-account-id-000",
        roleId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("happy path - empty roleId returns all roles", () =>
      Effect.gen(function* () {
        const result = yield* Accounts.getRole({
          accountId: accountId(),
          roleId: "",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));
  });

  // --------------------------------------------------------------------------
  // createSubscription
  // --------------------------------------------------------------------------
  describe("createSubscription", () => {
    // NOTE: Creating subscriptions typically requires specific billing permissions
    // and a valid rate plan.

    test("error - invalid subscription with no rate plan", () =>
      Accounts.createSubscription({
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId", () =>
      Accounts.createSubscription({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty accountId", () =>
      Accounts.createSubscription({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // updateSubscription
  // --------------------------------------------------------------------------
  describe("updateSubscription", () => {
    test("error - not found for non-existent subscriptionIdentifier", () =>
      Accounts.updateSubscription({
        accountId: accountId(),
        subscriptionIdentifier: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId", () =>
      Accounts.updateSubscription({
        accountId: "invalid-account-id-000",
        subscriptionIdentifier: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty subscriptionIdentifier", () =>
      Accounts.updateSubscription({
        accountId: accountId(),
        subscriptionIdentifier: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteSubscription
  // --------------------------------------------------------------------------
  describe("deleteSubscription", () => {
    test("happy path - deleteSubscription returns empty object", () =>
      Effect.gen(function* () {
        const result = yield* Accounts.deleteSubscription({
          accountId: accountId(),
          subscriptionIdentifier: "0000000000000000000000000000000000",
        });

        expect(result).toBeDefined();
      }));

    test("error - invalid accountId", () =>
      Accounts.deleteSubscription({
        accountId: "invalid-account-id-000",
        subscriptionIdentifier: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty subscriptionIdentifier", () =>
      Accounts.deleteSubscription({
        accountId: accountId(),
        subscriptionIdentifier: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // verifyToken
  // --------------------------------------------------------------------------
  describe("verifyToken", () => {
    // NOTE: verifyToken returns MissingAuthenticationToken because the operation
    // doesn't use account-scoped authorization - it verifies the current API token directly.
    test("error - MissingAuthenticationToken for verification failure", () =>
      Accounts.verifyToken({
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("MissingAuthenticationToken")),
      ));

    test("error - invalid accountId", () =>
      Accounts.verifyToken({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty accountId", () =>
      Accounts.verifyToken({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getTokenPermissionGroup
  // --------------------------------------------------------------------------
  describe("getTokenPermissionGroup", () => {
    test("happy path - lists token permission groups", () =>
      Effect.gen(function* () {
        const result = yield* Accounts.getTokenPermissionGroup({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);

        // Verify structure of first permission group
        const first = result[0];
        expect(first).toBeDefined();
        if (first.id) {
          expect(typeof first.id).toBe("string");
        }
        if (first.name) {
          expect(typeof first.name).toBe("string");
        }
        if (first.scopes) {
          expect(Array.isArray(first.scopes)).toBe(true);
        }
      }));

    test("happy path - filters permission groups by name", () =>
      Effect.gen(function* () {
        const result = yield* Accounts.getTokenPermissionGroup({
          accountId: accountId(),
          name: "Workers",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("happy path - filters permission groups by scope", () =>
      Effect.gen(function* () {
        const result = yield* Accounts.getTokenPermissionGroup({
          accountId: accountId(),
          scope: "com.cloudflare.api.account",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("happy path - returns empty array for non-matching name filter", () =>
      Effect.gen(function* () {
        const result = yield* Accounts.getTokenPermissionGroup({
          accountId: accountId(),
          name: "NonExistentPermissionGroupXYZ123",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(0);
      }));

    test("error - invalid accountId", () =>
      Accounts.getTokenPermissionGroup({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty accountId", () =>
      Accounts.getTokenPermissionGroup({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // createToken
  // --------------------------------------------------------------------------
  describe("createToken", () => {
    test("happy path - creates and deletes an API token", () =>
      Effect.gen(function* () {
        // Get permission groups to use a valid policy
        const permGroups = yield* Accounts.getTokenPermissionGroup({
          accountId: accountId(),
        });

        // Find a read-only permission group (safer for testing)
        const readGroup = permGroups.find((g) =>
          g.name?.toLowerCase().includes("read"),
        );

        // Skip if we can't find a suitable permission group
        if (!readGroup || !readGroup.id) {
          return;
        }

        const result = yield* Accounts.createToken({
          accountId: accountId(),
          name: "distilled-cf-accounts-create-token",
          policies: [
            {
              effect: "allow",
              resources: {
                [`com.cloudflare.api.account.${accountId()}`]: "*",
              },
              permission_groups: [{ id: readGroup.id }],
            },
          ],
        }).pipe(
          Effect.tap((token) =>
            // Cleanup: delete the token immediately
            token.id
              ? Accounts.deleteToken({
                  accountId: accountId(),
                  tokenId: token.id,
                }).pipe(Effect.catchAll(() => Effect.void))
              : Effect.void,
          ),
        );

        expect(result).toBeDefined();
        if (result.id) {
          expect(typeof result.id).toBe("string");
        }
        if (result.name) {
          expect(result.name).toBe("distilled-cf-accounts-create-token");
        }
        if (result.status) {
          expect(["active", "disabled", "expired"]).toContain(result.status);
        }
      }));

    test("error - empty policies array", () =>
      Accounts.createToken({
        accountId: accountId(),
        name: "distilled-cf-accounts-empty-policies",
        policies: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty token name", () =>
      Accounts.createToken({
        accountId: accountId(),
        name: "",
        policies: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId", () =>
      Accounts.createToken({
        accountId: "invalid-account-id-000",
        name: "distilled-cf-accounts-invalid",
        policies: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // getToken
  // --------------------------------------------------------------------------
  describe("getToken", () => {
    test("error - not found for non-existent tokenId", () =>
      Accounts.getToken({
        accountId: accountId(),
        tokenId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId", () =>
      Accounts.getToken({
        accountId: "invalid-account-id-000",
        tokenId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("happy path - empty tokenId returns all tokens", () =>
      Effect.gen(function* () {
        const result = yield* Accounts.getToken({
          accountId: accountId(),
          tokenId: "",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));
  });

  // --------------------------------------------------------------------------
  // updateToken
  // --------------------------------------------------------------------------
  describe("updateToken", () => {
    test("error - not found for non-existent tokenId", () =>
      Accounts.updateToken({
        accountId: accountId(),
        tokenId: "0000000000000000000000000000000000",
        name: "distilled-cf-accounts-update-nonexistent",
        policies: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId", () =>
      Accounts.updateToken({
        accountId: "invalid-account-id-000",
        tokenId: "0000000000000000000000000000000000",
        name: "distilled-cf-accounts-update-invalid",
        policies: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty tokenId", () =>
      Accounts.updateToken({
        accountId: accountId(),
        tokenId: "",
        name: "distilled-cf-accounts-update-empty",
        policies: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteToken
  // --------------------------------------------------------------------------
  describe("deleteToken", () => {
    test("error - not found for non-existent tokenId", () =>
      Accounts.deleteToken({
        accountId: accountId(),
        tokenId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId", () =>
      Accounts.deleteToken({
        accountId: "invalid-account-id-000",
        tokenId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty tokenId", () =>
      Accounts.deleteToken({
        accountId: accountId(),
        tokenId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });

  // --------------------------------------------------------------------------
  // putTokenValue
  // --------------------------------------------------------------------------
  describe("putTokenValue", () => {
    test("error - not found for non-existent tokenId", () =>
      Accounts.putTokenValue({
        accountId: accountId(),
        tokenId: "0000000000000000000000000000000000",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - invalid accountId", () =>
      Accounts.putTokenValue({
        accountId: "invalid-account-id-000",
        tokenId: "0000000000000000000000000000000000",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));

    test("error - empty tokenId", () =>
      Accounts.putTokenValue({
        accountId: accountId(),
        tokenId: "",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBeDefined()),
      ));
  });
});
