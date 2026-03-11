import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetProjectFunctionCombinedStatsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    interval: Schema.Literals(["15min", "1hr", "3hr", "1day"]),
    function_id: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/projects/{ref}/analytics/endpoints/functions.combined-stats",
    }),
  );
export type V1GetProjectFunctionCombinedStatsInput =
  typeof V1GetProjectFunctionCombinedStatsInput.Type;

// Output Schema
export const V1GetProjectFunctionCombinedStatsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.optional(Schema.Array(Schema.Unknown)),
    error: Schema.optional(Schema.Unknown),
  });
export type V1GetProjectFunctionCombinedStatsOutput =
  typeof V1GetProjectFunctionCombinedStatsOutput.Type;

// The operation
/**
 * Gets a project's function combined statistics
 *
 * @param ref - Project ref
 */
export const v1GetProjectFunctionCombinedStats =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1GetProjectFunctionCombinedStatsInput,
    outputSchema: V1GetProjectFunctionCombinedStatsOutput,
  }));
