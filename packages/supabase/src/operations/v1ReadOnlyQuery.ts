import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ReadOnlyQueryInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
  query: Schema.String,
  parameters: Schema.optional(Schema.Array(Schema.Unknown)),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/projects/{ref}/database/query/read-only",
  }),
);
export type V1ReadOnlyQueryInput = typeof V1ReadOnlyQueryInput.Type;

// Output Schema
export const V1ReadOnlyQueryOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1ReadOnlyQueryOutput = typeof V1ReadOnlyQueryOutput.Type;

// The operation
/**
 * [Beta] Run a sql query as supabase_read_only_user
 *
 * All entity references must be schema qualified.
 *
 * @param ref - Project ref
 */
export const v1ReadOnlyQuery = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ReadOnlyQueryInput,
  outputSchema: V1ReadOnlyQueryOutput,
}));
