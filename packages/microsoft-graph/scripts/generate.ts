#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the per-group Smithy JSON models in .generated-specs into
 * the Microsoft Graph Effect SDK.
 *
 * Input:  .generated-specs/<group>.json  (one model per top-level tag group,
 *         written by scripts/convert.ts)
 * Output: src/services/<group>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is Microsoft Graph's provider
 * spec:
 *   • module files and barrel exports are the Graph URL segment
 *     (`servicePrincipals.createServicePrincipal`)
 *   • generated ops carry NO per-op error unions — every failure is matched
 *     by the protocol against the OData error envelope's code
 *     (`GRAPH_ERROR_CODE_MAP`) and then the HTTP status
 *   • `x-ms-pageable` list ops paginate in cursor mode over
 *     `@odata.nextLink` (see src/pagination.ts and src/protocol.ts)
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";
const COMMA_DELIMITED_TRAIT = "com.microsoft.graph#commaDelimited";

/** Microsoft Graph's provider spec for the shared smithy→SDK compiler. */
const graphSpec: SdkSpec = {
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

  // Sensitive strings (`secretText`, passwords, tokens): the schema member
  // carries T.SensitiveValue; the protocol delivers Redacted values and
  // accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
    // `$select` / `$expand` / `$orderby`: one comma-joined value (convert
    // stamps them from the spec's `explode: false`).
    [COMMA_DELIMITED_TRAIT]: "T.CommaDelimited",
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

  // One pagination profile: `nextLink` in, `odataNextLink` out, `value`
  // items, traversed by core's paginateCursor.
  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "value",
    },
  },

  operationDecl: {
    contextType: "MicrosoftGraphOpContext",
    commonErrorType: "MicrosoftGraphOpError",
    commonErrorClasses: ["UnknownMicrosoftGraphError"],
    protocol: "MicrosoftGraphProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-microsoft-graph)",

  // Sensitive member types reference Redacted; pull the import in when used.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";\n`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

runGeneratorCli({
  convert: () => import("./convert.ts"),
  description: "Generate the Microsoft Graph Effect SDK from the Smithy models",
  root: `${import.meta.dirname}/..`,
  // patches/<group>/*.json apply in convert (finalizeConvert), so the models
  // here are already patched.
  patchesDir: false,
  spec: () => graphSpec,
});
