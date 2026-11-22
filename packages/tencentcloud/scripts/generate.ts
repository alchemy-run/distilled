#!/usr/bin/env -S node --conditions=bun
/**
 * generate — run scripts/convert.ts in memory and compile its Smithy models
 * into the Tencent Cloud Effect SDK.
 *
 * Input:  the per-product models convert.ts converts (in memory)
 * Output: src/services/<product>.ts + src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is Tencent Cloud's provider
 * spec: the `com.tencentcloud#action` operation trait emitted as
 * `T.Action({ service, version, action })` on each input (read by
 * TencentCloudProtocol to build the `X-TC-*` headers and sign the call),
 * nullable members, and the protocol/retry/error names.
 *
 * Member names stay as the wire spells them (`InstanceIds`, `Limit`), the
 * spelling Tencent's own docs and SDKs use, so there is no memberName
 * mapping.
 */
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import { lowerFirst } from "@distilled.cloud/dev/codegen/naming";
import { NULLABLE_TRAIT } from "@distilled.cloud/dev/codegen/openapi";

const ACTION_TRAIT = "com.tencentcloud#action";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

const spec: SdkSpec = {
  // An operation shape carries a trailing `_` when an object owns its name
  // (see convert.ts); the export is the action's name either way.
  opExportName: (name) => lowerFirst(name.replace(/_+$/, "")),
  nullableTrait: NULLABLE_TRAIT,
  sourceNote:
    ".generated-specs (specs/spec-mirror-tencentcloud/specs/<product>/<version>/api.json)",

  // Sensitive strings (passwords, keys, tokens): the schema member carries
  // T.SensitiveValue; the protocol delivers Redacted values and accepts
  // string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,
  // Sensitive member types reference Redacted; pull the import in when used.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";\n`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,

  structPipes: ({ opTraits }) => {
    const action = opTraits?.[ACTION_TRAIT];
    return action ? [`T.Action(${JSON.stringify(action)})`] : [];
  },

  operationDecl: {
    contextType: "TencentCloudOpContext",
    commonErrorType: "TencentCloudOpError",
    serviceErrors: "TencentCloudServiceErrors",
    protocol: "TencentCloudProtocol",
    retry: "Retry.Retry",
  },
};

runGeneratorCli({
  description: "Generate the Tencent Cloud Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  spec: () => spec,
});
