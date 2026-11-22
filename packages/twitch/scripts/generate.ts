#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate -- turn the Smithy JSON models in .generated-specs into the
 * Twitch Effect SDK.
 *
 * Input:  .generated-specs/<resource>.json  (one model per API reference page,
 *         converted in-process by scripts/convert.ts)
 * Output: src/services/<resource>.ts  +  src/services/index.ts
 *
 * The smithy->SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is Twitch's provider spec:
 * the `com.distilled.openapi` trait vocabulary, sensitive members as
 * `Redacted`, and the protocol/retry/error names. Twitch's parameters are
 * snake_case on the wire and in its docs (`broadcaster_id`, `sender_id`), and
 * stay that way on the TS surface. Module files are named after the page
 * (`channel_points.ts`); the barrel exports them camelCased (`channelPoints`).
 */
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import { camel } from "@distilled.cloud/dev/codegen/naming";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";
import { JSON_PRELUDE, TS_JSON_PRELUDE } from "@distilled.cloud/dev/codegen/prelude";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,
  prelude: JSON_PRELUDE,
  tsPrelude: TS_JSON_PRELUDE,

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for bare array/scalar response
      // bodies -- as a response's sole member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Helix pages by cursor (`after` in, `pagination.cursor` out); convert
  // stamps the trait on the operations that page.
  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "data",
    },
  },

  // Sensitive strings (secrets the converter recognizes by name): Redacted on the way
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

  sourceNote: ".generated-specs (specs/spec-mirror-twitch/specs/api/reference)",

  operationDecl: {
    contextType: "TwitchOpContext",
    commonErrorType: "TwitchOpError",
    // No per-operation error classes: failures dispatch by status through
    // core's shared map (src/errors.ts).
    commonErrorClasses: ["UnknownTwitchError"],
    protocol: "TwitchProtocol",
    retry: "Retry.Retry",
  },

  // `effect/Redacted` is only referenced by modules with sensitive members --
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
  description: "Generate the Twitch Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // patches/<page>/*.json apply to the Smithy models via finalizeConvert in
  // scripts/convert.ts (runOpenApiConvert) -- never here.
  patchesDir: false,
  // `channel_points` -> `channelPoints`.
  barrelExportName: camel,
  spec: () => spec,
});
