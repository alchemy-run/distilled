#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the S2
 * Effect SDK.
 *
 * Input:  .generated-specs/<tag>.json  (one model per S2 tag, written by
 *         scripts/convert.ts)
 * Output: src/services/<tag>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is S2's provider spec: the
 * `com.distilled.openapi` trait vocabulary (nullable members, bare-body
 * responses), a passthrough union style, the start-after pagination profile,
 * and the protocol/retry/error names.
 *
 * S2 keeps its wire member names verbatim (snake_case — `start_after`,
 * `has_more`, `access_token`) on the TS surface, the spelling its own docs
 * and SDKs use, so there is no memberName mapping. Module files are named
 * after the tag slug (`access_tokens.ts`) while the barrel exports them
 * camelCased (`accessTokens.listAccessTokens`).
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `access_tokens` → `accessTokens` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** S2's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  // Wire names ARE the TS surface (snake_case already) — no renaming.
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

  // Sensitive strings — the `access_token` an issue call answers with:
  // Redacted on the way out, `string | Redacted` accepted on the way in (the
  // REST protocol unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // S2's `oneOf` unions — the Metric variants (discriminated by `type`),
  // RetentionPolicy (`infinite` vs `max_age`), the AppendConditionFailed
  // arms — are decoded passthrough: the TS type is the case union, the
  // schema stays opaque. The API returns one arm's plain value, and wire
  // names equal the TS names, so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // One pagination profile: S2's start-after mode (inputToken `start_after`,
  // items the collection key, `has_more` gating, the item's identity field
  // riding in the trait's `outputToken`), traversed by src/pagination.ts's
  // paginateStartAfter. The trait is stamped in scripts/convert.ts — see the
  // comment on `paginationFor` there.
  paginationProfiles: {
    startAfter: {
      strategy: "paginateStartAfter",
      itemsFallback: "",
    },
  },

  sourceNote: ".generated-specs (specs/spec-mirror-s2/specs/openapi.json)",

  operationDecl: {
    contextType: "S2OpContext",
    commonErrorType: "S2OpError",
    // No per-operation error classes: the spec types every failure as the
    // shared ErrorInfo envelope, so every status rides S2OpError and the
    // protocol picks the class (see src/errors.ts).
    commonErrorClasses: ["UnknownS2Error"],
    protocol: "S2Protocol",
    retry: "Retry.Retry",
  },

  // `effect/Redacted` is only referenced by modules with sensitive members —
  // import it exactly there.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the S2 Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  // The RFC-6902 chain in patches/<service>/<op>.json applies to the Smithy
  // models via finalizeConvert in scripts/convert.ts — never here.
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});
