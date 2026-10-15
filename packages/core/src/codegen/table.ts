/**
 * Replace module-private schema consts with a lazily filled table
 * (dev-time only; runs after `chunkSchemas`).
 *
 *   const Customer = __L.at(__c12, 3) as any as S.Schema<Customer>;
 *   const Customer2 = Customer;
 *   const Status = S.String;
 *   ... S.optional(Customer2) ... S.optional(Status) ...
 * becomes
 *   ... S.optional(__S(99, __c12, 3)) ... S.optional(S.String) ...
 *   const __s: any[] = [];
 *   function __S(i: number, f: (j: number) => unknown, j: number): any { return (__s[i] ??= __L.at(f, j)); }
 *
 * A top-level const costs memory at import even when its schema is never
 * built: a context slot, its name in the module's scope info, bytecode in
 * the module body and the lazy wrapper it holds. With the table, importing
 * a module allocates nothing per schema; a schema's lazy wrapper is made the
 * first time any code reaches it, and is the same object every time after.
 */
import { parseAst } from "rolldown/parseAst";

type Node = { readonly type: string; readonly start: number; readonly end: number } & Record<
  string,
  unknown
>;

const isNode = (v: unknown): v is Node =>
  v !== null && typeof v === "object" && typeof (v as Node).type === "string";

const stripCasts = (n: Node): Node => {
  while (
    n.type === "TSAsExpression" ||
    n.type === "TSSatisfiesExpression" ||
    n.type === "ParenthesizedExpression"
  )
    n = n.expression as Node;
  return n;
};

export const tableSchemas = (
  code: string,
  filename = "generated.ts",
): { code: string; tabled: number } => {
  const program = parseAst(code, { sourceType: "module", lang: "ts" }, filename);
  const body = program.body as unknown as Node[];

  type Entry =
    | { kind: "at"; chunk: number; j: number; cast?: string }
    | { kind: "alias"; to: string; cast?: string }
    | { kind: "leaf"; text: string; cast?: string };
  const entries = new Map<string, Entry>();
  const removals: Array<[number, number]> = [];
  const declStart = new Map<string, number>();
  let chunkSize = 0;

  for (const st of body) {
    if (st.type !== "VariableDeclaration" || (st.declarations as Node[]).length !== 1) continue;
    const d = (st.declarations as Node[])[0]!;
    const id = d.id as Node;
    if (id.type !== "Identifier" || !isNode(d.init)) continue;
    const name = id.name as string;
    if (name.startsWith("__")) continue;
    const init = stripCasts(d.init);
    let entry: Entry | undefined;
    if (
      init.type === "CallExpression" &&
      code.slice((init.callee as Node).start, (init.callee as Node).end) === "__L.at"
    ) {
      const [c, j] = init.arguments as Node[];
      const m = /^__c(\d+)$/.exec(code.slice(c!.start, c!.end));
      if (m && j!.type === "Literal")
        entry = { kind: "at", chunk: Number(m[1]), j: j!.value as number };
    } else if (init.type === "Identifier") {
      entry = { kind: "alias", to: init.name as string };
    } else if (
      init.type === "MemberExpression" &&
      !init.computed &&
      (init.object as Node).type === "Identifier" &&
      (init.object as Node).name === "S"
    ) {
      entry = { kind: "leaf", text: code.slice(init.start, init.end) };
    }
    if (!entry) continue;
    // `as any as S.Schema<X>`: the type operation configs infer from.
    const cast = /\bas (?:any as )?(S\.(?:Schema|Codec)<[\s\S]*>)\s*$/.exec(
      code.slice(init.end, (d.init as Node).end),
    )?.[1];
    if (cast) entry.cast = cast;
    entries.set(name, entry);
    declStart.set(name, st.start);
    removals.push([st.start, st.end]);
  }
  // Names also bound inside functions (params, locals, destructuring) stay consts: no scope analysis needed.
  const nested = new Set<string>();
  const collectBindings = (n: unknown): void => {
    if (Array.isArray(n)) return n.forEach(collectBindings);
    if (!isNode(n)) return;
    if (n.type === "Identifier") nested.add(n.name as string);
    else if (n.type === "ObjectPattern")
      for (const p of n.properties as Node[])
        collectBindings(p.type === "RestElement" ? p.argument : p.value);
    else if (n.type === "ArrayPattern") for (const e of n.elements as Node[]) collectBindings(e);
    else if (n.type === "AssignmentPattern") collectBindings(n.left);
    else if (n.type === "RestElement") collectBindings(n.argument);
  };
  const scan = (n: unknown, inFunction: boolean): void => {
    if (Array.isArray(n)) return n.forEach((c) => scan(c, inFunction));
    if (!isNode(n)) return;
    const fn =
      n.type === "ArrowFunctionExpression" ||
      n.type === "FunctionExpression" ||
      n.type === "FunctionDeclaration";
    if (fn) for (const p of n.params as Node[]) collectBindings(p);
    if (inFunction && n.type === "VariableDeclarator") collectBindings(n.id);
    if (
      inFunction &&
      (n.type === "FunctionDeclaration" || n.type === "ClassDeclaration") &&
      isNode(n.id)
    )
      collectBindings(n.id);
    if (n.type === "CatchClause" && n.param) collectBindings(n.param);
    for (const [k, v] of Object.entries(n))
      if (k !== "type" && v !== null && typeof v === "object") scan(v, inFunction || fn);
  };
  scan(body, false);
  // Names exported by an `export { ... }` list must stay bindings.
  for (const st of body)
    if (st.type === "ExportNamedDeclaration" && !st.declaration)
      for (const sp of st.specifiers as Node[]) nested.add((sp.local as Node).name as string);
  for (const name of nested) entries.delete(name);
  // Aliases must end at a table entry or a leaf; anything else stays a const.
  const resolve = (name: string, seen = new Set<string>()): Entry | undefined => {
    const e = entries.get(name);
    if (!e || e.kind !== "alias") return e;
    if (seen.has(name)) return undefined;
    seen.add(name);
    return resolve(e.to, seen);
  };
  // Repeat: deleting one entry can strand aliases that pointed at it.
  for (let changed = true; changed;) {
    changed = false;
    for (const [name, e] of [...entries])
      if (e.kind === "alias" && !resolve(name)) {
        entries.delete(name);
        changed = true;
      }
  }
  const removed = new Set(entries.keys());
  removals.splice(
    0,
    removals.length,
    ...removals.filter(([start]) => [...removed].some((n) => declStart.get(n) === start)),
  );
  if (![...entries.values()].some((e) => e.kind === "at")) return { code, tabled: 0 };
  for (const e of entries.values()) if (e.kind === "at") chunkSize = Math.max(chunkSize, e.j + 1);
  const shift = Math.ceil(Math.log2(Math.max(2, chunkSize)));

  const replacement = (name: string): string | undefined => {
    const e = resolve(name);
    if (!e) return undefined;
    if (e.kind === "leaf") return e.text;
    // The builder is named at the call site, so a bundler keeps only the builders a program reaches.
    if (e.kind === "at") return `__S(${(e.chunk << shift) | e.j}, __c${e.chunk}, ${e.j})`;
    return undefined;
  };

  // Value references (not keys, member names, type positions or the removed declarations).
  const edits: Array<[number, number, string]> = [];
  const removedIds = new Set<number>();
  const visit = (node: unknown, parent?: Node, key?: string): void => {
    if (Array.isArray(node)) {
      for (const c of node) visit(c, parent, key);
      return;
    }
    if (!isNode(node)) return;
    if (
      node.type.startsWith("TS") &&
      node.type !== "TSAsExpression" &&
      node.type !== "TSSatisfiesExpression" &&
      node.type !== "TSNonNullExpression"
    )
      return;
    if (node.type === "Identifier") {
      const isKey =
        parent?.type === "Property" && key === "key" && !parent.computed && !parent.shorthand;
      const isMember =
        parent?.type === "MemberExpression" && key === "property" && !parent.computed;
      const isDecl = parent?.type === "VariableDeclarator" && key === "id";
      if (!isKey && !isMember && !isDecl && entries.has(node.name as string)) {
        let r = replacement(node.name as string);
        const cast = entries.get(node.name as string)?.cast ?? resolve(node.name as string)?.cast;
        if (
          r &&
          cast &&
          parent?.type === "Property" &&
          key === "value" &&
          isNode(parent.key) &&
          ["input", "output"].includes(parent.key.name as string)
        )
          r = `(${r} as any as ${cast})`;
        if (r) {
          const shorthand = parent?.type === "Property" && parent.shorthand;
          edits.push([node.start, node.end, shorthand ? `${node.name}: ${r}` : r]);
        }
      }
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (
        k === "type" ||
        k === "start" ||
        k === "end" ||
        k === "typeAnnotation" ||
        k === "typeArguments" ||
        k === "typeParameters" ||
        k === "returnType"
      )
        continue;
      if (v !== null && typeof v === "object") visit(v, node, k);
    }
  };
  for (const st of body) {
    // Import and export lists name bindings of other modules or re-export; not schema references.
    if (st.type === "ImportDeclaration" || st.type === "ExportAllDeclaration") continue;
    if (st.type === "ExportNamedDeclaration" && !st.declaration) continue;
    const isRemoved = removals.some(([s]) => s === st.start);
    if (isRemoved) {
      removedIds.add(st.start);
      continue;
    }
    visit(st);
  }

  const all: Array<[number, number, string]> = [
    ...edits,
    ...removals.map(([s, e]) => [s, e, ""] as [number, number, string]),
  ];
  all.sort((a, b) => b[0] - a[0]);
  let out = code;
  for (const [s, e, t] of all) {
    let end = e;
    if (t === "") while (out[end] === "\n") end++;
    out = out.slice(0, s) + t + out.slice(end);
  }
  // The table array goes right after the imports: error classes reach schemas while the module evaluates.
  const lastImport = [...body].reverse().find((st) => st.type === "ImportDeclaration");
  const importEnd = lastImport ? lastImport.end : 0;
  // Edits only shift text after their position; the imports precede every edit.
  out = `${out.slice(0, importEnd)}\n// Schema table, filled on first reach (see __S at the end).\nconst __s: any[] = [];${out.slice(importEnd)}`;
  out +=
    "\n// Schema table: entry i is schema j of builder f, made on first reach.\n" +
    `function __S(i: number, f: (j: number) => unknown, j: number): any {\n  return (__s[i] ??= __L.at(f, j));\n}\n`;
  return { code: out, tabled: entries.size };
};
