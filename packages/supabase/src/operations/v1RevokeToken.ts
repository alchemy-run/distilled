import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const V1RevokeTokenInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  client_id: Schema.String,
  client_secret: SensitiveString,
  refresh_token: SensitiveString,
}).pipe(T.Http({ method: "POST", path: "/v1/oauth/revoke" }));
export type V1RevokeTokenInput = typeof V1RevokeTokenInput.Type;

// Output Schema
export const V1RevokeTokenOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1RevokeTokenOutput = typeof V1RevokeTokenOutput.Type;

// The operation
/**
 * [Beta] Revoke oauth app authorization and it's corresponding tokens
 */
export const v1RevokeToken = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1RevokeTokenInput,
  outputSchema: V1RevokeTokenOutput,
}));
