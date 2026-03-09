import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { Credentials } from "../src/credentials";
import { Forbidden, NotFound } from "../src/errors";
import { listClusterSizeSkus } from "../src/operations/listClusterSizeSkus";
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
 * Get the organization name from credentials
 */
const getOrganization = () =>
  Effect.gen(function* () {
    const { organization } = yield* Credentials;
    return organization;
  }).pipe(Effect.provide(MainLayer));

describe("cluster", () => {
  // ============================================================================
  // listClusterSizeSkus
  // ============================================================================

  describe("listClusterSizeSkus", () => {
    it("can list cluster size SKUs", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listClusterSizeSkus({
          organization,
        }),
      );

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it("returns SKUs with expected fields", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listClusterSizeSkus({
          organization,
        }),
      );

      expect(result.length).toBeGreaterThanOrEqual(1);
      const sku = result[0]!;
      expect(sku.name).toBeDefined();
      expect(sku.display_name).toBeDefined();
      expect(sku.cpu).toBeDefined();
      expect(sku.ram).toBeDefined();
      expect(typeof sku.metal).toBe("boolean");
      expect(typeof sku.enabled).toBe("boolean");
      expect(typeof sku.development).toBe("boolean");
      expect(typeof sku.production).toBe("boolean");
      expect(typeof sku.sort_order).toBe("number");
    });

    it("can filter cluster size SKUs by engine (mysql)", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listClusterSizeSkus({
          organization,
          engine: "mysql",
        }),
      );

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it("can filter cluster size SKUs by engine (postgresql)", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listClusterSizeSkus({
          organization,
          engine: "postgresql",
        }),
      );

      expect(Array.isArray(result)).toBe(true);
      // PostgreSQL may or may not have SKUs available depending on org permissions
    });

    it("can request rates in the response", async () => {
      const organization = await Effect.runPromise(getOrganization());
      const result = await runEffect(
        listClusterSizeSkus({
          organization,
          rates: true,
        }),
      );

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(1);
      // When rates is true, rate fields should be present (may be null)
      const sku = result[0]!;
      expect("rate" in sku).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listClusterSizeSkus({
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
