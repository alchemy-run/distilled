#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * Starburst Galaxy Effect SDK.
 *
 * Input:  .generated-specs/<tag>.json  (written by scripts/convert.ts)
 * Output: src/services/<tag>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is Galaxy's provider spec.
 * Galaxy's wire member names are already camelCase, so no member renaming
 * or wire dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `column_mask` → `columnMask` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** Galaxy's provider spec for the shared smithy→SDK compiler. */
const starburstGalaxySpec: SdkSpec = {
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

  // Sensitive strings (catalog passwords, cloud secret keys, service account
  // passwords): the schema member carries T.SensitiveValue; the REST
  // protocol delivers Redacted values and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions are Galaxy's discriminated hierarchies, which the shared
  // converter rewrites into a `oneOf` of subtypes with the discriminator
  // pinned to its mapping key. Each arm is a real schema, so validation picks the arm
  // the discriminator names and the protocol wraps the sensitive members of
  // every arm (a SASL `password`, a `secretAccessKey`) in Redacted.
  unionStyle: "untagged",

  // List operations page by token: `pageToken` in, `nextPageToken` out
  // (`""` on the last page), items under `result`. convert stamps them.
  paginationProfiles: {
    token: {
      strategy: "paginateToken",
      itemsFallback: "result",
    },
  },

  operationDecl: {
    contextType: "StarburstGalaxyOpContext",
    commonErrorType: "StarburstGalaxyOpError",
    commonErrorClasses: ["UnknownStarburstGalaxyError"],
    protocol: "StarburstGalaxyProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-starburst-galaxy/specs/{v1,v2}.json)",

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
  description: "Generate the Starburst Galaxy Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // Patches are Smithy ops applied in convert (finalizeConvert); generate
  // compiles the already-patched models.
  patchesDir: false,
  barrelExportName: camel,
  spec: () => starburstGalaxySpec,
});
