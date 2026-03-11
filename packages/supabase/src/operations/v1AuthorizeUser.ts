import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1AuthorizeUserInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  client_id: Schema.String,
  response_type: Schema.Literals(["code", "token", "id_token token"]),
  redirect_uri: Schema.String,
  scope: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  response_mode: Schema.optional(Schema.String),
  code_challenge: Schema.optional(Schema.String),
  code_challenge_method: Schema.optional(
    Schema.Literals(["plain", "sha256", "S256"]),
  ),
  organization_slug: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v1/oauth/authorize" }));
export type V1AuthorizeUserInput = typeof V1AuthorizeUserInput.Type;

// Output Schema
export const V1AuthorizeUserOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1AuthorizeUserOutput = typeof V1AuthorizeUserOutput.Type;

// The operation
/**
 * [Beta] Authorize user through oauth
 *
 * @param organization_slug - Organization slug
 * @param resource - Resource indicator for MCP (Model Context Protocol) clients
 */
export const v1AuthorizeUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1AuthorizeUserInput,
  outputSchema: V1AuthorizeUserOutput,
}));
