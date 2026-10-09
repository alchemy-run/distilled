#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the Smithy JSON model in .generated-specs into the ACP
 * Effect SDK.
 *
 * Input:  .generated-specs/acp.json  (written by scripts/convert.ts)
 * Output: src/services/acp.ts  +  src/services/index.ts
 *
 * ACP is JSON-RPC 2.0, so operations are emitted by core's JSON-RPC
 * emission hooks (`jsonRpcEmission`): outbound requests/notifications become
 * `JsonRpc.request` / `JsonRpc.notify` callables, inbound notifications
 * become `JsonRpc.notifications` streams, and every inbound method (the
 * agent calling back into the client: permissions, fs, terminals,
 * elicitation) lands in the generated `inbound` table + `InboundHandlers`
 * interface + `handlers(impl)` binder. ACP's wire names are already
 * camelCase, so no member renaming happens here.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { jsonRpcEmission } from "@distilled.cloud/core/codegen/jsonrpc";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

const emission = jsonRpcEmission({
  protocol: "AcpProtocol",
  connection: "AcpConnection",
  commonErrorType: "AcpOpError",
  commonErrorClasses: [
    "UnknownAcpError",
    "AcpAuthRequired",
    "AcpResourceNotFound",
    "AcpRequestCancelled",
    "AcpInvalidParams",
    "AcpMethodNotFound",
    "AcpInternalError",
  ],
  sourceNote: ".generated-specs (specs/spec-mirror-acp)",
});

const acpSpec = (): SdkSpec => ({
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // ACP unions are discriminated by a literal member (`type`, `sessionUpdate`,
  // `outcome`, …) whose wire value is also the TS value. Validate against the
  // case schemas directly (strict mode); lenient mode passes them through.
  unionStyle: "untagged",

  sourceNote: ".generated-specs (specs/spec-mirror-acp)",

  ...emission,

  postProcess: (generated) => {
    const code = emission.postProcess(generated);
    return code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";\n`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code;
  },
});

runGeneratorCli({
  description: "Generate the ACP Effect SDK from the Smithy model",
  root: `${import.meta.dirname}/..`,
  // Smithy patches in patches/acp/ are applied by scripts/convert.ts
  // (finalizeConvert); generate compiles the already-patched model.
  patchesDir: false,
  spec: acpSpec,
});
