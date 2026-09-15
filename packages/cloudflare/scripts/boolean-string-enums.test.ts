import { describe, expect, test } from "bun:test";
import { booleanStringEnums } from "./boolean-string-enums.ts";

const STRING_ENCODED = "com.cloudflare.protocols#stringEncoded";

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
      "com.cloudflare.x#Flag": boolEnum,
      "com.cloudflare.x#Request": {
        type: "structure",
        traits: { "smithy.api#input": {} },
        members: { validation_enabled: { target: "com.cloudflare.x#Flag" } },
      },
    });
    expect(booleanStringEnums(m)).toEqual({ members: 1, lists: 0 });
    const member =
      m.shapes["com.cloudflare.x#Request"].members.validation_enabled;
    expect(member.target).toBe("smithy.api#Boolean");
    expect(member.traits[STRING_ENCODED]).toEqual({});
  });

  test("leaves response members alone", () => {
    const m = model({
      "com.cloudflare.x#Flag": boolEnum,
      "com.cloudflare.x#Response": {
        type: "structure",
        members: { active: { target: "com.cloudflare.x#Flag" } },
      },
    });
    expect(booleanStringEnums(m)).toEqual({ members: 0, lists: 0 });
    expect(m.shapes["com.cloudflare.x#Response"].members.active.target).toBe(
      "com.cloudflare.x#Flag",
    );
  });

  test("retargets a request-only list's element type", () => {
    const m = model({
      "com.cloudflare.x#Flag": boolEnum,
      "com.cloudflare.x#FlagList": {
        type: "list",
        member: { target: "com.cloudflare.x#Flag" },
      },
      "com.cloudflare.x#Request": {
        type: "structure",
        traits: { "smithy.api#input": {} },
        members: { unique_entries: { target: "com.cloudflare.x#FlagList" } },
      },
    });
    expect(booleanStringEnums(m)).toEqual({ members: 1, lists: 1 });
    expect(m.shapes["com.cloudflare.x#FlagList"].member.target).toBe(
      "smithy.api#Boolean",
    );
  });

  test("leaves a list a response also uses", () => {
    const m = model({
      "com.cloudflare.x#Flag": boolEnum,
      "com.cloudflare.x#FlagList": {
        type: "list",
        member: { target: "com.cloudflare.x#Flag" },
      },
      "com.cloudflare.x#Request": {
        type: "structure",
        traits: { "smithy.api#input": {} },
        members: { unique_entries: { target: "com.cloudflare.x#FlagList" } },
      },
      "com.cloudflare.x#Response": {
        type: "structure",
        members: { seen: { target: "com.cloudflare.x#FlagList" } },
      },
    });
    expect(booleanStringEnums(m)).toEqual({ members: 0, lists: 0 });
    expect(m.shapes["com.cloudflare.x#FlagList"].member.target).toBe(
      "com.cloudflare.x#Flag",
    );
  });

  test("leaves an enum that is not exactly true/false", () => {
    const m = model({
      "com.cloudflare.x#Tri": {
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
      "com.cloudflare.x#Request": {
        type: "structure",
        traits: { "smithy.api#input": {} },
        members: { mode: { target: "com.cloudflare.x#Tri" } },
      },
    });
    expect(booleanStringEnums(m)).toEqual({ members: 0, lists: 0 });
  });
});
