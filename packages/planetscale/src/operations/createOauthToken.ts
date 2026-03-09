import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound, UnprocessableEntity } from "../errors";
import { SensitiveString } from "../sensitive";

// Input Schema
export const CreateOauthTokenInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
  client_id: Schema.String,
  client_secret: Schema.String,
  grant_type: Schema.Literals(["authorization_code", "refresh_token"]),
  code: Schema.optional(Schema.String),
  redirect_uri: Schema.optional(Schema.String),
  refresh_token: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{organization}/oauth-applications/{id}/token",
  }),
);
export type CreateOauthTokenInput = typeof CreateOauthTokenInput.Type;

// Output Schema
export const CreateOauthTokenOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  display_name: Schema.String,
  token: SensitiveString,
  plain_text_refresh_token: SensitiveString,
  avatar_url: Schema.String,
  created_at: Schema.String,
  updated_at: Schema.String,
  expires_at: Schema.String,
  last_used_at: Schema.String,
  actor_id: Schema.String,
  actor_display_name: Schema.String,
  actor_type: Schema.String,
  service_token_accesses: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      access: Schema.String,
      description: Schema.String,
      resource_name: Schema.String,
      resource_id: Schema.String,
      resource_type: Schema.String,
      resource: Schema.Struct({
        id: Schema.String,
        name: Schema.String,
        created_at: Schema.String,
        updated_at: Schema.String,
        deleted_at: Schema.String,
      }),
    }),
  ),
  oauth_accesses_by_resource: Schema.Struct({
    database: Schema.Struct({
      databases: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          id: Schema.String,
          organization: Schema.String,
          url: Schema.String,
        }),
      ),
      accesses: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          description: Schema.String,
        }),
      ),
    }),
    organization: Schema.Struct({
      organizations: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          id: Schema.String,
          url: Schema.String,
        }),
      ),
      accesses: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          description: Schema.String,
        }),
      ),
    }),
    branch: Schema.Struct({
      branches: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          id: Schema.String,
          database: Schema.String,
          organization: Schema.String,
          url: Schema.String,
        }),
      ),
      accesses: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          description: Schema.String,
        }),
      ),
    }),
    user: Schema.Struct({
      users: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          id: Schema.String,
        }),
      ),
      accesses: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          description: Schema.String,
        }),
      ),
    }),
  }),
});
export type CreateOauthTokenOutput = typeof CreateOauthTokenOutput.Type;

// The operation
/**
 * Create or renew an OAuth token
 *
 * Create an OAuth token from an authorization grant code, or refresh an OAuth token from a refresh token
 *
 * @param organization - The name of the organization the OAuth application belongs to
 * @param id - The ID of the OAuth application
 * @param client_id - The OAuth application's client ID
 * @param client_secret - The OAuth application's client secret
 * @param grant_type - Whether an OAuth grant code or a refresh token is being exchanged for an OAuth token
 * @param code - The OAuth grant code provided to your OAuth application's redirect URI. Required when grant_type is authorization_code
 * @param redirect_uri - The OAuth application's redirect URI. Required when grant_type is authorization_code
 * @param refresh_token - The refresh token from the original OAuth token grant. Required when grant_type is refresh_token
 */
export const createOauthToken = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateOauthTokenInput,
  outputSchema: CreateOauthTokenOutput,
  errors: [Forbidden, NotFound, UnprocessableEntity] as const,
}));
