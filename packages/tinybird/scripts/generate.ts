#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * Tinybird Effect SDK.
 *
 * Input:  .generated-specs/<page>.json  (one model per API reference page,
 *         converted in-process by scripts/convert.ts)
 * Output: src/services/<page>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is Tinybird's provider spec:
 * the `com.distilled.openapi` trait vocabulary, sensitive members as
 * `Redacted`, and the protocol/retry/error names. Tinybird's parameters are
 * snake_case on the wire and in its docs (`delete_condition`,
 * `schedule_cron`), and stay that way on the TS surface. Module files are
 * named after the page (`copy_pipes.ts`); the barrel exports them camelCased
 * (`copyPipes`).
 */
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";
import { JSON_PRELUDE, TS_JSON_PRELUDE } from "@distilled.cloud/dev/codegen/prelude";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `copy_pipes` → `copyPipes` (the barrel's export name). */
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

  // The data endpoints answer in the format the caller picks (CSV, NDJSON,
  // Parquet, JSON, ...): the response is the body's bytes, read as such by
  // the REST protocol.
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

  // Sensitive strings (token values, variable values): Redacted on the way
  // out, `string | Redacted` accepted on the way in (the REST protocol
  // unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // No reference table describes a union; any a patch introduces decodes
  // passthrough (wire names are the TS names).
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  sourceNote: ".generated-specs (specs/spec-mirror-tinybird/specs/api-reference)",

  operationDecl: {
    contextType: "TinybirdOpContext",
    commonErrorType: "TinybirdOpError",
    // No per-operation error classes: failures dispatch by status through
    // core's shared map (src/errors.ts).
    commonErrorClasses: ["UnknownTinybirdError"],
    protocol: "TinybirdProtocol",
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
  description: "Generate the Tinybird Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // patches/<page>/*.json apply to the Smithy models via finalizeConvert in
  // scripts/convert.ts (runOpenApiConvert) — never here.
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});
