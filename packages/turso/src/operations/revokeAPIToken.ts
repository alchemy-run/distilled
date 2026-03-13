import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RevokeAPITokenInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tokenName: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "DELETE", path: "/v1/auth/api-tokens/{tokenName}" }));
export type RevokeAPITokenInput = typeof RevokeAPITokenInput.Type;

// Output Schema
export const RevokeAPITokenOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  token: Schema.optional(Schema.String),
});
export type RevokeAPITokenOutput = typeof RevokeAPITokenOutput.Type;

// The operation
/**
 * Revoke API Token
 *
 * Revokes the provided API token belonging to a user.
 *
 * @param tokenName - The name of the api token.
 */
export const revokeAPIToken = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RevokeAPITokenInput,
  outputSchema: RevokeAPITokenOutput,
}));
