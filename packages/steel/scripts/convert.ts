#!/usr/bin/env -S node --conditions=bun
/**
 * convert — the Steel API's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * Steel publishes ONE OpenAPI 3.0 document (mirrored at
 * `specs/spec-mirror-steel/specs/openapi.json`), the one its own SDKs are
 * generated from. The layout wants one Smithy model — one service module —
 * per API area, so operations are bucketed by their primary tag
 * (`Sessions` → `sessions`, `Browser Tools` → `browser_tools`).
 *
 * Every operation declares its non-2xx statuses, so they are typed per
 * operation: the converter's default status → class map, plus the three
 * client statuses Steel declares that core has no class for (410 when a
 * session has ended, 413 and 415 on uploads). Without a class those fall to
 * `UnknownSteelError`, a server-category error the default policy retries.
 * Typed errors keyed on Steel's machine-readable `code`, and pagination, are
 * patches in `patches/<area>/`.
 *
 * Uploads are multipart and downloads are bytes, so binary types are on.
 * The converter reads a binary response only under
 * `application/octet-stream`; Steel also serves `application/zip` (session
 * archives, extensions) and `application/vnd.apple.mpegurl` (HLS) bodies
 * declared `format: binary`, so those are read as bytes too (step 2).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const rootDir = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-steel/specs/openapi.json");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** Per-operation error classes by status (see the module docblock). */
const STATUS_TO_ERROR_CLASS: Record<string, string> = {
  "400": "BadRequest",
  "403": "Forbidden",
  "404": "NotFound",
  "409": "Conflict",
  "410": "Gone",
  "413": "PayloadTooLarge",
  "415": "UnsupportedMediaType",
  "422": "UnprocessableEntity",
};

/** `Browser Tools` → `browser_tools`, `API Keys` → `api_keys`. */
const toSlug = (tag: string): string =>
  tag
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(`${specPath} not found — run \`pnpm specs:local steel\` (or specs:fetch) first`);
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

/** Irregular operation names, keyed by `METHOD path`. */
const OPERATION_NAMES: Record<string, string> = {
  // `get_sessions` lists sessions (cursor-paginated); Steel's SDKs call it
  // `sessions.list`.
  "GET /v1/sessions": "listSessions",
};

// ---- 2. Binary responses under any media type ------------------------------
// A 2xx body whose only schema is `format: binary` is bytes whatever its
// media type, so it is filed under `application/octet-stream`, the one the
// converter reads as a Blob.
const isBinarySchema = (schema: any): boolean =>
  schema?.type === "string" && schema?.format === "binary";
for (const pathItem of Object.values<Record<string, any>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    for (const [status, response] of Object.entries<any>(pathItem[method]?.responses ?? {})) {
      if (!status.startsWith("2")) continue;
      const media = Object.entries<any>(response?.content ?? {});
      if (media.length !== 1) continue;
      const [type, { schema }] = media[0]!;
      if (type === "application/octet-stream" || !isBinarySchema(schema)) continue;
      response.content = { "application/octet-stream": { schema } };
    }
  }
}

// ---- 3. Bucket paths by area -----------------------------------------------
const buckets = new Map<string, Record<string, Record<string, unknown>>>();
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;
    const tag: string | undefined = Array.isArray(op.tags) ? op.tags[0] : undefined;
    if (tag === undefined) {
      throw new Error(`${method.toUpperCase()} ${pathTemplate} has no tag to place it in a module`);
    }
    const slug = toSlug(tag);
    if (!buckets.has(slug)) buckets.set(slug, {});
    const bucketPaths = buckets.get(slug)!;
    if (!bucketPaths[pathTemplate]) {
      const pathParams = (pathItem as Record<string, any>).parameters;
      bucketPaths[pathTemplate] = pathParams ? { parameters: pathParams } : {};
    }
    (bucketPaths[pathTemplate] as Record<string, unknown>)[method] = op;
  }
}

// ---- 4. Convert each bucket ------------------------------------------------
clearModels(outDir);

let written = 0;
let totalOps = 0;
for (const slug of [...buckets.keys()].sort()) {
  const model = convertOpenApiToSmithy(
    { ...fullSpec, paths: buckets.get(slug)! },
    {
      deferNaming: true,
      namespace: `dev.steel.${slug}`,
      serviceName: toPascal(slug),
      binaryTypes: true,
      statusToErrorClass: STATUS_TO_ERROR_CLASS,
      operationNames: OPERATION_NAMES,
    },
  );

  const operations = Object.values<any>(model.shapes).filter((s) => s.type === "operation");
  if (operations.length === 0) {
    throw new Error(`${slug}: no operations converted`);
  }

  writeModel(path.join(outDir, `${slug}.json`), model);
  written++;
  totalOps += operations.length;
}

console.log(`✅ ${written} Smithy models (${totalOps} operations) → ${outDir}`);

await finalizeConvert({ root: rootDir });
