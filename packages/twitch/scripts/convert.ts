#!/usr/bin/env -S node --conditions=bun
/**
 * convert -- the Twitch API reference -> Smithy JSON models in .generated-specs.
 *
 * Twitch publishes no machine-readable description of the Helix API. Its
 * reference (https://dev.twitch.tv/docs/api/reference/) is mirrored as the
 * Markdown twins of its pages, one per resource, at
 * `specs/spec-mirror-twitch/specs/api/reference/<resource>.md` and listed in
 * `specs/_manifest.json` (see the mirror's fetch-specs.ts). Every operation is
 * written the same way:
 *
 *   ## Send Chat Message {#send-chat-message}   <- one section per operation
 *   <prose>
 *   ### Endpoint            `POST https://api.twitch.tv/helix/chat/messages`
 *   ### Authorization       the token type and scopes, as prose
 *   ### Query Parameters    - `name` — Type[, **Required**][, Nullable]. Description
 *   ### Request Body        the same, nested by dotted names (`data.drop_reason.code`)
 *   ### Response Body       the same, for the 2xx JSON body
 *   ### Response Codes      - **200 OK** — Description
 *
 * This script reads those sections into one OpenAPI 3.0 document per page
 * ({@link pageToOpenApi}), converts each through the shared converter
 * (`convertOpenApiToSmithy`), stamps cursor pagination ({@link paginationFor}),
 * and finalizes. One model -- one service module -- per page: `chat`,
 * `channel-points` -> `channel_points`.
 *
 * The reading rules, all structural:
 *
 *   - The operation's name is its heading, camelCased: `Get Users` ->
 *     `getUsers`, which is already verbNoun. Its documentation is the prose
 *     under the heading plus the Authorization section.
 *   - Field types are the reference's own words: String, Integer, Int64,
 *     Float, Boolean, Object, Object[], String[], `map[string]Object`,
 *     `map[string]string`, and named object arrays (`Session[]`). An unknown
 *     type fails the run.
 *   - `**Required**` marks a required member; `Nullable` a nullable one.
 *   - A dotted name (`data.drop_reason.code`) is a member of the field named
 *     by its prefix; under an array field it is a member of the items.
 *   - A query parameter is repeatable (an array) when its description says so
 *     the way the reference always does: "include this parameter for each",
 *     "To specify more than one", "You may specify a maximum of N".
 *   - The success status is the first 2xx in Response Codes; its body is the
 *     Response Body section, or none.
 *   - Failures dispatch by status through core's shared map (src/errors.ts),
 *     so no per-operation error classes are generated.
 *
 * Anything this cannot read fails the run rather than dropping an operation.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const root = path.resolve(import.meta.dirname, "..");
const SPEC_ROOT = "specs/spec-mirror-twitch/specs";
const outDir = path.join(root, ".generated-specs");
const API_BASE = "https://api.twitch.tv/helix";

// ---------------------------------------------------------------------------
// Markdown sections
// ---------------------------------------------------------------------------

interface Section {
  readonly title: string;
  readonly anchor: string;
  readonly prose: string;
  /** `### <name>` subsections, by name, as their lines. */
  readonly parts: ReadonlyMap<string, readonly string[]>;
}

const OPERATION_HEADING = /^## (.+?) \{#([a-z0-9-]+)\}\s*$/;

/** Every `## <title> {#anchor}` section that has an `### Endpoint`. */
const readSections = (markdown: string): Section[] => {
  const lines = markdown.split("\n");
  const sections: Section[] = [];
  for (let i = 0; i < lines.length; i++) {
    const heading = OPERATION_HEADING.exec(lines[i]!);
    if (!heading) continue;
    let end = i + 1;
    while (end < lines.length && !lines[end]!.startsWith("## ")) end++;
    const body = lines.slice(i + 1, end);
    const parts = new Map<string, string[]>();
    const prose: string[] = [];
    let current: string[] | undefined;
    for (const line of body) {
      const sub = /^### (.+?)\s*$/.exec(line);
      if (sub) {
        current = [];
        parts.set(sub[1]!, current);
        continue;
      }
      (current ?? prose).push(line);
    }
    if (parts.has("Endpoint")) {
      sections.push({
        title: heading[1]!.trim(),
        anchor: heading[2]!,
        prose: prose.join("\n").trim(),
        parts,
      });
    }
  }
  return sections;
};

/** Markdown escapes the reference writes in prose (`broadcaster\_id`). */
const unescape = (text: string): string => text.replace(/\\([_*\\[\]`#])/g, "$1");

// ---------------------------------------------------------------------------
// Fields
// ---------------------------------------------------------------------------

interface Field {
  /** The dotted name, as written (`data.drop_reason.code`). */
  readonly name: string;
  readonly type: string;
  readonly required: boolean;
  readonly nullable: boolean;
  readonly description: string;
}

const FIELD_LINE = /^(\s*)- `([^`]+)` — (.*)$/;

/**
 * The `- \`name\` — Type, flags. Description` lines of a section, each with its
 * continuation lines (more deeply indented text, including value lists) folded
 * into the description. A field is top level or has a dotted name.
 */
const readFields = (lines: readonly string[], where: string): Field[] => {
  const fields: Field[] = [];
  let open: { field: Field; indent: number; extra: string[] } | undefined;
  const close = () => {
    if (!open) return;
    const description = [open.field.description, ...open.extra]
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    fields.push({ ...open.field, description: unescape(description) });
    open = undefined;
  };
  for (const line of lines) {
    const match = FIELD_LINE.exec(line);
    // A field is either top level or named by a dotted path under its parent; an
    // indented `- \`VALUE\` — ...` bullet is a value list inside a description.
    const isField =
      match !== null &&
      (match[1]!.length === 0 || match[2]!.includes(".")) &&
      /^[A-Za-z0-9_.]+$/.test(match[2]!);
    if (match && isField) {
      close();
      const [head, ...rest] = match[3]!.split(/\.\s/);
      // "String, **Required**, Nullable" -- the type, then flags in any order.
      const words = head!.replace(/\.$/, "").split(/,\s*/);
      const type = words[0]!.trim();
      const flags = words.slice(1).map((w) => w.trim());
      for (const flag of flags) {
        if (flag !== "**Required**" && flag !== "Nullable") {
          throw new Error(`${where}: \`${match[2]}\`: unknown flag "${flag}"`);
        }
      }
      open = {
        indent: match[1]!.length,
        field: {
          name: match[2]!,
          type,
          required: flags.includes("**Required**"),
          nullable: flags.includes("Nullable"),
          description: rest.join(". ").trim(),
        },
        extra: [],
      };
      continue;
    }
    if (open) open.extra.push(line.replace(/^\s+/, ""));
  }
  close();
  return fields;
};

/** A field name: dotted identifiers (value lists in descriptions are not fields). */
const isFieldName = (name: string): boolean =>
  /^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/.test(name);

/** The schema for one of the reference's type words. */
const schemaForType = (type: string, where: string): Record<string, any> => {
  switch (type) {
    case "String":
      return { type: "string" };
    case "Integer":
      return { type: "integer", format: "int32" };
    case "Int64":
      return { type: "integer", format: "int64" };
    case "Float":
      return { type: "number" };
    case "Boolean":
      return { type: "boolean" };
    case "Object":
      return { type: "object", properties: {} };
    case "String[]":
      return { type: "array", items: { type: "string" } };
    case "map[string]string":
      return { type: "object", additionalProperties: { type: "string" } };
    case "map[string]Object":
      return { type: "object", additionalProperties: { type: "object", properties: {} } };
    default:
      // `Object[]`, and arrays of a named object (`Session[]`, `Invite[]`)
      if (/^[A-Z][A-Za-z]*\[\]$/.test(type)) {
        return { type: "array", items: { type: "object", properties: {} } };
      }
      throw new Error(`${where}: unknown type "${type}"`);
  }
};

/** The object (or, for a map, value) schema a dotted name's children go in. */
const containerOf = (schema: Record<string, any>): Record<string, any> | undefined => {
  if (schema.type === "array" && schema.items?.type === "object") return schema.items;
  if (schema.type === "object" && schema.properties) return schema;
  if (schema.type === "object" && typeof schema.additionalProperties === "object") {
    return schema.additionalProperties.type === "object" ? schema.additionalProperties : undefined;
  }
  return undefined;
};

/**
 * An object schema from fields named with dotted paths. A field's parent is the
 * longest dotted prefix of its name that is an object or array field; the rest is the
 * member's name, which may hold a dot of its own (`images.dark.static.1.5`:
 * the 1.5x image).
 */
const objectFromFields = (fields: readonly Field[], where: string): Record<string, any> => {
  const rootSchema: Record<string, any> = { type: "object", properties: {} };
  const byName = new Map<string, Record<string, any>>();
  for (const field of fields) {
    if (!/^[A-Za-z0-9_]+(\.[A-Za-z0-9_]+)*$/.test(field.name)) {
      throw new Error(`${where}: unreadable field name "${field.name}"`);
    }
    const segments = field.name.split(".");
    let parent = rootSchema;
    let name = field.name;
    for (let cut = segments.length - 1; cut >= 1; cut--) {
      const prefix = segments.slice(0, cut).join(".");
      const owner = byName.get(prefix);
      // a scalar prefix is a sibling (`animated.1` beside `animated.1.5`), not a parent
      const container = owner && containerOf(owner);
      if (!container) continue;
      parent = container;
      name = segments.slice(cut).join(".");
      break;
    }
    if (parent === rootSchema && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
      throw new Error(`${where}: "${field.name}" has no field above it`);
    }
    const schema = schemaForType(field.type, `${where}: ${field.name}`);
    if (field.description) schema.description = field.description;
    if (field.nullable) schema.nullable = true;
    parent.properties ??= {};
    if (parent.properties[name] !== undefined) {
      throw new Error(`${where}: "${field.name}" is described twice`);
    }
    parent.properties[name] = schema;
    if (field.required) (parent.required ??= []).push(name);
    byName.set(field.name, schema);
  }
  return rootSchema;
};

/** The reference's ways of saying a query parameter may be given more than once. */
const REPEATABLE =
  /include (?:the \*?[A-Za-z_]+\*? |this )?parameter for each|to (?:specify|get) more than one|you may specify a maximum of \d+/i;

// ---------------------------------------------------------------------------
// Page -> OpenAPI
// ---------------------------------------------------------------------------

/** `Send a Shoutout` -> `sendAShoutout`. */
const operationIdFor = (title: string): string => {
  const words = title
    .replace(/[^A-Za-z0-9 ]+/g, " ")
    .trim()
    .split(/\s+/);
  return words
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("");
};

const STATUS_LINE = /^- \*\*(\d{3})[^*]*\*\*(?:\s*—\s*(.*))?$/;

const pageToOpenApi = (markdown: string, file: string, url: string): Record<string, any> => {
  const paths: Record<string, Record<string, unknown>> = {};
  for (const section of readSections(markdown)) {
    const where = `${file}: ${section.title}`;
    const endpoint = /`([A-Z]+) (https:\/\/\S+?)`/.exec(
      (section.parts.get("Endpoint") ?? []).join("\n"),
    );
    if (!endpoint) throw new Error(`${where}: no \`METHOD URL\` under ### Endpoint`);
    const [, method, address] = endpoint;
    if (!address!.startsWith(`${API_BASE}/`))
      throw new Error(`${where}: endpoint outside ${API_BASE}: ${address}`);
    const uri = address!.slice(API_BASE.length);
    if (/[{}?]/.test(uri)) throw new Error(`${where}: unexpected path template ${uri}`);

    const parameters = readFields(
      section.parts.get("Query Parameters") ?? [],
      `${where}: query`,
    ).map((field) => {
      if (!isFieldName(field.name) || field.name.includes(".")) {
        throw new Error(`${where}: unreadable query parameter "${field.name}"`);
      }
      let schema = schemaForType(field.type, `${where}: ${field.name}`);
      if (REPEATABLE.test(field.description) && schema.type !== "array") {
        schema = { type: "array", items: schema };
      }
      return {
        name: field.name,
        in: "query",
        required: field.required,
        description: field.description,
        schema,
      };
    });

    const statuses: { code: string; description: string }[] = [];
    for (const line of section.parts.get("Response Codes") ?? []) {
      const status = STATUS_LINE.exec(line.trim());
      if (status) statuses.push({ code: status[1]!, description: unescape(status[2] ?? "") });
    }
    const success = statuses.find((s) => s.code.startsWith("2"))?.code ?? "200";
    const responseFields = readFields(
      section.parts.get("Response Body") ?? [],
      `${where}: response`,
    );
    const responses: Record<string, unknown> = {};
    for (const status of statuses) {
      if (status.code === success) continue;
      responses[status.code] ??= { description: status.description || status.code };
    }
    responses[success] =
      responseFields.length > 0
        ? {
            description: statuses.find((s) => s.code === success)?.description || "OK",
            content: {
              "application/json": {
                schema: objectFromFields(responseFields, `${where}: response`),
              },
            },
          }
        : { description: statuses.find((s) => s.code === success)?.description || "No content" };

    const authorization = (section.parts.get("Authorization") ?? []).join("\n").trim();
    const operation: Record<string, unknown> = {
      operationId: operationIdFor(section.title),
      summary: section.title,
      description: unescape(
        [
          section.prose,
          authorization && `Authorization:\n\n${authorization}`,
          `Reference: ${url.replace(/\.md$/, "/")}#${section.anchor}`,
        ]
          .filter(Boolean)
          .join("\n\n"),
      ),
      parameters,
      responses,
    };
    const bodyFields = readFields(
      section.parts.get("Request Body") ?? [],
      `${where}: request body`,
    );
    if (bodyFields.length > 0) {
      operation.requestBody = {
        required: bodyFields.some((f) => f.required),
        content: {
          "application/json": { schema: objectFromFields(bodyFields, `${where}: request body`) },
        },
      };
    }
    const item = (paths[uri] ??= {});
    const key = method!.toLowerCase();
    if (item[key] !== undefined) throw new Error(`${where}: duplicate route ${method} ${uri}`);
    item[key] = operation;
  }
  if (Object.keys(paths).length === 0) throw new Error(`${file}: no operations`);
  return {
    openapi: "3.0.3",
    info: { title: `Twitch API: ${path.basename(file, ".md")}`, version: "helix" },
    servers: [{ url: API_BASE }],
    paths,
  };
};

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

/**
 * Helix pages by cursor: the `after` query parameter in, `pagination.cursor`
 * out (absent or empty on the last page), with the items in the response's
 * first array member (`data`) and the page size in `first`. Two shapes vary:
 * a few endpoints return the cursor as a bare `pagination` string, and a few
 * keep the items one object down (`data.segments`). The converter's own
 * detection expects the input to be named `cursor`, so the trait is stamped
 * here, from the operation itself: an endpoint that stops paging upstream
 * stops being stamped.
 */
const paginationFor = (op: any): Record<string, string> | undefined => {
  const query = (op.parameters ?? []).filter((p: any) => p.in === "query");
  if (!query.some((p: any) => p.name === "after")) return undefined;
  const success = Object.entries<any>(op.responses ?? {}).find(([code]) =>
    code.startsWith("2"),
  )?.[1];
  const props = success?.content?.["application/json"]?.schema?.properties;
  const pagination = props?.pagination;
  let outputToken: string | undefined;
  if (pagination?.properties?.cursor !== undefined) outputToken = "pagination.cursor";
  else if (pagination?.type === "string") outputToken = "pagination";
  if (outputToken === undefined) return undefined;
  const members = Object.entries<any>(props).filter(([name]) => name !== "pagination");
  let items = members.find(([, value]) => value?.type === "array")?.[0];
  if (items === undefined) {
    for (const [name, value] of members) {
      const nested = Object.entries<any>(value?.properties ?? {}).find(
        ([, v]) => v?.type === "array",
      )?.[0];
      if (nested !== undefined) {
        items = `${name}.${nested}`;
        break;
      }
    }
  }
  if (items === undefined) return undefined;
  const trait: Record<string, string> = { mode: "cursor", inputToken: "after", outputToken, items };
  if (query.some((p: any) => p.name === "first")) trait.pageSize = "first";
  return trait;
};

// ---------------------------------------------------------------------------
// Pages -> models
// ---------------------------------------------------------------------------

/** `api/reference/channel-points.md` -> `channel_points`. */
const modelName = (file: string): string => path.basename(file, ".md").replace(/[^a-z0-9]+/g, "_");

const toPascal = (name: string): string =>
  name
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

const manifest = JSON.parse(
  fs.readFileSync(resolveSpecPath(root, `${SPEC_ROOT}/_manifest.json`), "utf8"),
) as { pages: ReadonlyArray<{ url: string; file: string }> };

clearModels(outDir);
const names = new Set<string>();
const operationNames = new Map<string, string>();
let totalOperations = 0;
let totalPaginated = 0;
for (const page of manifest.pages) {
  const name = modelName(page.file);
  if (names.has(name)) throw new Error(`model names collide: ${name}`);
  names.add(name);
  const markdown = fs.readFileSync(resolveSpecPath(root, `${SPEC_ROOT}/${page.file}`), "utf8");
  const spec = pageToOpenApi(markdown, page.file, page.url);

  const model = convertOpenApiToSmithy(spec, {
    deferNaming: true,
    namespace: `com.twitch.${name}`,
    serviceName: toPascal(name),
    headerParams: false,
    // Failures are typed by status through core's shared map -- src/errors.ts.
    statusToErrorClass: {},
    successStatuses: ["200", "201", "202", "204"],
  });

  const byRoute = new Map<string, Record<string, string>>();
  for (const [uri, item] of Object.entries<any>(spec.paths)) {
    for (const [method, op] of Object.entries<any>(item)) {
      const id = op.operationId as string;
      const other = operationNames.get(id);
      if (other) throw new Error(`operation ${id} is in both ${other} and ${page.file}`);
      operationNames.set(id, page.file);
      const trait = paginationFor(op);
      if (trait) byRoute.set(`${method.toUpperCase()} ${uri}`, trait);
    }
  }
  const operations = Object.values<any>(model.shapes).filter((s) => s.type === "operation");
  let paginated = 0;
  for (const shape of operations) {
    const http = shape.traits?.["smithy.api#http"];
    const trait = http && byRoute.get(`${http.method} ${http.uri}`);
    if (!trait) continue;
    shape.traits["smithy.api#paginated"] = trait;
    paginated++;
  }
  // A miss means a uri no longer round-trips and the SDK would silently lose
  // `.pages()` on that endpoint.
  if (paginated !== byRoute.size) {
    throw new Error(
      `${name}: ${byRoute.size} paginated route(s) detected but ${paginated} stamped`,
    );
  }
  writeModel(path.join(outDir, `${name}.json`), model);
  totalOperations += operations.length;
  totalPaginated += paginated;
}

console.log(
  `✅ ${names.size} Smithy models (${totalOperations} operations, ${totalPaginated} paginated) → ${outDir}`,
);

await finalizeConvert({ root });
