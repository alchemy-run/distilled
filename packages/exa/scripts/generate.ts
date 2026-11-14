#!/usr/bin/env -S node --conditions=bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the Exa
 * Effect SDK.
 *
 * Input:  .generated-specs/{api,team_management}.json  (written by
 *         scripts/convert.ts)
 * Output: src/services/{api,team_management}.ts  +  src/services/index.ts
 *
 * Exa is plain API-key REST with cursor pagination. Each module calls its
 * own API's protocol: `api` → ExaProtocol, `team_management` →
 * ExaTeamManagementProtocol (another host, and the service API key). The
 * RFC-6902 patches in patches/<module>/*.json apply to the Smithy models via
 * finalizeConvert in scripts/convert.ts — never here.
 */
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** The protocol const each model's operations call, by model namespace. */
const PROTOCOLS: Record<string, string> = {
  "com.exa.api": "ExaProtocol",
  "com.exa.team_management": "ExaTeamManagementProtocol",
};

/** The namespace of the model's service shape. */
const namespaceOf = (model: any): string => {
  const service = Object.keys(model.shapes).find((id) => model.shapes[id].type === "service");
  return service?.split("#")[0] ?? "";
};

const specFor = (model: any): SdkSpec => {
  const namespace = namespaceOf(model);
  const protocol = PROTOCOLS[namespace];
  if (protocol === undefined) {
    throw new Error(`no Exa protocol for model namespace "${namespace}"`);
  }
  return {
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

    // Sensitive strings (API key secrets, webhook secrets): Redacted on the
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

    paginationProfiles: {
      cursor: {
        strategy: "paginateCursor",
        itemsFallback: "data",
      },
    },

    sourceNote: ".generated-specs (specs/spec-mirror-exa)",

    operationDecl: {
      contextType: "ExaOpContext",
      commonErrorType: "ExaOpError",
      commonErrorClasses: ["UnknownExaError"],
      protocol,
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
};

runGeneratorCli({
  description: "Generate the Exa Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  barrelExportName: camel,
  spec: specFor,
});
