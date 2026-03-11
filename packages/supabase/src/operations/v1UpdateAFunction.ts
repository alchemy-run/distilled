import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateAFunctionInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
    function_slug: Schema.String.pipe(T.PathParam()),
    slug: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    verify_jwt: Schema.optional(Schema.Boolean),
    import_map: Schema.optional(Schema.Boolean),
    entrypoint_path: Schema.optional(Schema.String),
    import_map_path: Schema.optional(Schema.String),
    ezbr_sha256: Schema.optional(Schema.String),
    body: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/v1/projects/{ref}/functions/{function_slug}",
  }),
);
export type V1UpdateAFunctionInput = typeof V1UpdateAFunctionInput.Type;

// Output Schema
export const V1UpdateAFunctionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type V1UpdateAFunctionOutput = typeof V1UpdateAFunctionOutput.Type;

// The operation
/**
 * Update a function
 *
 * Updates a function with the specified slug and project.
 *
 * @param ref - Project ref
 * @param function_slug - Function slug
 * @param verify_jwt - Boolean string, true or false
 * @param import_map - Boolean string, true or false
 */
export const v1UpdateAFunction = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1UpdateAFunctionInput,
  outputSchema: V1UpdateAFunctionOutput,
}));
