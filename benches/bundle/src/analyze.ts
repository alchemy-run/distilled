/**
 * Heuristic breakdown of what survives tree-shaking inside one rendered
 * module (`OutputChunk.modules[id].code`, which rolldown renders after
 * tree-shaking and before minification).
 *
 * Top-level bindings are located by line shape. With
 * `strictExecutionOrder: true` rolldown hoists `var a, b, …;` and emits
 * `\t\tName = …` assignments inside an `init_*` wrapper; without it the
 * lines are `const Name = …`. Both are matched. A binding is "unreferenced"
 * when its name never appears in the module outside its own declaration —
 * nor in any other module's rendered code — i.e. tree-shaking kept it
 * only because its initializer was not proven side-effect free.
 */
export interface RetainedDecl {
  readonly name: string;
  readonly bytes: number;
  readonly kind: DeclKind;
  readonly unreferenced: boolean;
  /** First ~100 chars of the initializer, for the report. */
  readonly head: string;
}

export type DeclKind =
  | "endpoint-rules"
  | "error-class"
  | "operation"
  | "schema"
  | "other";

export interface ModuleAnalysis {
  readonly id: string;
  readonly renderedBytes: number;
  readonly decls: number;
  readonly unreferenced: number;
  readonly bytesByKind: Record<DeclKind, number>;
  readonly countByKind: Record<DeclKind, number>;
  readonly unreferencedByKind: Record<DeclKind, number>;
  readonly unreferencedBytesByKind: Record<DeclKind, number>;
  readonly unreferencedBytes: number;
  /** Largest retained declarations (any kind). */
  readonly largest: RetainedDecl[];
  /** Largest unreferenced declarations (pure tree-shake misses). */
  readonly largestUnreferenced: RetainedDecl[];
}

const DECL_RE =
  /^(\s*)(?:export\s+)?(?:(?:const|let|var)\s+)?([A-Za-z_$][\w$]*)\s*=\s/;

const classify = (name: string, head: string): DeclKind => {
  if (/\bEndpointResolver\(/.test(head) || name === "rules")
    return "endpoint-rules";
  if (/^class\s|=\s*class\s/.test(head) || /\bclass extends\b/.test(head))
    return "error-class";
  if (/\b(?:make|makePaginated)\(/.test(head)) return "operation";
  if (
    /\b(?:suspend|Struct|Array\$?\d*|Union|String\$?\d*|Number\$?\d*|Boolean\$?\d*|Literals?|Record|optional|EventStream|Date\$?\d*|Blob\$?\d*|Unknown|Any)\b/.test(
      head,
    )
  )
    return "schema";
  return "other";
};

const zero = (): Record<DeclKind, number> => ({
  "endpoint-rules": 0,
  "error-class": 0,
  operation: 0,
  schema: 0,
  other: 0,
});

export function analyzeModule(
  id: string,
  code: string,
  /** Rendered code of every other module in the chunk (cross-module refs). */
  others = "",
  top = 8,
): ModuleAnalysis {
  const lines = code.split("\n");
  // Module-level bindings all sit at one indentation depth: `const X =` at
  // column 0, or `\t\tX =` inside rolldown's `init_*` wrapper. Nested
  // bindings (e.g. inside the endpoint resolver function) are deeper and
  // must not be counted as separate declarations.
  let depth: string | null = null;
  const hoisted = /^var\s/m.test(code);
  for (const line of lines) {
    const m = DECL_RE.exec(line);
    if (m && (hoisted ? m[1]!.length > 0 : m[1]!.length === 0)) {
      depth = m[1]!;
      break;
    }
  }
  const starts: Array<{ line: number; name: string }> = [];
  for (let i = 0; i < lines.length; i++) {
    const m = DECL_RE.exec(lines[i]!);
    if (m && m[1] === depth) starts.push({ line: i, name: m[2]! });
  }
  const segments = starts.map((s, i) => {
    const end = i + 1 < starts.length ? starts[i + 1]!.line : lines.length;
    const text = lines.slice(s.line, end).join("\n");
    return { name: s.name, text };
  });

  const decls: RetainedDecl[] = [];
  for (const seg of segments) {
    const re = new RegExp(
      `(?<![\\w$])${seg.name.replace(/\$/g, "\\$")}(?![\\w$])`,
      "g",
    );
    const total = code.match(re)?.length ?? 0;
    // Hits inside its own segment + 1 for the hoisted `var …` list (if any).
    const own = (seg.text.match(re)?.length ?? 0) + (hoisted ? 1 : 0);
    const head = seg.text
      .replace(/^\s*(?:export\s+)?(?:(?:const|let|var)\s+)?[\w$]+\s*=\s*/, "")
      .slice(0, 100)
      .replace(/\s+/g, " ");
    decls.push({
      name: seg.name,
      bytes: Buffer.byteLength(seg.text) + 1,
      kind: classify(seg.name, head),
      unreferenced: total <= own && !re.test(others),
      head,
    });
  }

  const bytesByKind = zero();
  const countByKind = zero();
  const unreferencedByKind = zero();
  const unreferencedBytesByKind = zero();
  for (const d of decls) {
    bytesByKind[d.kind] += d.bytes;
    countByKind[d.kind] += 1;
    if (d.unreferenced) {
      unreferencedByKind[d.kind] += 1;
      unreferencedBytesByKind[d.kind] += d.bytes;
    }
  }
  const bySize = [...decls].sort((a, b) => b.bytes - a.bytes);
  return {
    id,
    renderedBytes: Buffer.byteLength(code),
    decls: decls.length,
    unreferenced: decls.filter((d) => d.unreferenced).length,
    bytesByKind,
    countByKind,
    unreferencedByKind,
    unreferencedBytesByKind,
    unreferencedBytes: decls.reduce(
      (n, d) => n + (d.unreferenced ? d.bytes : 0),
      0,
    ),
    largest: bySize.slice(0, top),
    largestUnreferenced: bySize.filter((d) => d.unreferenced).slice(0, top),
  };
}
