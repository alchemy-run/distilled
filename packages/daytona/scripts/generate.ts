#!/usr/bin/env bun
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * Daytona Effect SDK.
 *
 * Input:  .generated-specs/<tag>.json  (one model per tag, written by
 *         scripts/convert.ts)
 * Output: src/services/<tag>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Daytona's provider spec:
 * the `com.distilled.openapi` trait vocabulary (nullable members, bare-body
 * responses), a passthrough union style, the page/cursor pagination
 * profiles, and the protocol/retry/error names.
 *
 * Daytona keeps its wire member names verbatim (camelCase on the platform
 * API, mixed on toolbox) on the TS surface, so there is no memberName
 * mapping. Module files are named after the tag slug (`api_keys.ts`) while
 * the barrel exports them camelCased (`Services.apiKeys.listApiKeys`).
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `api_keys` → `apiKeys` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** Daytona's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  // Wire names ARE the TS surface — no renaming.
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

  // Sensitive strings (API key values): Redacted on the way out,
  // `string | Redacted` accepted on the way in (the REST protocol unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // One pagination profile: audit logs page by token (`nextToken` in and
  // out, items under `items`). The converter stamps `smithy.api#paginated`
  // when it recognises that shape; with a single profile the compiler
  // applies it without a selector.
  paginationProfiles: {
    token: {
      strategy: "paginateToken",
      itemsFallback: "items",
    },
  },

  sourceNote:
    ".generated-specs (specs/spec-mirror-daytona/specs/{openapi,toolbox-openapi,analytics-openapi}.json)",

  operationDecl: {
    contextType: "DaytonaOpContext",
    commonErrorType: "DaytonaOpError",
    // No per-operation error classes: the specs type failures only as a
    // status list against a shared `{ message }` envelope, so every status
    // rides DaytonaOpError and the protocol picks the class.
    commonErrorClasses: ["UnknownDaytonaError"],
    protocol: "DaytonaProtocol",
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
  description: "Generate the Daytona Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});
