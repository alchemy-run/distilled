import { describe, expect, test } from "vitest";
import { applyOperation, StaleTargetError } from "./json-patch.ts";

describe("RFC 6902 arrays", () => {
  test("add at an index inserts before it", () => {
    const doc = { errors: ["a", "c"] };
    applyOperation(doc, { op: "add", path: "/errors/1", value: "b" });
    expect(doc.errors).toEqual(["a", "b", "c"]);
  });

  test("add at the length appends, like `-`", () => {
    const doc = { errors: ["a"] };
    applyOperation(doc, { op: "add", path: "/errors/1", value: "b" });
    applyOperation(doc, { op: "add", path: "/errors/-", value: "c" });
    expect(doc.errors).toEqual(["a", "b", "c"]);
  });

  test("add past the end is a stale target", () => {
    expect(() =>
      applyOperation({ errors: [] }, { op: "add", path: "/errors/2", value: "x" }),
    ).toThrow(StaleTargetError);
  });

  test("replace at an index overwrites", () => {
    const doc = { errors: ["a", "x", "c"] };
    applyOperation(doc, { op: "replace", path: "/errors/1", value: "b" });
    expect(doc.errors).toEqual(["a", "b", "c"]);
  });

  test("replace keeps an object key in place", () => {
    const doc: Record<string, unknown> = { a: 1, b: 2, c: 3 };
    applyOperation(doc, { op: "replace", path: "/b", value: 4 });
    expect(Object.keys(doc)).toEqual(["a", "b", "c"]);
  });

  test("move into an array inserts", () => {
    const doc = { from: "b", list: ["a", "c"] };
    applyOperation(doc, { op: "move", from: "/from", path: "/list/1" });
    expect(doc).toEqual({ list: ["a", "b", "c"] });
  });
});
