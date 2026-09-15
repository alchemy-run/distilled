#!/usr/bin/env bun
/**
 * spec-to-smithy — convert the mirrored Cloudflare API markdown specs into
 * Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-cloudflare/specs/api/resources/**\/methods/**\/index.md
 *         (the per-page markdown the mirror's fetch-specs.ts downloads from
 *         developers.cloudflare.com)
 * Output: .generated-specs/*.json  (one Smithy JSON model per top-level
 *         resource, plus a shared protocol model)
 *
 * ─── Thinking in protocols ──────────────────────────────────────────────────
 * Every Cloudflare response is wrapped in a v4 envelope:
 *
 *   { "success": true, "errors": [], "messages": [], "result": <payload>,
 *     "result_info": { ...pagination... } }
 *
 * `success` / `errors` / `messages` / `result_info` are NOT part of any
 * operation's response — they belong to the *protocol*. Only `result` is the
 * operation payload. So we model the envelope ONCE as a custom Smithy protocol
 * (`com.cloudflare.protocols#v4Json`) and give every operation an output shape
 * that describes the *unwrapped* `result` directly.
 *
 * ─── What gets tagged where ─────────────────────────────────────────────────
 * For each operation we emit an input/output structure whose members are tagged
 * so it's obvious where each field travels on the wire:
 *   • path params  → `smithy.api#httpLabel`  (+ required)
 *   • query params → `smithy.api#httpQuery`
 *   • header params→ `smithy.api#httpHeader`
 *   • body params  → plain members (serialized into the JSON request body)
 *   • response     → members of the output structure (the unwrapped `result`)
 * plus `smithy.api#required`, `smithy.api#jsonName`, and `smithy.api#documentation`.
 *
 * Usage:
 *   bun scripts/spec-to-smithy.ts
 *   bun scripts/spec-to-smithy.ts --resource ai          # one top-level resource
 *   bun scripts/spec-to-smithy.ts --limit 50             # first N operations
 *   bun scripts/spec-to-smithy.ts --specs specs/spec-mirror-cloudflare/specs/api/resources --out .generated-specs
 */

import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";
import { BunRuntime, BunServices } from "@effect/platform-bun";
import { Console, Effect } from "effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { Flag } from "effect/unstable/cli";
import { Command } from "effect/unstable/cli";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { dedupeScopeTwins } from "./dedupe-scope-twins.ts";

// ============================================================================
// Namespaces
// ============================================================================

const PROTOCOL_NS = "com.cloudflare.protocols";
const RESOURCE_NS = (top: string) => `com.cloudflare.${sanitizeNsSegment(top)}`;

// Smithy prelude shape ids we reference.
const PRELUDE = {
  Unit: "smithy.api#Unit",
  String: "smithy.api#String",
  Boolean: "smithy.api#Boolean",
  Double: "smithy.api#Double",
  Integer: "smithy.api#Integer",
  Timestamp: "smithy.api#Timestamp",
  Document: "smithy.api#Document",
} as const;

// ============================================================================
// String helpers
// ============================================================================

const sanitizeNsSegment = (s: string): string => {
  let out = s.toLowerCase().replace(/[^a-z0-9_]/g, "_");
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out || "_";
};

/** snake/kebab/space → PascalCase identifier. */
const pascal = (s: string): string => {
  const parts = s.split(/[^A-Za-z0-9]+/).filter(Boolean);
  let out = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
  if (out === "") out = "Shape";
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out;
};

/** Keep a JSON field name if it's a valid Smithy member identifier, else sanitize. */
const memberIdent = (name: string): string => {
  let out = name.replace(/[^A-Za-z0-9_]/g, "_");
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out || "_";
};

const enumMemberName = (value: string): string => {
  let out = value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  if (out === "") out = "VALUE";
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out;
};

// ============================================================================
// Markdown parsing
// ============================================================================

/**
 * A node in the indented field tree. Docs render two kinds of bullet:
 *   • field lines   `- \`name: type\``      (sep ":")
 *   • union arms    `- \`"a"\``, `- \`number\``, `- \`1\``,
 *                   `- \`Name object { … }\``, `- \`Name = type\`` (sep "=" / "bare")
 * A field's arms are its children; an arm's own children are either that
 * case's fields (object cases) or the full value list (truncated inline
 * enums like `"1.0" or "1.1" or 3 more`).
 */
interface FieldNode {
  name: string;
  typeStr: string;
  /** How the docs line was written — decides field vs union-arm handling. */
  sep: ":" | "=" | "bare";
  doc?: string;
  binding?: "label" | "query" | "deepQuery" | "header" | "body";
  children: FieldNode[];
}

interface ParsedOp {
  title: string;
  method: string;
  uri: string;
  doc?: string;
  pathParams: FieldNode[];
  queryParams: FieldNode[];
  headerParams: FieldNode[];
  bodyParams: FieldNode[];
  returns: FieldNode[];
}

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"];

/** Split `optional <type>` into its parts. */
const stripOptional = (
  typeStr: string,
): { optional: boolean; core: string } => {
  const t = typeStr.trim();
  if (t.startsWith("optional ")) {
    return { optional: true, core: t.slice("optional ".length).trim() };
  }
  return { optional: false, core: t };
};

/** Index of the first top-level `:` (outside quotes/braces/brackets), or -1. */
const topLevelColon = (s: string): number => {
  let depth = 0;
  let inStr = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (c === "\\") i++;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") depth--;
    else if (c === ":" && depth === 0) return i;
  }
  return -1;
};

/**
 * Build a FieldNode from one declaration as the docs write it:
 * `name: type` is a field, `Name = type` a named union arm, anything else
 * (`"lit"`, `number`, `Name object {…}`) a bare arm.
 */
const nodeFromDeclaration = (content: string): FieldNode => {
  let name: string;
  let typeStr: string;
  let sep: FieldNode["sep"];
  const colon = /^"(?:[^"\\]|\\.)*"$/.test(content)
    ? -1 // a bare quoted literal is an enum arm, never a field
    : topLevelColon(content);
  if (colon >= 0) {
    sep = ":";
    name = content.slice(0, colon).trim();
    typeStr = content.slice(colon + 1).trim();
  } else {
    // Named union-arm defs: `Name = type` (`AccessUUID2 = string`,
    // `ARecord = ARecord`, `Struct =`). Anything else is a bare arm.
    const eq = content.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=(.*)$/s);
    if (eq) {
      sep = "=";
      name = eq[1];
      typeStr = eq[2].trim() || "unknown";
    } else {
      sep = "bare";
      name = "";
      typeStr = content;
    }
  }
  // Header/param names are frequently written quoted in the docs
  // (e.g. `"cf-r2-storage-class": ...`). The quotes are markdown emphasis
  // of the literal wire name, never part of the field name itself —
  // strip a single surrounding pair so the httpHeader trait and member
  // ident don't carry stray quote characters.
  if (name.length >= 2 && name.startsWith('"') && name.endsWith('"')) {
    name = name.slice(1, -1);
  }
  return { name, typeStr, sep, children: [] };
};

/**
 * Parse the indented bullet list of a section (Path/Query/Body/Returns) into a
 * tree of FieldNodes. `- \`name: type\`` lines are fields; every other
 * backticked bullet (`- \`"lit"\``, `- \`number\``, `- \`Name object {…}\``,
 * `- \`Name = type\``, `- \`"a" or "b" or 2 more\``) is a union arm of its
 * parent. Plain indented prose lines become the preceding item's documentation.
 */
const parseFieldTree = (lines: string[]): FieldNode[] => {
  const itemRe = /^(\s*)-\s+`([^`]+)`\s*$/;
  const roots: FieldNode[] = [];
  // stack of { indent, node }
  const stack: { indent: number; node: FieldNode }[] = [];

  for (const raw of lines) {
    const m = raw.match(itemRe);
    if (m) {
      const indent = m[1].length;
      const node = nodeFromDeclaration(m[2].trim());
      while (stack.length && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }
      if (stack.length) {
        stack[stack.length - 1].node.children.push(node);
      } else {
        roots.push(node);
      }
      stack.push({ indent, node });
      continue;
    }

    // Prose line → documentation for the current item.
    const text = raw.trim();
    if (text && !text.startsWith("```") && stack.length) {
      const node = stack[stack.length - 1].node;
      if (!node.doc) node.doc = text;
    }
  }

  return roots;
};

/**
 * Parse a page written in the ORIGINAL docs format: an `## Title` heading, a
 * `**get** \`/uri\`` line, and `### <Section>` bullet trees.
 */
const parseLegacyMarkdown = (md: string): ParsedOp | null => {
  const lines = md.split(/\r?\n/);

  let title = "";
  let method = "";
  let uri = "";
  const descLines: string[] = [];
  const sections = new Map<string, string[]>();

  let i = 0;
  // Title: first ## (or #) heading.
  for (; i < lines.length; i++) {
    const h = lines[i].match(/^#{1,3}\s+(.+?)\s*$/);
    if (h) {
      title = h[1];
      i++;
      break;
    }
  }

  // Method + URI, then description until the first ### section.
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (/^###\s+/.test(line)) break;
    const mm = line.match(/^\*\*(get|post|put|patch|delete)\*\*\s+`([^`]+)`/i);
    if (mm) {
      method = mm[1].toUpperCase();
      uri = mm[2].trim();
      continue;
    }
    if (method && line.trim()) descLines.push(line.trim());
  }

  if (!method || !uri) return null;

  // Collect ### sections (stop content at the next ###/##).
  let current: string | null = null;
  for (; i < lines.length; i++) {
    const line = lines[i];
    const h3 = line.match(/^###\s+(.+?)\s*$/);
    if (h3) {
      current = h3[1];
      if (!sections.has(current)) sections.set(current, []);
      continue;
    }
    if (/^##\s+/.test(line) || /^#\s+/.test(line)) {
      current = null;
      continue;
    }
    if (current) sections.get(current)!.push(line);
  }

  const section = (name: string): FieldNode[] => {
    const l = sections.get(name);
    return l ? parseFieldTree(l) : [];
  };

  return {
    title,
    method,
    uri: uri.split(/[?#]/)[0],
    doc: descLines.join(" ").trim() || undefined,
    pathParams: section("Path Parameters"),
    queryParams: section("Query Parameters"),
    headerParams: section("Header Parameters"),
    bodyParams: section("Body Parameters"),
    returns: section("Returns"),
  };
};

// ============================================================================
// Markdown parsing — current format
// ============================================================================

/**
 * Cloudflare now publishes the API reference by converting the rendered docs
 * HTML to markdown, so the indented bullet tree is gone. A page reads:
 *
 *     # Create Bucket
 *
 *     POST/accounts/{account\_id}/r2/buckets
 *
 *     ##### Body ParametersJSONExpand Collapse
 *
 *     name: string
 *
 *     Name of the bucket.
 *
 *     maxLength64
 *
 *     [Link to this property](<#…>)
 *
 *     <details>
 *
 *     <summary>
 *
 *     locationHint: optional "apac"or "eeur"or 3 more
 *
 *     </summary>
 *
 *     One of the following:
 *     …
 *     </details>
 *
 * Every property is a run of paragraphs — declaration, prose, constraint
 * badges — closed by its "Link to this property" anchor; nesting travels as
 * `<details>`/`<summary>`; headings carry the expander's "Expand Collapse"
 * label; markdown punctuation arrives backslash-escaped; the ` or ` joining
 * union arms lost its leading space; types link to their model page; and named
 * types now print the key list that only anonymous objects used to carry.
 * Rebuild the same FieldNode tree the bullet format produced.
 */

type SectionKey =
  | "path"
  | "query"
  | "header"
  | "body"
  | "returns"
  /** A resource index page's shared-model list; method pages have none. */
  | "models";

const METHOD_LINE = /^(GET|POST|PUT|PATCH|DELETE)(\/\S*)$/;

const LINK_ANCHOR = /Link to this property/;

/** The expander's lead-in for a union's arms. */
const ARM_ANNOTATION = /^(?:One|Any|All) of the following:$/;

/** A JSON-Schema constraint badge (`maxLength32`, `formatdate-time`). */
const CONSTRAINT_BADGE =
  /^(?:maxLength|minLength|maximum|minimum|exclusiveMaximum|exclusiveMinimum|multipleOf|format|pattern|default)\S/;

/** A type token the ` or ` operator can follow. */
const TYPE_TOKEN_END =
  /(?:["\]})\d]|\b(?:string|number|integer|int|boolean|true|false|null|unknown|any|object|array)|[A-Z][A-Za-z0-9_]*)$/;

/** A declaration paragraph: `name: <type>` with a type-shaped right side. */
const FIELD_DECL =
  /^(?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$\\.-]*):\s+(?:optional\s+)?(?:string|number|integer|int|boolean|true|false|null|unknown|any|object\b|array\b|map\[|"|-?\d|[A-Z][A-Za-z0-9_]*(?:\s*\{|\s+or\s|$))/;

/** Blank-line-separated blocks; a fenced code block stays one block. */
const splitBlocks = (md: string): string[] => {
  const blocks: string[] = [];
  let cur: string[] = [];
  let fence: string | undefined;
  const flush = () => {
    const text = cur.join("\n").trim();
    if (text) blocks.push(text);
    cur = [];
  };
  for (const line of md.split(/\r?\n/)) {
    const marker = line.match(/^\s*(```+|~~~+)/)?.[1];
    if (fence) {
      cur.push(line);
      if (marker && line.trim().startsWith(fence)) {
        flush();
        fence = undefined;
      }
      continue;
    }
    if (marker) {
      flush();
      fence = marker;
      cur.push(line);
      continue;
    }
    if (!line.trim()) {
      flush();
      continue;
    }
    cur.push(line);
  }
  flush();
  return blocks;
};

const unescapeMarkdown = (s: string): string =>
  s.replace(/\\([\\`*_{}[\]()#+\-.!<>|~])/g, "$1");

/** The html pass curls quotes; the docs' own text uses the ASCII ones. */
const straightenQuotes = (s: string): string =>
  s.replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"');

const collapseLines = (s: string): string =>
  s
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .join(" ")
    .trim();

/**
 * Restore the space the html→markdown pass ate before a union's ` or `.
 * A `{` never starts an arm — it opens a named type's key preview
 * (`Monitor { id, … }`), where the `or` belongs to the type name.
 */
const respaceUnion = (decl: string): string =>
  decl.replace(/(\S)or (?=\S)/g, (match, _prev: string, offset: number) =>
    TYPE_TOKEN_END.test(decl.slice(0, offset + 1)) && decl[offset + 4] !== "{"
      ? `${match[0]} or `
      : match,
  );

/** One property declaration, spelled the way the bullet format spelled it. */
const declarationText = (block: string): string => {
  const flat = collapseLines(
    straightenQuotes(
      unescapeMarkdown(
        block
          .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/g, "$1")
          .replace(/\[([^\]]*)\]\((?:<[^>]*>|[^()]*)\)/g, "$1")
          .replace(/<\/?(?:code|strong|em|b|i|span|p|br)\b[^>]*>/g, ""),
      ),
    ),
  );
  return (
    respaceUnion(flat.replace(/^Deprecated(?=\S)/, ""))
      // A named type prints its keys (`Bucket { name, … }`); the fields come
      // from the expanded children, and the bare name is what resolves a
      // later reference to the same def.
      .replace(/\b([A-Z][A-Za-z0-9_]*)\s*\{[^{}]*\}/g, "$1")
      .trim()
  );
};

/** A property's prose, with type links kept as markdown links. */
const documentationText = (block: string): string =>
  collapseLines(
    straightenQuotes(
      unescapeMarkdown(
        block
          .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, "[$2]($1)")
          .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/g, "`$1`")
          .replace(/<br\s*\/?>/g, " ")
          .replace(/<\/?(?:code|strong|em|b|i|span|p)\b[^>]*>/g, ""),
      ),
    ),
    // A bare URL is linkified in some places and not others; print it plainly.
  ).replace(
    /\[([^\]]+)\]\(([^()\s]+)\)/g,
    (match, text: string, href: string) => (text === href ? text : match),
  );

const isConstraintBadge = (block: string): boolean =>
  !block.includes("\n") &&
  CONSTRAINT_BADGE.test(block) &&
  topLevelColon(block) < 0;

const isNoise = (block: string): boolean =>
  LINK_ANCHOR.test(block) ||
  ARM_ANNOTATION.test(block) ||
  isConstraintBadge(block) ||
  block.startsWith("```") ||
  block.startsWith("~~~");

/** Which parameter list a `##### …` heading opens, if any. */
const sectionKey = (heading: string): SectionKey | undefined => {
  // `H<!-- -->eader<!-- --> Parameters` renders as `H eader Parameters`, and
  // the expander toggle and body content-type ride along in the heading.
  const h = heading
    .replace(/Expand\s*Collapse\s*$/i, "")
    .replace(/\s+/g, "")
    .toLowerCase();
  if (h.startsWith("pathparameters")) return "path";
  if (h.startsWith("queryparameters")) return "query";
  if (h.startsWith("headerparameters")) return "header";
  if (h.startsWith("bodyparameters")) return "body";
  if (h === "returns") return "returns";
  if (h === "models") return "models";
  return undefined;
};

interface ParsedPage {
  title: string;
  method: string;
  uri: string;
  descBlocks: string[];
  sections: Record<SectionKey, FieldNode[]>;
}

const parsePage = (md: string): ParsedPage => {
  let title = "";
  let method = "";
  let uri = "";
  const descBlocks: string[] = [];
  const sections: Record<SectionKey, FieldNode[]> = {
    path: [],
    query: [],
    header: [],
    body: [],
    returns: [],
    models: [],
  };

  let seenTitle = false;
  // The prose between the route line and the first `#####` heading is the
  // operation's description; `Security`, permissions and the sample tabs that
  // follow it are not.
  let descDone = false;
  let section: SectionKey | undefined;
  let roots: FieldNode[] = [];
  let open: FieldNode[] = []; // currently open <details> nodes, outermost first
  let group: string[] = [];
  let summary: string[] | undefined;

  const siblings = (): FieldNode[] =>
    open.length ? open[open.length - 1].children : roots;

  const node = (blocks: string[]): FieldNode | undefined => {
    const decl = declarationText(blocks[0]);
    if (!decl) return undefined;
    const field = nodeFromDeclaration(decl);
    for (const block of blocks.slice(1)) {
      if (isNoise(block)) continue;
      const doc = documentationText(block);
      if (doc) {
        field.doc = doc;
        break;
      }
    }
    return field;
  };

  const flushGroup = () => {
    if (!group.length) return;
    const field = node(group);
    group = [];
    if (field) siblings().push(field);
  };

  const closeDetails = () => {
    flushGroup();
    const field = open.pop();
    if (field) siblings().push(field);
  };

  const endSection = () => {
    if (!section) return;
    while (open.length) closeDetails();
    flushGroup();
    sections[section].push(...roots);
    roots = [];
    summary = undefined;
    section = undefined;
  };

  for (const block of splitBlocks(md)) {
    const heading = block.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      endSection();
      if (heading[1].length === 1 && !seenTitle) {
        // The page title is prose — a page called "Models" opens no section.
        title = documentationText(heading[2]);
        seenTitle = true;
        continue;
      }
      if (seenTitle) descDone = true;
      section = sectionKey(heading[2]);
      continue;
    }

    if (!section) {
      // Everything above the title is site chrome (breadcrumbs, copy buttons).
      if (!seenTitle) continue;
      const route = unescapeMarkdown(block).match(METHOD_LINE);
      if (route && !method) {
        method = route[1];
        uri = route[2];
        continue;
      }
      if (method && !descDone && !isNoise(block)) {
        descBlocks.push(documentationText(block));
      }
      continue;
    }

    if (/^<summary\b[^>]*>$/i.test(block)) {
      summary = [];
      continue;
    }
    if (/^<\/summary>$/i.test(block)) {
      open.push(
        (summary?.length ? node(summary) : undefined) ?? {
          name: "",
          typeStr: "object",
          sep: "bare",
          children: [],
        },
      );
      summary = undefined;
      continue;
    }
    if (summary) {
      summary.push(block);
      continue;
    }
    if (/^<details\b[^>]*>$/i.test(block)) {
      flushGroup();
      continue;
    }
    if (/^<\/details>$/i.test(block)) {
      closeDetails();
      continue;
    }
    if (isNoise(block)) {
      if (LINK_ANCHOR.test(block)) flushGroup();
      continue;
    }
    // A property whose anchor the page omitted still starts a new group.
    if (
      group.length &&
      FIELD_DECL.test(collapseLines(unescapeMarkdown(block)))
    ) {
      flushGroup();
    }
    group.push(block);
  }
  endSection();

  return { title, method, uri, descBlocks, sections };
};

const parseCurrentMarkdown = (md: string): ParsedOp | null => {
  const page = parsePage(md);
  if (!page.method || !page.uri) return null;

  return {
    title: page.title,
    method: page.method,
    uri: page.uri.split(/[?#]/)[0],
    doc: page.descBlocks.join(" ").trim() || undefined,
    pathParams: page.sections.path,
    queryParams: page.sections.query,
    headerParams: page.sections.header,
    bodyParams: page.sections.body,
    returns: page.sections.returns,
  };
};

/** The original format announces its route as `**get** \`/uri\``. */
const isLegacyMarkdown = (md: string): boolean =>
  /^\*\*(?:get|post|put|patch|delete)\*\*\s+`/im.test(md);

const parseMarkdown = (md: string): ParsedOp | null =>
  isLegacyMarkdown(md) ? parseLegacyMarkdown(md) : parseCurrentMarkdown(md);

// ============================================================================
// Smithy shape construction
// ============================================================================

interface Bag {
  namespace: string;
  shapes: Record<string, any>;
  names: Set<string>;
}

const newBag = (namespace: string): Bag => ({
  namespace,
  shapes: {},
  names: new Set(),
});

/** Add a shape under a unique PascalCase name; returns its absolute shape id. */
const addShape = (bag: Bag, base: string, def: any): string => {
  const want = pascal(base);
  let name = want;
  let n = 2;
  while (bag.names.has(name)) name = `${want}${n++}`;
  bag.names.add(name);
  const id = `${bag.namespace}#${name}`;
  bag.shapes[id] = def;
  return id;
};

/** A member's docs-declared nullability travels via this trait. */
const NULLABLE_TRAIT = "com.cloudflare.protocols#nullable";

/**
 * A struct-valued query member that serializes as DOTTED query params
 * (`account.id=…`). Value: the wire base name (`account`). The SDK binds it
 * to core's `T.DeepQuery`.
 */
const DEEP_QUERY_TRAIT = "com.cloudflare.protocols#deepQuery";

/** A resolved type: the smithy target plus whether the docs allow `null`. */
interface Resolved {
  target: string;
  nullable: boolean;
}

/**
 * One arm of a docs union. Literal / scalar arms stay symbolic so the
 * grouping rules (closed enums, `number | 1` → number, `true or false` →
 * boolean, open `"a" or string` → string) can apply before any shape is
 * built; everything else resolves to a shape target.
 */
type Arm =
  | { k: "str"; v: string }
  | { k: "num"; v: number }
  | { k: "bool" }
  | { k: "null" }
  | { k: "doc" }
  | { k: "strScalar" }
  | { k: "numScalar"; int: boolean }
  | { k: "target"; target: string; caseName?: string };

/** Split a descriptor on top-level ` or ` (outside quotes/braces/brackets). */
const splitTopUnion = (s: string): { parts: string[]; truncated: boolean } => {
  const parts: string[] = [];
  let depth = 0;
  let inStr = false;
  let cur = "";
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (inStr) {
      cur += c;
      if (c === "\\" && i + 1 < s.length) {
        cur += s[i + 1];
        i++;
      } else if (c === '"') inStr = false;
      i++;
      continue;
    }
    if (c === '"') {
      inStr = true;
      cur += c;
      i++;
      continue;
    }
    if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") depth--;
    if (depth === 0 && /\s/.test(c)) {
      const m = s.slice(i).match(/^\s+or\s+/);
      if (m) {
        if (cur.trim()) parts.push(cur.trim());
        cur = "";
        i += m[0].length;
        continue;
      }
    }
    cur += c;
    i++;
  }
  if (cur.trim()) parts.push(cur.trim());
  let truncated = false;
  if (parts.length > 1 && /^\d+\s+more$/.test(parts[parts.length - 1])) {
    parts.pop();
    truncated = true;
  }
  return { parts, truncated };
};

const isArmChild = (f: FieldNode): boolean => f.sep !== ":";

/**
 * Named shared types the current operation's page has already inlined
 * (`lan_1: ACLConfiguration` carries the field tree; a later
 * `lan_2: ACLConfiguration` is a bare reference to the same def). Reset per
 * operation; consulted only where the converter would otherwise fall back
 * to Document, so it can only ADD information.
 */
let namedTypeRegistry = new Map<string, string>();
const NAMED_TYPE = /^[A-Z][A-Za-z0-9_]*$/;

/**
 * A model as a resource index page's `Models` list writes it: the type
 * descriptor and the field tree under it.
 */
interface ModelDef {
  typeStr: string;
  children: FieldNode[];
}

/**
 * The shared models of the resource being converted. A method page prints a
 * reference to one as its name plus a key preview (`BlockRule { id, 10 more }`)
 * and expands only the handful of fields it has room for, so the index pages'
 * `Models` lists are the only complete definitions. Consulted only where the
 * method page itself came up short, so it can only ADD information.
 */
let modelRegistry = new Map<string, ModelDef>();

/** Models being expanded right now, so a self-reference can't recurse. */
const expandingModels = new Set<string>();

/** `Name = type` and `Name object { … }` are how a model prints its head. */
const MODEL_HEAD = /^([A-Z][A-Za-z0-9_]*)\s+(\S[\s\S]*)$/;

const modelEntry = (node: FieldNode): [string, ModelDef] | undefined => {
  if (node.sep === ":") return undefined; // a field, not a model
  const [name, typeStr] =
    node.sep === "="
      ? [node.name, node.typeStr]
      : (node.typeStr.match(MODEL_HEAD)?.slice(1) ?? []);
  if (!name || !NAMED_TYPE.test(name) || !typeStr) return undefined;
  return [name, { typeStr, children: node.children }];
};

/**
 * Read one index page's `Models` lists into `into`. The same model prints on
 * several pages — expanded on the one that owns it, collapsed to a reference
 * on the others — so the fullest spelling wins.
 */
const collectModels = (md: string, into: Map<string, ModelDef>): void => {
  for (const node of parsePage(md).sections.models) {
    const entry = modelEntry(node);
    if (!entry) continue;
    const prev = into.get(entry[0]);
    if (!prev || prev.children.length < entry[1].children.length) {
      into.set(entry[0], entry[1]);
    }
  }
};

/**
 * The fields to build a reference to `name` from. A page that collapsed the
 * reference prints a few of the model's fields and drops the rest, so the
 * models list wins whenever it holds strictly more of the same fields.
 */
const preferModelFields = (name: string, printed: FieldNode[]): FieldNode[] => {
  if (!NAMED_TYPE.test(name) || expandingModels.has(name)) return printed;
  const full =
    modelRegistry.get(name)?.children.filter((c) => !isArmChild(c)) ?? [];
  return full.length > printed.length &&
    printed.every((p) => full.some((f) => f.name === p.name))
    ? full
    : printed;
};

const withModel = <T>(name: string, f: () => T): T => {
  expandingModels.add(name);
  try {
    return f();
  } finally {
    expandingModels.delete(name);
  }
};

const FULL_QUOTED = /^"(?:[^"\\]|\\.)*"$/;
const NUM_LIT = /^-?\d+(?:\.\d+)?$/;

/** Build a structure shape from field children. */
const structFrom = (bag: Bag, fields: FieldNode[], hint: string): string =>
  addShape(bag, hint, {
    type: "structure",
    members: buildMembers(bag, fields, hint, "nested"),
  });

const listOf = (bag: Bag, item: string, hint: string): string =>
  addShape(bag, `${hint}List`, { type: "list", member: { target: item } });

const mapOf = (bag: Bag, value: string, hint: string): string =>
  addShape(bag, `${hint}Map`, {
    type: "map",
    key: { target: PRELUDE.String },
    value: { target: value },
  });

const enumOf = (
  bag: Bag,
  literals: readonly string[],
  hint: string,
): string => {
  const members: Record<string, any> = {};
  const used = new Set<string>();
  for (const lit of literals) {
    let mn = enumMemberName(lit);
    let k = 2;
    while (used.has(mn)) mn = `${enumMemberName(lit)}_${k++}`;
    used.add(mn);
    members[mn] = {
      target: PRELUDE.Unit,
      traits: { "smithy.api#enumValue": lit },
    };
  }
  return addShape(bag, hint || "Enum", { type: "enum", members });
};

const intEnumOf = (
  bag: Bag,
  values: readonly number[],
  hint: string,
): string => {
  const members: Record<string, any> = {};
  const used = new Set<string>();
  for (const v of values) {
    let mn = enumMemberName(String(v));
    let k = 2;
    while (used.has(mn)) mn = `${enumMemberName(String(v))}_${k++}`;
    used.add(mn);
    members[mn] = {
      target: PRELUDE.Unit,
      traits: { "smithy.api#enumValue": v },
    };
  }
  return addShape(bag, hint || "IntEnum", { type: "intEnum", members });
};

/**
 * Collapse a list of arms into one target, applying the docs' union rules:
 *   • `null` arms mark the type nullable and drop out
 *   • `unknown` absorbs everything (Document)
 *   • all string literals → closed enum; a bare `string` arm reopens to String
 *   • all numeric literals → closed intEnum; a bare `number` arm → plain number
 *   • `true` / `false` / `boolean` → Boolean
 *   • all-map arms merge into one map with a union value (the docs' way of
 *     writing map[valueA or valueB] across shared defs)
 *   • anything left → a real smithy union of the case targets
 */
const armsToResolved = (bag: Bag, arms: Arm[], hint: string): Resolved => {
  const nullable = arms.some((a) => a.k === "null");
  const rest = arms.filter((a) => a.k !== "null");
  if (rest.length === 0 || rest.some((a) => a.k === "doc")) {
    return { target: PRELUDE.Document, nullable };
  }

  const strs: string[] = [];
  const nums: number[] = [];
  let hasBool = false;
  let hasStrScalar = false;
  let numScalar: { int: boolean } | undefined;
  const targetArms: Array<{ target: string; caseName?: string }> = [];
  for (const a of rest) {
    if (a.k === "str") strs.push(a.v);
    else if (a.k === "num") nums.push(a.v);
    else if (a.k === "bool") hasBool = true;
    else if (a.k === "strScalar") hasStrScalar = true;
    else if (a.k === "numScalar") {
      numScalar = { int: (numScalar?.int ?? true) && a.int };
    } else if (a.k === "target") targetArms.push(a);
  }

  // Group the literal/scalar arms into targets.
  const groups: string[] = [];
  if (strs.length || hasStrScalar) {
    groups.push(
      hasStrScalar
        ? PRELUDE.String
        : enumOf(bag, dedupe(strs), targetArms.length ? `${hint}Enum` : hint),
    );
  }
  if (nums.length || numScalar) {
    groups.push(
      numScalar
        ? numScalar.int
          ? PRELUDE.Integer
          : PRELUDE.Double
        : nums.every((n) => Number.isInteger(n))
          ? intEnumOf(
              bag,
              dedupe(nums),
              targetArms.length || groups.length ? `${hint}IntEnum` : hint,
            )
          : PRELUDE.Double,
    );
  }
  if (hasBool) groups.push(PRELUDE.Boolean);

  const allTargets = [
    ...groups.map((target) => ({
      target,
      caseName: undefined as string | undefined,
    })),
    ...targetArms,
  ];
  const distinct: Array<{ target: string; caseName?: string }> = [];
  const seen = new Set<string>();
  for (const t of allTargets) {
    if (seen.has(t.target)) continue;
    seen.add(t.target);
    distinct.push(t);
  }

  if (distinct.length === 0) return { target: PRELUDE.Document, nullable };
  if (distinct.length === 1) return { target: distinct[0].target, nullable };

  // All arms are maps → one map with a union value.
  if (
    groups.length === 0 &&
    distinct.every((t) => bag.shapes[t.target]?.type === "map")
  ) {
    const valueTargets = dedupe(
      distinct.map((t) => bag.shapes[t.target].value.target as string),
    );
    const value =
      valueTargets.length === 1
        ? valueTargets[0]
        : addShape(bag, `${hint}Value`, {
            type: "union",
            members: Object.fromEntries(
              valueTargets.map((vt, i) => [
                caseMemberName(vt, undefined, i),
                { target: vt },
              ]),
            ),
          });
    return { target: mapOf(bag, value, hint), nullable };
  }

  const members: Record<string, any> = {};
  const usedCases = new Set<string>();
  distinct.forEach((t, idx) => {
    let cname = caseMemberName(t.target, t.caseName, idx);
    while (usedCases.has(cname)) cname = `${cname}_`;
    usedCases.add(cname);
    members[cname] = { target: t.target };
  });
  return {
    target: addShape(bag, hint, { type: "union", members }),
    nullable,
  };
};

const dedupe = <T>(xs: readonly T[]): T[] => [...new Set(xs)];

/** Stable member name for a union case. */
const caseMemberName = (
  target: string,
  caseName: string | undefined,
  idx: number,
): string => {
  if (caseName) return pascal(caseName);
  const local = target.includes("#") ? target.split("#")[1] : target;
  return local ? pascal(local) : `Case${idx}`;
};

/** Named object case arm: `Name object { … }` (fields are the children). */
const NAMED_OBJECT_ARM = /^([A-Za-z_][A-Za-z0-9_]*)\s+object\b/;

/** The `{ a, b, "c-d" }` key list of an inline object type, if present. */
const INLINE_KEYS = /\{\s*([^{}]*?)\s*\}/;

/**
 * Keys an arm names inline but doesn't expand as child bullets.
 *
 * Most object arms in the docs are written with their fields as children:
 *
 *     - `Name object { a, b }`
 *       - `a: optional string`
 *       - `b: optional number`
 *
 * The Access policy rules aren't. Each is a one-key wrapper documented as a
 * bullet with a prose description and NO children:
 *
 *     - `GroupRule object { group }`
 *
 *       Matches an Access group.
 *
 * Reading only the children yields an EMPTY structure — which is what
 * produced 10,073 empty shapes in zero_trust, every rule kind of every
 * policy of every application type. The key is right there in the type
 * string, so fall back to it.
 *
 * The value type isn't documented at this point, so members land as
 * `Document`. That's honest: the docs say the key exists and nothing more.
 * `… 7 more` is the docs' truncation marker for wide objects and is skipped
 * — those arms carry children, so they never reach this path.
 */
const inlineArmMembers = (typeStr: string): Record<string, any> | undefined => {
  const inner = typeStr.match(INLINE_KEYS)?.[1];
  if (!inner) return undefined;
  const members: Record<string, any> = {};
  for (const raw of inner.split(",")) {
    const key = raw.trim().replace(/^"(.*)"$/, "$1");
    if (!key || /^\d+ more$/.test(key)) continue;
    members[key] = { target: PRELUDE.Document };
  }
  return Object.keys(members).length ? members : undefined;
};

/** Parse one arm rendered as its own docs bullet (children in tow). */
const parseArmNode = (
  bag: Bag,
  node: FieldNode,
  hint: string,
  idx: number,
): Arm => {
  const caseName = node.sep === "=" ? node.name : undefined;
  const t = node.typeStr.trim();

  if (FULL_QUOTED.test(t)) return { k: "str", v: JSON.parse(t) };
  if (NUM_LIT.test(t)) return { k: "num", v: Number(t) };
  if (t === "true" || t === "false" || t === "boolean") return { k: "bool" };
  if (t === "null") return { k: "null" };
  if (t === "unknown" || t === "any") return { k: "doc" };
  if (t === "string") return { k: "strScalar" };
  if (t === "number") return { k: "numScalar", int: false };
  if (t === "integer" || t === "int") return { k: "numScalar", int: true };

  // `Name object { … }` — a named case whose fields are the children.
  const named = t.match(NAMED_OBJECT_ARM);
  if (named) {
    const cname = caseName ?? named[1];
    const fields = preferModelFields(
      cname,
      node.children.filter((c) => !isArmChild(c)),
    );
    // No children: the arm's keys are only stated inline in the type.
    const inline = fields.length ? undefined : inlineArmMembers(t);
    return {
      k: "target",
      caseName: cname,
      target: inline
        ? addShape(bag, `${hint}${pascal(cname)}`, {
            type: "structure",
            members: inline,
          })
        : withModel(cname, () =>
            structFrom(bag, fields, `${hint}${pascal(cname)}`),
          ),
    };
  }

  const sub = caseName ? `${hint}${pascal(caseName)}` : `${hint}Case${idx}`;
  const r = resolveDesc(bag, t, node.children, sub);
  if (r.target === PRELUDE.Document && !r.nullable) return { k: "doc" };
  return { k: "target", target: r.target, caseName };
};

/** Parse one arm written inline (no dedicated bullet of its own). */
const parseArmString = (
  bag: Bag,
  part: string,
  fieldChildren: FieldNode[],
  sharedStruct: { target?: string },
  hint: string,
  idx: number,
): Arm => {
  const t = part.trim();
  if (FULL_QUOTED.test(t)) return { k: "str", v: JSON.parse(t) };
  if (NUM_LIT.test(t)) return { k: "num", v: Number(t) };
  if (t === "true" || t === "false" || t === "boolean") return { k: "bool" };
  if (t === "null") return { k: "null" };
  if (t === "unknown" || t === "any") return { k: "doc" };
  if (t === "string") return { k: "strScalar" };
  if (t === "number") return { k: "numScalar", int: false };
  if (t === "integer" || t === "int") return { k: "numScalar", int: true };

  if (/^object\b/.test(t) || NAMED_OBJECT_ARM.test(t)) {
    // Inline object arms share the one field list the docs printed below the
    // member — build a single struct and reuse it for every object arm.
    if (!sharedStruct.target && fieldChildren.length) {
      sharedStruct.target = structFrom(bag, fieldChildren, hint);
    }
    return sharedStruct.target
      ? { k: "target", target: sharedStruct.target }
      : { k: "doc" };
  }
  if (/^array\b/.test(t) || t.startsWith("map[")) {
    const r = resolveDesc(bag, t, fieldChildren, `${hint}Case${idx}`);
    if (r.target === PRELUDE.Document) return { k: "doc" };
    return { k: "target", target: r.target };
  }
  // A bare named type with no children of its own is opaque.
  return { k: "doc" };
};

/** Extract the value descriptor from `map[<value>]` (brackets may nest). */
const mapValueDesc = (t: string): string | undefined => {
  if (!t.startsWith("map[")) return undefined;
  let depth = 0;
  for (let i = 3; i < t.length; i++) {
    if (t[i] === "[") depth++;
    else if (t[i] === "]") {
      depth--;
      if (depth === 0) return t.slice(4, i).trim();
    }
  }
  return t.slice(4).trim();
};

/**
 * Resolve a docs type descriptor (with its children) to a smithy target.
 * The children — when they are union-arm bullets — are the authoritative,
 * untruncated list of arms; the inline descriptor is only trusted when the
 * docs printed no arm bullets.
 */
const resolveDesc = (
  bag: Bag,
  descRaw: string,
  children: FieldNode[],
  hint: string,
): Resolved => {
  const desc = stripOptional(descRaw).core.trim();
  const armChildren = children.filter(isArmChild);
  const fieldChildren = children.filter((c) => !isArmChild(c));
  const { parts, truncated } = splitTopUnion(desc);
  const isArrayDesc = /^array\b/.test(desc);

  if (armChildren.length > 0) {
    // `array of A or B` lists the ITEM cases as children — unless a child is
    // itself an array arm, which means the union is at the top level
    // (`array of string or boolean`).
    const itemLevel =
      isArrayDesc && !armChildren.some((c) => /^array\b/.test(c.typeStr));
    const armHint = itemLevel ? `${hint}Item` : hint;
    const arms = armChildren.map((c, i) => parseArmNode(bag, c, armHint, i));
    const r = armsToResolved(bag, arms, armHint);
    // A named def whose arms this page just enumerated (`ttl: TTL`,
    // `value: SettingValue`) — remember it for later bare references.
    if (!itemLevel && parts.length === 1 && NAMED_TYPE.test(desc)) {
      namedTypeRegistry.set(desc, r.target);
    }
    return itemLevel
      ? { target: listOf(bag, r.target, hint), nullable: false }
      : r;
  }

  if (parts.length > 1) {
    // Inline-only union. Object arms share the printed field list.
    const itemLevel = isArrayDesc;
    const armHint = itemLevel ? `${hint}Item` : hint;
    const inlineParts = itemLevel
      ? [parts[0].replace(/^array(\s+of)?\s+/, ""), ...parts.slice(1)]
      : parts;
    const sharedStruct: { target?: string } = {};
    const arms = inlineParts.map((p, i) =>
      parseArmString(bag, p, fieldChildren, sharedStruct, armHint, i),
    );
    // A truncated inline list with no arm bullets can't be enumerated —
    // widen literals to their base scalar.
    const widened = truncated
      ? arms.map((a): Arm =>
          a.k === "str"
            ? { k: "strScalar" }
            : a.k === "num"
              ? { k: "numScalar", int: false }
              : a,
        )
      : arms;
    const r = armsToResolved(bag, widened, armHint);
    return itemLevel
      ? { target: listOf(bag, r.target, hint), nullable: false }
      : r;
  }

  // Single descriptor.
  const t = desc;
  if (FULL_QUOTED.test(t)) {
    return { target: enumOf(bag, [JSON.parse(t)], hint), nullable: false };
  }
  if (NUM_LIT.test(t)) {
    const v = Number(t);
    return {
      target: Number.isInteger(v) ? intEnumOf(bag, [v], hint) : PRELUDE.Double,
      nullable: false,
    };
  }
  switch (t) {
    case "string":
      return { target: PRELUDE.String, nullable: false };
    case "boolean":
    case "true":
    case "false":
      return { target: PRELUDE.Boolean, nullable: false };
    case "number":
      return { target: PRELUDE.Double, nullable: false };
    case "integer":
    case "int":
      return { target: PRELUDE.Integer, nullable: false };
    case "null":
      return { target: PRELUDE.Document, nullable: true };
    case "unknown":
    case "any":
    case "":
      return { target: PRELUDE.Document, nullable: false };
  }

  if (isArrayDesc) {
    // Strip exactly ONE `array of ` / `array ` prefix (nested arrays recurse).
    const sub = (
      /^array\s+of\s+/.test(t)
        ? t.replace(/^array\s+of\s+/, "")
        : t.replace(/^array\s*/, "")
    ).trim();
    if (sub === "" || sub === "array") {
      return { target: listOf(bag, PRELUDE.Document, hint), nullable: false };
    }
    const item = resolveDesc(bag, sub, children, `${hint}Item`);
    return { target: listOf(bag, item.target, hint), nullable: false };
  }

  const mv = mapValueDesc(t);
  if (mv !== undefined) {
    const value = resolveDesc(bag, mv, children, `${hint}Value`);
    return { target: mapOf(bag, value.target, hint), nullable: false };
  }

  if (/^object\b/.test(t)) {
    if (!fieldChildren.length) {
      return { target: PRELUDE.Document, nullable: false };
    }
    return { target: structFrom(bag, fieldChildren, hint), nullable: false };
  }

  // Named shared type (e.g. `Namespace`, `ResponseInfo`). The docs inline
  // the full field tree as indented children; a bare name with no children
  // is a reference — resolve it against the defs this page already inlined,
  // and only a name the page never expands stays opaque.
  if (fieldChildren.length) {
    const fields = preferModelFields(t, fieldChildren);
    const target = withModel(t, () => structFrom(bag, fields, hint));
    if (NAMED_TYPE.test(t)) namedTypeRegistry.set(t, target);
    return { target, nullable: false };
  }
  if (NAMED_TYPE.test(t)) {
    const known = namedTypeRegistry.get(t);
    if (known) return { target: known, nullable: false };
    const model = expandingModels.has(t) ? undefined : modelRegistry.get(t);
    if (model) {
      return withModel(t, () =>
        resolveDesc(bag, model.typeStr, model.children, hint),
      );
    }
  }
  return { target: PRELUDE.Document, nullable: false };
};

/**
 * Resolve a target for an HTTP-bound member (httpLabel/httpQuery/httpHeader),
 * which Smithy restricts to simple types (or, for query/header, lists of simple
 * types). Object/map/document descriptors are coerced to String — these are
 * Cloudflare's bracket-serialized filter params whose exact wire form varies.
 */
const boundTarget = (
  core: string,
  node: FieldNode,
  bag: Bag,
  hint: string,
  allowList: boolean,
): string => {
  const t = core.trim();
  if (t.startsWith('"')) {
    return resolveDesc(bag, t, node.children, hint).target; // enum is simple
  }
  if (t.startsWith("array")) {
    if (!allowList) return PRELUDE.String;
    const sub = (
      /^array\s+of\s+/.test(t)
        ? t.replace(/^array\s+of\s+/, "")
        : t.replace(/^array\s*/, "")
    ).trim();
    const subTarget =
      sub === "" ||
      sub.startsWith("object") ||
      sub.startsWith("map[") ||
      sub.startsWith("array")
        ? PRELUDE.String
        : boundTarget(sub, node, bag, hint, false);
    return addShape(bag, `${hint}List`, {
      type: "list",
      member: { target: subTarget },
    });
  }
  if (t.startsWith("object") || t.startsWith("map[")) return PRELUDE.String;
  switch (t) {
    case "boolean":
    case "true":
    case "false":
      return PRELUDE.Boolean;
    case "number":
      return PRELUDE.Double;
    case "integer":
    case "int":
      return PRELUDE.Integer;
    default:
      return PRELUDE.String; // string + unknown → String (Document is invalid here)
  }
};

type Role = "input" | "output" | "nested";

/** Build a structure's `members` map from a list of field nodes. */
const buildMembers = (
  bag: Bag,
  rawFields: FieldNode[],
  hint: string,
  role: Role,
): Record<string, any> => {
  const members: Record<string, any> = {};
  const used = new Set<string>();
  // Union-arm bullets are consumed by their parent's type resolution; only
  // real `name: type` fields become members.
  const fields = rawFields.filter((f) => f.sep === ":");

  for (const f of fields) {
    const { optional, core } = stripOptional(f.typeStr);
    let mname = memberIdent(f.name);
    let k = 2;
    while (used.has(mname)) mname = `${memberIdent(f.name)}_${k++}`;
    used.add(mname);

    const memberHint = `${hint}${pascal(f.name)}`;
    let nullable = false;
    let target: string;
    if (f.binding === "label") {
      target = boundTarget(core, f, bag, memberHint, false);
    } else if (f.binding === "query" || f.binding === "header") {
      target = boundTarget(core, f, bag, memberHint, true);
    } else {
      const r = resolveDesc(bag, core, f.children, memberHint);
      target = r.target;
      nullable = r.nullable;
    }
    const traits: Record<string, any> = {};
    if (f.doc) traits["smithy.api#documentation"] = f.doc;
    if (nullable) traits[NULLABLE_TRAIT] = {};

    switch (f.binding) {
      case "label":
        traits["smithy.api#httpLabel"] = {};
        traits["smithy.api#required"] = {};
        break;
      case "query":
        traits["smithy.api#httpQuery"] = f.name;
        if (!optional) traits["smithy.api#required"] = {};
        break;
      case "deepQuery":
        traits[DEEP_QUERY_TRAIT] = f.name;
        if (!optional) traits["smithy.api#required"] = {};
        break;
      case "header":
        traits["smithy.api#httpHeader"] = f.name;
        if (!optional) traits["smithy.api#required"] = {};
        break;
      default:
        // body member or response/nested member → JSON body field.
        if (!optional) traits["smithy.api#required"] = {};
        if (mname !== f.name) traits["smithy.api#jsonName"] = f.name;
    }

    members[mname] = {
      target,
      ...(Object.keys(traits).length ? { traits } : {}),
    };
  }

  return members;
};

const ENVELOPE_KEYS = new Set(["success", "errors", "messages", "result_info"]);

/** A node whose children are the v4 envelope keys (success/errors/…). */
const isEnvelopeWrapper = (node: FieldNode): boolean => {
  const names = new Set(node.children.map((c) => c.name));
  return names.has("success") && names.has("errors");
};

/**
 * Some doc pages wrap the whole Returns section in named envelope types
 * (`IAMCollectionMembershipResponse object { errors, messages, success,
 * result, result_info }`) instead of listing the envelope keys as top-level
 * bullets — sometimes as a union of several such wrappers (memberships
 * documents plain and with-policies variants). Unwrap so the standard
 * result handling sees `result`; a wrapper union unwraps its first arm,
 * the common base every variant extends. Without this the operation
 * generated an EMPTY response structure and the payload was undecodable.
 */
const unwrapEnvelopeReturns = (returns: FieldNode[]): FieldNode[] =>
  returns.length > 0 && returns.every(isEnvelopeWrapper)
    ? returns[0].children
    : returns;

// ============================================================================
// Whole-body union flattening
// ============================================================================

/** An arm bullet describing an object variant: `Name object { … }` / `object { … }`. */
const OBJECT_VARIANT_ARM = /^(?:[A-Za-z_][A-Za-z0-9_]*\s+)?object\b/;

const armIsObjectVariant = (a: FieldNode): boolean =>
  OBJECT_VARIANT_ARM.test(stripOptional(a.typeStr).core.trim()) &&
  a.children.some((c) => c.sep === ":");

/** The docs' case name for an object arm (`AzureAD object {…}` / `Name = …`). */
const armCaseName = (a: FieldNode): string | undefined => {
  if (a.sep === "=" && a.name) return a.name;
  const m = stripOptional(a.typeStr).core.trim().match(NAMED_OBJECT_ARM);
  return m ? m[1] : undefined;
};

/** Structural signature of a node subtree (docs prose excluded). */
const nodeSigFull = (n: FieldNode): unknown => [
  n.name,
  n.sep,
  n.typeStr,
  n.children.map(nodeSigFull),
];

/** Signature of a FIELD's type: its own optionality is merged separately. */
const fieldTypeSig = (n: FieldNode): string =>
  JSON.stringify([stripOptional(n.typeStr).core, n.children.map(nodeSigFull)]);

/**
 * The docs render a whole-body `oneOf` as a SINGLE body param — literally
 * named `body`, or named after the referenced schema (`identity_provider:
 * IdentityProvider`) — whose union arms are all object variants. The wire
 * body is the chosen variant's object FLAT at the top level; the param name
 * never appears as a wire key, so a member for it would nest the payload
 * one level too deep. Model what the wire does instead: the request gains
 * the union of every variant's fields — a field keeps the one shared type
 * when all variants agree, else becomes a union of the variants' types;
 * a field is required only when required in EVERY variant.
 *
 * Genuine wrapper keys are untouched: they surface either alongside other
 * body params or as a sole param whose type is an object/array/scalar
 * (e.g. api_gateway `settings_multiple_request`, DLP order `level_ids`) —
 * never as a sole all-object union.
 */
const flattenWholeBodyUnion = (bodyParams: FieldNode[]): FieldNode[] => {
  if (bodyParams.length !== 1) return bodyParams;
  const sole = bodyParams[0];
  if (sole.sep !== ":") return bodyParams;
  const { optional: parentOptional, core: soleCore } = stripOptional(
    sole.typeStr,
  );
  // An array/map descriptor's arm bullets describe the ITEM cases, not the
  // body (`body: array of object {…} or object {…}` — the wire body is the
  // array itself). Never flatten those.
  if (/^array\b/.test(soleCore) || soleCore.startsWith("map[")) {
    return bodyParams;
  }
  // Only the docs' whole-body spellings qualify: a param literally named
  // `body`, or one whose name is just the snake_cased schema ref
  // (`identity_provider: IdentityProvider`). Any other sole param is a REAL
  // wire key whose VALUE is the union (`auth_requirements: object {…} or
  // object {…}` nests on the wire) and must stay a member.
  if (sole.name !== "body" && pascal(sole.name) !== soleCore.trim()) {
    return bodyParams;
  }
  const arms = sole.children.filter(isArmChild);
  const directFields = sole.children.filter((c) => c.sep === ":");
  if (arms.length < 2 || directFields.length > 0) return bodyParams;
  if (!arms.every(armIsObjectVariant)) return bodyParams;

  // Wire key → its occurrence in each variant that carries it.
  interface Occ {
    node: FieldNode;
    caseName?: string;
  }
  const byKey = new Map<string, Occ[]>();
  for (const arm of arms) {
    const caseName = armCaseName(arm);
    for (const f of arm.children) {
      if (f.sep !== ":") continue;
      let occs = byKey.get(f.name);
      if (!occs) byKey.set(f.name, (occs = []));
      occs.push({ node: f, caseName });
    }
  }

  const out: FieldNode[] = [];
  for (const [key, occs] of byKey) {
    const requiredInAll =
      !parentOptional &&
      occs.length === arms.length &&
      occs.every((o) => !stripOptional(o.node.typeStr).optional);
    // Group structurally-identical variant types for this key.
    const groups = new Map<string, Occ[]>();
    for (const o of occs) {
      const sig = fieldTypeSig(o.node);
      let g = groups.get(sig);
      if (!g) groups.set(sig, (g = []));
      g.push(o);
    }
    const doc = occs.find((o) => o.node.doc)?.node.doc;
    if (groups.size === 1) {
      const first = occs[0].node;
      const core = stripOptional(first.typeStr).core;
      out.push({
        ...first,
        typeStr: requiredInAll ? core : `optional ${core}`,
        doc,
      });
    } else {
      // Variants disagree — one union arm per distinct type, named after
      // the first variant that carries it.
      const children: FieldNode[] = [];
      const descs: string[] = [];
      for (const g of groups.values()) {
        const rep = g[0];
        const core = stripOptional(rep.node.typeStr).core;
        descs.push(core);
        children.push({
          name: rep.caseName ?? "",
          sep: rep.caseName ? "=" : "bare",
          typeStr: core,
          doc: rep.node.doc,
          children: rep.node.children,
        });
      }
      const desc = descs.join(" or ");
      out.push({
        name: key,
        sep: ":",
        typeStr: requiredInAll ? desc : `optional ${desc}`,
        doc,
        children,
      });
    }
  }
  return out;
};

/** Build one operation (plus its input/output shapes) into the bag. */
/**
 * Split a dual-scope operation (docs write `/{accounts_or_zones}/
 * {account_or_zone_id}/…` for endpoints that exist under both accounts and
 * zones) into two concrete operations, `<Name>ForAccount` and `<Name>ForZone`.
 * A single parameterized op would force callers to pass the scope segment
 * explicitly and can never line up with the per-scope operations other
 * Cloudflare tooling exposes.
 */
const splitDualScope = (
  opName: string,
  parsed: ParsedOp,
): Array<{ opName: string; parsed: ParsedOp }> => {
  if (!parsed.uri.includes("{accounts_or_zones}")) {
    return [{ opName, parsed }];
  }
  const scoped = (
    scope: "accounts" | "zones",
    idName: string,
    suffix: string,
  ): { opName: string; parsed: ParsedOp } => ({
    opName: `${opName}${suffix}`,
    parsed: {
      ...parsed,
      uri: parsed.uri
        .replace("{accounts_or_zones}", scope)
        .replace("{account_or_zone_id}", `{${idName}}`),
      pathParams: [
        {
          name: idName,
          typeStr: "string",
          sep: ":",
          doc: "Identifier.",
          children: [],
        } as FieldNode,
        ...parsed.pathParams.filter(
          (p) =>
            p.name !== "accounts_or_zones" && p.name !== "account_or_zone_id",
        ),
      ],
    },
  });
  return [
    scoped("accounts", "account_id", "ForAccount"),
    scoped("zones", "zone_id", "ForZone"),
  ];
};

const buildOperation = (bag: Bag, opName: string, parsed: ParsedOp): string => {
  // Named-def references only resolve within the one page being converted.
  namedTypeRegistry = new Map();

  // ---- Input ----
  const pathMap = new Map<string, FieldNode>();
  for (const p of parsed.pathParams) pathMap.set(p.name, p);

  // Sanitize URI labels that aren't valid Smithy identifiers (e.g.
  // `{livestream-session-id}`), rewriting the template so the placeholder name
  // matches its httpLabel member. The placeholder name is positional, so the
  // serialized path is unchanged.
  let uri = parsed.uri;
  const rawLabels = Array.from(parsed.uri.matchAll(/\{([^}]+)\}/g)).map(
    (m) => m[1],
  );
  const inputFields: FieldNode[] = [];
  for (const raw of rawLabels) {
    const san = memberIdent(raw);
    if (san !== raw) uri = uri.split(`{${raw}}`).join(`{${san}}`);
    const pn = pathMap.get(raw);
    inputFields.push({
      name: san,
      typeStr: pn ? pn.typeStr : "string",
      sep: ":",
      doc: pn?.doc,
      children: pn?.children ?? [],
      binding: "label",
    });
  }
  for (const q of parsed.queryParams) {
    // Deep-object query filters (`account: object { id, name }`) serialize
    // as dotted params on the wire (`account.id=…`). Model them as a NESTED
    // optional struct member (v0 parity: `account?: { id?, name? }`) tagged
    // with the deepQuery trait; the protocol expands the struct into the
    // dotted wire form at request time.
    const { core } = stripOptional(q.typeStr);
    const subFields = q.children.filter((c) => c.sep === ":");
    if (/^object\b/.test(core.trim()) && subFields.length) {
      inputFields.push({ ...q, binding: "deepQuery" });
      continue;
    }
    inputFields.push({ ...q, binding: "query" });
  }
  for (const h of parsed.headerParams)
    inputFields.push({ ...h, binding: "header" });
  for (const b of flattenWholeBodyUnion(parsed.bodyParams))
    inputFields.push({ ...b, binding: "body" });

  let inputTarget: string = PRELUDE.Unit;
  if (inputFields.length) {
    const members = buildMembers(bag, inputFields, `${opName}Request`, "input");
    // Docs convention for raw (non-object) request bodies: a single body
    // param literally named `body` (e.g. alerting silences POST an array,
    // KV bulk delete POSTs an array of keys). Mark it httpPayload so the
    // protocol sends the member's value AS the body instead of wrapping it.
    // A schema-less `body: unknown` gets NO member at all — the runtime path
    // for undocumented JSON bodies is the request root's opaque passthrough,
    // and an `unknown` member would only force casts on consumers.
    const bodyMembers = Object.entries(members).filter(
      ([, m]: [string, any]) =>
        !m.traits?.["smithy.api#httpLabel"] &&
        !m.traits?.["smithy.api#httpQuery"] &&
        !m.traits?.[DEEP_QUERY_TRAIT] &&
        !m.traits?.["smithy.api#httpHeader"],
    );
    if (bodyMembers.length === 1 && bodyMembers[0]![0] === "body") {
      const m = bodyMembers[0]![1] as any;
      if (m.target === PRELUDE.Document) {
        delete members.body;
      } else {
        m.traits = { ...m.traits, "smithy.api#httpPayload": {} };
      }
    }
    inputTarget = addShape(bag, `${opName}Request`, {
      type: "structure",
      members,
      traits: { "smithy.api#input": {} },
    });
  }

  // ---- Output: the UNWRAPPED `result` payload ----
  let outputTarget: string = PRELUDE.Unit;
  const returns = unwrapEnvelopeReturns(parsed.returns);
  const resultNode = returns.find((n) => n.name === "result");
  if (resultNode) {
    const { core } = stripOptional(resultNode.typeStr);
    const fieldChildren = resultNode.children.filter((c) => !isArmChild(c));
    const hasArmChildren = resultNode.children.some(isArmChild);
    // A plain object result (an `object`, or a named shared type whose field
    // tree is inlined as children) becomes the output structure itself. A
    // union / array / map / scalar result instead rides in a single
    // envelope-payload member.
    const objectLike =
      !hasArmChildren &&
      splitTopUnion(core).parts.length === 1 &&
      (core.startsWith("object") ||
        (fieldChildren.length > 0 &&
          !core.startsWith("array") &&
          !core.startsWith("map[") &&
          !core.startsWith('"') &&
          !/^(string|boolean|true|false|number|integer|int|unknown|any)$/.test(
            core.trim(),
          )));
    if (objectLike && fieldChildren.length) {
      const members = buildMembers(
        bag,
        fieldChildren,
        `${opName}Response`,
        "output",
      );
      outputTarget = addShape(bag, `${opName}Response`, {
        type: "structure",
        members,
        traits: {
          "smithy.api#output": {},
          "smithy.api#documentation":
            "Unwrapped `result` payload of the Cloudflare v4 response envelope.",
        },
      });
    } else if (!objectLike) {
      // Non-object result (union/array/scalar): one member carries the
      // payload, tagged so it's clear this IS the envelope's `result`.
      const payloadTarget = resolveDesc(
        bag,
        core,
        resultNode.children,
        `${opName}Result`,
      ).target;
      outputTarget = addShape(bag, `${opName}Response`, {
        type: "structure",
        members: {
          result: {
            target: payloadTarget,
            traits: {
              [`${PROTOCOL_NS}#envelopePayload`]: {},
              "smithy.api#documentation":
                "The unwrapped `result` payload of the v4 response envelope.",
            },
          },
        },
        traits: { "smithy.api#output": {} },
      });
    }
  } else {
    // Non-standard envelope: keep any non-envelope top-level fields as output.
    const rest = returns.filter((n) => !ENVELOPE_KEYS.has(n.name));
    if (rest.length) {
      const members = buildMembers(bag, rest, `${opName}Response`, "output");
      outputTarget = addShape(bag, `${opName}Response`, {
        type: "structure",
        members,
        traits: {
          "smithy.api#output": {},
          "smithy.api#documentation":
            "Raw response payload (operation does not use the standard v4 result envelope).",
        },
      });
    }
  }

  // ---- Operation ----
  const traits: Record<string, any> = {
    "smithy.api#http": {
      method: parsed.method,
      uri,
      code: 200,
    },
  };
  if (parsed.doc) traits["smithy.api#documentation"] = parsed.doc;
  if (!parsed.method.match(/^(POST|PATCH|PUT|DELETE)$/)) {
    traits["smithy.api#readonly"] = {};
  } else if (parsed.method === "PUT" || parsed.method === "DELETE") {
    traits["smithy.api#idempotent"] = {};
  }

  return addShape(bag, opName, {
    type: "operation",
    input: { target: inputTarget },
    output: { target: outputTarget },
    traits,
  });
};

// ============================================================================
// Protocol model (the v4 envelope, modeled once)
// ============================================================================

const buildProtocolModel = (): any => ({
  smithy: "2.0",
  metadata: {
    suppressions: [{ id: "UnreferencedShape", namespace: "*" }],
  },
  shapes: {
    // The protocol trait itself — applied to every Cloudflare service.
    [`${PROTOCOL_NS}#v4Json`]: {
      type: "structure",
      members: {},
      traits: {
        "smithy.api#trait": { selector: "service" },
        "smithy.api#protocolDefinition": {
          traits: [
            "smithy.api#http",
            "smithy.api#httpLabel",
            "smithy.api#httpQuery",
            "smithy.api#httpHeader",
            "smithy.api#httpPayload",
            "smithy.api#jsonName",
            `${PROTOCOL_NS}#envelopePayload`,
            `${PROTOCOL_NS}#deepQuery`,
          ],
        },
        "smithy.api#documentation":
          "Cloudflare client-v4 JSON protocol. Every response is wrapped in a " +
          "`{ success, errors, messages, result, result_info }` envelope. " +
          "`success`/`errors`/`messages`/`result_info` are protocol metadata " +
          "handled by the client; an operation's output shape describes only " +
          "the unwrapped `result` payload.",
      },
    },
    // Marks a struct-valued query member serialized as dotted query params.
    [`${PROTOCOL_NS}#deepQuery`]: {
      type: "structure",
      members: {},
      traits: {
        "smithy.api#trait": { selector: "structure > member" },
        "smithy.api#documentation":
          "Marks a struct-valued input member whose fields serialize as a " +
          "dotted query-parameter family (`account.id=…`). The trait value " +
          "is the wire base name.",
      },
    },
    // Marks the envelope member that carries the operation payload.
    [`${PROTOCOL_NS}#envelopePayload`]: {
      type: "structure",
      members: {},
      traits: {
        "smithy.api#trait": { selector: "structure > member" },
        "smithy.api#documentation":
          "Marks the member that carries the operation-specific payload inside " +
          "the v4 envelope's `result` field.",
      },
    },
    // Documentation-only shapes describing the wire envelope.
    [`${PROTOCOL_NS}#ResponseEnvelope`]: {
      type: "structure",
      members: {
        success: {
          target: PRELUDE.Boolean,
          traits: {
            "smithy.api#required": {},
            "smithy.api#documentation":
              "Whether the API call succeeded. Protocol metadata — not part of any operation output.",
          },
        },
        errors: {
          target: `${PROTOCOL_NS}#Messages`,
          traits: {
            "smithy.api#documentation": "Protocol metadata: error list.",
          },
        },
        messages: {
          target: `${PROTOCOL_NS}#Messages`,
          traits: {
            "smithy.api#documentation":
              "Protocol metadata: informational messages.",
          },
        },
        result_info: {
          target: `${PROTOCOL_NS}#ResultInfo`,
          traits: {
            "smithy.api#documentation": "Protocol metadata: pagination info.",
          },
        },
        result: {
          target: PRELUDE.Document,
          traits: {
            [`${PROTOCOL_NS}#envelopePayload`]: {},
            "smithy.api#documentation":
              "The operation payload. Each operation's output shape describes the contents of this field.",
          },
        },
      },
      traits: {
        "smithy.api#documentation":
          "The wire envelope wrapping every Cloudflare v4 response. Modeled here " +
          "for reference; operations bind only to `result`.",
      },
    },
    [`${PROTOCOL_NS}#Message`]: {
      type: "structure",
      members: {
        code: { target: PRELUDE.Integer },
        message: { target: PRELUDE.String },
        documentation_url: { target: PRELUDE.String },
      },
    },
    [`${PROTOCOL_NS}#Messages`]: {
      type: "list",
      member: { target: `${PROTOCOL_NS}#Message` },
    },
    [`${PROTOCOL_NS}#ResultInfo`]: {
      type: "structure",
      members: {
        page: { target: PRELUDE.Double },
        per_page: { target: PRELUDE.Double },
        count: { target: PRELUDE.Double },
        total_count: { target: PRELUDE.Double },
      },
    },
  },
});

// ============================================================================
// Filesystem walk
// ============================================================================

/** Every `index.md` under `dir`: the method pages and the resource pages. */
const walkMarkdown = (
  dir: string,
): Effect.Effect<string[], any, FileSystem.FileSystem | Path.Path> =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const out: string[] = [];
    const recurse = (cur: string): Effect.Effect<void, any, never> =>
      Effect.gen(function* () {
        const entries = yield* fs.readDirectory(cur);
        for (const entry of entries) {
          const full = path.join(cur, entry);
          const stat = yield* fs.stat(full);
          if (stat.type === "Directory") {
            yield* recurse(full);
          } else if (entry === "index.md") {
            out.push(full);
          }
        }
      });
    yield* recurse(dir);
    return out.sort();
  });

// ============================================================================
// Operation naming from file path
// ============================================================================

/**
 * Given a method page's path relative to the specs root, return
 * { top, opName }. e.g.
 *   ai/subresources/finetunes/methods/list/index.md → { top: "ai", op: "FinetunesList" }
 *   accounts/methods/create/index.md                → { top: "accounts", op: "Create" }
 */
const opIdentity = (relPath: string): { top: string; opName: string } => {
  const segs = relPath
    .replace(/\\/g, "/")
    .replace(/\/index\.md$/, "")
    .split("/")
    .filter(Boolean);
  const top = segs[0];
  const rest = segs
    .slice(1)
    .filter((s) => s !== "subresources" && s !== "methods");
  return { top, opName: pascal(rest.join("_")) };
};

// ============================================================================
// CLI command
// ============================================================================

const command = Command.make(
  "spec-to-smithy",
  {
    specs: Flag.String("specs").pipe(
      Flag.withDefault("specs/spec-mirror-cloudflare/specs/api/resources"),
      Flag.withDescription("Directory of mirrored markdown specs"),
    ),
    out: Flag.String("out").pipe(
      Flag.withDefault(".generated-specs"),
      Flag.withDescription("Output directory for Smithy JSON models"),
    ),
    resource: Flag.String("resource").pipe(
      Flag.withDefault(""),
      Flag.withDescription("Only convert this top-level resource (e.g. ai)"),
    ),
    limit: Flag.Int("limit").pipe(
      Flag.withDefault(0),
      Flag.withDescription("Only convert the first N operations (0 = all)"),
    ),
  },
  (config) =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = path.resolve(import.meta.dir, "..");
      const specsDir = resolveSpecPath(root, config.specs);
      const outDir = path.resolve(root, config.out);

      yield* Console.log("🛠️  spec-to-smithy");
      yield* Console.log(`   Specs:  ${specsDir}`);
      yield* Console.log(`   Output: ${outDir}`);

      const pages = yield* walkMarkdown(specsDir);
      const isMethodPage = (f: string) =>
        f.replace(/\\/g, "/").includes("/methods/");
      const files = pages.filter(isMethodPage);
      const resourcePages = pages.filter((f) => !isMethodPage(f));
      yield* Console.log(
        `\n📄 Found ${files.length} method pages and ${resourcePages.length} resource pages.`,
      );

      // The models a resource's index pages define, shared by all its method
      // pages: subresources define most of them, and a reference can point at
      // any of them.
      const models = new Map<string, Map<string, ModelDef>>();
      for (const file of resourcePages) {
        const rel = file.slice(specsDir.length + 1);
        const top = opIdentity(rel).top;
        if (config.resource && top !== config.resource) continue;
        let into = models.get(top);
        if (!into) {
          into = new Map();
          models.set(top, into);
        }
        collectModels(yield* fs.readFileString(file), into);
      }

      // Group operations per top-level resource into one Bag each.
      const bags = new Map<string, Bag>();
      const serviceOps = new Map<string, { target: string }[]>();
      let converted = 0;
      let skipped = 0;

      for (const file of files) {
        if (config.limit > 0 && converted >= config.limit) break;
        const rel = file.slice(specsDir.length + 1);
        const { top, opName } = opIdentity(rel);
        if (config.resource && top !== config.resource) continue;
        modelRegistry = models.get(top) ?? new Map();

        const md = yield* fs.readFileString(file);
        const parsed = parseMarkdown(md);
        if (!parsed) {
          skipped++;
          yield* Console.warn(`⚠️  Could not parse ${rel} — skipping`);
          continue;
        }

        const ns = RESOURCE_NS(top);
        let bag = bags.get(top);
        if (!bag) {
          bag = newBag(ns);
          bags.set(top, bag);
          serviceOps.set(top, []);
        }

        try {
          for (const variant of splitDualScope(opName, parsed)) {
            const opId = buildOperation(bag, variant.opName, variant.parsed);
            serviceOps.get(top)!.push({ target: opId });
          }
          converted++;
        } catch (err) {
          skipped++;
          yield* Console.warn(
            `⚠️  Failed to convert ${rel}: ${err} — skipping`,
          );
        }
      }

      // Add a service shape (carrying the protocol) to each resource bag.
      for (const [top, bag] of bags) {
        const serviceName = pascal(top);
        const serviceId = `${bag.namespace}#${serviceName}`;
        bag.shapes[serviceId] = {
          type: "service",
          version: "4.0",
          operations: serviceOps.get(top),
          traits: {
            [`${PROTOCOL_NS}#v4Json`]: {},
            "smithy.api#title": `Cloudflare ${serviceName}`,
            "smithy.api#documentation":
              `Cloudflare API — ${top} resource. Speaks the v4 JSON envelope protocol; ` +
              "operation outputs describe the unwrapped `result` payload.",
          },
        };
      }

      // Write output.
      yield* fs.makeDirectory(outDir, { recursive: true });

      const protocolPath = path.join(outDir, "cloudflare.protocols.json");
      yield* fs.writeFileString(
        protocolPath,
        `${JSON.stringify(buildProtocolModel(), null, 2)}\n`,
      );

      const suppressions = {
        suppressions: [
          { id: "HttpUriConflict", namespace: "*" },
          { id: "HttpMethodSemantics", namespace: "*" },
          { id: "UnreferencedShape", namespace: "*" },
        ],
      };

      for (const [top, bag] of bags) {
        const model = {
          smithy: "2.0",
          metadata: suppressions,
          shapes: bag.shapes,
        };
        const fp = path.join(outDir, `${sanitizeNsSegment(top)}.json`);
        yield* fs.writeFileString(fp, `${JSON.stringify(model, null, 2)}\n`);
      }

      const convertedResources = new Set(
        [...bags.keys()].map((top) => sanitizeNsSegment(top)),
      );
      yield* Effect.promise(() =>
        finalizeConvert({
          root,
          outDir,
          exclude: (f) => f === "cloudflare.protocols.json",
          include: (resource) => convertedResources.has(resource),
          transform: (model, resource) => {
            const { families, removed } = dedupeScopeTwins(model);
            return families
              ? `♻️  ${resource}: collapsed ${families} scope-twin famil${families === 1 ? "y" : "ies"} (${removed} shapes)`
              : undefined;
          },
        }),
      );

      yield* Console.log(
        `\n✅ Done. ${converted} operations across ${bags.size} resources` +
          `${skipped ? `, ⚠️  ${skipped} skipped` : ""}.`,
      );
      yield* Console.log(`   Protocol model: ${protocolPath}`);
      yield* Console.log(`   Resource models: ${outDir}\\<resource>.json`);
    }),
).pipe(
  Command.withDescription(
    "Convert Cloudflare markdown API specs into Smithy 2.0 JSON models",
  ),
);

const program = Command.run(command, { version: "1.0.0" });

BunRuntime.runMain(Effect.provide(program, BunServices.layer));
