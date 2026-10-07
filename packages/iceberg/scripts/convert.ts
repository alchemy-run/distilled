#!/usr/bin/env -S node --conditions=bun
/**
 * convert — the Apache Iceberg REST Catalog OpenAPI spec → one Smithy JSON
 * model in .generated-specs.
 *
 * Input:  specs/spec-mirror-iceberg/specs/rest-catalog-open-api.yaml (OAS 3.1, YAML)
 * Output: .generated-specs/catalog.json                            (Smithy 2.0)
 *
 * What differs from a plain `runOpenApiConvert` (each step below says why):
 * routes lose their `/v1/{prefix}` head, one schema is renamed to free an
 * operation name, and typed errors and pagination are read from the spec.
 *
 *  1. ROUTES. Every catalog route is `/v1/{prefix}/…`, where `prefix` is a
 *     per-catalog value the server hands out from `GET /v1/config` (Basin
 *     Catalog, Polaris, Nessie and Unity each have their own). It is client
 *     configuration, not a per-call input — the same call against two
 *     warehouses differs only in it — so the routes are stored without the
 *     `/v1/{prefix}` (or bare `/v1`) head and `IcebergProtocol` adds it back
 *     from the credentials. A server with no prefix then gets `/v1/namespaces`
 *     rather than `/v1//namespaces`.
 *
 *  2. TYPED ERRORS. Every failure is `{ error: { message, type, code } }`, and
 *     several exceptions share a status (`loadTable` 404 is
 *     `NoSuchTableException`, `listTables` 404 is `NoSuchNamespaceException`).
 *     The spec names the exception for each operation's status in the
 *     response `example(s)` (`error.type`) or, failing that, in the response
 *     description. Each named exception becomes ONE error class matched on
 *     its status AND `/error/type`, attached to the operations that document
 *     it. Statuses every route shares (400, 401, 403, 419, 503, 5XX) are
 *     dispatched by the protocol's status map instead. Catalogs that spell
 *     an exception differently are matched through ERROR_TYPE_ALIASES.
 *
 *  3. UNKNOWN COMMIT STATE. A 500/502/504 from a commit (`updateTable`,
 *     `commitTransaction`, `replaceView`) means the commit may or may not
 *     have been applied. Those surface as `CommitStateUnknownException`, which
 *     carries no HTTP status trait on purpose: a status would classify it as a
 *     transient ServerError and the default retry policy would replay a
 *     commit whose outcome is unknown.
 *
 *  4. PAGINATION. List routes take `pageToken` and answer `next-page-token`,
 *     which the converter does not recognize; the trait is stamped here.
 *
 * HEAD routes (`namespaceExists`, `tableExists`, `viewExists`) get no typed
 * errors: a HEAD response has no body to read `error.type` from.
 *
 * Patches: Smithy RFC-6902 files under `patches/catalog/` apply in
 * `finalizeConvert` (there are none yet).
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  convertOpenApiToSmithy,
  ERROR_MATCHERS_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";
import { parse as parseYaml } from "yaml";

const root = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(
  root,
  "specs/spec-mirror-iceberg/specs/rest-catalog-open-api.yaml",
);
const outDir = path.join(root, ".generated-specs");
const MODEL = "catalog";
const NAMESPACE = "org.apache.iceberg.rest";

const HTTP_METHODS = ["get", "post", "put", "patch", "delete", "head"] as const;

/** Statuses every route shares — dispatched by IcebergProtocol's status map. */
const SHARED_STATUSES = new Set(["400", "401", "403", "419", "500", "503", "5XX"]);

/** Responses whose description says the commit outcome is unknown. */
const COMMIT_STATE_UNKNOWN = /commit state is unknown/i;
const COMMIT_STATE_UNKNOWN_CLASS = "CommitStateUnknownException";

/**
 * Other `error.type` spellings real catalogs send for a spec exception, at
 * the SAME status. The spec does not require catalogs to use its exception
 * names, and they don't: these were observed live against Cloudflare Basin
 * Catalog on 2026-10-05. A spelling is only listed once it has been seen.
 *
 * Basin Catalog also answers `dropTable` / `updateTable` on a missing table
 * with 403 `TableActionForbidden` ("not found or action forbidden"). That one
 * is deliberately NOT aliased: a 403 cannot be told apart from a genuine
 * permission denial, so it stays `Forbidden`.
 */
const ERROR_TYPE_ALIASES: Readonly<Record<string, readonly string[]>> = {
  AlreadyExistsException: ["NamespaceAlreadyExists", "EntityAlreadyExists"],
  NamespaceNotEmptyException: ["NamespaceNotEmpty"],
  NoSuchNamespaceException: ["NamespaceActionForbidden"],
  NoSuchTableException: ["TableActionForbidden"],
  CommitFailedException: ["CatalogCommitConflicts"],
};

/** `NoSuchTableException`-style names in prose. */
const EXCEPTION_NAME = /\b([A-Z][A-Za-z]+Exception)\b/g;

const spec: any = parseYaml(await fs.readFile(specPath, "utf8"));

const deref = (node: any): any => {
  while (node && typeof node === "object" && typeof node.$ref === "string") {
    node = node.$ref
      .replace(/^#\//, "")
      .split("/")
      .reduce(
        (acc: any, key: string) => acc?.[key.replaceAll("~1", "/").replaceAll("~0", "~")],
        spec,
      );
  }
  return node;
};

// ---- 1. Routes: drop the `/v1/{prefix}` head --------------------------------

const isPrefixParam = (p: any) => {
  const param = deref(p);
  return param?.in === "path" && param?.name === "prefix";
};

const paths: Record<string, any> = {};
for (const [route, item] of Object.entries<any>(spec.paths)) {
  let stripped: string;
  if (route.startsWith("/v1/{prefix}/")) stripped = route.slice("/v1/{prefix}".length);
  else if (route.startsWith("/v1/")) stripped = route.slice("/v1".length);
  else throw new Error(`unexpected route ${route}: every Iceberg REST route starts with /v1/`);
  if (paths[stripped]) throw new Error(`route collision after stripping /v1/{prefix}: ${stripped}`);

  if (Array.isArray(item.parameters))
    item.parameters = item.parameters.filter((p: any) => !isPrefixParam(p));
  for (const method of HTTP_METHODS) {
    const op = item[method];
    if (op && Array.isArray(op.parameters))
      op.parameters = op.parameters.filter((p: any) => !isPrefixParam(p));
  }
  paths[stripped] = item;
}
spec.paths = paths;

// ---- 1b. Schema names that collide with operation names ---------------------
// `FetchPlanningResult` is both an operation and the union it returns; the
// converter would suffix the operation (`fetchPlanningResult2`). Rename the
// schema instead so the operation keeps Iceberg's own name.
const SCHEMA_RENAMES: Readonly<Record<string, string>> = {
  FetchPlanningResult: "PlanningResult",
};
for (const [from, to] of Object.entries(SCHEMA_RENAMES)) {
  const schemas = spec.components.schemas;
  if (!schemas[from]) throw new Error(`schema rename: ${from} no longer exists — drop the rename`);
  if (schemas[to]) throw new Error(`schema rename: ${to} already exists`);
  schemas[to] = schemas[from];
  delete schemas[from];
  const rewrite = (node: any): void => {
    if (Array.isArray(node)) return node.forEach(rewrite);
    if (node === null || typeof node !== "object") return;
    if (node.$ref === `#/components/schemas/${from}`) node.$ref = `#/components/schemas/${to}`;
    for (const value of Object.values(node)) rewrite(value);
  };
  rewrite(spec);
}

// ---- 2. Typed errors, read from the spec -------------------------------------

interface ErrorClass {
  /** The wire `error.type`, or undefined for status-only classes. */
  readonly type: string | undefined;
  readonly statuses: Set<number>;
}

/**
 * `GET /namespaces/{}/tables/{}` — label names are dropped because the
 * converter sanitizes them (`{plan-id}` becomes `{planId}`).
 */
const routeKey = (method: string, route: string) =>
  `${method.toUpperCase()} ${route.replace(/\{[^}]+\}/g, "{}")}`;

const errorClasses = new Map<string, ErrorClass>();
/** `METHOD /route` → error class names the operation documents. */
const operationErrors = new Map<string, Set<string>>();

const exceptionTypesOf = (response: any): string[] => {
  const types = new Set<string>();
  const json = response?.content?.["application/json"];
  const single = deref(json?.example)?.error?.type;
  if (typeof single === "string") types.add(single);
  for (const example of Object.values<any>(json?.examples ?? {})) {
    const type = deref(example)?.value?.error?.type;
    if (typeof type === "string") types.add(type);
  }
  if (types.size === 0) {
    for (const match of String(response?.description ?? "").matchAll(EXCEPTION_NAME)) {
      types.add(match[1]!);
    }
  }
  return [...types];
};

const declare = (name: string, type: string | undefined, status: number | undefined) => {
  const existing = errorClasses.get(name) ?? { type, statuses: new Set<number>() };
  if (existing.type !== type)
    throw new Error(`${name}: conflicting error.type ${existing.type} / ${type}`);
  if (status !== undefined) existing.statuses.add(status);
  errorClasses.set(name, existing);
};

let skippedDeprecated = 0;
for (const [route, item] of Object.entries<any>(spec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = item[method];
    if (!op) continue;
    if (op.deprecated) {
      skippedDeprecated++;
      continue;
    }
    // A HEAD response has no body, so a `/error/type` matcher can never fire:
    // `namespaceExists` / `tableExists` / `viewExists` 404s surface as the
    // shared `NotFound` from the status map.
    if (method === "head") continue;
    const key = routeKey(method, route);
    const names = new Set<string>();
    for (const [status, raw] of Object.entries<any>(op.responses ?? {})) {
      if (!/^[45]/.test(status)) continue;
      const response = deref(raw);
      if (COMMIT_STATE_UNKNOWN.test(String(response?.description ?? ""))) {
        declare(COMMIT_STATE_UNKNOWN_CLASS, undefined, Number(status));
        names.add(COMMIT_STATE_UNKNOWN_CLASS);
        continue;
      }
      if (SHARED_STATUSES.has(status)) continue;
      for (const type of exceptionTypesOf(response)) {
        declare(type, type, Number(status));
        names.add(type);
      }
    }
    if (names.size) operationErrors.set(key, names);
  }
}

const errorShape = (name: string, cls: ErrorClass) => {
  const statuses = [...cls.statuses].sort((a, b) => a - b);
  if (cls.type === undefined) {
    // Status-only and deliberately WITHOUT smithy.api#httpError: see the
    // header comment (3) — no category, so no automatic retry.
    return {
      type: "structure",
      members: {},
      traits: {
        "smithy.api#error": "server",
        [ERROR_MATCHERS_TRAIT]: statuses.map((status) => ({ status })),
      },
    };
  }
  if (statuses.length !== 1) {
    throw new Error(`${name} is documented under several statuses (${statuses}); pick one`);
  }
  const types = [cls.type, ...(ERROR_TYPE_ALIASES[name] ?? [])];
  return {
    type: "structure",
    members: {},
    traits: {
      "smithy.api#error": statuses[0]! >= 500 ? "server" : "client",
      "smithy.api#httpError": statuses[0],
      [ERROR_MATCHERS_TRAIT]: types.map((type) => ({
        status: statuses[0],
        body: { "/error/type": type },
      })),
    },
  };
};

const attachTypedErrors = (model: any): string => {
  const unknownAliases = Object.keys(ERROR_TYPE_ALIASES).filter((name) => !errorClasses.has(name));
  if (unknownAliases.length) {
    throw new Error(`error aliases for exceptions the spec no longer names: ${unknownAliases}`);
  }
  for (const [name, cls] of errorClasses) {
    model.shapes[`${NAMESPACE}#${name}`] = errorShape(name, cls);
  }
  let attached = 0;
  const seen = new Set<string>();
  for (const shape of Object.values<any>(model.shapes)) {
    if (shape.type !== "operation") continue;
    const http = shape.traits?.["smithy.api#http"];
    const key = http && routeKey(http.method, http.uri);
    const names = key ? operationErrors.get(key) : undefined;
    if (!names) continue;
    seen.add(key);
    shape.errors = [
      ...(shape.errors ?? []),
      ...[...names].sort().map((name) => ({ target: `${NAMESPACE}#${name}` })),
    ];
    attached += names.size;
  }
  // Every route that documents an exception must have landed on an
  // operation; a miss means an http uri no longer round-trips and the SDK
  // would silently lose typed errors on that endpoint.
  const missed = [...operationErrors.keys()].filter((key) => !seen.has(key));
  if (missed.length) throw new Error(`typed errors not attached to: ${missed.join(", ")}`);
  return `typed errors: ${errorClasses.size} classes, ${attached} operation attachments`;
};

// ---- 3. Pagination -------------------------------------------------------------
// Every list route takes a `pageToken` query parameter and answers with
// `next-page-token` (`next_page_token` on the TS surface) next to one list
// member (`namespaces` or `identifiers`). The converter does not recognize
// the kebab-case token, so the trait is stamped here.

const PAGE_TOKEN_IN = "pageToken";
const PAGE_TOKEN_OUT = "next_page_token";

const stampPagination = (model: any): string => {
  const shapeOf = (target: string | undefined) => (target ? model.shapes[target] : undefined);
  const stamped: string[] = [];
  for (const [id, shape] of Object.entries<any>(model.shapes)) {
    if (shape.type !== "operation") continue;
    const input = shapeOf(shape.input?.target);
    const output = shapeOf(shape.output?.target);
    if (!input?.members?.[PAGE_TOKEN_IN] || !output?.members?.[PAGE_TOKEN_OUT]) continue;
    const items = Object.entries<any>(output.members).filter(
      ([name, member]) => name !== PAGE_TOKEN_OUT && shapeOf(member.target)?.type === "list",
    );
    if (items.length !== 1) {
      throw new Error(
        `${id}: expected one list member next to ${PAGE_TOKEN_OUT}, found ${items.length}`,
      );
    }
    shape.traits["smithy.api#paginated"] = {
      mode: "token",
      inputToken: PAGE_TOKEN_IN,
      outputToken: PAGE_TOKEN_OUT,
      items: items[0]![0],
      pageSize: "pageSize",
    };
    stamped.push(id.split("#")[1]!);
  }
  // Every documented list route must stay paginated; a miss here would
  // silently drop `.pages()` from an endpoint.
  const listRoutes = Object.values<any>(spec.paths).filter((item) =>
    (item.get?.parameters ?? []).some((p: any) => deref(p)?.name === PAGE_TOKEN_IN),
  ).length;
  if (stamped.length !== listRoutes) {
    throw new Error(`${listRoutes} paginated route(s) in the spec but ${stamped.length} stamped`);
  }
  return `paginated: ${stamped.sort().join(", ")}`;
};

// ---- 4. Convert, write, finalize ---------------------------------------------

const model = convertOpenApiToSmithy(spec, {
  namespace: NAMESPACE,
  serviceName: "Catalog",
  // Per-status classes come from step 2; nothing generic per status.
  statusToErrorClass: {},
  // `namespaceExists` / `tableExists` / `viewExists` are HEAD routes.
  extraHttpMethods: ["head"],
  // `If-None-Match` (loadTable/loadView), `Idempotency-Key` (mutations) and
  // `X-Iceberg-Access-Delegation` are real per-call inputs.
  headerParams: true,
});

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, `${MODEL}.json`), JSON.stringify(model, null, 2) + "\n");
const opCount = Object.values<any>(model.shapes).filter((s) => s.type === "operation").length;
console.log(
  `✅ ${MODEL}: ${opCount} operations (${skippedDeprecated} deprecated skipped), ${Object.keys(model.shapes).length} shapes`,
);

await finalizeConvert({
  root,
  transform: (model) => `${attachTypedErrors(model)}; ${stampPagination(model)}`,
});
