import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const TokensRequest_OIDCInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    aud: Schema.optional(Schema.String),
    aws_principal_tags: Schema.optional(Schema.Boolean),
  }).pipe(T.Http({ method: "POST", path: "/tokens/oidc" }));
export type TokensRequest_OIDCInput = typeof TokensRequest_OIDCInput.Type;

// Output Schema
export const TokensRequest_OIDCOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String;
export type TokensRequest_OIDCOutput = typeof TokensRequest_OIDCOutput.Type;

// The operation
/**
 * Request an OIDC token
 *
 * Request an Open ID Connect token for your machine. Customize the audience claim with the `aud` parameter. This returns a JWT token. Learn more about [using OpenID Connect](/docs/reference/openid-connect/) on Fly.io.
 */
export const TokensRequest_OIDC = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TokensRequest_OIDCInput,
  outputSchema: TokensRequest_OIDCOutput,
}));
