#!/usr/bin/env -S node --conditions=bun
import { readFileSync } from "node:fs";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the Smithy JSON model in .generated-specs into the Iceberg
 * REST Catalog Effect SDK.
 *
 * Input:  .generated-specs/catalog.json  (written by scripts/convert.ts)
 * Output: src/services/catalog.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Iceberg's provider spec:
 * the `com.distilled.openapi` trait vocabulary (nullable members, bare-body
 * responses, error matchers), a passthrough union style, the token
 * pagination profile, and the protocol/retry/error names.
 *
 * Wire names stay the TS surface. Iceberg's JSON is kebab-case
 * (`metadata-location`, `next-page-token`); the converter spells those
 * snake_case (`metadata_location`) with a `jsonName` back to the wire,
 * which is also how PyIceberg names them.
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

const root = `${import.meta.dirname}/..`;

/** `{ tsName: wireName }` for every member whose wire name differs. */
const keyDictionary = (): Record<string, string> => {
  const model = JSON.parse(readFileSync(`${root}/.generated-specs/catalog.json`, "utf8"));
  const dict: Record<string, string> = {};
  for (const [id, shape] of Object.entries<any>(model.shapes)) {
    for (const [name, member] of Object.entries<any>(shape.members ?? {})) {
      const wire = member.traits?.["smithy.api#jsonName"];
      if (typeof wire !== "string" || wire === name) continue;
      if (dict[name] !== undefined && dict[name] !== wire) {
        throw new Error(`${id}.${name}: wire name ${wire} conflicts with ${dict[name]}`);
      }
      dict[name] = wire;
    }
  }
  return Object.fromEntries(Object.entries(dict).sort(([a], [b]) => a.localeCompare(b)));
};

/** Iceberg's provider spec for the shared smithy→SDK compiler. */
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

  // Sensitive strings (vended storage credentials, tokens): Redacted on the
  // way out, `string | Redacted` accepted on the way in (the REST protocol
  // unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Iceberg's `oneOf` unions — table/view updates and requirements
  // (discriminated by `action` / `type`), schema types, planning results —
  // are passthrough: the TS type is the case union and the schema stays
  // opaque. Their members are kebab-case on the wire (`last-column-id`), so
  // the opaque content is renamed through the root key dictionary below.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // One pagination profile: `pageToken` in, `next_page_token` out, items
  // under `namespaces` / `identifiers`. Stamped in scripts/convert.ts.
  paginationProfiles: {
    token: {
      strategy: "paginateToken",
      itemsFallback: "identifiers",
    },
  },

  // Every TS → wire rename in the model (`metadata_location` →
  // `metadata-location`), stamped on operation inputs and outputs. Members
  // the schema knows rename through their own `jsonName`; this dictionary is
  // the fallback for content the schema keeps opaque — the union payloads
  // above. Map keys are only renamed when they equal a TS member name
  // exactly; Iceberg's property keys are dotted kebab-case
  // (`write.format.default`), so none do.
  rootKeyDictionary: {
    dict: keyDictionary(),
    doc: "TS member name → Iceberg wire name, for opaque union payloads.",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-iceberg/specs/rest-catalog-open-api.yaml)",

  operationDecl: {
    contextType: "IcebergOpContext",
    commonErrorType: "IcebergOpError",
    commonErrorClasses: [],
    protocol: "IcebergProtocol",
    retry: "Retry.Retry",
  },

  postProcess: (code) => {
    // No common error classes → drop the empty errors import.
    const withoutEmptyImport = code.replace(/^import \{\s*\} from "\.\.\/errors\.ts";\n/m, "");
    // `effect/Redacted` is only referenced by modules with sensitive members.
    return withoutEmptyImport.includes("Redacted.Redacted<")
      ? withoutEmptyImport.replace(
          `import * as S from "@distilled.cloud/core/schema";`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";`,
        )
      : withoutEmptyImport;
  },
};

runGeneratorCli({
  description: "Generate the Iceberg REST Catalog Effect SDK from the Smithy model",
  root,
  // Smithy patches under patches/catalog/ apply via finalizeConvert in
  // scripts/convert.ts — never here.
  patchesDir: false,
  spec: () => spec,
});
