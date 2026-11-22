#!/usr/bin/env -S node --conditions=bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * 1Password Effect SDK, one service module per API:
 *
 *   connect.json      → src/services/connect.ts      ConnectProtocol
 *   events.json       → src/services/events.ts       EventsProtocol
 *   users.json        → src/services/users.ts        UsersProtocol
 *   oauth.json        → src/services/oauth.ts        OAuthProtocol
 *   partnership.json  → src/services/partnership.ts  PartnershipProtocol
 *   sdk.json          → src/services/sdk.ts          SdkProtocol       (SDK core invocations)
 *   sdk-local.json    → src/services/sdk-local.ts    SdkLocalProtocol  (SDK core, no account)
 *
 * Each API authenticates differently, so each has its own protocol and
 * credentials service (src/protocol.ts, src/credentials.ts). Every API keeps
 * the wire's member names on the TS surface, so no member renaming or wire
 * dictionaries appear here.
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is 1Password's provider spec.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import type { OperationEmit, SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";
import { typeshareConstants } from "./sdk-spec.ts";

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
  /** Defaults to `OnepasswordOpError`. */
  readonly commonErrorType?: string;
  /** Defaults to `["UnknownOnepasswordError"]`. */
  readonly commonErrorClasses?: readonly string[];
  /** Operations are SDK-core invocations: emit `operationName`. */
  readonly invocation?: true;
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
  // The 1Password SDK: operations run through the SDK core, not HTTP.
  "com.onepassword.sdk": {
    protocol: "SdkProtocol",
    contextType: "SdkOpContext",
    commonErrorType: "OnepasswordSdkOpError",
    commonErrorClasses: ["OnepasswordSdkError"],
    invocation: true,
    sourceNote: ".generated-specs (specs/spec-mirror-onepassword, 1Password SDK)",
  },
  "com.onepassword.sdklocal": {
    protocol: "SdkLocalProtocol",
    contextType: "SdkLocalOpContext",
    commonErrorType: "OnepasswordSdkOpError",
    commonErrorClasses: ["OnepasswordSdkError"],
    invocation: true,
    sourceNote: ".generated-specs (specs/spec-mirror-onepassword, 1Password SDK local functions)",
  },
};

const namespaceOf = (model: any): string => {
  for (const id of Object.keys(model.shapes ?? {})) {
    const ns = id.split("#")[0] ?? "";
    if (ns in APIS) return ns;
  }
  throw new Error("model has no shape in a known com.onepassword.* namespace");
};

/** The core's invocation name for an SDK operation: its http uri without the slash. */
const invocationName = (ctx: OperationEmit): string => {
  const uri: unknown = ctx.op.def.traits?.["smithy.api#http"]?.uri;
  if (typeof uri !== "string" || !/^\/[A-Za-z]+$/.test(uri)) {
    throw new Error(`${ctx.opName}: expected an http uri "/<InvocationName>"`);
  }
  return uri.slice(1);
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
    commonErrorType: api.commonErrorType ?? "OnepasswordOpError",
    commonErrorClasses: api.commonErrorClasses ?? ["UnknownOnepasswordError"],
    protocol: api.protocol,
    retry: "Retry.Retry",
    // SDK operations are addressed by the core's invocation name, which the
    // converter keeps as the operation's http uri (`/ItemsGet`). They run
    // through the protocol's `call`, never over HTTP, so their type names
    // the SDK client (or nothing) instead of the `HttpClient` that
    // `API.make` infers; the annotation is cast to, like any overridden one.
    ...(api.invocation
      ? {
          extraConfig: (ctx: OperationEmit) => [
            `operationName: ${JSON.stringify(invocationName(ctx))}`,
          ],
          overrides: (ctx: OperationEmit) => ({
            typeAnnotation:
              `API.OperationMethod<\n  ${ctx.inputName},\n  ${ctx.outputTsType},\n` +
              `  ${ctx.opName}Error,\n  ${api.contextType}\n>`,
          }),
        }
      : {}),
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

/** The mirrored typeshare module; its numeric constants are appended to `sdk`. */
const SDK_TYPES = "specs/spec-mirror-onepassword/specs/sdk/types.ts";

/** `export const NAME = value;` for each typeshare constant (vault permission flags). */
const permissionFlags = (): string =>
  typeshareConstants(
    fs.readFileSync(resolveSpecPath(path.resolve(import.meta.dirname, ".."), SDK_TYPES), "utf8"),
  )
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    .map(
      (c) =>
        `/** ${c.doc ?? "Vault permission flag; combine with |."} */\nexport const ${c.name} = ${c.value};`,
    )
    .join("\n\n");

runGeneratorCli({
  description: "Generate the 1Password Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  append: (resource) => (resource === "sdk" ? permissionFlags() : undefined),
  // `sdk-local` is not an identifier.
  barrelExportName: (resource) => resource.replace(/-/g, "_"),
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
