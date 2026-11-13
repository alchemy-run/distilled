#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the Entire
 * Effect SDK.
 *
 * Input:  .generated-specs/<module>.json  (one model per API tag, written by
 *         scripts/convert.ts from the Core and cell specs)
 * Output: src/services/<module>.ts  +  src/services/index.ts
 *
 * Each model's namespace names its API (`com.entire.core.*` /
 * `com.entire.cell.*`), and the operations bind that API's protocol —
 * `EntireCoreProtocol` or `EntireCellProtocol` — because the two APIs live
 * on different hosts under the same `/api/v1` root.
 *
 * Entire keeps its wire member names verbatim on the TS surface (Core is
 * camelCase, the cell mixes in snake_case), so there is no memberName
 * mapping. Module files are named after the tag slug (`service_accounts.ts`)
 * while the barrel exports them camelCased (`serviceAccounts.createServiceAccount`).
 */
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `service_accounts` → `serviceAccounts` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** `core` or `cell`, read off the model's service shape id. */
const planeOf = (model: any): "core" | "cell" => {
  const service = Object.keys(model?.shapes ?? {}).find(
    (id) => model.shapes[id]?.type === "service",
  );
  if (service?.startsWith("com.entire.core.")) return "core";
  if (service?.startsWith("com.entire.cell.")) return "cell";
  throw new Error(`model service ${service} is neither com.entire.core.* nor com.entire.cell.*`);
};

/** Entire's provider spec for the shared smithy→SDK compiler. */
const makeSpec = (protocol: string): SdkSpec => ({
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

  // Sensitive strings: Redacted on the way out, `string | Redacted`
  // accepted on the way in (the REST protocol unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // `oneOf` unions decode passthrough: the TS type is the case union, the
  // schema stays opaque. Wire names equal the TS names.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // One pagination profile for both cursor spellings (`pageToken` →
  // `nextPageToken`, `cursor` → `next_cursor`), traversed by core's
  // paginateCursor. The trait is stamped in scripts/convert.ts.
  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "items",
    },
  },

  sourceNote: ".generated-specs (specs/spec-mirror-entire/specs/{core,cell}.json)",

  operationDecl: {
    contextType: "EntireOpContext",
    commonErrorType: "EntireOpError",
    // No per-operation error classes: every failure shares one problem
    // document, so every status rides EntireOpError and the protocol picks
    // the class.
    commonErrorClasses: ["UnknownEntireError"],
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
});

const coreSpec = makeSpec("EntireCoreProtocol");
const cellSpec = makeSpec("EntireCellProtocol");

runGeneratorCli({
  description: "Generate the Entire Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // RFC-6902 patches apply to the Smithy models via finalizeConvert in
  // scripts/convert.ts — never here.
  patchesDir: false,
  barrelExportName: camel,
  spec: (model) => (planeOf(model) === "core" ? coreSpec : cellSpec),
});
