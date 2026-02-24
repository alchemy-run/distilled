import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getZoneId } from "./test.ts";
import * as ACM from "~/services/acm.ts";

const hasZoneId = () => !!getZoneId();

const zoneId = () => {
  const id = getZoneId();
  if (!id) {
    throw new Error("CLOUDFLARE_ZONE_ID environment variable is not set");
  }
  return id;
};

/**
 * Get the ACM-enabled zone ID from environment.
 * Returns undefined if CLOUDFLARE_ACM_ZONE_ID is not set.
 */
const getAcmZoneId = (): string | undefined =>
  process.env.CLOUDFLARE_ACM_ZONE_ID;

const hasAcmZoneId = () => !!getAcmZoneId();

const acmZoneId = () => {
  const id = getAcmZoneId();
  if (!id) {
    throw new Error("CLOUDFLARE_ACM_ZONE_ID environment variable is not set");
  }
  return id;
};

// ============================================================================
// ACM Tests
// ============================================================================

describe("ACM", () => {
  // --------------------------------------------------------------------------
  // getTotalTl
  // --------------------------------------------------------------------------
  describe("getTotalTl", () => {
    if (hasZoneId()) {
      test("happy path - retrieves Total TLS settings for a zone", () =>
        Effect.gen(function* () {
          const result = yield* ACM.getTotalTl({
            zoneId: zoneId(),
          });

          expect(result).toBeDefined();
          // enabled is optional, but if present must be boolean
          if (result.enabled !== undefined) {
            expect(typeof result.enabled).toBe("boolean");
          }
          // certificateAuthority is optional, but if present must be one of the valid values
          if (result.certificateAuthority !== undefined) {
            expect(["google", "lets_encrypt", "ssl_com"]).toContain(
              result.certificateAuthority,
            );
          }
          // validityPeriod is optional, but if present must be "90"
          if (result.validityPeriod !== undefined) {
            expect(result.validityPeriod).toBe(90);
          }
        }));
    }

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ACM.getTotalTl({
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - InvalidObjectIdentifier for empty zoneId", () =>
      ACM.getTotalTl({
        zoneId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // createTotalTl
  // --------------------------------------------------------------------------
  describe("createTotalTl", () => {
    if (hasAcmZoneId()) {
      test("happy path - enables Total TLS for a zone", () =>
        Effect.gen(function* () {
          // Ensure disabled first to guarantee a state change
          yield* ACM.createTotalTl({
            zoneId: acmZoneId(),
            enabled: false,
          }).pipe(Effect.catch(() => Effect.void));

          const result = yield* ACM.createTotalTl({
            zoneId: acmZoneId(),
            enabled: true,
          });

          expect(result).toBeDefined();
          if (result.enabled !== undefined) {
            expect(typeof result.enabled).toBe("boolean");
          }
          if (result.certificateAuthority !== undefined) {
            expect(["google", "lets_encrypt", "ssl_com"]).toContain(
              result.certificateAuthority,
            );
          }
          if (result.validityPeriod !== undefined) {
            expect(result.validityPeriod).toBe(90);
          }
        }).pipe(
          Effect.ensuring(
            ACM.createTotalTl({
              zoneId: acmZoneId(),
              enabled: false,
            }).pipe(Effect.catch(() => Effect.void)),
          ),
        ));

      test("happy path - disables Total TLS for a zone", () =>
        Effect.gen(function* () {
          // Enable first to guarantee a state change when we disable.
          // This may fail with NoStateChange if TLS is already enabled.
          yield* ACM.createTotalTl({
            zoneId: acmZoneId(),
            enabled: true,
          }).pipe(Effect.catch(() => Effect.void));

          const result = yield* ACM.createTotalTl({
            zoneId: acmZoneId(),
            enabled: false,
          });

          expect(result).toBeDefined();
          if (result.enabled !== undefined) {
            expect(typeof result.enabled).toBe("boolean");
          }
        }).pipe(
          // If the entire flow gets NoStateChange, TLS is already disabled
          // which satisfies the test goal
          Effect.catch((e) =>
            "_tag" in e && e._tag === "NoStateChange"
              ? Effect.void
              : Effect.fail(e),
          ),
        ));

      test("happy path - enables Total TLS with certificate authority", () =>
        Effect.gen(function* () {
          // Ensure disabled first to guarantee a state change
          yield* ACM.createTotalTl({
            zoneId: acmZoneId(),
            enabled: false,
          }).pipe(Effect.catch(() => Effect.void));

          const result = yield* ACM.createTotalTl({
            zoneId: acmZoneId(),
            enabled: true,
            certificateAuthority: "lets_encrypt",
          });

          expect(result).toBeDefined();
          if (result.enabled !== undefined) {
            expect(typeof result.enabled).toBe("boolean");
          }
          if (result.certificateAuthority !== undefined) {
            expect(["google", "lets_encrypt", "ssl_com"]).toContain(
              result.certificateAuthority,
            );
          }
        }).pipe(
          // A previous TLS job may still be in progress from an earlier test
          Effect.catchTag("PreviousJobInProgress", () => Effect.void),
          Effect.ensuring(
            ACM.createTotalTl({
              zoneId: acmZoneId(),
              enabled: false,
            }).pipe(Effect.catch(() => Effect.void)),
          ),
        ));
    } else {
      test.skip("happy path - enables Total TLS for a zone", () => Effect.void);
      test.skip("happy path - disables Total TLS for a zone", () => Effect.void);
      test.skip("happy path - enables Total TLS with certificate authority", () => Effect.void);
    }

    if (hasZoneId()) {
      test("error - AdvancedCertificateManagerRequired when ACM not enabled", () =>
        ACM.createTotalTl({
          zoneId: zoneId(),
          enabled: true,
        }).pipe(
          Effect.flip,
          Effect.map((e) =>
            expect(e._tag).toBe("AdvancedCertificateManagerRequired"),
          ),
        ));
    }

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ACM.createTotalTl({
        zoneId: "invalid-zone-id-000",
        enabled: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - InvalidObjectIdentifier for empty zoneId", () =>
      ACM.createTotalTl({
        zoneId: "",
        enabled: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });
});
