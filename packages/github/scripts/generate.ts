#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the GitHub
 * Effect SDK.
 *
 * Input:  .generated-specs/<tag>.json  (one model per GitHub tag, written by
 *         scripts/convert.ts)
 * Output: src/services/<tag>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is GitHub's provider spec: the
 * `com.distilled.openapi` trait vocabulary (nullable members, bare-body
 * responses, error status matchers, sensitive strings), a passthrough union
 * style, and the protocol/retry/error names.
 *
 * GitHub keeps its wire member names verbatim (snake_case) on the TS surface.
 * Module files are named after the tag slug (`code_scanning.ts`) while the
 * barrel exports them camelCased (`codeScanning.listAlertsForRepo`),
 * the spelling GitHub's own clients use.
 *
 * List operations paginate (`page`/`per_page`; convert.ts stamps the
 * trait): `.pages(input)` / `.items(input)` follow the `Link` header's
 * `rel="next"` URL until it is absent.
 */
import { type OperationEmit, type SdkSpec } from "@distilled.cloud/dev/codegen/generator";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `code_scanning` → `codeScanning` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** GitHub's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  paginationProfiles: {
    link: { strategy: "paginateLink" },
  },

  // Wire names ARE the TS surface (snake_case) — no renaming.
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for bare array/scalar response
      // bodies — and GitHub's list endpoints are almost all bare arrays: as
      // a response's sole member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Sensitive strings (tokens, client secrets, private keys): Redacted on the
  // way out, `string | Redacted` accepted on the way in (the REST protocol
  // unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // GitHub's oneOf/anyOf unions (nullable alternates, `simple-user | team`
  // actors, webhook config variants) are decoded passthrough: the TS type is
  // the case union, the schema stays opaque — the API returns one arm's
  // plain value, not an all-keys-with-nulls merge, so no runtime case
  // discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  sourceNote: ".generated-specs (specs/rest-api-description)",

  operationDecl: {
    contextType: "GithubOpContext",
    commonErrorType: "GithubOpError",
    // Per-op error lists carry exactly the statuses the spec declares
    // (400/403/404/409/410/422); everything else rides GithubOpError.
    commonErrorClasses: [],
    protocol: "GithubProtocol",
    retry: "Retry.Retry",
  },

  // `effect/Redacted` is only referenced by modules with sensitive members —
  // import it exactly there. With commonErrorClasses empty the default
  // header's `import { } from "../errors.ts"` is dead weight — drop it.
  postProcess: (code) => {
    let out = code.replace(/import \{\s*\} from "\.\.\/errors\.ts";\n/, "");
    if (out.includes("Redacted.Redacted<")) {
      out = out.replace(
        `import * as S from "@distilled.cloud/core/schema-lite";`,
        `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";`,
      );
    }
    return out;
  },
};

const WEBHOOK_EVENT_TRAIT = "com.distilled.github#webhookEvent";

/**
 * The webhooks model (see convert.ts) has no operations: its payload shapes,
 * tagged with their `X-GitHub-Event` name and action, are the roots. The
 * module closes with a `WebhookEvents` map from event name to the union of
 * its payloads — what a webhook receiver narrows a delivery with.
 */
const webhooksSpec = (model: any): SdkSpec => {
  const events = new Map<string, string[]>();
  const roots: string[] = [];
  for (const [id, shape] of Object.entries<any>(model.shapes)) {
    const meta = shape.traits?.[WEBHOOK_EVENT_TRAIT];
    if (!meta) continue;
    roots.push(id);
    const name = id.slice(id.indexOf("#") + 1);
    events.set(meta.event, [...(events.get(meta.event) ?? []), name]);
  }
  const entries = [...events.entries()].sort(([a], [b]) => a.localeCompare(b));
  const map = [
    "",
    "/** Every webhook payload GitHub delivers, keyed by the `X-GitHub-Event` header. */",
    "export interface WebhookEvents {",
    ...entries.map(([event, names]) => `  ${JSON.stringify(event)}: ${names.sort().join(" | ")};`),
    "}",
    "",
    "/** A webhook event name (the `X-GitHub-Event` header). */",
    "export type WebhookEventName = keyof WebhookEvents;",
    "",
  ].join("\n");
  return {
    ...spec,
    extraRoots: () => roots,
    postProcess: (code) => spec.postProcess!(code) + map,
  };
};

/**
 * Operations whose `Accept` header selects a text media type (see
 * convert.ts) return the JSON object OR the text. Type them as two
 * overloads so the result follows the request: no `accept` (or the JSON
 * media type) returns the object, a text media type returns `string`.
 */
const mediaTypeOverloads = (model: any) => {
  const shapes: Record<string, any> = model.shapes;
  const local = (id: string) => id.slice(id.indexOf("#") + 1);
  const byInput = new Map<string, { json: string; text: string[] }>();
  for (const shape of Object.values<any>(shapes)) {
    if (shape.type !== "operation") continue;
    const input = shapes[shape.input?.target];
    const accept = Object.values<any>(input?.members ?? {}).find(
      (member) => member.traits?.["smithy.api#httpHeader"] === "Accept",
    );
    if (!accept) continue;
    const body = Object.values<any>(shapes[shape.output?.target]?.members ?? {})[0];
    const cases = Object.values<any>(shapes[body?.target]?.members ?? {}).map((m) => m.target);
    const json = cases.find((target: string) => target !== "smithy.api#String");
    const text = Object.values<any>(shapes[accept.target]?.members ?? {})
      .map((member) => member.traits?.["smithy.api#enumValue"] as string)
      .filter((value) => value !== "application/vnd.github+json");
    if (json && cases.includes("smithy.api#String") && text.length > 0) {
      byInput.set(local(shape.input.target), { json: local(json), text });
    }
  }
  return (ctx: OperationEmit) => {
    const media = byInput.get(ctx.inputName);
    if (!media) return undefined;
    const method = (accept: string, output: string) =>
      `API.OperationMethod<\n  ${ctx.inputName} & { readonly accept${accept} },\n  ${output},\n  ${ctx.opName}Error,\n  GithubOpContext\n>`;
    return {
      typeAnnotation: `${method('?: "application/vnd.github+json"', media.json)} &\n  ${method(
        `: ${media.text.map((type) => JSON.stringify(type)).join(" | ")}`,
        "string",
      )}`,
    };
  };
};

runGeneratorCli({
  description: "Generate the GitHub Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // The RFC-6902 patch chain in patches/ applies to the OpenAPI document in
  // scripts/convert.ts — never to the Smithy models.
  patchesDir: false,
  barrelExportName: camel,
  spec: (model) =>
    Object.values<any>(model.shapes).some((shape) => shape.traits?.[WEBHOOK_EVENT_TRAIT])
      ? webhooksSpec(model)
      : {
          ...spec,
          operationDecl: { ...spec.operationDecl!, overrides: mediaTypeOverloads(model) },
        },
});
