import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1ComputeServicesByComputeServiceIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    computeServiceId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/compute-services/{computeServiceId}" }),
  );
export type GetV1ComputeServicesByComputeServiceIdInput =
  typeof GetV1ComputeServicesByComputeServiceIdInput.Type;

// Output Schema
export const GetV1ComputeServicesByComputeServiceIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Struct({
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
  });
export type GetV1ComputeServicesByComputeServiceIdOutput =
  typeof GetV1ComputeServicesByComputeServiceIdOutput.Type;

// The operation
/**
 * Get compute service
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Returns a compute service by ID, including its region and latest version reference.
 */
export const getV1ComputeServicesByComputeServiceId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetV1ComputeServicesByComputeServiceIdInput,
    outputSchema: GetV1ComputeServicesByComputeServiceIdOutput,
  }));
