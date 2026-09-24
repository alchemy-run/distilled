#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * Mailchimp Effect SDK.
 *
 * Input:  .generated-specs/marketing.json       (written by scripts/convert.ts)
 *         .generated-specs/transactional.json
 * Output: src/services/marketing.ts  +  src/services/transactional.ts
 *         +  src/services/index.ts
 *
 * PAGINATION. The Marketing API pages with `count`/`offset` in and
 * `{ <collection>: [...], total_items }` out, where the collection member is
 * named after the resource (`members`, `lists`, `merge_fields`). There is no
 * next-page token, so the converter's `detectPagination` never fires and
 * {@link stampPagination} marks the operations directly.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const PAGINATED_TRAIT = "smithy.api#paginated";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Stamp `smithy.api#paginated` on every operation that takes both `count` and
 * `offset` and returns exactly one list member besides `_links`.
 *
 * The list-member test matters: `getListAbuseReportDetails` accepts
 * `count`/`offset` but returns a single record, and paginating it would
 * re-request the same record until the stream was cancelled.
 */
const stampPagination = (model: any): string => {
  const shapes = model?.shapes ?? {};
  const paginated: string[] = [];
  const skipped: string[] = [];

  for (const [id, shape] of Object.entries<any>(shapes)) {
    if (shape?.type !== "operation") continue;

    const input = shape.input?.target ? shapes[shape.input.target] : undefined;
    if (!input?.members?.count || !input?.members?.offset) continue;

    const output = shape.output?.target
      ? shapes[shape.output.target]
      : undefined;
    const members: Record<string, any> = output?.members ?? {};
    const lists = Object.entries(members).filter(
      ([name, m]) => name !== "_links" && shapes[m.target]?.type === "list",
    );
    if (lists.length !== 1) {
      skipped.push(id.split("#").pop()!);
      continue;
    }

    shape.traits ??= {};
    shape.traits[PAGINATED_TRAIT] = {
      inputToken: "offset",
      // Not a token: the collection's size. `paginateOffset` stops once the
      // offset reaches it. Absent on a handful of feeds (activity-feed),
      // where a short page is the only end marker.
      outputToken: members.total_items ? "total_items" : undefined,
      items: lists[0]![0],
      pageSize: "count",
    };
    paginated.push(id.split("#").pop()!);
  }

  return `paginated ${paginated.length} operation(s); ${skipped.length} with count/offset left unpaginated (${skipped.join(", ")})`;
};

const namespaceOf = (model: any): string => {
  for (const id of Object.keys(model?.shapes ?? {})) {
    const ns = String(id).split("#")[0] ?? "";
    if (ns.startsWith("com.mailchimp.")) return ns;
  }
  throw new Error("model has no com.mailchimp.* shapes");
};

const marketingSpec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,
  // The document carries no `x-nullable` markers, so an undocumented `null`
  // on a read would otherwise fail the whole decode. Response-side only.
  optionalsNullable: true,

  extraBindings: [
    {
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  paginationProfiles: {
    offset: {
      strategy: "paginateOffset",
      itemsFallback: "items",
    },
  },

  operationDecl: {
    contextType: "MailchimpOpContext",
    commonErrorType: "MailchimpOpError",
    commonErrorClasses: ["MailchimpApiError", "UnknownMailchimpError"],
    protocol: "MailchimpProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-mailchimp)",
};

const transactionalSpec: SdkSpec = {
  ...marketingSpec,
  paginationProfiles: {},
  operationDecl: {
    contextType: "MailchimpTransactionalOpContext",
    commonErrorType: "MailchimpTransactionalOpError",
    commonErrorClasses: [
      "MailchimpTransactionalError",
      "UnknownMailchimpError",
    ],
    protocol: "MailchimpTransactionalProtocol",
    retry: "Retry.Retry",
  },
};

runGeneratorCli({
  description: "Generate the Mailchimp Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  // patches/ holds OpenAPI-document patches consumed by scripts/convert.ts.
  patchesDir: false,
  transformModel: (model, resource) =>
    resource === "marketing" ? stampPagination(model) : undefined,
  spec: (model) =>
    namespaceOf(model) === "com.mailchimp.transactional"
      ? transactionalSpec
      : marketingSpec,
});
