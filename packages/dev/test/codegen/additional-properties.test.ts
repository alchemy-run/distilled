import { describe, expect, test } from "vitest";
import { generateService, type SdkSpec } from "../../src/codegen/generator.ts";
import { ADDITIONAL_PROPERTIES_TRAIT } from "../../src/codegen/members.ts";
import { convertOpenApiToSmithy } from "../../src/codegen/openapi.ts";

const NS = "com.example.open";

const convert = (row: Record<string, unknown>) =>
  convertOpenApiToSmithy(
    {
      openapi: "3.0.3",
      info: { title: "Open", version: "1" },
      components: { schemas: { Row: row } },
      paths: {
        "/rows": {
          post: {
            operationId: "writeRows",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      rows: { type: "array", items: { $ref: "#/components/schemas/Row" } },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                content: { "application/json": { schema: { $ref: "#/components/schemas/Row" } } },
              },
            },
          },
        },
      },
    },
    { namespace: NS, serviceName: "Open" },
  );

const rowWith = (additionalProperties?: unknown) => ({
  type: "object",
  properties: { id: { type: "string" }, vector: { type: "array", items: { type: "number" } } },
  required: ["id"],
  ...(additionalProperties === undefined ? {} : { additionalProperties }),
});

const rowTraits = (model: { shapes: Record<string, any> }) =>
  model.shapes[`${NS}#Row`]?.traits ?? {};

const spec: SdkSpec = {
  operationDecl: {
    contextType: "OpenContext",
    commonErrorType: "OpenError",
    commonErrorClasses: [],
    protocol: "OpenProtocol",
    retry: "Retry.Retry",
  },
};

describe("OpenAPI additionalProperties next to properties", () => {
  for (const ap of [true, {}, { type: "array", items: {} }]) {
    test(`additionalProperties: ${JSON.stringify(ap)} marks the structure open`, () => {
      expect(rowTraits(convert(rowWith(ap)))).toHaveProperty([ADDITIONAL_PROPERTIES_TRAIT]);
    });
  }

  for (const ap of [undefined, false]) {
    test(`additionalProperties: ${String(ap)} keeps the structure closed`, () => {
      expect(rowTraits(convert(rowWith(ap)))).not.toHaveProperty([ADDITIONAL_PROPERTIES_TRAIT]);
    });
  }

  test("an allOf-merged object keeps the marker", () => {
    const model = convert({
      allOf: [rowWith(), { type: "object", additionalProperties: true }],
    });
    expect(rowTraits(model)).toHaveProperty([ADDITIONAL_PROPERTIES_TRAIT]);
  });

  test("an open structure emits an index signature and StructWithRest", () => {
    const { code } = generateService(convert(rowWith(true)) as any, spec);
    expect(code).toMatch(/export interface Row \{[^}]*\[key: string\]: unknown;\n\}/);
    expect(code).toContain("S.StructWithRest(");
    expect(code).toContain("[S.Record(S.String, S.Unknown)]");
  });

  test("a closed structure emits neither", () => {
    const { code } = generateService(convert(rowWith(false)) as any, spec);
    expect(code).not.toContain("[key: string]: unknown;");
    expect(code).not.toContain("S.StructWithRest(");
  });
});
