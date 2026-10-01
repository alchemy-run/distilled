#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * OpenRouter Effect SDK.
 *
 * Input:  .generated-specs/openrouter.json  (written by scripts/convert.ts)
 * Output: src/services/openrouter.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is OpenRouter's provider
 * spec: the `com.distilled.openapi` trait vocabulary (nullable members,
 * bare-body responses, error status matchers, sensitive strings), a
 * passthrough union style, and the protocol/retry/error names.
 *
 * OpenRouter keeps its wire member names verbatim (snake_case — `max_tokens`,
 * `input_audio`) on the TS surface, the same names its docs and the OpenAI
 * wire format use.
 *
 * No pagination profiles are emitted: the few list endpoints page with
 * `offset`/`limit` inputs that stay plain fields.
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** OpenRouter's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  // Wire names ARE the TS surface (snake_case, as on the wire) — no renaming.
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

  // Sensitive strings (API keys returned by key creation, BYOK provider keys):
  // Redacted on the way out, `string | Redacted` accepted on the way in (the
  // REST protocol unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // OpenRouter's oneOf/anyOf unions (message content parts, tool choices,
  // nullable alternates) are decoded passthrough: the TS type is the case
  // union, the schema stays opaque — the API returns one arm's plain value,
  // so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  sourceNote:
    ".generated-specs (specs/spec-mirror-openrouter/specs/openapi.json)",

  operationDecl: {
    contextType: "OpenRouterOpContext",
    commonErrorType: "OpenRouterOpError",
    // Per-op error lists carry exactly the statuses the spec declares
    // (400/402/403/404/409/422); everything else rides OpenRouterOpError.
    commonErrorClasses: [],
    protocol: "OpenRouterProtocol",
    retry: "Retry.Retry",
  },

  // `effect/Redacted` is only referenced by modules with sensitive members —
  // import it exactly there. With commonErrorClasses empty the default
  // header's `import { } from "../errors.ts"` is dead weight — drop it.
  postProcess: (code) => {
    let out = code.replace(/import \{\s*\} from "\.\.\/errors\.ts";\n/, "");
    if (out.includes("Redacted.Redacted<")) {
      out = out.replace(
        `import * as S from "@distilled.cloud/core/schema";`,
        `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";`,
      );
    }
    return out;
  },
};

runGeneratorCli({
  description: "Generate the OpenRouter Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  // The RFC-6902 patch chain in patches/ applies to the OpenAPI document in
  // scripts/convert.ts — never to the Smithy models.
  patchesDir: false,
  spec: () => spec,
});
