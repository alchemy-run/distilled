import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListRolesInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/roles",
  }),
);
export type ListRolesInput = typeof ListRolesInput.Type;

// Output Schema
export const ListRolesOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
});
export type ListRolesOutput = typeof ListRolesOutput.Type;

// The operation
/**
 * List roles
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listRoles = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListRolesInput,
  outputSchema: ListRolesOutput,
  errors: [Forbidden, NotFound] as const,
}));
