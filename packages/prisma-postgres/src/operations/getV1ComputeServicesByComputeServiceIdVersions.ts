import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1ComputeServicesByComputeServiceIdVersionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    computeServiceId: Schema.String.pipe(T.PathParam()),
    cursor: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/compute-services/{computeServiceId}/versions",
    }),
  );
export type GetV1ComputeServicesByComputeServiceIdVersionsInput =
  typeof GetV1ComputeServicesByComputeServiceIdVersionsInput.Type;

// Output Schema
export const GetV1ComputeServicesByComputeServiceIdVersionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        type: Schema.String,
        url: Schema.String,
        foundryVersionId: Schema.String,
        createdAt: Schema.String,
      }),
    ),
    pagination: Schema.Struct({
      nextCursor: Schema.NullOr(Schema.String),
      hasMore: Schema.Boolean,
    }),
  });
export type GetV1ComputeServicesByComputeServiceIdVersionsOutput =
  typeof GetV1ComputeServicesByComputeServiceIdVersionsOutput.Type;

// The operation
/**
 * List compute versions
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Returns all compute versions belonging to a compute service, ordered by creation time (newest first). Supports cursor-based pagination.
 */
export const getV1ComputeServicesByComputeServiceIdVersions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetV1ComputeServicesByComputeServiceIdVersionsInput,
    outputSchema: GetV1ComputeServicesByComputeServiceIdVersionsOutput,
  }));
