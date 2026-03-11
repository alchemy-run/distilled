import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV2CoreAccountsAccountIdPersonTokensIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account_id: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v2/core/accounts/{account_id}/person_tokens/{id}",
    }),
  );
export type GetV2CoreAccountsAccountIdPersonTokensIdInput =
  typeof GetV2CoreAccountsAccountIdPersonTokensIdInput.Type;

// Output Schema
export const GetV2CoreAccountsAccountIdPersonTokensIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.String,
    expires_at: Schema.String,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["v2.core.account_person_token"]),
    used: Schema.Boolean,
  });
export type GetV2CoreAccountsAccountIdPersonTokensIdOutput =
  typeof GetV2CoreAccountsAccountIdPersonTokensIdOutput.Type;

// The operation
/**
 * Retrieve a Person Token
 *
 * Retrieves a Person Token associated with an Account.
 *
 * @param account_id - The Account the Person is associated with.
 * @param id - The ID of the Person Token to retrieve.
 */
export const GetV2CoreAccountsAccountIdPersonTokensId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetV2CoreAccountsAccountIdPersonTokensIdInput,
    outputSchema: GetV2CoreAccountsAccountIdPersonTokensIdOutput,
  }));
