#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * Freestyle Effect SDK.
 *
 * Input:  .generated-specs/<tag>.json  (one model per Freestyle tag, written
 *         by scripts/convert.ts)
 * Output: src/services/<tag>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Freestyle's provider spec.
 * Freestyle keeps the wire's camelCase member names on the TS surface, so no
 * member renaming or wire dictionaries appear here.
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `background_requests` → `backgroundRequests` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** Freestyle's provider spec for the shared smithy→SDK compiler. */
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

  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // One pagination profile: Freestyle's offset/limit lists (inputToken
  // `offset`, items the collection key, `totalCount`/`total` riding in
  // `outputToken`), traversed by src/pagination.ts's paginateOffset. The
  // trait is stamped in scripts/convert.ts — see `paginationFor` there.
  paginationProfiles: {
    offset: {
      strategy: "paginateOffset",
      itemsFallback: "",
    },
  },

  sourceNote:
    ".generated-specs (specs/spec-mirror-freestyle/specs/openapi.json)",

  operationDecl: {
    contextType: "FreestyleOpContext",
    commonErrorType: "FreestyleOpError",
    commonErrorClasses: ["UnknownFreestyleError"],
    protocol: "FreestyleProtocol",
    retry: "Retry.Retry",
  },

  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the Freestyle Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});
