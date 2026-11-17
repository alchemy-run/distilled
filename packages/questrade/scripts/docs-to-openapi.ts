/**
 * Questrade documentation pages → one OpenAPI 3.0 document.
 *
 * Questrade publishes no machine-readable API description. The spec mirror
 * (`stacks/distilled-submodules/spec-repos/questrade`) transcribes each
 * documentation page into JSON blocks — headings, paragraphs, tables with
 * their "Nested property, level N." depth, code samples — and this module
 * reads them the way a person reading the docs would:
 *
 *   • Routes. The page title names the method and the route
 *     (`GET accounts/:id/orders[/:orderId]`; a `[...]` part is optional, so
 *     it names two routes). Every sample request line
 *     (`POST https://api01.iq.questrade.com/v1/accounts/90000004/orders/strategy/impact`)
 *     names one too, matched segment by segment against the title: a
 *     parameter position keeps the title's name, a literal the sample adds
 *     (`impact`) is kept, and parameters the sample leaves off the end
 *     (`GET /v1/symbols?ids=…` against `symbols/:id`) are dropped. Where a
 *     sample and the title disagree on the method of one route, the sample
 *     wins: it is the request the page actually shows.
 *   • Inputs. The first table (before the "Response" heading) lists the
 *     parameters. Route parameters bind to the path; on a GET the others are
 *     query parameters, otherwise they are JSON body members, joined by any
 *     member the sample request body shows that the table leaves out.
 *   • Outputs. The JSON sample response gives the shape — which keys are
 *     objects, which are lists, how they nest — and the response table gives
 *     each key its type, enumeration and description. A table row the
 *     sample leaves out joins the object its table siblings landed in. A
 *     list whose table row is followed by a type-name row
 *     (`orders` → `Order`) or says "List of Balance records" becomes a
 *     list of that named schema, shared by every page that names it.
 *   • Types. `Integer`, `Double`, `Boolean`, `String`, `DateTime` and
 *     `Enumeration` map to their JSON Schema types; an enumeration linked to
 *     a section of the Enumerations page gets that section's values. A
 *     sample value widens a documented `Integer` to a number when it has a
 *     fraction, and a sample `null` makes the member nullable.
 *
 * Nothing here names a Questrade operation, member or shape: the docs
 * contradict themselves in places (`side` typed `Integer`, a list row at the
 * wrong nesting depth), and every such fix is an RFC-6902 patch in
 * `patches/`, applied to the converted Smithy model.
 */
import * as fs from "node:fs";
import * as path from "node:path";

// ---------------------------------------------------------------------------
// Mirror format (written by spec-repos/questrade/fetch-specs.ts)
// ---------------------------------------------------------------------------

interface Row {
  readonly cells: readonly string[];
  readonly level?: number;
}

type Block =
  | {
      readonly type: "heading";
      readonly level: number;
      readonly id?: string;
      readonly text: string;
    }
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "listItem"; readonly text: string }
  | {
      readonly type: "table";
      readonly caption?: string;
      readonly columns: readonly string[];
      readonly rows: readonly Row[];
    }
  | { readonly type: "code"; readonly language?: string; readonly text: string };

interface Page {
  readonly url: string;
  readonly title: string;
  readonly summary?: string;
  readonly blocks: readonly Block[];
}

interface Manifest {
  readonly source: string;
  readonly pages: readonly {
    readonly path: string;
    readonly group?: string;
    readonly label: string;
    readonly file: string;
  }[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type Schema = Record<string, any>;

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
const OPERATION_TITLE = new RegExp(`^(${METHODS.join("|")})\\s+(\\S+)`);
const REQUEST_LINE = new RegExp(`^\\s*(${METHODS.join("|")})\\s+https?://[^/\\s]+(/\\S*)`, "gm");

/** A section of the Enumerations page, as linked from a description. */
const ENUM_LINK = /\]\([^)]*\/enumerations\/enumerations#([a-z0-9-]+)\)/i;
/** "List of Balance records." / "Input array of OptionIdFilter structures". */
const LIST_OF =
  /\b(?:list|array) of ([A-Z][A-Za-z0-9]*)(?= (?:records|elements|structures|objects)\b|\.|$)/;
/** A type-name row: `Order`, `ChainPerRoot` — PascalCase, no type or Complex. */
const TYPE_NAME = /^[A-Z][A-Za-z0-9]*$/;

const pascal = (text: string): string =>
  text
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");

/** Markdown-ish link text back to plain text, for descriptions. */
const plain = (text: string): string => text.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").trim();

const ISO_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

/**
 * Parse a sample from the docs. The samples are hand-typed and rarely valid
 * JSON: typographic quotes, `...` for elided entries, unquoted timestamps and
 * placeholders (`XXXXXXXX`), missing and trailing commas. Each of those is
 * repaired; a sample still unreadable after that is `undefined`.
 */
export const parseSample = (text: string): unknown => {
  const start = text.search(/[{[]/);
  if (start === -1) return undefined;
  let t = text
    .slice(start)
    .replace(/[“”″]/g, '"')
    .replace(/[‘’]/g, "'")
    // `...` stands for more entries of the same kind.
    .replace(/\.\.\./g, "")
    // `"creationTime": 2014-10-23T20:03:41.636000-04:00`
    .replace(/(:\s*)(\d{4}-\d{2}-\d{2}T[0-9:.+-]+)/g, '$1"$2"')
    // `"volume": 0.` at the end of a line
    .replace(/(\d)\.(\s*\n)/g, "$1$2")
    // `"symbolId":" 7413503,` — a quote opened before a number and never closed
    .replace(/(:\s*)"\s*(-?\d+(?:\.\d+)?)(\s*[,\n}])/g, "$1$2$3")
    // `"accountNumber": XXXXXXXX`
    .replace(/(:\s*)(?!true\b|false\b|null\b)([A-Za-z_][A-Za-z0-9_]*)(\s*[,\n}\]])/g, '$1"$2"$3');
  // A value followed on the next line by another key or entry: a missing comma.
  t = t.replace(/(["\d\]}]|\btrue|\bfalse|\bnull)(\s*\n\s*["{[])/g, "$1,$2");
  // Commas left before a closing bracket (also by the `...` removal).
  t = t.replace(/,(\s*[\]}])/g, "$1").replace(/,(\s*,)+/g, ",");
  // Text after the sample's closing bracket (a second request line, prose).
  let depth = 0;
  let inString = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (inString) {
      if (c === "\\") i++;
      else if (c === '"') inString = false;
    } else if (c === '"') inString = true;
    else if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") {
      depth--;
      if (depth === 0) {
        t = t.slice(0, i + 1);
        break;
      }
    }
  }
  try {
    return JSON.parse(t);
  } catch {
    return undefined;
  }
};

// ---------------------------------------------------------------------------
// Tables
// ---------------------------------------------------------------------------

/** One table row with its position in the table's nesting. */
interface Field {
  readonly name: string;
  readonly type: string;
  readonly description: string;
  readonly level: number;
  /** The nearest earlier row with a lower level. */
  readonly parent?: Field;
  /** Shared by the row's siblings: its parent row, or its table for a top-level row. */
  readonly group: object;
  /** A type-name row right after this one names its list element (`orders` → `Order`). */
  elementName?: string;
  /** Set once the field is placed into a schema. */
  placed?: boolean;
}

const columnIndex = (columns: readonly string[], pattern: RegExp, fallback: number): number => {
  const at = columns.findIndex((c) => pattern.test(c.trim()));
  return at === -1 ? fallback : at;
};

const fieldsOf = (table: Extract<Block, { type: "table" }>): Field[] => {
  const name = columnIndex(table.columns, /^(parameter|name|propert(y|ies))$/i, 0);
  const type = columnIndex(table.columns, /^t[iy]pe$/i, 1);
  const description = columnIndex(table.columns, /^description$/i, table.columns.length - 1);
  const fields: Field[] = [];
  const stack: Field[] = [];
  const top = {};
  for (const row of table.rows) {
    const level = row.level ?? 1;
    while (stack.length > 0 && stack.at(-1)!.level >= level) stack.pop();
    const field: Field = {
      name: (row.cells[name] ?? "").trim(),
      type: (row.cells[type] ?? "").trim(),
      description: (row.cells[description < 0 ? row.cells.length - 1 : description] ?? "").trim(),
      level,
      ...(stack.length > 0 ? { parent: stack.at(-1) } : {}),
      group: stack.at(-1) ?? top,
    };
    if (field.name === "") continue;
    const previous = fields.at(-1);
    if (previous !== undefined && isTypeName(field) && !isTypeName(previous)) {
      previous.elementName ??= field.name;
    }
    fields.push(field);
    stack.push(field);
  }
  return fields;
};

/** A row that names a type rather than a member (`Order`, `Balance`). */
const isTypeName = (field: Field): boolean =>
  TYPE_NAME.test(field.name) && /^(complex|array|)$/i.test(field.type);

/** A row whose description says it is a list ("List of trading venue codes."). */
const LIST_ROW = /^(?:input )?(?:list|array) of\b/i;

/** A list row whose element type is a type-name row of the same table. */
const isContainer = (field: Field, fields: readonly Field[]): boolean => {
  const element = elementNameOf(field);
  return element !== undefined && fields.some((f) => f.name === element && isTypeName(f));
};

/** The type a list row's elements have, by name: `orders` → `Order`. */
const elementNameOf = (field: Field | undefined): string | undefined =>
  field?.elementName ?? LIST_OF.exec(field?.description ?? "")?.[1];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

class Converter {
  /** Enumerations page section id → component name. */
  readonly enumByAnchor = new Map<string, string>();
  /** Named object schemas (`Order`, `Balance`), shared across pages. */
  readonly components: Record<string, Schema> = {};
  /**
   * Every page's response list rows, for a response list a page samples but
   * does not describe (`orders` in an order-placement response → `Order`).
   * Only consulted while {@link output} is set: request bodies name their own
   * element types.
   */
  readonly elementNames = new Map<string, string>();
  output = false;

  /** The JSON Schema for a documented scalar type, or undefined for structure. */
  scalar(field: Field): Schema | undefined {
    const type = field.type.toLowerCase().replace(/\s+/g, "");
    const anchor = ENUM_LINK.exec(field.description)?.[1];
    const enumName = anchor !== undefined ? this.enumByAnchor.get(anchor) : undefined;
    // A member whose description points at an enumeration takes its values,
    // whatever type the row declares (`side`: "Integer", "See Order Side").
    if (enumName !== undefined) return { $ref: `#/components/schemas/${enumName}` };
    switch (type) {
      case "string":
      case "enum":
      case "enumeration":
        return { type: "string" };
      case "integer":
      case "int":
      case "long":
      case "uint64":
        return { type: "integer" };
      case "double":
      case "decimal":
      case "float":
      case "number":
        return { type: "number" };
      case "boolean":
      case "bool":
        return { type: "boolean" };
      case "datetime":
      case "date":
        return { type: "string", format: "date-time" };
      case "integer[]":
        return { type: "array", items: { type: "integer" } };
      default:
        return undefined;
    }
  }

  /** The JSON Schema a sample value implies on its own. */
  sampleScalar(value: unknown): Schema {
    if (typeof value === "string") {
      return ISO_DATE_TIME.test(value)
        ? { type: "string", format: "date-time" }
        : { type: "string" };
    }
    if (typeof value === "number") return { type: Number.isInteger(value) ? "integer" : "number" };
    if (typeof value === "boolean") return { type: "boolean" };
    return {};
  }

  /** Add a named object schema, or merge new members into the existing one. */
  component(name: string, schema: Schema): Schema {
    const existing = this.components[name];
    if (existing === undefined) {
      this.components[name] = schema;
    } else {
      for (const [key, value] of Object.entries(schema.properties ?? {})) {
        existing.properties[key] ??= value;
      }
    }
    return { $ref: `#/components/schemas/${name}` };
  }

  /** A documented member's schema, from its table row and (if any) a sample value. */
  member(key: string, field: Field | undefined, value: unknown, fields: readonly Field[]): Schema {
    const description = field ? plain(field.description) : "";
    let schema: Schema;
    if (Array.isArray(value)) {
      schema = this.list(key, field, value, fields);
    } else if (value !== null && typeof value === "object") {
      schema = this.object(value as Record<string, unknown>, fields, field);
    } else {
      const documented = field ? this.scalar(field) : undefined;
      const sampled = this.sampleScalar(value);
      if (documented === undefined) {
        schema = field && value === undefined ? this.fromTable(field, fields) : sampled;
      } else if (documented.type === "integer" && sampled.type === "number") {
        // A documented Integer the sample shows with a fraction (a price).
        schema = { type: "number" };
      } else {
        schema = documented;
      }
    }
    if (value === null) schema = { ...schema, nullable: true };
    if (description !== "" && schema.$ref === undefined) schema = { ...schema, description };
    else if (description !== "")
      schema = { allOf: [schema], description, ...(schema.nullable ? { nullable: true } : {}) };
    return schema;
  }

  /** A list: its elements from the sample, or the named type the table gives. */
  list(
    key: string,
    field: Field | undefined,
    value: readonly unknown[],
    fields: readonly Field[],
  ): Schema {
    const elementName =
      elementNameOf(field) ??
      (field === undefined && this.output ? this.elementNames.get(key) : undefined);
    const objects = value.filter(
      (v): v is Record<string, unknown> => v !== null && typeof v === "object" && !Array.isArray(v),
    );
    if (objects.length > 0) {
      const merged: Record<string, unknown> = {};
      for (const o of objects)
        for (const [k, v] of Object.entries(o))
          if (!(k in merged) || merged[k] === null) merged[k] = v;
      const marker =
        elementName !== undefined
          ? fields.find((f) => f.name === elementName && isTypeName(f))
          : undefined;
      const items = this.object(merged, fields, marker ?? field, true);
      return {
        type: "array",
        items: elementName !== undefined ? this.component(elementName, items) : items,
      };
    }
    const scalar = value.find((v) => v !== null);
    if (scalar !== undefined) return { type: "array", items: this.sampleScalar(scalar) };
    if (elementName !== undefined) {
      const marker = fields.find((f) => f.name === elementName && isTypeName(f));
      if (marker !== undefined && fields.some((f) => f.parent === marker)) {
        return {
          type: "array",
          items: this.component(elementName, this.fromTable(marker, fields)),
        };
      }
      return { type: "array", items: { $ref: `#/components/schemas/${elementName}` } };
    }
    return { type: "array", items: {} };
  }

  /**
   * An object from a sample. Keys take their type from the table row of the
   * same name — the one under `scope` (the row the object belongs to) when
   * the table nests it, else any row of that name. Table rows the sample
   * leaves out join the object when their siblings did — except, in a list
   * element, a row that is itself a list of a type the table names: that is
   * the list holding the element, flattened to the same depth.
   */
  object(
    value: Record<string, unknown>,
    fields: readonly Field[],
    scope?: Field,
    element = false,
  ): Schema {
    const properties: Record<string, Schema> = {};
    const matched: Field[] = [];
    for (const [key, v] of Object.entries(value)) {
      const field = this.lookup(key, fields, scope, !element && scope === undefined);
      if (field) {
        field.placed = true;
        matched.push(field);
      }
      properties[key] = this.member(key, field, v, fields);
    }
    const groups = new Set(matched.map((f) => f.group));
    for (const field of fields) {
      if (field.placed || isTypeName(field) || !groups.has(field.group)) continue;
      if (field.name in properties) continue;
      if (element && isContainer(field, fields)) continue;
      field.placed = true;
      properties[field.name] = this.member(field.name, field, undefined, fields);
    }
    return { type: "object", properties };
  }

  /**
   * The table row for a sample key. At the root of a response only a
   * top-level row matches: a key the table does not list there is not the
   * nested row of the same name (`symbol` beside `symbols[].symbol`).
   */
  lookup(
    name: string,
    fields: readonly Field[],
    scope: Field | undefined,
    root: boolean,
  ): Field | undefined {
    const candidates = fields.filter(
      (f) => f.name === name && !isTypeName(f) && (!root || f.parent === undefined),
    );
    if (candidates.length <= 1 || scope === undefined) return candidates[0];
    const under = (f: Field): boolean => {
      for (let p = f.parent; p !== undefined; p = p.parent) if (p === scope) return true;
      return false;
    };
    return candidates.find(under) ?? candidates[0];
  }

  /** An object described only by the table: its child rows become members. */
  fromTable(field: Field, fields: readonly Field[]): Schema {
    const children = fields.filter((f) => f.parent === field);
    const elementName = elementNameOf(field);
    if (
      elementName !== undefined &&
      field.elementName === undefined &&
      !TYPE_NAME.test(field.name)
    ) {
      return { type: "array", items: { $ref: `#/components/schemas/${elementName}` } };
    }
    if (children.length === 0) return /^complex$/i.test(field.type) ? { type: "object" } : {};
    if (LIST_ROW.test(field.description) && children.length === 1) {
      return {
        type: "array",
        items: this.member(children[0]!.name, children[0], undefined, fields),
      };
    }
    const marker = children.find(isTypeName);
    if (marker !== undefined && !isTypeName(field)) {
      const items = this.fromTable(marker, fields);
      return { type: "array", items: this.component(marker.name, items) };
    }
    const properties: Record<string, Schema> = {};
    for (const child of children) {
      if (isTypeName(child)) continue;
      child.placed = true;
      properties[child.name] = this.member(child.name, child, undefined, fields);
    }
    return { type: "object", properties };
  }

  /** An output or body from the table alone (a page with no sample). */
  tableObject(fields: readonly Field[]): Schema {
    const properties: Record<string, Schema> = {};
    for (const field of fields) {
      if (field.parent !== undefined || isTypeName(field)) continue;
      properties[field.name] = this.member(field.name, field, undefined, fields);
    }
    return { type: "object", properties };
  }
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

type Segment = { readonly literal: string } | { readonly param: string };

const segmentsOf = (route: string): Segment[] =>
  route
    .split("/")
    .filter(Boolean)
    .map((s) => (s.startsWith(":") ? { param: s.slice(1) } : { literal: s }));

const render = (segments: readonly Segment[]): string =>
  `/v1/${segments.map((s) => ("param" in s ? `{${s.param}}` : s.literal)).join("/")}`;

/** `accounts/:id/orders[/:orderId]` → both routes. */
const titleRoutes = (route: string): Segment[][] => {
  const optional = /\[([^\]]*)\]/.exec(route);
  if (optional === null) return [segmentsOf(route)];
  const base = route.replace(optional[0], "");
  return [segmentsOf(base), segmentsOf(base + optional[1])];
};

/** A sample request path, read against the title's route. */
const matchSample = (template: readonly Segment[], samplePath: string): Segment[] => {
  const sample = samplePath
    .replace(/^\/v1\//, "")
    .split("?")[0]!
    .split("/")
    .filter(Boolean);
  const out: Segment[] = [];
  sample.forEach((segment, i) => {
    const t = template[i];
    if (t !== undefined && "param" in t) out.push(t);
    else out.push({ literal: decodeURIComponent(segment) });
  });
  return out;
};

interface Route {
  method: string;
  path: string;
  params: string[];
  /** Sample request bodies shown for this route. */
  bodies: unknown[];
}

// ---------------------------------------------------------------------------
// Pages → OpenAPI
// ---------------------------------------------------------------------------

export interface DocsToOpenApiResult {
  readonly spec: Record<string, any>;
  readonly warnings: readonly string[];
}

export const docsToOpenApi = (specsDir: string): DocsToOpenApiResult => {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(specsDir, "_manifest.json"), "utf8"),
  ) as Manifest;
  const read = (file: string): Page =>
    JSON.parse(fs.readFileSync(path.join(specsDir, file), "utf8"));
  const warnings: string[] = [];
  const c = new Converter();

  // ---- Enumerations ----
  for (const entry of manifest.pages) {
    if (!entry.path.endsWith("/enumerations")) continue;
    let heading: Extract<Block, { type: "heading" }> | undefined;
    for (const block of read(entry.file).blocks) {
      if (block.type === "heading") heading = block;
      if (block.type !== "table" || heading?.id === undefined) continue;
      const rows = block.columns.length === 0 ? block.rows.slice(1) : block.rows;
      const values = rows.map((r) => r.cells[0]!.trim()).filter(Boolean);
      const name = pascal(heading.text);
      c.enumByAnchor.set(heading.id, name);
      c.components[name] = { type: "string", enum: values, description: plain(heading.text) };
    }
  }
  if (c.enumByAnchor.size === 0)
    throw new Error("docs: the Enumerations page has no enumeration tables");

  // ---- Operation pages ----
  const operations = manifest.pages
    .map((entry) => ({ entry, page: read(entry.file) }))
    .filter(({ page }) => OPERATION_TITLE.test(page.title));

  // List rows across every page, so a page that samples `orders` without
  // describing it still gets `Order`.
  const pageFields = new Map<Page, { request: Field[]; types: Field[]; response: Field[] }>();
  for (const { page } of operations) {
    const request: Field[] = [];
    const types: Field[] = [];
    const response: Field[] = [];
    let inResponse = false;
    let tables = 0;
    for (const block of page.blocks) {
      if (block.type === "heading" && /response/i.test(block.text)) inResponse = true;
      if (block.type !== "table") continue;
      const fields = fieldsOf(block);
      if (inResponse) response.push(...fields);
      else if (tables === 0) request.push(...fields);
      else types.push(...fields);
      tables++;
    }
    pageFields.set(page, { request, types, response });
    for (const f of response) {
      const element = elementNameOf(f);
      if (element === undefined || TYPE_NAME.test(f.name)) continue;
      // A name two pages list with different elements (`symbols`) says nothing.
      const seen = c.elementNames.get(f.name);
      c.elementNames.set(f.name, seen === undefined || seen === element ? element : "");
    }
  }
  for (const [name, element] of c.elementNames) if (element === "") c.elementNames.delete(name);

  const paths: Record<string, Record<string, any>> = {};
  for (const { entry, page } of operations) {
    const [, titleMethod, titleRoute] = OPERATION_TITLE.exec(page.title)!;
    const templates = titleRoutes(titleRoute!);
    const { request, types, response } = pageFields.get(page)!;

    // ---- Routes: the title's, and every sample request's ----
    const routes = new Map<string, Route>();
    const add = (method: string, segments: readonly Segment[]): Route => {
      const p = render(segments);
      const key = `${method} ${p}`;
      let route = routes.get(key);
      if (route === undefined) {
        route = {
          method,
          path: p,
          params: segments.flatMap((s) => ("param" in s ? [s.param] : [])),
          bodies: [],
        };
        routes.set(key, route);
      }
      return route;
    };
    for (const block of page.blocks) {
      if (block.type !== "code") continue;
      const lines = [...block.text.matchAll(REQUEST_LINE)];
      if (lines.length === 0) continue;
      const body = parseSample(block.text.slice(lines.at(-1)!.index! + lines.at(-1)![0].length));
      for (const [, method, samplePath] of lines) {
        const longest = templates.at(-1)!;
        const route = add(method!, matchSample(longest, samplePath!));
        if (body !== undefined) route.bodies.push(body);
      }
    }
    for (const template of templates) {
      const p = render(template);
      if (![...routes.values()].some((r) => r.path === p)) add(titleMethod!, template);
    }

    // ---- Sample responses, assigned to routes by the literal they mention ----
    const samples: { heading: string; value: unknown }[] = [];
    let heading = "";
    for (const block of page.blocks) {
      if (block.type === "heading") heading = block.text;
      if (block.type !== "code" || REQUEST_LINE.test(block.text) || !/response/i.test(heading)) {
        REQUEST_LINE.lastIndex = 0;
        continue;
      }
      REQUEST_LINE.lastIndex = 0;
      const value = parseSample(block.text);
      if (value === undefined)
        warnings.push(`${page.title}: unreadable sample response under "${heading}"`);
      else samples.push({ heading, value });
    }
    const literalsOf = (r: Route) =>
      r.path.split("/").filter((s) => s !== "" && !s.startsWith("{"));
    const sampleFor = (route: Route): unknown => {
      if (samples.length <= 1) return samples[0]?.value;
      const others = [...routes.values()].filter((r) => r !== route);
      const own = literalsOf(route).filter((l) => !others.every((o) => literalsOf(o).includes(l)));
      const mine = samples.find((s) =>
        own.some((l) => s.heading.toLowerCase().includes(l.toLowerCase())),
      );
      if (mine !== undefined) return mine.value;
      // The sample that no other route claims.
      const claimed = (s: (typeof samples)[number]) =>
        others.some((o) =>
          literalsOf(o)
            .filter((l) => !literalsOf(route).includes(l))
            .some((l) => s.heading.toLowerCase().includes(l.toLowerCase())),
        );
      return samples.find((s) => !claimed(s))?.value ?? samples[0]!.value;
    };

    const allParams = new Set([...routes.values()].flatMap((r) => r.params));
    const requestTop = request.filter((f) => f.level === 1 && !isTypeName(f));
    // The converter prints `summary` and then `description`: the summary's
    // first paragraph goes in the one, the rest of the page's prose in the other.
    const [summary, ...summaryRest] = (page.summary ?? page.title).split(/\n\s*\n/);
    const description = [
      ...summaryRest,
      ...page.blocks.flatMap((b) =>
        (b.type === "paragraph" || b.type === "listItem") &&
        !/^no parameters\.?$/i.test(b.text) &&
        !(page.summary ?? "").includes(b.text)
          ? [plain(b.text)]
          : [],
      ),
      `Documentation: ${page.url}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    for (const route of routes.values()) {
      const parameters: any[] = route.params.map((name) => {
        const field = requestTop.find((f) => f.name === name);
        const schema = (field && c.scalar(field)) ?? { type: "string" };
        return {
          name,
          in: "path",
          required: true,
          schema: schema.type === "string" && schema.format ? { type: "string" } : schema,
          ...(field ? { description: plain(field.description) } : {}),
        };
      });
      let requestBody: any;
      const inputs = requestTop.filter((f) => !allParams.has(f.name));
      if (route.method === "GET" || route.method === "DELETE") {
        for (const field of inputs) {
          const scalar = c.scalar(field);
          parameters.push({
            name: field.name,
            in: "query",
            // A list the docs call "comma-separated" is one string on the wire.
            schema: scalar !== undefined && scalar.type !== "array" ? scalar : { type: "string" },
            description: plain(field.description),
          });
        }
      } else {
        const merged: Record<string, unknown> = {};
        for (const body of route.bodies) {
          if (body === null || typeof body !== "object" || Array.isArray(body)) continue;
          for (const [k, v] of Object.entries(body))
            if (!allParams.has(k) && !(k in merged)) merged[k] = v;
        }
        const fields = [...request.filter((f) => !allParams.has(f.name)), ...types];
        for (const f of fields) f.placed = false;
        c.output = false;
        const schema = c.object(merged, fields);
        for (const field of inputs) {
          schema.properties[field.name] ??= c.member(field.name, field, undefined, fields);
        }
        if (Object.keys(schema.properties).length > 0) {
          requestBody = {
            required: true,
            content: { "application/json": { schema } },
          };
        }
      }

      const sample = sampleFor(route);
      for (const f of response) f.placed = false;
      c.output = true;
      const output =
        sample !== undefined &&
        sample !== null &&
        typeof sample === "object" &&
        !Array.isArray(sample)
          ? c.object(sample as Record<string, unknown>, response)
          : response.length > 0
            ? c.tableObject(response)
            : undefined;
      if (output === undefined) {
        warnings.push(
          `${route.method} ${route.path}: no response table or sample — output is untyped`,
        );
      }

      const operation = {
        summary,
        description,
        tags: entry.group !== undefined ? [entry.group] : [],
        externalDocs: { url: page.url },
        parameters,
        ...(requestBody !== undefined ? { requestBody } : {}),
        responses: {
          "200": {
            description: "OK",
            content: { "application/json": { schema: output ?? {} } },
          },
        },
      };
      paths[route.path] ??= {};
      if (paths[route.path]![route.method.toLowerCase()] !== undefined) {
        throw new Error(`docs: two pages describe ${route.method} ${route.path}`);
      }
      paths[route.path]![route.method.toLowerCase()] = operation;
    }
  }

  return {
    spec: {
      openapi: "3.0.3",
      info: {
        title: "Questrade API",
        version: "1",
        description: `Generated from the Questrade API documentation at ${manifest.source}`,
      },
      servers: [{ url: "https://api01.iq.questrade.com" }],
      paths,
      components: { schemas: c.components },
    },
    warnings,
  };
};
