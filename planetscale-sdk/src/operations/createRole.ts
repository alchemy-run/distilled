import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const CreateRoleInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.Number),
  inherited_roles: Schema.optional(
    Schema.Array(
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
  ),
  require_where_on_delete: Schema.optional(Schema.String),
  require_where_on_update: Schema.optional(Schema.String),
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
  query_safety_settings: Schema.Struct({
    require_where_on_delete: Schema.Literals(["off", "warn", "on"]),
    require_where_on_update: Schema.Literals(["off", "warn", "on"]),
  }),
});
export type CreateRoleOutput = typeof CreateRoleOutput.Type;

// The operation
/**
 * Create role credentials
 *
 * @param organization - Organization name slug from `list_organizations`. Example: `acme`.
 * @param database - Database name slug from `list_databases`. Example: `app-db`.
 * @param branch - Branch name from `list_branches`. Example: `main`.
 * @param name - The name of the role
 * @param ttl - Time to live in seconds
 * @param inherited_roles - Roles to inherit from
 * @param require_where_on_delete - Require WHERE clause on DELETE statements
 * @param require_where_on_update - Require WHERE clause on UPDATE statements
 */
export const createRole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateRoleInput,
  outputSchema: CreateRoleOutput,
  errors: [Forbidden, NotFound] as const,
}));
