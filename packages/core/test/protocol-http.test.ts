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

describe("empty JSON bodies", () => {
  const Empty = S.Struct({}).pipe(T.Http({ method: "POST", uri: "/rpc.Service/List" }));
  const build = (emptyJsonBody?: boolean) =>
    Effect.runSync(
      buildRequest({
        input: {},
        inputAst: Empty.ast,
        baseUrl: "https://example.test",
        ...(emptyJsonBody === undefined ? {} : { emptyJsonBody }),
      }),
    );

  test("a POST with no body members sends no body by default", () => {
    expect(build().body._tag).toBe("Empty");
  });

  test("emptyJsonBody sends {} as JSON", () => {
    const body = build(true).body as { readonly _tag: string; readonly body?: Uint8Array };
    expect(body._tag).toBe("Uint8Array");
    expect(new TextDecoder().decode(body.body)).toBe("{}");
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

  const urlOf = (input: unknown) =>
    Effect.runSync(
      buildRequest({
        input,
        inputAst: ScopedInput.ast,
        baseUrl: "https://example.test",
      }),
    ).url;

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
      expect((error as InvalidInput).member).toBe("id");
    }
  });

  test("other dotted labels are sent as written", () => {
    expect(build("...").url).toBe("https://example.test/things/...");
    expect(build("a.b").url).toBe("https://example.test/things/a.b");
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

describe("multipart file lists", () => {
  const schema = S.Struct({
    documents: S.optional(S.Array(S.Unknown)),
    attachments: S.optional(S.Array(S.Unknown).pipe(T.Body("files[]"))),
    tags: S.optional(S.Array(S.String)),
    database: S.String,
  }).pipe(T.Http({ method: "POST", uri: "/context/ingest", contentType: "multipart" }));

  const formOf = (input: unknown): FormData => {
    const request = Effect.runSync(
      buildRequest({ input, inputAst: schema.ast, baseUrl: "https://example.test" }),
    );
    if (request.body._tag !== "FormData") throw new Error("Expected multipart");
    return request.body.formData;
  };

  const partsOf = (form: FormData, name: string) =>
    Promise.all(
      form.getAll(name).map(async (part) => {
        if (!(part instanceof File)) throw new Error(`${name}: expected a file part`);
        return { filename: part.name, bytes: [...new Uint8Array(await part.arrayBuffer())] };
      }),
    );

  test("every file in a list is a part under the member's wire name, with its own filename", async () => {
    const form = formOf({
      database: "acme_corp",
      documents: [
        new File([new Uint8Array([1, 2])], "policy.pdf"),
        new File([new Uint8Array([3])], "notes.txt"),
      ],
    });
    expect(await partsOf(form, "documents")).toEqual([
      { filename: "policy.pdf", bytes: [1, 2] },
      { filename: "notes.txt", bytes: [3] },
    ]);
    expect(form.has("policy.pdf")).toBe(false);
    expect(form.has("notes.txt")).toBe(false);
    expect(form.get("database")).toBe("acme_corp");
  });

  test("a renamed member keeps its wire name and the File's path-like filename", async () => {
    const form = formOf({
      database: "acme_corp",
      attachments: [new File([new Uint8Array([9])], "skill/SKILL.md")],
    });
    expect(await partsOf(form, "files[]")).toEqual([{ filename: "skill/SKILL.md", bytes: [9] }]);
    expect(form.has("attachments")).toBe(false);
  });

  test("a nameless Blob, a Uint8Array and an ArrayBuffer are binary parts named after the member", async () => {
    const form = formOf({
      database: "acme_corp",
      documents: [
        new Blob([new Uint8Array([4, 5])]),
        new Uint8Array([99, 6, 7, 99]).subarray(1, 3),
        new Uint8Array([8]).buffer,
      ],
    });
    expect(await partsOf(form, "documents")).toEqual([
      { filename: "documents", bytes: [4, 5] },
      { filename: "documents", bytes: [6, 7] },
      { filename: "documents", bytes: [8] },
    ]);
  });

  test("a list of non-binary values is still one JSON part", () => {
    const form = formOf({ database: "acme_corp", tags: ["a", "b"] });
    expect(form.getAll("tags")).toEqual([JSON.stringify(["a", "b"])]);
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

describe("sensitive untyped members", () => {
  const schema = S.Struct({
    environment: S.NullOr(S.Unknown).pipe(SensitiveValue()),
    config: S.NullOr(
      S.Struct({ name: S.String, secret: S.NullOr(S.String).pipe(SensitiveValue()) }),
    ).pipe(SensitiveValue()),
  });

  test("an untyped object is redacted whole; a typed struct is walked", () => {
    const environment = { AWS_ACCESS_KEY_ID: "fixture-id", AWS_SECRET_ACCESS_KEY: "fixture-key" };
    const wrapped = wrapSensitive(schema.ast, {
      environment,
      config: { name: "files", secret: "fixture-secret" },
    }) as any;
    expect(Redacted.isRedacted(wrapped.environment)).toBe(true);
    expect(Redacted.value(wrapped.environment)).toEqual(environment);
    expect(wrapped.config).toEqual({ name: "files", secret: Redacted.make("fixture-secret") });
    expect(String(wrapped.environment)).not.toContain("fixture-key");
    expect(wrapSensitive(schema.ast, wrapped)).toEqual(wrapped);
  });

  test("null stays null", () => {
    expect(wrapSensitive(schema.ast, { environment: null, config: null })).toEqual({
      environment: null,
      config: null,
    });
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

describe("UnionCases member dictionaries", () => {
  const dict = { className: "class_name", scriptName: "script_name" };
  const content = { className: "kept", nested: { scriptName: "kept" } };
  // Worker-binding shaped: `props` is the caller's own JSON (`{}` dictionary).
  const bindings = S.Unknown.pipe(
    T.UnionCases(
      [
        ["type", "name", "service", "props"],
        ["type", "name", "className", "scriptName"],
      ],
      { key: "type", values: ["service", "durable_object_namespace"] },
      [{ props: {} }, {}],
    ),
  );

  test("encode keeps the member's keys and renames the rest", () => {
    expect(
      mapKeys(
        bindings.ast,
        { type: "service", name: "A", service: "s", props: content },
        "encode",
        dict,
      ),
    ).toEqual({ type: "service", name: "A", service: "s", props: content });
    expect(
      mapKeys(
        bindings.ast,
        { type: "durable_object_namespace", name: "B", className: "C", scriptName: "w" },
        "encode",
        dict,
      ),
    ).toEqual({ type: "durable_object_namespace", name: "B", class_name: "C", script_name: "w" });
  });

  test("decode keeps the member's keys", () => {
    const wire = { class_name: "kept", nested: { script_name: "kept" } };
    expect(
      mapKeys(
        bindings.ast,
        { type: "service", name: "A", service: "s", props: wire, class_name: null },
        "decode",
        dict,
      ),
    ).toEqual({ type: "service", name: "A", service: "s", props: wire });
  });
});
