import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteAccountsAccountExternalAccountsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/accounts/{account}/external_accounts/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteAccountsAccountExternalAccountsIdInput =
  typeof DeleteAccountsAccountExternalAccountsIdInput.Type;

// Output Schema
export const DeleteAccountsAccountExternalAccountsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type DeleteAccountsAccountExternalAccountsIdOutput =
  typeof DeleteAccountsAccountExternalAccountsIdOutput.Type;

// The operation
/**
 * Delete an external account
 *
 * <p>Delete a specified external account for a given account.</p>
 *
 * @param id - Unique identifier for the external account to be deleted.
 */
export const DeleteAccountsAccountExternalAccountsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteAccountsAccountExternalAccountsIdInput,
    outputSchema: DeleteAccountsAccountExternalAccountsIdOutput,
  }));
