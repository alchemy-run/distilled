#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the HydraDB Smithy model into the HydraDB Effect SDK.
 *
 * Input:  .generated-specs/hydradb.json (converted in-process)
 * Output: src/services/hydradb.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is HydraDB's provider spec.
 * HydraDB keeps the wire's snake_case member names on the TS surface (the
 * names its docs, curl examples and webhook payloads use), so no member
 * renaming or wire dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";
import { JSON_PRELUDE, TS_JSON_PRELUDE } from "@distilled.cloud/dev/codegen/prelude";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** HydraDB's provider spec for the shared smithy→SDK compiler. */
const hydraDbSpec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  // `documents` on ingestContext are `format: binary` multipart file parts;
  // the REST protocol sends a File/Blob as a binary form part.
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
      // bodies; as the response's only member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Sensitive strings (webhook signing secrets, connector credentials):
  // the schema member carries T.SensitiveValue; the REST protocol delivers
  // Redacted values and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // `oneOf`/`anyOf` unions get a schema per arm, validated as written.
  unionStyle: "untagged",

  operationDecl: {
    contextType: "HydraDBOpContext",
    commonErrorType: "HydraDBOpError",
    // No per-status error classes beyond 413/415: every failure is the shared
    // envelope, so every status rides HydraDBOpError and the protocol picks
    // the class (see src/errors.ts).
    commonErrorClasses: ["UnknownHydraDBError"],
    protocol: "HydraDBProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-hydradb/specs/openapi.json)",

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
  description: "Generate the HydraDB Effect SDK from the Smithy model",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // Convert finalizes the Smithy patches; generation only compiles the model.
  patchesDir: false,
  spec: () => hydraDbSpec,
});
