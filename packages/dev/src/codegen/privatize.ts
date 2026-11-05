/**
 * Make schema consts module-private and drop the ones nothing uses
 * (dev-time only).
 *
 * Every `export` costs memory in each process that imports the module: V8
 * keeps a binding cell, a namespace accessor and the export's name string
 * for it, about 280 bytes each. Stripe's service module exported 14,224
 * names; exporting only its operations and errors cut its import heap from
 * 6.6 MB to 2.7 MB. The types (`export interface` / `export type`) stay
 * exported -- they cost nothing at runtime -- and an operation's schemas
 * stay reachable as `op.input` / `op.output`.
 *
 * After un-exporting, a schema const that no operation, error class or
 * other remaining code references is deleted, repeated to a fixpoint.
 */
import { parseAst } from "rolldown/parseAst";
import { applyEdits, type Edit } from "./edits.ts";

type Node = { readonly type: string; readonly start: number; readonly end: number } & Record<
  string,
  unknown
>;

const isNode = (value: unknown): value is Node =>
  value !== null && typeof value === "object" && typeof (value as Node).type === "string";

/** Value-position identifier names under `node` (type annotations, keys and member names excluded). */
export const valueRefs = (
  node: unknown,
  out: Set<string>,
  parent?: Node,
  parentKey?: string,
): Set<string> => {
  if (Array.isArray(node)) {
    for (const child of node) valueRefs(child, out, parent, parentKey);
    return out;
  }
  if (!isNode(node)) return out;
  if (node.type.startsWith("TS")) {
    // Only the expression side of a cast or assertion is a value.
    if (
      node.type === "TSAsExpression" ||
      node.type === "TSSatisfiesExpression" ||
      node.type === "TSNonNullExpression"
    )
      valueRefs(node.expression, out, node, "expression");
    return out;
  }
  if (node.type === "Identifier") {
    const isKey =
      parent?.type === "Property" && parentKey === "key" && !parent.computed && !parent.shorthand;
    const isMember =
      parent?.type === "MemberExpression" && parentKey === "property" && !parent.computed;
    if (!isKey && !isMember) out.add(node.name as string);
    return out;
  }
  for (const [key, value] of Object.entries(node)) {
    if (
      key === "type" ||
      key === "start" ||
      key === "end" ||
      key === "typeAnnotation" ||
      key === "typeArguments" ||
      key === "typeParameters" ||
      key === "returnType"
    )
      continue;
    if (value !== null && typeof value === "object") valueRefs(value, out, node, key);
  }
  return out;
};

const isOperation = (init: Node, code: string) =>
  /\bAPI\.make(Paginated)?\(/.test(code.slice(init.start, init.end));

export const privatizeSchemas = (
  code: string,
  filename = "generated.ts",
): { code: string; privatized: number; removed: number } => {
  const program = parseAst(code, { sourceType: "module", lang: "ts" }, filename);
  interface Decl {
    name: string;
    stmt: Node;
    exportStart: number;
    refs: Set<string>;
  }
  const schemaDecls = new Map<string, Decl>();
  const roots = new Set<string>();

  // Operation names, so an operation alias (`export const listObjects =
  // listBucketObjects`) stays an exported operation and is not taken for a schema.
  const operations = new Set<string>();
  for (const raw of program.body as unknown as Node[]) {
    if (raw.type !== "ExportNamedDeclaration" || !isNode(raw.declaration)) continue;
    const stmt = raw.declaration as Node;
    if (stmt.type !== "VariableDeclaration") continue;
    for (const d of stmt.declarations as Node[]) {
      const id = d.id as Node;
      if (id.type === "Identifier" && isNode(d.init) && isOperation(d.init, code))
        operations.add(id.name as string);
    }
  }
  const isOperationAlias = (init: Node) =>
    init.type === "Identifier" && operations.has(init.name as string);

  for (const raw of program.body as unknown as Node[]) {
    const exported = raw.type === "ExportNamedDeclaration" && isNode(raw.declaration);
    const stmt = exported ? (raw.declaration as Node) : raw;
    if (
      exported &&
      stmt.type === "VariableDeclaration" &&
      (stmt.declarations as Node[]).length === 1
    ) {
      const d = (stmt.declarations as Node[])[0]!;
      const id = d.id as Node;
      if (
        id.type === "Identifier" &&
        isNode(d.init) &&
        !isOperation(d.init, code) &&
        !isOperationAlias(d.init)
      ) {
        schemaDecls.set(id.name as string, {
          name: id.name as string,
          stmt: raw,
          exportStart: raw.start,
          refs: valueRefs(d.init, new Set()),
        });
        continue;
      }
    }
    // Everything else (operations, classes, imports, plain statements) keeps what it references alive.
    if (
      stmt.type === "ImportDeclaration" ||
      stmt.type === "TSInterfaceDeclaration" ||
      stmt.type === "TSTypeAliasDeclaration"
    )
      continue;
    if (raw.type === "ExportNamedDeclaration" && !isNode(raw.declaration)) {
      // `export { A, B }` / `export type { ... }`
      if (raw.exportKind !== "type")
        for (const s of raw.specifiers as Node[])
          roots.add(((s.local as Node).name as string) ?? "");
      continue;
    }
    for (const r of valueRefs(stmt, new Set())) roots.add(r);
  }

  // Reachability from the roots through schema references.
  const live = new Set<string>();
  const stack = [...roots].filter((n) => schemaDecls.has(n));
  while (stack.length) {
    const n = stack.pop()!;
    if (live.has(n)) continue;
    live.add(n);
    for (const r of schemaDecls.get(n)!.refs) if (schemaDecls.has(r) && !live.has(r)) stack.push(r);
  }

  // Drop dead consts (with their leading doc comment), un-export live ones.
  const edits: Edit[] = [];
  const exportKeyword = /export\s+/y;
  let removed = 0;
  for (const d of schemaDecls.values()) {
    if (live.has(d.name)) {
      exportKeyword.lastIndex = d.stmt.start;
      if (exportKeyword.test(code)) edits.push([d.stmt.start, exportKeyword.lastIndex, ""]);
    } else {
      let end = d.stmt.end;
      while (code[end] === "\n") end++;
      edits.push([docCommentStart(code, d.stmt.start) ?? d.stmt.start, end, ""]);
      removed++;
    }
  }
  return { code: applyEdits(code, edits), privatized: live.size, removed };
};

/**
 * Start of the doc comment that ends right before `at` (only whitespace
 * between), or undefined. Same match as
 * `/\/\*\*(?:(?!\*\/)[\s\S])*\*\/\s*$/.exec(code.slice(0, at))?.index`,
 * found by looking back from `at` instead of scanning the whole prefix: the
 * comment opens at the first `/**` that no earlier `*\/` closes.
 */
export const docCommentStart = (code: string, at: number): number | undefined => {
  let end = at;
  while (end > 0 && /\s/.test(code[end - 1]!)) end--;
  if (end < 2 || code[end - 2] !== "*" || code[end - 1] !== "/") return undefined;
  const close = end - 2;
  // The comment body may not contain `*/`, so the last one before `close` bounds the search.
  const previous = close > 0 ? code.lastIndexOf("*/", close - 1) : -1;
  const from = Math.max(0, previous - 2);
  const open = code.slice(from, close).indexOf("/**");
  return open === -1 ? undefined : from + open;
};

/**
 * `import * as X` whose namespace is used only in type positions becomes
 * `import type * as X`. The generator's `oxlint --fix` otherwise deletes it
 * as unused once the schema consts that used it as a value are gone, and the
 * types that still name it stop compiling.
 */
export const typeOnlyNamespaceImports = (code: string, filename = "generated.ts"): string => {
  const program = parseAst(code, { sourceType: "module", lang: "ts" }, filename);
  const body = program.body as unknown as Node[];
  const used = new Set<string>();
  for (const st of body) if (st.type !== "ImportDeclaration") valueRefs(st, used);
  const edits: Edit[] = [];
  for (const st of body) {
    if (st.type !== "ImportDeclaration" || st.importKind === "type") continue;
    const specs = st.specifiers as Node[];
    if (specs.length !== 1 || specs[0]!.type !== "ImportNamespaceSpecifier") continue;
    const name = (specs[0]!.local as Node).name as string;
    if (used.has(name)) continue;
    const text = code.slice(st.start, st.end).replace(/^import \*/, "import type *");
    edits.push([st.start, st.end, text]);
  }
  return applyEdits(code, edits);
};
