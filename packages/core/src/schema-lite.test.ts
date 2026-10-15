import * as EffectSchema from "effect/Schema";
import { describe, expect, test } from "vitest";
import * as S from "./schema-lite-typed.ts";

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

  test("make keeps only the declared fields", () => {
    const e = Oops.make({ message: "boom", extra: 1 } as never);
    expect(Object.keys(e)).not.toContain("extra");
  });
});
