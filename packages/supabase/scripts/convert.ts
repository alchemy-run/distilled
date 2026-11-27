#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Supabase Management API OpenAPI spec into a Smithy 2.0
 * JSON model.
 *
 * Input:  specs/spec-mirror-supabase/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document —
 *         ported verbatim from distilled v0; they add observed 400/404/403
 *         error responses that feed the per-op typed error unions)
 * Output: .generated-specs/supabase.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is Supabase's
 * pipeline config. `scripts/generate.ts` compiles the model into
 * src/services.
 *
 * Operations the spec marks `x-scalar-stability: experimental`, or badges
 * Beta or Alpha in `x-badges`, are marked `smithy.api#unstable`, so generate
 * writes them to src/unstable-services (`@distilled.cloud/supabase/unstable/supabase`)
 * and the rest to src/services. A patch can remove the mark from one
 * operation. `x-internal` is not a stability signal.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

/** The docs' pre-GA badges; the other badges name an OAuth scope or a plan. */
const UNSTABLE_BADGES = new Set(["Alpha", "Beta"]);

const isUnstable = (op: Record<string, any>): boolean =>
  op["x-scalar-stability"] === "experimental" ||
  (Array.isArray(op["x-badges"]) &&
    op["x-badges"].some((badge: any) => UNSTABLE_BADGES.has(badge?.name)));

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "supabase",
      specPath: "specs/spec-mirror-supabase/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.supabase.api",
    serviceName: "Supabase",
    // v0 parity: includeOperationErrors=true with the default status→class
    // map and default error statuses (401/429/500/503 covered globally).
    skipDeprecated: true,
    unstableOperation: isUnstable,
  },
});
