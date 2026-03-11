import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetProjectDiskAutoscaleConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/projects/{ref}/config/disk/autoscale" }),
  );
export type V1GetProjectDiskAutoscaleConfigInput =
  typeof V1GetProjectDiskAutoscaleConfigInput.Type;

// Output Schema
export const V1GetProjectDiskAutoscaleConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    growth_percent: Schema.NullOr(Schema.Number),
    min_increment_gb: Schema.NullOr(Schema.Number),
    max_size_gb: Schema.NullOr(Schema.Number),
  });
export type V1GetProjectDiskAutoscaleConfigOutput =
  typeof V1GetProjectDiskAutoscaleConfigOutput.Type;

// The operation
/**
 * Gets project disk autoscale config
 *
 * @param ref - Project ref
 */
export const v1GetProjectDiskAutoscaleConfig =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1GetProjectDiskAutoscaleConfigInput,
    outputSchema: V1GetProjectDiskAutoscaleConfigOutput,
  }));
