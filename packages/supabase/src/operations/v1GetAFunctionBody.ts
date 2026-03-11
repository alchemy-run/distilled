import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetAFunctionBodyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    function_slug: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/projects/{ref}/functions/{function_slug}/body",
    }),
  );
export type V1GetAFunctionBodyInput = typeof V1GetAFunctionBodyInput.Type;

// Output Schema
export const V1GetAFunctionBodyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type V1GetAFunctionBodyOutput = typeof V1GetAFunctionBodyOutput.Type;

// The operation
/**
 * Retrieve a function body
 *
 * Retrieves a function body for the specified slug and project.
 *
 * @param ref - Project ref
 * @param function_slug - Function slug
 */
export const v1GetAFunctionBody = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetAFunctionBodyInput,
  outputSchema: V1GetAFunctionBodyOutput,
}));
