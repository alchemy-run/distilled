#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the hand-authored Smithy model into the Effect ACME SDK.
 *
 * Input:  manual-specs/acme.json — written by hand from RFC 8555 (no vendor spec
 *         exists for a protocol), typed errors included, so there is no
 *         conversion step and no patch chain.
 * Output: src/services/acme.ts  +  src/services/index.ts
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
  errors: {
    // The protocol always fills code/message/type; `detail` is optional in a
    // problem document (RFC 7807 §3.1), as the model's unrequired member says.
    field: (name, target) =>
      `${JSON.stringify(name)}: ${
        name === "retryAfter"
          ? "S.optional(S.Duration)"
          : name === "detail"
            ? "S.optional(S.String)"
            : target === "smithy.api#Integer"
              ? "S.Number"
              : "S.String"
      },`,
  },
  sourceNote: "manual-specs/acme.json (hand-authored Smithy, RFC 8555)",
  operationDecl: {
    contextType: "AcmeOpContext",
    commonErrorType: "AcmeOpError",
    commonErrorClasses: [],
    protocol: "AcmeProtocol",
    retry: "Retry.Retry",
  },
  postProcess: (code) => code.replace(/import \{\s*\} from "\.\.\/errors\.ts";\n/, ""),
};

runGeneratorCli({
  description: "Generate the ACME Effect SDK from the Smithy model",
  root: `${import.meta.dirname}/..`,
  smithyDir: "manual-specs",
  patchesDir: false,
  spec: () => spec,
});
