import { describe, expect, test } from "vitest";
import { convertOpenApiToSmithy, QUERY_STYLE_TRAIT } from "../../src/codegen/openapi.ts";

const page = { type: "object", properties: { size: { type: "integer" } } };

const styleOf = (param: Record<string, unknown>) => {
  const result = convertOpenApiToSmithy(
    {
      openapi: "3.0.3",
      info: { title: "Query", version: "1" },
      paths: {
        "/things": {
          get: {
            operationId: "listThings",
            parameters: [{ name: "page", in: "query", ...param }],
            responses: { "204": { description: "none" } },
          },
        },
      },
    },
    { namespace: "com.example.query", serviceName: "Query" },
  );
  return result.shapes["com.example.query#ListThingsRequest"].members.page.traits[
    QUERY_STYLE_TRAIT
  ];
};

describe("OpenAPI query parameter styles", () => {
  test("an object with no style gets OpenAPI's default, form", () => {
    expect(styleOf({ schema: page })).toBe("form");
  });

  test("an object keeps a declared deepObject style", () => {
    expect(styleOf({ schema: page, style: "deepObject" })).toBe("deepObject");
  });

  test("a form object that is not exploded gets no style", () => {
    expect(styleOf({ schema: page, style: "form", explode: false })).toBeUndefined();
  });

  test("a plain number gets no style", () => {
    expect(styleOf({ schema: { type: "integer" }, style: "deepObject" })).toBeUndefined();
  });

  test("a number-or-object param gets its style", () => {
    expect(styleOf({ schema: { oneOf: [{ type: "integer" }, page] }, style: "deepObject" })).toBe(
      "deepObject",
    );
  });
});
