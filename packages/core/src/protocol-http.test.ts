import { describe, expect, test } from "bun:test";
import * as Redacted from "effect/Redacted";
import { buildRequest, mapKeys } from "./protocol-http.ts";
import { SensitiveValue, wrapSensitive } from "./protocol-rest.ts";
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
  nullable: S.optional(S.NullOr(S.Boolean).pipe(T.Body("nullable"), T.StringEncoded())),
  flags: S.optional(S.Array(S.Boolean).pipe(T.Body("flags"), T.StringEncoded())),
  profile: S.optional(
    S.Struct({
      nested: S.optional(S.Boolean.pipe(T.Body("nested_flag"), T.StringEncoded())),
      plain: S.optional(S.Boolean.pipe(T.Body("plain_flag"))),
    }).pipe(T.Body("profile")),
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

  test("a member nested in a body struct stringifies too", () => {
    expect(jsonBodyOf({ profile: { nested: true, plain: true } })).toEqual({
      profile: { nested_flag: "true", plain_flag: true },
    });
  });

  test("null stays null and an omitted member stays omitted", () => {
    expect(jsonBodyOf({ nullable: null })).toEqual({ nullable: null });
    expect(jsonBodyOf({})).toEqual({});
  });
});

describe("multipart binary parts", () => {
  const schema = S.Struct({ zip: S.Unknown, environment: S.String }).pipe(
    T.Http({ method: "POST", uri: "/deployments", contentType: "multipart" }),
  );

  test("preserves typed-array slices and an already JSON-encoded environment", async () => {
    const input = new Uint8Array([99, 80, 75, 0, 255, 99]).subarray(1, 5);
    const environment = JSON.stringify({ SECRET: "value", REMOVED: "" });
    const request = buildRequest({
      input: { zip: input, environment },
      inputAst: schema.ast,
      baseUrl: "https://example.test",
    });
    if (request.body._tag !== "FormData") throw new Error("Expected multipart");
    const part = request.body.formData.get("zip");
    expect(part).toBeInstanceOf(File);
    expect(new Uint8Array(await (part as File).arrayBuffer())).toEqual(input);
    expect(request.body.formData.getAll("environment")).toEqual([environment]);
    const wire = new Request(request.url, {
      method: "POST",
      body: request.body.formData,
    });
    expect(wire.headers.get("content-type")).toContain("multipart/form-data; boundary=");
  });

  test("preserves File names and ArrayBuffer bytes", async () => {
    for (const zip of [
      new File([new Uint8Array([80, 75, 255])], "bundle.zip"),
      new Uint8Array([80, 75, 255]).buffer,
    ]) {
      const request = buildRequest({
        input: { zip, environment: "{}" },
        inputAst: schema.ast,
        baseUrl: "https://example.test",
      });
      if (request.body._tag !== "FormData") throw new Error("Expected multipart");
      const part = request.body.formData.get("zip") as File;
      expect(part.name).toBe(zip instanceof File ? "bundle.zip" : "zip");
      expect(new Uint8Array(await part.arrayBuffer())).toEqual(new Uint8Array([80, 75, 255]));
    }
  });
});

describe("sensitive union responses", () => {
  const schema = S.suspend(() =>
    S.Union([
      S.Struct({
        type: S.Literal("standard"),
        password: S.String.pipe(SensitiveValue()),
      }),
      S.Struct({
        type: S.Literal("token"),
        token: S.String.pipe(SensitiveValue()),
      }),
      S.Struct({ type: S.Literal("shared") }),
    ]),
  );

  test("all arms redact their secrets, even in partial or ambiguous responses", () => {
    for (const value of [
      { type: "standard", password: "fixture-password" },
      { type: "token", token: "fixture-token" },
      { password: "fixture-password", token: "fixture-token" },
    ]) {
      const wrapped = wrapSensitive(schema.ast, value);
      expect(wrapped).toEqual(
        Object.fromEntries(
          Object.entries(value).map(([key, value]) => [
            key,
            key === "type" ? value : Redacted.make(value),
          ]),
        ),
      );
      expect(JSON.stringify(wrapped)).not.toContain("fixture-password");
      expect(JSON.stringify(wrapped)).not.toContain("fixture-token");
      expect(wrapSensitive(schema.ast, wrapped)).toEqual(wrapped);
    }
  });

  test("nested arrays and optional nullable unions preserve nonsecret values", () => {
    const nested = S.Struct({
      provider: S.optional(S.NullOr(schema)),
      providers: S.Array(schema),
    });
    for (const value of [{}, { provider: null }, { provider: { type: "shared" } }]) {
      expect(
        wrapSensitive(nested.ast, {
          ...value,
          providers: [{ type: "standard", password: "fixture-password" }, { type: "shared" }],
        }),
      ).toEqual({
        ...value,
        providers: [
          { type: "standard", password: Redacted.make("fixture-password") },
          { type: "shared" },
        ],
      });
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
    expect(decode(schema, { ...merged, type: "other", accountName: null })).toEqual({
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
