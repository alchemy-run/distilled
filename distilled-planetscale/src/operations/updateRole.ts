import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const UpdateRoleInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/roles/{id}",
  }),
);
export type UpdateRoleInput = typeof UpdateRoleInput.Type;

// Output Schema
export const UpdateRoleOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  access_host_url: Schema.String,
  private_access_host_url: Schema.String,
  private_connection_service_name: Schema.String,
  username: Schema.String,
  password: Schema.String,
  database_name: Schema.String,
  created_at: Schema.String,
  updated_at: Schema.String,
  deleted_at: Schema.String,
  expires_at: Schema.String,
  dropped_at: Schema.String,
  disabled_at: Schema.String,
  drop_failed: Schema.String,
  expired: Schema.Boolean,
  default: Schema.Boolean,
  ttl: Schema.Number,
  inherited_roles: Schema.Array(
    Schema.Literals([
      "pscale_managed",
      "pg_checkpoint",
      "pg_create_subscription",
      "pg_maintain",
      "pg_monitor",
      "pg_read_all_data",
      "pg_read_all_settings",
      "pg_read_all_stats",
      "pg_signal_backend",
      "pg_stat_scan_tables",
      "pg_use_reserved_connections",
      "pg_write_all_data",
      "postgres",
    ]),
  ),
  branch: Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    deleted_at: Schema.String,
  }),
  actor: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
});
export type UpdateRoleOutput = typeof UpdateRoleOutput.Type;

// The operation
/**
 * Update role name
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param id - The ID of the role
 * @param name - The new name of the role
 */
export const updateRole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateRoleInput,
  outputSchema: UpdateRoleOutput,
  errors: [Forbidden, NotFound] as const,
}));
