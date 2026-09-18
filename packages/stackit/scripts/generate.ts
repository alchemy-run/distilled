#!/usr/bin/env bun
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * STACKIT Effect SDK.
 *
 * Input:  .generated-specs/<service>.json  (one model per STACKIT product,
 *         written by scripts/convert.ts)
 * Output: src/services/<service>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is STACKIT's provider spec:
 * the `com.distilled.openapi` trait vocabulary (nullable members, bare-body
 * responses), a passthrough union style, the totalPages pagination profile,
 * and the protocol/retry/error names.
 *
 * STACKIT keeps its wire member names verbatim (camelCase — `projectId`,
 * `pageSize`, `totalPages`) on the TS surface, the spelling its own docs
 * and Go SDK use, so there is no memberName mapping. Module files are named
 * after the product slug (`postgres_flex.ts`) while the barrel exports them
 * camelCased (`Services.postgresFlex.listInstances`).
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `postgres_flex` → `postgresFlex` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** STACKIT's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
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

  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names for STACKIT), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // One pagination profile: STACKIT's page / totalPages envelope, traversed
  // by src/pagination.ts's paginateByTotalPages. The trait is stamped in
  // scripts/convert.ts — see the comment on `paginationFor` there.
  paginationProfiles: {
    page: {
      strategy: "paginateByTotalPages",
      itemsFallback: "",
    },
  },

  sourceNote: ".generated-specs (specs/spec-mirror-stackit)",

  operationDecl: {
    contextType: "StackitOpContext",
    commonErrorType: "StackitOpError",
    commonErrorClasses: ["UnknownStackitError"],
    protocol: "StackitProtocol",
    retry: "Retry.Retry",
  },

  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";\n`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the STACKIT Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  patchesDir: false,
  barrelExportName: camel,
  continueOnModelError: true,
  spec: () => spec,
});
