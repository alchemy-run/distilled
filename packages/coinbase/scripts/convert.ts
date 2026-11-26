#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Coinbase CDP OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-coinbase/specs/openapi.yaml  (spec submodule — YAML, parsed with
 *         the `yaml` package; distilled v0 dumped a temporary openapi.json instead)
 * Output: .generated-specs/cdp.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is Coinbase's
 * pipeline config. v0 parity notes:
 *
 *  - `skipDeprecated: true` (the v0 generator flag)
 *  - `statusToErrorClass: {}` reproduces v0's `includeOperationErrors: false`
 *    — Coinbase CDP errors are dispatched globally by errorType / HTTP
 *    status in src/protocol.ts, so no per-op error classes are generated
 *  - no patches yet: finalizeConvert applies Smithy patches from
 *    `patches/` once that directory exists
 *
 * Coinbase gives each top-level tag an SLO tier (`x-slo-tier: { tier: beta }`
 * or `ga`). An operation whose tag is `beta` is marked `smithy.api#unstable`,
 * so generate writes it to `unstable/cdp` and the rest to the stable `cdp`
 * module.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { parse as parseYaml } from "yaml";

/** Top-level tag name → its `x-slo-tier.tier`, filled from the spec below. */
const tagTiers = new Map<string, unknown>();

/** An operation in a tag Coinbase tiers `beta`. */
const isBeta = (op: Record<string, any>): boolean =>
  Array.isArray(op.tags) && op.tags.some((tag: string) => tagTiers.get(tag) === "beta");

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "cdp",
      specPath: "specs/spec-mirror-coinbase/specs/openapi.yaml",
      preprocess: (spec) => {
        for (const tag of spec.tags ?? []) tagTiers.set(tag?.name, tag?.["x-slo-tier"]?.tier);
      },
    },
  ],
  parse: (text) => parseYaml(text),
  options: {
    namespace: "com.coinbase.cdp",
    serviceName: "Cdp",
    skipDeprecated: true,
    unstableOperation: isBeta,
    // Global error model (v0's includeOperationErrors: false).
    statusToErrorClass: {},
    // `token` is a crypto asset here, never a credential.
    notSecretNouns: ["token"],
  },
});
