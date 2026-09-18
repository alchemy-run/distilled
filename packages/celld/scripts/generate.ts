#!/usr/bin/env bun
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

runGeneratorCli({
  description: "Generate the Celld SDK from the source-derived Smithy models",
  root: `${import.meta.dir}/..`,
  patchesDir: false,
  spec: (model) => ({
    sourceNote:
      "the Celld v0.5.0 source-derived Smithy specifications in specs/",
    nullableTrait: "com.distilled.openapi#nullable",
    errorMatchersTrait: "com.distilled.openapi#errorMatchers",
    memberTraitPipes: { "com.distilled.http#labelEncoding": "T.LabelEncoding" },
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
      protocol: "CelldProtocol",
      // Replaying signed requests reuses the nonce; mutations may already have run.
    },
  }),
});
