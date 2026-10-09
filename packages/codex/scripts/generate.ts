#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the Smithy JSON model in .generated-specs into the Codex
 * app-server Effect SDK.
 *
 * Input:  .generated-specs/codex.json  (written by scripts/convert.ts)
 * Output: src/services/codex.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler lives in `@distilled.cloud/core/codegen`; the
 * JSON-RPC emission hooks (`jsonRpcEmission`) turn outbound requests and
 * notifications into `JsonRpc.request` / `JsonRpc.notify` callables, inbound
 * notifications into `JsonRpc.notifications` streams, and inbound requests
 * (approvals, user input) into the typed `InboundHandlers` table bound by
 * `handlers(impl)`.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { jsonRpcEmission } from "@distilled.cloud/core/codegen/jsonrpc";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** The protocol-wide error classes (src/errors.ts) every request can raise. */
const COMMON_ERRORS = [
  "CodexServerOverloaded",
  "CodexInvalidRequest",
  "CodexMethodNotFound",
  "CodexInvalidParams",
  "CodexInternalError",
];

const codexSpec = (_model: any): SdkSpec => {
  const emission = jsonRpcEmission({
    protocol: "CodexProtocol",
    connection: "CodexConnection",
    commonErrorType: "CodexOpError",
    commonErrorClasses: COMMON_ERRORS,
    sourceNote: ".generated-specs (specs/spec-mirror-codex)",
  });
  return {
    nullableTrait: NULLABLE_TRAIT,
    errorMatchersTrait: ERROR_MATCHERS_TRAIT,

    memberTraitPipes: {
      [SENSITIVE_TRAIT]: "T.SensitiveValue",
    },
    memberTsType: (m) =>
      SENSITIVE_TRAIT in m.traits
        ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
        : undefined,

    // Unions are TS type unions over an opaque schema that records each case's
    // member keys (T.UnionCases), so wire↔TS key mapping still reaches inside
    // whichever case a value turns out to be.
    unionStyle: "opaque-cases",

    ...emission,

    postProcess: (generated) => {
      const code = emission.postProcess(generated);
      // Sensitive member types reference Redacted; pull the import in when used.
      return code.includes("Redacted.Redacted<")
        ? code.replace(
            `import * as S from "@distilled.cloud/core/schema";\n`,
            `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
          )
        : code;
    },
  };
};

runGeneratorCli({
  description: "Generate the Codex app-server Effect SDK from the Smithy model",
  root: `${import.meta.dirname}/..`,
  // patches/codex/ holds Smithy-model patches applied by scripts/convert.ts
  // (finalizeConvert); generate compiles the already-patched model.
  patchesDir: false,
  spec: codexSpec,
});
