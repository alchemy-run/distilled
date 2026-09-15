import { describe, expect, test } from "bun:test";
import { buildRequest } from "./protocol-http.ts";
import * as S from "./schema.ts";
import * as T from "./trait.ts";

/**
 * `T.StringEncoded()`: the member's TS type stays natural (boolean) but the
 * wire carries its string spelling, for APIs that document the field as the
 * enum `"true" | "false"` rather than a JSON boolean.
 */
const JsonInput = S.Struct({
  flag: S.optional(S.Boolean.pipe(T.Body("flag"), T.StringEncoded())),
  plain: S.optional(S.Boolean.pipe(T.Body("plain"))),
  nullable: S.optional(
    S.NullOr(S.Boolean).pipe(T.Body("nullable"), T.StringEncoded()),
  ),
  flags: S.optional(
    S.Array(S.Boolean).pipe(T.Body("flags"), T.StringEncoded()),
  ),
}).pipe(T.Http({ method: "POST", uri: "/things" }));

const jsonBodyOf = (input: unknown): unknown => {
  const request = buildRequest({
    input,
    inputAst: JsonInput.ast,
    baseUrl: "https://example.test",
  });
  const body = request.body as { readonly body?: string };
  return JSON.parse(body.body ?? "{}");
};

describe("StringEncoded members", () => {
  test("booleans serialize as their string spelling", () => {
    expect(jsonBodyOf({ flag: true, plain: true })).toEqual({
      flag: "true",
      plain: true,
    });
    expect(jsonBodyOf({ flag: false, plain: false })).toEqual({
      flag: "false",
      plain: false,
    });
  });

  test("a list stringifies element-wise", () => {
    expect(jsonBodyOf({ flags: [true, false] })).toEqual({
      flags: ["true", "false"],
    });
  });

  test("null stays null and an omitted member stays omitted", () => {
    expect(jsonBodyOf({ nullable: null })).toEqual({ nullable: null });
    expect(jsonBodyOf({})).toEqual({});
  });
});
