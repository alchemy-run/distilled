#!/usr/bin/env -S node --conditions=bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * Bitbucket Cloud Effect SDK.
 *
 * Input:  .generated-specs/bitbucket.json  (written by scripts/convert.ts)
 * Output: src/services/bitbucket.ts  +  src/services/index.ts
 *
 * Bitbucket is REST JSON with one collection envelope: a list answers
 * `{ values, next, page?, pagelen?, size? }`, where `next` is the URL of the
 * next page. The RFC-6902 patches in patches/*.json apply to the Smithy model
 * via finalizeConvert in scripts/convert.ts — never here.
 */
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for bare array/scalar response
      // bodies — as a response's sole member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Sensitive strings (pipeline variable values, OAuth consumer secrets):
  // Redacted on the way out, `string | Redacted` accepted on the way in.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // A `oneOf` in the spec is a plain value alternative — the TS type is the
  // case union, the schema stays opaque.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  paginationProfiles: {
    cursor: {
      strategy: "paginateNextPage",
      requires: () => ["inputToken", "outputToken", "items"],
      itemsFallback: "",
    },
  },

  sourceNote: ".generated-specs (specs/spec-mirror-bitbucket/specs/openapi.json)",

  operationDecl: {
    contextType: "BitbucketOpContext",
    commonErrorType: "BitbucketOpError",
    serviceErrors: "BitbucketServiceErrors",
    protocol: "BitbucketProtocol",
    retry: "Retry.Retry",
  },

  // `effect/Redacted` is only referenced by modules with sensitive members —
  // import it exactly there.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the Bitbucket Cloud Effect SDK from the Smithy model",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  spec: () => spec,
});
