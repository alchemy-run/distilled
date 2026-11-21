import { describe, expect, test } from "vitest";
import { convertOpenApiToSmithy } from "../../src/codegen/openapi.ts";

const NS = "com.example.disc";

type Model = { shapes: Record<string, any> };

const convert3 = (schemas: Record<string, unknown>, root = "Pet"): Model =>
  convertOpenApiToSmithy(
    {
      openapi: "3.0.3",
      info: { title: "Disc", version: "1" },
      components: { schemas },
      paths: {
        "/pets": {
          post: {
            operationId: "createPet",
            requestBody: {
              content: { "application/json": { schema: { $ref: `#/components/schemas/${root}` } } },
            },
            responses: { "204": { description: "ok" } },
          },
        },
      },
    },
    { namespace: NS, serviceName: "Disc" },
  );

const shape = (model: Model, name: string) => model.shapes[`${NS}#${name}`];
const arms = (model: Model, name: string) =>
  Object.values<any>(shape(model, name)?.members ?? {}).map((m) => m.target.split("#")[1]);
const members = (model: Model, name: string) => Object.keys(shape(model, name)?.members ?? {});
const enumValues = (model: Model, name: string, member: string) =>
  Object.values<any>(model.shapes[shape(model, name).members[member].target].members).map(
    (m) => m.traits["smithy.api#enumValue"],
  );

const PET = {
  type: "object",
  required: ["kind"],
  properties: { kind: { type: "string" }, name: { type: "string" } },
  discriminator: {
    propertyName: "kind",
    mapping: { dog: "#/components/schemas/Dog", cat: "#/components/schemas/Cat" },
  },
};
const sub = (props: Record<string, unknown>) => ({
  allOf: [{ $ref: "#/components/schemas/Pet" }, { type: "object", properties: props }],
});

describe("OpenAPI discriminated hierarchies convert to unions", () => {
  test("a base with a mapping becomes a union of its subtypes, with base members and a pinned key", () => {
    const model = convert3({
      Pet: PET,
      Dog: sub({ bark: { type: "boolean" } }),
      Cat: sub({ lives: { type: "integer" } }),
    });
    expect(shape(model, "Pet").type).toBe("union");
    expect(arms(model, "Pet")).toEqual(["Dog", "Cat"]);
    expect(members(model, "Dog")).toEqual(["kind", "name", "bark"]);
    expect(enumValues(model, "Dog", "kind")).toEqual(["dog"]);
    expect(enumValues(model, "Cat", "kind")).toEqual(["cat"]);
  });

  test("a discriminated schema inside a subtype's own members becomes a union too", () => {
    const toy = {
      type: "object",
      required: ["type"],
      properties: { type: { type: "string" } },
      discriminator: {
        propertyName: "type",
        mapping: { ball: "#/components/schemas/Ball", rope: "#/components/schemas/Rope" },
      },
    };
    const toyOf = (props: Record<string, unknown>) => ({
      allOf: [{ $ref: "#/components/schemas/Toy" }, { type: "object", properties: props }],
    });
    const model = convert3({
      Pet: PET,
      // An inline copy of Toy, as Galaxy writes `NewSchemaNewJsonSchema.columns`.
      Dog: sub({ toys: { type: "array", items: { ...toy } } }),
      Cat: sub({}),
      Toy: toy,
      Ball: toyOf({ size: { type: "integer" } }),
      Rope: toyOf({ length: { type: "integer" } }),
    });
    const list = model.shapes[shape(model, "Dog").members.toys.target];
    const item = model.shapes[list.member.target];
    expect(item.type).toBe("union");
    expect(Object.values<any>(item.members).map((m) => m.target.split("#")[1])).toEqual([
      "Ball",
      "Rope",
    ]);
  });

  test("Swagger 2: subtypes found by allOf, keyed by x-ms-discriminator-value or name, leaves only", () => {
    const ref = (n: string) => ({ $ref: `#/definitions/${n}` });
    const model = convertOpenApiToSmithy(
      {
        swagger: "2.0",
        info: { title: "Disc", version: "1" },
        definitions: {
          Activity: {
            type: "object",
            required: ["type"],
            discriminator: "type",
            properties: { type: { type: "string" }, name: { type: "string" } },
          },
          ExecutionActivity: {
            "x-ms-discriminator-value": "Execution",
            allOf: [ref("Activity")],
            properties: { linkedService: { type: "string" } },
          },
          CopyActivity: {
            "x-ms-discriminator-value": "Copy",
            allOf: [ref("ExecutionActivity")],
            properties: { source: { type: "string" } },
          },
          WaitActivity: { allOf: [ref("Activity")], properties: { seconds: { type: "integer" } } },
        },
        paths: {
          "/activities": {
            post: {
              operationId: "createActivity",
              parameters: [{ name: "body", in: "body", schema: ref("Activity") }],
              responses: { "204": { description: "ok" } },
            },
          },
        },
      },
      { namespace: NS, serviceName: "Disc" },
    );
    expect(arms(model, "Activity")).toEqual(["CopyActivity", "WaitActivity"]);
    expect(members(model, "CopyActivity")).toEqual(["type", "name", "linkedService", "source"]);
    expect(enumValues(model, "CopyActivity", "type")).toEqual(["Copy"]);
    expect(enumValues(model, "WaitActivity", "type")).toEqual(["WaitActivity"]);
  });

  test("a mapping to standalone schemas is a union of those schemas as they are", () => {
    const model = convert3({
      Pet: {
        type: "object",
        properties: { kind: { type: "string" } },
        discriminator: {
          propertyName: "kind",
          mapping: { dog: "#/components/schemas/Dog", cat: "#/components/schemas/Cat" },
        },
      },
      Dog: { type: "object", properties: { kind: { type: "string" }, bark: { type: "boolean" } } },
      Cat: { type: "object", properties: { kind: { type: "string" }, lives: { type: "integer" } } },
    });
    expect(arms(model, "Pet")).toEqual(["Dog", "Cat"]);
    expect(shape(model, "Dog").members.kind.target).toBe("smithy.api#String");
  });

  test("a base that maps a key to itself gets its own arm", () => {
    const model = convert3({
      Pet: {
        ...PET,
        discriminator: {
          propertyName: "kind",
          mapping: { dog: "#/components/schemas/Dog", other: "#/components/schemas/Pet" },
        },
      },
      Dog: sub({ bark: { type: "boolean" } }),
    });
    expect(arms(model, "Pet")).toEqual(["Dog", "PetOther"]);
    expect(enumValues(model, "PetOther", "kind")).toEqual(["other"]);
  });
});
