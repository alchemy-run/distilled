import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PlatformPlacementsPostInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    compute: Schema.optional(
      Schema.Struct({
        cpu_kind: Schema.optional(Schema.String),
        cpus: Schema.optional(Schema.Number),
        gpu_kind: Schema.optional(Schema.String),
        gpus: Schema.optional(Schema.Number),
        host_dedication_id: Schema.optional(Schema.String),
        kernel_args: Schema.optional(Schema.Array(Schema.String)),
        memory_mb: Schema.optional(Schema.Number),
        persist_rootfs: Schema.optional(
          Schema.Literals(["never", "always", "restart"]),
        ),
      }),
    ),
    count: Schema.optional(Schema.Number),
    org_slug: Schema.String,
    region: Schema.optional(Schema.String),
    volume_name: Schema.optional(Schema.String),
    volume_size_bytes: Schema.optional(Schema.Number),
    weights: Schema.optional(Schema.Struct({})),
  }).pipe(T.Http({ method: "POST", path: "/platform/placements" }));
export type PlatformPlacementsPostInput =
  typeof PlatformPlacementsPostInput.Type;

// Output Schema
export const PlatformPlacementsPostOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    regions: Schema.optional(
      Schema.Array(
        Schema.Struct({
          concurrency: Schema.optional(Schema.Number),
          count: Schema.optional(Schema.Number),
          region: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type PlatformPlacementsPostOutput =
  typeof PlatformPlacementsPostOutput.Type;

// The operation
/**
 * Get Placements
 *
 * Simulates placing the specified number of machines into regions, depending on available capacity and limits.
 */
export const PlatformPlacementsPost = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PlatformPlacementsPostInput,
    outputSchema: PlatformPlacementsPostOutput,
  }),
);
