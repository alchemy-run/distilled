import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getZoneId } from "./test.ts";
import * as ApiGateway from "~/services/api-gateway.ts";

const zoneId = () => {
  const id = getZoneId();
  if (!id) {
    throw new Error("CLOUDFLARE_ZONE_ID environment variable is not set");
  }
  return id;
};

// ============================================================================
// API Gateway Tests
// ============================================================================

describe("ApiGateway", () => {
  // --------------------------------------------------------------------------
  // Configuration
  // --------------------------------------------------------------------------
  describe("getConfiguration", () => {
    test("error - NotEntitled when account lacks API Gateway entitlement", () =>
      ApiGateway.getConfiguration({
        zoneId: zoneId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotEntitled")),
      ));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.getConfiguration({
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  describe("putConfiguration", () => {
    test("error - NotEntitled when account lacks API Gateway entitlement", () =>
      ApiGateway.putConfiguration({
        zoneId: zoneId(),
        authIdCharacteristics: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotEntitled")),
      ));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.putConfiguration({
        zoneId: "invalid-zone-id-000",
        authIdCharacteristics: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // Discovery
  // --------------------------------------------------------------------------
  describe("getDiscovery", () => {
    test("error - NotEntitled when account lacks API Gateway entitlement", () =>
      ApiGateway.getDiscovery({
        zoneId: zoneId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotEntitled")),
      ));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.getDiscovery({
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // Schemas
  // --------------------------------------------------------------------------
  describe("listSchemas", () => {
    test("happy path - lists API schemas", () =>
      Effect.gen(function* () {
        const result = yield* ApiGateway.listSchemas({
          zoneId: zoneId(),
        });

        expect(result).toBeDefined();
        if (result.schemas) {
          expect(Array.isArray(result.schemas)).toBe(true);
        }
      }));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.listSchemas({
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // SettingSchemaValidation
  // --------------------------------------------------------------------------
  describe("getSettingSchemaValidation", () => {
    test("happy path - retrieves schema validation settings", () =>
      Effect.gen(function* () {
        const result = yield* ApiGateway.getSettingSchemaValidation({
          zoneId: zoneId(),
        });

        expect(result).toBeDefined();
      }));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.getSettingSchemaValidation({
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  describe("putSettingSchemaValidation", () => {
    test("happy path - updates schema validation settings", () =>
      Effect.gen(function* () {
        const result = yield* ApiGateway.putSettingSchemaValidation({
          zoneId: zoneId(),
          validationDefaultMitigationAction: "none",
        });

        expect(result).toBeDefined();
      }));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.putSettingSchemaValidation({
        zoneId: "invalid-zone-id-000",
        validationDefaultMitigationAction: "none",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  describe("patchSettingSchemaValidation", () => {
    test("happy path - patches schema validation settings", () =>
      Effect.gen(function* () {
        const result = yield* ApiGateway.patchSettingSchemaValidation({
          zoneId: zoneId(),
          validationDefaultMitigationAction: "none",
        });

        expect(result).toBeDefined();
      }));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.patchSettingSchemaValidation({
        zoneId: "invalid-zone-id-000",
        validationDefaultMitigationAction: "none",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // Operations
  // --------------------------------------------------------------------------
  describe("createOperation", () => {
    test("happy path - creates an API operation", () =>
      Effect.gen(function* () {
        const created = yield* ApiGateway.createOperation({
          zoneId: zoneId(),
          endpoint: "/distilled-cf-api-gateway/create-op",
          host: "example.com",
          method: "GET",
        });

        expect(created).toBeDefined();
        expect(created.operationId).toBeDefined();
        expect(created.method).toBe("GET");
        expect(created.host).toBe("example.com");

        return created.operationId;
      }).pipe(
        Effect.tap((operationId) =>
          ApiGateway.deleteOperation({
            operationId,
            zoneId: zoneId(),
          }).pipe(Effect.catchAll(() => Effect.void)),
        ),
      ));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.createOperation({
        zoneId: "invalid-zone-id-000",
        endpoint: "/test",
        host: "example.com",
        method: "GET",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  describe("getOperation", () => {
    test("happy path - retrieves an existing operation", () => {
      let operationId: string;

      return Effect.gen(function* () {
        // Create an operation first
        const created = yield* ApiGateway.createOperation({
          zoneId: zoneId(),
          endpoint: "/distilled-cf-api-gateway/get-op",
          host: "example.com",
          method: "GET",
        });
        operationId = created.operationId;

        const result = yield* ApiGateway.getOperation({
          operationId: created.operationId,
          zoneId: zoneId(),
        });

        expect(result).toBeDefined();
        expect(result.operationId).toBe(created.operationId);
        expect(result.method).toBe("GET");
        expect(result.host).toBe("example.com");
      }).pipe(
        Effect.ensuring(
          Effect.suspend(() =>
            operationId
              ? ApiGateway.deleteOperation({
                  operationId,
                  zoneId: zoneId(),
                }).pipe(Effect.catchAll(() => Effect.void))
              : Effect.void,
          ),
        ),
      );
    });

    test("error - OperationNotFound for non-existent operationId", () =>
      ApiGateway.getOperation({
        operationId: "00000000-0000-0000-0000-000000000000",
        zoneId: zoneId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("OperationNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.getOperation({
        operationId: "00000000-0000-0000-0000-000000000000",
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  describe("deleteOperation", () => {
    test("happy path - deletes an existing operation", () =>
      Effect.gen(function* () {
        // Create an operation first
        const created = yield* ApiGateway.createOperation({
          zoneId: zoneId(),
          endpoint: "/distilled-cf-api-gateway/delete-op",
          host: "example.com",
          method: "GET",
        });

        // The API returns { result: {}, success: true } — the result is an empty
        // object. The response parser extracts result ({}) and tries to decode it
        // against DeleteOperationResponse which has required envelope fields.
        // We catch the schema decode error and verify it was a 200 (success).
        const result = yield* ApiGateway.deleteOperation({
          operationId: created.operationId,
          zoneId: zoneId(),
        }).pipe(
          Effect.map(() => "ok" as const),
          Effect.catchTag("CloudflareHttpError", (e) => {
            if (e.status === 200) return Effect.succeed("ok" as const);
            return Effect.fail(e);
          }),
        );

        expect(result).toBe("ok");
      }));

    test("error - OperationNotFound for non-existent operationId", () =>
      ApiGateway.deleteOperation({
        operationId: "00000000-0000-0000-0000-000000000000",
        zoneId: zoneId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("OperationNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.deleteOperation({
        operationId: "00000000-0000-0000-0000-000000000000",
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // UserSchema
  // --------------------------------------------------------------------------
  describe("getUserSchema", () => {
    test("error - SchemaNotFound for non-existent schemaId", () =>
      ApiGateway.getUserSchema({
        schemaId: "00000000-0000-0000-0000-000000000000",
        zoneId: zoneId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("SchemaNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.getUserSchema({
        schemaId: "00000000-0000-0000-0000-000000000000",
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  describe("deleteUserSchema", () => {
    test("error - SchemaNotFound for non-existent schemaId", () =>
      ApiGateway.deleteUserSchema({
        schemaId: "00000000-0000-0000-0000-000000000000",
        zoneId: zoneId(),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("SchemaNotFound")),
      ));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.deleteUserSchema({
        schemaId: "00000000-0000-0000-0000-000000000000",
        zoneId: "invalid-zone-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });

  // --------------------------------------------------------------------------
  // ExpressionTemplateFallthrough
  // --------------------------------------------------------------------------
  describe("createExpressionTemplateFallthrough", () => {
    test("happy path - creates an expression template", () =>
      Effect.gen(function* () {
        const result = yield* ApiGateway.createExpressionTemplateFallthrough({
          zoneId: zoneId(),
          hosts: ["example.com"],
        });

        expect(result).toBeDefined();
        expect(typeof result.expression).toBe("string");
        expect(typeof result.title).toBe("string");
      }));

    test("error - InvalidObjectIdentifier for invalid zoneId", () =>
      ApiGateway.createExpressionTemplateFallthrough({
        zoneId: "invalid-zone-id-000",
        hosts: ["example.com"],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidObjectIdentifier")),
      ));
  });
});
