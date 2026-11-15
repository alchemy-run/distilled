#!/usr/bin/env -S node --conditions=bun
/**
 * convert — E2B's API descriptions → Smithy JSON models in `.generated-specs`.
 *
 * E2B publishes five documents (mirrored at `specs/spec-mirror-e2b/specs/`):
 *
 *   • `openapi.yml`               control plane (`api.e2b.app`, `X-API-Key`)
 *   • `openapi-volumecontent.yml` volume files (`api.e2b.app`, per-volume token)
 *   • `envd.yaml`                 the in-sandbox daemon's HTTP API
 *   • `process.proto`             envd's Connect process service
 *   • `filesystem.proto`          envd's Connect filesystem service
 *
 * One Smithy model per control-plane tag (`sandboxes.json`, `templates.json`,
 * …), plus `volume_content.json`, `envd.json`, `process.json` and
 * `filesystem.json`. The generator picks each module's protocol from its
 * namespace (see `scripts/generate.ts`): envd modules talk to the sandbox,
 * `volume_content` talks to the volume with its own token, and everything
 * else talks to the control plane.
 *
 * Operations whose only security is E2B's operator schemes (`AdminApiKeyAuth`,
 * `AdminJWTAuth`) are E2B-internal and are not converted.
 *
 * Streaming Connect RPCs (`Process.Start`, `Process.Connect`,
 * `Process.StreamInput`, `Filesystem.WatchDir`) are skipped here; the
 * server-streaming ones are hand-written in `src/connect.ts`.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy, RAW_RESPONSE_TRAIT } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { convertProtoToSmithy, parseProto } from "@distilled.cloud/dev/codegen/proto";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";
import { parse as parseYaml } from "yaml";

const rootDir = path.resolve(import.meta.dirname, "..");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** Security schemes only E2B operators hold. */
const ADMIN_SCHEMES = new Set(["AdminApiKeyAuth", "AdminJWTAuth", "AdminTeamAuth"]);

const readSpec = (file: string): string => {
  const specPath = resolveSpecPath(rootDir, `specs/spec-mirror-e2b/specs/${file}`);
  if (!fs.existsSync(specPath)) {
    throw new Error(`${specPath} not found — run \`pnpm specs:local e2b\` (or specs:fetch) first`);
  }
  return fs.readFileSync(specPath, "utf-8");
};

const loadYaml = (file: string): Record<string, any> => parseYaml(readSpec(file));

/** Tag → model/resource name (the generated module's filename). */
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

/** An operation is admin-only when every security requirement names only operator schemes. */
const isAdminOnly = (spec: Record<string, any>, op: Record<string, any>): boolean => {
  const security: Array<Record<string, unknown>> | undefined = op.security ?? spec.security;
  if (!security || security.length === 0) return false;
  return security.every((requirement) => {
    const schemes = Object.keys(requirement);
    return schemes.length > 0 && schemes.every((scheme) => ADMIN_SCHEMES.has(scheme));
  });
};

/**
 * Names the verbNoun heuristic gets wrong, keyed by `"METHOD path"`.
 * E2B's specs carry no operationIds, so every name is derived from the route.
 */
const OPERATION_NAMES: Record<string, string> = {
  // control plane
  "POST /sandboxes/{sandboxID}/timeout": "setSandboxTimeout",
  "PUT /sandboxes/{sandboxID}/network": "updateSandboxNetwork",
  "POST /sandboxes/{sandboxID}/refreshes": "refreshSandbox",
  "GET /sandboxes/metrics": "listSandboxesMetrics",
  "POST /v2/templates/{templateID}/builds/{buildID}": "startTemplateBuild",
  "GET /templates/{templateID}/files/{hash}": "getTemplateFileUploadLink",
  "GET /templates/aliases/{alias}": "getTemplateByAlias",
  "GET /unstable/templates/search": "searchTemplates",
  "GET /unstable/teams/{teamID}/status": "getTeamStatus",
  "GET /unstable/teams/{teamID}/limits": "getTeamLimits",
  "GET /teams/{teamID}/metrics/max": "getTeamMetricsMax",
  "GET /events/sandboxes/{sandboxID}": "listSandboxEvents",
  "GET /events/sandboxes": "listTeamSandboxEvents",
  "GET /events/webhooks": "listWebhooks",
  "POST /events/webhooks": "createWebhook",
  "GET /events/webhooks/{webhookID}": "getWebhook",
  "PATCH /events/webhooks/{webhookID}": "updateWebhook",
  "DELETE /events/webhooks/{webhookID}": "deleteWebhook",
  "GET /events/webhooks/{webhookID}/deliveries": "listWebhookDeliveries",
  "GET /events/webhooks/{webhookID}/stats": "getWebhookStats",
  // volume content
  "GET /volumecontent/{volumeID}/path": "statVolumePath",
  "PATCH /volumecontent/{volumeID}/path": "updateVolumePath",
  "DELETE /volumecontent/{volumeID}/path": "removeVolumePath",
  "GET /volumecontent/{volumeID}/dir": "listVolumeDir",
  "POST /volumecontent/{volumeID}/dir": "makeVolumeDir",
  "GET /volumecontent/{volumeID}/file": "readVolumeFile",
  "PUT /volumecontent/{volumeID}/file": "writeVolumeFile",
  // envd HTTP
  "GET /health": "getHealth",
  "GET /metrics": "getMetrics",
  "POST /init": "initEnvd",
  "POST /freeze": "freezeEnvd",
  "POST /unfreeze": "unfreezeEnvd",
  "POST /collapse": "collapseEnvd",
  "POST /fsfreeze": "fsfreezeEnvd",
  "POST /fsthaw": "fsthawEnvd",
  "GET /envs": "getEnvVars",
  "GET /files": "readFile",
  "POST /files": "writeFiles",
  "POST /files/compose": "composeFiles",
};

/** Connect RPC → operation name. The wire path keeps the RPC's own name. */
const RPC_NAMES: Record<string, Record<string, string>> = {
  process: {
    List: "ListProcesses",
    Update: "UpdateProcess",
    SendInput: "SendProcessInput",
    SendSignal: "SendProcessSignal",
    CloseStdin: "CloseProcessStdin",
  },
  filesystem: {
    Stat: "StatPath",
    Move: "MovePath",
    Remove: "RemovePath",
  },
};

/** Renames operation shapes in place; the `http` trait (wire path) is untouched. */
const renameOperations = (model: Record<string, any>, names: Record<string, string>) => {
  const shapes: Record<string, any> = model.shapes;
  for (const [from, to] of Object.entries(names)) {
    const fromId = Object.keys(shapes).find(
      (id) => id.endsWith(`#${from}`) && shapes[id].type === "operation",
    );
    if (fromId === undefined) throw new Error(`RPC ${from} not found — update RPC_NAMES`);
    const toId = `${fromId.split("#")[0]}#${to}`;
    shapes[toId] = shapes[fromId];
    delete shapes[fromId];
    for (const shape of Object.values<any>(shapes)) {
      for (const ref of shape.operations ?? []) if (ref.target === fromId) ref.target = toId;
    }
  }
};

/**
 * File bodies the OpenAPI converter cannot express. It flattens JSON, form
 * and multipart bodies only, so `application/octet-stream` downloads come out
 * as empty outputs and uploads with no body member. These are stamped onto
 * the converted model: downloads get a raw `Blob` body (decoded as bytes),
 * uploads a `Blob` `httpPayload` sent as `application/octet-stream`, and a
 * multipart upload a binary `file` part.
 */
const BINARY_BODIES: Record<
  string,
  { readonly download?: true; readonly upload?: true; readonly multipartFile?: true }
> = {
  "GET /files": { download: true },
  // envd takes octet-stream only from 0.5.7; multipart works on every
  // version (and is what E2B's SDK sends for buffers).
  "POST /files": { multipartFile: true },
  "GET /volumecontent/{volumeID}/file": { download: true },
  "PUT /volumecontent/{volumeID}/file": { upload: true },
};

/** A multipart file part; generate binds it with `T.FormDataFile()`. */
const FORM_DATA_FILE_TRAIT = "com.e2b#formDataFile";

const stampBinaryBodies = (model: Record<string, any>) => {
  const shapes: Record<string, any> = model.shapes;
  for (const shape of Object.values<any>(shapes)) {
    if (shape.type !== "operation") continue;
    const http = shape.traits?.["smithy.api#http"];
    const kind = http && BINARY_BODIES[`${http.method} ${http.uri}`];
    if (!kind) continue;
    if (kind.download) {
      const body = { body: { target: "smithy.api#Blob", traits: { [RAW_RESPONSE_TRAIT]: {} } } };
      const output = shapes[shape.output?.target];
      if (output?.type === "structure") {
        output.members = body;
      } else {
        // No JSON response: the output is `Unit`, so give the op its own.
        const opId = Object.keys(shapes).find((id) => shapes[id] === shape)!;
        const finalName = OPERATION_NAMES[`${http.method} ${http.uri}`] ?? opId.split("#")[1]!;
        const outputId = `${opId.split("#")[0]}#${finalName.charAt(0).toUpperCase()}${finalName.slice(1)}Response`;
        shapes[outputId] = {
          type: "structure",
          members: body,
          traits: { "smithy.api#output": {} },
        };
        shape.output = { target: outputId };
      }
    }
    if (kind.multipartFile) {
      const input = shapes[shape.input?.target];
      if (input?.type !== "structure" || input.members?.file === undefined) {
        throw new Error(`${http.uri}: no multipart file member to stamp`);
      }
      input.members.file = {
        target: "smithy.api#Document",
        traits: { [FORM_DATA_FILE_TRAIT]: {}, "smithy.api#required": {} },
      };
    }
    if (kind.upload) {
      const input = shapes[shape.input?.target];
      if (input?.type !== "structure") throw new Error(`${http.uri}: no input structure to stamp`);
      input.members = {
        ...input.members,
        body: {
          target: "smithy.api#Blob",
          traits: { "smithy.api#httpPayload": {}, "smithy.api#required": {} },
        },
      };
      http.bodyMediaType = "application/octet-stream";
    }
  }
};

/** The response header E2B's list endpoints carry the next page's token in. */
const NEXT_TOKEN_HEADER = "X-Next-Token";

/** Whether a spec operation's success response declares the next-page header. */
const hasNextTokenHeader = (spec: Record<string, any>, op: Record<string, any>): boolean => {
  const ok = op.responses?.["200"];
  const response = ok?.$ref ? spec.components?.responses?.[ok.$ref.split("/").at(-1)] : ok;
  return Object.keys(response?.headers ?? {}).some(
    (name) => name.toLowerCase() === NEXT_TOKEN_HEADER.toLowerCase(),
  );
};

/**
 * Token pagination the converter cannot see. E2B's list endpoints return a
 * bare JSON array and put the next page's token in an `X-Next-Token`
 * response header, taking it back as the `nextToken` query parameter. Each
 * such operation's output becomes `{ items, nextToken }` (the body and the
 * header) and is stamped paginated, so `.items()` streams every page.
 */
const stampHeaderPagination = (model: Record<string, any>, spec: Record<string, any>) => {
  const shapes: Record<string, any> = model.shapes;
  for (const shape of Object.values<any>(shapes)) {
    if (shape.type !== "operation") continue;
    const http = shape.traits?.["smithy.api#http"];
    if (!http) continue;
    const specOp = spec.paths?.[http.uri]?.[String(http.method).toLowerCase()];
    if (!specOp || !hasNextTokenHeader(spec, specOp)) continue;
    const input = shapes[shape.input?.target];
    const output = shapes[shape.output?.target];
    if (!input?.members?.nextToken || output?.type !== "structure") {
      throw new Error(
        `${http.method} ${http.uri}: X-Next-Token without a nextToken input or an output`,
      );
    }
    const nextToken = {
      target: "smithy.api#String",
      traits: { "smithy.api#httpHeader": NEXT_TOKEN_HEADER },
    };
    const body = output.members?.body;
    if (body === undefined || !(RAW_RESPONSE_TRAIT in (body.traits ?? {}))) {
      // An object body that pages a nested list (a template's builds): the
      // token is readable, but there is no item list to stream.
      output.members = { ...output.members, nextToken };
      continue;
    }
    output.members = { items: body, nextToken };
    shape.traits["smithy.api#paginated"] = {
      inputToken: "nextToken",
      outputToken: "nextToken",
      items: "items",
      ...(input.members.limit ? { pageSize: "limit" } : {}),
    };
  }
};

/** Generate maps it to `T.CommaDelimited()`. */
const COMMA_DELIMITED_TRAIT = "com.e2b#commaDelimited";

/**
 * Query lists the spec sends as ONE comma-separated value (`style: form,
 * explode: false`, e.g. `?state=running,paused`): E2B rejects them repeated.
 * The Smithy model has no such serialization, so stamp a trait on the member.
 */
const stampCommaDelimited = (model: Record<string, any>, spec: Record<string, any>) => {
  const shapes: Record<string, any> = model.shapes;
  const resolve = (node: Record<string, any>) =>
    node.$ref ? spec.components?.parameters?.[node.$ref.split("/").at(-1)] : node;
  for (const shape of Object.values<any>(shapes)) {
    if (shape.type !== "operation") continue;
    const http = shape.traits?.["smithy.api#http"];
    if (!http) continue;
    const pathItem = spec.paths?.[http.uri];
    const specOp = pathItem?.[String(http.method).toLowerCase()];
    if (!specOp) continue;
    for (const param of [...(pathItem.parameters ?? []), ...(specOp.parameters ?? [])].map(
      resolve,
    )) {
      if (param?.in !== "query" || param.explode !== false || param.schema?.type !== "array") {
        continue;
      }
      const member = Object.values<any>(shapes[shape.input?.target]?.members ?? {}).find(
        (m) => m.traits?.["smithy.api#httpQuery"] === param.name,
      );
      if (member === undefined) {
        throw new Error(`${http.method} ${http.uri}: no input member for query ${param.name}`);
      }
      member.traits[COMMA_DELIMITED_TRAIT] = {};
    }
  }
};

type PathBucket = Record<string, Record<string, unknown>>;

/** Buckets a spec's operations by primary tag (or a fixed slug). */
const bucketByTag = (
  spec: Record<string, any>,
  slugFor: (tag: string | undefined) => string,
): { buckets: Map<string, PathBucket>; skipped: string[] } => {
  const buckets = new Map<string, PathBucket>();
  const skipped: string[] = [];
  for (const [pathTemplate, pathItem] of Object.entries<Record<string, any>>(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      if (!op) continue;
      if (isAdminOnly(spec, op)) {
        skipped.push(`${method.toUpperCase()} ${pathTemplate}`);
        continue;
      }
      const tag: string | undefined = Array.isArray(op.tags) ? op.tags[0] : undefined;
      const slug = slugFor(tag);
      if (!buckets.has(slug)) buckets.set(slug, {});
      const bucket = buckets.get(slug)!;
      if (!bucket[pathTemplate]) {
        bucket[pathTemplate] = pathItem.parameters ? { parameters: pathItem.parameters } : {};
      }
      bucket[pathTemplate]![method] = op;
    }
  }
  return { buckets, skipped };
};

clearModels(outDir);

let written = 0;
let totalOps = 0;

const writeOpenApi = (slug: string, spec: Record<string, any>, paths: PathBucket) => {
  const model = convertOpenApiToSmithy(
    { ...spec, paths },
    {
      deferNaming: true,
      namespace: `com.e2b.${slug}`,
      serviceName: toPascal(slug),
      skipDeprecated: true,
      successStatuses: ["200", "201", "202", "204"],
      operationNames: OPERATION_NAMES,
      // Failures share a `{ code, message }` envelope; no operation narrows
      // which codes it produces in a way worth a class per status.
      statusToErrorClass: {},
    },
  );
  stampBinaryBodies(model);
  stampHeaderPagination(model, spec);
  stampCommaDelimited(model, spec);
  const operations = Object.values<any>(model.shapes).filter((s) => s.type === "operation");
  if (operations.length === 0) {
    console.warn(`   ⚠️  ${slug}: no operations — bucket dropped`);
    return;
  }
  writeModel(path.join(outDir, `${slug}.json`), model);
  written++;
  totalOps += operations.length;
  console.log(`   ${slug}: ${operations.length} ops`);
};

// ---- 1. Control plane: one model per tag ------------------------------------
const controlPlane = loadYaml("openapi.yml");
const control = bucketByTag(controlPlane, (tag) => toSlug(tag ?? "health") || "health");
for (const [slug, paths] of [...control.buckets].sort(([a], [b]) => a.localeCompare(b))) {
  writeOpenApi(slug, controlPlane, paths);
}
if (control.skipped.length) {
  console.log(`   (skipped ${control.skipped.length} E2B operator-only operations)`);
}

// ---- 2. Volume content: one model ------------------------------------------
const volumeContent = loadYaml("openapi-volumecontent.yml");
for (const [, paths] of bucketByTag(volumeContent, () => "volume_content").buckets) {
  writeOpenApi("volume_content", volumeContent, paths);
}

// ---- 3. envd HTTP API: one model -------------------------------------------
const envd = loadYaml("envd.yaml");
for (const [, paths] of bucketByTag(envd, () => "envd").buckets) {
  writeOpenApi("envd", envd, paths);
}

// ---- 4. envd Connect services: one model per proto service ------------------
for (const file of ["process.proto", "filesystem.proto"] as const) {
  const proto = parseProto(readSpec(file), file);
  for (const service of proto.services) {
    const slug = toSlug(service.name);
    const result = convertProtoToSmithy({
      files: [proto],
      namespace: `com.e2b.${slug}`,
      serviceName: service.name,
      serviceTitle: `E2B envd ${service.name}`,
      serviceDocumentation:
        `envd's ${service.fullName} Connect service, inside a running sandbox. ` +
        `Each operation is POST /${service.fullName}/<Method> with a proto3 JSON body.`,
      protoService: service.fullName,
      skipStreaming: true,
      skipDeprecated: true,
    });
    renameOperations(result.model, RPC_NAMES[slug] ?? {});
    writeModel(path.join(outDir, `${slug}.json`), result.model);
    written++;
    totalOps += result.converted;
    console.log(
      `   ${slug}: ${result.converted} ops, ${result.skippedStreaming} streaming (hand-written in src/connect.ts)`,
    );
  }
}

console.log(`✅ ${written} Smithy models (${totalOps} operations) → ${outDir}`);

await finalizeConvert({ root: rootDir });
