import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteV1VersionsByVersionIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    versionId: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "DELETE", path: "/v1/versions/{versionId}" }));
export type DeleteV1VersionsByVersionIdInput =
  typeof DeleteV1VersionsByVersionIdInput.Type;

// Output Schema
export const DeleteV1VersionsByVersionIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteV1VersionsByVersionIdOutput =
  typeof DeleteV1VersionsByVersionIdOutput.Type;

// The operation
/**
 * Delete compute version
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Permanently deletes the compute version, its metadata, and any associated VM. The version must be stopped or in the `new` state before it can be deleted.
 */
export const deleteV1VersionsByVersionId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteV1VersionsByVersionIdInput,
    outputSchema: DeleteV1VersionsByVersionIdOutput,
  }),
);
