import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const V1ExchangeOauthTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    grant_type: Schema.optional(
      Schema.Literals(["authorization_code", "refresh_token"]),
    ),
    client_id: Schema.optional(Schema.String),
    client_secret: Schema.optional(SensitiveString),
    code: Schema.optional(Schema.String),
    code_verifier: Schema.optional(Schema.String),
    redirect_uri: Schema.optional(Schema.String),
    refresh_token: Schema.optional(SensitiveString),
    resource: Schema.optional(Schema.String),
    scope: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/oauth/token",
      contentType: "form-urlencoded",
    }),
  );
export type V1ExchangeOauthTokenInput = typeof V1ExchangeOauthTokenInput.Type;

// Output Schema
export const V1ExchangeOauthTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    access_token: SensitiveString,
    refresh_token: SensitiveString,
    expires_in: Schema.Number,
    token_type: Schema.Literals(["Bearer"]),
  });
export type V1ExchangeOauthTokenOutput = typeof V1ExchangeOauthTokenOutput.Type;

// The operation
/**
 * [Beta] Exchange auth code for user's access and refresh token
 */
export const v1ExchangeOauthToken = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1ExchangeOauthTokenInput,
    outputSchema: V1ExchangeOauthTokenOutput,
  }),
);
