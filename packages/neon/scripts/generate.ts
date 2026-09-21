#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the Neon
 * Effect SDK.
 *
 * Input:  .generated-specs/neon.json  (written by scripts/convert.ts)
 * Output: src/services/neon.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Neon's provider spec.
 * Neon keeps the wire's snake_case member names on the TS surface (v0
 * parity — the distilled v0 Neon SDK and its alchemy consumers use
 * snake_case fields), so no member renaming or wire dictionaries appear
 * here.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
import {
  JSON_PRELUDE,
  TS_JSON_PRELUDE,
} from "@distilled.cloud/core/codegen/prelude";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Neon's provider spec for the shared smithy→SDK compiler. */
const neonSpec: SdkSpec = {
  schemaType: "Codec",
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,
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

  // Sensitive strings (connection URIs, passwords, API keys): the schema
  // member carries T.SensitiveValue; the REST protocol delivers Redacted
  // values and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberSchema: (m, ref) =>
    SENSITIVE_TRAIT in m.traits
      ? `S.Union([${ref(m.target)}, S.Redacted(${ref(m.target)}, { disallowJsonEncode: true })])`
      : undefined,
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  shapeOverride: ({ name, def }) => {
    if (
      def.type === "structure" &&
      Object.keys(def.members ?? {}).length === 1 &&
      def.members.body?.target === "smithy.api#Blob" &&
      RAW_RESPONSE_TRAIT in (def.members.body.traits ?? {})
    ) {
      return [
        `export type ${name} = Uint8Array;`,
        `export const ${name} = S.instanceOf(Uint8Array).pipe(T.BinaryResponse()) as S.Codec<${name}>;`,
      ];
    }
    if (
      def.type !== "enum" ||
      (!name.includes("Trigger") &&
        ![
          "StandardEmailServerType",
          "StandardEmailServerResponseType",
          "SharedEmailServerType",
        ].includes(name))
    )
      return;
    const values = Object.values(def.members ?? {}).map(
      (member: any) => member.traits["smithy.api#enumValue"],
    );
    return [
      `export type ${name} = ${values.map((value) => JSON.stringify(value)).join(" | ")};`,
      `export const ${name} = S.Literals(${JSON.stringify(values)});`,
    ];
  },
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    name === "Trigger" ||
    name === "TriggerCreateRequest" ||
    name === "TriggerUpdateRequest" ||
    name === "NeonAuthEmailServerConfig" ||
    name === "NeonAuthEmailServerConfigResponse"
      ? `export const ${name} = S.suspend(() => S.Union([${caseTargets.map(tsRef).join(", ")}])) as S.Codec<${name}>;\n`
      : `export const ${name} = S.Unknown as any as S.Codec<${name}>;\n`,
  ],

  // Cursor mode uses each operation's modeled pagination.cursor or pagination.next.
  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "items",
    },
  },

  operationDecl: {
    contextType: "NeonOpContext",
    commonErrorType: "NeonOpError",
    commonErrorClasses: ["UnknownNeonError"],
    protocol: "NeonProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-neon)",

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
  description: "Generate the Neon Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  // patches/ holds OpenAPI-document patches consumed by scripts/convert.ts;
  // there is no smithy-model patch chain.
  patchesDir: false,
  spec: () => neonSpec,
});
