#!/usr/bin/env -S node --conditions=bun
/**
 * convert — Starburst Galaxy's public OpenAPI descriptions → Smithy JSON
 * models in .generated-specs.
 *
 * Input:  specs/spec-mirror-starburst-galaxy/specs/v1.json ("Starburst Public
 *         API", https://galaxy.starburst.io/public/openapi/v1/json)
 *         specs/spec-mirror-starburst-galaxy/specs/v2.json ("Starburst Galaxy
 *         Public API", https://galaxy.starburst.io/public/openapi/v2/json)
 *         patches/<model>/*.json (RFC-6902 ops on the converted models,
 *         applied by finalizeConvert)
 * Output: .generated-specs/<tag>.json, one model (one service module) per
 *         primary tag
 *
 * The ordering is load-bearing, as in Hetzner's pipeline:
 *
 *   1. Read both documents and fold `v2` into `v1` (see {@link mergeV2}).
 *      `v2` carries only the Data Product operations, whose `v1` versions
 *      are deprecated; `skipDeprecated` drops those, so each Data Product
 *      operation is generated once, from `v2`. Then rewrite every
 *      discriminated hierarchy into a `oneOf` of standalone subtypes (see
 *      {@link flattenDiscriminators}); the shared converter does not read
 *      `discriminator`, and the patches name the flattened subtypes.
 *   2. Bucket operations by PRIMARY tag. Galaxy's tags read
 *      `Cluster Service`, `Catalog Service`, …; the ` Service` suffix is
 *      dropped, so the modules are `cluster`, `catalog`, `role`, ….
 *   3. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      stamp `smithy.api#paginated` on the token-paged list operations (see
 *      {@link paginationFor}).
 *   4. finalizeConvert applies the patches under the spec's names, then the
 *      deferred verbNoun operation names.
 *
 * `scripts/generate.ts` compiles the already-patched models.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const rootDir = path.resolve(import.meta.dirname, "..");
const specPath = (version: "v1" | "v2") =>
  resolveSpecPath(rootDir, `specs/spec-mirror-starburst-galaxy/specs/${version}.json`);
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** `Data Product Usage Example Service` → `data_product_usage_example`. */
const toSlug = (tag: string): string =>
  tag
    .replace(/\s+Service$/i, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

/**
 * Status → error class. Galaxy documents `{ message, … }` bodies for
 * 400/403/404/409 (core's classes) and `FailedPrecondition` for 412 on the
 * operations that can hit a state conflict. 401 and 429 are global. The 412
 * class is `PreconditionFailed` in `src/errors.ts`, wired into the protocol's
 * `statusMap` for operations that do not declare it.
 */
const STATUS_TO_ERROR_CLASS = {
  "400": "BadRequest",
  "403": "Forbidden",
  "404": "NotFound",
  "409": "Conflict",
  "412": "PreconditionFailed",
} as const;

/**
 * Members of every typed error class: the body's `message`, and the whole
 * body, where the members the spec documents beside it are read
 * (`BadRequest`'s `fields`, `FailedPrecondition`'s and `NotFoundError`'s
 * `detail`). Galaxy's bodies carry no numeric `code`, so the generator's
 * default `{ code, message }` would hold a constant 0.
 */
const ERROR_MEMBERS = {
  message: { target: "smithy.api#String" },
  body: { target: "smithy.api#Document" },
};

const V1 = "/public/api/v1";
const V2 = "/public/api/v2";

/**
 * Operation names, keyed by `"METHOD path"`. Galaxy's operationIds are
 * verb-first already, so verbNoun leaves them as they are — including the
 * shapes a reader (and the Alchemy resources named after these operations)
 * would trip over:
 *
 *   • singular lists: `listCluster` → `listClusters`;
 *   • `patchUpdate<X>` → `update<X>`;
 *   • a parent repeated in the name: `createServiceAccountServiceAccountPassword`
 *     → `createServiceAccountPassword`, `deleteSchemaCatalog` →
 *     `deleteCatalogSchema`;
 *   • inconsistent casing and number: `listSQLServerCatalogs` beside
 *     `createSqlServerCatalog`, `getCassandraCatalogs` for one catalog;
 *   • ids that are not verbNoun: `crossAccountIamRoleMetadata`,
 *     `brieflistLiveTable`, `schemaLiveTable`.
 *
 * `DELETE /catalog/{catalogId}` ("Delete catalog metadata", Discovery) is
 * `deleteCatalogMetadata`: deleting a catalog itself is the per-type
 * `delete<Type>Catalog`.
 */
const OPERATION_NAMES: Record<string, string> = {
  // catalog
  [`GET ${V1}/catalog`]: "listCatalogs",
  [`GET ${V1}/catalogType/cassandra/catalog/{catalogId}`]: "getCassandraCatalog",
  [`GET ${V1}/catalogType/sqlserver/catalog`]: "listSqlServerCatalogs",
  [`GET ${V1}/catalogType/sqlserver/catalog/{catalogId}`]: "getSqlServerCatalog",
  // cluster
  [`GET ${V1}/cluster`]: "listClusters",
  [`PATCH ${V1}/cluster/{clusterId}`]: "updateCluster",
  // column mask
  [`GET ${V1}/columnMask`]: "listColumnMasks",
  [`PATCH ${V1}/columnMask/{columnMaskId}`]: "updateColumnMask",
  // cross-account IAM role
  [`GET ${V1}/crossAccountIamRole`]: "listCrossAccountIamRoles",
  [`GET ${V1}/crossAccountIamRoleMetadata`]: "getCrossAccountIamRoleMetadata",
  // data domain
  [`GET ${V1}/dataDomain`]: "listDataDomains",
  [`PATCH ${V1}/dataDomain/{dataDomainId}`]: "updateDataDomain",
  [`PATCH ${V1}/dataDomain/{dataDomainId}/dataProductsReassignment`]:
    "reassignDataDomainDataProducts",
  // data product (v2)
  [`GET ${V2}/dataProduct`]: "listDataProducts",
  [`PATCH ${V2}/dataProduct/{dataProductId}`]: "updateDataProduct",
  // data product usage example
  [`GET ${V1}/dataProduct/{dataProductId}/usageExample`]: "listDataProductUsageExamples",
  [`PATCH ${V1}/dataProduct/{dataProductId}/usageExample/{usageExampleId}`]:
    "updateDataProductUsageExample",
  [`DELETE ${V1}/dataProduct/{dataProductId}/usageExample/{usageExampleId}`]:
    "deleteDataProductUsageExample",
  // data quality
  [`GET ${V1}/dataQualityCheck/{dataQualityCheckId}`]: "getDataQualityCheck",
  // discovery (catalog metadata)
  [`DELETE ${V1}/catalog/{catalogId}`]: "deleteCatalogMetadata",
  [`GET ${V1}/catalog/{catalogId}/catalogMetadata`]: "getCatalogMetadata",
  [`PATCH ${V1}/catalog/{catalogId}/catalogMetadata`]: "updateCatalogMetadata",
  [`GET ${V1}/catalog/{catalogId}/schema`]: "listCatalogSchemas",
  [`PATCH ${V1}/catalog/{catalogId}/schema/{schemaId}`]: "updateCatalogSchema",
  [`DELETE ${V1}/catalog/{catalogId}/schema/{schemaId}`]: "deleteCatalogSchema",
  [`GET ${V1}/catalog/{catalogId}/schema/{schemaId}/table`]: "listCatalogSchemaTables",
  [`PATCH ${V1}/catalog/{catalogId}/schema/{schemaId}/table/{tableId}`]: "updateCatalogSchemaTable",
  [`DELETE ${V1}/catalog/{catalogId}/schema/{schemaId}/table/{tableId}`]:
    "deleteCatalogSchemaTable",
  [`GET ${V1}/catalog/{catalogId}/schema/{schemaId}/table/{tableId}/column`]:
    "listCatalogSchemaTableColumns",
  [`PATCH ${V1}/catalog/{catalogId}/schema/{schemaId}/table/{tableId}/column`]:
    "updateCatalogSchemaTableColumns",
  [`PATCH ${V1}/catalog/{catalogId}/schema/{schemaId}/table/{tableId}/column/{columnId}`]:
    "updateCatalogSchemaTableColumn",
  [`DELETE ${V1}/catalog/{catalogId}/schema/{schemaId}/table/{tableId}/column/{columnId}`]:
    "deleteCatalogSchemaTableColumn",
  // file ingest source
  [`GET ${V1}/fileIngestSource`]: "listFileIngestSources",
  [`PATCH ${V1}/fileIngestSource/{fileIngestSourceId}`]: "updateFileIngestSource",
  // group
  [`GET ${V1}/group`]: "listGroups",
  [`PATCH ${V1}/group/{groupId}`]: "updateGroup",
  // kafka ingest source
  [`GET ${V1}/kafkaIngestSource`]: "listKafkaIngestSources",
  [`PATCH ${V1}/kafkaIngestSource/{kafkaIngestSourceId}`]: "updateKafkaIngestSource",
  // live table
  [`GET ${V1}/liveTable`]: "listLiveTables",
  [`GET ${V1}/liveTable:brieflist`]: "listBriefLiveTables",
  [`PUT ${V1}/liveTable:schema`]: "updateLiveTableSchema",
  // policy
  [`GET ${V1}/policy`]: "listPolicies",
  [`PATCH ${V1}/policy/{policyId}`]: "updatePolicy",
  // private link
  [`GET ${V1}/privatelink`]: "listPrivateLinks",
  [`GET ${V1}/privatelink/{privatelinkId}`]: "getPrivateLink",
  // privilege
  [`GET ${V1}/role/{roleId}/privilege`]: "listRolePrivileges",
  // role
  [`GET ${V1}/role`]: "listRoles",
  [`PATCH ${V1}/role/{roleId}`]: "updateRole",
  [`GET ${V1}/role/{roleId}/rolegrant`]: "listRoleGrants",
  // row filter
  [`GET ${V1}/rowFilter`]: "listRowFilters",
  [`PATCH ${V1}/rowFilter/{rowFilterId}`]: "updateRowFilter",
  // schema discovery
  [`GET ${V1}/catalog/{catalogId}/schemaDiscovery`]: "listSchemaDiscoveries",
  [`POST ${V1}/catalog/{catalogId}/schemaDiscovery`]: "createSchemaDiscovery",
  // service account
  [`GET ${V1}/serviceAccount`]: "listServiceAccounts",
  [`PATCH ${V1}/serviceAccount/{serviceAccountId}`]: "updateServiceAccount",
  [`POST ${V1}/serviceAccount/{serviceAccountId}/serviceAccountPassword`]:
    "createServiceAccountPassword",
  [`DELETE ${V1}/serviceAccount/{serviceAccountId}/serviceAccountPassword/{serviceAccountPasswordId}`]:
    "deleteServiceAccountPassword",
  // SQL jobs
  [`GET ${V1}/sqlJob`]: "listSqlJobs",
  [`GET ${V1}/sqlJob/{sqlJobId}/sqlJobHistory`]: "listSqlJobHistory",
  [`GET ${V1}/sqlJob/{sqlJobId}/sqlJobStatus`]: "getSqlJobStatus",
  // tag ("Apply a tag to …" / remove it)
  [`GET ${V1}/tag`]: "listTags",
  [`PATCH ${V1}/tag/{tagId}`]: "updateTag",
  [`PUT ${V1}/tag/{tagId}/catalog/{catalogId}`]: "applyCatalogTag",
  [`DELETE ${V1}/tag/{tagId}/catalog/{catalogId}`]: "removeCatalogTag",
  [`PUT ${V1}/tag/{tagId}/catalog/{catalogId}/schema/{schemaId}`]: "applyCatalogSchemaTag",
  [`DELETE ${V1}/tag/{tagId}/catalog/{catalogId}/schema/{schemaId}`]: "removeCatalogSchemaTag",
  [`PUT ${V1}/tag/{tagId}/catalog/{catalogId}/schema/{schemaId}/table/{tableId}`]:
    "applyCatalogSchemaTableTag",
  [`DELETE ${V1}/tag/{tagId}/catalog/{catalogId}/schema/{schemaId}/table/{tableId}`]:
    "removeCatalogSchemaTableTag",
  [`PUT ${V1}/tag/{tagId}/catalog/{catalogId}/schema/{schemaId}/table/{tableId}/column/{columnId}`]:
    "applyCatalogSchemaTableColumnTag",
  [`DELETE ${V1}/tag/{tagId}/catalog/{catalogId}/schema/{schemaId}/table/{tableId}/column/{columnId}`]:
    "removeCatalogSchemaTableColumnTag",
  // user
  [`GET ${V1}/user`]: "listUsers",
  [`PATCH ${V1}/user/{userId}`]: "updateUser",
};

// ---- 1. Read both documents and fold v2 into v1 ----------------------------
const readSpec = (version: "v1" | "v2"): any => {
  const file = specPath(version);
  if (!fs.existsSync(file)) {
    throw new Error(
      `${file} not found — run \`pnpm specs:local starburst-galaxy\` (or specs:fetch) first`,
    );
  }
  return JSON.parse(fs.readFileSync(file, "utf-8"));
};

/**
 * Fold the `v2` document into `v1`, so one pipeline converts both.
 *
 * The two documents share most component schemas byte for byte (the error
 * bodies, `Exists`, `NotFoundError`, …), but a few differ under the same
 * name (the Data Product v2 payloads). A colliding `v2` schema that is
 * identical is shared; one that differs is renamed `<name>V2` and every
 * `$ref` to it inside `v2` is re-pointed, so `v1`'s operations keep their
 * own. A `v2` path that `v1` also declares fails the run: the documents are
 * expected to be disjoint, and silently letting one win would drop
 * operations.
 */
const mergeV2 = (v1: any, v2: any): { renamed: string[] } => {
  const v1Schemas: Record<string, unknown> = ((v1.components ??= {}).schemas ??= {});
  const renames = new Map<string, string>();
  for (const [name, schema] of Object.entries<unknown>(v2.components?.schemas ?? {})) {
    const existing = v1Schemas[name];
    if (existing === undefined || JSON.stringify(existing) === JSON.stringify(schema)) continue;
    const renamed = `${name}V2`;
    if (renamed in v1Schemas || renamed in (v2.components?.schemas ?? {})) {
      throw new Error(`v2 schema ${name} collides with v1 and ${renamed} is taken`);
    }
    renames.set(`#/components/schemas/${name}`, `#/components/schemas/${renamed}`);
  }
  const repoint = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(repoint);
    if (node === null || typeof node !== "object") return node;
    return Object.fromEntries(
      Object.entries(node).map(([k, v]) => [
        k,
        k === "$ref" && typeof v === "string" ? (renames.get(v) ?? v) : repoint(v),
      ]),
    );
  };
  for (const [name, schema] of Object.entries<unknown>(v2.components?.schemas ?? {})) {
    const target = renames.get(`#/components/schemas/${name}`)?.split("/").at(-1) ?? name;
    v1Schemas[target] = repoint(schema);
  }
  for (const [pathTemplate, pathItem] of Object.entries<unknown>(v2.paths ?? {})) {
    if (pathTemplate in v1.paths) throw new Error(`v2 path ${pathTemplate} is also in v1`);
    v1.paths[pathTemplate] = repoint(pathItem);
  }
  return { renamed: [...renames.keys()].map((ref) => ref.split("/").at(-1)!) };
};

/**
 * Rewrite every discriminated hierarchy into a `oneOf` of its subtypes.
 *
 * Galaxy models polymorphism the swagger way: a base schema with a
 * `discriminator.mapping` (`KafkaAuth`, `CreateMySQLCatalogRequest`, …), and
 * one `allOf: [{ $ref: <base> }, { properties }]` subtype per mapping key.
 * Nothing references a subtype except through the mapping, and the shared
 * converter does not read `discriminator`, so left alone every base
 * converts to its own members only: `CreateMySQLCatalogRequest` without
 * `host`, `KafkaAuth` without its SASL `password`.
 *
 * Each subtype becomes a standalone object — the base's properties, then its
 * own, with the discriminator property pinned to its mapping key — and each
 * discriminated node (a component, an inline copy of one inside another
 * schema, or one inside a subtype's own properties) becomes a `oneOf` over
 * those subtypes. Subtypes no longer `$ref` their base, which also breaks
 * the subtype → base → subtype cycle. A shape outside what Galaxy publishes
 * fails the run rather than converting half.
 */
const flattenDiscriminators = (spec: any): { bases: number; subtypes: number } => {
  const schemas: Record<string, any> = spec.components.schemas;
  const nameOf = (ref: unknown): string => {
    if (typeof ref !== "string" || !ref.startsWith("#/components/schemas/")) {
      throw new Error(`discriminator mapping target ${String(ref)} is not a component schema`);
    }
    const name = ref.slice("#/components/schemas/".length);
    if (!(name in schemas)) throw new Error(`discriminator mapping target ${name} is missing`);
    return name;
  };
  const isDiscriminated = (node: any): boolean =>
    node !== null &&
    typeof node === "object" &&
    !Array.isArray(node) &&
    node.discriminator?.mapping !== undefined;

  // 0. An inline enum on a base (`cloudKind`) would convert once per arm, as
  //    `<Arm>CloudKind`; hoist it to a `<Base><Prop>` component the arms share.
  //    The description stays beside the `$ref`, where the member docs read it.
  for (const [baseName, base] of Object.entries(schemas)) {
    if (!isDiscriminated(base)) continue;
    for (const [prop, def] of Object.entries<any>(base.properties ?? {})) {
      if (prop === base.discriminator.propertyName || !Array.isArray(def?.enum)) continue;
      const hoisted = `${baseName}${prop.charAt(0).toUpperCase()}${prop.slice(1)}`;
      if (hoisted in schemas)
        throw new Error(`cannot hoist ${baseName}.${prop}: ${hoisted} exists`);
      schemas[hoisted] = def;
      base.properties[prop] = {
        $ref: `#/components/schemas/${hoisted}`,
        ...(def.description === undefined ? {} : { description: def.description }),
      };
    }
  }

  // 1. Flatten every mapped subtype against the original base it extends.
  const flattened = new Map<string, { key: string; schema: any }>();
  const flattenAll = (node: unknown): void => {
    if (Array.isArray(node)) return node.forEach(flattenAll);
    if (node === null || typeof node !== "object") return;
    const n = node as any;
    if (isDiscriminated(n)) {
      const prop: string = n.discriminator.propertyName;
      for (const [key, ref] of Object.entries<unknown>(n.discriminator.mapping)) {
        const name = nameOf(ref);
        const seen = flattened.get(name);
        if (seen) {
          if (seen.key !== key) throw new Error(`${name} is mapped as both ${seen.key} and ${key}`);
          continue;
        }
        const sub = schemas[name];
        const [baseRef, own, ...rest] = Array.isArray(sub?.allOf) ? sub.allOf : [];
        const base = baseRef?.$ref === undefined ? undefined : schemas[nameOf(baseRef.$ref)];
        if (
          !isDiscriminated(base) ||
          base.discriminator.propertyName !== prop ||
          own === undefined ||
          own.$ref !== undefined ||
          own.allOf !== undefined ||
          rest.length > 0
        ) {
          throw new Error(`${name} is not allOf [$ref <discriminated base>, { properties }]`);
        }
        if (base.properties?.[prop] === undefined) {
          throw new Error(`${name}: its base does not declare the discriminator ${prop}`);
        }
        const required = [...new Set([...(base.required ?? []), ...(own.required ?? []), prop])];
        flattened.set(name, {
          key,
          schema: {
            type: "object",
            description: own.description ?? base.description,
            required,
            properties: {
              ...base.properties,
              ...own.properties,
              [prop]: { ...base.properties[prop], enum: [key] },
            },
          },
        });
      }
    }
    Object.values(n).forEach(flattenAll);
  };
  flattenAll(spec);

  // 2. Replace every discriminated node with a oneOf over its subtypes.
  let bases = 0;
  const toOneOf = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(toOneOf);
    if (node === null || typeof node !== "object") return node;
    const n = node as any;
    if (isDiscriminated(n)) {
      bases++;
      return {
        ...(n.description === undefined ? {} : { description: n.description }),
        oneOf: Object.values<string>(n.discriminator.mapping).map(($ref) => ({ $ref })),
      };
    }
    return Object.fromEntries(Object.entries(n).map(([k, v]) => [k, toOneOf(v)]));
  };
  spec.paths = toOneOf(spec.paths);
  spec.components = toOneOf(spec.components);
  // A subtype is built from its original properties, so a discriminated node
  // inside them (`NewSchemaNewJsonSchema.columns`) is rewritten here too.
  for (const [name, { schema }] of flattened) spec.components.schemas[name] = toOneOf(schema);
  return { bases, subtypes: flattened.size };
};

const fullSpec = readSpec("v1");
const { renamed } = mergeV2(fullSpec, readSpec("v2"));
if (renamed.length) {
  console.log(`🔧 v2 schemas renamed <name>V2 (differ from v1): ${renamed.join(", ")}`);
}
const flat = flattenDiscriminators(fullSpec);
console.log(
  `🔧 ${flat.bases} discriminated schemas → oneOf over ${flat.subtypes} flattened subtypes`,
);

/** Resolve a local `#/components/...` reference (one level). */
const deref = (node: any): any => {
  if (typeof node?.$ref !== "string") return node;
  const parts = node.$ref.replace(/^#\//, "").split("/");
  let cur: any = fullSpec;
  for (const p of parts) cur = cur?.[p];
  return cur;
};

// ---- 2. Bucket paths by primary tag ----------------------------------------
const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
const unrouted: string[] = [];
for (const [pathTemplate, pathItem] of Object.entries<Record<string, any>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = pathItem[method];
    if (!op) continue;
    const rawTag: string | undefined =
      Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : undefined;
    if (rawTag === undefined) unrouted.push(`${method.toUpperCase()} ${pathTemplate}`);
    const slug = toSlug(rawTag ?? "misc") || "misc";
    if (!tagBuckets.has(slug)) tagBuckets.set(slug, {});
    const bucketPaths = tagBuckets.get(slug)!;
    if (!bucketPaths[pathTemplate]) {
      bucketPaths[pathTemplate] = pathItem.parameters ? { parameters: pathItem.parameters } : {};
    }
    bucketPaths[pathTemplate]![method] = op;
  }
}
if (unrouted.length) {
  console.warn(
    `   ⚠️  ${unrouted.length} untagged operation(s) fell into \`misc\`:\n      ` +
      unrouted.join("\n      "),
  );
}

// ---- 3b. Pagination ---------------------------------------------------------
/**
 * The `smithy.api#paginated` trait for one operation, or undefined when it
 * doesn't page.
 *
 * Galaxy pages by TOKEN: `?pageToken=…&pageSize=N` in, and a `Paginated*`
 * response `{ nextPageToken, result: [...] }` out, where `nextPageToken` is
 * `""` on the last page (core's `paginateToken` treats `""` as terminal).
 * The converter's own detection looks for `nextToken`/`next_token`, not
 * `nextPageToken`, so the trait is stamped here, read off the operation:
 *   • `inputToken` — the `pageToken` query parameter must exist;
 *   • `outputToken` — `nextPageToken` must exist on the 200 body;
 *   • `items` — the body's `result` array.
 */
const paginationFor = (pathItem: any, op: any): Record<string, string> | undefined => {
  const params = [...(pathItem.parameters ?? []), ...(op.parameters ?? [])].map(deref);
  const hasToken = params.some((p: any) => p?.in === "query" && p?.name === "pageToken");
  if (!hasToken) return undefined;
  const hasPageSize = params.some((p: any) => p?.in === "query" && p?.name === "pageSize");

  const schema = deref(deref(op.responses?.["200"])?.content?.["application/json"]?.schema);
  const props = schema?.properties;
  if (!props || props.nextPageToken === undefined) return undefined;
  if (deref(props.result)?.type !== "array") return undefined;

  return {
    mode: "token",
    inputToken: "pageToken",
    outputToken: "nextPageToken",
    items: "result",
    ...(hasPageSize ? { pageSize: "pageSize" } : {}),
  };
};

// ---- 3. Convert each bucket ------------------------------------------------
clearModels(outDir);

let written = 0;
let totalOps = 0;
let totalPaginated = 0;
const convertedRoutes = new Set<string>();
for (const slug of [...tagBuckets.keys()].sort()) {
  const paths = tagBuckets.get(slug)!;
  const model = convertOpenApiToSmithy(
    { ...fullSpec, paths },
    {
      deferNaming: true,
      namespace: `com.starburst.galaxy.${slug}`,
      // Galaxy's own tag name (`Cluster Service`). The bare `Cluster` would
      // take the id of the `Cluster` schema and push it to `Cluster2`.
      serviceName: `${toPascal(slug)}Service`,
      skipDeprecated: true,
      statusToErrorClass: STATUS_TO_ERROR_CLASS,
      errorShapes: Object.fromEntries(
        Object.values(STATUS_TO_ERROR_CLASS).map((cls) => [cls, { members: ERROR_MEMBERS }]),
      ),
      operationNames: OPERATION_NAMES,
    },
  );

  const operations = Object.values<any>(model.shapes).filter((s) => s.type === "operation");
  if (operations.length === 0) {
    console.warn(`   ⚠️  ${slug}: no operations — bucket dropped`);
    continue;
  }

  // Stamp pagination, matching on the http trait's method + uri. Galaxy's
  // path templates contain no characters the converter sanitizes, so the
  // emitted `uri` is the OpenAPI path verbatim.
  const byRoute = new Map<string, Record<string, string>>();
  for (const [pathTemplate, pathItem] of Object.entries<any>(paths)) {
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      // `skipDeprecated` drops these, so there is no operation to stamp.
      if (!op || op.deprecated === true) continue;
      const trait = paginationFor(fullSpec.paths[pathTemplate], op);
      if (trait) byRoute.set(`${method.toUpperCase()} ${pathTemplate}`, trait);
    }
  }
  let paginated = 0;
  for (const shape of operations) {
    const http = shape.traits?.["smithy.api#http"];
    if (!http) continue;
    const route = `${http.method} ${http.uri}`;
    convertedRoutes.add(route);
    const trait = byRoute.get(route);
    if (!trait) continue;
    shape.traits["smithy.api#paginated"] = trait;
    paginated++;
  }
  // A miss means a uri no longer round-trips and the SDK would silently lose
  // `.pages()` on that endpoint.
  if (paginated !== byRoute.size) {
    throw new Error(
      `${slug}: ${byRoute.size} paginated route(s) detected but ${paginated} stamped — ` +
        `an operation's http uri no longer matches its OpenAPI path`,
    );
  }

  writeModel(path.join(outDir, `${slug}.json`), model);
  written++;
  totalOps += operations.length;
  totalPaginated += paginated;
}

// A name for a route that no longer converts is a rename that silently
// stopped applying; fail so the table is pruned with the spec.
const staleNames = Object.keys(OPERATION_NAMES).filter((route) => !convertedRoutes.has(route));
if (staleNames.length) {
  throw new Error(`OPERATION_NAMES for routes no longer converted: ${staleNames.join(", ")}`);
}
console.log(
  `✅ ${written} Smithy models (${totalOps} operations, ${totalPaginated} paginated) → ${outDir}`,
);

await finalizeConvert({ root: rootDir });
