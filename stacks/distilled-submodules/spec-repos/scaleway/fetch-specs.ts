#!/usr/bin/env node
/**
 * Mirrors Scaleway's OpenAPI documents into ../specs/.
 *
 * Scaleway publishes one OpenAPI 3.1 document per API — the proto service
 * `scaleway.<product>.<version>.<Api>` its SDKs are generated from — through
 * its developer portal (https://www.scaleway.com/en/developers/api/). The
 * portal is a Zudoku SPA, so there is no index file: the list of documents
 * lives in the portal's client bundle, one
 * `downloadUrl: "/en/developers/api/<route>/<version>/schema.yml"` per API
 * version beside the processed module named after the proto service. This
 * script reads the landing page, follows it to the bundle, extracts those
 * pairs, and downloads every `schema.yml`. The older
 * `/en/developers/static/scaleway.<…>.Api.yml` URLs answer 404.
 *
 * Every published version is kept — `instance` v1 beside v2alpha1, `block`
 * v1 beside v1alpha1 — because Scaleway serves all of them and its own SDKs
 * generate one client per version. A product added to the portal is picked
 * up on the next daily refetch.
 *
 * A few APIs Scaleway's own SDKs cover have no document on the portal
 * (Billing v2's budgets and e-invoicing, Edge Services' VPC endpoints).
 * For those, {@link deriveFromSdkJs} reads scaleway-sdk-js's generated
 * client (`packages_generated/<pkg>/src/<version>/{api,types,marshalling}.gen.ts`
 * — generated from the same API definitions as the portal's documents) and
 * writes an OpenAPI document in the portal's dialect, marked
 * `"source": "scaleway-sdk-js"` in the manifest. A derived document is
 * skipped as soon as the portal publishes that API, and merged routes are
 * only added where the published document lacks them.
 *
 * Usage:
 *   node fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/<product>[_<api>]_<version>.json
 *   ../specs/_manifest.json
 */

import { mkdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import YAML from "yaml";

const ORIGIN = "https://www.scaleway.com";
const PORTAL = `${ORIGIN}/en/developers/api/`;

const SPECS_DIR = "../specs";
const USER_AGENT = "distilled.cloud-scaleway-spec-mirror";

/**
 * Fewer documents than this means the bundle changed shape (or the portal
 * served something else), not that Scaleway retired most of its APIs.
 */
const MIN_DOCUMENTS = 60;

mkdirSync(SPECS_DIR, { recursive: true });

async function fetchOk(url: string, accept: string): Promise<Response> {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response;
}

/** `/en/developers/api/<route>/<version>/schema.yml` + `scaleway.<product>.<version>.<Api>` */
const ENTRY =
  /downloadUrl:`(\/en\/developers\/api\/[^`]+\/schema\.yml)`[^}]*?input:`[^`]*?scaleway\.([a-z0-9_]+)\.(v\d+(?:(?:alpha|beta)\d*)?)\.([A-Za-z0-9]+)\.yml\.js`/g;

interface Document {
  readonly proto: string;
  readonly product: string;
  readonly version: string;
  readonly api: string;
  readonly url: string;
  readonly slug: string;
}

/** `FinOpsApi` → `fin_ops`; `Api` → `` */
const apiSlug = (api: string): string =>
  api
    .replace(/Api$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase();

/** `scaleway.lb.v1.ZonedApi` → `lb_zoned_v1`; `scaleway.k8s.v1.Api` → `k8s_v1`. */
const toSlug = (product: string, api: string, version: string): string =>
  [product, apiSlug(api), version].filter(Boolean).join("_");

async function listDocuments(): Promise<Document[]> {
  console.log(`Reading ${PORTAL} …`);
  const html = await (await fetchOk(PORTAL, "text/html")).text();
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map((m) => m[1]!);
  if (scripts.length === 0) {
    throw new Error(`${PORTAL} has no <script src> — the portal changed shape`);
  }

  const documents = new Map<string, Document>();
  for (const script of scripts) {
    const url = new URL(script, PORTAL).href;
    console.log(`Scanning ${url} …`);
    const bundle = await (await fetchOk(url, "application/javascript")).text();
    for (const m of bundle.matchAll(ENTRY)) {
      const [, path, product, version, api] = m as unknown as [
        string,
        string,
        string,
        string,
        string,
      ];
      const proto = `scaleway.${product}.${version}.${api}`;
      const slug = toSlug(product, api, version);
      const existing = documents.get(slug);
      if (existing !== undefined && existing.proto !== proto) {
        throw new Error(`${existing.proto} and ${proto} both map to ${slug}`);
      }
      documents.set(slug, { proto, product, version, api, url: `${ORIGIN}${path}`, slug });
    }
  }

  if (documents.size < MIN_DOCUMENTS) {
    throw new Error(
      `found ${documents.size} schema.yml download(s) in the portal bundle (expected ≥ ${MIN_DOCUMENTS}) — ` +
        `the bundle no longer pairs downloadUrl with the proto service name`,
    );
  }
  return [...documents.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

// ---------------------------------------------------------------------------
// Derived documents (scaleway-sdk-js)
// ---------------------------------------------------------------------------

const SDK_JS = "scaleway/scaleway-sdk-js";
const SDK_JS_REF = "main";

interface DerivedSource {
  /** `packages_generated/<package>/src/<version>/`. */
  readonly package: string;
  readonly product: string;
  readonly version: string;
  /**
   * SDK class → proto API name (`ElectronicBillingAPI` → `ElectronicBillingApi`),
   * or `{ api, mergeInto }` to add the class's routes to that published
   * document (only the routes it lacks) instead of standing alone.
   */
  readonly classes: Readonly<
    Record<string, string | { readonly api: string; readonly mergeInto: string }>
  >;
  /** Keep only routes matching this. */
  readonly routes?: RegExp;
}

const DERIVED: readonly DerivedSource[] = [
  {
    package: "billing",
    product: "billing",
    version: "v2",
    classes: { API: "Api", ElectronicBillingAPI: "ElectronicBillingApi" },
  },
  {
    // The portal publishes `scaleway.dedibox.v1.Api` only.
    package: "dedibox",
    product: "dedibox",
    version: "v1",
    classes: {
      API: { api: "Api", mergeInto: "dedibox_v1" },
      BillingAPI: "BillingApi",
      IPv6BlockAPI: "IPv6BlockApi",
      RpnAPI: "RpnApi",
      RpnSanAPI: "RpnSanApi",
      RpnV1API: "RpnV1Api",
      RpnV2API: "RpnV2Api",
    },
  },
  {
    // Not served yet: every region answered `501 unknown service` (2026-10-12).
    package: "dataviz",
    product: "dataviz",
    version: "v1alpha1",
    classes: { API: "Api" },
  },
  {
    package: "edge_services",
    product: "edge_services",
    version: "v1beta1",
    classes: { API: { api: "Api", mergeInto: "edge_services_v1beta1" } },
    routes: /vpc-endpoints/,
  },
  {
    package: "search",
    product: "search",
    version: "v1alpha1",
    classes: { API: "Api" },
  },
];

type Schema = Record<string, unknown>;

interface Field {
  readonly name: string;
  readonly optional: boolean;
  readonly type: string;
  readonly doc: string;
}

type TypeDef =
  | { readonly kind: "enum"; readonly values: readonly string[]; readonly doc: string }
  | { readonly kind: "object"; readonly fields: readonly Field[]; readonly doc: string };

const snake = (camel: string): string =>
  camel
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();

/** JSDoc text: drop `*` gutters, `@tags`, the "X.. X" summary echo. */
const docText = (block: string): string =>
  block
    .split("\n")
    .map((line) => line.replace(/^\s*\/?\*+\/?\s?/, "").trimEnd())
    .filter((line) => line !== "" && !line.startsWith("@"))
    .join("\n")
    .trim();

/** `types.gen.ts` → enums and object types. */
const parseTypes = (src: string): Map<string, TypeDef> => {
  const types = new Map<string, TypeDef>();
  const declaration =
    /(?:\/\*\*((?:(?!\*\/)[\s\S])*)\*\/\s*)?export (?:type (\w+) =([^{\n]*\n(?:\s+\|[^\n]*\n)*)|(?:interface (\w+)|type (\w+) =) \{(\n[\s\S]*?)??\n\})/g;
  for (const m of src.matchAll(declaration)) {
    const doc = m[1] ? docText(m[1]) : "";
    if (m[2] !== undefined) {
      const values = [...m[3]!.matchAll(/'([^']*)'/g)].map((v) => v[1]!);
      if (values.length === 0) throw new Error(`type ${m[2]}: not a string-literal union`);
      types.set(m[2], { kind: "enum", values, doc });
      continue;
    }
    const name = (m[4] ?? m[5])!;
    const fields: Field[] = [];
    for (const f of (m[6] ?? "").matchAll(
      /(?:\s*\/\*\*((?:(?!\*\/)[\s\S])*)\*\/)?\n?  (\w+)(\??): ([^\n]+)/g,
    )) {
      fields.push({
        name: f[2]!,
        optional: f[3] === "?",
        type: f[4]!.trim(),
        doc: f[1] ? docText(f[1]) : "",
      });
    }
    types.set(name, { kind: "object", fields, doc });
  }
  return types;
};

/** `marshalling.gen.ts` → per type, TS field → wire name. */
const parseWireNames = (src: string): Map<string, Map<string, string>> => {
  const out = new Map<string, Map<string, string>>();
  const add = (type: string, ts: string, wire: string) => {
    if (!out.has(type)) out.set(type, new Map());
    out.get(type)!.set(ts, wire);
  };
  for (const m of src.matchAll(
    /const unmarshal(\w+) = \(data: unknown\): \w+ => \{([\s\S]*?)\n\}\n/g,
  )) {
    for (const f of m[2]!.matchAll(/\n    (\w+): [^\n]*?data\.(\w+)/g)) add(m[1]!, f[1]!, f[2]!);
  }
  for (const m of src.matchAll(
    /const marshal(\w+) = \(\n  request: (\w+),[\s\S]*?\): Record<string, unknown> => \(\{([\s\S]*?)\n\}\)\n/g,
  )) {
    for (const f of m[3]!.matchAll(/\n  (\w+): [^\n]*?request\.(\w+)/g)) add(m[2]!, f[2]!, f[1]!);
    for (const f of m[3]!.matchAll(/param: '(\w+)',\s*value: request\.(\w+)/g))
      add(m[2]!, f[2]!, f[1]!);
  }
  return out;
};

interface Method {
  readonly className: string;
  readonly name: string;
  readonly requestType: string;
  readonly responseType: string;
  readonly httpMethod: string;
  readonly path: string;
  readonly pathParams: ReadonlyArray<readonly [ts: string, wire: string]>;
  readonly query: ReadonlyArray<readonly [wire: string, ts: string]>;
  readonly bodyType: string | undefined;
  readonly doc: string;
}

/** `api.gen.ts` → one entry per `this.client.fetch` call. */
const parseMethods = (src: string): Method[] => {
  const methods: Method[] = [];
  const classes = [...src.matchAll(/export class (\w+) extends ParentAPI \{/g)];
  classes.forEach((c, i) => {
    const body = src.slice(c.index!, classes[i + 1]?.index ?? src.length);
    const call =
      /\n  (?:protected )?(\w+) = \(request: Readonly<(\w+)>[^\n]*\n    this\.client\.fetch<(\w+)>\(\n      \{\n([\s\S]*?)\n      \},\n(?:      (unmarshal\w+),\n)?    \)/g;
    for (const m of body.matchAll(call)) {
      const block = m[4]!;
      const httpMethod = /method: '(\w+)'/.exec(block)?.[1];
      const rawPath = /path: `([^`]+)`/.exec(block)?.[1];
      if (!httpMethod || !rawPath) throw new Error(`${c[1]}.${m[1]}: no method/path`);
      const pathParams: Array<[string, string]> = [];
      const path = rawPath.replace(
        /\$\{validatePathParam\('(\w+)', request\.\w+[^}]*\)\}/g,
        (_, ts: string) => {
          pathParams.push([ts, snake(ts)]);
          return `{${snake(ts)}}`;
        },
      );
      if (path.includes("${")) throw new Error(`${c[1]}.${m[1]}: unparsed path ${rawPath}`);
      const query = [...block.matchAll(/\['(\w+)', request\.(\w+)/g)].map(
        (q) => [q[1]!, q[2]!] as const,
      );
      const bodyType = /marshal(\w+)\(request, this\.client\.settings\)/.exec(block)?.[1];
      const publicName = m[1]!.startsWith("pageOf")
        ? m[1]!.charAt(6).toLowerCase() + m[1]!.slice(7)
        : m[1]!;
      const doc = new RegExp(`/\\*\\*((?:(?!\\*/)[\\s\\S])*)\\*/\\n  ${publicName} = `).exec(
        body,
      )?.[1];
      methods.push({
        className: c[1]!,
        name: publicName,
        requestType: m[2]!,
        responseType: m[3]!,
        httpMethod: httpMethod.toLowerCase(),
        path,
        pathParams,
        query,
        bodyType,
        doc: doc ? docText(doc) : "",
      });
    }
  });
  return methods;
};

/** Shared Scaleway messages the client package defines. */
const STD: Record<string, Schema> = {
  "google.type.Money": {
    type: "object",
    properties: {
      currency_code: { type: "string" },
      units: { type: "integer", format: "int64" },
      nanos: { type: "integer", format: "int32" },
    },
  },
  "scaleway.std.Decimal": { type: "object", properties: { value: { type: "string" } } },
  "scaleway.std.File": {
    type: "object",
    properties: {
      name: { type: "string" },
      content_type: { type: "string" },
      content: { type: "string" },
    },
  },
  "scaleway.std.ServiceInfo": {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: ["string", "null"] },
      version: { type: "string" },
      documentation_url: { type: ["string", "null"] },
    },
  },
};
const STD_ALIASES: Record<string, string> = {
  Money: "google.type.Money",
  Decimal: "scaleway.std.Decimal",
  ScwFile: "scaleway.std.File",
  ServiceInfo: "scaleway.std.ServiceInfo",
};

interface DerivedDocument {
  readonly slug: string;
  readonly proto: string;
  readonly api: string;
  readonly url: string;
  readonly mergeInto?: string;
  readonly doc: {
    openapi: string;
    info: { title: string; description: string; version: string };
    paths: Record<string, Record<string, unknown>>;
    [key: string]: unknown;
  };
}

async function deriveFromSdkJs(source: DerivedSource): Promise<DerivedDocument[]> {
  const base = `https://raw.githubusercontent.com/${SDK_JS}/${SDK_JS_REF}/packages_generated/${source.package}/src/${source.version}`;
  const read = async (file: string) => (await fetchOk(`${base}/${file}`, "text/plain")).text();
  console.log(`Deriving ${source.product} ${source.version} from ${SDK_JS} …`);
  const types = parseTypes(await read("types.gen.ts"));
  const wire = parseWireNames(await read("marshalling.gen.ts"));
  const methods = parseMethods(await read("api.gen.ts")).filter(
    (m) => source.routes === undefined || source.routes.test(m.path),
  );
  if (types.size === 0 || methods.length === 0) {
    throw new Error(
      `${base}: parsed ${types.size} type(s), ${methods.length} method(s) — the generated layout changed`,
    );
  }

  const prefix = `scaleway.${source.product}.${source.version}.`;
  const wireName = (type: string, field: string) => wire.get(type)?.get(field) ?? snake(field);
  const fieldOf = (type: string, field: string): Field => {
    const def = types.get(type);
    const f = def?.kind === "object" ? def.fields.find((x) => x.name === field) : undefined;
    if (f === undefined) throw new Error(`${type}.${field}: not in types.gen.ts`);
    return f;
  };

  const documents: DerivedDocument[] = [];
  for (const [className, target] of Object.entries(source.classes)) {
    const api = typeof target === "string" ? target : target.api;
    const mergeInto = typeof target === "string" ? undefined : target.mergeInto;
    const own = methods.filter((m) => m.className === className);
    if (own.length === 0) continue;
    const components: Record<string, Schema> = {};

    const schemaFor = (expr: string): Schema => {
      const t = expr.replace(/\s*\|\s*undefined$/, "").trim();
      if (t.endsWith("[]")) return { type: "array", items: schemaFor(t.slice(0, -2)) };
      const record = /^Record<string, (.+)>$/.exec(t);
      if (record) return { type: "object", additionalProperties: schemaFor(record[1]!) };
      if (t === "string") return { type: "string" };
      if (t === "number") return { type: "number" };
      if (t === "boolean") return { type: "boolean" };
      if (t === "Date") return { type: "string", format: "date-time" };
      if (t === "ScwRegion" || t === "ScwZone" || t === "Region" || t === "Zone")
        return { type: "string" };
      const literals = [...t.matchAll(/'([^']*)'/g)].map((v) => v[1]!);
      if (literals.length > 0 && /^('[^']*'\s*\|?\s*)+$/.test(t))
        return { type: "string", enum: literals };
      const std = STD_ALIASES[t];
      if (std !== undefined) {
        components[std] = STD[std]!;
        return { $ref: `#/components/schemas/${std}` };
      }
      const def = types.get(t);
      if (def === undefined)
        throw new Error(
          `${source.product} ${source.version}: unsupported type expression \`${expr}\``,
        );
      const id = `${prefix}${t}`;
      if (!(id in components)) {
        components[id] = {};
        components[id] =
          def.kind === "enum"
            ? { type: "string", enum: def.values, ...(def.doc ? { description: def.doc } : {}) }
            : {
                type: "object",
                ...(def.doc ? { description: def.doc } : {}),
                properties: Object.fromEntries(
                  def.fields.map((f) => [
                    wireName(t, f.name),
                    { ...schemaFor(f.type), ...(f.doc ? { description: f.doc } : {}) },
                  ]),
                ),
              };
      }
      return { $ref: `#/components/schemas/${id}` };
    };

    const paths: Record<string, Record<string, unknown>> = {};
    for (const m of own) {
      const pathNames = new Set(m.pathParams.map(([ts]) => ts));
      const queryNames = new Set(m.query.map(([, ts]) => ts));
      const parameters = [
        ...m.pathParams.map(([ts, wireLabel]) => {
          const f = fieldOf(m.requestType, ts);
          return {
            in: "path",
            name: wireLabel,
            required: true,
            ...(f.doc ? { description: f.doc } : {}),
            schema: schemaFor(f.type),
          };
        }),
        ...m.query.map(([wireQuery, ts]) => {
          const f = fieldOf(m.requestType, ts);
          return {
            in: "query",
            name: wireQuery,
            ...(f.doc ? { description: f.doc } : {}),
            schema: schemaFor(f.type),
          };
        }),
      ];
      let requestBody: Record<string, unknown> | undefined;
      if (m.bodyType !== undefined) {
        const def = types.get(m.requestType);
        if (def?.kind !== "object")
          throw new Error(`${m.name}: request type ${m.requestType} not found`);
        const names = wire.get(m.requestType) ?? new Map<string, string>();
        const fields = def.fields.filter(
          (f) => names.has(f.name) && !pathNames.has(f.name) && !queryNames.has(f.name),
        );
        requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: Object.fromEntries(
                  fields.map((f) => [
                    names.get(f.name)!,
                    { ...schemaFor(f.type), ...(f.doc ? { description: f.doc } : {}) },
                  ]),
                ),
                required: fields.filter((f) => !f.optional).map((f) => names.get(f.name)!),
              },
            },
          },
        };
      }
      const [summary, ...rest] = m.doc.split("\n");
      paths[m.path] ??= {};
      paths[m.path]![m.httpMethod] = {
        operationId: m.name.charAt(0).toUpperCase() + m.name.slice(1),
        ...(summary ? { summary: summary.replace(/^(.+?)\.\. \1\.?$/, "$1") } : {}),
        description: [
          ...rest,
          `Derived from scaleway-sdk-js (\`${className}.${m.name}\`): Scaleway publishes no OpenAPI document for this route.`,
        ].join("\n\n"),
        parameters,
        ...(requestBody ? { requestBody } : {}),
        responses:
          m.responseType === "void"
            ? { "204": { description: "" } }
            : {
                "200": {
                  description: "",
                  content: {
                    "application/json": {
                      // A `Blob` download (`?dl=1`) answers the JSON file object without `dl`.
                      schema: schemaFor(m.responseType === "Blob" ? "ScwFile" : m.responseType),
                    },
                  },
                },
              },
        ...(m.responseType === "Blob" ? { "x-distilled-raw-download": true } : {}),
        security: [{ scaleway: [] }],
      };
    }

    const proto = `${prefix}${api}`;
    documents.push({
      slug:
        mergeInto !== undefined
          ? `${mergeInto}.sdk-js`
          : toSlug(source.product, api, source.version),
      proto,
      api,
      url: base,
      ...(mergeInto !== undefined ? { mergeInto } : {}),
      doc: {
        openapi: "3.1.0",
        info: {
          title: `${proto} (derived)`,
          description: `Derived from ${SDK_JS} packages_generated/${source.package}/src/${source.version} — the portal publishes no OpenAPI document for these routes.`,
          version: source.version,
        },
        servers: [{ url: "https://api.scaleway.com" }],
        components: {
          securitySchemes: { scaleway: { in: "header", name: "X-Auth-Token", type: "apiKey" } },
          schemas: Object.fromEntries(
            Object.entries(components).sort(([a], [b]) => a.localeCompare(b)),
          ),
        },
        paths,
      },
    });
  }
  return documents;
}

async function main() {
  const documents = await listDocuments();
  const manifest: Array<{
    proto: string;
    product: string;
    version: string;
    api: string;
    url: string;
    output: string;
    title: string;
    openapi: string;
    paths: number;
    source?: "scaleway-sdk-js";
    mergeInto?: string;
  }> = [];

  for (const document of documents) {
    console.log(`Fetching ${document.url}...`);
    const text = await (await fetchOk(document.url, "application/yaml, text/yaml, */*")).text();
    let doc: Record<string, unknown> | null;
    try {
      doc = YAML.parse(text, { maxAliasCount: -1 }) as Record<string, unknown> | null;
    } catch (cause) {
      throw new Error(`${document.url} is not YAML (the portal answered with something else)`, {
        cause,
      });
    }
    if (
      doc === null ||
      typeof doc !== "object" ||
      typeof doc.openapi !== "string" ||
      doc.paths === undefined
    ) {
      throw new Error(
        `${document.url} parsed without \`openapi\`/\`paths\` — not an OpenAPI document`,
      );
    }

    const output = `${document.slug}.json`;
    const pathCount = Object.keys(doc.paths as object).length;
    console.log(`Writing ${SPECS_DIR}/${output} (${document.proto}, ${pathCount} paths)...`);
    await writeFile(`${SPECS_DIR}/${output}`, JSON.stringify(doc, null, 2) + "\n");
    manifest.push({
      proto: document.proto,
      product: document.product,
      version: document.version,
      api: document.api,
      url: document.url,
      output,
      title: String((doc.info as { title?: unknown } | undefined)?.title ?? ""),
      openapi: doc.openapi,
      paths: pathCount,
    });
  }

  const published = new Map(manifest.map((entry) => [entry.output.replace(/\.json$/, ""), entry]));
  for (const source of DERIVED) {
    for (const derived of await deriveFromSdkJs(source)) {
      const target = derived.mergeInto ?? derived.slug;
      const official = published.get(target);
      if (derived.mergeInto === undefined && official !== undefined) {
        console.log(`Skipping derived ${derived.slug}: the portal publishes it now`);
        continue;
      }
      if (derived.mergeInto !== undefined) {
        if (official === undefined) {
          throw new Error(
            `${derived.slug} merges into ${derived.mergeInto}, which the portal does not publish`,
          );
        }
        const officialDoc = JSON.parse(await readFile(`${SPECS_DIR}/${official.output}`, "utf8"));
        // Keep only the operations the published document lacks.
        for (const [route, item] of Object.entries(derived.doc.paths)) {
          for (const method of Object.keys(item)) {
            if (officialDoc.paths?.[route]?.[method] !== undefined) delete item[method];
          }
          if (Object.keys(item).length === 0) delete derived.doc.paths[route];
        }
        if (Object.keys(derived.doc.paths).length === 0) {
          console.log(`Skipping derived ${derived.slug}: ${derived.mergeInto} has every route now`);
          continue;
        }
      }
      const output = `${derived.slug}.json`;
      const pathCount = Object.keys(derived.doc.paths).length;
      console.log(
        `Writing ${SPECS_DIR}/${output} (${derived.proto}, derived, ${pathCount} paths)...`,
      );
      await writeFile(`${SPECS_DIR}/${output}`, JSON.stringify(derived.doc, null, 2) + "\n");
      manifest.push({
        proto: derived.proto,
        product: source.product,
        version: source.version,
        api: derived.api,
        url: derived.url,
        output,
        title: derived.doc.info.title,
        openapi: derived.doc.openapi,
        paths: pathCount,
        source: "scaleway-sdk-js",
        ...(derived.mergeInto !== undefined ? { mergeInto: derived.mergeInto } : {}),
      });
    }
  }

  await writeFile(`${SPECS_DIR}/_manifest.json`, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Done! ${manifest.length} Scaleway OpenAPI document(s) → ${SPECS_DIR}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
