#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import { ERROR_MATCHERS_TRAIT } from "@distilled.cloud/dev/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

const spec: SdkSpec = {
  sourceNote: ".generated-specs (buf.build/namespace/cloud → smithy)",
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "items",
    },
  },

  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  operationDecl: {
    contextType: "NamespaceLabsOpContext",
    commonErrorType: "NamespaceLabsOpError",
    commonErrorClasses: ["UnknownNamespaceLabsError"],
    protocol: "NamespaceLabsProtocol",
    retry: "Retry.Retry",
  },

  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";\n`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the Namespace Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  barrelExportName: camel,
  spec: () => spec,
});
