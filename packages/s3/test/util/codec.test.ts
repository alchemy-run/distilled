import * as L from "@distilled.cloud/core/schema-lite-impl";
import * as Redacted from "effect/Redacted";
import { describe, expect, it } from "vitest";
import { ParseError } from "../../src/errors.ts";
import { SensitiveString } from "../../src/sensitive.ts";
import { decode, holdsSensitive, inputEncoderSync } from "../../src/util/codec.ts";

const Secret = SensitiveString as unknown as L.Lite;

describe("holdsSensitive", () => {
  it("finds a secret in a list element and a map value", () => {
    expect(holdsSensitive(L.Struct({ keys: L.Array(Secret) }).ast)).toBe(true);
    expect(holdsSensitive(L.Struct({ env: L.Record(L.String, Secret) }).ast)).toBe(true);
    expect(holdsSensitive(L.Struct({ name: L.String, tags: L.Array(L.String) }).ast)).toBe(false);
  });

  it("answers for every type of a cycle, whichever is asked first", () => {
    // `B` is searched while `A` is still open; it holds a secret through `A`.
    const A: L.Lite = L.Struct({
      b: L.optional(L.suspend(() => B)),
      secret: L.optional(Secret),
    });
    const B: L.Lite = L.Struct({ a: L.optional(L.suspend(() => A)) });
    expect(holdsSensitive(A.ast)).toBe(true);
    expect(holdsSensitive(B.ast)).toBe(true);

    const C: L.Lite = L.Struct({ c: L.optional(L.suspend(() => C)), name: L.String });
    expect(holdsSensitive(C.ast)).toBe(false);
    expect(holdsSensitive(C.ast)).toBe(false);
  });
});

describe("lenient decode", () => {
  const Output = L.Struct({
    name: L.optional(L.String),
    credentials: L.optional(L.Struct({ id: L.String, secret: Secret })),
    tags: L.optional(L.Array(L.String)),
  });

  it("wraps a value that does not fit in Redacted when its type can hold a secret", () => {
    const out = decode(Output.ast, { name: "n", credentials: "secret-text", tags: "t" }) as Record<
      string,
      unknown
    >;
    expect(Redacted.isRedacted(out.credentials)).toBe(true);
    expect(Redacted.value(out.credentials as Redacted.Redacted<unknown>)).toBe("secret-text");
    expect(out.tags).toBe("t");
    expect(out.name).toBe("n");
  });

  it("keeps a sensitive member Redacted when it arrives in the wrong shape", () => {
    const out = decode(Output.ast, { credentials: { id: "i", secret: ["x"] } }) as {
      credentials: Record<string, unknown>;
    };
    expect(Redacted.isRedacted(out.credentials.secret)).toBe(true);
  });
});

describe("input encode failure", () => {
  const failure = (schema: L.Lite, input: unknown): string => {
    try {
      inputEncoderSync(schema.ast)(input);
    } catch (e) {
      expect(e).toBeInstanceOf(ParseError);
      return (e as ParseError).message;
    }
    throw new Error("expected the encode to fail");
  };

  it("withholds the value when the input can hold a secret", () => {
    const message = failure(L.Struct({ id: L.String, secret: Secret }), { id: 424242 });
    expect(message).toContain("[REDACTED]");
    expect(message).not.toContain("424242");
  });

  it("quotes the value when the input holds no secret", () => {
    expect(failure(L.Struct({ id: L.String }), { id: 424242 })).toContain("424242");
  });
});
