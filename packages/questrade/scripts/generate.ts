#!/usr/bin/env -S node --conditions=bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * Questrade Effect SDK.
 *
 * Input:  .generated-specs/questrade.json  (written by scripts/convert.ts)
 * Output: src/services/questrade.ts  +  src/services/index.ts
 *
 * Questrade is bearer-token REST with no pagination. The RFC-6902 patches in
 * patches/*.json apply to the Smithy model via finalizeConvert in
 * scripts/convert.ts — never here.
 */
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

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

  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  sourceNote: ".generated-specs (specs/spec-mirror-questrade)",

  operationDecl: {
    contextType: "QuestradeOpContext",
    commonErrorType: "QuestradeOpError",
    commonErrorClasses: ["UnknownQuestradeError"],
    protocol: "QuestradeProtocol",
    retry: "Retry.Retry",
  },
};

runGeneratorCli({
  description: "Generate the Questrade Effect SDK from the Smithy model",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  spec: () => spec,
});
