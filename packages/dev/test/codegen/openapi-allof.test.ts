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

  // Azure: the base resource declares `systemData: { $ref, readOnly }`, the
  // resource re-declares it. It must stay out of request bodies.
  test("a readOnly declaration stays readOnly after merging", () => {
    const model = convertOpenApiToSmithy(
      {
        openapi: "3.0.3",
        info: { title: "AllOf", version: "1" },
        components: {
          schemas: {
            Meta: { type: "object", properties: { createdBy: { type: "string" } } },
            Resource: {
              type: "object",
              properties: {
                name: { type: "string" },
                meta: { $ref: "#/components/schemas/Meta", readOnly: true },
              },
            },
          },
        },
        paths: {
          "/things": {
            post: {
              operationId: "createThing",
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      allOf: [
                        { $ref: "#/components/schemas/Resource" },
                        {
                          type: "object",
                          properties: {
                            meta: { type: "object", properties: { extra: { type: "string" } } },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              responses: { "200": { description: "ok" } },
            },
          },
        },
      },
      { namespace: NS, serviceName: "AllOf" },
    );
    expect(membersOf(model, `${NS}#CreateThingRequest`)).toEqual(["name"]);
  });

  test("an inline copy of a $ref'd schema keeps the named shape", () => {
    const meta = { type: "object", properties: { createdBy: { type: "string" } } };
    const model = convert(
      { Meta: meta },
      {
        allOf: [
          { type: "object", properties: { meta: { $ref: "#/components/schemas/Meta" } } },
          { type: "object", properties: { meta: { ...meta, description: "Copy." } } },
        ],
      },
    );
    expect(target(model, outputId(model), "meta")).toBe(`${NS}#Meta`);
  });

  // Okta: `HrefObjectSelfLink` is `allOf: [HrefObject]`.
  test("a declaration that covers the other keeps its named shape", () => {
    const model = convert(
      {
        Link: { type: "object", properties: { href: { type: "string" } }, required: ["href"] },
        SelfLink: { allOf: [{ $ref: "#/components/schemas/Link" }] },
      },
      {
        allOf: [
          { type: "object", properties: { self: { $ref: "#/components/schemas/SelfLink" } } },
          { type: "object", properties: { self: { $ref: "#/components/schemas/Link" } } },
        ],
      },
    );
    // SelfLink is a one-entry allOf, an alias of Link.
    expect(target(model, outputId(model), "self")).toBe(`${NS}#Link`);
    expect(model.shapes[`${NS}#GetOrderResponseSelf`]).toBeUndefined();
  });

  // WorkOS declares `EventSchema.context` 129 times; nesting one allOf level
  // per declaration passed the depth limit and dropped fields.
  test("many branches extending one property keep every field", () => {
    const branches = Array.from({ length: 50 }, (_, i) => ({
      type: "object",
      properties: { data: { type: "object", properties: { [`f${i}`]: { type: "string" } } } },
    }));
    const model = convert({}, { allOf: branches });
    const data = target(model, outputId(model), "data");
    expect(membersOf(model, data)).toHaveLength(50);
  });

  test("arrays with the same items keep the named list", () => {
    const model = convert(
      { Warnings: { type: "array", items: { type: "string" } } },
      {
        allOf: [
          { type: "object", properties: { warnings: { $ref: "#/components/schemas/Warnings" } } },
          {
            type: "object",
            properties: {
              warnings: { type: "array", items: { type: "string" }, description: "x" },
            },
          },
        ],
      },
    );
    expect(target(model, outputId(model), "warnings")).toBe(`${NS}#Warnings`);
  });
});
