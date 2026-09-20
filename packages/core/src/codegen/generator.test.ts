import { describe, expect, test } from "bun:test";
import { generateService, type SdkSpec } from "./generator.ts";

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
  operationDecl: {
    contextType: "ExampleContext",
    commonErrorType: "ExampleError",
    commonErrorClasses: [],
    protocol: "ExampleProtocol",
    retry: "Retry.Retry",
  },
};

describe("primitive union generation", () => {
  for (const kind of ["enum", "intEnum"] as const) {
    for (const request of [false, true]) {
      test(`${kind}/Boolean stays open when ${request ? "request-reachable" : "response-only"}`, () => {
        const { code } = generateService(
          primitiveUnionModel(kind, request),
          spec,
        );
        const primitive = kind === "enum" ? "string" : "number";
        expect(code).toContain(
          `export type Value = Mode | (${primitive} & {}) | boolean;`,
        );
        expect(code).toContain(
          "export const Value: S.Codec<Value> = /*@__PURE__*/ S.Union([Mode, S.Boolean]);",
        );
        expect(code).toContain(
          kind === "enum"
            ? "export const Mode = S.String;"
            : "export const Mode = S.Number;",
        );
        expect(code).not.toContain("export type Value = Mode | boolean;");
      });
    }
  }

  test("custom union emission retains precedence", () => {
    const { code } = generateService(primitiveUnionModel("enum", false), {
      ...spec,
      union: ({ name }) => [`export type ${name} = CustomUnion;`],
    });
    expect(code).toContain("export type Value = CustomUnion;");
    expect(code).not.toContain("S.Union([Mode, S.Boolean])");
  });
});
