#!/usr/bin/env -S node --conditions=bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the npm
 * registry Effect SDK.
 *
 * Input:  .generated-specs/<area>.json  (written by scripts/convert.ts)
 * Output: src/services/<area>.ts  +  src/services/index.ts
 *
 * The npm registry API is plain bearer-REST JSON. Module files are named
 * after the area slug (`package_version_status.ts`) while the barrel exports
 * them camelCased (`packageVersionStatus.getPackageVersionStatus`). The
 * RFC-6902 patches in patches/<area>/*.json apply to the Smithy models via
 * finalizeConvert in scripts/convert.ts — never here.
 */
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";
import { JSON_PRELUDE, TS_JSON_PRELUDE } from "@distilled.cloud/dev/codegen/prelude";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,
  // `binaryTypes` in convert turns `format: binary` into blobs; they are
  // bytes on the TS surface.
  prelude: { ...JSON_PRELUDE, Blob: "S.instanceOf(Uint8Array)" },
  tsPrelude: { ...TS_JSON_PRELUDE, Blob: "Uint8Array" },

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for bare array/scalar response
      // bodies — as a response's sole member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // A bare binary response body (`application/octet-stream`) is the
  // response itself, read as bytes by the REST protocol.
  shapeOverride: ({ name, def }) =>
    def.type === "structure" &&
    Object.keys(def.members ?? {}).length === 1 &&
    def.members.body?.target === "smithy.api#Blob" &&
    RAW_RESPONSE_TRAIT in (def.members.body.traits ?? {})
      ? [
          `export type ${name} = Uint8Array;`,
          `export const ${name} = /*@__PURE__*/ S.instanceOf(Uint8Array).pipe(T.BinaryResponse()) as S.Schema<${name}>;`,
        ]
      : undefined,

  // Sensitive strings (the tokens `createToken` and `exchangeOidcToken`
  // answer with): Redacted on the way out, `string | Redacted` accepted on
  // the way in.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // The spec's `oneOf`s (a trusted publisher's provider config) are plain
  // value alternatives — the TS type is the case union, the schema stays
  // opaque.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  sourceNote: ".generated-specs (specs/spec-mirror-npm/specs/api)",

  operationDecl: {
    contextType: "NpmOpContext",
    commonErrorType: "NpmOpError",
    commonErrorClasses: ["UnknownNpmError"],
    protocol: "NpmProtocol",
    retry: "Retry.Retry",
  },

  // `effect/Redacted` is only referenced by modules with sensitive members —
  // import it exactly there.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the npm registry Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});
