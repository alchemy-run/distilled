#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * 1Password Effect SDK, one service module per API:
 *
 *   connect.json      → src/services/connect.ts      ConnectProtocol
 *   events.json       → src/services/events.ts       EventsProtocol
 *   users.json        → src/services/users.ts        UsersProtocol
 *   oauth.json        → src/services/oauth.ts        OAuthProtocol
 *   partnership.json  → src/services/partnership.ts  PartnershipProtocol
 *
 * Each API authenticates differently, so each has its own protocol and
 * credentials service (src/protocol.ts, src/credentials.ts). Every API keeps
 * the wire's member names on the TS surface, so no member renaming or wire
 * dictionaries appear here.
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is 1Password's provider spec.
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const CONTENT_TYPE_TRAIT = "com.distilled.openapi#contentType";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Per-API protocol and context names; everything else is shared. */
interface Api {
  readonly protocol: string;
  readonly contextType: string;
  readonly sourceNote: string;
}

const APIS: Record<string, Api> = {
  "com.onepassword.connect": {
    protocol: "ConnectProtocol",
    contextType: "ConnectOpContext",
    sourceNote: ".generated-specs (specs/spec-mirror-onepassword, Connect API)",
  },
  "com.onepassword.events": {
    protocol: "EventsProtocol",
    contextType: "EventsOpContext",
    sourceNote: ".generated-specs (specs/spec-mirror-onepassword, Events API)",
  },
  "com.onepassword.users": {
    protocol: "UsersProtocol",
    contextType: "UsersOpContext",
    sourceNote: ".generated-specs (specs/spec-mirror-onepassword, Users API)",
  },
  "com.onepassword.oauth": {
    protocol: "OAuthProtocol",
    contextType: "OAuthOpContext",
    sourceNote: ".generated-specs (specs/spec-mirror-onepassword, OAuth API)",
  },
  "com.onepassword.partnership": {
    protocol: "PartnershipProtocol",
    contextType: "PartnershipOpContext",
    sourceNote: ".generated-specs (specs/spec-mirror-onepassword, Partnership API)",
  },
};

const namespaceOf = (model: any): string => {
  for (const id of Object.keys(model.shapes ?? {})) {
    const ns = id.split("#")[0] ?? "";
    if (ns in APIS) return ns;
  }
  throw new Error("model has no shape in a known com.onepassword.* namespace");
};

/** 1Password's provider spec for the shared smithy→SDK compiler. */
const onepasswordSpec = (api: Api): SdkSpec => ({
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

  // Sensitive strings (item field values, tokens): the schema member carries
  // T.SensitiveValue; the REST protocol delivers Redacted values and accepts
  // string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // One pagination profile: cursor mode, traversed by core's paginateCursor.
  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "items",
    },
  },

  operationDecl: {
    contextType: api.contextType,
    commonErrorType: "OnepasswordOpError",
    commonErrorClasses: ["UnknownOnepasswordError"],
    protocol: api.protocol,
    retry: "Retry.Retry",
  },

  sourceNote: api.sourceNote,

  // Sensitive member types reference Redacted; pull the import in when used.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";\n`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
});

runGeneratorCli({
  description: "Generate the 1Password Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // Smithy patches apply in scripts/convert.ts (finalizeConvert).
  patchesDir: false,
  spec: (model) => {
    // The converter records form-urlencoded bodies (the OAuth API) in its
    // contentType trait; carry it into the http trait so the emitted
    // `T.Http({ … })` makes the protocol send a form body.
    for (const shape of Object.values<any>(model.shapes ?? {})) {
      if (shape?.type !== "operation") continue;
      const ct = shape.traits?.[CONTENT_TYPE_TRAIT];
      const http = shape.traits?.["smithy.api#http"];
      if (ct && http && http.contentType === undefined) http.contentType = ct;
    }
    return onepasswordSpec(APIS[namespaceOf(model)]!);
  },
});
