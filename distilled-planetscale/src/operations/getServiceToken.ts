import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const GetServiceTokenInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/service-tokens/{id}",
  }),
);
export type GetServiceTokenInput = typeof GetServiceTokenInput.Type;

// Output Schema
export const GetServiceTokenOutput = Schema.Struct({
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
export type GetServiceTokenOutput = typeof GetServiceTokenOutput.Type;

// The operation
/**
 * Get a service token
 *
 * Get information about a service token.
 *
 * @param organization - The name of the organization
 * @param id - The ID of the service token
 */
export const getServiceToken = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetServiceTokenInput,
  outputSchema: GetServiceTokenOutput,
}));
