import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PlatformRegionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    size: Schema.optional(Schema.String),
    cpu_kind: Schema.optional(Schema.String),
    memory_mb: Schema.optional(Schema.Number),
    cpus: Schema.optional(Schema.Number),
    gpus: Schema.optional(Schema.Number),
    gpu_kind: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "GET", path: "/platform/regions" }));
export type PlatformRegionsGetInput = typeof PlatformRegionsGetInput.Type;

// Output Schema
export const PlatformRegionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nearest: Schema.optional(Schema.String),
    regions: Schema.optional(
      Schema.Array(
        Schema.Struct({
          capacity: Schema.optional(Schema.Number),
          code: Schema.optional(Schema.String),
          deprecated: Schema.optional(Schema.Boolean),
          gateway_available: Schema.optional(Schema.Boolean),
          geo_region: Schema.optional(Schema.String),
          latitude: Schema.optional(Schema.Number),
          longitude: Schema.optional(Schema.Number),
          name: Schema.optional(Schema.String),
          requires_paid_plan: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
  });
export type PlatformRegionsGetOutput = typeof PlatformRegionsGetOutput.Type;

// The operation
/**
 * Get Regions
 *
 * List all regions on the platform with their current Machine capacity.
 *
 * @param size - guest machine size preset. default performance-1x
 * @param cpu_kind - guest CPU kind
 * @param memory_mb - guest memory in megabytes
 * @param cpus - guest CPU count
 * @param gpus - guest GPU count
 * @param gpu_kind - guest GPU kind
 */
export const PlatformRegionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PlatformRegionsGetInput,
  outputSchema: PlatformRegionsGetOutput,
}));
