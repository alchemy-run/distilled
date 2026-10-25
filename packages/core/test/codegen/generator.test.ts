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

describe("sensitive map values", () => {
  const mapModel = (valueTraits?: Record<string, unknown>) => ({
    smithy: "2.0",
    shapes: {
      "ns#Example": {
        type: "service",
        version: "1",
        operations: [{ target: "ns#GetHook" }],
      },
      "ns#GetHook": {
        type: "operation",
        input: { target: "smithy.api#Unit" },
        output: { target: "ns#Output" },
        traits: { "smithy.api#http": { method: "GET", uri: "/hook" } },
      },
      "ns#Output": {
        type: "structure",
        members: { headers: { target: "ns#Headers" } },
      },
      "ns#Headers": {
        type: "map",
        key: { target: "smithy.api#String" },
        value: { target: "smithy.api#String", ...(valueTraits ? { traits: valueTraits } : {}) },
      },
    },
  });

  const sensitiveSpec: SdkSpec = {
    ...spec,
    memberTraitPipes: { "smithy.api#sensitive": "T.SensitiveValue" },
    memberTsType: (m) =>
      "smithy.api#sensitive" in m.traits ? "string | Redacted.Redacted<string>" : undefined,
  };

  test("a map value marked sensitive is generated as a secret, like a sensitive field", () => {
    const { code } = generateService(mapModel({ "smithy.api#sensitive": {} }), sensitiveSpec);
    expect(code).toContain(
      "export type Headers = { [key: string]: string | Redacted.Redacted<string> | undefined };",
    );
    expect(code).toContain(
      "export const Headers = /*@__PURE__*/ S.Record(S.String, S.String.pipe(T.SensitiveValue({}))) as any as S.Schema<Headers>;",
    );
  });
});

describe("sensitive list members", () => {
  const listModel = (memberTraits?: Record<string, unknown>) => ({
    smithy: "2.0",
    shapes: {
      "ns#Example": {
        type: "service",
        version: "1",
        operations: [{ target: "ns#GetHook" }],
      },
      "ns#GetHook": {
        type: "operation",
        input: { target: "smithy.api#Unit" },
        output: { target: "ns#Output" },
        traits: { "smithy.api#http": { method: "GET", uri: "/hook" } },
      },
      "ns#Output": {
        type: "structure",
        members: { tokens: { target: "ns#Tokens" } },
      },
      "ns#Tokens": {
        type: "list",
        member: { target: "smithy.api#String", ...(memberTraits ? { traits: memberTraits } : {}) },
      },
    },
  });

  const sensitiveSpec: SdkSpec = {
    ...spec,
    memberTraitPipes: { "smithy.api#sensitive": "T.SensitiveValue" },
    memberTsType: (m) =>
      "smithy.api#sensitive" in m.traits ? "string | Redacted.Redacted<string>" : undefined,
  };

  test("a list member marked sensitive is generated as a secret, like a sensitive field", () => {
    const { code } = generateService(listModel({ "smithy.api#sensitive": {} }), sensitiveSpec);
    expect(code).toContain("export type Tokens = Array<string | Redacted.Redacted<string>>;");
    expect(code).toContain(
      "export const Tokens = /*@__PURE__*/ S.Array(S.String.pipe(T.SensitiveValue({}))) as any as S.Schema<Tokens>;",
    );
  });
});
