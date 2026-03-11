import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetDatabaseDiskInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
  },
).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/config/disk" }));
export type V1GetDatabaseDiskInput = typeof V1GetDatabaseDiskInput.Type;

// Output Schema
export const V1GetDatabaseDiskOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    attributes: Schema.Unknown,
    last_modified_at: Schema.optional(Schema.String),
  });
export type V1GetDatabaseDiskOutput = typeof V1GetDatabaseDiskOutput.Type;

// The operation
/**
 * Get database disk attributes
 *
 * @param ref - Project ref
 */
export const v1GetDatabaseDisk = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetDatabaseDiskInput,
  outputSchema: V1GetDatabaseDiskOutput,
}));
