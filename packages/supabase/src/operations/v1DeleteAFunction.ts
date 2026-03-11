import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DeleteAFunctionInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
    function_slug: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/v1/projects/{ref}/functions/{function_slug}",
  }),
);
export type V1DeleteAFunctionInput = typeof V1DeleteAFunctionInput.Type;

// Output Schema
export const V1DeleteAFunctionOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1DeleteAFunctionOutput = typeof V1DeleteAFunctionOutput.Type;

// The operation
/**
 * Delete a function
 *
 * Deletes a function with the specified slug from the specified project.
 *
 * @param ref - Project ref
 * @param function_slug - Function slug
 */
export const v1DeleteAFunction = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1DeleteAFunctionInput,
  outputSchema: V1DeleteAFunctionOutput,
}));
