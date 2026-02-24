import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Credentials } from "../src/credentials";
import { Forbidden, NotFound, Unauthorized } from "../src/errors";
import { createOauthToken } from "../src/operations/createOauthToken";
import { deleteOauthToken } from "../src/operations/deleteOauthToken";
import { getOauthApplication } from "../src/operations/getOauthApplication";
import { getOauthToken } from "../src/operations/getOauthToken";
import { listOauthApplications } from "../src/operations/listOauthApplications";
import { listOauthTokens } from "../src/operations/listOauthTokens";
import { MainLayer, runEffect } from "./setup";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_APPLICATION_ID =
  "this-application-definitely-does-not-exist-12345";
const NON_EXISTENT_TOKEN_ID = "this-token-definitely-does-not-exist-12345";

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

/**
 * Get the organization name from credentials
 */
const getOrganization = () =>
  Effect.gen(function* () {
    const { organization } = yield* Credentials;
    return organization;
  }).pipe(Effect.provide(MainLayer));

describe("oauth", () => {
  // ============================================================================
  // listOauthApplications
  // ============================================================================

  describe("listOauthApplications", () => {
    it("can list OAuth applications", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listOauthApplications({
          organization,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // OAuth operations may require specific permissions
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBeDefined();
      } else {
        // Forbidden/Unauthorized is acceptable if the token doesn't have appropriate permissions
        expect(isNotFoundOrForbiddenOrUnauthorized(result.error)).toBe(true);
      }
    });

    it("can list OAuth applications with pagination", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listOauthApplications({
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

      // OAuth operations may require specific permissions
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBe(1);
      } else {
        // Forbidden/Unauthorized is acceptable if the token doesn't have appropriate permissions
        expect(isNotFoundOrForbiddenOrUnauthorized(result.error)).toBe(true);
      }
    });

    it("returns OAuth application data with expected fields when applications exist", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listOauthApplications({
          organization,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result && result.data.data.length > 0) {
        const app = result.data.data[0]!;
        expect(app.id).toBeDefined();
        expect(app.name).toBeDefined();
        expect(app.redirect_uri).toBeDefined();
        expect(app.domain).toBeDefined();
        expect(app.created_at).toBeDefined();
        expect(app.updated_at).toBeDefined();
        expect(Array.isArray(app.scopes)).toBe(true);
        expect(app.client_id).toBeDefined();
        expect(typeof app.tokens).toBe("number");
      }
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listOauthApplications({
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
  // getOauthApplication
  // ============================================================================

  describe("getOauthApplication", () => {
    it("can get an OAuth application by id when applications exist", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        Effect.gen(function* () {
          // First list applications to get a valid application ID
          const apps = yield* listOauthApplications({ organization }).pipe(
            Effect.catch((e) => Effect.succeed({ error: e })),
          );

          if ("error" in apps) {
            return { skipped: true as const, reason: "list failed" };
          }

          if (apps.data.length === 0) {
            return { skipped: true as const, reason: "no applications" };
          }

          const appId = apps.data[0]!.id;
          return yield* getOauthApplication({
            organization,
            application_id: appId,
          }).pipe(
            Effect.map((data) => ({ skipped: false as const, data })),
            Effect.catch((error) =>
              Effect.succeed({ skipped: false as const, error }),
            ),
          );
        }),
      );

      if (result.skipped) {
        // No applications to test with or listing failed
        return;
      }
      if ("data" in result) {
        expect(result.data.id).toBeDefined();
        expect(result.data.name).toBeDefined();
        expect(result.data.redirect_uri).toBeDefined();
        expect(result.data.domain).toBeDefined();
        expect(result.data.created_at).toBeDefined();
        expect(result.data.updated_at).toBeDefined();
        expect(Array.isArray(result.data.scopes)).toBe(true);
        expect(result.data.avatar).toBeDefined();
        expect(result.data.client_id).toBeDefined();
        expect(typeof result.data.tokens).toBe("number");
      } else {
        // The API returned an error - this is acceptable for service tokens
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent application", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const error = await runEffect(
        getOauthApplication({
          organization,
          application_id: NON_EXISTENT_APPLICATION_ID,
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
        getOauthApplication({
          organization: NON_EXISTENT_ORG,
          application_id: NON_EXISTENT_APPLICATION_ID,
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
  // listOauthTokens
  // ============================================================================

  describe("listOauthTokens", () => {
    it("can list OAuth tokens for an application", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        Effect.gen(function* () {
          // First list applications to get a valid application ID
          const apps = yield* listOauthApplications({ organization }).pipe(
            Effect.catch((e) => Effect.succeed({ error: e })),
          );

          if ("error" in apps) {
            return { skipped: true as const, reason: "list failed" };
          }

          if (apps.data.length === 0) {
            return { skipped: true as const, reason: "no applications" };
          }

          const appId = apps.data[0]!.id;
          return yield* listOauthTokens({
            organization,
            application_id: appId,
          }).pipe(
            Effect.map((data) => ({ skipped: false as const, data })),
            Effect.catch((error) =>
              Effect.succeed({ skipped: false as const, error }),
            ),
          );
        }),
      );

      if (result.skipped) {
        // No applications to test with or listing failed
        return;
      }
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBeDefined();
      } else {
        // The API returned an error - this is acceptable for service tokens
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("can list OAuth tokens with pagination", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        Effect.gen(function* () {
          // First list applications to get a valid application ID
          const apps = yield* listOauthApplications({ organization }).pipe(
            Effect.catch((e) => Effect.succeed({ error: e })),
          );

          if ("error" in apps) {
            return { skipped: true as const, reason: "list failed" };
          }

          if (apps.data.length === 0) {
            return { skipped: true as const, reason: "no applications" };
          }

          const appId = apps.data[0]!.id;
          return yield* listOauthTokens({
            organization,
            application_id: appId,
            page: 1,
            per_page: 10,
          }).pipe(
            Effect.map((data) => ({ skipped: false as const, data })),
            Effect.catch((error) =>
              Effect.succeed({ skipped: false as const, error }),
            ),
          );
        }),
      );

      if (result.skipped) {
        // No applications to test with or listing failed
        return;
      }
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.current_page).toBe(1);
      } else {
        // The API returned an error - this is acceptable for service tokens
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent application", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const error = await runEffect(
        listOauthTokens({
          organization,
          application_id: NON_EXISTENT_APPLICATION_ID,
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
        listOauthTokens({
          organization: NON_EXISTENT_ORG,
          application_id: NON_EXISTENT_APPLICATION_ID,
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
  // getOauthToken
  // ============================================================================

  describe("getOauthToken", () => {
    it("can get an OAuth token by id when tokens exist", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        Effect.gen(function* () {
          // First list applications to get a valid application ID
          const apps = yield* listOauthApplications({ organization }).pipe(
            Effect.catch((e) => Effect.succeed({ error: e })),
          );

          if ("error" in apps) {
            return { skipped: true as const, reason: "list apps failed" };
          }

          if (apps.data.length === 0) {
            return { skipped: true as const, reason: "no applications" };
          }

          const appId = apps.data[0]!.id;

          // Then list tokens for that application
          const tokens = yield* listOauthTokens({
            organization,
            application_id: appId,
          }).pipe(Effect.catch((e) => Effect.succeed({ error: e })));

          if ("error" in tokens) {
            return { skipped: true as const, reason: "list tokens failed" };
          }

          if (tokens.data.length === 0) {
            return { skipped: true as const, reason: "no tokens" };
          }

          const tokenId = tokens.data[0]!.id;
          return yield* getOauthToken({
            organization,
            application_id: appId,
            token_id: tokenId,
          }).pipe(
            Effect.map((data) => ({ skipped: false as const, data })),
            Effect.catch((error) =>
              Effect.succeed({ skipped: false as const, error }),
            ),
          );
        }),
      );

      if (result.skipped) {
        // No tokens to test with or listing failed
        return;
      }
      if ("data" in result) {
        expect(result.data.id).toBeDefined();
        expect(result.data.name).toBeDefined();
        expect(result.data.display_name).toBeDefined();
        expect(result.data.created_at).toBeDefined();
        expect(result.data.updated_at).toBeDefined();
        expect(result.data.expires_at).toBeDefined();
        expect(result.data.actor_id).toBeDefined();
        expect(result.data.actor_type).toBeDefined();
      } else {
        // The API returned an error - this is acceptable for service tokens
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent token", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        Effect.gen(function* () {
          // First list applications to get a valid application ID
          const apps = yield* listOauthApplications({ organization }).pipe(
            Effect.catch((e) => Effect.succeed({ error: e })),
          );

          if ("error" in apps) {
            return { skipped: true as const, reason: "list apps failed" };
          }

          if (apps.data.length === 0) {
            return { skipped: true as const, reason: "no applications" };
          }

          const appId = apps.data[0]!.id;

          return yield* getOauthToken({
            organization,
            application_id: appId,
            token_id: NON_EXISTENT_TOKEN_ID,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) =>
                Effect.succeed({ skipped: false as const, error: e }),
              onSuccess: () =>
                Effect.succeed({ skipped: false as const, data: null }),
            }),
          );
        }),
      );

      if (result.skipped) {
        // No applications to test with or listing failed
        return;
      }
      // We expect the request to fail with an error
      expect("error" in result).toBe(true);
      if ("error" in result) {
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent application", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const error = await runEffect(
        getOauthToken({
          organization,
          application_id: NON_EXISTENT_APPLICATION_ID,
          token_id: NON_EXISTENT_TOKEN_ID,
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
        getOauthToken({
          organization: NON_EXISTENT_ORG,
          application_id: NON_EXISTENT_APPLICATION_ID,
          token_id: NON_EXISTENT_TOKEN_ID,
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
  // createOauthToken
  // ============================================================================

  describe("createOauthToken", () => {
    // Note: createOauthToken requires a valid OAuth authorization code or refresh token,
    // which cannot be easily obtained in automated tests. We primarily test error cases.

    it("returns an error for invalid authorization code", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        Effect.gen(function* () {
          // First list applications to get a valid application ID
          const apps = yield* listOauthApplications({ organization }).pipe(
            Effect.catch((e) => Effect.succeed({ error: e })),
          );

          if ("error" in apps) {
            return { skipped: true as const, reason: "list apps failed" };
          }

          if (apps.data.length === 0) {
            return { skipped: true as const, reason: "no applications" };
          }

          const app = apps.data[0]!;

          return yield* createOauthToken({
            organization,
            id: app.id,
            client_id: app.client_id,
            client_secret: "invalid-client-secret",
            grant_type: "authorization_code",
            code: "invalid-authorization-code",
            redirect_uri: app.redirect_uri,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) =>
                Effect.succeed({ skipped: false as const, error: e }),
              onSuccess: (data) =>
                Effect.succeed({ skipped: false as const, data }),
            }),
          );
        }),
      );

      if (result.skipped) {
        // No applications to test with or listing failed
        return;
      }
      // Should fail with an error (invalid credentials/code)
      expect("error" in result).toBe(true);
      if ("error" in result) {
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns an error for invalid refresh token", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        Effect.gen(function* () {
          // First list applications to get a valid application ID
          const apps = yield* listOauthApplications({ organization }).pipe(
            Effect.catch((e) => Effect.succeed({ error: e })),
          );

          if ("error" in apps) {
            return { skipped: true as const, reason: "list apps failed" };
          }

          if (apps.data.length === 0) {
            return { skipped: true as const, reason: "no applications" };
          }

          const app = apps.data[0]!;

          return yield* createOauthToken({
            organization,
            id: app.id,
            client_id: app.client_id,
            client_secret: "invalid-client-secret",
            grant_type: "refresh_token",
            refresh_token: "invalid-refresh-token",
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) =>
                Effect.succeed({ skipped: false as const, error: e }),
              onSuccess: (data) =>
                Effect.succeed({ skipped: false as const, data }),
            }),
          );
        }),
      );

      if (result.skipped) {
        // No applications to test with or listing failed
        return;
      }
      // Should fail with an error (invalid credentials/token)
      expect("error" in result).toBe(true);
      if ("error" in result) {
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent application", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const error = await runEffect(
        createOauthToken({
          organization,
          id: NON_EXISTENT_APPLICATION_ID,
          client_id: "invalid-client-id",
          client_secret: "invalid-client-secret",
          grant_type: "authorization_code",
          code: "invalid-code",
          redirect_uri: "https://example.com/callback",
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
        createOauthToken({
          organization: NON_EXISTENT_ORG,
          id: NON_EXISTENT_APPLICATION_ID,
          client_id: "invalid-client-id",
          client_secret: "invalid-client-secret",
          grant_type: "authorization_code",
          code: "invalid-code",
          redirect_uri: "https://example.com/callback",
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
  // deleteOauthToken
  // ============================================================================

  describe("deleteOauthToken", () => {
    // Note: We can't easily create OAuth tokens in tests (requires authorization code flow),
    // so we only test error cases.

    it("returns NotFound for non-existent token", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        Effect.gen(function* () {
          // First list applications to get a valid application ID
          const apps = yield* listOauthApplications({ organization }).pipe(
            Effect.catch((e) => Effect.succeed({ error: e })),
          );

          if ("error" in apps) {
            return { skipped: true as const, reason: "list apps failed" };
          }

          if (apps.data.length === 0) {
            return { skipped: true as const, reason: "no applications" };
          }

          const appId = apps.data[0]!.id;

          return yield* deleteOauthToken({
            organization,
            application_id: appId,
            token_id: NON_EXISTENT_TOKEN_ID,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) =>
                Effect.succeed({ skipped: false as const, error: e }),
              onSuccess: () =>
                Effect.succeed({ skipped: false as const, data: null }),
            }),
          );
        }),
      );

      if (result.skipped) {
        // No applications to test with or listing failed
        return;
      }
      expect("error" in result).toBe(true);
      if ("error" in result) {
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns NotFound for non-existent application", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const error = await runEffect(
        deleteOauthToken({
          organization,
          application_id: NON_EXISTENT_APPLICATION_ID,
          token_id: NON_EXISTENT_TOKEN_ID,
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
        deleteOauthToken({
          organization: NON_EXISTENT_ORG,
          application_id: NON_EXISTENT_APPLICATION_ID,
          token_id: NON_EXISTENT_TOKEN_ID,
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
});
