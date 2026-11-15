import * as Arbitrary from "effect/Arbitrary";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as EffectSchema from "effect/Schema";
import { describe, expect, test } from "vitest";
import * as L from "../src/schema-lite-impl.ts";
import * as S from "../src/schema-lite-typed.ts";

class Oops extends S.TaggedError<Oops>()("Oops", { message: S.optional(S.String) }) {}

describe("lite TaggedError", () => {
  test("make builds an instance like new", () => {
    const e = Oops.make({ message: "boom" });
    expect(e).toBeInstanceOf(Oops);
    expect(e._tag).toBe("Oops");
    expect(e.message).toBe("boom");
  });

  test("is typed by its fields and is not an Effect Schema", () => {
    const e = new Oops({ message: "boom" });
    const message: string | undefined = e.message;
    expect(message).toBe("boom");
    // @ts-expect-error message is `string | undefined`
    const wrong: number = e.message;
    void wrong;
    // @ts-expect-error a lite error class has no Effect Schema AST; match with _tag or instanceof
    expect(() => EffectSchema.is(Oops)(e)).toThrow();
  });

  test("is matches by _tag, so a copy from another package instance matches", () => {
    class Other extends S.TaggedError<Other>()("Other", {}) {}
    // A structurally equal error from a duplicate copy of the package.
    const foreign: unknown = Object.assign(new Error("boom"), { _tag: "Oops", message: "boom" });
    expect(Oops.is(new Oops({ message: "x" }))).toBe(true);
    expect(Oops.is(foreign)).toBe(true);
    expect(Oops.is(new Other())).toBe(false);
    expect(Oops.is(undefined)).toBe(false);
    if (Oops.is(foreign)) {
      const message: string | undefined = foreign.message;
      void message;
    }
  });

  test("make keeps only the declared fields", () => {
    const e = Oops.make({ message: "boom", extra: 1 } as never);
    expect(Object.keys(e)).not.toContain("extra");
  });
});

describe("toEffect", () => {
  test("rebuilds Effect's built-in declarations, so effect/Arbitrary can generate values", async () => {
    const lite = L.Struct({
      at: L.Date,
      wait: L.Duration,
      data: L.instanceOf(Uint8Array),
      secret: L.Redacted(L.String),
    });
    const schema = L.toEffect(EffectSchema, lite.ast) as EffectSchema.Codec<any>;
    const values = await Effect.runPromise(
      Arbitrary.sampleEffect(Arbitrary.schema(schema), { count: 5, seed: 1 }),
    );
    expect(values.length).toBe(5);
    for (const v of values) {
      expect(v.at).toBeInstanceOf(Date);
      expect(Duration.isDuration(v.wait)).toBe(true);
      expect(v.data).toBeInstanceOf(Uint8Array);
      expect(Redacted.isRedacted(v.secret)).toBe(true);
      expect(EffectSchema.is(schema)(v)).toBe(true);
    }
  });
});
