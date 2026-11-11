import * as Schema from "effect/Schema";
import { describe, expect, test } from "vitest";
import { decoderFor } from "../src/response-validation-strict.ts";
import * as L from "../src/schema-lite-impl.ts";

/** What strict mode accepted before the checker: Effect Schema's decoder on `toEffect`. */
const effectAccepts = (lite: L.Lite, exact = false) => {
  const decode = Schema.decodeUnknownExit(L.toEffect(Schema as any, lite.ast) as any);
  const options = exact ? ({ onExcessProperty: "error" } as const) : undefined;
  return (u: unknown) => decode(u, options)._tag === "Success";
};
const accepts = (s: { readonly ast: unknown }, exact = false) => {
  const decode = decoderFor(s.ast as any, exact);
  return (u: unknown) => decode(u) === undefined;
};

/** Deterministic PRNG, so a failure reproduces. */
const rng = (seed: number) => () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};

const KEYS = ["a", "b", "c", "id", "__proto__", "constructor", "toString"];

/**
 * `nonEmpty` gives every struct a member: an empty struct accepts any object
 * in the checker's exact mode (generated opaque outputs), where Effect's
 * `onExcessProperty: "error"` rejects its keys.
 */
const randomSchema = (r: () => number, depth: number, nonEmpty = false): L.Lite => {
  const pick = <A>(xs: ReadonlyArray<A>): A => xs[Math.floor(r() * xs.length)]!;
  const leaf = (): L.Lite =>
    pick([
      L.String,
      L.Number,
      L.Boolean,
      L.Null,
      L.Unknown,
      L.Any,
      L.Undefined,
      L.Void,
      L.Date,
      L.Literal("x"),
      L.Literal(1),
      L.Literal(true),
      L.Literals(["a", "b"]),
      L.fromNode({ _tag: "Declaration", check: (u) => typeof u === "string" && u.length > 1 }),
    ]);
  if (depth <= 0 || r() < 0.3) return leaf();
  const sub = () => randomSchema(r, depth - 1, nonEmpty);
  const structFields = () => {
    const fields: Record<string, L.Lite> = {};
    for (const k of KEYS) if (r() < 0.35) fields[k] = r() < 0.5 ? L.optional(sub()) : sub();
    if (nonEmpty && Object.keys(fields).length === 0) fields.a = sub();
    return fields;
  };
  switch (Math.floor(r() * 9)) {
    case 6:
      // Generated open objects always rest on `unknown` (see the typed-rest
      // test for where the checker and Effect differ).
      return L.StructWithRest(L.Struct(structFields()), [L.Record(L.String, L.Unknown)]);
    case 0:
      return L.Array(sub());
    case 1:
      return L.Tuple(Array.from({ length: Math.floor(r() * 3) }, sub));
    case 2:
      return L.Record(L.String, sub());
    case 3:
      return L.Union(Array.from({ length: 1 + Math.floor(r() * 3) }, sub));
    case 4:
      return L.NullOr(sub());
    case 5: {
      const inner = sub();
      return L.suspend(() => inner);
    }
    default:
      return L.Struct(structFields());
  }
};

/** Values near the schema (built from it, then mutated) plus junk. */
const randomValue = (r: () => number, node: L.Node, depth: number): unknown => {
  const junk = () =>
    [undefined, null, 0, Number.NaN, Infinity, "", "s", "xx", true, [], {}, [1, "a"], { a: 1 }][
      Math.floor(r() * 13)
    ];
  if (depth > 6 || r() < 0.12) return junk();
  switch (node._tag) {
    case "Suspend":
      return randomValue(r, node.thunk!(), depth + 1);
    case "String":
      return r() < 0.5 ? "s" : "";
    case "Number":
      return r() < 0.8 ? Math.floor(r() * 10) : Number.NaN;
    case "Boolean":
      return r() < 0.5;
    case "Null":
      return null;
    case "Literal":
      return node.literal;
    case "Declaration":
      return r() < 0.5 ? "date-ish" : new Date(0);
    case "Union":
      return randomValue(r, node.types![Math.floor(r() * node.types!.length)]!, depth + 1);
    case "Arrays": {
      const n = node.rest!.length
        ? Math.floor(r() * 3)
        : node.elements!.length + (r() < 0.2 ? 1 : 0) - (r() < 0.1 ? 1 : 0);
      return Array.from({ length: Math.max(0, n) }, (_, i) =>
        randomValue(r, node.elements![i] ?? node.rest![0] ?? node, depth + 1),
      );
    }
    case "Objects": {
      const o: Record<string, unknown> = {};
      for (const p of node.propertySignatures!)
        if (r() < 0.85)
          Object.defineProperty(o, p.name, {
            value: randomValue(r, p.type, depth + 1),
            enumerable: true,
            configurable: true,
            writable: true,
          });
      if (node.indexSignatures!.length)
        for (const k of ["k1", "k2"])
          if (r() < 0.7) o[k] = randomValue(r, node.indexSignatures![0]!.type, depth + 1);
      if (r() < 0.2) o.extra = junk();
      return r() < 0.05 ? [o] : o;
    }
    default:
      return junk();
  }
};

const show = (ast: unknown) =>
  JSON.stringify(ast, (k, x) => (k === "thunk" ? x() : typeof x === "function" ? "fn" : x));

describe("strict checker", () => {
  test("accepts exactly what Effect Schema accepted, on random lite schemas", () => {
    const r = rng(42);
    let compared = 0;
    let rejected = 0;
    for (let i = 0; i < 1500; i++) {
      const schema = randomSchema(r, 4);
      const effect = effectAccepts(schema);
      const ours = accepts(schema);
      for (let j = 0; j < 20; j++) {
        const v = randomValue(r, schema.ast, 0);
        const expected = effect(v);
        if (ours(v) !== expected) {
          throw new Error(
            `mismatch (Effect ${expected ? "accepts" : "rejects"}) for ${JSON.stringify(v)} against ${show(schema.ast)}`,
          );
        }
        compared++;
        if (!expected) rejected++;
      }
    }
    expect(compared).toBe(30000);
    // Both outcomes are exercised.
    expect(rejected).toBeGreaterThan(5000);
    expect(compared - rejected).toBeGreaterThan(5000);
  });

  test("exact mode rejects what Effect rejects with onExcessProperty: error", () => {
    const r = rng(7);
    let compared = 0;
    let rejected = 0;
    for (let i = 0; i < 1500; i++) {
      const schema = randomSchema(r, 4, true);
      const effect = effectAccepts(schema, true);
      const ours = accepts(schema, true);
      for (let j = 0; j < 20; j++) {
        const v = randomValue(r, schema.ast, 0);
        const expected = effect(v);
        if (ours(v) !== expected) {
          throw new Error(
            `exact mismatch (Effect ${expected ? "accepts" : "rejects"}) for ${JSON.stringify(v)} against ${show(schema.ast)}`,
          );
        }
        compared++;
        if (!expected) rejected++;
      }
    }
    expect(compared).toBe(30000);
    expect(rejected).toBeGreaterThan(5000);
    expect(compared - rejected).toBeGreaterThan(5000);
  });

  test("exact mode: unmodeled keys fail at their path; open objects and {} accept them", () => {
    const decode = decoderFor(
      L.Struct({ items: L.Array(L.Struct({ id: L.String })) }).ast as any,
      true,
    );
    expect(decode({ items: [{ id: "a" }, { id: "b", extra: 1 }] })?.path).toEqual([
      "items",
      1,
      "extra",
    ]);
    expect(decode({ items: [] })).toBeUndefined();
    expect(decoderFor(L.Struct({}).ast as any, true)({ anything: 1 })).toBeUndefined();
    const open = L.StructWithRest(L.Struct({ id: L.String }), [L.Record(L.String, L.Unknown)]);
    expect(decoderFor(open.ast as any, true)({ id: "a", title: "x" })).toBeUndefined();
    // The two modes cache separately.
    expect(decoderFor(open.ast as any, false)).not.toBe(decoderFor(open.ast as any, true));
  });

  test("reports the path and the expected type", () => {
    const decode = decoderFor(L.Struct({ items: L.Array(L.Struct({ id: L.String })) }).ast as any);
    const error = decode({ items: [{ id: "a" }, { id: 4 }] });
    expect(error?.path).toEqual(["items", 1, "id"]);
    expect(error?.message).toBe('Expected string, got 4 at ["items",1,"id"]');
    expect(decode({ items: [] })).toBeUndefined();
  });

  test("checks real Effect schemas, refinements included", () => {
    const real = Schema.Struct({
      id: Schema.String.check(Schema.isMinLength(2)),
      n: Schema.optional(Schema.Number),
      tags: Schema.Array(Schema.Literals(["a", "b"])),
    });
    const ok = accepts(real);
    expect(ok({ id: "ab", tags: ["a"] })).toBe(true);
    expect(ok({ id: "a", tags: ["a"] })).toBe(false);
    expect(ok({ id: "ab", n: "1", tags: [] })).toBe(false);
    expect(ok({ id: "ab", tags: ["c"] })).toBe(false);
    expect(ok({ tags: [] })).toBe(false);
  });

  test("open structs keep declared checks and accept any extra key", () => {
    const Row = L.suspend(() =>
      L.StructWithRest(L.Struct({ id: L.String, vector: L.optional(L.Array(L.Number)) }), [
        L.Record(L.String, L.Unknown),
      ]),
    );
    const ok = accepts(Row);
    const effect = effectAccepts(Row);
    for (const v of [
      { id: "a", title: "x", $dist: 0.1, tags: ["t"], n: null },
      { id: "a", vector: [1] },
      { title: "x" },
      { id: 1, title: "x" },
      { id: "a", vector: "nope" },
    ] as ReadonlyArray<unknown>)
      expect(ok(v)).toBe(effect(v));
    expect(ok({ id: "a", title: "x", $dist: 0.1 })).toBe(true);
    expect(ok({ title: "x" })).toBe(false);
  });

  test("a typed rest checks only undeclared keys (OpenAPI additionalProperties)", () => {
    // Effect's StructWithRest also checks declared keys against the record;
    // OpenAPI applies additionalProperties only to the keys `properties`
    // does not name, and the checker follows OpenAPI.
    const ok = accepts(
      L.StructWithRest(L.Struct({ id: L.String }), [L.Record(L.String, L.Array(L.Unknown))]),
    );
    expect(ok({ id: "a", title: [1] })).toBe(true);
    expect(ok({ id: "a", title: "x" })).toBe(false);
  });

  test("recursive schemas", () => {
    const Tree: L.Lite = L.suspend(() =>
      L.Struct({ v: L.Number, kids: L.optional(L.Array(Tree)) }),
    );
    const ok = accepts(Tree);
    const effect = effectAccepts(Tree);
    for (const v of [
      { v: 1 },
      { v: 1, kids: [{ v: 2, kids: [] }] },
      { v: 1, kids: [{ v: "2" }] },
      { v: 1, kids: [{ kids: [] }] },
    ] as ReadonlyArray<unknown>)
      expect(ok(v)).toBe(effect(v));
  });
});
