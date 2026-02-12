import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListPasswordsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  read_only_region_id: Schema.optional(Schema.String),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/passwords",
  }),
);
export type ListPasswordsInput = typeof ListPasswordsInput.Type;

// Output Schema
export const ListPasswordsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      role: Schema.Literal("reader", "writer", "admin", "readwriter"),
      cidrs: Schema.Array(Schema.String),
      created_at: Schema.String,
      deleted_at: Schema.String,
      expires_at: Schema.String,
      last_used_at: Schema.String,
      expired: Schema.Boolean,
      direct_vtgate: Schema.Boolean,
      direct_vtgate_addresses: Schema.Array(Schema.String),
      ttl_seconds: Schema.Number,
      access_host_url: Schema.String,
      access_host_regional_url: Schema.String,
      access_host_regional_urls: Schema.Array(Schema.String),
      actor: Schema.Struct({
        id: Schema.String,
        display_name: Schema.String,
        avatar_url: Schema.String,
      }),
      region: Schema.Struct({
        id: Schema.String,
        provider: Schema.String,
        enabled: Schema.Boolean,
        public_ip_addresses: Schema.Array(Schema.String),
        display_name: Schema.String,
        location: Schema.String,
        slug: Schema.String,
        current_default: Schema.Boolean,
      }),
      username: Schema.String,
      plain_text: Schema.String,
      replica: Schema.Boolean,
      renewable: Schema.Boolean,
      database_branch: Schema.Struct({
        name: Schema.String,
        id: Schema.String,
        production: Schema.Boolean,
        mysql_edge_address: Schema.String,
        private_edge_connectivity: Schema.Boolean,
      }),
    }),
  ),
});
export type ListPasswordsOutput = typeof ListPasswordsOutput.Type;

// The operation
/**
 * List passwords
 *
 * @param organization - The name of the organization the password belongs to
 * @param database - The name of the database the password belongs to
 * @param branch - The name of the branch the password belongs to
 * @param read_only_region_id - A read-only region of the database branch. If present, the password results will be filtered to only those in the region
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listPasswords = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListPasswordsInput,
  outputSchema: ListPasswordsOutput,
  errors: [Forbidden, NotFound] as const,
}));
