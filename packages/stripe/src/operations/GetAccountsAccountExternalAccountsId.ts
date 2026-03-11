import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetAccountsAccountExternalAccountsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/accounts/{account}/external_accounts/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetAccountsAccountExternalAccountsIdInput =
  typeof GetAccountsAccountExternalAccountsIdInput.Type;

// Output Schema
export const GetAccountsAccountExternalAccountsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type GetAccountsAccountExternalAccountsIdOutput =
  typeof GetAccountsAccountExternalAccountsIdOutput.Type;

// The operation
/**
 * Retrieve an external account
 *
 * <p>Retrieve a specified external account for a given account.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 * @param id - Unique identifier for the external account to be retrieved.
 */
export const GetAccountsAccountExternalAccountsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetAccountsAccountExternalAccountsIdInput,
    outputSchema: GetAccountsAccountExternalAccountsIdOutput,
  }));
