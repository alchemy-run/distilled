import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PatchV1ComputeServicesByComputeServiceIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    computeServiceId: Schema.String.pipe(T.PathParam()),
    displayName: Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/v1/compute-services/{computeServiceId}",
    }),
  );
export type PatchV1ComputeServicesByComputeServiceIdInput =
  typeof PatchV1ComputeServicesByComputeServiceIdInput.Type;

// Output Schema
export const PatchV1ComputeServicesByComputeServiceIdOutput =
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
export type PatchV1ComputeServicesByComputeServiceIdOutput =
  typeof PatchV1ComputeServicesByComputeServiceIdOutput.Type;

// The operation
/**
 * Update compute service
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Updates the display name of a compute service.
 */
export const patchV1ComputeServicesByComputeServiceId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchV1ComputeServicesByComputeServiceIdInput,
    outputSchema: PatchV1ComputeServicesByComputeServiceIdOutput,
  }));
