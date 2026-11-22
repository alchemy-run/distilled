#!/usr/bin/env -S node --conditions=bun
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
/**
 * generate — turn the Smithy JSON models in .generated-specs into the UniFi
 * Effect SDK.
 *
 * Input:  .generated-specs/<model>.json  (written by scripts/convert.ts)
 * Output: src/services/<model>.ts  +  src/services/index.ts
 *         for network, protect, innerspace (console-hosted apps, reached
 *         locally or through the cloud connector) and mobility, site_manager,
 *         carrier_fabric (served by api.ui.com alone).
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is UniFi's provider spec. UniFi
 * keeps the wire's camelCase member names on the TS surface, so no member
 * renaming or wire dictionaries appear here. The services differ only in the
 * protocol (base URL and credentials) and the context their operations need.
 *
 * PAGINATION. Network and Mobility lists take `offset` and `limit` and answer
 * `{ data: [...] }` (Network adds `totalCount`). There is no next-page token,
 * so the converter's `detectPagination` never fires and
 * {@link stampPagination} marks those operations directly. Site Manager
 * (`nextToken`) and Carrier Fabric (`meta.nextCursor`) page by token and are
 * left to the converter.
 */
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/dev/codegen/openapi";

const PAGINATED_TRAIT = "smithy.api#paginated";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `site_manager` → `siteManager` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/**
 * Stamp `smithy.api#paginated` on the lists the converter's detection misses:
 *
 *   - `offset` + `limit` in, a `data` list out (Network, Mobility).
 *     `totalCount`, when the output has it, ends the traversal; otherwise a
 *     short page does.
 *   - `cursor` + `limit` in, a `data` list and `meta.nextCursor` out
 *     (Carrier Fabric).
 */
const stampPagination = (model: any): string => {
  const shapes = model?.shapes ?? {};
  const paginated: string[] = [];
  const skipped: string[] = [];

  for (const [id, shape] of Object.entries<any>(shapes)) {
    if (shape?.type !== "operation") continue;

    const input = shape.input?.target ? shapes[shape.input.target] : undefined;
    const byOffset = input?.members?.offset && input?.members?.limit;
    const byCursor = input?.members?.cursor && input?.members?.limit;
    if (!byOffset && !byCursor) continue;

    const output = shape.output?.target ? shapes[shape.output.target] : undefined;
    const members: Record<string, any> = output?.members ?? {};
    const name = id.split("#").pop()!;
    if (shapes[members.data?.target]?.type !== "list") {
      skipped.push(name);
      continue;
    }

    shape.traits ??= {};
    shape.traits[PAGINATED_TRAIT] = byOffset
      ? {
          inputToken: "offset",
          // Not a token: the collection's size. `paginateOffset` stops once
          // the offset reaches it.
          outputToken: members.totalCount ? "totalCount" : undefined,
          items: "data",
          pageSize: "limit",
        }
      : {
          mode: "cursor",
          inputToken: "cursor",
          outputToken: "meta.nextCursor",
          items: "data",
          pageSize: "limit",
        };
    paginated.push(name);
  }

  return `paginated ${paginated.length} operation(s); ${skipped.length} with offset|cursor/limit left unpaginated (${skipped.join(", ")})`;
};

const namespaceOf = (model: any): string => {
  for (const id of Object.keys(model?.shapes ?? {})) {
    const ns = String(id).split("#")[0] ?? "";
    if (ns.startsWith("com.ui.")) return ns;
  }
  throw new Error("model has no com.ui.* shapes");
};

const base: SdkSpec = {
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

  // Sensitive strings (Wi-Fi passphrases): the schema member carries
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
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  paginationProfiles: {
    offset: {
      strategy: "paginateOffset",
      // `outputToken` (`totalCount`) is absent on Mobility, where a short
      // page ends the traversal.
      requires: () => ["inputToken", "items"],
      itemsFallback: "data",
    },
    // Token and cursor pages: core's strategies.
    token: { itemsFallback: "data" },
  },
  paginationProfileFor: (trait) => (trait.inputToken === "offset" ? "offset" : "token"),

  operationDecl: {
    contextType: "UniFiConsoleOpContext",
    commonErrorType: "UniFiOpError",
    serviceErrors: "UniFiServiceErrors",
    protocol: "UniFiNetworkProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-unifi)",

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

const operationDecl = (contextType: string, protocol: string): SdkSpec["operationDecl"] => ({
  contextType,
  commonErrorType: "UniFiOpError",
  serviceErrors: "UniFiServiceErrors",
  protocol,
  retry: "Retry.Retry",
});

const consoleSpec = (protocol: string): SdkSpec => ({
  ...base,
  operationDecl: operationDecl("UniFiConsoleOpContext", protocol),
});

const cloud: SdkSpec = {
  ...base,
  operationDecl: operationDecl("UniFiCloudOpContext", "UniFiCloudProtocol"),
};

const specs: Record<string, SdkSpec> = {
  "com.ui.network": consoleSpec("UniFiNetworkProtocol"),
  "com.ui.protect": consoleSpec("UniFiProtectProtocol"),
  "com.ui.innerspace": consoleSpec("UniFiInnerSpaceProtocol"),
  "com.ui.mobility": cloud,
  "com.ui.sitemanager": cloud,
  "com.ui.carrierfabric": cloud,
};

runGeneratorCli({
  description: "Generate the UniFi Effect SDK from the Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  // Smithy-model patches are applied in convert (finalizeConvert).
  patchesDir: false,
  barrelExportName: camel,
  transformModel: (model) => stampPagination(model),
  spec: (model) => {
    const spec = specs[namespaceOf(model)];
    if (spec === undefined) throw new Error(`no UniFi spec for ${namespaceOf(model)}`);
    return spec;
  },
});
