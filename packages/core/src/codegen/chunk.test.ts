import * as Schema from "effect/Schema";
import { describe, expect, test } from "vitest";
import * as L from "../chunks.ts";
import * as S from "../schema.ts";
import { chunkSchemas } from "./chunk.ts";

describe("chunkSchemas", () => {
  test("moves private schema initializers into builders and keeps casts and exports", () => {
    const code = [
      `import * as S from "@distilled.cloud/core/schema";`,
      `const A = /*@__PURE__*/ S.Struct({ x: S.String }) as any as S.Schema<A>;`,
      `const B = S.Array(A);`,
      `export const C = S.Struct({});`,
      `const Alias = S.String;`,
    ].join("\n");
    const out = chunkSchemas(code, "x.ts", 1).code;
    expect(out).toContain(`const A = /*@__PURE__*/ __L.at(__c0, 0) as any as S.Schema<A>;`);
    expect(out).toContain(`const B = /*@__PURE__*/ __L.at(__c1, 0);`);
    expect(out).toContain(`export const C = S.Struct({});`);
    expect(out).toContain(`const Alias = S.String;`);
    expect(out).toContain(`case 0: return S.Struct({ x: S.String });`);
    expect(out).toContain(`case 0: return S.Array(A);`);
  });

  test("a chunked schema decodes like the plain initializer and builds once", () => {
    let calls = 0;
    const build = (j: number): unknown => {
      calls++;
      switch (j) {
        case 0:
          return S.Struct({ x: S.String });
      }
    };
    const A = L.at(build, 0);
    expect(calls).toBe(0);
    expect(Schema.decodeUnknownSync(A)({ x: "a" })).toEqual({ x: "a" });
    expect(() => Schema.decodeUnknownSync(A)({ x: 1 })).toThrow();
    void A.ast;
    expect(calls).toBe(1);
  });
});
