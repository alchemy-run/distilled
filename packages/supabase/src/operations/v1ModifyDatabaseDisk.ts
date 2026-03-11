import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ModifyDatabaseDiskInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    attributes: Schema.Unknown,
  }).pipe(T.Http({ method: "POST", path: "/v1/projects/{ref}/config/disk" }));
export type V1ModifyDatabaseDiskInput = typeof V1ModifyDatabaseDiskInput.Type;

// Output Schema
export const V1ModifyDatabaseDiskOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1ModifyDatabaseDiskOutput = typeof V1ModifyDatabaseDiskOutput.Type;

// The operation
/**
 * Modify database disk
 *
 * @param ref - Project ref
 */
export const v1ModifyDatabaseDisk = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1ModifyDatabaseDiskInput,
    outputSchema: V1ModifyDatabaseDiskOutput,
  }),
);
