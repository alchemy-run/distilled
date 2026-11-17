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

const spec: SdkSpec = {
  // An operation shape carries a trailing `_` when an object owns its name
  // (see convert.ts); the export is the action's name either way.
  opExportName: (name) => lowerFirst(name.replace(/_+$/, "")),
  nullableTrait: NULLABLE_TRAIT,
  sourceNote:
    ".generated-specs (specs/spec-mirror-tencentcloud/specs/<product>/<version>/api.json)",

  structPipes: ({ opTraits }) => {
    const action = opTraits?.[ACTION_TRAIT];
    return action ? [`T.Action(${JSON.stringify(action)})`] : [];
  },

  operationDecl: {
    contextType: "TencentCloudOpContext",
    commonErrorType: "TencentCloudOpError",
    // No per-operation error classes: every failure is a string code in the
    // response envelope, and TencentCloudProtocol picks the class from the
    // documented common codes (see src/errors.ts).
    commonErrorClasses: ["UnknownTencentCloudError"],
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
