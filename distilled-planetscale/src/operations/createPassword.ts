import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const CreatePasswordInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
  role: Schema.optional(
    Schema.Literal("reader", "writer", "admin", "readwriter"),
  ),
  replica: Schema.optional(Schema.Boolean),
  ttl: Schema.optional(Schema.Number),
  cidrs: Schema.optional(Schema.Array(Schema.String)),
  direct_vtgate: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/passwords",
  }),
);
export type CreatePasswordInput = typeof CreatePasswordInput.Type;

// Output Schema
export const CreatePasswordOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  role: Schema.Literal("reader", "writer", "admin", "readwriter"),
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
export type CreatePasswordOutput = typeof CreatePasswordOutput.Type;

// The operation
/**
 * Create a password
 *
 * @param organization - The name of the organization the password belongs to
 * @param database - The name of the database the password belongs to
 * @param branch - The name of the branch the password belongs to
 * @param name - Optional name of the password
 * @param role - The database role of the password (i.e. admin)
 * @param replica - Whether the password is for a read replica
 * @param ttl - Time to live (in seconds) for the password. The password will be invalid when TTL has passed
 * @param cidrs - List of IP addresses or CIDR ranges that can use this password
 * @param direct_vtgate - Whether the password connects directly to a VTGate
 */
export const createPassword = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreatePasswordInput,
  outputSchema: CreatePasswordOutput,
}));
