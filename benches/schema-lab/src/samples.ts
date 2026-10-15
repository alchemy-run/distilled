/** Synthetic wire values for a shape, plus a broken copy that every validator must reject. */
import type { Corpus, Node, Ref } from "./ir.ts";

export const sample = (corpus: Corpus, name: string, maxDepth = 6): unknown => {
  const value = (r: Ref, depth: number): unknown => {
    const n: Node = r.node;
    switch (n.k) {
      case "string":
        return "value";
      case "number":
        return 42;
      case "boolean":
        return true;
      case "null":
        return null;
      case "unknown":
      case "stream":
        return { any: 1 };
      case "blob":
        return "AAECAw==";
      case "date":
        return n.wire === "number" ? 1700000000 : "2026-10-08T00:00:00.000Z";
      case "literal":
        return n.v[0];
      case "array":
        return depth >= maxDepth ? [] : [value(n.item, depth + 1), value(n.item, depth + 1)];
      case "record":
        return depth >= maxDepth
          ? {}
          : { a: value(n.value, depth + 1), b: value(n.value, depth + 1) };
      case "union":
        return value(n.members[0]!, depth);
      case "ref": {
        const s = corpus.shapes[n.name];
        return s ? value(s, depth + 1) : {};
      }
      case "struct": {
        const out: Record<string, unknown> = {};
        for (const f of n.fields) {
          if (f.optional && depth >= maxDepth) continue;
          out[f.name] = value(f.type, depth + 1);
        }
        return out;
      }
    }
  };
  return value({ node: { k: "ref", name } }, 0);
};

/** The sample with its first reachable string leaf replaced by a number; undefined if it has none. */
export const broken = (value: unknown): unknown => {
  let done = false;
  const walk = (v: unknown): unknown => {
    if (done) return v;
    if (typeof v === "string") {
      done = true;
      return 12345;
    }
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object")
      return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
    return v;
  };
  const out = walk(value);
  return done ? out : undefined;
};
