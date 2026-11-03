import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import * as S from "../src/schema.ts";
import {
  holdsSensitive,
  REDACTED,
  redactParsed,
  redactPlain,
  sensitiveValueSymbol,
} from "../src/sensitive.ts";
import { makeAnnotation } from "../src/trait.ts";

const Secret = () => makeAnnotation(sensitiveValueSymbol, true);

describe("holdsSensitive", () => {
  test("finds a secret in a member, a list element, a map value and a union arm", () => {
    expect(holdsSensitive(S.Struct({ key: S.String.pipe(Secret()) }).ast)).toBe(true);
    expect(holdsSensitive(S.Struct({ keys: S.Array(S.String.pipe(Secret())) }).ast)).toBe(true);
    expect(holdsSensitive(S.Struct({ env: S.Record(S.String, S.String.pipe(Secret())) }).ast)).toBe(
      true,
    );
    expect(
      holdsSensitive(
        S.Struct({ auth: S.Union([S.Struct({ token: S.String.pipe(Secret()) }), S.String]) }).ast,
      ),
    ).toBe(true);
    expect(holdsSensitive(S.Struct({ name: S.String, tags: S.Array(S.String) }).ast)).toBe(false);
  });

  test("a sensitive type holds a secret itself", () => {
    expect(holdsSensitive(S.String.pipe(Secret()).ast)).toBe(true);
  });

  test("answers for every type of a cycle, whichever is asked first", () => {
    interface A {
      readonly b?: B;
      readonly secret?: string;
    }
    interface B {
      readonly a?: A;
    }
    const A: S.Schema<A> = S.Struct({
      b: S.optional(S.suspend(() => B)),
      secret: S.optional(S.String.pipe(Secret())),
    });
    const B: S.Schema<B> = S.Struct({ a: S.optional(S.suspend(() => A)) });
    expect(holdsSensitive(B.ast)).toBe(true);
    expect(holdsSensitive(A.ast)).toBe(true);
  });
});

describe("redactPlain", () => {
  test("withholds the whole plain form of a type that can hold a secret", () => {
    const body = '{"name":"db","password":"fixture-password"}';
    expect(
      redactPlain(S.Struct({ name: S.String, password: S.String.pipe(Secret()) }).ast, body),
    ).toBe(REDACTED);
    expect(redactPlain(S.Struct({ name: S.String }).ast, body)).toBe(body);
  });
});

describe("redactParsed", () => {
  const Input = S.Struct({
    name: S.String,
    password: S.optional(S.String.pipe(Secret())),
    key: S.optional(S.Unknown.pipe(Secret())),
    credentials: S.optional(S.Struct({ id: S.String, secret: S.String }).pipe(Secret())),
    env: S.optional(S.Record(S.String, S.String.pipe(Secret()))),
    tokens: S.optional(S.Array(S.String.pipe(Secret()))),
  });

  test("redacts every sensitive value whole, of any type, and keeps the rest", () => {
    const bytes = new Uint8Array([1, 2, 3]);
    const out = redactParsed(Input.ast, {
      name: "db",
      password: "fixture-password",
      key: bytes,
      credentials: { id: "fixture-id", secret: "fixture-secret" },
      env: { API_KEY: "fixture-env", WRAPPED: Redacted.make("fixture-wrapped") },
      tokens: ["fixture-token"],
    }) as Record<string, any>;
    expect(out.name).toBe("db");
    expect(Redacted.value(out.password)).toBe("fixture-password");
    expect(Redacted.value(out.key)).toBe(bytes);
    expect(Redacted.value(out.credentials)).toEqual({ id: "fixture-id", secret: "fixture-secret" });
    expect(Redacted.value(out.env.API_KEY)).toBe("fixture-env");
    expect(Redacted.value(out.env.WRAPPED)).toBe("fixture-wrapped");
    expect(Redacted.value(out.tokens[0])).toBe("fixture-token");
    expect(JSON.stringify(out)).not.toContain("fixture");
  });

  test("returns a value with no secret type unchanged", () => {
    const value = { name: "db" };
    expect(redactParsed(S.Struct({ name: S.String }).ast, value)).toBe(value);
  });
});
