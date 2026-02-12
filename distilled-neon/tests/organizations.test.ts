import { Effect } from "effect";
import { describe, expect, it, beforeAll } from "vitest";
import { Forbidden, NotFound, Unauthorized } from "../src/errors";
import { NeonApiError } from "../src/client";
import { getOrganization } from "../src/operations/getOrganization";
import { listOrgApiKeys } from "../src/operations/listOrgApiKeys";
import { getOrganizationMembers } from "../src/operations/getOrganizationMembers";
import { getOrganizationInvitations } from "../src/operations/getOrganizationInvitations";
import { getCurrentUserOrganizations } from "../src/operations/getCurrentUserOrganizations";
import { listProjects } from "../src/operations/listProjects";
import { runEffect } from "./setup";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "org-this-org-definitely-does-not-exist-12345";

/**
 * Helper to check if an error is an expected "not found" type error.
 */
const isNotFoundOrForbidden = (error: unknown): boolean =>
  error instanceof NotFound || error instanceof Forbidden;

/**
 * Helper to check if an error indicates the operation is not allowed
 */
const isNotAllowed = (error: unknown): boolean =>
  error instanceof Forbidden ||
  error instanceof Unauthorized ||
  (error instanceof NeonApiError && error.message.includes("not allowed")) ||
  // Neon returns 404 with "not allowed for organization API keys" message
  (error instanceof NotFound && error.message.includes("not allowed"));

// Store the org ID discovered from projects
let discoveredOrgId: string | null = null;

describe("organizations", () => {
  // Try to discover the organization ID from project listing
  beforeAll(async () => {
    try {
      const result = await runEffect(listProjects({}));
      if (result.projects.length > 0) {
        // Projects may have org_id in their metadata
        const project = result.projects[0]!;
        // Try to extract org_id from project or its metadata
        discoveredOrgId = (project as any).org_id || null;
      }
    } catch {
      // If we can't list projects, we might still have org access
    }

    // If no org_id from projects, try getCurrentUserOrganizations
    if (!discoveredOrgId) {
      try {
        const result = await runEffect(
          getCurrentUserOrganizations({}).pipe(
            Effect.matchEffect({
              onFailure: () => Effect.succeed(null),
              onSuccess: (data) => Effect.succeed(data),
            }),
          ),
        );
        if (result && result.organizations.length > 0) {
          discoveredOrgId = result.organizations[0]!.id;
        }
      } catch {
        // Expected to fail for org API keys
      }
    }
  }, 60000);

  // ============================================================================
  // getCurrentUserOrganizations
  // ============================================================================

  describe("getCurrentUserOrganizations", () => {
    it("can list current user organizations or returns appropriate error for org keys", async () => {
      const result = await runEffect(
        getCurrentUserOrganizations({}).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("error" in result) {
        // Organization API keys cannot access user endpoints
        expect(isNotAllowed(result.error)).toBe(true);
      } else {
        expect(result.data.organizations).toBeDefined();
        expect(Array.isArray(result.data.organizations)).toBe(true);
      }
    });

    it("returns organizations with expected properties when allowed", async () => {
      const result = await runEffect(
        getCurrentUserOrganizations({}).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("error" in result) {
        // Skip for org API keys
        return;
      }

      if (result.data.organizations.length > 0) {
        const org = result.data.organizations[0]!;
        expect(org.id).toBeDefined();
        expect(org.name).toBeDefined();
        expect(org.handle).toBeDefined();
        expect(org.plan).toBeDefined();
        expect(org.created_at).toBeDefined();
      }
    });
  });

  // ============================================================================
  // getOrganization
  // ============================================================================

  describe("getOrganization", () => {
    it("can get organization details when org_id is known", async () => {
      if (!discoveredOrgId) {
        console.warn("No org_id discovered, using placeholder test");
        // Try with a non-existent org to test error handling
        const error = await runEffect(
          getOrganization({
            org_id: NON_EXISTENT_ORG,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed(e),
              onSuccess: () => Effect.succeed(null),
            }),
          ),
        );

        expect(error).not.toBeNull();
        expect(isNotFoundOrForbidden(error)).toBe(true);
        return;
      }

      const result = await runEffect(
        getOrganization({
          org_id: discoveredOrgId,
        }),
      );

      expect(result.id).toBe(discoveredOrgId);
      expect(result.name).toBeDefined();
      expect(result.handle).toBeDefined();
      expect(result.plan).toBeDefined();
      expect(result.created_at).toBeDefined();
    });

    it("returns NotFound for non-existent organization", async () => {
      const error = await runEffect(
        getOrganization({
          org_id: NON_EXISTENT_ORG,
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
  // listOrgApiKeys
  // ============================================================================

  describe("listOrgApiKeys", () => {
    it("can list organization API keys when org_id is known", async () => {
      if (!discoveredOrgId) {
        console.warn("No org_id discovered, skipping test");
        return;
      }

      const result = await runEffect(
        listOrgApiKeys({
          org_id: discoveredOrgId,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("error" in result) {
        // May not have permission to list org API keys
        expect(isNotFoundOrForbidden(result.error) || isNotAllowed(result.error)).toBe(true);
      } else {
        expect(Array.isArray(result.data)).toBe(true);
      }
    });

    it("returns API keys with expected properties when allowed", async () => {
      if (!discoveredOrgId) {
        console.warn("No org_id discovered, skipping test");
        return;
      }

      const result = await runEffect(
        listOrgApiKeys({
          org_id: discoveredOrgId,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("error" in result) {
        return;
      }

      if (result.data.length > 0) {
        const key = result.data[0]!;
        expect(key.id).toBeDefined();
        expect(typeof key.id).toBe("number");
        expect(key.name).toBeDefined();
        expect(key.created_at).toBeDefined();
        expect(key.created_by).toBeDefined();
      }
    });

    it("returns NotFound for non-existent organization", async () => {
      const error = await runEffect(
        listOrgApiKeys({
          org_id: NON_EXISTENT_ORG,
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
  // getOrganizationMembers
  // ============================================================================

  describe("getOrganizationMembers", () => {
    it("can get organization members when org_id is known", async () => {
      if (!discoveredOrgId) {
        console.warn("No org_id discovered, skipping test");
        return;
      }

      const result = await runEffect(
        getOrganizationMembers({
          org_id: discoveredOrgId,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("error" in result) {
        expect(isNotFoundOrForbidden(result.error) || isNotAllowed(result.error)).toBe(true);
      } else {
        expect(result.data.members).toBeDefined();
        expect(Array.isArray(result.data.members)).toBe(true);
      }
    });

    it("returns members with expected properties when allowed", async () => {
      if (!discoveredOrgId) {
        console.warn("No org_id discovered, skipping test");
        return;
      }

      const result = await runEffect(
        getOrganizationMembers({
          org_id: discoveredOrgId,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("error" in result) {
        return;
      }

      if (result.data.members.length > 0) {
        const member = result.data.members[0]!;
        expect(member.member).toBeDefined();
        expect(member.member.id).toBeDefined();
        expect(member.member.user_id).toBeDefined();
        expect(member.member.org_id).toBeDefined();
        expect(member.member.role).toBeDefined();
        expect(member.user).toBeDefined();
        expect(member.user.email).toBeDefined();
      }
    });

    it("returns NotFound for non-existent organization", async () => {
      const error = await runEffect(
        getOrganizationMembers({
          org_id: NON_EXISTENT_ORG,
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
  // getOrganizationInvitations
  // ============================================================================

  describe("getOrganizationInvitations", () => {
    it("can get organization invitations when org_id is known", async () => {
      if (!discoveredOrgId) {
        console.warn("No org_id discovered, skipping test");
        return;
      }

      const result = await runEffect(
        getOrganizationInvitations({
          org_id: discoveredOrgId,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("error" in result) {
        expect(isNotFoundOrForbidden(result.error) || isNotAllowed(result.error)).toBe(true);
      } else {
        expect(result.data.invitations).toBeDefined();
        expect(Array.isArray(result.data.invitations)).toBe(true);
      }
    });

    it("returns NotFound for non-existent organization", async () => {
      const error = await runEffect(
        getOrganizationInvitations({
          org_id: NON_EXISTENT_ORG,
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
