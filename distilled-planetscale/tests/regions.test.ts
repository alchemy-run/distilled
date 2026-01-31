import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { Credentials } from "../src/credentials";
import { Forbidden, NotFound, Unauthorized } from "../src/errors";
import { listPublicRegions } from "../src/operations/listPublicRegions";
import { listReadOnlyRegions } from "../src/operations/listReadOnlyRegions";
import { listRegionsForOrganization } from "../src/operations/listRegionsForOrganization";
import { runEffect } from "./setup";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DATABASE = "this-database-definitely-does-not-exist-12345";

/**
 * Helper to check if an error is an expected "not found" type error.
 * PlanetScale API may return NotFound, Forbidden, or Unauthorized for non-existent resources.
 */
const isNotFoundOrForbiddenOrUnauthorized = (error: unknown): boolean =>
  error instanceof NotFound ||
  error instanceof Forbidden ||
  error instanceof Unauthorized;

describe("regions", () => {
  // ============================================================================
  // listPublicRegions
  // ============================================================================

  describe("listPublicRegions", () => {
    it("can list public regions", async () => {
      const result = await runEffect(listPublicRegions({}));

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.current_page).toBeDefined();
    });

    it("can list public regions with pagination", async () => {
      const result = await runEffect(
        listPublicRegions({
          page: 1,
          per_page: 5,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBe(1);
    });

    it("returns region data with expected fields", async () => {
      const result = await runEffect(listPublicRegions({}));

      expect(result.data.length).toBeGreaterThan(0);
      const region = result.data[0]!;
      expect(region.id).toBeDefined();
      expect(region.provider).toBeDefined();
      expect(typeof region.enabled).toBe("boolean");
      expect(Array.isArray(region.public_ip_addresses)).toBe(true);
      expect(region.display_name).toBeDefined();
      expect(region.location).toBeDefined();
      expect(region.slug).toBeDefined();
    });
  });

  // ============================================================================
  // listRegionsForOrganization
  // ============================================================================

  describe("listRegionsForOrganization", () => {
    it("can list regions for an organization", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* listRegionsForOrganization({ organization });
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.current_page).toBeDefined();
    });

    it("can list regions for an organization with pagination", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* listRegionsForOrganization({
            organization,
            page: 1,
            per_page: 5,
          });
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBe(1);
    });

    it("returns region data with expected fields including current_default", async () => {
      const result = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* listRegionsForOrganization({ organization });
        }),
      );

      expect(result.data.length).toBeGreaterThan(0);
      const region = result.data[0]!;
      expect(region.id).toBeDefined();
      expect(region.provider).toBeDefined();
      expect(typeof region.enabled).toBe("boolean");
      expect(Array.isArray(region.public_ip_addresses)).toBe(true);
      expect(region.display_name).toBeDefined();
      expect(region.location).toBeDefined();
      expect(region.slug).toBeDefined();
      expect(typeof region.current_default).toBe("boolean");
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listRegionsForOrganization({
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
  // listReadOnlyRegions
  // ============================================================================

  describe("listReadOnlyRegions", () => {
    it("returns NotFound or Forbidden for non-existent database", async () => {
      const error = await runEffect(
        Effect.gen(function* () {
          const { organization } = yield* Credentials;
          return yield* listReadOnlyRegions({
            organization,
            database: NON_EXISTENT_DATABASE,
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
        listReadOnlyRegions({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DATABASE,
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
