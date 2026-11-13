#!/usr/bin/env -S node --conditions=bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * Coinflow Effect SDK.
 *
 * Input:  .generated-specs/<tag>.json  (written by scripts/convert.ts)
 * Output: src/services/<tag>.ts  +  src/services/index.ts
 *
 * Coinflow is header-authenticated JSON REST with camelCase wire names, so
 * member names are the wire names. The RFC-6902 patches in patches/ apply to
 * the Smithy models via finalizeConvert in scripts/convert.ts — never here.
 */
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";
import {
  VERIFICATION_REQUIRED_BODY,
  VERIFICATION_REQUIRED_MEMBERS,
} from "./verification-required.ts";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** The TS type of a `VerificationRequired` error's `body`. */
const VERIFICATION_REQUIRED_TS = `{ ${VERIFICATION_REQUIRED_MEMBERS.map(
  (m) => `readonly ${m.name}?: ${m.type}`,
).join("; ")} }`;

/** `card_tokenization` → `cardTokenization`. */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

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

  // Sensitive strings (session keys, embed session tokens): Redacted on the
  // way out, `string | Redacted` accepted on the way in.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // The spec's `oneOf`s are plain value alternatives — the TS type is the
  // case union, the schema stays opaque.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // Typed errors carry `message` and the parsed failure `body` (see
  // convert.ts). A 451's body is typed; the others stay `unknown`, since
  // their schemas differ per operation.
  errors: {
    field: (name, target) =>
      name === "body"
        ? target.endsWith(`#${VERIFICATION_REQUIRED_BODY}`)
          ? `  body: S.optional(S.Unknown as any as S.Schema<${VERIFICATION_REQUIRED_TS}>),`
          : `  body: S.Unknown,`
        : `  ${name}: ${target === "smithy.api#String" ? "S.String" : "S.Unknown"},`,
  },

  sourceNote: ".generated-specs (specs/spec-mirror-coinflow/specs/openapi.json)",

  operationDecl: {
    contextType: "CoinflowOpContext",
    commonErrorType: "CoinflowOpError",
    commonErrorClasses: ["UnknownCoinflowError"],
    protocol: "CoinflowProtocol",
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
  description: "Generate the Coinflow Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});
