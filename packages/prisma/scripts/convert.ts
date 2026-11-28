#!/usr/bin/env -S node --conditions=bun
/**
 * convert — the Prisma Management API OpenAPI 3.1 spec → a Smithy
 * JSON model in .generated-specs/.
 *
 * The OpenAPI→Smithy compiler and pipeline live in
 * `@distilled.cloud/dev/codegen`; this script is Prisma's provider spec
 * around it. Mirrors distilled v0's scripts/generate.ts defaults: patches
 * from patches/ applied to the OpenAPI document first (v0's 422/404 error
 * responses missing from the upstream spec), typed per-op errors via the
 * default status→class map, deprecated operations skipped.
 *
 * Note: the API paginates by cursor on the wire (`pagination.nextCursor` in
 * list responses) but v0 emitted plain operations only, and the converter's
 * v0-parity detection rules (`pagination.cursor` / `.next` / `.next_page`)
 * don't match `nextCursor` — so no `smithy.api#paginated` traits are
 * emitted, mirroring v0.
 *
 * Operations the spec marks `x-prisma-stability: experimental` or tags
 * `[Experimental]` are marked `smithy.api#unstable`, so generate writes them
 * to src/unstable-services (`@distilled.cloud/prisma/unstable/management`)
 * and the rest to src/services. A patch can remove the mark from one
 * operation.
 */
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

const isExperimental = (op: Record<string, any>): boolean =>
  op["x-prisma-stability"] === "experimental" ||
  (Array.isArray(op.tags) && op.tags.includes("[Experimental]"));

await runOpenApiConvert({
  root: `${import.meta.dirname}/..`,
  specs: [
    {
      name: "management",
      specPath: "specs/spec-mirror-prisma-postgres/specs/openapi.json",
    },
  ],
  options: {
    namespace: "com.prisma",
    serviceName: "Prisma",
    unstableOperation: isExperimental,
  },
});
