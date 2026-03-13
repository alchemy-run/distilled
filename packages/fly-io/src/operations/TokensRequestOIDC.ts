import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const TokensRequestOIDCInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    aud: Schema.optional(Schema.String),
    aws_principal_tags: Schema.optional(Schema.Boolean),
  },
).pipe(T.Http({ method: "POST", path: "/tokens/oidc" }));
export type TokensRequestOIDCInput = typeof TokensRequestOIDCInput.Type;

// Output Schema
export const TokensRequestOIDCOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String;
export type TokensRequestOIDCOutput = typeof TokensRequestOIDCOutput.Type;

// The operation
/**
 * Request an OIDC token
 *
 * Request an Open ID Connect token for your machine. Customize the audience claim with the `aud` parameter. This returns a JWT token. Learn more about [using OpenID Connect](/docs/reference/openid-connect/) on Fly.io.
 */
export const TokensRequestOIDC = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TokensRequestOIDCInput,
  outputSchema: TokensRequestOIDCOutput,
}));
