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

describe("`before` on object keys", () => {
  test("add inserts a new key before the named sibling", () => {
    const doc: Record<string, unknown> = { input: 1, output: 2, traits: 3 };
    applyOperation(doc, { op: "add", path: "/errors", value: [], before: "traits" });
    expect(Object.keys(doc)).toEqual(["input", "output", "errors", "traits"]);
  });

  test("add keeps an existing key where it is", () => {
    const doc: Record<string, unknown> = { a: 1, b: 2, c: 3 };
    applyOperation(doc, { op: "add", path: "/c", value: 4, before: "a" });
    expect(doc).toEqual({ a: 1, b: 2, c: 4 });
    expect(Object.keys(doc)).toEqual(["a", "b", "c"]);
  });

  test("add appends when the sibling is absent", () => {
    const doc: Record<string, unknown> = { a: 1 };
    applyOperation(doc, { op: "add", path: "/b", value: 2, before: "missing" });
    expect(Object.keys(doc)).toEqual(["a", "b"]);
  });

  test("add keeps the parent object's identity", () => {
    const shapes: Record<string, unknown> = { a: 1, c: 3 };
    const doc = { shapes };
    applyOperation(doc, { op: "add", path: "/shapes/b", value: 2, before: "c" });
    expect(doc.shapes).toBe(shapes);
    expect(Object.keys(shapes)).toEqual(["a", "b", "c"]);
  });

  test("move onto itself reorders a key", () => {
    const doc: Record<string, unknown> = { a: 1, b: 2, c: 3 };
    applyOperation(doc, { op: "move", from: "/c", path: "/c", before: "a" });
    expect(Object.keys(doc)).toEqual(["c", "a", "b"]);
    expect(doc).toEqual({ a: 1, b: 2, c: 3 });
  });
});
