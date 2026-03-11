import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV2CoreAccountTokensIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v2/core/account_tokens/{id}" }));
export type GetV2CoreAccountTokensIdInput =
  typeof GetV2CoreAccountTokensIdInput.Type;

// Output Schema
export const GetV2CoreAccountTokensIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.String,
    expires_at: Schema.String,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["v2.core.account_token"]),
    used: Schema.Boolean,
  });
export type GetV2CoreAccountTokensIdOutput =
  typeof GetV2CoreAccountTokensIdOutput.Type;

// The operation
/**
 * Retrieve an Account Token
 *
 * Retrieves an Account Token.
 *
 * @param id - The ID of the Account Token to retrieve.
 */
export const GetV2CoreAccountTokensId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetV2CoreAccountTokensIdInput,
    outputSchema: GetV2CoreAccountTokensIdOutput,
  }),
);
