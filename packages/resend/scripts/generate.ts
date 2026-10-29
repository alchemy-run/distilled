#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON model in .generated-specs into the Resend
 * Effect SDK.
 *
 * Input:  .generated-specs/resend.json  (written by scripts/convert.ts)
 * Output: src/services/resend.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is Resend's provider spec.
 * Resend keeps the wire's snake_case member names on the TS surface, so no
 * member renaming or wire dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";
const PAGINATED_TRAIT = "smithy.api#paginated";

/** Resend's provider spec for the shared smithy→SDK compiler. */
const resendSpec: SdkSpec = {
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

  // Sensitive strings (API keys): the schema member carries T.SensitiveValue;
  // the REST protocol delivers Redacted values and accepts string | Redacted
  // on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names for Resend), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // Resend lists by cursor (`after`/`limit` in, `has_more` + last `data[].id`
  // out). The shared OpenAPI converter only detects `pagination.cursor` /
  // `.next` / `.next_page`, so the trait is stamped below. Core's
  // paginateCursor would look for an output token field that Resend does not
  // send; Resend's strategy uses the last item's `id` while `has_more` is true.
  paginationProfiles: {
    cursor: {
      strategy: "paginateResend",
      itemsFallback: "data",
    },
  },

  operationDecl: {
    contextType: "ResendOpContext",
    commonErrorType: "ResendOpError",
    commonErrorClasses: ["UnknownResendError"],
    protocol: "ResendProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-resend)",

  // Sensitive member types reference Redacted; pull the import in when used.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";\n`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

const WEBHOOK_EVENT_TRAIT = "com.distilled.resend#webhookEvent";

/**
 * The webhook_events model (see convert.ts) has no operations: its payload
 * shapes, tagged with their event name, are the roots. The module closes
 * with the `WebhookEvent` union, which a receiver narrows on `type`, and a
 * `WebhookEvents` map from event name to payload.
 */
const webhookEventsSpec = (model: any): SdkSpec => {
  const events: Array<[event: string, name: string]> = [];
  for (const [id, shape] of Object.entries<any>(model.shapes)) {
    const meta = shape.traits?.[WEBHOOK_EVENT_TRAIT];
    if (meta) events.push([meta.event, id.slice(id.indexOf("#") + 1)]);
  }
  events.sort(([a], [b]) => a.localeCompare(b));
  const tail = [
    "",
    "/** Every event Resend delivers to a webhook endpoint, discriminated on `type`. */",
    "export type WebhookEvent =",
    ...events.map(([, name]) => `  | ${name}`),
    ";",
    "",
    "/** Every webhook payload, keyed by its event name (the payload's `type`). */",
    "export interface WebhookEvents {",
    ...events.map(([event, name]) => `  ${JSON.stringify(event)}: ${name};`),
    "}",
    "",
    "/** A webhook event name. */",
    "export type WebhookEventType = keyof WebhookEvents;",
    "",
  ].join("\n");
  return {
    ...resendSpec,
    // No operations, so nothing reads the error classes.
    operationDecl: { ...resendSpec.operationDecl!, commonErrorClasses: [] },
    extraRoots: () => events.map(([, name]) => `com.resend.webhooks#${name}`),
    postProcess: (code) => resendSpec.postProcess!(code) + tail,
  };
};

runGeneratorCli({
  description: "Generate the Resend Effect SDK from the Smithy model",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // scripts/convert.ts applies patches/ to the model; nothing to apply here.
  patchesDir: false,
  spec: (model) => {
    const shapes = (model.shapes ?? {}) as Record<string, any>;
    if (Object.values(shapes).some((shape) => shape?.traits?.[WEBHOOK_EVENT_TRAIT])) {
      return webhookEventsSpec(model);
    }
    for (const shape of Object.values(shapes)) {
      if (shape?.type !== "operation") continue;
      if (shape.traits?.[PAGINATED_TRAIT]) continue;
      const input = shapes[shape.input?.target];
      const output = shapes[shape.output?.target];
      if (!input?.members?.after || !output?.members?.data) continue;
      if (!output.members.has_more) continue;
      shape.traits ??= {};
      shape.traits[PAGINATED_TRAIT] = {
        mode: "cursor",
        inputToken: "after",
        items: "data",
        hasNextPage: "has_more",
        ...(input.members.limit ? { pageSize: "limit" } : {}),
      };
    }
    return resendSpec;
  },
});
