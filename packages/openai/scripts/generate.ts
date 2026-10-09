#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the OpenAI
 * Effect SDK.
 *
 * Input:  .generated-specs/<tag>.json  (written by scripts/convert.ts)
 * Output: src/services/<tag>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is OpenAI's provider spec.
 * OpenAI keeps the wire's snake_case member names on the TS surface (the
 * names every OpenAI SDK and doc uses), so no member renaming or wire
 * dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { JSON_PRELUDE, TS_JSON_PRELUDE } from "@distilled.cloud/core/codegen/prelude";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";
/** Stamped by scripts/convert.ts on Admin-API operations. */
const ADMIN_AUTH_TRAIT = "com.distilled.openai#adminAuth";

/** OpenAI's provider spec for the shared smithy→SDK compiler. */
const openaiSpec = (model: any): SdkSpec => {
  // `METHOD uri` of every Admin-API operation in this model. The operation
  // input (which carries the http trait) gets `T.AdminAuth()`, and the
  // protocol authenticates those calls with the admin key.
  const adminRoutes = new Set<string>();
  for (const shape of Object.values<any>(model.shapes ?? {})) {
    if (shape.type !== "operation" || !(ADMIN_AUTH_TRAIT in (shape.traits ?? {}))) continue;
    const http = shape.traits["smithy.api#http"];
    if (http) adminRoutes.add(`${http.method} ${http.uri}`);
  }

  return {
    nullableTrait: NULLABLE_TRAIT,
    errorMatchersTrait: ERROR_MATCHERS_TRAIT,
    // Binary members (multipart file uploads) accept any byte container.
    prelude: {
      ...JSON_PRELUDE,
      Blob: "S.Union([S.instanceOf(Blob), S.instanceOf(Uint8Array), S.instanceOf(ArrayBuffer)])",
    },
    tsPrelude: {
      ...TS_JSON_PRELUDE,
      Blob: "Blob | Uint8Array | ArrayBuffer",
    },

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

    // Sensitive strings (API keys, client secrets): the schema member carries
    // T.SensitiveValue; the REST protocol delivers Redacted values and
    // accepts string | Redacted on input.
    memberTraitPipes: {
      [SENSITIVE_TRAIT]: "T.SensitiveValue",
    },
    memberTsType: (m) =>
      SENSITIVE_TRAIT in m.traits
        ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
        : undefined,

    // The http trait on operation inputs, plus the admin-key marker.
    structPipes: ({ httpTrait }) => {
      if (!httpTrait) return [];
      const http = httpTrait as { method: string; uri: string };
      return [
        `T.Http(${JSON.stringify(httpTrait)})`,
        ...(adminRoutes.has(`${http.method} ${http.uri}`) ? ["T.AdminAuth()"] : []),
      ];
    },

    // Binary downloads (speech audio, file/container/video/skill content):
    // the response IS the bytes, delivered as a Uint8Array by the REST
    // protocol.
    shapeOverride: ({ name, def }) => {
      if (
        def.type === "structure" &&
        Object.keys(def.members ?? {}).length === 1 &&
        def.members.body?.target === "smithy.api#Blob" &&
        RAW_RESPONSE_TRAIT in (def.members.body.traits ?? {})
      ) {
        return [
          `export type ${name} = Uint8Array;`,
          `export const ${name} = S.instanceOf(Uint8Array).pipe(T.BinaryResponse()) as any as S.Schema<${name}>;`,
        ];
      }
      return undefined;
    },

    // Unions surface as TS type unions over an opaque schema — the REST
    // protocol passes union content (stream events, input items) through
    // verbatim; wire names ARE the TS names.
    union: ({ name, caseTargets, tsRef }) => [
      `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
      `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
    ],

    // Two list styles (see src/pagination.ts): most lists page with an
    // `after` cursor while `has_more` is true (stamped by convert.ts); the
    // Admin usage/costs endpoints pass `next_page` back as `page` until it
    // comes back null.
    paginationProfiles: {
      after: {
        strategy: "paginateAfter",
        itemsFallback: "data",
      },
      cursor: {
        strategy: "paginateCursor",
        itemsFallback: "data",
      },
    },
    paginationProfileFor: (trait) => (trait?.inputToken === "after" ? "after" : "cursor"),

    operationDecl: {
      contextType: "OpenAIOpContext",
      commonErrorType: "OpenAIOpError",
      commonErrorClasses: ["UnknownOpenAIError"],
      protocol: "OpenAIProtocol",
      retry: "Retry.Retry",
    },

    sourceNote: ".generated-specs (specs/spec-mirror-openai)",

    // Sensitive member types reference Redacted; pull the import in when used.
    postProcess: (code) =>
      code.includes("Redacted.Redacted<")
        ? code.replace(
            `import * as S from "@distilled.cloud/core/schema";\n`,
            `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
          )
        : code,
  };
};

/** `admin_api_keys` → `adminApiKeys` (the barrel's export name; files keep the tag slug). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

runGeneratorCli({
  description: "Generate the OpenAI Effect SDK from the Smithy models",
  root: `${import.meta.dirname}/..`,
  // patches/ is consumed by scripts/convert.ts (OpenAPI and Smithy
  // pointers); generate only compiles the committed, patched models.
  patchesDir: false,
  spec: openaiSpec,
  barrelExportName: camel,
});
