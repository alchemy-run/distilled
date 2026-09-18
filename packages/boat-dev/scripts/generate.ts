#!/usr/bin/env bun
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the Smithy JSON model in .generated-specs into the Boat
 * Effect SDK.
 *
 * Input:  .generated-specs/boat.json  (written by scripts/convert.ts)
 * Output: src/services/boat.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Boat's provider spec.
 * Boat keeps the wire's camelCase member names on the TS surface, so no
 * member renaming or wire dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";
const PAGINATED_TRAIT = "smithy.api#paginated";

/** Boat's provider spec for the shared smithy→SDK compiler. */
const boatSpec: SdkSpec = {
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

  // Sensitive strings (API keys, webhook secrets, desktop URLs): the schema
  // member carries T.SensitiveValue; the REST protocol delivers Redacted
  // values and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names for Boat), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // Boat lists by cursor (`cursor`/`limit` in, `pageInfo.nextCursor` +
  // `pageInfo.hasMore` out). The shared OpenAPI converter only detects
  // `pagination.cursor` / `.next` / `.next_page`, so the trait is stamped
  // below. Core's paginateCursor follows `pageInfo.nextCursor` until it
  // comes back null.
  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "sandboxes",
    },
  },

  operationDecl: {
    contextType: "BoatOpContext",
    commonErrorType: "BoatOpError",
    commonErrorClasses: ["UnknownBoatError"],
    protocol: "BoatProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-boat-dev)",

  // Sensitive member types reference Redacted; pull the import in when used.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";\n`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the Boat Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  patchesDir: false,
  spec: (model) => {
    const shapes = (model.shapes ?? {}) as Record<string, any>;
    for (const shape of Object.values(shapes)) {
      if (shape?.type !== "operation") continue;
      if (shape.traits?.[PAGINATED_TRAIT]) continue;
      const input = shapes[shape.input?.target];
      const output = shapes[shape.output?.target];
      if (!input?.members?.cursor || !output?.members?.pageInfo) continue;
      const itemsEntry = Object.entries<any>(output.members).find(
        ([name, member]) => name !== "pageInfo" && shapes[member?.target]?.type === "list",
      );
      if (itemsEntry === undefined) continue;
      shape.traits ??= {};
      shape.traits[PAGINATED_TRAIT] = {
        mode: "cursor",
        inputToken: "cursor",
        outputToken: "pageInfo.nextCursor",
        items: itemsEntry[0],
        hasNextPage: "pageInfo.hasMore",
        ...(input.members.limit ? { pageSize: "limit" } : {}),
      };
    }
    return boatSpec;
  },
});
