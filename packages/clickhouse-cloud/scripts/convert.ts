#!/usr/bin/env -S node --conditions=bun
/**
 * convert — ClickHouse Cloud's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * ClickHouse Cloud serves ONE OpenAPI 3.1 document from the API itself
 * (`https://api.clickhouse.cloud/v1`, mirrored at
 * `specs/spec-mirror-clickhouse-cloud/specs/openapi.json`). Every operation
 * carries exactly one tag (`Service`, `API keys`, `ClickPipes`, …), and the
 * SDK ships one Smithy model — one service module — per tag, the split the
 * API reference uses:
 *
 *   1. Read the full spec and re-point inline copies of a union at its
 *      component (step 2).
 *   2. Unwrap the `{ status, requestId, result }` success envelope to its
 *      `result` schema (step 3); ClickHouseCloudProtocol does the same at
 *      run time.
 *   3. Bucket operations by their tag, and convert each bucket through the
 *      shared `convertOpenApiToSmithy`, writing `.generated-specs/<tag_slug>.json`.
 *   4. finalizeConvert applies patches/<model>/*.json (Smithy ops, under the
 *      names the spec gives), then the deferred verbNoun names.
 *
 * Every failure is the shared `{ status, error, requestId }` envelope and
 * every operation lists `400` and `500` whatever it does, so there is no
 * per-operation error class (`statusToErrorClass: {}`): ClickHouseCloudProtocol
 * dispatches on the status. The typed errors a caller acts on, the cursor
 * pagination and plain-text outputs the converter does not detect, and the
 * names of union arms the spec leaves anonymous, are patches in
 * `patches/<model>/`.
 *
 * Operations tagged Beta upstream (ClickStack, Postgres, BYOC, UDFs, …) are
 * kept: they are part of the published API.
 *
 * `scripts/generate.ts` (runGeneratorCli with `patchesDir: false`) then
 * compiles the already-patched models.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const rootDir = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-clickhouse-cloud/specs/openapi.json");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * Tag → model/resource name (the generated module's filename). Camel
 * boundaries split first, so `ClickPipes` becomes `click_pipes` and the
 * barrel exports `clickPipes`; `API keys` becomes `api_keys` (`apiKeys`).
 */
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
 * Names the verbNoun heuristic gets wrong, keyed by upstream operationId.
 * ClickHouse Cloud's ids are mostly noun-first (`instanceCreate`,
 * `openapiKeyGetList`, `clickStackListAlerts`), call a ClickHouse service
 * an `instance` and an API key an `openapiKey`, and mix `Patch`/`Post` with
 * `Update`. The SDK uses the names the console, the docs and the Terraform
 * provider use (`createService`, `listApiKeys`), plural `list*` names, and
 * `update*` for every PATCH that edits a resource in place.
 */
const OPERATION_NAMES: Record<string, string> = {
  // API keys
  openapiKeyGetList: "listApiKeys",
  openapiKeyCreate: "createApiKey",
  openapiKeyGet: "getApiKey",
  openapiKeyUpdate: "updateApiKey",
  openapiKeyDelete: "deleteApiKey",
  // Backup
  backupGetList: "listBackups",
  // Billing
  creditBalancesGet: "getCreditBalances",
  // ClickPipes
  clickPipeGetList: "listClickPipes",
  clickPipeSchemaDiscovery: "discoverClickPipeSchema",
  clickPipeReversePrivateEndpointGetList: "listClickPipeReversePrivateEndpoints",
  // ClickStack
  clickStackListDashboards: "listClickStackDashboards",
  clickStackCreateDashboard: "createClickStackDashboard",
  clickStackGetDashboard: "getClickStackDashboard",
  clickStackUpdateDashboard: "updateClickStackDashboard",
  clickStackDeleteDashboard: "deleteClickStackDashboard",
  clickStackValidateDashboard: "validateClickStackDashboard",
  clickStackListAlerts: "listClickStackAlerts",
  clickStackCreateAlert: "createClickStackAlert",
  clickStackGetAlert: "getClickStackAlert",
  clickStackUpdateAlert: "updateClickStackAlert",
  clickStackDeleteAlert: "deleteClickStackAlert",
  clickStackListSources: "listClickStackSources",
  clickStackCreateSource: "createClickStackSource",
  clickStackGetSource: "getClickStackSource",
  clickStackUpdateSource: "updateClickStackSource",
  clickStackDeleteSource: "deleteClickStackSource",
  clickStackListWebhooks: "listClickStackWebhooks",
  clickStackCreateWebhook: "createClickStackWebhook",
  clickStackValidateWebhook: "validateClickStackWebhook",
  clickStackUpdateWebhook: "updateClickStackWebhook",
  clickStackDeleteWebhook: "deleteClickStackWebhook",
  clickStackListRoles: "listClickStackRoles",
  clickStackCreateRole: "createClickStackRole",
  clickStackGetRole: "getClickStackRole",
  clickStackUpdateRole: "updateClickStackRole",
  clickStackDeleteRole: "deleteClickStackRole",
  clickStackListSavedSearches: "listClickStackSavedSearches",
  clickStackCreateSavedSearch: "createClickStackSavedSearch",
  clickStackGetSavedSearch: "getClickStackSavedSearch",
  clickStackUpdateSavedSearch: "updateClickStackSavedSearch",
  clickStackDeleteSavedSearch: "deleteClickStackSavedSearch",
  // Notifications
  notificationGetList: "listNotifications",
  notificationTypesGetList: "listNotificationTypes",
  memberNotificationSettingsGetList: "listMemberNotificationSettings",
  // Organization
  organizationGetList: "listOrganizations",
  organizationQuotasGetList: "listOrganizationQuotas",
  organizationPublicPreviewsGetList: "listOrganizationPublicPreviews",
  organizationPublicPreviewPatch: "updateOrganizationPublicPreview",
  activityGetList: "listActivities",
  organizationByocInfrastructureCreate: "createByocInfrastructure",
  organizationByocInfrastructureValidate: "validateByocInfrastructure",
  organizationByocInfrastructureGet: "getByocInfrastructure",
  organizationByocInfrastructureUpdate: "updateByocInfrastructure",
  organizationByocInfrastructureDelete: "deleteByocInfrastructure",
  organizationByocInfrastructureProgressGet: "getByocInfrastructureProgress",
  organizationByocInfrastructureTagsGet: "getByocInfrastructureTags",
  organizationByocInfrastructurePrivateEndpointConfigGet:
    "getByocInfrastructurePrivateEndpointConfig",
  organizationByocInfrastructureCustomerAuthorizedAccessGet:
    "getByocInfrastructureCustomerAuthorizedAccess",
  organizationByocInfrastructureCustomerAuthorizedAccessUpdate:
    "updateByocInfrastructureCustomerAuthorizedAccess",
  // Postgres
  postgresServiceGetList: "listPostgresServices",
  postgresServicePatch: "updatePostgresService",
  postgresServiceCertsGet: "getPostgresServiceCaCertificates",
  postgresInstanceRestore: "restorePostgresService",
  postgresServiceSetPassword: "updatePostgresServicePassword",
  postgresServicePatchState: "updatePostgresServiceState",
  postgresInstanceCreateReadReplica: "createPostgresServiceReadReplica",
  postgresInstanceConfigGet: "getPostgresServiceConfig",
  postgresInstanceConfigPost: "replacePostgresServiceConfig",
  postgresInstanceConfigPatch: "updatePostgresServiceConfig",
  postgresInstanceMetricsGet: "getPostgresServiceMetrics",
  postgresServiceBackupGetList: "listPostgresServiceBackups",
  slowQueryPatternsGetList: "listPostgresSlowQueryPatterns",
  slowQueryPatternGet: "getPostgresSlowQueryPattern",
  postgresLogsGetList: "listPostgresLogs",
  // Prometheus
  instancePrometheusGet: "getServicePrometheusMetrics",
  postgresOrgPrometheusGet: "getOrganizationPostgresPrometheusMetrics",
  postgresInstancePrometheusGet: "getPostgresServicePrometheusMetrics",
  // Query API endpoints
  queryApiEndpointList: "listQueryApiEndpoints",
  // Role management
  organizationRolesGetList: "listOrganizationRoles",
  organizationRolePost: "createOrganizationRole",
  organizationRolePatch: "updateOrganizationRole",
  // Saved queries
  savedQueryList: "listSavedQueries",
  // Service
  instanceGetList: "listServices",
  instanceCreate: "createService",
  instanceGet: "getService",
  instanceUpdate: "updateService",
  instanceDelete: "deleteService",
  instancePrivateEndpointConfigGet: "getServicePrivateEndpointConfig",
  instanceQueryEndpointGet: "getServiceQueryEndpoint",
  instanceQueryEndpointUpsert: "upsertServiceQueryEndpoint",
  instanceQueryEndpointDelete: "deleteServiceQueryEndpoint",
  instanceStateUpdate: "updateServiceState",
  instanceReplicaScalingUpdate: "updateServiceReplicaScaling",
  instancePasswordUpdate: "updateServicePassword",
  instancePrivateEndpointCreate: "createServicePrivateEndpoint",
  jwtProviderGetList: "listJwtProviders",
  // The upstream ids spell the product `Clickhouse`; the SDK keeps its casing.
  serviceClickhouseSettingsListGet: "listServiceClickHouseSettings",
  serviceClickhouseSettingsUpdate: "updateServiceClickHouseSettings",
  serviceClickhouseSettingsSchemaGet: "getServiceClickHouseSettingsSchema",
  serviceClickhouseSettingGet: "getServiceClickHouseSetting",
  serviceClickhouseSettingDelete: "deleteServiceClickHouseSetting",
  // Snapshot
  snapshotGetList: "listSnapshots",
  // UDF
  udfUploadSessionCreate: "createUdfUploadUrl",
  udfList: "listUdfs",
  udfAttachmentList: "listUdfAttachments",
  udfVersionList: "listUdfVersions",
  // User management
  memberGetList: "listMembers",
  invitationGetList: "listInvitations",
};

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(
    `${specPath} not found — run \`pnpm specs:local clickhouse-cloud\` (or specs:fetch) first`,
  );
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

// A rename for an operationId that no longer exists silently stops applying;
// fail so the table is pruned with the spec.
const operationIds = new Set<string>();
for (const pathItem of Object.values<Record<string, any>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    if (pathItem[method]?.operationId) operationIds.add(pathItem[method].operationId);
  }
}
const staleNames = Object.keys(OPERATION_NAMES).filter((id) => !operationIds.has(id));
if (staleNames.length) {
  throw new Error(`OPERATION_NAMES for operationIds not in the spec: ${staleNames.join(", ")}`);
}

// ---- 2. Re-point inline copies of a union at its component ------------------
/**
 * The converter names an inline schema after where it sits, first come first
 * served. `Backup.bucket` and `Snapshot.bucket` inline the exact `oneOf` of
 * the `BackupBucketProperties` component, so `Backup.bucket` takes the name
 * `BackupBucket` and the real `BackupBucket` component (the backup-bucket
 * responses) becomes `BackupBucket2`. Re-pointing every inline copy of a
 * component's union at that component keeps each name on one schema.
 */
const componentSchemas: Record<string, any> = fullSpec.components.schemas;
const componentByUnion = new Map<string, string>();
for (const [name, schema] of Object.entries(componentSchemas)) {
  if (Array.isArray(schema?.oneOf)) componentByUnion.set(JSON.stringify(schema.oneOf), name);
}
const repointed: string[] = [];
const repointUnions = (node: unknown, at: string, isComponentRoot: boolean): void => {
  if (node === null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((v, i) => repointUnions(v, `${at}/${i}`, false));
    return;
  }
  const obj = node as Record<string, any>;
  for (const [key, value] of Object.entries(obj)) {
    const component =
      value !== null && typeof value === "object" && Array.isArray(value.oneOf)
        ? componentByUnion.get(JSON.stringify(value.oneOf))
        : undefined;
    // Only a plain copy (the union plus a description) is re-pointed, and
    // never a component's own definition.
    const plainCopy =
      component !== undefined &&
      Object.keys(value).every((k) => k === "oneOf" || k === "description") &&
      !(isComponentRoot && key === "oneOf");
    if (plainCopy) {
      obj[key] = {
        $ref: `#/components/schemas/${component}`,
        ...(value.description ? { description: value.description } : {}),
      };
      repointed.push(`${at}/${key} → ${component}`);
      continue;
    }
    repointUnions(value, `${at}/${key}`, false);
  }
};
for (const [name, schema] of Object.entries(componentSchemas)) {
  repointUnions(schema, `/components/schemas/${name}`, true);
}
repointUnions(fullSpec.paths, "/paths", false);
if (repointed.length) {
  console.log(
    `🔧 ${repointed.length} inline union(s) re-pointed at their component:\n      ` +
      repointed.join("\n      "),
  );
}

// ---- 3. Unwrap the `{ status, requestId, result }` envelope ----------------
/**
 * The operations the pagination patches mark `smithy.api#paginated`, by
 * operationId: the one list of cursor pages. generate.ts gives exactly these
 * ClickHouseCloudPaginatedProtocol, so the unwrap below leaves exactly these
 * envelopes whole.
 */
const PAGINATED_PATH = /^\/shapes\/[^#]+#(\w+)\/traits\/smithy\.api#paginated$/;
const paginated = new Set<string>();
for (const model of fs.readdirSync(path.join(rootDir, "patches"))) {
  for (const file of fs.readdirSync(path.join(rootDir, "patches", model))) {
    const { patches } = JSON.parse(
      fs.readFileSync(path.join(rootDir, "patches", model, file), "utf-8"),
    );
    for (const { path: pointer } of patches) {
      const id = PAGINATED_PATH.exec(pointer)?.[1];
      if (id !== undefined) paginated.add(id.charAt(0).toLowerCase() + id.slice(1));
    }
  }
}

/**
 * Every JSON success body is `{ status, requestId, result }`, and the payload
 * is `result`. ClickHouseCloudProtocol unwraps it, so the operation's output
 * schema is the `result` schema. A paginated operation keeps its envelope:
 * the pagination strategy reads `nextCursor` beside `result`. An envelope
 * with no `result` has no payload and stays as it is.
 */
let unwrapped = 0;
const seen = new Set<string>();
for (const pathItem of Object.values<Record<string, any>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = pathItem[method];
    if (op?.operationId && paginated.has(op.operationId)) seen.add(op.operationId);
    for (const [status, response] of Object.entries<any>(op?.responses ?? {})) {
      const media = status.startsWith("2") ? response?.content?.["application/json"] : undefined;
      const properties = media?.schema?.properties;
      if (properties?.nextCursor !== undefined && !paginated.has(op.operationId)) {
        throw new Error(
          `${op.operationId} pages by cursor: add it to patches/<model>/pagination.json`,
        );
      }
      if (properties?.result === undefined || paginated.has(op.operationId)) continue;
      media.schema = properties.result;
      unwrapped++;
    }
  }
}
const missing = [...paginated].filter((id) => !seen.has(id));
if (missing.length) {
  throw new Error(
    `patches mark operations the spec no longer has paginated: ${missing.join(", ")}`,
  );
}
console.log(`🔧 ${unwrapped} response envelope(s) unwrapped to their \`result\``);

// ---- 4. Bucket paths by tag ------------------------------------------------
const buckets = new Map<string, Record<string, Record<string, unknown>>>();
for (const [pathTemplate, pathItem] of Object.entries<Record<string, any>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = pathItem[method];
    if (!op) continue;
    const tag: string | undefined = Array.isArray(op.tags) ? op.tags[0] : undefined;
    if (tag === undefined) {
      throw new Error(`${method.toUpperCase()} ${pathTemplate} has no tag to place it in a module`);
    }
    const slug = toSlug(tag);
    if (!buckets.has(slug)) buckets.set(slug, {});
    const bucketPaths = buckets.get(slug)!;
    if (!bucketPaths[pathTemplate]) {
      bucketPaths[pathTemplate] = pathItem.parameters ? { parameters: pathItem.parameters } : {};
    }
    bucketPaths[pathTemplate]![method] = op;
  }
}

/**
 * The Smithy service name for a tag: its PascalCase slug, pluralised when a
 * schema already holds that name (`Service` → `Services`), so the schema
 * keeps its own name in the generated types.
 */
const serviceNameFor = (slug: string): string => {
  const schemas: Record<string, unknown> = fullSpec.components?.schemas ?? {};
  const name = toPascal(slug);
  if (!(name in schemas)) return name;
  if (`${name}s` in schemas) throw new Error(`${slug}: both ${name} and ${name}s are schemas`);
  return `${name}s`;
};

// ---- 5. Convert each bucket ------------------------------------------------
clearModels(outDir);

let written = 0;
let totalOps = 0;
for (const slug of [...buckets.keys()].sort()) {
  const model = convertOpenApiToSmithy(
    { ...fullSpec, paths: buckets.get(slug)! },
    {
      deferNaming: true,
      namespace: `com.clickhouse.cloud.${slug}`,
      // Several tags share a name with a schema in their own model
      // (`Service`, `Backup`, `Snapshot`, `Organization`, `Udf`); a Smithy
      // service shape of that name would push the schema to `Service2`.
      serviceName: serviceNameFor(slug),
      // Operations the spec marks deprecated are not generated.
      skipDeprecated: true,
      successStatuses: ["200", "201"],
      operationNames: OPERATION_NAMES,
      statusToErrorClass: {},
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
