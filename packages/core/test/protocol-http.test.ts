import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { InvalidInput } from "../src/errors.ts";
import { buildRequest, mapKeys } from "../src/protocol-http.ts";
import { SensitiveValue, wrapSensitive } from "../src/protocol-rest.ts";
import * as S from "../src/schema.ts";
import * as T from "../src/trait.ts";

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
  const request = Effect.runSync(
    buildRequest({
      input,
      inputAst: JsonInput.ast,
      baseUrl: "https://example.test",
    }),
  );
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

describe("URI label encoding", () => {
  const input = (preserve?: string) =>
    S.Struct({
      scope:
        preserve === undefined
          ? S.String.pipe(T.Label())
          : S.String.pipe(T.Label(), T.LabelEncoding({ preserve })),
    }).pipe(T.Http({ method: "POST", uri: "/runtime/{scope}" }));
  const url = (scope: string, preserve?: string) =>
    Effect.runSync(
      buildRequest({
        input: { scope },
        inputAst: input(preserve).ast,
        baseUrl: "https://example.test",
      }),
    ).url;

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

describe("greedy labels", () => {
  const ScopedInput = S.Struct({
    scope: S.String.pipe(T.Label()),
    name: S.String.pipe(T.Label()),
  }).pipe(T.Http({ method: "GET", uri: "/{scope+}/providers/Things/{name}" }));

  const request = (input: unknown) =>
    buildRequest({
      input,
      inputAst: ScopedInput.ast,
      baseUrl: "https://example.test",
    });
  const urlOf = (input: unknown) => Effect.runSync(request(input)).url;

  test("keeps slashes and drops the leading slash of the value", () => {
    expect(urlOf({ scope: "/subscriptions/abc/resourceGroups/my rg", name: "a/b" })).toBe(
      "https://example.test/subscriptions/abc/resourceGroups/my%20rg/providers/Things/a%2Fb",
    );
  });

  test("accepts a value without a leading slash", () => {
    expect(urlOf({ scope: "subscriptions/abc", name: "x" })).toBe(
      "https://example.test/subscriptions/abc/providers/Things/x",
    );
  });

  test("an empty value or an empty, `.` or `..` segment fails with InvalidInput", () => {
    for (const scope of [
      "",
      "//",
      "subscriptions/s/resourceGroups/",
      "subscriptions/s//resourceGroups/rg",
      "subscriptions/s/./resourceGroups/rg",
      "/subscriptions/s/resourceGroups/rg/../../..",
    ]) {
      const error = Effect.runSync(Effect.flip(request({ scope, name: "x" })));
      expect(error).toBeInstanceOf(InvalidInput);
      expect(error.member).toBe("scope");
    }
  });

  test("sends a `/` value followed by more path as the root (Azure's tenant scope)", () => {
    expect(urlOf({ scope: "/", name: "x" })).toBe("https://example.test/providers/Things/x");
  });
});

describe("dot-segment labels", () => {
  const schema = S.Struct({ id: S.String.pipe(T.Label()) }).pipe(
    T.Http({ method: "DELETE", uri: "/things/{id}" }),
  );
  const request = (id: string) =>
    buildRequest({ input: { id }, inputAst: schema.ast, baseUrl: "https://example.test" });
  const build = (id: string) => Effect.runSync(request(id));

  // The URL parser resolves a `.` or `..` segment, so `DELETE /things/..`
  // would go out as `DELETE /`.
  test("a `.` or `..` label fails with InvalidInput before anything is sent", () => {
    for (const id of [".", ".."]) {
      const error = Effect.runSync(Effect.flip(request(id)));
      expect(error).toBeInstanceOf(InvalidInput);
      expect(error.member).toBe("id");
    }
  });

  test("other dotted labels are sent as written", () => {
    expect(build("...").url).toBe("https://example.test/things/...");
    expect(build("a.b").url).toBe("https://example.test/things/a.b");
  });
});

describe("empty labels", () => {
  const build = (method: "GET" | "DELETE", uri: string, input: Record<string, string>) =>
    buildRequest({
      input,
      inputAst: S.Struct(
        Object.fromEntries(Object.keys(input).map((k) => [k, S.String.pipe(T.Label())])),
      ).pipe(T.Http({ method, uri })).ast,
      baseUrl: "https://example.test",
    });

  test("an empty label fails with InvalidInput before anything is sent", () => {
    for (const [method, uri, input] of [
      ["DELETE", "/projects/{project_id}", { project_id: "" }],
      ["GET", "/projects/{project_id}/branches/{branch_id}", { project_id: "", branch_id: "b1" }],
    ] as const) {
      const error = Effect.runSync(Effect.flip(build(method, uri, input)));
      expect(error).toBeInstanceOf(InvalidInput);
      expect(error.member).toBe("project_id");
    }
  });

  // GitHub's `GET .../contents/{path}` with `path: ""` lists the repository root.
  test("an empty label ending the path of a GET is sent", () => {
    expect(
      Effect.runSync(
        build("GET", "/repos/{owner}/{repo}/contents/{path}", {
          owner: "o",
          repo: "r",
          path: "",
        }),
      ).url,
    ).toBe("https://example.test/repos/o/r/contents/");
  });
});

describe("multipart binary parts", () => {
  const schema = S.Struct({ zip: S.Unknown, environment: S.String }).pipe(
    T.Http({ method: "POST", uri: "/deployments", contentType: "multipart" }),
  );

  test("preserves typed-array slices and an already JSON-encoded environment", async () => {
    const input = new Uint8Array([99, 80, 75, 0, 255, 99]).subarray(1, 5);
    const environment = JSON.stringify({ SECRET: "value", REMOVED: "" });
    const request = Effect.runSync(
      buildRequest({
        input: { zip: input, environment },
        inputAst: schema.ast,
        baseUrl: "https://example.test",
      }),
    );
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
      const request = Effect.runSync(
        buildRequest({
          input: { zip, environment: "{}" },
          inputAst: schema.ast,
          baseUrl: "https://example.test",
        }),
      );
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
