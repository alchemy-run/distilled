#!/usr/bin/env -S node --conditions=bun
import * as fs from "node:fs";
import * as path from "node:path";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
/**
 * generate — turn the per-service Smithy JSON models in .generated-specs
 * into the Azure Effect SDK.
 *
 * Input:  .generated-specs/<service>.json  (written by scripts/convert.ts)
 * Output: src/services/<service>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Azure's provider spec.
 *
 * v0 parity notes:
 *   • operation exports keep the ARM operationId casing
 *     (`VirtualMachinesGet`, not `virtualMachinesGet`) — v0's
 *     `toCamelCase(operationId)` preserved the leading capital
 *   • generated ops carry NO per-op error unions
 *     (`includeOperationErrors=false` in v0); every failure is matched by
 *     the protocol against `AZURE_ERROR_CODE_MAP` / the HTTP status map
 *   • no pagination profiles — v0 emitted zero paginated ops (ARM's
 *     `nextLink` isn't a recognized pagination pattern); list ops return
 *     `{ value, nextLink? }` and consumers page manually
 *   • the operation's `T.Http` trait carries the baked `apiVersion`
 *     (folded in by convert.ts); the protocol appends `?api-version=`
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import {
  applyOperation,
  isStaleTargetError,
  type PatchFile,
} from "@distilled.cloud/core/json-patch";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Azure's provider spec for the shared smithy→SDK compiler. */
const azureSpec: SdkSpec = {
  // v0 kept `toCamelCase(operationId)` (leading capital preserved for ARM's
  // `Group_Operation` ids) as the exported const name.
  opExportName: (n) => n,

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

  // Sensitive strings (passwords, connection strings, access keys): the
  // schema member carries T.SensitiveValue; the protocol delivers Redacted
  // values and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the protocol
  // passes union content through verbatim.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  operationDecl: {
    contextType: "AzureOpContext",
    commonErrorType: "AzureOpError",
    commonErrorClasses: ["UnknownAzureError"],
    protocol: "AzureProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/azure-rest-api-specs)",

  // Sensitive member types reference Redacted; pull the import in when used.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";\n`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

/**
 * A label that is the whole leading path segment (`/{scope}/providers/…`,
 * `/{resourceUri}/…`, `/{roleAssignmentId}`) carries a full ARM id such as
 * `/subscriptions/{id}/resourceGroups/{rg}` — the specs mark these
 * `x-ms-skip-url-encoding`. Rewrite them to greedy `{name+}` labels so the
 * request builder keeps their `/` separators.
 */
const markScopeLabelsGreedy = (model: any): void => {
  for (const shape of Object.values<any>(model.shapes ?? {})) {
    const http = shape?.traits?.["smithy.api#http"];
    if (typeof http?.uri !== "string") continue;
    http.uri = http.uri.replace(/^\/\{([A-Za-z0-9_]+)\}(?=\/|$)/, "/{$1+}");
  }
};

/**
 * Apply `patches/<service>/*.json` (RFC 6902 against the Smithy model,
 * `*.manual.json` last) at generate time, so a fix lands by regenerating
 * one service without re-converting the spec mirror. A stale or failing
 * patch fails the run.
 */
const applyServicePatches = (model: any, service: string): void => {
  const dir = path.join(import.meta.dirname, "..", "patches", service);
  if (!fs.existsSync(dir)) return;
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort(
      (a, b) =>
        Number(a.endsWith(".manual.json")) - Number(b.endsWith(".manual.json")) ||
        a.localeCompare(b),
    );
  for (const file of files) {
    const parsed = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")) as PatchFile;
    for (const op of parsed.patches ?? []) {
      try {
        applyOperation(model, op);
      } catch (e) {
        const kind = isStaleTargetError(e) ? "stale target" : "failed";
        throw new Error(
          `patches/${service}/${file} [${op.op} ${op.path}]: ${kind}: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    }
  }
};

runGeneratorCli({
  description: "Generate the Azure Effect SDK from the Smithy models",
  root: `${import.meta.dirname}/..`,
  // Azure ships no patches (v0 parity — packages/azure/patches did not
  // exist; all correction logic lives in convert.ts's ref-resolution and
  // merging preprocessing).
  patchesDir: false,
  transformModel: (model, resource) => {
    applyServicePatches(model, resource);
    markScopeLabelsGreedy(model);
  },
  spec: () => azureSpec,
});
