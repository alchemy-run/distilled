import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1ComputeServicesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    cursor: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    projectId: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "GET", path: "/v1/compute-services" }));
export type GetV1ComputeServicesInput = typeof GetV1ComputeServicesInput.Type;

// Output Schema
export const GetV1ComputeServicesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        type: Schema.String,
        url: Schema.String,
        name: Schema.String,
        region: Schema.Struct({
          id: Schema.String,
          name: Schema.String,
        }),
        projectId: Schema.String,
        latestVersionId: Schema.NullOr(Schema.String),
        createdAt: Schema.String,
      }),
    ),
    pagination: Schema.Struct({
      nextCursor: Schema.NullOr(Schema.String),
      hasMore: Schema.Boolean,
    }),
  });
export type GetV1ComputeServicesOutput = typeof GetV1ComputeServicesOutput.Type;

// The operation
/**
 * List compute services
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Returns all compute services the token has access to, ordered by creation time (oldest first). Optionally filter by project ID. Supports cursor-based pagination.
 */
export const getV1ComputeServices = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetV1ComputeServicesInput,
    outputSchema: GetV1ComputeServicesOutput,
  }),
);
