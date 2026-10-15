import { describe, expect, test } from "vitest";
import { tableSchemas } from "./table.ts";

const header = `import * as __L from "@distilled.cloud/core/chunks";\nimport * as S from "@distilled.cloud/core/schema";`;

describe("tableSchemas", () => {
  test("replaces schema consts, aliases and leaves with table lookups", () => {
    const code = [
      header,
      `const A = /*@__PURE__*/ __L.at(__c0, 0) as any as S.Schema<A>;`,
      `const B = A;`,
      `const Status = S.String;`,
      `export const op = API.make(() => ({ input: B, output: Status }));`,
      `function __c0(j: number): any { switch (j) { case 0: return S.Struct({ s: Status, b: B }); } }`,
    ].join("\n");
    const out = tableSchemas(code).code;
    expect(out).not.toMatch(/^const (A|B|Status) =/m);
    expect(out).toContain(`input: (__S(0, __c0, 0) as any as S.Schema<A>)`);
    expect(out).toContain(`output: S.String`);
    expect(out).toContain(`S.Struct({ s: S.String, b: __S(0, __c0, 0) })`);
    expect(out).toContain(`const __s: any[] = [];`);
    expect(out).toContain(`function __S(i: number, f:`);
    // The table array comes before anything that could reach a schema at import.
    expect(out.indexOf("const __s")).toBeLessThan(out.indexOf("export const op"));
  });

  test("leaves names that are also bound in nested scopes, imports and object keys alone", () => {
    const code = [
      header,
      `import type { Region as R } from "./region.ts";`,
      `const Region = /*@__PURE__*/ __L.at(__c0, 0);`,
      `const Other = /*@__PURE__*/ __L.at(__c0, 1);`,
      `const rules = (p) => { const { Region } = p; return Region; };`,
      `export const op = API.make(() => ({ input: Region, output: S.Struct({ Other: Other }) }));`,
      `function __c0(j: number): any { switch (j) { case 0: return S.String; case 1: return S.Number; } }`,
    ].join("\n");
    const out = tableSchemas(code).code;
    expect(out).toContain(`const Region = /*@__PURE__*/ __L.at(__c0, 0);`);
    expect(out).toContain(`import type { Region as R }`);
    expect(out).toContain(`S.Struct({ Other: __S(1, __c0, 1) })`);
  });
});
