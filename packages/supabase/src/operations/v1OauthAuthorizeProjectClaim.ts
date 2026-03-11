import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1OauthAuthorizeProjectClaimInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    project_ref: Schema.String,
    client_id: Schema.String,
    response_type: Schema.Literals(["code", "token", "id_token token"]),
    redirect_uri: Schema.String,
    state: Schema.optional(Schema.String),
    response_mode: Schema.optional(Schema.String),
    code_challenge: Schema.optional(Schema.String),
    code_challenge_method: Schema.optional(
      Schema.Literals(["plain", "sha256", "S256"]),
    ),
  }).pipe(T.Http({ method: "GET", path: "/v1/oauth/authorize/project-claim" }));
export type V1OauthAuthorizeProjectClaimInput =
  typeof V1OauthAuthorizeProjectClaimInput.Type;

// Output Schema
export const V1OauthAuthorizeProjectClaimOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1OauthAuthorizeProjectClaimOutput =
  typeof V1OauthAuthorizeProjectClaimOutput.Type;

// The operation
/**
 * Authorize user through oauth and claim a project
 *
 * Initiates the OAuth authorization flow for the specified provider. After successful authentication, the user can claim ownership of the specified project.
 *
 * @param project_ref - Project ref
 */
export const v1OauthAuthorizeProjectClaim =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1OauthAuthorizeProjectClaimInput,
    outputSchema: V1OauthAuthorizeProjectClaimOutput,
  }));
