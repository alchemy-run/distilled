/**
 * Move module-private schema initializers into chunked builder functions
 * (dev-time only; runtime helper: `@distilled.cloud/core/chunks`).
 *
 *   const Customer = S.suspend(() => ...).annotate({ identifier: "Customer" }) as any as S.Schema<Customer>;
 * becomes
 *   const Customer = /*@__PURE__*\/ __L.at(__c12, 3) as any as S.Schema<Customer>;
 *   ...
 *   function __c12(j: number): any { switch (j) { ... case 3: return S.suspend(() => ...).annotate({ identifier: "Customer" }); } }
 *
 * Builders are function declarations at the end of the module (hoisted, so
 * the consts can name them at import); their bodies run only on first use,
 * after the module has finished evaluating.
 */
import { parseAst } from "rolldown/parseAst";
import { valueRefs } from "./privatize.ts";

type Node = { readonly type: string; readonly start: number; readonly end: number } & Record<
  string,
  unknown
>;

/** Schemas per builder function: smaller chunks compile less on first use. */
export const CHUNK_SIZE = 32;

const stripCasts = (n: Node): Node => {
  while (
    n.type === "TSAsExpression" ||
    n.type === "TSSatisfiesExpression" ||
    n.type === "ParenthesizedExpression"
  )
    n = n.expression as Node;
  return n;
};

export const chunkSchemas = (
  code: string,
  filename = "generated.ts",
  chunkSize = CHUNK_SIZE,
): { code: string; chunked: number } => {
  const program = parseAst(code, { sourceType: "module", lang: "ts" }, filename);
  const body = program.body as unknown as Node[];
  const items: Array<{ start: number; end: number; text: string; name: string; key: string }> = [];
  for (const st of body) {
    // Only module-private consts: exports keep their own initializer.
    if (st.type !== "VariableDeclaration" || (st.declarations as Node[]).length !== 1) continue;
    const d = (st.declarations as Node[])[0]!;
    if (!d.init) continue;
    const inner = stripCasts(d.init as Node);
    if (inner.type !== "CallExpression") continue;
    const text = code.slice(inner.start, inner.end);
    if (/\bAPI\.make/.test(text) || !/\bS\./.test(text)) continue;
    items.push({
      start: inner.start,
      end: inner.end,
      text,
      name: ((d.id as Node).name as string) ?? "",
      key: "",
    });
  }
  if (!items.length) return { code, chunked: 0 };

  // Group schemas only with schemas reached by exactly the same roots
  // (operations and error classes): a bundle that keeps one builder then
  // needs every schema in it, so nothing unused comes along.
  const refsOf = new Map<string, Set<string>>();
  const roots: Array<Set<string>> = [];
  for (const st of body) {
    const decl =
      st.type === "ExportNamedDeclaration" && st.declaration ? (st.declaration as Node) : st;
    if (decl.type === "VariableDeclaration") {
      for (const d of decl.declarations as Node[]) {
        const name = (d.id as Node).name as string | undefined;
        if (!name || !d.init) continue;
        const refs = valueRefs(d.init, new Set());
        refsOf.set(name, refs);
        const init = d.init as Node;
        if (/\bAPI\.make/.test(code.slice(init.start, init.end))) roots.push(refs);
      }
    } else if (decl.type === "ClassDeclaration" && decl.id) {
      const refs = valueRefs(decl.superClass, new Set());
      refsOf.set((decl.id as Node).name as string, refs);
      roots.push(refs);
    }
  }
  const reachedBy = new Map<string, number[]>();
  roots.forEach((rootRefs, r) => {
    const seen = new Set<string>();
    const stack = [...rootRefs];
    while (stack.length) {
      const n = stack.pop()!;
      if (seen.has(n) || !refsOf.has(n)) continue;
      seen.add(n);
      let list = reachedBy.get(n);
      if (!list) reachedBy.set(n, (list = []));
      list.push(r);
      for (const x of refsOf.get(n)!) stack.push(x);
    }
  });
  for (const it of items) it.key = (reachedBy.get(it.name) ?? []).join(",");
  const ordered = items
    .map((it, i) => [it, i] as const)
    .sort((a, b) => (a[0].key < b[0].key ? -1 : a[0].key > b[0].key ? 1 : a[1] - b[1]));
  const slot = new Map<(typeof items)[number], [number, number]>();
  let chunk = -1;
  let used = chunkSize;
  let lastKey: string | undefined;
  for (const [it] of ordered) {
    if (used >= chunkSize || it.key !== lastKey) {
      chunk++;
      used = 0;
      lastKey = it.key;
    }
    slot.set(it, [chunk, used++]);
  }

  const cases: string[][] = [];
  for (const it of items) {
    const [c, j] = slot.get(it)!;
    (cases[c] ??= [])[j] = `case ${j}: return ${it.text};`;
  }

  let out = code;
  for (let i = items.length - 1; i >= 0; i--) {
    const it = items[i]!;
    // The PURE marker in front of the old initializer, if any, now marks the `at` call.
    const marked = /\/\*[@#]__PURE__\*\/\s*$/.test(out.slice(Math.max(0, it.start - 20), it.start));
    const [c, j] = slot.get(it)!;
    out = `${out.slice(0, it.start)}${marked ? "" : "/*@__PURE__*/ "}__L.at(__c${c}, ${j})${out.slice(it.end)}`;
  }
  const lastImport = [...body].reverse().find((s) => s.type === "ImportDeclaration");
  const at = lastImport ? lastImport.end : 0;
  // Modules on lite schemas take `at` from schema-lite (lazy lite nodes).
  const helper = code.includes('"@distilled.cloud/core/schema-lite"')
    ? "@distilled.cloud/core/schema-lite"
    : "@distilled.cloud/core/chunks";
  out = `${out.slice(0, at)}\nimport * as __L from "${helper}";${out.slice(at)}`;
  out +=
    "\n// Schema builders: each runs one schema initializer, on that schema's first use.\n" +
    cases
      .map(
        (c, k) =>
          `function __c${k}(j: number): any {\n  switch (j) {\n${c.map((x) => `    ${x}`).join("\n")}\n  }\n}`,
      )
      .join("\n");
  return { code: out, chunked: items.length };
};
