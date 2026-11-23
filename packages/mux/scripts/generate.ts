#!/usr/bin/env -S node --conditions=bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the Mux
 * Effect SDK.
 *
 * Input:  .generated-specs/{video,data,system,robots}.json
 *         (written by scripts/convert.ts)
 * Output: src/services/{video,data,system,robots}.ts  +  src/services/index.ts
 *
 * Mux keeps the wire's snake_case member names on the TS surface — the
 * spelling its API reference uses — so there is no member renaming.
 *
 * PAGINATION. Mux lists page by NUMBER: `?page=N&limit=M` in, `{ data: [...] }`
 * out, with no next-page token or total to stop on (a few Data lists add
 * `total_row_count`, most do not). {@link stampPagination} marks every
 * operation that takes a `page` query member and returns a `data` list, and
 * src/pagination.ts's `paginatePage` walks it the way Mux's official SDKs do:
 * `page`, `page+1`, … until a page comes back empty.
 */
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const PAGINATED_TRAIT = "smithy.api#paginated";
const HTTP_QUERY_TRAIT = "smithy.api#httpQuery";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

const stampPagination = (model: any): string => {
  const shapes = model?.shapes ?? {};
  const paginated: string[] = [];

  for (const [id, shape] of Object.entries<any>(shapes)) {
    if (shape?.type !== "operation") continue;

    const input = shape.input?.target ? shapes[shape.input.target] : undefined;
    const pageMember = Object.entries<any>(input?.members ?? {}).find(
      ([, m]) => m.traits?.[HTTP_QUERY_TRAIT] === "page",
    );
    if (pageMember === undefined) continue;
    const limitMember = Object.entries<any>(input.members).find(
      ([, m]) => m.traits?.[HTTP_QUERY_TRAIT] === "limit",
    );

    const output = shape.output?.target ? shapes[shape.output.target] : undefined;
    const data = output?.members?.data;
    if (data === undefined || shapes[data.target]?.type !== "list") {
      throw new Error(`${id}: takes \`page\` but returns no \`data\` list`);
    }

    shape.traits ??= {};
    shape.traits[PAGINATED_TRAIT] = {
      mode: "page",
      inputToken: pageMember[0],
      items: "data",
      ...(limitMember ? { pageSize: limitMember[0] } : {}),
    };
    paginated.push(id.split("#").pop()!);
  }

  return `paginated ${paginated.length} operation(s)`;
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

  // Sensitive strings (live stream keys, signing-key private keys, SRT
  // passphrases, simulcast stream keys): Redacted on the way out,
  // `string | Redacted` accepted on the way in (the REST protocol unwraps).
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
    page: {
      strategy: "paginatePage",
      requires: () => ["inputToken", "items"],
      itemsFallback: "data",
    },
  },

  operationDecl: {
    contextType: "MuxOpContext",
    commonErrorType: "MuxOpError",
    serviceErrors: "MuxServiceErrors",
    protocol: "MuxProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-mux/specs/api-spec.json)",

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
  description: "Generate the Mux Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // Smithy-model patches are applied in convert (finalizeConvert).
  patchesDir: false,
  transformModel: (model) => stampPagination(model),
  spec: () => spec,
});
