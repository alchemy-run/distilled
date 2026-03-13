import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1VersionsByVersionIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    versionId: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/versions/{versionId}" }));
export type GetV1VersionsByVersionIdInput =
  typeof GetV1VersionsByVersionIdInput.Type;

// Output Schema
export const GetV1VersionsByVersionIdOutput =
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
export type GetV1VersionsByVersionIdOutput =
  typeof GetV1VersionsByVersionIdOutput.Type;

// The operation
/**
 * Get compute version
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Returns a compute version by ID, including its current status derived from the underlying VM state.
 */
export const getV1VersionsByVersionId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetV1VersionsByVersionIdInput,
    outputSchema: GetV1VersionsByVersionIdOutput,
  }),
);
