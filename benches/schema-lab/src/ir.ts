/**
 * Library-neutral shape IR, extracted from the Effect schemas a distilled
 * service module exports. Every candidate schema representation in the lab
 * is generated from this IR, so all of them describe exactly the same
 * shapes and wire metadata.
 */
import * as S from "effect/Schema";

/** Wire metadata attached to a node: annotation key -> JSON value. */
export type Meta = Record<string, unknown>;

export type Node =
  | { readonly k: "string" | "number" | "boolean" | "unknown" | "null" }
  | { readonly k: "literal"; readonly v: ReadonlyArray<string | number | boolean | null> }
  | { readonly k: "date"; readonly wire: "string" | "number" }
  | { readonly k: "blob" }
  | { readonly k: "stream" }
  | { readonly k: "array"; readonly item: Ref }
  | { readonly k: "record"; readonly value: Ref }
  | { readonly k: "union"; readonly members: ReadonlyArray<Ref> }
  | { readonly k: "struct"; readonly fields: ReadonlyArray<Field> }
  | { readonly k: "ref"; readonly name: string };

/** A node plus the metadata found on it. */
export interface Ref {
  readonly node: Node;
  readonly meta?: Meta;
}

export interface Field {
  readonly name: string;
  readonly optional: boolean;
  readonly type: Ref;
}

export interface Corpus {
  readonly service: string;
  /** Named shapes, in dependency order where possible. */
  readonly shapes: Record<string, Ref>;
  /** Operation input/output shape names. */
  readonly operations: ReadonlyArray<{
    readonly name: string;
    readonly input: string;
    readonly output: string;
  }>;
}

const IGNORED = new Set(["identifier", "jsonSchema", "title", "description", "documentation"]);

const metaOf = (ast: any): Meta | undefined => {
  const ann = ast?.annotations;
  if (!ann) return undefined;
  const out: Meta = {};
  const add = (key: string, value: unknown) => {
    if (
      IGNORED.has(key) ||
      key.startsWith("~") ||
      key.startsWith("to") ||
      key === "expected" ||
      key === "representation"
    )
      return;
    if (typeof value === "function" || typeof value === "symbol") value = true;
    try {
      JSON.stringify(value);
    } catch {
      value = true;
    }
    out[key.replace(/^distilled-aws\//, "aws/").replace(/^@distilled\.cloud\/core\//, "")] = value;
  };
  for (const key of Object.keys(ann)) add(key, ann[key]);
  for (const sym of Object.getOwnPropertySymbols(ann)) add(sym.description ?? "symbol", ann[sym]);
  return Object.keys(out).length ? out : undefined;
};

const isUndefinedish = (ast: any) => ast._tag === "Undefined" || ast._tag === "Void";

export const extract = (service: string, mod: Record<string, unknown>): Corpus => {
  const shapes: Record<string, Ref> = {};
  const inProgress = new Set<string>();

  const ref = (ast: any): Ref => {
    const meta = metaOf(ast);
    const node = toNode(ast);
    return meta ? { node, meta } : { node };
  };

  const toNode = (ast: any): Node => {
    if (ast._tag === "Suspend") {
      const id = ast.annotations?.identifier as string | undefined;
      if (!id) return ref(ast.thunk()).node;
      if (!shapes[id] && !inProgress.has(id)) {
        inProgress.add(id);
        shapes[id] = ref(ast.thunk());
        inProgress.delete(id);
      }
      return { k: "ref", name: id };
    }
    // Decoded type with a wire encoding (e.g. Date from an ISO string).
    if (ast._tag === "Declaration") {
      const ann = ast.annotations ?? {};
      const id = `${ann.identifier ?? ""} ${typeof ann.expected === "string" ? ann.expected : ""} ${ann["distilled-aws/timestamp-format"] ? "Date" : ""}`;
      if (/date/i.test(id)) {
        const wire = ast.encoding?.at(-1)?.to?._tag === "Number" ? "number" : "string";
        return { k: "date", wire };
      }
      if (ann["distilled-aws/streaming"] || /stream/i.test(id)) return { k: "stream" };
      if (/uint8|blob|bytes/i.test(id)) return { k: "blob" };
      return { k: "unknown" };
    }
    switch (ast._tag) {
      case "String":
      case "TemplateLiteral":
        return { k: "string" };
      case "Number":
      case "BigInt":
        return { k: "number" };
      case "Boolean":
        return { k: "boolean" };
      case "Null":
        return { k: "null" };
      case "Literal":
        return { k: "literal", v: [ast.literal] };
      case "Arrays": {
        const item = ast.rest?.[0] ?? ast.elements?.[0];
        return { k: "array", item: item ? ref(item) : { node: { k: "unknown" } } };
      }
      case "Objects": {
        const props = ast.propertySignatures as any[];
        if (props.length === 0 && ast.indexSignatures?.length) {
          return { k: "record", value: ref(ast.indexSignatures[0].type) };
        }
        return {
          k: "struct",
          fields: props.map((p) => {
            let t = p.type;
            const optional = !!t.context?.isOptional;
            const meta = metaOf(t);
            if (t._tag === "Union") {
              const real = t.types.filter((m: any) => !isUndefinedish(m));
              if (real.length === 1) t = real[0];
            }
            const inner = ref(t);
            const merged = meta || inner.meta ? { ...inner.meta, ...meta } : undefined;
            return {
              name: String(p.name),
              optional,
              type: merged ? { node: inner.node, meta: merged } : { node: inner.node },
            };
          }),
        };
      }
      case "Union": {
        const real = (ast.types as any[]).filter((m) => !isUndefinedish(m));
        if (real.every((m) => m._tag === "Literal"))
          return { k: "literal", v: real.map((m) => m.literal) };
        if (real.length === 1) return ref(real[0]).node;
        return { k: "union", members: real.map(ref) };
      }
      default:
        return { k: "unknown" };
    }
  };

  const operations: Array<{ name: string; input: string; output: string }> = [];
  for (const [name, value] of Object.entries(mod)) {
    // Error classes are schemas too; the lab measures them separately.
    if (typeof value === "function" && (value as any).prototype instanceof Error) continue;
    if (S.isSchema(value)) {
      const r = ref((value as any).ast);
      if (r.node.k !== "ref" && !shapes[name]) shapes[name] = r;
    }
  }
  for (const [name, value] of Object.entries(mod)) {
    const op = value as any;
    if (typeof op === "function" && !S.isSchema(op) && op.input && op.output) {
      const id = (s: any) => s.ast?.annotations?.identifier as string | undefined;
      const input = id(op.input),
        output = id(op.output);
      if (input && output) operations.push({ name, input, output });
    }
  }
  return { service, shapes, operations };
};

/** Names reachable from `roots` (for per-operation and bundle experiments). */
export const reachable = (corpus: Corpus, roots: ReadonlyArray<string>): Set<string> => {
  const seen = new Set<string>();
  const visitRef = (r: Ref) => visit(r.node);
  const visit = (n: Node): void => {
    switch (n.k) {
      case "ref":
        if (!seen.has(n.name) && corpus.shapes[n.name]) {
          seen.add(n.name);
          visitRef(corpus.shapes[n.name]!);
        }
        return;
      case "array":
        return visitRef(n.item);
      case "record":
        return visitRef(n.value);
      case "union":
        return n.members.forEach(visitRef);
      case "struct":
        return n.fields.forEach((f) => visitRef(f.type));
    }
  };
  for (const r of roots) visit({ k: "ref", name: r });
  return seen;
};
