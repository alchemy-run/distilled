#!/usr/bin/env -S node --conditions=bun
/**
 * generate: the Smithy models from scripts/convert.ts -> the Technitium DNS
 * Server Effect SDK.
 *
 * Output: src/services/<area>.ts and src/services/index.ts.
 *
 * Every call is a POST with a form-encoded body, so the input structs carry
 * `T.Http({ ..., contentType: "form-urlencoded" })`. Secrets are sensitive
 * members: inputs accept a string or a `Redacted` value, outputs are
 * `Redacted`.
 */
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import { REDACTED_OUTPUT_TRAIT, SENSITIVE_TRAIT } from "./schema.ts";

const spec: SdkSpec = {
  sourceNote: ".generated-specs (specs/spec-mirror-technitium)",
  // Set by patches where Technitium writes an explicit null.
  nullableTrait: "technitium.api#nullable",
  // Record data members whose type depends on the record type, such as `flags`
  // (see patches/zones/record-data.patch.json), are unions of primitives.
  unionStyle: "primitive",
  memberTraitPipes: { [SENSITIVE_TRAIT]: "T.SensitiveValue" },
  memberTsType: (member) =>
    REDACTED_OUTPUT_TRAIT in member.traits
      ? "Redacted.Redacted<string>"
      : SENSITIVE_TRAIT in member.traits
        ? "string | Redacted.Redacted<string>"
        : undefined,
  structPipes: ({ httpTrait }) =>
    typeof httpTrait === "object" && httpTrait !== null
      ? [`T.Http(${JSON.stringify({ ...httpTrait, contentType: "form-urlencoded" })})`]
      : [],
  operationDecl: {
    contextType: "TechnitiumOpContext",
    commonErrorType: "TechnitiumOpError",
    commonErrorClasses: ["UnknownTechnitiumError"],
    protocol: "TechnitiumProtocol",
    // No retry policy: replaying a write could apply it twice.
  },
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";\n`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport type * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the Technitium DNS Server Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // scripts/convert.ts applies the patches.
  patchesDir: false,
  spec: () => spec,
});
