import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOauthApplicationInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  application_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/oauth-applications/{application_id}",
  }),
);
export type GetOauthApplicationInput = typeof GetOauthApplicationInput.Type;

// Output Schema
export const GetOauthApplicationOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  redirect_uri: Schema.String,
  domain: Schema.String,
  created_at: Schema.String,
  updated_at: Schema.String,
  scopes: Schema.Array(Schema.String),
  avatar: Schema.String,
  client_id: Schema.String,
  tokens: Schema.Number,
});
export type GetOauthApplicationOutput = typeof GetOauthApplicationOutput.Type;

// The operation
/**
 * Get an OAuth application
 *
 * @param organization - The name of the organization the OAuth application belongs to
 * @param application_id - The ID of the OAuth application
 */
export const getOauthApplication = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOauthApplicationInput,
  outputSchema: GetOauthApplicationOutput,
}));
