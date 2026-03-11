import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetProjectUsageApiCountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    interval: Schema.optional(
      Schema.Literals(["15min", "30min", "1hr", "3hr", "1day", "3day", "7day"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/projects/{ref}/analytics/endpoints/usage.api-counts",
    }),
  );
export type V1GetProjectUsageApiCountInput =
  typeof V1GetProjectUsageApiCountInput.Type;

// Output Schema
export const V1GetProjectUsageApiCountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.optional(
      Schema.Array(
        Schema.Struct({
          timestamp: Schema.String,
          total_auth_requests: Schema.Number,
          total_realtime_requests: Schema.Number,
          total_rest_requests: Schema.Number,
          total_storage_requests: Schema.Number,
        }),
      ),
    ),
    error: Schema.optional(Schema.Unknown),
  });
export type V1GetProjectUsageApiCountOutput =
  typeof V1GetProjectUsageApiCountOutput.Type;

// The operation
/**
 * Gets project's usage api counts
 *
 * @param ref - Project ref
 */
export const v1GetProjectUsageApiCount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetProjectUsageApiCountInput,
    outputSchema: V1GetProjectUsageApiCountOutput,
  }),
);
