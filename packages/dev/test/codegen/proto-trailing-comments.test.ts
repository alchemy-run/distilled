import { describe, expect, test } from "vitest";
import { parseProto } from "../../src/codegen/proto.ts";

const source = `
syntax = "proto3";
package example.v1;

message Spec {
    string name = 1;  // Immutable; letters, digits or hyphens.
    // Where the box runs.
    string site = 2;
    string creator = 3; /* E.g. user_... */
    string volume = 4;
}

enum Mode {
    MODE_UNSPECIFIED = 0; // Not set.
    // Shared with the tenant.
    MODE_TENANT = 1;
    MODE_PRIVATE = 2;
}
`;

describe("proto trailing comments", () => {
  const file = parseProto(source);
  const fields = Object.fromEntries(
    file.messages[0]!.fields.map((field) => [field.name, field.documentation]),
  );
  const values = Object.fromEntries(
    file.enums[0]!.values.map((value) => [value.name, value.documentation]),
  );

  test("a same-line comment documents the field it follows", () => {
    expect(fields).toEqual({
      name: "Immutable; letters, digits or hyphens.",
      site: "Where the box runs.",
      creator: "E.g. user_...",
      volume: undefined,
    });
  });

  test("enum values take trailing comments the same way", () => {
    expect(values).toEqual({
      MODE_UNSPECIFIED: "Not set.",
      MODE_TENANT: "Shared with the tenant.",
      MODE_PRIVATE: undefined,
    });
  });
});
