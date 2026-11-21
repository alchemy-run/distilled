#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the separate Backend and Platform Smithy models into
 * the Clerk Effect SDK.
 *
 * Input:  .generated-specs/{clerk,platform}.json (converted in-process)
 * Output: src/services/{clerk,platform,index}.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is Clerk's provider spec.
 * Clerk keeps the wire's snake_case member names on the TS surface, so no
 * member renaming or wire dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import { JSON_PRELUDE, TS_JSON_PRELUDE } from "@distilled.cloud/dev/codegen/prelude";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Clerk's provider spec for the shared smithy→SDK compiler. */
const clerkSpec: SdkSpec = {
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

  // Sensitive strings (secret keys, tokens): the schema member carries
  // T.SensitiveValue; the REST protocol delivers Redacted values and accepts
  // string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names for Clerk), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  operationDecl: {
    contextType: "ClerkOpContext",
    commonErrorType: "ClerkOpError",
    commonErrorClasses: ["UnknownClerkError"],
    protocol: "ClerkProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-clerk)",

  // Sensitive member types reference Redacted; pull the import in when used.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";\n`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

const PLATFORM_SERVICE = "com.clerk.platform#ClerkPlatform";

/** Platform operations share Clerk's wire format but require separate credentials. */
const platformSpec: SdkSpec = {
  ...clerkSpec,
  // Multipart image uploads use core's existing binary form-part support.
  prelude: {
    ...JSON_PRELUDE,
    Blob: "S.Union([S.instanceOf(Blob), S.instanceOf(Uint8Array), S.instanceOf(ArrayBuffer)])",
  },
  tsPrelude: {
    ...TS_JSON_PRELUDE,
    Blob: "Blob | Uint8Array | ArrayBuffer",
  },
  operationDecl: {
    ...clerkSpec.operationDecl!,
    contextType: "ClerkPlatformOpContext",
    protocol: "ClerkPlatformProtocol",
  },
};

runGeneratorCli({
  description: "Generate the Clerk Effect SDK from the Backend and Platform models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // Convert finalizes the Smithy patches; generation only compiles the models.
  patchesDir: false,
  spec: (model) =>
    model.shapes?.[PLATFORM_SERVICE]?.type === "service" ? platformSpec : clerkSpec,
});
