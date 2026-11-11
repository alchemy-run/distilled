#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * Polymarket Effect SDK.
 *
 * Input:  .generated-specs/<api>.json  (one model per API, written by
 *         scripts/convert.ts)
 * Output: src/services/<api>.ts  +  src/services/index.ts
 *
 * Every API lives on its own host, so each module calls its own protocol
 * (`GammaProtocol`, `ClobProtocol`, ...; see src/protocol.ts). Wire member
 * names are kept verbatim (`token_id`, `next_cursor`), the spelling
 * Polymarket's docs use. Module files are named after the API
 * (`combos-rfq.ts`) while the barrel exports them camelCased
 * (`combosRfq.getComboMarkets`).
 */
import { type SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `combos-rfq` → `combosRfq` (the barrel's export name). */
const camel = (name: string): string =>
  name
    .split(/[-_]/)
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** Model namespace (`com.polymarket.combosrfq`) → protocol const. */
const PROTOCOLS: Readonly<Record<string, string>> = {
  "com.polymarket.gamma": "GammaProtocol",
  "com.polymarket.clob": "ClobProtocol",
  "com.polymarket.data": "DataProtocol",
  "com.polymarket.relayer": "RelayerProtocol",
  "com.polymarket.bridge": "BridgeProtocol",
  "com.polymarket.combosrfq": "CombosRfqProtocol",
  "com.polymarket.perps": "PerpsProtocol",
};

const protocolFor = (model: any): string => {
  for (const id of Object.keys(model.shapes ?? {})) {
    const protocol = PROTOCOLS[id.split("#")[0] ?? ""];
    if (protocol !== undefined) return protocol;
  }
  throw new Error("Polymarket model with no known namespace — add it to PROTOCOLS");
};

const specFor = (model: any): SdkSpec => ({
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

  // Sensitive strings: Redacted on the way out, `string | Redacted`
  // accepted on the way in (the REST protocol unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema: the protocol
  // passes union content through verbatim.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  sourceNote: ".generated-specs (specs/spec-mirror-polymarket/specs/)",

  operationDecl: {
    contextType: "PolymarketOpContext",
    commonErrorType: "PolymarketOpError",
    commonErrorClasses: ["UnknownPolymarketError"],
    protocol: protocolFor(model),
    retry: "Retry.Retry",
  },

  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema-lite";`,
          `import * as S from "@distilled.cloud/core/schema-lite";\nimport * as Redacted from "effect/Redacted";`,
        )
      : code,
});

runGeneratorCli({
  description: "Generate the Polymarket Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  patchesDir: false,
  barrelExportName: camel,
  spec: specFor,
});
