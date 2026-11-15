import { describe, expect, test } from "vitest";
import { toLatin1 } from "../../src/codegen/latin1.ts";

describe("toLatin1", () => {
  test("leaves Latin-1 code untouched", () => {
    const code = `/** café — no, just café */ export const x = "é";`.replace("—", "-");
    expect(toLatin1(code)).toBe(code);
  });

  test("spells comment punctuation in ASCII", () => {
    expect(toLatin1(`/** It’s “quoted” — see → here… ≤ 5 */\nexport const x = 1;`)).toBe(
      `/** It's "quoted" -- see -> here... <= 5 */\nexport const x = 1;`,
    );
    expect(toLatin1(`// € and 🔥\nconst y = 2;`)).toBe(`// U+20AC and U+1F525\nconst y = 2;`);
  });

  test("escapes string, template and type literals without changing their value", () => {
    const code = 'export type C = "€" | "🔥";\nexport const s = "It’s";\nexport const t = `→${s}`;';
    const out = toLatin1(code);
    expect(out).toBe(
      'export type C = "\\u20ac" | "\\ud83d\\udd25";\nexport const s = "It\\u2019s";\nexport const t = `\\u2192${s}`;',
    );
    expect(/[^\x00-\xff]/.test(out)).toBe(false);
    // Same runtime values.
    const values = (src: string) =>
      new Function(
        src.replace(/^export type .*$/m, "").replace(/export /g, "") + "\nreturn [s, t];",
      )();
    expect(values(out)).toEqual(values(code));
  });

  test("handles emoji with variation selectors in comments", () => {
    expect(toLatin1("/** ⚠️ careful */ const z = 0;")).toBe("/** U+26A0 careful */ const z = 0;");
  });
});
