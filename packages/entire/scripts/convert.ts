#!/usr/bin/env -S node --conditions=bun
/**
 * convert — Entire's two OpenAPI descriptions → Smithy JSON models in
 * `.generated-specs`.
 *
 * Entire publishes one OpenAPI 3.1 document per API (mirrored under
 * `specs/spec-mirror-entire/specs/`):
 *
 *   • `core.json` — the Core control plane (orgs, projects, repos, mirrors,
 *     service accounts), served from the home-region console.
 *   • `cell.json` — the regional cell (trails, sessions, checkpoints,
 *     search, environments, agents).
 *
 * Both are huma-generated and share the `/api/v1` root, but live on
 * different hosts, so each model is namespaced by its API
 * (`com.entire.core.*` / `com.entire.cell.*`) and `scripts/generate.ts`
 * binds the matching protocol per model. The pipeline:
 *
 *   1. Read both specs.
 *   2. Bucket operations by PRIMARY (first) tag, one model per tag. Two cell
 *      tags collide with Core module names and are renamed (see
 *      {@link CELL_MODULE_NAMES}).
 *   3. Skip deprecated operations and the Server-Sent-Event streams (see
 *      {@link isEventStream}).
 *   4. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<module>.json`.
 *   5. Stamp `smithy.api#paginated` on the cursor-paged operations — see
 *      {@link paginationFor}.
 *
 * Failures share one RFC 9457 problem document and are dispatched at
 * runtime from the status (`statusToErrorClass: {}`).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";
import { OPERATION_NAMES } from "./operation-names.ts";

const rootDir = path.resolve(import.meta.dirname, "..");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** The root both APIs serve their routes under. */
const API_ROOT = "/api/v1";

interface Api {
  /** `core` or `cell` — the namespace segment generate.ts routes on. */
  readonly plane: "core" | "cell";
  readonly specPath: string;
  /** The API's host (the specs declare a relative or regional server). */
  readonly server: string;
  /** Tag slug → module name, for slugs that would collide across APIs. */
  readonly moduleNames: Readonly<Record<string, string>>;
}

/**
 * The cell's `projects` tag holds project trails and their discussions, and
 * its `repos` tag holds repo metadata, activity and check runs; both names
 * are taken by the Core modules that create those projects and repos.
 */
const CELL_MODULE_NAMES: Readonly<Record<string, string>> = {
  projects: "project_trails",
  repos: "repo_details",
};

const APIS: readonly Api[] = [
  {
    plane: "core",
    specPath: "specs/spec-mirror-entire/specs/core.json",
    server: "https://us.console.entire.io",
    moduleNames: {},
  },
  {
    plane: "cell",
    specPath: "specs/spec-mirror-entire/specs/cell.json",
    server: "https://aws-us-east-2.api.entire.io",
    moduleNames: CELL_MODULE_NAMES,
  },
];

/** Tag → module slug (`service-accounts` → `service_accounts`). */
const toSlug = (tag: string): string =>
  tag
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
 * An operation whose only success body is `text/event-stream`. The REST
 * protocol reads one response body, so a live stream (discussion events,
 * ref events) would never resolve; those routes are left out.
 */
const isEventStream = (op: any): boolean => {
  const success = Object.entries<any>(op.responses ?? {}).filter(([status]) =>
    status.startsWith("2"),
  );
  return (
    success.length > 0 &&
    success.every(([, response]) => {
      const types = Object.keys(response?.content ?? {});
      return types.length > 0 && types.every((t) => t === "text/event-stream");
    })
  );
};

const usedModules = new Map<string, string>();
let written = 0;
let totalOps = 0;
let totalPaginated = 0;
const skipped: string[] = [];

clearModels(outDir);

for (const api of APIS) {
  const specPath = resolveSpecPath(rootDir, api.specPath);
  if (!fs.existsSync(specPath)) {
    throw new Error(
      `${specPath} not found — run \`pnpm specs:local entire\` (or specs:fetch) first`,
    );
  }
  const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));
  // Paths are relative to the servers' `/api/v1` root, which the converter
  // does not carry onto routes; prefix it here so the credentials' base URLs
  // are bare hosts.
  fullSpec.servers = [{ url: api.server }];

  /** Resolve `$ref`s (recursively) against the full spec. */
  const deref = (schema: any): any => {
    const ref = schema?.$ref;
    if (typeof ref !== "string" || !ref.startsWith("#/")) return schema;
    const target = ref
      .slice(2)
      .split("/")
      .reduce((node: any, key: string) => node?.[key], fullSpec);
    return target === undefined ? schema : deref(target);
  };

  /**
   * The `smithy.api#paginated` trait for one operation, or undefined when
   * it does not page. Two cursor spellings:
   *   • `pageToken` (+ `pageSize`) in, `nextPageToken` out;
   *   • `cursor` (+ `per_page` / `limit`) in, `next_cursor` / `nextCursor`
   *     out.
   * `items` is the response's sole array member, or `items` when it has
   * several (a facet list or a group summary beside the page).
   */
  const paginationFor = (op: any): Record<string, string> | undefined => {
    const query = new Set<string>(
      (op.parameters ?? [])
        .map(deref)
        .filter((p: any) => p?.in === "query")
        .map((p: any) => p.name),
    );
    const props =
      deref(op.responses?.["200"]?.content?.["application/json"]?.schema)?.properties ?? {};
    let inputToken: string | undefined;
    let outputToken: string | undefined;
    let pageSize: string | undefined;
    if (query.has("pageToken") && "nextPageToken" in props) {
      inputToken = "pageToken";
      outputToken = "nextPageToken";
      pageSize = query.has("pageSize") ? "pageSize" : undefined;
    } else if (query.has("cursor")) {
      inputToken = "cursor";
      outputToken =
        "next_cursor" in props ? "next_cursor" : "nextCursor" in props ? "nextCursor" : undefined;
      pageSize = query.has("per_page") ? "per_page" : query.has("limit") ? "limit" : undefined;
    }
    if (inputToken === undefined || outputToken === undefined) return undefined;

    const arrays = Object.entries<any>(props)
      .filter(([, value]) => {
        const type = deref(value)?.type;
        return type === "array" || (Array.isArray(type) && type.includes("array"));
      })
      .map(([name]) => name);
    const items = arrays.length === 1 ? arrays[0] : arrays.includes("items") ? "items" : undefined;
    if (items === undefined) return undefined;

    return {
      inputToken,
      outputToken,
      items,
      ...(pageSize ? { pageSize } : {}),
    };
  };

  // ---- Bucket paths by primary tag --------------------------------------
  const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
  for (const [pathTemplate, pathItem] of Object.entries<Record<string, any>>(fullSpec.paths)) {
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      if (!op) continue;
      const route = `${api.plane} ${method.toUpperCase()} ${pathTemplate}`;
      if (op.deprecated === true) {
        skipped.push(`${route} (${op.operationId}, deprecated)`);
        continue;
      }
      if (isEventStream(op)) {
        skipped.push(`${route} (${op.operationId}, text/event-stream)`);
        continue;
      }
      const rawTag: string | undefined =
        Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : undefined;
      const slug = toSlug(rawTag ?? "misc") || "misc";
      const module = api.moduleNames[slug] ?? slug;
      const owner = usedModules.get(module);
      if (owner !== undefined && owner !== api.plane) {
        throw new Error(
          `${api.plane} tag \`${rawTag}\` maps to module \`${module}\`, already used by ${owner} — ` +
            `add it to that API's moduleNames`,
        );
      }
      usedModules.set(module, api.plane);
      if (!tagBuckets.has(module)) tagBuckets.set(module, {});
      const bucketPaths = tagBuckets.get(module)!;
      const rooted = `${API_ROOT}${pathTemplate}`;
      if (!bucketPaths[rooted]) {
        bucketPaths[rooted] = pathItem.parameters ? { parameters: pathItem.parameters } : {};
      }
      (bucketPaths[rooted] as Record<string, unknown>)[method] = op;
    }
  }

  // ---- Convert each bucket ----------------------------------------------
  for (const module of [...tagBuckets.keys()].sort()) {
    const paths = tagBuckets.get(module)!;
    const model = convertOpenApiToSmithy(
      { ...fullSpec, paths },
      {
        deferNaming: true,
        namespace: `com.entire.${api.plane}.${module}`,
        serviceName: toPascal(module),
        skipDeprecated: true,
        // Mirror requests, detaches and run creation answer 202.
        successStatuses: ["200", "201", "202", "204"],
        // Every failure shares one problem document; no per-op classes.
        statusToErrorClass: {},
        // Agent and environment writes require `Idempotency-Key`, and
        // replaces require `If-Match`; both are modeled header members.
        headerParams: true,
        operationNames: OPERATION_NAMES,
      },
    );

    const operations = Object.entries<any>(model.shapes).filter(([, s]) => s.type === "operation");
    if (operations.length === 0) {
      console.warn(`   ⚠️  ${api.plane}/${module}: no operations — bucket dropped`);
      continue;
    }

    const byRoute = new Map<string, Record<string, string>>();
    for (const [pathTemplate, pathItem] of Object.entries<any>(paths)) {
      for (const method of HTTP_METHODS) {
        const op = pathItem[method];
        if (!op) continue;
        const trait = paginationFor(op);
        if (trait) byRoute.set(`${method.toUpperCase()} ${pathTemplate}`, trait);
      }
    }
    let paginated = 0;
    for (const [, shape] of operations) {
      const http = shape.traits?.["smithy.api#http"];
      if (!http) continue;
      const trait = byRoute.get(`${http.method} ${http.uri}`);
      if (!trait) continue;
      shape.traits["smithy.api#paginated"] = trait;
      paginated++;
    }
    // A miss means an http uri no longer round-trips to its OpenAPI path
    // and the operation would silently lose `.pages()`.
    if (paginated !== byRoute.size) {
      throw new Error(
        `${api.plane}/${module}: ${byRoute.size} paginated route(s) detected but ${paginated} ` +
          `stamped — an operation's http uri no longer matches its OpenAPI path`,
      );
    }

    writeModel(path.join(outDir, `${module}.json`), model);
    written++;
    totalOps += operations.length;
    totalPaginated += paginated;
  }
}

if (skipped.length) {
  console.log(`🗑️  ${skipped.length} operation(s) skipped:\n      ${skipped.join("\n      ")}`);
}
console.log(
  `✅ ${written} Smithy models (${totalOps} operations, ${totalPaginated} paginated) → ${outDir}`,
);

await finalizeConvert({ root: rootDir });
