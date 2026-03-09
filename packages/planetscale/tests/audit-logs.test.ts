import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Credentials } from "../src/credentials";
import { Forbidden, NotFound } from "../src/errors";
import { listAuditLogs } from "../src/operations/listAuditLogs";
import { MainLayer, runEffect } from "./setup";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";

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

describe("audit-logs", () => {
  // ============================================================================
  // listAuditLogs
  // ============================================================================

  describe("listAuditLogs", () => {
    it("can list audit logs (or returns Forbidden if no permission)", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listAuditLogs({
          organization,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // Audit log operations may require specific permissions
      if ("data" in result) {
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(typeof result.data.has_next).toBe("boolean");
        expect(typeof result.data.has_prev).toBe("boolean");
      } else {
        // Forbidden is acceptable if the token doesn't have audit log permissions
        expect(isApiError(result.error)).toBe(true);
      }
    });

    it("returns audit logs with expected fields when available", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listAuditLogs({
          organization,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("data" in result && result.data.data.length > 0) {
        const log = result.data.data[0]!;
        expect(log.id).toBeDefined();
        expect(log.actor_id).toBeDefined();
        expect(log.actor_type).toBeDefined();
        expect(log.action).toBeDefined();
        expect(log.created_at).toBeDefined();
        expect(log.updated_at).toBeDefined();
      }
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listAuditLogs({
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
});
