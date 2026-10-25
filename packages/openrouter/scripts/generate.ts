#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * OpenRouter Effect SDK.
 *
 * Input:  .generated-specs/openrouter.json  (written by scripts/convert.ts)
 * Output: src/services/openrouter.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is OpenRouter's provider
 * spec. OpenRouter keeps the wire's member names on the TS surface (the
 * OpenAI-compatible snake_case/camelCase mix), so no member renaming or wire
 * dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { JSON_PRELUDE, TS_JSON_PRELUDE } from "@distilled.cloud/core/codegen/prelude";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** OpenRouter's provider spec for the shared smithy→SDK compiler. */
const openrouterSpec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,
  // Binary members (multipart file uploads) accept any byte container.
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

  // Sensitive strings (API keys, secrets): the schema member carries
  // T.SensitiveValue; the REST protocol delivers Redacted values and accepts
  // string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Binary downloads (audio speech, file/container/video content): the
  // response IS the bytes, delivered as a Uint8Array by the REST protocol.
  shapeOverride: ({ name, def }) => {
    if (
      def.type === "structure" &&
      Object.keys(def.members ?? {}).length === 1 &&
      def.members.body?.target === "smithy.api#Blob" &&
      RAW_RESPONSE_TRAIT in (def.members.body.traits ?? {})
    ) {
      return [
        `export type ${name} = Uint8Array;`,
        `export const ${name} = S.instanceOf(Uint8Array).pipe(T.BinaryResponse()) as any as S.Schema<${name}>;`,
      ];
    }
    return undefined;
  },

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names for OpenRouter), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  operationDecl: {
    contextType: "OpenRouterOpContext",
    commonErrorType: "OpenRouterOpError",
    commonErrorClasses: ["UnknownOpenRouterError"],
    protocol: "OpenRouterProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-openrouter)",

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
  description: "Generate the OpenRouter Effect SDK from the Smithy model",
  root: `${import.meta.dirname}/..`,
  // patches/ is consumed by scripts/convert.ts (OpenAPI and Smithy
  // pointers); generate only compiles the committed, patched model.
  patchesDir: false,
  spec: () => openrouterSpec,
});
