import { describe, expect, test } from "vitest";
import { generateService, type SdkSpec } from "../../src/codegen/generator.ts";

const primitiveUnionModel = (kind: "enum" | "intEnum", request: boolean) => ({
  smithy: "2.0",
  shapes: {
    "com.example.union#Example": {
      type: "service",
      version: "2024-01-01",
      operations: [{ target: "com.example.union#GetValue" }],
    },
    "com.example.union#GetValue": {
      type: "operation",
      input: { target: "com.example.union#Request" },
      output: { target: "com.example.union#Response" },
      traits: { "smithy.api#http": { method: "POST", uri: "/value" } },
    },
    "com.example.union#Request": {
      type: "structure",
      traits: { "smithy.api#input": {} },
      members: request ? { value: { target: "com.example.union#Value" } } : {},
    },
    "com.example.union#Response": {
      type: "structure",
      members: { value: { target: "com.example.union#Value" } },
    },
    "com.example.union#Mode": {
      type: kind,
      members: {
        STOP: {
          target: "smithy.api#Unit",
          traits: { "smithy.api#enumValue": kind === "enum" ? "stop" : 1 },
        },
      },
    },
    "com.example.union#Value": {
      type: "union",
      members: {
        mode: { target: "com.example.union#Mode" },
        legacy: { target: "smithy.api#Boolean" },
      },
    },
  },
});

const spec: SdkSpec = {
  unionStyle: "primitive",
  operationDecl: {
    contextType: "ExampleContext",
    commonErrorType: "ExampleError",
    commonErrorClasses: [],
    protocol: "ExampleProtocol",
    retry: "Retry.Retry",
  },
};

describe("operation protocol overrides", () => {
  for (const retry of [undefined, "Retry.Retry"]) {
    for (const overridden of [false, true]) {
      test(`${overridden ? "overridden" : "default"} protocol with ${retry ? "configured" : "disabled"} retries`, () => {
        const { code } = generateService(primitiveUnionModel("enum", false), {
          ...spec,
          operationDecl: {
            contextType: "ExampleContext",
            commonErrorType: "ExampleError",
            commonErrorClasses: [],
            protocol: "ExampleProtocol",
            retry,
            overrides: () =>
              overridden ? { contextType: "PublicContext", protocol: "PublicProtocol" } : undefined,
          },
        });
        expect(code).toContain(`  protocol: ${overridden ? "PublicProtocol" : "ExampleProtocol"},`);
        expect(code).toContain(`  ${overridden ? "PublicContext" : "ExampleContext"}\n>`);
        if (retry) expect(code).toContain(`  retry: ${retry},`);
        else expect(code).not.toContain("  retry:");
      });
    }
  }
});

describe("primitive union generation", () => {
  for (const kind of ["enum", "intEnum"] as const) {
    for (const request of [false, true]) {
      test(`${kind}/Boolean stays open when ${request ? "request-reachable" : "response-only"}`, () => {
        const { code } = generateService(primitiveUnionModel(kind, request), spec);
        const primitive = kind === "enum" ? "string" : "number";
        expect(code).toContain(`export type Value = Mode | (${primitive} & {}) | boolean;`);
        expect(code).toContain(
          "export const Value: S.Codec<Value> = /*@__PURE__*/ S.Union([Mode, S.Boolean]);",
        );
        expect(code).toContain(
          kind === "enum" ? "export const Mode = S.String;" : "export const Mode = S.Number;",
        );
        expect(code).not.toContain("export type Value = Mode | boolean;");
      });
    }
  }

  test("opaque-cases retains its existing primitive union codec", () => {
    const { code } = generateService(primitiveUnionModel("enum", false), {
      ...spec,
      unionStyle: "opaque-cases",
    });
    expect(code).toContain("export type Value = Mode | boolean;");
    expect(code).toContain(
      "export const Value = /*@__PURE__*/ S.Unknown.pipe(T.UnionCases([[],[]]));",
    );
    expect(code).not.toContain("S.Union([Mode, S.Boolean])");
  });

  test("primitive union emission requires an explicit style", () => {
    expect(() =>
      generateService(primitiveUnionModel("enum", false), {
        ...spec,
        unionStyle: undefined,
      }),
    ).toThrow("no union emission configured for shape com.example.union#Value");
  });

  test("primitive style rejects object cases", () => {
    const model = primitiveUnionModel("enum", false);
    model.shapes["com.example.union#Value"].members.mode.target = "com.example.union#Request";
    expect(() => generateService(model, spec)).toThrow(
      "no union emission configured for shape com.example.union#Value",
    );
  });

  test("custom union emission retains precedence", () => {
    const { code } = generateService(primitiveUnionModel("enum", false), {
      ...spec,
      union: ({ name }) => [`export type ${name} = CustomUnion;`],
    });
    expect(code).toContain("export type Value = CustomUnion;");
    expect(code).not.toContain("S.Union([Mode, S.Boolean])");
  });
});

describe("models without operations", () => {
  const typesOnly = {
    smithy: "2.0",
    shapes: {
      "com.example.hooks#PingEvent": {
        type: "structure",
        members: { zen: { target: "smithy.api#String" } },
      },
    },
  };

  test("emit nothing by default", () => {
    expect(generateService(typesOnly, spec).code).toBe("");
  });

  test("emit the shapes extraRoots names", () => {
    const { code, operations } = generateService(typesOnly, {
      ...spec,
      extraRoots: () => ["com.example.hooks#PingEvent"],
    });
    expect(operations).toBe(0);
    expect(code).toContain("export interface PingEvent {");
  });
});

describe("operation type annotation overrides", () => {
  test("replace the annotation and cast the value to it", () => {
    const { code } = generateService(primitiveUnionModel("enum", false), {
      ...spec,
      operationDecl: {
        ...spec.operationDecl!,
        overrides: () => ({ typeAnnotation: "API.OperationMethod<A, B, C, D> & Overload" }),
      },
    });
    expect(code).toContain("export const getValue: API.OperationMethod<A, B, C, D> & Overload =");
    expect(code).toMatch(/\}\)\) as any;/);
  });
});

describe("pagination over a bare-array response", () => {
  const model = {
    smithy: "2.0",
    shapes: {
      "ns#Example": { type: "service", version: "1", operations: [{ target: "ns#ListThings" }] },
      "ns#ListThings": {
        type: "operation",
        input: { target: "ns#ListThingsRequest" },
        output: { target: "ns#ListThingsResponse" },
        traits: {
          "smithy.api#http": { method: "GET", uri: "/things" },
          "smithy.api#paginated": {
            mode: "link",
            inputToken: "page",
            pageSize: "per_page",
            items: "body",
          },
        },
      },
      "ns#ListThingsRequest": {
        type: "structure",
        traits: { "smithy.api#input": {} },
        members: {
          page: { target: "smithy.api#Integer", traits: { "smithy.api#httpQuery": "page" } },
          per_page: {
            target: "smithy.api#Integer",
            traits: { "smithy.api#httpQuery": "per_page" },
          },
        },
      },
      "ns#ListThingsResponse": {
        type: "structure",
        members: { body: { target: "ns#ThingList", traits: { "ns#raw": {} } } },
      },
      "ns#ThingList": { type: "list", member: { target: "ns#Thing" } },
      "ns#Thing": { type: "structure", members: { id: { target: "smithy.api#String" } } },
    },
  };
  const pageSpec: SdkSpec = {
    ...spec,
    extraBindings: [
      {
        trait: "ns#raw",
        binding: "rawResponse",
        pipe: "T.RawResponse()",
        rootPipe: "T.RawResponseRoot()",
      },
    ],
    paginationProfiles: { link: { strategy: "paginateLink", itemsFallback: "" } },
  };

  test("items naming the sole member keeps the response the array and types items as its element", () => {
    const { code } = generateService(model, pageSpec);
    expect(code).toContain("export type ListThingsResponse = ThingList;");
    expect(code).toMatch(
      /PaginatedOperationMethod<\s*ListThingsRequest,\s*ListThingsResponse,\s*ListThingsError,\s*ExampleContext,\s*Thing\s*>/,
    );
  });

  test("a profile that injects a page member keeps the struct form", () => {
    const { code } = generateService(model, {
      ...pageSpec,
      paginationProfiles: {
        link: {
          strategy: "paginateLink",
          itemsFallback: "",
          syntheticOutputs: ["resultInfo"],
          injectOutputMember: {
            tsName: "resultInfo",
            interfaceLines: ["  resultInfo?: string | null;"],
            structLine: `  "resultInfo": S.optional(S.NullOr(S.String)),`,
          },
        },
      },
    });
    expect(code).not.toContain("export type ListThingsResponse = ThingList;");
    expect(code).toContain("resultInfo?: string | null;");
  });
});
