import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetAFunctionInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
  function_slug: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/projects/{ref}/functions/{function_slug}",
  }),
);
export type V1GetAFunctionInput = typeof V1GetAFunctionInput.Type;

// Output Schema
export const V1GetAFunctionOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  slug: Schema.String,
  name: Schema.String,
  status: Schema.Literals(["ACTIVE", "REMOVED", "THROTTLED"]),
  version: Schema.Number,
  created_at: Schema.Number,
  updated_at: Schema.Number,
  verify_jwt: Schema.optional(Schema.Boolean),
  import_map: Schema.optional(Schema.Boolean),
  entrypoint_path: Schema.optional(Schema.String),
  import_map_path: Schema.optional(Schema.String),
  ezbr_sha256: Schema.optional(Schema.String),
});
export type V1GetAFunctionOutput = typeof V1GetAFunctionOutput.Type;

// The operation
/**
 * Retrieve a function
 *
 * Retrieves a function with the specified slug and project.
 *
 * @param ref - Project ref
 * @param function_slug - Function slug
 */
export const v1GetAFunction = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetAFunctionInput,
  outputSchema: V1GetAFunctionOutput,
}));
