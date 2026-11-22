#!/usr/bin/env -S node --conditions=bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * Sproutboat Effect SDK.
 *
 * Input:  .generated-specs/sproutboat.json  (written by scripts/convert.ts)
 * Output: src/services/sproutboat.ts  +  src/services/index.ts
 *
 * Sproutboat is bearer-token REST JSON with byte uploads (sources, assets,
 * R2 objects) and one byte download (an R2 object). No list has a cursor.
 * The RFC-6902 patches in patches/*.json apply to the Smithy model via
 * finalizeConvert in scripts/convert.ts — never here.
 */
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";
import { JSON_PRELUDE, TS_JSON_PRELUDE } from "@distilled.cloud/dev/codegen/prelude";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  // Upload bodies (`format: binary`) take the byte forms the REST protocol
  // sends verbatim.
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
      // bodies — as a response's sole member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Sensitive strings (secret values): Redacted on the way out,
  // `string | Redacted` accepted on the way in.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // A download's whole response is its bytes.
  shapeOverride: ({ name, def }) =>
    def.type === "structure" &&
    Object.keys(def.members ?? {}).length === 1 &&
    def.members.body?.target === "smithy.api#Blob" &&
    RAW_RESPONSE_TRAIT in (def.members.body.traits ?? {})
      ? [
          `export type ${name} = Uint8Array;`,
          `export const ${name} = S.instanceOf(Uint8Array).pipe(T.BinaryResponse()) as S.Codec<${name}>;`,
        ]
      : undefined,

  // A `oneOf` in the spec is a plain value alternative — the TS type is the
  // case union, the schema stays opaque.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  sourceNote: ".generated-specs (specs/spec-mirror-sproutboat/specs/openapi.yaml)",

  operationDecl: {
    contextType: "SproutboatOpContext",
    commonErrorType: "SproutboatOpError",
    serviceErrors: "SproutboatServiceErrors",
    protocol: "SproutboatProtocol",
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
  description: "Generate the Sproutboat Effect SDK from the Smithy model",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  spec: () => spec,
});
