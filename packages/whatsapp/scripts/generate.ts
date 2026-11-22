#!/usr/bin/env -S node --conditions=bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * WhatsApp Effect SDK.
 *
 * Input:  .generated-specs/whatsapp.json  (written by scripts/convert.ts)
 * Output: src/services/whatsapp.ts  +  src/services/index.ts
 *
 * WhatsApp keeps the wire's member names on the TS surface — snake_case
 * bodies and the spec's path parameter names (`Phone_Number_ID`, `WABA_ID`)
 * — so there is no member renaming.
 *
 * PAGINATION. Graph API lists take `after` (and usually `limit`) and answer
 * `{ data: [...], paging: { cursors: { after }, next } }`. {@link stampPagination}
 * marks every operation whose input has an `after` query member and whose
 * output has a `data` list and a `paging` member; src/pagination.ts's
 * `paginateGraph` follows `paging.cursors.after` while `paging.next` is set.
 *
 * WEBHOOKS. patches/webhook-payload.json turns the spec's `POST
 * /whatsapp/webhooks` (a delivery Meta sends, not a call) into the
 * `WebhookPayload` structure, tagged with {@link WEBHOOK_PAYLOAD_TRAIT}. No
 * operation reaches it, so every tagged shape is rooted here and emitted
 * as a type, like packages/github's webhook payloads.
 */
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";
import { JSON_PRELUDE, TS_JSON_PRELUDE } from "@distilled.cloud/dev/codegen/prelude";

const SENSITIVE_TRAIT = "smithy.api#sensitive";
const PAGINATED_TRAIT = "smithy.api#paginated";
const HTTP_QUERY_TRAIT = "smithy.api#httpQuery";
const WEBHOOK_PAYLOAD_TRAIT = "com.distilled.whatsapp#webhookPayload";

const stampPagination = (model: any): string => {
  const shapes = model?.shapes ?? {};
  let paginated = 0;
  for (const shape of Object.values<any>(shapes)) {
    if (shape?.type !== "operation") continue;
    const input = shape.input?.target ? shapes[shape.input.target] : undefined;
    const query = (name: string) =>
      Object.entries<any>(input?.members ?? {}).find(
        ([, m]) => m.traits?.[HTTP_QUERY_TRAIT] === name,
      )?.[0];
    const after = query("after");
    if (after === undefined) continue;
    const output = shape.output?.target ? shapes[shape.output.target] : undefined;
    const data = output?.members?.data;
    if (data === undefined || shapes[data.target]?.type !== "list") continue;
    if (output.members.paging === undefined) continue;
    const limit = query("limit");
    shape.traits ??= {};
    shape.traits[PAGINATED_TRAIT] = {
      mode: "cursor",
      inputToken: after,
      outputToken: "paging.cursors.after",
      items: "data",
      ...(limit ? { pageSize: limit } : {}),
    };
    paginated++;
  }
  return `paginated ${paginated} operation(s)`;
};

const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  // Binary members (multipart file parts, e.g. uploadMedia's `file`): the
  // REST protocol sends a File/Blob/bytes as a binary form part.
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

  // Sensitive strings: Redacted on the way out, `string | Redacted`
  // accepted on the way in (the REST protocol unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — wire names ARE
  // the TS names, so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  paginationProfiles: {
    cursor: {
      strategy: "paginateGraph",
      requires: () => ["inputToken", "outputToken"],
      itemsFallback: "data",
    },
  },

  extraRoots: (_operations, shapes) =>
    Object.entries<any>(shapes)
      .filter(([, shape]) => shape?.traits?.[WEBHOOK_PAYLOAD_TRAIT] !== undefined)
      .map(([id]) => id),

  operationDecl: {
    contextType: "WhatsAppOpContext",
    commonErrorType: "WhatsAppOpError",
    commonErrorClasses: ["UnknownWhatsAppError"],
    protocol: "WhatsAppProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-whatsapp/specs/openapi.yaml)",

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

runGeneratorCli({
  description: "Generate the WhatsApp Effect SDK from the Smithy model",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // Smithy-model patches are applied in convert (finalizeConvert).
  patchesDir: false,
  transformModel: (model) => stampPagination(model),
  spec: () => spec,
});
