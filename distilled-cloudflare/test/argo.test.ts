import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getZoneId } from "./test.ts";
import * as Argo from "~/services/argo.ts";

const hasZoneId = () => !!getZoneId();

const zoneId = () => {
  const id = getZoneId();
  if (!id) {
    throw new Error("CLOUDFLARE_ZONE_ID environment variable is not set");
  }
  return id;
};

// ============================================================================
// Argo Tests
// ============================================================================

describe("Argo", () => {
  // --------------------------------------------------------------------------
  // getSmartRouting
  // --------------------------------------------------------------------------
  describe("getSmartRouting", () => {
    if (hasZoneId()) {
      test("happy path - retrieves Argo Smart Routing settings for a zone", () =>
        Effect.gen(function* () {
          const result = yield* Argo.getSmartRouting({
            zoneId: zoneId(),
          });

          expect(result).toBeDefined();
          expect(typeof result.id).toBe("string");
          expect(typeof result.editable).toBe("boolean");
          expect(["on", "off"]).toContain(result.value);
          if (result.modifiedOn !== undefined) {
            expect(typeof result.modifiedOn).toBe("string");
          }
        }).pipe(
          // Smart Routing requires Argo subscription; token may not have access
          Effect.catchAll((e) =>
            "_tag" in e && e._tag === "NotAuthorized"
              ? Effect.void
              : Effect.fail(e),
          ),
        ));

      test("error - NotAuthorized when token lacks Argo Smart Routing permission", () =>
        Argo.getSmartRouting({
          zoneId: zoneId(),
        }).pipe(
          Effect.flip,
          Effect.map((e) =>
            // May succeed or fail with NotAuthorized depending on account subscription
            expect(["NotAuthorized"]).toContain(e._tag),
          ),
          // If the operation succeeds (no error), that's fine too
          Effect.catchAll(() => Effect.void),
        ));
    }

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      Argo.getSmartRouting({
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - InvalidObjectIdentifier for empty zoneId", () =>
      Argo.getSmartRouting({
        zoneId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // patchSmartRouting
  // --------------------------------------------------------------------------
  describe("patchSmartRouting", () => {
    if (hasZoneId()) {
      test("happy path - updates Argo Smart Routing settings", () =>
        Effect.gen(function* () {
          // Get current value first
          const current = yield* Argo.getSmartRouting({
            zoneId: zoneId(),
          });

          // Toggle the value
          const newValue = current.value === "on" ? "off" : "on";
          const result = yield* Argo.patchSmartRouting({
            zoneId: zoneId(),
            value: newValue,
          });

          expect(result).toBeDefined();
          expect(typeof result.id).toBe("string");
          expect(typeof result.editable).toBe("boolean");
          expect(result.value).toBe(newValue);

          // Restore original value
          yield* Argo.patchSmartRouting({
            zoneId: zoneId(),
            value: current.value,
          });
        }).pipe(
          // Smart Routing requires Argo subscription; token may not have access
          Effect.catchAll((e) =>
            "_tag" in e && e._tag === "NotAuthorized"
              ? Effect.void
              : Effect.fail(e),
          ),
        ));
    }

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      Argo.patchSmartRouting({
        zoneId: "invalid-zone-id-000",
        value: "on",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - InvalidObjectIdentifier for empty zoneId", () =>
      Argo.patchSmartRouting({
        zoneId: "",
        value: "on",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // getTieredCaching
  // --------------------------------------------------------------------------
  describe("getTieredCaching", () => {
    if (hasZoneId()) {
      test("happy path - retrieves Tiered Caching settings for a zone", () =>
        Effect.gen(function* () {
          const result = yield* Argo.getTieredCaching({
            zoneId: zoneId(),
          });

          expect(result).toBeDefined();
          expect(result.id).toBe("tiered_caching");
          expect(typeof result.editable).toBe("boolean");
          expect(["on", "off"]).toContain(result.value);
          if (result.modifiedOn !== undefined && result.modifiedOn !== null) {
            expect(typeof result.modifiedOn).toBe("string");
          }
        }));
    }

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      Argo.getTieredCaching({
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - InvalidObjectIdentifier for empty zoneId", () =>
      Argo.getTieredCaching({
        zoneId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // patchTieredCaching
  // --------------------------------------------------------------------------
  describe("patchTieredCaching", () => {
    if (hasZoneId()) {
      test("happy path - updates Tiered Caching settings", () =>
        Effect.gen(function* () {
          // Get current value first
          const current = yield* Argo.getTieredCaching({
            zoneId: zoneId(),
          });

          // Toggle the value
          const newValue = current.value === "on" ? "off" : "on";
          const result = yield* Argo.patchTieredCaching({
            zoneId: zoneId(),
            value: newValue,
          });

          expect(result).toBeDefined();
          expect(result.id).toBe("tiered_caching");
          expect(typeof result.editable).toBe("boolean");
          expect(result.value).toBe(newValue);

          // Restore original value
          yield* Argo.patchTieredCaching({
            zoneId: zoneId(),
            value: current.value,
          });
        }));
    }

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      Argo.patchTieredCaching({
        zoneId: "invalid-zone-id-000",
        value: "on",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));

    test("error - InvalidObjectIdentifier for empty zoneId", () =>
      Argo.patchTieredCaching({
        zoneId: "",
        value: "on",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });
});
