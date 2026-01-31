import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateRoleInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.Number),
  inherited_roles: Schema.optional(
    Schema.Array(
      Schema.Literal(
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
      ),
    ),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/roles",
  }),
);
export type CreateRoleInput = typeof CreateRoleInput.Type;

// Output Schema
export const CreateRoleOutput = Schema.Struct({
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
    Schema.Literal(
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
    ),
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
export type CreateRoleOutput = typeof CreateRoleOutput.Type;

// The operation
/**
 * Create role credentials
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param name - The name of the role
 * @param ttl - Time to live in seconds
 * @param inherited_roles - Roles to inherit from
 */
export const createRole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateRoleInput,
  outputSchema: CreateRoleOutput,
}));
