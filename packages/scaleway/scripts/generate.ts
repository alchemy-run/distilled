#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * Scaleway Effect SDK.
 *
 * Input:  .generated-specs/<slug>.json  (one model per Scaleway API service
 *         and version, written by scripts/convert.ts)
 * Output: src/services/<slug>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Scaleway's provider spec:
 * the `com.distilled.openapi` trait vocabulary (nullable members, bare-body
 * responses), a passthrough union style, the two pagination profiles, and
 * the protocol/retry/error names.
 *
 * Scaleway keeps its wire member names verbatim (snake_case — `project_id`,
 * `commercial_type`, `page_size`) on the TS surface, the spelling its API
 * reference, CLI and Terraform provider use, so there is no memberName
 * mapping. Module files are named after the mirror slug (`instance_v1.ts`,
 * `lb_zoned_v1.ts`) while the barrel exports them camelCased
 * (`instanceV1.listServers`, `lbZonedV1.listLbs`).
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `lb_zoned_v1` → `lbZonedV1` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** Scaleway's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
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

  // Secret keys, passwords and tokens the API answers with (IAM
  // `secret_key`, database passwords, registry/kubeconfig tokens):
  // Redacted on the way out, `string | Redacted` accepted on the way in
  // (the protocol unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Scaleway's `oneOf` members surface as TS type unions over an opaque
  // schema — wire names ARE the TS names, so the protocol passes union
  // content through verbatim and no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // Two pagination profiles, stamped in scripts/convert.ts (see
  // `paginationFor` there):
  //   page  — `page` / `page_size` in, `total_count` out, traversed by
  //           src/pagination.ts's paginateByTotalCount.
  //   token — `page_token` in, `next_page_token` out, core's paginateToken.
  paginationProfiles: {
    page: {
      strategy: "paginateByTotalCount",
      itemsFallback: "",
    },
    token: {
      strategy: "paginateToken",
      itemsFallback: "",
    },
  },
  paginationProfileFor: (trait) => (trait?.mode === "token" ? "token" : "page"),

  shapeOverride: ({ name, def }) => {
    // `…Raw` file downloads (scripts/convert.ts `addRawDownload`): the
    // output IS the response body's bytes.
    if (
      def.type === "structure" &&
      Object.keys(def.members ?? {}).length === 1 &&
      def.members.body?.target === "smithy.api#Blob" &&
      RAW_RESPONSE_TRAIT in (def.members.body.traits ?? {})
    ) {
      return [
        `export type ${name} = Uint8Array;`,
        `export const ${name} = /*@__PURE__*/ S.instanceOf(Uint8Array).pipe(T.BinaryResponse()) as any as S.Schema<${name}>;\n`,
      ];
    }
    // Maps of secrets (Serverless Containers' `secret_environment_variables`
    // on create/update): each value accepts `Redacted`.
    if (def.type === "map" && SENSITIVE_TRAIT in (def.traits ?? {})) {
      return [
        `export type ${name} = { [key: string]: string | Redacted.Redacted<string> | undefined };`,
        `export const ${name} = /*@__PURE__*/ S.Record(S.String, S.String.pipe(T.SensitiveValue({}))) as any as S.Schema<${name}>;\n`,
      ];
    }
    return undefined;
  },

  sourceNote: ".generated-specs (specs/spec-mirror-scaleway)",

  operationDecl: {
    contextType: "ScalewayOpContext",
    commonErrorType: "ScalewayOpError",
    commonErrorClasses: ["UnknownScalewayError"],
    protocol: "ScalewayProtocol",
    retry: "Retry.Retry",
  },

  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";\n`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the Scaleway Effect SDK from the Smithy models",
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});
