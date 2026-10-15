/**
 * Lazy service modules for Node (run by bundle-lib.ts after a package's
 * chunks are written).
 *
 * A bundled service module (`lib/services/<name>.js`) moves to
 * `lib/services.full/<name>.js`, which is what bundlers resolve. In its
 * place goes a stub: one placeholder per operation and error class from
 * `API.lazyService` (core/src/api.ts), the same named exports, and no
 * operation data. Node resolves the stub (the `module-sync` export
 * condition; bundlers take `module` or `default` first), so importing a
 * service, or every service of a provider, parses no operation until one is
 * used. The full module is the bundled module plus a trailing comment, its
 * slice index (see sliceIndex): the first use of an operation reads and
 * evaluates only what it reaches. Without an index the first use loads the
 * whole full module with `require(esm)`, and its definitions become the
 * stub's placeholders. Modules under MIN_BYTES stay whole.
 *
 * Every other `lib/` file that names a service module: barrels get a
 * `<file>.full.js` twin naming the full modules for bundlers (the original,
 * for Node, keeps the stubs); other files name the module through the
 * package (`@distilled.cloud/aws/sts`), so Node resolves the stub and
 * bundlers the full module.
 *
 * `node scripts/lazy-services.ts --exports [packages/<pkg> ...]` rewrites the
 * packages' `exports` to that layout; bundle-lib fails when they differ.
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const require = createRequire(join(ROOT, "packages", "core", "package.json"));
const { parseAst } = (await import(require.resolve("rolldown/parseAst"))) as {
  parseAst: (code: string, options: object, filename: string) => any;
};

const FULL = ".full";
/**
 * Service modules below this size stay whole for Node: a stub and its first
 * use cost more than such a module (a stub costs ~0.5 KB of heap per export).
 */
const MIN_BYTES = Number(process.env.DISTILLED_LAZY_MIN_BYTES ?? 8192);
const CORE_BASE = "@distilled.cloud/core/_bundle/base";
const KIND: Record<string, string> = {
  api$op: "o",
  api$opPaginated: "p",
  api$error: "e",
  // Helpers the data functions call (see dataForm).
  api$named: "n",
  api$newError: "x",
  api$D: "D",
};
const DEF_KINDS = new Set(["o", "p", "e"]);

//#region source edits that keep a source map valid

const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const vlqDecode = (s: string): number[] => {
  const out: number[] = [];
  let shift = 0;
  let value = 0;
  for (const ch of s) {
    const d = B64.indexOf(ch);
    value += (d & 31) << shift;
    if (d & 32) shift += 5;
    else {
      out.push(value & 1 ? -(value >>> 1) : value >>> 1);
      shift = 0;
      value = 0;
    }
  }
  return out;
};
const vlqEncode = (values: number[]): string =>
  values
    .map((v) => {
      let x = v < 0 ? (-v << 1) | 1 : v << 1;
      let out = "";
      do {
        let d = x & 31;
        x >>>= 5;
        if (x) d |= 32;
        out += B64[d];
      } while (x);
      return out;
    })
    .join("");

/** Replaces `del` chars at each offset with `text` (no newlines); shifts the map's generated columns. */
const insert = (
  code: string,
  map: any,
  edits: { at: number; text: string; del?: number }[],
): string => {
  edits = [...edits].sort((a, b) => a.at - b.at);
  let out = "";
  let last = 0;
  for (const e of edits) {
    out += code.slice(last, e.at) + e.text;
    last = e.at + (e.del ?? 0);
  }
  out += code.slice(last);
  if (map) {
    const lineStarts = [0];
    for (let i = 0; i < code.length; i++) if (code.charCodeAt(i) === 10) lineStarts.push(i + 1);
    const byLine = new Map<number, { col: number; len: number }[]>();
    for (const e of edits) {
      let line = 0;
      while (line + 1 < lineStarts.length && lineStarts[line + 1]! <= e.at) line++;
      byLine.set(line, [
        ...(byLine.get(line) ?? []),
        { col: e.at - lineStarts[line]! + (e.del ?? 0), len: e.text.length - (e.del ?? 0) },
      ]);
    }
    map.mappings = (map.mappings as string)
      .split(";")
      .map((segs, l) => {
        const at = byLine.get(l);
        if (!at || !segs) return segs;
        let abs = 0;
        let prevOut = 0;
        return segs
          .split(",")
          .map((seg) => {
            const f = vlqDecode(seg);
            abs += f[0]!;
            const shifted = abs + at.filter((c) => c.col <= abs).reduce((n, c) => n + c.len, 0);
            f[0] = shifted - prevOut;
            prevOut = shifted;
            return vlqEncode(f);
          })
          .join(",");
      })
      .join(";");
  }
  return out;
};

//#endregion

/** `exported name -> kind letter` of a group chunk's re-exports of `API.op` / `opPaginated` / `error`. */
const groupKinds = (file: string): Map<string, string> => {
  const ast = parseAst(readFileSync(file, "utf8"), { sourceType: "module" }, file);
  const local = new Map<string, string>();
  const out = new Map<string, string>();
  for (const n of ast.body)
    if (n.type === "ImportDeclaration" && n.source.value === CORE_BASE)
      for (const s of n.specifiers)
        if (s.type === "ImportSpecifier" && KIND[s.imported.name])
          local.set(s.local.name, KIND[s.imported.name]!);
  for (const n of ast.body)
    if (n.type === "ExportNamedDeclaration" && !n.source)
      for (const s of n.specifiers) {
        const k = local.get(s.local.name);
        if (k) out.set(s.exported.name ?? s.exported.value, k);
      }
  return out;
};

const idOf = (n: any): string => n.name ?? n.value;
const RESERVED = new Set(
  "await break case catch class const continue debugger default delete do else enum export extends false finally for function if implements import in instanceof interface let new null package private protected public return static super switch this throw true try typeof var void while with yield eval arguments undefined NaN Infinity".split(
    " ",
  ),
);
const isBinding = (n: string) => /^[A-Za-z_$][\w$]*$/.test(n) && !RESERVED.has(n);
const shortName = (i: number) => `_${i.toString(36)}`;

/**
 * The slice index of a full module: where each top-level declaration's
 * expression is in the file (UTF-8 byte offsets) and which declarations it
 * may read, so Node can evaluate one operation and what it reaches instead
 * of the whole module (`API.lazyService`). Undefined when the module has
 * top-level code other than imports, consts and function declarations.
 * Text, one line each:
 *
 *   imports declarations       the counts
 *   local:source:imported ...   the imports (source: index into the stub's namespaces)
 *   offset...                   where each declaration's line starts in the
 *                               lines that follow (5 base-36 digits each,
 *                               one more for the end)
 *   kind start end name|fn|dep ...
 *                               one line per declaration (numbers base 36):
 *                               operations in definition order, then error
 *                               classes, then the rest;
 *                               fn, for a function with plain parameters:
 *                               `params;bodyStart bodyEnd expr`
 *   kind start end|(s e bs be expr params,...|dep ...
 *                               a value whose call is passed functions: at
 *                               s..e, each with its body
 *                               bs..be and `+`-joined parameters
 *   kind start end|=stem;ds de;ref,...
 *                               a data function in its generated shape: its
 *                               data is the template at ds..de (`%` -> stem),
 *                               its refs these names (index into the names)
 *
 * kind: 0 value const, 1 function declaration, 2 operation, 3 error class;
 * for 2 and 3 the range is the data function, the argument of `op(...)` /
 * `error(...)`. Deps are the names (imports, then declarations) it reads: a
 * superset, shadowed names count too.
 */
const sliceIndex = (
  code: string,
  ast: any,
  sources: string[],
  imports: Map<string, { source: string; imported: string }>,
  defs: Map<string, { kind: string; index: number }>,
  helpers: Map<string, string>,
): string | undefined => {
  const decls: { node: any; name: string; kind: number; order: number }[] = [];
  for (const n of ast.body) {
    if (n.type === "ImportDeclaration" || n.type === "ExportNamedDeclaration") continue;
    if (n.type === "FunctionDeclaration" && n.id && !n.async && !n.generator)
      decls.push({ node: n, name: n.id.name, kind: 1, order: 0 });
    else if (n.type === "VariableDeclaration" && n.kind === "const")
      for (const d of n.declarations) {
        if (d.id.type !== "Identifier" || !d.init) return undefined;
        const def = defs.get(d.id.name);
        if (def) {
          if (d.init.arguments.length !== 1) return undefined;
          decls.push({
            node: d.init.arguments[0],
            name: d.id.name,
            kind: def.kind === "e" ? 3 : 2,
            order: def.index,
          });
        } else decls.push({ node: d.init, name: d.id.name, kind: 0, order: 0 });
      }
    else return undefined;
  }
  const rank = (k: number) => (k === 2 ? 0 : k === 3 ? 1 : 2);
  decls.sort((a, b) => rank(a.kind) - rank(b.kind) || (a.kind >= 2 ? a.order - b.order : 0));
  const idx = new Map(decls.map((d, i) => [d.name, i]));
  const importPos = new Map([...imports.keys()].map((n, i) => [n, i]));
  if ([...imports.keys()].some((n) => idx.has(n))) return undefined;
  // Latin-1 source written as UTF-8: bytes before a char = chars + chars >= 0x80.
  const wide = new Int32Array(code.length + 1);
  for (let i = 0; i < code.length; i++)
    wide[i + 1] = wide[i]! + (code.charCodeAt(i) >= 0x80 ? 1 : 0);
  const byte = (i: number) => i + wide[i]!;
  const depsOf = (node: any): number[] => {
    const out = new Set<number>();
    const visit = (n: any, parent: any, key: string): void => {
      if (Array.isArray(n)) return n.forEach((c) => visit(c, parent, key));
      if (!n || typeof n !== "object") return;
      if (n.type === "Identifier") {
        const notRef =
          (parent?.type === "MemberExpression" && key === "property" && !parent.computed) ||
          (parent?.type === "Property" && key === "key" && !parent.computed && !parent.shorthand) ||
          (parent?.type === "MethodDefinition" && key === "key" && !parent.computed);
        // Names: the imports, then the declarations.
        const d = idx.get(n.name);
        const i = d !== undefined ? imports.size + d : importPos.get(n.name);
        if (!notRef && i !== undefined) out.add(i);
        return;
      }
      for (const k in n) if (k !== "type" && n[k] && typeof n[k] === "object") visit(n[k], n, k);
    };
    visit(node, undefined, "");
    return [...out];
  };
  const b36 = (x: number) => x.toString(36);
  // A function with plain parameters: its parameters and body, so Node
  // compiles the body as the function itself (one parse, not two).
  const fnForm = (n: any, kind: number): string => {
    const fn =
      n.type === "ArrowFunctionExpression" ||
      n.type === "FunctionExpression" ||
      n.type === "FunctionDeclaration";
    if (!fn || n.async || n.generator || !n.params.every((p: any) => p.type === "Identifier"))
      return "";
    const self = n.id?.name;
    if (self && code.slice(n.body.start, n.body.end).includes(self)) return "";
    const expr = n.body.type !== "BlockStatement";
    const [bs, be] = expr ? [n.body.start, n.body.end] : [n.body.start + 1, n.body.end - 1];
    return `${n.params.map((p: any) => p.name).join(",")};${b36(byte(bs))} ${b36(byte(be))} ${expr ? 1 : 0}`;
  };
  // Data functions in their generated shape need no compiling: their data
  // is a template literal without escapes and their refs are names.
  const importIdx = new Map([...imports.keys()].map((n, i) => [n, i]));
  const is = (n: any, kind: string) => n?.type === "Identifier" && helpers.get(n.name) === kind;
  const dataExpr = (n: any): string | undefined => {
    let stem = "";
    let tpl: any;
    let refs: any;
    if (n?.type === "ArrayExpression" && n.elements.length === 2) [tpl, refs] = n.elements;
    else if (n?.type === "CallExpression" && is(n.callee, "n") && n.arguments.length === 3) {
      const s = n.arguments[0];
      if (s.type !== "TemplateLiteral" || s.expressions.length) return undefined;
      stem = s.quasis[0].value.cooked;
      if (stem !== s.quasis[0].value.raw || /[;| ]/.test(stem)) return undefined;
      [, tpl, refs] = n.arguments;
    } else return undefined;
    if (tpl?.type !== "TemplateLiteral" || tpl.expressions.length) return undefined;
    const q = tpl.quasis[0];
    if (q.value.cooked !== q.value.raw || refs?.type !== "ArrayExpression") return undefined;
    const names: number[] = [];
    for (const r of refs.elements) {
      if (r?.type !== "Identifier") return undefined;
      const i = importIdx.get(r.name) ?? (idx.has(r.name) ? imports.size + idx.get(r.name)! : -1);
      if (i < 0) return undefined;
      names.push(i);
    }
    return `=${stem};${b36(byte(q.start))} ${b36(byte(q.end))};${names.map(b36).join(",")}`;
  };
  const dataForm = (n: any, kind: number): string | undefined => {
    if (kind === 2) {
      // t => t === D ? data : call(op, t)
      const b = n.body;
      if (n.type !== "ArrowFunctionExpression" || b?.type !== "ConditionalExpression")
        return undefined;
      if (b.test.type !== "BinaryExpression" || b.test.operator !== "===" || !is(b.test.right, "D"))
        return undefined;
      return dataExpr(b.consequent);
    }
    if (kind !== 1 && kind !== 3) return undefined;
    const body = n.body?.body;
    if (!Array.isArray(body) || body.length !== 1 || body[0].type !== "ReturnStatement")
      return undefined;
    const r = body[0].argument;
    if (kind === 1) return n.params.length === 0 ? dataExpr(r) : undefined;
    // function X(t) { return newError(t, new.target, data) }
    if (r?.type !== "CallExpression" || !is(r.callee, "x") || r.arguments.length !== 3)
      return undefined;
    return dataExpr(r.arguments[2]);
  };
  // A value made by a call that is passed functions (an endpoint resolver,
  // often never called): where each function is (relative to the value) and
  // its parameters and body, so Node compiles it on its first call only.
  const lazyArgs = (n: any, kind: number): string => {
    if (kind !== 0 || n.type !== "CallExpression") return "";
    const out: string[] = [];
    for (const a of n.arguments) {
      if (a.type !== "ArrowFunctionExpression" && a.type !== "FunctionExpression") continue;
      if (a.async || a.generator || !a.params.every((p: any) => p.type === "Identifier")) continue;
      if (
        a.type === "FunctionExpression" &&
        (a.id || /\b(this|arguments)\b/.test(code.slice(a.start, a.end)))
      )
        continue;
      const expr = a.body.type !== "BlockStatement";
      const [bs, be] = expr ? [a.body.start, a.body.end] : [a.body.start + 1, a.body.end - 1];
      out.push(
        [byte(a.start), byte(a.end), byte(bs), byte(be), expr ? 1 : 0]
          .map(b36)
          .concat(a.params.map((p: any) => p.name).join("+"))
          .join(" "),
      );
    }
    return out.length ? `(${out.join(",")}` : "";
  };
  const lines = decls.map((d) => {
    const head = `${[d.kind, byte(d.node.start), byte(d.node.end)].map(b36).join(" ")} ${d.name}`;
    const data = dataForm(d.node, d.kind);
    return data
      ? `${head}|${data}`
      : `${head}|${fnForm(d.node, d.kind) || lazyArgs(d.node, d.kind)}|${depsOf(d.node).map(b36).join(" ")}`;
  });
  // Offsets of each line in the lines section (fixed width), so Node finds
  // one without splitting the index.
  let off = 0;
  const table = [...lines, ""]
    .map((l) => {
      const o = b36(off).padStart(5, "0");
      off += l.length + 1;
      return o;
    })
    .join("");
  if (off >= 36 ** 5) return undefined;
  return [
    `${imports.size} ${decls.length}`,
    [...imports]
      .map(([local, m]) => `${local}:${sources.indexOf(m.source)}:${m.imported}`)
      .join(" "),
    table,
    ...lines,
  ].join("\n");
};

/**
 * The stub of one service chunk, and the full module with its definitions
 * bracketed; undefined when the module is not made only of data
 * definitions and re-exports.
 */
/** How a package's stubs reach core: one helper module (see {@link LAZY_HELPER}). */
interface Helper {
  /** The helper, relative to the stub. */
  readonly spec: string;
  /** The full module, relative to the helper. */
  readonly full: string;
  /** Whether the helper imports a source of this stub (as namespace `N[i]`). */
  readonly has: (source: string) => number | undefined;
}

type Render = (helper: Helper) => { stub: string; full: string };

const lazyModule = (
  file: string,
  kindsOf: (source: string) => Map<string, string> | undefined,
): { sources: string[]; render: Render } | undefined => {
  const code = readFileSync(file, "utf8");
  if (code.includes("api$lazyService") || code.includes("import{$L}from"))
    throw new Error(`${file} is already a lazy stub: rebuild the package with bundle-lib`);
  const ast = parseAst(code, { sourceType: "module" }, file);
  const imports = new Map<string, { source: string; imported: string }>();
  const kindOfLocal = new Map<string, string>();
  const helperOfLocal = new Map<string, string>();
  const sources: string[] = [];
  for (const n of ast.body) {
    if (n.type !== "ImportDeclaration") continue;
    if (!sources.includes(n.source.value)) sources.push(n.source.value);
    const kinds =
      n.source.value === CORE_BASE ? new Map(Object.entries(KIND)) : kindsOf(n.source.value);
    for (const s of n.specifiers) {
      if (s.type !== "ImportSpecifier") return undefined;
      imports.set(s.local.name, { source: n.source.value, imported: idOf(s.imported) });
      const k = kinds?.get(idOf(s.imported));
      if (k && DEF_KINDS.has(k)) kindOfLocal.set(s.local.name, k);
      else if (k) helperOfLocal.set(s.local.name, k);
    }
  }
  if (kindOfLocal.size === 0) return undefined;
  // Definitions in order: `const x = op(...)`, top level only.
  const defs = new Map<string, { kind: string; index: number }>();
  let ops = "";
  let errors = 0;
  /** The class name of each error class, in definition order. */
  const errClass: string[] = [];
  let exportNode: any;
  for (const n of ast.body) {
    if (n.type === "VariableDeclaration")
      for (const d of n.declarations) {
        const c = d.init;
        const k =
          c?.type === "CallExpression" &&
          c.callee.type === "Identifier" &&
          kindOfLocal.get(c.callee.name);
        if (!k || d.id.type !== "Identifier") continue;
        if (k === "e") {
          defs.set(d.id.name, { kind: k, index: errors++ });
          const a = c.arguments[0];
          errClass.push(a?.type === "FunctionExpression" && a.id ? a.id.name : d.id.name);
        } else defs.set(d.id.name, { kind: k, index: (ops += k).length - 1 });
      }
    else if (n.type === "ExportNamedDeclaration") {
      if (n.source || n.declaration || exportNode) return undefined;
      exportNode = n;
    } else if (n.type === "ExportAllDeclaration" || n.type === "ExportDefaultDeclaration")
      return undefined;
  }
  if (!exportNode) return undefined;
  // Every call of op / opPaginated / error must be one of those definitions.
  let calls = 0;
  const visit = (node: any): void => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== "object") return;
    if (
      node.type === "CallExpression" &&
      node.callee.type === "Identifier" &&
      kindOfLocal.has(node.callee.name)
    )
      calls++;
    for (const k in node)
      if (k !== "type" && node[k] && typeof node[k] === "object") visit(node[k]);
  };
  visit(ast.body);
  if (calls !== defs.size) return undefined;
  // Export names of each definition, in definition order.
  const opNames: string[][] = Array.from({ length: ops.length }, () => []);
  const errNames: string[][] = Array.from({ length: errors }, () => []);
  const reexports = new Map<string, string[]>();
  for (const s of exportNode.specifiers) {
    const local = idOf(s.local);
    const exported = idOf(s.exported);
    const def = defs.get(local);
    if (def) {
      (def.kind === "e" ? errNames : opNames)[def.index]!.push(exported);
      continue;
    }
    const imp = imports.get(local);
    if (!imp) return undefined;
    const name = isBinding(exported) ? exported : JSON.stringify(exported);
    reexports.set(imp.source, [...(reexports.get(imp.source) ?? []), `${imp.imported} as ${name}`]);
  }
  let next = 0;
  const aliases: string[] = [];
  const decl = (names: string[], make: string, arg = "") => {
    const [first, ...rest] = names;
    const local =
      first && isBinding(first) && !["$L", "$o", "$e"].includes(first) && !/^\$\d+$/.test(first)
        ? first
        : shortName(next++);
    if (first && local !== first) aliases.push(`${local} as ${JSON.stringify(first)}`);
    for (const n of rest) aliases.push(`${local} as ${isBinding(n) ? n : JSON.stringify(n)}`);
    return { exported: local === first, text: `${local}=${make}(${arg})` };
  };
  // An error class exported once under its own class name is a property of
  // `$E` (a proxy that makes the placeholder named after the property read),
  // so the name is written once; otherwise `$e("Name")`.
  const destructure =
    errors > 0 &&
    errNames.every((n, i) => n[0] === errClass[i] && isBinding(n[0]!) && !/^\$/.test(n[0]!));
  const errDecls = destructure
    ? errNames.map((n) => {
        for (const x of n.slice(1))
          aliases.push(`${n[0]} as ${isBinding(x) ? x : JSON.stringify(x)}`);
        return { exported: true, text: n[0]! };
      })
    : errNames.map((n, i) => decl(n, "$e", JSON.stringify(errClass[i])));
  const opDecls = opNames.map((n) => decl(n, "$o"));
  // Each export name written once (`export const a=…`): V8 keeps a module's
  // source on the heap. Declarations stay in definition order.
  const groups: string[] = [];
  const declare = (list: { exported: boolean; text: string }[]) => {
    for (let i = 0; i < list.length;) {
      const exported = list[i]!.exported;
      let j = i;
      while (j < list.length && list[j]!.exported === exported) j++;
      groups.push(
        `${exported ? "export " : ""}const ${list
          .slice(i, j)
          .map((d) => d.text)
          .join(",")};`,
      );
      i = j;
    }
  };
  if (destructure) groups.push(`export const{${errDecls.map((d) => d.text).join(",")}}=$E;`);
  else declare(errDecls);
  declare(opDecls);
  const render: Render = (helper) => {
    // Namespaces: the helper's first, then the stub's own imports.
    const own = sources.filter((src) => helper.has(src) === undefined);
    const common = sources.filter((src) => helper.has(src) !== undefined);
    const order = [...common.sort((a, b) => helper.has(a)! - helper.has(b)!), ...own];
    // Positions in `order` must match the helper's namespace list.
    const shared = common.length > 0 && common.every((src, i) => helper.has(src) === i);
    const text =
      shared || common.length === 0
        ? sliceIndex(code, ast, order, imports, defs, helperOfLocal)
        : undefined;
    // The index goes in a comment at the end of the full module (before its
    // sourceMappingURL), which bundlers drop; declarations keep their offsets.
    let index: { full: string; at: number; len: number } | undefined;
    if (text) {
      const tail = code.lastIndexOf("\n//# sourceMappingURL=");
      const head = `${tail >= 0 ? code.slice(0, tail) : code}\n/*\n`;
      index = {
        full: `${head}${text}\n*/${tail >= 0 ? code.slice(tail) : "\n"}`,
        at: Buffer.byteLength(head),
        len: Buffer.byteLength(text),
      };
    }
    const base = common.length;
    const stub = [
      ...own.map((src, i) => (index ? `import*as $${base + i} from"${src}";` : `import"${src}";`)),
      `import{$L}from"${helper.spec}";`,
      ...[...reexports].map(([src, l]) => `export{${l.join(",")}}from"${src}";`),
      `const{o:$o,e:$e${destructure ? ",E:$E" : ""}}=/*@__PURE__*/$L(${JSON.stringify(helper.full)},"${ops}"${
        index
          ? `,${index.at},${index.len}${own.length ? `,[${own.map((_, i) => `$${base + i}`).join(",")}]` : ""}`
          : ""
      });`,
      ...groups,
      ...(aliases.length ? [`export{${aliases.join(",")}};`] : []),
      "",
    ].join("\n");
    return { stub, full: index ? index.full : code };
  };
  return { sources, render };
};

/**
 * The module every stub of a package imports instead of core and
 * `import.meta.url`: it resolves the full modules relative to itself, and
 * imports (as namespaces) the chunks every stub imports. Each import costs a
 * module ~1 KB of heap.
 */
const LAZY_HELPER = "_bundle/lazy.js";

/** `export * as x from "./x.js"` lines become lazy namespaces; other lines stay. */
const lazyBarrel = (code: string): string => {
  const lines = code.split("\n");
  const lazy: string[] = [];
  const aliases: string[] = [];
  const rest = lines.filter((line) => {
    const m = /^export \* as ("[^"]+"|[\w$]+) from ("\.\/[^"]+\.js");$/.exec(line);
    if (!m) return true;
    const name = m[1]!.startsWith('"') ? JSON.parse(m[1]!) : m[1]!;
    if (isBinding(name) && !["$N", "$u"].includes(name)) lazy.push(`${name}=$N($u,${m[2]})`);
    else {
      const local = `_${lazy.length.toString(36)}`;
      lazy.push(`${local}=$N($u,${m[2]})`);
      aliases.push(`${local} as ${JSON.stringify(name)}`);
    }
    return false;
  });
  if (lazy.length === 0) return code;
  const names = lazy.map((l) => l.split("=")[0]!).filter((n) => !n.startsWith("_"));
  return [
    `import{api$lazyNamespace as $N}from"${CORE_BASE}";`,
    ...rest.filter((l) => l.trim()),
    `const $u=import.meta.url,${lazy.join(",")};`,
    `export{${[...names, ...aliases].join(",")}};`,
    "",
  ].join("\n");
};

const SPECIFIER = /(["'`])((?:\.\.?\/)+)([\w./-]+?)\/([\w.-]+\.js)\1/g;

/** Specifiers of `lib/` code that name a module of a service directory, pointed at the full one. */
const toFull = (
  code: string,
  map: any,
  dirs: string[],
  from: string,
  lib: string,
  selfRef?: (dir: string, file: string) => string | undefined,
): string => {
  const edits: { at: number; text: string; del?: number }[] = [];
  for (const m of code.matchAll(SPECIFIER)) {
    const target = relative(lib, resolve(dirname(from), m[2]! + m[3]!))
      .split("\\")
      .join("/");
    if (!dirs.includes(target)) continue;
    const self = selfRef?.(target, m[4]!);
    if (self) {
      const at = m.index! + 1;
      edits.push({ at, del: m[0].length - 2, text: self });
    } else edits.push({ at: m.index! + 1 + m[2]!.length + m[3]!.length, text: FULL });
  }
  return edits.length ? insert(code, map, edits) : code;
};

const walkJs = (dir: string, out: string[] = []): string[] => {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walkJs(p, out);
    else if (p.endsWith(".js")) out.push(p);
  }
  return out;
};

const readMap = (file: string) =>
  existsSync(`${file}.map`) ? JSON.parse(readFileSync(`${file}.map`, "utf8")) : undefined;

/**
 * Makes a package's service modules lazy (see the header). `serviceDirs` are
 * lib-relative; returns the lib-relative files written, and the `default`
 * export targets that got a `.full.js` twin.
 */
export const lazyServices = (
  pkgDir: string,
  serviceDirs: string[],
  minBytes = MIN_BYTES,
): { written: string[]; twins: string[]; stubs: number; kept: number; dirs: string[] } => {
  const lib = join(pkgDir, "lib");
  const written: string[] = [];
  const kindCache = new Map<string, Map<string, string> | undefined>();
  let stubs = 0;
  let kept = 0;
  const lazyDirs: string[] = [];
  const plans: {
    d: string;
    dir: string;
    files: string[];
    lazy: Map<string, ReturnType<typeof lazyModule>>;
  }[] = [];
  for (const d of serviceDirs) {
    const dir = join(lib, d);
    const kindsOf = (source: string) => {
      if (!source.startsWith(".")) return undefined;
      const abs = resolve(dir, source);
      if (!kindCache.has(abs)) kindCache.set(abs, existsSync(abs) ? groupKinds(abs) : undefined);
      return kindCache.get(abs);
    };
    const files = readdirSync(dir).filter((f) => f.endsWith(".js"));
    const lazy = new Map(
      files.map((f) => [f, f === "index.js" ? undefined : lazyModule(join(dir, f), kindsOf)]),
    );
    // Only directories of generated service modules.
    if (![...lazy.values()].some(Boolean)) continue;
    // A small module costs Node less whole than as a stub plus slices.
    for (const [f, l] of lazy)
      if (l && statSync(join(dir, f)).size < minBytes) lazy.set(f, undefined);
    lazyDirs.push(d);
    plans.push({ d, dir, files, lazy });
  }
  // The imports every stub has (a lib file or a bare specifier), in a fixed order.
  const target = (dir: string, src: string) => (src.startsWith(".") ? resolve(dir, src) : src);
  let common: string[] | undefined;
  for (const { dir, lazy } of plans)
    for (const l of lazy.values()) {
      if (!l) continue;
      const t = new Set(l.sources.map((src) => target(dir, src)));
      common = common ? common.filter((x) => t.has(x)) : [...t];
    }
  const helperFile = join(lib, LAZY_HELPER);
  const relSpec = (from: string, to: string) => {
    const r = rel(from, to);
    return r.startsWith(".") ? r : `./${r}`;
  };
  if (common) {
    mkdirSync(dirname(helperFile), { recursive: true });
    writeFileSync(
      helperFile,
      [
        ...common.map(
          (t, i) =>
            `import*as $${i} from"${t.startsWith("/") ? relSpec(dirname(helperFile), t) : t}";`,
        ),
        `import{api$lazyService as L}from"${CORE_BASE}";`,
        `const u=import.meta.url,N=[${common.map((_, i) => `$${i}`).join(",")}];`,
        "export const $L=(s,k,a,l,x)=>L(u,s,k,a===void 0?void 0:x?N.concat(x):N,a,l);",
        "",
      ].join("\n"),
    );
    written.push(rel(lib, helperFile));
  }
  for (const { d, dir, files, lazy } of plans) {
    const fullDir = `${dir}${FULL}`;
    mkdirSync(fullDir, { recursive: true });
    const at = new Map((common ?? []).map((t, i) => [t, i]));
    for (const f of files) {
      const file = join(dir, f);
      const fullFile = join(fullDir, f);
      const l = lazy.get(f);
      const map = readMap(file);
      if (l) {
        const { stub, full } = l.render({
          spec: relSpec(dir, helperFile),
          full: relSpec(dirname(helperFile), fullFile),
          has: (src) => at.get(target(dir, src)),
        });
        writeFileSync(fullFile, full);
        if (map) {
          writeFileSync(`${fullFile}.map`, JSON.stringify(map));
          written.push(rel(lib, `${fullFile}.map`));
        }
        writeFileSync(file, stub);
        rmSync(`${file}.map`, { force: true });
        stubs++;
      } else if (f === "index.js") {
        // A barrel of sibling modules: the same barrel over the full ones,
        // and for Node namespaces that load their module on first use.
        const code = readFileSync(file, "utf8");
        writeFileSync(fullFile, code);
        writeFileSync(file, lazyBarrel(code));
      } else {
        writeFileSync(fullFile, `export*from"../${d.split("/").at(-1)}/${f}";\n`);
        kept++;
      }
      written.push(rel(lib, fullFile));
    }
  }
  serviceDirs = lazyDirs;
  // Other files naming a service module.
  const defaults = defaultTargets(pkgDir);
  const pkgJson = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
  const selfRef = (dir: string, f: string): string | undefined => {
    for (const [key, v] of Object.entries<any>(pkgJson.exports ?? {})) {
      const t = typeof v === "object" ? (v?.["module-sync"] ?? v?.default) : v;
      if (key.endsWith("/*") && t === `./lib/${dir}/*.js`)
        return `${pkgJson.name}/${key.slice(2, -1)}${f.replace(/\.js$/, "")}`;
    }
    return undefined;
  };
  const twins: string[] = [];
  const inService = (r: string) =>
    serviceDirs.some((d) => r.startsWith(`${d}/`) || r.startsWith(`${d}${FULL}/`));
  for (const file of walkJs(lib)) {
    const r = rel(lib, file);
    if (inService(r) || r.endsWith(`${FULL}.js`)) continue;
    const code = readFileSync(file, "utf8");
    const map = readMap(file);
    // Files only bundlers or lazy code reach name the module through the
    // package (`@distilled.cloud/aws/sts`): Node resolves the stub, so a
    // service has one set of objects; bundlers resolve the full module.
    const out = toFull(code, map, serviceDirs, file, lib, defaults.has(r) ? undefined : selfRef);
    if (out === code) continue;
    if (defaults.has(r)) {
      const twin = file.replace(/\.js$/, `${FULL}.js`);
      writeFileSync(twin, out);
      if (map) {
        writeFileSync(`${twin}.map`, JSON.stringify(map));
        written.push(rel(lib, `${twin}.map`));
      }
      written.push(rel(lib, twin));
      twins.push(r);
    } else {
      writeFileSync(file, out);
      if (map) writeFileSync(`${file}.map`, JSON.stringify(map));
    }
  }
  return { written, twins, stubs, kept, dirs: lazyDirs };
};

const rel = (from: string, to: string) => relative(from, to).split("\\").join("/");

/** lib-relative files that are the `default` target of a non-wildcard export. */
const defaultTargets = (pkgDir: string): Set<string> => {
  const pkg = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
  const out = new Set<string>();
  for (const [key, v] of Object.entries<any>(pkg.exports ?? {})) {
    if (key.includes("*")) continue;
    const t = typeof v === "string" ? v : v?.default;
    if (typeof t === "string" && t.startsWith("./lib/") && !t.includes(`${FULL}.`))
      out.add(t.slice("./lib/".length));
    const s = typeof v === "object" ? v?.["module-sync"] : undefined;
    if (typeof s === "string" && s.startsWith("./lib/")) out.add(s.slice("./lib/".length));
  }
  return out;
};

/**
 * The `exports` a package needs: Node (`module-sync`) gets stubs and the
 * original barrels, bundlers (`module`, `default`) the full modules.
 */
export const lazyExports = (
  exports: Record<string, any>,
  serviceDirs: string[],
  twins: string[],
) => {
  const out: Record<string, any> = {};
  for (const [key, v] of Object.entries(exports)) {
    if (typeof v !== "object" || v === null) {
      out[key] = v;
      continue;
    }
    const node: string | undefined = v["module-sync"] ?? v.default;
    let full: string | undefined;
    if (typeof node === "string") {
      const wild = /^\.\/lib\/(.+)\/\*\.js$/.exec(node);
      if (wild && serviceDirs.includes(wild[1]!)) full = `./lib/${wild[1]}${FULL}/*.js`;
      else if (twins.includes(node.slice("./lib/".length)))
        full = node.replace(/\.js$/, `${FULL}.js`);
    }
    const { module: _m, "module-sync": _s, default: _d, ...rest } = v;
    out[key] = full
      ? { ...rest, module: full, "module-sync": node, default: full }
      : { ...rest, default: node };
  }
  return out;
};

if (import.meta.main && process.argv[2] === "--exports") {
  const dirs = process.argv.slice(3);
  for (const d of dirs.length
    ? dirs
    : readdirSync(join(ROOT, "packages")).map((p) => `packages/${p}`)) {
    const pkgFile = join(ROOT, d, "package.json");
    if (!existsSync(pkgFile) || !existsSync(join(ROOT, d, "lib"))) continue;
    const pkg = JSON.parse(readFileSync(pkgFile, "utf8"));
    const twinsFile = join(ROOT, d, "lib", ".lazy.json");
    if (!existsSync(twinsFile)) continue;
    const { serviceDirs, twins } = JSON.parse(readFileSync(twinsFile, "utf8"));
    const next = lazyExports(pkg.exports, serviceDirs, twins);
    if (JSON.stringify(next) !== JSON.stringify(pkg.exports)) {
      pkg.exports = next;
      writeFileSync(pkgFile, `${JSON.stringify(pkg, null, 2)}\n`);
      console.log(`lazy-services: ${d}: exports updated`);
    }
  }
}
