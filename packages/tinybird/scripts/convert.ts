#!/usr/bin/env -S node --conditions=bun
/**
 * convert — Tinybird's API reference pages → Smithy JSON models in
 * .generated-specs.
 *
 * Tinybird publishes no machine-readable API description. Its API reference
 * (https://www.tinybird.co/docs/api-reference) is mirrored as Markdown at
 * `specs/spec-mirror-tinybird/specs/api-reference/<page>/index.md`, one file
 * per page, listed in `specs/_manifest.json` (see the mirror's
 * fetch-specs.ts). Every page describes its operations the same way:
 *
 *   ## POST /v0/pipes/(.+)/nodes          ← one section per operation
 *   <prose>
 *   ### Request parameters               ← {% table %} Key | Type | Description
 *   ### Request body fields              ← {% table %} Field | Type | Description
 *   ### Response fields                  ← {% table %} Field | Type | Description
 *   ### Response codes                   ← {% table %} Code | Description
 *   ### Available formats                ← {% table %} format | Description
 *
 * This script reads those sections into one OpenAPI 3.0 document per page
 * ({@link pageToOpenApi}) and hands each to the shared OpenAPI → Smithy
 * converter (`runOpenApiConvert`), so patches, naming and finalization are
 * the ones every OpenAPI package gets. One model — one service module — per
 * page: `datasource-api` → `datasource`, `pipe-api/copy-pipes-api` →
 * `copy_pipes`.
 *
 * The reading rules, all structural:
 *
 *   • Routes are written as Tornado patterns. A trailing `/?` is an optional
 *     slash and drops. A capture group `(.+)` / `([^/]+)` is a path label
 *     named after the collection segment before it, singularised
 *     (`/v0/pipes/(.+)/nodes/(.+)` → `/v0/pipes/{pipe}/nodes/{node}`); a
 *     literal suffix inside the group stays a literal (`(.+\.pipe)` →
 *     `{pipe}.pipe`). An alternation group (`(json|csv|…)`) is an enum label
 *     named by the header of the section's table listing exactly those
 *     values (`Available formats` → `format`). `{name}` labels pass through.
 *   • Request parameters are query parameters on every method. That is how
 *     the reference's own examples send them, POSTs and PUTs included
 *     (`/v0/pipes/:name/nodes?name=…&description=…` with the node SQL as the
 *     body); bodies are the SQL, NDJSON, files or JSON documents each
 *     operation describes in prose, added by patches with that evidence.
 *     A key that is not an identifier (`engine_*`, `{key}`) names a family
 *     of parameters, not one, and is left out of the model.
 *   • Request body fields are a JSON body; response fields the 2xx JSON
 *     body. `a[].b` and `a.<k>[].b` rows describe nested members.
 *   • A parameter is required only when its description says so
 *     unconditionally (`Required.`, `Mandatory.`); everything else is
 *     optional, since the reference marks optionality inconsistently.
 *   • A route with an `Available formats` table (in any of its sections on
 *     the page) answers in the format the caller picks — CSV, NDJSON, Parquet, Prometheus text or JSON — so its
 *     output is the raw response bytes.
 *   • Every other 2xx body is JSON the reference shows only by example; its
 *     output is an open object, typed further by patches with evidence.
 *   • Status-code tables declare responses; failures dispatch by status
 *     through core's shared map (see src/errors.ts), so no per-operation
 *     error classes are generated.
 *
 * Anything this cannot read fails the run rather than dropping an
 * operation.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { runOpenApiConvert, type OpenApiSpecEntry } from "@distilled.cloud/dev/codegen/openapi-cli";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const root = path.resolve(import.meta.dirname, "..");
const SPEC_ROOT = "specs/spec-mirror-tinybird/specs";

// ---------------------------------------------------------------------------
// Markdown sections and tables
// ---------------------------------------------------------------------------

interface Table {
  /** The `###` heading (or bold caption line) the table sits under. */
  readonly title: string | undefined;
  readonly header: readonly string[];
  readonly rows: readonly (readonly string[])[];
}

interface Section {
  readonly method: string;
  /** The route as the reference writes it (a Tornado pattern). */
  readonly route: string;
  readonly prose: string;
  readonly tables: readonly Table[];
}

const OPERATION = /^## (GET|POST|PUT|PATCH|DELETE) (\/\S*)\s*$/;

/** Strip Markdoc attributes (`{% width="10%" %}`) from a table cell. */
const cell = (text: string): string => text.replace(/\s*\{%.*?%\}/g, "").trim();

/** Every `{% table %}` block in `lines`, with the heading it sits under. */
const readTables = (lines: readonly string[]): Table[] => {
  const tables: Table[] = [];
  let title: string | undefined;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!.trim();
    const heading = /^#{3,6} (.*)$/.exec(line);
    if (heading) title = heading[1]!.trim();
    if (line !== "{% table %}") continue;
    const rows: string[][] = [[]];
    for (i++; i < lines.length && lines[i]!.trim() !== "{% /table %}"; i++) {
      const t = lines[i]!.trim();
      if (t === "---") rows.push([]);
      else if (t.startsWith("* ")) rows[rows.length - 1]!.push(cell(t.slice(2)));
      else if (t !== "" && rows[rows.length - 1]!.length > 0) {
        const row = rows[rows.length - 1]!;
        row[row.length - 1] = `${row[row.length - 1]} ${cell(t)}`;
      }
    }
    if (i >= lines.length) throw new Error(`unterminated {% table %} under "${title}"`);
    const [header = [], ...body] = rows;
    tables.push({ title, header, rows: body.filter((r) => r.length > 0) });
  }
  return tables;
};

/** Prose without code blocks, tables or headings — the operation's documentation. */
const readProse = (lines: readonly string[]): string => {
  const out: string[] = [];
  let fenced = false;
  let table = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith("```")) {
      fenced = !fenced;
      continue;
    }
    if (t === "{% table %}") table = true;
    // Bold one-liners are code-block captions; their code is dropped too.
    if (
      fenced ||
      table ||
      t.startsWith("#") ||
      /^\{%.*%\}$/.test(t) ||
      /^\*\*[^*]+\*\*:?$/.test(t)
    ) {
      if (t === "{% /table %}") table = false;
      continue;
    }
    out.push(line);
  }
  return out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

/** Split a page into its operation sections; each runs to the next `## ` heading. */
const readSections = (markdown: string): Section[] => {
  const lines = markdown.split("\n");
  const sections: Section[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = OPERATION.exec(lines[i]!);
    if (!m) continue;
    let end = i + 1;
    while (end < lines.length && !/^## /.test(lines[end]!)) end++;
    const body = lines.slice(i + 1, end);
    sections.push({
      method: m[1]!,
      route: m[2]!,
      prose: readProse(body),
      tables: readTables(body),
    });
  }
  return sections;
};

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/** `pipes` → `pipe`, `replicas` → `replica`. */
const singular = (segment: string): string | undefined =>
  /^[a-z][a-z0-9_]*s$/.test(segment) ? segment.slice(0, -1) : undefined;

interface Route {
  readonly uri: string;
  readonly labels: ReadonlyArray<{ readonly name: string; readonly enum?: readonly string[] }>;
}

/**
 * `related` is every table of the page's sections on the same route — the
 * POST twin of a GET route names its labels by the GET's tables ("See the
 * get endpoint for more information").
 */
const route = (section: Section, related: readonly Table[], where: string): Route => {
  const raw = section.route.replace(/\/\?$/, "").replace(/\/$/, "") || "/";
  const labels: { name: string; enum?: string[] }[] = [];
  // Lift the capture groups out first: `([^/]+)` holds a `/` of its own.
  const groups: string[] = [];
  const lifted = raw.replace(/\(([^()]*)\)/g, (_, group: string) => {
    groups.push(group);
    return `\u0000${groups.length - 1}\u0000`;
  });
  if (/[()]/.test(lifted)) throw new Error(`${where}: unbalanced group in ${section.route}`);
  const segments = lifted.split("/").map((segment, index, all) => {
    // `{pipe_id}` — already a label.
    for (const [, name] of segment.matchAll(/\{([A-Za-z_][A-Za-z0-9_]*)\}/g)) {
      labels.push({ name: name! });
    }
    let out = "";
    let rest = segment;
    while (rest.length > 0) {
      const open = rest.indexOf("\u0000");
      if (open === -1) {
        out += rest.replace(/\\\./g, ".");
        break;
      }
      out += rest.slice(0, open).replace(/\\\./g, ".");
      const close = rest.indexOf("\u0000", open + 1);
      const group = groups[Number(rest.slice(open + 1, close))]!;
      rest = rest.slice(close + 1);
      const wildcard = /^(?:\.\+|\[\^\/\]\+)((?:\\\.[A-Za-z0-9_-]+)?)$/.exec(group);
      if (wildcard) {
        const name = singular(all[index - 1] ?? "");
        if (name === undefined) {
          throw new Error(
            `${where}: ${section.route}: no collection segment to name the label (${group}) after`,
          );
        }
        labels.push({ name });
        out += `{${name}}${wildcard[1]!.replace(/\\\./g, ".")}`;
        continue;
      }
      const alternatives = /^[A-Za-z0-9_-]+(?:\|[A-Za-z0-9_-]+)+$/.test(group)
        ? group.split("|")
        : undefined;
      if (alternatives) {
        const values = [...alternatives].sort().join("|");
        const table = related.find(
          (t) => t.header.length > 0 && [...t.rows.map((r) => r[0])].sort().join("|") === values,
        );
        const name = table?.header[0]?.toLowerCase();
        if (name === undefined || !/^[a-z][a-z0-9_]*$/.test(name)) {
          throw new Error(
            `${where}: ${section.route}: no table in the section lists exactly (${group}) to name the label after`,
          );
        }
        labels.push({ name, enum: alternatives });
        out += `{${name}}`;
        continue;
      }
      throw new Error(`${where}: ${section.route}: unrecognised route pattern (${group})`);
    }
    return out;
  });
  return { uri: segments.join("/") || "/", labels };
};

// ---------------------------------------------------------------------------
// Types and fields
// ---------------------------------------------------------------------------

/** A reference type cell (`String`, `Optional[String]`, `Array[Object]`, `Object or null`). */
const schemaFor = (
  type: string,
  where: string,
): { schema: Record<string, unknown>; optional: boolean } => {
  let t = type.trim();
  let optional = false;
  let nullable = false;
  const opt = /^Optional\[(.*)\]$/i.exec(t);
  if (opt) {
    t = opt[1]!;
    optional = true;
  }
  if (/\s*\(optional\)$/i.test(t)) {
    t = t.replace(/\s*\(optional\)$/i, "");
    optional = true;
  }
  if (/\s+or\s+null$/i.test(t)) {
    t = t.replace(/\s+or\s+null$/i, "");
    nullable = true;
  }
  const scalar = (name: string): Record<string, unknown> => {
    switch (name.trim().toLowerCase()) {
      case "string":
      case "str":
        return { type: "string" };
      case "bool":
      case "boolean":
        return { type: "boolean" };
      case "int":
      case "integer":
        return { type: "integer" };
      case "float":
      case "number":
        return { type: "number" };
      case "object":
        return { type: "object", additionalProperties: true };
      default:
        throw new Error(`${where}: unknown type "${type}"`);
    }
  };
  const array = /^Array\[(.*)\]$/i.exec(t);
  const schema = array ? { type: "array", items: scalar(array[1]!) } : scalar(t);
  return { schema: nullable ? { ...schema, nullable: true } : schema, optional };
};

const REQUIRED = /^(required|mandatory)\s*[.:]/i;
const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;

/**
 * An object schema from `Field | Type | Description` rows. `a[].b` is a
 * member of `a`'s items, `a.b` of `a` itself, and `a.<k>` a map value of
 * `a` (`available_sizes.<provider>[].name`).
 */
const objectFrom = (rows: readonly (readonly string[])[], where: string): Record<string, any> => {
  const rootSchema: Record<string, any> = { type: "object", properties: {} };
  for (const [field = "", type = "", description = ""] of rows) {
    const steps = field.match(/[A-Za-z_][A-Za-z0-9_]*|<[^>]+>|\[\]|\./g) ?? [];
    if (steps.join("") !== field) throw new Error(`${where}: unreadable field "${field}"`);
    let parent = rootSchema;
    let name: string | undefined;
    for (const step of steps) {
      if (step === ".") continue;
      if (name !== undefined) {
        parent = parent.properties[name];
        name = undefined;
      }
      if (step === "[]") {
        // A map value the rows only describe through `[]` is an array.
        if (parent.type === undefined) parent.type = "array";
        if (parent.type !== "array") throw new Error(`${where}: "${field}": [] on a non-array`);
        parent.items = { ...parent.items, type: "object" };
        delete parent.items.additionalProperties;
        parent.items.properties ??= {};
        parent = parent.items;
      } else if (step.startsWith("<")) {
        if (parent.type !== "object")
          throw new Error(`${where}: "${field}": map key on a non-object`);
        parent.additionalProperties =
          typeof parent.additionalProperties === "object" ? parent.additionalProperties : {};
        parent = parent.additionalProperties;
      } else {
        name = step;
      }
    }
    if (name === undefined) {
      // `a.<k>[]`-style row with no member name: the type describes the value.
      Object.assign(parent, schemaFor(type, where).schema);
      continue;
    }
    if (parent.type === undefined) parent.type = "object";
    parent.properties ??= {};
    if (parent.properties[name] !== undefined) continue;
    parent.properties[name] = { ...schemaFor(type, where).schema, description };
  }
  return rootSchema;
};

// ---------------------------------------------------------------------------
// Page → OpenAPI
// ---------------------------------------------------------------------------

const lower = (s: string | undefined) => (s ?? "").trim().toLowerCase();
const isParameterTable = (t: Table) => t.header.length === 3 && lower(t.header[0]) === "key";
const isFieldTable = (t: Table, title: string) =>
  t.header.length === 3 && lower(t.header[0]) === "field" && lower(t.title) === title;
const isStatusTable = (t: Table) =>
  t.header.length === 2 && ["code", "status code"].includes(lower(t.header[0]));
const isFormatTable = (t: Table) => lower(t.title) === "available formats";

const pageToOpenApi = (markdown: string, file: string): Record<string, any> => {
  const title = /^title:\s*(.*)$/m.exec(markdown)?.[1]?.trim() ?? file;
  const paths: Record<string, Record<string, unknown>> = {};
  const sections = readSections(markdown);
  for (const section of sections) {
    const where = `${file}: ${section.method} ${section.route}`;
    const related = sections
      .filter((other) => other.route === section.route)
      .flatMap((other) => other.tables);
    const { uri, labels } = route(section, related, where);
    const parameters: Record<string, unknown>[] = labels.map((label) => ({
      name: label.name,
      in: "path",
      required: true,
      schema: label.enum ? { type: "string", enum: label.enum } : { type: "string" },
    }));
    const seen = new Set(labels.map((l) => l.name));
    for (const table of section.tables.filter(isParameterTable)) {
      for (const [key = "", type = "", description = ""] of table.rows) {
        if (!IDENTIFIER.test(key) || seen.has(key)) continue;
        seen.add(key);
        const { schema, optional } = schemaFor(type, `${where}: ${key}`);
        parameters.push({
          name: key,
          in: "query",
          required: !optional && REQUIRED.test(description),
          description,
          schema,
        });
      }
    }

    const bodyRows = section.tables
      .filter((t) => isFieldTable(t, "request body fields"))
      .flatMap((t) => t.rows);
    const responseRows = section.tables
      .filter((t) => isFieldTable(t, "response fields"))
      .flatMap((t) => t.rows);
    const statuses = section.tables
      .filter(isStatusTable)
      .flatMap((t) => t.rows)
      .filter(([code]) => /^\d{3}$/.test(code ?? ""));

    const success = related.some(isFormatTable)
      ? { "application/octet-stream": { schema: { type: "string", format: "binary" } } }
      : {
          "application/json": {
            schema:
              responseRows.length > 0
                ? objectFrom(responseRows, where)
                : { type: "object", additionalProperties: true },
          },
        };
    const responses: Record<string, unknown> = {};
    for (const [code = "", description = ""] of statuses) {
      const existing = responses[code] as { description: string } | undefined;
      if (existing) {
        existing.description = `${existing.description}; ${description}`;
        continue;
      }
      responses[code] = code.startsWith("2") ? { description, content: success } : { description };
    }
    // The success body, under the status the table names, else 200.
    if (!Object.keys(responses).some((c) => c.startsWith("2"))) {
      responses["200"] = { description: "OK", content: success };
    }

    const operation: Record<string, unknown> = {
      description:
        `${section.prose}\n\nReference: https://www.tinybird.co/docs/${file.replace(/\/index\.md$/, "")}`.trim(),
      parameters,
      responses,
    };
    if (bodyRows.length > 0) {
      operation.requestBody = {
        required: true,
        content: { "application/json": { schema: objectFrom(bodyRows, where) } },
      };
    }
    const item = (paths[uri] ??= {});
    const method = section.method.toLowerCase();
    if (item[method] !== undefined) throw new Error(`${where}: duplicate route ${uri}`);
    item[method] = operation;
  }
  if (Object.keys(paths).length === 0) throw new Error(`${file}: no operations`);
  return {
    openapi: "3.0.3",
    info: { title, version: "v0" },
    servers: [{ url: "https://api.tinybird.co" }],
    paths,
  };
};

// ---------------------------------------------------------------------------
// Pages → models
// ---------------------------------------------------------------------------

/** `api-reference/pipe-api/copy-pipes-api/index.md` → `copy_pipes`. */
const modelName = (file: string): string =>
  path
    .basename(path.dirname(file))
    .replace(/-api$/, "")
    .replace(/[^a-z0-9]+/g, "_");

const manifest = JSON.parse(
  fs.readFileSync(resolveSpecPath(root, `${SPEC_ROOT}/_manifest.json`), "utf8"),
) as { pages: ReadonlyArray<{ url: string; file: string }> };

const specs: OpenApiSpecEntry[] = manifest.pages
  // The overview page documents hosts and authentication, not operations.
  .filter((page) => page.file !== "api-reference/index.md")
  .map((page) => {
    const name = modelName(page.file);
    return {
      name,
      specPath: `${SPEC_ROOT}/${page.file}`,
      options: {
        namespace: `com.tinybird.${name}`,
        serviceName: name
          .split("_")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(""),
      },
    };
  });

const names = specs.map((s) => s.name);
if (new Set(names).size !== names.length) throw new Error(`model names collide: ${names}`);

await runOpenApiConvert({
  root,
  specs,
  parse: (text, specPath) =>
    pageToOpenApi(text, path.relative(resolveSpecPath(root, SPEC_ROOT), specPath)),
  options: {
    namespace: "com.tinybird.api",
    serviceName: "Tinybird",
    headerParams: false,
    binaryTypes: true,
    // Path-derived verbNoun names where the route alone misnames the action
    // (each from the operation's own prose in the reference). Routes not
    // listed keep the derived name (`getDatasource`, `createPipeNode`).
    operationNames: {
      "POST /v0/analyze": "analyzeData",
      "GET /v0/datasources": "listDatasources",
      "POST /v0/datasources/{datasource}/alter": "alterDatasource",
      "POST /v0/datasources/{datasource}/truncate": "truncateDatasource",
      "POST /v0/datasources/{datasource}/delete": "deleteDatasourceRows",
      "PUT /v0/datasources/{datasource}": "updateDatasource",
      "DELETE /v0/datasources/{datasource}": "deleteDatasource",
      "GET /v0/variables": "listVariables",
      "PUT /v0/variables/{variable}": "updateVariable",
      "POST /v0/events": "sendEvents",
      "GET /v0/jobs": "listJobs",
      "GET /v0/organizations/{organization}/clusters": "listOrganizationClusters",
      "GET /v0/organizations/{organization}/clusters-configuration":
        "getOrganizationClustersConfiguration",
      "PUT /v0/organizations/{organization}/clusters/{cluster}/weights":
        "updateOrganizationClusterWeights",
      "POST /v0/organizations/{organization}/clusters/{cluster}/replicas":
        "addOrganizationClusterReplica",
      "POST /v0/organizations/{organization}/clusters/{cluster}/replicas/{replica}":
        "addOrganizationClusterReplicaByName",
      "DELETE /v0/organizations/{organization}/clusters/{cluster}/replicas":
        "removeOrganizationClusterReplica",
      "DELETE /v0/organizations/{organization}/clusters/{cluster}/replicas/{replica}":
        "removeOrganizationClusterReplicaByName",
      "GET /v0/pipes": "listPipes",
      "GET /v0/pipes/{pipe}": "getPipe",
      "PUT /v0/pipes/{pipe}": "updatePipe",
      "DELETE /v0/pipes/{pipe}": "deletePipe",
      "GET /v0/pipes/{pipe}.pipe": "getPipeByFileName",
      "PUT /v0/pipes/{pipe}.pipe": "updatePipeByFileName",
      "DELETE /v0/pipes/{pipe}.pipe": "deletePipeByFileName",
      "GET /v0/pipes/{pipe}.{format}": "queryPipe",
      "POST /v0/pipes/{pipe}.{format}": "queryPipeWithBody",
      "PUT /v0/pipes/{pipe}/nodes/{node}": "updatePipeNode",
      "GET /v0/pipes/{pipe}/explain": "explainPipe",
      "GET /v0/pipes/{pipe}/nodes/{node}/explain": "explainPipeNode",
      "POST /v0/pipes/{pipe}/nodes/{node}/copy": "createPipeNodeCopy",
      "PUT /v0/pipes/{pipe}/nodes/{node}/copy": "updatePipeNodeCopy",
      "POST /v0/pipes/{pipe}/copy": "runPipeCopy",
      "POST /v0/pipes/{pipe}/copy/pause": "pausePipeCopy",
      "POST /v0/pipes/{pipe}/copy/resume": "resumePipeCopy",
      "POST /v0/pipes/{pipe}/copy/cancel": "cancelPipeCopy",
      "POST /v0/pipes/{pipe}/nodes/{node}/population": "populatePipeNode",
      "POST /v0/pipes/{pipe_id}/sink": "triggerPipeSink",
      "GET /v0/integrations/s3/policies/trust-policy": "getS3TrustPolicy",
      "GET /v0/integrations/s3/policies/write-access-policy": "getS3WriteAccessPolicy",
      "GET /v0/integrations/s3/settings": "getS3Settings",
      "GET /v0/sql": "querySql",
      "POST /v0/sql": "querySqlWithBody",
      "GET /v0/tokens": "listTokens",
      "PUT /v0/tokens/{token}": "updateToken",
    },
    successStatuses: ["200", "201", "202", "204"],
    // Failures are typed by status through core's shared map — src/errors.ts.
    statusToErrorClass: {},
  },
});
