#!/usr/bin/env bun
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the hand-authored Smithy model into the Effect ZeroSSL SDK.
 *
 * Input:  manual-specs/zerossl.json — written by hand from ZeroSSL's REST docs,
 *         typed errors included; no conversion step, no patch chain.
 * Output: src/services/zerossl.ts  +  src/services/index.ts
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,
  extraBindings: [
    {
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],
  memberTraitPipes: {
    "smithy.api#sensitive": "T.SensitiveValue",
  },
  memberTsType: (member, tsRef) =>
    "smithy.api#sensitive" in member.traits
      ? `import("effect/Redacted").Redacted<${tsRef(member.target)}>`
      : undefined,
  errors: {
    field: (name, target) =>
      `${JSON.stringify(name)}: ${
        name === "retryAfter"
          ? "S.optional(S.Duration)"
          : target === "smithy.api#Integer"
            ? "S.Number"
            : "S.String"
      },`,
  },
  sourceNote: "manual-specs/zerossl.json (hand-authored Smithy)",
  operationDecl: {
    contextType: "ZeroSslOpContext",
    commonErrorType: "ZeroSslOpError",
    commonErrorClasses: [],
    protocol: "ZeroSslProtocol",
    retry: "Retry.Retry",
  },
  postProcess: (code) => code.replace(/import \{\s*\} from "\.\.\/errors\.ts";\n/, ""),
};

runGeneratorCli({
  description: "Generate the ZeroSSL Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  smithyDir: "manual-specs",
  patchesDir: false,
  spec: () => spec,
});
