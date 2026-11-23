#!/usr/bin/env -S node --conditions=bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * Browserbase Effect SDK.
 *
 * Input:  .generated-specs/browserbase.json  (written by scripts/convert.ts)
 * Output: src/services/browserbase.ts  +  src/services/index.ts
 *
 * Browserbase is API-key REST with cursor and offset pagination and
 * multipart uploads. The RFC-6902 patches in patches/*.json apply to the
 * Smithy model via finalizeConvert in scripts/convert.ts — never here.
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

  // `format: binary` members (multipart file parts) take the byte forms the
  // REST protocol's multipart encoder appends as files.
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

  // Sensitive strings (webhook signing secrets, session signing keys): Redacted
  // on the way out, `string | Redacted` accepted on the way in.
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
      strategy: "paginateCursor",
      itemsFallback: "",
    },
    offset: {
      strategy: "paginateOffset",
      // `total` ends the traversal; a short or empty page also does.
      requires: () => ["inputToken", "outputToken", "items"],
      itemsFallback: "",
    },
  },
  // `patches/pagination.json` stamps `mode: "cursor"` on cursor lists and no
  // mode on offset lists (core has no offset mode).
  paginationProfileFor: (trait) => (trait.mode === "cursor" ? "cursor" : "offset"),

  sourceNote: ".generated-specs (specs/spec-mirror-browserbase/specs/openapi.v1.yaml)",

  operationDecl: {
    contextType: "BrowserbaseOpContext",
    commonErrorType: "BrowserbaseOpError",
    serviceErrors: "BrowserbaseServiceErrors",
    protocol: "BrowserbaseProtocol",
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
  description: "Generate the Browserbase Effect SDK from the Smithy model",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  spec: () => spec,
});
