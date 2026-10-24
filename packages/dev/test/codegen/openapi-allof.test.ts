import { describe, expect, test } from "vitest";
import { convertOpenApiToSmithy } from "../../src/codegen/openapi.ts";

const NS = "com.example.allof";

const convert = (schemas: Record<string, unknown>, response: unknown) =>
  convertOpenApiToSmithy(
    {
      openapi: "3.0.3",
      info: { title: "AllOf", version: "1" },
      components: { schemas },
      paths: {
        "/orders/{id}": {
          get: {
            operationId: "getOrder",
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
              "200": { content: { "application/json": { schema: response } } },
            },
          },
        },
      },
    },
    { namespace: NS, serviceName: "AllOf" },
  );

/** Member names of the structure a member of `shapeId` targets. */
const membersOf = (model: { shapes: Record<string, any> }, shapeId: string): string[] =>
  Object.keys(model.shapes[shapeId]?.members ?? {}).sort();

const target = (model: { shapes: Record<string, any> }, shapeId: string, member: string) =>
  model.shapes[shapeId]?.members?.[member]?.target as string;

const outputId = (model: { shapes: Record<string, any> }) =>
  model.shapes[`${NS}#GetOrder`].output.target as string;

describe("OpenAPI allOf merges nested schemas across branches", () => {
  test("nested object properties extended by later branches are kept", () => {
    const model = convert(
      {
        Envelope: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
          },
        },
      },
      {
        allOf: [
          { $ref: "#/components/schemas/Envelope" },
          {
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: { http_formatted: { type: "string" } },
              },
            },
          },
          {
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: { proxy_replacements: { type: "integer" } },
              },
            },
          },
        ],
      },
    );
    const out = outputId(model);
    expect(membersOf(model, out)).toEqual(["data", "success"]);
    const data = target(model, out, "data");
    expect(membersOf(model, data)).toEqual(["http_formatted", "id", "proxy_replacements"]);
    expect(model.shapes[data].members.id.traits).toHaveProperty(["smithy.api#required"]);
  });

  test("array item properties extended by later branches are kept", () => {
    const model = convert(
      {
        Order: {
          type: "object",
          properties: {
            service_line_items: {
              type: "array",
              items: { type: "object", properties: { sku: { type: "string" } } },
            },
          },
        },
      },
      {
        allOf: [
          { $ref: "#/components/schemas/Order" },
          {
            type: "object",
            properties: {
              service_line_items: {
                type: "array",
                items: { type: "object", properties: { price: { type: "number" } } },
              },
            },
          },
        ],
      },
    );
    const list = target(model, outputId(model), "service_line_items");
    const item = model.shapes[list].member.target as string;
    expect(membersOf(model, item)).toEqual(["price", "sku"]);
  });

  test("nested fields from union variants merge as optional", () => {
    const model = convert(
      {},
      {
        allOf: [
          {
            type: "object",
            properties: { data: { type: "object", additionalProperties: true } },
            required: ["data"],
          },
          {
            oneOf: [
              {
                type: "object",
                properties: {
                  data: { type: "object", properties: { a: { type: "string" } }, required: ["a"] },
                },
              },
              {
                type: "object",
                properties: {
                  data: { type: "object", properties: { b: { type: "string" } }, required: ["b"] },
                },
              },
            ],
          },
        ],
      },
    );
    const out = outputId(model);
    expect(model.shapes[out].members.data.traits).toHaveProperty(["smithy.api#required"]);
    const data = target(model, out, "data");
    expect(membersOf(model, data)).toEqual(["a", "b"]);
    for (const m of ["a", "b"]) {
      expect(model.shapes[data].members[m].traits ?? {}).not.toHaveProperty([
        "smithy.api#required",
      ]);
    }
  });

  test("conflicting scalar properties keep the first schema", () => {
    const model = convert(
      {},
      {
        allOf: [
          { type: "object", properties: { id: { type: "string" } } },
          { type: "object", properties: { id: { type: "integer" } } },
        ],
      },
    );
    expect(target(model, outputId(model), "id")).toBe("smithy.api#String");
  });
});
