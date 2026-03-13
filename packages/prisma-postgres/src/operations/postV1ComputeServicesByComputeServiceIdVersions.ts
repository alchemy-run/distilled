import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV1ComputeServicesByComputeServiceIdVersionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    computeServiceId: Schema.String.pipe(T.PathParam()),
    envVars: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    portMapping: Schema.optional(
      Schema.Struct({
        http: Schema.optional(Schema.Unknown),
      }),
    ),
    skipCodeUpload: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/compute-services/{computeServiceId}/versions",
    }),
  );
export type PostV1ComputeServicesByComputeServiceIdVersionsInput =
  typeof PostV1ComputeServicesByComputeServiceIdVersionsInput.Type;

// Output Schema
export const PostV1ComputeServicesByComputeServiceIdVersionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Struct({
      id: Schema.String,
      type: Schema.String,
      url: Schema.String,
      foundryVersionId: Schema.String,
      uploadUrl: Schema.NullOr(Schema.String),
    }),
  });
export type PostV1ComputeServicesByComputeServiceIdVersionsOutput =
  typeof PostV1ComputeServicesByComputeServiceIdVersionsOutput.Type;

// The operation
/**
 * Create compute version
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Creates a new compute version under the specified compute service. Returns a pre-signed upload URL for the artifact unless `skipCodeUpload` is set (which forks the latest version's artifact). Environment variables are merged with the previous version's variables when one exists.
 */
export const postV1ComputeServicesByComputeServiceIdVersions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV1ComputeServicesByComputeServiceIdVersionsInput,
    outputSchema: PostV1ComputeServicesByComputeServiceIdVersionsOutput,
  }));
