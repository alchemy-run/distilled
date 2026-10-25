#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * Anthropic Effect SDK.
 *
 * Input:  .generated-specs/anthropic.json  (written by scripts/convert.ts)
 * Output: src/services/anthropic.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Anthropic's provider spec.
 * Anthropic keeps the wire's snake_case member names on the TS surface (as
 * its own SDKs do), so no member renaming or wire dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { JSON_PRELUDE, TS_JSON_PRELUDE } from "@distilled.cloud/core/codegen/prelude";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/**
 * Error classes every operation carries (src/errors.ts). The `error.type`
 * classes hold body matchers on `/error/type`, so the REST protocol surfaces
 * a failure as the class its envelope names, on any operation.
 */
const COMMON_ERROR_CLASSES = [
  "InvalidRequest",
  "AuthenticationFailed",
  "PaymentRequired",
  "PermissionDenied",
  "ResourceNotFound",
  "RequestTooLarge",
  "RateLimited",
  "ApiServerError",
  "RequestTimeout",
  "Overloaded",
  "MissingAnthropicCredentials",
  "UnknownAnthropicError",
];

/** Anthropic's provider spec for the shared smithy→SDK compiler. */
const anthropicSpec: SdkSpec = {
  schemaType: "Codec",
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,
  // Files and skill uploads take binary parts; downloads return bytes.
  prelude: {
    ...JSON_PRELUDE,
    Blob: "S.Union([S.instanceOf(Blob), S.instanceOf(Uint8Array), S.instanceOf(ArrayBuffer)])",
  },
  tsPrelude: {
    ...TS_JSON_PRELUDE,
    Blob: "Blob | Uint8Array | ArrayBuffer",
  },

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

  // Sensitive strings (API keys, tokens): the schema member carries
  // T.SensitiveValue; the REST protocol delivers Redacted values and accepts
  // string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberSchema: (m, ref) =>
    SENSITIVE_TRAIT in m.traits
      ? `S.Union([${ref(m.target)}, S.Redacted(${ref(m.target)}, { disallowJsonEncode: true })])`
      : undefined,
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // A raw binary download (files, skill version content) is the response.
  shapeOverride: ({ name, def }) => {
    if (
      def.type === "structure" &&
      Object.keys(def.members ?? {}).length === 1 &&
      def.members.body?.target === "smithy.api#Blob" &&
      RAW_RESPONSE_TRAIT in (def.members.body.traits ?? {})
    ) {
      return [
        `export type ${name} = Uint8Array;`,
        `export const ${name} = S.instanceOf(Uint8Array).pipe(T.BinaryResponse()) as S.Codec<${name}>;`,
      ];
    }
    return undefined;
  },

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Codec<${name}>;\n`,
  ],

  // List operations carry a `mode`-tagged trait (relay or cursor — stamped
  // in scripts/convert.ts); core's paginateWithDefaults dispatches on it.
  paginationProfiles: {
    anthropic: {
      strategy: "paginateWithDefaults",
      itemsFallback: "data",
    },
  },

  operationDecl: {
    contextType: "AnthropicOpContext",
    commonErrorType: "AnthropicOpError",
    commonErrorClasses: COMMON_ERROR_CLASSES,
    protocol: "AnthropicProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-anthropic)",

  // Sensitive member types reference Redacted; pull the import in when used.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";\n`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the Anthropic Effect SDK from the Smithy model",
  root: `${import.meta.dirname}/..`,
  // patches/ holds OpenAPI-document patches consumed by scripts/convert.ts;
  // there is no smithy-model patch chain.
  patchesDir: false,
  spec: () => anthropicSpec,
});
