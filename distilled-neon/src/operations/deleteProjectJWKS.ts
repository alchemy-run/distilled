import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteProjectJWKSInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  jwks_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "DELETE", path: "/projects/{project_id}/jwks/{jwks_id}" }));
export type DeleteProjectJWKSInput = typeof DeleteProjectJWKSInput.Type;

// Output Schema
export const DeleteProjectJWKSOutput = Schema.Struct({
  id: Schema.String,
  project_id: Schema.String,
  branch_id: Schema.optional(Schema.String),
  jwks_url: Schema.String,
  provider_name: Schema.String,
  created_at: Schema.String,
  updated_at: Schema.String,
  jwt_audience: Schema.optional(Schema.String),
  role_names: Schema.optional(Schema.Array(Schema.String)),
});
export type DeleteProjectJWKSOutput = typeof DeleteProjectJWKSOutput.Type;

// The operation
/**
 * Delete JWKS URL
 *
 * Deletes a JWKS URL from the specified project
 *
 * @param project_id - The Neon project ID
 * @param jwks_id - The JWKS ID
 */
export const deleteProjectJWKS = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteProjectJWKSInput,
  outputSchema: DeleteProjectJWKSOutput,
}));
