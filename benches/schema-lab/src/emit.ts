/**
 * Generate one module per (corpus, candidate). Every candidate encodes the
 * same shapes and the same wire metadata; each module exports one const per
 * shape and a `validate(name, value)` entry point the lab calls.
 */
import type { Corpus, Meta, Node, Ref } from "./ir.ts";

export type Candidate =
  | "effect-eager"
  | "effect-lazy"
  | "effect-jit"
  | "valibot"
  | "zod-mini"
  | "typebox"
  | "desc-obj"
  | "desc-str"
  | "desc-pruned";

export const CANDIDATES: ReadonlyArray<Candidate> = [
  "effect-eager",
  "effect-lazy",
  "effect-jit",
  "valibot",
  "zod-mini",
  "typebox",
  "desc-obj",
  "desc-str",
  "desc-pruned",
];

const js = (v: unknown) => JSON.stringify(v);
const ident = (name: string) => `$${name.replace(/[^A-Za-z0-9_$]/g, "_")}`;

/** Shape names in dependency order, plus the refs that point backwards (cycles). */
const order = (corpus: Corpus) => {
  const done = new Set<string>(),
    active = new Set<string>(),
    out: string[] = [];
  const back = new Set<string>(); // "from>to"
  const refsOf = (r: Ref, acc: string[] = []): string[] => {
    const n = r.node;
    if (n.k === "ref") acc.push(n.name);
    else if (n.k === "array") refsOf(n.item, acc);
    else if (n.k === "record") refsOf(n.value, acc);
    else if (n.k === "union") n.members.forEach((m) => refsOf(m, acc));
    else if (n.k === "struct") n.fields.forEach((f) => refsOf(f.type, acc));
    return acc;
  };
  const visit = (name: string) => {
    if (done.has(name)) return;
    active.add(name);
    for (const dep of refsOf(corpus.shapes[name]!)) {
      if (!corpus.shapes[dep]) continue;
      if (active.has(dep)) back.add(`${name}>${dep}`);
      else visit(dep);
    }
    active.delete(name);
    done.add(name);
    out.push(name);
  };
  Object.keys(corpus.shapes).forEach(visit);
  return {
    names: out,
    isBack: (from: string, to: string) => back.has(`${from}>${to}`) || !done.has(to),
  };
};

//#region Effect Schema

const effect = (corpus: Corpus, schemaImport: string): string => {
  const { names } = order(corpus);
  const ann = (m?: Meta) => (m ? `.annotate(${js(m)})` : "");
  const node = (r: Ref): string => {
    const n = r.node;
    let s: string;
    switch (n.k) {
      case "string":
        s = "S.String";
        break;
      case "number":
        s = "S.Number";
        break;
      case "boolean":
        s = "S.Boolean";
        break;
      case "unknown":
        s = "S.Unknown";
        break;
      case "null":
        s = "S.Null";
        break;
      case "date":
        s = n.wire === "number" ? "S.DateFromMillis" : "S.DateFromString";
        break;
      case "blob":
        s = "S.String";
        break;
      case "stream":
        s = "S.Unknown";
        break;
      case "literal":
        s = n.v.length === 1 ? `S.Literal(${js(n.v[0])})` : `S.Literals(${js(n.v)})`;
        break;
      case "array":
        s = `S.Array(${node(n.item)})`;
        break;
      case "record":
        s = `S.Record(S.String, ${node(n.value)})`;
        break;
      case "union":
        s = `S.Union([${n.members.map(node).join(", ")}])`;
        break;
      case "ref":
        s = ident(n.name);
        break;
      case "struct":
        s = `S.Struct({${n.fields.map((f) => `${js(f.name)}: ${f.optional ? `S.optional(${node(f.type)})` : node(f.type)}`).join(", ")}})`;
        break;
    }
    return s + ann(r.meta);
  };
  const lines = [`import * as S from ${js(schemaImport)};`];
  for (const name of names) {
    const r = corpus.shapes[name]!;
    lines.push(
      `export const ${ident(name)} = /*@__PURE__*/ S.suspend(() => ${node({ node: r.node })}).annotate(${js({ identifier: name, ...r.meta })});`,
    );
  }
  lines.push(`const cache = new Map();`);
  lines.push(
    `export const validate = (name, value) => { let f = cache.get(name); if (!f) { f = S.is(S.typeCodec ? S.encodedCodec(EXPORTS[name]) : EXPORTS[name]); cache.set(name, f); } return f(value); };`,
  );
  lines.push(`import * as EXPORTS_NS from "./self.js";`);
  return lines.join("\n");
};

//#endregion

/**
 * The lab validates WIRE values (dates as strings, blobs as base64 strings)
 * for every candidate, so the Effect candidates check the encoded side.
 */
const effectModule = (corpus: Corpus, schemaImport: string, self: string): string =>
  effect(corpus, schemaImport)
    .replace(`import * as EXPORTS_NS from "./self.js";`, `import * as EXPORTS from ${js(self)};`)
    .replace(
      /export const validate = .*$/m,
      () =>
        "export const validate = (name, value) => { let f = cache.get(name); if (!f) { f = S.is(S.toEncoded(EXPORTS[`$${name}`])); cache.set(name, f); } return f(value); };",
    );

//#region valibot

const valibot = (corpus: Corpus, self: string): string => {
  const { names, isBack } = order(corpus);
  let current = "";
  const wrap = (s: string, m?: Meta) => (m ? `v.pipe(${s}, v.metadata(${js(m)}))` : s);
  const node = (r: Ref): string => {
    const n = r.node;
    let s: string;
    switch (n.k) {
      case "string":
      case "blob":
      case "date":
        s = n.k === "date" && n.wire === "number" ? "v.number()" : "v.string()";
        break;
      case "number":
        s = "v.number()";
        break;
      case "boolean":
        s = "v.boolean()";
        break;
      case "unknown":
      case "stream":
        s = "v.unknown()";
        break;
      case "null":
        s = "v.null()";
        break;
      case "literal":
        s = n.v.length === 1 ? `v.literal(${js(n.v[0])})` : `v.picklist(${js(n.v)})`;
        break;
      case "array":
        s = `v.array(${node(n.item)})`;
        break;
      case "record":
        s = `v.record(v.string(), ${node(n.value)})`;
        break;
      case "union":
        s = `v.union([${n.members.map(node).join(", ")}])`;
        break;
      case "ref":
        s = isBack(current, n.name) ? `v.lazy(() => ${ident(n.name)})` : ident(n.name);
        break;
      case "struct":
        s = `v.object({${n.fields.map((f) => `${js(f.name)}: ${f.optional ? `v.optional(${node(f.type)})` : node(f.type)}`).join(", ")}})`;
        break;
    }
    return wrap(s, r.meta);
  };
  const lines = [`import * as v from "valibot";`, `import * as EXPORTS from ${js(self)};`];
  for (const name of names) {
    current = name;
    lines.push(`export const ${ident(name)} = ${node(corpus.shapes[name]!)};`);
  }
  lines.push(`export const validate = (name, value) => v.is(EXPORTS[${"`$${name}`"}], value);`);
  return lines.join("\n");
};

//#endregion

//#region zod mini

const zodMini = (corpus: Corpus, self: string): string => {
  const { names, isBack } = order(corpus);
  let current = "";
  const wrap = (s: string, m?: Meta) => (m ? `${s}.register(META, ${js(m)})` : s);
  const node = (r: Ref): string => {
    const n = r.node;
    let s: string;
    switch (n.k) {
      case "string":
      case "blob":
      case "date":
        s = n.k === "date" && n.wire === "number" ? "z.number()" : "z.string()";
        break;
      case "number":
        s = "z.number()";
        break;
      case "boolean":
        s = "z.boolean()";
        break;
      case "unknown":
      case "stream":
        s = "z.unknown()";
        break;
      case "null":
        s = "z.null()";
        break;
      case "literal":
        s = `z.literal(${js(n.v)})`;
        break;
      case "array":
        s = `z.array(${node(n.item)})`;
        break;
      case "record":
        s = `z.record(z.string(), ${node(n.value)})`;
        break;
      case "union":
        s = `z.union([${n.members.map(node).join(", ")}])`;
        break;
      case "ref":
        s = isBack(current, n.name) ? `z.lazy(() => ${ident(n.name)})` : ident(n.name);
        break;
      case "struct":
        s = `z.object({${n.fields.map((f) => `${js(f.name)}: ${f.optional ? `z.optional(${node(f.type)})` : node(f.type)}`).join(", ")}})`;
        break;
    }
    return wrap(s, r.meta);
  };
  const lines = [
    `import * as z from "zod/mini";`,
    `import * as EXPORTS from ${js(self)};`,
    `const META = z.registry();`,
  ];
  for (const name of names) {
    current = name;
    lines.push(`export const ${ident(name)} = ${node(corpus.shapes[name]!)};`);
  }
  lines.push(
    `export const validate = (name, value) => EXPORTS[${"`$${name}`"}].safeParse(value).success;`,
  );
  return lines.join("\n");
};

//#endregion

//#region TypeBox

const typebox = (corpus: Corpus, self: string): string => {
  const { names, isBack } = order(corpus);
  let current = "";
  const opts = (m?: Meta) => (m ? js(m) : "");
  const node = (r: Ref): string => {
    const n = r.node;
    const o = opts(r.meta);
    switch (n.k) {
      case "string":
      case "blob":
      case "date":
        return n.k === "date" && n.wire === "number" ? `Type.Number(${o})` : `Type.String(${o})`;
      case "number":
        return `Type.Number(${o})`;
      case "boolean":
        return `Type.Boolean(${o})`;
      case "unknown":
      case "stream":
        return `Type.Unknown(${o})`;
      case "null":
        return `Type.Null(${o})`;
      case "literal":
        return n.v.length === 1
          ? `Type.Literal(${js(n.v[0])}${o ? `, ${o}` : ""})`
          : `Type.Union([${n.v.map((x) => `Type.Literal(${js(x)})`).join(", ")}]${o ? `, ${o}` : ""})`;
      case "array":
        return `Type.Array(${node(n.item)}${o ? `, ${o}` : ""})`;
      case "record":
        return `Type.Record(Type.String(), ${node(n.value)}${o ? `, ${o}` : ""})`;
      case "union":
        return `Type.Union([${n.members.map(node).join(", ")}]${o ? `, ${o}` : ""})`;
      case "ref":
        return isBack(current, n.name) ? `Type.Ref(${js(n.name)})` : ident(n.name);
      case "struct":
        return `Type.Object({${n.fields.map((f) => `${js(f.name)}: ${f.optional ? `Type.Optional(${node(f.type)})` : node(f.type)}`).join(", ")}}${o ? `, ${o}` : ""})`;
    }
  };
  const lines = [
    `import Type from "typebox";`,
    `import { Value } from "typebox/value";`,
    `import * as EXPORTS from ${js(self)};`,
  ];
  for (const name of names) {
    current = name;
    lines.push(`export const ${ident(name)} = ${node(corpus.shapes[name]!)};`);
  }
  // Back references resolve through a context of every shape by name.
  lines.push(`let context;`);
  lines.push(
    `export const validate = (name, value) => { context ??= Object.fromEntries(Object.entries(EXPORTS).filter(([k]) => k.startsWith("$")).map(([k, s]) => [k.slice(1), s])); return Value.Check(context, EXPORTS[${"`$${name}`"}], value); };`,
  );
  return lines.join("\n");
};

//#endregion

//#region own descriptors

/** Short metadata keys: a generator knows its SDK's annotation vocabulary. */
const metaKeys = new Map<string, string>();
const shortMeta = (m?: Meta) => {
  if (!m) return undefined;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(m)) {
    let s = metaKeys.get(k);
    if (!s) metaKeys.set(k, (s = String.fromCharCode(97 + metaKeys.size)));
    out[s] = v;
  }
  return out;
};

const PRIM: Record<string, string> = {
  string: "s",
  number: "n",
  boolean: "b",
  unknown: "u",
  null: "z",
  blob: "x",
  stream: "y",
};

/**
 * Object-literal descriptors:
 *   field  = spec | [spec, flags, meta?]       flags "?" = optional
 *   spec   = "s" | "n" | "b" | "u" | "z" | "x" | "y" | "t" (date) | "s?" ...
 *          | <shape const> | () => <shape const> (back reference)
 *          | { $a: spec } | { $m: spec } | { $u: [spec] } | { $e: [literal] }
 *   shape  = { field... }
 */
const descObj = (corpus: Corpus, pruned: boolean): string => {
  const { names, isBack } = order(corpus);
  let current = "";
  const keep = new Set<string>(names);
  if (pruned) {
    // Lenient mode needs only fields with wire metadata or a value conversion.
    const needs = new Map<string, boolean>();
    const refNeeds = (r: Ref, stack: Set<string>): boolean => {
      if (r.meta) return true;
      const n = r.node;
      if (n.k === "date" || n.k === "blob" || n.k === "stream") return true;
      if (n.k === "array") return refNeeds(n.item, stack);
      if (n.k === "record") return refNeeds(n.value, stack);
      if (n.k === "union") return n.members.some((m) => refNeeds(m, stack));
      if (n.k === "struct") return n.fields.some((f) => refNeeds(f.type, stack));
      if (n.k === "ref") return shapeNeeds(n.name, stack);
      return false;
    };
    const shapeNeeds = (name: string, stack: Set<string>): boolean => {
      if (needs.has(name)) return needs.get(name)!;
      if (stack.has(name) || !corpus.shapes[name]) return false;
      stack.add(name);
      const r = refNeeds(corpus.shapes[name]!, stack);
      stack.delete(name);
      needs.set(name, r);
      return r;
    };
    for (const n of names) if (!shapeNeeds(n, new Set())) keep.delete(n);
  }
  const needed = (r: Ref): boolean =>
    !pruned ||
    r.meta !== undefined ||
    (r.node.k === "ref"
      ? keep.has(r.node.name)
      : r.node.k === "date" || r.node.k === "blob" || r.node.k === "stream" || r.node.k === "array"
        ? r.node.k === "array"
          ? needed(r.node.item)
          : true
        : r.node.k === "record"
          ? needed(r.node.value)
          : r.node.k === "union"
            ? r.node.members.some(needed)
            : r.node.k === "struct");
  const spec = (r: Ref): string => {
    const n = r.node;
    switch (n.k) {
      case "date":
        return js(n.wire === "number" ? "T" : "t");
      case "literal":
        return `{$e:${js(n.v)}}`;
      case "array":
        return `{$a:${spec(n.item)}}`;
      case "record":
        return `{$m:${spec(n.value)}}`;
      case "union":
        return `{$u:[${n.members.map(spec).join(",")}]}`;
      case "ref":
        return keep.has(n.name)
          ? isBack(current, n.name)
            ? `()=>${ident(n.name)}`
            : ident(n.name)
          : js("u");
      case "struct":
        return `{${n.fields
          .filter((f) => needed(f.type))
          .map(field)
          .join(",")}}`;
      default:
        return js(PRIM[n.k]);
    }
  };
  const field = (f: { name: string; optional: boolean; type: Ref }) => {
    const m = shortMeta(f.type.meta);
    const s = spec({ node: f.type.node });
    const key = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(f.name) ? f.name : js(f.name);
    if (!m && s.startsWith('"')) return `${key}:${f.optional ? js(JSON.parse(s) + "?") : s}`;
    if (!m) return `${key}:${f.optional ? `[${s},"?"]` : s}`;
    return `${key}:[${s},${js(f.optional ? "?" : "")},${js(m)}]`;
  };
  const lines: string[] = [
    `import { validate as check } from ${js(DESC_RUNTIME)};`,
    `import * as EXPORTS from "./self.js";`,
  ];
  for (const name of names) {
    if (!keep.has(name)) continue;
    current = name;
    const r = corpus.shapes[name]!;
    const body = spec({ node: r.node });
    lines.push(`export const ${ident(name)}=${r.node.k === "struct" ? body : `{$r:${body}}`};`);
  }
  lines.push(
    `export const validate = (name, value) => check(EXPORTS[${"`$${name}`"}] ?? "u", value);`,
  );
  return lines.join("\n");
};

/**
 * String descriptors: one string per shape, refs by index into a deps
 * array.   shape = [ "Name:s?|a=x,b=y;Other:@0;List:[@1];Map:{s}", [deps] ]
 */
/** Escape only the characters the string format uses as separators. */
const esc = (s: string) =>
  s.replace(
    /[%|;:,<>\[\]{}()@=?]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")}`,
  );

const descStr = (corpus: Corpus): string => {
  const { names, isBack } = order(corpus);
  const lines: string[] = [
    `import { validateStr as check } from ${js(DESC_RUNTIME)};`,
    `import * as EXPORTS from "./self.js";`,
  ];
  for (const name of names) {
    const deps: string[] = [];
    const dep = (to: string) => {
      const d = isBack(name, to) ? `()=>${ident(to)}` : ident(to);
      let i = deps.indexOf(d);
      if (i < 0) i = deps.push(d) - 1;
      return `@${i}`;
    };
    const spec = (r: Ref): string => {
      const n = r.node;
      switch (n.k) {
        case "date":
          return n.wire === "number" ? "T" : "t";
        case "literal":
          return `<${n.v.map((x) => esc(String(x))).join(",")}>`;
        case "array":
          return `[${spec(n.item)}]`;
        case "record":
          return `{${spec(n.value)}}`;
        case "union":
          return `(${n.members.map(spec).join(",")})`;
        case "ref":
          return corpus.shapes[n.name] ? dep(n.name) : "u";
        case "struct": {
          // Inline struct: a string entry, parsed with this shape's deps.
          const text = n.fields.map(fieldStr).join(";");
          return `@${deps.push(js(text)) - 1}`;
        }
        default:
          return PRIM[n.k]!;
      }
    };
    const fieldStr = (f: { name: string; optional: boolean; type: Ref }) => {
      const m = shortMeta(f.type.meta);
      const ms = m
        ? `|${Object.entries(m)
            .map(([k, v]) => `${k}=${esc(typeof v === "string" ? v : js(v))}`)
            .join(",")}`
        : "";
      return `${esc(f.name)}:${spec({ node: f.type.node })}${f.optional ? "?" : ""}${ms}`;
    };
    const r = corpus.shapes[name]!;
    const text =
      r.node.k === "struct" ? r.node.fields.map(fieldStr).join(";") : `=${spec({ node: r.node })}`;
    lines.push(`export const ${ident(name)}=[${js(text)},[${deps.join(",")}]];`);
  }
  lines.push(`export const validate = (name, value) => check(EXPORTS[${"`$${name}`"}], value);`);
  return lines.join("\n");
};

//#endregion

export let DESC_RUNTIME = "";

export const emit = (
  corpus: Corpus,
  candidate: Candidate,
  self: string,
  descRuntime: string,
): string => {
  DESC_RUNTIME = descRuntime;
  metaKeys.clear();
  switch (candidate) {
    case "effect-eager":
      return effectModule(corpus, "effect/Schema", self);
    case "effect-lazy":
      return effectModule(corpus, "@distilled.cloud/core/schema", self);
    case "effect-jit":
      return effectModule(corpus, "@distilled.cloud/core/schema", self)
        .replace(
          "S.is(S.toEncoded(EXPORTS[`$${name}`]))",
          () =>
            "(() => { const s = S.toEncoded(EXPORTS[`$${name}`]); JIT.enable(s.ast); return S.is(s); })()",
        )
        .replace(/^/, 'import { SchemaJITCompiler as JIT } from "effect/schema";\n');
    case "valibot":
      return valibot(corpus, self);
    case "zod-mini":
      return zodMini(corpus, self);
    case "typebox":
      return typebox(corpus, self);
    case "desc-obj":
      return descObj(corpus, false).replace(`"./self.js"`, js(self));
    case "desc-pruned":
      return descObj(corpus, true).replace(`"./self.js"`, js(self));
    case "desc-str":
      return descStr(corpus).replace(`"./self.js"`, js(self));
  }
};
