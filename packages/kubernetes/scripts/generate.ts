#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * Kubernetes Effect SDK.
 *
 * Input:  .generated-specs/<group>.json  (23 per-API-group models written by
 *         scripts/convert.ts)
 * Output: src/services/<group>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is Kubernetes' provider spec.
 * Kubernetes wire names are already camelCase, so no member renaming or wire
 * dictionaries appear here (the few `x-kubernetes-*` vendor-extension
 * properties are sanitized to `x_kubernetes_*` TS names with a jsonName wire
 * mapping by the converter). No operation paginates: the k8s
 * `metadata.continue` token predates the v0 pagination heuristics, and v0
 * emitted every list op as a plain operation — v1 mirrors that.
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";
/** A resource field added to a patch operation's input (see mergePatchFields). */
const MERGE_PATCH_TRAIT = "com.distilled.kubernetes#mergePatch";

/**
 * Patch operations take the resource's own fields, as create and replace
 * do: `patchAppsV1NamespacedStatefulSet({ namespace, name, contentType,
 * spec: { replicas: 3 } })`. The fields come from the operation's output (the
 * patched resource), all optional and typed `T.MergePatch<…>`, so a partial
 * object type-checks. patches/<group>/004-patch-body-and-type.patch.json
 * marks the patch operations (a `contentType` of type `PatchType`) and adds
 * the `patch` payload member a JSON patch array goes in. A path or query
 * parameter wins a name clash.
 */
const mergePatchFields = (model: { shapes: Record<string, any> }): string | void => {
  const shapes = model.shapes;
  let ops = 0;
  for (const def of Object.values(shapes)) {
    if (def?.type !== "operation") continue;
    const input = shapes[def.input?.target];
    const output = shapes[def.output?.target];
    if (!String(input?.members?.contentType?.target).endsWith("#PatchType")) continue;
    if (output?.type !== "structure") {
      throw new Error(`patch operation output ${def.output?.target} is not a structure`);
    }
    for (const [name, m] of Object.entries<any>(output.members ?? {})) {
      if (name in input.members) continue;
      const { "smithy.api#required": _required, ...traits } = m.traits ?? {};
      input.members[name] = { ...m, traits: { ...traits, [MERGE_PATCH_TRAIT]: {} } };
    }
    ops++;
  }
  return ops ? `added resource fields to ${ops} patch operations` : undefined;
};

/** Kubernetes' provider spec for the shared smithy→SDK compiler. */
const kubernetesSpec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for bare array/scalar response
      // bodies (e.g. the legacy log-file handlers return plain text); as the
      // response's only member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Sensitive strings (secret/password-named fields in volume sources etc.):
  // the schema member carries T.SensitiveValue; the REST protocol delivers
  // Redacted values and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m, tsRef) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : MERGE_PATCH_TRAIT in m.traits && !m.target.startsWith("smithy.api#")
        ? `T.MergePatch<${tsRef(m.target)}>`
        : undefined,

  // Swagger 2.0 has no oneOf/anyOf, so unions should not occur; kept as a
  // safe default (opaque schema + TS type union) should the spec grow any.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  operationDecl: {
    contextType: "KubernetesOpContext",
    commonErrorType: "KubernetesOpError",
    commonErrorClasses: ["UnknownKubernetesError"],
    protocol: "KubernetesProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/kubernetes swagger.json)",

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
  description: "Generate the Kubernetes Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // patches/ holds Swagger-document patches consumed by scripts/convert.ts;
  // there is no smithy-model patch chain.
  patchesDir: false,
  transformModel: (model) => mergePatchFields(model),
  spec: () => kubernetesSpec,
});
