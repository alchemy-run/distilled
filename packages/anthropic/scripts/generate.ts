#!/usr/bin/env -S node --conditions=bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the Claude
 * Platform (Anthropic) Effect SDK.
 *
 * Input:  .generated-specs/<area>.json  (written by scripts/convert.ts)
 * Output: src/services/<area>.ts  +  src/services/index.ts
 *
 * Anthropic keeps its wire member names verbatim (snake_case — `max_tokens`,
 * `after_id`, `has_more`) on the TS surface, the spelling its docs use, so
 * there is no memberName mapping. Module files are named after the area slug
 * (`beta_sessions.ts`) while the barrel exports them camelCased
 * (`betaSessions.createSession`). The RFC-6902 patches in patches/<area>/
 * apply to the Smithy models via finalizeConvert in scripts/convert.ts —
 * never here.
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

/** `beta_memory_stores` → `betaMemoryStores` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,
  // `format: binary` members (multipart file parts) take bytes; the REST
  // protocol sends each as a binary form part.
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

  // Sensitive strings (API keys, tokens, signing secrets): Redacted on the
  // way out, `string | Redacted` accepted on the way in.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // A raw `Blob` response (file and skill downloads, batch results — see
  // patches/) is returned as the response bytes.
  shapeOverride: ({ name, def }) =>
    def.type === "structure" &&
    Object.keys(def.members ?? {}).length === 1 &&
    def.members.body?.target === "smithy.api#Blob" &&
    RAW_RESPONSE_TRAIT in (def.members.body.traits ?? {})
      ? [
          `export type ${name} = Uint8Array;`,
          `export const ${name} = /*@__PURE__*/ S.instanceOf(Uint8Array).pipe(T.BinaryResponse()) as S.Schema<${name}>;`,
        ]
      : undefined,

  // The spec's `oneOf`s (content blocks, tools, events) are discriminated
  // by a `type` member whose wire name is the TS name, so the TS type is
  // the case union and the schema stays opaque.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // Two pagination profiles, stamped in scripts/convert.ts (see
  // `paginationFor` there): `after_id` → `last_id` while `has_more` (relay),
  // and `page` → `next_page` until it is null (cursor).
  paginationProfiles: {
    relay: {
      strategy: "paginateRelay",
      itemsFallback: "data",
    },
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "data",
    },
  },
  paginationProfileFor: (trait) => trait.mode,

  sourceNote: ".generated-specs (specs/spec-mirror-anthropic/specs/openapi.json)",

  operationDecl: {
    contextType: "AnthropicOpContext",
    commonErrorType: "AnthropicOpError",
    // No per-operation error classes: every failure shares one envelope,
    // so every status rides AnthropicOpError and the protocol picks the class.
    commonErrorClasses: ["UnknownAnthropicError"],
    protocol: "AnthropicProtocol",
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
  description: "Generate the Claude Platform (Anthropic) Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});
