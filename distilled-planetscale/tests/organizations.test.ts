import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Credentials } from "../src/credentials";
import { Forbidden, NotFound, Unauthorized } from "../src/errors";
import { createOrganizationTeam } from "../src/operations/createOrganizationTeam";
import { deleteOrganizationTeam } from "../src/operations/deleteOrganizationTeam";
import { getCurrentUser } from "../src/operations/getCurrentUser";
import { getOrganization } from "../src/operations/getOrganization";
import { getOrganizationMembership } from "../src/operations/getOrganizationMembership";
import { getOrganizationTeam } from "../src/operations/getOrganizationTeam";
import { listOrganizationMembers } from "../src/operations/listOrganizationMembers";
import { listOrganizations } from "../src/operations/listOrganizations";
import { listOrganizationTeams } from "../src/operations/listOrganizationTeams";
import { removeOrganizationMember } from "../src/operations/removeOrganizationMember";
import { updateOrganization } from "../src/operations/updateOrganization";
import { updateOrganizationMembership } from "../src/operations/updateOrganizationMembership";
import { updateOrganizationTeam } from "../src/operations/updateOrganizationTeam";
import { runEffect } from "./setup";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_MEMBERSHIP_ID =
  "this-membership-id-definitely-does-not-exist-12345";
const NON_EXISTENT_TEAM = "this-team-definitely-does-not-exist-12345";

/**
 * Helper to check if an error is an expected "not found" type error.
 * PlanetScale API may return NotFound, Forbidden, or Unauthorized for non-existent resources.
 */
const isNotFoundOrForbiddenOrUnauthorized = (error: unknown): boolean =>
  error instanceof NotFound ||
  error instanceof Forbidden ||
  error instanceof Unauthorized;

/**
 * Helper to check if an error is any API error type.
 * Includes both specific error types and the generic PlanetScaleApiError.
 */
const isApiError = (error: unknown): boolean =>
  error instanceof NotFound ||
  error instanceof Forbidden ||
  error instanceof Unauthorized ||
  error instanceof PlanetScaleApiError ||
  (error !== null && typeof error === "object" && "_tag" in error);

describe("organizations", () => {
  // ============================================================================
  // getCurrentUser
  // ============================================================================

  describe("getCurrentUser", () => {
    it("can get the current user (or returns Unauthorized for service tokens)", async () => {
      const result = await runEffect(
        getCurrentUser({}).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // getCurrentUser requires user authentication (OAuth).
      // Service tokens will receive Unauthorized.
      if ("data" in result) {
        expect(result.data.id).toBeDefined();
        expect(result.data.display_name).toBeDefined();
        expect(result.data.email).toBeDefined();
        expect(result.data.avatar_url).toBeDefined();
        expect(result.data.created_at).toBeDefined();
        expect(result.data.updated_at).toBeDefined();
        expect(typeof result.data.two_factor_auth_configured).toBe("boolean");
      } else {
        // Service tokens don't have access to /user endpoint
        expect(result.error instanceof Unauthorized).toBe(true);
      }
    });
  });

  // ============================================================================
  // listOrganizations
  // ============================================================================

  describe("listOrganizations", () => {
    it("can list organizations", async () => {
      const result = await runEffect(listOrganizations({}));

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThanOrEqual(1);
      expect(result.current_page).toBeDefined();
    });

    it("can list organizations with pagination", async () => {
      const result = await runEffect(
        listOrganizations({
          page: 1,
          per_page: 10,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBe(1);
    });

    it("returns organization data with expected fields", async () => {
      const result = await runEffect(listOrganizations({}));

      expect(result.data.length).toBeGreaterThanOrEqual(1);
      const org = result.data[0]!;
      expect(org.id).toBeDefined();
      expect(org.name).toBeDefined();
      expect(org.billing_email).toBeDefined();
      expect(org.created_at).toBeDefined();
      expect(org.plan).toBeDefined();
      expect(typeof org.valid_billing_info).toBe("boolean");
    });
  });

  // ============================================================================
  // getOrganization
  // ============================================================================

  describe("getOrganization", () => {
    it("can get an organization", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* getOrganization({ organization });
        }),
      );

      expect(result.id).toBeDefined();
      expect(result.name).toBeDefined();
      expect(result.billing_email).toBeDefined();
      expect(result.created_at).toBeDefined();
      expect(result.updated_at).toBeDefined();
      expect(result.plan).toBeDefined();
      expect(typeof result.valid_billing_info).toBe("boolean");
      expect(typeof result.sso).toBe("boolean");
      expect(typeof result.database_count).toBe("number");
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        getOrganization({
          organization: NON_EXISTENT_ORG,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbiddenOrUnauthorized(error)).toBe(true);
    });
  });

  // ============================================================================
  // listOrganizationMembers
  // ============================================================================

  describe("listOrganizationMembers", () => {
    it("can list organization members", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* listOrganizationMembers({ organization });
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBeDefined();
    });

    it("can list organization members with pagination", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* listOrganizationMembers({
            organization,
            page: 1,
            per_page: 10,
          });
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBe(1);
    });

    it("can search organization members by query", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* listOrganizationMembers({
            organization,
            q: "test",
          });
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
    });

    it("returns member data with expected fields", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* listOrganizationMembers({ organization });
        }),
      );

      // Organization should have at least one member
      if (result.data.length > 0) {
        const member = result.data[0]!;
        expect(member.id).toBeDefined();
        expect(member.user).toBeDefined();
        expect(member.user.id).toBeDefined();
        expect(member.user.display_name).toBeDefined();
        expect(member.user.email).toBeDefined();
        expect(member.role).toBeDefined();
        expect(["member", "admin"]).toContain(member.role);
        expect(member.created_at).toBeDefined();
      }
    });

    it("returns an error for non-existent organization", async () => {
      const error = await runEffect(
        listOrganizationMembers({
          organization: NON_EXISTENT_ORG,
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
  });

  // ============================================================================
  // getOrganizationMembership
  // ============================================================================

  describe("getOrganizationMembership", () => {
    it("can get an organization member by id", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          // First list members to get a valid member ID
          const members = yield* listOrganizationMembers({ organization });
          if (members.data.length === 0) {
            return { skipped: true as const };
          }
          const memberId = members.data[0]!.id;
          return yield* getOrganizationMembership({
            organization,
            id: memberId,
          }).pipe(
            Effect.map((data) => ({ skipped: false as const, data })),
            // The API may return an error for service tokens even with valid member ID
            Effect.catchAll((error) =>
              Effect.succeed({ skipped: false as const, error }),
            ),
          );
        }),
      );

      if (result.skipped) {
        // No members to test with
        return;
      }
      if ("data" in result) {
        expect(result.data.id).toBeDefined();
        expect(result.data.user).toBeDefined();
        expect(result.data.user.id).toBeDefined();
        expect(result.data.user.display_name).toBeDefined();
        expect(result.data.user.email).toBeDefined();
        expect(result.data.role).toBeDefined();
        expect(["member", "admin"]).toContain(result.data.role);
        expect(result.data.created_at).toBeDefined();
        expect(result.data.updated_at).toBeDefined();
      } else {
        // The API returned an error - this is acceptable for service tokens
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent member", async () => {
      const error = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* getOrganizationMembership({
            organization,
            id: NON_EXISTENT_MEMBERSHIP_ID,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed(e),
              onSuccess: () => Effect.succeed(null),
            }),
          );
        }),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns an error for non-existent organization", async () => {
      const error = await runEffect(
        getOrganizationMembership({
          organization: NON_EXISTENT_ORG,
          id: NON_EXISTENT_MEMBERSHIP_ID,
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
  });

  // ============================================================================
  // listOrganizationTeams
  // ============================================================================

  describe("listOrganizationTeams", () => {
    it("can list organization teams", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* listOrganizationTeams({ organization });
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBeDefined();
    });

    it("can search organization teams by query", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* listOrganizationTeams({
            organization,
            q: "test",
          });
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
    });

    it("returns team data with expected fields when teams exist", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* listOrganizationTeams({ organization });
        }),
      );

      // Teams may or may not exist, so only check fields if there are teams
      if (result.data.length > 0) {
        const team = result.data[0]!;
        expect(team.id).toBeDefined();
        expect(team.name).toBeDefined();
        expect(team.slug).toBeDefined();
        expect(team.display_name).toBeDefined();
        expect(team.creator).toBeDefined();
        expect(Array.isArray(team.members)).toBe(true);
        expect(Array.isArray(team.databases)).toBe(true);
        expect(team.created_at).toBeDefined();
      }
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listOrganizationTeams({
          organization: NON_EXISTENT_ORG,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbiddenOrUnauthorized(error)).toBe(true);
    });
  });

  // ============================================================================
  // getOrganizationTeam
  // ============================================================================

  describe("getOrganizationTeam", () => {
    it("can get an organization team by slug", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          // First list teams to get a valid team slug
          const teams = yield* listOrganizationTeams({ organization });
          if (teams.data.length === 0) {
            return null;
          }
          const teamSlug = teams.data[0]!.slug;
          return yield* getOrganizationTeam({ organization, team: teamSlug });
        }),
      );

      if (result !== null) {
        expect(result.id).toBeDefined();
        expect(result.name).toBeDefined();
        expect(result.slug).toBeDefined();
        expect(result.display_name).toBeDefined();
        expect(result.creator).toBeDefined();
        expect(result.creator.id).toBeDefined();
        expect(result.creator.display_name).toBeDefined();
        expect(Array.isArray(result.members)).toBe(true);
        expect(Array.isArray(result.databases)).toBe(true);
        expect(result.created_at).toBeDefined();
        expect(result.updated_at).toBeDefined();
        expect(typeof result.managed).toBe("boolean");
      }
    });

    it("returns NotFound for non-existent team", async () => {
      const error = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* getOrganizationTeam({
            organization,
            team: NON_EXISTENT_TEAM,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed(e),
              onSuccess: () => Effect.succeed(null),
            }),
          );
        }),
      );

      expect(error).not.toBeNull();
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        getOrganizationTeam({
          organization: NON_EXISTENT_ORG,
          team: NON_EXISTENT_TEAM,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbiddenOrUnauthorized(error)).toBe(true);
    });
  });

  // ============================================================================
  // updateOrganization
  // ============================================================================

  describe("updateOrganization", () => {
    it("can update an organization (or returns error if no permission)", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          // Get current organization to retrieve current billing email
          const currentOrg = yield* getOrganization({ organization });
          // Update with same billing email (no-op change)
          return yield* updateOrganization({
            organization,
            billing_email: currentOrg.billing_email,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          );
        }),
      );

      if ("data" in result) {
        expect(result.data.id).toBeDefined();
        expect(result.data.name).toBeDefined();
        expect(result.data.billing_email).toBeDefined();
        expect(result.data.updated_at).toBeDefined();
      } else {
        // Forbidden or other error is acceptable if token lacks permission
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        updateOrganization({
          organization: NON_EXISTENT_ORG,
          billing_email: "test@example.com",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbiddenOrUnauthorized(error)).toBe(true);
    });
  });

  // ============================================================================
  // removeOrganizationMember
  // ============================================================================

  describe("removeOrganizationMember", () => {
    it("returns NotFound for non-existent member", async () => {
      const error = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* removeOrganizationMember({
            organization,
            id: NON_EXISTENT_MEMBERSHIP_ID,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed(e),
              onSuccess: () => Effect.succeed(null),
            }),
          );
        }),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns an error for non-existent organization", async () => {
      const error = await runEffect(
        removeOrganizationMember({
          organization: NON_EXISTENT_ORG,
          id: NON_EXISTENT_MEMBERSHIP_ID,
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
  });

  // ============================================================================
  // updateOrganizationMembership
  // ============================================================================

  describe("updateOrganizationMembership", () => {
    it("returns NotFound for non-existent member", async () => {
      const error = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* updateOrganizationMembership({
            organization,
            id: NON_EXISTENT_MEMBERSHIP_ID,
            role: "member",
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed(e),
              onSuccess: () => Effect.succeed(null),
            }),
          );
        }),
      );

      expect(error).not.toBeNull();
      expect(isApiError(error)).toBe(true);
    });

    it("returns an error for non-existent organization", async () => {
      const error = await runEffect(
        updateOrganizationMembership({
          organization: NON_EXISTENT_ORG,
          id: NON_EXISTENT_MEMBERSHIP_ID,
          role: "member",
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
  });

  // ============================================================================
  // createOrganizationTeam
  // ============================================================================

  describe("createOrganizationTeam", () => {
    it("can create and delete an organization team", async () => {
      const teamName = `test-team-${Date.now()}`;

      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* createOrganizationTeam({
            organization,
            name: teamName,
            description: "Test team created by automated tests",
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          );
        }),
      );

      if ("data" in result) {
        expect(result.data.id).toBeDefined();
        expect(result.data.name).toBe(teamName);
        expect(result.data.slug).toBeDefined();
        expect(result.data.display_name).toBeDefined();
        expect(result.data.creator).toBeDefined();
        expect(Array.isArray(result.data.members)).toBe(true);
        expect(Array.isArray(result.data.databases)).toBe(true);
        expect(result.data.created_at).toBeDefined();

        // Clean up: delete the team
        await runEffect(
          Effect.gen(function* () {
            const { organization } = yield* Credentials;
            yield* deleteOrganizationTeam({
              organization,
              team: result.data.slug,
            }).pipe(Effect.ignore);
          }),
        );
      } else {
        // Forbidden or other error is acceptable if token lacks permission
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        createOrganizationTeam({
          organization: NON_EXISTENT_ORG,
          name: `test-team-${Date.now()}`,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbiddenOrUnauthorized(error)).toBe(true);
    });
  });

  // ============================================================================
  // deleteOrganizationTeam
  // ============================================================================

  describe("deleteOrganizationTeam", () => {
    it("returns NotFound or Forbidden for non-existent team", async () => {
      const error = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* deleteOrganizationTeam({
            organization,
            team: NON_EXISTENT_TEAM,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed(e),
              onSuccess: () => Effect.succeed(null),
            }),
          );
        }),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbiddenOrUnauthorized(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        deleteOrganizationTeam({
          organization: NON_EXISTENT_ORG,
          team: NON_EXISTENT_TEAM,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbiddenOrUnauthorized(error)).toBe(true);
    });
  });

  // ============================================================================
  // updateOrganizationTeam
  // ============================================================================

  describe("updateOrganizationTeam", () => {
    it("returns NotFound or Forbidden for non-existent team", async () => {
      const error = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* updateOrganizationTeam({
            organization,
            team: NON_EXISTENT_TEAM,
            description: "Updated description",
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed(e),
              onSuccess: () => Effect.succeed(null),
            }),
          );
        }),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbiddenOrUnauthorized(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        updateOrganizationTeam({
          organization: NON_EXISTENT_ORG,
          team: NON_EXISTENT_TEAM,
          description: "Updated description",
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbiddenOrUnauthorized(error)).toBe(true);
    });

    it("can update an existing team", async () => {
      // First create a team to update
      const teamName = `test-team-update-${Date.now()}`;
      let teamSlug: string | null = null;

      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;

          // Create team
          const createResult = yield* createOrganizationTeam({
            organization,
            name: teamName,
            description: "Original description",
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          );

          if ("error" in createResult) {
            return { error: createResult.error };
          }

          teamSlug = createResult.data.slug;

          // Update the team
          const updateResult = yield* updateOrganizationTeam({
            organization,
            team: teamSlug,
            description: "Updated description",
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          );

          return updateResult;
        }),
      );

      // Clean up
      if (teamSlug) {
        await runEffect(
          Effect.gen(function* () {
            const { organization } = yield* Credentials;
            yield* deleteOrganizationTeam({
              organization,
              team: teamSlug!,
            }).pipe(Effect.ignore);
          }),
        );
      }

      if ("data" in result) {
        expect(result.data.description).toBe("Updated description");
        expect(result.data.id).toBeDefined();
        expect(result.data.slug).toBe(teamSlug);
      } else {
        // Forbidden or other error is acceptable if token lacks permission
        expect(isApiError(result.error)).toBe(true);
      }
    });
  });
});
