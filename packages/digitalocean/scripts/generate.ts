#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * DigitalOcean Effect SDK.
 *
 * Input:  .generated-specs/digitalocean.json  (written by scripts/convert.ts)
 * Output: src/services/digitalocean.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is DigitalOcean's provider spec.
 * DigitalOcean keeps the wire's snake_case member names on the TS surface
 * (the spelling its own docs, CLI and Terraform provider use), so no member
 * renaming or wire dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

// Shared by the main API and Functions (which swaps the context and protocol).
const operationDecl = {
  contextType: "DigitalOceanOpContext",
  commonErrorType: "DigitalOceanOpError",
  commonErrorClasses: ["UnknownDigitalOceanError"],
  protocol: "DigitalOceanProtocol",
  retry: "Retry.Retry",
};

/** DigitalOcean's provider spec for the shared smithy→SDK compiler. */
const digitaloceanSpec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  // A response whose sole member is a raw Blob body is the bytes themselves
  // (audio from Serverless Inference's speech endpoint).
  shapeOverride: ({ name, def }) => {
    if (
      def.type === "structure" &&
      Object.keys(def.members ?? {}).length === 1 &&
      def.members.body?.target === "smithy.api#Blob" &&
      RAW_RESPONSE_TRAIT in (def.members.body.traits ?? {})
    ) {
      return [
        `export type ${name} = Uint8Array;`,
        `export const ${name} = S.instanceOf(Uint8Array).pipe(T.BinaryResponse()) as S.Schema<${name}>;`,
      ];
    }
  },

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

  // Sensitive strings (tokens, passwords, API keys): the schema member
  // carries T.SensitiveValue; the REST protocol delivers Redacted values
  // and accepts string | Redacted on input.
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
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // Pagination is stamped on the Smithy model by patches/*.patch.json
  // (`smithy.api#paginated` ops under `/shapes`, applied after conversion) —
  // the OpenAPI spec carries no pagination metadata. Page-number ops
  // (`page` / `per_page` in, `links.pages.next` URL out) select the `page`
  // profile; a cursor-stamped op would select `cursor`.
  paginationProfileFor: (trait) => (trait.mode === "page" ? "page" : "cursor"),
  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "items",
    },
    page: {
      strategy: "paginatePageNumber",
      itemsFallback: "",
    },
  },

  operationDecl,

  sourceNote: ".generated-specs (specs/spec-mirror-digitalocean/specs/openapi.json)",

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
  description: "Generate the DigitalOcean Effect SDK from the Smithy model",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // patches/ holds OpenAPI-document patches consumed by scripts/convert.ts;
  // there is no smithy-model patch chain.
  patchesDir: false,
  // The OpenWhisk API (specs/openwhisk.json) is served by each Functions
  // namespace's own host, signed with the namespace key.
  spec: (model) =>
    Object.keys((model as { shapes?: object }).shapes ?? {}).some((id) =>
      id.startsWith("com.digitalocean.functions#"),
    )
      ? {
          ...digitaloceanSpec,
          operationDecl: {
            ...operationDecl,
            contextType: "FunctionsOpContext",
            protocol: "FunctionsProtocol",
          },
          sourceNote: ".generated-specs (specs/spec-mirror-digitalocean/specs/openwhisk.json)",
        }
      : digitaloceanSpec,
});
