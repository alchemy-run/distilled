import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteV1ComputeServicesByComputeServiceIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    computeServiceId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/compute-services/{computeServiceId}",
    }),
  );
export type DeleteV1ComputeServicesByComputeServiceIdInput =
  typeof DeleteV1ComputeServicesByComputeServiceIdInput.Type;

// Output Schema
export const DeleteV1ComputeServicesByComputeServiceIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteV1ComputeServicesByComputeServiceIdOutput =
  typeof DeleteV1ComputeServicesByComputeServiceIdOutput.Type;

// The operation
/**
 * Delete compute service
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Deletes a compute service. All compute versions under the service must already be stopped or deleted.
 */
export const deleteV1ComputeServicesByComputeServiceId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteV1ComputeServicesByComputeServiceIdInput,
    outputSchema: DeleteV1ComputeServicesByComputeServiceIdOutput,
  }));
