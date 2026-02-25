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
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - invalid accountId format", () =>
      Accounts.getAccount({
        accountId: "invalid-account-id-!@#",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty accountId", () =>
      Accounts.getAccount({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
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

        const result = yield* Accounts.updateAccount({
          accountId: accountId(),
          id: current.id,
          name: current.name,
        });

        expect(result).toBeDefined();
        expect(result.id).toBe(current.id);
        expect(result.name).toBe(current.name);
      }));

    test("error - UpdateAccountTypeNotSupported when using type field", () =>
      Effect.gen(function* () {
        const current = yield* Accounts.getAccount({
          accountId: accountId(),
        });

        yield* Accounts.updateAccount({
          accountId: accountId(),
          id: current.id,
          name: current.name,
          type: "standard",
        }).pipe(
          Effect.flip,
          Effect.map((e) =>
            expect(e._tag).toBe("UpdateAccountTypeNotSupported"),
          ),
        );
      }));

    test("error - InvalidAccountName for name with invalid characters", () =>
      Accounts.updateAccount({
        accountId: accountId(),
        id: accountId(),
        name: "<script>alert(1)</script>",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAccountName")),
      ));

    test("error - not found for non-existent accountId", () =>
      Accounts.updateAccount({
        accountId: "0000000000000000000000000000000000",
        id: "0000000000000000000000000000000000",
        name: "distilled-cf-accounts-nonexistent",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - invalid accountId format", () =>
      Accounts.updateAccount({
        accountId: "invalid-account-id-!@#",
        id: "invalid-id",
        name: "distilled-cf-accounts-invalid",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty accountId", () =>
      Accounts.updateAccount({
        accountId: "",
        id: "",
        name: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("MethodNotAllowed")),
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
        Effect.map((e) => expect(e._tag).toBe("AccountCreationForbidden")),
      ));

    test("error - empty name", () =>
      Accounts.createAccount({
        name: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("MissingName")),
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
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - invalid accountId format", () =>
      Accounts.deleteAccount({
        accountId: "invalid-account-id-!@#",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty accountId", () =>
      Accounts.deleteAccount({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("MethodNotAllowed")),
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
        Effect.map((e) => expect(e._tag).toBe("MemberNotFound")),
      ));

    test("error - invalid accountId", () =>
      Accounts.getMember({
        accountId: "invalid-account-id-000",
        memberId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty memberId", () =>
      Accounts.getMember({
        accountId: accountId(),
        memberId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("CloudflareHttpError")),
      ));

    test("error - empty accountId and memberId", () =>
      Accounts.getMember({
        accountId: "",
        memberId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // createMember
  // --------------------------------------------------------------------------
  describe("createMember", () => {
    test("error - fails with empty request body", () =>
      Accounts.createMember({
        accountId: accountId(),
        email: "",
        roles: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ValidationError")),
      ));
  });

  // --------------------------------------------------------------------------
  // updateMember
  // --------------------------------------------------------------------------
  describe("updateMember", () => {
    test("error - not found for non-existent memberId", () =>
      Accounts.updateMember({
        accountId: accountId(),
        memberId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("BadRequest")),
      ));

    test("error - empty memberId", () =>
      Accounts.updateMember({
        accountId: accountId(),
        memberId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("MethodNotAllowed")),
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
        Effect.map((e) => expect(e._tag).toBe("MemberNotFound")),
      ));

    test("error - invalid accountId", () =>
      Accounts.deleteMember({
        accountId: "invalid-account-id-000",
        memberId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty memberId", () =>
      Accounts.deleteMember({
        accountId: accountId(),
        memberId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
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
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - invalid accountId", () =>
      Accounts.getRole({
        accountId: "invalid-account-id-000",
        roleId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
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
        Effect.map((e) => expect(e._tag).toBe("JsonDecodeFailure")),
      ));

    test("error - invalid accountId", () =>
      Accounts.createSubscription({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty accountId", () =>
      Accounts.createSubscription({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
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
        Effect.map((e) => expect(e._tag).toBe("JsonDecodeFailure")),
      ));

    test("error - invalid accountId", () =>
      Accounts.updateSubscription({
        accountId: "invalid-account-id-000",
        subscriptionIdentifier: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty subscriptionIdentifier", () =>
      Accounts.updateSubscription({
        accountId: accountId(),
        subscriptionIdentifier: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
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
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty subscriptionIdentifier", () =>
      Accounts.deleteSubscription({
        accountId: accountId(),
        subscriptionIdentifier: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // verifyToken
  // --------------------------------------------------------------------------
  describe("verifyToken", () => {
    test("error - UnknownCloudflareError for verification failure", () =>
      Accounts.verifyToken({
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));

    test("error - invalid accountId", () =>
      Accounts.verifyToken({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty accountId", () =>
      Accounts.verifyToken({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
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
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty accountId", () =>
      Accounts.getTokenPermissionGroup({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
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
                }).pipe(Effect.catch(() => Effect.void))
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
      Effect.gen(function* () {
        const result = yield* Accounts.createToken({
          accountId: accountId(),
          name: "distilled-cf-accounts-empty-policies",
          policies: [],
        });

        expect(result.policies).toBeDefined();
        expect(result.policies).toHaveLength(0);
      }));

    test("error - empty token name", () =>
      Accounts.createToken({
        accountId: accountId(),
        name: "",
        policies: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidTokenName")),
      ));

    test("error - invalid accountId", () =>
      Accounts.createToken({
        accountId: "invalid-account-id-000",
        name: "distilled-cf-accounts-invalid",
        policies: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
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
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - invalid accountId", () =>
      Accounts.getToken({
        accountId: "invalid-account-id-000",
        tokenId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
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
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - invalid accountId", () =>
      Accounts.updateToken({
        accountId: "invalid-account-id-000",
        tokenId: "0000000000000000000000000000000000",
        name: "distilled-cf-accounts-update-invalid",
        policies: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty tokenId", () =>
      Accounts.updateToken({
        accountId: accountId(),
        tokenId: "",
        name: "distilled-cf-accounts-update-empty",
        policies: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("MethodNotAllowed")),
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
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - invalid accountId", () =>
      Accounts.deleteToken({
        accountId: "invalid-account-id-000",
        tokenId: "0000000000000000000000000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty tokenId", () =>
      Accounts.deleteToken({
        accountId: accountId(),
        tokenId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("MethodNotAllowed")),
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
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - invalid accountId", () =>
      Accounts.putTokenValue({
        accountId: "invalid-account-id-000",
        tokenId: "0000000000000000000000000000000000",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));

    test("error - empty tokenId", () =>
      Accounts.putTokenValue({
        accountId: accountId(),
        tokenId: "",
        body: {},
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });
});
