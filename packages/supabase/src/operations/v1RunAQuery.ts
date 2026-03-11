import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1RunAQueryInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
  query: Schema.String,
  parameters: Schema.optional(Schema.Array(Schema.Unknown)),
  read_only: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "POST", path: "/v1/projects/{ref}/database/query" }));
export type V1RunAQueryInput = typeof V1RunAQueryInput.Type;

// Output Schema
export const V1RunAQueryOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1RunAQueryOutput = typeof V1RunAQueryOutput.Type;

// The operation
/**
 * [Beta] Run sql query
 *
 * @param ref - Project ref
 */
export const v1RunAQuery = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1RunAQueryInput,
  outputSchema: V1RunAQueryOutput,
}));
