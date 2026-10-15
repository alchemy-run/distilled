import { describe, expect, test } from "vitest";
import { annotateNestedCalls } from "./pure.ts";

const P = "/*@__PURE__*/ ";

describe("annotateNestedCalls", () => {
  test("marks calls nested in an already-marked initializer", () => {
    expect(annotateNestedCalls(`export const A = ${P}S.Array(Tag.pipe(T.XmlName("item")));`)).toBe(
      `export const A = ${P}S.Array(${P}Tag.pipe(${P}T.XmlName("item")));`,
    );
  });

  test("marks unmarked top-level initializers and plain consts", () => {
    expect(annotateNestedCalls(`const ns = T.XmlNamespace("x");`)).toBe(
      `const ns = ${P}T.XmlNamespace("x");`,
    );
  });

  test("one marker covers a method chain", () => {
    expect(annotateNestedCalls(`export const A = S.suspend(() => B).annotate({ id: "A" });`)).toBe(
      `export const A = ${P}S.suspend(() => B).annotate({ id: "A" });`,
    );
  });

  test("leaves function bodies alone", () => {
    const code = `export const A = ${P}S.suspend(() => S.Struct({ x: X.pipe(f()) }));`;
    expect(annotateNestedCalls(code)).toBe(code);
  });

  test("marks class extends clauses, not class bodies", () => {
    expect(
      annotateNestedCalls(
        `export class E extends ${P}S.TaggedError<E>()("E", { m: S.optional(S.String) }) { x = f(); }`,
      ),
    ).toBe(
      `export class E extends ${P}S.TaggedError<E>()("E", { m: ${P}S.optional(S.String) }) { x = f(); }`,
    );
  });

  test("looks through `as` casts and skips IIFEs", () => {
    expect(annotateNestedCalls(`export const A = S.Array(B.pipe(c)) as any as S.Schema<A>;`)).toBe(
      `export const A = ${P}S.Array(${P}B.pipe(c)) as any as S.Schema<A>;`,
    );
    const iife = `const x = (() => setup())();`;
    expect(annotateNestedCalls(iife)).toBe(iife);
  });

  test("is idempotent", () => {
    const once = annotateNestedCalls(`export const A = S.Array(Tag.pipe(T.XmlName("item")));`);
    expect(annotateNestedCalls(once)).toBe(once);
  });

  test("ignores statements that are not declarations", () => {
    const code = `register(A);\nexport type X = ReturnType<typeof f>;`;
    expect(annotateNestedCalls(code)).toBe(code);
  });
});
