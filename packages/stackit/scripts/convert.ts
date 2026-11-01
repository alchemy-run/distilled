#!/usr/bin/env -S node --conditions=bun
/**
 * convert — STACKIT's OpenAPI descriptions → Smithy JSON models in
 * .generated-specs.
 *
 * STACKIT publishes one OpenAPI document per product (mirrored at
 * `specs/spec-mirror-stackit/specs/<service>.json` — latest version per
 * product). Each file becomes one Smithy model / service module.
 *
 * After the shared OpenAPI→Smithy conversion:
 *
 *   1. Stamp the spec's `servers[0].url` onto every operation's
 *      `smithy.api#http.baseUrl` so the generated `T.Http` carries the
 *      product host (IaaS, SKE, DNS, … each have their own).
 *   2. Stamp `smithy.api#paginated` on list operations that take `page` /
 *      `pageSize` and answer with `totalPages` plus a collection array —
 *      see {@link paginationFor}.
 *
 * Harbor's API is the data plane of `registry` and isn't in STACKIT's specs:
 * `specs/spec-mirror-stackit/specs/registry_harbor.json` is Harbor's Swagger
 * 2.0 document at a release tag, trimmed by the mirror's `fetch-specs.ts`. It
 * becomes the `registry_harbor` module, with no host stamped because the
 * registry URL is part of `HarborCredentials`. Until the mirror has run that
 * script and a submodule bump brings the file in, the same trimmed document in
 * `manual-specs/` keeps this module reproducible from what's committed.
 *
 * `scripts/generate.ts` then compiles the models. Patches, when added, live
 * in `patches/<name>/*.json` and apply here via `runOpenApiConvert`.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import {
  modelExists,
  readModel,
  removeModel,
  writeModel,
} from "@distilled.cloud/dev/codegen/models";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = resolveSpecPath(root, "specs/spec-mirror-stackit/specs/_manifest.json");
const specsDir = path.dirname(manifestPath);
const outDir = path.join(root, ".generated-specs");

if (!fs.existsSync(manifestPath)) {
  throw new Error(
    `${manifestPath} not found — run \`pnpm specs:local stackit\` (or specs:fetch) first`,
  );
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as Array<{
  readonly service: string;
  readonly version: string;
  readonly output: string;
}>;

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

const specServerUrl = (spec: any): string => {
  const servers = spec?.servers;
  if (!Array.isArray(servers) || servers.length === 0) {
    throw new Error("OpenAPI document has no servers[0].url");
  }
  const url = servers[0]?.url;
  if (typeof url !== "string" || url === "") {
    throw new Error("OpenAPI document has no servers[0].url");
  }
  return url.replace(/\/+$/, "");
};

/** Resolve one level of `$ref` against the spec's components. */
const deref = (spec: any, schema: any): any => {
  const ref = schema?.$ref;
  if (typeof ref !== "string") return schema;
  const prefix = "#/components/schemas/";
  if (!ref.startsWith(prefix)) return schema;
  return spec.components?.schemas?.[ref.slice(prefix.length)] ?? schema;
};

/**
 * The `smithy.api#paginated` trait for one operation, or undefined when it
 * doesn't page.
 *
 * STACKIT pages by NUMBER: `?page=N&pageSize=M` in, and a 200 whose schema
 * carries `totalPages` beside a collection array (`zones`, `rrSets`, …).
 * Core's `paginatePageNumber` treats `outputToken` as the NEXT page, so
 * pointing it at `totalPages` would skip to the last page; the trait's
 * `mode` is `page` (the PaginatedTrait union) and
 * `src/pagination.ts`'s `paginateByTotalPages` advances by one until
 * `page >= totalPages`.
 */
const paginationFor = (spec: any, op: any): Record<string, string> | undefined => {
  const params = [...((op.parameters ?? []) as any[])];
  const hasPage = params.some((p) => p?.in === "query" && p?.name === "page");
  const hasPageSize = params.some(
    (p) => p?.in === "query" && (p?.name === "pageSize" || p?.name === "page_size"),
  );
  if (!hasPage || !hasPageSize) return undefined;

  const schema = deref(spec, op.responses?.["200"]?.content?.["application/json"]?.schema);
  const props = schema?.properties;
  if (!props || typeof props !== "object") return undefined;
  if (props.totalPages === undefined && props.total_pages === undefined) {
    return undefined;
  }
  const totalPages = props.totalPages !== undefined ? "totalPages" : "total_pages";
  const pageSize = params.some((p) => p?.in === "query" && p?.name === "pageSize")
    ? "pageSize"
    : "page_size";

  const items = Object.entries<any>(props).find(
    ([name, value]) =>
      name !== totalPages &&
      name !== "message" &&
      name !== "itemsPerPage" &&
      name !== "items_per_page" &&
      name !== "totalItems" &&
      name !== "total_items" &&
      deref(spec, value)?.type === "array",
  )?.[0];
  if (items === undefined) return undefined;

  return {
    mode: "page",
    inputToken: "page",
    outputToken: totalPages,
    items,
    pageSize,
  };
};

/** Harbor's mirrored document, which the manifest doesn't list. */
const MIRRORED_HARBOR_SPEC = "specs/spec-mirror-stackit/specs/registry_harbor.json";

/** Harbor's document while the mirror predates it. Delete once a bump brings it in. */
const COMMITTED_HARBOR_SPEC = path.join(root, "manual-specs", "registry_harbor.json");

const HARBOR_SPEC = fs.existsSync(path.join(specsDir, "registry_harbor.json"))
  ? MIRRORED_HARBOR_SPEC
  : COMMITTED_HARBOR_SPEC;

/**
 * Every Harbor operation declares `X-Request-Id`, a tracing header no caller
 * sets. The other header parameters (`X-Is-Resource-Name`,
 * `X-Accept-Vulnerabilities`) change the response, so they stay inputs.
 */
const dropHarborRequestId = (spec: any): void => {
  for (const item of Object.values<any>(spec.paths ?? {})) {
    for (const op of Object.values<any>(item)) {
      if (Array.isArray(op?.parameters)) {
        op.parameters = op.parameters.filter((p: any) => p?.$ref !== "#/parameters/requestId");
      }
    }
  }
  delete spec.parameters?.requestId;
};

/**
 * STACKIT Git names the responses of `ListInstances` and `ListFlavors` after the
 * operations, so the operations come out as `listInstances2` and `listFlavors2`. Their
 * schemas move out of the way.
 */
const renameGitListSchemas = (spec: any): void => {
  const schemas = spec.components.schemas;
  const moved: Record<string, string> = {
    ListInstances: "InstanceList",
    ListFlavors: "FlavorList",
  };
  for (const [from, to] of Object.entries(moved)) {
    schemas[to] = schemas[from];
    delete schemas[from];
  }
  const text = JSON.stringify(spec.paths).replace(
    /#\/components\/schemas\/(ListInstances|ListFlavors)"/g,
    (_, name: string) => `#/components/schemas/${moved[name]}"`,
  );
  spec.paths = JSON.parse(text);
};

/** Spec fixes a product needs before it converts, by slug. */
const SPEC_PREPROCESS: Record<string, (spec: any) => void> = {
  git: renameGitListSchemas,
};

/**
 * Operation names the verbNoun rewrite gets wrong, per product. `RetrieveZone`
 * (POST `.../zones/{zoneId}/retrieve`, queue a secondary zone's transfer)
 * would alias `retrieve` to `get` and collide with `GetZone`, as `getZone2`.
 */
const OPERATION_NAMES: Record<string, Record<string, string>> = {
  secrets_manager: { GetApproles: "listApproles" },
  dns: { RetrieveZone: "retrieveZone" },
};

await runOpenApiConvert({
  root,
  specs: [
    ...manifest.map((entry) => {
      const slug = entry.output.replace(/\.json$/, "");
      return {
        name: slug,
        specPath: `specs/spec-mirror-stackit/specs/${entry.output}`,
        preprocess: SPEC_PREPROCESS[slug],
        options: {
          namespace: `com.stackit.${slug}`,
          serviceName: toPascal(slug),
          operationNames: OPERATION_NAMES[slug],
        },
      };
    }),
    {
      name: "registry_harbor",
      specPath: HARBOR_SPEC,
      preprocess: dropHarborRequestId,
      options: {
        namespace: "com.stackit.registry_harbor",
        // The definitions include `Project`, `Robot`, `Repository`: keep the
        // service shape out of their way.
        serviceName: "RegistryHarbor",
        headerParams: true,
      },
    },
    // Vault's KV v2 and login API, the data plane of `secrets_manager`: its
    // published OpenAPI document, trimmed by hand (see the file's `info`). No
    // host is stamped: each instance's URL is part of `VaultCredentials`.
    {
      name: "secrets_manager_kv",
      specPath: path.join(root, "manual-specs", "secrets_manager_kv.json"),
      options: {
        namespace: "com.stackit.secrets_manager_kv",
        serviceName: "SecretsManagerKv",
      },
    },
    // RabbitMQ's management API, the HTTP data plane of `rabbitmq`: written by hand
    // from its published HTML reference (see the file's `info`). No host is stamped:
    // each credential's URL is part of `RabbitMQManagementCredentials`.
    {
      name: "rabbitmq_management",
      specPath: path.join(root, "manual-specs", "rabbitmq_management.json"),
      options: {
        namespace: "com.stackit.rabbitmq_management",
        serviceName: "RabbitmqManagement",
      },
    },
    // Dremio's login, SQL and job routes, the data plane of `dremio`: written by hand from
    // its published reference (see the file's `info`). No host is stamped: each instance's
    // URL is part of `DremioCredentials`.
    {
      name: "dremio_rest",
      specPath: path.join(root, "manual-specs", "dremio_rest.json"),
      options: {
        namespace: "com.stackit.dremio_rest",
        serviceName: "DremioRest",
      },
    },
    // OpenSearch's REST API, the data plane of `opensearch` and `logme`: trimmed by hand
    // from its published OpenAPI document (see the file's `info`). No host is stamped:
    // each credential's URL is part of `OpenSearchCredentials`.
    {
      name: "opensearch_data",
      specPath: path.join(root, "manual-specs", "opensearch_data.json"),
      options: {
        namespace: "com.stackit.opensearch_data",
        serviceName: "OpensearchData",
      },
    },
    // Forgejo's REST API, the data plane of `git`: its published Swagger document, trimmed by a
    // script (see the file's `info`). No host is stamped: each instance's URL is part of
    // `ForgejoCredentials`.
    {
      name: "git_forgejo",
      specPath: path.join(root, "manual-specs", "git_forgejo.json"),
      options: {
        namespace: "com.stackit.git_forgejo",
        serviceName: "GitForgejo",
        operationNames: {
          userGetCurrent: "getCurrentUser",
          repoGet: "getRepository",
          repoEdit: "updateRepository",
          repoDelete: "deleteRepository",
          createCurrentUserRepo: "createCurrentUserRepository",
          createOrgRepo: "createOrgRepository",
        },
      },
    },
    // Grafana Loki's push and query API, the data plane of `logs`: written by hand from
    // its published reference (see the file's `info`). No host is stamped: each
    // instance's URL is part of `LokiCredentials`.
    {
      name: "logs_loki",
      specPath: path.join(root, "manual-specs", "logs_loki.json"),
      options: {
        namespace: "com.stackit.logs_loki",
        serviceName: "LogsLoki",
      },
    },
    // Apache Airflow's REST API, the data plane of `workflows`: Airflow's published OpenAPI
    // document, trimmed by a script (see the file's `info`). No host is stamped: each
    // instance's URL is part of `WorkflowsAirflowCredentials`.
    {
      name: "workflows_airflow",
      specPath: path.join(root, "manual-specs", "workflows_airflow.json"),
      options: {
        namespace: "com.stackit.workflows_airflow",
        serviceName: "WorkflowsAirflow",
        // Airflow's own names. The verbNoun rewrite would call them `updateDag` and so on.
        operationNames: {
          PatchDag: "patchDag",
          PatchVariable: "patchVariable",
          PatchConnection: "patchConnection",
        },
      },
    },
    // Alertmanager's API v2, part of the data plane of `observability`: its published
    // OpenAPI document, trimmed (see the file's `info`). No host is stamped: each instance's
    // URL is part of `ObservabilityDataCredentials`.
    {
      name: "observability_alertmanager",
      specPath: path.join(root, "manual-specs", "observability_alertmanager.json"),
      options: {
        namespace: "com.stackit.observability_alertmanager",
        serviceName: "ObservabilityAlertmanager",
      },
    },
    // Prometheus's query API, part of the data plane of `observability`: its published
    // OpenAPI document, trimmed (see the file's `info`). No host is stamped, like Alertmanager.
    {
      name: "observability_prometheus",
      specPath: path.join(root, "manual-specs", "observability_prometheus.json"),
      options: {
        namespace: "com.stackit.observability_prometheus",
        serviceName: "ObservabilityPrometheus",
      },
    },
    // The Cloud Foundry v3 API and UAA's token endpoint, the data plane of `scf`: the document in
    // `cloudfoundry/cloud_controller_ng`, trimmed by a script (see the file's `info`). No host is
    // stamped: each platform's `apiUrl` is part of `CloudFoundryCredentials`.
    {
      name: "cloud_foundry",
      specPath: path.join(root, "manual-specs", "cloud_foundry.json"),
      options: {
        namespace: "com.stackit.cloud_foundry",
        serviceName: "CloudFoundry",
      },
    },
    // The OpenAI-compatible inference API of `model_serving`: written by hand from STACKIT's docs
    // and OpenAI's reference (see the file's `info`). No host is stamped: it is part of
    // `ModelServingInferenceCredentials`.
    {
      name: "model_serving_inference",
      specPath: path.join(root, "manual-specs", "model_serving_inference.json"),
      options: {
        namespace: "com.stackit.model_serving_inference",
        serviceName: "ModelServingInference",
      },
    },
    // MLflow's tracking REST API, the data plane of `model_experiments`: written by hand from its
    // published reference (see the file's `info`). No host is stamped: each instance's URL is part
    // of `MlflowCredentials`.
    {
      name: "model_experiments_mlflow",
      specPath: path.join(root, "manual-specs", "model_experiments_mlflow.json"),
      options: {
        namespace: "com.stackit.model_experiments_mlflow",
        serviceName: "ModelExperimentsMlflow",
      },
    },
    // Pub/Sub's data plane: the OpenAPI document in `stackitcloud/pubsub-sdk-go`, with the
    // topic and region made host labels (see the file's `info`). Its host is stamped below.
    {
      name: "pubsub_data",
      specPath: path.join(root, "manual-specs", "pubsub_data.json"),
      options: {
        namespace: "com.stackit.pubsub_data",
        serviceName: "PubsubData",
        headerParams: true,
      },
    },
  ],
  patchesDir: "patches",
  finalize: false,
  options: {
    namespace: "com.stackit.api",
    serviceName: "Stackit",
    skipDeprecated: true,
    successStatuses: ["200", "201", "202", "204"],
  },
});

// Stamp per-product hosts and totalPages pagination onto the written models.
let stampedUrls = 0;
let stampedPages = 0;
for (const entry of manifest) {
  const slug = entry.output.replace(/\.json$/, "");
  const spec = JSON.parse(fs.readFileSync(path.join(specsDir, entry.output), "utf8"));
  const modelPath = path.join(outDir, `${slug}.json`);
  if (!modelExists(modelPath)) continue;
  const model = readModel(modelPath);
  const opCount = Object.values<any>(model.shapes ?? {}).filter(
    (s) => s?.type === "operation",
  ).length;
  if (opCount === 0) {
    // STACKIT Redis v2 is fully deprecated (Valkey replaced it); skip
    // writing an empty module rather than generating a hollow service.
    console.warn(`   ⚠️  ${slug}: no operations (all deprecated?) — dropped`);
    removeModel(modelPath);
    continue;
  }
  const serverUrl = specServerUrl(spec);

  const byRoute = new Map<string, Record<string, string>>();
  for (const [pathTemplate, pathItem] of Object.entries<any>(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const op = pathItem?.[method];
      if (!op) continue;
      const trait = paginationFor(spec, op);
      if (trait) byRoute.set(`${method.toUpperCase()} ${pathTemplate}`, trait);
    }
  }

  let paginated = 0;
  for (const shape of Object.values<any>(model.shapes ?? {})) {
    if (shape?.type !== "operation") continue;
    const http = shape.traits?.["smithy.api#http"];
    if (!http || typeof http !== "object") continue;
    http.baseUrl = serverUrl;
    stampedUrls++;
    const trait = byRoute.get(`${http.method} ${http.uri}`);
    if (!trait) continue;
    if (shape.traits["smithy.api#paginated"] === undefined) {
      shape.traits["smithy.api#paginated"] = trait;
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
  writeModel(modelPath, model);
}

// A manual spec with a real host: `T.Http({ baseUrl })` keeps its `{topicId}` and
// `{regionId}` labels, and the protocol fills them from the request.
{
  const modelPath = path.join(outDir, "pubsub_data.json");
  if (modelExists(modelPath)) {
    const spec = JSON.parse(
      fs.readFileSync(path.join(root, "manual-specs", "pubsub_data.json"), "utf8"),
    );
    const model = readModel(modelPath);
    for (const shape of Object.values<any>(model.shapes ?? {})) {
      const http = shape?.type === "operation" ? shape.traits?.["smithy.api#http"] : undefined;
      if (!http || typeof http !== "object") continue;
      http.baseUrl = specServerUrl(spec);
      stampedUrls++;
    }
    writeModel(modelPath, model);
  }
}

console.log(`🔗 stamped ${stampedUrls} operation baseUrl(s), ${stampedPages} paginated`);

await finalizeConvert({ root });
