import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const GetPasswordInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/passwords/{id}",
  }),
);
export type GetPasswordInput = typeof GetPasswordInput.Type;

// Output Schema
export const GetPasswordOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  role: Schema.Literals(["reader", "writer", "admin", "readwriter"]),
  cidrs: Schema.NullOr(Schema.Array(Schema.String)),
  created_at: Schema.String,
  deleted_at: Schema.NullOr(Schema.String),
  expires_at: Schema.NullOr(Schema.String),
  last_used_at: Schema.NullOr(Schema.String),
  expired: Schema.Boolean,
  direct_vtgate: Schema.Boolean,
  direct_vtgate_addresses: Schema.Array(Schema.String),
  ttl_seconds: Schema.NullOr(Schema.Number),
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
  plain_text: SensitiveNullableString,
  replica: Schema.Boolean,
  renewable: Schema.Boolean,
  database_branch: Schema.Struct({
    name: Schema.String,
    id: Schema.String,
    production: Schema.Boolean,
    mysql_edge_address: Schema.String,
    private_edge_connectivity: Schema.Boolean,
  }),
});
export type GetPasswordOutput = typeof GetPasswordOutput.Type;

// The operation
/**
 * Get a password
 *
 * @param organization - The name of the organization the password belongs to
 * @param database - The name of the database the password belongs to
 * @param branch - The name of the branch the password belongs to
 * @param id - The ID of the password
 */
export const getPassword = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetPasswordInput,
  outputSchema: GetPasswordOutput,
  errors: [Forbidden, NotFound] as const,
}));
