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
            expect(result.validityPeriod).toBe("90");
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
    if (hasZoneId()) {
      test("happy path - enables Total TLS for a zone", () =>
        Effect.gen(function* () {
          const result = yield* ACM.createTotalTl({
            zoneId: zoneId(),
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
            expect(result.validityPeriod).toBe("90");
          }
        }));

      test("happy path - disables Total TLS for a zone", () =>
        Effect.gen(function* () {
          const result = yield* ACM.createTotalTl({
            zoneId: zoneId(),
            enabled: false,
          });

          expect(result).toBeDefined();
          if (result.enabled !== undefined) {
            expect(typeof result.enabled).toBe("boolean");
          }
        }));

      test("happy path - enables Total TLS with certificate authority", () =>
        Effect.gen(function* () {
          const result = yield* ACM.createTotalTl({
            zoneId: zoneId(),
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
        }));

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
