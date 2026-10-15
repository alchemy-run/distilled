/**
 * Deep `/*@__PURE__*​/` annotation for generated modules (dev-time only).
 *
 * A PURE marker lets a bundler drop a call whose result is unused — but the
 * call's ARGUMENTS are still evaluated, and an unannotated call among them
 * counts as a side effect. So
 *
 *   export const TagList = /*@__PURE__*​/ S.Array(Tag.pipe(T.XmlName("item")));
 *
 * keeps `Tag` (and everything `Tag` references) alive in every bundle that
 * imports the module, even when nothing uses `TagList`. In EC2 that chain
 * retained 1,695 schemas — 62 KB gzip — for a program calling one
 * operation.
 *
 * {@link annotateNestedCalls} marks every call and `new` inside a top-level
 * initializer (and class `extends` clause), skipping function bodies: code
 * in a thunk only runs when called, so it never pins anything at import.
 * One marker per start position covers a whole method chain
 * (`X.pipe(a).annotate(b)`).
 */
import { parseAst } from "rolldown/parseAst";

const MARKER = "/*@__PURE__*/ ";
const ALREADY_MARKED = /\/\*\s*[@#]__PURE__\s*\*\/\s*$/;

type Node = { readonly type: string; readonly start: number; readonly end: number } & Record<
  string,
  unknown
>;

const isNode = (value: unknown): value is Node =>
  value !== null && typeof value === "object" && typeof (value as Node).type === "string";

/** Call/new positions in an initializer expression, outside function bodies. */
const collectCalls = (node: unknown, out: Set<number>): void => {
  if (Array.isArray(node)) {
    for (const child of node) collectCalls(child, out);
    return;
  }
  if (!isNode(node)) return;
  switch (node.type) {
    case "ArrowFunctionExpression":
    case "FunctionExpression":
    case "ClassBody":
      return;
    case "TSAsExpression":
    case "TSSatisfiesExpression":
    case "TSNonNullExpression":
      collectCalls(node.expression, out);
      return;
    case "CallExpression": {
      const callee = node.callee as Node;
      // An IIFE runs its body at import; leave it alone.
      if (callee.type !== "ArrowFunctionExpression" && callee.type !== "FunctionExpression") {
        out.add(callee.start);
      }
      break;
    }
    case "NewExpression":
      out.add(node.start);
      break;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === "type" || key === "start" || key === "end") continue;
    if (value !== null && typeof value === "object") collectCalls(value, out);
  }
};

/**
 * Returns `code` with a PURE marker before every unmarked call in a
 * top-level `const`/`let`/`var` initializer or class `extends` clause.
 */
export const annotateNestedCalls = (code: string, filename = "generated.ts"): string => {
  const program = parseAst(code, { sourceType: "module", lang: "ts" }, filename);
  const positions = new Set<number>();
  for (let statement of program.body as unknown as Node[]) {
    if (statement.type === "ExportNamedDeclaration" && isNode(statement.declaration)) {
      statement = statement.declaration;
    }
    if (statement.type === "VariableDeclaration") {
      for (const declaration of statement.declarations as Node[]) {
        collectCalls(declaration.init, positions);
      }
    } else if (statement.type === "ClassDeclaration") {
      collectCalls(statement.superClass, positions);
    }
  }
  let out = code;
  for (const position of [...positions].sort((a, b) => b - a)) {
    if (ALREADY_MARKED.test(out.slice(Math.max(0, position - 32), position))) continue;
    out = `${out.slice(0, position)}${MARKER}${out.slice(position)}`;
  }
  return out;
};
