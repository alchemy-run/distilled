import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DeployAFunctionInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
    slug: Schema.optional(Schema.String),
    bundleOnly: Schema.optional(Schema.Boolean),
  },
).pipe(T.Http({ method: "POST", path: "/v1/projects/{ref}/functions/deploy" }));
export type V1DeployAFunctionInput = typeof V1DeployAFunctionInput.Type;

// Output Schema
export const V1DeployAFunctionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    slug: Schema.String,
    name: Schema.String,
    status: Schema.Literals(["ACTIVE", "REMOVED", "THROTTLED"]),
    version: Schema.Number,
    created_at: Schema.optional(Schema.Number),
    updated_at: Schema.optional(Schema.Number),
    verify_jwt: Schema.optional(Schema.Boolean),
    import_map: Schema.optional(Schema.Boolean),
    entrypoint_path: Schema.optional(Schema.String),
    import_map_path: Schema.optional(Schema.String),
    ezbr_sha256: Schema.optional(Schema.String),
  });
export type V1DeployAFunctionOutput = typeof V1DeployAFunctionOutput.Type;

// The operation
/**
 * Deploy a function
 *
 * A new endpoint to deploy functions. It will create if function does not exist.
 *
 * @param ref - Project ref
 * @param bundleOnly - Boolean string, true or false
 */
export const v1DeployAFunction = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1DeployAFunctionInput,
  outputSchema: V1DeployAFunctionOutput,
}));
