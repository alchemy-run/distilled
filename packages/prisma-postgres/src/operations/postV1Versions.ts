import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV1VersionsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  envVars: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  portMapping: Schema.optional(
    Schema.Struct({
      http: Schema.optional(Schema.Unknown),
    }),
  ),
  skipCodeUpload: Schema.optional(Schema.Boolean),
  computeServiceId: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/v1/versions" }));
export type PostV1VersionsInput = typeof PostV1VersionsInput.Type;

// Output Schema
export const PostV1VersionsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    type: Schema.String,
    url: Schema.String,
    foundryVersionId: Schema.String,
    uploadUrl: Schema.NullOr(Schema.String),
  }),
});
export type PostV1VersionsOutput = typeof PostV1VersionsOutput.Type;

// The operation
/**
 * Create compute version
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Creates a new compute version under the specified compute service. The `computeServiceId` is required in the request body. Returns a pre-signed upload URL for the artifact unless `skipCodeUpload` is set. Environment variables are merged with the previous version's variables when one exists.
 */
export const postV1Versions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostV1VersionsInput,
  outputSchema: PostV1VersionsOutput,
}));
