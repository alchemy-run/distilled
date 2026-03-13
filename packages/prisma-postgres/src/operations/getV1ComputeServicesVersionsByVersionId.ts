import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1ComputeServicesVersionsByVersionIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    versionId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/compute-services/versions/{versionId}",
    }),
  );
export type GetV1ComputeServicesVersionsByVersionIdInput =
  typeof GetV1ComputeServicesVersionsByVersionIdInput.Type;

// Output Schema
export const GetV1ComputeServicesVersionsByVersionIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Struct({
      id: Schema.String,
      type: Schema.String,
      url: Schema.String,
      foundryVersionId: Schema.String,
      status: Schema.String,
      previewDomain: Schema.NullOr(Schema.String),
      envVars: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      createdAt: Schema.String,
    }),
  });
export type GetV1ComputeServicesVersionsByVersionIdOutput =
  typeof GetV1ComputeServicesVersionsByVersionIdOutput.Type;

// The operation
/**
 * Get compute version
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Returns a compute version by ID, including its current status derived from the underlying VM state.
 */
export const getV1ComputeServicesVersionsByVersionId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetV1ComputeServicesVersionsByVersionIdInput,
    outputSchema: GetV1ComputeServicesVersionsByVersionIdOutput,
  }));
