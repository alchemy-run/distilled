import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetDiskUtilizationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/projects/{ref}/config/disk/util" }),
  );
export type V1GetDiskUtilizationInput = typeof V1GetDiskUtilizationInput.Type;

// Output Schema
export const V1GetDiskUtilizationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    timestamp: Schema.String,
    metrics: Schema.Struct({
      fs_size_bytes: Schema.Number,
      fs_avail_bytes: Schema.Number,
      fs_used_bytes: Schema.Number,
    }),
  });
export type V1GetDiskUtilizationOutput = typeof V1GetDiskUtilizationOutput.Type;

// The operation
/**
 * Get disk utilization
 *
 * @param ref - Project ref
 */
export const v1GetDiskUtilization = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetDiskUtilizationInput,
    outputSchema: V1GetDiskUtilizationOutput,
  }),
);
