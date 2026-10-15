/**
 * Merge structurally identical named shapes.
 *
 * Shapes form a graph (refs, including cycles), so plain hashing is not
 * enough: two shapes are equal when their structure and metadata match AND
 * the shapes they reference are equal. This is DFA minimization; we use
 * Moore's partition refinement: start with every shape in a class keyed by
 * its structure with refs blanked out, then repeatedly re-key each shape by
 * its structure plus the CLASS of every ref, until the classes stop
 * splitting. Shapes in one final class are interchangeable.
 */
import type { Corpus, Node, Ref } from "./ir.ts";

const keyOf = (r: Ref, classOf: (name: string) => string): string => {
  const meta = r.meta ? JSON.stringify(Object.entries(r.meta).sort()) : "";
  const n: Node = r.node;
  let body: string;
  switch (n.k) {
    case "ref":
      body = `@${classOf(n.name)}`;
      break;
    case "array":
      body = `[${keyOf(n.item, classOf)}]`;
      break;
    case "record":
      body = `{${keyOf(n.value, classOf)}}`;
      break;
    case "union":
      body = `(${n.members.map((m) => keyOf(m, classOf)).join("|")})`;
      break;
    case "struct":
      body = `<${n.fields.map((f) => `${f.name}${f.optional ? "?" : ""}:${keyOf(f.type, classOf)}`).join(",")}>`;
      break;
    case "literal":
      body = `L${JSON.stringify(n.v)}`;
      break;
    case "date":
      body = `D${n.wire}`;
      break;
    default:
      body = n.k;
  }
  return meta ? `${body}#${meta}` : body;
};

export interface DedupeResult {
  /** name -> canonical name (first name of its class). */
  readonly canonical: Map<string, string>;
  readonly classes: number;
  readonly rounds: number;
}

export const dedupe = (corpus: Corpus): DedupeResult => {
  const names = Object.keys(corpus.shapes);
  let cls = new Map<string, string>(names.map((n) => [n, "0"]));
  let count = 1;
  let rounds = 0;
  for (;;) {
    rounds++;
    const ids = new Map<string, string>();
    const next = new Map<string, string>();
    for (const name of names) {
      const k = keyOf(corpus.shapes[name]!, (to) => cls.get(to) ?? `?${to}`);
      let id = ids.get(k);
      if (id === undefined) ids.set(k, (id = String(ids.size)));
      next.set(name, id);
    }
    cls = next;
    if (ids.size === count) break;
    count = ids.size;
  }
  const first = new Map<string, string>();
  const canonical = new Map<string, string>();
  for (const name of names) {
    const c = cls.get(name)!;
    if (!first.has(c)) first.set(c, name);
    canonical.set(name, first.get(c)!);
  }
  return { canonical, classes: count, rounds };
};

/** The corpus with every ref pointing at its class's canonical shape, and duplicate shapes removed. */
export const applyDedupe = (corpus: Corpus, { canonical }: DedupeResult): Corpus => {
  const remap = (r: Ref): Ref => {
    const n = r.node;
    let node: Node = n;
    if (n.k === "ref") node = { k: "ref", name: canonical.get(n.name) ?? n.name };
    else if (n.k === "array") node = { k: "array", item: remap(n.item) };
    else if (n.k === "record") node = { k: "record", value: remap(n.value) };
    else if (n.k === "union") node = { k: "union", members: n.members.map(remap) };
    else if (n.k === "struct")
      node = { k: "struct", fields: n.fields.map((f) => ({ ...f, type: remap(f.type) })) };
    return r.meta ? { node, meta: r.meta } : { node };
  };
  const shapes: Record<string, Ref> = {};
  for (const [name, r] of Object.entries(corpus.shapes))
    if (canonical.get(name) === name) shapes[name] = remap(r);
  return {
    service: corpus.service,
    shapes,
    operations: corpus.operations.map((o) => ({
      ...o,
      input: canonical.get(o.input) ?? o.input,
      output: canonical.get(o.output) ?? o.output,
    })),
  };
};

/** Inline (unnamed) struct subtrees that occur more than once, by structure. */
export const inlineDuplicates = (corpus: Corpus) => {
  const seen = new Map<string, number>();
  const walk = (r: Ref, top: boolean) => {
    const n = r.node;
    if (n.k === "struct" && !top) {
      const k = keyOf(r, (x) => x);
      seen.set(k, (seen.get(k) ?? 0) + 1);
    }
    if (n.k === "array") walk(n.item, false);
    if (n.k === "record") walk(n.value, false);
    if (n.k === "union") n.members.forEach((m) => walk(m, false));
    if (n.k === "struct") n.fields.forEach((f) => walk(f.type, false));
  };
  Object.values(corpus.shapes).forEach((r) => walk(r, true));
  let total = 0,
    dupes = 0,
    distinct = 0;
  for (const c of seen.values()) {
    total += c;
    distinct++;
    if (c > 1) dupes += c - 1;
  }
  return { inlineStructs: total, distinct, removable: dupes };
};
