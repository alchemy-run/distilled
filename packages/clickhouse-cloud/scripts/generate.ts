#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * ClickHouse Cloud Effect SDK.
 *
 * Input:  .generated-specs/<tag>.json  (one model per ClickHouse Cloud tag,
 *         written by scripts/convert.ts)
 * Output: src/services/<tag>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is ClickHouse Cloud's provider
 * spec: the `com.distilled.openapi` trait vocabulary (nullable members,
 * bare-body responses), per-arm union schemas, the cursor pagination
 * profile, and the protocol/retry/error names.
 *
 * ClickHouse Cloud's wire member names are already camelCase (`idleScaling`,
 * `keySecret`), so there is no memberName mapping. Module files are named
 * after the tag slug (`click_pipes.ts`) while the barrel exports them
 * camelCased (`clickPipes.createClickPipe`).
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `click_pipes` → `clickPipes` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** ClickHouse Cloud's provider spec for the shared smithy→SDK compiler. */
const clickHouseCloudSpec: SdkSpec = {
  // Wire names ARE the TS surface (camelCase already) — no renaming.
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

  // Sensitive strings — the `keySecret` a key creation answers with, service
  // and Postgres passwords, ClickPipes source credentials, backup bucket
  // secrets, ClickStack webhook URLs: Redacted wherever a response carries
  // one, `string | Redacted` accepted on the way in (the REST protocol
  // unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // `oneOf`/`anyOf` unions (ClickPipes sources, ClickStack sources, tiles
  // and webhooks, backup buckets per cloud) get a schema per arm. Wire names
  // equal the TS names, so nothing is renamed; the arms are what lets the
  // protocol wrap a sensitive member inside a union (a ClickStack webhook's
  // `url`) in Redacted, and what validating response modes check against.
  unionStyle: "untagged",

  // One pagination profile: cursor mode (inputToken `cursor`, outputToken
  // `nextCursor`, items `result`), traversed by core's paginateCursor. The
  // trait is a patch (patches/<model>/pagination.json). A page keeps the
  // `{ result, nextCursor }` envelope the strategy reads, so these
  // operations use the protocol that does not unwrap it.
  paginationProfiles: {
    cursor: {
      protocol: "ClickHouseCloudPaginatedProtocol",
      strategy: "paginateCursor",
      itemsFallback: "result",
    },
  },

  sourceNote: ".generated-specs (specs/spec-mirror-clickhouse-cloud/specs/openapi.json)",

  operationDecl: {
    contextType: "ClickHouseCloudOpContext",
    commonErrorType: "ClickHouseCloudOpError",
    // No per-operation error classes: every failure is the shared envelope,
    // so every status rides ClickHouseCloudOpError and the protocol picks
    // the class (see src/errors.ts).
    commonErrorClasses: ["UnknownClickHouseCloudError"],
    protocol: "ClickHouseCloudProtocol",
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

runGeneratorCli({
  description: "Generate the ClickHouse Cloud Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // Patches are Smithy ops applied by finalizeConvert in scripts/convert.ts;
  // generate only compiles the patched models.
  patchesDir: false,
  barrelExportName: camel,
  spec: () => clickHouseCloudSpec,
});
