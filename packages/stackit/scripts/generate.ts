#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * STACKIT Effect SDK.
 *
 * Input:  .generated-specs/<service>.json  (one model per STACKIT product,
 *         written by scripts/convert.ts)
 * Output: src/services/<service>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is STACKIT's provider spec:
 * the `com.distilled.openapi` trait vocabulary (nullable members, bare-body
 * responses), a passthrough union style, the totalPages pagination profile,
 * and the protocol/retry/error names.
 *
 * STACKIT keeps its wire member names verbatim (camelCase — `projectId`,
 * `pageSize`, `totalPages`) on the TS surface, the spelling its own docs
 * and Go SDK use, so there is no memberName mapping. Module files are named
 * after the product slug (`postgres_flex.ts`) while the barrel exports them
 * camelCased (`postgresFlex.listInstances`).
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `postgres_flex` → `postgresFlex` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** STACKIT's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for bare array/scalar response
      // bodies; as the response's only member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  // A binary download (a patch points the operation's output at a structure with
  // one raw `body` blob): the response IS the bytes, read without text decoding.
  shapeOverride: ({ name, def }) =>
    def.type === "structure" &&
    Object.keys(def.members ?? {}).length === 1 &&
    def.members?.body?.target === "smithy.api#Blob" &&
    RAW_RESPONSE_TRAIT in (def.members.body.traits ?? {})
      ? [
          `export type ${name} = Uint8Array;`,
          `export const ${name} = /*@__PURE__*/ S.instanceOf(Uint8Array).pipe(T.BinaryResponse()) as any as S.Schema<${name}>;`,
        ]
      : undefined,
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names for STACKIT), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // STACKIT's page / totalPages envelope, traversed by src/pagination.ts's
  // paginateByTotalPages. The trait is stamped in scripts/convert.ts — see the
  // comment on `paginationFor` there.
  paginationProfiles: {
    page: {
      strategy: "paginateByTotalPages",
      itemsFallback: "",
    },
    // A trait a patch adds for an API that pages by `pageToken` / `nextPageToken`: core's
    // default strategy for a trait without `mode`.
    token: { itemsFallback: "" },
  },
  paginationProfileFor: (trait) => (trait.mode === "page" ? "page" : "token"),

  sourceNote: ".generated-specs (specs/spec-mirror-stackit)",

  operationDecl: {
    contextType: "StackitOpContext",
    commonErrorType: "StackitOpError",
    commonErrorClasses: ["UnknownStackitError"],
    protocol: "StackitProtocol",
    retry: "Retry.Retry",
  },

  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";\n`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

/**
 * Harbor's API (`registry_harbor`, from Harbor's own swagger) is the one module
 * that doesn't sign with a STACKIT token, so it has its own protocol and
 * context. See `HarborProtocol`.
 */
const harborSpec: SdkSpec = {
  ...spec,
  operationDecl: {
    contextType: "HarborOpContext",
    commonErrorType: "HarborOpError",
    commonErrorClasses: ["UnknownStackitError"],
    protocol: "HarborProtocol",
    retry: "Retry.Retry",
  },
};

const isHarborModel = (model: { readonly shapes?: Record<string, unknown> }): boolean =>
  Object.keys(model.shapes ?? {}).some((id) => id.startsWith("com.stackit.registry_harbor#"));

/**
 * Vault's API (`secrets_manager_kv`) signs with a client token rather than a
 * STACKIT token, and its logins sign with nothing. See `VaultProtocol`.
 */
const vaultSpec: SdkSpec = {
  ...spec,
  operationDecl: {
    contextType: "VaultOpContext",
    commonErrorType: "VaultOpError",
    commonErrorClasses: ["UnknownStackitError"],
    protocol: "VaultProtocol",
    retry: "Retry.Retry",
    overrides: ({ exportName }) =>
      exportName.startsWith("login")
        ? { protocol: "VaultLoginProtocol", contextType: "VaultLoginContext" }
        : undefined,
  },
  postProcess: (code) =>
    (spec.postProcess?.(code) ?? code).replace(
      "  VaultProtocol,\n",
      "  VaultLoginProtocol,\n  VaultProtocol,\n  type VaultLoginContext,\n",
    ),
};

const isVaultModel = (model: { readonly shapes?: Record<string, unknown> }): boolean =>
  Object.keys(model.shapes ?? {}).some((id) => id.startsWith("com.stackit.secrets_manager_kv#"));

/**
 * RabbitMQ's management API (`rabbitmq_management`) takes the Basic auth of a
 * `rabbitmq` credential rather than a STACKIT token. See
 * `RabbitMQManagementProtocol`.
 */
const rabbitmqManagementSpec: SdkSpec = {
  ...spec,
  operationDecl: {
    contextType: "RabbitMQManagementOpContext",
    commonErrorType: "RabbitMQManagementOpError",
    commonErrorClasses: ["UnknownStackitError"],
    protocol: "RabbitMQManagementProtocol",
    retry: "Retry.Retry",
  },
};

const isRabbitMQManagementModel = (model: { readonly shapes?: Record<string, unknown> }): boolean =>
  Object.keys(model.shapes ?? {}).some((id) => id.startsWith("com.stackit.rabbitmq_management#"));

/**
 * OpenSearch's REST API (`opensearch_data`) takes the Basic auth of an `opensearch` or
 * `logme` credential rather than a STACKIT token. See `OpenSearchProtocol`.
 */
const opensearchDataSpec: SdkSpec = {
  ...spec,
  operationDecl: {
    contextType: "OpenSearchOpContext",
    commonErrorType: "OpenSearchOpError",
    commonErrorClasses: ["UnknownStackitError"],
    protocol: "OpenSearchProtocol",
    retry: "Retry.Retry",
  },
};

const isOpenSearchDataModel = (model: { readonly shapes?: Record<string, unknown> }): boolean =>
  Object.keys(model.shapes ?? {}).some((id) => id.startsWith("com.stackit.opensearch_data#"));

/**
 * Grafana Loki's API (`logs_loki`) takes a Logs instance's access token, per instance, rather
 * than a STACKIT token. See `LokiProtocol`.
 */
const logsLokiSpec: SdkSpec = {
  ...spec,
  operationDecl: {
    contextType: "LokiOpContext",
    commonErrorType: "LokiOpError",
    commonErrorClasses: ["UnknownStackitError"],
    protocol: "LokiProtocol",
    retry: "Retry.Retry",
  },
};

const isLogsLokiModel = (model: { readonly shapes?: Record<string, unknown> }): boolean =>
  Object.keys(model.shapes ?? {}).some((id) => id.startsWith("com.stackit.logs_loki#"));

/**
 * Dremio's REST API (`dremio_rest`) takes a token from its own login rather than a
 * STACKIT token, and the login signs with nothing. See `DremioProtocol`.
 */
const dremioRestSpec: SdkSpec = {
  ...spec,
  operationDecl: {
    contextType: "DremioOpContext",
    commonErrorType: "DremioOpError",
    commonErrorClasses: ["UnknownStackitError"],
    protocol: "DremioProtocol",
    retry: "Retry.Retry",
    overrides: ({ exportName }) =>
      exportName === "login"
        ? { protocol: "DremioLoginProtocol", contextType: "DremioLoginContext" }
        : undefined,
  },
  postProcess: (code) =>
    (spec.postProcess?.(code) ?? code).replace(
      "  DremioProtocol,\n",
      "  DremioLoginProtocol,\n  DremioProtocol,\n  type DremioLoginContext,\n",
    ),
};

const isDremioRestModel = (model: { readonly shapes?: Record<string, unknown> }): boolean =>
  Object.keys(model.shapes ?? {}).some((id) => id.startsWith("com.stackit.dremio_rest#"));

/**
 * Apache Airflow's REST API (`workflows_airflow`) takes a session cookie from a STACKIT
 * Workflows instance's session endpoint rather than a STACKIT token. See
 * `WorkflowsAirflowProtocol`.
 */
const workflowsAirflowSpec: SdkSpec = {
  ...spec,
  operationDecl: {
    contextType: "WorkflowsAirflowOpContext",
    commonErrorType: "WorkflowsAirflowOpError",
    commonErrorClasses: ["UnknownStackitError"],
    protocol: "WorkflowsAirflowProtocol",
    retry: "Retry.Retry",
  },
};

const isWorkflowsAirflowModel = (model: { readonly shapes?: Record<string, unknown> }): boolean =>
  Object.keys(model.shapes ?? {}).some((id) => id.startsWith("com.stackit.workflows_airflow#"));

/**
 * The Alertmanager and Prometheus APIs of an Observability instance
 * (`observability_alertmanager`, `observability_prometheus`) take the Basic auth of one of
 * its credentials rather than a STACKIT token. See `ObservabilityDataProtocol`.
 */
const observabilityDataSpec: SdkSpec = {
  ...spec,
  operationDecl: {
    contextType: "ObservabilityDataOpContext",
    commonErrorType: "ObservabilityDataOpError",
    commonErrorClasses: ["UnknownStackitError"],
    protocol: "ObservabilityDataProtocol",
    retry: "Retry.Retry",
  },
};

const isObservabilityDataModel = (model: { readonly shapes?: Record<string, unknown> }): boolean =>
  Object.keys(model.shapes ?? {}).some(
    (id) =>
      id.startsWith("com.stackit.observability_alertmanager#") ||
      id.startsWith("com.stackit.observability_prometheus#"),
  );

runGeneratorCli({
  description: "Generate the STACKIT Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  barrelExportName: camel,
  continueOnModelError: true,
  spec: (model) =>
    isObservabilityDataModel(model)
      ? observabilityDataSpec
      : isWorkflowsAirflowModel(model)
        ? workflowsAirflowSpec
        : isDremioRestModel(model)
          ? dremioRestSpec
          : isLogsLokiModel(model)
            ? logsLokiSpec
            : isOpenSearchDataModel(model)
              ? opensearchDataSpec
              : isVaultModel(model)
                ? vaultSpec
                : isHarborModel(model)
                  ? harborSpec
                  : isRabbitMQManagementModel(model)
                    ? rabbitmqManagementSpec
                    : spec,
});
