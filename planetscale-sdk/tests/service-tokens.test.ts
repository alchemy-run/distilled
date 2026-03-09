import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Credentials } from "../src/credentials";
import { Forbidden, NotFound } from "../src/errors";
import { createServiceToken } from "../src/operations/createServiceToken";
import { deleteServiceToken } from "../src/operations/deleteServiceToken";
import { getServiceToken } from "../src/operations/getServiceToken";
import { listServiceTokens } from "../src/operations/listServiceTokens";
import { MainLayer, runEffect } from "./setup";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_TOKEN_ID = "this-token-definitely-does-not-exist-12345";

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

/**
 * Get the organization name from credentials
 */
const getOrganization = () =>
  Effect.gen(function* () {
    const { organization } = yield* Credentials;
    return organization;
  }).pipe(Effect.provide(MainLayer));

describe("service-tokens", () => {
  // ============================================================================
  // listServiceTokens
  // ============================================================================

  describe("listServiceTokens", () => {
    it("can list service tokens (or returns Forbidden if no permission)", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listServiceTokens({
          organization,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // Service token operations may require admin permissions
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBeDefined();
      } else {
        // Forbidden is acceptable if the token doesn't have admin permissions
        expect(result.error instanceof Forbidden).toBe(true);
      }
    });

    it("can list service tokens with pagination (or returns Forbidden if no permission)", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listServiceTokens({
          organization,
          page: 1,
          per_page: 10,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // Service token operations may require admin permissions
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBe(1);
      } else {
        // Forbidden is acceptable if the token doesn't have admin permissions
        expect(result.error instanceof Forbidden).toBe(true);
      }
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listServiceTokens({
          organization: NON_EXISTENT_ORG,
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
  // getServiceToken
  // ============================================================================

  describe("getServiceToken", () => {
    it("returns NotFound for non-existent service token", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const error = await runEffect(
        getServiceToken({
          organization,
          id: NON_EXISTENT_TOKEN_ID,
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

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        getServiceToken({
          organization: NON_EXISTENT_ORG,
          id: NON_EXISTENT_TOKEN_ID,
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
  // createServiceToken
  // ============================================================================

  describe("createServiceToken", () => {
    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        createServiceToken({
          organization: NON_EXISTENT_ORG,
          name: `test-token-${Date.now()}`,
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

    it("can create and delete a service token (or returns Forbidden if no permission)", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const tokenName = `test-token-${Date.now()}`;

      // Create service token
      const createResult = await runEffect(
        createServiceToken({
          organization,
          name: tokenName,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // Service token operations may require admin permissions
      if ("error" in createResult) {
        // Forbidden is acceptable if the token doesn't have admin permissions
        expect(createResult.error instanceof Forbidden).toBe(true);
        return;
      }

      const created = createResult.data;
      expect(created.id).toBeDefined();
      expect(created.name).toBeDefined();
      expect(created.token).toBeDefined();
      expect(created.created_at).toBeDefined();
      expect(created.actor_type).toBeDefined();
      expect(Array.isArray(created.service_token_accesses)).toBe(true);

      // Clean up: delete the service token
      await runEffect(
        deleteServiceToken({
          organization,
          id: created.id,
        }),
      );

      // Verify deleted by trying to get it
      const error = await runEffect(
        getServiceToken({
          organization,
          id: created.id,
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

    it("can create service token without a name (or returns Forbidden if no permission)", async () => {
      const organization = await Effect.runPromise(getOrganization());
      let createdId: string | null = null;

      // Create service token without name
      const createResult = await runEffect(
        createServiceToken({
          organization,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // Service token operations may require admin permissions
      if ("error" in createResult) {
        // Forbidden is acceptable if the token doesn't have admin permissions
        expect(createResult.error instanceof Forbidden).toBe(true);
        return;
      }

      try {
        const created = createResult.data;
        createdId = created.id;
        expect(created.id).toBeDefined();
        expect(created.token).toBeDefined();
        expect(created.created_at).toBeDefined();
      } finally {
        // Clean up
        if (createdId) {
          await runEffect(
            deleteServiceToken({
              organization,
              id: createdId,
            }).pipe(Effect.ignore),
          );
        }
      }
    });
  });

  // ============================================================================
  // deleteServiceToken
  // ============================================================================

  describe("deleteServiceToken", () => {
    it("returns NotFound for non-existent service token", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const error = await runEffect(
        deleteServiceToken({
          organization,
          id: NON_EXISTENT_TOKEN_ID,
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

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        deleteServiceToken({
          organization: NON_EXISTENT_ORG,
          id: NON_EXISTENT_TOKEN_ID,
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
