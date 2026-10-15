#!/usr/bin/env -S node --conditions=bun
/**
 * convert — Scaleway's OpenAPI descriptions → Smithy JSON models in
 * .generated-specs.
 *
 * Scaleway publishes one OpenAPI 3.1 document per proto API service and
 * version (`scaleway.instance.v1.Api`, `scaleway.lb.v1.ZonedApi`, …),
 * mirrored at `specs/spec-mirror-scaleway/specs/<slug>.json` with a
 * `_manifest.json` beside them. Each document becomes one Smithy model /
 * service module, named by the mirror slug (`instance_v1`, `lb_zoned_v1`).
 * Every published version is generated: Scaleway serves them side by side
 * and its own SDKs ship one client per version.
 *
 * Documents the mirror derived from scaleway-sdk-js (`"source":
 * "scaleway-sdk-js"` in the manifest — APIs the portal publishes no
 * document for) convert like any other; one with `mergeInto` adds its
 * routes to that published document instead ({@link mergeDerived}).
 *
 * Before conversion ({@link preprocess}):
 *
 *   1. Map-typed members. Scaleway writes `map<string, T>` as an object
 *      whose only property is a `<fooKey>` placeholder, with
 *      `additionalProperties: true`. That placeholder is the VALUE schema;
 *      it becomes `additionalProperties`, so the member is a record rather
 *      than a struct with a member literally named `<fooKey>`.
 *   2. Nullable properties are not required — the protocol drops `null`
 *      properties, so such a member arrives absent ({@link unrequireNullable}).
 *      The `Float`/`Double`/`BytesValue` wrappers become the bare scalars
 *      proto3 JSON sends ({@link WRAPPERS}).
 *   3. Component names. Schemas are named by their proto message
 *      (`scaleway.instance.v1.Server.State`); the document's own package
 *      prefix is dropped (`Server.State`), so shapes read `ServerState`
 *      rather than `ScalewayInstanceV1ServerState`. Shared protos
 *      (`scaleway.std.File`, `google.type.Money`) keep their full names.
 *      A schema that would take an operation's shape name gets an `Enum` /
 *      `Result` suffix, so the operation keeps its own.
 *
 * After the shared OpenAPI→Smithy conversion:
 *
 *   4. Stamp the spec's `servers[0].url` onto every operation's
 *      `smithy.api#http.baseUrl` (Generative APIs answer on
 *      `api.scaleway.ai`, everything else on `api.scaleway.com`).
 *   5. Stamp `smithy.api#paginated` on list operations — see
 *      {@link paginationFor}.
 *   6. Make `region` / `zone` path labels optional: the protocol fills them
 *      from the configured default (`SCW_DEFAULT_REGION` /
 *      `SCW_DEFAULT_ZONE`), as the official SDKs do — see
 *      {@link relaxLocality}.
 *   7. Add a `…Raw` sibling to every file download (`?dl=1`) — see
 *      {@link RAW_DOWNLOADS}.
 *
 * Operation names are verbNoun from Scaleway's PascalCase operationIds
 * (`ListServers` → `listServers`). Patches live in
 * `patches/<slug>/*.json` and apply in finalizeConvert.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import {
  RAW_RESPONSE_TRAIT,
  SENSITIVE_FIELD_PATTERNS,
} from "@distilled.cloud/core/codegen/openapi";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { RENAME_METADATA_KEY } from "@distilled.cloud/core/codegen/rewrite-operation-ids";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = resolveSpecPath(root, "specs/spec-mirror-scaleway/specs/_manifest.json");
const specsDir = path.dirname(manifestPath);
const outDir = path.join(root, ".generated-specs");

if (!fs.existsSync(manifestPath)) {
  throw new Error(
    `${manifestPath} not found — run \`pnpm specs:local scaleway\` (or specs:fetch) first`,
  );
}

interface ManifestEntry {
  readonly proto: string;
  readonly product: string;
  readonly version: string;
  readonly api: string;
  readonly output: string;
  /** `scaleway-sdk-js` for a document the mirror derived from the JS SDK. */
  readonly source?: string;
  /** A derived document whose routes join this published one. */
  readonly mergeInto?: string;
}

/**
 * Documents the portal publishes that the SDK does not generate, with the
 * reason. Anything listed here is reported on every run.
 */
const EXCLUDED: Record<string, string> = {
  // "Fake API for testing": documented, but api.scaleway.com answers
  // `501 unknown service` on its routes (checked 2026-10-12).
  "scaleway.test.v1.Api": "not served by api.scaleway.com",
};

const allEntries = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as ManifestEntry[];

/**
 * Derived documents that extend a published one (Edge Services' VPC
 * endpoints): their routes and schemas are merged into the target in
 * {@link preprocess}, so they surface in the published API's module.
 */
const merges = new Map<string, ManifestEntry[]>();
for (const entry of allEntries) {
  if (entry.mergeInto === undefined) continue;
  merges.set(entry.mergeInto, [...(merges.get(entry.mergeInto) ?? []), entry]);
}

const manifest = allEntries.filter((entry) => {
  if (entry.mergeInto !== undefined) return false;
  const reason = EXCLUDED[entry.proto];
  if (reason !== undefined) console.warn(`   ⚠️  ${entry.proto}: skipped — ${reason}`);
  return reason === undefined;
});

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;
const COMPONENT_PREFIX = "#/components/schemas/";

/** Walk every object node of a JSON document, parents before children. */
const walk = (node: unknown, visit: (obj: Record<string, any>) => void): void => {
  if (Array.isArray(node)) {
    for (const item of node) walk(item, visit);
  } else if (node !== null && typeof node === "object") {
    visit(node as Record<string, any>);
    for (const value of Object.values(node)) walk(value, visit);
  }
};

/** `{ properties: { "<fooKey>": T }, additionalProperties: true }` → `{ additionalProperties: T }`. */
const mapPlaceholder = (schema: Record<string, any>): void => {
  const props = schema.properties;
  if (props === null || typeof props !== "object") return;
  const keys = Object.keys(props);
  if (keys.length !== 1 || !/^<[^>]+>$/.test(keys[0]!)) return;
  schema.additionalProperties = props[keys[0]!];
  delete schema.properties;
  if (Array.isArray(schema.required)) delete schema.required;
  delete schema["x-properties-order"];
};

/**
 * A required property that may be `null` → optional. The protocol drops
 * `null` properties (see src/protocol.ts), so on the response side such a
 * member is absent, never `null` (MNQ `Protocol.active`).
 */
const unrequireNullable = (schema: Record<string, any>): void => {
  if (!Array.isArray(schema.required) || schema.properties === undefined) return;
  schema.required = schema.required.filter((name: string) => {
    const type = schema.properties?.[name]?.type;
    return !(Array.isArray(type) && type.includes("null"));
  });
  if (schema.required.length === 0) delete schema.required;
};

/**
 * proto3 JSON writes the `google.protobuf.*Value` wrappers as the bare
 * value (or `null`). The export gets that right for most of them
 * (`Int32Value` is `["integer", "null"]`) but writes these three as
 * `{ value: … }` objects, which the wire never sends (RDB
 * `EngineSetting.float_min` answers `0.5`).
 */
const WRAPPERS: Record<string, Record<string, unknown>> = {
  "google.protobuf.FloatValue": { type: ["number", "null"], format: "float" },
  "google.protobuf.DoubleValue": { type: ["number", "null"], format: "double" },
  "google.protobuf.BytesValue": { type: ["string", "null"], format: "byte" },
};

/** Add a derived document's routes and schemas to a published one. */
const mergeDerived = (spec: any, extra: ManifestEntry): void => {
  const derived = JSON.parse(fs.readFileSync(path.join(specsDir, extra.output), "utf8"));
  for (const [route, item] of Object.entries<any>(derived.paths ?? {})) {
    for (const [method, op] of Object.entries<any>(item)) {
      if (spec.paths?.[route]?.[method] !== undefined) {
        throw new Error(`${extra.output}: ${method.toUpperCase()} ${route} is already published`);
      }
      spec.paths[route] = { ...spec.paths[route], [method]: op };
    }
  }
  spec.components.schemas = { ...derived.components?.schemas, ...spec.components.schemas };
};

const preprocess = (entry: ManifestEntry) => (spec: any) => {
  const slug = entry.output.replace(/\.json$/, "");
  for (const extra of merges.get(slug) ?? []) mergeDerived(spec, extra);
  walk(spec, mapPlaceholder);
  walk(spec, unrequireNullable);
  for (const [name, schema] of Object.entries(WRAPPERS)) {
    if (spec.components?.schemas?.[name] !== undefined) spec.components.schemas[name] = schema;
  }

  // `scaleway.instance.v1.` is this document's own package.
  const own = `scaleway.${entry.product}.${entry.version}.`;
  const schemas: Record<string, any> = spec.components?.schemas ?? {};
  // A schema whose shape name would equal an operation's takes the
  // operation's name from it (`Server.Action` → `ServerAction`, so the
  // operation became `serverAction2`); such a schema gets a suffix instead.
  const operationIds = new Set<string>();
  for (const pathItem of Object.values<any>(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const id = pathItem?.[method]?.operationId;
      if (typeof id === "string") operationIds.add(id.toLowerCase());
    }
  }
  const taken = new Set(Object.keys(schemas));
  const renames = new Map<string, string>();
  for (const [name, schema] of Object.entries(schemas)) {
    const short = name.startsWith(own) ? name.slice(own.length) : name;
    let target = short !== "" && !(short in schemas) ? short : name;
    if (operationIds.has(target.replace(/\./g, "").toLowerCase())) {
      const suffixed = `${target}${Array.isArray(schema?.enum) ? "Enum" : "Result"}`;
      if (!taken.has(suffixed)) target = suffixed;
    }
    if (target !== name) {
      renames.set(name, target);
      taken.add(target);
    }
  }
  if (renames.size > 0) {
    spec.components.schemas = Object.fromEntries(
      Object.entries(schemas).map(([name, schema]) => [renames.get(name) ?? name, schema]),
    );
    walk(spec, (obj) => {
      if (typeof obj.$ref !== "string" || !obj.$ref.startsWith(COMPONENT_PREFIX)) return;
      const target = renames.get(obj.$ref.slice(COMPONENT_PREFIX.length));
      if (target !== undefined) obj.$ref = `${COMPONENT_PREFIX}${target}`;
    });
  }
  return spec;
};

const specServerUrl = (spec: any): string => {
  const url = spec?.servers?.[0]?.url;
  if (typeof url !== "string" || url === "") {
    throw new Error("OpenAPI document has no servers[0].url");
  }
  return url.replace(/\/+$/, "");
};

/** Resolve one level of `$ref` against the spec's components. */
const deref = (spec: any, schema: any): any => {
  const ref = schema?.$ref;
  if (typeof ref !== "string" || !ref.startsWith(COMPONENT_PREFIX)) return schema;
  return spec.components?.schemas?.[ref.slice(COMPONENT_PREFIX.length)] ?? schema;
};

/**
 * The `smithy.api#paginated` trait for one operation, or undefined when it
 * doesn't page. Scaleway pages two ways, matching the official SDKs'
 * `enrichForPagination` / `enrichForPaginationByCursor`:
 *
 *   • `mode: "page"` — `?page=N&page_size=M` (Instance v1 spells the size
 *     `per_page`) in, the collection beside `total_count` out.
 *     `src/pagination.ts`'s `paginateByTotalCount` stops once the pages
 *     fetched cover `total_count`. Instance v1 answers `total_count` as the
 *     `X-Total-Count` header, which the protocol folds into the body.
 *   • `mode: "token"` — `?page_token=` in, `next_page_token` out, traversed
 *     by core's `paginateToken`.
 */
const paginationFor = (spec: any, op: any): Record<string, string> | undefined => {
  const query = new Set(
    ((op.parameters ?? []) as any[]).filter((p) => p?.in === "query").map((p) => String(p.name)),
  );
  const schema = deref(spec, op.responses?.["200"]?.content?.["application/json"]?.schema);
  const props = schema?.properties;
  if (props === null || typeof props !== "object") return undefined;

  const arrays = Object.entries<any>(props)
    .filter(([, value]) => deref(spec, value)?.type === "array")
    .map(([name]) => name);
  if (arrays.length !== 1) return undefined;
  const items = arrays[0]!;

  if (query.has("page_token") && props.next_page_token !== undefined) {
    return {
      mode: "token",
      inputToken: "page_token",
      outputToken: "next_page_token",
      items,
      ...(query.has("page_size") ? { pageSize: "page_size" } : {}),
    };
  }
  if (query.has("page")) {
    const pageSize = query.has("page_size")
      ? "page_size"
      : query.has("per_page")
        ? "per_page"
        : undefined;
    if (pageSize === undefined) return undefined;
    return { mode: "page", inputToken: "page", outputToken: "total_count", items, pageSize };
  }
  return undefined;
};

await runOpenApiConvert({
  root,
  specs: manifest.map((entry) => {
    const slug = entry.output.replace(/\.json$/, "");
    return {
      name: slug,
      specPath: `specs/spec-mirror-scaleway/specs/${entry.output}`,
      preprocess: preprocess(entry),
      options: {
        namespace: `com.scaleway.${slug}`,
        serviceName: toPascal(slug),
      },
    };
  }),
  patchesDir: "patches",
  finalize: false,
  options: {
    namespace: "com.scaleway.api",
    serviceName: "Scaleway",
    skipDeprecated: true,
    successStatuses: ["200", "201", "202", "204"],
    // Core's `/password/i` also matches `password_regex` (a policy) and
    // `admin_password_encryption_ssh_key_id` (an ID); Scaleway's secret
    // passwords all END in `password` or are `*_password_encrypted_value`.
    sensitivePatterns: SENSITIVE_FIELD_PATTERNS.map((re) =>
      re.source === "password" ? /password(?:$|_encrypted_value$)/i : re,
    ),
  },
});

/**
 * `region` / `zone` path labels → optional members. Smithy would require
 * an `httpLabel` member; this model deliberately does not, because the
 * protocol substitutes the configured default when the caller leaves one
 * out.
 */
const relaxLocality = (model: any, inputShape: string | undefined): number => {
  const input = inputShape ? model.shapes[inputShape] : undefined;
  let relaxed = 0;
  for (const name of ["region", "zone"]) {
    const member = input?.members?.[name];
    if (member?.traits?.["smithy.api#httpLabel"] === undefined) continue;
    if (member.traits["smithy.api#required"] === undefined) continue;
    delete member.traits["smithy.api#required"];
    relaxed++;
  }
  return relaxed;
};

/**
 * Operations that also answer the file itself with `?dl=1` — the routes
 * scaleway-sdk-js calls with `urlParams(['dl', 1])` and
 * `responseType: 'blob'`. Without `dl` they answer the JSON
 * `scaleway.std.File` (`content` base64), which is what the Go SDK and the
 * CLI read and what the generated operation keeps. Each gets a `…Raw`
 * sibling whose output is the bytes; see {@link addRawDownload}.
 */
const RAW_DOWNLOADS: Record<string, readonly string[]> = {
  account_contract_v3: ["GET /account/v3/contract-signatures/{contract_signature_id}/download"],
  billing_v2beta1: [
    "GET /billing/v2beta1/export-invoices",
    "GET /billing/v2beta1/invoices/{invoice_id}/download",
  ],
  containers_v1: ["GET /containers/v1/regions/{region}/private-endpoint-ca"],
  datawarehouse_v1beta1: [
    "GET /datawarehouse/v1beta1/regions/{region}/deployments/{deployment_id}/certificate",
  ],
  domain_v2beta1: ["GET /domain/v2beta1/dns-zones/{dns_zone}/raw"],
  environmental_footprint_user_v1alpha1: [
    "POST /environmental-footprint/v1alpha1/reports/download",
  ],
  inference_v1: ["GET /inference/v1/regions/{region}/deployments/{deployment_id}/certificate"],
  k8s_v1: [
    "GET /k8s/v1/regions/{region}/clusters/{cluster_id}/kubeconfig",
    "GET /k8s/v1/regions/{region}/pools/{pool_id}/user-data/{key}",
  ],
  kafka_v1alpha1: [
    "GET /kafka/v1alpha1/regions/{region}/clusters/{cluster_id}/certificate-authority",
  ],
  messageq_v1alpha1: [
    "GET /messageq/v1alpha1/regions/{region}/deployments/{deployment_id}/certificate-authority",
  ],
  mongodb_v1: ["GET /mongodb/v1/regions/{region}/instances/{instance_id}/certificate"],
  mongodb_v1alpha1: ["GET /mongodb/v1alpha1/regions/{region}/instances/{instance_id}/certificate"],
  rdb_v1: ["GET /rdb/v1/regions/{region}/instances/{instance_id}/certificate"],
  redis_v1: ["GET /redis/v1/zones/{zone}/clusters/{cluster_id}/certificate"],
  searchdb_v1alpha1: [
    "GET /searchdb/v1alpha1/regions/{region}/deployments/{deployment_id}/certificate-authority",
  ],
};

/**
 * Add `<Op>Raw` beside a file-download operation: the same input, the
 * `rawDownload` flag on its http trait (the protocol appends `dl=1`), and
 * an output that is the response body's bytes (generate.ts emits it as
 * `Uint8Array`). Named after the operation's final name, so the deferred
 * rename leaves it alone.
 */
const addRawDownload = (model: any, ns: string, opId: string): void => {
  const op = model.shapes[opId];
  const rename: Record<string, string> = model.metadata?.[RENAME_METADATA_KEY] ?? {};
  const base = (rename[opId] ?? opId).split("#")[1]!;
  const rawId = `${ns}#${base}Raw`;
  const inputId = `${ns}#${base}RawRequest`;
  const outputId = `${ns}#${base}RawResponse`;
  for (const id of [rawId, inputId, outputId]) {
    if (id in model.shapes) throw new Error(`${id} already exists`);
  }
  model.shapes[inputId] = structuredClone(model.shapes[op.input.target]);
  model.shapes[outputId] = {
    type: "structure",
    members: {
      body: {
        target: "smithy.api#Blob",
        traits: { [RAW_RESPONSE_TRAIT]: {}, "smithy.api#required": {} },
      },
    },
    traits: {},
  };
  const doc = op.traits["smithy.api#documentation"];
  model.shapes[rawId] = {
    ...structuredClone(op),
    input: { target: inputId },
    output: { target: outputId },
    traits: {
      ...structuredClone(op.traits),
      "smithy.api#http": { ...op.traits["smithy.api#http"], rawDownload: true },
      // The summary only: the operation's body text describes the JSON form.
      "smithy.api#documentation": `${typeof doc === "string" ? `${doc.split("\n\n")[0]}\n\n` : ""}The file itself, as bytes (\`?dl=1\`), rather than the JSON file object.`,
    },
  };
  const service = Object.values<any>(model.shapes).find((s) => s?.type === "service");
  service?.operations?.push({ target: rawId });
};

let stampedUrls = 0;
let stampedPages = 0;
let rawDownloads = 0;
let relaxedLabels = 0;
for (const entry of manifest) {
  const slug = entry.output.replace(/\.json$/, "");
  const spec = JSON.parse(fs.readFileSync(path.join(specsDir, entry.output), "utf8"));
  const modelPath = path.join(outDir, `${slug}.json`);
  if (!fs.existsSync(modelPath)) continue;
  const model = JSON.parse(fs.readFileSync(modelPath, "utf8"));
  if (!Object.values<any>(model.shapes ?? {}).some((s) => s?.type === "operation")) {
    // Serverless Containers v1beta1 is fully deprecated (v1 replaced it);
    // drop the model rather than generate a hollow module.
    console.warn(`   ⚠️  ${slug}: no operations (all deprecated?) — dropped`);
    fs.unlinkSync(modelPath);
    continue;
  }
  const serverUrl = specServerUrl(spec);
  // Pagination reads response schemas, so it sees the renamed components.
  const prepared = preprocess(entry)(structuredClone(spec));

  const byRoute = new Map<string, Record<string, string>>();
  const rawRoutes = new Set<string>(RAW_DOWNLOADS[slug] ?? []);
  for (const [pathTemplate, pathItem] of Object.entries<any>(prepared.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const op = pathItem?.[method];
      if (!op || op.deprecated) continue;
      const trait = paginationFor(prepared, op);
      if (trait) byRoute.set(`${method.toUpperCase()} ${pathTemplate}`, trait);
      // Derived `Blob` downloads (Dedibox invoices) are flagged by the mirror.
      if (op["x-distilled-raw-download"] === true)
        rawRoutes.add(`${method.toUpperCase()} ${pathTemplate}`);
    }
  }

  let paginated = 0;
  for (const shape of Object.values<any>(model.shapes ?? {})) {
    if (shape?.type !== "operation") continue;
    const http = shape.traits?.["smithy.api#http"];
    if (!http || typeof http !== "object") continue;
    http.baseUrl = serverUrl;
    stampedUrls++;
    relaxedLabels += relaxLocality(model, shape.input?.target);
    const trait = byRoute.get(`${http.method} ${http.uri}`);
    if (!trait) continue;
    if (shape.traits["smithy.api#paginated"] === undefined) {
      shape.traits["smithy.api#paginated"] = trait;
    }
    const output = model.shapes[shape.output?.target];
    if (trait.mode === "page" && output?.members && !("total_count" in output.members)) {
      // Instance v1 answers the count as the `X-Total-Count` header; the
      // protocol folds it into the body, so the output models it there.
      output.members.total_count = {
        target: "smithy.api#Integer",
        traits: {
          "smithy.api#documentation":
            "Total number of items, from the `X-Total-Count` response header.",
        },
      };
    }
    paginated++;
  }
  if (paginated !== byRoute.size) {
    throw new Error(
      `${slug}: ${byRoute.size} paginated route(s) detected but ${paginated} stamped — ` +
        `an operation's http uri no longer matches its OpenAPI path`,
    );
  }
  stampedPages += paginated;

  for (const route of rawRoutes) {
    const [method, uri] = route.split(" ");
    const found = Object.entries<any>(model.shapes).find(
      ([, s]) =>
        s?.type === "operation" &&
        s.traits?.["smithy.api#http"]?.method === method &&
        s.traits["smithy.api#http"].uri === uri,
    );
    if (found === undefined) throw new Error(`${slug}: no operation for raw download ${route}`);
    addRawDownload(model, `com.scaleway.${slug}`, found[0]);
    rawDownloads++;
  }
  fs.writeFileSync(modelPath, JSON.stringify(model, null, 2) + "\n");
}

console.log(
  `🔗 stamped ${stampedUrls} operation baseUrl(s), ${stampedPages} paginated, ` +
    `${relaxedLabels} region/zone label(s) defaulted, ${rawDownloads} raw download(s)`,
);

await finalizeConvert({ root });
