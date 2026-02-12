import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetAuthDetailsInput = Schema.Struct({

}).pipe(T.Http({ method: "GET", path: "/auth" }));
export type GetAuthDetailsInput = typeof GetAuthDetailsInput.Type;

// Output Schema
export const GetAuthDetailsOutput = Schema.Struct({
  account_id: Schema.String,
  auth_method: Schema.Literal("keycloak", "session_cookie", "api_key_user", "api_key_org", "oauth"),
  auth_data: Schema.optional(Schema.String),
});
export type GetAuthDetailsOutput = typeof GetAuthDetailsOutput.Type;

// The operation
/**
 * Get request authentication details
 *
 * Returns auth information about the passed credentials. It can refer to an API key, Bearer token or OAuth session.
 */
export const getAuthDetails = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetAuthDetailsInput,
  outputSchema: GetAuthDetailsOutput,
}));
