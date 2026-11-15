import { describe, expect, test } from "vitest";
import { applyEdits } from "../../src/codegen/edits.ts";

describe("applyEdits", () => {
  test("applies edits given in any order against the original offsets", () => {
    expect(
      applyEdits("abcdefgh", [
        [6, 8, "GH"],
        [0, 1, ""],
        [3, 3, "+"],
      ]),
    ).toBe("bc+defGH");
  });

  test("allows edits that touch, and keeps inserts at one position in order", () => {
    expect(
      applyEdits("abcdef", [
        [2, 4, "X"],
        [4, 6, "Y"],
        [2, 2, "1"],
        [2, 2, "2"],
      ]),
    ).toBe("ab12XY");
  });

  test("rejects overlapping edits", () => {
    expect(() =>
      applyEdits("abcdef", [
        [1, 4, "X"],
        [3, 5, "Y"],
      ]),
    ).toThrow(/overlaps/);
  });

  test("returns the code unchanged without edits", () => {
    expect(applyEdits("abc", [])).toBe("abc");
  });
});
