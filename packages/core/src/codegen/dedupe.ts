/**
 * Merge structurally identical schema consts in a generated module
 * (dev-time only).
 *
 * Specs repeat shapes under different names: Stripe has hundreds of
 * `{ object: string; url: string }`-style structs, AWS has dozens of empty
 * `*Response` shapes and identical lists. Each copy is its own schema at
 * runtime. This pass keeps the first schema of every structural class and
 * turns the others into aliases (`export const B = A as any as S.Schema<B>;`),
 * so the exports and types are unchanged and only one schema is built.
 *
 * Two consts are equal when their initializers are the same text after
 * (1) dropping their own name from `identifier: "<name>"` annotations and
 * casts, and (2) replacing every reference to another schema const, and every
 * `identifier: "<other>"` string, with that const's current class. This is
 * repeated until the classes stop changing (bottom-up merging; members of a
 * reference cycle merge only when they were already textually identical).
 *
 * Schemas passed directly as an operation's `input:` keep their own object:
 * AWS query protocols derive the action name from the input identifier.
 * Modules on AWS XML / query protocols are left alone entirely: those
 * protocols use a shape's identifier as its XML element name, so a merged
 * shape would change the wire format.
 */
const IDENTIFIER_ON_WIRE =
  /^const proto = (?:\/\*[@#]__PURE__\*\/ )?T\.AwsProtocols(?:RestXml|AwsQuery|Ec2Query)\(/m;
import { parseAst } from "rolldown/parseAst";

type Node = { readonly type: string; readonly start: number; readonly end: number } & Record<
  string,
  unknown
>;

const isNode = (value: unknown): value is Node =>
  value !== null && typeof value === "object" && typeof (value as Node).type === "string";

interface Candidate {
  readonly name: string;
  /** Initializer span. */
  readonly start: number;
  readonly end: number;
  /** Positions [start, end, name] of identifier references to other consts, in the initializer. */
  readonly refs: Array<readonly [number, number, string]>;
  /** Positions of `"<name>"` string literals under an `identifier` key. */
  readonly idStrings: Array<readonly [number, number, string]>;
}

const SCHEMA_CALL = /\bS\.(suspend|Struct|Array|Record|Union|Tuple|Literals|NullOr|optional)\(/;

export const dedupeSchemas = (
  code: string,
  filename = "generated.ts",
): { code: string; merged: number } => {
  if (IDENTIFIER_ON_WIRE.test(code)) return { code, merged: 0 };
  const program = parseAst(code, { sourceType: "module", lang: "ts" }, filename);
  const decls: Array<{ name: string; init: Node }> = [];
  // `export const Status = S.String;`: enum aliases and other plain leaf
  // schemas. References to them compare by what they alias, so two structs
  // that differ only in which string enum a field names still merge.
  const leafAliases = new Map<string, string>();
  const operationSchemas = new Set<string>();

  for (let statement of program.body as unknown as Node[]) {
    if (statement.type !== "ExportNamedDeclaration" || !isNode(statement.declaration)) continue;
    statement = statement.declaration;
    if (statement.type !== "VariableDeclaration") continue;
    for (const d of statement.declarations as Node[]) {
      const id = d.id as Node;
      if (id.type !== "Identifier" || !isNode(d.init)) continue;
      const text = code.slice(d.init.start, d.init.end);
      if (/\bAPI\.make(Paginated)?\(/.test(text)) {
        for (const m of text.matchAll(/\binput: (\w+)\b/g)) operationSchemas.add(m[1]!);
        continue;
      }
      if (SCHEMA_CALL.test(text)) decls.push({ name: id.name as string, init: d.init });
      else if (/^S\.[A-Z]\w*$/.test(text)) leafAliases.set(id.name as string, text);
    }
  }

  const names = new Set([...decls.map((d) => d.name), ...leafAliases.keys()]);
  const candidates: Candidate[] = decls
    .filter((d) => !operationSchemas.has(d.name))
    .map(({ name, init }) => {
      const refs: Array<readonly [number, number, string]> = [];
      const idStrings: Array<readonly [number, number, string]> = [];
      const visit = (node: unknown, parentKey?: string, parent?: Node): void => {
        if (Array.isArray(node)) {
          for (const child of node) visit(child, parentKey, parent);
          return;
        }
        if (!isNode(node)) return;
        if (node.type === "Identifier" && names.has(node.name as string)) {
          // Skip object keys and member property names: they are not references.
          const isKey =
            (parent?.type === "Property" && parentKey === "key" && !parent.computed) ||
            (parent?.type === "MemberExpression" && parentKey === "property" && !parent.computed);
          if (!isKey) refs.push([node.start, node.end, node.name as string]);
        }
        if (
          node.type === "Property" &&
          isNode(node.key) &&
          ((node.key.type === "Identifier" && node.key.name === "identifier") ||
            (node.key.type === "Literal" && node.key.value === "identifier")) &&
          isNode(node.value) &&
          node.value.type === "Literal" &&
          typeof node.value.value === "string"
        ) {
          idStrings.push([node.value.start, node.value.end, node.value.value]);
        }
        for (const [key, value] of Object.entries(node)) {
          if (key === "type" || key === "start" || key === "end") continue;
          if (value !== null && typeof value === "object") visit(value, key, node);
        }
      };
      visit(init);
      return { name, start: init.start, end: init.end, refs, idStrings };
    });

  // Class of every schema const; operation schemas are their own class.
  const cls = new Map<string, string>([...names].map((n) => [n, leafAliases.get(n) ?? n]));
  const keyOf = (c: Candidate): string => {
    const edits = [
      ...c.refs.map(([s, e, n]) => [s, e, n === c.name ? "@self" : `@${cls.get(n) ?? n}`] as const),
      ...c.idStrings.map(
        ([s, e, n]) => [s, e, n === c.name ? `"@self"` : `"@${cls.get(n) ?? n}"`] as const,
      ),
    ].sort((a, b) => a[0] - b[0]);
    let out = "";
    let pos = c.start;
    for (const [s, e, text] of edits) {
      if (s < pos) continue;
      out += code.slice(pos, s) + text;
      pos = e;
    }
    return out + code.slice(pos, c.end);
  };

  for (let round = 0; round < 50; round++) {
    const first = new Map<string, string>();
    let changed = false;
    for (const c of candidates) {
      const key = keyOf(c);
      const canon = first.get(key);
      if (canon === undefined) first.set(key, c.name);
      const next = canon ?? c.name;
      if (cls.get(c.name) !== next) {
        cls.set(c.name, next);
        changed = true;
      }
    }
    if (!changed) break;
  }

  // Rewrite duplicates as aliases (back to front so offsets stay valid).
  const aliases = candidates
    .filter((c) => cls.get(c.name) !== c.name)
    .sort((a, b) => b.start - a.start);
  let out = code;
  for (const c of aliases) {
    // Follow the class to a const that is still a real schema.
    let target = cls.get(c.name)!;
    while (cls.get(target) !== target) target = cls.get(target)!;
    out = `${out.slice(0, c.start)}${target} as any as S.Schema<${c.name}>${out.slice(c.end)}`;
  }
  // `X as any as S.Schema<X>` with a leftover trailing cast: `A as any as S.Schema<B> as any as S.Schema<B>`.
  out = out.replace(
    / as any as S\.Schema<(\w+)> as any as S\.Schema<\1>/g,
    " as any as S.Schema<$1>",
  );
  // An alias is not a call; a PURE marker before it would only draw bundler warnings.
  out = out.replace(/\/\*[@#]__PURE__\*\/\s*(\w+ as any as S\.Schema<)/g, "$1");
  return { code: out, merged: aliases.length };
};
