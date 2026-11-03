#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the E2B
 * Effect SDK.
 *
 * Input:  .generated-specs/<module>.json  (written by scripts/convert.ts)
 * Output: src/services/<module>.ts  +  src/services/index.ts
 *
 * E2B serves three hosts with three credentials, so each module is
 * compiled against the protocol for the host it talks to:
 *
 *   • control plane (`sandboxes`, `templates`, `volumes`, …) → E2BProtocol,
 *     authenticated with the team API key (and the access token for the
 *     `api_keys` / `auth` endpoints).
 *   • envd (`envd`, `process`, `filesystem`) → EnvdProtocol, addressed to one
 *     sandbox with that sandbox's envd access token. No team key is sent.
 *   • `volume_content` → VolumeContentProtocol, authenticated with the
 *     volume's own token. No team key is sent.
 *
 * E2B keeps its wire member names (camelCase on the control plane, proto3
 * JSON camelCase on envd) on the TS surface, so there is no memberName
 * mapping.
 */
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";
const COMMA_DELIMITED_TRAIT = "com.e2b#commaDelimited";

/** `volume_content` → `volumeContent` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

const ENVD_NAMESPACES = new Set(["com.e2b.envd", "com.e2b.process", "com.e2b.filesystem"]);
const VOLUME_CONTENT_NAMESPACE = "com.e2b.volume_content";

/** The namespace of a model, read from its first shape id. */
const namespaceOf = (model: any): string =>
  (Object.keys(model.shapes ?? {})[0] ?? "").split("#")[0] ?? "";

const protocolFor = (model: any) => {
  const namespace = namespaceOf(model);
  if (ENVD_NAMESPACES.has(namespace)) {
    return { protocol: "EnvdProtocol", contextType: "EnvdOpContext" };
  }
  if (namespace === VOLUME_CONTENT_NAMESPACE) {
    return { protocol: "VolumeContentProtocol", contextType: "VolumeContentOpContext" };
  }
  return { protocol: "E2BProtocol", contextType: "E2BOpContext" };
};

const baseSpec: SdkSpec = {
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

  // Sensitive strings (API keys, access tokens): Redacted on the way out,
  // `string | Redacted` accepted on the way in (the REST protocol unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
    // Query lists sent as one comma-separated value (convert stamps them).
    [COMMA_DELIMITED_TRAIT]: "T.CommaDelimited",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : "smithy.api#httpPayload" in m.traits && m.target === "smithy.api#Blob"
        ? "Uint8Array | string"
        : undefined,

  // File downloads (envd `readFile`, `readVolumeFile`): the output is the raw
  // body, decoded as bytes. convert stamps them as a sole raw `Blob` member.
  shapeOverride: ({ name, def }) =>
    def.type === "structure" &&
    Object.keys(def.members ?? {}).length === 1 &&
    def.members.body?.target === "smithy.api#Blob" &&
    RAW_RESPONSE_TRAIT in (def.members.body.traits ?? {})
      ? [
          `export type ${name} = Uint8Array;`,
          `export const ${name} = S.instanceOf(Uint8Array).pipe(T.BinaryResponse()) as S.Codec<${name}>;`,
        ]
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the protocol
  // passes union content through verbatim.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // List endpoints page by token: `nextToken` in, the `X-Next-Token` header
  // out (bound to `nextToken`), items under `items`. convert stamps them.
  paginationProfiles: {
    token: {
      strategy: "paginateToken",
      itemsFallback: "items",
    },
  },

  sourceNote:
    ".generated-specs (specs/spec-mirror-e2b/specs/{openapi.yml,openapi-volumecontent.yml,envd.yaml,process.proto,filesystem.proto})",

  operationDecl: {
    contextType: "E2BOpContext",
    commonErrorType: "E2BOpError",
    // Failures share a `{ code, message }` envelope; the protocol picks the
    // class from the status.
    commonErrorClasses: ["UnknownE2BError"],
    protocol: "E2BProtocol",
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
};

/**
 * envd's streaming RPCs are hand-written in `src/connect.ts`; each is
 * re-exported from the service it belongs to, so every API call reads
 * `E2B.<service>.<operation>`.
 */
const STREAMING_EXPORTS: Record<string, string> = {
  "com.e2b.process": [
    "export {",
    "  connectProcess,",
    "  startProcess,",
    "  type ConnectProcessRequest,",
    "  type ConnectStreamError,",
    "  type ProcessEvent,",
    "  type Pty,",
    "  type StartProcessRequest,",
    '} from "../connect.ts";',
  ].join("\n"),
  "com.e2b.filesystem": [
    "export {",
    "  watchDir,",
    "  type ConnectStreamError,",
    "  type FilesystemEventType,",
    "  type WatchDirEvent,",
    "  type WatchDirRequest,",
    '} from "../connect.ts";',
  ].join("\n"),
};

runGeneratorCli({
  description: "Generate the E2B Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  barrelExportName: camel,
  spec: (model) => {
    const streaming = STREAMING_EXPORTS[namespaceOf(model)];
    return {
      ...baseSpec,
      operationDecl: { ...baseSpec.operationDecl!, ...protocolFor(model) },
      postProcess: (code) => {
        const processed = baseSpec.postProcess!(code);
        return streaming === undefined ? processed : `${processed.trimEnd()}\n\n${streaming}\n`;
      },
    };
  },
});
