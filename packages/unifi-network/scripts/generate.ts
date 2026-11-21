#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * UniFi Network Effect SDK.
 *
 * Input:  .generated-specs/unifiNetwork.json  (written by scripts/convert.ts)
 * Output: src/services/unifiNetwork.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is UniFi Network's provider
 * spec. UniFi keeps the wire's camelCase member names on the TS surface, so
 * no member renaming or wire dictionaries appear here.
 *
 * PAGINATION. Every list answers
 * `{ offset, limit, count, totalCount, data: [...] }` and takes `offset` and
 * `limit`. There is no next-page token, so the converter's
 * `detectPagination` never fires and {@link stampPagination} marks the
 * operations directly.
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const PAGINATED_TRAIT = "smithy.api#paginated";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/**
 * Stamp `smithy.api#paginated` on every operation that takes `offset` and
 * `limit` and whose output carries both a `data` list and `totalCount`.
 */
const stampPagination = (model: any): string => {
  const shapes = model?.shapes ?? {};
  const paginated: string[] = [];
  const skipped: string[] = [];

  for (const [id, shape] of Object.entries<any>(shapes)) {
    if (shape?.type !== "operation") continue;

    const input = shape.input?.target ? shapes[shape.input.target] : undefined;
    if (!input?.members?.offset || !input?.members?.limit) continue;

    const output = shape.output?.target ? shapes[shape.output.target] : undefined;
    const members: Record<string, any> = output?.members ?? {};
    const name = id.split("#").pop()!;
    if (!members.totalCount || shapes[members.data?.target]?.type !== "list") {
      skipped.push(name);
      continue;
    }

    shape.traits ??= {};
    shape.traits[PAGINATED_TRAIT] = {
      inputToken: "offset",
      // Not a token: the collection's size. `paginateOffset` stops once the
      // offset reaches it.
      outputToken: "totalCount",
      items: "data",
      pageSize: "limit",
    };
    paginated.push(name);
  }

  return `paginated ${paginated.length} operation(s); ${skipped.length} with offset/limit left unpaginated (${skipped.join(", ")})`;
};

const spec: SdkSpec = {
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

  // Sensitive strings (Wi-Fi passphrases, RADIUS/VPN secrets, voucher codes):
  // the schema member carries T.SensitiveValue; the REST protocol delivers
  // Redacted values and accepts string | Redacted on input.
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
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  paginationProfiles: {
    offset: {
      strategy: "paginateOffset",
      requires: () => ["inputToken", "outputToken", "items"],
      itemsFallback: "data",
    },
  },

  operationDecl: {
    contextType: "UniFiNetworkOpContext",
    commonErrorType: "UniFiNetworkOpError",
    commonErrorClasses: ["UnknownUniFiNetworkError"],
    protocol: "UniFiNetworkProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-unifi-network)",

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
  description: "Generate the UniFi Network Effect SDK from the Smithy model",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // Smithy-model patches are applied in convert (finalizeConvert).
  patchesDir: false,
  transformModel: (model) => stampPagination(model),
  spec: () => spec,
});
