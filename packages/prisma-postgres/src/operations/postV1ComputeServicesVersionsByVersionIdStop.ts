import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV1ComputeServicesVersionsByVersionIdStopInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    versionId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/compute-services/versions/{versionId}/stop",
    }),
  );
export type PostV1ComputeServicesVersionsByVersionIdStopInput =
  typeof PostV1ComputeServicesVersionsByVersionIdStopInput.Type;

// Output Schema
export const PostV1ComputeServicesVersionsByVersionIdStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PostV1ComputeServicesVersionsByVersionIdStopOutput =
  typeof PostV1ComputeServicesVersionsByVersionIdStopOutput.Type;

// The operation
/**
 * Stop compute version
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Requests VM shutdown for the compute version. The version record and metadata are retained. Poll the status endpoint until `stopped` is reached.
 */
export const postV1ComputeServicesVersionsByVersionIdStop =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV1ComputeServicesVersionsByVersionIdStopInput,
    outputSchema: PostV1ComputeServicesVersionsByVersionIdStopOutput,
  }));
