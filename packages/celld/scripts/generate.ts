#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

runGeneratorCli({
  description: "Generate the Celld SDK from the source-derived Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  spec: (model) => ({
    sourceNote: "the Celld v0.6.0 source-derived Smithy specifications in specs/",
    nullableTrait: "com.distilled.openapi#nullable",
    errorMatchersTrait: "com.distilled.openapi#errorMatchers",
    memberTraitPipes: {
      "com.distilled.http#labelEncoding": "T.LabelEncoding",
      // Sensitive strings (passwords, keys, tokens): the schema member
      // carries T.SensitiveValue; the protocol delivers Redacted values and
      // accepts string | Redacted on input.
      [SENSITIVE_TRAIT]: "T.SensitiveValue",
    },
    memberTsType: (m) =>
      SENSITIVE_TRAIT in m.traits
        ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
        : undefined,
    // Sensitive member types reference Redacted; pull the import in when used.
    postProcess: (code) =>
      code.includes("Redacted.Redacted<")
        ? code.replace(
            `import * as S from "@distilled.cloud/core/schema-lite";\n`,
            `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";\n`,
          )
        : code,
    extraRoots: () => model.metadata?.extraRoots ?? [],
    extraBindings: [
      {
        trait: "com.distilled.openapi#rawResponse",
        binding: "rawResponse",
        pipe: "T.RawResponse()",
        rootPipe: "T.RawResponseRoot()",
      },
    ],
    unionStyle: "untagged",
    operationDecl: {
      contextType: "CelldOpContext",
      commonErrorType: "CelldOpError",
      commonErrorClasses: [],
      serviceErrors: "CelldServiceErrors",
      protocol: "CelldProtocol",
      // Replaying signed requests reuses the nonce; mutations may already have run.
    },
  }),
});
