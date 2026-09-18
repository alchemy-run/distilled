import { describe, expect, test } from "bun:test";
import { booleanStringEnums, STRING_ENCODED_TRAIT } from "./boolean-string-enums.ts";
import { generateService } from "./generator.ts";

const boolEnum = {
  type: "enum",
  members: {
    TRUE: {
      target: "smithy.api#Unit",
      traits: { "smithy.api#enumValue": "true" },
    },
    FALSE: {
      target: "smithy.api#Unit",
      traits: { "smithy.api#enumValue": "false" },
    },
  },
};

const model = (shapes: Record<string, any>) => ({ smithy: "2.0", shapes });

describe("booleanStringEnums", () => {
  test("retargets a request member and stamps the trait", () => {
    const m = model({
      "com.example.x#Flag": boolEnum,
      "com.example.x#Request": {
        type: "structure",
        traits: { "smithy.api#input": {} },
        members: { validation_enabled: { target: "com.example.x#Flag" } },
      },
    });
    expect(booleanStringEnums(m)).toEqual({ members: 1, lists: 0 });
    const member = m.shapes["com.example.x#Request"].members.validation_enabled;
    expect(member.target).toBe("smithy.api#Boolean");
    expect(member.traits[STRING_ENCODED_TRAIT]).toEqual({});
  });

  test("leaves response members alone", () => {
    const m = model({
      "com.example.x#Flag": boolEnum,
      "com.example.x#Response": {
        type: "structure",
        members: { active: { target: "com.example.x#Flag" } },
      },
    });
    expect(booleanStringEnums(m)).toEqual({ members: 0, lists: 0 });
    expect(m.shapes["com.example.x#Response"].members.active.target).toBe("com.example.x#Flag");
  });

  test("retargets a request-only list's element type", () => {
    const m = model({
      "com.example.x#Flag": boolEnum,
      "com.example.x#FlagList": {
        type: "list",
        member: { target: "com.example.x#Flag" },
      },
      "com.example.x#Request": {
        type: "structure",
        traits: { "smithy.api#input": {} },
        members: { unique_entries: { target: "com.example.x#FlagList" } },
      },
    });
    expect(booleanStringEnums(m)).toEqual({ members: 1, lists: 1 });
    expect(m.shapes["com.example.x#FlagList"].member.target).toBe("smithy.api#Boolean");
  });

  test("leaves a list a response also uses", () => {
    const m = model({
      "com.example.x#Flag": boolEnum,
      "com.example.x#FlagList": {
        type: "list",
        member: { target: "com.example.x#Flag" },
      },
      "com.example.x#Request": {
        type: "structure",
        traits: { "smithy.api#input": {} },
        members: { unique_entries: { target: "com.example.x#FlagList" } },
      },
      "com.example.x#Response": {
        type: "structure",
        members: { seen: { target: "com.example.x#FlagList" } },
      },
    });
    expect(booleanStringEnums(m)).toEqual({ members: 0, lists: 0 });
    expect(m.shapes["com.example.x#FlagList"].member.target).toBe("com.example.x#Flag");
  });

  test("leaves an enum that is not exactly true/false", () => {
    const m = model({
      "com.example.x#Tri": {
        type: "enum",
        members: {
          TRUE: {
            target: "smithy.api#Unit",
            traits: { "smithy.api#enumValue": "true" },
          },
          FALSE: {
            target: "smithy.api#Unit",
            traits: { "smithy.api#enumValue": "false" },
          },
          AUTO: {
            target: "smithy.api#Unit",
            traits: { "smithy.api#enumValue": "auto" },
          },
        },
      },
      "com.example.x#Request": {
        type: "structure",
        traits: { "smithy.api#input": {} },
        members: { mode: { target: "com.example.x#Tri" } },
      },
    });
    expect(booleanStringEnums(m)).toEqual({ members: 0, lists: 0 });
  });
});

describe("generateService", () => {
  test("emits a boolean piped through T.StringEncoded()", () => {
    const { code } = generateService(
      model({
        "com.example.x#Example": {
          type: "service",
          version: "2024-01-01",
          operations: [{ target: "com.example.x#GetThing" }],
        },
        "com.example.x#GetThing": {
          type: "operation",
          input: { target: "com.example.x#GetThingRequest" },
          output: { target: "smithy.api#Unit" },
          traits: { "smithy.api#http": { method: "GET", uri: "/things" } },
        },
        "com.example.x#GetThingRequest": {
          type: "structure",
          traits: { "smithy.api#input": {} },
          members: {
            verbose: {
              target: "com.example.x#Flag",
              traits: { "smithy.api#httpQuery": "verbose" },
            },
          },
        },
        "com.example.x#Flag": boolEnum,
      }),
      {
        operationDecl: {
          contextType: "ExampleOpContext",
          commonErrorType: "ExampleOpError",
          commonErrorClasses: [],
          protocol: "ExampleProtocol",
          retry: "Retry.Retry",
        },
      },
    );
    expect(code).toContain('"verbose": S.optional(S.Boolean.pipe(T.Query(), T.StringEncoded())),');
    expect(code).toContain("verbose?: boolean;");
    expect(code).not.toContain('"true" | "false"');
  });
});
