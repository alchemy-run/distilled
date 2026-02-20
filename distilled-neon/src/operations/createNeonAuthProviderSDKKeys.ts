import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateNeonAuthProviderSDKKeysInput = Schema.Struct({
  project_id: Schema.String,
  auth_provider: Schema.Literals(["mock", "stack", "stack_v2", "better_auth"]),
}).pipe(T.Http({ method: "POST", path: "/projects/auth/keys" }));
export type CreateNeonAuthProviderSDKKeysInput =
  typeof CreateNeonAuthProviderSDKKeysInput.Type;

// Output Schema
export const CreateNeonAuthProviderSDKKeysOutput = Schema.Struct({
  auth_provider: Schema.Literals(["mock", "stack", "stack_v2", "better_auth"]),
  auth_provider_project_id: Schema.String,
  pub_client_key: Schema.String,
  secret_server_key: Schema.String,
  jwks_url: Schema.String,
  schema_name: Schema.String,
  table_name: Schema.String,
  base_url: Schema.optional(Schema.String),
});
export type CreateNeonAuthProviderSDKKeysOutput =
  typeof CreateNeonAuthProviderSDKKeysOutput.Type;

// The operation
/**
 * Create Auth Provider SDK keys
 *
 * Generates SDK or API Keys for the auth provider. These might be called different things depending
 * on the auth provider you're using, but are generally used for setting up the frontend and backend SDKs.
 */
export const createNeonAuthProviderSDKKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateNeonAuthProviderSDKKeysInput,
    outputSchema: CreateNeonAuthProviderSDKKeysOutput,
  }));
