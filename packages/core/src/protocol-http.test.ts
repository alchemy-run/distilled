import { describe, expect, test } from "bun:test";
import { buildRequest, mapKeys } from "./protocol-http.ts";
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

describe("URI label encoding", () => {
  const input = (preserve?: string) =>
    S.Struct({
      scope:
        preserve === undefined
          ? S.String.pipe(T.Label())
          : S.String.pipe(T.Label(), T.LabelEncoding({ preserve })),
    }).pipe(T.Http({ method: "POST", uri: "/runtime/{scope}" }));
  const url = (scope: string, preserve?: string) =>
    buildRequest({
      input: { scope },
      inputAst: input(preserve).ast,
      baseUrl: "https://example.test",
    }).url;

  test("keeps the existing escaping unless a model opts in", () => {
    expect(url("__KV:abc")).toBe("https://example.test/runtime/__KV%3Aabc");
    expect(url("__KV:abc", ":")).toBe("https://example.test/runtime/__KV:abc");
  });

  test("preserves only modeled pchar delimiters, not separators or escapes", () => {
    expect(url("__KV:a/b?c#d%3Aé", ":")).toBe(
      "https://example.test/runtime/__KV:a%2Fb%3Fc%23d%253A%C3%A9",
    );
    expect(url("$&:@", "$&:")).toBe("https://example.test/runtime/$&:%40");
  });

  test("refuses unsafe preservation rules", () => {
    for (const preserve of ["/", "?", "#", "%", "\\r", "[", "]"]) {
      expect(() => T.LabelEncoding({ preserve })).toThrow(TypeError);
    }
  });
});

describe("UnionCases decoding", () => {
  const cases = [
    ["id", "type", "zoneName"],
    ["id", "type", "accountName"],
  ];
  const merged = {
    id: "1",
    type: "account",
    zoneName: "zone-a",
    accountName: "acct-a",
  };
  const decode = (schema: S.Schema<unknown>, value: unknown) =>
    mapKeys(schema.ast, value, "decode");

  test("the discriminator picks the case key sets cannot tell apart", () => {
    const schema = S.Unknown.pipe(
      T.UnionCases(cases, { key: "type", values: ["zone", "account"] }),
    );
    expect(decode(schema, merged)).toEqual({
      id: "1",
      type: "account",
      accountName: "acct-a",
    });
    expect(decode(schema, { ...merged, type: "zone" })).toEqual({
      id: "1",
      type: "zone",
      zoneName: "zone-a",
    });
  });

  test("an unknown tag falls back to key-set scoring", () => {
    const schema = S.Unknown.pipe(
      T.UnionCases(cases, { key: "type", values: ["zone", "account"] }),
    );
    expect(
      decode(schema, { ...merged, type: "other", accountName: null }),
    ).toEqual({
      id: "1",
      type: "other",
      zoneName: "zone-a",
    });
  });

  test("without a discriminator the best-explaining case wins", () => {
    const schema = S.Unknown.pipe(T.UnionCases(cases));
    expect(decode(schema, { ...merged, zoneName: null })).toEqual({
      id: "1",
      type: "account",
      accountName: "acct-a",
    });
  });
});
