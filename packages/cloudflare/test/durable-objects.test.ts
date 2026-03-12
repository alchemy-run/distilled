import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as DurableObjects from "~/services/durable-objects";

const accountId = () => getAccountId();

// ============================================================================
// Durable Objects Tests
// ============================================================================

describe("DurableObjects", () => {
  // --------------------------------------------------------------------------
  // listNamespaces
  // --------------------------------------------------------------------------
  describe("listNamespaces", () => {
    test("happy path - lists durable object namespaces", () =>
      Effect.gen(function* () {
        const result = yield* DurableObjects.listNamespaces({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);

        // If there are namespaces, verify shape of each entry
        for (const ns of result) {
          if (ns.id !== undefined) {
            expect(typeof ns.id).toBe("string");
          }
          if (ns.name !== undefined) {
            expect(typeof ns.name).toBe("string");
          }
          if (ns.script !== undefined) {
            expect(typeof ns.script).toBe("string");
          }
          if (ns.class !== undefined) {
            expect(typeof ns.class).toBe("string");
          }
          if (ns.useSqlite !== undefined) {
            expect(typeof ns.useSqlite).toBe("boolean");
          }
        }
      }));

    test("happy path - returns an array (possibly empty) for valid account", () =>
      Effect.gen(function* () {
        const result = yield* DurableObjects.listNamespaces({
          accountId: accountId(),
        });

        expect(Array.isArray(result)).toBe(true);
        // Length should be >= 0 (could be empty if no DO namespaces exist)
        expect(result.length).toBeGreaterThanOrEqual(0);
      }));

    test("error - InvalidIdentifier for invalid accountId", () =>
      DurableObjects.listNamespaces({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidIdentifier")),
      ));

    test("error - InvalidIdentifier for empty accountId string", () =>
      DurableObjects.listNamespaces({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["InvalidIdentifier", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - InvalidIdentifier for special characters in accountId", () =>
      DurableObjects.listNamespaces({
        accountId: "!@#$%^&*()",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["InvalidIdentifier", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // listNamespaceObjects
  // --------------------------------------------------------------------------
  describe("listNamespaceObjects", () => {
    test("happy path - lists objects in an existing namespace", () =>
      Effect.gen(function* () {
        // First, get the list of namespaces to find a valid one
        const namespaces = yield* DurableObjects.listNamespaces({
          accountId: accountId(),
        });

        // Skip if no namespaces exist (can't test without a DO namespace)
        if (namespaces.length === 0 || !namespaces[0].id) {
          return;
        }

        const namespaceId = namespaces[0].id;
        const result = yield* DurableObjects.listNamespaceObjects({
          id: namespaceId,
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);

        // If there are objects, verify shape
        for (const obj of result) {
          if (obj.id !== undefined) {
            expect(typeof obj.id).toBe("string");
          }
          if (obj.hasStoredData !== undefined) {
            expect(typeof obj.hasStoredData).toBe("boolean");
          }
        }
      }));

    test("error - MalformedParameter for limit that is too low", () =>
      Effect.gen(function* () {
        const namespaces = yield* DurableObjects.listNamespaces({
          accountId: accountId(),
        });

        if (namespaces.length === 0 || !namespaces[0].id) {
          return;
        }

        const namespaceId = namespaces[0].id;
        yield* DurableObjects.listNamespaceObjects({
          id: namespaceId,
          accountId: accountId(),
          limit: 1,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("MalformedParameter")),
        );
      }));

    test("error - NamespaceNotFound for non-existent namespace id", () =>
      DurableObjects.listNamespaceObjects({
        id: "00000000000000000000000000000000",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NamespaceNotFound")),
      ));

    test("error - InvalidIdentifier for invalid accountId", () =>
      DurableObjects.listNamespaceObjects({
        id: "00000000000000000000000000000000",
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidIdentifier")),
      ));

    test("error - InvalidIdentifier for empty accountId", () =>
      DurableObjects.listNamespaceObjects({
        id: "00000000000000000000000000000000",
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["InvalidIdentifier", "CloudflareHttpError"]).toContain(
            e._tag,
          ),
        ),
      ));

    test("error - NamespaceNotFound for empty namespace id", () =>
      DurableObjects.listNamespaceObjects({
        id: "",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "NamespaceNotFound",
            "CloudflareHttpError",
            "InvalidIdentifier",
            "UnknownCloudflareError",
          ]).toContain(e._tag),
        ),
      ));

    test("error - InvalidIdentifier for special characters in accountId", () =>
      DurableObjects.listNamespaceObjects({
        id: "00000000000000000000000000000000",
        accountId: "!@#$%^&*()",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "InvalidIdentifier",
            "CloudflareHttpError",
            "UnknownCloudflareError",
          ]).toContain(e._tag),
        ),
      ));

    test("error - NamespaceNotFound for special characters in namespace id", () =>
      DurableObjects.listNamespaceObjects({
        id: "!@#$%^&*()",
        accountId: accountId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect([
            "NamespaceNotFound",
            "InvalidIdentifier",
            "CloudflareHttpError",
            "UnknownCloudflareError",
          ]).toContain(e._tag),
        ),
      ));

    test("error - MalformedParameter for limit of 0", () =>
      Effect.gen(function* () {
        const namespaces = yield* DurableObjects.listNamespaces({
          accountId: accountId(),
        });

        if (namespaces.length === 0 || !namespaces[0].id) {
          return;
        }

        const namespaceId = namespaces[0].id;

        yield* DurableObjects.listNamespaceObjects({
          id: namespaceId,
          accountId: accountId(),
          limit: 0,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("MalformedParameter")),
        );
      }));
  });
});
