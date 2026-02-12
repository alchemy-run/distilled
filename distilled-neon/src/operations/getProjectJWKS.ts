import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetProjectJWKSInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/projects/{project_id}/jwks" }));
export type GetProjectJWKSInput = typeof GetProjectJWKSInput.Type;

// Output Schema
export const GetProjectJWKSOutput = Schema.Struct({
  jwks: Schema.Array(Schema.Struct({
    id: Schema.String,
    project_id: Schema.String,
    branch_id: Schema.optional(Schema.String),
    jwks_url: Schema.String,
    provider_name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    jwt_audience: Schema.optional(Schema.String),
    role_names: Schema.optional(Schema.Array(Schema.String)),
  })),
});
export type GetProjectJWKSOutput = typeof GetProjectJWKSOutput.Type;

// The operation
/**
 * List JWKS URLs
 *
 * Returns the JWKS URLs available for verifying JWTs used as the authentication mechanism for the specified project.
 *
 * @param project_id - The Neon project ID
 */
export const getProjectJWKS = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetProjectJWKSInput,
  outputSchema: GetProjectJWKSOutput,
}));
