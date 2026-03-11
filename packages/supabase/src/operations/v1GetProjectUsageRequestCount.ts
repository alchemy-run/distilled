import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetProjectUsageRequestCountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/projects/{ref}/analytics/endpoints/usage.api-requests-count",
    }),
  );
export type V1GetProjectUsageRequestCountInput =
  typeof V1GetProjectUsageRequestCountInput.Type;

// Output Schema
export const V1GetProjectUsageRequestCountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    result: Schema.optional(
      Schema.Array(
        Schema.Struct({
          count: Schema.Number,
        }),
      ),
    ),
    error: Schema.optional(Schema.Unknown),
  });
export type V1GetProjectUsageRequestCountOutput =
  typeof V1GetProjectUsageRequestCountOutput.Type;

// The operation
/**
 * Gets project's usage api requests count
 *
 * @param ref - Project ref
 */
export const v1GetProjectUsageRequestCount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1GetProjectUsageRequestCountInput,
    outputSchema: V1GetProjectUsageRequestCountOutput,
  }));
