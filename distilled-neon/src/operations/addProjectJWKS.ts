import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AddProjectJWKSInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  jwks_url: Schema.String,
  provider_name: Schema.String,
  branch_id: Schema.optional(Schema.String),
  jwt_audience: Schema.optional(Schema.String),
  role_names: Schema.optional(Schema.Array(Schema.String)),
  skip_role_creation: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "POST", path: "/projects/{project_id}/jwks" }));
export type AddProjectJWKSInput = typeof AddProjectJWKSInput.Type;

// Output Schema
export const AddProjectJWKSOutput = Schema.Struct({
  jwks: Schema.Struct({
    id: Schema.String,
    project_id: Schema.String,
    branch_id: Schema.optional(Schema.String),
    jwks_url: Schema.String,
    provider_name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    jwt_audience: Schema.optional(Schema.String),
    role_names: Schema.optional(Schema.Array(Schema.String)),
  }),
  operations: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      project_id: Schema.String,
      branch_id: Schema.optional(Schema.String),
      endpoint_id: Schema.optional(Schema.String),
      action: Schema.Literals([
        "create_compute",
        "create_timeline",
        "start_compute",
        "suspend_compute",
        "apply_config",
        "check_availability",
        "delete_timeline",
        "create_branch",
        "import_data",
        "tenant_ignore",
        "tenant_attach",
        "tenant_detach",
        "tenant_reattach",
        "replace_safekeeper",
        "disable_maintenance",
        "apply_storage_config",
        "prepare_secondary_pageserver",
        "switch_pageserver",
        "detach_parent_branch",
        "timeline_archive",
        "timeline_unarchive",
        "start_reserved_compute",
        "sync_dbs_and_roles_from_compute",
        "apply_schema_from_branch",
        "timeline_mark_invisible",
        "prewarm_replica",
        "promote_replica",
        "set_storage_non_dirty",
      ]),
      status: Schema.Literals([
        "scheduling",
        "running",
        "finished",
        "failed",
        "error",
        "cancelling",
        "cancelled",
        "skipped",
      ]),
      error: Schema.optional(Schema.String),
      failures_count: Schema.Number,
      retry_at: Schema.optional(Schema.String),
      created_at: Schema.String,
      updated_at: Schema.String,
      total_duration_ms: Schema.Number,
    }),
  ),
});
export type AddProjectJWKSOutput = typeof AddProjectJWKSOutput.Type;

// The operation
/**
 * Add JWKS URL
 *
 * Add a new JWKS URL to a project, such that it can be used for verifying JWTs used as the authentication mechanism for the specified project.
 * The URL must be a valid HTTPS URL that returns a JSON Web Key Set.
 * The `provider_name` field allows you to specify which authentication provider you're using (e.g., Clerk, Auth0, AWS Cognito, etc.).
 * The `branch_id` can be used to specify on which branches the JWKS URL will be accepted. If not specified, then it will work on any branch.
 * The `role_names` can be used to specify for which roles the JWKS URL will be accepted. If not specified, then default roles will be used (authenticator, authenticated and anonymous).
 * The `jwt_audience` can be used to specify which "aud" values should be accepted by Neon in the JWTs that are used for authentication.
 *
 * @param project_id - The Neon project ID
 */
export const addProjectJWKS = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddProjectJWKSInput,
  outputSchema: AddProjectJWKSOutput,
}));
