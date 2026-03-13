import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV1ComputeServicesVersionsByVersionIdStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    versionId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/compute-services/versions/{versionId}/start",
    }),
  );
export type PostV1ComputeServicesVersionsByVersionIdStartInput =
  typeof PostV1ComputeServicesVersionsByVersionIdStartInput.Type;

// Output Schema
export const PostV1ComputeServicesVersionsByVersionIdStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Struct({
      previewDomain: Schema.String,
    }),
  });
export type PostV1ComputeServicesVersionsByVersionIdStartOutput =
  typeof PostV1ComputeServicesVersionsByVersionIdStartOutput.Type;

// The operation
/**
 * Start compute version
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Requests VM creation and startup for the compute version. The artifact must be uploaded before calling this endpoint. Returns a preview domain that becomes reachable once the VM is running. Poll the status endpoint until `running` is reached.
 */
export const postV1ComputeServicesVersionsByVersionIdStart =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV1ComputeServicesVersionsByVersionIdStartInput,
    outputSchema: PostV1ComputeServicesVersionsByVersionIdStartOutput,
  }));
