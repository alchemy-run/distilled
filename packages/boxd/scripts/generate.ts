#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON model in .generated-specs into the boxd
 * Effect SDK.
 *
 * Input:  .generated-specs/boxd.json  (written by scripts/convert.ts)
 * Output: src/services/boxd.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is boxd's provider spec.
 * Wire names are proto3 JSON camelCase, which convert.ts already uses as
 * Smithy member names, so no renaming.
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/**
 * Error matchers on patched error shapes. The gRPC protocol hands the REST
 * decoder `{ code, status, message }` for a non-zero `grpc-status` (`{ code:
 * 5, status: "NOT_FOUND", ... }`, HTTP 404), so matchers key on the numeric
 * gRPC `code` and the `message`.
 */
const ERROR_MATCHERS_TRAIT = "com.boxd.protocols#errorMatchers";

const spec: SdkSpec = {
  sourceNote: ".generated-specs (boxd api.proto → smithy)",

  errorMatchersTrait: ERROR_MATCHERS_TRAIT,
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // `smithy.api#paginated` comes from patches (proto has no pagination).
  paginationProfiles: { grpc: { itemsFallback: "items" } },

  // BoxdProtocol is core's gRPC protocol, which implements `stream`.
  streams: true,

  operationDecl: {
    contextType: "BoxdOpContext",
    commonErrorType: "BoxdOpError",
    commonErrorClasses: ["UnknownBoxdError"],
    protocol: "BoxdProtocol",
    retry: "Retry.Retry",
  },

  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";\n`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the boxd Effect SDK from the Smithy model",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  spec: () => spec,
});
