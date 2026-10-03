#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the Clerk
 * Effect SDK.
 *
 * Input:  .generated-specs/clerk.json     (Backend API)
 *         .generated-specs/platform.json  (Platform API)
 *         (both written by scripts/convert.ts)
 * Output: src/services/clerk.ts  +  src/services/platform.ts  +
 *         src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Clerk's provider spec.
 * Clerk keeps the wire's snake_case member names on the TS surface, so no
 * member renaming or wire dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

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

  // Clerk's error codes are strings (`resource_not_found`), and the
  // protocols forward them (`forwardStringCodes`), so error shapes with no
  // members declare `code` as number | string rather than the number default.
  errors: {
    defaultFields: (prelude) => [
      `  code: S.Union([S.Number, S.String]),`,
      `  message: ${prelude.String},`,
    ],
  },

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
          `import * as S from "@distilled.cloud/core/schema";\n`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

/**
 * The Platform API model (`com.clerk.platform`, written by convert.ts as
 * `.generated-specs/platform.json`). Every one of its operations runs on the
 * Platform protocol and requires Platform credentials, so the whole module
 * gets its own operation declaration rather than per-operation overrides —
 * the default header then imports exactly the Platform names.
 */
const PLATFORM_SERVICE = "com.clerk.platform#ClerkPlatform";

/** Clerk Platform API spec: the Backend spec on the Platform protocol. */
const platformSpec: SdkSpec = {
  ...clerkSpec,
  operationDecl: {
    ...clerkSpec.operationDecl!,
    contextType: "ClerkPlatformOpContext",
    protocol: "ClerkPlatformProtocol",
  },
};

const isPlatformModel = (model: any): boolean =>
  model.shapes?.[PLATFORM_SERVICE]?.type === "service";

runGeneratorCli({
  description: "Generate the Clerk Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  // patches/ holds OpenAPI-document patches consumed by scripts/convert.ts;
  // there is no smithy-model patch chain.
  patchesDir: false,
  spec: (model) => (isPlatformModel(model) ? platformSpec : clerkSpec),
});
