#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

const HUJSON_BODY_URIS = new Set(["/tailnet/{tailnet}/acl", "/tailnet/{tailnet}/acl/validate"]);

const tailscaleSpec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // Tailscale error bodies are `{"message": ...}` only; the generator's
  // default would also declare a `code` the API never sends.
  errors: {
    defaultFields: () => [`  message: S.String,`],
  },

  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "items",
    },
  },

  structPipes: ({ httpTrait }) => {
    if (httpTrait === undefined || httpTrait === null) return [];
    const http = { ...(httpTrait as Record<string, unknown>) };
    if (
      HUJSON_BODY_URIS.has(http.uri as string) &&
      (http.method === "POST" || http.method === "PUT")
    ) {
      http.bodyMediaType = "application/hujson";
    }
    return [`T.Http(${JSON.stringify(http)})`];
  },

  operationDecl: {
    contextType: "TailscaleOpContext",
    commonErrorType: "TailscaleOpError",
    commonErrorClasses: ["UnknownTailscaleError"],
    protocol: "TailscaleProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-tailscale)",

  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";\n`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport type * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the Tailscale Effect SDK from the Smithy model",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  spec: () => tailscaleSpec,
});
