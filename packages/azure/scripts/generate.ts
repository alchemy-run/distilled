#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the per-service Smithy JSON models in .generated-specs
 * into the Azure Effect SDK.
 *
 * Input:  .generated-specs/<service>.json  (written by scripts/convert.ts)
 * Output: src/services/<service>.ts  +  src/services/index.ts
 *         (data planes: `<service>-<group>.ts`, exported as `<service>_<group>`)
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is Azure's provider spec.
 *
 * v0 parity notes:
 *   • operation exports keep the ARM operationId casing
 *     (`VirtualMachinesGet`, not `virtualMachinesGet`) — v0's
 *     `toCamelCase(operationId)` preserved the leading capital
 *   • generated ops carry NO per-op error unions
 *     (`includeOperationErrors=false` in v0); every failure is matched by
 *     the protocol against `AZURE_ERROR_CODE_MAP` / the HTTP status map
 *   • pagination: convert.ts stamps `smithy.api#paginated` from each
 *     `x-ms-pageable` (cursor over the absolute `nextLink`, Storage's
 *     `marker`, or a single page); one profile, core's default strategy
 *     dispatching on `mode` — the protocol follows the `nextLink` URL
 *   • the operation's `T.Http` trait carries the baked `apiVersion`
 *     (folded in by convert.ts); the protocol appends `?api-version=`
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import { JSON_PRELUDE, TS_JSON_PRELUDE } from "@distilled.cloud/dev/codegen/prelude";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";
/** Data-plane traits written by convert.ts (see its "Data planes" section). */
const HOST_LABEL_TRAIT = "com.azure.protocols#hostLabel";
const AUDIENCE_TRAIT = "com.azure.protocols#audience";
const TOKEN_EXCHANGE_TRAIT = "com.azure.protocols#tokenExchange";
const ANONYMOUS_TRAIT = "com.azure.protocols#anonymous";
const AUDIENCE_BY_HOST_TRAIT = "com.azure.protocols#audienceByHost";
const HEADERS_TRAIT = "com.azure.protocols#headers";
/** Storage XML / header-collection traits written by convert.ts (stampStorageOp). */
const XML_TEXT_TRAIT = "com.azure.protocols#xmlText";
const XML_ITEM_NAME_TRAIT = "com.azure.protocols#xmlItemName";
/** Hand-authored models (manual-specs): a member sent as one JSON-encoded header. */
const JSON_HEADER_TRAIT = "com.azure.protocols#jsonHeader";

/** Azure's provider spec for the shared smithy→SDK compiler. */
const azureSpec: SdkSpec = {
  // v0 kept `toCamelCase(operationId)` (leading capital preserved for ARM's
  // `Group_Operation` ids) as the exported const name.
  opExportName: (n) => n,

  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  // Only Storage's raw bodies (`format: file`) target smithy.api#Blob:
  // uploads take bytes and downloads return them.
  prelude: { ...JSON_PRELUDE, Blob: "S.instanceOf(Uint8Array)" },
  tsPrelude: { ...TS_JSON_PRELUDE, Blob: "Uint8Array" },

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for bare array/scalar response
      // bodies; as the response's only member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
    {
      // A data-plane member that fills a `{placeholder}` of the operation's
      // host template (`{vaultBaseUrl}`) -- not a path label, query, or body.
      trait: HOST_LABEL_TRAIT,
      binding: "hostLabel",
      pipe: "T.HostLabel()",
    },
  ],

  // Sensitive strings (passwords, connection strings, access keys): the
  // schema member carries T.SensitiveValue; the protocol delivers Redacted
  // values and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
    // Storage: XML element/attribute naming and `x-ms-meta-*` header maps.
    "smithy.api#xmlName": "T.XmlName",
    "smithy.api#xmlAttribute": "T.XmlAttribute",
    "smithy.api#xmlFlattened": "T.XmlFlattened",
    [XML_TEXT_TRAIT]: "T.XmlText",
    [XML_ITEM_NAME_TRAIT]: "T.XmlItemName",
    "smithy.api#httpPrefixHeaders": "T.HeaderPrefix",
    // manual-specs: a struct sent and read as one JSON header (`BrokerProperties`).
    [JSON_HEADER_TRAIT]: "T.JsonHeader",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the protocol
  // passes union content through verbatim.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // `x-ms-pageable` ops (stamped by convert.ts). No strategy: core's
  // paginateWithDefaults runs `cursor` (nextLink / marker) and `single`.
  paginationProfiles: {
    pageable: { itemsFallback: "value" },
  },

  operationDecl: {
    contextType: "AzureOpContext",
    commonErrorType: "AzureOpError",
    commonErrorClasses: ["UnknownAzureError"],
    protocol: "AzureProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/azure-rest-api-specs)",

  // Sensitive member types reference Redacted; pull the import in when used.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";\n`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

/**
 * A label that is the whole leading path segment (`/{scope}/providers/…`,
 * `/{resourceUri}/…`, `/{roleAssignmentId}`) carries a full ARM id such as
 * `/subscriptions/{id}/resourceGroups/{rg}` — the specs mark these
 * `x-ms-skip-url-encoding`. Rewrite them to greedy `{name+}` labels so the
 * request builder keeps their `/` separators.
 */
const markScopeLabelsGreedy = (model: any): void => {
  for (const shape of Object.values<any>(model.shapes ?? {})) {
    const http = shape?.traits?.["smithy.api#http"];
    if (typeof http?.uri !== "string") continue;
    // Data-plane paths start at the host, not at an ARM scope.
    if (http.host !== undefined) continue;
    http.uri = http.uri.replace(/^\/\{([A-Za-z0-9_]+)\}(?=\/|$)/, "/{$1+}");
  }
};

/**
 * A data-plane model records its token audience (and, for ACR, its token
 * exchange; for Cosmos Tables, per-host audiences and constant headers) once,
 * on the service shape, where a patch can correct it. Copy them onto every
 * operation's http trait: the protocol only sees the operation.
 */
const foldServiceAuth = (model: any): void => {
  const service = Object.values<any>(model.shapes ?? {}).find((s) => s?.type === "service");
  const traits = service?.traits ?? {};
  const audience = traits[AUDIENCE_TRAIT];
  const tokenExchange = traits[TOKEN_EXCHANGE_TRAIT];
  const anonymous = traits[ANONYMOUS_TRAIT];
  const audienceByHost = traits[AUDIENCE_BY_HOST_TRAIT];
  const headers = traits[HEADERS_TRAIT];
  for (const shape of Object.values<any>(model.shapes ?? {})) {
    const http = shape?.type === "operation" ? shape.traits?.["smithy.api#http"] : undefined;
    if (!http) continue;
    if (typeof audience === "string") http.audience = audience;
    if (typeof tokenExchange === "string") http.tokenExchange = tokenExchange;
    if (anonymous === true) http.anonymous = true;
    if (audienceByHost !== undefined) http.audienceByHost = audienceByHost;
    if (headers !== undefined) http.headers = { ...http.headers, ...headers };
  }
};

runGeneratorCli({
  description: "Generate the Azure Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // patches/<service>/*.json apply in convert (finalizeConvert), so the
  // models here are already patched.
  patchesDir: false,
  transformModel: (model) => {
    markScopeLabelsGreedy(model);
    foldServiceAuth(model);
  },
  // Data-plane modules are `<service>-<group>.ts`; a namespace export needs
  // an identifier (`keyvault_secrets`, like ARM's `azure_kusto`).
  barrelExportName: (resource) => resource.replace(/-/g, "_"),
  spec: () => azureSpec,
});
