import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ExchangeOauthTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "POST", path: "/v1/oauth/token" }),
  );
export type V1ExchangeOauthTokenInput = typeof V1ExchangeOauthTokenInput.Type;

// Output Schema
export const V1ExchangeOauthTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    access_token: Schema.String,
    refresh_token: Schema.String,
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
