import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV1VersionsByVersionIdStopInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    versionId: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "POST", path: "/v1/versions/{versionId}/stop" }));
export type PostV1VersionsByVersionIdStopInput =
  typeof PostV1VersionsByVersionIdStopInput.Type;

// Output Schema
export const PostV1VersionsByVersionIdStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PostV1VersionsByVersionIdStopOutput =
  typeof PostV1VersionsByVersionIdStopOutput.Type;

// The operation
/**
 * Stop compute version
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Requests VM shutdown for the compute version. The version record and metadata are retained. Poll the status endpoint until `stopped` is reached.
 */
export const postV1VersionsByVersionIdStop =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV1VersionsByVersionIdStopInput,
    outputSchema: PostV1VersionsByVersionIdStopOutput,
  }));
